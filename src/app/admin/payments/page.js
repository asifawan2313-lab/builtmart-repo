// import TopUpRequests from "./Topuprequest.js";

// export default function PaymentsPage() {
//   return <TopUpRequests />;
// }


"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X, FileText, Eye, Download } from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialRequests = [
  { id: "TX-5006", supplier: "Sheikh Traders", amount: "Rs 10,000", method: "Bank Transfer (Demo)", reference: "Receipt #88231", proof: "receipt_TX-5006.pdf", date: "2026-10-17", status: "Pending", walletBalance: "Rs 18,500", decisionDate: "—", rejectionReason: "—" },
  { id: "TX-5007", supplier: "Brick House", amount: "Rs 5,000", method: "JazzCash (Demo)", reference: "Ref JC-22910", proof: "receipt_TX-5007.pdf", date: "2026-10-18", status: "Pending", walletBalance: "Rs 12,000", decisionDate: "—", rejectionReason: "—" },
  { id: "TX-5008", supplier: "Brick House", amount: "Rs 8,000", method: "Bank Transfer (Demo)", reference: "—", proof: "receipt_TX-5008.pdf", date: "2026-10-03", status: "Approved", walletBalance: "Rs 20,000", decisionDate: "2026-10-04", rejectionReason: "—" },
];

const headings = ["Request ID", "Supplier / Shop Name", "Requested Amount", "Payment Method", "Transaction Reference", "Payment Proof / Receipt", "Request Date", "Status", "Actions"];
const sortable = ["Request ID", "Requested Amount", "Request Date"];
const perPage = 8; // ek page par kitne rows

/* ---------------- Shared styles ---------------- */

// Status ke hisab se badge ka rang (table aur modal dono mein)
const badgeColors = {
  Pending: "bg-orange-50 text-orange-600 ring-orange-200",
  Approved: "bg-green-50 text-green-700 ring-green-200",
  Rejected: "bg-red-50 text-red-600 ring-red-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const modalOutlineBtn = `inline-flex items-center gap-2 ${btn}`;

/* ---------------- Shared modal shell ---------------- */

// Overlay + box + close icon: teeno modals yahi use karte hain
const BmModal = ({ name, size, onClose, children }) => (
  // Overlay: bahar click karne par band
  <div
    onClick={onClose}
    className={`bm${name}ModalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4`}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bm${name}ModalBox relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`bm${name}ModalCloseButton absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]`}
      >
        <X size={18} />
      </button>
      {children}
    </div>
  </div>
);

/* ---------------- Detail modal ---------------- */

const BmTopUpDetailModal = ({ request, onClose }) => {
  // Jab tak koi request select nahi, modal nahi dikhana
  if (!request) return null;

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

  return (
    <BmModal name="TopUp" size="max-w-xl" onClose={onClose}>
      {/* Request ID */}
      <h2 className="bmTopUpModalTitleText pr-8 text-2xl text-[color:var(--primary-text)]">
        {request.id}
      </h2>

      {/* Status bar */}
      <div className={`bmTopUpModalStatusBadge mt-3 inline-block rounded-full px-3 py-1 text-xs ring-1 ${badgeColors[request.status]}`}>
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
          <button type="button" onClick={handlePreviewClick} className={modalOutlineBtn}>
            <Eye size={14} /> Preview
          </button>
          <button type="button" onClick={handleDownloadClick} className={modalOutlineBtn}>
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      {/* Close button */}
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onClose} className={modalOutlineBtn}>
          Close
        </button>
      </div>
    </BmModal>
  );
};

/* ---------------- Approve modal ---------------- */

const BmTopUpApproveModal = ({ request, onCancel, onConfirm }) => {
  if (!request) return null;

  return (
    <BmModal name="Approve" size="max-w-md" onClose={onCancel}>
      <h2 className="bmApproveModalTitleText pr-8 text-xl text-[color:var(--primary-text)]">
        Approve Top-Up
      </h2>
      <p className="bmApproveModalMessageText mt-3 text-sm text-[color:var(--secondary-text)]">
        Approve {request.id} and credit {request.amount} to {request.supplier}&apos;s demo wallet?
      </p>
      <div className="bmApproveModalActions mt-6 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className={btn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          Confirm Approval
        </button>
      </div>
    </BmModal>
  );
};

/* ---------------- Reject modal ---------------- */

