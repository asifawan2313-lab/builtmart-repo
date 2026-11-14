"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import MaterialCategoryCard from "../MaterialCategoryCards";

const GAP = 12; // gap-3 yaani 12px

// Ek screen par kitne columns: mobile 2, sm 3, md 5, lg 7 (hamesha 2 rows)
const cols =
  "auto-cols-[calc((100%-0.75rem)/2)] sm:auto-cols-[calc((100%-1.5rem)/3)] md:auto-cols-[calc((100%-3rem)/5)] lg:auto-cols-[calc((100%-4.5rem)/7)]";

const arrowClass =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E4E7] bg-white text-[#202124] shadow transition-colors enabled:cursor-pointer enabled:hover:border-[#FDC716] enabled:hover:bg-[#FDC716] disabled:cursor-not-allowed disabled:opacity-30";

const exploreClass =
  "inline-flex h-11 items-center justify-center rounded-lg border border-[#FDC716] bg-[#FDC716] px-8 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#202124] hover:text-[#FDC716]";

// Arrows se agle cards aate hain (shuru mein left, aakhir mein right arrow band)
const Slider = ({ items, label }) => {
  const sliderRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

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

  // Ek poori screen aage (1) ya peeche (-1)
  const handleSlide = (direction) =>
    sliderRef.current?.scrollBy({ left: direction * (sliderRef.current.clientWidth + GAP), behavior: "smooth" });

  return (
    <div className="relative mt-8 px-11">
      <button type="button" aria-label={`Previous ${label}`} disabled={!canLeft} onClick={() => handleSlide(-1)} className={`${arrowClass} left-0`}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" aria-label={`Next ${label}`} disabled={!canRight} onClick={() => handleSlide(1)} className={`${arrowClass} right-0`}>
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

const CategorySection = ({ title, placeholder, items, label, exploreText, exploreHref, withBorder }) => (
  <section className={`bg-[#F4F4F2] px-4 py-12 sm:px-6 ${withBorder ? "border-t border-[#E2E4E7]" : ""}`}>
    <div className="mx-auto max-w-5xl">
      <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">{title}</h2>

      <div className="relative mx-auto mt-5 max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
        <input
          type="text"
          aria-label={placeholder}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border-2 border-[#202124] bg-white pl-11 pr-4 text-sm text-[#202124] outline-none placeholder:text-[#A7ADB4] focus:ring-1 focus:ring-[#202124]"
        />
      </div>

      <Slider items={items} label={label} />

      <div className="mt-8 text-center">
        <Link href={exploreHref} className={exploreClass}>
          {exploreText}
        </Link>
      </div>
    </div>
  </section>
);

export default CategorySection;