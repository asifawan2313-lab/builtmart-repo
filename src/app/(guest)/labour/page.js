






// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { MapPin, Search, Star } from "lucide-react";
// import LabourGrid from "../../../component/labour/LabourGrid/LabourGrid";
// import { labourCategories, labourAreas, labourProviders } from "./labourData";

// /* ============================================================
//    DEMO DATA (data labourData.js se aata hai)
//    ============================================================ */

// // Recently Viewed abhi demo hai: pehle 4 providers. Detail page ke baad asli "dekhe hue" aayenge
// const recentlyViewed = labourProviders.slice(0, 4);
// const trendingProviders = labourProviders.filter((p) => p.trending);

// // Har category card listing page par jaye
// const categoryLinks = labourCategories.map((c) => ({
//   ...c,
//   id: c.slug,
//   href: `/labour/listing?category=${c.slug}`,
// }));

// // Ek screen par kitne columns: categories 3 (3 rows), providers 4 (1 row)
// const categoryCols =
//   "auto-cols-[100%] sm:auto-cols-[calc((100%-0.75rem)/2)] lg:auto-cols-[calc((100%-1.5rem)/3)]";
// const providerCols =
//   "auto-cols-[calc((100%-0.75rem)/2)] sm:auto-cols-[calc((100%-1.5rem)/3)] lg:auto-cols-[calc((100%-2.25rem)/4)]";

// // Click (focus) par border black hoti hai
// const field =
//   "h-12 w-full rounded-lg border border-[#D9E3E9] bg-white text-sm text-[#202124] outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black";

// // Yellow button
// const yellowBtn =
//   "inline-flex cursor-pointer items-center justify-center border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

// /* ============================================================
//    1. HERO (search form page ke andar hi hai)
//    ============================================================ */

// const Hero = () => {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [area, setArea] = useState("");

//   // Search dabane par filtered listing page khulta hai
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     if (query.trim()) params.set("q", query.trim());
//     if (area) params.set("area", area);
//     router.push(`/labour/listing?${params.toString()}`);
//   };

//   return (
//     // Photo lagani ho to is section mein Image (fill, object-cover) laga dein
//     <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#25272A] to-[#384452] px-4 py-14 text-white sm:px-6 md:min-h-[380px]">
//       <div className="absolute inset-0 bg-[#25272A]/60" />

//       <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
//         <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
//           Find Skilled Labour for Your Construction Work
//         </h1>
//         <p className="mt-3 max-w-xl text-sm text-[#D9E3E9] sm:text-base">
//           Find masons, plumbers, electricians and more in Gujranwala, and hire the right hands for your project.
//         </p>

//         <form
//           role="search"
//           onSubmit={handleSearch}
//           className="mt-8 flex w-full flex-col gap-2 rounded-xl bg-white/85 p-2 shadow-xl backdrop-blur md:flex-row"
//         >
//           <div className="relative flex-1">
//             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
//             <input
//               type="text"
//               aria-label="Search labour"
//               placeholder="Labour name, skill or category"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className={`${field} pl-11 pr-14`}
//             />
//             <button
//               type="submit"
//               aria-label="Search"
//               className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md bg-[#FDC716] text-[#292929] transition-colors hover:bg-[#E5B20F]"
//             >
//               <Search size={18} />
//             </button>
//           </div>

//           <label className="relative md:w-52">
//             <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
//             <select
//               aria-label="Area"
//               value={area}
//               onChange={(e) => setArea(e.target.value)}
//               className={`${field} pl-9 pr-2`}
//             >
//               <option value="">All Gujranwala</option>
//               {labourAreas.map((a) => (
//                 <option key={a}>{a}</option>
//               ))}
//             </select>
//           </label>
//         </form>
//       </div>
//     </section>
//   );
// };

// /* ============================================================
//    2. ALL CATEGORIES (3 columns x 3 rows, card sirf is page ka)
//    ============================================================ */

// const CategoryCard = ({ name, image, href }) => (
//   <Link
//     href={href}
//     className="flex items-center gap-4 rounded-xl border border-[#D9E3E9] bg-white px-4 py-3 text-sm font-medium text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]"
//   >
//     {/* Image ki jagah: image null ho to khali box dikhta hai */}
//     <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#D9E3E9]">
//       {image && <Image src={image} alt={name} fill sizes="48px" className="object-cover" />}
//     </span>
//     <span className="line-clamp-2">{name}</span>
//   </Link>
// );

// const CategorySection = () => {
//   const [query, setQuery] = useState("");

//   const filtered = categoryLinks.filter((c) =>
//     c.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <section className="bg-[#F4F4F2] px-4 py-12 sm:px-6">
//       <div className="mx-auto max-w-5xl">
//         <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">All Categories</h2>

//         {/* Search */}
//         <div className="relative mx-auto mt-5 max-w-md">
//           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
//           <input
//             type="text"
//             aria-label="Search categories"
//             placeholder="Search categories..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="h-11 w-full rounded-full border-2 border-[#292929] bg-white pl-11 pr-4 text-sm text-[#202124] outline-none placeholder:text-[#565553]/60 focus:ring-1 focus:ring-[#292929]"
//           />
//         </div>

