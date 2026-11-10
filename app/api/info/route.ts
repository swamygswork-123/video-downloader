import { NextRequest, NextResponse } from "next/server";
import { getVideoDownload } from "@/lib/downloader";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid URL" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Try multiple quality options
    const qualities = ["1080", "720", "480", "360"];
    let result = null;
    let lastError = "";

    for (const q of qualities) {
      try {
        result = await getVideoDownload(url, q);
        if (result.status === "tunnel" || result.status === "redirect" || result.status === "picker") {
          break;
        }
        if (result.error) {
          lastError = result.error;
          result = null;
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : "Unknown error";
      }
    }

    if (!result || result.status === "error") {
      return NextResponse.json(
        { error: lastError || "Could not process this video. Make sure the URL is correct and the video is public." },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch video info";
    console.error("Video info error:", message);
    return NextResponse.json(
      { error: "Could not fetch video information. Please try again." },
      { status: 422 }
    );
  }
}
