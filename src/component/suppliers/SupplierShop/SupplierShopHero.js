"use client";

import Image from "next/image";
import { BadgeCheck, MapPin, Star, Phone, Clock } from "lucide-react";

export default function SupplierShopHero({ supplier }) {
  const { name, initials, image, verified, location, rating, reviews, phone, hours } = supplier;

  // Simple handler (baad mein asal action jodein)
  const handleContact = () => {};

  return (
    <section className="relative min-h-80 overflow-hidden bg-[#202124] sm:min-h-96 lg:min-h-[26rem]">
      {/* Is supplier ki apni shop image */}
      <Image src={image} alt={`${name} shop (demo image)`} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-[#202124]/60 to-[#202124]/20" />

      <div className="relative flex min-h-80 flex-col gap-5 px-4 py-8 sm:min-h-96 sm:px-6 md:flex-row md:justify-between md:gap-10 lg:min-h-[26rem] lg:px-10">
        {/* Left: logo + text (vertically beech mein) */}
        <div className="flex min-w-0 items-start gap-4 text-white sm:gap-5 md:self-center">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#FDC716] text-xl font-bold text-[#202124] shadow-lg sm:h-20 sm:w-20 sm:text-2xl">
            {initials}
          </span>

          <div className="min-w-0">
            {/* Row 1: Verified */}
            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-blue-600">
                <BadgeCheck size={14} /> Verified
              </span>
            )}

            {/* Row 2: name */}
            <h1 className="mt-2 font-[family-name:var(--font-baloo)] text-2xl font-bold sm:text-3xl lg:text-4xl">{name}</h1>

            {/* Row 3: rating + location */}
            <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <p className="flex items-center gap-1.5">
                <Star size={16} className="fill-[#FDC716] text-[#FDC716]" />
                <b>{rating}</b> ({reviews}+ reviews)
              </p>
              <p className="flex items-center gap-1.5 text-white/85">
                <MapPin size={14} className="shrink-0" /> {location}
              </p>
            </div>

            {/* Row 4: phone + hours */}
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-white/85 sm:text-sm">
              <p className="flex items-center gap-1.5 whitespace-nowrap">
                <Phone size={14} className="shrink-0" /> {phone}
              </p>
              <p className="flex items-center gap-1.5 whitespace-nowrap">
                <Clock size={14} className="shrink-0" /> {hours}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Supplier (neechay-right) */}
        <button
          type="button"
          onClick={handleContact}
          className="flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#FDC716] px-5 py-2.5 text-sm font-semibold text-[#202124] shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#E5B20F] hover:shadow-lg active:scale-95 md:self-end"
        >
          <Phone size={16} /> Contact Supplier
        </button>
      </div>
    </section>
  );
}