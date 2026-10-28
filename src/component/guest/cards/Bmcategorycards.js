"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";


import blackpipe from "../../../assets/image/guest/card/blackpipe.jpg"
import briks from "../../../assets/image/guest/card/briks.jpg"

import ceiling from "../../../assets/image/guest/card/ceiling.jpg"
import copperwire from "../../../assets/image/guest/card/copperwire.jpg"
import doorhings from "../../../assets/image/guest/card/doorhings.jpg"
import doorsWindows from "../../../assets/image/guest/card/doorsWindows.jpg"
import grills from "../../../assets/image/guest/card/grills.jpg"
import multiwire from "../../../assets/image/guest/card/multiwire.jpg"
import paint from "../../../assets/image/guest/card/paint.jpg"
import sand from "../../../assets/image/guest/card/sand.jpg"
import secwindow from "../../../assets/image/guest/card/secwindow.jpg"
import steelSaria from "../../../assets/image/guest/card/steelSaria.jpg"
import tiles from "../../../assets/image/guest/card/tiles.jpg"
import window from "../../../assets/image/guest/card/window.jpg"

// 1) Categories ka simple data (har item ka unique id)
//    Nayi category add karni ho to bas aik aur { ... } likh dein, card khud ban jayega.
const BM_CATEGORIES = [
  { id: 1, name: "Bricks", image: blackpipe },
  { id: 2, name: "Cement", image: briks },
  { id: 3, name: "Sand", image: ceiling },
  { id: 4, name: "Bajri", image: copperwire },
  { id: 5, name: "Steel / Saria", image: doorhings },
  { id: 6, name: "Tiles", image: doorsWindows },
  { id: 7, name: "Paint", image: grills },
  { id: 8, name: "Doors & Windows", image: multiwire },
  { id: 9, name: "Grills", image: paint },
  { id: 10, name: "Reusable Materials", image: sand },
  { id: 11, name: "Insulation", image: secwindow },
  { id: 12, name: "Waterproofing", image: steelSaria },
  { id: 13, name: "Ceiling Materials", image: tiles },
  { id: 14, name: "False Ceiling Accessories", image: window },
];

// Ek click par kitne cards sarkein (1 = review carousel jaisa)
const MOVE_BY = 1;

export default function BmCategories() {
  const [items, setItems] = useState(BM_CATEGORIES); // cards ki current tarteeb
  const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef(null);
  const busy = useRef(false); // slide ke dauran dobara click na chale
  const touchX = useRef(0);

  // Ek card ki jagah = card ki chaurai + gap
  const getStep = () => {
    const el = trackRef.current;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return (el.firstElementChild.offsetWidth + gap) * MOVE_BY;
  };

  // 2) Buttons ke simple handlers
  const handleSearch = () => {
    console.log("Search Category clicked");
  };

  // Aage: track left sarkao, phir pehle card aakhir mein laga do
  const handleNext = () => {
    if (busy.current) return;
    busy.current = true;
    setAnimating(true);
    setShift(-getStep());
  };

  // Peeche: aakhri card pehle laga do (bina animation), phir right sarkao
  const handlePrev = () => {
    if (busy.current) return;
    busy.current = true;
    setAnimating(false);
    setItems((a) => [...a.slice(-MOVE_BY), ...a.slice(0, -MOVE_BY)]);
    setShift(-getStep());
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimating(true);
        setShift(0);
      })
    );
  };

  // Slide khatam hone par: list rotate karo aur track chupke se reset karo
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (shift < 0) {
      setAnimating(false);
      setItems((a) => [...a.slice(MOVE_BY), ...a.slice(0, MOVE_BY)]);
      setShift(0);
    }
    busy.current = false;
  };

  // Mobile par swipe
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchX.current;
    if (diff < -50) handleNext();
    if (diff > 50) handlePrev();
  };

  const handleCategory = (name) => {
    console.log("Category clicked:", name);
  };

  return (
    <section className="bm-categories-root bg-[var(--off-white-background)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-10 2xl:px-12">
        {/* 3) Beech mein: heading + search bar */}
        <div className="bm-categories-top text-center">
          <h2 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl 2xl:text-5xl">
            Marketplace Categories
          </h2>

          <div className="bm-categories-search mx-auto mt-6 flex w-full max-w-[720px] flex-col gap-3 rounded-2xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 shadow-sm sm:mt-8 sm:flex-row sm:items-center sm:rounded-full sm:py-2 sm:pr-2 sm:pl-6">
            {/* Icon + input */}
            <div className="flex flex-1 items-center gap-3 px-2 sm:px-0">
              <Search
                size={22}
                className="shrink-0 text-[color:var(--secondary-text)]"
              />
              <input
                type="text"
                placeholder="Search categories..."
                aria-label="Search categories"
                className="bm-categories-search-input w-full min-w-0 bg-[var(--white-cards)] py-2 text-base text-[color:var(--primary-text)] outline-none placeholder:text-[color:var(--secondary-text)] sm:text-lg"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="bm-categories-search-btn rounded-xl bg-[var(--primary-yellow)] px-6 py-3 text-base font-[family-name:Poppins-Medium] whitespace-nowrap text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:rounded-full"
            >
              Search Category
            </button>
          </div>
        </div>

        {/* 4) Cards ki line: left arrow, cards, right arrow */}
        <div className="bm-categories-slider relative mt-8 sm:mt-10">
          {/* Left arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous categories"
            className="bm-categories-prev-btn absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-md hover:bg-[var(--primary-yellow)] sm:left-3 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={22} />
          </button>

          {/* overflow-hidden: sirf screen jitne cards nazar aate hain, baqi chup rehte hain */}
          <div
            className="overflow-hidden py-4"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="bm-categories-track flex gap-4 sm:gap-6"
              style={{
                transform: `translateX(${shift}px)`,
                transition: animating ? "transform 500ms ease-in-out" : "none",
              }}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCategory(item.name)}
                  className="bm-categories-card flex w-44 shrink-0 flex-col overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] text-left shadow-md hover:shadow-lg sm:w-56 lg:w-[262px]"
                >
                  {/* Image */}
                  <span className="relative block h-32 w-full bg-[var(--off-white-background)] sm:h-40 lg:h-[197px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 262px, (min-width: 640px) 224px, 176px"
                      className="object-cover"
                    />
                  </span>

                  {/* Naam: sab cards ki height barabar rehti hai */}
                  <span className="flex min-h-[72px] items-start p-4 text-base font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] sm:text-lg lg:min-h-[88px] lg:p-[18px] lg:text-xl">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next categories"
            className="bm-categories-next-btn absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-md hover:bg-[var(--primary-yellow)] sm:right-3 sm:h-12 sm:w-12"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}