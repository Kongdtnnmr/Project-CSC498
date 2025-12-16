const N8N_CHAT_URL =
  "https://porlaaa.app.n8n.cloud/webhook/chatbot";

const SESSION_ID_KEY = "n8n_chat_session";

function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = "web-" + crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export async function postToChatbot(message) {
  const sessionId = getSessionId();

  const res = await fetch(N8N_CHAT_URL, {
    method: "POST",                    // ✅ สำคัญ
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({             // ✅ ส่ง payload ถูกต้อง
      message,
      sessionId,
    }),
  });

  const text = await res.text();        // อ่าน raw

  if (!res.ok) {
    throw new Error("n8n webhook error");
  }

  if (!text) {
    throw new Error("Empty response from server");
  }

  const data = JSON.parse(text);        // parse JSON
  return data.output || "ไม่มีข้อความตอบกลับ";
}
