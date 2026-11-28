"use client";

import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import BmRiderNotificationPageheader from "../../../component/rider/pageheader/BmRiderNotificationPageheader";
import BmRiderNotificationListRow from "../../../component/rider/notification/BmRiderNotificationListRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_SUB_TABS = ["All", "Unread", "Read"];

const BM_NOTIFICATIONS = [
  { id: 1, title: "New delivery request RD-2041 available", message: "Gujranwala to Wazirabad. Open Delivery Requests to place a bid.", time: "30 minutes ago", read: false },
  { id: 2, title: "Your bid on RD-2038 was accepted", message: "The delivery is now assigned to you. Pick it up on time.", time: "2 hours ago", read: false },
  { id: 3, title: "Your bid on RD-2035 was not selected", message: "The supplier chose another rider for this delivery.", time: "Yesterday", read: false },
  { id: 4, title: "Delivery fee credited", message: "Rs 1,800 for delivery RD-2030 has been added to your wallet.", time: "Yesterday", read: true },
  { id: 5, title: "Ticket TKT-8001 is under review", message: "Admin is looking into your complaint.", time: "2 days ago", read: true },
  { id: 6, title: "Fixed rates updated", message: "Your new per-km rate is now active.", time: "3 days ago", read: true },
];

// Sub tab (All / Unread / Read) ke hisaab se match
const matchesSub = (item, sub) => {
  if (sub === "All") return true;
  return sub === "Unread" ? !item.read : item.read;
};

const actionBtn =
  "inline-flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [sub, setSub] = useState("All");

  const handleMarkAllRead = () => alert("All notifications marked as read (demo)");
  const handleDeleteAll = () => alert("All notifications deleted (demo)");

  const visibleItems = BM_NOTIFICATIONS.reduce(
    (all, item) => (matchesSub(item, sub) ? [...all, item] : all),
    []
  );

  const countOf = (tab) =>
    BM_NOTIFICATIONS.reduce(
      (total, item) => (matchesSub(item, tab) ? total + 1 : total),
      0
    );

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      {/* HEADER + MARK ALL READ / DELETE ALL (buttons page.js mein hain) */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <BmRiderNotificationPageheader title="Notifications" />

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
      </div>

      {/* ALL / UNREAD / READ */}
      <div className="mb-4 flex flex-wrap gap-2">
        {BM_SUB_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSub(tab)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
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

      {/* LIST */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {visibleItems.map((item) => (
          <BmRiderNotificationListRow key={item.id} notification={item} />
        ))}

        {visibleItems.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]">
            No notifications found.
          </p>
        )}
      </div>
    </main>
  );
};

export default Page;