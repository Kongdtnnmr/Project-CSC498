import { sendToSession } from "./sse.js";

export function webhookHandler(req, res) {
  const { sessionId, response, message } = req.body;

  sendToSession(sessionId, {
    type: "response",
    message: response || message,
  });

  res.json({ success: true });
}
