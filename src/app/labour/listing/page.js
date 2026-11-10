"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, MapPin, Search, Star } from "lucide-react";
import LabourGrid from "../../../../component/labour/LabourGrid/LabourGrid";
import { labourCategories, labourAreas, labourProviders } from "../labourData";

/* ============================================================
   DEMO DATA (data labourData.js se aata hai)
   ============================================================ */

const experienceOptions = [
  { value: 0, label: "Any experience" },
  { value: 3, label: "3+ years" },
  { value: 6, label: "6+ years" },
  { value: 10, label: "10+ years" },
];

const ratingOptions = [
  { value: 0, label: "Any rating" },
  { value: 4, label: "4.0 and above" },
  { value: 4.5, label: "4.5 and above" },
];

const verificationOptions = ["Verified (demo)", "Pending Verification"];
const availabilityOptions = ["Available", "Busy this week"];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "experience", label: "Most experience" },
  { value: "rating", label: "Highest rating" },
];

// Sab filters ki shuru ki halat
const emptyFilters = {
  category: "",
  skill: "",
  area: "",
  experience: 0,
  rating: 0,
  verification: "",
  availability: "",
  sort: "relevance",
};

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

/* ============================================================
   CARD (grid aur list dono view isi se, card sirf is page ka)
   ============================================================ */

