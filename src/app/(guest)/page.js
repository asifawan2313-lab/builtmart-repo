

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Search, Sparkles, Star } from "lucide-react";

// Hero images: src/assets/images/guest/hero/
import grey from "../../assets/images/guest/hero/grey.jpeg";
import exterior from "../../assets/images/guest/hero/exterior.jpeg";
import interior from "../../assets/images/guest/hero/interior.jpeg";

// Card images: src/assets/images/guest/card/
import briks from "../../assets/images/guest/card/briks.jpg";
import sand from "../../assets/images/guest/card/sand.jpg";
import steelSaria from "../../assets/images/guest/card/steelSaria.jpg";
import paint from "../../assets/images/guest/card/paint.jpg";
import tiles from "../../assets/images/guest/card/tiles.jpg";
import doorsWindows from "../../assets/images/guest/card/doorsWindows.jpg";
import secwindow from "../../assets/images/guest/card/secwindow.jpg";
import glassWindow from "../../assets/images/guest/card/window.jpg";
import ceiling from "../../assets/images/guest/card/ceiling.jpg";

import BmCategories from "../../component/guest/cards/Bmcategorycards.js";
import BmMaterialCard from "../../component/guest/cards/Bmmaterialscards.js";

/* ============================================================
   1. HERO
   ============================================================ */

const BM_HERO_SLIDES = [
  { id: 1, image: grey, alt: "Construction materials yard" },
  { id: 2, image: exterior, alt: "House exterior" },
  { id: 3, image: interior, alt: "House interior" },
];

const BM_SEARCH_CATEGORIES = [
  { id: 1, label: "Bricks" },
  { id: 2, label: "Cement" },
  { id: 3, label: "Steel / Saria" },
  { id: 4, label: "Sand" },
  { id: 5, label: "Tiles" },
  { id: 6, label: "Paint" },
];

