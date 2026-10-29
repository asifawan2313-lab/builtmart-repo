import Image from "next/image";
import Link from "next/link";

const MAX_TAGS = 4; // is se zyada tags "+N" mein badal jate hain

// Chhota icon helper: andar sirf SVG shape dalni hoti hai
export function Icon({ children, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export default function SupplierCard({ supplier, index = 0 }) {
  const { name, slug, initials, location, rating, reviews, description, tags, image, verified } = supplier;
  const extra = tags.length - MAX_TAGS;

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className="group flex animate-[bmCardIn_0.6s_ease-out_both] flex-col rounded-xl border border-[#E2E4E7] bg-white p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:animate-none"
    >
      {/* Shop image + verification badge */}
      <div className="relative h-36 overflow-hidden rounded-lg bg-[#E2E4E7]">
        <Image
          src={image}
          alt={`${name} shop (demo image)`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className={`absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow ${verified ? "text-blue-600" : "text-[#45484D]"}`}>
          <Icon className="h-3.5 w-3.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            {verified && <path d="m9 12 2 2 4-4" />}
          </Icon>
          {verified ? "Verified" : "Unverified"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        {/* Avatar + name + location + rating */}
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#202124] text-sm font-bold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#202124]">{name}</h3>
            <p className="flex items-center gap-1 text-xs text-[#45484D]">
              <Icon className="h-3 w-3 shrink-0">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </Icon>
              {location}
            </p>
            <p className="flex items-center gap-1 text-xs text-[#45484D]">
              <span className="text-yellow-500">★</span>
              <b>{rating}</b> ({reviews}+ reviews)
            </p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-[#45484D]">{description}</p>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, MAX_TAGS).map((tag) => (
            <span key={tag} className="rounded-full bg-[#F4F4F2] px-3 py-1 text-xs text-[#45484D]">
              {tag}
            </span>
          ))}
          {extra > 0 && <span className="rounded-full bg-[#F4F4F2] px-3 py-1 text-xs text-[#45484D]">+{extra}</span>}
        </div>

        {/* View Shop: opens this supplier's shop page */}
        <Link
          href={`/supplier/${slug}`}
          className="group/btn mt-auto flex items-center justify-between rounded-lg bg-[#202124] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#45484D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]"
        >
          <span className="flex items-center gap-2">
            <Icon>
              <path d="M3 9l1-5h16l1 5M4 9v11h16V9M9 20v-6h6v6" />
            </Icon>
            View Shop
          </span>
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </Icon>
        </Link>
      </div>
    </article>
  );
}