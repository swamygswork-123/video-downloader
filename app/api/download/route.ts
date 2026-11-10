import { NextRequest, NextResponse } from "next/server";
import { getDownloadUrl } from "@/lib/ytdlp";

export async function POST(request: NextRequest) {
  try {
    const { url, formatId } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid URL" },
        { status: 400 }
      );
    }

    const { downloadUrl, filename } = await getDownloadUrl(url, formatId);

    return NextResponse.json({
      success: true,
      downloadUrl,
      filename,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Download failed";
    console.error("Download error:", message);
    return NextResponse.json(
      { error: "Could not generate download link. Please try again." },
      { status: 422 }
    );
  }
}