const BM_SEARCH_LOCATIONS = [
  { id: 1, label: "GT Road" },
  { id: 2, label: "Satellite Town" },
  { id: 3, label: "Model Town" },
  { id: 4, label: "Citi Housing" },
  { id: 5, label: "Wapda Town" },
  { id: 6, label: "Kamoke" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0); // abhi kaun si image dikh rahi hai

  // Har 5 second baad image khud badal jaye
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BM_HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Simple handlers
  const handleExplore = () => console.log("Explore Materials clicked");
  const handleFindSuppliers = () => console.log("Find Suppliers clicked");
  const handleSearch = () => console.log("Search Materials clicked");

  return (
    <section className="bm-hero-root relative flex min-h-[560px] items-center overflow-hidden bg-[var(--charcoal-black)] text-[color:var(--white-cards)] lg:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
      {/* Background images: sirf current image nazar aati hai */}
      {BM_HERO_SLIDES.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.image}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority={index === 0}
          className={`bm-hero-slide object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark parda taake text saaf parha jaye */}
      <div className="bm-hero-overlay absolute inset-0 bg-[var(--charcoal-black)] opacity-60" />

      {/* Hero content */}
      <div className="bm-hero-content relative z-10 mx-auto w-full max-w-[1920px] px-4 py-16 sm:px-6 lg:px-10 2xl:px-12">
        <p className="bm-hero-eyebrow flex items-center gap-4 text-sm font-[family-name:Poppins-Medium] sm:text-base 2xl:text-xl">
          <span className="h-7 w-1 shrink-0 bg-[var(--primary-yellow)]" />
          Bricks, cement, saria, tiles and more
        </p>

        <h1 className="bm-hero-heading mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
          <span className="block">Compare Supplier Prices</span>
          <span className="block">Without the Phone Calls.</span>
        </h1>

        <p className="bm-hero-text mt-6 max-w-3xl text-base leading-7 text-[color:var(--off-white-background)] sm:text-lg sm:leading-8 lg:text-xl 2xl:max-w-4xl 2xl:text-2xl 2xl:leading-10">
          See listed prices and units side by side from different shops, so you
          can plan your budget with less running around.
        </p>

        {/* Search bar */}
        <div className="bm-hero-search mt-8 w-full max-w-[1008px] rounded-xl bg-[var(--white-cards)] p-3 sm:mt-10 sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Material name"
              aria-label="Material name"
              className="bm-hero-search-input w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base text-[color:var(--primary-text)] outline-none placeholder:text-[color:var(--secondary-text)] focus:border-[color:var(--charcoal-black)]"
            />

            <div className="relative">
              <select
                aria-label="Category"
                className="bm-hero-search-category w-full appearance-none rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 pr-10 text-base text-[color:var(--secondary-text)] outline-none focus:border-[color:var(--charcoal-black)]"
              >
                <option value="">All categories</option>
                {BM_SEARCH_CATEGORIES.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[color:var(--secondary-text)]" />
            </div>

            <div className="relative">
              <select
                aria-label="Location"
                className="bm-hero-search-location w-full appearance-none rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 pr-10 text-base text-[color:var(--secondary-text)] outline-none focus:border-[color:var(--charcoal-black)]"
              >
                <option value="">All locations</option>
                {BM_SEARCH_LOCATIONS.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[color:var(--secondary-text)]" />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="bm-hero-search-btn inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--primary-yellow)] px-6 py-3.5 text-base font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:col-span-2 lg:col-span-1"
            >
              <Search size={20} />
              Search Materials
            </button>
          </div>
        </div>

        {/* Do buttons: mobile par upar neeche, baad mein saath saath */}
        <div className="bm-hero-buttons mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
          <button
            type="button"
            onClick={handleExplore}
            className="bm-hero-explore-btn rounded-md bg-[var(--primary-yellow)] px-8 py-4 text-lg font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] 2xl:px-10 2xl:py-5 2xl:text-xl"
          >
            Explore Materials
          </button>

          <button
            type="button"
            onClick={handleFindSuppliers}
            className="bm-hero-suppliers-btn rounded-md border border-[color:var(--border-color)] px-8 py-4 text-lg font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)] 2xl:px-10 2xl:py-5 2xl:text-xl"
          >
            Find Suppliers
          </button>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   2. NEW MATERIALS + REUSED MATERIALS (ek hi component, do baar use)
   ============================================================ */

// Sample materials data
const newMaterials = [
  { id: 1, image: briks, category: "Bricks", name: "Red Clay Bricks (A-Class)", price: 16500, unit: "per 1,000 bricks", supplier: "Al-Noor Building Store", location: "Lahore", status: "In stock" },
  { id: 2, image: paint, category: "Paint", name: "Gold Emulsion Paint", price: 7800, unit: "per 4 litre bucket", supplier: "Pak Colour House", location: "Rawalpindi", status: "In stock" },
  { id: 3, image: sand, category: "Sand", name: "Ravi Sand (Rait)", price: 9000, unit: "per trolley", supplier: "City Sand & Bajri", location: "Lahore", status: "Limited stock" },
  { id: 4, image: steelSaria, category: "Steel", name: "Steel Saria Grade 60", price: 265, unit: "per kg", supplier: "Ittefaq Steel Point", location: "Faisalabad", status: "In stock" },
];

const reusedMaterials = [
  { id: 1, image: briks, category: "Bricks", name: "Leftover Red Bricks", price: 9000, unit: "per 1,000 bricks", supplier: "Sample Seller 1", location: "Gujranwala", status: "Good condition" },
  { id: 2, image: tiles, category: "Tiles", name: "Floor Tiles (2x2 ft)", price: 120, unit: "per sq ft", supplier: "Sample Seller 2", location: "Gujranwala", status: "Like new" },
  { id: 3, image: steelSaria, category: "Steel", name: "Used Steel Rods", price: 180, unit: "per kg", supplier: "Sample Seller 3", location: "Wazirabad", status: "Good condition" },
  { id: 4, image: doorsWindows, category: "Wood", name: "Door Frames (Deodar)", price: 6500, unit: "per piece", supplier: "Sample Seller 4", location: "Gujranwala", status: "Used" },
];

function MaterialSection({ title, placeholder, data, badge, href, linkText }) {
  const [query, setQuery] = useState(""); // jo user type kar raha hai
  const [searchQuery, setSearchQuery] = useState(""); // Search dabane par lagta hai

  const text = searchQuery.trim().toLowerCase();
  const results = data.filter((m) =>
    `${m.name} ${m.category} ${m.supplier} ${m.location}`.toLowerCase().includes(text)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <section className="px-4 md:px-12 py-12">
      <h2 className="mb-8 text-center text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl 2xl:text-5xl">
        {title}
      </h2>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10 flex items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={`Search ${badge.toLowerCase()} materials`}
          className="flex-1 min-w-0 h-12 border border-[#E2E4E7] bg-white rounded-lg px-4 text-[#202124] placeholder:text-[#A7ADB4] focus:outline-none focus:border-[#45484D] focus:ring-1 focus:ring-[#45484D]"
        />
        <button
          type="submit"
          className="h-12 px-6 bg-[#FFC107] text-[#202124] font-semibold rounded-lg hover:bg-[#E5AC00] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Cards */}
      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item) => (
            <BmMaterialCard key={item.id} material={item} badge={badge} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#45484D] py-6">No materials match &quot;{searchQuery}&quot;.</p>
      )}

      <div className="text-center mt-12">
        <Link
          href={href}
          className="inline-block bg-[#202124] text-white font-semibold rounded-lg px-8 py-3 hover:bg-[#45484D] transition-colors"
        >
          {linkText} →
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   3. BANNER
   ============================================================ */

const banners = [
  { image: secwindow, title: "Explore materials from different suppliers", text: "One place to browse shops instead of many calls.", link: "Browse suppliers", href: "/suppliers" },
  { image: glassWindow, title: "Budget-friendly construction options", text: "Sample promotion: compare listed prices before you buy.", link: "Compare prices", href: "/compare-prices" },
  { image: ceiling, title: "Find reusable construction materials", text: "Leftover and reclaimed stock at lower listed prices.", link: "See reusable", href: "/reused-materials" },
];

function Banner() {
  return (
    <section className="px-4 md:px-12 py-12">
      <div className="w-12 h-1 bg-[#202124] mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold text-[#202124] mb-8">Build More. Save More.</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {banners.map((b) => (
          <div key={b.title} className="relative overflow-hidden rounded-xl min-h-[22rem] flex">
            <Image src={b.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#202124]/70" />

            <div className="relative z-10 p-8 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-bold">{b.title}</h3>
              <p className="mt-3 text-white/80">{b.text}</p>
              <Link href={b.href} className="mt-6 font-semibold underline underline-offset-4 w-fit">
                {b.link} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. AI ASSISTANT
   ============================================================ */

function AiAssistant() {
  return (
    <section className="px-4 md:px-12 py-12">
      <div className="bg-[var(--white-cards)] border border-[var(--border-color)] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm uppercase text-[var(--secondary-text)]">
            <Sparkles className="w-5 h-5 text-[var(--primary-yellow)]" />
            BuildMart AI Assistant · Demo
          </p>

          <h2 className="text-3xl md:text-4xl text-[var(--primary-text)] mt-2">
            Plan quantities and budget for your plot
          </h2>

          <p className="text-[var(--secondary-text)] mt-4">
            Get indicative material quantities and grey-structure / finishing cost breakdowns from
            plot size, floors and rooms. Estimates are planning aids, not guaranteed quotations —
            actual costs depend on market rates, quality and site conditions.
          </p>
        </div>

        <Link
          href="/ai-assistant"
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-[var(--charcoal-black)] text-white font-semibold rounded-xl px-8 py-4 hover:bg-[var(--industrial-blue-grey)]"
        >
          Open AI Assistant →
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   5. TOP SUPPLIERS (carousel)
   ============================================================ */

// logo khali ho to naam ke pehle harf wala box dikhta hai. Kam az kam 5 suppliers rakhein.
const suppliers = [
  { id: 1, logo: "", name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "Gujranwala" },
  { id: 2, logo: "", name: "Pak Cement Traders", type: "Verified Supplier", services: "Cement | Bajri | Crush", city: "Gujranwala" },
  { id: 3, logo: "", name: "Ittefaq Steel Point", type: "Retailer", services: "Steel Saria | Iron Sheets", city: "Wazirabad" },
  { id: 4, logo: "", name: "City Sand & Bajri", type: "Verified Supplier", services: "Ravi Sand | Chenab Sand", city: "Lahore" },
  { id: 5, logo: "", name: "Madina Tiles House", type: "Retailer", services: "Tiles | Marble | Sanitary", city: "Gujranwala" },
];

function TopSuppliers() {
  const [active, setActive] = useState(0);
  const total = suppliers.length;
  const half = Math.floor(total / 2);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const handleContact = () => console.log("Contact clicked");
  const handleViewShop = () => console.log("View Shop clicked");

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--industrial-blue-grey)] text-white flex items-center justify-center hover:bg-[var(--charcoal-black)]";

  return (
    <section className="px-4 md:px-12 py-12">
      <h2 className="text-3xl md:text-4xl text-center text-[var(--primary-text)] mb-10">Top Rated Suppliers</h2>

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
                isActive ? "border-[var(--primary-yellow)] shadow-xl" : "border-[var(--border-color)] cursor-pointer"
              }`}
              style={{
                transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
                opacity: isActive ? 1 : far ? 0 : 0.55,
                zIndex: 10 - Math.abs(offset),
                pointerEvents: far ? "none" : "auto",
              }}
            >
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
                <MapPin className="w-4 h-4 text-[var(--industrial-blue-grey)]" />
                {s.city}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleContact}
                  tabIndex={isActive ? 0 : -1}
                  className="flex-1 py-2 text-sm font-semibold rounded-lg bg-[var(--primary-yellow)] text-[var(--primary-text)] hover:bg-[var(--hover-yellow)]"
                >
                  Contact
                </button>
                <button
                  type="button"
                  onClick={handleViewShop}
                  tabIndex={isActive ? 0 : -1}
                  className="flex-1 py-2 text-sm font-semibold rounded-lg border border-[var(--border-color)] text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
                >
                  View Shop
                </button>
              </div>
            </article>
          );
        })}

        <button type="button" onClick={prev} aria-label="Previous supplier" className={`${arrowClass} left-2`}>
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <button type="button" onClick={next} aria-label="Next supplier" className={`${arrowClass} right-2`}>
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   6. CUSTOMER REVIEWS (slider)
   ============================================================ */

