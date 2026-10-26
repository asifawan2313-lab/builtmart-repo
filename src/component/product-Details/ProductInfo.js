"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  Heart,
  Info,
  MessageSquarePlus,
  Minus,
  Phone,
  Plus,
  Share2,
  Star,
} from "lucide-react";
// import ReviewModal from "./ReviewModal"; // uncomment with the modal below

// Quantity the supplier has in stock (customer cannot order more than this)
const maxOrder = 200;

// Product data (simple list, shown directly)
const product = {
  category: "Cement",
  name: "Cement (Wazirabad stock)",
  description:
    "High-quality Ordinary Portland Cement (OPC) known for its strength, durability and reliable performance. It is widely used in residential, commercial and industrial construction projects.",
  notes: ["Delivery Charges based on Location"],
  rating: 4.5,
  reviews: "120+",
  price: "1,430",
  unit: "bag",
  cities: ["Gujranwala", "Wazirabad", "Lahore", "Gujrat"],
  details: [
    { label: "Type", value: "Ordinary Portland Cement (OPC)" },
    { label: "Weight", value: "50 kg per bag" },
    { label: "Compressive Strength", value: "≥ 42.5 MPa" },
    { label: "Brand", value: "Wazirabad" },
    { label: "Shelf Life", value: "3 months" },
  ],
};

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  // Keeps the quantity between 1 and the supplier stock
  const changeQuantity = (value) =>
    setQuantity(Math.min(Math.max(Number(value) || 1, 1), maxOrder));

  // Simple handlers (connect them to real actions later)
  const handleAskQuestion = () => {};
  const handleShare = () => {};
  const handleContactSupplier = () => {};
  const handleAddToCart = () => setAdded(true);

  // Top action links
  const actions = [
    { label: "Wishlist", icon: Heart, active: saved, onClick: () => setSaved(!saved) },
    { label: "Ask question", icon: CircleHelp, onClick: handleAskQuestion },
    { label: "Add Review", icon: MessageSquarePlus, onClick: () => setReviewOpen(true) },
    { label: "Share", icon: Share2, onClick: handleShare },
  ];

  return (
    <div className="w-full">
      {/* Top actions */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {actions.map(({ label, icon: Icon, active, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="group flex items-center gap-1.5 text-sm text-[#12304A] transition duration-300 hover:-translate-y-0.5"
          >
            <Icon
              size={16}
              className={`text-[#ffc61a] transition-transform duration-300 group-hover:scale-125 ${
                active ? "fill-[#ffc61a]" : ""
              }`}
            />
            {label}
          </button>
        ))}
      </div>

      {/* Title */}
      <span className="mt-5 inline-block rounded bg-[#F3F5F7] px-2 py-0.5 text-xs font-medium text-[#5B6B78]">
        {product.category}
      </span>
      <h1 className="mt-2 font-[family-name:var(--font-baloo)] text-3xl font-bold text-[#12304A] sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= Math.round(product.rating)
                  ? "fill-[#ffc61a] text-[#ffc61a]"
                  : "text-neutral-300"
              }
            />
          ))}
        </div>
        <span className="text-sm text-[#5B6B78]">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p className="text-3xl font-bold text-[#12304A]">
          Rs. {product.price}
          <span className="ml-1 text-sm font-normal text-[#5B6B78]">/ {product.unit}</span>
        </p>
        <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
          In Stock
        </span>
      </div>
      <p className="mt-1 text-sm text-[#5B6B78]">{maxOrder} bags available (approx.)</p>

      {/* Product description and notes */}
      <h2 className="mt-6 text-sm font-semibold text-[#12304A]">Product Description</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5B6B78]">{product.description}</p>
      <div className="mt-2 space-y-0.5 text-sm font-semibold text-[#12304A]">
        {product.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>

      {/* Specifications (above the buttons) */}
      <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <h2 className="text-sm font-semibold text-[#12304A]">Specifications</h2>
        <div className="mt-2 text-xs">
          {product.details.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-2 gap-4 py-1.5">
              <span className="text-[#5B6B78]">{label}</span>
              <span className="text-[#12304A]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity, city and buttons */}
      <div className="mt-5 w-full space-y-3 sm:max-w-md">
        {/* Quantity: customer can type or use + / - (1 up to supplier stock) */}
        <div className="flex items-center justify-between rounded-md border border-neutral-300 bg-[#E4E8EC] px-3 py-2.5">
          <button
            type="button"
            onClick={() => changeQuantity(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="rounded p-1 text-[#12304A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            min={1}
            max={maxOrder}
            value={quantity}
            onChange={(e) => changeQuantity(e.target.value)}
            onFocus={(e) => e.target.select()}
            aria-label="Quantity"
            className="w-full bg-transparent text-center text-sm font-semibold text-[#12304A] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => changeQuantity(quantity + 1)}
            disabled={quantity >= maxOrder}
            aria-label="Increase quantity"
            className="rounded p-1 text-[#12304A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Maximum quantity note */}
        <p className="flex items-center gap-1.5 text-xs text-[#5B6B78]">
          <Info size={14} className="shrink-0 text-[#12304A]" />
          Note: Maximum Order Quantity {maxOrder}
        </p>

        <div className="relative">
          <select
            aria-label="Select city"
            className="w-full appearance-none rounded-full border border-neutral-200 bg-[#F3F5F7] px-4 py-2.5 pr-10 text-sm text-[#12304A] outline-none transition focus:border-[#ffc61a] focus:ring-2 focus:ring-[#ffc61a]/40"
          >
            {product.cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#5B6B78]"
          />
        </div>

        {/* Both buttons on one line */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 whitespace-nowrap rounded-full bg-[#ffc61a] px-3 py-3 text-xs font-semibold text-[#12304A] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 sm:text-sm"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={handleContactSupplier}
            className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#12304A] px-3 py-3 text-xs font-semibold text-[#12304A] transition duration-300 hover:-translate-y-0.5 hover:bg-[#12304A] hover:text-white active:scale-95 sm:text-sm"
          >
            <Phone size={16} />
            Contact Supplier
          </button>
        </div>
      </div>

      {/* Add review modal (uncomment together with the import at the top) */}
      {/* <ReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} /> */}
    </div>
  );
}