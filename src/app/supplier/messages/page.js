// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ArrowLeft, Package, Send } from "lucide-react";

// // ========== DATA ==========
// // Har conversation ka unique id. messages mein from: "customer" ya "me".
// const BM_START_CHATS = [
//   {
//     id: 1,
//     name: "Ali Raza",
//     order: "BM-ORD-1001",
//     unread: 0,
//     messages: [
//       { id: 1, from: "customer", text: "Assalam o Alaikum, mera order kab tak pohanch jayega?", time: "Oct 17, 10:12 AM" },
//       { id: 2, from: "me", text: "Walaikum Salam! Rider nikal chuka hai, 1 ghante mein pohanch jayega.", time: "Oct 17, 10:20 AM" },
//       { id: 3, from: "customer", text: "Theek hai. Gate ke andar unload ho sakega?", time: "Oct 17, 10:31 AM" },
//       { id: 4, from: "customer", text: "Aur bill bhi saath bhej dein please.", time: "Oct 17, 10:32 AM" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Sana Tariq",
//     order: "BM-ORD-1002",
//     unread: 1,
//     messages: [
//       { id: 1, from: "customer", text: "Payment bhej di hai, screenshot check kar lein.", time: "Oct 17, 09:05 AM" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Bilal Ahmed",
//     order: "BM-ORD-1003",
//     unread: 0,
//     messages: [
//       { id: 1, from: "me", text: "Order deliver ho gaya hai, shukriya!", time: "Oct 16, 05:40 PM" },
//       { id: 2, from: "customer", text: "Khushi hui, review zaroor dijiye ga.", time: "Oct 16, 06:02 PM" },
//     ],
//   },
// ];

// // Demo: supplier ke message ke baad customer ka nakli jawab
// const BM_DEMO_REPLY = "Ji theek hai, shukriya!";

// // Abhi ka waqt "Oct 17, 10:32 AM" jaise format mein
// const bmNow = () =>
//   new Date().toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

// export default function SupplierMessagesPage() {
//   // ===== State =====
//   const [chats, setChats] = useState(BM_START_CHATS);
//   const [selectedId, setSelectedId] = useState(1);
//   const [showChat, setShowChat] = useState(false); // sirf mobile ke liye: list ya chat
//   const [text, setText] = useState("");
//   const bottomRef = useRef(null);

//   // Jo chat khuli hai
//   const selectedChat = chats.find((chat) => chat.id === selectedId);

//   // Nayi message aane par neeche tak scroll
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [selectedChat.messages.length, selectedId]);

//   // ===== Handlers =====

//   // List mein kisi customer par click: chat kholo, unread khatam
//   const handleSelectChat = (id) => {
//     setSelectedId(id);
//     setShowChat(true);
//     setChats(chats.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)));
//   };

//   // Mobile par wapas list par
//   const handleBack = () => {
//     setShowChat(false);
//   };

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   // Message bhejna
//   const handleSend = (e) => {
//     e.preventDefault();

//     const message = text.trim();
//     if (!message) return;

//     const chatId = selectedId;

//     // 1) Supplier ka message
//     setChats((prev) =>
//       prev.map((chat) =>
//         chat.id === chatId
//           ? { ...chat, messages: [...chat.messages, { id: Date.now(), from: "me", text: message, time: bmNow() }] }
//           : chat
//       )
//     );
//     setText("");

//     // 2) Demo: 1.5 second baad customer ka jawab
//     setTimeout(() => {
//       setChats((prev) =>
//         prev.map((chat) =>
//           chat.id === chatId
//             ? { ...chat, messages: [...chat.messages, { id: Date.now() + 1, from: "customer", text: BM_DEMO_REPLY, time: bmNow() }] }
//             : chat
//         )
//       );
//     }, 1500);
//   };

//   return (
//     <main className="bmMessages-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       <h1 className="bmMessages-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//         Messages
//       </h1>
//       <p className="bmMessages-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
//         Customers ke saath order-linked conversations (demo — simulated replies)
//       </p>

