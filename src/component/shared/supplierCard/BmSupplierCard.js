import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldAlert, ShieldCheck, Star } from "lucide-react";

// slug = supplier ka slug (View Shop /suppliers/[slug] par le jata hai)
// is_verified = true/false. image null ho to "No image" dikhta hai.
// Avatar ke initials shop ke naam ke pehle 2 lafzon se bante hain (AB, CM ...)


const BmSupplierCard = ({ name, slug, image, location, rating, reviews, is_verified, categories = [] }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
      {/* Shop image + verification badge */}
      <div className="relative aspect-[2/1] bg-[var(--border-color)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
            No image
          </span>
        )}

        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-[var(--white-cards)] px-2 py-0.5 text-[10px] text-[color:var(--primary-text)] shadow-sm">
          {is_verified ? (
            <ShieldCheck size={11} className="text-[color:var(--hover-yellow)]" />
          ) : (
            <ShieldAlert size={11} className="text-[color:var(--secondary-text)]" />
          )}
          {is_verified ? "Verified" : "Unverified"}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex items-start gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal-black)] text-[11px] font-bold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-xs font-bold text-[color:var(--primary-text)]">
              {name}
            </h3>
            <p className="flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)]">
              <MapPin size={10} aria-hidden="true" />
              {location}, Gujranwala
            </p>
            <p className="flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)]">
              <Star size={10} className="fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]" />
              <span className="font-semibold text-[color:var(--primary-text)]">{rating}</span>
              ({reviews} reviews)
            </p>
          </div>
        </div>

        {/* Category chips (4 tak, baqi +N) */}
        <div className="flex flex-1 flex-wrap content-start gap-1.5">
          {categories.slice(0, 4).map((category) => (
            <span
              key={category}
              className="rounded-full border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-2 py-0.5 text-[10px] text-[color:var(--secondary-text)]"
            >
              {category}
            </span>
          ))}
          {categories.length > 4 && (
            <span className="rounded-full border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-2 py-0.5 text-[10px] text-[color:var(--secondary-text)]">
              +{categories.length - 4}
            </span>
          )}
        </div>

        <Link
          href={`/suppliers/${slug}`}
          className="inline-flex w-full items-center justify-center gap-1 rounded-md bg-[var(--primary-yellow)] px-3 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)]"
        >
          View Shop
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default BmSupplierCard;