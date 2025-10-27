"use client";

import { useState } from "react";

export default function AvatarPage() {
  const [script, setScript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const res = await fetch("/api/hedra/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });

      const data = await res.json();
      console.log("🎥 Hedra video response:", data);

      if (data.error) {
        setError(JSON.stringify(data.details || data.error));
      } else if (data.video_url) {
        setVideoUrl(data.video_url);
      } else {
        setError("No video URL returned.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 gap-4">
      <h1 className="text-2xl font-bold">🎬 Generate Hedra Video Avatar</h1>
      <textarea
        className="border rounded p-3 w-full max-w-lg"
        rows={4}
        placeholder="Enter your avatar script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
        disabled={loading}
        onClick={handleGenerate}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {videoUrl && (
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="rounded shadow mt-4 w-[600px]"
        />
      )}
    </div>
  );
}
