// server/webhook.js
import { sendToClient } from "./sse.js";

export async function webhookHandler(req, res) {
  const { message, sessionId } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: "missing sessionId or message" });
  }

  console.log("[CHAT]", sessionId, message);

  // 🔥 mock คำตอบ (ตอนหลังค่อยต่อ AI)
  const botReply = `คุณถามว่า: "${message}"\nเดี๋ยวผมช่วยหาคำตอบให้นะครับ 🙂`;

  // 👉 ส่งกลับผ่าน SSE
  sendToClient(sessionId, botReply);

  // /chat ไม่ต้องส่งข้อความกลับ
  res.json({ success: true });
}
