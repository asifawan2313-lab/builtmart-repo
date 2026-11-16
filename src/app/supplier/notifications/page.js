// "use client";

// import { useState } from "react";
// import { Bell, Check, CheckCheck, FileWarning, MessageSquare, Package, ShieldCheck, Star, Trash2, Wallet } from "lucide-react";

// /* ============================================================
//    DATA (demo)
//    ============================================================ */

// // Har type ka icon
// const typeIcon = { order: Package, inquiry: MessageSquare, dispute: FileWarning, wallet: Wallet, review: Star, verification: ShieldCheck };

// const startNotifications = [
//   { id: 1, type: "order", title: "New order BM-ORD-1008 received", text: "Confirm the order and prepare it for dispatch.", time: "1 hour ago", read: false },
//   { id: 2, type: "inquiry", title: "New inquiry BM-INQ-1007 from a customer", text: "Open the chat to read and reply.", time: "3 hours ago", read: false },
//   { id: 3, type: "dispute", title: "Dispute DSP-3004 is under review", text: "Admin has asked the rider for a reply.", time: "Yesterday", read: false },
//   { id: 4, type: "wallet", title: "Top-up TX-5006 approved", text: "Rs 10,000 has been added to your wallet.", time: "Yesterday", read: true },
//   { id: 5, type: "review", title: "New 5-star review received", text: "A customer rated your shop on order BM-ORD-1005.", time: "2 days ago", read: true },
//   { id: 6, type: "dispute", title: "Dispute DSP-3002 has been resolved", text: "Resolved in favour of the supplier.", time: "3 days ago", read: true },
//   { id: 7, type: "verification", title: "Verification request under review", text: "Admin is checking your documents.", time: "4 days ago", read: true },
// ];

// const tabs = ["All", "Unread"];

// const actionBtn =
//   "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#D9E3E9] bg-white px-4 text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#D9E3E9] disabled:hover:bg-white";

// // Har notification ke right side ke chhote icon buttons
// const iconBtn =
//   "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#D9E3E9] bg-white text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#D9E3E9] disabled:hover:bg-white";

// /* ============================================================
//    PAGE
//    ============================================================ */

// const SupplierNotificationsPage = () => {
//   const [items, setItems] = useState(startNotifications);
//   const [tab, setTab] = useState("All");

//   const unreadCount = items.reduce((n, item) => (item.read ? n : n + 1), 0);
//   const visible = tab === "Unread" ? items.reduce((all, n) => (n.read ? all : [...all, n]), []) : items;

//   const handleRead = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
//   const handleReadAll = () => setItems((list) => list.map((n) => ({ ...n, read: true })));
//   const handleDelete = (id) => setItems((list) => list.reduce((all, n) => (n.id === id ? all : [...all, n]), []));
//   const handleDeleteAll = () => setItems([]);

