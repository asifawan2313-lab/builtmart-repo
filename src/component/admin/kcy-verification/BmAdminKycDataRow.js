"use client";

import { useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";

const STATUS_STYLE = {
  pending: {
    label: "Pending Verification",
    chip: "border-orange-400 bg-orange-50 text-orange-500",
  },
  verified: {
    label: "Verified",
    chip: "border-green-500 bg-green-50 text-green-600",
  },
  rejected: {
    label: "Rejected",
    chip: "border-red-400 bg-red-50 text-red-500",
  },
};

const REQUIRED_DOCS = {
  rider: [
    "CNIC Front Side",
    "CNIC Back Side",
    "Driving Licence",
    "Vehicle Registration / Documents (optional)",
  ],
  supplier: [
    "CNIC Front Side",
    "CNIC Back Side",
    "Business Registration / NTN Certificate",
    "Shop Photo (optional)",
  ],
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";
const redBtn =
  "rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50";

const StatusChip = ({ status }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] ${STATUS_STYLE[status].chip}`}
  >
    {STATUS_STYLE[status].label}
  </span>
);

const ModalShell = ({
  title,
  subtitle,
  badge,
  size = "max-w-lg",
  onClose,
  children,
}) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left normal-case sm:p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`max-h-[92vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[color:var(--secondary-text)]">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {badge}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {children}
    </div>
  </div>
);

const BmAdminKycDataRow = ({ request }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");

  const isPending = request.status === "pending";
  const isSupplier = request.userType === "supplier";
  const roleName = isSupplier ? "Supplier" : "Rider";

  const handleApprove = () => {
    alert(`${request.name} approved (demo)`);
    setViewOpen(false);
  };

  const handleOpenReject = () => {
    setViewOpen(false);
    setRejectOpen(true);
  };

  const handleCloseReject = () => {
    setRejectOpen(false);
    setReason("");
  };

  const handleSubmitReject = () => {
    if (!reason.trim()) return;
    alert(`${request.name} rejected. Reason: ${reason.trim()}`);
    handleCloseReject();
  };

  const fields = [
    ["Record ID", request.id],
    [`${roleName === "Rider" ? "Rider" : "Business"} Name`, request.name],
    [isSupplier ? "Category" : "Vehicle", request.detail],
    ["Email", request.email],
    ["Phone Number", request.phone],
    ["Address / Service Area", request.address],
    ["About", request.about],
    ["Registration Date", request.registeredOn],
    ["Submission Date", request.submittedOn],
    ["Verification Status", <StatusChip key="s" status={request.status} />],
    ["Decision Date", request.decisionDate || "-"],
    ["Rejection Reason", request.rejectionReason || "-"],
    ["Verification History", request.history || "No history"],
    ["Uploaded Document", request.documentName],
    ["Document URI", request.documentUrl],
  ];

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3">{request.name}</td>
      <td className="px-4 py-3">{request.detail}</td>
      <td className="px-4 py-3">{request.email}</td>
      <td className="px-4 py-3">{request.phone}</td>
      <td className="px-4 py-3">{request.submittedOn}</td>
      <td className="px-4 py-3">
        <StatusChip status={request.status} />
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setViewOpen(true)} className={btn}>
            View
          </button>

          {isPending && (
            <>
              <button type="button" onClick={handleApprove} className={yellowBtn}>
                Approve
              </button>
              <button type="button" onClick={handleOpenReject} className={redBtn}>
                Reject
              </button>
            </>
          )}
        </div>

        {/* VIEW DETAILS MODAL */}
        {viewOpen && (
          <ModalShell
            title={`${roleName} KYC Details`}
            subtitle={`ID: ${request.id}`}
            badge={<StatusChip status={request.status} />}
            onClose={() => setViewOpen(false)}
          >
            <p className="mb-3 border-b border-[color:var(--border-color)] pb-2 text-xs font-semibold text-[color:var(--primary-text)]">
              Complete {roleName} KYC Information
            </p>

            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-xs text-[color:var(--secondary-text)]">
                    {label}
                  </p>
                  <div className="mt-0.5 break-words text-sm text-[color:var(--primary-text)]">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-[color:var(--border-color)] pt-4">
              <p className="text-xs font-semibold text-[color:var(--primary-text)]">
                Required Verification Documents
              </p>
              <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
                This single PDF should contain these documents in this order:
              </p>
              <ol className="mt-2 list-inside list-decimal space-y-0.5 text-sm text-[color:var(--primary-text)]">
                {REQUIRED_DOCS[request.userType].map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ol>
            </div>

            <div className="mt-5 border-t border-[color:var(--border-color)] pt-4">
              <p className="mb-2 text-xs font-semibold text-[color:var(--primary-text)]">
                Uploaded Verification Document
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[color:var(--border-color)] bg-[var(--off-white-background)] p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]">
                    <FileText size={16} />
                  </span>
                  <p className="truncate text-sm text-[color:var(--primary-text)]">
                    {request.documentName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={request.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${btn} inline-flex items-center gap-1`}
                  >
                    <Eye size={13} />
                    Preview
                  </a>
                  <a
                    href={request.documentUrl}
                    download={request.documentName}
                    className={`${btn} inline-flex items-center gap-1`}
                  >
                    <Download size={13} />
                    Download
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-[color:var(--border-color)] pt-4">
              <button type="button" onClick={() => setViewOpen(false)} className={btn}>
                Cancel
              </button>

              {isPending && (
                <>
                  <button type="button" onClick={handleApprove} className={yellowBtn}>
                    Approve
                  </button>
                  <button type="button" onClick={handleOpenReject} className={redBtn}>
                    Reject
                  </button>
                </>
              )}
            </div>
          </ModalShell>
        )}

        {/* REJECT MODAL */}
        {rejectOpen && (
          <ModalShell
            title="Reject KYC Request"
            subtitle={`${request.name} · ${request.id}`}
            size="max-w-md"
            onClose={handleCloseReject}
          >
            <label
              htmlFor={`bm-kyc-reason-${request.id}`}
              className="mb-1 block text-xs text-[color:var(--secondary-text)]"
            >
              Reason for rejection
            </label>
            <textarea
              id={`bm-kyc-reason-${request.id}`}
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write the reason here..."
              className="w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={handleCloseReject} className={btn}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitReject}
                disabled={!reason.trim()}
                className={redBtn}
              >
                Submit Rejection
              </button>
            </div>
          </ModalShell>
        )}
      </td>
    </tr>
  );
};

export default BmAdminKycDataRow;