"use client";

import React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";

import grey from "../../assets/image/guest/hero/grey.jpeg";
import exterior from "../../assets/image/guest/hero/exterior.jpeg";
import interior from "../../assets/image/guest/hero/interior.jpeg";

// import BmHero from '../../component/guest/Bmhero/Bmhero.js';
import BmCategories from "../../component/guest/cards/Bmcategorycards.js";
import NewMaterials from "./(home)/newmaterials.js";
import ReusedMaterials from "./(home)/reusedmaterials.js";
import Banner from "./(home)/banner.js";
import AiAssistant from "./(home)/Aiassistant.js";
import TopSuppliers from "./(home)/topsupplier.js";
import Faqquestion from "./(home)/frequestion.js";
import CustomerReviews from "./(home)/customerreview.js";

const BM_HERO_SLIDES = [
  { id: 1, image: grey, alt: "Construction materials yard" },
  { id: 2, image: exterior, alt: "House exterior" },
  { id: 3, image: interior, alt: "House interior" },
];

// Search bar ke dropdowns ka simple data (har item ka unique id)
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
  // Abhi kaun si image dikh rahi hai
  const [current, setCurrent] = useState(0);

  // 2) Har 5 second baad image khud badal jaye
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BM_HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 3) Buttons ke simple handlers (Explore, Find Suppliers, Search)
  const handleExplore = () => {
    console.log("Explore Materials clicked");
  };

  const handleFindSuppliers = () => {
    console.log("Find Suppliers clicked");
  };

  const handleSearch = () => {
    console.log("Search Materials clicked");
  };

  return (
    <section className="bm-hero-root relative flex min-h-[560px] items-center overflow-hidden bg-[var(--charcoal-black)] text-[color:var(--white-cards)] lg:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
      {/* 4) Background images: sirf current image nazar aati hai */}
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

      {/* 5) Hero ka content (left side) */}
      <div className="bm-hero-content relative z-10 mx-auto w-full max-w-[1920px] px-4 py-16 sm:px-6 lg:px-10 2xl:px-12">
        {/* Peeli patti + chhoti line */}
        <p className="bm-hero-eyebrow flex items-center gap-4 text-sm font-[family-name:Poppins-Medium] sm:text-base 2xl:text-xl">
          <span className="h-7 w-1 shrink-0 bg-[var(--primary-yellow)]" />
          Bricks, cement, saria, tiles and more
        </p>

        {/* Bari heading (2 lines) */}
        <h1 className="bm-hero-heading mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
          <span className="block">Compare Supplier Prices</span>
          <span className="block">Without the Phone Calls.</span>
        </h1>

        {/* Detail */}
        <p className="bm-hero-text mt-6 max-w-3xl text-base leading-7 text-[color:var(--off-white-background)] sm:text-lg sm:leading-8 lg:text-xl 2xl:max-w-4xl 2xl:text-2xl 2xl:leading-10">
          See listed prices and units side by side from different shops, so you
          can plan your budget with less running around.
        </p>

        {/* Search bar: material name + category + location + Search Materials button */}
        <div className="bm-hero-search mt-8 w-full max-w-[1008px] rounded-xl bg-[var(--white-cards)] p-3 sm:mt-10 sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            {/* Material name */}
            <input
              type="text"
              placeholder="Material name"
              aria-label="Material name"
              className="bm-hero-search-input w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base text-[color:var(--primary-text)] outline-none placeholder:text-[color:var(--secondary-text)] focus:border-[color:var(--charcoal-black)]"
            />

            {/* Category */}
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
              <ChevronDown
                size={18}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[color:var(--secondary-text)]"
              />
            </div>

            {/* Location */}
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
              <ChevronDown
                size={18}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[color:var(--secondary-text)]"
              />
            </div>

            {/* Search button */}
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

const page = () => {
  return (
    <div>
      <Hero />
      <BmCategories />
      <NewMaterials />
      <Banner />
      <ReusedMaterials />
      <AiAssistant />
      <TopSuppliers />
      <CustomerReviews />
      <Faqquestion />
    </div>
  );
};

export default page;
