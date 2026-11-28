// "use client";
// import Link from "next/link.js";

// import { useRouter } from "next/navigation";
// import { ArrowUpRight, CircleCheck, ClipboardList, Route, Truck, Wallet } from "lucide-react";

// import BmRiderStatCards from "../../../component/rider/Bmriderstatecard.js";
// import BmRiderRequestCards from "../../../component/rider/Bmriderrequestcard.js";

// // ========== DATA ==========
// const BM_STATS = [
//   { id: 1, label: "Open requests", value: "3", icon: ClipboardList },
//   { id: 2, label: "Active deliveries", value: "0", icon: Route },
//   { id: 3, label: "Completed", value: "0", icon: CircleCheck },
//   { id: 4, label: "Demo earnings", value: "PKR 0", icon: Wallet },
// ];

// const BM_REQUESTS = [
//   {
//     id: 1,
//     code: "RD-101",
//     area: "Model Town",
//     badge: "Quotes",
//     title: "Portland Cement",
//     detail: "20 bags · 1000 kg · Shehzore",
//     note: "Customer is reviewing quotes",
//   },
//   {
//     id: 2,
//     code: "RD-102",
//     area: "Satellite Town",
//     badge: "Fixed fare",
//     title: "Red Bricks",
//     detail: "400 bricks · 1400 kg · Shehzore",
//     note: "Fare: PKR 2,400",
//   },
//   {
//     id: 3,
//     code: "RD-103",
//     area: "Eminabad",
//     badge: "Quotes",
//     title: "Steel Rebar",
//     detail: "750 kg · 750 kg · Shehzore",
//     note: "Customer is reviewing quotes",
//   },
// ];

// // Abhi koi active delivery nahi (list khali hai)
// const BM_ACTIVE = [];

// export default function RiderDashboardPage() {
//   const router = useRouter();

//   // ===== Handlers =====
//   const handleAllRequests = () => router.push("/rider/requests");
//   const handleManage = () => router.push("/rider/deliveries");
//   const handleViewDetails = (code) => router.push(`/rider/requests/${code.toLowerCase()}`);

//   // Dono section ke buttons ki common styling
//   const smallBtn =
//     "flex cursor-pointer items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]";

//   return (
//     <main className="bmRiderDash-root mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
//       {/* ----- Heading ----- */}
//       <p className="bmRiderDash-crumb text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
//         BuildMart / Rider Workspace
//       </p>
//       <h1 className="bmRiderDash-title mt-1 break-words text-2xl text-[color:var(--primary-text)] sm:text-3xl">
//         Assalam-o-Alaikum, Hamza Transport
//       </h1>
//       <p className="bmRiderDash-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
//         Your delivery workspace at a glance — all data is browser-only demo data.
//       </p>

//       {/* ----- 4 stat cards: mobile 1, tablet 2, laptop 4 ----- */}
//       <div className="bmRiderDash-stats mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
//         <BmRiderStatCards stats={BM_STATS} />
//       </div>

//       {/* ----- New requests for you ----- */}
//       <div className="bmRiderDash-requestsHead mt-10 flex items-center justify-between gap-3">
//         <h2 className="text-lg text-[color:var(--primary-text)] sm:text-xl">New requests for you</h2>
//         <button type="button" onClick={handleAllRequests} className={smallBtn}>
//           All requests
//           <ArrowUpRight size={13} />
//         </button>
//       </div>

//       <div className="bmRiderDash-requests mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//         <BmRiderRequestCards requests={BM_REQUESTS} onViewDetails={handleViewDetails} />
//       </div>

//       {/* ----- Active deliveries ----- */}
//       <div className="bmRiderDash-activeHead mt-10 flex items-center justify-between gap-3 border-b border-[color:var(--border-color)] pb-4">
//         <h2 className="text-lg text-[color:var(--primary-text)] sm:text-xl">Active deliveries</h2>
//         <button type="button" onClick={handleManage} className={smallBtn}>
//           Manage
//           <ArrowUpRight size={13} />
//         </button>
//       </div>

//       {BM_ACTIVE.length === 0 ? (
//         <div className="bmRiderDash-empty flex flex-col items-center gap-3 px-4 py-14 text-center">
//           <Truck size={34} strokeWidth={1.3} className="text-[color:var(--secondary-text)]" />
//           <p className="text-sm text-[color:var(--secondary-text)]">
//             No active deliveries. Accept a request to get started.
//           </p>
//         </div>
//       ) : (
//         <div className="mt-4 flex flex-col gap-3">
//           {BM_ACTIVE.map((item) => (
//             <div
//               key={item.id}
//               className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 text-sm"
//             >
//               {item.code} · {item.title}
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }




"use client";

import { useRouter } from "next/navigation";
import { CircleCheck, ClipboardList, Clock, FileWarning, Route, Star, Truck, Wallet } from "lucide-react";

/* ------------------------------------------------------------------
   1) Demo data (sab browser-only demo)
------------------------------------------------------------------ */

