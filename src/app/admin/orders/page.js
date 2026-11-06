"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

/* ---------------- Dataset ---------------- */

// amount number hai taake commission (5%) nikal sakein
const initialOrders = [
  {
    id: "ORD-1001", customer: "Ahmed Raza", customerPhone: "0300-1112233", supplier: "Sheikh Traders", supplierPhone: "0300-7778899",
    address: "House 22, DHA Phase 5, Lahore", material: "DG Khan Cement OPC × 50", amount: 67500,
    method: "Online", payment: "Paid", status: "Delivered", date: "2026-09-28", rider: "Asif Nawaz",
    timeline: [{ step: "Pending", date: "2026-09-28" }, { step: "Confirmed", date: "2026-09-29" }, { step: "In Transit", date: "2026-09-30" }, { step: "Delivered", date: "2026-10-01" }],
  },
  {
    id: "ORD-1002", customer: "Sana Malik", customerPhone: "0321-4455667", supplier: "Brick House", supplierPhone: "0322-1212121",
    address: "Street 5, Satellite Town, Gujranwala", material: "Bricks Grade A × 8,000", amount: 80000,
    method: "COD", payment: "Pending", status: "In Transit", date: "2026-10-15", rider: "Asif Nawaz",
    timeline: [{ step: "Pending", date: "2026-10-15" }, { step: "Confirmed", date: "2026-10-16" }, { step: "In Transit", date: "2026-10-17" }],
  },
  {
    id: "ORD-1003", customer: "Bilal Khan", customerPhone: "0333-9988776", supplier: "Sheikh Traders", supplierPhone: "0300-7778899",
    address: "Plot 14, Johar Town, Lahore", material: "Grade 60 Steel Saria 12mm × 2 tons", amount: 106000,
    method: "Online", payment: "Paid", status: "Ready for Dispatch", date: "2026-10-16", rider: "",
    timeline: [{ step: "Pending", date: "2026-10-16" }, { step: "Confirmed", date: "2026-10-17" }, { step: "Ready for Dispatch", date: "2026-10-18" }],
  },
  {
    id: "ORD-1004", customer: "Usman Tariq", customerPhone: "0301-5566778", supplier: "Sheikh Traders", supplierPhone: "0300-7778899",
    address: "Block C, Peoples Colony, Faisalabad", material: "Ravi Sand (Truck) × 1", amount: 28000,
    method: "COD", payment: "Pending", status: "Pending", date: "2026-10-18", rider: "",
    timeline: [{ step: "Pending", date: "2026-10-18" }],
  },
  {
    id: "ORD-1005", customer: "Ahmed Raza", customerPhone: "0300-1112233", supplier: "Brick House", supplierPhone: "0322-1212121",
    address: "House 22, DHA Phase 5, Lahore", material: "Leftover Porcelain Tiles × 40", amount: 13200,
    method: "Online", payment: "Refunded", status: "Returned", date: "2026-10-09", rider: "Asif Nawaz",
    timeline: [{ step: "Pending", date: "2026-10-09" }, { step: "Delivered", date: "2026-10-11" }, { step: "Returned", date: "2026-10-12" }],
  },
  {
    id: "ORD-1006", customer: "Sana Malik", customerPhone: "0321-4455667", supplier: "Sheikh Traders", supplierPhone: "0300-7778899",
    address: "Street 5, Satellite Town, Gujranwala", material: "DG Khan Cement OPC × 20", amount: 27000,
    method: "COD", payment: "Pending", status: "Cancelled", date: "2026-10-12", rider: "",
    timeline: [{ step: "Pending", date: "2026-10-12" }, { step: "Cancelled", date: "2026-10-13" }],
  },
  {
    id: "ORD-1007", customer: "Bilal Khan", customerPhone: "0333-9988776", supplier: "Brick House", supplierPhone: "0322-1212121",
    address: "Plot 14, Johar Town, Lahore", material: "Red Clay Bricks (A-Class) × 5,000", amount: 32000,
    method: "Online", payment: "Paid", status: "Processing", date: "2026-10-17", rider: "",
    timeline: [{ step: "Pending", date: "2026-10-17" }, { step: "Processing", date: "2026-10-18" }],
  },
];

const headings = ["Order ID", "Customer", "Supplier", "Total Amount", "Payment Status", "Order Status", "Order Date", ""];
const sortable = ["Order ID", "Total Amount", "Order Date"];
const statusOptions = ["All", "Pending", "Processing", "Ready for Dispatch", "In Transit", "Delivered", "Cancelled", "Returned"];
const commissionRate = 0.05; // 5% commission
const perPage = 8; // ek page par kitne rows

