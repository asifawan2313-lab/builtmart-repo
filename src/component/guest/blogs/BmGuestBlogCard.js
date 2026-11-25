import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, User } from "lucide-react";

// Ek blog ka card. image null ho to "No image" dikhta hai.
// Read More /blogs/[slug] par le jata hai
const BmGuestBlogCard = ({ slug, title, category, excerpt, author, date, image }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
    {/* Image + category badge */}
    <div className="relative aspect-[16/10] bg-[var(--border-color)]">
      {image ? (
        // unoptimized: URL ki images ke liye next.config ki zaroorat nahi (DB ke baad hata sakti hain)
        <Image src={image} alt={title} fill unoptimized sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text,#565553)]">No image</span>
      )}
      <span className="absolute bottom-2 left-2 rounded-md bg-[var(--primary-yellow)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--charcoal-black)]">
        {category}
      </span>
    </div>

    {/* Info */}
    <div className="flex flex-1 flex-col gap-2 p-4">
      <h3 className="line-clamp-2 text-base font-bold text-[color:var(--primary-text,#202124)]">{title}</h3>
      <p className="line-clamp-2 text-xs text-[color:var(--secondary-text,#565553)]">{excerpt}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-2 text-[11px] text-[color:var(--secondary-text,#565553)]">
        <span className="flex items-center gap-1"><User size={11} aria-hidden="true" />{author}</span>
        <span className="flex items-center gap-1"><CalendarDays size={11} aria-hidden="true" />{date}</span>
      </div>

      <Link
        href={`/blogs/${slug}`}
        className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-[color:var(--hover-yellow)] hover:underline"
      >
        Read More
        <ArrowRight size={12} aria-hidden="true" />
      </Link>
    </div>
  </article>
);

export default BmGuestBlogCard;