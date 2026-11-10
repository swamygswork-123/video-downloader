import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Video Download Guides & Tips",
  description: "Guides and tips for downloading videos from Instagram, YouTube, Pinterest, Facebook, and more.",
};

const articles = [
  {
    slug: "download-instagram-reels",
    title: "How to Download Instagram Reels - 3 Easy Ways",
    desc: "Learn the easiest methods to save Instagram Reels to your phone or computer.",
    tag: "Instagram",
  },
  {
    slug: "download-youtube-videos",
    title: "How to Download YouTube Videos in HD Quality",
    desc: "Download YouTube videos in 720p, 1080p, or 4K for free. Works on any device.",
    tag: "YouTube",
  },
  {
    slug: "download-pinterest-videos",
    title: "How to Download Pinterest Videos & GIFs",
    desc: "Save Pinterest video pins and GIFs to your device in just a few clicks.",
    tag: "Pinterest",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
      <p className="text-gray-400 mb-8">Guides and tips for downloading videos.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <a
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-violet-500/50 transition-colors group"
          >
            <span className="text-xs font-medium text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
              {article.tag}
            </span>
            <h2 className="font-bold text-white mt-3 mb-2 group-hover:text-violet-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500">{article.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
