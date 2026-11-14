"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Package,
  Phone,
  Recycle,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import MaterialCategoryCard from "../../../component/materials/MaterialCategoryCards";

import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
import electrical from "../../../assets/images/guest/card/copperwire.jpg";
import steelWelding from "../../../assets/images/guest/card/steelSaria.jpg";
import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
import architectural from "../../../assets/images/guest/card/tiles.jpg";
import usedBricks from "../../../assets/images/guest/card/briks.jpg";
import sandImage from "../../../assets/images/guest/card/sand.jpg";
import glassWindow from "../../../assets/images/guest/card/window.jpg";
import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

/* ============================================================
   DEMO DATA
   ============================================================ */

// Hero ke dropdowns
const filters = [
  {
    id: 1,
    label: "Area",
    icon: MapPin,
    options: ["All Areas", "Satellite Town", "Model Town", "GT Road", "Peoples Colony"],
  },
  {
    id: 2,
    label: "Category",
    icon: Boxes,
    options: ["All Categories", "Cement", "Steel", "Bricks", "Sand", "Tiles", "Marble", "Paint", "Pipes"],
  },
];

// All Categories: image null ho to card "No image" dikhata hai
const categories = [
  { id: 1, name: "Doors & Windows", image: doorsWindows },
  { id: 2, name: "Construction Chemicals", image: null },
  { id: 3, name: "Electrical & Lighting", image: electrical },
  { id: 4, name: "Steel & Welding", image: steelWelding },
  { id: 5, name: "Interior Design", image: interiorDesign },
  { id: 6, name: "Furniture & Fixtures", image: null },
  { id: 7, name: "Solar Energy & Renewable Energy", image: null },
  { id: 8, name: "Metal & Aluminum Works", image: metalAluminum },
  { id: 9, name: "Paints & Finishes", image: paintsFinishes },
  { id: 10, name: "Woodworks", image: null },
  { id: 11, name: "Architectural Products", image: architectural },
  { id: 12, name: "Kitchen & Wardrobes", image: null },
  { id: 13, name: "Construction Site Equipment", image: null },
  { id: 14, name: "Demolition & Excavation", image: null },
  { id: 15, name: "Bricks & Blocks", image: usedBricks },
  { id: 16, name: "Sand & Crush", image: sandImage },
  { id: 17, name: "Glass & Glazing", image: glassWindow },
  { id: 18, name: "Aluminium Windows", image: secWindow },
  { id: 19, name: "Plumbing & Pipes", image: null },
  { id: 20, name: "Roofing Materials", image: null },
];




// Har category card /materials/[category] par jaye
const toSlug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const categoryLinks = categories.map((c) => ({
  ...c,
  href: `/materials/${toSlug(c.name)}`,
}));







