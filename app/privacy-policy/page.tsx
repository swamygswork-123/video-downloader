import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SaveClip privacy policy. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-10 space-y-4 text-gray-400 leading-relaxed text-sm">
        <p className="text-gray-500">Last updated: October 2026</p>
        <h2 className="text-lg font-bold text-white pt-2">What We Collect</h2>
        <p>We collect minimal data:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>URLs you paste for downloading (processed in real-time, not stored)</li>
          <li>Anonymous analytics data (page views, device type)</li>
          <li>Cookies for site functionality and advertising</li>
        </ul>
        <h2 className="text-lg font-bold text-white pt-2">What We Don&apos;t Do</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>We do NOT store downloaded videos on our servers</li>
          <li>We do NOT require any personal information or signup</li>
          <li>We do NOT sell your data to third parties</li>
        </ul>
        <h2 className="text-lg font-bold text-white pt-2">Third-Party Services</h2>
        <p>We may use Google AdSense for advertising and Google Analytics for usage data. These services have their own privacy policies.</p>
        <h2 className="text-lg font-bold text-white pt-2">Contact</h2>
        <p>Questions about privacy? Email us at <span className="text-violet-400">contact@saveclip.in</span>.</p>
      </div>
    </div>
  );
}
