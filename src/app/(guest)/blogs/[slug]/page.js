"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock, Home, Lightbulb, User } from "lucide-react";
import { blogs, formatDate } from "../blogData";

/* ============================================================
   DEMO DATA (data blogData.js se aata hai)
   ============================================================ */

// Public site par sirf Published blogs
const published = blogs.filter((b) => b.status === "Published");

const yellowBtn =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#FDC716] bg-[#FDC716] px-5 text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

// **bold** likhe hue text ko bold dikhata hai
const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i} className="font-semibold text-[#292929]">{part.slice(2, -2)}</strong> : part
  );

// Article ka ek block (heading, paragraph, list, tip ya image)
const renderBlock = (block, index) => {
  switch (block.type) {
    case "h2":
      return <h2 key={index} className="mt-8 text-2xl font-extrabold text-[#292929]">{block.text}</h2>;
    case "p":
      return <p key={index} className="mt-3 leading-7 text-[#202124]">{renderInline(block.text)}</p>;
    case "ul":
      return (
        <ul key={index} className="mt-3 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 leading-7 text-[#202124]">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#FDC716]" aria-hidden="true" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div key={index} className="mt-6 flex items-start gap-3 rounded-lg border border-[#FDC716] bg-[#FDC716]/20 p-4">
          <Lightbulb size={22} className="mt-0.5 shrink-0 text-[#292929]" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-[#292929]">Pro Tip:</p>
            <p className="text-sm text-[#202124]">{renderInline(block.text)}</p>
          </div>
        </div>
      );
    case "img":
      return (
        <div key={index} className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-[#D9E3E9]">
          {block.src ? (
            <Image src={block.src} alt={block.alt || ""} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-sm text-[#565553]">No image</span>
          )}
        </div>
      );
    default:
      return null;
  }
};

/* ============================================================
   PAGE
   ============================================================ */

const BlogDetailPage = () => {
  const { slug } = useParams();

  // Draft ya galat slug par "not found"
  const blog = published.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <main className="bg-[#F4F4F2] px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold text-[#292929]">Blog not found</h1>
        <p className="mt-2 text-sm text-[#565553]">This article does not exist or is not published.</p>
        <Link href="/blogs" className={`${yellowBtn} mt-5`}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Blogs
        </Link>
      </main>
    );
  }

  const { title, category, excerpt, author, date, readTime, image, content } = blog;

  // Related: pehle same category, phir baqi, nayi pehle, sirf 3, current article nahi
  const related = published
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => Number(b.category === category) - Number(a.category === category) || b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <main className="bg-[#F4F4F2]">
      {/* ---------- Breadcrumb ---------- */}
      <nav aria-label="Breadcrumb" className="border-b border-[#D9E3E9] bg-white">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#565553] sm:px-6">
          <li className="flex items-center gap-1">
            <Home size={13} aria-hidden="true" />
            <Link href="/" className="font-semibold text-[#202124] hover:underline">Home</Link>
          </li>
          <ChevronRight size={12} aria-hidden="true" />
          <li><Link href="/blogs" className="font-semibold text-[#202124] hover:underline">Blogs</Link></li>
          <ChevronRight size={12} aria-hidden="true" />
          <li aria-current="page" className="line-clamp-1">{title}</li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px]">
        {/* ---------- Article ---------- */}
        <article className="min-w-0">
          <span className="inline-block rounded-md bg-[#FDC716] px-3 py-1 text-xs font-semibold text-[#292929]">{category}</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#292929] sm:text-5xl">{title}</h1>
          {excerpt && <p className="mt-3 text-base text-[#565553] sm:text-lg">{excerpt}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#565553]">
            <span className="flex items-center gap-1.5"><User size={14} aria-hidden="true" />By {author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true" />{formatDate(date)}</span>
            {readTime && <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden="true" />{readTime}</span>}
          </div>

          {/* Featured image: image null ho to "No image" dikhta hai */}
          <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-[#D9E3E9]">
            {image ? (
              <Image src={image} alt={title} fill sizes="(min-width: 1024px) 760px, 100vw" priority className="object-cover" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-sm text-[#565553]">No image</span>
            )}
          </div>

          <div className="mt-2">{content.map(renderBlock)}</div>

          <div className="mt-8 border-t border-[#D9E3E9] pt-5">
            <Link href="/blogs" className={yellowBtn}>
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Blogs
            </Link>
          </div>

          <p className="mt-4 text-xs text-[#565553]">Sample article shown for demonstration purposes.</p>
        </article>

        {/* ---------- Related articles ---------- */}
        {related.length > 0 && (
          <aside className="h-fit rounded-xl border border-[#D9E3E9] bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold text-[#292929]">Related Articles</h2>
            <span className="mt-1 block h-1 w-12 rounded bg-[#FDC716]" aria-hidden="true" />

            <ul className="mt-4 divide-y divide-[#D9E3E9]">
              {related.map((item) => (
                <li key={item.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <Link href={`/blogs/${item.slug}`} className="relative block h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-[#D9E3E9]">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill sizes="112px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#565553]">No image</span>
                    )}
                  </Link>

                  <div className="min-w-0">
                    <span className="inline-block rounded bg-[#FDC716] px-2 py-0.5 text-[10px] font-semibold text-[#292929]">{item.category}</span>
                    <Link href={`/blogs/${item.slug}`}>
                      <h3 className="mt-1 line-clamp-2 text-sm font-bold text-[#202124] hover:underline">{item.title}</h3>
                    </Link>
                    <Link href={`/blogs/${item.slug}`} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#E5B20F] hover:underline">
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