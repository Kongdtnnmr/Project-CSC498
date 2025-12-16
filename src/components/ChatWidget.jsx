import { useState, useRef, useEffect } from "react";
import { postToChatbot } from "../services/chatbot"; 

const CHATBOT_NAME = "bot";

// *** 💡 ฟังก์ชันสำหรับแสดงผลข้อความอย่างปลอดภัย (แก้ปัญหา XSS และ Newline) ***
const renderTextWithNewlines = (text) => {
    // แยกข้อความตาม newline และ map เพื่อสร้าง element อย่างปลอดภัย
    return text.split('\n').map((line, index) => (
        // ใช้ <span> เพื่อส่งคืน element อย่างปลอดภัย
        <span key={index}>
            {line}
            {/* แทรก <br> ยกเว้นบรรทัดสุดท้าย */}
            {index < text.split('\n').length - 1 && <br />}
        </span>
    ));
};

export default function ChatAssistant() {
    // *** 🎯 เพิ่มการประกาศ State ที่หายไปกลับมา (แก้ ReferenceError) ***
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1, // กำหนด ID เริ่มต้น
            sender: CHATBOT_NAME,
            text: "สวัสดีครับ ขอบคุณที่แวะมานะครับ 🙌 สนใจดูคอร์สตัวไหน หรืออยากให้ผมช่วยแนะนำไหมครับ"
        }
    ]);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);
    // ----------------------------------------------------------------------

    // Effect สำหรับ Auto-Scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isSending) return;

        const userMessage = input.trim();
        
        // *** 💡 การปรับปรุงที่ 2: เพิ่ม Unique ID ให้ข้อความ (แก้ปัญหา key={i}) ***
        const userMessageObject = { 
            id: Date.now(), 
            sender: "User", 
            text: userMessage 
        };
        
        setMessages((prev) => [...prev, userMessageObject]);
        setInput("");
        setIsSending(true);

        try {
            const responseText = await postToChatbot(userMessage);
            setMessages((prev) => [
                ...prev,
                { 
                    // ใช้ ID ที่แตกต่างกันเพื่อให้แน่ใจว่าไม่ซ้ำกับข้อความก่อนหน้า
                    id: Date.now() + 1, 
                    sender: CHATBOT_NAME, 
                    text: responseText 
                }
            ]);
        } catch (err) {
            console.error("Chatbot API Error:", err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 2, 
                    sender: CHATBOT_NAME,
                    text: "ขออภัยครับ ระบบมีปัญหาชั่วคราว 🙏 โปรดลองใหม่อีกครั้ง"
                }
            ]);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* ปุ่มเปิดแชท */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 rounded-full shadow-lg text-white flex items-center justify-center text-2xl"
            >
                💬
            </button>

            {isOpen && (
                <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden mb-2">
                    <div className="bg-blue-600 text-white p-3 font-bold flex justify-between">
                        {CHATBOT_NAME}
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="flex-grow p-3 overflow-y-auto space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id} // 👈 ใช้ ID ที่ไม่ซ้ำกัน
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
                                    {renderTextWithNewlines(msg.text)} {/* 👈 ใช้ฟังก์ชันที่ปลอดภัย */}
                                </div>
                            </div>
                        ))}
                        
                        {/* *** 💡 การปรับปรุงที่ 3: แสดงสถานะ Loading (UX) *** */}
                        {isSending && (
                             <div className="flex justify-start">
                                 <div className="max-w-[75%] p-2 rounded text-sm bg-gray-100 text-gray-500 italic">
                                     {CHATBOT_NAME} กำลังพิมพ์...
                                 </div>
                             </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="flex border-t">
                        <input
                            className="flex-grow p-2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isSending}
                            placeholder={isSending ? "รอการตอบกลับ..." : "พิมพ์คำถาม..."} // UX: เปลี่ยนข้อความตามสถานะ
                        />
                        <button
                            className={`text-white px-4 ${isSending ? 'bg-gray-400' : 'bg-blue-600'}`}
                            disabled={isSending}
                        >
                            {isSending ? 'รอ...' : 'ส่ง'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}