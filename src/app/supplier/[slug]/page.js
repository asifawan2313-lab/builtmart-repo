"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, Clock, Home, MapPin, Phone, Star, Truck } from "lucide-react";

import { getSupplier } from "../../../component/supplier/SupplierGrid/SupplierData";

/* ============================================================
   1. HERO
   ============================================================ */

function SupplierShopHero({ supplier }) {
  const { name, initials, image, verified, location, rating, reviews, phone, hours } = supplier;

  // Simple handler (baad mein asal action jodein)
  const handleContact = () => console.log("Contact Supplier clicked");

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

/* ============================================================
   2. BREADCRUMB
   ============================================================ */

function SupplierShopBreadcrumb({ name }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#E2E4E7] bg-white">
      <ol className="flex flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#565553] sm:px-6 sm:text-sm lg:px-10">
        {/* Home (sirf icon) */}
        <li>
          <Link href="/" aria-label="Home" className="flex items-center text-[#202124] transition-colors hover:text-[#E5B20F]">
            <Home size={16} />
          </Link>
        </li>

        <ChevronRight size={14} className="shrink-0 text-[#A7ADB4]" aria-hidden="true" />

        <li>
          <Link href="/supplier" className="transition-colors hover:text-[#E5B20F]">
            Suppliers
          </Link>
        </li>

        <ChevronRight size={14} className="shrink-0 text-[#A7ADB4]" aria-hidden="true" />

        {/* Maujooda shop (link nahi) */}
        <li aria-current="page" className="min-w-0 truncate text-[#202124]">
          {name}
        </li>
      </ol>
    </nav>
  );
}

/* ============================================================
   3. SHOP DETAILS (data file ki maujooda fields)
   ============================================================ */

function SupplierShopDetails({ supplier }) {
  const { description, address, phone, hours, delivery, tags } = supplier;

  // Chhoti details: [icon, label, value]
  const details = [
    [MapPin, "Address", address],
    [Phone, "Phone", phone],
    [Clock, "Opening Hours", hours],
    [Truck, "Delivery", delivery],
  ];

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-10">
      <h2 className="font-[family-name:var(--font-baloo)] text-2xl font-bold text-[#202124]">About this Shop</h2>
      <p className="mt-2 max-w-3xl text-sm text-[#565553] sm:text-base">{description}</p>

      {/* Details cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {details.map(([DetailIcon, label, value]) => (
          <div key={label} className="rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm">
            <DetailIcon size={20} className="text-[#E5B20F]" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#45484D]">{label}</p>
            <p className="mt-1 text-sm text-[#202124]">{value}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h3 className="mt-8 text-lg font-semibold text-[#202124]">Categories</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-[#E2E4E7] bg-white px-4 py-1.5 text-sm text-[#45484D]">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-6 text-xs text-[#565553]">All shop information is for demo purposes only.</p>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function Page({ params }) {
  const { slug } = use(params); // link ka slug, e.g. al-noor-building-store
  const supplier = getSupplier(slug);

  // Aisa koi supplier na ho to 404 page
  if (!supplier) notFound();

  return (
    <main className="min-h-screen bg-[#F4F4F2]">
      <SupplierShopHero supplier={supplier} />
      <SupplierShopBreadcrumb name={supplier.name} />
      <SupplierShopDetails supplier={supplier} />
    </main>
  );
}