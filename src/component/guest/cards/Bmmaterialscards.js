"use client";

import { useState } from "react";
import Image from "next/image";

// Ek hi card New aur Reused dono materials ke liye.
// badge: "NEW" ya "REUSED", status: "In stock", "Limited stock", "Good condition" waghera
export default function BmMaterialCard({ material, badge = "NEW" }) {
  const [liked, setLiked] = useState(false);
  const { image, category, name, price, unit, supplier, location, status } = material;

  return (
    <article className="bg-white border border-[#E2E4E7] rounded-xl overflow-hidden flex flex-col">
      {/* Image + badge + heart */}
      <div className="relative aspect-[4/3] bg-[#E2E4E7]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />

        <span className="absolute top-3 left-3 bg-[#202124] text-white text-xs font-bold px-3 py-1 rounded">
          {badge}
        </span>

        <button
          type="button"
          onClick={() => setLiked(!liked)}
          aria-label="Add to favourites"
          aria-pressed={liked}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#202124]"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold tracking-wider uppercase text-[#45484D]">{category}</p>
        <h3 className="text-lg font-bold text-[#202124] mt-1">{name}</h3>

        <p className="mt-3">
          <span className="text-xl font-bold text-[#202124]">Rs. {price.toLocaleString("en-PK")}</span>{" "}
          <span className="text-sm text-[#45484D]">{unit}</span>
        </p>

        <p className="text-sm text-[#45484D] mt-3">{supplier}</p>

        <div className="flex items-center justify-between text-sm text-[#45484D] mt-2">
          <span>{location}</span>
          <span className="font-semibold text-[#202124]">{status}</span>
        </div>

        <button
          type="button"
          className="mt-5 w-full border border-[#E2E4E7] rounded-lg py-2 text-sm font-semibold text-[#202124] hover:bg-[#F4F4F2]"
        >
          View Details
        </button>
      </div>
    </article>
  );
}