"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { LayoutGrid, List, MapPin, PackageSearch, Search, Star, X } from "lucide-react";
import ProductGrid from "../../../../component/materials/ProductGrid/ProductGrid";
import ProductTable from "../../../../component/materials/ProductTable/ProductTable";
import { suppliers } from "../../suppliers/supplierData";
import { categoryList, allProducts } from "../materialData";

const tabs = [
  { id: 1, key: "products", label: "All Products" },
  { id: 2, key: "suppliers", label: "All Suppliers" },
];

const views = [
  { id: 1, key: "grid", label: "Grid view", icon: LayoutGrid },
  { id: 2, key: "list", label: "List view", icon: List },
];

/* ============================================================
   LISTING (category + search + tab URL mein save hote hain)
   ============================================================ */

const Listing = () => {
  const { category } = useParams(); // e.g. steel-welding ya used-bricks
  const searchParams = useSearchParams();

  // Reused mode: category reused ho ya URL mein ?type=reused ho
  const reusedMode =
    !!categoryList.find((c) => c.slug === category)?.reused || searchParams.get("type") === "reused";

  // Shuru ki values URL se aati hain (refresh par wahi rehti hain)
  const [selected, setSelected] = useState(categoryList.some((c) => c.slug === category) ? category : "all");
  const [tab, setTab] = useState(searchParams.get("tab") === "suppliers" ? "suppliers" : "products");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [view, setView] = useState("grid");

  // URL update (page reload nahi hota, state wahi rehti hai)
  const syncUrl = (nextCategory, nextTab, nextQuery) => {
    const params = new URLSearchParams();
    if (nextTab === "suppliers") params.set("tab", "suppliers");
    if (nextQuery.trim()) params.set("q", nextQuery);
    if (reusedMode) params.set("type", "reused");
    const qs = params.toString();
    window.history.replaceState(null, "", `/materials/${nextCategory}${qs ? `?${qs}` : ""}`);
  };

  const handleCategory = (slug) => {
    setSelected(slug);
    syncUrl(slug, tab, query);
  };
  const handleTab = (key) => {
    setTab(key);
    syncUrl(selected, key, query);
  };
  const handleQuery = (value) => {
    setQuery(value);
    syncUrl(selected, tab, value);
  };

  const current = categoryList.find((c) => c.slug === selected);
  const text = query.trim().toLowerCase();

  // Sidebar: sirf usi type ki categories (new ya reused)
  const sidebarList = categoryList.filter((c) => !!c.reused === reusedMode);

  // Products: category + search (naam, category, supplier)
  const products = allProducts.filter(
    (p) =>
      (selected === "all" ? p.reused === reusedMode : p.categorySlug === selected) &&
      `${p.name} ${p.category} ${p.supplier}`.toLowerCase().includes(text)
  );

  // Suppliers: category ke tags + search (naam, location, tags)
  const stores = suppliers.filter(
    (s) =>
      (selected === "all" || (current && s.tags.some((t) => current.tags.includes(t)))) &&
      `${s.name} ${s.location} ${s.tags.join(" ")}`.toLowerCase().includes(text)
  );

  const counts = { products: products.length, suppliers: stores.length };
  const emptyBox = "flex items-center gap-2 rounded-xl border border-[#E2E4E7] bg-white p-6 text-sm text-[#45484D]";
  const allName = reusedMode ? "All Reused Materials" : "All Materials";

  return (
    <main className="min-h-[70vh] bg-[#F4F4F2] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Search */}
        <div role="search" className="relative mx-auto max-w-2xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            aria-label="Search materials"
            placeholder={tab === "products" ? "Search products, category or supplier..." : "Search supplier, location or material..."}
            className="h-12 w-full rounded-xl border border-[#E2E4E7] bg-white pl-11 pr-11 text-sm text-[#202124] outline-none placeholder:text-[#A7ADB4] focus:border-[#202124] focus:ring-1 focus:ring-[#202124]"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => handleQuery("")}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#45484D] hover:bg-[#F4F4F2]"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Category filters */}
          <aside className="h-fit rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm">
            <h2 className="text-lg font-extrabold text-[#202124]">Filters</h2>
            <p className="text-xs text-[#45484D]">Select Category</p>

            <button
              type="button"
              onClick={() => handleCategory("all")}
              aria-pressed={selected === "all"}
              className={`mt-3 w-full cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                selected === "all" ? "border-[#FDC716] bg-[#FDC716]/25 text-[#202124]" : "border-[#E2E4E7] text-[#45484D] hover:bg-[#F4F4F2]"
              }`}
            >
              All Categories
            </button>

            <ul className="mt-3 max-h-56 space-y-1 overflow-y-auto lg:max-h-[28rem]">
              {sidebarList.map(({ slug, name }) => (
                <li key={slug}>
                  <button
                    type="button"
                    onClick={() => handleCategory(slug)}
                    aria-pressed={selected === slug}
                    className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selected === slug ? "bg-[#FDC716] font-semibold text-[#202124]" : "text-[#45484D] hover:bg-[#F4F4F2]"
                    }`}
                  >
                    {name}
                    {selected === slug && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Remove ${name} filter`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategory("all");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && (e.stopPropagation(), handleCategory("all"))}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full hover:bg-[#202124]/10"
                      >
                        <X size={14} aria-hidden="true" />
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Tabs + results */}
          <section>
            <h1 className="text-xl font-extrabold text-[#202124] sm:text-2xl">{current ? current.name : allName}</h1>
            <p className="mt-1 text-xs text-[#45484D]">Sample products and suppliers shown for demonstration purposes.</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div role="tablist" className="flex gap-1 rounded-full border border-[#E2E4E7] bg-white p-1">
                {tabs.map(({ id, key, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => handleTab(key)}
                    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      tab === key ? "bg-[#202124] text-white" : "text-[#45484D] hover:bg-[#F4F4F2]"
                    }`}
                  >
                    {label}
                    <span className={`rounded-full px-2 text-xs ${tab === key ? "bg-[#FDC716] text-[#202124]" : "bg-[#E2E4E7]"}`}>
                      {counts[key]}
                    </span>
                  </button>
                ))}
              </div>

              {tab === "products" && (
                <div className="flex gap-1 rounded-lg border border-[#E2E4E7] bg-white p-1">
                  {views.map(({ id, key, label, icon: ViewIcon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-label={label}
                      aria-pressed={view === key}
                      onClick={() => setView(key)}
                      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md transition-colors ${
                        view === key ? "bg-[#FDC716] text-[#202124]" : "text-[#45484D] hover:bg-[#F4F4F2]"
                      }`}
                    >
                      <ViewIcon size={18} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* All Products */}
            {tab === "products" && (
              <div className="mt-5">
                {products.length === 0 ? (
                  <p className={emptyBox}>
                    <PackageSearch size={18} aria-hidden="true" />
                    {query ? `No products match "${query}" in this category.` : "No sample products for this category yet."}
                  </p>
                ) : view === "grid" ? (
                  <ProductGrid items={products} />
                ) : (
                  <ProductTable items={products} />
                )}
              </div>
            )}

            {/* All Suppliers */}
            {tab === "suppliers" && (
              <div className="mt-5">
                {stores.length === 0 ? (
                  <p className={emptyBox}>
                    <PackageSearch size={18} aria-hidden="true" />
                    {query ? `No suppliers match "${query}" in this category.` : "No sample suppliers for this category yet."}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {stores.map(({ id, name, slug, location, rating, reviews, tags, image }) => (
                      <article key={id} className="flex flex-col rounded-xl border border-[#E2E4E7] bg-white p-2 shadow-sm">
                        <div className="relative h-36 overflow-hidden rounded-lg bg-[#E2E4E7]">
                          <Image src={image} alt={`${name} shop (demo image)`} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw" className="object-cover" />
                        </div>

                        <div className="flex flex-1 flex-col gap-2 p-2">
                          <h3 className="truncate text-sm font-semibold text-[#202124]">{name}</h3>
                          <p className="flex items-center gap-1 text-xs text-[#45484D]">
                            <MapPin size={12} className="shrink-0" aria-hidden="true" />
                            <span className="truncate">{location}</span>
                          </p>
                          <p className="flex items-center gap-1 text-xs text-[#45484D]">
                            <Star size={12} className="fill-[#FDC716] text-[#FDC716]" aria-hidden="true" />
                            {rating} ({reviews}+ reviews, demo)
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, 4).map((t) => (
                              <span key={t} className="rounded-full border border-[#E2E4E7] bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">
                                {t}
                              </span>
                            ))}
                          </div>

                          <Link
                            href={`/suppliers/${slug}`}
                            className="mt-auto inline-flex h-9 items-center justify-center rounded-lg bg-[#FDC716] text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
                          >
                            View Shop
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

// useSearchParams ko Suspense chahiye (build error se bachne ke liye)
const CategoryPage = () => (
  <Suspense fallback={null}>
    <Listing />
  </Suspense>
);

export default CategoryPage;