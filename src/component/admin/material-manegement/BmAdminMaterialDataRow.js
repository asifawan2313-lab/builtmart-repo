"use client";

import { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";

const STATUS_STYLE = {
  active: {
    label: "Active",
    chip: "border-green-400 bg-green-50 text-green-700",
  },
  unavailable: {
    label: "Unavailable",
    chip: "border-[color:var(--border-color)] bg-[var(--off-white-background)] text-[color:var(--secondary-text)]",
  },
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const cancelBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const redBtn =
  "rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700";

const StatusChip = ({ status }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${STATUS_STYLE[status].chip}`}
  >
    {STATUS_STYLE[status].label}
  </span>
);

const ModalShell = ({ title, size = "max-w-md", onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`max-h-[92vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
        >
          <X size={18} />
        </button>
      </div>

      {children}
    </div>
  </div>
);

const BmAdminMaterialDataRow = ({ material }) => {
  // null | "view" | "deactivate" | "activate"
  const [mode, setMode] = useState(null);
  const [reason, setReason] = useState("");

  const isActive = material.status === "active";

  const handleClose = () => {
    setMode(null);
    setReason("");
  };

  const handleDeactivateListing = () => {
    alert(`"${material.name}" deactivated. Reason: ${reason}`);
    handleClose();
  };

  const handleActivateListing = () => {
    alert(`"${material.name}" activated (demo)`);
    handleClose();
  };

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-white">
            <ImageIcon size={18} />
          </span>
          <span>{material.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">{material.category}</td>
      <td className="px-4 py-3">{material.supplier}</td>
      <td className="px-4 py-3">{material.price}</td>
      <td className="px-4 py-3">{material.availability}</td>
      <td className="px-4 py-3">
        <StatusChip status={material.status} />
      </td>
      <td className="px-4 py-3">
        {material.complaints === 0 ? "None" : material.complaints}
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setMode("view")} className={btn}>
            View
          </button>
          <button
            type="button"
            onClick={() => setMode(isActive ? "deactivate" : "activate")}
            className={btn}
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>

        {/* VIEW MODAL */}
        {mode === "view" && (
          <ModalShell title={material.name} size="max-w-2xl" onClose={handleClose}>
            <div className="flex h-40 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-white sm:h-52">
              <ImageIcon size={36} />
            </div>

            <div className="mt-4 space-y-3 text-sm text-[color:var(--primary-text)]">
              <p>{material.category}</p>
              <p>Supplier: {material.supplier}</p>
              <p>
                {material.price} · {material.availability}
              </p>
              <StatusChip status={material.status} />
            </div>

            <p className="mt-4 text-xs font-semibold text-[color:var(--primary-text)]">
              Complaints &amp; policy violations
            </p>
            <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
              {material.complaints === 0
                ? "No reports received."
                : `${material.complaints} reports received.`}
            </p>

            <div className="mt-5 flex justify-end">
              <button type="button" onClick={handleClose} className={btn}>
                Close
              </button>
            </div>
          </ModalShell>
        )}

        {/* DEACTIVATE MODAL */}
        {mode === "deactivate" && (
          <ModalShell title="Deactivate listing" onClose={handleClose}>
            <p className="text-sm text-[color:var(--primary-text)]">
              {material.name} will no longer be available for sale.
            </p>

            <label
              htmlFor={`bm-deactivate-${material.id}`}
              className="mt-4 block text-xs text-[color:var(--secondary-text)]"
            >
              Deactivation reason
            </label>
            <textarea
              id={`bm-deactivate-${material.id}`}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={handleClose} className={cancelBtn}>
                Cancel
              </button>
              <button type="button" onClick={handleDeactivateListing} className={redBtn}>
                Confirm Deactivation
              </button>
            </div>
          </ModalShell>
        )}

        {/* ACTIVATE MODAL */}
        {mode === "activate" && (
          <ModalShell title="Activate listing" onClose={handleClose}>
            <p className="text-sm text-[color:var(--primary-text)]">
              {material.name} will be available for sale again.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={handleClose} className={cancelBtn}>
                Cancel
              </button>
              <button type="button" onClick={handleActivateListing} className={yellowBtn}>
                Confirm Activation
              </button>
            </div>
          </ModalShell>
        )}
      </td>
    </tr>
  );
};

export default BmAdminMaterialDataRow;