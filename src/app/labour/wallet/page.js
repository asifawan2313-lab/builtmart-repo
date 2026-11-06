"use client";

import { useEffect, useState } from "react";
import { Clock, Plus, Receipt, TrendingUp, Upload, Wallet, X } from "lucide-react";
import LabourTable from "../../../component/labour/LabourTable/LabourTable";

/* ============================================================
   DEMO DATA (demo wallet: koi asli paisa nahi, sab values sirf UI ke liye hain)
   ============================================================ */

// Approved transactions se balance banta hai. Pending top-up balance nahi badhata
const initialTransactions = [
  { id: "T-501", type: "Top-Up", details: "Bank transfer, approved by Admin", date: "2026-10-01", amount: 5000, status: "Approved" },
  { id: "T-502", type: "Platform Fee", details: "Booking BKG-298", date: "2026-10-11", amount: -100, status: "Approved" },
  { id: "T-503", type: "Platform Fee", details: "Booking BKG-301", date: "2026-10-15", amount: -100, status: "Approved" },
  { id: "T-504", type: "Top-Up", details: "JazzCash, awaiting Admin approval", date: "2026-10-17", amount: 2000, status: "Pending" },
];

// Har payment method ki demo details (asli account nahi)
const methods = {
  "Bank Transfer": { bank: "DEMO BANK (not a real account)", title: "BuildMart Demo", account: "DEMO-ACCOUNT-ONLY" },
  JazzCash: { bank: "DEMO JAZZCASH (not a real account)", title: "BuildMart Demo", account: "DEMO-0300-0000000" },
  Easypaisa: { bank: "DEMO EASYPAISA (not a real account)", title: "BuildMart Demo", account: "DEMO-0300-1111111" },
};

const statusClass = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-[#FDC716]/25 text-[#202124]",
  Rejected: "bg-red-50 text-red-700",
};

const emptyForm = { amount: "1000", method: "Bank Transfer", reference: "", receipt: null };

const rs = (amount) => `Rs. ${Number(amount).toLocaleString()}`;
const signed = (amount) => (amount < 0 ? `Rs. -${Math.abs(amount).toLocaleString()}` : rs(amount));

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#FDC716] bg-[#FDC716] px-5 text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60 disabled:cursor-not-allowed disabled:opacity-50";

const outlineBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#D9E3E9] bg-white text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

/* ============================================================
   PAGE (top-up form aur modal page ke andar hi hain)
   ============================================================ */

const LabourWalletPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [viewing, setViewing] = useState(null); // kis transaction ki detail khuli hai
  const [form, setForm] = useState(emptyForm);

  const closeModals = () => {
    setIsTopUpOpen(false);
    setViewing(null);
  };

  // Escape dabane par modal band
  useEffect(() => {
    if (!isTopUpOpen && !viewing) return;
    const onKey = (e) => e.key === "Escape" && closeModals();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isTopUpOpen, viewing]);

  const handleOpenTopUp = () => {
    setForm(emptyForm);
    setIsTopUpOpen(true);
  };

  // Top-up request (simulated): Pending ban kar judti hai, balance nahi badhta
  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);

    setTransactions((prev) => [
      ...prev,
      {
        id: `T-${505 + prev.length - initialTransactions.length}`,
        type: "Top-Up",
        details: `${form.method}, awaiting Admin approval (ref ${form.reference.trim()})`,
        date: today,
        amount: Number(form.amount),
        status: "Pending",
      },
    ]);
    closeModals();
  };

  // Stats transactions se nikalte hain
  const approved = transactions.filter((t) => t.status === "Approved");
  const balance = approved.reduce((sum, t) => sum + t.amount, 0);
  const pendingCount = transactions.filter((t) => t.type === "Top-Up" && t.status === "Pending").length;
  const approvedTopUps = approved.filter((t) => t.type === "Top-Up").reduce((sum, t) => sum + t.amount, 0);
  const platformFees = approved.filter((t) => t.type === "Platform Fee").reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const canSubmit = Number(form.amount) > 0 && form.reference.trim() !== "" && form.receipt;
  const method = methods[form.method];

  // Chaaron cards ek jaise: sirf icon, koi rang ka dabba nahi
  const stats = [
    { id: 1, label: "Available Demo Wallet Balance", value: rs(balance), icon: Wallet },
    { id: 2, label: "Pending Top-Up Requests", value: pendingCount, icon: Clock },
    { id: 3, label: "Approved Top-Ups", value: rs(approvedTopUps), icon: TrendingUp },
    { id: 4, label: "Platform Fees", value: rs(platformFees), icon: Receipt },
  ];

  // Table ke columns: har cell ka design yahan likha hai
  const columns = [
    { key: "id", label: "TXN ID" },
    { key: "type", label: "Type" },
    { key: "details", label: "Details" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount", render: (t) => <span className="font-semibold">{signed(t.amount)}</span> },
    {
      key: "status",
      label: "Status",
      render: (t) => <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[t.status]}`}>{t.status}</span>,
    },
    {
      key: "action",
      label: "",
      render: (t) => (
        <button type="button" onClick={() => setViewing(t)} className={`${outlineBtn} h-8 rounded-md px-3 text-xs`}>
          View
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Heading + button */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Payments &amp; Wallet</h1>
          <p className="mt-1 text-xs text-[#565553]">Demo wallet: no real money transfer</p>
        </div>

        <button type="button" onClick={handleOpenTopUp} className={yellowBtn}>
          <Plus size={16} aria-hidden="true" />
          Top-Up Request
        </button>
      </div>

      {/* Stat cards */}
      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ id, label, value, icon: StatIcon }) => (
          <article key={id} className="flex items-center gap-3 rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm">
            <StatIcon size={22} className="shrink-0 text-[#292929]" aria-hidden="true" />
            <div>
              <p className="text-[10px] font-semibold uppercase text-[#565553]">{label}</p>
              <p className="text-xl font-extrabold text-[#292929]">{value}</p>
            </div>
          </article>
        ))}
      </section>

      <p className="mt-4 border-l-4 border-[#FDC716] pl-3 text-xs text-[#565553]">
        Example values only: minimum balance Rs. 1,000, platform fee Rs. 100 per booking. Pending requests do not increase
        the balance. No automatic penalties or deductions.
      </p>

      <div className="mt-4">
        <LabourTable columns={columns} rows={transactions} emptyText="No transactions yet." />
      </div>

      <section className="mt-6 border-t border-[#D9E3E9] pt-4">
        <h2 className="text-sm font-bold text-[#202124]">Refunds / Returns</h2>
        <p className="mt-1 text-sm text-[#565553]">No refunds or returns yet.</p>
      </section>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample data shown for demonstration purposes.</p>

      {/* ---------- Top-Up Request modal ---------- */}
      {isTopUpOpen && (
        <div onClick={closeModals} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="topup-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#D9E3E9] pb-3">
              <h2 id="topup-title" className="text-lg font-bold text-[#202124]">Top-Up Request</h2>
              <button type="button" onClick={closeModals} aria-label="Close" className="cursor-pointer text-[#565553] hover:text-[#202124]">
                <X size={18} />
              </button>
            </div>

            <label className="block text-sm font-semibold text-[#202124]">
              Amount (Rs.)
              <input
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={`${field} mt-1 font-normal`}
              />
            </label>

            <label className="block text-sm font-semibold text-[#202124]">
              Payment Method
              <select
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                className={`${field} mt-1 font-normal`}
              >
                {Object.keys(methods).map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>

            <dl className="space-y-2 border-y border-[#D9E3E9] py-3 text-sm">
              {[
                { label: "Account name", value: method.bank },
                { label: "Account title", value: method.title },
                { label: "Account number", value: method.account },
                { label: "Instructions", value: "Simulated payment receipt only; do not send money." },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs text-[#565553]">{label}</dt>
                  <dd className="font-medium text-[#202124]">{value}</dd>
                </div>
              ))}
            </dl>

            <label className="block text-sm font-semibold text-[#202124]">
              Transaction ID / Reference *
              <input
                type="text"
                value={form.reference}
                onChange={(e) => setForm({ ...form, reference: e.target.value })}
                className={`${field} mt-1 font-normal`}
              />
            </label>

            <div>
              <p className="text-sm font-semibold text-[#202124]">Payment receipt *</p>
              <label className={`${outlineBtn} mt-2 h-10 max-w-full px-4`}>
                <Upload size={14} aria-hidden="true" />
                <span className="truncate">{form.receipt?.name || "Upload File"}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="sr-only"
                  onChange={(e) => setForm({ ...form, receipt: e.target.files[0] || null })}
                />
              </label>
            </div>

            <button type="submit" disabled={!canSubmit} className={yellowBtn}>
              Submit Request
            </button>
            <p className="text-xs text-[#565553]">Demo only: no file is uploaded and no money is moved.</p>
          </form>
        </div>
      )}

      {/* ---------- Transaction details modal ---------- */}
      {viewing && (
        <div onClick={closeModals} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="txn-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md space-y-3 rounded-xl bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#D9E3E9] pb-3">
              <h2 id="txn-title" className="text-lg font-bold text-[#202124]">Transaction {viewing.id}</h2>
              <button type="button" onClick={closeModals} aria-label="Close" className="cursor-pointer text-[#565553] hover:text-[#202124]">
                <X size={18} />
              </button>
            </div>

            <dl className="space-y-2 text-sm">
              {[
                { label: "Type", value: viewing.type },
                { label: "Details", value: viewing.details },
                { label: "Date", value: viewing.date },
                { label: "Amount", value: signed(viewing.amount) },
                { label: "Status", value: viewing.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-[#565553]">{label}</dt>
                  <dd className="text-right font-medium text-[#202124]">{value}</dd>
                </div>
              ))}
            </dl>

            {viewing.status === "Pending" && (
              <p className="rounded bg-[#FDC716]/20 px-3 py-2 text-xs text-[#202124]">
                Waiting for Admin approval. The balance changes only after approval.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourWalletPage;