import axios from "axios";
import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false });
const API_KEY = "a69c44572f7d4131bfc080925fa15db3";
console.log(API_KEY, "API");

axios.get("https://tavusapi.com/v2/personas", {
    headers: { "x-api-key": `${API_KEY}` },
  })
  .then(res => console.log("Connected:", res.status))
  .catch(err => console.error("Still blocked:", err.message));