//   return (
//     <main className="p-4 sm:p-6 lg:p-8">
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Notifications</h1>
//         <div className="flex flex-wrap gap-3">
//           <button type="button" onClick={handleReadAll} disabled={unreadCount === 0} className={actionBtn}>
//             <CheckCheck size={16} aria-hidden="true" />
//             Mark All Read
//           </button>
//           <button type="button" onClick={handleDeleteAll} disabled={items.length === 0} className={actionBtn}>
//             <Trash2 size={16} aria-hidden="true" />
//             Delete All
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="mt-5 flex flex-wrap gap-2">
//         {tabs.map((name) => {
//           const active = tab === name;
//           return (
//             <button
//               key={name}
//               type="button"
//               onClick={() => setTab(name)}
//               className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
//                 active ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
//               }`}
//             >
//               {name}
//               <span className={`min-w-5 rounded-full px-1.5 text-[11px] leading-5 ${active ? "bg-white" : "bg-[#F4F4F2]"}`}>
//                 {name === "All" ? items.length : unreadCount}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//       {/* List */}
//       {visible.length === 0 ? (
//         <section className="mt-4 rounded-xl border-2 border-dashed border-[#D9E3E9] bg-white px-4 py-12 text-center text-sm text-[#45484D]">
//           No notifications yet.
//         </section>
//       ) : (
//         <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
//           {visible.map(({ id, type, title, text, time, read }) => {
//             const Icon = typeIcon[type] || Bell;
//             return (
//               <div
//                 key={id}
//                 className={`flex items-start gap-2 border-t border-[#E2E4E7] px-4 py-4 transition-colors first:border-t-0 hover:bg-[#F4F4F2] sm:px-5 ${
//                   read ? "bg-white" : "bg-[#FDC716]/10"
//                 }`}
//               >
//                 {/* Click karne se sirf read hoti hai, koi page nahi khulta */}
//                 <button type="button" onClick={() => handleRead(id)} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left">
//                   <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
//                     <Icon size={18} aria-hidden="true" />
//                   </span>
//                   <div className="min-w-0 flex-1">
//                     <p className={`text-sm text-[#202124] ${read ? "font-medium" : "font-bold"}`}>{title}</p>
//                     <p className="mt-0.5 text-xs text-[#45484D]">{text}</p>
//                     <p className="mt-1 text-[11px] text-[#45484D]">{time}</p>
//                   </div>
//                   {!read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FDC716]" aria-label="Unread" />}
//                 </button>

//                 {/* Is notification ke liye read aur delete */}
//                 <div className="flex shrink-0 gap-1.5">
//                   <button
//                     type="button"
//                     onClick={() => handleRead(id)}
//                     disabled={read}
//                     aria-label="Mark as read"
//                     title="Mark as read"
//                     className={iconBtn}
//                   >
//                     <Check size={15} aria-hidden="true" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleDelete(id)}
//                     aria-label="Delete notification"
//                     title="Delete"
//                     className={iconBtn}
//                   >
//                     <Trash2 size={15} aria-hidden="true" />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </section>
//       )}
//     </main>
//   );
// };

// export default SupplierNotificationsPage;

"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  FileWarning,
  MessageSquare,
  Package,
  ShieldCheck,
  Star,
  Trash2,
  Wallet,
} from "lucide-react";

import BmNotificationlist from "../../../component/supplier/Notification/BmNotificationlist.js";
/* ============================================================
   DATA (demo)
   ============================================================ */

// Har type ka icon
const typeIcon = {
  order: Package,
  inquiry: MessageSquare,
  dispute: FileWarning,
  wallet: Wallet,
  review: Star,
  verification: ShieldCheck,
};

const startNotifications = [
  {
    id: 1,
    type: "order",
    title: "New order BM-ORD-1008 received",
    text: "Confirm the order and prepare it for dispatch.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    type: "inquiry",
    title: "New inquiry BM-INQ-1007 from a customer",
    text: "Open the chat to read and reply.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "dispute",
    title: "Dispute DSP-3004 is under review",
    text: "Admin has asked the rider for a reply.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    type: "wallet",
    title: "Top-up TX-5006 approved",
    text: "Rs 10,000 has been added to your wallet.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "review",
    title: "New 5-star review received",
    text: "A customer rated your shop on order BM-ORD-1005.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    type: "dispute",
    title: "Dispute DSP-3002 has been resolved",
    text: "Resolved in favour of the supplier.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 7,
    type: "verification",
    title: "Verification request under review",
    text: "Admin is checking your documents.",
    time: "4 days ago",
    read: true,
  },
];

const tabs = ["All", "Unread", "Read"];

const actionBtn =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#D9E3E9] bg-white px-4 text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#D9E3E9] disabled:hover:bg-white";

// Har notification ke right side ke chhote icon buttons
const iconBtn =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#D9E3E9] bg-white text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#D9E3E9] disabled:hover:bg-white";

/* ============================================================
   PAGE
   ============================================================ */

