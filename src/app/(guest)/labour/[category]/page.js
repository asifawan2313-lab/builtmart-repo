"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, CalendarCheck, LayoutGrid, List, MapPin, MessageCircle, Search, Star } from "lucide-react";
import LabourGrid from "../../../../component/labour/LabourGrid/LabourGrid";
import { labourCategories, labourAreas, labourProviders } from "../labourData";

/* ============================================================
   DEMO DATA (data labourData.js se aata hai)
   ============================================================ */

const any = (label) => ({ value: "", label });
const opt = (value) => ({ value, label: value });

// Sab filters ki shuru ki halat
const emptyFilters = { category: "", skill: "", area: "", experience: 0, rating: 0, verification: "", availability: "", sort: "relevance" };
const numericKeys = ["experience", "rating"];

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
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "experience", label: "Most experience" },
  { value: "rating", label: "Highest rating" },
];

// Reviews aur previous work sirf UI ke liye hain
const demoReviews = [
  { id: 1, name: "Demo Customer 1", text: "Work was on time and neat." },
  { id: 2, name: "Demo Customer 2", text: "Fair price and good communication." },
  { id: 3, name: "Demo Customer 3", text: "Would hire again." },
];

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";
const btn =
  "inline-flex cursor-pointer items-center justify-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";
const yellowBtn = `${btn} border border-[#FDC716] bg-[#FDC716] text-[#292929] hover:border-[#E5B20F] hover:bg-[#E5B20F]`;
const outlineBtn = `${btn} border border-[#292929] bg-white text-[#292929] hover:bg-[#FDC716]/20`;
const box = "rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5";

/* ============================================================
   HELPERS (chhote JSX tukde, jo kai jagah dohrate the)
   ============================================================ */

// Image ki jagah: image null ho to "No image" dikhta hai (parent mein relative aur overflow-hidden ho)
const photo = (src, alt, sizes) =>
  src ? (
    <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
  );

// Verification, rating aur availability ke chhote tags
const tags = ({ verification, rating, reviews, availability }, withReviews = false) => (
  <div className="flex flex-wrap gap-1 text-[11px]">
    <span className={`rounded px-2 py-0.5 ${verification.startsWith("Verified") ? "bg-green-100 text-green-800" : "bg-[#FDC716]/30 text-[#202124]"}`}>
      {verification}
    </span>
    <span className="flex items-center gap-1 rounded bg-[#F4F4F2] px-2 py-0.5 text-[#565553]">
      <Star size={10} aria-hidden="true" />
      {rating ? (withReviews ? `${rating} (${reviews} reviews)` : rating) : "No rating yet"}
    </span>
    <span className="rounded bg-[#F4F4F2] px-2 py-0.5 text-[#565553]">{availability}</span>
  </div>
);

const NotFound = ({ title, text }) => (
  <main className="bg-[#F4F4F2] px-4 py-16 text-center sm:px-6">
    <h1 className="text-2xl font-extrabold text-[#292929]">{title}</h1>
    <p className="mt-2 text-sm text-[#565553]">{text}</p>
    <Link href="/labour" className="mt-4 inline-block text-sm font-semibold text-[#202124] underline">Back to Labour</Link>
  </main>
);

/* ============================================================
   PROVIDER DETAIL (URL mein ?provider=ID ho to)
   ============================================================ */

