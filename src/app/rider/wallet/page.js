"use client";

import { useState } from "react";
import { Plus, Wallet, CircleArrowDown, CircleArrowUp, Upload, X } from "lucide-react";

/* ---------------- Datasets ---------------- */

const initialTransactions = [
  { id: "T-601", type: "Top-Up", details: "Bank transfer — approved by Admin", date: "2026-11-01", amount: 5000, status: "Approved", reference: "BT-48213", receipt: "bank_receipt_t601.pdf" },
  { id: "T-602", type: "Platform Fee", details: "Delivery RD-103", date: "2026-11-03", amount: -100, status: "Approved", reference: "Not provided", receipt: "" },
  { id: "T-603", type: "Platform Fee", details: "Delivery RD-101", date: "2026-11-04", amount: -100, status: "Approved", reference: "Not provided", receipt: "" },
  { id: "T-604", type: "Top-Up", details: "JazzCash — awaiting Admin approval", date: "2026-11-05", amount: 2000, status: "Pending", reference: "JC-77120", receipt: "jazzcash_receipt_t604.png" },
];

// Payment methods Admin ki taraf se aate hain (demo data)
const paymentMethods = [
  {
    name: "Bank Transfer",
    info: [
      { label: "Bank name", value: "DEMO BANK — not a real account" },
      { label: "Account title", value: "BuildMart Demo" },
      { label: "Account / IBAN", value: "DEMO-ACCOUNT-ONLY" },
      { label: "Instructions", value: "Simulated payment receipt only; do not send money." },
    ],
  },
  {
    name: "JazzCash",
    info: [
      { label: "Account title", value: "BuildMart Demo" },
      { label: "Mobile number", value: "03XX-XXXXXXX (demo)" },
      { label: "Instructions", value: "Simulated payment receipt only; do not send money." },
    ],
  },
  {
    name: "Easypaisa",
    info: [
      { label: "Account title", value: "BuildMart Demo" },
      { label: "Mobile number", value: "03XX-XXXXXXX (demo)" },
      { label: "Instructions", value: "Simulated payment receipt only; do not send money." },
    ],
  },
];

const headings = ["TXN ID", "Type", "Details", "Date", "Amount", "Status", ""];

/* ---------------- Shared styles + helpers ---------------- */

const badgeColors = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-orange-50 text-orange-600",
};

const field =
  "mt-1.5 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";

const rs = (n) => `Rs. ${n.toLocaleString("en-US")}`;

