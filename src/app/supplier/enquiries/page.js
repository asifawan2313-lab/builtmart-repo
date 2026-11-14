// "use client";

// import { useState } from "react";

// // ========== DATA ==========
// const BM_TABS = ["All", "New", "Responded", "Closed"];
// const BM_STATUSES = ["New", "Responded", "Closed"];

// const BM_START_ENQUIRIES = [
//   {
//     id: 1,
//     customer: "Usama Javed",
//     code: "ENQ-201",
//     date: "2026-10-17",
//     material: "A-Class Bricks",
//     message: "10,000 eent ka bulk rate kya hoga? Delivery Kamoke tak ho jayegi?",
//     status: "New",
//     replies: [],
//   },
//   {
//     id: 2,
//     customer: "Ayesha Khan",
//     code: "ENQ-202",
//     date: "2026-10-16",
//     material: "DG Cement (OPC)",
//     message: "Cement fresh hai? Manufacturing date kya hai?",
//     status: "Responded",
//     replies: [{ id: 1, text: "Ji bilkul, is mahine ka stock hai." }],
//   },
//   {
//     id: 3,
//     customer: "Kashif Mehmood",
//     code: "ENQ-203",
//     date: "2026-10-14",
//     material: "Saria 12mm (Grade 60)",
//     message: "Saria dobara kab available hoga?",
//     status: "New",
//     replies: [],
//   },
// ];

// // Status chip ke rang (screenshot ke mutabiq)
// const BM_CHIP_COLORS = {
//   New: "bg-orange-100 text-orange-500",
//   Responded: "bg-green-100 text-green-600",
//   Closed: "bg-gray-200 text-gray-600",
// };

// export default function SupplierEnquiriesPage() {
//   // ===== State =====
//   const [enquiries, setEnquiries] = useState(BM_START_ENQUIRIES);
//   const [activeTab, setActiveTab] = useState("All");
//   const [drafts, setDrafts] = useState({}); // { enquiryId: "likha hua reply" }

//   // ===== Tab filter: All = sab, warna sirf us status wali chats =====
//   const visibleEnquiries = enquiries.filter(
//     (item) => activeTab === "All" || item.status === activeTab
//   );

