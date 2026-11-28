// "use client";

// import { useState } from "react";
// import { Check, Send, Trash2 } from "lucide-react";
// import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
// import BmAdminNotificationListRow from "../../../component/admin/notification/mAdminNotificationListRow";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// const BM_SUB_TABS = {
//   received: ["All", "Unread", "Read"],
//   sent: ["All", "Sent", "Draft"],
// };

// const BM_NOTIFICATIONS = [
//   { id: 1, box: "received", icon: "dispute", title: "New supplier dispute TKT-302", message: "Brick House reported a refused COD delivery.", time: "2 hours ago", read: true },
//   { id: 2, box: "received", icon: "topup", title: "New top-up request TX-5009", message: "Ali Raza requested a Rs 3,000 wallet top-up.", time: "Yesterday", read: false },
//   { id: 3, box: "received", icon: "kyc", title: "Supplier documents awaiting review", message: "Tile City submitted documents for verification.", time: "Yesterday", read: true },
//   { id: 4, box: "received", icon: "support", title: "New support request SUP-201", message: "Ghulam Rasool cannot update his profile photo.", time: "2 days ago", read: true },
//   { id: 5, box: "received", icon: "order", title: "Order ORD-1010 placed", message: "A new order is waiting for supplier confirmation.", time: "3 days ago", read: true },
//   { id: 6, box: "sent", icon: "announcement", title: "Platform maintenance", message: "Short downtime on Sunday 2am.", type: "Announcement", audience: "All users", time: "15 Oct 2026, 00:00 UTC", status: "Sent" },
// ];

// // Sub tab (All / Unread / Read / Sent / Draft) ke hisaab se match
// const matchesSub = (item, sub) => {
//   if (sub === "All") return true;
//   if (item.box === "received") return sub === "Unread" ? !item.read : item.read;
//   return item.status === sub;
// };

// const pill =
//   "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors";
// const actionBtn =
//   "inline-flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// /* =========================================================
//    PAGE
// ========================================================= */

// const Page = () => {
//   const [box, setBox] = useState("received");
//   const [sub, setSub] = useState("All");

//   const handleBoxChange = (nextBox) => {
//     setBox(nextBox);
//     setSub("All");
//   };

//   const handleMarkAllRead = () => alert("All notifications marked as read (demo)");
//   const handleDeleteAll = () => alert("All notifications deleted (demo)");
//   const handleSendNew = () => alert("Send New Notification (demo)");

//   const boxItems = BM_NOTIFICATIONS.reduce(
//     (all, item) => (item.box === box ? [...all, item] : all),
//     []
//   );

//   const visibleItems = boxItems.reduce(
//     (all, item) => (matchesSub(item, sub) ? [...all, item] : all),
//     []
//   );

//   const countOf = (tab) =>
//     boxItems.reduce((total, item) => (matchesSub(item, tab) ? total + 1 : total), 0);

//   const unreadCount = BM_NOTIFICATIONS.reduce(
//     (total, item) => (item.box === "received" && !item.read ? total + 1 : total),
//     0
//   );

//   const boxTabs = [
//     { key: "received", label: `Received Notifications (${unreadCount} unread)` },
//     { key: "sent", label: "Sent Notifications" },
//   ];

//   return (
//     <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
//       <BmAdminKycPageheader title="Notifications" />

//       {/* RECEIVED / SENT TABS */}
//       <div className="mb-5 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
//         {boxTabs.map((item) => (
//           <button
//             key={item.key}
//             type="button"
//             onClick={() => handleBoxChange(item.key)}
//             className={`rounded-md px-4 py-2 text-sm transition-colors ${
//               box === item.key
//                 ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
//                 : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>

//       {/* SUB TABS + ACTION BUTTONS */}
//       <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//         <div className="flex flex-wrap gap-2">
//           {BM_SUB_TABS[box].map((tab) => (
//             <button
//               key={tab}
//               type="button"
//               onClick={() => setSub(tab)}
//               className={`${pill} ${
//                 sub === tab
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//               }`}
//             >
//               {tab}
//               <span className="rounded-full bg-[var(--white-cards)] px-1.5 text-xs text-[color:var(--primary-text)]">
//                 {countOf(tab)}
//               </span>
//             </button>
//           ))}
//         </div>

//         {box === "received" ? (
//           <div className="flex flex-wrap gap-2">
//             <button type="button" onClick={handleMarkAllRead} className={actionBtn}>
//               <Check size={15} />
//               Mark All Read
//             </button>
//             <button type="button" onClick={handleDeleteAll} className={actionBtn}>
//               <Trash2 size={15} />
//               Delete All
//             </button>
//           </div>
//         ) : (
//           <button
//             type="button"
//             onClick={handleSendNew}
//             className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//           >
//             <Send size={15} />
//             Send New Notification
//           </button>
//         )}
//       </div>

//       {/* LIST */}
//       <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
//         {visibleItems.map((item) => (
//           <BmAdminNotificationListRow key={item.id} notification={item} />
//         ))}

//         {visibleItems.length === 0 && (
//           <p className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]">
//             No notifications found.
//           </p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Page;





"use client";

import { useState } from "react";
import { Check, Send, Trash2, X } from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminNotificationListRow from "../../../component/admin/notification/mAdminNotificationListRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_SUB_TABS = {
  received: ["All", "Unread", "Read"],
  sent: ["All", "Sent", "Draft"],
};