// Reused Materials: cards click par reused listing page par jate hain
const reusedCategories = [
  { id: 1, name: "Used Bricks", image: usedBricks, href: "/reused-materials?category=used-bricks" },
  { id: 2, name: "Reused Steel", image: steelWelding, href: "/reused-materials?category=reused-steel" },
  { id: 3, name: "Leftover Cement", image: null, href: "/reused-materials?category=leftover-cement" },
  { id: 4, name: "Used Tiles", image: architectural, href: "/reused-materials?category=used-tiles" },
  { id: 5, name: "Reusable Wood", image: interiorDesign, href: "/reused-materials?category=reusable-wood" },
  { id: 6, name: "Used Doors & Windows", image: doorsWindows, href: "/reused-materials?category=used-doors-windows" },
  { id: 7, name: "Used Furniture", image: null, href: "/reused-materials?category=used-furniture" },
  { id: 8, name: "Reusable Construction Equipment", image: null, href: "/reused-materials?category=reusable-equipment" },
  { id: 9, name: "Leftover Sand", image: sandImage, href: "/reused-materials?category=leftover-sand" },
  { id: 10, name: "Used Glass Windows", image: glassWindow, href: "/reused-materials?category=used-glass-windows" },
  { id: 11, name: "Used Aluminium Windows", image: secWindow, href: "/reused-materials?category=used-aluminium-windows" },
  { id: 12, name: "Used Grills & Gates", image: metalAluminum, href: "/reused-materials?category=used-grills-gates" },
  { id: 13, name: "Leftover Paint", image: paintsFinishes, href: "/reused-materials?category=leftover-paint" },
  { id: 14, name: "Used Electrical Wire", image: electrical, href: "/reused-materials?category=used-electrical-wire" },
  { id: 15, name: "Used Pipes", image: null, href: "/reused-materials?category=used-pipes" },
  { id: 16, name: "Used Sanitary Items", image: null, href: "/reused-materials?category=used-sanitary-items" },
  { id: 17, name: "Used Ceiling Panels", image: interiorDesign, href: "/reused-materials?category=used-ceiling-panels" },
  { id: 18, name: "Used Scaffolding", image: null, href: "/reused-materials?category=used-scaffolding" },
  { id: 19, name: "Used Roofing Sheets", image: null, href: "/reused-materials?category=used-roofing-sheets" },
  { id: 20, name: "Used Marble & Stone", image: architectural, href: "/reused-materials?category=used-marble-stone" },
];





// Reused cards bhi /materials/[category] par jaye
const reusedLinks = reusedCategories.map((c) => ({ ...c, href: `/materials/${toSlug(c.name)}` }));





// Featured Products (demo data: naam, price, supplier sirf UI ke liye hain)
const featuredProducts = [
  { id: 1, name: "Red Clay Bricks (A-Class)", price: "From Rs 16,500", category: "Bricks & Blocks", location: "Gujranwala", supplier: "Al-Noor Building Store", image: usedBricks },
  { id: 2, name: "Ravi Sand (Rait)", price: "From Rs 9,000", category: "Sand & Crush", location: "Model Town", supplier: "City Material Traders", image: sandImage },
  { id: 3, name: "Steel Saria Grade 60", price: "From Rs 265", category: "Steel & Welding", location: "GT Road", supplier: "Zahid Construction", image: steelWelding },
  { id: 4, name: "Porcelain Floor Tiles", price: "Contact for price", category: "Architectural Products", location: "Satellite Town", supplier: "Punjab Building Materials", image: architectural },
  { id: 5, name: "Gold Emulsion Paint", price: "From Rs 7,800", category: "Paints & Finishes", location: "Peoples Colony", supplier: "Modern Builders Mart", image: paintsFinishes },
  { id: 6, name: "Aluminium Sliding Window", price: "Contact for price", category: "Doors & Windows", location: "GT Road", supplier: "Rehman Builders Supply", image: secWindow },
  { id: 7, name: "Tempered Glass Window", price: "From Rs 450", category: "Glass & Glazing", location: "Model Town", supplier: "Ali & Sons Traders", image: glassWindow },
  { id: 8, name: "Copper Electrical Wire", price: "From Rs 3,200", category: "Electrical & Lighting", location: "Satellite Town", supplier: "Rana Construction Supply", image: electrical },
  { id: 9, name: "False Ceiling Panels", price: "Contact for price", category: "Interior Design", location: "Gujranwala", supplier: "Al-Noor Building Store", image: interiorDesign },
  { id: 10, name: "Wooden Door (Deodar)", price: "From Rs 18,000", category: "Doors & Windows", location: "Peoples Colony", supplier: "City Material Traders", image: doorsWindows },
  { id: 11, name: "Steel Grills & Gates", price: "Contact for price", category: "Metal & Aluminum Works", location: "GT Road", supplier: "Zahid Construction", image: metalAluminum },
  { id: 12, name: "Wall Tiles (Glossy)", price: "From Rs 95", category: "Architectural Products", location: "Model Town", supplier: "Punjab Building Materials", image: architectural },
  { id: 13, name: "Weather Shield Paint", price: "From Rs 9,500", category: "Paints & Finishes", location: "Satellite Town", supplier: "Modern Builders Mart", image: paintsFinishes },
  { id: 14, name: "Chenab Sand", price: "From Rs 8,500", category: "Sand & Crush", location: "Gujranwala", supplier: "Rehman Builders Supply", image: sandImage },
];