//         {filtered.length ? (
//           // key badalne se search ke baad grid shuru se khulta hai
//           <LabourGrid key={query} items={filtered} Card={CategoryCard} cols={categoryCols} rows="grid-rows-3" label="categories" />
//         ) : (
//           <p className="mt-8 text-center text-sm text-[#565553]">No category found. Try a different word.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// /* ============================================================
//    3. RECENTLY VIEWED / TRENDING SKILLED LABOUR
//    ============================================================ */

// const ProviderCard = ({ id, name, category, experience, areas, verification, rating, image }) => (
//   <article className="flex flex-col rounded-xl border border-[#D9E3E9] bg-white p-1.5 text-[#202124] shadow-sm">
//     {/* Image ki jagah: image null ho to "No image" dikhta hai */}
//     <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#D9E3E9]">
//       {image ? (
//         <Image src={image} alt={name} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover" />
//       ) : (
//         <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
//       )}
//     </div>

//     <div className="flex flex-1 flex-col gap-1 p-2">
//       <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
//       <p className="line-clamp-1 text-xs text-[#565553]">{category} · {experience} yrs</p>

//       <p className="flex items-center gap-1 text-[11px] text-[#565553]">
//         <MapPin size={11} className="shrink-0" aria-hidden="true" />
//         <span className="line-clamp-1">{areas.join(", ")}, Gujranwala</span>
//       </p>

//       <div className="flex flex-wrap gap-1 text-[11px]">
//         <span
//           className={`rounded px-2 py-0.5 ${
//             verification.startsWith("Verified") ? "bg-green-100 text-green-800" : "bg-[#FDC716]/30 text-[#202124]"
//           }`}
//         >
//           {verification}
//         </span>
//         <span className="flex items-center gap-1 rounded bg-[#F4F4F2] px-2 py-0.5 text-[#565553]">
//           <Star size={10} aria-hidden="true" />
//           {rating ?? "No rating yet"}
//         </span>
//       </div>

//       <Link href={`/labour/provider/${id}`} className={`${yellowBtn} mt-2 h-8 rounded-md text-xs`}>
//         View Profile
//       </Link>
//     </div>
//   </article>
// );

// const ProviderSection = ({ title, providers, label }) => (
//   <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
//     <div className="mx-auto max-w-5xl">
//       <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">{title}</h2>
//       <p className="mt-2 text-center text-xs text-[#565553]">
//         Sample providers, ratings and verification shown for demonstration purposes.
//       </p>

//       <LabourGrid items={providers} Card={ProviderCard} cols={providerCols} rows="grid-rows-1" label={label} />
//     </div>
//   </section>
// );

// /* ============================================================
//    PAGE
//    ============================================================ */

// const LabourPage = () => (
//   <main>
//     <Hero />
//     <CategorySection />
//     <ProviderSection title="Recently Viewed Skilled Labour" providers={recentlyViewed} label="recently viewed labour" />
//     <ProviderSection title="Trending Skilled Labour" providers={trendingProviders} label="trending labour" />
//   </main>
// );

// export default LabourPage;



"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Search, Star } from "lucide-react";
import LabourGrid from "../../../component/labour/LabourGrid/LabourGrid";
import { labourCategories, labourAreas, labourProviders } from "./labourData";

/* ============================================================
   DEMO DATA (data labourData.js se aata hai)
   ============================================================ */

// Recently Viewed abhi demo hai: pehle 4 providers. Asli "dekhe hue" baad mein aayenge
const recentlyViewed = labourProviders.slice(0, 4);
const trendingProviders = labourProviders.filter((p) => p.trending);

// Har category card us category ki listing par jaye
const categoryLinks = labourCategories.map((c) => ({
  ...c,
  id: c.slug,
  href: `/labour/${c.slug}`,
}));

// Ek screen par kitne columns: categories 3 (3 rows), providers 4 (1 row)
const categoryCols =
  "auto-cols-[100%] sm:auto-cols-[calc((100%-0.75rem)/2)] lg:auto-cols-[calc((100%-1.5rem)/3)]";
const providerCols =
  "auto-cols-[calc((100%-0.75rem)/2)] sm:auto-cols-[calc((100%-1.5rem)/3)] lg:auto-cols-[calc((100%-2.25rem)/4)]";

// Click (focus) par border black hoti hai
const field =
  "h-12 w-full rounded-lg border border-[#D9E3E9] bg-white text-sm text-[#202124] outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black";

// Yellow button
const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

/* ============================================================
   1. HERO (search form page ke andar hi hai)
   ============================================================ */