const BM_NOTIFICATIONS = [
  { id: 1, box: "received", icon: "dispute", title: "New supplier dispute TKT-302", message: "Brick House reported a refused COD delivery.", time: "2 hours ago", read: true },
  { id: 2, box: "received", icon: "topup", title: "New top-up request TX-5009", message: "Ali Raza requested a Rs 3,000 wallet top-up.", time: "Yesterday", read: false },
  { id: 3, box: "received", icon: "kyc", title: "Supplier documents awaiting review", message: "Tile City submitted documents for verification.", time: "Yesterday", read: true },
  { id: 4, box: "received", icon: "support", title: "New support request SUP-201", message: "Ghulam Rasool cannot update his profile photo.", time: "2 days ago", read: true },
  { id: 5, box: "received", icon: "order", title: "Order ORD-1010 placed", message: "A new order is waiting for supplier confirmation.", time: "3 days ago", read: true },
  { id: 6, box: "sent", icon: "announcement", title: "Platform maintenance", message: "Short downtime on Sunday 2am.", type: "Announcement", audience: "All users", time: "15 Oct 2026, 00:00 UTC", status: "Sent" },
];

// Sub tab (All / Unread / Read / Sent / Draft) ke hisaab se match
const matchesSub = (item, sub) => {
  if (sub === "All") return true;
  if (item.box === "received") return sub === "Unread" ? !item.read : item.read;
  return item.status === sub;
};

const BM_NOTIFICATION_TYPES = ["Announcement", "Alert", "Reminder"];
const BM_AUDIENCES = ["All users", "Customers", "Suppliers", "Riders", "Labour"];
const BM_EMPTY_FORM = { title: "", message: "", type: "Announcement", audience: "All users" };

const fieldClass =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const labelClass = "block text-sm text-[color:var(--secondary-text)]";

const pill =
  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors";
const actionBtn =
  "inline-flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* =========================================================
   PAGE
========================================================= */

const BmAdminNotificationsPage = () => {
  const [box, setBox] = useState("received");
  const [sub, setSub] = useState("All");
  const [sendOpen, setSendOpen] = useState(false);
  const [form, setForm] = useState(BM_EMPTY_FORM);

  const handleBoxChange = (nextBox) => {
    setBox(nextBox);
    setSub("All");
  };

  const handleMarkAllRead = () => alert("All notifications marked as read (demo)");
  const handleDeleteAll = () => alert("All notifications deleted (demo)");

  const handleChange = (key, value) =>
    setForm((old) => ({ ...old, [key]: value }));

  const handleCloseSend = () => {
    setSendOpen(false);
    setForm(BM_EMPTY_FORM);
  };

  const handleSendNotification = () => {
    alert(`Notification "${form.title}" sent to ${form.audience} (demo)`);
    handleCloseSend();
  };

  const boxItems = BM_NOTIFICATIONS.reduce(
    (all, item) => (item.box === box ? [...all, item] : all),
    []
  );

  const visibleItems = boxItems.reduce(
    (all, item) => (matchesSub(item, sub) ? [...all, item] : all),
    []
  );

  const countOf = (tab) =>
    boxItems.reduce((total, item) => (matchesSub(item, tab) ? total + 1 : total), 0);

  const unreadCount = BM_NOTIFICATIONS.reduce(
    (total, item) => (item.box === "received" && !item.read ? total + 1 : total),
    0
  );

  const boxTabs = [
    { key: "received", label: `Received Notifications (${unreadCount} unread)` },
    { key: "sent", label: "Sent Notifications" },
  ];

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader title="Notifications" />

      {/* RECEIVED / SENT TABS */}
      <div className="mb-5 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
        {boxTabs.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleBoxChange(item.key)}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              box === item.key
                ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* SUB TABS + ACTION BUTTONS */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {BM_SUB_TABS[box].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSub(tab)}
              className={`${pill} ${
                sub === tab
                  ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                  : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              }`}
            >
              {tab}
              <span className="rounded-full bg-[var(--white-cards)] px-1.5 text-xs text-[color:var(--primary-text)]">
                {countOf(tab)}
              </span>
            </button>
          ))}
        </div>

        {box === "received" ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={handleMarkAllRead} className={actionBtn}>
              <Check size={15} />
              Mark All Read
            </button>
            <button type="button" onClick={handleDeleteAll} className={actionBtn}>
              <Trash2 size={15} />
              Delete All
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSendOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            <Send size={15} />
            Send New Notification
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {visibleItems.map((item) => (
          <BmAdminNotificationListRow key={item.id} notification={item} />
        ))}

        {visibleItems.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]">
            No notifications found.
          </p>
        )}
      </div>

      {/* SEND NEW NOTIFICATION MODAL */}
      {sendOpen && (
        <div
          onClick={handleCloseSend}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                  Send New Notification
                </h2>
                <p className="mt-0.5 text-sm text-[color:var(--secondary-text)]">
                  Sent notification
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseSend}
                aria-label="Close modal"
                className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label htmlFor="bm-notif-title" className={labelClass}>
                Title
              </label>
              <input
                id="bm-notif-title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="bm-notif-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="bm-notif-message"
                rows={3}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bm-notif-type" className={labelClass}>
                  Type
                </label>
                <select
                  id="bm-notif-type"
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className={fieldClass}
                >
                  {BM_NOTIFICATION_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bm-notif-audience" className={labelClass}>
                  Recipients / Audience
                </label>
                <select
                  id="bm-notif-audience"
                  value={form.audience}
                  onChange={(e) => handleChange("audience", e.target.value)}
                  className={fieldClass}
                >
                  {BM_AUDIENCES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 border-t border-[color:var(--border-color)] pt-4">
              <button
                type="button"
                onClick={handleCloseSend}
                className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendNotification}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
              >
                <Send size={15} />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BmAdminNotificationsPage;