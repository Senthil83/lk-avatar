import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.hedra.com/web-app/public/models", {headers: {
    "X-API-Key": `${process.env.HEDRA_API_KEY}`,
    "Content-Type": "application/json",
  }});
  const data = await res.json();
  const avatarModels = data.filter(
    (m) => m.type === "avatar" || m.requires_audio_input === true
  );
  
  console.log("Available real-time avatars:", avatarModels);
  return NextResponse.json(data);
}
