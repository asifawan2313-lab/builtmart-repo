"use client";

import { ArrowUpRight } from "lucide-react";

// "New requests for you" ke cards. Data aur handler page se aate hain.
export default function BmRiderRequestCards({ requests, onViewDetails }) {
  return (
    <>
      {requests.map((item) => (
        <div
          key={item.id}
          className="bmRiderRequests-card flex min-w-0 flex-col rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5"
        >
          {/* Code · area (left) + badge (right) */}
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 break-words text-xs text-[color:var(--secondary-text)]">
              {item.code} · {item.area}
            </p>
            <span className="shrink-0 rounded-md bg-[var(--off-white-background)] px-2.5 py-1 text-xs text-[color:var(--primary-text)]">
              {item.badge}
            </span>
          </div>

          <h3 className="mt-1 break-words text-lg text-[color:var(--primary-text)]">
            {item.title}
          </h3>
          <p className="mt-2 break-words text-sm text-[color:var(--secondary-text)]">
            {item.detail}
          </p>
          <p className="mt-1 break-words text-sm text-[color:var(--primary-text)]">
            {item.note}
          </p>

          {/* Button hamesha card ke neeche */}
          <div className="mt-4 flex flex-1 items-end">
            <button
              type="button"
              onClick={() => onViewDetails(item.code)}
              className="bmRiderRequests-detailsBtn flex cursor-pointer items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]"
            >
              View details
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}