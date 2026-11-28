"use client";

import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import BmSupplierNotificationPageheader from "../../../component/supplier/pageheader/BmSupplierNotificationPageheader";
import BmSupplierNotificationListRow from "../../../component/supplier/notification/BmSupplierNotificationListRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_SUB_TABS = ["All", "Unread", "Read"];

const BM_NOTIFICATIONS = [
  { id: 1, icon: "order", title: "New order BM-ORD-1008 received", message: "Confirm the order and prepare it for dispatch.", time: "1 hour ago", read: false },
  { id: 2, icon: "inquiry", title: "New inquiry BM-INQ-1007 from a customer", message: "Open the chat to read and reply.", time: "3 hours ago", read: false },
  { id: 3, icon: "dispute", title: "Dispute DSP-3004 is under review", message: "Admin has asked the rider for a reply.", time: "Yesterday", read: false },
  { id: 4, icon: "topup", title: "Top-up TX-5006 approved", message: "Rs 10,000 has been added to your wallet.", time: "Yesterday", read: true },
  { id: 5, icon: "review", title: "New 5-star review received", message: "A customer rated your shop on order BM-ORD-1005.", time: "2 days ago", read: true },
  { id: 6, icon: "dispute", title: "Dispute DSP-3002 has been resolved", message: "Resolved in favour of the supplier.", time: "3 days ago", read: true },
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
        <BmSupplierNotificationPageheader title="Notifications" />

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
          <BmSupplierNotificationListRow key={item.id} notification={item} />
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