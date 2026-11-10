import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Download Instagram Reels - 3 Easy Ways (2026)",
  description: "Download Instagram Reels to your phone or computer for free. 3 easy methods that work on iPhone, Android, and desktop.",
  keywords: ["download instagram reels", "save instagram reels", "instagram reel download", "instagram video download"],
};

export default function InstagramReelsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-10">
        <span className="text-xs font-medium text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full">Instagram</span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-3">How to Download Instagram Reels — 3 Easy Ways</h1>
        <p className="text-gray-400 mb-8">Save any Instagram Reel to your phone or computer in seconds.</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-4">
          <h2 className="text-xl font-bold text-white">Method 1: Using SaveClip (Recommended)</h2>
          <ol className="space-y-2">
            <li>Open Instagram and find the Reel you want to download</li>
            <li>Tap the <strong>Share</strong> button (paper plane icon) and select <strong>Copy Link</strong></li>
            <li>Come to <a href="/" className="text-violet-400 hover:underline">SaveClip.in</a> and paste the link</li>
            <li>Click <strong>Download</strong> and choose your preferred quality</li>
            <li>The video saves to your device — no watermark!</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-8">Method 2: Using Instagram&apos;s Built-in Save</h2>
          <p>Instagram lets you save Reels to your account, but you can only watch them within the app:</p>
          <ol className="space-y-2">
            <li>Open the Reel and tap the <strong>bookmark</strong> icon</li>
            <li>The Reel is saved to your Saved collection</li>
            <li>Note: This doesn&apos;t download the video to your device</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-8">Method 3: Screen Recording</h2>
          <p>As a last resort, you can use your phone&apos;s screen recording feature. However, this results in lower quality and includes the Instagram UI. We recommend using SaveClip for the best quality.</p>

          <h2 className="text-xl font-bold text-white mt-8">FAQ</h2>
          <p><strong>Can I download private Instagram Reels?</strong></p>
          <p>No, only public Reels can be downloaded. If the account is private, you need to be following them and use alternative methods.</p>
          <p><strong>Is it free?</strong></p>
          <p>Yes, SaveClip is completely free with no download limits.</p>
        </div>
      </article>
    </div>
  );
}
