"use client";

import { X } from "lucide-react";

export default function CategoryDeleteModal({ category, onClose, onConfirm }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Heading + Close */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">Delete Category</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Question */}
        <p className="mt-4 text-base text-[color:var(--primary-text)]">Delete {category.name}?</p>

        {/* Warning: sirf tab dikhao jab category ki listings hon */}
        {category.listings > 0 && (
          <p className="mt-4 text-sm text-red-600">
            {category.listings} related listing(s) will be kept, not deleted. Without a category they will be
            unavailable for sale until reassigned.
          </p>
        )}

        {/* Cancel + Confirm Delete */}
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
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}