"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Forward, MessageSquare, Search, Send } from "lucide-react";

/* ============================================================
   DEMO DATA (sab chat aur naam sirf UI ke liye hain)
   from: me (customer), supplier, admin, event (beech wali line)
   ============================================================ */

const startInquiries = [
  {
    id: 1, token: "BM-INQ-1001", supplier: "Al-Noor Building Store", material: "Red Clay Bricks (A-Class)", date: "Nov 3", status: "Replied",
    messages: [
      { id: 1, from: "me", text: "Hello, please confirm the price and stock of Red Clay Bricks (A-Class). I need delivery to Model Town, Gujranwala.", time: "Oct 28, 10:15 AM" },
      { id: 2, from: "supplier", text: "Hello! The price is Rs 16,500 per 1,000 bricks and stock is available. Delivery to Model Town is possible within 2 days.", time: "Oct 28, 11:40 AM" },
      { id: 3, from: "me", text: "The bricks I received are cracked and not A-Class as listed. Please replace them.", time: "Nov 3, 12:05 PM" },
    ],
  },
  {
    id: 2, token: "BM-INQ-1002", supplier: "City Material Traders", material: "Ravi Sand (Rait)", date: "Nov 2", status: "Pending",
    messages: [{ id: 1, from: "me", text: "Is Ravi Sand (Rait) available for delivery this week?", time: "Nov 2, 4:20 PM" }],
  },
  {
    id: 3, token: "BM-INQ-1003", supplier: "Zahid Construction Materials", material: "Steel Saria Grade 60", date: "Oct 31", status: "Replied",
    messages: [
      { id: 1, from: "me", text: "Please share your current rate for 16mm and 12mm bars.", time: "Oct 31, 9:30 AM" },
      { id: 2, from: "supplier", text: "16mm: Rs 270 per kg, 12mm: Rs 275 per kg. Stock is available.", time: "Oct 31, 10:10 AM" },
    ],
  },
  {
    id: 4, token: "BM-INQ-1004", supplier: "Punjab Building Materials", material: "Porcelain Floor Tiles", date: "Oct 29", status: "Replied",
    messages: [
      { id: 1, from: "me", text: "Which sizes of porcelain floor tiles do you have?", time: "Oct 29, 11:00 AM" },
      { id: 2, from: "supplier", text: "Available in 3 sizes. Samples can be seen at our shop on GT Road.", time: "Oct 29, 12:15 PM" },
    ],
  },
  {
    id: 5, token: "BM-INQ-1005", supplier: "Modern Builders Mart", material: "Gold Emulsion Paint", date: "Oct 27", status: "Pending",
    messages: [{ id: 1, from: "me", text: "Do you have Gold Emulsion Paint in 20L buckets?", time: "Oct 27, 2:45 PM" }],
  },
  {
    id: 6, token: "BM-INQ-1006", supplier: "Rehman Builders Supply", material: "Aluminium Sliding Window", date: "Oct 22", status: "Closed",
    messages: [
      { id: 1, from: "me", text: "Can you make a custom size sliding window?", time: "Oct 22, 10:00 AM" },
      { id: 2, from: "supplier", text: "Yes, custom sizes are possible. Please share the measurements.", time: "Oct 22, 11:30 AM" },
      { id: 3, from: "event", text: "You closed this inquiry", time: "Oct 22, 6:00 PM" },
    ],
  },
];

const tabs = ["All", "Pending", "Replied", "With Admin", "Closed"];

const statusClass = {
  Pending: "bg-[#FDC716]/25 text-[#202124]",
  Replied: "bg-green-50 text-green-700",
  "With Admin": "bg-blue-50 text-blue-700",
  Closed: "bg-[#F4F4F2] text-[#45484D]",
};

// Chat ke bubbles ka style (kon bhej raha hai)
const bubbleClass = {
  me: "self-end rounded-br-sm border-[#FDC716] bg-[#FFF3C4]",
  supplier: "self-start rounded-bl-sm border-[#E2E4E7] bg-white",
  admin: "self-start rounded-bl-sm border-[#B7CDF5] bg-blue-50",
};
const senderName = { me: "You", supplier: "", admin: "Admin · BuildMart" };

/* ============================================================
   1. INQUIRY LIST (left side: contacts)
   ============================================================ */

