// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const GAP = 12; // gap-3 yaani 12px

// // Arrow button ka style (disabled par halka)
// const arrowClass =
//   "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9E3E9] bg-white text-[#292929] shadow transition-colors enabled:cursor-pointer enabled:hover:border-[#FDC716] enabled:hover:bg-[#FDC716] disabled:cursor-not-allowed disabled:opacity-30";

// // Grid: items ko rows/columns mein dikhata hai, arrows se agle items aate hain
// // Card page se aata hai (card page ke andar hi bana hota hai)
// const LabourGrid = ({ items, Card, cols, rows, label }) => {
//   const sliderRef = useRef(null);
//   const [canLeft, setCanLeft] = useState(false); // shuru mein left arrow band
//   const [canRight, setCanRight] = useState(true);

//   // Scroll position dekh kar arrows enable/disable karo
//   const updateArrows = () => {
//     const el = sliderRef.current;
//     if (!el) return;
//     setCanLeft(el.scrollLeft > 1);
//     setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//   };

//   useEffect(() => {
//     updateArrows();
//     window.addEventListener("resize", updateArrows);
//     return () => window.removeEventListener("resize", updateArrows);
//   }, []);

//   // Ek poori screen aage (1) ya peeche (-1) smooth scroll
//   const handleSlide = (direction) => {
//     const el = sliderRef.current;
//     if (!el) return;
//     el.scrollBy({ left: direction * (el.clientWidth + GAP), behavior: "smooth" });
//   };

//   return (
//     <div className="relative mt-8 px-11">
//       <button
//         type="button"
//         aria-label={`Previous ${label}`}
//         disabled={!canLeft}
//         onClick={() => handleSlide(-1)}
//         className={`${arrowClass} left-0`}
//       >
//         <ChevronLeft size={20} />
//       </button>
//       <button
//         type="button"
//         aria-label={`Next ${label}`}
//         disabled={!canRight}
//         onClick={() => handleSlide(1)}
//         className={`${arrowClass} right-0`}
//       >
//         <ChevronRight size={20} />
//       </button>

//       <div
//         ref={sliderRef}
//         onScroll={updateArrows}
//         className={`grid snap-x snap-mandatory grid-flow-col ${rows} ${cols} gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
//       >
//         {items.map((item) => (
//           <div key={item.id} className="snap-start [&>*]:h-full [&>*]:w-full">
//             <Card {...item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LabourGrid;






"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GAP = 12; // gap-3 yaani 12px

// Arrow button ka style (disabled par halka)
const arrowClass =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9E3E9] bg-white text-[#292929] shadow transition-colors enabled:cursor-pointer enabled:hover:border-[#FDC716] enabled:hover:bg-[#FDC716] disabled:cursor-not-allowed disabled:opacity-30";

// Grid: do tareeqe se chalta hai
// 1) view na ho: slider (rows/columns, arrows se agle items), landing page ke liye
// 2) view "grid" ya "list": listing page ka layout
// Card page se aata hai (card page ke andar hi bana hota hai)
const LabourGrid = ({ items, Card, cols, rows, label, view }) => {
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

  // Listing page: grid ya list view
  if (view) {
    return (
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col gap-3"
        }
      >
        {items.map((item) => (
          <Card key={item.id} {...item} view={view} />
        ))}
      </div>
    );
  }

  // Landing page: slider
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
        className={`grid snap-x snap-mandatory grid-flow-col ${rows} ${cols} gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {items.map((item) => (
          <div key={item.id} className="snap-start [&>*]:h-full [&>*]:w-full">
            <Card {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabourGrid;