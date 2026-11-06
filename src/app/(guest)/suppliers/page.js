"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Info,
  LayoutGrid,
  List,
  MapPin,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";

// Hero image: src/assets/images/supplier/shops/
import heroBg from "../../../assets/images/supplier/shops/supplier-hero.jpg";

// Reusable card (logo card ke andar hi hai) aur data (isi folder mein)
import SupplierCard from "../../../component/suppliers/SupplierCard/SupplierCard";
import { suppliers } from "./supplierData";

/* ============================================================
   1. HERO (text letter by letter, sab kuch isi section mein)
   ============================================================ */

// Text badalna ho to sirf yahan badlein
const hero = {
  title: "Construction Material Suppliers",
  subtitle:
    "Browse shops in Gujranwala, see what they sell and find the right supplier without visiting many stores. All supplier details here are demo data.",
};

const SPEED = 35; // ms per letter
const HOLD = 3000; // ms: poora text nazar aata rahe, phir dobara shuru

const SupplierHero = () => {
  const [count, setCount] = useState(0); // kitne letters nazar aa chuke hain

  const titleLetters = hero.title.replace(/ /g, "").length;
  const total = titleLetters + hero.subtitle.replace(/ /g, "").length;

  useEffect(() => {
    // Reduce motion: sab letters foran dikhao
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }

    // Ek ek letter dikhao, poora hone par HOLD ke baad dobara shuru
    let timer;
    const tick = (n) => {
      setCount(n);
      timer = setTimeout(() => tick(n >= total ? 0 : n + 1), n >= total ? HOLD : SPEED);
    };
    tick(0);

    return () => clearTimeout(timer);
  }, [total]);

  // Text ke letters: offset se pata chalta hai ke is text ka pehla letter kaunsa number hai
  const renderLetters = (text, offset) => {
    let i = offset;
    return text.split(" ").map((word, w) => (
      <span key={w} aria-hidden="true" className="mr-[0.3em] inline-block whitespace-nowrap">
        {word.split("").map((letter, l) => (
          <span
            key={l}
            className={`inline-block transition-all duration-500 ease-out ${
              i++ < count ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {letter}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section className="relative flex min-h-[320px] items-center overflow-hidden text-white sm:min-h-[380px]">
      {/* Background image (slow zoom + halka pan) */}
      <div className="absolute inset-0 animate-[bmHeroBg_14s_ease-in-out_infinite_alternate] will-change-transform motion-reduce:animate-none">
        <Image src={heroBg} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[#26272b]/70" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <h1
          aria-label={hero.title}
          className="font-[family-name:var(--font-baloo)] text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          {renderLetters(hero.title, 0)}
        </h1>

        <p aria-label={hero.subtitle} className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
          {renderLetters(hero.subtitle, titleLetters)}
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   2. SEARCH + CATEGORIES + FILTERS + RESULTS (ek hi section)
   ============================================================ */

// Text badalna ho to sirf yahan badlein
const PHRASES = [
  "Search supplier or shop name...",
  "Search cement, steel, bricks...",
  "Search by brand...",
  "Search by location in Gujranwala...",
];
const LOCATIONS = ["Gujranwala", "Satellite Town", "Model Town", "GT Road"]; // demo data

// Demo categories (badalna ho to sirf yahan badlein)
const categories = ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints", "Pipes"];
const sortOptions = ["Recommended", "Highest Rated", "Most Reviews", "Name (A-Z)"];

// Options badalne hon to sirf yahan badlein (demo data)
const FILTERS = [
  { label: "Location", icon: MapPin, options: ["All Areas", "Satellite Town", "Model Town", "GT Road", "Peoples Colony"] },
  { label: "Verification Status", icon: ShieldCheck, options: ["All Suppliers", "Verified", "Unverified"] },
  { label: "Rating", icon: Star, options: ["Any Rating", "4.5 & above", "4.0 & above", "3.5 & above"] },
];

// Grid / List toggle
const views = [
  { name: "Grid", icon: LayoutGrid },
  { name: "List", icon: List },
];

const field =
  "h-10 rounded-lg border border-[#E2E4E7] bg-white text-[13px] text-[#202124] outline-none focus:border-[#202124]";

const chip =
  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]";

const SupplierSearchFilterSection = () => {
  const [value, setValue] = useState(""); // search box ka text
  const [typed, setTyped] = useState(""); // placeholder ka typing text
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Simple handlers
  const handleSearch = () => console.log("Search clicked");
  const handleClear = () => console.log("Clear All clicked");

  // Typewriter placeholder: type -> ruko -> delete -> agla text
  useEffect(() => {
    // Reduce motion: animation ke bagair pehla text dikhao
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(PHRASES[0]);
      return;
    }

    const word = PHRASES[phraseIndex];
    const full = !deleting && typed === word;
    const delay = full ? 1400 : deleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (full) setDeleting(true);
      else if (deleting && typed === "") {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % PHRASES.length);
      } else setTyped(word.slice(0, typed.length + (deleting ? -1 : 1)));
    }, delay);

    return () => clearTimeout(timer);
  }, [typed, deleting, phraseIndex]);

  return (
    <section className="pt-10">
      {/* Search row */}
      <div role="search" className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row">
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
              <span className="ml-0.5 h-4 w-0.5 animate-[bmBlink_1s_steps(1)_infinite] bg-[#202124]" />
            </span>
          )}
        </div>

        <select aria-label="Location" className={`${field} px-4 sm:w-44`}>
          {LOCATIONS.map((place) => (
            <option key={place}>{place}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSearch}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#202124] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#45484D] sm:min-w-[120px]"
        >
          <span className="flex [perspective:300px]">
            <Search aria-hidden="true" className="h-4 w-4 animate-[bmFlip3d_2.5s_ease-in-out_infinite] motion-reduce:animate-none" />
          </span>
          Search
        </button>
      </div>

      {/* Category chips + Sort By */}
      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button type="button" className={`${chip} border-[#202124] bg-[#202124] text-white hover:bg-[#45484D]`}>
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            All Categories
          </button>

          {categories.map((name, i) => (
            <button
              key={name}
              type="button"
              style={{ animationDelay: `${(i + 1) * 60}ms` }}
              className={`${chip} animate-[bmChipIn_0.5s_ease-out_both] border-[#E2E4E7] bg-white text-[#45484D] hover:border-[#A7ADB4] hover:bg-[#F4F4F2] motion-reduce:animate-none`}
            >
              <Circle className="h-4 w-4 text-[#A7ADB4]" aria-hidden="true" />
              {name}
            </button>
          ))}

          <button type="button" className={`${chip} border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#F4F4F2]`}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            More
          </button>
        </div>

        <label className="flex shrink-0 items-center gap-3 text-sm text-[#45484D]">
          Sort By
          <span className="relative">
            <select
              aria-label="Sort suppliers"
              className="h-10 cursor-pointer appearance-none rounded-lg border border-[#E2E4E7] bg-white pl-4 pr-10 text-sm font-medium text-[#202124] outline-none transition-colors duration-300 hover:border-[#A7ADB4] focus-visible:ring-2 focus-visible:ring-[#A7ADB4]"
            >
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          </span>
        </label>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {FILTERS.map(({ label, icon: FilterIcon, options }) => (
          <label
            key={label}
            className="flex items-center gap-2 rounded-lg border border-[#E2E4E7] bg-white px-3 py-1.5 text-sm text-[#45484D] transition-colors focus-within:border-black focus-within:ring-1 focus-within:ring-black"
          >
            <FilterIcon className="h-4 w-4" aria-hidden="true" />
            {label}
            <select
              aria-label={label}
              defaultValue={options[0]}
              className="rounded-md border border-[#E2E4E7] bg-white px-2 py-1.5 text-sm text-[#202124] outline-none focus:border-black"
            >
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}

        <button
          type="button"
          onClick={handleClear}
          className="ml-auto flex items-center gap-2 text-sm text-[#45484D] transition-colors hover:text-black"
        >
          Clear All
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Results count + Grid / List toggle */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="animate-[bmResultsIn_0.5s_ease-out_both] text-sm text-[#45484D] motion-reduce:animate-none">
          Showing 1–{suppliers.length} of {suppliers.length} suppliers
        </p>

        {/* Radio + CSS: bina JavaScript ke chalta hai */}
        <div
          role="radiogroup"
          aria-label="View mode"
          style={{ animationDelay: "100ms" }}
          className="flex animate-[bmResultsIn_0.5s_ease-out_both] gap-1 rounded-xl bg-[#F4F4F2] p-1 motion-reduce:animate-none"
        >
          {views.map(({ name, icon: ViewIcon }, i) => (
            <label key={name} className="cursor-pointer">
              <input type="radio" name="supplier-view" defaultChecked={i === 0} className="peer sr-only" />
              <span className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#45484D] transition-all duration-300 ease-out hover:-translate-y-0.5 peer-checked:bg-[#202124] peer-checked:text-white peer-checked:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-[#A7ADB4]">
                <ViewIcon className="h-4 w-4" aria-hidden="true" />
                {name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   3. SUPPLIER CARDS (card component se) + demo pagination
   ============================================================ */

const pages = [1, 2, 3, 4]; // demo pagination
const pageBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]";

const SupplierCardsSection = () => {
  return (
    <section className="mt-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {suppliers.map((supplier, i) => (
          <SupplierCard key={supplier.id} supplier={supplier} index={i} />
        ))}
      </div>

      {/* Demo note + pagination */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-[#45484D]">
          <Info className="h-4 w-4 shrink-0 text-[#A7ADB4]" aria-hidden="true" />
          All supplier information is for demo purposes only. Verification status and reviews are sample data.
        </p>

        <nav aria-label="Pagination" className="flex gap-2">
          <button type="button" aria-label="Previous page" className={`${pageBtn} border-[#E2E4E7] bg-white text-[#45484D]`}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pages.map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === 1 ? "page" : undefined}
              className={`${pageBtn} ${
                n === 1 ? "border-[#202124] bg-[#202124] text-white" : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#F4F4F2]"
              }`}
            >
              {n}
            </button>
          ))}
          <button type="button" aria-label="Next page" className={`${pageBtn} border-[#E2E4E7] bg-white text-[#45484D]`}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </section>
  );
};

/* ============================================================
   PAGE
   ============================================================ */

export default function Page() {
  return (
    <main className="bg-[#F4F4F2]">
      {/* Is page ki animations (card aur logo ki animations SupplierCard ke andar hain) */}
      <style>{`
        @keyframes bmHeroBg    { 0% { transform: scale(1) translateX(0); } 100% { transform: scale(1.15) translateX(-2%); } }
        @keyframes bmBlink     { 50% { opacity: 0; } }
        @keyframes bmFlip3d    { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
        @keyframes bmChipIn    { from { opacity: 0; transform: translateY(8px); }  to { opacity: 1; transform: translateY(0); } }
        @keyframes bmResultsIn { from { opacity: 0; transform: translateY(8px); }  to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <SupplierHero />

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <SupplierSearchFilterSection />
        <SupplierCardsSection />
      </div>
    </main>
  );
}