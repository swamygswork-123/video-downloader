import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

// Ensure ffmpeg and yt-dlp are in PATH for child processes
const EXTRA_PATHS = [
  path.join(process.env.APPDATA || "", "Python", "Python312", "Scripts"),
  path.join(process.env.APPDATA || "", "Python", "Python311", "Scripts"),
  path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Links"),
  "/usr/local/bin",
  "/usr/bin",
].join(process.platform === "win32" ? ";" : ":");

const ENV = {
  ...process.env,
  PATH: `${EXTRA_PATHS}${process.platform === "win32" ? ";" : ":"}${process.env.PATH}`,
};

// yt-dlp binary path — tries system PATH first, then common install locations
const YT_DLP_PATHS = [
  "yt-dlp",
  path.join(
    process.env.APPDATA || "",
    "Python",
    "Python312",
    "Scripts",
    "yt-dlp.exe"
  ),
  path.join(
    process.env.APPDATA || "",
    "Python",
    "Python311",
    "Scripts",
    "yt-dlp.exe"
  ),
  "/usr/local/bin/yt-dlp",
  "/usr/bin/yt-dlp",
];

async function getYtDlpPath(): Promise<string> {
  for (const p of YT_DLP_PATHS) {
    try {
      await execFileAsync(p, ["--version"], { env: ENV });
      return p;
    } catch {
      continue;
    }
  }
  throw new Error(
    "yt-dlp not found. Install it: pip install yt-dlp"
  );
}

export interface VideoFormat {
  formatId: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  quality: string;
  hasAudio: boolean;
  hasVideo: boolean;
  url: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  durationStr: string;
  uploader: string;
  platform: string;
  url: string;
  formats: VideoFormat[];
}

export async function getVideoInfo(url: string): Promise<VideoInfo> {
  const ytdlp = await getYtDlpPath();

  const { stdout } = await execFileAsync(
    ytdlp,
    [
      "--dump-json",
      "--no-warnings",
      "--no-playlist",
      "--socket-timeout",
      "15",
      url,
    ],
    { timeout: 30000, maxBuffer: 10 * 1024 * 1024, env: ENV }
  );

  const data = JSON.parse(stdout);

  const formats: VideoFormat[] = (data.formats || [])
    .filter(
      (f: Record<string, unknown>) =>
        f.url && (f.vcodec !== "none" || f.acodec !== "none")
    )
    .map((f: Record<string, unknown>) => ({
      formatId: String(f.format_id || ""),
      ext: String(f.ext || "mp4"),
      resolution: f.resolution
        ? String(f.resolution)
        : f.height
          ? `${f.width || "?"}x${f.height}`
          : "audio",
      filesize: (f.filesize as number) || (f.filesize_approx as number) || null,
      quality: String(f.format_note || f.quality || ""),
      hasAudio: f.acodec !== "none" && f.acodec !== null,
      hasVideo: f.vcodec !== "none" && f.vcodec !== null,
      url: String(f.url || ""),
    }));

  // Filter to get best combined (audio+video) formats
  const combinedFormats = formats.filter((f) => f.hasAudio && f.hasVideo);
  const bestFormats =
    combinedFormats.length > 0 ? combinedFormats : formats.slice(-10);

  const duration = (data.duration as number) || 0;
  const mins = Math.floor(duration / 60);
  const secs = Math.floor(duration % 60);

  return {
    id: String(data.id || ""),
    title: String(data.title || "Untitled"),
    thumbnail:
      String(data.thumbnail || "") ||
      (data.thumbnails as Array<{ url: string }>)?.slice(-1)?.[0]?.url ||
      "",
    duration,
    durationStr: `${mins}:${secs.toString().padStart(2, "0")}`,
    uploader: String(data.uploader || data.channel || "Unknown"),
    platform: String(
      data.extractor_key || data.extractor || "Unknown"
    ),
    url,
    formats: bestFormats,
  };
}

export async function getDownloadUrl(
  url: string,
  formatId?: string
): Promise<{ downloadUrl: string; filename: string }> {
  const ytdlp = await getYtDlpPath();
  const fs = await import("fs");
  const os = await import("os");
  const path = await import("path");

  // Create temp directory for downloads
  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const outputTemplate = path.join(tmpDir, "%(id)s.%(ext)s");

  const args = [
    "--no-warnings",
    "--no-playlist",
    "--socket-timeout", "20",
    "--restrict-filenames",
    "--merge-output-format", "mp4",
    "-o", outputTemplate,
  ];

  if (formatId) {
    // If a specific format is requested, try to add best audio
    args.push("-f", `${formatId}+bestaudio/best`);
  } else {
    // Best video+audio merged, fallback to best single file
    args.push("-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best[ext=mp4]/best");
  }

  args.push(url);

  // Download the file
  const { stdout } = await execFileAsync(ytdlp, args, {
    timeout: 120000,
    maxBuffer: 10 * 1024 * 1024,
    env: ENV,
  });

  // Find the downloaded file (most recent in tmp dir)
  const files = fs.readdirSync(tmpDir)
    .map((f: string) => ({
      name: f,
      path: path.join(tmpDir, f),
      time: fs.statSync(path.join(tmpDir, f)).mtimeMs,
    }))
    .sort((a: { time: number }, b: { time: number }) => b.time - a.time);

  if (files.length === 0) {
    throw new Error("Download failed — no file produced");
  }

  const downloadedFile = files[0];

  // Clean up old files (older than 10 minutes)
  const tenMinAgo = Date.now() - 10 * 60 * 1000;
  for (const f of files.slice(1)) {
    if (f.time < tenMinAgo) {
      try { fs.unlinkSync(f.path); } catch {}
    }
  }

  return {
    downloadUrl: `/api/file?name=${encodeURIComponent(downloadedFile.name)}`,
    filename: downloadedFile.name,
  };
}
