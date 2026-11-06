"use client";

import { useState } from "react";
import {
  ClipboardList, Clock, ShieldCheck, ShieldX, Search, ArrowUpDown,
  ChevronLeft, ChevronRight, X, FileText, Eye, Download,
} from "lucide-react";

/* ---------------- Datasets ---------------- */

const initialSuppliers = [
  { id: "KYC-S4-1", name: "Nadia Hussain", shop: "PaintPro", email: "nadia@paintpro.pk", phone: "0336-5656565", address: "Main Boulevard, Gulberg, Lahore", registered: "13/10/2026", submitted: "14/10/2026", status: "Pending Verification", code: "s4", reason: "" },
  { id: "KYC-S5-1", name: "Kamran Ali", shop: "Tile City", email: "kamran@tilecity.pk", phone: "0312-3434343", address: "G-9 Markaz, Islamabad", registered: "11/10/2026", submitted: "12/10/2026", status: "Pending Verification", code: "s5", reason: "" },
  { id: "KYC-S3-1", name: "Zahid Mehmood", shop: "Zahid Iron Works", email: "zahid@ironworks.pk", phone: "0344-7878787", address: "GT Road, Gujranwala", registered: "18/09/2026", submitted: "19/09/2026", status: "Rejected", code: "s3", reason: "CNIC unclear" },
  { id: "KYC-S2-1", name: "Farah Iqbal", shop: "Brick House", email: "farah@brickhouse.pk", phone: "0322-1212121", address: "Korangi Industrial Area, Karachi", registered: "23/08/2026", submitted: "24/08/2026", status: "Verified", code: "s2", reason: "" },
  { id: "KYC-S1-1", name: "Imran Sheikh", shop: "Sheikh Traders", email: "imran@sheikhtraders.pk", phone: "0300-7778899", address: "Shahdara, Lahore", registered: "19/07/2026", submitted: "20/07/2026", status: "Verified", code: "s1", reason: "" },
];

const tabs = [
  { label: "All Requests", status: "All" },
  { label: "Pending", status: "Pending Verification" },
  { label: "Verified", status: "Verified" },
  { label: "Rejected", status: "Rejected" },
];

const headings = ["Supplier Name", "Shop / Business Name", "Email", "Phone Number", "Submission Date", "Verification Status", "Actions"];
const sortable = ["Supplier Name", "Submission Date"];
const perPage = 8;

// Har supplier ke 3 documents (file ka naam code se banta hai)
const documents = [
  { title: "Identity Card Front", file: "identity_front.pdf" },
  { title: "Identity Card Back", file: "identity_back.pdf" },
  { title: "Shop / Business Licence", file: "trade_license.pdf" },
];

/* ---------------- Shared styles ---------------- */

