"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

const STATUS_CHIP = {
  Visible: "border-green-400 bg-green-50 text-green-700",
  Hidden: "border-orange-300 bg-orange-50 text-orange-500",
  Removed: "border-red-300 bg-red-50 text-red-500",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const redBtn =
  "rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700";

const Stars = ({ rating }) => (
  <span className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={13}
        className={
          n <= rating
            ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
            : "text-[color:var(--border-color)]"
        }
      />
    ))}
  </span>
);

const BmAdminReviewDataRow = ({ review }) => {
  // null | "hide" | "remove"  (dono ke liye ek hi modal)
  const [mode, setMode] = useState(null);
  const [reason, setReason] = useState("");

  const isHide = mode === "hide";

  const handleClose = () => {
    setMode(null);
    setReason("");
  };

  const handleHideReview = () => {
    alert(`Review by ${review.reviewer} hidden. Reason: ${reason}`);
    handleClose();
  };

  const handleRemoveReview = () => {
    alert(`Review by ${review.reviewer} removed. Reason: ${reason}`);
    handleClose();
  };

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3">{review.reviewer}</td>
      <td className="px-4 py-3 text-xs">
        {review.aboutType}: <span className="font-semibold">{review.aboutName}</span>
      </td>
      <td className="px-4 py-3">
        <Stars rating={review.rating} />
      </td>
      <td className="px-4 py-3 text-xs">{review.text}</td>
      <td className="px-4 py-3">{review.date}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CHIP[review.status]}`}
        >
          {review.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {review.status === "Visible" && (
            <button type="button" onClick={() => setMode("hide")} className={btn}>
              Hide
            </button>
          )}

          {review.status !== "Removed" && (
            <button
              type="button"
              onClick={() => setMode("remove")}
              className="text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          )}
        </div>

        {/* HIDE / REMOVE — ek hi modal, mode ke hisaab se text badalta hai */}
        {mode && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                  {isHide ? "Hide review" : "Remove review"}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              {!isHide && (
                <p className="mb-3 text-sm text-[color:var(--secondary-text)]">
                  This review will be removed and excluded from public rating
                  summaries.
                </p>
              )}

              <label
                htmlFor={`bm-review-reason-${review.id}`}
                className="block text-xs text-[color:var(--secondary-text)]"
              >
                Reason
              </label>
              <textarea
                id={`bm-review-reason-${review.id}`}
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
              />

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={handleClose} className={btn}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={isHide ? handleHideReview : handleRemoveReview}
                  className={redBtn}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmAdminReviewDataRow;