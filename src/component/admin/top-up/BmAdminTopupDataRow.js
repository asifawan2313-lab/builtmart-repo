"use client";

import { useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";

const STATUS_CHIP = {
  Pending: "border-orange-300 bg-orange-50 text-orange-500",
  Approved: "border-green-400 bg-green-50 text-green-700",
  Rejected: "border-red-300 bg-red-50 text-red-500",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const redBtn =
  "rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700";

const StatusChip = ({ status }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CHIP[status]}`}
  >
    {status}
  </span>
);

const formatRs = (amount) => `Rs ${amount.toLocaleString("en-US")}`;

const BmAdminTopupDataRow = ({ request, showUserType }) => {
  // null | "view" | "approve" | "reject"  (teeno ke liye ek hi modal)
  const [mode, setMode] = useState(null);
  const [reason, setReason] = useState("");

  const isPending = request.status === "Pending";

  const handleClose = () => {
    setMode(null);
    setReason("");
  };

  const handleApprove = () => {
    alert(`${request.id} approved (demo)`);
    handleClose();
  };

  const handleReject = () => {
    alert(`${request.id} rejected. Reason: ${reason}`);
    handleClose();
  };

  const viewFields = [
    ["Name", request.name],
    ["User Type", request.userType],
    ["Payment Method", request.method],
    ["Amount", formatRs(request.amount)],
    ["Date", request.date],
  ];

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3">{request.id}</td>
      <td className="px-4 py-3">{request.name}</td>
      {showUserType && <td className="px-4 py-3">{request.userType}</td>}
      <td className="px-4 py-3">{formatRs(request.amount)}</td>
      <td className="px-4 py-3">{request.method}</td>
      <td className="px-4 py-3">
        <a
          href={request.proofUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[color:var(--primary-yellow)] hover:underline"
        >
          <FileText size={12} />
          {request.proofName}
        </a>
      </td>
      <td className="px-4 py-3">{request.date}</td>
      <td className="px-4 py-3">
        <StatusChip status={request.status} />
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setMode("view")} className={btn}>
            View
          </button>

          {isPending && (
            <>
              <button type="button" onClick={() => setMode("approve")} className={yellowBtn}>
                Approve
              </button>
              <button type="button" onClick={() => setMode("reject")} className={btn}>
                Reject
              </button>
            </>
          )}
        </div>

        {/* EK HI MODAL — mode ke hisaab se view / approve / reject */}
        {mode && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[92vh] w-full overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6 ${
                mode === "view" ? "max-w-xl" : "max-w-md"
              }`}
            >
              {/* HEADER */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                    {mode === "view" && request.id}
                    {mode === "approve" && "Approve Top-Up"}
                    {mode === "reject" && "Reject Top-Up"}
                  </h2>

                  {mode === "view" && (
                    <div className="mt-2">
                      <StatusChip status={request.status} />
                    </div>
                  )}

                  {mode === "reject" && (
                    <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
                      {request.id} · {request.name} · {formatRs(request.amount)}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* VIEW BODY */}
              {mode === "view" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {viewFields.map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-[color:var(--secondary-text)]">
                          {label}
                        </p>
                        <p className="mt-0.5 text-sm text-[color:var(--primary-text)]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[color:var(--border-color)] pt-4">
                    <p className="mb-2 text-xs font-semibold text-[color:var(--primary-text)]">
                      Payment Proof
                    </p>

                    <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
                      <FileText size={16} />
                      <span className="truncate">{request.proofName}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={request.proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`${btn} inline-flex items-center gap-1`}
                      >
                        <Eye size={13} />
                        Preview
                      </a>
                      <a
                        href={request.proofUrl}
                        download={request.proofName}
                        className={`${btn} inline-flex items-center gap-1`}
                      >
                        <Download size={13} />
                        Download
                      </a>
                    </div>
                  </div>
                </>
              )}

              {/* APPROVE BODY */}
              {mode === "approve" && (
                <p className="text-sm text-[color:var(--primary-text)]">
                  Approve {request.id} and credit {formatRs(request.amount)} to{" "}
                  {request.name}&apos;s wallet?
                </p>
              )}

              {/* REJECT BODY */}
              {mode === "reject" && (
                <>
                  <label
                    htmlFor={`bm-topup-reason-${request.id}`}
                    className="block text-sm text-[color:var(--secondary-text)]"
                  >
                    Rejection reason
                  </label>
                  <textarea
                    id={`bm-topup-reason-${request.id}`}
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
                  />
                </>
              )}

              {/* FOOTER BUTTONS */}
              <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-[color:var(--border-color)] pt-4">
                <button type="button" onClick={handleClose} className={btn}>
                  {mode === "view" ? "Close" : "Cancel"}
                </button>

                {/* View modal: Reject aur Approve sirf pending par */}
                {mode === "view" && isPending && (
                  <>
                    <button type="button" onClick={() => setMode("reject")} className={btn}>
                      Reject
                    </button>
                    <button type="button" onClick={() => setMode("approve")} className={yellowBtn}>
                      Approve
                    </button>
                  </>
                )}

                {mode === "approve" && (
                  <button type="button" onClick={handleApprove} className={yellowBtn}>
                    Confirm Approval
                  </button>
                )}

                {mode === "reject" && (
                  <button type="button" onClick={handleReject} className={redBtn}>
                    Confirm Rejection
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmAdminTopupDataRow;