
"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X, Star } from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialReviews = [
  { id: 1, reviewer: "Ahmed Raza", kind: "Supplier", name: "Sheikh Traders", rating: 5, text: "Quick delivery and genuine cement.", date: "2026-09-30", status: "Visible", reason: "—" },
  { id: 2, reviewer: "Sana Malik", kind: "Material", name: "Red Clay Bricks (A-Class)", rating: 4, text: "Good bricks, a few broken.", date: "2026-10-08", status: "Visible", reason: "—" },
  { id: 3, reviewer: "Bilal Khan", kind: "Supplier", name: "Brick House", rating: 2, text: "Tiles were damaged. Very bad people!!!", date: "2026-10-12", status: "Visible", reason: "—" },
  { id: 4, reviewer: "Ahmed Raza", kind: "Material", name: "Grade 60 Steel Saria 12mm", rating: 5, text: "Steel weight was exact.", date: "2026-10-14", status: "Visible", reason: "—" },
];

const headings = ["Reviewer", "About", "Rating", "Review", "Date", "Status", ""];
const sortable = ["Rating", "Date"];
const statusOptions = ["All", "Visible", "Hidden"];
const stars = [1, 2, 3, 4, 5];
const perPage = 8; // ek page par kitne rows

/* ---------------- Shared styles ---------------- */

// Status ke hisab se badge ka rang
const badgeColors = {
  Visible: "bg-green-50 text-green-700 ring-green-200",
  Hidden: "bg-orange-50 text-orange-600 ring-orange-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* ---------------- Small pieces ---------------- */

// 5 stars: jitni rating utne bhare hue (peele), baqi halke
const Stars = ({ rating }) => (
  <span className="inline-flex items-center gap-0.5">
    {stars.map((s) => (
      <Star
        key={s}
        size={14}
        className={
          s <= rating
            ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
            : "text-[color:var(--border-color)]"
        }
      />
    ))}
  </span>
);

/* ---------------- Hide review modal ---------------- */

const HideModal = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  // Reason khali ho to Confirm button band rahega
  const isEmpty = reason.trim() === "";

  const handleConfirm = () => {
    if (isEmpty) return;
    onConfirm(reason.trim());
  };

  return (
    // Overlay: bahar click karne par band
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Heading + Close */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl text-[color:var(--primary-text)]">Hide review</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Reason */}
        <label htmlFor="bmHideReason" className="mt-5 block text-sm text-[color:var(--secondary-text)]">
          Reason
        </label>
        <textarea
          id="bmHideReason"
          rows={3}
          autoFocus
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            disabled={isEmpty}
            onClick={handleConfirm}
            className="rounded-md bg-red-500 px-5 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Page ---------------- */

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [hidingId, setHidingId] = useState(null); // Hide modal wala review

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Hide: reason ke saath status Hidden karo. Unhide: wapas Visible
  const handleHideConfirm = (reason) => {
    setReviews(reviews.map((r) => (r.id === hidingId ? { ...r, status: "Hidden", reason } : r)));
    setHidingId(null);
  };

  const handleUnhide = (id) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "Visible", reason: "—" } : r)));
  };

  // Remove: review list se nikal do
  const handleRemove = (id) => setReviews(reviews.filter((r) => r.id !== id));

  // Public rating summary: sirf Visible reviews, naam ke hisab se (average aur count)
  const summaries = reviews.reduce((all, r) => {
    if (r.status !== "Visible") return all;
    const found = all.find((s) => s.name === r.name);
    if (!found) return [...all, { name: r.name, total: r.rating, count: 1 }];
    return all.map((s) => (s === found ? { ...s, total: s.total + r.rating, count: s.count + 1 } : s));
  }, []);

  // 1) Search aur dropdown dono par poore utre hue reviews chuno
  const visible = reviews.reduce((all, r) => {
    const matchSearch = `${r.reviewer} ${r.kind} ${r.name} ${r.text}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || r.status === status;
    return matchSearch && matchStatus ? [...all, r] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Reviews &amp; Ratings
      </h1>
      <p className="mt-1 text-sm text-[color:var(--secondary-text)] sm:text-base">
        Hidden or removed reviews are excluded from public rating summaries.
      </p>

      {/* Rating summaries */}
      <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--primary-text)]">
          Rating Summaries (Public)
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {summaries.map((s) => (
            <div key={s.name} className="rounded-md bg-[var(--off-white-background)] px-4 py-3">
              <p className="text-sm font-semibold text-[color:var(--primary-text)]">{s.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[color:var(--primary-text)]">
                <Stars rating={Math.round(s.total / s.count)} />
                <span>
                  {(s.total / s.count).toFixed(1)} · {s.count} {s.count === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + dropdown */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              aria-label="Search"
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            aria-label="Status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {sortable.includes(h) && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.reviewer}</td>
                  <td className="px-4 py-3 text-xs text-[color:var(--primary-text)]">
                    {r.kind}: <span className="font-semibold">{r.name}</span>
                  </td>
                  <td className="px-4 py-3"><Stars rating={r.rating} /></td>
                  <td className="max-w-[280px] px-4 py-3 text-xs text-[color:var(--primary-text)]">{r.text}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {r.status === "Visible" ? (
                        <button type="button" onClick={() => setHidingId(r.id)} className={btn}>
                          Hide
                        </button>
                      ) : (
                        <button type="button" onClick={() => handleUnhide(r.id)} className={btn}>
                          Unhide
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemove(r.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} {visible.length === 1 ? "record" : "records"}</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hide modal */}
      {hidingId && <HideModal onClose={() => setHidingId(null)} onConfirm={handleHideConfirm} />}
    </section>
  );
};

export default ReviewsPage;