const ProviderCard = ({ id, name, category, skills, experience, areas, verification, rating, availability, image, view }) => {
  const isList = view === "list";

  return (
    <article className={`rounded-xl border border-[#D9E3E9] bg-white p-1.5 text-[#202124] shadow-sm ${isList ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>
      {/* Image ki jagah: image null ho to "No image" dikhta hai */}
      <div className={`relative overflow-hidden rounded-lg bg-[#D9E3E9] ${isList ? "aspect-[4/3] sm:aspect-auto sm:w-44 sm:shrink-0" : "aspect-[4/3]"}`}>
        {image ? (
          <Image src={image} alt={name} fill sizes="(min-width: 1280px) 260px, 45vw" className="object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
        <p className="text-xs text-[#565553]">{category} · {experience} yrs experience</p>

        <p className="line-clamp-1 text-xs text-[#565553]">Skills: {skills.join(", ")}</p>

        <p className="flex items-center gap-1 text-xs text-[#565553]">
          <MapPin size={12} className="shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{areas.join(", ")}, Gujranwala</span>
        </p>

        <div className="flex flex-wrap gap-1 text-[11px]">
          <span className={`rounded px-2 py-0.5 ${verification.startsWith("Verified") ? "bg-green-100 text-green-800" : "bg-[#FDC716]/30 text-[#202124]"}`}>
            {verification}
          </span>
          <span className="flex items-center gap-1 rounded bg-[#F4F4F2] px-2 py-0.5 text-[#565553]">
            <Star size={10} aria-hidden="true" />
            {rating ?? "No rating yet"}
          </span>
          <span className="rounded bg-[#F4F4F2] px-2 py-0.5 text-[#565553]">{availability}</span>
        </div>

        <Link href={`/labour/provider/${id}`} className={`${yellowBtn} mt-auto h-9 rounded-md text-xs ${isList ? "sm:w-36" : ""}`}>
          View Details
        </Link>
      </div>
    </article>
  );
};

/* ============================================================
   PAGE (filters ka form page ke andar hi hai)
   ============================================================ */

const ListingContent = () => {
  const params = useSearchParams();

  // Landing se aaye hue category (slug) ko category ke naam mein badlo
  const slugCategory = labourCategories.find((c) => c.slug === params.get("category"))?.name || "";

  const [filters, setFilters] = useState({
    ...emptyFilters,
    category: slugCategory,
    area: params.get("area") || "",
  });
  const [query, setQuery] = useState(params.get("q") || "");
  const [view, setView] = useState("grid");

  // Ek filter badlo (category badle to skill khali ho jata hai)
  const setFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value, ...(key === "category" ? { skill: "" } : {}) }));

  const handleClear = () => {
    setFilters(emptyFilters);
    setQuery("");
  };

  // Skill dropdown: chuni hui category ki skills (category na ho to sab ki)
  const skillOptions = [
    ...new Set(
      labourProviders
        .filter((p) => !filters.category || p.category === filters.category)
        .flatMap((p) => p.skills)
    ),
  ];

  // Filters + search lagao
  const text = query.trim().toLowerCase();
  const results = labourProviders
    .filter(
      (p) =>
        (!text || `${p.name} ${p.category} ${p.skills.join(" ")}`.toLowerCase().includes(text)) &&
        (!filters.category || p.category === filters.category) &&
        (!filters.skill || p.skills.includes(filters.skill)) &&
        (!filters.area || p.areas.includes(filters.area)) &&
        p.experience >= filters.experience &&
        (!filters.rating || (p.rating !== null && p.rating >= filters.rating)) &&
        (!filters.verification || p.verification === filters.verification) &&
        (!filters.availability || p.availability === filters.availability)
    )
    .sort((a, b) => {
      if (filters.sort === "experience") return b.experience - a.experience;
      if (filters.sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      return 0;
    });

  return (
    <main className="bg-[#F4F4F2] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs text-[#565553]">
          <Link href="/labour" className="font-semibold text-[#202124] hover:underline">Labour</Link> / {filters.category || "All Labour"}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#292929] sm:text-3xl">{filters.category || "All Skilled Labour"}</h1>

        <div className="mt-5 grid gap-5 lg:grid-cols-[250px_1fr]">
          {/* Filters (sidebar) */}
          <form onSubmit={(e) => e.preventDefault()} className="h-fit space-y-3 rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#202124]">Filters</h2>

            <label className="block text-xs font-semibold text-[#565553]">
              Labour Category
              <select value={filters.category} onChange={(e) => setFilter("category", e.target.value)} className={`${field} mt-1 font-normal`}>
                <option value="">All categories</option>
                {labourCategories.map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Skills / Specialization
              <select value={filters.skill} onChange={(e) => setFilter("skill", e.target.value)} className={`${field} mt-1 font-normal`}>
                <option value="">Any skill</option>
                {skillOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Location (Gujranwala)
              <select value={filters.area} onChange={(e) => setFilter("area", e.target.value)} className={`${field} mt-1 font-normal`}>
                <option value="">All Gujranwala</option>
                {labourAreas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Experience
              <select value={filters.experience} onChange={(e) => setFilter("experience", Number(e.target.value))} className={`${field} mt-1 font-normal`}>
                {experienceOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Minimum Rating
              <select value={filters.rating} onChange={(e) => setFilter("rating", Number(e.target.value))} className={`${field} mt-1 font-normal`}>
                {ratingOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Verification Status
              <select value={filters.verification} onChange={(e) => setFilter("verification", e.target.value)} className={`${field} mt-1 font-normal`}>
                <option value="">Any status</option>
                {verificationOptions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Availability
              <select value={filters.availability} onChange={(e) => setFilter("availability", e.target.value)} className={`${field} mt-1 font-normal`}>
                <option value="">Any availability</option>
                {availabilityOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Sort By
              <select value={filters.sort} onChange={(e) => setFilter("sort", e.target.value)} className={`${field} mt-1 font-normal`}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleClear}
              className="h-10 w-full cursor-pointer rounded-lg border border-[#D9E3E9] bg-white text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
            >
              Clear Filters
            </button>
          </form>

          {/* Results */}
          <section>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-52 flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search labour"
                  placeholder="Search name, skill or category"
                  className={`${field} pl-9`}
                />
              </div>

              {/* Grid / List toggle */}
              <div className="flex gap-1" role="group" aria-label="View">
                {[
                  { id: "grid", label: "Grid view", icon: LayoutGrid },
                  { id: "list", label: "List view", icon: List },
                ].map(({ id, label, icon: ViewIcon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-label={label}
                    aria-pressed={view === id}
                    onClick={() => setView(id)}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                      view === id ? "border-[#FDC716] bg-[#FDC716] text-[#292929]" : "border-[#D9E3E9] bg-white text-[#565553] hover:border-[#FDC716]"
                    }`}
                  >
                    <ViewIcon size={18} />
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 text-xs text-[#565553]">{results.length} labour providers found</p>

            <div className="mt-3">
              {results.length ? (
                <LabourGrid items={results} Card={ProviderCard} view={view} />
              ) : (
                <p className="rounded-xl border border-[#D9E3E9] bg-white px-4 py-10 text-center text-sm text-[#565553]">
                  No labour found. Try clearing a filter.
                </p>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-[#565553]">
              Sample providers, ratings and verification shown for demonstration purposes.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

// useSearchParams ke liye Suspense zaroori hai
const LabourListingPage = () => (
  <Suspense fallback={null}>
    <ListingContent />
  </Suspense>
);

export default LabourListingPage;