// Har featured card /materials/[category]/[productSlug] par jaye
const featuredLinks = featuredProducts.map((p) => ({
  ...p,
  slug: toSlug(p.name),
  categorySlug: toSlug(p.category),
}));

// All Products / New Materials grid (demo data). image null = "No image", baad mein import kar ke laga dein
const allProducts = [
  { id: 1, name: "Cement 50kg", price: "Rs. 1,200 / Bag", badge: "New", image: null },
  { id: 2, name: "Steel Bars 16mm", price: "Rs. 320 / kg", badge: "New", image: steelWelding },
  { id: 3, name: "Bricks (Clay)", price: "Rs. 18 / Piece", badge: "Reused", image: usedBricks },
  { id: 4, name: "Sand", price: "Rs. 5,000 / Ton", badge: "New", image: sandImage },
  { id: 5, name: "Crushed Stone", price: "Rs. 4,500 / Ton", badge: "New", image: null },
  { id: 6, name: "Tiles 12x12", price: "Rs. 95 / Sq.Ft", badge: "New", image: architectural },
  { id: 7, name: "Marble Slab", price: "Rs. 1,800 / Sq.Ft", badge: "New", image: null },
  { id: 8, name: "Paint (20L)", price: "Rs. 6,500 / Bucket", badge: "New", image: paintsFinishes },
  { id: 9, name: "PVC Pipes", price: "Rs. 250 / Piece", badge: "New", image: null },
  { id: 10, name: "Cement Blocks", price: "Rs. 65 / Piece", badge: "New", image: null },
];

// Grid ke filters (search ke saath)
const productFilters = [
  { id: 1, label: "Category", options: ["All Categories", "Cement", "Steel", "Bricks", "Sand", "Tiles", "Paint", "Pipes"] },
  { id: 2, label: "Type", options: ["New", "Reused"] },
  { id: 3, label: "Stock", options: ["In Stock", "Out of Stock"] },
  { id: 4, label: "Sort by", options: ["Sort by: Latest", "Price: Low to High", "Price: High to Low"] },
];

const productPages = [1, 2, 3];

// Top Rated Suppliers (demo data: naam aur type sirf UI ke liye hain)
const topSuppliers = [
  { id: 1, name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "GT Road, Gujranwala" },
  { id: 2, name: "Zahid Construction Materials", type: "Distributor", services: "Cement | Steel | Marble", city: "Peoples Colony, Gujranwala" },
  { id: 3, name: "City Material Traders", type: "Manufacturer", services: "Steel | Bricks | Sand", city: "Satellite Town, Gujranwala" },
  { id: 4, name: "Punjab Building Materials", type: "Distributor", services: "Cement | Paints | Pipes", city: "GT Road, Gujranwala" },
  { id: 5, name: "Modern Builders Mart", type: "Retailer", services: "Tiles | Sand | Steel", city: "Satellite Town, Gujranwala" },
  { id: 6, name: "Rehman Builders Supply", type: "Manufacturer", services: "Paints | Pipes | Cement", city: "Model Town, Gujranwala" },
  { id: 7, name: "Ali & Sons Traders", type: "Retailer", services: "Bricks | Tiles | Pipes", city: "Model Town, Gujranwala" },
];

// Why Choose BuildMart (4 cards)
const whyItems = [
  { id: 1, icon: ShieldCheck, title: "Verified Suppliers", text: "Connect with verified local suppliers." },
  { id: 2, icon: Scale, title: "Price Comparison", text: "Compare prices from different shops." },
  { id: 3, icon: Recycle, title: "Reused Materials", text: "Discover reusable construction materials." },
  { id: 4, icon: MapPin, title: "Gujranwala Local Marketplace", text: "Find construction materials in Gujranwala." },
];

