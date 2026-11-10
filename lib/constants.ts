export const SITE_NAME = "SaveClip";
export const SITE_URL = "https://saveclip.in";
export const SITE_DESCRIPTION =
  "Download videos from Instagram, YouTube, Pinterest, Facebook & more. Free, fast, and no watermark. Paste the link and download in HD quality.";
export const SITE_TAGLINE = "Download Any Video in Seconds";

export const SUPPORTED_PLATFORMS = [
  {
    name: "Instagram",
    slug: "instagram",
    icon: "instagram",
    color: "from-pink-500 to-purple-600",
    bgLight: "bg-pink-50",
    textColor: "text-pink-600",
    description: "Download Reels, Stories, IGTV & Posts",
    urlPattern: "instagram.com",
  },
  {
    name: "YouTube",
    slug: "youtube",
    icon: "youtube",
    color: "from-red-500 to-red-700",
    bgLight: "bg-red-50",
    textColor: "text-red-600",
    description: "Download videos, Shorts & music",
    urlPattern: "youtube.com|youtu.be",
  },
  {
    name: "Pinterest",
    slug: "pinterest",
    icon: "pin",
    color: "from-red-600 to-red-800",
    bgLight: "bg-red-50",
    textColor: "text-red-700",
    description: "Download Pins, Videos & GIFs",
    urlPattern: "pinterest.com|pin.it",
  },
  {
    name: "Facebook",
    slug: "facebook",
    icon: "facebook",
    color: "from-blue-600 to-blue-800",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Download videos, Reels & Stories",
    urlPattern: "facebook.com|fb.watch",
  },
  {
    name: "Twitter / X",
    slug: "twitter",
    icon: "twitter",
    color: "from-gray-800 to-black",
    bgLight: "bg-gray-50",
    textColor: "text-gray-800",
    description: "Download tweets with videos & GIFs",
    urlPattern: "twitter.com|x.com",
  },
  {
    name: "TikTok",
    slug: "tiktok",
    icon: "tiktok",
    color: "from-gray-900 via-pink-500 to-cyan-400",
    bgLight: "bg-gray-50",
    textColor: "text-gray-800",
    description: "Download TikTok videos without watermark",
    urlPattern: "tiktok.com",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is SaveClip free to use?",
    answer:
      "Yes, SaveClip is completely free. You can download unlimited videos from Instagram, YouTube, Pinterest, Facebook, and more without any charges.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No, SaveClip works entirely in your browser. Just paste the video URL, click Download, and save the video to your device. No app or extension needed.",
  },
  {
    question: "What video quality can I download?",
    answer:
      "We offer multiple quality options including 360p, 480p, 720p (HD), 1080p (Full HD), and even 4K when available. You can choose the quality that suits your needs.",
  },
  {
    question: "Can I download Instagram Reels?",
    answer:
      "Yes! Simply copy the Reel's URL from Instagram and paste it on SaveClip. We support Reels, Stories, IGTV, and regular Instagram video posts.",
  },
  {
    question: "Is it legal to download videos?",
    answer:
      "Downloading videos for personal use is generally acceptable. However, you should respect copyright laws and not redistribute or use downloaded content commercially without permission from the original creator.",
  },
  {
    question: "Why is the download not working?",
    answer:
      "Make sure you're pasting the correct video URL. Private or restricted videos cannot be downloaded. If the issue persists, try refreshing the page or using a different browser.",
  },
];
