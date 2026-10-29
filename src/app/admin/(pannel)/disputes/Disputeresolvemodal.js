"use client";

import { useState } from "react";
import { X } from "lucide-react";

const outcomes = [
  "Refund Issued",
  "Replacement Provided",
  "Resolved in Customer's Favor",
  "Resolved in Supplier's Favor",
  "No Action Required",
];

export default function DisputeResolveModal({ dispute, onClose, onConfirm }) {
  const [outcome, setOutcome] = useState(outcomes[0]);
  const [note, setNote] = useState("");

  // Note khali ho to Confirm button band rahega
  const isEmpty = note.trim() === "";

  const handleConfirm = () => {
    if (isEmpty) return;
    onConfirm(outcome, note.trim());
  };

  const input =
    "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
  const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";

  return (
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
          <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">Resolve Dispute</h2>
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

        {/* Resolution Outcome */}
        <div className="mt-4">
          <label className={label}>Resolution Outcome</label>
          <select value={outcome} onChange={(e) => setOutcome(e.target.value)} className={input}>
            {outcomes.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Resolution Note */}
        <div className="mt-4">
          <label className={label}>Resolution Note (required)</label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`${input} resize-y`}
          />
        </div>

        {/* Cancel + Confirm */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isEmpty}
            onClick={handleConfirm}
            className="rounded-md bg-[var(--primary-yellow)] px-5 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Resolution
          </button>
        </div>
      </div>
    </div>
  );
}