// FAQ (demo answers)
const faqs = [
  {
    id: 1,
    q: "How can I compare material prices?",
    a: "You can compare listed prices by browsing different suppliers on BuildMart. Use the search and filter options to find the best deals in Gujranwala.",
  },
  {
    id: 2,
    q: "How can I contact a supplier?",
    a: "Open any product or supplier listing and use the Contact button to send an inquiry to the shop.",
  },
  {
    id: 3,
    q: "Is the listed price updated in real time?",
    a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying.",
  },
  {
    id: 4,
    q: "What is the quality of reused materials?",
    a: "Reused materials are listed by sellers with a condition label such as Good condition or Like new. Please inspect the material before you buy.",
  },
  {
    id: 5,
    q: "How can I buy construction materials?",
    a: "Find the material you need, compare suppliers, then contact the shop to confirm price, quantity and payment.",
  },
  {
    id: 6,
    q: "Does BuildMart offer delivery service?",
    a: "Delivery depends on the supplier. Each supplier page shows its delivery information, so please confirm it with the shop.",
  },
];

// Banner ki images (pehle se maujood files)
const bannerImages = [
  { id: 1, image: architectural, alt: "Marble and tiles (demo image)" },
  { id: 2, image: secWindow, alt: "Aluminium window (demo image)" },
  { id: 3, image: steelWelding, alt: "Steel bars (demo image)" },
];

// Slider mein ek screen par kitne columns: categories 7, featured products 5 (har jagah 2 rows)
const categoryCols =
  "auto-cols-[calc((100%-0.75rem)/2)] sm:auto-cols-[calc((100%-1.5rem)/3)] md:auto-cols-[calc((100%-3rem)/5)] lg:auto-cols-[calc((100%-4.5rem)/7)]";
const productCols =
  "auto-cols-[calc((100%-0.75rem)/2)] sm:auto-cols-[calc((100%-1.5rem)/3)] lg:auto-cols-[calc((100%-3rem)/5)]";

// Click (focus) par border black hoti hai
const field =
  "h-12 w-full rounded-lg border border-[#E2E4E7] bg-white text-sm text-[#202124] outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black";

// Chhota filter box (All Products grid ke liye)
const smallField =
  "h-9 w-full appearance-none rounded-lg border border-[#E2E4E7] bg-white pl-3 pr-8 text-xs text-[#202124] outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black";

