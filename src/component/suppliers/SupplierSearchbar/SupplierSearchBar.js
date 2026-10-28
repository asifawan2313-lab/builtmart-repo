"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

// Text badalna ho to sirf yahan badlein
const PHRASES = [
  "Search supplier or shop name...",
  "Search cement, steel, bricks...",
  "Search by brand...",
  "Search by location in Gujranwala...",
];
const LOCATIONS = ["Gujranwala", "Satellite Town", "Model Town", "GT Road"]; // demo data

// Typewriter: type -> ruko -> delete -> agla text
function useTypewriter(phrases, typeSpeed = 70, deleteSpeed = 35, hold = 1400) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Reduce motion: animation ke bagair pehla text dikhao
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0]);
      return;
    }

    const word = phrases[index];
    const full = !deleting && text === word;
    const delay = full ? hold : deleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((index + 1) % phrases.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, hold]);

  return text;
}

const field =
  "h-10 rounded-lg border border-[#E2E4E7] bg-white text-[13px] text-[#202124] outline-none focus:border-[#202124]";

export default function SupplierSearchBar() {
  const [value, setValue] = useState("");
  const typed = useTypewriter(PHRASES);

  return (
    // Bahar wala div: hero se gap deta hai (gap kam/zyada karna ho to pt-10 pb-6 badlein)
    <div className="px-4 pb-6 pt-10 sm:px-6">
      <style>{`
        @keyframes bmBlink { 50% { opacity: 0; } }
        @keyframes bmFlip3d { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
      `}</style>

      <div role="search" className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row">
        {/* Search input + typing placeholder */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Search suppliers"
            className={`${field} w-full pl-11 pr-4`}
          />
          {!value && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-11 top-1/2 flex -translate-y-1/2 items-center text-[13px] text-[#45484D]/60"
            >
              {typed}
              <span className="ml-0.5 h-4 w-0.5 bg-[#202124] animate-[bmBlink_1s_steps(1)_infinite]" />
            </span>
          )}
        </div>

        {/* Location */}
        <select aria-label="Location" className={`${field} px-4 sm:w-44`}>
          {LOCATIONS.map((place) => (
            <option key={place}>{place}</option>
          ))}
        </select>

        {/* Search button + hamesha ghoomta 3D icon */}
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#202124] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#45484D] sm:min-w-[120px]"
        >
          <span className="flex [perspective:300px]">
            <Search
              aria-hidden="true"
              className="h-4 w-4 animate-[bmFlip3d_2.5s_ease-in-out_infinite] motion-reduce:animate-none"
            />
          </span>
          Search
        </button>
      </div>
    </div>
  );
}