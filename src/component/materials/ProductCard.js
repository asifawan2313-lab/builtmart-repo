"use client";

import { useState } from "react";
import { Heart, ImageOff, MapPin, MessageSquare, Phone, Store } from "lucide-react";

// view = "list" (image left, details right) or "grid" (image on top)
export default function ProductCard({ product, view = "list" }) {
  const [liked, setLiked] = useState(false);
  const [imageFailed, setImageFailed] = useState(false); // true when the image file is missing

  const isList = view === "list";

  // Simple handlers (connect them to pages / backend later).
  const handleLike = () => setLiked(!liked);
  const handleView = () => console.log("View details:", product.id);
  const handleContact = () => console.log("Contact shop:", product.shop);
  const handleCall = () => console.log("Call shop:", product.shop);

  const buttonClass =
    "flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)]";

  return (
    <article
      className={`flex overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] ${
        isList ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative shrink-0 bg-[var(--off-white-background)] ${
          isList ? "h-52 w-full sm:h-auto sm:w-56 lg:w-64" : "h-48 w-full"
        }`}
      >
        {product.image && !imageFailed ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--secondary-text)]">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs">{product.category}</span>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            product.quality === "New"
              ? "bg-[var(--primary-yellow)] text-[var(--charcoal-black)]"
              : "bg-[var(--industrial-blue-grey)] text-[var(--white-cards)]"
          }`}
        >
          {product.quality}
        </span>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-[var(--secondary-text)]">{product.category}</p>
            <p className="mt-1 text-lg font-semibold text-[var(--primary-text)]">
              {product.name}
            </p>
          </div>
          <button
            type="button"
            aria-label="Save to favourites"
            aria-pressed={liked}
            onClick={handleLike}
            className="rounded-full p-1 transition hover:bg-[var(--off-white-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)]"
          >
            <Heart
              className={`h-5 w-5 ${
                liked
                  ? "fill-[var(--primary-yellow)] text-[var(--primary-yellow)]"
                  : "text-[var(--secondary-text)]"
              }`}
            />
          </button>
        </div>

        <p className="mt-2 text-xl font-semibold text-[var(--primary-text)]">
          Rs. {product.price.toLocaleString("en-PK")}
          <span className="ml-1 text-sm font-normal text-[var(--secondary-text)]">
            / {product.unit}
          </span>
        </p>

        {/* Shop and location */}
        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--off-white-background)] text-[var(--industrial-blue-grey)]">
            <Store className="h-5 w-5" />
          </span>
          <div className="min-w-0 text-sm">
            <p className="truncate font-medium text-[var(--primary-text)]">{product.shop}</p>
            <p className="flex items-center gap-1 text-[var(--secondary-text)]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{product.location}</span>
            </p>
          </div>
        </div>

        <p
          className={`mt-3 text-sm font-medium ${
            product.inStock ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </p>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={handleView}
            className={`${buttonClass} bg-[var(--charcoal-black)] text-[var(--white-cards)] hover:bg-[var(--deep-charcoal)]`}
          >
            View Details
          </button>
          <button
            type="button"
            onClick={handleContact}
            className={`${buttonClass} border border-[var(--border-color)] text-[var(--primary-text)] hover:bg-[var(--off-white-background)]`}
          >
            <MessageSquare className="h-4 w-4" />
            Contact
          </button>
          <button
            type="button"
            onClick={handleCall}
            className={`${buttonClass} border border-[var(--border-color)] text-[var(--primary-text)] hover:bg-[var(--off-white-background)]`}
          >
            <Phone className="h-4 w-4" />
            Call
          </button>
        </div>
      </div>
    </article>
  );
}