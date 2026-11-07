"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, CircleCheck, ClipboardList, Route, Truck, Wallet } from "lucide-react";

import BmRiderStatCards from "../../../component/rider/Bmriderstatecard.js";
import BmRiderRequestCards from "../../../component/rider/Bmriderrequestcard.js";

// ========== DATA ==========
const BM_STATS = [
  { id: 1, label: "Open requests", value: "3", icon: ClipboardList },
  { id: 2, label: "Active deliveries", value: "0", icon: Route },
  { id: 3, label: "Completed", value: "0", icon: CircleCheck },
  { id: 4, label: "Demo earnings", value: "PKR 0", icon: Wallet },
];

const BM_REQUESTS = [
  {
    id: 1,
    code: "RD-101",
    area: "Model Town",
    badge: "Quotes",
    title: "Portland Cement",
    detail: "20 bags · 1000 kg · Shehzore",
    note: "Customer is reviewing quotes",
  },
  {
    id: 2,
    code: "RD-102",
    area: "Satellite Town",
    badge: "Fixed fare",
    title: "Red Bricks",
    detail: "400 bricks · 1400 kg · Shehzore",
    note: "Fare: PKR 2,400",
  },
  {
    id: 3,
    code: "RD-103",
    area: "Eminabad",
    badge: "Quotes",
    title: "Steel Rebar",
    detail: "750 kg · 750 kg · Shehzore",
    note: "Customer is reviewing quotes",
  },
];

// Abhi koi active delivery nahi (list khali hai)
const BM_ACTIVE = [];

export default function RiderDashboardPage() {
  const router = useRouter();

  // ===== Handlers =====
  const handleAllRequests = () => router.push("/rider/requests");
  const handleManage = () => router.push("/rider/deliveries");
  const handleViewDetails = (code) => router.push(`/rider/requests/${code.toLowerCase()}`);

  // Dono section ke buttons ki common styling
  const smallBtn =
    "flex cursor-pointer items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]";

  return (
    <main className="bmRiderDash-root mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      {/* ----- Heading ----- */}
      <p className="bmRiderDash-crumb text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
        BuildMart / Rider Workspace
      </p>
      <h1 className="bmRiderDash-title mt-1 break-words text-2xl text-[color:var(--primary-text)] sm:text-3xl">
        Assalam-o-Alaikum, Hamza Transport
      </h1>
      <p className="bmRiderDash-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
        Your delivery workspace at a glance — all data is browser-only demo data.
      </p>

      {/* ----- 4 stat cards: mobile 1, tablet 2, laptop 4 ----- */}
      <div className="bmRiderDash-stats mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <BmRiderStatCards stats={BM_STATS} />
      </div>

      {/* ----- New requests for you ----- */}
      <div className="bmRiderDash-requestsHead mt-10 flex items-center justify-between gap-3">
        <h2 className="text-lg text-[color:var(--primary-text)] sm:text-xl">New requests for you</h2>
        <button type="button" onClick={handleAllRequests} className={smallBtn}>
          All requests
          <ArrowUpRight size={13} />
        </button>
      </div>

      <div className="bmRiderDash-requests mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <BmRiderRequestCards requests={BM_REQUESTS} onViewDetails={handleViewDetails} />
      </div>

      {/* ----- Active deliveries ----- */}
      <div className="bmRiderDash-activeHead mt-10 flex items-center justify-between gap-3 border-b border-[color:var(--border-color)] pb-4">
        <h2 className="text-lg text-[color:var(--primary-text)] sm:text-xl">Active deliveries</h2>
        <button type="button" onClick={handleManage} className={smallBtn}>
          Manage
          <ArrowUpRight size={13} />
        </button>
      </div>

      {BM_ACTIVE.length === 0 ? (
        <div className="bmRiderDash-empty flex flex-col items-center gap-3 px-4 py-14 text-center">
          <Truck size={34} strokeWidth={1.3} className="text-[color:var(--secondary-text)]" />
          <p className="text-sm text-[color:var(--secondary-text)]">
            No active deliveries. Accept a request to get started.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {BM_ACTIVE.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 text-sm"
            >
              {item.code} · {item.title}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}