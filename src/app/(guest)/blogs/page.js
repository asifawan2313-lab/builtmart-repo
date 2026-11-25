"use client";

import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  HardHat,
  Home,
  Layers,
  Mail,
  Recycle,
  Search,
  User,
  Wrench,
} from "lucide-react";
import BmGuestBlogCard from "../../../component/guest/blogs/BmGuestBlogCard";

/* ============================================================
   DEMO DATA (sirf UI ke liye, baad mein API se aayega)
   ============================================================ */

const categories = [
  { id: 1, name: "All Blogs", icon: null },
  { id: 2, name: "Construction Tips", icon: Wrench },
  { id: 3, name: "Material Guides", icon: Layers },
  { id: 4, name: "Budget Planning", icon: Calculator },
  { id: 5, name: "Home Design", icon: Home },
  { id: 6, name: "Labour Guides", icon: HardHat },
  { id: 7, name: "Reused Materials", icon: Recycle },
];

const blogs = [
  { id: 1, slug: "how-to-choose-the-right-cement-grade", title: "How to Choose the Right Cement Grade", category: "Material Guides", excerpt: "Learn how to select the best cement grade for your construction needs.", author: "BuildMart Team", date: "Oct 18, 2026", image: "https://picsum.photos/seed/buildmart-cement/800/500" },
  { id: 2, slug: "understanding-steel-in-construction", title: "Understanding Steel in Construction", category: "Construction Tips", excerpt: "A complete guide to use steel correctly in your building project.", author: "BuildMart Team", date: "Oct 16, 2026", image: "https://picsum.photos/seed/buildmart-steel/800/500" },
  { id: 3, slug: "reusing-materials-saves-money-and-the-planet", title: "Reusing Materials Saves Money and the Planet", category: "Reused Materials", excerpt: "Discover how reused materials can reduce costs and help the environment.", author: "BuildMart Team", date: "Oct 14, 2026", image: "https://picsum.photos/seed/buildmart-reuse/800/500" },
  { id: 4, slug: "simple-home-design-ideas-for-every-budget", title: "Modern Home Design Ideas", category: "Home Design", excerpt: "Simple and stylish home design ideas for every budget.", author: "BuildMart Team", date: "Oct 12, 2026", image: "https://picsum.photos/seed/buildmart-design/800/500" },
];

const pages = [1, 2, 3];

// Har button abhi sirf alert dikhata hai (baad mein yahan API call lagegi)
const api = (name) => () => alert(`API call: ${name}`);

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 bg-[var(--primary-yellow)] text-sm font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)]/60";
const pageBtn =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-xs font-semibold transition-colors";
const meta = "flex items-center gap-1 text-xs text-[color:var(--secondary-text,#565553)]";
const sectionHeading =
  "border-l-4 border-[var(--primary-yellow)] pl-3 text-lg font-extrabold text-[color:var(--charcoal-black)]";

/* ============================================================
   PAGE (navbar aur footer guest layout se aate hain)
   ============================================================ */

const Page = () => (
  <main className="bg-[var(--off-white,#F4F4F2)]">
    {/* ---------- Hero ---------- */}
    {/* Construction photo lagani ho to is section mein Image (fill, object-cover) laga dein */}
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--deep-charcoal)] to-[var(--industrial-blue-grey)] px-4 py-10 text-[color:var(--white-cards)] sm:px-6 sm:py-14 lg:py-16">
      <div className="absolute inset-0 bg-[var(--deep-charcoal)]/50" />

      <div className="relative mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          BuildMart <span className="text-[color:var(--primary-yellow)]">Blogs</span>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-[color:var(--border-color)] sm:text-base">
          Explore Construction Knowledge, Material Guides and Expert Insights.
        </p>

        <div role="search" className="mt-5 flex max-w-xl overflow-hidden rounded-lg bg-[var(--white-cards)] sm:mt-6">
          <div className="relative min-w-0 flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--secondary-text,#565553)] sm:left-4" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search articles"
              placeholder="Search articles..."
              className="h-11 w-full pl-9 pr-3 text-sm text-[color:var(--primary-text,#202124)] outline-none sm:h-12 sm:pl-11"
            />
          </div>
          <button type="button" onClick={api("search articles")} className={`${yellowBtn} h-11 px-4 sm:h-12 sm:px-6`}>
            Search
          </button>
        </div>
      </div>
    </section>

    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
      {/* ---------- Explore categories (mobile par side scroll) ---------- */}
      <section className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <h2 className={`${sectionHeading} shrink-0`}>Explore Categories</h2>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(({ id, name, icon: CategoryIcon }) => (
            <button
              key={id}
              type="button"
              onClick={api(`filter blogs by "${name}"`)}
              className={`inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium text-[color:var(--primary-text,#202124)] transition-colors ${
                id === 1
                  ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)]"
                  : "border-[color:var(--border-color)] bg-[var(--white-cards)] hover:border-[var(--primary-yellow)]"
              }`}
            >
              {CategoryIcon && <CategoryIcon size={14} aria-hidden="true" />}
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* ---------- Latest articles ---------- */}
      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className={sectionHeading}>Latest Articles</h2>
          <button
            type="button"
            onClick={api("view all blogs")}
            className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[color:var(--hover-yellow)] hover:underline"
          >
            View All Blogs
            <ArrowRight size={12} aria-hidden="true" />
          </button>
        </div>

        {/* Grid: blogs data ko BmGuestBlogCard se map kiya hai */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => (
            <BmGuestBlogCard key={blog.id} {...blog} />
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Blogs pagination" className="mt-6 flex items-center justify-center gap-2">
          <button type="button" aria-label="Previous page" onClick={api("previous page")} className={`${pageBtn} border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text,#202124)]`}>
            <ChevronLeft size={14} aria-hidden="true" />
          </button>

          {pages.map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === 1 ? "page" : undefined}
              onClick={api(`page ${n}`)}
              className={`${pageBtn} ${
                n === 1
                  ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                  : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text,#565553)]"
              }`}
            >
              {n}
            </button>
          ))}

          <button type="button" aria-label="Next page" onClick={api("next page")} className={`${pageBtn} border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text,#202124)]`}>
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </nav>

        <p className="mt-4 text-center text-xs text-[color:var(--secondary-text,#565553)]">Sample articles shown for demonstration purposes.</p>
      </section>
    </div>
  </main>
);

export default Page;