"use client";

import { useState } from "react";
import { Truck, ArrowUpRight, MapPin, Package, X } from "lucide-react";

/* ---------------- Datasets ---------------- */

const startDeliveries = [
  {
    id: "RD-101", order: "DEMO-RD-101", title: "Portland Cement", qty: "20 bags", weight: 1000, vehicle: "Shehzore",
    pickup: "Al-Rehman depot, Gujranwala City (demo)", drop: "Model Town, Gujranwala",
    fare: 2400, cod: 29000, confirmed: "05-Nov-2026, 10:15 am", status: "Confirmed",
  },
  {
    id: "RD-102", order: "DEMO-RD-102", title: "Red Bricks", qty: "400 bricks", weight: 1400, vehicle: "Shehzore",
    pickup: "Al-Rehman depot, Gujranwala City (demo)", drop: "Satellite Town, Gujranwala",
    fare: 2600, cod: 12000, confirmed: "05-Nov-2026, 11:30 am", status: "In Transit",
  },
  {
    id: "RD-090", order: "DEMO-RD-090", title: "Steel Rebar", qty: "750 kg", weight: 750, vehicle: "Shehzore",
    pickup: "Al-Rehman depot, Gujranwala City (demo)", drop: "Eminabad, Gujranwala",
    fare: 3000, cod: 198750, confirmed: "03-Nov-2026, 9:00 am", status: "Delivered",
  },
];

// Delivery ka agla status (Delivered ke baad kuch nahi)
const nextStatus = {
  Confirmed: "Picked Up",
  "Picked Up": "In Transit",
  "In Transit": "Delivered",
};

// Button par kya likha aaye
const nextLabel = {
  Confirmed: "Mark picked up",
  "Picked Up": "Mark in transit",
  "In Transit": "Mark delivered",
};

const statusColors = {
  Confirmed: "bg-sky-50 text-sky-600 ring-sky-200",
  "Picked Up": "bg-orange-50 text-orange-600 ring-orange-200",
  "In Transit": "bg-blue-50 text-blue-600 ring-blue-200",
  Delivered: "bg-green-50 text-green-700 ring-green-200",
};

/* ---------------- Shared styles + helpers ---------------- */

const btn =
  "flex items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

const kg = (n) => `${n.toLocaleString("en-US")} kg`;
const pkr = (n) => `PKR ${n.toLocaleString("en-US")}`;

