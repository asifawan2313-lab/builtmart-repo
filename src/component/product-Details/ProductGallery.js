"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Product images from the public folder
const images = [
  { src: "/images/products/cement-1.jpg", alt: "Stacked Portland cement bags" },
  { src: "/images/products/cement-2.jpg", alt: "Single cement bag" },
  { src: "/images/products/cement-3.jpg", alt: "Cement bags on a pallet" },
  { src: "/images/products/cement-4.jpg", alt: "Cement bag close view" },
  { src: "/images/products/cement-5.jpg", alt: "Loose cement powder" },
];

export default function ProductGallery() {
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const handleSelect = (index) => setCurrent(index);

  // Zoom follows the mouse position
  const handleMouseMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const arrowStyle =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition duration-300 hover:scale-110 hover:bg-[#ffc61a] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a] md:opacity-0 md:group-hover:opacity-100";

  const renderImage = (image, index, thumbnail = false) => {
    if (failedImages[index]) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-200 p-3 text-center text-neutral-600">
          <span className="text-3xl">▧</span>
          {!thumbnail && (
            <span className="text-sm font-medium">Cement Image</span>
          )}
        </div>
      );
    }

    return (
      <Image
        src={image.src}
        alt={thumbnail ? "" : image.alt}
        fill
        sizes={thumbnail ? "120px" : "(min-width: 768px) 576px, 100vw"}
        priority={!thumbnail && index === 0}
        onError={() =>
          setFailedImages((prev) => ({ ...prev, [index]: true }))
        }
        style={thumbnail ? undefined : { transformOrigin: zoomOrigin }}
        className={`object-cover transition-transform duration-300 ease-out ${
          thumbnail ? "" : "group-hover:scale-150"
        }`}
      />
    );
  };

  return (
    <div className="w-full max-w-none">
      {/* Main image */}
      <div
        onMouseMove={handleMouseMove}
        className="group relative h-72 w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm sm:h-80 md:h-96"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
          >
            {renderImage(image, index)}
          </div>
        ))}

        {/* Popular badge */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#ffc61a] px-3 py-1 text-xs font-semibold text-neutral-900 shadow">
          Popular
        </span>

        {/* Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className={`${arrowStyle} left-3`}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className={`${arrowStyle} right-3`}
        >
          <ChevronRight size={20} />
        </button>

        {/* Counter */}
        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-neutral-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {current + 1}/{images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => handleSelect(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === current}
            className={`relative aspect-square overflow-hidden rounded-lg bg-neutral-100 transition duration-300 hover:-translate-y-1 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a] ${
              index === current
                ? "opacity-100 ring-2 ring-[#ffc61a] ring-offset-2"
                : "opacity-60"
            }`}
          >
            {renderImage(image, index, true)}
          </button>
        ))}
      </div>
    </div>
  );
}
