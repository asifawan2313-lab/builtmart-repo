"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock, Home, Lightbulb, User } from "lucide-react";

/* ============================================================
   DEMO DATA (listing wala dataset, content aur readTime ke saath. Baad mein API se aayega)
   content = blocks ki list: h2, p, ul, tip, img. "p" aur "ul" mein **bold** likh sakte hain
   ============================================================ */

const blogs = [
  {
    id: 1, slug: "modern-home-design-ideas-for-your-dream-house", title: "Modern Home Design Ideas for Your Dream House",
    category: "Home Design", author: "BuildMart Team", date: "Oct 20, 2026", readTime: "5 min read",
    excerpt: "Discover the latest modern home design ideas that combine style, functionality and affordability in Pakistan.",
    image: "https://picsum.photos/seed/buildmart-home/800/500",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "A modern home mixes good looks with everyday comfort. This is a **sample article**; the real text will come from the database." },
      { type: "h2", text: "Ideas to consider" },
      { type: "ul", items: ["**Open living areas** that let in more light.", "**Simple facades** with clean lines.", "**Smart storage** to keep rooms uncluttered."] },
      { type: "tip", text: "Decide your budget before you choose a design." },
    ],
  },
  {
    id: 2, slug: "how-to-choose-the-right-cement-grade", title: "How to Choose the Right Cement Grade",
    category: "Material Guides", author: "BuildMart Team", date: "Oct 18, 2026", readTime: "4 min read",
    excerpt: "Learn how to select the best cement grade for your construction needs.",
    image: "https://picsum.photos/seed/buildmart-cement/800/500",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Choosing the right cement grade matters for the **strength and life** of your construction. This is a sample article for demonstration." },
      { type: "h2", text: "Common Cement Grades" },
      { type: "p", text: "Cement is sold in different grades. Ask your supplier which grades are available:" },
      { type: "ul", items: ["**OPC 33 Grade**: general construction.", "**OPC 43 Grade**: heavier structures.", "**OPC 53 Grade**: high-strength and special projects."] },
      { type: "tip", text: "Confirm the grade, brand and price with the supplier before you buy." },
      { type: "h2", text: "Conclusion" },
      { type: "p", text: "Match the grade to your project and buy from a trusted supplier." },
    ],
  },
  {
    id: 3, slug: "understanding-steel-in-construction", title: "Understanding Steel in Construction",
    category: "Construction Tips", author: "BuildMart Team", date: "Oct 16, 2026", readTime: "6 min read",
    excerpt: "A complete guide to use steel correctly in your building project.",
    image: "https://picsum.photos/seed/buildmart-steel/800/500",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Steel bars give a building its **tensile strength**. This is a sample article; the real text will come from the database." },
      { type: "h2", text: "What to check" },
      { type: "ul", items: ["The **size and grade** marked on the bar.", "**Rust and bends** before you accept delivery.", "The **weight** against the bill."] },
      { type: "tip", text: "Store steel off the ground and cover it from rain." },
    ],
  },
  {
    id: 4, slug: "reusing-materials-saves-money-and-the-planet", title: "Reusing Materials Saves Money and the Planet",
    category: "Reused Materials", author: "BuildMart Team", date: "Oct 14, 2026", readTime: "4 min read",
    excerpt: "Discover how reused materials can reduce costs and help the environment.",
    image: "https://picsum.photos/seed/buildmart-reuse/800/500",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Leftover bricks, tiles and wood can find a **second use**. This is a sample article for demonstration." },
      { type: "h2", text: "Before you buy reused materials" },
      { type: "ul", items: ["Inspect the **condition** in person.", "Check the **quantity** is enough for your job.", "Ask the seller **where it came from**."] },
      { type: "tip", text: "Compare the price with new material before you decide." },
    ],
  },
  {
    id: 5, slug: "simple-home-design-ideas-for-every-budget", title: "Modern Home Design Ideas",
    category: "Home Design", author: "BuildMart Team", date: "Oct 12, 2026", readTime: "3 min read",
    excerpt: "Simple and stylish home design ideas for every budget.",
    image: "https://picsum.photos/seed/buildmart-design/800/500",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Good design does not always need a big budget. This is a **sample article** for demonstration." },
      { type: "ul", items: ["Pick a **simple colour palette**.", "Use **natural light** wherever you can.", "Spend more on what you touch daily, like doors and fittings."] },
    ],
  },
];

const yellowBtn =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--primary-yellow)] px-5 text-sm font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)]/60";
const secondary = "text-[color:var(--secondary-text,#565553)]";
const primary = "text-[color:var(--primary-text,#202124)]";

// **bold** likhe hue text ko bold dikhata hai
const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i} className="font-semibold text-[color:var(--charcoal-black)]">{part.slice(2, -2)}</strong> : part
  );

// Image ki jagah: src null ho to "No image" dikhta hai (parent mein relative aur overflow-hidden ho)
const photo = (src, alt, sizes, extra = "") =>
  src ? (
    <Image src={src} alt={alt} fill unoptimized sizes={sizes} className="object-cover" {...(extra && { priority: true })} />
  ) : (
    <span className={`absolute inset-0 flex items-center justify-center text-xs ${secondary}`}>No image</span>
  );

