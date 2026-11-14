// "use client";

// import { useState } from "react";
// import { CheckCheck, CheckCircle2, Send } from "lucide-react";

// import BmSupplierNotificationList from "../../../component/supplier/Bmnotificationlist.js";

// // ========== DATA ==========
// const BM_TABS = ["Send New Notification", "Received Notifications"];

// // Admin se aayi hui notifications. type: approved / rejected / status / announcement / verification
// const BM_START_NOTIFICATIONS = [
//   {
//     id: 1,
//     type: "approved",
//     title: "Supplier Profile Approved",
//     message: "Mubarak! Aap ka supplier profile approve ho gaya hai. Ab aap materials list kar sakte hain.",
//     date: "2026-11-02 · 10:30 AM",
//     read: false,
//   },
//   {
//     id: 2,
//     type: "rejected",
//     title: "Supplier Profile Rejected",
//     message: "Aap ka profile reject hua hai kyunke shop ki licence wazeh nahi thi. Dobara upload karein.",
//     date: "2026-11-01 · 04:15 PM",
//     read: false,
//   },
//   {
//     id: 3,
//     type: "approved",
//     title: "Material Listing Approved",
//     message: "Aap ki listing \"DG Cement (OPC)\" approve ho gayi hai aur ab public marketplace mein nazar aa rahi hai.",
//     date: "2026-11-01 · 11:05 AM",
//     read: false,
//   },
//   {
//     id: 4,
//     type: "rejected",
//     title: "Material Listing Rejected",
//     message: "\"Chenab Sand\" ki listing reject hui hai. Price aur images theek kar ke dobara submit karein.",
//     date: "2026-10-31 · 03:40 PM",
//     read: true,
//   },
//   {
//     id: 5,
//     type: "status",
//     title: "Material Status Update",
//     message: "\"A-Class Bricks\" ka status Active se Out of Stock kar diya gaya hai.",
//     date: "2026-10-30 · 09:20 AM",
//     read: true,
//   },
//   {
//     id: 6,
//     type: "announcement",
//     title: "Important Announcement",
//     message: "Is Jumma ko 2 baje se 4 baje tak platform maintenance ki wajah se band rahega.",
//     date: "2026-10-29 · 06:00 PM",
//     read: true,
//   },
//   {
//     id: 7,
//     type: "verification",
//     title: "Account Verification Update",
//     message: "Aap ke KYC documents review mein hain. Natija 2 din mein bata diya jayega.",
//     date: "2026-10-28 · 01:10 PM",
//     read: true,
//   },
// ];

// const BM_EMPTY_FORM = { subject: "", message: "" };

// export default function SupplierNotificationsPage() {
//   // ===== State =====
//   const [activeTab, setActiveTab] = useState(BM_TABS[0]);
//   const [notifications, setNotifications] = useState(BM_START_NOTIFICATIONS);
//   const [form, setForm] = useState(BM_EMPTY_FORM);
//   const [errors, setErrors] = useState({}); // { subject: "...", message: "..." }
//   const [success, setSuccess] = useState("");

//   // Kitni notifications abhi unread hain
//   const unreadCount = notifications.filter((item) => !item.read).length;

//   // ===== Handlers =====
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setSuccess("");
//   };

//   // Input likhte waqt: us field ka error hata do
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setSuccess("");
//   };

//   // Send to Admin: pehle check, phir success, phir fields clear
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!form.subject.trim()) newErrors.subject = "Subject likhna zaroori hai.";
//     if (!form.message.trim()) newErrors.message = "Message likhna zaroori hai.";

//     // Koi error ho to wahin ruk jao
//     if (newErrors.subject || newErrors.message) {
//       setErrors(newErrors);
//       setSuccess("");
//       return;
//     }

//     // Frontend mock: abhi sirf success message
//     setSuccess("Aap ki notification Admin ko bhej di gayi hai.");
//     setForm(BM_EMPTY_FORM);
//     setErrors({});
//     setTimeout(() => setSuccess(""), 4000);
//   };

//   // Aik notification par click: Read ho jaye
//   const handleRead = (id) => {
//     setNotifications(
//       notifications.map((item) => (item.id === id ? { ...item, read: true } : item))
//     );
//   };

