"use client";

import { X } from "lucide-react";

export default function BmTopUpApproveModal({ request, onCancel, onConfirm }) {
  // Jab tak koi request select nahi, modal nahi dikhana
  if (!request) return null;

  const bmApproveCancelButton =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    // Overlay: bahar click karne par cancel
    <div
      onClick={onCancel}
      className="bmApproveModalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bmApproveModalBox relative w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Close icon */}
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="bmApproveModalCloseButton absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="bmApproveModalTitleText pr-8 text-xl text-[color:var(--primary-text)] sm:text-2xl">
          Approve Top-Up
        </h2>

        {/* Message */}
        <p className="bmApproveModalMessageText mt-4 text-sm text-[color:var(--primary-text)]">
          Approve {request.id} and credit {request.amount} to {request.supplier}&apos;s demo wallet?
        </p>

        {/* Buttons */}
        <div className="bmApproveModalActionRow mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={`bmApproveModalCancelButton ${bmApproveCancelButton}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bmApproveModalConfirmButton rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}