const BM_REQUESTS = [
  { id: 1, code: "RD-101", title: "Portland Cement", area: "Model Town", detail: "20 bags · 1000 kg", badge: "Quotes", note: "Customer is reviewing quotes" },
  { id: 2, code: "RD-102", title: "Red Bricks", area: "Satellite Town", detail: "400 bricks · 1400 kg", badge: "Fixed fare", note: "Fare: Rs 2,400" },
  { id: 3, code: "RD-103", title: "Steel Rebar", area: "Eminabad", detail: "750 kg", badge: "Quotes", note: "Customer is reviewing quotes" },
];

const BM_ACTIVE = [
  { id: 1, code: "RD-098", title: "Portland Cement", customer: "Ali Raza", area: "Model Town", fare: "Rs 3,200", status: "On the way" },
  { id: 2, code: "RD-099", title: "Ravi Sand (Rait)", customer: "Sana Tariq", area: "Satellite Town", fare: "Rs 2,800", status: "Picked up" },
  { id: 3, code: "RD-100", title: "Porcelain Floor Tiles", customer: "Hira Javed", area: "Eminabad", fare: "Rs 4,100", status: "Heading to pickup" },
];

const BM_COMPLETED = [
  { id: 1, code: "RD-095", title: "Steel Saria Grade 60", customer: "Bilal Ahmed", fare: "Rs 5,500", status: "Delivered" },
  { id: 2, code: "RD-094", title: "Red Clay Bricks", customer: "Fatima Noor", fare: "Rs 2,600", status: "Delivered" },
  { id: 3, code: "RD-093", title: "Weather Shield Paint", customer: "Usman Tariq", fare: "Rs 1,200", status: "Delivered" },
  { id: 4, code: "RD-092", title: "Cement Bags", customer: "Ahmed Raza", fare: "Rs 3,000", status: "Returned" },
];

const BM_ALERTS = [
  { id: 1, title: "Dispute RTKT-5001", detail: "COD refused · Sana Tariq", status: "Open", to: "/rider/disputes" },
  { id: 2, title: "Dispute RTKT-5002", detail: "Pickup delay · Al-Rehman Depot", status: "Under Review", to: "/rider/disputes" },
  { id: 3, title: "Wallet top-up", detail: "Rs 5,000 · waiting for admin", status: "Pending", to: "/rider/wallet" },
  { id: 4, title: "Support SUP-303", detail: "Top-up not credited yet", status: "Under Review", to: "/rider/disputes" },
];

const BM_CHIP = {
  Quotes: "border-blue-300 bg-blue-50 text-blue-600",
  "Fixed fare": "border-green-300 bg-green-50 text-green-600",
  "On the way": "border-blue-300 bg-blue-50 text-blue-600",
  "Picked up": "border-blue-300 bg-blue-50 text-blue-600",
  "Heading to pickup": "border-orange-300 bg-orange-50 text-orange-500",
  Delivered: "border-green-300 bg-green-50 text-green-600",
  Returned: "border-red-300 bg-red-50 text-red-500",
  Open: "border-orange-300 bg-orange-50 text-orange-500",
  "Under Review": "border-blue-300 bg-blue-50 text-blue-600",
  Pending: "border-orange-300 bg-orange-50 text-orange-500",
};

// "Rs 3,200" -> 3200
const bmAmount = (text) => Number(text.replace(/[^\d]/g, ""));

/* ------------------------------------------------------------------
   2) Grids / lists (isi file mein)
------------------------------------------------------------------ */

// Stat cards ka grid
const StatCards = ({ stats }) => (
  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
    {stats.map(({ id, label, value, icon: Icon, hot }) => (
      <div
        key={id}
        className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm transition-colors duration-300 hover:border-[color:var(--primary-yellow)]"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-[color:var(--secondary-text)]">{label}</p>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
              hot ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]" : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"
            }`}
          >
            <Icon size={14} />
          </span>
        </div>
        <p className="mt-4 break-words text-3xl text-[color:var(--primary-text)]">{value}</p>
      </div>
    ))}
  </div>
);

// Panel ke andar rows ki list: title, action button, rows
const RowsList = ({ title, actionLabel, onAction, rows, onRow, emptyText }) => (
  <section className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[11px] uppercase tracking-wider text-[color:var(--primary-text)]">{title}</h2>
      <button type="button" onClick={onAction} className="cursor-pointer text-[11px] text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]">
        {actionLabel}
      </button>
    </div>

    {rows.length === 0 ? (
      <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
        <Truck size={30} strokeWidth={1.3} className="text-[color:var(--secondary-text)]" />
        <p className="text-sm text-[color:var(--secondary-text)]">{emptyText}</p>
      </div>
    ) : (
      <ul className="mt-3">
        {rows.map((row) => (
          <li key={row.id} className="border-t border-[color:var(--border-color)] first:border-t-0">
            <button
              type="button"
              onClick={() => onRow(row)}
              className="flex w-full cursor-pointer flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 text-left transition-colors duration-300 hover:bg-[var(--off-white-background)]"
            >
              <span className="min-w-0 flex-1 basis-40">
                <span className="block truncate text-xs text-[color:var(--primary-text)]">
                  <span className="font-semibold">{row.head}</span> · {row.sub}
                </span>
                {row.meta && <span className="block truncate text-[11px] text-[color:var(--secondary-text)]">{row.meta}</span>}
              </span>
              <span className="flex items-center gap-3">
                {row.amount && <span className="whitespace-nowrap text-xs text-[color:var(--primary-text)]">{row.amount}</span>}
                <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] ${BM_CHIP[row.chip]}`}>{row.chip}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    )}
  </section>
);