//   // Mark All Read
//   const handleMarkAllRead = () => {
//     setNotifications(notifications.map((item) => ({ ...item, read: true })));
//   };

//   // Common classes
//   const inputClass =
//     "bmNotif-input w-full rounded-md border bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";

//   return (
//     <main className="bmNotif-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       {/* ----- Header: heading (left) + Mark All Read (right) ----- */}
//       <div className="bmNotif-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <h1 className="bmNotif-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//           Notifications
//         </h1>

//         {activeTab === BM_TABS[1] && (
//           <button
//             type="button"
//             onClick={handleMarkAllRead}
//             disabled={unreadCount === 0}
//             className="bmNotif-markAllBtn flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2.5 text-sm text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
//           >
//             <CheckCheck size={16} />
//             Mark All Read
//           </button>
//         )}
//       </div>

//       {/* ----- Tabs ----- */}
//       <div className="bmNotif-tabs mt-6 flex flex-wrap gap-2">
//         {BM_TABS.map((tab) => (
//           <button
//             key={tab}
//             type="button"
//             onClick={() => handleTabClick(tab)}
//             className={`bmNotif-tabBtn flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-xs font-[family-name:Poppins-Medium] shadow-sm transition-colors duration-300 sm:text-sm ${
//               activeTab === tab
//                 ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
//                 : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//             }`}
//           >
//             {tab}

//             {/* Received tab par unread ginti */}
//             {tab === BM_TABS[1] && unreadCount > 0 && (
//               <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--charcoal-black)] px-1.5 text-[11px] text-[color:var(--white-cards)]">
//                 {unreadCount}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* ================= TAB 1: Send New Notification (form) ================= */}
//       {activeTab === BM_TABS[0] && (
//         <section className="bmNotif-send mt-6 max-w-3xl rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-6">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Admin ko notification bhejein</h2>
//           <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
//             Notification, request ya complaint Admin tak pohanchane ke liye form bharein.
//           </p>

//           {/* Success message */}
//           {success && (
//             <div className="mt-4 flex items-center gap-2 rounded-md bg-green-100 px-4 py-3 text-sm text-green-700">
//               <CheckCircle2 size={18} className="shrink-0" />
//               {success}
//             </div>
//           )}

//           {/* noValidate: browser ka apna message nahi, hamare apne messages dikhte hain */}
//           <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
//             {/* Subject */}
//             <div>
//               <label className="mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                 Notification Subject
//               </label>
//               <input
//                 name="subject"
//                 type="text"
//                 value={form.subject}
//                 onChange={handleChange}
//                 placeholder="Masalan: Material listing approval request"
//                 className={`${inputClass} ${errors.subject ? "border-red-500" : "border-[color:var(--border-color)]"}`}
//               />
//               {errors.subject && <p className="mt-1.5 text-xs text-red-600">{errors.subject}</p>}
//             </div>

//             {/* Message */}
//             <div>
//               <label className="mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                 Notification Message
//               </label>
//               <textarea
//                 name="message"
//                 rows={5}
//                 value={form.message}
//                 onChange={handleChange}
//                 placeholder="Apna message yahan likhein..."
//                 className={`${inputClass} ${errors.message ? "border-red-500" : "border-[color:var(--border-color)]"}`}
//               />
//               {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
//             </div>

//             <button
//               type="submit"
//               className="bmNotif-sendBtn flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-6 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] sm:w-auto sm:self-start"
//             >
//               <Send size={16} />
//               Send to Admin
//             </button>
//           </form>
//         </section>
//       )}

//       {/* ================= TAB 2: Received Notifications ================= */}
//       {activeTab === BM_TABS[1] && (
//         <section className="bmNotif-received mt-6">
//           {notifications.length > 0 ? (
//             <div className="bmNotif-list flex flex-col gap-3">
//               <BmSupplierNotificationList notifications={notifications} onRead={handleRead} />
//             </div>
//           ) : (
//             <div className="rounded-lg border border-dashed border-[color:var(--border-color)] p-8 text-center text-sm text-[color:var(--secondary-text)]">
//               No notifications yet.
//             </div>
//           )}
//         </section>
//       )}
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, FileWarning, MessageSquare, Package, ShieldCheck, Star, Trash2, Wallet } from "lucide-react";

