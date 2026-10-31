"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Info,
  Store,
} from "lucide-react";

// Images: src/assets/images/supplier/ (file names apne folder ke mutabiq check karein)
import heroBg from "../../assets/images/supplier/shops/supplier-hero.jpg";
import shop1 from "../../assets/images/supplier/shops/shop-1.jpg";
import shop2 from "../../assets/images/supplier/shops/shop-2.jpg";
import shop3 from "../../assets/images/supplier/shops/shop-3.jpg";
import shop4 from "../../assets/images/supplier/shops/shop-4.jpg";
import shop5 from "../../assets/images/supplier/shops/shop-5.jpg";
import shop6 from "../../assets/images/supplier/shops/shop-6.jpg";
import shop7 from "../../assets/images/supplier/shops/shop-7.jpg";
import shop8 from "../../assets/images/supplier/shops/shop-8.jpg";

/* ============================================================
   DEMO DATA: naam, rating, reviews aur verification sirf UI ke liye hain
   ============================================================ */

const suppliers = [
  { id: 1, name: "Al-Noor Building Store", initials: "AN", location: "GT Road, Gujranwala", rating: 4.6, reviews: 124, verified: true, image: shop1,
    description: "Complete range of construction materials at competitive prices for builders and contractors.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"] },
  { id: 2, name: "City Material Traders", initials: "CM", location: "Satellite Town, Gujranwala", rating: 4.5, reviews: 98, verified: true, image: shop2,
    description: "Wide range of construction materials with reliable service and on-time delivery.",
    tags: ["Cement", "Steel", "Bricks", "Sand"] },
  { id: 3, name: "Rehman Builders Supply", initials: "RB", location: "Model Town, Gujranwala", rating: 4.3, reviews: 76, verified: false, image: shop3,
    description: "One-stop shop for construction needs with affordable rates.",
    tags: ["Cement", "Steel", "Paints", "Pipes"] },
  { id: 4, name: "Zahid Construction Materials", initials: "ZC", location: "Peoples Colony, Gujranwala", rating: 4.7, reviews: 112, verified: true, image: shop4,
    description: "Premium quality materials for residential and commercial projects.",
    tags: ["Cement", "Steel", "Tiles", "Marble"] },
  { id: 5, name: "Punjab Building Materials", initials: "PB", location: "GT Road, Gujranwala", rating: 4.4, reviews: 87, verified: true, image: shop5,
    description: "Quality construction materials and professional support for all projects.",
    tags: ["Cement", "Bricks", "Paints", "Pipes"] },
  { id: 6, name: "Modern Builders Mart", initials: "MB", location: "Satellite Town, Gujranwala", rating: 4.2, reviews: 34, verified: true, image: shop6,
    description: "High quality materials with friendly customer support.",
    tags: ["Cement", "Steel", "Sand", "Tiles"] },
  { id: 7, name: "Ali & Sons Traders", initials: "AS", location: "Model Town, Gujranwala", rating: 4.1, reviews: 52, verified: true, image: shop7,
    description: "Reliable supplier of building materials at competitive prices.",
    tags: ["Bricks", "Tiles", "Paints", "Pipes"] },
  { id: 8, name: "Rana Construction Supply", initials: "RC", location: "Peoples Colony, Gujranwala", rating: 3.9, reviews: 38, verified: false, image: shop8,
    description: "Quality materials for residential and commercial projects.",
    tags: ["Cement", "Bricks", "Sand", "Steel"] },
];

const categories = ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints", "Pipes"];
const sortOptions = ["Recommended", "Highest Rated", "Most Reviews", "Name (A-Z)"];
const searchLocations = ["All Areas", "GT Road", "Satellite Town", "Model Town", "Peoples Colony"];
const phrases = [
  "Search supplier or shop name...",
  "Search cement, steel, bricks...",
  "Search by brand...",
  "Search by location in Gujranwala...",
];
const views = [
  { id: 1, name: "Grid", icon: LayoutGrid },
  { id: 2, name: "List", icon: List },
];
const filters = [
  { id: 1, label: "Location", icon: MapPin, options: ["All Areas", "Satellite Town", "Model Town", "GT Road", "Peoples Colony"] },
  { id: 2, label: "Verification Status", icon: ShieldCheck, options: ["All Suppliers", "Verified", "Unverified"] },
  { id: 3, label: "Rating", icon: Star, options: ["Any Rating", "4.5 & above", "4.0 & above", "3.5 & above"] },
];
const pages = [1, 2];

/* ============================================================
   0. ANIMATIONS (ek jagah): keyframes sirf yahan
   ============================================================ */

