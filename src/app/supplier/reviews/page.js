"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

/* ---------------- Dataset ---------------- */

const reviews = [
  { id: 1, customer: "Bilal Ahmed", material: "Reused Wooden Doors", date: "2026-10-12", rating: 5, text: "Doors bohat achi halat mein thay, time par delivery." },
  { id: 2, customer: "Ali Raza", material: "A-Class Bricks", date: "2026-10-08", rating: 4, text: "Eent achi hai, thori late delivery hui." },
  { id: 3, customer: "Sana Tariq", material: "DG Cement (OPC)", date: "2026-10-05", rating: 5, text: "Fresh cement, munasib rate." },
  { id: 4, customer: "Hamza Iqbal", material: "A-Class Bricks", date: "2026-09-29", rating: 3, text: "Kuch eent tooti hui thi." },
];

const stars = [1, 2, 3, 4, 5];
const levels = [5, 4, 3, 2, 1];

/* ---------------- Small pieces ---------------- */

// Jitni rating utne stars peelay
const Stars = ({ rating, size = 14 }) => (
  <span className="inline-flex items-center gap-0.5">
    {stars.map((s) => (
      <Star
        key={s}
        size={size}
        className={s <= Math.round(rating) ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]" : "text-gray-400"}
      />
    ))}
  </span>
);

/* ---------------- Customer reviews grid ---------------- */

const ReviewsGrid = ({ items }) => (
  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
    {items.map((r) => (
      <div key={r.id} className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-semibold text-[color:var(--primary-text)]">{r.customer}</p>
            <p className="text-xs text-[color:var(--secondary-text)]">{r.material} · {r.date}</p>
          </div>
          <Stars rating={r.rating} />
        </div>
        <p className="mt-4 text-sm text-[color:var(--primary-text)]">{r.text}</p>
      </div>
    ))}
  </div>
);

/* ---------------- Page ---------------- */

const SupplierReviewsPage = () => {
  const [feedbacks, setFeedbacks] = useState([]); // supplier ke BuildMart ko diye gaye feedback
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleOpen = () => {
    setRating(0);
    setFeedback("");
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    const date = new Date().toISOString().slice(0, 10);
    setFeedbacks([{ id: Date.now(), rating, text: feedback.trim(), date }, ...feedbacks]);
    setModalOpen(false);
  };

  // Average aur kitne reviews har star ke
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const counts = levels.map((l) => reviews.reduce((n, r) => (r.rating === l ? n + 1 : n), 0));

  // Material ke hisab se average
  const materials = reviews.reduce((all, r) => {
    const found = all.find((m) => m.name === r.material);
    if (!found) return [...all, { name: r.material, total: r.rating, count: 1 }];
    return all.map((m) => (m === found ? { ...m, total: m.total + r.rating, count: m.count + 1 } : m));
  }, []);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + button */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Reviews &amp; Ratings</h1>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
            Customer feedback — aap reviews dekh sakte hain, change ya delete nahi kar sakte
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          Rate BuildMart
        </button>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="rounded-xl bg-[var(--charcoal-black)] p-5 text-white">
          <p className="text-xs uppercase text-gray-300">Average supplier rating</p>
          <p className="mt-2 text-6xl font-bold text-[color:var(--primary-yellow)]">{average.toFixed(1)}</p>
          <div className="mt-2"><Stars rating={average} size={18} /></div>
          <p className="mt-3 text-sm text-gray-300">{reviews.length} reviews</p>

          <div className="mt-4 flex flex-col gap-2">
            {levels.map((l, i) => (
              <div key={l} className="flex items-center gap-3 text-xs">
                <span className="w-2">{l}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-600">
                  <div className="h-full bg-[var(--primary-yellow)]" style={{ width: `${(counts[i] / reviews.length) * 100}%` }} />
                </div>
                <span className="w-3 text-right">{counts[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-5 shadow-sm">
          <h2 className="text-base font-semibold text-[color:var(--primary-text)]">Material-specific Ratings</h2>
          <div className="mt-3">
            {materials.map((m) => (
              <div key={m.name} className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--border-color)] py-3 text-sm last:border-b-0">
                <span className="text-[color:var(--primary-text)]">{m.name}</span>
                <span className="flex items-center gap-2 text-[color:var(--primary-text)]">
                  <Stars rating={m.total / m.count} />
                  {(m.total / m.count).toFixed(1)} <span className="text-[color:var(--secondary-text)]">({m.count})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      <h2 className="mt-8 text-lg font-semibold text-[color:var(--primary-text)]">Customer Reviews</h2>
      <ReviewsGrid items={reviews} />

      {/* Supplier ka apna feedback */}
      <div className="mt-8 border-t border-[color:var(--border-color)] pt-6">
        <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">Your BuildMart Feedback</h2>
        {feedbacks.length === 0 && (
          <p className="mt-2 text-sm text-[color:var(--secondary-text)]">Aap ne abhi tak koi feedback nahi diya.</p>
        )}
        <div className="mt-3 flex flex-col gap-3">
          {feedbacks.map((f) => (
            <div key={f.id} className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={f.rating} />
                <span className="text-xs text-[color:var(--secondary-text)]">{f.date}</span>
              </div>
              {f.text && <p className="mt-2 text-sm text-[color:var(--primary-text)]">{f.text}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Rate BuildMart modal ---------- */}
      {modalOpen && (
        <div onClick={() => setModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg text-[color:var(--primary-text)]">Rate BuildMart</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
                className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-1">
              {stars.map((s) => (
                <button key={s} type="button" aria-label={`${s} star`} onClick={() => setRating(s)}>
                  <Star
                    size={32}
                    className={s <= rating ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>

            <label htmlFor="bmFeedback" className="mt-4 block text-sm text-[color:var(--secondary-text)]">Feedback</label>
            <textarea
              id="bmFeedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="BuildMart ke baare mein apni raye likhein..."
              className="mt-1.5 w-full resize-y rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
            />

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                disabled={rating === 0}
                onClick={handleSubmit}
                className="rounded-md bg-[var(--primary-yellow)] px-5 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SupplierReviewsPage;