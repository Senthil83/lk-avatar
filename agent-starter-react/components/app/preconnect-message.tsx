'use client';

import { AnimatePresence, motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ShimmerText } from '@/components/livekit/shimmer-text';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import axios from "axios";

const MotionMessage = motion.create('p');

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

interface PreConnectMessageProps {
  messages?: ReceivedChatMessage[];
  className?: string;
}

export function PreConnectMessage({ className, messages = [] }: PreConnectMessageProps) {
  // const [videoUrl, setVideoUrl] = useState("");
  // const API_URL = "https://tavusapi.com/v2";

  // async function createTavusVideo(scriptText: string) {
  //   console.log(scriptText, process.env.TAVUS_REPLICA_ID, process.env.TAVUS_PERSONA_ID);
  // try {
  //   const response = await axios.post(
  //     `${API_URL}/videos`,
  //     {
  //       "replica_id": "rca8a38779a8",
  //       "script": scriptText
  //     }  ,
  //     {
  //       headers: {
  //          "x-api-key": "a69c44572f7d4131bfc080925fa15db3",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(response);
  
  //   console.log("✅ Tavus video job created!");
  //   console.log(response.data); 
  //   return response.data.id; // Tavus returns a video ID
  // } catch (error) {
  //   if (error.response) {
  //       console.error("❌ Tavus responded with error:", error.response.status, error.response.data);
  //     } else if (error.request) {
  //       console.error("❌ No response from Tavus:", error.request);
  //     } else {
  //       console.error("❌ Request setup error:", error.message);
  //     }
  // }
  // }
  
  // // 🧩 Function to poll video status until it's ready    
  // async function checkVideoStatus(videoId: string) {
  // try {
  //   while (true) {
  //     const res = await axios.get(`${API_URL}/videos/${videoId}`, {
  //       headers: { "x-api-key": "a69c44572f7d4131bfc080925fa15db3" },
  //     });
  
  //     const data = res.data;
  //     console.log("Video status:", data.status);
  
  //     if (data.status === "completed") {
  //       console.log("✅ Video ready!");
  //       console.log("Download URL:", data.output_url);
  //       setVideoUrl(data.output_url);
  //       return data.output_url;
  //     }
  
  //     if (data.status === "failed") {
  //       console.log("❌ Video failed to generate");
  //       break;
  //     }
  
  //     await new Promise((resolve) => setTimeout(resolve, 10000)); // wait 10s
  //   }
  // } catch (err) {
  //   console.error("Error checking video:", err.response?.data || err.message);
  // }
  // }
  
  // (async () => {
  // const script = "Hello, this is my Tavus avatar speaking to you using Node.js!";
  // const videoId = await createTavusVideo(script);
  // if (videoId) {
  //   await checkVideoStatus(videoId);
  // }
  // })();

 
  return (
    <AnimatePresence>
      {messages.length === 0 && (
        <MotionMessage
          {...VIEW_MOTION_PROPS}
          aria-hidden={messages.length > 0}
          className={cn('pointer-events-none text-center', className)}
        >
        </MotionMessage>
      )}
    </AnimatePresence>
  );
}
