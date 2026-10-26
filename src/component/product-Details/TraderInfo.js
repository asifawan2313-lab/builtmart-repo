"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, Building2, ChevronRight, MapPin, ShieldCheck, Star, Truck } from "lucide-react";

// Supplier data (simple list, shown directly)
const supplier = {
  name: "Al-Hafiz Traders",
  logo: "/images/traderlogo/al_hafiz.jpg", // put your logo in public/images/suppliers/
  rating: 4.5,
  reviews: "120+",
  location: "Gujranwala, Punjab",
  highlights: [
    { icon: ShieldCheck, text: "Verified Business" },
    { icon: Truck, text: "Fast Delivery" },
    { icon: ShieldCheck, text: "Quality Assured" },
  ],
};

export default function SupplierCard() {
  const [logoFailed, setLogoFailed] = useState(false);

  // Simple handler (connect it to the suppliers page later)
  const handleViewSuppliers = () => {};

  return (
    <section className="flex w-full flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md sm:p-5 md:flex-row md:items-center">
      {/* Supplier info */}
      <div className="group flex items-center gap-4 md:flex-1">
        {/* Round logo (shows an icon only if the picture is missing) */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#F3F5F7] transition duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
          {logoFailed ? (
            <Building2 size={40} className="absolute inset-0 m-auto text-[#12304A]" />
          ) : (
            <Image
              src={supplier.logo}
              alt={supplier.name}
              fill
              sizes="96px"
              onError={() => setLogoFailed(true)}
              className="object-cover"
            />
          )}
        </div>

        <div className="space-y-1">
          <h2 className="flex items-center gap-1.5 text-lg font-semibold text-[#12304A]">
            {supplier.name}
            <BadgeCheck size={18} className="fill-blue-500 text-white" />
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-[#5B6B78]">
            <ShieldCheck size={14} className="text-green-600" />
            Verified Supplier
          </p>
          <p className="flex items-center gap-1.5 text-sm text-[#5B6B78]">
            <Star size={14} className="fill-[#ffc61a] text-[#ffc61a]" />
            {supplier.rating} ({supplier.reviews} reviews)
          </p>
          <p className="flex items-center gap-1.5 text-sm text-[#5B6B78]">
            <MapPin size={14} />
            {supplier.location}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <ul className="space-y-2.5 border-t border-neutral-200 pt-4 md:flex-1 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        {supplier.highlights.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-[#5B6B78]">
            <Icon size={16} className="text-[#12304A]" />
            {text}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        type="button"
        onClick={handleViewSuppliers}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#ffc61a] px-6 py-3.5 text-sm font-semibold text-[#12304A] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 md:w-auto"
      >
        <Truck size={18} />
        View All Suppliers
        <ChevronRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </section>
  );
}