// Arrow button ka style (disabled par halka)
const arrowClass =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E4E7] bg-white text-[#202124] shadow transition-colors enabled:cursor-pointer enabled:hover:border-[#ffc61a] enabled:hover:bg-[#ffc61a] disabled:cursor-not-allowed disabled:opacity-30";

// Top Rated ke gol arrows
const roundArrow =
  "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E2E4E7] bg-white text-[#202124] shadow transition-colors hover:border-[#ffc61a] hover:bg-[#ffc61a]";

// Yellow button (Explore, Submit, Contact aur View Details sab)
const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#ffc61a] bg-[#ffc61a] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#202124] hover:text-[#ffc61a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60";

// Pagination button
const pageBtn =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60";

const GAP = 12; // gap-3 yaani 12px

/* ============================================================
   1. HERO
   ============================================================ */

const Hero = () => (
  <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#202124] to-[#45484D] px-4 py-16 text-white sm:px-6 md:min-h-[520px]">
    <div className="absolute inset-0 bg-[#202124]/60" />

    <div className="relative flex w-full max-w-4xl flex-col items-center text-center">
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
        Find Quality Construction Materials from Trusted Suppliers
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[#E2E4E7] sm:text-base">
        Compare materials, prices and shops across Gujranwala in one place.
      </p>

      <div
        role="search"
        className="mt-8 flex w-full flex-col gap-2 rounded-xl bg-white/85 p-2 shadow-xl backdrop-blur md:flex-row"
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search materials"
            placeholder="Search cement, steel, bricks..."
            className={`${field} pl-11 pr-14`}
          />
          <button
            type="button"
            aria-label="Search"
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md bg-[#ffc61a] text-[#202124] transition-colors hover:bg-[#202124] hover:text-[#ffc61a]"
          >
            <Search size={18} />
          </button>
        </div>

        {filters.map(({ id, label, icon: FilterIcon, options }) => (
          <label key={id} className="relative md:w-52">
            <FilterIcon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
            <select aria-label={label} className={`${field} pl-9 pr-2`}>
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   2. SLIDER (categories, reused aur featured sections isi se): 2 rows, arrows se agle cards
   ============================================================ */

const Slider = ({ items, Card, cols, label }) => {
  const sliderRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false); // shuru mein left arrow band
  const [canRight, setCanRight] = useState(true);

  // Scroll position dekh kar arrows enable/disable karo
  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  // Ek poori screen aage (1) ya peeche (-1) smooth scroll
  const handleSlide = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth + GAP), behavior: "smooth" });
  };

  return (
    <div className="relative mt-8 px-11">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        disabled={!canLeft}
        onClick={() => handleSlide(-1)}
        className={`${arrowClass} left-0`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        disabled={!canRight}
        onClick={() => handleSlide(1)}
        className={`${arrowClass} right-0`}
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={sliderRef}
        onScroll={updateArrows}
        className={`grid snap-x snap-mandatory grid-flow-col grid-rows-2 ${cols} gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {items.map((item) => (
          <div key={item.id} className="snap-start [&>*]:h-full [&>*]:w-full">
            <MaterialCategoryCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   3. ALL CATEGORIES / REUSED MATERIALS
   ============================================================ */

const CategorySection = ({ title, placeholder, items, label, exploreText, exploreHref, withBorder }) => {
  const exploreClass = `${yellowBtn} h-11 rounded-lg px-8`;

  return (
    <section className={`bg-[#F4F4F2] px-4 py-12 sm:px-6 ${withBorder ? "border-t border-[#E2E4E7]" : ""}`}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">{title}</h2>

        {/* Search */}
        <div className="relative mx-auto mt-5 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            type="text"
            aria-label={placeholder}
            placeholder={placeholder}
            className="h-11 w-full rounded-full border-2 border-[#202124] bg-white pl-11 pr-4 text-sm text-[#202124] outline-none placeholder:text-[#A7ADB4] focus:ring-1 focus:ring-[#202124]"
          />
        </div>

        <Slider items={items} cols={categoryCols} label={label} />

        {/* Explore */}
        <div className="mt-8 text-center">
          {exploreHref ? (
            <Link href={exploreHref} className={exploreClass}>
              {exploreText}
            </Link>
          ) : (
            <button type="button" className={exploreClass}>
              {exploreText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   4. REQUEST BANNER
   ============================================================ */

const RequestBanner = () => (
  <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
    <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-3xl border-2 border-[#ffc61a] bg-white p-6 sm:p-10 md:flex-row md:justify-between">
      {/* Corner decoration */}
      <span
        aria-hidden="true"
        className="absolute -left-8 -top-8 h-16 w-16 rotate-45 bg-[linear-gradient(90deg,#202124_50%,#ffc61a_50%)]"
      />

      {/* Text */}
      <div className="relative w-full md:max-w-md">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#202124] px-4 py-1.5 text-sm font-bold text-white">
          <Sparkles size={16} className="fill-[#ffc61a] text-[#ffc61a]" aria-hidden="true" />
          NEW
        </span>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#202124] sm:text-4xl">
          Don’t Search. <span className="text-[#ffc61a]">Just Ask!</span>
        </h2>
        <p className="mt-3 text-sm text-[#45484D] sm:text-base">
          Tell us what you need, and we’ll help you find the right products and vendors for your project.
        </p>

        <button type="button" className={`${yellowBtn} mt-6 h-12 gap-3 rounded-full px-6`}>
          Submit Your Request
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Images */}
      <div className="relative grid w-full grid-cols-3 gap-3 md:w-1/2">
        {bannerImages.map(({ id, image, alt }) => (
          <div key={id} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#E2E4E7] bg-[#E2E4E7] shadow-sm">
            <Image src={image} alt={alt} fill sizes="(min-width: 768px) 15vw, 30vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   5. FEATURED PRODUCTS (card sirf is page ka, hover effect nahi)
   ============================================================ */

const FeaturedCard = ({ name, slug, categorySlug, price, category, location, supplier, image }) => (
  <article className="flex flex-col rounded-xl border border-[#E2E4E7] bg-white p-1.5 text-[#202124] shadow-sm">
    <Link href={`/materials/${categorySlug}/${slug}`} className="block">
      <div className="relative h-28 overflow-hidden rounded-lg bg-[#E2E4E7] sm:h-32">
        <Image
          src={image}
          alt={`${name} (demo image)`}
          fill
          sizes="(min-width: 1024px) 160px, 45vw"
          className="object-cover"
        />
      </div>
    </Link>

    <div className="flex flex-1 flex-col gap-1 p-2">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/materials/${categorySlug}/${slug}`} className="min-w-0">
          <h3 className="line-clamp-1 text-xs font-semibold hover:underline">{name}</h3>
        </Link>
        <Heart size={14} className="shrink-0 text-[#A7ADB4]" aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold text-[#45484D]">{price}</p>
      <p className="line-clamp-1 text-[11px] font-medium text-[#45484D]">{category}</p>
      <p className="flex items-center gap-1 text-[11px] text-[#45484D]">
        <MapPin size={11} className="shrink-0" aria-hidden="true" />
        <span className="line-clamp-1">{location}</span>
      </p>
      <p className="flex items-center gap-1.5 text-[11px] text-[#45484D]">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#202124] text-[9px] font-bold text-white">
          {supplier[0]}
        </span>
        <span className="line-clamp-1">{supplier}</span>
      </p>

      <button type="button" className={`${yellowBtn} mt-2 h-8 gap-1.5 rounded-md text-xs`}>
        <Phone size={12} aria-hidden="true" />
        Contact
      </button>
    </div>
  </article>
);

const FeaturedProducts = () => (
  <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">Featured Products</h2>
      <p className="mt-2 text-center text-xs text-[#45484D]">
        Sample products, prices and suppliers shown for demonstration purposes.
      </p>

      <Slider items={featuredLinks} Card={FeaturedCard} cols={productCols} label="featured products" />
    </div>
  </section>
);

/* ============================================================
   6. ALL PRODUCTS / NEW MATERIALS (grid + filters + pagination)
   ============================================================ */

const ProductCard = ({ name, price, badge, image }) => (
  <article className="flex flex-col rounded-xl border border-[#E2E4E7] bg-white p-1.5 text-[#202124] shadow-sm">
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#E2E4E7]">
      {image ? (
        <Image
          src={image}
          alt={`${name} (demo image)`}
          fill
          sizes="(min-width: 1024px) 160px, (min-width: 640px) 30vw, 45vw"
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-[#45484D]">No image</span>
      )}
      <span className="absolute left-1.5 top-1.5 rounded-md bg-[#ffc61a] px-2 py-0.5 text-[10px] font-bold text-[#202124]">
        {badge}
      </span>
    </div>

    <div className="flex flex-1 flex-col gap-1 p-2">
      <h3 className="line-clamp-1 text-xs font-semibold">{name}</h3>
      <p className="text-xs font-bold text-[#202124]">{price}</p>
      <p className="flex items-center gap-1.5 text-[11px] text-[#45484D]">
        <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden="true" />
        In Stock
      </p>

      <button type="button" className={`${yellowBtn} mt-2 h-8 rounded-md text-xs`}>
        View Details
      </button>
    </div>
  </article>
);

const AllProducts = () => (
  <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
    <div className="mx-auto max-w-5xl rounded-2xl border border-[#E2E4E7] bg-white p-4 shadow-sm sm:p-6">
      {/* Heading + filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffc61a] text-[#202124]">
            <Package size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-[#202124] sm:text-xl">All Products / New Materials</h2>
            <p className="text-xs text-[#45484D]">Browse our complete range of construction materials</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:items-center">
          <div className="relative col-span-2 sm:col-span-3 lg:w-40">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
            <input
              type="text"
              aria-label="Search products"
              placeholder="Search products..."
              className={`${smallField} pl-9`}
            />
          </div>

          {productFilters.map(({ id, label, options }) => (
            <div key={id} className="relative lg:w-32">
              <select aria-label={label} className={smallField}>
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {allProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Products pagination" className="mt-6 flex items-center justify-center gap-2">
        <button type="button" aria-label="Previous page" className={`${pageBtn} border-[#E2E4E7] bg-white text-[#202124] hover:bg-[#F4F4F2]`}>
          <ChevronLeft size={14} aria-hidden="true" />
        </button>
        {productPages.map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === 1 ? "page" : undefined}
            className={`${pageBtn} ${
              n === 1
                ? "border-[#ffc61a] bg-[#ffc61a] text-[#202124]"
                : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#F4F4F2]"
            }`}
          >
            {n}
          </button>
        ))}
        <button type="button" aria-label="Next page" className={`${pageBtn} border-[#E2E4E7] bg-white text-[#202124] hover:bg-[#F4F4F2]`}>
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </nav>

      <p className="mt-4 text-center text-xs text-[#45484D]">
        Sample products, prices and stock status shown for demonstration purposes.
      </p>
    </div>
  </section>
);

/* ============================================================
   7. TOP RATED SUPPLIERS (beech wala card bara, arrows se agla)
   ============================================================ */

const TopRated = () => {
  const [active, setActive] = useState(0); // beech mein kaun sa card hai
  const total = topSuppliers.length;
  const half = Math.floor(total / 2);

  const handlePrev = () => setActive((a) => (a - 1 + total) % total);
  const handleNext = () => setActive((a) => (a + 1) % total);

  return (
    <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">Top Rated Suppliers</h2>
        <p className="mt-2 text-center text-xs text-[#45484D]">
          Sample suppliers shown for demonstration purposes.
        </p>

        {/* --step: cards ke beech ka fasla (mobile par kam, bade screen par zyada) */}
        <div className="relative mt-8 h-[22rem] overflow-hidden [--step:13rem] md:[--step:17rem]">
          {topSuppliers.map(({ id, name, type, services, city }, i) => {
            const offset = ((i - active + total + half) % total) - half; // 0 = beech wala
            const isActive = offset === 0;
            const far = Math.abs(offset) > 1;

            return (
              <article
                key={id}
                onClick={() => setActive(i)}
                style={{
                  transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
                  opacity: isActive ? 1 : far ? 0 : 0.55,
                  zIndex: 10 - Math.abs(offset),
                  pointerEvents: far ? "none" : "auto",
                }}
                className={`absolute left-1/2 top-1/2 w-60 rounded-2xl border-2 bg-white p-5 text-center transition-all duration-500 ease-in-out sm:w-64 ${
                  isActive ? "border-[#ffc61a] shadow-xl" : "cursor-pointer border-[#E2E4E7]"
                }`}
              >
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl border border-[#E2E4E7] bg-[#F4F4F2] text-3xl font-bold text-[#202124]">
                  {name[0]}
                </span>

                <h3 className="mt-3 truncate text-base font-bold text-[#202124]">{name}</h3>

                <span className="mt-2 inline-block rounded bg-[#F4F4F2] px-3 py-1 text-xs text-[#45484D]">{type}</span>

                <p className="mt-3 line-clamp-2 min-h-10 text-xs text-[#45484D]">{services}</p>

                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-[#45484D]">
                  <MapPin size={13} className="shrink-0" aria-hidden="true" />
                  <span className="truncate">{city}</span>
                </p>

                <div className="mt-4 flex gap-2">
                  <button type="button" tabIndex={isActive ? 0 : -1} className={`${yellowBtn} h-9 flex-1 rounded-lg text-xs`}>
                    Contact
                  </button>
                  <button
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#202124] bg-white text-xs font-semibold text-[#202124] transition-colors hover:bg-[#ffc61a]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60"
                  >
                    View shop
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}

          <button type="button" aria-label="Previous supplier" onClick={handlePrev} className={`${roundArrow} left-1 md:left-4`}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Next supplier" onClick={handleNext} className={`${roundArrow} right-1 md:right-4`}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   8. WHY CHOOSE BUILDMART
   ============================================================ */

const WhyChoose = () => (
  <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
    <div className="mx-auto grid max-w-5xl gap-6 rounded-3xl border border-[#E2E4E7] bg-white/60 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
      {/* Text */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#202124] px-4 py-1.5 text-sm font-bold text-white">
          <ShieldCheck size={16} className="fill-[#ffc61a] text-[#202124]" aria-hidden="true" />
          Why Choose BuildMart?
        </span>

        <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#202124] sm:text-4xl">
          Why Choose <span className="text-[#ffc61a]">BuildMart</span>?
        </h2>
        <p className="mt-3 text-sm text-[#45484D] sm:text-base">
          Find construction materials, compare prices and connect with local suppliers — all in one place.
        </p>

        <button type="button" className={`${yellowBtn} mt-6 h-12 gap-3 rounded-full px-6`}>
          Explore Materials
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* 4 cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {whyItems.map(({ id, icon: WhyIcon, title, text }) => (
          <article key={id} className="rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffc61a] text-[#202124]">
              <WhyIcon size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-3 text-base font-bold text-[#202124]">{title}</h3>
            <p className="mt-1 text-sm text-[#45484D]">{text}</p>
          </article>
        ))}
      </div>

      <p className="text-center text-xs text-[#45484D] lg:col-span-2">
        Sample content shown for demonstration purposes.
      </p>
    </div>
  </section>
);

/* ============================================================
   9. FAQ (accordion, browser ke details se chalta hai)
   ============================================================ */

const Faq = () => (
  <section className="bg-[#F4F4F2] px-4 pb-16 sm:px-6">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">FAQ</h2>

      <div className="mt-8 space-y-3">
        {faqs.map(({ id, q, a }) => (
          <details
            key={id}
            open={id === 1}
            className="group rounded-xl border border-[#E2E4E7] bg-white shadow-sm transition-colors open:border-[#ffc61a]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-[#202124] sm:text-base [&::-webkit-details-marker]:hidden">
              {q}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-open:rotate-180 group-open:bg-[#ffc61a]">
                <ChevronDown size={18} aria-hidden="true" />
              </span>
            </summary>
            <p className="px-5 pb-4 text-sm leading-6 text-[#45484D]">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   PAGE
   ============================================================ */

const MaterialsPage = () => (
  <main>
    <Hero />

    {/* <CategorySection
      title="All Categories"
      placeholder="Search categories..."
      items={categories}
      label="categories"
      exploreText="Explore All Categories"
    /> */}



    <CategorySection
  title="All Categories"
  placeholder="Search categories..."
  items={categoryLinks}
  label="categories"
  exploreText="Explore All Categories"
/>

    <CategorySection
      title="Reused Materials"
      placeholder="Search reused materials..."
      items={reusedLinks}
      label="reused materials"
      exploreText="Explore All Reused Materials"
      exploreHref="/reused-materials"
      withBorder
    />

    <RequestBanner />

    <FeaturedProducts />

    <AllProducts />

    <TopRated />

    <WhyChoose />

    <Faq />
  </main>
);

export default MaterialsPage;