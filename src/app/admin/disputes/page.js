// import DisputesSupport from "./Disputesupport.js";

// export default function DisputesPage() {
//   return <DisputesSupport />;
// }




"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialDisputes = [
  { id: "TKT-301", orderId: "ORD-1005", customer: "Ahmed Raza", supplier: "Brick House", type: "Quality issue", date: "2026-10-10", status: "Resolved" },
  { id: "TKT-302", orderId: "ORD-1002", customer: "Sana Malik", supplier: "Brick House", type: "COD refused", date: "2026-10-17", status: "Open" },
  { id: "TKT-303", orderId: "ORD-1003", customer: "Bilal Khan", supplier: "Sheikh Traders", type: "Paid but not delivered", date: "2026-10-18", status: "Under Review" },
  { id: "TKT-304", orderId: "ORD-1007", customer: "Usman Ali", supplier: "Tile City", type: "Wrong item sent", date: "2026-10-19", status: "Waiting for Response" },
];

const headings = ["Dispute ID", "Order ID", "Customer", "Supplier", "Dispute Type", "Date", "Status", "Actions"];
const statusOptions = ["All", "Open", "Under Review", "Waiting for Response", "Resolved", "Rejected"];
const outcomes = [
  "Refund Issued",
  "Replacement Provided",
  "Resolved in Customer's Favor",
  "Resolved in Supplier's Favor",
  "No Action Required",
];
const perPage = 8; // ek page par kitne rows

/* ---------------- Shared styles ---------------- */

// Status ke hisab se badge ka rang
const badgeColors = {
  Open: "bg-orange-50 text-orange-600 ring-orange-200",
  "Under Review": "bg-orange-50 text-orange-600 ring-orange-200",
  "Waiting for Response": "bg-blue-50 text-blue-600 ring-blue-200",
  Resolved: "bg-green-50 text-green-700 ring-green-200",
  Rejected: "bg-red-50 text-red-600 ring-red-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const input =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";
const modalCancelBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* ---------------- Shared modal shell ---------------- */

// Overlay + heading + close + "ID · type" line + Cancel/Confirm buttons: dono modals yahi use karte hain
const DisputeModal = ({ title, dispute, onClose, confirmText, confirmClass, disabled, onConfirm, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
    >
      {/* Heading + Close */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">{title}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>
      </div>

      <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
        {dispute.id} · {dispute.type}
      </p>

      {children}

      {/* Cancel + Confirm */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className={modalCancelBtn}>
          Cancel
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onConfirm}
          className={`rounded-md px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${confirmClass}`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

/* ---------------- Reject modal ---------------- */

const DisputeRejectModal = ({ dispute, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  // Reason khali ho to Confirm button band rahega
  const isEmpty = reason.trim() === "";

  const handleConfirm = () => {
    if (isEmpty) return;
    onConfirm(reason.trim());
  };

  return (
    <DisputeModal
      title="Reject Dispute"
      dispute={dispute}
      onClose={onClose}
      confirmText="Confirm Rejection"
      confirmClass="bg-red-600 text-white hover:bg-red-700"
      disabled={isEmpty}
      onConfirm={handleConfirm}
    >
      <div className="mt-4">
        <label htmlFor="disputeRejectReason" className={label}>Rejection Reason (required)</label>
        <textarea
          id="disputeRejectReason"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          autoFocus
          className={`${input} resize-y`}
        />
      </div>
    </DisputeModal>
  );
};

/* ---------------- Resolve modal ---------------- */

const DisputeResolveModal = ({ dispute, onClose, onConfirm }) => {
  const [outcome, setOutcome] = useState(outcomes[0]);
  const [note, setNote] = useState("");

  // Note khali ho to Confirm button band rahega
  const isEmpty = note.trim() === "";

  const handleConfirm = () => {
    if (isEmpty) return;
    onConfirm(outcome, note.trim());
  };

  return (
    <DisputeModal
      title="Resolve Dispute"
      dispute={dispute}
      onClose={onClose}
      confirmText="Confirm Resolution"
      confirmClass="bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
      disabled={isEmpty}
      onConfirm={handleConfirm}
    >
      <div className="mt-4">
        <label htmlFor="disputeOutcome" className={label}>Resolution Outcome</label>
        <select id="disputeOutcome" value={outcome} onChange={(e) => setOutcome(e.target.value)} className={input}>
          {outcomes.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="disputeNote" className={label}>Resolution Note (required)</label>
        <textarea
          id="disputeNote"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={`${input} resize-y`}
        />
      </div>
    </DisputeModal>
  );
};

/* ---------------- Page ---------------- */

const DisputesPage = () => {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [resolving, setResolving] = useState(null); // Resolve modal wali dispute
  const [rejecting, setRejecting] = useState(null); // Reject modal wali dispute

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Reject modal: confirm par status Rejected karo aur reason save karo
  const handleReject = (reason) => {
    setDisputes(
      disputes.map((d) => (d.id === rejecting.id ? { ...d, status: "Rejected", reason } : d))
    );
    setRejecting(null);
  };

  // Resolve modal: confirm par status Resolved karo aur outcome + note save karo
  const handleResolve = (outcome, note) => {
    setDisputes(
      disputes.map((d) => (d.id === resolving.id ? { ...d, status: "Resolved", outcome, note } : d))
    );
    setResolving(null);
  };

  // 1) Search aur dropdown dono par poore utre hue disputes chuno
  const visible = disputes.reduce((all, d) => {
    const matchSearch = `${d.id} ${d.orderId} ${d.customer} ${d.supplier} ${d.type}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || d.status === status;
    return matchSearch && matchStatus ? [...all, d] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Disputes &amp; Support
      </h1>

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
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-52"
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
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {h === "Date" && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.id}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.orderId}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.customer}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.supplier}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.type}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.date}</td>
                  <td className="px-4 py-3">
                    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => console.log("View", d.id)} className={btn}>View</button>

                      {/* Resolve / Reject sirf unn disputes par jo abhi band nahi hue */}
                      {d.status !== "Resolved" && d.status !== "Rejected" && (
                        <>
                          <button
                            type="button"
                            onClick={() => setResolving(d)}
                            className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
                          >
                            Resolve
                          </button>
                          <button type="button" onClick={() => setRejecting(d)} className={btn}>
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
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} records</span>
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

      {/* Modals */}
      {resolving && (
        <DisputeResolveModal
          key={resolving.id}
          dispute={resolving}
          onClose={() => setResolving(null)}
          onConfirm={handleResolve}
        />
      )}
      {rejecting && (
        <DisputeRejectModal
          key={rejecting.id}
          dispute={rejecting}
          onClose={() => setRejecting(null)}
          onConfirm={handleReject}
        />
      )}
    </section>
  );
};

export default DisputesPage;