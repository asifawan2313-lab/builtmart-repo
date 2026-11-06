"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

/* ============================================================
   DEMO DATA (sab values sirf UI ke liye hain)
   ============================================================ */

const initialNotifications = [
  { id: 1, title: "New job request received", text: "A plumbing job in Demo Area A matches your skills.", time: "10 min ago", unread: true },
  { id: 2, title: "Customer sent a counteroffer", text: "Demo Customer 2 offered Rs. 2,500 on BID-498.", time: "2 hours ago", unread: true },
  { id: 3, title: "Booking confirmed", text: "Booking BKG-301 is confirmed for 07 Nov 2026.", time: "Yesterday", unread: false },
  { id: 4, title: "Customer sent a message", text: "Demo Customer 3: Please come after 10 am.", time: "Yesterday", unread: false },
  { id: 5, title: "Job schedule updated", text: "BKG-298 start date was moved to 09 Nov 2026.", time: "2 days ago", unread: false },
  { id: 6, title: "Verification update", text: "Your documents are waiting for admin review.", time: "3 days ago", unread: false },
];

const tabs = [
  { id: "all", label: "All", test: () => true },
  { id: "unread", label: "Unread", test: (n) => n.unread },
];

const headerBtn =
  "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-4 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/* ============================================================
   PAGE
   ============================================================ */

const LabourNotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [isConfirming, setIsConfirming] = useState(false); // "Delete all?" sawal dikh raha hai ya nahi

  const currentTab = tabs.find((t) => t.id === activeTab);
  const visible = notifications.filter(currentTab.test);
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Ek notification ko "read" karo
  const handleRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  const handleReadAll = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  // Sab delete (simulated: sirf is page ki state se)
  const handleDeleteAll = () => {
    setNotifications([]);
    setIsConfirming(false);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-xs text-[#565553]">{unreadCount} unread</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReadAll}
            disabled={unreadCount === 0}
            className={`${headerBtn} border-[#D9E3E9] bg-white text-[#202124] hover:border-[#FDC716] hover:bg-[#FDC716]/20`}
          >
            Mark all as read
          </button>

          {isConfirming ? (
            <>
              <span className="text-xs font-semibold text-[#202124]">Delete all?</span>
              <button
                type="button"
                onClick={handleDeleteAll}
                className={`${headerBtn} border-red-600 bg-red-600 text-white hover:bg-red-700`}
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                className={`${headerBtn} border-[#D9E3E9] bg-white text-[#202124] hover:border-[#FDC716] hover:bg-[#FDC716]/20`}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsConfirming(true)}
              disabled={notifications.length === 0}
              className={`${headerBtn} border-[#D9E3E9] bg-white text-red-600 hover:border-red-300 hover:bg-red-50`}
            >
              <Trash2 size={14} aria-hidden="true" />
              Delete all
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Notification filter">
        {tabs.map(({ id, label, test }) => {
          const isActive = id === activeTab;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
              className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
              }`}
            >
              {label}
              <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>
                {notifications.filter(test).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <section className="mt-4 overflow-hidden rounded-xl border border-[#D9E3E9] bg-white shadow-sm">
        {visible.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#565553]">
            {notifications.length === 0 ? "You have no notifications." : "No notifications to show."}
          </p>
        ) : (
          <ul className="divide-y divide-[#D9E3E9]">
            {visible.map(({ id, title, text, time, unread }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => handleRead(id)}
                  className={`flex w-full cursor-pointer items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-[#F4F4F2] ${unread ? "bg-[#FDC716]/10" : ""}`}
                >
                  <span
                    aria-label={unread ? "Unread" : "Read"}
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`}
                  />
                  <div className="min-w-0">
                    <p className={`text-sm text-[#202124] ${unread ? "font-semibold" : ""}`}>{title}</p>
                    <p className="text-xs text-[#565553]">{text}</p>
                    <p className="mt-1 text-[11px] text-[#565553]">{time}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample notifications shown for demonstration purposes.</p>
    </div>
  );
};

export default LabourNotificationsPage;