const Animations = () => {
  return (
    <style>{`
      @keyframes bmCardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes bmChipIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes bmResultsIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes bmBlink { 50% { opacity: 0; } }
      @keyframes bmFlip3d { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
      @keyframes bmLogoSpin { to { transform: rotate(360deg); } }
      @keyframes bmLogoRipple { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
      @keyframes bmLogoShine { 0%, 55% { transform: translateX(-160%) skewX(-20deg); } 100% { transform: translateX(260%) skewX(-20deg); } }
      @keyframes bmLogoGlow { from { box-shadow: 0 0 0 0 rgba(255,198,26,0); } to { box-shadow: 0 0 16px 2px rgba(255,198,26,.55); } }
      @media (prefers-reduced-motion: reduce) {
        .bm-logo, .bm-logo i { animation: none !important; }
      }
    `}</style>
  );
};

/* ============================================================
   1. ANIMATED TEXT (letter by letter)
   ============================================================ */

const AnimatedText = ({ text, delay = 0, speed = 40, cycle = 0, className = "" }) => {
  const [count, setCount] = useState(0); // kitne letters nazar aa chuke hain
  const total = text.replace(/ /g, "").length;

  useEffect(() => {
    // Reduce motion: sab letters foran dikhao
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }

    let typing;
    let start;

    const play = () => {
      clearTimeout(start);
      clearInterval(typing);
      setCount(0);
      start = setTimeout(() => {
        let n = 0;
        typing = setInterval(() => {
          setCount(++n);
          if (n >= total) clearInterval(typing);
        }, speed);
      }, delay);
    };

    play();
    const loop = cycle && setInterval(play, cycle);

    return () => {
      clearTimeout(start);
      clearInterval(typing);
      clearInterval(loop);
    };
  }, [text, delay, speed, cycle, total]);

  let index = -1;

  return (
    <span aria-label={text} className={className}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true" className="mr-[0.3em] inline-block whitespace-nowrap">
          {word.split("").map((letter, l) => (
            <span
              key={l}
              className={`inline-block transition-all duration-500 ease-out ${
                ++index < count ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

/* ============================================================
   2. SUPPLIER LOGO (ghoomti ring + ripple + glow + chamak)
   ============================================================ */

const SupplierLogo = ({ initials, index = 0 }) => {
  const delay = `${-index * 0.7}s`; // har card ka logo alag timing par

  return (
    <span
      style={{ animation: "bmLogoGlow 2.4s ease-in-out infinite alternate", animationDelay: delay }}
      className="bm-logo relative h-12 w-12 shrink-0 rounded-full"
    >
      {[0, 1.2].map((d) => (
        <i
          key={d}
          style={{ animation: "bmLogoRipple 2.4s ease-out infinite", animationDelay: `calc(${delay} + ${d}s)` }}
          className="absolute inset-0 rounded-full border-2 border-[#ffc61a]"
        />
      ))}

      <i
        style={{
          animation: "bmLogoSpin 3s linear infinite",
          animationDelay: delay,
          background: "conic-gradient(from 0deg, #ffc61a, #202124 35%, #A7ADB4 60%, #ffc61a)",
        }}
        className="absolute -inset-[3px] rounded-full"
      />

      <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-[#202124] text-sm font-bold text-white">
        <i
          style={{ animation: "bmLogoShine 3.2s ease-in-out infinite", animationDelay: delay }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <span className="relative">{initials}</span>
      </span>
    </span>
  );
};

/* ============================================================
   3. HERO
   ============================================================ */

const Hero = () => {
  return (
    <section className="relative flex min-h-[260px] items-center overflow-hidden bg-[#202124] sm:min-h-[320px]">
      <Image src={heroBg} alt="Construction materials (demo image)" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#202124]/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <p className="flex items-center gap-3 text-sm text-white/80 sm:text-base">
          <span className="h-6 w-1 shrink-0 bg-[#ffc61a]" />
          Suppliers across Gujranwala
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          <AnimatedText text="Construction Material Suppliers" speed={45} cycle={12000} />
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
          Browse shops in Gujranwala, see what they sell and find the right supplier without
          visiting many stores. All supplier details here are demo data.
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   4. SEARCH BAR (typewriter placeholder)
   ============================================================ */

// Typewriter: type -> ruko -> delete -> agla text
const useTypewriter = (list, typeSpeed = 70, deleteSpeed = 35, hold = 1400) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(list[0]);
      return;
    }

    const word = list[index];
    const full = !deleting && text === word;
    const wait = full ? hold : deleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((index + 1) % list.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, wait);

    return () => clearTimeout(timer);
  }, [text, deleting, index, list, typeSpeed, deleteSpeed, hold]);

  return text;
};

const fieldClass =
  "h-11 rounded-lg border border-[#E2E4E7] bg-white text-sm text-[#202124] outline-none focus:border-[#202124]";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState(""); // sirf placeholder chhupane ke liye
  const typed = useTypewriter(phrases);

  return (
    <div className="px-4 pb-6 pt-10 sm:px-6">
      <div role="search" className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Search suppliers"
            className={`${fieldClass} w-full pl-11 pr-4`}
          />
          {!value && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-11 right-4 top-1/2 flex -translate-y-1/2 items-center overflow-hidden text-sm text-[#45484D]/60"
            >
              <span className="truncate">{typed}</span>
              <span className="ml-0.5 h-4 w-0.5 shrink-0 animate-[bmBlink_1s_steps(1)_infinite] bg-[#202124]" />
            </span>
          )}
        </div>

        <div className="relative sm:w-48">
          <select aria-label="Location" className={`${fieldClass} w-full appearance-none px-4 pr-10`}>
            {searchLocations.map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#202124] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#45484D] sm:min-w-[120px]"
        >
          <span className="flex [perspective:300px]">
            <Search className="h-4 w-4 animate-[bmFlip3d_2.5s_ease-in-out_infinite] motion-reduce:animate-none" aria-hidden="true" />
          </span>
          Search
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   5. CATEGORY BAR + SORT
   ============================================================ */

const chip =
  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]";

const CategoryBar = ({ onCategory, onSort }) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => onCategory("All Categories")}
          className={`${chip} border-[#202124] bg-[#202124] text-white hover:bg-[#45484D]`}
        >
          <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          All Categories
        </button>

        {categories.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => onCategory(name)}
            style={{ animationDelay: `${(i + 1) * 60}ms` }}
            className={`${chip} animate-[bmChipIn_0.5s_ease-out_both] border-[#E2E4E7] bg-white text-[#45484D] hover:border-[#A7ADB4] hover:bg-[#F4F4F2] motion-reduce:animate-none`}
          >
            {name}
          </button>
        ))}
      </div>

      <label className="flex shrink-0 items-center gap-3 text-sm text-[#45484D]">
        Sort By
        <span className="relative">
          <select
            aria-label="Sort suppliers"
            onChange={(e) => onSort(e.target.value)}
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
  );
};

/* ============================================================
   6. FILTER BAR
   ============================================================ */

const FilterBar = ({ onFilter, onClear }) => {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {filters.map(({ id, label, icon: FilterIcon, options }) => (
        <label
          key={id}
          className="flex w-full items-center gap-2 rounded-lg border border-[#E2E4E7] bg-white px-3 py-1.5 text-sm text-[#45484D] transition-colors focus-within:border-black focus-within:ring-1 focus-within:ring-black sm:w-auto"
        >
          <FilterIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {label}
          <select
            aria-label={label}
            onChange={(e) => onFilter(label, e.target.value)}
            className="ml-auto rounded-md border border-[#E2E4E7] bg-white px-2 py-1.5 text-sm text-[#202124] outline-none focus:border-black sm:ml-0"
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-2 text-sm text-[#45484D] transition-colors hover:text-black sm:ml-auto"
      >
        Clear All
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

/* ============================================================
   7. RESULTS BAR (Grid / List toggle)
   ============================================================ */

const ResultsBar = ({ total, onView }) => {
  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      <p className="animate-[bmResultsIn_0.5s_ease-out_both] text-sm text-[#45484D] motion-reduce:animate-none">
        Showing 1–{total} of {total} suppliers
      </p>

      <div
        role="radiogroup"
        aria-label="View mode"
        style={{ animationDelay: "100ms" }}
        className="flex animate-[bmResultsIn_0.5s_ease-out_both] gap-1 rounded-xl bg-[#F4F4F2] p-1 motion-reduce:animate-none"
      >
        {views.map(({ id, name, icon: ViewIcon }, i) => (
          <label key={id} className="cursor-pointer">
            <input
              type="radio"
              name="supplier-view"
              defaultChecked={i === 0}
              onChange={() => onView(name)}
              className="peer sr-only"
            />
            <span className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#45484D] transition-all duration-300 ease-out hover:-translate-y-0.5 peer-checked:bg-[#202124] peer-checked:text-white peer-checked:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-[#A7ADB4] sm:px-4">
              <ViewIcon className="h-4 w-4" aria-hidden="true" />
              {name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   8. SUPPLIER CARD
   ============================================================ */

const MAX_TAGS = 4; // is se zyada tags "+N" mein badal jate hain

const tagClass =
  "cursor-default rounded-full border border-[#D9E3E9] bg-[#F4F4F2] px-3 py-1 text-xs text-[#565553] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffc61a] hover:bg-[#ffc61a]/15 hover:text-[#202124]";

const SupplierCard = ({ supplier, index, onViewShop }) => {
  const { name, initials, location, rating, reviews, description, tags, image, verified } = supplier;
  const extra = tags.length - MAX_TAGS;

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className="group flex animate-[bmCardIn_0.6s_ease-out_both] flex-col rounded-xl border border-[#D9E3E9] bg-white p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc61a] hover:shadow-xl motion-reduce:animate-none"
    >
      {/* Shop image + verification badge */}
      <div className="relative h-36 overflow-hidden rounded-lg bg-[#D9E3E9] sm:h-40">
        <Image
          src={image}
          alt={`${name} shop (demo image)`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          className={`absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow ${
            verified ? "text-blue-600" : "text-[#565553]"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {verified ? "Verified (demo)" : "Unverified"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        {/* Logo + name + location + rating */}
        <div className="flex items-center gap-3">
          <SupplierLogo initials={initials} index={index} />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#202124]">{name}</h3>
            <p className="flex items-center gap-1 text-xs text-[#565553]">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </p>
            <p className="flex items-center gap-1 text-xs text-[#565553]">
              <Star className="h-3 w-3 shrink-0 fill-[#ffc61a] text-[#ffc61a]" aria-hidden="true" />
              <b className="text-[#202124]">{rating}</b> ({reviews}+ reviews, demo)
            </p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-[#565553]">{description}</p>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, MAX_TAGS).map((t) => (
            <span key={t} className={tagClass}>
              {t}
            </span>
          ))}
          {extra > 0 && <span className={tagClass}>+{extra}</span>}
        </div>

        {/* View Shop: abhi sirf handler */}
        <button
          type="button"
          onClick={() => onViewShop(name)}
          className="group/btn mt-auto flex h-9 items-center justify-center gap-2 rounded-md border border-[#ffc61a] bg-[#ffc61a] text-sm font-semibold text-[#202124] transition-all duration-300 hover:bg-[#25272A] hover:text-[#ffc61a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60"
        >
          <Store className="h-4 w-4" aria-hidden="true" />
          View Shop
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

/* ============================================================
   9. PAGINATION + DEMO NOTE
   ============================================================ */

const pageBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]";

const PaginationBar = ({ onPage }) => {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2 text-xs text-[#45484D]">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#A7ADB4]" aria-hidden="true" />
        All supplier information is for demo purposes only. Verification status and reviews are sample data.
      </p>

      <nav aria-label="Pagination" className="flex gap-2">
        <button type="button" aria-label="Previous page" onClick={() => onPage("prev")} className={`${pageBtn} border-[#E2E4E7] bg-white text-[#45484D]`}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        {pages.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPage(n)}
            aria-current={n === 1 ? "page" : undefined}
            className={`${pageBtn} ${
              n === 1 ? "border-[#202124] bg-[#202124] text-white" : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#F4F4F2]"
            }`}
          >
            {n}
          </button>
        ))}
        <button type="button" aria-label="Next page" onClick={() => onPage("next")} className={`${pageBtn} border-[#E2E4E7] bg-white text-[#45484D]`}>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

/* ============================================================
   PAGE
   ============================================================ */

const SupplierPage = () => {
  // Simple handlers: abhi sirf console.log
  const handleSearch = () => console.log("Search clicked");
  const handleCategory = (name) => console.log("Category clicked:", name);
  const handleSort = (value) => console.log("Sort changed:", value);
  const handleFilter = (label, value) => console.log("Filter changed:", label, value);
  const handleClear = () => console.log("Clear All clicked");
  const handleView = (mode) => console.log("View mode clicked:", mode);
  const handleViewShop = (name) => console.log("View Shop clicked:", name);
  const handlePage = (page) => console.log("Page clicked:", page);

  return (
    <main className="bg-[#F4F4F2]">
      <Animations />
      <Hero />
      <SearchBar onSearch={handleSearch} />

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-10">
        <CategoryBar onCategory={handleCategory} onSort={handleSort} />
        <FilterBar onFilter={handleFilter} onClear={handleClear} />
        <ResultsBar total={suppliers.length} onView={handleView} />

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {suppliers.map((supplier, i) => (
            <SupplierCard key={supplier.id} supplier={supplier} index={i} onViewShop={handleViewShop} />
          ))}
        </div>

        <PaginationBar onPage={handlePage} />
      </section>
    </main>
  );
};

export default SupplierPage;