const ProviderDetail = ({ id }) => {
  const [notice, setNotice] = useState("");
  const provider = labourProviders.find((p) => String(p.id) === String(id));

  if (!provider) return <NotFound title="Provider not found" text="This labour profile does not exist." />;

  const { name, category, categorySlug, skills, experience, areas, reviews, image } = provider;
  const shownReviews = demoReviews.slice(0, reviews);

  return (
    <main className="bg-[#F4F4F2] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs text-[#565553]">
          <Link href="/labour" className="font-semibold text-[#202124] hover:underline">Labour</Link> /{" "}
          <Link href={`/labour/${categorySlug}`} className="font-semibold text-[#202124] hover:underline">{category}</Link> / {name}
        </p>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="space-y-5">
            {/* Profile */}
            <section className={box}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-[#D9E3E9] sm:w-40">
                  {photo(image, name, "160px")}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-extrabold text-[#292929]">{name}</h1>
                  <p className="mt-1 text-sm text-[#565553]">{category} · {experience} years experience</p>
                  <div className="mt-3">{tags(provider, true)}</div>
                  <p className="mt-3 flex items-center gap-1 text-xs text-[#565553]">
                    <MapPin size={12} className="shrink-0" aria-hidden="true" />
                    Service areas: {areas.join(", ")}, Gujranwala
                  </p>
                </div>
              </div>

              <h2 className="mt-5 text-sm font-bold text-[#202124]">About</h2>
              <p className="mt-1 text-sm text-[#565553]">
                Demo profile of a {category.toLowerCase()} professional with {experience} years of experience.
                Real description will appear here once the provider adds it.
              </p>

              <h2 className="mt-4 text-sm font-bold text-[#202124]">Main specialization and skills</h2>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-[#292929] px-2 py-1 font-semibold text-[#FDC716]">{category}</span>
                {skills.map((s) => (
                  <span key={s} className="rounded bg-[#F4F4F2] px-2 py-1 text-[#565553]">{s}</span>
                ))}
              </div>
            </section>

            {/* Previous work */}
            <section className={box}>
              <h2 className="text-sm font-bold text-[#202124]">Previous Work</h2>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#D9E3E9]">
                    {photo(null, `${name} previous work ${n}`, "200px")}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className={box}>
              <h2 className="text-sm font-bold text-[#202124]">Customer Reviews</h2>
              {shownReviews.length ? (
                <ul className="mt-2 divide-y divide-[#D9E3E9]">
                  {shownReviews.map(({ id: reviewId, name: reviewer, text }) => (
                    <li key={reviewId} className="py-3">
                      <p className="text-sm font-semibold text-[#202124]">{reviewer}</p>
                      <p className="text-sm text-[#565553]">{text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[#565553]">No reviews yet.</p>
              )}
              <p className="mt-2 text-xs text-[#565553]">Sample reviews shown for demonstration purposes.</p>
            </section>
          </div>

          {/* Actions */}
          <aside className={`${box} h-fit space-y-3`}>
            <h2 className="text-sm font-bold text-[#202124]">Hire {name}</h2>
            <p className="text-xs text-[#565553]">Post your job and this provider can send you a bid.</p>

            <button type="button" onClick={() => setNotice("Post a Job form is the next task.")} className={`${yellowBtn} h-11 w-full rounded-lg`}>
              <CalendarCheck size={16} aria-hidden="true" />
              Request Work / Post a Job
            </button>
            <button type="button" onClick={() => setNotice("Chat opens after a booking (next task).")} className={`${outlineBtn} h-11 w-full rounded-lg`}>
              <MessageCircle size={16} aria-hidden="true" />
              Contact / Chat
            </button>
            <Link href={`/labour/${categorySlug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#384452] hover:underline">
              <ArrowLeft size={14} aria-hidden="true" />
              Back to {category}
            </Link>

            {notice && <p className="rounded bg-[#FDC716]/20 px-3 py-2 text-xs text-[#202124]">{notice}</p>}
          </aside>
        </div>
      </div>
    </main>
  );
};

/* ============================================================
   CARD (grid aur list dono view isi se, card sirf is page ka)
   ============================================================ */

const ProviderCard = ({ view, ...provider }) => {
  const { id, categorySlug, name, category, skills, experience, areas, image } = provider;
  const isList = view === "list";

  return (
    <article className={`rounded-xl border border-[#D9E3E9] bg-white p-1.5 text-[#202124] shadow-sm ${isList ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>
      <div className={`relative overflow-hidden rounded-lg bg-[#D9E3E9] ${isList ? "aspect-[4/3] sm:aspect-auto sm:w-44 sm:shrink-0" : "aspect-[4/3]"}`}>
        {photo(image, name, "(min-width: 1280px) 260px, 45vw")}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
        <p className="text-xs text-[#565553]">{category} · {experience} yrs experience</p>
        <p className="line-clamp-1 text-xs text-[#565553]">Skills: {skills.join(", ")}</p>
        <p className="flex items-center gap-1 text-xs text-[#565553]">
          <MapPin size={12} className="shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{areas.join(", ")}, Gujranwala</span>
        </p>
        {tags(provider)}

        <Link href={`/labour/${categorySlug}?provider=${id}`} className={`${yellowBtn} mt-auto h-9 rounded-md text-xs ${isList ? "sm:w-36" : ""}`}>
          View Details
        </Link>
      </div>
    </article>
  );
};

/* ============================================================
   LISTING (filters ka form page ke andar hi hai)
   ============================================================ */

const ProviderListing = ({ categoryName }) => {
  const params = useSearchParams();
  const [filters, setFilters] = useState({ ...emptyFilters, category: categoryName, area: params.get("area") || "" });
  const [query, setQuery] = useState(params.get("q") || "");
  const [view, setView] = useState("grid");

  // Ek filter badlo (category badle to skill khali ho jata hai)
  const setFilter = (key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: numericKeys.includes(key) ? Number(value) : value,
      ...(key === "category" ? { skill: "" } : {}),
    }));

  const handleClear = () => {
    setFilters(emptyFilters);
    setQuery("");
  };

  // Skill dropdown: chuni hui category ki skills (category na ho to sab ki)
  const skills = [
    ...new Set(labourProviders.filter((p) => !filters.category || p.category === filters.category).flatMap((p) => p.skills)),
  ];

  // Filters ki list: sidebar isi se bantay hain
  const fields = [
    { key: "category", label: "Labour Category", options: [any("All categories"), ...labourCategories.map((c) => opt(c.name))] },
    { key: "skill", label: "Skills / Specialization", options: [any("Any skill"), ...skills.map(opt)] },
    { key: "area", label: "Location (Gujranwala)", options: [any("All Gujranwala"), ...labourAreas.map(opt)] },
    { key: "experience", label: "Experience", options: experienceOptions },
    { key: "rating", label: "Minimum Rating", options: ratingOptions },
    { key: "verification", label: "Verification Status", options: [any("Any status"), opt("Verified (demo)"), opt("Pending Verification")] },
    { key: "availability", label: "Availability", options: [any("Any availability"), opt("Available"), opt("Busy this week")] },
    { key: "sort", label: "Sort By", options: sortOptions },
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

            {fields.map(({ key, label, options }) => (
              <label key={key} className="block text-xs font-semibold text-[#565553]">
                {label}
                <select value={filters[key]} onChange={(e) => setFilter(key, e.target.value)} className={`${field} mt-1 font-normal`}>
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>
            ))}

            <button type="button" onClick={handleClear} className={`${outlineBtn} h-10 w-full rounded-lg border-[#D9E3E9] font-semibold text-[#202124]`}>
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

            <p className="mt-4 text-center text-xs text-[#565553]">Sample providers, ratings and verification shown for demonstration purposes.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

/* ============================================================
   PAGE: URL se tay hota hai listing dikhani hai ya provider detail
   ============================================================ */

const LabourContent = ({ slug }) => {
  const providerId = useSearchParams().get("provider");

  if (providerId) return <ProviderDetail id={providerId} />;

  // "all" ka matlab sab providers, warna slug se category dhundo
  const category = labourCategories.find((c) => c.slug === slug);
  if (slug !== "all" && !category) return <NotFound title="Category not found" text="This labour category does not exist." />;

  return <ProviderListing categoryName={category ? category.name : ""} />;
};

// key: category badalne par filters shuru se bante hain. useSearchParams ke liye Suspense zaroori hai
const LabourCategoryPage = () => {
  const { category } = useParams();

  return (
    <Suspense fallback={null}>
      <LabourContent key={category} slug={category} />
    </Suspense>
  );
};

export default LabourCategoryPage;