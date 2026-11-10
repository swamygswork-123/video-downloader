import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Download Videos from Instagram, YouTube, Pinterest, Facebook`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "video downloader",
    "instagram video download",
    "youtube video download",
    "pinterest video download",
    "facebook video download",
    "reels download",
    "tiktok download",
    "download video online",
    "free video downloader",
    "save video",
    "video saver",
    "download reels",
    "download shorts",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} - Download Any Video in Seconds`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-950 text-white font-sans min-h-screen flex flex-col antialiased">
        {/* Header */}
        <header className="border-b border-gray-800 sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl">
          <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
              <span className="text-xl font-bold">
                Save<span className="text-violet-400">Clip</span>
              </span>
            </a>
            <div className="flex items-center gap-1">
              {[
                ["/", "Home"],
                ["/how-to-download", "How To"],
                ["/blog", "Blog"],
                ["/about", "About"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors hidden sm:block"
                >
                  {label}
                </a>
              ))}
              {/* Mobile menu */}
              <details className="sm:hidden relative">
                <summary className="p-2 text-gray-400 hover:text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
                </summary>
                <div className="absolute right-0 top-12 w-48 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 py-2 z-50">
                  {[
                    ["/", "Home"],
                    ["/how-to-download", "How To"],
                    ["/blog", "Blog"],
                    ["/about", "About"],
                    ["/privacy-policy", "Privacy"],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      {label}
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="col-span-2 md:col-span-1">
                <span className="text-lg font-bold">Save<span className="text-violet-400">Clip</span></span>
                <p className="text-sm text-gray-500 mt-2">Free online video downloader. No watermark, no signup.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Platforms</h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Instagram</p><p>YouTube</p><p>Pinterest</p><p>Facebook</p><p>TikTok</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Resources</h3>
                <div className="space-y-2 text-sm">
                  <a href="/how-to-download" className="block text-gray-500 hover:text-white">How to Download</a>
                  <a href="/blog" className="block text-gray-500 hover:text-white">Blog</a>
                  <a href="/about" className="block text-gray-500 hover:text-white">About</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Legal</h3>
                <div className="space-y-2 text-sm">
                  <a href="/privacy-policy" className="block text-gray-500 hover:text-white">Privacy Policy</a>
                  <a href="/about" className="block text-gray-500 hover:text-white">Contact</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-600">
              &copy; 2026 SaveClip. All rights reserved. Not affiliated with Instagram, YouTube, Pinterest, or Facebook.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