const StatusBadge = ({ status }) => (
  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] ring-1 ${statusColors[status]}`}>{status}</span>
);

// Overlay + close icon
const ModalShell = ({ size = "max-w-md", onClose, children }) => (
  <div onClick={onClose} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
    <div onClick={(e) => e.stopPropagation()} className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
      >
        <X size={18} />
      </button>
      {children}
    </div>
  </div>
);

/* ---------------- Deliveries grid ---------------- */

const DeliveriesGrid = ({ items, onView, onNext }) => (
  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
    {items.map((d) => (
      <div key={d.id} className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] text-[color:var(--secondary-text)]">{d.id} · {d.order}</p>
          <StatusBadge status={d.status} />
        </div>
        <h3 className="mt-2 text-base font-semibold text-[color:var(--primary-text)]">{d.title} · {d.qty}</h3>
        <p className="mt-1 text-xs text-[color:var(--secondary-text)]">{kg(d.weight)} · {d.vehicle}</p>
        <p className="mt-3 text-xs text-[color:var(--primary-text)]">{d.pickup}</p>
        <p className="text-xs text-[color:var(--primary-text)]">→ {d.drop}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[color:var(--primary-text)]">
          <p>Fare: <span className="font-semibold">{pkr(d.fare)}</span></p>
          <p>COD: <span className="font-semibold">{pkr(d.cod)}</span></p>
        </div>
        <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">Confirmed {d.confirmed}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => onView(d.id)} className={btn}>
            View details <ArrowUpRight size={12} />
          </button>
          {/* Agla status sirf Active deliveries par */}
          {nextStatus[d.status] && (
            <button type="button" onClick={() => onNext(d.id)} className={yellowBtn}>
              {nextLabel[d.status]}
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- Page ---------------- */

const RiderActivePage = () => {
  const [deliveries, setDeliveries] = useState(startDeliveries);
  const [tab, setTab] = useState("active"); // active / completed
  const [viewId, setViewId] = useState(null);

  const handleTab = (key) => setTab(key);

  // Status ko agle step par le jao
  const handleNext = (id) => {
    setDeliveries(deliveries.map((d) => (d.id === id ? { ...d, status: nextStatus[d.status] } : d)));
  };

  // Active aur Completed alag alag (.filter() ke bajaye .reduce())
  const active = deliveries.reduce((all, d) => (d.status !== "Delivered" ? [...all, d] : all), []);
  const completed = deliveries.reduce((all, d) => (d.status === "Delivered" ? [...all, d] : all), []);

  const shown = tab === "active" ? active : completed;
  const viewing = deliveries.find((d) => d.id === viewId);

  const tabs = [
    { key: "active", label: `Active (${active.length})` },
    { key: "completed", label: `Completed (${completed.length})` },
  ];

  const emptyText = tab === "active" ? "No confirmed active deliveries." : "No completed deliveries yet.";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <p className="text-[11px] uppercase tracking-wide text-[color:var(--secondary-text)]">BuildMart / Rider Workspace</p>
      <h1 className="mt-1 text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">My Deliveries</h1>
      <p className="mt-1 text-xs text-[color:var(--secondary-text)]">Confirmed delivery orders · demo</p>

      {/* Tabs */}
      <div className="mt-4 inline-flex rounded-lg bg-[var(--off-white-background)] p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => handleTab(t.key)}
            className={`rounded-md px-3 py-1.5 text-xs ${
              tab === t.key ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]" : "text-[color:var(--secondary-text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 border-t border-[color:var(--border-color)]">
        {/* Khali list */}
        {shown.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-14 text-[color:var(--secondary-text)]">
            <Truck size={30} className="text-[color:var(--primary-text)]" />
            <p className="text-sm">{emptyText}</p>
          </div>
        )}

        {/* Grid */}
        {shown.length > 0 && <DeliveriesGrid items={shown} onView={setViewId} onNext={handleNext} />}
      </div>

      {/* View details modal */}
      {viewing && (
        <ModalShell size="max-w-2xl" onClose={() => setViewId(null)}>
          <div className="flex items-start justify-between gap-3 pr-8">
            <p className="text-[11px] text-[color:var(--secondary-text)]">{viewing.id} · Order {viewing.order}</p>
            <StatusBadge status={viewing.status} />
          </div>
          <h2 className="mt-1 text-2xl text-[color:var(--primary-text)]">{viewing.title}</h2>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{viewing.qty} · {kg(viewing.weight)} · {viewing.vehicle}</p>

          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-[color:var(--border-color)] pt-4 text-sm sm:grid-cols-2">
            {[
              { icon: Package, label: "Pickup", value: viewing.pickup },
              { icon: MapPin, label: "Drop-off", value: viewing.drop },
              { label: "Fare", value: pkr(viewing.fare) },
              { label: "COD to collect", value: pkr(viewing.cod) },
              { label: "Confirmed on", value: viewing.confirmed },
              { label: "Status", value: viewing.status },
            ].map((x) => (
              <div key={x.label}>
                <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
                  {x.icon && <x.icon size={12} />} {x.label}
                </p>
                <p className="text-[color:var(--primary-text)]">{x.value}</p>
              </div>
            ))}
          </div>

          {nextStatus[viewing.status] && (
            <div className="mt-4 border-t border-[color:var(--border-color)] pt-4">
              <button type="button" onClick={() => handleNext(viewing.id)} className={yellowBtn}>
                {nextLabel[viewing.status]}
              </button>
            </div>
          )}
        </ModalShell>
      )}
    </section>
  );
};

export default RiderActivePage;