/* ---------------- Shared styles + helpers ---------------- */

// Status ke hisab se badge ka rang (order, payment aur delivery sab ke liye)
const badgeColors = {
  Pending: "bg-orange-50 text-orange-600 ring-orange-200",
  Processing: "bg-orange-50 text-orange-600 ring-orange-200",
  "Ready for Dispatch": "bg-blue-50 text-blue-600 ring-blue-200",
  "In Transit": "bg-blue-50 text-blue-600 ring-blue-200",
  Delivered: "bg-green-50 text-green-700 ring-green-200",
  Paid: "bg-green-50 text-green-700 ring-green-200",
  Cancelled: "bg-red-50 text-red-600 ring-red-200",
  Returned: "bg-red-50 text-red-600 ring-red-200",
  Refunded: "bg-red-50 text-red-600 ring-red-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// 67500 -> "Rs 67,500"
const rs = (n) => `Rs ${n.toLocaleString("en-US")}`;

const Badge = ({ status }) => (
  <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ring-1 ${badgeColors[status]}`}>
    {status}
  </span>
);

/* ---------------- Order detail modal ---------------- */

const OrderModal = ({ order, onClose }) => {
  const commission = order.amount * commissionRate;

  // Left side ki lines: label + value
  const lines = [
    { label: "Customer", value: `${order.customer} · ${order.customerPhone}` },
    { label: "Supplier", value: `${order.supplier} · ${order.supplierPhone}` },
    { label: "Address", value: order.address },
    { label: "Material", value: order.material },
  ];

  // Amount wale box ki lines
  const amounts = [
    { label: "Order amount", value: rs(order.amount) },
    { label: `Commission (${commissionRate * 100}%)`, value: rs(commission) },
    { label: "Supplier payable", value: rs(order.amount - commission) },
  ];

  return (
    // Overlay: bahar click karne par band
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-3xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Order ID + status + Close */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl text-[color:var(--primary-text)]">{order.id}</h2>
            <Badge status={order.status} />
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: details */}
          <div className="space-y-2 text-sm text-[color:var(--primary-text)]">
            {lines.map((l) => (
              <p key={l.label}>
                <span className="font-semibold">{l.label}:</span> {l.value}
              </p>
            ))}
            <p className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">Delivery:</span>
              <Badge status={order.status} />
              {order.rider && <span>by {order.rider}</span>}
            </p>

            {/* Amount box */}
            <div className="mt-3 space-y-1.5 rounded-md bg-[var(--off-white-background)] p-3 text-xs">
              {amounts.map((a) => (
                <p key={a.label} className="flex justify-between gap-3">
                  <span>{a.label}</span>
                  <span className="font-semibold">{a.value}</span>
                </p>
              ))}
              <p className="flex items-start justify-between gap-3">
                <span>{order.method} payment</span>
                <Badge status={order.payment} />
              </p>
            </div>
          </div>

          {/* Right: timeline */}
          <div>
            <h3 className="text-sm text-[color:var(--primary-text)]">Timeline</h3>
            <div className="mt-3 flex flex-col gap-3 border-l-2 border-[var(--primary-yellow)] pl-4">
              {order.timeline.map((t) => (
                <div key={t.step}>
                  <p className="text-sm text-[color:var(--primary-text)]">{t.step}</p>
                  <p className="text-xs text-[color:var(--secondary-text)]">{t.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Page ---------------- */

const OrdersPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null); // View modal wala order

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const selected = initialOrders.find((o) => o.id === selectedId);

  // 1) Search aur dropdown dono par poore utre hue orders chuno
  const visible = initialOrders.reduce((all, o) => {
    const matchSearch = `${o.id} ${o.customer} ${o.supplier} ${o.material}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || o.status === status;
    return matchSearch && matchStatus ? [...all, o] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Orders</h1>

      {/* Card */}
      <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + dropdown */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              aria-label="Search"
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            aria-label="Status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {sortable.includes(h) && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className="border-t border-[color:var(--border-color)] hover:bg-[var(--off-white-background)]">
                  <td className="px-4 py-3 font-semibold text-[color:var(--primary-text)]">{o.id}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{o.customer}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{o.supplier}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{rs(o.amount)}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-[color:var(--primary-text)]">{o.method}</p>
                    <Badge status={o.payment} />
                  </td>
                  <td className="px-4 py-3"><Badge status={o.status} /></td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{o.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => setSelectedId(o.id)} className={btn}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} {visible.length === 1 ? "record" : "records"}</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* View modal */}
      {selected && <OrderModal order={selected} onClose={() => setSelectedId(null)} />}
    </section>
  );
};

export default OrdersPage;