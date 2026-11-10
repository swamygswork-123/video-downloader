import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Download Pinterest Videos & GIFs (2026)",
  description: "Download Pinterest video pins and GIFs to your phone or computer. Free and easy method that works on all devices.",
  keywords: ["download pinterest video", "pinterest video download", "save pinterest video", "pinterest gif download"],
};

export default function PinterestDownloadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-10">
        <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">Pinterest</span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-3">How to Download Pinterest Videos &amp; GIFs</h1>
        <p className="text-gray-400 mb-8">Save Pinterest video pins and animated GIFs to your device.</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <h2 className="text-xl font-bold text-white">How to Download</h2>
          <ol className="space-y-2">
            <li>Open Pinterest and find the video pin you want to save</li>
            <li>Tap the <strong>three dots</strong> menu and select <strong>Copy Link</strong></li>
            <li>Visit <a href="/" className="text-violet-400 hover:underline">SaveClip.in</a></li>
            <li>Paste the Pinterest link and click <strong>Download</strong></li>
            <li>Save the video to your device</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-8">What Can You Download?</h2>
          <ul className="space-y-1">
            <li>Video Pins</li>
            <li>Animated GIFs (saved as video)</li>
            <li>Idea Pins with video</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Tips</h2>
          <ul className="space-y-1">
            <li>Make sure you&apos;re copying the link to a specific pin, not a board</li>
            <li>Short pin.it links also work</li>
            <li>Image-only pins cannot be downloaded as video</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
