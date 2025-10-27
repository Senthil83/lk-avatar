import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TAVUS_API_KEY;
const API_URL = process.env.TAVUS_API_URL;
const REPLICA_ID = process.env.TAVUS_REPLICA_ID;
const PERSONA_ID = process.env.TAVUS_PERSONA_ID;

// 🧩 Function to create a Tavus video
async function createTavusVideo(scriptText) {
    console.log(scriptText, process.env.TAVUS_REPLICA_ID, process.env.TAVUS_PERSONA_ID);
  try {
    const response = await axios.post(
      `${API_URL}/videos`,
      {
        "replica_id": "rca8a38779a8",
        "script": scriptText
      }  ,
      {
        headers: {
           "x-api-key": "a69c44572f7d4131bfc080925fa15db3",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    console.log("✅ Tavus video job created!");
    console.log(response.data); 
    return response.data.id; // Tavus returns a video ID
  } catch (error) {
    if (error.response) {
        console.error("❌ Tavus responded with error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("❌ No response from Tavus:", error.request);
      } else {
        console.error("❌ Request setup error:", error.message);
      }
  }
}

// 🧩 Function to poll video status until it's ready    
async function checkVideoStatus(videoId) {
  try {
    while (true) {
      const res = await axios.get(`${API_URL}/videos/${videoId}`, {
        headers: { "x-api-key": "a69c44572f7d4131bfc080925fa15db3" },
      });

      const data = res.data;
      console.log("Video status:", data.status);

      if (data.status === "completed") {
        console.log("✅ Video ready!");
        console.log("Download URL:", data.output_url);
        return data.output_url;
      }

      if (data.status === "failed") {
        console.log("❌ Video failed to generate");
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 10000)); // wait 10s
    }
  } catch (err) {
    console.error("Error checking video:", err.response?.data || err.message);
  }
}

(async () => {
  const script = "Hello, this is my Tavus avatar speaking to you using Node.js!";
  const videoId = await createTavusVideo(script);
  if (videoId) {
    await checkVideoStatus(videoId);
  }
})();
