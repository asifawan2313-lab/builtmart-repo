// import BmAdminDashboard from './admindashboard.js';
// import AdminDashboardCards from "./admindashboardcard.js";
// import AdminNotifications from "./adminnotification.js";
// export default function AdminDashboardPage() {
//   return (
//     <main className="p-8">
//       <BmAdminDashboard/>
//       <AdminDashboardCards/>
//       <AdminNotifications/>
//     </main>
//   );
// }





"use client";

import {
  Users,
  Store,
  ShieldAlert,
  Bike,
  HardHat,
  Package,
  Sparkles,
  Recycle,
  Clock,
  Truck,
  MessagesSquare,
  Wallet,
} from "lucide-react";
import BmAdminStatCard from "../../../../component/admin/Bmadminstatcard.js";

/* ---------------- Datasets ---------------- */

// Admin ka naam (baad mein login se aayega)
const BM_ADMIN_NAME = "Super Admin";

// 12 stat cards ka simple data (har item ka unique id).
// highlight: true = icon ka dabba peela (jin par admin ko dhyan dena hai). Numbers abhi sample hain.
const BM_ADMIN_STATS = [
  { id: 1, title: "Total Customers", value: 5, icon: Users, highlight: false },
  { id: 2, title: "Total Suppliers", value: 5, icon: Store, highlight: false },
  { id: 3, title: "Pending Verifications", value: 2, icon: ShieldAlert, highlight: true },
  { id: 4, title: "Total Riders", value: 3, icon: Bike, highlight: false },
  { id: 5, title: "Total Labour", value: 3, icon: HardHat, highlight: false },
  { id: 6, title: "Total Materials", value: 9, icon: Package, highlight: false },
  { id: 7, title: "New Materials", value: 5, icon: Sparkles, highlight: false },
  { id: 8, title: "Reused Materials", value: 4, icon: Recycle, highlight: false },
  { id: 9, title: "Pending Orders", value: 1, icon: Clock, highlight: true },
  { id: 10, title: "Active Deliveries", value: 1, icon: Truck, highlight: false },
  { id: 11, title: "Open Disputes", value: 2, icon: MessagesSquare, highlight: true },
  { id: 12, title: "Pending Wallet Requests", value: 2, icon: Wallet, highlight: true },
];

// Sample data hai (screenshot jaisa). Asli data aane par replace karein.
// tone: badge ka rang (green, blue, orange, red, gray)
const cards = [
  {
    title: "Recent Orders",
    action: "View all",
    boldTitle: true,
    rows: [
      { title: "ORD-1001", sub: "Ahmed Raza", amount: "Rs 67,500", badges: [{ text: "Delivered", tone: "green" }] },
      { title: "ORD-1002", sub: "Sana Malik", amount: "Rs 80,000", badges: [{ text: "In Transit", tone: "blue" }] },
      { title: "ORD-1003", sub: "Bilal Khan", amount: "Rs 106,000", badges: [{ text: "Ready for Dispatch", tone: "blue" }] },
      { title: "ORD-1004", sub: "Usman Tariq", amount: "Rs 28,000", badges: [{ text: "Pending", tone: "orange" }] },
      { title: "ORD-1005", sub: "Ahmed Raza", amount: "Rs 13,200", badges: [{ text: "Returned", tone: "red" }] },
    ],
  },
  {
    title: "New Supplier Registrations",
    action: "Review",
    boldTitle: true,
    rows: [
      { title: "PaintPro", sub: "Lahore", badges: [{ text: "Pending", tone: "orange" }] },
      { title: "Tile City", sub: "Islamabad", badges: [{ text: "Pending", tone: "orange" }] },
      { title: "Zahid Iron Works", sub: "Gujranwala", badges: [{ text: "Rejected", tone: "red" }] },
      { title: "Brick House", sub: "Karachi", badges: [{ text: "Verified", tone: "green" }] },
      { title: "Sheikh Traders", sub: "Lahore", badges: [{ text: "Verified", tone: "green" }] },
    ],
  },
  {
    title: "Recently Added Materials",
    rows: [
      { title: "Weather Shield Paint 16L", badges: [{ text: "New", tone: "blue" }, { text: "Approved", tone: "green" }] },
      { title: "Salvaged Iron Window Grills", badges: [{ text: "Reused", tone: "gray" }, { text: "Approved", tone: "green" }] },
      { title: "Used Gypsum Ceiling Boards", badges: [{ text: "Reused", tone: "gray" }, { text: "Inactive", tone: "red" }] },
      { title: "Leftover Porcelain Tiles", badges: [{ text: "Reused", tone: "gray" }, { text: "Approved", tone: "green" }] },
      { title: "Used Wooden Doors (set of 4)", badges: [{ text: "Reused", tone: "gray" }, { text: "Approved", tone: "green" }] },
    ],
  },
  {
    title: "Pending Approvals",
    rows: [
      { title: "Supplier: Tile City", button: "Review" },
      { title: "Supplier: PaintPro", button: "Review" },
      { title: "Top-up: Sheikh Traders · Rs 10,000", button: "Review" },
      { title: "Top-up: Brick House · Rs 5,000", button: "Review" },
    ],
  },
  {
    title: "Latest Disputes",
    boldTitle: true,
    rows: [
      { title: "TKT-301", sub: "Quality issue", badges: [{ text: "Resolved", tone: "green" }] },
      { title: "TKT-302", sub: "COD refused", badges: [{ text: "Open", tone: "orange" }] },
      { title: "TKT-303", sub: "Paid but not delivered", badges: [{ text: "Under Review", tone: "orange" }] },
    ],
  },
  {
    title: "Recent Transactions",
    rows: [
      { title: "Payment", sub: "Ahmed Raza", amount: "Rs 67,500", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Payment", sub: "Bilal Khan", amount: "Rs 106,000", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Payment", sub: "Ahmed Raza", amount: "Rs 13,200", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Refund", sub: "Ahmed Raza", amount: "Rs 13,200", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Payment", sub: "Bilal Khan", amount: "Rs 32,000", badges: [{ text: "Completed", tone: "green" }] },
    ],
  },
];

