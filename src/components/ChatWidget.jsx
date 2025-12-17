import { useState, useRef, useEffect } from "react";
import { postToChatbot } from "../services/chat/chatbot";

const CHATBOT_NAME = "bot";
const SSE_URL = "http://localhost:3001/sse";

/**
 * render text อย่างปลอดภัย
 */
const renderTextWithNewlines = (text) => {
  if (typeof text !== "string") return "";
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: CHATBOT_NAME,
      text: "สวัสดีครับ 🙌 สนใจสอบถามหรือให้ผมช่วยแนะนำอะไรไหมครับ",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // session เดียวต่อ user
  const sessionIdRef = useRef(
    localStorage.getItem("chat_session_id") || crypto.randomUUID()
  );

  useEffect(() => {
    localStorage.setItem("chat_session_id", sessionIdRef.current);
  }, []);

  // ===== SSE CONNECTION =====
  useEffect(() => {
    const es = new EventSource(
      `${SSE_URL}?sessionId=${sessionIdRef.current}`
    );

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // รับเฉพาะข้อความจริง
      if (data?.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            sender: CHATBOT_NAME,
            text: data.message,
          },
        ]);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
      es.close();
    };

    return () => es.close();
  }, []);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage = input.trim();

    // แสดงข้อความ user ทันที
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "User",
        text: userMessage,
      },
    ]);

    setInput("");
    setIsSending(true);

    try {
      // 🔥 trigger backend เท่านั้น
      await postToChatbot(userMessage);
      // ❌ ไม่ render response จาก /chat
      // ✅ รอข้อความจาก SSE อย่างเดียว
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: CHATBOT_NAME,
          text: "ขออภัยครับ ระบบมีปัญหาชั่วคราว 🙏",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg text-white flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden mb-2">
          {/* header */}
          <div className="bg-blue-600 text-white p-3 font-bold flex justify-between">
            {CHATBOT_NAME}
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          {/* messages */}
          <div className="flex-grow p-3 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "User" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-2 rounded text-sm ${
                    msg.sender === "User"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {renderTextWithNewlines(msg.text)}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="max-w-[75%] p-2 rounded text-sm bg-gray-100 text-gray-500 italic">
                  {CHATBOT_NAME} กำลังพิมพ์...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <form onSubmit={handleSubmit} className="flex border-t">
            <input
              className="flex-grow p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
              placeholder={isSending ? "รอการตอบกลับ..." : "พิมพ์คำถาม..."}
            />
            <button
              className={`text-white px-4 ${
                isSending ? "bg-gray-400" : "bg-blue-600"
              }`}
              disabled={isSending}
            >
              {isSending ? "รอ..." : "ส่ง"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