const SupplierNotificationsPage = () => {
  const [items, setItems] = useState(startNotifications);
  const [tab, setTab] = useState("All");

  const unreadCount = items.reduce((n, item) => (item.read ? n : n + 1), 0);
  const counts = {
    All: items.length,
    Unread: unreadCount,
    Read: items.length - unreadCount,
  };
  const visible = items.reduce((all, n) => {
    const match = tab === "All" || (tab === "Unread" ? !n.read : n.read);
    return match ? [...all, n] : all;
  }, []);

  const handleRead = (id) =>
    setItems((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  const handleReadAll = () =>
    setItems((list) => list.map((n) => ({ ...n, read: true })));
  const handleDelete = (id) =>
    setItems((list) =>
      list.reduce((all, n) => (n.id === id ? all : [...all, n]), []),
    );
  const handleDeleteAll = () => setItems([]);

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">
          Notifications
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReadAll}
            disabled={unreadCount === 0}
            className={actionBtn}
          >
            <CheckCheck size={16} aria-hidden="true" />
            Mark All Read
          </button>
          <button
            type="button"
            onClick={handleDeleteAll}
            disabled={items.length === 0}
            className={actionBtn}
          >
            <Trash2 size={16} aria-hidden="true" />
            Delete All
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((name) => {
          const active = tab === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setTab(name)}
              className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                active
                  ? "border-[#FDC716] bg-[#FDC716]"
                  : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
              }`}
            >
              {name}
              <span
                className={`min-w-5 rounded-full px-1.5 text-[11px] leading-5 ${active ? "bg-white" : "bg-[#F4F4F2]"}`}
              >
                {counts[name]}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {visible.length === 0 ? (
        <section className="mt-4 rounded-xl border-2 border-dashed border-[#D9E3E9] bg-white px-4 py-12 text-center text-sm text-[#45484D]">
          {tab === "All"
            ? "No notifications yet."
            : `No ${tab.toLowerCase()} notifications.`}
        </section>
      ) : (
        <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
          {/* {visible.map(({ id, type, title, text, time, read }) => */}
          {visible.map((notification) => {
            const Icon = typeIcon[notification.type] || Bell;
            return (
              <BmNotificationlist
                key={notification.id}
                notification={notification}
                Icon={Icon}
                onRead={() => handleRead(notification.id)}
                onDelete={() => handleDelete(notification.id)}
                iconBtn={iconBtn}
              />
            );
            // <div
            //   key={id}
            //   className={`flex items-start gap-2 border-t border-[#E2E4E7] px-4 py-4 transition-colors first:border-t-0 hover:bg-[#F4F4F2] sm:px-5 ${
            //     read ? "bg-white" : "bg-[#FDC716]/10"
            //   }`}
            // >
            //   {/* Click karne se sirf read hoti hai, koi page nahi khulta */}
            //   <button type="button" onClick={() => handleRead(id)} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left">
            //     <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
            //       <Icon size={18} aria-hidden="true" />
            //     </span>
            //     <div className="min-w-0 flex-1">
            //       <p className={`text-sm text-[#202124] ${read ? "font-medium" : "font-bold"}`}>{title}</p>
            //       <p className="mt-0.5 text-xs text-[#45484D]">{text}</p>
            //       <p className="mt-1 text-[11px] text-[#45484D]">{time}</p>
            //     </div>
            //     {!read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FDC716]" aria-label="Unread" />}
            //   </button>

            //   {/* Is notification ke liye read aur delete */}
            //   <div className="flex shrink-0 gap-1.5">
            //     <button
            //       type="button"
            //       onClick={() => handleRead(id)}
            //       disabled={read}
            //       aria-label="Mark as read"
            //       title="Mark as read"
            //       className={iconBtn}
            //     >
            //       <Check size={15} aria-hidden="true" />
            //     </button>
            //     <button
            //       type="button"
            //       onClick={() => handleDelete(id)}
            //       aria-label="Delete notification"
            //       title="Delete"
            //       className={iconBtn}
            //     >
            //       <Trash2 size={15} aria-hidden="true" />
            //     </button>
            //   </div>
            // </div>
          })}
        </section>
      )}
    </main>
  );
};

export default SupplierNotificationsPage;
