const N8N_CHATBOT_WEBHOOK_URL =
  "https://porlaaa.app.n8n.cloud/webhook-test/chatbot";

const FALLBACK_MESSAGE = "ขออภัยครับ ระบบไม่สามารถตอบได้ในขณะนี้ 🙏";

export async function postToChatbot(question) {
  const response = await fetch(N8N_CHATBOT_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatInput: question }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();

  // กันกรณี body ว่าง
  if (!text.trim()) {
    throw new Error("Empty response body");
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // ถ้า backend ส่ง text ตรง ๆ
    return text;
  }

  return data.response || FALLBACK_MESSAGE;
}