//   // ===== Handlers =====
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleStatusChange = (id, newStatus) => {
//     setEnquiries(
//       enquiries.map((item) =>
//         item.id === id ? { ...item, status: newStatus } : item
//       )
//     );
//   };

//   const handleDraftChange = (id, text) => {
//     setDrafts({ ...drafts, [id]: text });
//   };

//   // Reply button: reply save karo, status Responded karo (Closed ho to Closed hi rahe)
//   const handleReplySubmit = (e, id) => {
//     e.preventDefault();

//     const text = (drafts[id] || "").trim();
//     if (!text) return;

//     setEnquiries(
//       enquiries.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               status: item.status === "Closed" ? "Closed" : "Responded",
//               replies: [...item.replies, { id: Date.now(), text }],
//             }
//           : item
//       )
//     );

//     setDrafts({ ...drafts, [id]: "" });
//   };

//   return (
//     <main className="bmEnquiries-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       {/* ----- Heading ----- */}
//       <h1 className="bmEnquiries-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//         Customer Enquiries
//       </h1>
//       <p className="bmEnquiries-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
//         Order se pehle customers ke sawalat. Enquiry se order automatically
//         create nahi hota.
//       </p>

//       {/* ----- Tabs ----- */}
//       <div className="bmEnquiries-tabs mt-6 flex flex-wrap gap-2">
//         {BM_TABS.map((tab) => (
//           <button
//             key={tab}
//             type="button"
//             onClick={() => handleTabClick(tab)}
//             className={`bmEnquiries-tabBtn cursor-pointer rounded-full border px-4 py-1.5 text-xs font-[family-name:Poppins-Medium] transition-colors duration-300 sm:text-sm ${
//               activeTab === tab
//                 ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
//                 : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ----- Enquiry list ----- */}
//       <div className="bmEnquiries-list mt-6 flex flex-col gap-5">
//         {visibleEnquiries.map((item) => (
//           <form
//             key={item.id}
//             onSubmit={(e) => handleReplySubmit(e, item.id)}
//             className="bmEnquiries-card min-w-0 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5"
//           >
//             {/* Upar: naam, code, date, material (left) + status chip + dropdown (right) */}
//             <div className="bmEnquiries-top flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//               <div className="min-w-0">
//                 <p className="break-words text-[color:var(--primary-text)]">
//                   <span className="font-[family-name:Poppins-Medium] text-lg">
//                     {item.customer}
//                   </span>
//                   <span className="text-xs text-[color:var(--secondary-text)]">
//                     {" "}
//                     · {item.code} · {item.date}
//                   </span>
//                 </p>
//                 <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
//                   Related Material:{" "}
//                   <span className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                     {item.material}
//                   </span>
//                 </p>
//               </div>

//               <div className="bmEnquiries-statusBox flex shrink-0 items-center gap-3">
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${
//                     BM_CHIP_COLORS[item.status]
//                   }`}
//                 >
//                   {item.status}
//                 </span>

//                 <select
//                   value={item.status}
//                   onChange={(e) => handleStatusChange(item.id, e.target.value)}
//                   aria-label="Change enquiry status"
//                   className="bmEnquiries-select cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
//                 >
//                   {BM_STATUSES.map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Customer ka sawal */}
//             <p className="bmEnquiries-message mt-4 break-words rounded-md bg-gray-200/70 px-4 py-3 text-sm text-[color:var(--primary-text)] sm:text-base">
//               &ldquo;{item.message}&rdquo;
//             </p>

//             {/* Supplier ke replies: halka yellow box + yellow left line */}
//             {item.replies.map((reply) => (
//               <p
//                 key={reply.id}
//                 className="bmEnquiries-reply mt-3 ml-0 break-words rounded-md border-l-4 border-[color:var(--primary-yellow)] bg-yellow-50 px-4 py-3 text-sm text-[color:var(--primary-text)] sm:ml-3 sm:text-base"
//               >
//                 <span className="font-[family-name:Poppins-Medium]">
//                   Aapka reply:
//                 </span>{" "}
//                 {reply.text}
//               </p>
//             ))}

//             {/* Reply form */}
//             <div className="bmEnquiries-replyRow mt-4 flex gap-3">
//               <input
//                 type="text"
//                 value={drafts[item.id] || ""}
//                 onChange={(e) => handleDraftChange(item.id, e.target.value)}
//                 placeholder="Reply likhein..."
//                 className="bmEnquiries-input min-h-11 w-full min-w-0 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
//               />
//               <button
//                 type="submit"
//                 className="bmEnquiries-replyBtn shrink-0 cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] sm:px-7"
//               >
//                 Reply
//               </button>
//             </div>
//           </form>
//         ))}

//         {/* Khali tab */}
//         {visibleEnquiries.length === 0 && (
//           <div className="bmEnquiries-empty rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-8 text-center text-sm text-[color:var(--secondary-text)]">
//             Is tab mein koi enquiry nahi hai.
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }








"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, MessageSquare, Search, Send } from "lucide-react";

/* ============================================================
   DEMO DATA (sab chat aur naam sirf UI ke liye hain)
   from: me (supplier), customer, admin, event (beech wali line)
   ============================================================ */

const startInquiries = [
  {
    id: 1, token: "BM-INQ-1001", customer: "Ahmed Raza", material: "Red Clay Bricks (A-Class)", date: "Nov 3", status: "Replied",
    messages: [
      { id: 1, from: "customer", text: "Hello, please confirm the price and stock of Red Clay Bricks (A-Class). I need delivery to Model Town, Gujranwala.", time: "Oct 28, 10:15 AM" },
      { id: 2, from: "me", text: "Hello! The price is Rs 16,500 per 1,000 bricks and stock is available. Delivery to Model Town is possible within 2 days.", time: "Oct 28, 11:40 AM" },
      { id: 3, from: "customer", text: "The bricks I received are cracked and not A-Class as listed. Please replace them.", time: "Nov 3, 12:05 PM" },
    ],
  },
  {
    id: 2, token: "BM-INQ-1002", customer: "Sana Malik", material: "Ravi Sand (Rait)", date: "Nov 2", status: "Pending",
    messages: [{ id: 1, from: "customer", text: "Is Ravi Sand (Rait) available for delivery this week?", time: "Nov 2, 4:20 PM" }],
  },
  {
    id: 3, token: "BM-INQ-1003", customer: "Bilal Khan", material: "Steel Saria Grade 60", date: "Oct 31", status: "Replied",
    messages: [
      { id: 1, from: "customer", text: "Please share your current rate for 16mm and 12mm bars.", time: "Oct 31, 9:30 AM" },
      { id: 2, from: "me", text: "16mm: Rs 270 per kg, 12mm: Rs 275 per kg. Stock is available.", time: "Oct 31, 10:10 AM" },
    ],
  },
  {
    id: 4, token: "BM-INQ-1004", customer: "Hina Malik", material: "Porcelain Floor Tiles", date: "Oct 29", status: "With Admin",
    messages: [
      { id: 1, from: "customer", text: "Which sizes of porcelain floor tiles do you have?", time: "Oct 29, 11:00 AM" },
      { id: 2, from: "me", text: "Available in 3 sizes. Samples can be seen at our shop on GT Road.", time: "Oct 29, 12:15 PM" },
      { id: 3, from: "customer", text: "The sample does not match your listing photos.", time: "Oct 30, 10:00 AM" },
      { id: 4, from: "event", text: "Customer forwarded this chat to Admin", time: "Oct 30, 10:30 AM" },
      { id: 5, from: "admin", text: "We are reviewing this conversation. Please keep the listing details ready.", time: "Oct 30, 2:00 PM" },
    ],
  },
  {
    id: 5, token: "BM-INQ-1005", customer: "Usman Ali", material: "Gold Emulsion Paint", date: "Oct 27", status: "Pending",
    messages: [{ id: 1, from: "customer", text: "Do you have Gold Emulsion Paint in 20L buckets?", time: "Oct 27, 2:45 PM" }],
  },
  {
    id: 6, token: "BM-INQ-1006", customer: "Farah Naz", material: "Aluminium Sliding Window", date: "Oct 22", status: "Closed",
    messages: [
      { id: 1, from: "customer", text: "Can you make a custom size sliding window?", time: "Oct 22, 10:00 AM" },
      { id: 2, from: "me", text: "Yes, custom sizes are possible. Please share the measurements.", time: "Oct 22, 11:30 AM" },
      { id: 3, from: "event", text: "Customer closed this inquiry", time: "Oct 22, 6:00 PM" },
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
  customer: "self-start rounded-bl-sm border-[#E2E4E7] bg-white",
  admin: "self-start rounded-bl-sm border-[#B7CDF5] bg-blue-50",
};
const senderName = { me: "You", customer: "", admin: "Admin · BuildMart" };

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
          placeholder="Search customer, material or token"
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

      {items.map(({ id, token, customer, material, date, status, messages }) => {
        const last = messages.reduce((found, m) => (m.from === "event" ? found : m), messages[0]);
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
                {customer[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-[#202124]">{customer}</span>
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

const ChatPanel = ({ inquiry, draft, onDraft, onSend, onBack, hidden }) => {
  const endRef = useRef(null);

  // Nayi message par chat neeche tak scroll ho jati hai
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [inquiry.id, inquiry.messages.length]);

  const closed = inquiry.status === "Closed";

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
          {inquiry.customer[0]}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#202124]">{inquiry.customer}</p>
          <p className="truncate text-xs text-[#45484D]">
            {inquiry.material} · <span className="font-semibold text-[#384452]">Token {inquiry.token}</span>
          </p>
        </div>

        <span className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:inline ${statusClass[inquiry.status]}`}>{inquiry.status}</span>

        <Link
          href="/supplier/disputes"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#FDC716] px-3 text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
        >
          <AlertTriangle size={14} aria-hidden="true" />
          Raise a Dispute
        </Link>
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

const SupplierInquiriesPage = () => {
  const [inquiries, setInquiries] = useState(startInquiries);
  const [selectedId, setSelectedId] = useState(1);
  const [showChat, setShowChat] = useState(false); // mobile par chat khuli hai ya list
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");

  const text = query.trim().toLowerCase();
  const visible = inquiries.reduce((all, i) => {
    const matchTab = tab === "All" || i.status === tab;
    const matchText = !text || `${i.customer} ${i.material} ${i.token}`.toLowerCase().includes(text);
    return matchTab && matchText ? [...all, i] : all;
  }, []);
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
    // Supplier jawab de to Pending inquiry "Replied" ho jati hai
    addMessage({ from: "me", text: message, time: "Just now" }, current.status === "Pending" ? "Replied" : undefined);
    setDraft("");
  };

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

export default SupplierInquiriesPage;