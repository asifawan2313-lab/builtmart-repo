"use client";

import { CircleCheck, CircleX, Megaphone, Package, ShieldCheck } from "lucide-react";

// Har type ka icon aur rang. Naya type chahiye to bas aik line aur likh dein.
const BM_TYPES = {
  approved: { icon: CircleCheck, color: "bg-green-100 text-green-600" },
  rejected: { icon: CircleX, color: "bg-red-100 text-red-600" },
  status: { icon: Package, color: "bg-blue-100 text-blue-600" },
  announcement: { icon: Megaphone, color: "bg-yellow-100 text-[color:var(--primary-text)]" },
  verification: { icon: ShieldCheck, color: "bg-blue-100 text-blue-600" },
};

// Received notifications ki list. Data aur handler page se aate hain.
export default function BmSupplierNotificationList({ notifications, onRead }) {
  return (
    <>
      {notifications.map((item) => {
        const type = BM_TYPES[item.type];
        const Icon = type.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onRead(item.id)}
            className={`bmNotifList-card flex w-full cursor-pointer items-start gap-3 rounded-lg border p-4 text-left shadow-sm transition-colors duration-300 sm:gap-4 sm:p-5 ${
              item.read
                ? "border-[color:var(--border-color)] bg-[var(--white-cards)]"
                : "border-l-4 border-[color:var(--border-color)] border-l-[color:var(--primary-yellow)] bg-yellow-50"
            }`}
          >
            {/* Icon */}
            <span
              className={`bmNotifList-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${type.color}`}
            >
              <Icon size={20} strokeWidth={1.5} />
            </span>

            {/* Title, message, date */}
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="break-words font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  {item.title}
                </span>

                {/* Read / Unread chip */}
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-[family-name:Poppins-Medium] ${
                    item.read
                      ? "bg-gray-200 text-gray-600"
                      : "bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
                  }`}
                >
                  {item.read ? "Read" : "Unread"}
                </span>
              </span>

              <span className="mt-1 block break-words text-sm text-[color:var(--secondary-text)]">
                {item.message}
              </span>
              <span className="mt-2 block text-xs text-[color:var(--secondary-text)]">
                {item.date}
              </span>
            </span>
          </button>
        );
      })}
    </>
  );
}