const COBALT_API = "https://api.cobalt.tools";

export interface VideoInfo {
  status: string;
  url?: string;
  filename?: string;
  error?: string;
  picker?: { url: string; thumb?: string; type?: string }[];
}

export async function getVideoDownload(
  videoUrl: string,
  quality: string = "1080"
): Promise<VideoInfo> {
  const res = await fetch(`${COBALT_API}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      url: videoUrl,
      downloadMode: "auto",
      videoQuality: quality,
      filenameStyle: "pretty",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cobalt API error: ${res.status} ${text}`);
  }

  return res.json();
}
