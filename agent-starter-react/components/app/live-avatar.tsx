"use client";

import { useEffect, useRef, useState } from "react";
import { Room, RemoteParticipant } from "livekit-client";

export function LiveAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("connecting...");

//   useEffect(() => {
//     const connectAvatar = async () => {
//         try {
//           setStatus("Connecting to Hedra...");
      
//           const res = await fetch("/api/hedra/session", { method: "POST" });
//           const data = await res.json();
//           console.log("Hedra session response:", data);
      
//           // Accept multiple possible key names
//           const livekitUrl = "wss://chatbot-avatar-zahauhij.livekit.cloud";
//           const token = data.token;

      
//           if (!livekitUrl || !livekitUrl.startsWith("wss://")) {
//             throw new Error(`❌ Invalid LiveKit URL: ${livekitUrl}`);
//           }
        
//           if (!token) {
//             throw new Error("❌ Missing token from Hedra session");
//           }
      
//           const room = new Room();
//           setStatus("Connecting to LiveKit room...");
      
//           await room.connect(livekitUrl, token);
//           setStatus("✅ Connected to LiveKit");
      
//           room.on("participantConnected", (participant: RemoteParticipant) => {
//             console.log("Participant connected:", participant.identity);
//             participant.on("trackSubscribed", (track) => {
//               if (track.kind === "video" && videoRef.current) {
//                 track.attach(videoRef.current);
//                 setStatus("🎥 Avatar connected successfully");
//               }
//             });
//           });
      
//           room.on("participantDisconnected", (participant) => {
//             console.warn("Participant disconnected:", participant.identity);
//             setStatus("⚠️ Avatar disconnected");
//           });
      
//         } catch (err) {
//           console.error("Error connecting to Hedra:", err);
//           setStatus(`❌ Connection failed: ${err.message}`);
//         }
//       };
      

//     connectAvatar();
//   }, []);

useEffect(() => {
    fetch("/api/hedra/avatars")
      .then(res => res.json())
      .then(data => console.log("Available avatars:", data));
  }, []);

  const handleGenerate = async () => {
    const res = await fetch("/api/hedra/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        script: "Hello! This is my Hedra avatar speaking.",
        avatar_id: "d1dd37a3-e39a-4854-a298-6510289f9cf2",
      }),
    });
  
    const data = await res.json();
    console.log("Hedra video response123:", data);
  };

  useEffect(() => {
    handleGenerate();
  }, [])

  

  

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-xl mb-4">🎙️ Hedra Live Avatar</h2>
      <p>{status}</p>
      <video ref={videoRef} autoPlay playsInline className="rounded-lg mt-4" />
    </div>
  );
}