const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");

  // Search dabane par filtered listing (/labour/all) khulti hai
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (area) params.set("area", area);
    router.push(`/labour/all?${params.toString()}`);
  };

  return (
    // Photo lagani ho to is section mein Image (fill, object-cover) laga dein
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#25272A] to-[#384452] px-4 py-14 text-white sm:px-6 md:min-h-[380px]">
      <div className="absolute inset-0 bg-[#25272A]/60" />

      <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Find Skilled Labour for Your Construction Work
        </h1>
        <p className="mt-3 max-w-xl text-sm text-[#D9E3E9] sm:text-base">
          Find masons, plumbers, electricians and more in Gujranwala, and hire the right hands for your project.
        </p>

        <form
          role="search"
          onSubmit={handleSearch}
          className="mt-8 flex w-full flex-col gap-2 rounded-xl bg-white/85 p-2 shadow-xl backdrop-blur md:flex-row"
        >
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
            <input
              type="text"
              aria-label="Search labour"
              placeholder="Labour name, skill or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`${field} pl-11 pr-14`}
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md bg-[#FDC716] text-[#292929] transition-colors hover:bg-[#E5B20F]"
            >
              <Search size={18} />
            </button>
          </div>

          <label className="relative md:w-52">
            <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
            <select
              aria-label="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={`${field} pl-9 pr-2`}
            >
              <option value="">All Gujranwala</option>
              {labourAreas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
        </form>
      </div>
    </section>
  );
};

/* ============================================================
   2. ALL CATEGORIES (3 columns x 3 rows, card sirf is page ka)
   ============================================================ */

const CategoryCard = ({ name, image, href }) => (
  <Link
    href={href}
    className="flex items-center gap-4 rounded-xl border border-[#D9E3E9] bg-white px-4 py-3 text-sm font-medium text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]"
  >
    {/* Image ki jagah: image null ho to khali box dikhta hai */}
    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#D9E3E9]">
      {image && <Image src={image} alt={name} fill sizes="48px" className="object-cover" />}
    </span>
    <span className="line-clamp-2">{name}</span>
  </Link>
);

const CategorySection = () => {
  const [query, setQuery] = useState("");

  const filtered = categoryLinks.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="bg-[#F4F4F2] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">All Categories</h2>

        {/* Search */}
        <div className="relative mx-auto mt-5 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search categories"
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-full border-2 border-[#292929] bg-white pl-11 pr-4 text-sm text-[#202124] outline-none placeholder:text-[#565553]/60 focus:ring-1 focus:ring-[#292929]"
          />
        </div>

        {filtered.length ? (
          // key badalne se search ke baad grid shuru se khulta hai
          <LabourGrid key={query} items={filtered} Card={CategoryCard} cols={categoryCols} rows="grid-rows-3" label="categories" />
        ) : (
          <p className="mt-8 text-center text-sm text-[#565553]">No category found. Try a different word.</p>
        )}
      </div>
    </section>
  );
};

/* ============================================================
   3. RECENTLY VIEWED / TRENDING SKILLED LABOUR
   ============================================================ */

const ProviderCard = ({ id, categorySlug, name, category, experience, areas, verification, rating, image }) => (
  <article className="flex flex-col rounded-xl border border-[#D9E3E9] bg-white p-1.5 text-[#202124] shadow-sm">
    {/* Image ki jagah: image null ho to "No image" dikhta hai */}
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#D9E3E9]">
      {image ? (
        <Image src={image} alt={name} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
      )}
    </div>

    <div className="flex flex-1 flex-col gap-1 p-2">
      <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
      <p className="line-clamp-1 text-xs text-[#565553]">{category} · {experience} yrs</p>

      <p className="flex items-center gap-1 text-[11px] text-[#565553]">
        <MapPin size={11} className="shrink-0" aria-hidden="true" />
        <span className="line-clamp-1">{areas.join(", ")}, Gujranwala</span>
      </p>

      <div className="flex flex-wrap gap-1 text-[11px]">
        <span
          className={`rounded px-2 py-0.5 ${
            verification.startsWith("Verified") ? "bg-green-100 text-green-800" : "bg-[#FDC716]/30 text-[#202124]"
          }`}
        >
          {verification}
        </span>
        <span className="flex items-center gap-1 rounded bg-[#F4F4F2] px-2 py-0.5 text-[#565553]">
          <Star size={10} aria-hidden="true" />
          {rating ?? "No rating yet"}
        </span>
      </div>

      <Link href={`/labour/${categorySlug}?provider=${id}`} className={`${yellowBtn} mt-2 h-8 rounded-md text-xs`}>
        View Profile
      </Link>
    </div>
  </article>
);

const ProviderSection = ({ title, providers, label }) => (
  <section className="bg-[#F4F4F2] px-4 pb-12 sm:px-6">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-center text-2xl font-extrabold text-[#202124] sm:text-3xl">{title}</h2>
      <p className="mt-2 text-center text-xs text-[#565553]">
        Sample providers, ratings and verification shown for demonstration purposes.
      </p>

      <LabourGrid items={providers} Card={ProviderCard} cols={providerCols} rows="grid-rows-1" label={label} />
    </div>
  </section>
);

/* ============================================================
   PAGE
   ============================================================ */

const LabourPage = () => (
  <main>
    <Hero />
    <CategorySection />
    <ProviderSection title="Recently Viewed Skilled Labour" providers={recentlyViewed} label="recently viewed labour" />
    <ProviderSection title="Trending Skilled Labour" providers={trendingProviders} label="trending labour" />
  </main>
);

export default LabourPage;