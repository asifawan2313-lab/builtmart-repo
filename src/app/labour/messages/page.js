"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

/* ============================================================
   DEMO DATA (sab naam aur messages sirf UI ke liye hain)
   ============================================================ */

// Har chat kisi booking ya bid se judi hai (public chat nahi). by = "me" ya "them"
const initialChats = [
  {
    id: 1, customer: "Demo Customer 3", job: "Geyser line fitting", ref: "BKG-301", refType: "Booking", unread: 1,
    messages: [
      { id: 1, by: "them", text: "Please come after 10 am.", time: "Yesterday" },
      { id: 2, by: "me", text: "Sure, I will be there on time.", time: "Yesterday" },
      { id: 3, by: "them", text: "Please bring the new pipes as well.", time: "10 min ago" },
    ],
  },
  {
    id: 2, customer: "Demo Customer 6", job: "Sink replacement", ref: "BKG-298", refType: "Booking", unread: 0,
    messages: [{ id: 1, by: "them", text: "The sink will be ready at the site.", time: "2 days ago" }],
  },
  {
    id: 3, customer: "Demo Customer 2", job: "Kitchen leakage repair", ref: "BID-498", refType: "Bid", unread: 0,
    messages: [
      { id: 1, by: "them", text: "Can you do it for Rs. 2,500?", time: "2 hours ago" },
      { id: 2, by: "me", text: "Let me check and send a revised offer.", time: "1 hour ago" },
    ],
  },
];

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const box = "rounded-xl border border-[#D9E3E9] bg-white shadow-sm";

/* ============================================================
   PAGE
   ============================================================ */

const LabourMessagesPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState(null); // kaun si chat khuli hai
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const selected = chats.find((c) => c.id === selectedId);

  // Chat kholne par unread khatam
  const handleOpen = (id) => {
    setSelectedId(id);
    setMessage("");
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  // Message bhejna (simulated: sirf is page ki state mein)
  const handleSend = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    setChats((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, { id: c.messages.length + 1, by: "me", text, time: "Just now" }] }
          : c
      )
    );
    setMessage("");
  };

  const text = query.trim().toLowerCase();
  const visibleChats = chats.filter((c) => !text || `${c.customer} ${c.job} ${c.ref}`.toLowerCase().includes(text));

  /* ---------- Open chat ---------- */
  if (selected) {
    return (
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#384452] hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Messages
        </button>

        <section className={`${box} mt-4 p-4 sm:p-5`}>
          <h1 className="text-xl font-extrabold text-[#292929]">{selected.customer}</h1>
          <p className="text-xs text-[#565553]">{selected.job} · {selected.refType} {selected.ref}</p>

          <ul className="mt-4 flex max-h-96 min-h-56 flex-col gap-2 overflow-y-auto rounded-lg bg-[#F4F4F2] p-3">
            {selected.messages.map(({ id, by, text: chatText, time }) => (
              <li
                key={id}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  by === "me" ? "self-end bg-[#FDC716] text-[#292929]" : "self-start bg-white text-[#202124]"
                }`}
              >
                <p>{chatText}</p>
                <p className="mt-1 text-[10px] text-[#565553]">{time}</p>
              </li>
            ))}
          </ul>

          {/* Message form (form page ke andar hi hai) */}
          <form onSubmit={handleSend} className="mt-3 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Type a message"
              placeholder="Type a message"
              className={`${field} flex-1`}
            />
            <button type="submit" className={`${yellowBtn} h-10 rounded-lg px-5`}>
              Send
            </button>
          </form>
          <p className="mt-2 text-xs text-[#565553]">Simulated chat: no real message is delivered.</p>
        </section>
      </div>
    );
  }

  /* ---------- Chats list ---------- */
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Chat / Messages</h1>
          <p className="mt-1 text-xs text-[#565553]">Chats are linked to your bids and bookings only.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search chats"
            placeholder="Search customer or job"
            className={`${field} pl-9`}
          />
        </div>
      </div>

      <section className={`${box} mt-4 overflow-hidden`}>
        {visibleChats.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#565553]">No chats found.</p>
        ) : (
          <ul className="divide-y divide-[#D9E3E9]">
            {visibleChats.map(({ id, customer, job, ref, refType, unread, messages }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => handleOpen(id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[#F4F4F2]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#202124]">{customer}</p>
                    <p className="truncate text-xs text-[#565553]">{job} · {refType} {ref}</p>
                    <p className="mt-1 truncate text-xs text-[#565553]">{messages[messages.length - 1].text}</p>
                  </div>
                  {unread > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#FDC716] px-1.5 text-[11px] font-bold text-[#292929]">
                      {unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample chats shown for demonstration purposes.</p>
    </div>
  );
};

export default LabourMessagesPage;