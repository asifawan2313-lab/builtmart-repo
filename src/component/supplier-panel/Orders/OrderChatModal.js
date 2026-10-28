"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import ModalShell from "./ModalShell";

// DEMO chat (same for every order, replace with real messages later)
const demoMessages = [
  { from: "customer", text: "Assalam o Alaikum, mera order kab tak pohanch jayega?", time: "Oct 17, 10:12 AM" },
  { from: "supplier", text: "Walaikum Salam! Rider nikal chuka hai, 1 ghante mein pohanch jayega.", time: "Oct 17, 10:20 AM" },
  { from: "customer", text: "Theek hai. Gate ke andar unload ho sakega?", time: "Oct 17, 10:31 AM" },
  { from: "supplier", text: "Ji bilkul, rider gate ke andar unload kar dega.", time: "Oct 17, 10:35 AM" },
];

export default function OrderChatModal({ order, statusClass, onClose }) {
  const [messages, setMessages] = useState(demoMessages);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  // Always show the newest message
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Simple handler: adds the message to the chat
  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages([...messages, { from: "supplier", text: text.trim(), time: "Just now" }]);
    setText("");
  };

  return (
    <ModalShell title={`Order Chat — ${order.id}`} onClose={onClose}>
      {/* Customer and status */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-bold text-[#202124] sm:text-lg">{order.customer} · Supplier</p>
        <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
          {order.status}
        </span>
      </div>

      {/* Messages */}
      <div ref={listRef} className="mt-4 flex h-72 flex-col gap-3 overflow-y-auto rounded-lg bg-neutral-100 p-3">
        {messages.map(({ from, text, time }, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-lg border p-3 sm:max-w-[60%] ${
              from === "supplier"
                ? "self-end border-transparent bg-[#ffc61a]"
                : "self-start border-neutral-200 bg-white"
            }`}
          >
            <p className="text-xs font-bold text-[#202124]">{from}</p>
            <p className="text-sm text-[#202124]">{text}</p>
            <p className="mt-1 text-[11px] text-[#45484D]">{time}</p>
          </div>
        ))}
      </div>

      {/* Write a message */}
      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          aria-label="Message"
          className="min-w-0 flex-1 rounded-md border border-neutral-200 px-3 py-2.5 text-sm text-[#202124] outline-none transition focus:border-[#ffc61a] focus:ring-2 focus:ring-[#ffc61a]/40"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex w-12 items-center justify-center rounded-md bg-[#ffc61a] text-[#202124] transition duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          <Send size={18} />
        </button>
      </form>
    </ModalShell>
  );
}