const Badge = ({ text }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs ${badgeColors[text]}`}>{text}</span>
);

// Overlay + heading + close icon
const ModalShell = ({ title, onClose, children }) => (
  <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
    <div onClick={(e) => e.stopPropagation()} className="my-auto w-full max-w-lg rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6">
      <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
        <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">{title}</h2>
        <button type="button" aria-label="Close" onClick={onClose} className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]">
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------------- Stat cards grid ---------------- */

const StatCards = ({ items }) => (
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {items.map((s) => (
      <div
        key={s.title}
        className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm ${
          s.highlight ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)]" : "border-[color:var(--border-color)] bg-[var(--white-cards)]"
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-yellow)]/30 text-[color:var(--charcoal-black)]">
          <s.icon size={22} />
        </span>
        <div className="min-w-0">
          <p className="text-xs uppercase text-[color:var(--primary-text)]">{s.title}</p>
          <p className="text-2xl font-bold text-[color:var(--charcoal-black)]">{s.value}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- Transactions table ---------------- */

const TransactionsTable = ({ items, onView }) => (
  <div className="mt-4 overflow-x-auto rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
    <table className="w-full min-w-[800px] text-left text-sm">
      <thead className="text-xs uppercase text-[color:var(--secondary-text)]">
        <tr>
          {headings.map((h, i) => (
            <th key={i} className="px-4 py-3 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((t) => (
          <tr key={t.id} className="border-t border-[color:var(--border-color)]">
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{t.id}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{t.type}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{t.details}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{t.date}</td>
            <td className="px-4 py-4 font-semibold text-[color:var(--primary-text)]">{rs(t.amount)}</td>
            <td className="px-4 py-4"><Badge text={t.status} /></td>
            <td className="px-4 py-4">
              <button
                type="button"
                onClick={() => onView(t.id)}
                className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------- Page ---------------- */

const RiderWalletPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [viewId, setViewId] = useState(null);
  const [topUpOpen, setTopUpOpen] = useState(false);

  // Top-Up form
  const [amount, setAmount] = useState("1000");
  const [method, setMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");
  const [receipt, setReceipt] = useState("");

  const handleOpenTopUp = () => {
    setAmount("1000");
    setMethod("Bank Transfer");
    setReference("");
    setReceipt("");
    setTopUpOpen(true);
  };

  // Submit tabhi chale jab amount, reference aur receipt teeno hon
  const canSubmit = Number(amount) > 0 && reference.trim() !== "" && receipt !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
    const next = {
      id: `T-${601 + transactions.length}`,
      type: "Top-Up",
      details: `${method} — awaiting Admin approval`,
      date: new Date().toISOString().slice(0, 10),
      amount: Number(amount),
      status: "Pending",
      reference: reference.trim(),
      receipt,
    };
    setTransactions([...transactions, next]);
    setTopUpOpen(false);
  };

  // Totals transactions se nikaalo
  const sum = (kind, status) =>
    transactions.reduce((n, t) => (t.type === kind && t.status === status ? n + t.amount : n), 0);
  const approvedTopUps = sum("Top-Up", "Approved");
  const fees = -sum("Platform Fee", "Approved");
  const pendingCount = transactions.reduce((n, t) => (t.status === "Pending" ? n + 1 : n), 0);

  const stats = [
    { title: "Available demo wallet balance", value: rs(approvedTopUps - fees), icon: Wallet, highlight: true },
    { title: "Pending top-up requests", value: pendingCount, icon: Wallet },
    { title: "Approved top-ups", value: rs(approvedTopUps), icon: CircleArrowDown },
    { title: "Platform fees", value: rs(fees), icon: CircleArrowUp },
  ];

  const viewing = transactions.find((t) => t.id === viewId);
  const selected = paymentMethods.find((m) => m.name === method);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + button */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Wallet / Top Up</h1>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">Demo wallet — no real money transfer</p>
        </div>
        <button
          type="button"
          onClick={handleOpenTopUp}
          className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <Plus size={16} /> Top-Up Request
        </button>
      </div>

      <StatCards items={stats} />

      <p className="mt-5 border-l-4 border-[var(--primary-yellow)] pl-4 text-sm text-[color:var(--primary-text)]">
        Example minimum balance: Rs. 1,000 · Example platform fee: Rs. 100 per delivery. Pending requests do not increase balance. No automatic penalties or deductions.
      </p>

      <div className="mt-5">
        <TransactionsTable items={transactions} onView={setViewId} />
      </div>

      <div className="mt-8 border-t border-[color:var(--border-color)] pt-6">
        <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">Refunds / Returns</h2>
        <p className="mt-2 text-sm text-[color:var(--secondary-text)]">No refunds or returns yet.</p>
      </div>

      {/* ---------- Top-Up Request modal (form) ---------- */}
      {topUpOpen && (
        <ModalShell title="Top-Up Request" onClose={() => setTopUpOpen(false)}>
          <label htmlFor="bmTopAmount" className="mt-4 block text-sm text-[color:var(--primary-text)]">Amount (Rs.)</label>
          <input id="bmTopAmount" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} className={field} />

          <label htmlFor="bmTopMethod" className="mt-4 block text-sm text-[color:var(--primary-text)]">Payment Method</label>
          <select id="bmTopMethod" value={method} onChange={(e) => setMethod(e.target.value)} className={field}>
            {paymentMethods.map((m) => (
              <option key={m.name}>{m.name}</option>
            ))}
          </select>

          {/* Selected method ki details */}
          <div className="mt-4 flex flex-col gap-3 border-y border-[color:var(--border-color)] py-4 text-sm">
            {selected.info.map((i) => (
              <div key={i.label}>
                <p className="text-xs text-[color:var(--secondary-text)]">{i.label}</p>
                <p className="text-[color:var(--primary-text)]">{i.value}</p>
              </div>
            ))}
          </div>

          <label htmlFor="bmTopRef" className="mt-4 block text-sm text-[color:var(--primary-text)]">Transaction ID / Reference *</label>
          <input id="bmTopRef" type="text" value={reference} onChange={(e) => setReference(e.target.value)} className={field} />

          <p className="mt-4 text-sm text-[color:var(--primary-text)]">Payment receipt *</p>
          <label className="mt-1.5 inline-flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]">
            <Upload size={16} /> {receipt || "Upload File"}
            <input
              type="file"
              accept="image/*,.pdf"
              aria-label="Payment receipt"
              onChange={(e) => setReceipt(e.target.files[0] ? e.target.files[0].name : "")}
              className="hidden"
            />
          </label>

          <div className="mt-5">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Request
            </button>
          </div>
        </ModalShell>
      )}

      {/* ---------- View modal ---------- */}
      {viewing && (
        <ModalShell title="Transaction Details" onClose={() => setViewId(null)}>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[color:var(--primary-text)]">
            <p>{viewing.id} · {viewing.type}</p>
            <div>
              <p className="font-semibold">{rs(viewing.amount)}</p>
              <p>{viewing.details}</p>
            </div>
            <p>Reference: {viewing.reference}</p>
            <div><Badge text={viewing.status} /></div>
            <p>Receipt{viewing.receipt ? `: ${viewing.receipt}` : ""}</p>
          </div>
        </ModalShell>
      )}
    </section>
  );
};

export default RiderWalletPage;