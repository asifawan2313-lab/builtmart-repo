"use client";

import { useRef, useState } from "react";

// Sample reviews hain (screenshot ki tarah demo). Asli reviews aane par replace karein.
// Kam az kam 4 reviews rakhein taake slide ke waqt agla card tayyar ho.
const reviews = [
  { id: 1, rating: 4, text: "The visualization demo helped us pick a floor finish before visiting the shop.", name: "Hira T.", tag: "AI Visualization demo" },
  { id: 2, rating: 5, text: "Clear units on every listing — per bag, per kg, per trolley. Very helpful.", name: "Usman A.", tag: "Price listings" },
  { id: 3, rating: 5, text: "Comparing cement prices from a few shops took minutes instead of a full day of calls.", name: "Ahmed R.", tag: "Cement comparison" },
  { id: 4, rating: 5, text: "The cost estimator gave me a realistic starting budget before I talked to any contractor.", name: "Sana K.", tag: "Cost estimator" },
  { id: 5, rating: 4, text: "Found leftover tiles at a good price from a seller nearby.", name: "Bilal M.", tag: "Reusable materials" },
];

function Stars({ rating }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 24 24"
          className={`w-5 h-5 ${n <= rating ? "text-[var(--primary-yellow)]" : "text-[var(--border-color)]"}`}
          fill="currentColor"
        >
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
        </svg>
      ))}
    </div>
  );
}

export default function BmCustomerReviews() {
  const [items, setItems] = useState(reviews); // cards ki current tarteeb
  const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
  const [animating, setAnimating] = useState(false);
  const track = useRef(null);
  const busy = useRef(false); // slide ke dauran dobara click na chale
  const touchX = useRef(0);

  const getStep = () => track.current.firstElementChild.offsetWidth + 24; // card + gap-6

  // Aage: track ko ek card left sarkao, phir pehla card aakhir mein laga do
  function next() {
    if (busy.current) return;
    busy.current = true;
    setAnimating(true);
    setShift(-getStep());
  }

  // Peeche: aakhri card pehle laga do (bina animation), phir right sarkao
  function prev() {
    if (busy.current) return;
    busy.current = true;
    setAnimating(false);
    setItems((a) => [a[a.length - 1], ...a.slice(0, -1)]);
    setShift(-getStep());
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimating(true);
        setShift(0);
      })
    );
  }

  function onTransitionEnd(e) {
    if (e.target !== e.currentTarget) return;
    if (shift < 0) {
      // "Aage" khatam: pehla card aakhir mein bhejo aur track reset karo (nazar nahi aata)
      setAnimating(false);
      setItems((a) => [...a.slice(1), a[0]]);
      setShift(0);
    }
    busy.current = false;
  }

  // Mobile par swipe
  function onTouchEnd(e) {
    const diff = e.changedTouches[0].clientX - touchX.current;
    if (diff < -50) next();
    if (diff > 50) prev();
  }

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--white-cards)] border border-[var(--border-color)] shadow-md text-[var(--primary-text)] flex items-center justify-center hover:bg-[var(--primary-yellow)]";

  return (
    <section className="px-4 md:px-12 py-12">
      <div className="w-12 h-1 bg-[var(--primary-yellow)] mb-6" />
      <h2 className="text-3xl md:text-4xl text-[var(--primary-text)]">What Our Customers Say</h2>
      <p className="text-[var(--secondary-text)] mt-3 mb-8">
        Sample testimonials shown for demonstration purposes.
      </p>

      <div className="relative">
        <button type="button" onClick={prev} aria-label="Previous review" className={`${arrowClass} left-2 md:-left-5`}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        {/* overflow-hidden: sirf 3 cards nazar aate hain, baqi chup rehte hain */}
        <div
          className="overflow-hidden py-2"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={track}
            onTransitionEnd={onTransitionEnd}
            className="flex gap-6"
            style={{
              transform: `translateX(${shift}px)`,
              transition: animating ? "transform 500ms ease-in-out" : "none",
            }}
          >
            {items.map((r) => (
              <article
                key={r.id}
                className="shrink-0 w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-[var(--white-cards)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm"
              >
                <Stars rating={r.rating} />

                <p className="text-lg text-[var(--primary-text)] mt-4">“{r.text}”</p>

                <div className="flex items-center gap-3 mt-6">
                  <div className="w-14 h-14 rounded-full bg-[var(--industrial-blue-grey)] text-white text-xl font-bold flex items-center justify-center shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--primary-text)]">{r.name}</p>
                    <p className="text-sm text-[var(--secondary-text)]">{r.tag} · Demo review</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button type="button" onClick={next} aria-label="Next review" className={`${arrowClass} right-2 md:-right-5`}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}