const notifications = [
  {
    title: "Supplier verification approved",
    message: "Brick House is now verified.",
    meta: "Supplier: S2 · 2026-08-25",
  },
  {
    title: "Platform maintenance",
    message: "Short downtime on Sunday 2am.",
    meta: "All users · 2026-10-15",
  },
];

// Badge ke rang (status ke liye aam rang: hara, neela, narangi, laal, grey)
const tones = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
};

const linkBtn =
  "text-xs text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:underline";

/* ---------------- 1. Greeting + stat cards ---------------- */

const BmAdminDashboard = () => (
  <section className="bm-adminDashboard-root p-4 sm:p-6 lg:p-8">
    {/* Greeting */}
    <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
      Hello, {BM_ADMIN_NAME}
    </h1>
    <p className="mt-1 text-sm text-[color:var(--secondary-text)] sm:text-base">
      Here&apos;s what&apos;s happening on BuildMart today.
    </p>

    {/* Stat cards: data par seedha map (phone par 1, tablet par 2, laptop par 3, bari screen par 4) */}
    <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {BM_ADMIN_STATS.map((item) => (
        <BmAdminStatCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          highlight={item.highlight}
        />
      ))}
    </div>
  </section>
);

/* ---------------- 2. Info cards (orders, suppliers, ...) ---------------- */

const AdminDashboardCards = () => {
  // Simple handler: abhi sirf console mein likhta hai
  const handleAction = (label) => console.log(label + " clicked");

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-5 shadow-sm"
        >
          {/* Card ka title + (optional) action button */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-text)]">
              {card.title}
            </h3>
            {card.action && (
              <button type="button" onClick={() => handleAction(card.action)} className={linkBtn}>
                {card.action}
              </button>
            )}
          </div>

          {/* Rows */}
          <div>
            {card.rows.map((row, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] py-2.5 text-sm text-[var(--primary-text)] last:border-b-0"
              >
                <p className="min-w-0">
                  <span className={card.boldTitle ? "font-semibold" : ""}>{row.title}</span>
                  {row.sub && <span> · {row.sub}</span>}
                </p>

                <div className="flex items-center gap-3">
                  {row.amount && <span>{row.amount}</span>}

                  {row.badges &&
                    row.badges.map((b) => (
                      <span
                        key={b.text}
                        className={`rounded-full border px-2.5 py-0.5 text-xs ${tones[b.tone]}`}
                      >
                        {b.text}
                      </span>
                    ))}

                  {row.button && (
                    <button type="button" onClick={() => handleAction(row.button)} className={linkBtn}>
                      {row.button}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

/* ---------------- 3. Notifications ---------------- */

const AdminNotifications = () => (
  <section className="mt-6 rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-5 shadow-sm">
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--primary-text)]">
      Notifications
    </h3>

    <div>
      {notifications.map((n, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 border-b border-[var(--border-color)] py-3 text-sm last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <p className="text-[var(--primary-text)]">
            <span className="font-semibold">{n.title}</span> — {n.message}
          </p>
          <p className="shrink-0 text-xs text-[var(--secondary-text)]">{n.meta}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ---------------- Page ---------------- */

const AdminDashboardPage = () => (
  <main className="p-8">
    <BmAdminDashboard />
    <AdminDashboardCards />
    <AdminNotifications />
  </main>
);

export default AdminDashboardPage;