//       {/* Mobile: list ya chat (aik waqt mein aik). Laptop (lg): dono saath */}
//       <div className="bmMessages-box mt-6 grid h-[75vh] min-h-[480px] grid-cols-1 overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm lg:grid-cols-[280px_minmax(0,1fr)]">
//         {/* ================= LEFT: customers ki list ================= */}
//         <aside
//           className={`bmMessages-list min-h-0 flex-col overflow-y-auto border-r border-[color:var(--border-color)] ${
//             showChat ? "hidden" : "flex"
//           } lg:flex`}
//         >
//           {chats.map((chat) => {
//             const lastMessage = chat.messages[chat.messages.length - 1];
//             const isActive = chat.id === selectedId;

//             return (
//               <button
//                 key={chat.id}
//                 type="button"
//                 onClick={() => handleSelectChat(chat.id)}
//                 className={`bmMessages-item flex w-full cursor-pointer items-center gap-3 border-b border-[color:var(--border-color)] px-4 py-3 text-left transition-colors duration-300 ${
//                   isActive ? "bg-yellow-50" : "bg-[var(--white-cards)] hover:bg-[var(--off-white-background)]"
//                 }`}
//               >
//                 {/* Avatar */}
//                 <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--border-color)] font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                   {chat.name.charAt(0)}
//                 </span>

//                 <span className="min-w-0 flex-1">
//                   <span className="block truncate font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                     {chat.name}
//                   </span>
//                   <span className="block truncate text-xs text-[color:var(--secondary-text)]">
//                     Order · {chat.order}
//                   </span>
//                   <span className="block truncate text-xs text-[color:var(--secondary-text)]">
//                     {lastMessage.text}
//                   </span>
//                 </span>

//                 {/* Unread badge */}
//                 {chat.unread > 0 && (
//                   <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-yellow)] text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                     {chat.unread}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </aside>

//         {/* ================= RIGHT: chat ================= */}
//         <section
//           className={`bmMessages-chat min-h-0 min-w-0 flex-col ${
//             showChat ? "flex" : "hidden"
//           } lg:flex`}
//         >
//           {/* Dark header: naam + order chip */}
//           <div className="bmMessages-header flex items-center justify-between gap-3 bg-[var(--charcoal-black)] px-4 py-3 sm:px-5">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 aria-label="Back to conversations"
//                 className="cursor-pointer text-[color:var(--white-cards)] lg:hidden"
//               >
//                 <ArrowLeft size={20} />
//               </button>
//               <h2 className="truncate text-lg text-[color:var(--white-cards)]">
//                 {selectedChat.name}
//               </h2>
//             </div>

//             <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//               <Package size={13} />
//               {selectedChat.order}
//             </span>
//           </div>

//           {/* Messages */}
//           <div className="bmMessages-body flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[var(--off-white-background)] p-4 sm:p-5">
//             {selectedChat.messages.map((msg) => {
//               const isMe = msg.from === "me";

//               return (
//                 <div
//                   key={msg.id}
//                   className={`bmMessages-bubble max-w-[85%] break-words rounded-md px-4 py-3 sm:max-w-[70%] ${
//                     isMe
//                       ? "self-end bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
//                       : "self-start border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//                   }`}
//                 >
//                   <p className="text-sm sm:text-base">{msg.text}</p>
//                   <p className="mt-1 text-[10px] text-[color:var(--secondary-text)]">
//                     {msg.time}
//                   </p>
//                 </div>
//               );
//             })}
//             <div ref={bottomRef} />
//           </div>