/* ------------------------------------------------------------------
   3) Page
------------------------------------------------------------------ */
const RiderDashboardPage = () => {
  const router = useRouter();

  // Totals demo data se nikalte hain
  const earned = BM_COMPLETED.reduce((sum, d) => (d.status === "Delivered" ? sum + bmAmount(d.fare) : sum), 0);
  const delivered = BM_COMPLETED.reduce((n, d) => (d.status === "Delivered" ? n + 1 : n), 0);
  const openDisputes = BM_ALERTS.reduce((n, a) => (a.title.startsWith("Dispute") ? n + 1 : n), 0);

  const stats = [
    { id: 1, label: "Open Requests", value: BM_REQUESTS.length, icon: ClipboardList, hot: true },
    { id: 2, label: "Active Deliveries", value: BM_ACTIVE.length, icon: Route },
    { id: 3, label: "Completed", value: delivered, icon: CircleCheck },
    { id: 4, label: "Total Earnings", value: `Rs ${earned.toLocaleString("en-US")}`, icon: Wallet, hot: true },
    { id: 5, label: "Pending Payout", value: "Rs 5,000", icon: Clock, hot: true },
    { id: 6, label: "Open Disputes", value: openDisputes, icon: FileWarning, hot: true },
    { id: 7, label: "Rating", value: "4.8", icon: Star },
    { id: 8, label: "Wallet Balance", value: "Rs 12,400", icon: Wallet },
  ];

  // Rows ko list component ke format mein badalna
  const requestRows = BM_REQUESTS.map((r) => ({ id: r.id, code: r.code, head: r.code, sub: `${r.title} · ${r.area}`, meta: `${r.detail} · ${r.note}`, chip: r.badge }));
  const activeRows = BM_ACTIVE.map((d) => ({ id: d.id, head: d.code, sub: `${d.title} · ${d.customer}`, meta: d.area, amount: d.fare, chip: d.status }));
  const completedRows = BM_COMPLETED.map((d) => ({ id: d.id, head: d.code, sub: `${d.title} · ${d.customer}`, amount: d.fare, chip: d.status }));
  const alertRows = BM_ALERTS.map((a) => ({ id: a.id, to: a.to, head: a.title, sub: a.detail, chip: a.status }));

  // ===== Handlers =====
  const handleAllRequests = () => router.push("/rider/requests");
  const handleManage = () => router.push("/rider/deliveries");
  const handleDisputes = () => router.push("/rider/disputes");
  const handleRequestRow = (row) => router.push(`/rider/requests/${row.code.toLowerCase()}`);
  const handleDeliveryRow = () => router.push("/rider/deliveries");
  const handleAlertRow = (row) => router.push(row.to);

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <p className="text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">BuildMart / Rider Workspace</p>
      <h1 className="mt-1 break-words text-2xl text-[color:var(--primary-text)] sm:text-3xl">Hello, Hamza Transport</h1>
      <p className="mt-1 text-xs text-[color:var(--secondary-text)]">Here&apos;s what&apos;s happening on your deliveries today.</p>

      <StatCards stats={stats} />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RowsList
          title="New requests for you"
          actionLabel="All requests"
          onAction={handleAllRequests}
          rows={requestRows}
          onRow={handleRequestRow}
          emptyText="No new requests right now."
        />
        <RowsList
          title="Active deliveries"
          actionLabel="Manage"
          onAction={handleManage}
          rows={activeRows}
          onRow={handleDeliveryRow}
          emptyText="No active deliveries. Accept a request to get started."
        />
        <RowsList
          title="Recent deliveries"
          actionLabel="View all"
          onAction={handleManage}
          rows={completedRows}
          onRow={handleDeliveryRow}
          emptyText="No completed deliveries yet."
        />
        <RowsList
          title="Disputes & alerts"
          actionLabel="Review"
          onAction={handleDisputes}
          rows={alertRows}
          onRow={handleAlertRow}
          emptyText="Nothing needs your attention."
        />
      </div>

      <p className="mt-6 text-center text-xs text-[color:var(--secondary-text)]">All data is browser-only demo data.</p>
    </main>
  );
};

export default RiderDashboardPage;