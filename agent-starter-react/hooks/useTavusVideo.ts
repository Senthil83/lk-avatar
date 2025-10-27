'use client';

import { useState } from 'react';

export function useTavusVideo() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    const createVideo = async (script: string) => {
    try {
      setLoading(true);
      setStatus('creating');

      const res = await fetch('/api/tavus/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script }),
      });

      const data = await res.json();

      if (data.id) {
        setVideoId(data.id);
        pollStatus(data.id);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const pollStatus = async (id: string) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/tavus/status/${id}`);
      const data = await res.json();

      if (data.status) {
        setStatus(data.status);
      }

      if (data.status === 'completed' && data.video_url) {
        clearInterval(interval);
        setVideoUrl(data.video_url);
      }
    }, 5000);
  };

  return { createVideo, videoId, videoUrl, status, loading };
}
