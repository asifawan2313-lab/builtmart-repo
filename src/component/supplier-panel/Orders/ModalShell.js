"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

// Common popup frame: dark background, title, close button (X, Escape or click outside)
export default function ModalShell({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-[800px] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6"
      >
        {/* Title */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
          <h2 className="text-lg font-bold text-[#202124] sm:text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-[#5B6B78] transition hover:bg-neutral-100 hover:text-[#202124]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}