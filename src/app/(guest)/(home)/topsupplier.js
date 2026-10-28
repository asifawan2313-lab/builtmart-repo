"use client";

import { useState } from "react";
import Image from "next/image";

// Sample data. Jab backend aaye to isay API ke data se replace karna hai.
// Kam az kam 5 suppliers rakhein, warna loop smooth nahi chale ga.
// logo khali ho to naam ke pehle harf wala box dikhta hai.
const suppliers = [
  { id: 1, logo: "", name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "Gujranwala" },
  { id: 2, logo: "", name: "Pak Cement Traders", type: "Verified Supplier", services: "Cement | Bajri | Crush", city: "Gujranwala" },
  { id: 3, logo: "", name: "Ittefaq Steel Point", type: "Retailer", services: "Steel Saria | Iron Sheets", city: "Wazirabad" },
  { id: 4, logo: "", name: "City Sand & Bajri", type: "Verified Supplier", services: "Ravi Sand | Chenab Sand", city: "Lahore" },
  { id: 5, logo: "", name: "Madina Tiles House", type: "Retailer", services: "Tiles | Marble | Sanitary", city: "Gujranwala" },
];

export default function TopSuppliers() {
  const [active, setActive] = useState(0);
  const total = suppliers.length;
  const half = Math.floor(total / 2);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <section className="px-4 md:px-12 py-12">
      <h2 className="text-3xl md:text-4xl text-center text-[var(--primary-text)] mb-10">
        Top Rated Suppliers
      </h2>

      {/* --step: cards ke beech ka fasla (mobile par kam, bade screen par zyada) */}
      <div className="relative h-[27rem] overflow-hidden [--step:15rem] md:[--step:20rem]">
        {suppliers.map((s, i) => {
          // -half ... +half: 0 matlab center card
          const offset = ((i - active + total + half) % total) - half;
          const isActive = offset === 0;
          const far = Math.abs(offset) > 1;

          return (
            <article
              key={s.id}
              onClick={() => setActive(i)}
              className={`absolute left-1/2 top-1/2 w-72 bg-[var(--white-cards)] rounded-2xl border-2 p-6 text-center transition-all duration-500 ease-in-out ${
                isActive
                  ? "border-[var(--primary-yellow)] shadow-xl"
                  : "border-[var(--border-color)] cursor-pointer"
              }`}
              style={{
                transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
                opacity: isActive ? 1 : far ? 0 : 0.55,
                zIndex: 10 - Math.abs(offset),
                pointerEvents: far ? "none" : "auto",
              }}
            >
              {/* Logo */}
              <div className="relative w-24 h-24 mx-auto rounded-xl border border-[var(--border-color)] overflow-hidden flex items-center justify-center bg-[var(--off-white-background)]">
                {s.logo ? (
                  <Image src={s.logo} alt={s.name} fill sizes="96px" className="object-contain p-2" />
                ) : (
                  <span className="text-3xl font-bold text-[var(--industrial-blue-grey)]">{s.name[0]}</span>
                )}
              </div>

              <h3 className="text-xl text-[var(--primary-text)] mt-4 truncate">{s.name}</h3>

              <span className="inline-block mt-2 text-sm px-3 py-1 rounded bg-[var(--off-white-background)] text-[var(--industrial-blue-grey)]">
                {s.type}
              </span>

              <p className="text-sm text-[var(--secondary-text)] mt-3">{s.services}</p>

              <p className="flex items-center justify-center gap-1 text-sm text-[var(--secondary-text)] mt-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[var(--industrial-blue-grey)]" fill="currentColor">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                {s.city}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  className="flex-1 py-2 text-sm font-semibold rounded-lg bg-[var(--primary-yellow)] text-[var(--primary-text)] hover:bg-[var(--hover-yellow)]"
                >
                  Contact
                </button>
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  className="flex-1 py-2 text-sm font-semibold rounded-lg border border-[var(--border-color)] text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
                >
                  View Shop
                </button>
              </div>
            </article>
          );
        })}

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous supplier"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--industrial-blue-grey)] text-white flex items-center justify-center hover:bg-[var(--charcoal-black)]"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next supplier"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--industrial-blue-grey)] text-white flex items-center justify-center hover:bg-[var(--charcoal-black)]"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}