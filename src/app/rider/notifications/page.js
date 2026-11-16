"use client";

import { useState } from "react";
import {
  Banknote,
  Bell,
  Check,
  CheckCheck,
  FileWarning,
  Gavel,
  ShieldCheck,
  Trash2,
  Truck,
  Wallet,
} from "lucide-react";

import BmriderNotificationlist from "../../../component/rider/Notification/BmriderNotificationlist.js";
/* ============================================================
   DATA (demo)
   ============================================================ */

// Har type ka icon
const typeIcon = {
  request: Truck,
  bid: Gavel,
  dispute: FileWarning,
  wallet: Wallet,
  rate: Banknote,
  verification: ShieldCheck,
};

const startNotifications = [
  {
    id: 1,
    type: "request",
    title: "New delivery request RD-2041 available",
    text: "Gujranwala to Wazirabad. Open Delivery Requests to place a bid.",
    time: "30 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "bid",
    title: "Your bid on RD-2038 was accepted",
    text: "The delivery is now assigned to you. Pick it up on time.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "bid",
    title: "Your bid on RD-2035 was not selected",
    text: "The supplier chose another rider for this delivery.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    type: "wallet",
    title: "Delivery fee credited",
    text: "Rs 1,800 for delivery RD-2030 has been added to your wallet.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "dispute",
    title: "Ticket TKT-8001 is under review",
    text: "Admin is looking into your complaint.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    type: "rate",
    title: "Fixed rates updated",
    text: "Your new per-km rate is now active.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 7,
    type: "verification",
    title: "Account verification update",
    text: "Your documents are under review.",
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

const RiderNotificationsPage = () => {
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
          {visible.map((notification) => {
            return (
              <BmriderNotificationlist
                key={notification.id}
                notification={notification}
                onRead={() => handleRead(notification.id)}
                onDelete={() => handleDelete(notification.id)}
              />
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
            );
          })}
        </section>
      )}
    </main>
  );
};

export default RiderNotificationsPage;
