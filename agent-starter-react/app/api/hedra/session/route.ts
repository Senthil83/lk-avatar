import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://api.hedra.com/v1/sessions", {
    method: "POST",
    headers: {
      "X-API-Key": `${process.env.HEDRA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar_id: "d1dd37a3-e39a-4854-a298-6510289f9cf2", // replace with your avatar
      room_name: "hedra_avatar_room_" + Date.now(),
    }),
  });

  const raw = await res.text();
  console.log("🧠 Raw Hedra response:", raw);

  try {
    const data = JSON.parse(raw);
    console.log("raw", data);
    const livekitUrl = "wss://chatbot-avatar-zahauhij.livekit.cloud";
    const token = data.token;
    return NextResponse.json({ livekitUrl, token });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON", raw }, { status: 500 });
  }
}
