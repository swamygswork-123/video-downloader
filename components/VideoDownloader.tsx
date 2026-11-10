"use client";

import { useState } from "react";

interface VideoFormat {
  formatId: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  quality: string;
  hasAudio: boolean;
  hasVideo: boolean;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  durationStr: string;
  uploader: string;
  platform: string;
  url: string;
  formats: VideoFormat[];
}

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setVideoInfo(null);

    try {
      const res = await fetch("/api/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setVideoInfo(data.data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (formatId?: string) => {
    if (!videoInfo) return;
    setDownloading(formatId || "best");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoInfo.url, formatId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Download failed");
        return;
      }

      // Trigger download via hidden link
      const a = document.createElement("a");
      a.href = data.downloadUrl;
      a.download = data.filename || "video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setError("Download failed. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit} action="/api/info" method="POST">
        <div className="relative flex items-center bg-gray-900 rounded-2xl border-2 border-gray-700 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all h-16">
          <svg className="absolute left-5 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <input
            type="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video link here..."
            className="w-full h-full bg-transparent pl-14 pr-36 text-white text-lg placeholder-gray-500 outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Fetching...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Video Info Card */}
      {videoInfo && (
        <div className="mt-8 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          {/* Thumbnail & Info */}
          <div className="flex flex-col sm:flex-row gap-4 p-5">
            {videoInfo.thumbnail && (
              <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-800">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full h-full object-cover"
                />
                {videoInfo.durationStr && videoInfo.durationStr !== "0:00" && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md font-mono">
                    {videoInfo.durationStr}
                  </span>
                )}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-base line-clamp-2">
                {videoInfo.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{videoInfo.uploader}</p>
              <span className="inline-block mt-2 text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                {videoInfo.platform}
              </span>
            </div>
          </div>

          {/* Download Options */}
          <div className="border-t border-gray-800 p-5">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Download Options
            </h4>
            <div className="space-y-2">
              {/* Best quality quick download */}
              <button
                onClick={() => handleDownload()}
                disabled={downloading !== null}
                className="w-full flex items-center justify-between bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 text-white font-semibold px-5 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {downloading === "best" ? "Getting link..." : "Download Best Quality"}
                </span>
                <span className="text-sm opacity-80">MP4</span>
              </button>

              {/* Individual formats */}
              {videoInfo.formats.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {videoInfo.formats.slice(-6).map((format) => (
                    <button
                      key={format.formatId}
                      onClick={() => handleDownload(format.formatId)}
                      disabled={downloading !== null}
                      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                    >
                      <span>
                        {format.resolution}{" "}
                        <span className="text-gray-400">.{format.ext}</span>
                      </span>
                      <span className="text-gray-500 text-xs">
                        {format.hasVideo && format.hasAudio
                          ? "A+V"
                          : format.hasVideo
                            ? "Video"
                            : "Audio"}
                        {format.filesize
                          ? ` · ${formatFileSize(format.filesize)}`
                          : ""}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
