import { Metadata } from "next";
import { SUPPORTED_PLATFORMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Download Videos from Instagram, YouTube, Pinterest & More",
  description:
    "Step-by-step guide to download videos from Instagram Reels, YouTube, Pinterest, Facebook, TikTok, and Twitter. Works on any device.",
};

export default function HowToPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        How to Download Videos
      </h1>
      <p className="text-gray-400 text-lg mb-12">
        A step-by-step guide for each platform.
      </p>

      <div className="space-y-12">
        {SUPPORTED_PLATFORMS.map((platform) => (
          <section
            key={platform.slug}
            className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8"
            id={platform.slug}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`bg-gradient-to-br ${platform.color} w-10 h-10 rounded-xl flex items-center justify-center`}
              >
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">
                Download from {platform.name}
              </h2>
            </div>

            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="bg-violet-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </span>
                <div>
                  <p className="text-white font-medium">
                    Open {platform.name} and find the video
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Open the {platform.name} app or website and navigate to the
                    video you want to download.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-violet-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </span>
                <div>
                  <p className="text-white font-medium">Copy the video link</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Tap the Share button and select &quot;Copy Link&quot; or copy the
                    URL from the browser address bar.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-violet-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  3
                </span>
                <div>
                  <p className="text-white font-medium">
                    Paste on SaveClip
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Come back to SaveClip, paste the link in the download box,
                    and click Download.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="bg-violet-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  4
                </span>
                <div>
                  <p className="text-white font-medium">
                    Choose quality and save
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Select your preferred video quality and click the download
                    button. The video will be saved to your device.
                  </p>
                </div>
              </li>
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
