import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Download YouTube Videos in HD Quality (2026)",
  description: "Download YouTube videos in 720p, 1080p, or 4K for free. Works on phone, tablet, and computer. No software needed.",
  keywords: ["download youtube video", "youtube video download", "save youtube video", "youtube to mp4"],
};

export default function YouTubeDownloadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-10">
        <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">YouTube</span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-3">How to Download YouTube Videos in HD Quality</h1>
        <p className="text-gray-400 mb-8">Save YouTube videos in up to 4K quality for offline watching.</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <h2 className="text-xl font-bold text-white">Step-by-Step Guide</h2>
          <ol className="space-y-2">
            <li>Open YouTube and find the video you want to download</li>
            <li>Click <strong>Share</strong> and then <strong>Copy Link</strong> (or copy the URL from the address bar)</li>
            <li>Go to <a href="/" className="text-violet-400 hover:underline">SaveClip.in</a></li>
            <li>Paste the YouTube link and click <strong>Download</strong></li>
            <li>Choose from available quality options (360p, 720p, 1080p, 4K)</li>
            <li>Click download and the video saves to your device</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-8">Supported YouTube Content</h2>
          <ul className="space-y-1">
            <li>Regular YouTube videos</li>
            <li>YouTube Shorts</li>
            <li>Music videos</li>
            <li>Playlists (one video at a time)</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Quality Options</h2>
          <p>We offer multiple quality levels depending on the original video:</p>
          <ul className="space-y-1">
            <li><strong>360p</strong> — Smallest file, basic quality</li>
            <li><strong>720p (HD)</strong> — Good balance of quality and size</li>
            <li><strong>1080p (Full HD)</strong> — Best for most users</li>
            <li><strong>4K</strong> — Highest quality (when available)</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
