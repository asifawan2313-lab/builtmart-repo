"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, FileWarning, MessageSquare, Package, Recycle, Trash2 } from "lucide-react";


import BmcustomerNotificatonlist from "../../../component/customer/Notifications/BmcustomerNotificatonlist";
import BmriderNotificationlist from "../../../component/rider/Notification/BmriderNotificationlist";
/* ============================================================
   DATA (demo)
   ============================================================ */

// Har type ka icon
const typeIcon = { order: Package, inquiry: MessageSquare, dispute: FileWarning, material: Recycle };

const startNotifications = [
  { id: 1, type: "order", title: "Order BM-1001 status updated", text: "Check the latest delivery progress.", time: "2 hours ago", read: false },
  { id: 2, type: "inquiry", title: "Supplier replied to BM-INQ-1002", text: "Open the chat to read the reply.", time: "5 hours ago", read: false },
  { id: 3, type: "dispute", title: "Dispute DSP-2004 is under review", text: "Admin is looking into your complaint.", time: "Yesterday", read: false },
  { id: 4, type: "material", title: "Your used material is live", text: "It is now showing on the home page.", time: "Yesterday", read: true },
  { id: 5, type: "dispute", title: "Dispute DSP-2002 has been resolved", text: "See the final outcome.", time: "3 days ago", read: true },
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

const CustomerNotificationsPage = () => {
  const [items, setItems] = useState(startNotifications);
  const [tab, setTab] = useState("All");

  const unreadCount = items.reduce((n, item) => (item.read ? n : n + 1), 0);
  const counts = { All: items.length, Unread: unreadCount, Read: items.length - unreadCount };
  const visible = items.reduce((all, n) => {
    const match = tab === "All" || (tab === "Unread" ? !n.read : n.read);
    return match ? [...all, n] : all;
  }, []);

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
                {counts[name]}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {visible.length === 0 ? (
        <section className="mt-4 rounded-xl border-2 border-dashed border-[#D9E3E9] bg-white px-4 py-12 text-center text-sm text-[#45484D]">
          {tab === "All" ? "No notifications yet." : `No ${tab.toLowerCase()} notifications.`}
        </section>
      ) : (
        <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
          {visible.map((notification) => {
            return (
              <BmriderNotificationlist
              key={notification.id}
              notification={notification}
              onRead={()=>handleRead(notification.id)}
               onDelete={()=>handleDelete(notification.id)}
              
              />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default CustomerNotificationsPage;