const badgeColors = {
  "Pending Verification": "bg-orange-50 text-orange-600 ring-orange-200",
  Verified: "bg-green-50 text-green-700 ring-green-200",
  Rejected: "bg-red-50 text-red-600 ring-red-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const redBtn = "rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700";

const Badge = ({ text }) => (
  <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ring-1 ${badgeColors[text]}`}>{text}</span>
);

// Overlay + heading + close icon
const ModalShell = ({ title, size = "max-w-md", onClose, children }) => (
  <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
    <div onClick={(e) => e.stopPropagation()} className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
      >
        <X size={18} />
      </button>
      <h2 className="pr-8 text-lg font-semibold text-[color:var(--primary-text)]">{title}</h2>
      {children}
    </div>
  </div>
);

/* ---------------- Stat cards grid ---------------- */

const StatCards = ({ items }) => (
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {items.map((s) => (
      <div key={s.title} className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-[color:var(--secondary-text)]">{s.title}</p>
          <s.icon size={20} className="shrink-0 text-[color:var(--primary-text)]" />
        </div>
        <p className="mt-3 text-3xl font-bold text-[color:var(--primary-text)]">{s.value}</p>
      </div>
    ))}
  </div>
);

/* ---------------- Suppliers table ---------------- */

const SuppliersTable = ({ rows, onView, onApprove, onReject }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[1000px] text-left text-sm">
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
        {rows.map((s) => (
          <tr key={s.id} className="border-t border-[color:var(--border-color)]">
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.name}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.shop}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.email}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.phone}</td>
            <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.submitted}</td>
            <td className="px-4 py-4"><Badge text={s.status} /></td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => onView(s.id)} className={btn}>View</button>
                {s.status === "Pending Verification" && (
                  <>
                    <button type="button" onClick={() => onApprove(s.id)} className={yellowBtn}>Approve</button>
                    <button type="button" onClick={() => onReject(s.id)} className={redBtn}>Reject</button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------- Reject modal (reason zaroori) ---------------- */

const RejectModal = ({ supplier, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const isEmpty = reason.trim() === "";

  return (
    <ModalShell title="Reject Verification" onClose={onClose}>
      <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
        Please give a reason for rejecting {supplier.shop}.
      </p>
      <label htmlFor="bmKycReason" className="mt-4 block text-sm text-[color:var(--primary-text)]">Reason (required)</label>
      <textarea
        id="bmKycReason"
        rows={3}
        autoFocus
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="mt-1.5 w-full resize-y rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
      />
      <div className="mt-5 flex justify-end gap-3">
        <button type="button" onClick={onClose} className={btn}>Cancel</button>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onConfirm(reason.trim())}
          className="rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm Rejection
        </button>
      </div>
    </ModalShell>
  );
};

/* ---------------- Page ---------------- */

const KycVerificationPage = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [rejectId, setRejectId] = useState(null);

  const handleTab = (i) => {
    setTab(i);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // View modal se Approve / Reject: pehle view band
  const handleViewApprove = () => { setApproveId(viewId); setViewId(null); };
  const handleViewReject = () => { setRejectId(viewId); setViewId(null); };

  const handleApproveConfirm = () => {
    setSuppliers(suppliers.map((s) => (s.id === approveId ? { ...s, status: "Verified" } : s)));
    setApproveId(null);
  };

  const handleRejectConfirm = (reason) => {
    setSuppliers(suppliers.map((s) => (s.id === rejectId ? { ...s, status: "Rejected", reason } : s)));
    setRejectId(null);
  };

  // Preview / Download: abhi sirf console
  const handlePreview = (file) => console.log("Preview", file);
  const handleDownload = (file) => console.log("Download", file);

  // Cards ke numbers
  const count = (status) => suppliers.reduce((n, s) => (s.status === status ? n + 1 : n), 0);
  const stats = [
    { title: "Total Verification Requests", value: suppliers.length, icon: ClipboardList },
    { title: "Pending Verification", value: count("Pending Verification"), icon: Clock },
    { title: "Verified Suppliers", value: count("Verified"), icon: ShieldCheck },
    { title: "Rejected Requests", value: count("Rejected"), icon: ShieldX },
  ];

  // 1) Tab + search dono par suppliers chuno
  const visible = suppliers.reduce((all, s) => {
    const matchTab = tabs[tab].status === "All" || s.status === tabs[tab].status;
    const matchSearch = `${s.name} ${s.shop} ${s.email} ${s.phone}`.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch ? [...all, s] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  const viewing = suppliers.find((s) => s.id === viewId);
  const approving = suppliers.find((s) => s.id === approveId);
  const rejecting = suppliers.find((s) => s.id === rejectId);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Supplier KYC Verification</h1>

      <StatCards items={stats} />

      {/* Tabs */}
      <div className="mt-6 inline-flex max-w-full overflow-x-auto rounded-lg bg-[var(--off-white-background)] p-1">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => handleTab(i)}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm ${
              tab === i ? "bg-[var(--white-cards)] font-medium text-[color:var(--primary-text)] shadow-sm" : "text-[color:var(--secondary-text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
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
        </div>

        <SuppliersTable rows={rows} onView={setViewId} onApprove={setApproveId} onReject={setRejectId} />

        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} {visible.length === 1 ? "record" : "records"}</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)} className="disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button type="button" aria-label="Next page" disabled={current === totalPages} onClick={() => setPage(current + 1)} className="disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- View modal ---------- */}
      {viewing && (
        <ModalShell title="Supplier Verification Details" size="max-w-3xl" onClose={() => setViewId(null)}>
          <div className="mt-2 flex items-center gap-2">
            <Badge text={viewing.status} />
            <span className="text-xs text-[color:var(--secondary-text)]">{viewing.id}</span>
          </div>

          <h3 className="mt-5 text-sm font-semibold text-[color:var(--primary-text)]">Supplier Information</h3>
          <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {[
              { label: "Supplier Name", value: viewing.name },
              { label: "Shop / Business Name", value: viewing.shop },
              { label: "Email Address", value: viewing.email },
              { label: "Phone Number", value: viewing.phone },
              { label: "Business Address", value: viewing.address },
              { label: "Registration Date", value: viewing.registered },
              { label: "Verification Submission Date", value: viewing.submitted },
            ].map((d) => (
              <div key={d.label}>
                <p className="text-xs text-[color:var(--secondary-text)]">{d.label}</p>
                <p className="text-[color:var(--primary-text)]">{d.value}</p>
              </div>
            ))}
            {viewing.reason && (
              <div className="sm:col-span-2">
                <p className="text-xs text-[color:var(--secondary-text)]">Rejection Reason</p>
                <p className="text-red-600">{viewing.reason}</p>
              </div>
            )}
          </div>

          <h3 className="mt-6 text-sm font-semibold text-[color:var(--primary-text)]">Uploaded Documents</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {documents.map((d) => {
              const file = `${viewing.code}_${d.file}`;
              return (
                <div key={d.title} className="rounded-lg border border-[color:var(--border-color)] p-3">
                  <p className="text-xs font-semibold text-[color:var(--primary-text)]">{d.title}</p>
                  <div className="mt-2 flex h-28 flex-col items-center justify-center gap-2 rounded-md bg-[var(--off-white-background)] text-[color:var(--secondary-text)]">
                    <FileText size={26} />
                    <span className="text-[10px]">BuildMart demo document</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-xs text-[color:var(--primary-text)]">
                      <FileText size={14} className="shrink-0" />
                      <span className="break-all">{file}</span>
                    </span>
                    <span className="flex gap-2">
                      <button type="button" onClick={() => handlePreview(file)} className={`${btn} flex items-center gap-1`}>
                        <Eye size={12} /> Preview
                      </button>
                      <button type="button" onClick={() => handleDownload(file)} className={`${btn} flex items-center gap-1`}>
                        <Download size={12} /> Download
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            {viewing.status === "Pending Verification" && (
              <>
                <button type="button" onClick={handleViewApprove} className={yellowBtn}>Approve Verification</button>
                <button type="button" onClick={handleViewReject} className={redBtn}>Reject Verification</button>
              </>
            )}
            <button type="button" onClick={() => setViewId(null)} className={btn}>Close</button>
          </div>
        </ModalShell>
      )}

      {/* ---------- Approve modal ---------- */}
      {approving && (
        <ModalShell title="Approve Verification" onClose={() => setApproveId(null)}>
          <p className="mt-3 text-sm text-[color:var(--secondary-text)]">Are you sure you want to verify this supplier?</p>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setApproveId(null)} className={btn}>Cancel</button>
            <button type="button" onClick={handleApproveConfirm} className={yellowBtn}>Confirm Approval</button>
          </div>
        </ModalShell>
      )}

      {/* ---------- Reject modal ---------- */}
      {rejecting && <RejectModal key={rejecting.id} supplier={rejecting} onClose={() => setRejectId(null)} onConfirm={handleRejectConfirm} />}
    </section>
  );
};

export default KycVerificationPage;