"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  Eye,
  Flag,
  MessageSquare,
  Package,
  ShieldCheck,
  Trash2,
  Wallet,
  X,
} from "lucide-react";

const ICONS = {
  dispute: Flag,
  topup: Wallet,
  kyc: ShieldCheck,
  support: MessageSquare,
  order: Package,
  announcement: Bell,
};

const STATUS_CHIP = {
  Sent: "border-green-400 bg-green-50 text-green-700",
  Draft:
    "border-[color:var(--border-color)] bg-[var(--off-white-background)] text-[color:var(--secondary-text)]",
};

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const redBtn =
  "rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700";

// Received aur Sent dono screens isi ek row component ko use karti hain
const BmAdminNotificationListRow = ({ notification }) => {
  // null | "view" | "delete"  (dono ke liye ek hi modal)
  const [mode, setMode] = useState(null);

  const isSent = notification.box === "sent";
  const isUnread = !isSent && !notification.read;
  const Icon = ICONS[notification.icon];

  const handleClose = () => setMode(null);

  const handleMarkRead = () => {
    alert(`"${notification.title}" marked as read (demo)`);
  };

  const handleDelete = () => {
    alert(`"${notification.title}" deleted (demo)`);
    handleClose();
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
          {isSent
            ? `To: ${notification.audience} · ${notification.time}`
            : notification.time}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isSent && (
          <>
            <span
              className={`hidden rounded-full border px-2.5 py-0.5 text-[11px] sm:inline-block ${STATUS_CHIP[notification.status]}`}
            >
              {notification.status}
            </span>
            <button
              type="button"
              onClick={() => setMode("view")}
              aria-label="View notification"
              className={iconBtn}
            >
              <Eye size={14} />
            </button>
          </>
        )}

        {isUnread && (
          <span className="h-2 w-2 rounded-full bg-[var(--primary-yellow)]" />
        )}

        {!isSent && (
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
        )}

        <button
          type="button"
          onClick={() => setMode("delete")}
          aria-label="Delete notification"
          className={iconBtn}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* EK HI MODAL — view aur delete, mode ke hisaab se */}
      {mode && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                  {mode === "view" ? notification.title : "Delete Notification?"}
                </h2>
                {mode === "view" && (
                  <p className="mt-0.5 text-sm text-[color:var(--secondary-text)]">
                    Sent notification
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
                <div className="space-y-3 text-sm text-[color:var(--primary-text)]">
                  <p>{notification.message}</p>
                  <p>Type: {notification.type}</p>
                  <p>Recipients / Audience: {notification.audience}</p>
                  <p className="text-[color:var(--secondary-text)]">
                    {notification.time}
                  </p>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CHIP[notification.status]}`}
                  >
                    {notification.status}
                  </span>
                </div>

                <div className="mt-5 flex justify-end border-t border-[color:var(--border-color)] pt-4">
                  <button type="button" onClick={handleClose} className={btn}>
                    Close
                  </button>
                </div>
              </>
            )}

            {/* DELETE BODY */}
            {mode === "delete" && (
              <>
                <p className="text-sm text-[color:var(--secondary-text)]">
                  Only this selected notification will be deleted. This cannot
                  be undone.
                </p>

                <div className="mt-5 flex justify-end gap-2">
                  <button type="button" onClick={handleClose} className={btn}>
                    Cancel
                  </button>
                  <button type="button" onClick={handleDelete} className={redBtn}>
                    Confirm Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BmAdminNotificationListRow;