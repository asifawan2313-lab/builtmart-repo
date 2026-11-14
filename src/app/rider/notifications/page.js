
// "use client";

// import { useState } from "react";
// import { CheckCheck, CheckCircle2, CircleX, Truck, Megaphone, ShieldCheck, Send } from "lucide-react";

// // ========== DATA ==========
// const BM_TABS = ["Send New Notification", "Received Notifications"];

// // Admin se aayi hui notifications. type: approved / rejected / status / announcement / verification
// const BM_START_NOTIFICATIONS = [
//   {
//     id: 1,
//     type: "approved",
//     title: "Rider Profile Approved",
//     message: "Mubarak! Aap ka rider profile approve ho gaya hai. Ab aap delivery requests par bid kar sakte hain.",
//     date: "2026-11-05 · 10:30 AM",
//     read: false,
//   },
//   {
//     id: 2,
//     type: "approved",
//     title: "Bid Accepted",
//     message: "Customer ne \"RD-101\" (Portland Cement) ke liye aap ka bid accept kar liya hai.",
//     date: "2026-11-05 · 09:10 AM",
//     read: false,
//   },
//   {
//     id: 3,
//     type: "rejected",
//     title: "Bid Not Selected",
//     message: "\"RD-102\" (Red Bricks) ke liye customer ne doosre rider ko select kiya hai.",
//     date: "2026-11-04 · 04:15 PM",
//     read: false,
//   },
//   {
//     id: 4,
//     type: "status",
//     title: "Delivery Status Update",
//     message: "\"RD-103\" (Steel Rebar) ki delivery ka status In Transit se Delivered kar diya gaya hai.",
//     date: "2026-11-04 · 11:05 AM",
//     read: true,
//   },
//   {
//     id: 5,
//     type: "status",
//     title: "Wallet Top-Up Approved",
//     message: "Aap ka Rs. 5,000 ka top-up Admin ne approve kar diya hai.",
//     date: "2026-11-03 · 03:40 PM",
//     read: true,
//   },
//   {
//     id: 6,
//     type: "announcement",
//     title: "Important Announcement",
//     message: "Is Jumma ko 2 baje se 4 baje tak platform maintenance ki wajah se band rahega.",
//     date: "2026-11-02 · 06:00 PM",
//     read: true,
//   },
//   {
//     id: 7,
//     type: "verification",
//     title: "Account Verification Update",
//     message: "Aap ke vehicle documents review mein hain. Natija 2 din mein bata diya jayega.",
//     date: "2026-11-01 · 01:10 PM",
//     read: true,
//   },
// ];

// const BM_EMPTY_FORM = { subject: "", message: "" };

// // Har type ka icon aur rang
// const BM_TYPES = {
//   approved: { icon: CheckCircle2, color: "bg-green-100 text-green-700" },
//   rejected: { icon: CircleX, color: "bg-red-100 text-red-600" },
//   status: { icon: Truck, color: "bg-blue-100 text-blue-600" },
//   announcement: { icon: Megaphone, color: "bg-orange-100 text-orange-600" },
//   verification: { icon: ShieldCheck, color: "bg-purple-100 text-purple-600" },
// };

// /* ---------------- Notifications list ---------------- */

// const RiderNotificationList = ({ notifications, onRead }) =>
//   notifications.map((item) => {
//     const Icon = BM_TYPES[item.type].icon;

//     return (
//       <button
//         key={item.id}
//         type="button"
//         onClick={() => onRead(item.id)}
//         className={`bmNotif-item flex w-full cursor-pointer items-start gap-3 rounded-lg border p-4 text-left shadow-sm transition-colors duration-300 ${
//           item.read
//             ? "border-[color:var(--border-color)] bg-[var(--white-cards)] hover:bg-[var(--off-white-background)]"
//             : "border-[color:var(--primary-yellow)] bg-yellow-50"
//         }`}
//       >
//         <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${BM_TYPES[item.type].color}`}>
//           <Icon size={18} />
//         </span>