// Sample reviews. Kam az kam 4 rakhein taake slide ke waqt agla card tayyar ho.
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
        <Star
          key={n}
          fill="currentColor"
          className={`w-5 h-5 ${n <= rating ? "text-[var(--primary-yellow)]" : "text-[var(--border-color)]"}`}
        />
      ))}
    </div>
  );
}

function CustomerReviews() {
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
      // "Aage" khatam: pehla card aakhir mein bhejo aur track reset karo
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
      <p className="text-[var(--secondary-text)] mt-3 mb-8">Sample testimonials shown for demonstration purposes.</p>

      <div className="relative">
        <button type="button" onClick={prev} aria-label="Previous review" className={`${arrowClass} left-2 md:-left-5`}>
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
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
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   7. FAQ
   ============================================================ */

const faqs = [
  { q: "What is BuildMart Gujranwala and how does it work?", a: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place." },
  { q: "Is BuildMart free to use?", a: "Browsing materials and comparing listed prices is open to everyone. Add your own details here if some features have charges." },
  { q: "How are the suppliers registered?", a: "Suppliers register with their shop details and verification documents. An administrator reviews each application before the supplier is verified." },
  { q: "How do I contact a supplier?", a: "Open any material or supplier listing and use the Contact button to send an inquiry. You can track its status from your account." },
  { q: "Are the prices shown live market rates?", a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying." },
];

function Faq() {
  return (
    <section className="px-4 md:px-12 py-12">
      <h2 className="text-3xl md:text-4xl text-center text-[var(--primary-text)] mb-10">
        Frequently Asked <span className="text-[var(--industrial-blue-grey)]">Questions</span>
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group bg-[var(--white-cards)] border border-[var(--border-color)] rounded-lg hover:border-[var(--industrial-blue-grey)] open:border-[var(--industrial-blue-grey)]"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-[var(--primary-text)] font-medium [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown className="w-5 h-5 shrink-0 text-[var(--industrial-blue-grey)] transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-4 text-[var(--secondary-text)]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function Page() {
  return (
    <div>
      <Hero />
      <BmCategories />
      <MaterialSection
        title="New Material Hubs"
        placeholder="Search bricks, cement, steel, Lahore..."
        data={newMaterials}
        badge="NEW"
        href="/materials"
        linkText="Explore New Materials"
      />
      <Banner />
      <MaterialSection
        title="Reuse Material Hubs"
        placeholder="Search bricks, tiles, steel, Gujranwala..."
        data={reusedMaterials}
        badge="REUSED"
        href="/reused-materials"
        linkText="Explore Reused Materials"
      />
      <AiAssistant />
      <TopSuppliers />
      <CustomerReviews />
      <Faq />
    </div>
  );
}