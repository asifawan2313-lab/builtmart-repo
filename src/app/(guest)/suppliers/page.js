//(guest)/suppliers/page.js
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BmPageHero from "../../../component/shared/pageHero/BmPageHero";
import BmSupplierCard from "../../../component/shared/supplierCard/BmSupplierCard";
import shop1 from "../../../assets/images/supplier/shops/shop-1.jpg";
import shop2 from "../../../assets/images/supplier/shops/shop-2.jpg";
import shop3 from "../../../assets/images/supplier/shops/shop-3.jpg";
import shop4 from "../../../assets/images/supplier/shops/shop-4.jpg";
import shop5 from "../../../assets/images/supplier/shops/shop-5.jpg";
import shop6 from "../../../assets/images/supplier/shops/shop-6.jpg";
import shop7 from "../../../assets/images/supplier/shops/shop-7.jpg";
import shop8 from "../../../assets/images/supplier/shops/shop-8.jpg";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_SUPPLIER_TABS = [
  { key: "all", label: "All Suppliers" },
  // { key: "verified", label: "Verified" },
  // { key: "unverified", label: "Unverified" },
  { key: "top-rated", label: "Top Rated" },
];

const BM_SUPPLIER_CATEGORIES = ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints", "Pipes", "Marble"];

// Gujranwala ke areas
const BM_SUPPLIER_LOCATIONS = [
  "GT Road",
  "Satellite Town",
  "Peoples Colony",
  "Model Town",
  "Rahwali",
  "Wapda Town",
  "Civil Lines",
  "Garden Town",
];

