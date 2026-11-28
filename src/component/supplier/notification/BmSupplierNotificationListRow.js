"use client";

import { useState } from "react";
import {
  Check,
  Flag,
  MessageSquare,
  Package,
  ShieldCheck,
  Star,
  Trash2,
  Wallet,
  X,
} from "lucide-react";

const ICONS = {
  order: Package,
  inquiry: MessageSquare,
  dispute: Flag,
  topup: Wallet,
  review: Star,
  kyc: ShieldCheck,
};

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

const BmSupplierNotificationListRow = ({ notification }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isUnread = !notification.read;
  const Icon = ICONS[notification.icon];

  const handleMarkRead = () => {
    alert(`"${notification.title}" marked as read (demo)`);
  };

  const handleDelete = () => {
    alert(`"${notification.title}" deleted (demo)`);
    setDeleteOpen(false);
  };

  return (
    <div
      className={`flex items-center gap-3 border-b border-[color:var(--border-color)] px-4 py-4 last:border-b-0 ${
        isUnread ? "bg-[var(--primary-yellow)]/10" : ""
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--off-white-background)] text-[color:var(--primary-text)]">
        <Icon size={16} />
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm text-[color:var(--primary-text)] ${
            isUnread ? "font-semibold" : ""
          }`}
        >
          {notification.title}
        </p>
        <p className="text-xs text-[color:var(--secondary-text)]">
          {notification.message}
        </p>
        <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">
          {notification.time}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isUnread && (
          <span className="h-2 w-2 rounded-full bg-[var(--primary-yellow)]" />
        )}

        <button
          type="button"
          onClick={handleMarkRead}
          aria-label="Mark as read"
          className={`${iconBtn} ${
            isUnread ? "" : "text-[color:var(--secondary-text)]"
          }`}
        >
          <Check size={14} />
        </button>

        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          aria-label="Delete notification"
          className={iconBtn}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteOpen && (
        <div
          onClick={() => setDeleteOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                Delete Notification?
              </h2>
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                aria-label="Close modal"
                className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-[color:var(--secondary-text)]">
              Only this selected notification will be deleted. This cannot be
              undone.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setDeleteOpen(false)} className={btn}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BmSupplierNotificationListRow;