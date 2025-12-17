import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { sseHandler } from "./sse.js";
import { webhookHandler } from "./webhook.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/sse", sseHandler);
app.post("/webhook", webhookHandler);

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;

  await fetch("https://porlaaa.app.n8n.cloud/webhook/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  res.json({ useSSE: true });
});

app.listen(3001, () => {
  console.log("✅ Backend running on http://localhost:3001");
});