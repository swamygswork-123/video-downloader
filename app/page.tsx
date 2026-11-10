import VideoDownloader from "@/components/VideoDownloader";
import FAQSection from "@/components/FAQSection";
import { SUPPORTED_PLATFORMS, FAQ_ITEMS, SITE_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center relative">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Free &middot; No Signup &middot; No Watermark
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Download Any Video
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Paste a link from Instagram, YouTube, Pinterest, Facebook, TikTok
            or Twitter — get your video instantly.
          </p>

          <VideoDownloader />

          <p className="mt-4 text-xs text-gray-600">
            Supports Instagram Reels, YouTube Shorts, Pinterest Pins, FB Videos
            &amp; more
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-20 pb-16">
        {/* Supported Platforms */}
        <section>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Supported Platforms
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SUPPORTED_PLATFORMS.map((platform) => (
              <div
                key={platform.slug}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors"
              >
                <div
                  className={`bg-gradient-to-br ${platform.color} w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center`}
                >
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm">
                  {platform.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Copy the Link",
                desc: "Open the app (Instagram, YouTube, etc.), find the video, and copy its share link.",
              },
              {
                step: "2",
                title: "Paste & Fetch",
                desc: "Paste the copied link in the box above and click the Download button.",
              },
              {
                step: "3",
                title: "Download",
                desc: "Choose your preferred quality and click Download. The video saves to your device instantly.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Space */}
        <div className="bg-gray-900 border-2 border-dashed border-gray-800 rounded-xl flex items-center justify-center text-gray-600 text-sm h-24">
          Ad Space
        </div>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose {SITE_NAME}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Get download links in seconds, not minutes." },
              { icon: "🎬", title: "HD Quality", desc: "Download in 720p, 1080p, or even 4K when available." },
              { icon: "🚫", title: "No Watermark", desc: "Clean downloads without any added watermarks." },
              { icon: "📱", title: "All Devices", desc: "Works on phone, tablet, and desktop browsers." },
              { icon: "🔒", title: "Safe & Private", desc: "We don't store your data or downloaded videos." },
              { icon: "♾️", title: "Unlimited", desc: "No download limits. Use as much as you need." },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="font-semibold text-white mt-2 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={FAQ_ITEMS} />

        {/* SEO Content */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-8 md:p-12">
          <h2 className="text-xl font-bold text-white mb-4">
            Free Online Video Downloader
          </h2>
          <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
            <p>
              {SITE_NAME} is a free online video downloader that lets you save
              videos from popular social media platforms including Instagram,
              YouTube, Pinterest, Facebook, TikTok, and Twitter (X). No signup
              required, no software to install — just paste the video URL and
              download.
            </p>
            <p>
              Whether you want to download Instagram Reels, YouTube Shorts,
              Pinterest Pins, or Facebook videos, {SITE_NAME} handles it all.
              We support multiple video qualities from 360p to 4K, and provide
              both video and audio download options.
            </p>
            <p>
              Our tool works directly in your browser on any device — iPhone,
              Android, Windows, Mac, or Linux. Just copy the video link from
              any supported app, paste it here, and get your download instantly.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
