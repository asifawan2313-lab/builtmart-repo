"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function BmTopUpRejectModal({ request, onCancel, onConfirm }) {
  const [reason, setReason] = useState("");

  // Reason khali (ya sirf spaces) ho to Confirm band rahega
  const isEmpty = reason.trim() === "";

  const handleReasonChange = (e) => setReason(e.target.value);
  const handleConfirmClick = () => {
    if (isEmpty) return;
    onConfirm(reason.trim());
  };

  return (
    // Overlay: bahar click karne par cancel
    <div
      onClick={onCancel}
      className="bmRejectModalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      {/* Modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bmRejectModalBox relative w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Close icon */}
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          className="bmRejectModalCloseButton absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="bmRejectModalTitleText pr-8 text-xl text-[color:var(--primary-text)] sm:text-2xl">
          Reject Top-Up
        </h2>

        {/* Request info */}
        <p className="bmRejectModalInfoText mt-2 text-sm text-[color:var(--secondary-text)]">
          {request.id} · {request.supplier} · {request.amount}
        </p>

        {/* Reason */}
        <label
          htmlFor="bmRejectReasonInput"
          className="bmRejectModalLabelText mt-4 block text-sm text-[color:var(--primary-text)]"
        >
          Rejection reason (required)
        </label>
        <textarea
          id="bmRejectReasonInput"
          value={reason}
          onChange={handleReasonChange}
          rows={3}
          autoFocus
          className="bmRejectModalReasonInput mt-2 w-full resize-y rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] focus:ring-1 focus:ring-[color:var(--primary-yellow)]"
        />

        {/* Buttons */}
        <div className="bmRejectModalActionRow mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bmRejectModalCancelButton rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isEmpty}
            onClick={handleConfirmClick}
            className="bmRejectModalConfirmButton rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}