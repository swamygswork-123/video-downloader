import { NextRequest, NextResponse } from "next/server";
import { getVideoInfo } from "@/lib/ytdlp";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid URL" },
        { status: 400 }
      );
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const info = await getVideoInfo(url);

    return NextResponse.json({ success: true, data: info });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch video info";
    console.error("Video info error:", message);
    return NextResponse.json(
      {
        error:
          "Could not fetch video information. Make sure the URL is correct and the video is public.",
      },
      { status: 422 }
    );
  }
}