//         <span className="min-w-0 flex-1">
//           <span className="flex items-center gap-2">
//             <span className="text-sm text-[color:var(--primary-text)] sm:text-base">{item.title}</span>
//             {!item.read && <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--primary-yellow)]" />}
//           </span>
//           <span className="mt-1 block text-sm text-[color:var(--secondary-text)]">{item.message}</span>
//           <span className="mt-2 block text-xs text-[color:var(--secondary-text)]">{item.date}</span>
//         </span>
//       </button>
//     );
//   });

// /* ---------------- Page ---------------- */

// const RiderNotificationsPage = () => {
//   // ===== State =====
//   const [activeTab, setActiveTab] = useState(BM_TABS[0]);
//   const [notifications, setNotifications] = useState(BM_START_NOTIFICATIONS);
//   const [form, setForm] = useState(BM_EMPTY_FORM);
//   const [errors, setErrors] = useState({}); // { subject: "...", message: "..." }
//   const [success, setSuccess] = useState("");

//   // Kitni notifications abhi unread hain
//   const unreadCount = notifications.reduce((n, item) => (item.read ? n : n + 1), 0);

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
//     setNotifications(notifications.map((item) => (item.id === id ? { ...item, read: true } : item)));
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
//               <label htmlFor="bmNotifSubject" className="mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                 Notification Subject
//               </label>
//               <input
//                 id="bmNotifSubject"
//                 name="subject"
//                 type="text"
//                 value={form.subject}
//                 onChange={handleChange}
//                 placeholder="Masalan: Vehicle documents update request"
//                 className={`${inputClass} ${errors.subject ? "border-red-500" : "border-[color:var(--border-color)]"}`}
//               />
//               {errors.subject && <p className="mt-1.5 text-xs text-red-600">{errors.subject}</p>}
//             </div>

//             {/* Message */}
//             <div>
//               <label htmlFor="bmNotifMessage" className="mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//                 Notification Message
//               </label>
//               <textarea
//                 id="bmNotifMessage"
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
//               <RiderNotificationList notifications={notifications} onRead={handleRead} />
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
// };

// export default RiderNotificationsPage;






"use client";

import { useState } from "react";
import { Banknote, Bell, Check, CheckCheck, FileWarning, Gavel, ShieldCheck, Trash2, Truck, Wallet } from "lucide-react";

/* ============================================================
   DATA (demo)
   ============================================================ */

// Har type ka icon
const typeIcon = { request: Truck, bid: Gavel, dispute: FileWarning, wallet: Wallet, rate: Banknote, verification: ShieldCheck };

const startNotifications = [
  { id: 1, type: "request", title: "New delivery request RD-2041 available", text: "Gujranwala to Wazirabad. Open Delivery Requests to place a bid.", time: "30 minutes ago", read: false },
  { id: 2, type: "bid", title: "Your bid on RD-2038 was accepted", text: "The delivery is now assigned to you. Pick it up on time.", time: "2 hours ago", read: false },
  { id: 3, type: "bid", title: "Your bid on RD-2035 was not selected", text: "The supplier chose another rider for this delivery.", time: "Yesterday", read: false },
  { id: 4, type: "wallet", title: "Delivery fee credited", text: "Rs 1,800 for delivery RD-2030 has been added to your wallet.", time: "Yesterday", read: true },
  { id: 5, type: "dispute", title: "Ticket TKT-8001 is under review", text: "Admin is looking into your complaint.", time: "2 days ago", read: true },
  { id: 6, type: "rate", title: "Fixed rates updated", text: "Your new per-km rate is now active.", time: "3 days ago", read: true },
  { id: 7, type: "verification", title: "Account verification update", text: "Your documents are under review.", time: "4 days ago", read: true },
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

const RiderNotificationsPage = () => {
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

export default RiderNotificationsPage;