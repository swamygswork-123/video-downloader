"use client";

import { useState } from "react";

interface DownloadResult {
  status: string;
  url?: string;
  filename?: string;
  error?: string;
  picker?: { url: string; thumb?: string; type?: string }[];
}

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

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

      setResult(data.data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (downloadUrl: string, filename?: string) => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (filename) a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
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

      {/* Download Result */}
      {result && (
        <div className="mt-8 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden p-6">
          {/* Direct download (tunnel or redirect) */}
          {(result.status === "tunnel" || result.status === "redirect") && result.url && (
            <div className="text-center">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                <svg className="h-8 w-8 text-green-400 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="text-green-400 font-semibold">Video Ready!</p>
              </div>

              <button
                onClick={() => handleDownload(result.url!, result.filename)}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Video
              </button>

              {result.filename && (
                <p className="text-gray-500 text-xs mt-3 truncate">{result.filename}</p>
              )}
            </div>
          )}

          {/* Multiple options (picker) */}
          {result.status === "picker" && result.picker && (
            <div>
              <h3 className="text-white font-semibold mb-4">
                {result.picker.length} items found — select to download:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {result.picker.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleDownload(item.url)}
                    className="bg-gray-800 hover:bg-gray-700 rounded-xl p-3 transition-colors cursor-pointer group"
                  >
                    {item.thumb && (
                      <img
                        src={item.thumb}
                        alt={`Item ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="flex items-center justify-center gap-1 text-sm text-violet-400 group-hover:text-violet-300">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {item.type === "photo" ? "Photo" : "Video"} {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