//           {/* Message likhne ka form */}
//           <form
//             onSubmit={handleSend}
//             className="bmMessages-form flex gap-3 border-t border-[color:var(--border-color)] bg-[var(--off-white-background)] p-3 sm:p-4"
//           >
//             <input
//               type="text"
//               value={text}
//               onChange={handleTextChange}
//               placeholder="Message likhein..."
//               className="bmMessages-input min-h-11 w-full min-w-0 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
//             />
//             <button
//               type="submit"
//               aria-label="Send message"
//               className="bmMessages-sendBtn flex h-11 w-12 shrink-0 cursor-pointer items-center justify-center rounded-md bg-[var(--primary-yellow)] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
//             >
//               <Send size={18} />
//             </button>
//           </form>
//         </section>
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Package, Send } from "lucide-react";

// ========== DATA ==========
// Har conversation ka unique id. messages mein from: "customer" ya "me".
const BM_START_CHATS = [
  {
    id: 1,
    name: "Ali Raza",
    order: "BM-ORD-1001",
    unread: 0,
    messages: [
      { id: 1, from: "customer", text: "Assalam o Alaikum, mera order kab tak pohanch jayega?", time: "Oct 17, 10:12 AM" },
      { id: 2, from: "me", text: "Walaikum Salam! Rider nikal chuka hai, 1 ghante mein pohanch jayega.", time: "Oct 17, 10:20 AM" },
      { id: 3, from: "customer", text: "Theek hai. Gate ke andar unload ho sakega?", time: "Oct 17, 10:31 AM" },
      { id: 4, from: "customer", text: "Aur bill bhi saath bhej dein please.", time: "Oct 17, 10:32 AM" },
    ],
  },
  {
    id: 2,
    name: "Sana Tariq",
    order: "BM-ORD-1002",
    unread: 1,
    messages: [
      { id: 1, from: "customer", text: "Payment bhej di hai, screenshot check kar lein.", time: "Oct 17, 09:05 AM" },
    ],
  },
  {
    id: 3,
    name: "Bilal Ahmed",
    order: "BM-ORD-1003",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Order deliver ho gaya hai, shukriya!", time: "Oct 16, 05:40 PM" },
      { id: 2, from: "customer", text: "Khushi hui, review zaroor dijiye ga.", time: "Oct 16, 06:02 PM" },
    ],
  },
];

// Demo: supplier ke message ke baad customer ka nakli jawab
const BM_DEMO_REPLY = "Ji theek hai, shukriya!";

