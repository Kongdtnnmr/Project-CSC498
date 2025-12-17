// chatbot.js
const API_BASE = "https://dissectible-arthromeric-marquitta.ngrok-free.dev";

export async function postToChatbot(message, sessionId) {
  const controller = new AbortController();
  // ตั้ง Timeout ไว้ 90 วินาที
  const timeout = setTimeout(() => controller.abort(), 90000);

  try {
    // แก้ไขจาก ${API_BASE}/chat (ซึ่งเดิม API_BASE มี /webhook ต่อท้าย) 
    // ให้ยิงไปที่ URL หลัก + /chat เท่านั้น
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      // ถ้าสถานะไม่ใช่ 200-299 จะโยน Error ไปให้หน้าจอแสดงว่าระบบมีปัญหา
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      return { error: "timeout" };
    }
    throw err;
  }
}