// Article ka ek block (heading, paragraph, list, tip ya image)
const renderBlock = (block, index) => {
  switch (block.type) {
    case "h2":
      return <h2 key={index} className="mt-8 text-2xl font-extrabold text-[color:var(--charcoal-black)]">{block.text}</h2>;
    case "p":
      return <p key={index} className={`mt-3 leading-7 ${primary}`}>{renderInline(block.text)}</p>;
    case "ul":
      return (
        <ul key={index} className="mt-3 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className={`flex items-start gap-3 leading-7 ${primary}`}>
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary-yellow)]" aria-hidden="true" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div key={index} className="mt-6 flex items-start gap-3 rounded-lg border border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)]/20 p-4">
          <Lightbulb size={22} className="mt-0.5 shrink-0 text-[color:var(--charcoal-black)]" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-[color:var(--charcoal-black)]">Pro Tip:</p>
            <p className={`text-sm ${primary}`}>{renderInline(block.text)}</p>
          </div>
        </div>
      );
    case "img":
      return (
        <div key={index} className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-[var(--border-color)]">
          {photo(block.src, block.alt || "", "(min-width: 1024px) 760px, 100vw")}
        </div>
      );
    default:
      return null;
  }
};

/* ============================================================
   PAGE (navbar aur footer guest layout se aate hain)
   ============================================================ */

const BlogDetailPage = () => {
  const { slug } = useParams();

  // Slug se blog dhoondo. Galat slug par "not found"
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <main className="bg-[var(--off-white,#F4F4F2)] px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold text-[color:var(--charcoal-black)]">Blog not found</h1>
        <p className={`mt-2 text-sm ${secondary}`}>This article does not exist.</p>
        <Link href="/blogs" className={`${yellowBtn} mt-5`}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Blogs
        </Link>
      </main>
    );
  }

  const { title, category, excerpt, author, date, readTime, image, content } = blog;

  // Related: pehle same category, phir baqi, sirf 3, current article nahi
  const related = blogs
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => Number(b.category === category) - Number(a.category === category))
    .slice(0, 3);

  return (
    <main className="bg-[var(--off-white,#F4F4F2)]">
      {/* ---------- Breadcrumb ---------- */}
      <nav aria-label="Breadcrumb" className="border-b border-[color:var(--border-color)] bg-[var(--white-cards)]">
        <ol className={`mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-xs sm:px-6 ${secondary}`}>
          <li className="flex items-center gap-1">
            <Home size={13} aria-hidden="true" />
            <Link href="/" className={`font-semibold hover:underline ${primary}`}>Home</Link>
          </li>
          <ChevronRight size={12} aria-hidden="true" />
          <li><Link href="/blogs" className={`font-semibold hover:underline ${primary}`}>Blogs</Link></li>
          <ChevronRight size={12} aria-hidden="true" />
          <li aria-current="page" className="line-clamp-1">{title}</li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1fr_320px]">
        {/* ---------- Article ---------- */}
        <article className="min-w-0">
          <span className="inline-block rounded-md bg-[var(--primary-yellow)] px-3 py-1 text-xs font-semibold text-[color:var(--charcoal-black)]">{category}</span>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-[color:var(--charcoal-black)] sm:text-4xl lg:text-5xl">{title}</h1>
          {excerpt && <p className={`mt-3 text-base sm:text-lg ${secondary}`}>{excerpt}</p>}

          <div className={`mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm ${secondary}`}>
            <span className="flex items-center gap-1.5"><User size={14} aria-hidden="true" />By {author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" />{date}</span>
            {readTime && <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden="true" />{readTime}</span>}
          </div>

          {/* Featured image */}
          <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-[var(--border-color)]">
            {photo(image, title, "(min-width: 1024px) 760px, 100vw", "priority")}
          </div>

          <div className="mt-2">{content.map(renderBlock)}</div>

          <div className="mt-8 border-t border-[color:var(--border-color)] pt-5">
            <Link href="/blogs" className={yellowBtn}>
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Blogs
            </Link>
          </div>

          <p className={`mt-4 text-xs ${secondary}`}>Sample article shown for demonstration purposes.</p>
        </article>

        {/* ---------- Related articles ---------- */}
        {related.length > 0 && (
          <aside className="h-fit rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5 lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold text-[color:var(--charcoal-black)]">Related Articles</h2>
            <span className="mt-1 block h-1 w-12 rounded bg-[var(--primary-yellow)]" aria-hidden="true" />

            <ul className="mt-4 divide-y divide-[color:var(--border-color)]">
              {related.map((item) => (
                <li key={item.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <Link href={`/blogs/${item.slug}`} className="relative block h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-[var(--border-color)]">
                    {photo(item.image, item.title, "112px")}
                  </Link>

                  <div className="min-w-0">
                    <span className="inline-block rounded bg-[var(--primary-yellow)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--charcoal-black)]">{item.category}</span>
                    <Link href={`/blogs/${item.slug}`}>
                      <h3 className={`mt-1 line-clamp-2 text-sm font-bold hover:underline ${primary}`}>{item.title}</h3>
                    </Link>
                    <Link href={`/blogs/${item.slug}`} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--hover-yellow)] hover:underline">
                      Read More
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </main>
  );
};

export default BlogDetailPage;