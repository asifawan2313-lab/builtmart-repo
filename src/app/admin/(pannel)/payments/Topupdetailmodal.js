"use client";

import { X, FileText, Eye, Download } from "lucide-react";

// Status ke hisab se badge ka rang
const bmModalStatusColors = {
  Pending: "bg-orange-50 text-orange-600 border-orange-200",
  Approved: "bg-green-50 text-green-700 border-green-200",
  Rejected: "bg-red-50 text-red-600 border-red-200",
};

export default function BmTopUpDetailModal({ request, onClose }) {
  // Jab tak koi request select nahi, modal nahi dikhana
  if (!request) return null;

  // Upar wali 2 columns ki grid ka dataset
  const details = [
    { label: "Supplier", value: request.supplier },
    { label: "Amount", value: request.amount },
    { label: "Method", value: request.method },
    { label: "Reference", value: request.reference },
    { label: "Requested", value: request.date },
    { label: "Wallet Balance", value: request.walletBalance },
    { label: "Decision Date", value: request.decisionDate },
  ];

  const handlePreviewClick = () => console.log("Preview", request.proof);
  const handleDownloadClick = () => console.log("Download", request.proof);

  const bmModalOutlineButton =
    "inline-flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    // Overlay: bahar click karne par band
    <div
      onClick={onClose}
      className="bmTopUpModalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bmTopUpModalBox relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Close icon */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="bmTopUpModalCloseButton absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>

        {/* Request ID */}
        <h2 className="bmTopUpModalTitleText pr-8 text-2xl text-[color:var(--primary-text)]">
          {request.id}
        </h2>

        {/* Status bar */}
        <div
          className={`bmTopUpModalStatusBadge mt-3 rounded-full border px-3 py-1 text-xs ${bmModalStatusColors[request.status]}`}
        >
          {request.status}
        </div>

        {/* Details grid */}
        <div className="bmTopUpModalDetailGrid mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {details.map((d) => (
            <div key={d.label}>
              <p className="text-sm text-[color:var(--secondary-text)]">{d.label}</p>
              <p className="text-sm text-[color:var(--primary-text)]">{d.value}</p>
            </div>
          ))}
        </div>

        {/* Receipt box */}
        <div className="bmTopUpModalReceiptBox mt-5 rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)] p-4 text-sm text-[color:var(--primary-text)]">
          <p className="font-semibold">Payment Receipt — Demo</p>
          <div className="mt-3 space-y-1 text-[color:var(--secondary-text)]">
            <p>{request.supplier}</p>
            <p>{request.amount} · {request.method}</p>
            <p>Reference: {request.reference}</p>
            <p>Date: {request.date}</p>
          </div>
        </div>

        {/* File row */}
        <div className="bmTopUpModalFileRow mt-5 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
            <FileText size={18} className="shrink-0" />
            <span className="break-all">{request.proof}</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={handlePreviewClick} className={bmModalOutlineButton}>
              <Eye size={14} /> Preview
            </button>
            <button type="button" onClick={handleDownloadClick} className={bmModalOutlineButton}>
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {/* Close button */}
        <div className="mt-5 flex justify-end">
          <button type="button" onClick={onClose} className={bmModalOutlineButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}