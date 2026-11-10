"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  HardHat,
  Home,
  Calculator,
  Layers,
  Mail,
  Recycle,
  Search,
  User,
  Wrench,
} from "lucide-react";
import BlogGrid from "../../../component/blogs/BlogGrid/BlogGrid";
import { blogs, blogCategories, formatDate } from "./blogData";

/* ============================================================
   DEMO DATA (data blogData.js se aata hai)
   ============================================================ */

// Public site par sirf Published blogs, nayi pehle
const published = blogs
  .filter((b) => b.status === "Published")
  .sort((a, b) => b.date.localeCompare(a.date));

const featuredBlog = published.find((b) => b.featured);

const PER_PAGE = 4;

// Category buttons ke icons
const categoryIcons = {
  "Construction Tips": Wrench,
  "Material Guides": Layers,
  "Budget Planning": Calculator,
  "Home Design": Home,
  "Labour Guides": HardHat,
  "Reused Materials": Recycle,
};

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const pageBtn =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/* ============================================================
   CARD (card sirf is page ka)
   ============================================================ */

const BlogCard = ({ slug, title, author, date, excerpt, category, image }) => (
  <article className="flex flex-col overflow-hidden rounded-xl border border-[#D9E3E9] bg-white text-[#202124] shadow-sm">
    <Link href={`/blogs/${slug}`} className="relative block aspect-[16/10] bg-[#D9E3E9]">
      {/* Image ki jagah: image null ho to "No image" dikhta hai */}
      {image ? (
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 280px, 90vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
      )}
      <span className="absolute bottom-2 left-2 rounded bg-[#FDC716] px-2 py-0.5 text-[10px] font-semibold text-[#292929]">
        {category}
      </span>
    </Link>

    <div className="flex flex-1 flex-col gap-2 p-4">
      <Link href={`/blogs/${slug}`}>
        <h3 className="line-clamp-2 text-base font-bold hover:underline">{title}</h3>
      </Link>
      <p className="line-clamp-2 text-xs text-[#565553]">{excerpt}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-[#565553]">
        <span className="flex items-center gap-1"><User size={11} aria-hidden="true" />{author}</span>
        <span className="flex items-center gap-1"><CalendarDays size={11} aria-hidden="true" />{formatDate(date)}</span>
      </div>

      <Link href={`/blogs/${slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#E5B20F] hover:underline">
        Read More
        <ArrowRight size={12} aria-hidden="true" />
      </Link>
    </div>
  </article>
);

/* ============================================================
   PAGE (search, newsletter form aur filters page ke andar hi hain)
   ============================================================ */

const BlogsPage = () => {
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState(""); // Search dabane par lagta hai
  const [category, setCategory] = useState("All Blogs");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [subscribeNote, setSubscribeNote] = useState({ error: "", ok: "" });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(query.trim());
    setPage(1);
  };

  const handleCategory = (name) => {
    setCategory(name);
    setPage(1);
  };

  // Sab filters hata do ("View All Blogs")
  const handleViewAll = () => {
    setQuery("");
    setSearchText("");
    setCategory("All Blogs");
    setPage(1);
  };

  // Newsletter (simulated: kuch bhej nahi jata)
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeNote({ error: "Please enter a valid email address.", ok: "" });
      return;
    }
    setSubscribeNote({ error: "", ok: "Subscribed (demo). No email was saved." });
    setEmail("");
  };

  const text = searchText.toLowerCase();
  const matches = published.filter(
    (b) =>
      (category === "All Blogs" || b.category === category) &&
      (!text || `${b.title} ${b.author} ${b.category} ${b.excerpt}`.toLowerCase().includes(text))
  );

  // Featured article sirf tab dikhta hai jab koi filter ya search na lagi ho
  const showFeatured = featuredBlog && category === "All Blogs" && !text;
  const gridBlogs = showFeatured ? matches.filter((b) => b.id !== featuredBlog.id) : matches;

  const totalPages = Math.max(1, Math.ceil(gridBlogs.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageBlogs = gridBlogs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <main className="bg-[#F4F4F2]">
      {/* ---------- Hero ---------- */}
      {/* Construction photo lagani ho to is section mein Image (fill, object-cover) laga dein */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#25272A] to-[#384452] px-4 py-14 text-white sm:px-6 sm:py-16">
        <div className="absolute inset-0 bg-[#25272A]/50" />

        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            BuildMart <span className="text-[#FDC716]">Blogs</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#D9E3E9] sm:text-base">
            Explore Construction Knowledge, Material Guides and Expert Insights.
          </p>

          <form role="search" onSubmit={handleSearch} className="mt-6 flex max-w-xl overflow-hidden rounded-lg bg-white">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search articles"
                placeholder="Search articles..."
                className="h-12 w-full pl-11 pr-3 text-sm text-[#202124] outline-none"
              />
            </div>
            <button type="submit" className={`${yellowBtn} h-12 rounded-none px-6`}>
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        {/* ---------- Featured article ---------- */}
        {showFeatured && (
          <section className="grid gap-5 rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm md:grid-cols-[1.1fr_1fr] md:p-5">
            <Link href={`/blogs/${featuredBlog.slug}`} className="relative block aspect-[16/9] overflow-hidden rounded-lg bg-[#D9E3E9]">
              {featuredBlog.image ? (
                <Image src={featuredBlog.image} alt={featuredBlog.title} fill sizes="(min-width: 768px) 560px, 90vw" className="object-cover" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-sm text-[#565553]">No image</span>
              )}
            </Link>

            <div className="flex flex-col justify-center gap-3">
              <span className="w-fit rounded-full bg-[#FDC716] px-3 py-1 text-xs font-semibold text-[#292929]">
                {featuredBlog.category}
              </span>
              <h2 className="text-2xl font-extrabold leading-tight text-[#292929] sm:text-3xl">{featuredBlog.title}</h2>
              <p className="text-sm text-[#565553]">{featuredBlog.excerpt}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#565553]">
                <span className="flex items-center gap-1"><User size={12} aria-hidden="true" />By {featuredBlog.author}</span>
                <span className="flex items-center gap-1"><CalendarDays size={12} aria-hidden="true" />{formatDate(featuredBlog.date)}</span>
                <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{featuredBlog.readTime}</span>
              </div>

              <Link href={`/blogs/${featuredBlog.slug}`} className={`${yellowBtn} mt-1 h-11 w-fit rounded-lg px-6`}>
                Read Article
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {/* ---------- Explore categories ---------- */}
        <section className="flex flex-wrap items-center gap-2">
          <h2 className="mr-2 border-l-4 border-[#FDC716] pl-3 text-lg font-extrabold text-[#292929]">Explore Categories</h2>

          {["All Blogs", ...blogCategories].map((name) => {
            const CategoryIcon = categoryIcons[name];
            const isActive = name === category;

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleCategory(name)}
                aria-pressed={isActive}
                className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium text-[#202124] transition-colors ${
                  isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
                }`}
              >
                {CategoryIcon && <CategoryIcon size={14} aria-hidden="true" />}
                {name}
              </button>
            );
          })}
        </section>

        {/* ---------- Latest articles ---------- */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="border-l-4 border-[#FDC716] pl-3 text-lg font-extrabold text-[#292929]">
              {category === "All Blogs" && !text ? "Latest Articles" : `${gridBlogs.length} articles found`}
            </h2>
            <button type="button" onClick={handleViewAll} className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#E5B20F] hover:underline">
              View All Blogs
              <ArrowRight size={12} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4">
            {pageBlogs.length ? (
              <BlogGrid items={pageBlogs} Card={BlogCard} />
            ) : (
              <p className="rounded-xl border border-[#D9E3E9] bg-white px-4 py-10 text-center text-sm text-[#565553]">
                No articles found. Try a different word or category.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Blogs pagination" className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className={`${pageBtn} border-[#D9E3E9] bg-white text-[#202124] hover:bg-[#F4F4F2]`}
              >
                <ChevronLeft size={14} aria-hidden="true" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-current={n === currentPage ? "page" : undefined}
                  onClick={() => setPage(n)}
                  className={`${pageBtn} ${
                    n === currentPage ? "border-[#FDC716] bg-[#FDC716] text-[#292929]" : "border-[#D9E3E9] bg-white text-[#565553] hover:bg-[#F4F4F2]"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className={`${pageBtn} border-[#D9E3E9] bg-white text-[#202124] hover:bg-[#F4F4F2]`}
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </nav>
          )}

          <p className="mt-4 text-center text-xs text-[#565553]">Sample articles shown for demonstration purposes.</p>
        </section>

        {/* ---------- Newsletter (form page ke andar hi hai) ---------- */}
        <section className="flex flex-col gap-4 rounded-xl bg-[#292929] p-5 text-white sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FDC716] text-[#292929]">
              <Mail size={24} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold">Stay Updated with BuildMart</h2>
              <p className="text-xs text-[#D9E3E9]">Get the latest construction tips, material guides and industry news.</p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:max-w-md">
            <div className="flex overflow-hidden rounded-lg bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                placeholder="Enter your email address"
                className="h-11 min-w-0 flex-1 px-3 text-sm text-[#202124] outline-none"
              />
              <button type="submit" className={`${yellowBtn} h-11 rounded-none px-5`}>
                Subscribe
              </button>
            </div>
            {subscribeNote.error && <p role="alert" className="mt-2 text-xs text-red-300">{subscribeNote.error}</p>}
            {subscribeNote.ok && <p role="status" className="mt-2 text-xs text-green-300">{subscribeNote.ok}</p>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default BlogsPage;