const InquiryList = ({ items, selectedId, query, onQuery, tab, onTab, onSelect, hidden }) => (
  <aside className={`${hidden ? "hidden lg:flex" : "flex"} w-full shrink-0 flex-col border-r border-[#E2E4E7] bg-white lg:w-96`}>
    <div className="border-b border-[#E2E4E7] p-4 pl-16 lg:pl-4">
      <h1 className="text-xl font-extrabold text-[#292929]">My Inquiries</h1>

      <div className="relative mt-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Search inquiries"
          placeholder="Search supplier, material or token"
          className="h-10 w-full rounded-lg border border-[#D9E3E9] bg-[#F4F4F2] pl-9 pr-3 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onTab(name)}
            className={`h-8 shrink-0 cursor-pointer rounded-full border px-3 text-xs font-semibold text-[#202124] transition-colors ${
              tab === name ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>

    <ul className="flex-1 overflow-y-auto">
      {items.length === 0 && <li className="px-4 py-10 text-center text-sm text-[#45484D]">No inquiries found.</li>}

      {items.map(({ id, token, supplier, material, date, status, messages }) => {
        const last = messages.filter((m) => m.from !== "event").at(-1);
        return (
          <li key={id} className="border-b border-[#E2E4E7]">
            <button
              type="button"
              onClick={() => onSelect(id)}
              className={`flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F4F4F2] ${
                id === selectedId ? "bg-[#F4F4F2]" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#202124] text-base font-bold text-[#FDC716]">
                {supplier[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-[#202124]">{supplier}</span>
                  <span className="shrink-0 text-[11px] text-[#45484D]">{date}</span>
                </span>
                <span className="block truncate text-xs text-[#45484D]">{material}</span>
                <span className="block truncate text-xs text-[#45484D]">{last.from === "me" ? `You: ${last.text}` : last.text}</span>
                <span className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#384452]">{token}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusClass[status]}`}>{status}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  </aside>
);

/* ============================================================
   2. CHAT PANEL (right side: chosen inquiry ki chat)
   ============================================================ */

const ChatPanel = ({ inquiry, draft, onDraft, onSend, onForward, onBack, hidden }) => {
  const endRef = useRef(null);

  // Nayi message par chat neeche tak scroll ho jati hai
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [inquiry.id, inquiry.messages.length]);

  const closed = inquiry.status === "Closed";
  const canForward = inquiry.status === "Pending" || inquiry.status === "Replied";

  return (
    <section className={`${hidden ? "hidden lg:flex" : "flex"} min-w-0 flex-1 flex-col bg-[#F4F4F2]`}>
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[#E2E4E7] bg-white p-3 pl-16 lg:pl-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to inquiries"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#202124] hover:bg-[#F4F4F2] lg:hidden"
        >
          <ArrowLeft size={18} />
        </button>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#202124] text-base font-bold text-[#FDC716]">
          {inquiry.supplier[0]}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#202124]">{inquiry.supplier}</p>
          <p className="truncate text-xs text-[#45484D]">
            {inquiry.material} · <span className="font-semibold text-[#384452]">Token {inquiry.token}</span>
          </p>
        </div>

        <span className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:inline ${statusClass[inquiry.status]}`}>{inquiry.status}</span>

        {canForward && (
          <button
            type="button"
            onClick={onForward}
            aria-label="Forward to Admin"
            className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[#202124] bg-white px-3 text-xs font-semibold text-[#202124] transition-colors hover:bg-[#FDC716]"
          >
            <Forward size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Forward to Admin</span>
          </button>
        )}
      </header>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {inquiry.messages.map(({ id, from, text, time }) =>
          from === "event" ? (
            <p key={id} className="self-center rounded-full bg-white px-3 py-1 text-center text-xs text-[#45484D]">
              {text} · {time}
            </p>
          ) : (
            <div key={id} className={`max-w-[85%] rounded-xl border px-3 py-2 sm:max-w-[70%] ${bubbleClass[from]}`}>
              {senderName[from] && <p className="text-[11px] font-semibold text-[#384452]">{senderName[from]}</p>}
              <p className="text-sm leading-6 text-[#202124]">{text}</p>
              <p className="mt-0.5 text-right text-[10px] text-[#45484D]">{time}</p>
            </div>
          )
        )}
        <div ref={endRef} />
      </div>

      {/* Message box */}
      <form onSubmit={onSend} className="flex items-center gap-2 border-t border-[#E2E4E7] bg-white p-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          disabled={closed}
          aria-label="Type a message"
          placeholder={closed ? "This inquiry is closed" : "Type a message"}
          className="h-11 min-w-0 flex-1 rounded-full border border-[#D9E3E9] bg-[#F4F4F2] px-4 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={closed}
          aria-label="Send"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#FDC716] text-[#202124] transition-colors hover:bg-[#E5B20F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={18} />
        </button>
      </form>
    </section>
  );
};

/* ============================================================
   PAGE
   ============================================================ */

const CustomerInquiriesPage = () => {
  const [inquiries, setInquiries] = useState(startInquiries);
  const [selectedId, setSelectedId] = useState(1);
  const [showChat, setShowChat] = useState(false); // mobile par chat khuli hai ya list
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const text = query.trim().toLowerCase();
  const visible = inquiries.filter(
    (i) => (tab === "All" || i.status === tab) && (!text || `${i.supplier} ${i.material} ${i.token}`.toLowerCase().includes(text))
  );
  const current = inquiries.find((i) => i.id === selectedId);

  // Chosen inquiry mein nayi line jodta hai (status badalna ho to wo bhi)
  const addMessage = (message, status) =>
    setInquiries((list) =>
      list.map((i) =>
        i.id === selectedId ? { ...i, status: status || i.status, messages: [...i.messages, { id: i.messages.length + 1, ...message }] } : i
      )
    );

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowChat(true);
    setDraft("");
  };

  const handleSend = (e) => {
    e.preventDefault();
    const message = draft.trim();
    if (!message) return;
    addMessage({ from: "me", text: message, time: "Just now" });
    setDraft("");
  };

  // DEMO: asli forward nahi hota, sirf status "With Admin" ho jata hai
  const handleForward = () => addMessage({ from: "event", text: "You forwarded this chat to Admin", time: "Just now" }, "With Admin");

  return (
    <main className="flex h-dvh overflow-hidden bg-white">
      <InquiryList
        items={visible}
        selectedId={selectedId}
        query={query}
        onQuery={setQuery}
        tab={tab}
        onTab={setTab}
        onSelect={handleSelect}
        hidden={showChat}
      />

      {current ? (
        <ChatPanel
          inquiry={current}
          draft={draft}
          onDraft={setDraft}
          onSend={handleSend}
          onForward={handleForward}
          onBack={() => setShowChat(false)}
          hidden={!showChat}
        />
      ) : (
        <section className="hidden flex-1 flex-col items-center justify-center gap-2 bg-[#F4F4F2] text-[#45484D] lg:flex">
          <MessageSquare size={40} aria-hidden="true" />
          <p className="text-sm">Select an inquiry to see the chat.</p>
        </section>
      )}
    </main>
  );
};

export default CustomerInquiriesPage;