/* ============================================================
   DATA (demo)
   ============================================================ */

// Har type ka icon
const typeIcon = { order: Package, inquiry: MessageSquare, dispute: FileWarning, wallet: Wallet, review: Star, verification: ShieldCheck };

const startNotifications = [
  { id: 1, type: "order", title: "New order BM-ORD-1008 received", text: "Confirm the order and prepare it for dispatch.", time: "1 hour ago", read: false },
  { id: 2, type: "inquiry", title: "New inquiry BM-INQ-1007 from a customer", text: "Open the chat to read and reply.", time: "3 hours ago", read: false },
  { id: 3, type: "dispute", title: "Dispute DSP-3004 is under review", text: "Admin has asked the rider for a reply.", time: "Yesterday", read: false },
  { id: 4, type: "wallet", title: "Top-up TX-5006 approved", text: "Rs 10,000 has been added to your wallet.", time: "Yesterday", read: true },
  { id: 5, type: "review", title: "New 5-star review received", text: "A customer rated your shop on order BM-ORD-1005.", time: "2 days ago", read: true },
  { id: 6, type: "dispute", title: "Dispute DSP-3002 has been resolved", text: "Resolved in favour of the supplier.", time: "3 days ago", read: true },
  { id: 7, type: "verification", title: "Verification request under review", text: "Admin is checking your documents.", time: "4 days ago", read: true },
];

const tabs = ["All", "Unread"];

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
  const visible = tab === "Unread" ? items.reduce((all, n) => (n.read ? all : [...all, n]), []) : items;

  const handleRead = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const handleReadAll = () => setItems((list) => list.map((n) => ({ ...n, read: true })));
  const handleDelete = (id) => setItems((list) => list.reduce((all, n) => (n.id === id ? all : [...all, n]), []));
  const handleDeleteAll = () => setItems([]);

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Notifications</h1>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleReadAll} disabled={unreadCount === 0} className={actionBtn}>
            <CheckCheck size={16} aria-hidden="true" />
            Mark All Read
          </button>
          <button type="button" onClick={handleDeleteAll} disabled={items.length === 0} className={actionBtn}>
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
                active ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
              }`}
            >
              {name}
              <span className={`min-w-5 rounded-full px-1.5 text-[11px] leading-5 ${active ? "bg-white" : "bg-[#F4F4F2]"}`}>
                {name === "All" ? items.length : unreadCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {visible.length === 0 ? (
        <section className="mt-4 rounded-xl border-2 border-dashed border-[#D9E3E9] bg-white px-4 py-12 text-center text-sm text-[#45484D]">
          No notifications yet.
        </section>
      ) : (
        <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
          {visible.map(({ id, type, title, text, time, read }) => {
            const Icon = typeIcon[type] || Bell;
            return (
              <div
                key={id}
                className={`flex items-start gap-2 border-t border-[#E2E4E7] px-4 py-4 transition-colors first:border-t-0 hover:bg-[#F4F4F2] sm:px-5 ${
                  read ? "bg-white" : "bg-[#FDC716]/10"
                }`}
              >
                {/* Click karne se sirf read hoti hai, koi page nahi khulta */}
                <button type="button" onClick={() => handleRead(id)} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm text-[#202124] ${read ? "font-medium" : "font-bold"}`}>{title}</p>
                    <p className="mt-0.5 text-xs text-[#45484D]">{text}</p>
                    <p className="mt-1 text-[11px] text-[#45484D]">{time}</p>
                  </div>
                  {!read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FDC716]" aria-label="Unread" />}
                </button>

                {/* Is notification ke liye read aur delete */}
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleRead(id)}
                    disabled={read}
                    aria-label="Mark as read"
                    title="Mark as read"
                    className={iconBtn}
                  >
                    <Check size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    aria-label="Delete notification"
                    title="Delete"
                    className={iconBtn}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default SupplierNotificationsPage;