const BmTopUpRejectModal = ({ request, onCancel, onConfirm }) => {
  const [reason, setReason] = useState("");
  const isEmpty = reason.trim() === "";

  if (!request) return null;

  const handleConfirm = () => onConfirm(reason.trim());

  return (
    <BmModal name="Reject" size="max-w-md" onClose={onCancel}>
      <h2 className="bmRejectModalTitleText pr-8 text-xl text-[color:var(--primary-text)]">
        Reject Top-Up
      </h2>
      <p className="bmRejectModalInfoText mt-2 text-sm text-[color:var(--secondary-text)]">
        {request.id} · {request.supplier} · {request.amount}
      </p>

      <label
        htmlFor="bmRejectReasonInput"
        className="mt-4 block text-sm text-[color:var(--primary-text)]"
      >
        Rejection reason (required)
      </label>
      <textarea
        id="bmRejectReasonInput"
        autoFocus
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="bmRejectModalReasonInput mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none"
      />

      <div className="bmRejectModalActions mt-5 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className={btn}>
          Cancel
        </button>
        <button
          type="button"
          disabled={isEmpty}
          onClick={handleConfirm}
          className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
        >
          Confirm Rejection
        </button>
      </div>
    </BmModal>
  );
};

/* ---------------- Page ---------------- */

const PaymentsPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Pending / Approved / Rejected
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null); // View modal
  const [approveId, setApproveId] = useState(null); // Approve confirmation modal
  const [rejectId, setRejectId] = useState(null); // Reject reason modal

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // View: modal kholo / band karo
  const handleViewClick = (request) => setSelectedId(request.id);
  const handleModalClose = () => setSelectedId(null);

  // Approve / Reject: status, decision date aur reason badal do
  const handleStatusChange = (id, newStatus, reason = "—") => {
    const today = new Date().toISOString().slice(0, 10);
    setRequests(
      requests.map((r) =>
        r.id === id
          ? { ...r, status: newStatus, decisionDate: today, rejectionReason: reason }
          : r
      )
    );
  };

  // Receipt click
  const handleReceiptClick = (proof) => console.log("Receipt", proof);

  // Approve: confirmation modal kholo, cancel par band, confirm par approve
  const handleApproveClick = (request) => setApproveId(request.id);
  const handleApproveCancel = () => setApproveId(null);
  const handleApproveConfirm = () => {
    handleStatusChange(approveId, "Approved");
    setApproveId(null);
  };

  // Reject: reason modal kholo, cancel par band, confirm par reason ke saath reject
  const handleRejectClick = (request) => setRejectId(request.id);
  const handleRejectCancel = () => setRejectId(null);
  const handleRejectConfirm = (reason) => {
    handleStatusChange(rejectId, "Rejected", reason);
    setRejectId(null);
  };

  // Modals ko hamesha taaza request milegi
  const selected = requests.find((r) => r.id === selectedId);
  const approveRequest = requests.find((r) => r.id === approveId);
  const rejectRequest = requests.find((r) => r.id === rejectId);

  // 1) Search aur dropdown dono par poore utre hue requests chuno
  const visible = requests.reduce((all, r) => {
    const matchSearch = `${r.id} ${r.supplier} ${r.method} ${r.reference}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || r.status === status;
    return matchSearch && matchStatus ? [...all, r] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="bmTopUpSection p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="bmTopUpHeadingText text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Top-Up Requests
      </h1>

      {/* Card */}
      <div className="bmTopUpCard mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + dropdown */}
        <div className="bmTopUpToolbar flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              className="bmTopUpSearchInput w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            className="bmTopUpStatusSelect rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Table (chhoti screen par sirf table scroll hoti hai, page nahi) */}
        <div className="overflow-x-auto">
          <table className="bmTopUpTable w-full min-w-[1200px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {sortable.includes(h) && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.id}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.supplier}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.amount}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.method}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.reference}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleReceiptClick(r.proof)}
                      className="bmTopUpReceiptButton text-xs text-[color:var(--primary-yellow)] hover:underline"
                    >
                      {r.proof}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`bmTopUpStatusBadge rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewClick(r)}
                        className={`bmTopUpViewButton ${btn}`}
                      >
                        View
                      </button>

                      {/* Approve / Reject sirf Pending requests par */}
                      {r.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApproveClick(r)}
                            className="bmTopUpApproveButton rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectClick(r)}
                            className={`bmTopUpRejectButton ${btn}`}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: records + pages */}
        <div className="bmTopUpFooter flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} records</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="bmTopUpPrevButton disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="bmTopUpNextButton disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BmTopUpDetailModal request={selected} onClose={handleModalClose} />
      <BmTopUpApproveModal
        request={approveRequest}
        onCancel={handleApproveCancel}
        onConfirm={handleApproveConfirm}
      />
      {rejectRequest && (
        <BmTopUpRejectModal
          request={rejectRequest}
          onCancel={handleRejectCancel}
          onConfirm={handleRejectConfirm}
        />
      )}
    </section>
  );
};

export default PaymentsPage;