// is_verified: true/false (card par ternary se Verified / Unverified dikhta hai)
// 8 shop images hain, is liye 9 se aage ke suppliers mein dobara use hui hain
const BM_SUPPLIERS = [
  { id: 1, name: "Al-Noor Building Store", slug: "al-noor-building-store", image: shop1, location: "GT Road", rating: 4.5, reviews: 98, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"] },
  { id: 2, name: "City Material Traders", slug: "city-material-traders", image: shop2, location: "Satellite Town", rating: 4.5, reviews: 86, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Sand"] },
  { id: 3, name: "Rehman Builders Supply", slug: "rehman-builders-supply", image: shop3, location: "Model Town", rating: 4.4, reviews: 64, is_verified: false, categories: ["Cement", "Steel", "Paints", "Pipes"] },
  { id: 4, name: "Zahid Construction Materials", slug: "zahid-construction-materials", image: shop4, location: "Peoples Colony", rating: 4.6, reviews: 112, is_verified: true, categories: ["Cement", "Steel", "Tiles", "Marble"] },
  { id: 5, name: "Punjab Building Materials", slug: "punjab-building-materials", image: shop5, location: "GT Road", rating: 4.4, reviews: 76, is_verified: true, categories: ["Cement", "Bricks", "Paints", "Pipes"] },
  { id: 6, name: "Modern Builders Mart", slug: "modern-builders-mart", image: shop6, location: "Satellite Town", rating: 4.8, reviews: 134, is_verified: true, categories: ["Cement", "Steel", "Sand", "Tiles"] },
  { id: 7, name: "Ali & Sons Traders", slug: "ali-sons-traders", image: shop7, location: "Model Town", rating: 4.2, reviews: 54, is_verified: false, categories: ["Bricks", "Tiles", "Paints", "Pipes"] },
  { id: 8, name: "Rana Construction Supply", slug: "rana-construction-supply", image: shop8, location: "Peoples Colony", rating: 4.7, reviews: 89, is_verified: true, categories: ["Cement", "Bricks", "Sand", "Steel"] },
  { id: 9, name: "Gujranwala Tiles House", slug: "gujranwala-tiles-house", image: shop1, location: "Rahwali", rating: 4.9, reviews: 141, is_verified: true, categories: ["Tiles", "Marble", "Paints"] },
  { id: 10, name: "Al-Rehman Depot", slug: "al-rehman-depot", image: shop2, location: "Civil Lines", rating: 4.3, reviews: 61, is_verified: false, categories: ["Cement", "Steel"] },
  { id: 11, name: "Bilal Traders", slug: "bilal-traders", image: shop3, location: "Wapda Town", rating: 4.1, reviews: 38, is_verified: false, categories: ["Bricks", "Sand"] },
  { id: 12, name: "Chenab Steel Works", slug: "chenab-steel-works", image: shop4, location: "GT Road", rating: 4.8, reviews: 120, is_verified: true, categories: ["Steel", "Pipes"] },
  { id: 13, name: "Wapda Town Hardware", slug: "wapda-town-hardware", image: shop5, location: "Wapda Town", rating: 4.0, reviews: 45, is_verified: false, categories: ["Paints", "Pipes", "Tiles"] },
  { id: 14, name: "Garden Town Paint Mart", slug: "garden-town-paint-mart", image: shop6, location: "Garden Town", rating: 4.6, reviews: 72, is_verified: true, categories: ["Paints", "Tiles"] },
  { id: 15, name: "Civil Lines Sanitary Store", slug: "civil-lines-sanitary-store", image: shop7, location: "Civil Lines", rating: 4.4, reviews: 58, is_verified: true, categories: ["Pipes", "Tiles", "Marble"] },
  { id: 16, name: "Madina Marble House", slug: "madina-marble-house", image: shop8, location: "Rahwali", rating: 4.7, reviews: 93, is_verified: true, categories: ["Marble", "Tiles"] },
  { id: 17, name: "Iqbal Brick Kiln", slug: "iqbal-brick-kiln", image: shop1, location: "Peoples Colony", rating: 3.9, reviews: 31, is_verified: false, categories: ["Bricks", "Sand"] },
  { id: 18, name: "Star Pipes & Fittings", slug: "star-pipes-fittings", image: shop2, location: "Model Town", rating: 4.5, reviews: 67, is_verified: true, categories: ["Pipes", "Steel"] },
  { id: 19, name: "Noor Sand & Crush", slug: "noor-sand-crush", image: shop3, location: "Satellite Town", rating: 4.2, reviews: 49, is_verified: false, categories: ["Sand", "Bricks", "Cement"] },
  { id: 20, name: "Garden Cement Point", slug: "garden-cement-point", image: shop4, location: "Garden Town", rating: 4.3, reviews: 52, is_verified: true, categories: ["Cement", "Steel", "Sand"] },
];

const PAGE_SIZE = 8; // ek page par suppliers
const SLIDE_WIDTH = 260; // carousel ke ek card ki width (px)

// Top Rated: rating 4.7 ya us se zyada
const BM_TOP_RATING = 4.7;

// Top Rated carousel ke suppliers (filters/pagination se alag)
const BM_TOP_SUPPLIERS = BM_SUPPLIERS.filter(
  (supplier) => supplier.rating >= BM_TOP_RATING
);

const selectClass =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-xs text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] sm:w-48";
const pageButton =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)] disabled:cursor-not-allowed disabled:opacity-50";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [tab, setTab] = useState("all");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0); // carousel ka center supplier

  // Tab (All / Verified / Unverified / Top Rated) + category + location filter
  const filteredSuppliers = BM_SUPPLIERS.filter(
    (supplier) =>
      (tab === "all" ||
        (tab === "verified" && supplier.is_verified) ||
        (tab === "unverified" && !supplier.is_verified) ||
        (tab === "top-rated" && supplier.rating >= BM_TOP_RATING)) &&
      (category === "all" || supplier.categories.includes(category)) &&
      (location === "all" || supplier.location === location)
  );

  // Pagination (sirf All Suppliers listing ke liye)
  const totalPages = Math.ceil(filteredSuppliers.length / PAGE_SIZE);
  const pageSuppliers = filteredSuppliers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Filter badalne par page 1 par wapas
  const handleTabChange = (key) => {
    setTab(key);
    setPage(1);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setPage(1);
  };

  // Carousel: har 3 second baad agla supplier center mein
  const handlePrev = () =>
    setActive((active - 1 + BM_TOP_SUPPLIERS.length) % BM_TOP_SUPPLIERS.length);
  const handleNext = () => setActive((active + 1) % BM_TOP_SUPPLIERS.length);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((active + 1) % BM_TOP_SUPPLIERS.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <main className="min-h-screen bg-[var(--off-white-background)]">
      <BmPageHero
        title=" Top Suppliers"
        subtitle="Discover reliable construction material suppliers in Gujranwala."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {BM_SUPPLIER_TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleTabChange(item.key)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                tab === item.key
                  ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
                  : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <select
            value={category}
            onChange={handleCategoryChange}
            aria-label="Filter by category"
            className={selectClass}
          >
            <option value="all">All Categories</option>
            {BM_SUPPLIER_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={handleLocationChange}
            aria-label="Filter by location"
            className={selectClass}
          >
            <option value="all">All Locations</option>
            {BM_SUPPLIER_LOCATIONS.map((item) => (
              <option key={item} value={item}>
                {item}, Gujranwala
              </option>
            ))}
          </select>
        </div>

        {/* SUPPLIER CARDS */}
        {pageSuppliers.length === 0 ? (
          <p className="mt-10 text-center text-sm text-[color:var(--secondary-text)]">
            No suppliers found.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageSuppliers.map((supplier) => (
              <BmSupplierCard
                key={supplier.id}
                name={supplier.name}
                slug={supplier.slug}
                image={supplier.image}
                location={supplier.location}
                rating={supplier.rating}
                reviews={supplier.reviews}
                is_verified={supplier.is_verified}
                categories={supplier.categories}
              />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={pageButton}
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                className={
                  page === number
                    ? "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
                    : pageButton
                }
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={pageButton}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* TOP RATED SUPPLIERS (automatic centered carousel) */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-center text-xl font-bold text-[color:var(--primary-text)]">
            Top Rated Suppliers
          </h2>

          <div className="relative mt-6 overflow-hidden py-6">
            {/* marginLeft 50% + translateX se active card hamesha center mein aata hai */}
            <div
              className="flex w-max transition-transform duration-700 ease-in-out"
              style={{
                marginLeft: "50%",
                transform: `translateX(-${active * SLIDE_WIDTH + SLIDE_WIDTH / 2}px)`,
              }}
            >
              {BM_TOP_SUPPLIERS.map((supplier, index) => (
                <div
                  key={supplier.id}
                  style={{ width: SLIDE_WIDTH }}
                  className={`flex-none px-2 transition-all duration-700 ${
                    index === active
                      ? "scale-105 opacity-100 drop-shadow-lg"
                      : "scale-90 opacity-50"
                  }`}
                >
                  <BmSupplierCard
                    name={supplier.name}
                    slug={supplier.slug}
                    image={supplier.image}
                    location={supplier.location}
                    rating={supplier.rating}
                    reviews={supplier.reviews}
                    is_verified={supplier.is_verified}
                    categories={supplier.categories}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous supplier"
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)] sm:left-4"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next supplier"
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)] sm:right-4"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;