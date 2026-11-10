"use client";

import {
  Banknote,
  Boxes,
  CircleCheck,
  CircleHelp,
  Clock,
  Package,
  ShoppingCart,
  Star,
} from "lucide-react";

import BmReportStatCards from "../../../component/supplier/Bmreportsstacard.js";

// ========== DATA 1: upar ke 8 cards ==========
// cardColor = card ka rang, iconColor = icon dabbe ka rang, textColor = likhai ka rang
const BM_STATS = [
  {
    id: 1,
    label: "Total Materials",
    value: "5",
    icon: Package,
    cardColor: "border-[color:var(--charcoal-black)] bg-[var(--charcoal-black)]",
    iconColor: "bg-[var(--industrial-blue-grey)] text-[color:var(--white-cards)]",
    textColor: "text-[color:var(--white-cards)]",
  },
  {
    id: 2,
    label: "Available Stock Items",
    value: "0",
    icon: Boxes,
    cardColor: "border-[color:var(--border-color)] bg-[var(--white-cards)]",
    iconColor: "bg-yellow-50 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
  {
    id: 3,
    label: "Total Orders",
    value: "5",
    icon: ShoppingCart,
    cardColor: "border-[color:var(--border-color)] bg-[var(--white-cards)]",
    iconColor: "bg-yellow-50 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
  {
    id: 4,
    label: "Completed Orders",
    value: "1",
    icon: CircleCheck,
    cardColor: "border-[color:var(--border-color)] bg-[var(--white-cards)]",
    iconColor: "bg-yellow-50 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
  {
    id: 5,
    label: "Pending Orders",
    value: "0",
    icon: Clock,
    cardColor: "border-[color:var(--border-color)] bg-[var(--white-cards)]",
    iconColor: "bg-yellow-50 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
  {
    id: 6,
    label: "Total Sales (Delivered)",
    value: "Rs. 13,000",
    icon: Banknote,
    cardColor: "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)]",
    iconColor: "bg-yellow-100 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
  {
    id: 7,
    label: "Customer Enquiries",
    value: "3",
    icon: CircleHelp,
    cardColor: "border-[color:var(--border-color)] bg-[var(--white-cards)]",
    iconColor: "bg-yellow-50 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
  {
    id: 8,
    label: "Average Rating",
    value: "4.3",
    icon: Star,
    cardColor: "border-[color:var(--border-color)] bg-[var(--white-cards)]",
    iconColor: "bg-yellow-50 text-[color:var(--primary-text)]",
    textColor: "text-[color:var(--primary-text)]",
  },
];

// ========== DATA 2: Orders by Status ==========
const BM_ORDER_STATUS = [
  { id: 1, label: "Pending", count: 0 },
  { id: 2, label: "Confirmed", count: 2 },
  { id: 3, label: "Processing", count: 0 },
  { id: 4, label: "Ready for Dispatch", count: 0 },
  { id: 5, label: "In Transit", count: 1 },
  { id: 6, label: "Delivered", count: 1 },
  { id: 7, label: "Cancelled", count: 0 },
  { id: 8, label: "Failed / Returned", count: 1 },
];

// ========== DATA 3: Sales by Material ==========
const BM_SALES = [
  { id: 1, label: "A-Class Bricks", amount: 144000, text: "Rs. 144,000" },
  { id: 2, label: "DG Cement (OPC)", amount: 72500, text: "Rs. 72,500" },
  { id: 3, label: "Reused Wooden Doors", amount: 13000, text: "Rs. 13,000" },
];

// Sab se bari value (isi ke hisab se bar ki lambai banti hai)
const BM_MAX_ORDERS = 2;
const BM_MAX_SALES = 144000;

// Bar ki lambai percent mein: (value / sab se bari value) x 100
const getWidth = (value, max) => {
  return (value / max) * 100;
};

export default function SupplierReportsPage() {
  return (
    <main className="bmReports-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* ----- Heading ----- */}
      <h1 className="bmReports-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        Reports
      </h1>
      <p className="bmReports-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
        Sirf aapke apne records ka business summary
      </p>

      {/* ----- 8 cards: mobile 1, tablet 2, laptop 4 columns ----- */}
      <div className="bmReports-stats mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <BmReportStatCards stats={BM_STATS} />
      </div>

      {/* ----- 2 panels: mobile par ek ke neeche, laptop par side by side ----- */}
      <div className="bmReports-panels mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-6">
        {/* ===== Panel 1: Orders by Status ===== */}
        <div className="bmReports-ordersBox rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5">
          <h2 className="text-lg text-[color:var(--primary-text)]">Orders by Status</h2>

          <div className="mt-5 flex flex-col gap-3">
            {BM_ORDER_STATUS.map((item) => (
              <div
                key={item.id}
                className="bmReports-orderRow grid grid-cols-[100px_minmax(0,1fr)_20px] items-center gap-3 sm:grid-cols-[150px_minmax(0,1fr)_20px]"
              >
                {/* Naam */}
                <span className="text-xs text-[color:var(--secondary-text)] sm:text-sm">
                  {item.label}
                </span>

                {/* Bar: grey dabba, andar peela hissa */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border-color)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary-yellow)]"
                    style={{ width: `${getWidth(item.count, BM_MAX_ORDERS)}%` }}
                  />
                </div>

                {/* Ginti */}
                <span className="text-right text-sm text-[color:var(--primary-text)]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Panel 2: Sales by Material ===== */}
        <div className="bmReports-salesBox rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5">
          <h2 className="text-lg text-[color:var(--primary-text)]">Sales by Material</h2>

          <div className="mt-5 flex flex-col gap-4">
            {BM_SALES.map((item) => (
              <div key={item.id} className="bmReports-salesRow">
                {/* Upar: naam (left) aur rupay (right) */}
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm text-[color:var(--primary-text)]">
                  <span>{item.label}</span>
                  <span className="shrink-0">{item.text}</span>
                </div>

                {/* Neeche: bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border-color)]">
                  <div
                    className="h-full rounded-full bg-[var(--industrial-blue-grey)]"
                    style={{ width: `${getWidth(item.amount, BM_MAX_SALES)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}