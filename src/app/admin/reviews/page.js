
"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminReviewDataRow from "../../../component/admin/review/BmAdminReviewDataRow ";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

// Public rating summaries (stats cards) — backend se connect hoga
const BM_RATING_SUMMARIES = [
  { name: "Sheikh Traders", rating: 5.0, reviews: 1 },
  { name: "Red Clay Bricks (A-Class)", rating: 4.0, reviews: 1 },
  { name: "Brick House", rating: 2.0, reviews: 1 },
  { name: "Grade 60 Steel Saria 12mm", rating: 5.0, reviews: 1 },
];

const BM_REVIEW_FILTERS = ["Visible", "Hidden", "Removed", "All"];

const BM_REVIEWS = [
  { id: 1, reviewer: "Ahmed Raza", aboutType: "Supplier", aboutName: "Sheikh Traders", rating: 5, text: "Quick delivery and genuine cement.", date: "2026-09-30", status: "Visible" },
  { id: 2, reviewer: "Sana Malik", aboutType: "Material", aboutName: "Red Clay Bricks (A-Class)", rating: 4, text: "Good bricks, a few broken.", date: "2026-10-08", status: "Visible" },
  { id: 3, reviewer: "Bilal Khan", aboutType: "Supplier", aboutName: "Brick House", rating: 2, text: "Tiles were damaged. Very bad people!!!", date: "2026-10-12", status: "Visible" },
  { id: 4, reviewer: "Ahmed Raza", aboutType: "Material", aboutName: "Grade 60 Steel Saria 12mm", rating: 5, text: "Steel weight was exact.", date: "2026-10-14", status: "Visible" },
  { id: 5, reviewer: "Hina Malik", aboutType: "Supplier", aboutName: "Tile City", rating: 1, text: "Rude behaviour and spam link in review.", date: "2026-10-16", status: "Hidden" },
  { id: 6, reviewer: "Usman Tariq", aboutType: "Material", aboutName: "DG Khan Cement OPC", rating: 3, text: "Average quality.", date: "2026-10-18", status: "Removed" },
];

const th = "px-4 py-3 font-medium";

/* =========================================================
   PAGE
========================================================= */

const BmAdminReviewsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Visible");

  const query = search.trim().toLowerCase();

  const visibleReviews = BM_REVIEWS.reduce((all, review) => {
    const matches =
      (filter === "All" || review.status === filter) &&
      `${review.reviewer} ${review.aboutName} ${review.text}`
        .toLowerCase()
        .includes(query);

    return matches ? [...all, review] : all;
  }, []);

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader
        title="Reviews & Ratings"
        description="Hidden or removed reviews are excluded from public rating summaries."
      />

      {/* RATING SUMMARIES */}
      <div className="mb-6 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5">
        <p className="mb-4 text-xs font-semibold uppercase text-[color:var(--primary-text)]">
          Rating summaries (public)
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {BM_RATING_SUMMARIES.map((item) => (
            <div
              key={item.name}
              className="rounded-lg bg-[var(--off-white-background)] p-3"
            >
              <p className="text-sm font-semibold text-[color:var(--primary-text)]">
                {item.name}
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
                <span className="inline-flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={13}
                      className={
                        n <= Math.round(item.rating)
                          ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
                          : "text-[color:var(--border-color)]"
                      }
                    />
                  ))}
                </span>
                <span>
                  {item.rating.toFixed(1)} · {item.reviews}{" "}
                  {item.reviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:p-4">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-48"
          >
            {BM_REVIEW_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                <th className={th}>Reviewer</th>
                <th className={th}>About</th>
                <th className={th}>
                  <span className="inline-flex items-center gap-1">
                    Rating <ArrowUpDown size={11} />
                  </span>
                </th>
                <th className={th}>Review</th>
                <th className={th}>
                  <span className="inline-flex items-center gap-1">
                    Date <ArrowUpDown size={11} />
                  </span>
                </th>
                <th className={th}>Status</th>
                <th className={th}></th>
              </tr>
            </thead>

            <tbody>
              {visibleReviews.map((review) => (
                <BmAdminReviewDataRow key={review.id} review={review} />
              ))}

              {visibleReviews.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleReviews.length}{" "}
            {visibleReviews.length === 1 ? "record" : "records"}
          </span>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronLeft size={14} />
            </button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BmAdminReviewsPage;