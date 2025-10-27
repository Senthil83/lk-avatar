import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { script } = await req.json();

    const response = await fetch("https://api.hedra.com/v1/video/generate", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.HEDRA_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar_id: "d1dd37a3-e39a-4854-a298-6510289f9cf2", // Hedra Character 3
        script: script || "Hello! I'm Hedra Character 3.",
        aspect_ratio: "16:9",
        resolution: "720p", // matches supported resolutions
        duration: "auto",
      }),
    });

    const raw = await response.text();
    console.log("🎬 Raw Hedra response:", raw);

    const data = JSON.parse(raw);

    if (!data || data.error) {
      return NextResponse.json(
        { error: "Hedra returned an error", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: String(err) },
      { status: 500 }
    );
  }
}