// Abhi ka waqt "Oct 17, 10:32 AM" jaise format mein
const bmNow = () =>
  new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function SupplierMessagesPage() {
  // ===== State =====
  const [chats, setChats] = useState(BM_START_CHATS);
  const [selectedId, setSelectedId] = useState(1);
  const [showChat, setShowChat] = useState(false); // sirf mobile ke liye: list ya chat
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Jo chat khuli hai
  const selectedChat = chats.find((chat) => chat.id === selectedId);

  // NAYA: Reused page se aaye to us customer ki chat kholo (na ho to nayi chat banao)
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("customer");
    if (!name) return;

    const existing = BM_START_CHATS.find((chat) => chat.name === name);
    const id = existing ? existing.id : `reused-${name}`;

    // Nayi chat sirf tab banao jab pehle se na ho
    setChats((prev) =>
      prev.some((chat) => chat.id === id)
        ? prev
        : [{ id, name, order: "Reused Listing", unread: 0, messages: [] }, ...prev]
    );
    setSelectedId(id);
    setShowChat(true);
  }, []);

  // Nayi message aane par neeche tak scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages.length, selectedId]);

  // ===== Handlers =====

  // List mein kisi customer par click: chat kholo, unread khatam
  const handleSelectChat = (id) => {
    setSelectedId(id);
    setShowChat(true);
    setChats(chats.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)));
  };

  // Mobile par wapas list par
  const handleBack = () => {
    setShowChat(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Message bhejna
  const handleSend = (e) => {
    e.preventDefault();

    const message = text.trim();
    if (!message) return;

    const chatId = selectedId;

    // 1) Supplier ka message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { id: Date.now(), from: "me", text: message, time: bmNow() }] }
          : chat
      )
    );
    setText("");

    // 2) Demo: 1.5 second baad customer ka jawab
    setTimeout(() => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, { id: Date.now() + 1, from: "customer", text: BM_DEMO_REPLY, time: bmNow() }] }
            : chat
        )
      );
    }, 1500);
  };

  return (
    <main className="bmMessages-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="bmMessages-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        Messages
      </h1>
      <p className="bmMessages-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
        Customers ke saath order-linked conversations (demo — simulated replies)
      </p>

      {/* Mobile: list ya chat (aik waqt mein aik). Laptop (lg): dono saath */}
      <div className="bmMessages-box mt-6 grid h-[75vh] min-h-[480px] grid-cols-1 overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* ================= LEFT: customers ki list ================= */}
        <aside
          className={`bmMessages-list min-h-0 flex-col overflow-y-auto border-r border-[color:var(--border-color)] ${
            showChat ? "hidden" : "flex"
          } lg:flex`}
        >
          {chats.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            // NAYA: nayi chat mein abhi koi message nahi hota
            const lastText = lastMessage ? lastMessage.text : "Nayi conversation";
            const isActive = chat.id === selectedId;

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => handleSelectChat(chat.id)}
                className={`bmMessages-item flex w-full cursor-pointer items-center gap-3 border-b border-[color:var(--border-color)] px-4 py-3 text-left transition-colors duration-300 ${
                  isActive ? "bg-yellow-50" : "bg-[var(--white-cards)] hover:bg-[var(--off-white-background)]"
                }`}
              >
                {/* Avatar */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--border-color)] font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  {chat.name.charAt(0)}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                    {chat.name}
                  </span>
                  <span className="block truncate text-xs text-[color:var(--secondary-text)]">
                    Order · {chat.order}
                  </span>
                  <span className="block truncate text-xs text-[color:var(--secondary-text)]">
                    {lastText}
                  </span>
                </span>

                {/* Unread badge */}
                {chat.unread > 0 && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-yellow)] text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                    {chat.unread}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* ================= RIGHT: chat ================= */}
        <section
          className={`bmMessages-chat min-h-0 min-w-0 flex-col ${
            showChat ? "flex" : "hidden"
          } lg:flex`}
        >
          {/* Dark header: naam + order chip */}
          <div className="bmMessages-header flex items-center justify-between gap-3 bg-[var(--charcoal-black)] px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back to conversations"
                className="cursor-pointer text-[color:var(--white-cards)] lg:hidden"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="truncate text-lg text-[color:var(--white-cards)]">
                {selectedChat.name}
              </h2>
            </div>

            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
              <Package size={13} />
              {selectedChat.order}
            </span>
          </div>

          {/* Messages */}
          <div className="bmMessages-body flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[var(--off-white-background)] p-4 sm:p-5">
            {selectedChat.messages.map((msg) => {
              const isMe = msg.from === "me";

              return (
                <div
                  key={msg.id}
                  className={`bmMessages-bubble max-w-[85%] break-words rounded-md px-4 py-3 sm:max-w-[70%] ${
                    isMe
                      ? "self-end bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
                      : "self-start border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
                  }`}
                >
                  <p className="text-sm sm:text-base">{msg.text}</p>
                  <p className="mt-1 text-[10px] text-[color:var(--secondary-text)]">
                    {msg.time}
                  </p>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Message likhne ka form */}
          <form
            onSubmit={handleSend}
            className="bmMessages-form flex gap-3 border-t border-[color:var(--border-color)] bg-[var(--off-white-background)] p-3 sm:p-4"
          >
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Message likhein..."
              className="bmMessages-input min-h-11 w-full min-w-0 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="bmMessages-sendBtn flex h-11 w-12 shrink-0 cursor-pointer items-center justify-center rounded-md bg-[var(--primary-yellow)] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}