"use client";

import { useState } from "react";
import { FileText, X } from "lucide-react";

const STATUS_CHIP = {
  Approved: "border-green-300 bg-green-50 text-green-700",
  Pending: "border-orange-300 bg-orange-50 text-orange-500",
  Rejected: "border-red-300 bg-red-50 text-red-500",
};

const formatRs = (amount) => `Rs. ${amount.toLocaleString("en-US")}`;

const BmRiderWalletDataRow = ({ transaction }) => {
  const [viewOpen, setViewOpen] = useState(false);

  const handleClose = () => setViewOpen(false);

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-4">{transaction.id}</td>
      <td className="px-4 py-4">{transaction.type}</td>
      <td className="px-4 py-4">{transaction.details}</td>
      <td className="px-4 py-4">{transaction.date}</td>
      <td className="px-4 py-4 font-semibold">{formatRs(transaction.amount)}</td>
      <td className="px-4 py-4">
        <span
          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CHIP[transaction.status]}`}
        >
          {transaction.status}
        </span>
      </td>

      <td className="px-4 py-4 text-right">
        <button
          type="button"
          onClick={() => setViewOpen(true)}
          className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
        >
          View
        </button>

        {/* TRANSACTION DETAILS MODAL */}
        {viewOpen && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
                <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                  Transaction Details
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-[color:var(--primary-text)]">
                <p>
                  {transaction.id} · {transaction.type}
                </p>

                <div>
                  <p className="font-semibold">{formatRs(transaction.amount)}</p>
                  <p>{transaction.details}</p>
                </div>

                <p>Reference: {transaction.reference || "Not provided"}</p>

                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CHIP[transaction.status]}`}
                >
                  {transaction.status}
                </span>

                <div>
                  <p>Receipt</p>
                  {transaction.receiptName ? (
                    <a
                      href={transaction.receiptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-2 text-xs text-[color:var(--primary-yellow)] hover:underline"
                    >
                      <FileText size={13} />
                      {transaction.receiptName}
                    </a>
                  ) : (
                    <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
                      No receipt uploaded.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmRiderWalletDataRow;