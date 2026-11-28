"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import BmRiderNotificationPageheader from "../../../component/rider/pageheader/BmRiderNotificationPageheader.js";
import BmRiderWalletDataRow from "../../../component/rider/wallet/BmRiderWalletDataRow.js";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

// Stats cards — backend se connect hoga
const BM_WALLET_STATS = [
  { label: "Available demo wallet balance", value: "Rs. 6,700", icon: Wallet, highlight: true },
  { label: "Pending top-up requests", value: "1", icon: Clock },
  { label: "Approved top-ups", value: "Rs. 5,000", icon: ArrowDownToLine },
  { label: "Platform fees", value: "Rs. 100", icon: ArrowUpFromLine },
];

const BM_TRANSACTIONS = [
  { id: "T-501", type: "Top-Up", details: "Bank transfer — approved by Admin", date: "2026-10-01", amount: 5000, status: "Approved", reference: "", receiptName: "receipt_T-501.pdf", receiptUrl: "/documents/receipt_T-501.pdf" },
  { id: "T-502", type: "Delivery Fee", details: "Delivery RD-2030", date: "2026-10-11", amount: 1800, status: "Approved", reference: "", receiptName: "", receiptUrl: "" },
  { id: "T-503", type: "Platform Fee", details: "Delivery RD-2030", date: "2026-10-15", amount: -100, status: "Approved", reference: "", receiptName: "", receiptUrl: "" },
  { id: "T-504", type: "Top-Up", details: "JazzCash — awaiting Admin approval", date: "2026-10-17", amount: 2000, status: "Pending", reference: "JC-88231", receiptName: "receipt_T-504.png", receiptUrl: "/documents/receipt_T-504.png" },
  { id: "T-505", type: "Top-Up", details: "Easypaisa — rejected by Admin", date: "2026-10-18", amount: 1500, status: "Rejected", reference: "EP-55102", receiptName: "receipt_T-505.jpg", receiptUrl: "/documents/receipt_T-505.jpg" },
  { id: "T-506", type: "Top-Up", details: "Bank transfer — rejected by Admin", date: "2026-10-19", amount: 1000, status: "Rejected", reference: "", receiptName: "", receiptUrl: "" },
];

const BM_PAYMENT_METHODS = ["Bank Transfer", "JazzCash", "Easypaisa"];

// Payment method ke hisaab se demo account info
const BM_PAYMENT_INFO = {
  "Bank Transfer": [
    ["Bank name", "DEMO BANK — not a real account"],
    ["Account title", "BuildMart Demo"],
    ["Account / IBAN", "DEMO-ACCOUNT-ONLY"],
    ["Instructions", "Simulated payment receipt only; do not send money."],
  ],
  JazzCash: [
    ["Wallet name", "DEMO JAZZCASH — not a real account"],
    ["Account title", "BuildMart Demo"],
    ["Mobile number", "DEMO-0300-0000000"],
    ["Instructions", "Simulated payment receipt only; do not send money."],
  ],
  Easypaisa: [
    ["Wallet name", "DEMO EASYPAISA — not a real account"],
    ["Account title", "BuildMart Demo"],
    ["Mobile number", "DEMO-0300-0000000"],
    ["Instructions", "Simulated payment receipt only; do not send money."],
  ],
};

const BM_EMPTY_FORM = { amount: "1000", method: "Bank Transfer", reference: "", fileName: "" };

const th = "px-4 py-3 font-medium";
const fieldClass =
  "mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const labelClass = "block text-sm text-[color:var(--primary-text)]";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [topupOpen, setTopupOpen] = useState(false);
  const [form, setForm] = useState(BM_EMPTY_FORM);

  const handleChange = (key, value) =>
    setForm((old) => ({ ...old, [key]: value }));

  const handleCloseTopup = () => {
    setTopupOpen(false);
    setForm(BM_EMPTY_FORM);
  };

  const handleSubmitRequest = () => {
    alert(`Top-up request of Rs. ${form.amount} via ${form.method} submitted (demo)`);
    handleCloseTopup();
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      {/* HEADER + TOP-UP REQUEST BUTTON (button page.js mein hai) */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <BmRiderNotificationPageheader
          title="Wallet"
          description="Demo wallet — no real money transfer"
        />

        <button
          type="button"
          onClick={() => setTopupOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <Plus size={15} />
          Top-Up Request
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BM_WALLET_STATS.map(({ label, value, icon: Icon, highlight }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl border p-4 shadow-sm ${
              highlight
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
            }`}
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                highlight ? "bg-black/10" : "bg-[var(--primary-yellow)]/25"
              }`}
            >
              <Icon size={18} />
            </span>

            <div>
              <p className="text-[11px] uppercase">{label}</p>
              <p className="text-2xl font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* NOTE */}
      <p className="mt-4 border-l-4 border-[var(--primary-yellow)] pl-3 text-sm text-[color:var(--primary-text)]">
        Example minimum balance: Rs. 1,000 · Example platform fee: Rs. 100 per
        delivery. Pending requests do not increase balance. No automatic penalties
        or deductions.
      </p>

      {/* TABLE CARD */}
      <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                <th className={th}>Txn ID</th>
                <th className={th}>Type</th>
                <th className={th}>Details</th>
                <th className={th}>Date</th>
                <th className={th}>Amount</th>
                <th className={th}>Status</th>
                <th className={th}></th>
              </tr>
            </thead>

            <tbody>
              {BM_TRANSACTIONS.map((transaction) => (
                <BmRiderWalletDataRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{BM_TRANSACTIONS.length} records</span>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronLeft size={14} />
            </button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* REFUNDS / RETURNS */}
      <div className="mt-8 border-t border-[color:var(--border-color)] pt-6">
        <h2 className="font-semibold text-[color:var(--primary-text)]">
          Refunds / Returns
        </h2>
        <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
          No refunds or returns yet.
        </p>
      </div>

      {/* TOP-UP REQUEST MODAL */}
      {topupOpen && (
        <div
          onClick={handleCloseTopup}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
              <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                Top-Up Request
              </h2>
              <button
                type="button"
                onClick={handleCloseTopup}
                aria-label="Close modal"
                className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <label htmlFor="bm-topup-amount" className={labelClass}>
                Amount (Rs.)
              </label>
              <input
                id="bm-topup-amount"
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="bm-topup-method" className={labelClass}>
                Payment Method
              </label>
              <select
                id="bm-topup-method"
                value={form.method}
                onChange={(e) => handleChange("method", e.target.value)}
                className={fieldClass}
              >
                {BM_PAYMENT_METHODS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Demo account info — method ke hisaab se */}
            <div className="mt-4 space-y-3 border-y border-[color:var(--border-color)] py-4">
              {BM_PAYMENT_INFO[form.method].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-[color:var(--secondary-text)]">
                    {label}
                  </p>
                  <p className="text-sm text-[color:var(--primary-text)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label htmlFor="bm-topup-reference" className={labelClass}>
                Transaction ID / Reference *
              </label>
              <input
                id="bm-topup-reference"
                value={form.reference}
                onChange={(e) => handleChange("reference", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <p className={labelClass}>Payment receipt *</p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]">
                  <Upload size={15} />
                  Upload File
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) =>
                      handleChange("fileName", e.target.files?.[0]?.name || "")
                    }
                    className="hidden"
                  />
                </label>

                {form.fileName && (
                  <span className="truncate text-xs text-[color:var(--secondary-text)]">
                    {form.fileName}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmitRequest}
              className="mt-5 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;