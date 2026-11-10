import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SaveClip",
  description: "Learn about SaveClip - the free online video downloader for Instagram, YouTube, Pinterest, Facebook, and more.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">About SaveClip</h1>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-10 space-y-4 text-gray-400 leading-relaxed">
        <p>
          SaveClip is a free online tool that helps you download videos from
          popular social media platforms. We support Instagram, YouTube,
          Pinterest, Facebook, TikTok, Twitter (X), and many more.
        </p>
        <p>
          Our mission is to provide a simple, fast, and safe way to save
          videos for offline viewing. No signup, no software, no watermarks —
          just paste the link and download.
        </p>
        <h2 className="text-xl font-bold text-white pt-4">Disclaimer</h2>
        <p>
          SaveClip is not affiliated with Instagram, YouTube, Pinterest,
          Facebook, TikTok, or Twitter. We respect intellectual property
          rights. Please only download content that you have the right to
          access and use. Do not use downloaded content for commercial purposes
          without permission from the original creator.
        </p>
        <h2 className="text-xl font-bold text-white pt-4">Contact</h2>
        <p>
          For questions, feedback, or takedown requests, please contact us at{" "}
          <span className="text-violet-400">contact@saveclip.in</span>.
        </p>
      </div>
    </div>
  );
}
