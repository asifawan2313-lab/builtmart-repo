
import Image from "next/image";
import SupplierLogo from "./SupplierLogo";

{/*import Image from "next/image";
import SupplierLogo from "./SupplierLogo";*/}

const MAX_TAGS = 4; // is se zyada tags "+N" mein badal jate hain

// Tag style: hover par border + rang yellow mein badalta hai
const tag =
  "cursor-default rounded-full border border-[#D9E3E9] bg-[#F4F4F2] px-3 py-1 text-xs text-[#565553] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffc61a] hover:bg-[#ffc61a]/15 hover:text-[#202124]";

// Chhota icon helper: andar sirf SVG shape dalni hoti hai
export function Icon({ children, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export default function SupplierCard({ supplier, index = 0 }) {
  const { name, initials, location, rating, reviews, tags, image, verified } = supplier;
  const extra = tags.length - MAX_TAGS;

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className="group flex animate-[bmCardIn_0.6s_ease-out_both] flex-col rounded-xl border border-[#D9E3E9] bg-white p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc61a] hover:shadow-xl motion-reduce:animate-none"
    >
      {/* Shop image + verification badge */}
      <div className="relative h-36 overflow-hidden rounded-lg bg-[#D9E3E9]">
        <Image
          src={image}
          alt={`${name} shop (demo image)`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className={`absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow ${verified ? "text-blue-600" : "text-[#565553]"}`}>
          <Icon className="h-3.5 w-3.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            {verified && <path d="m9 12 2 2 4-4" />}
          </Icon>
          {verified ? "Verified" : "Unverified"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        {/* Logo + name + location + rating */}
        <div className="flex items-center gap-3">
          <SupplierLogo initials={initials} index={index} />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#202124]">{name}</h3>
            <p className="flex items-center gap-1 text-xs text-[#565553]">
              <Icon className="h-3 w-3 shrink-0">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </Icon>
              {location}
            </p>
            <p className="flex items-center gap-1 text-xs text-[#565553]">
              <span className="text-[#ffc61a]">★</span>
              <b className="text-[#202124]">{rating}</b> ({reviews}+ reviews)
            </p>
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, MAX_TAGS).map((t) => (
            <span key={t} className={tag}>
              {t}
            </span>
          ))}
          {extra > 0 && <span className={tag}>+{extra}</span>}
        </div>

        {/* View Shop: patla yellow button (abhi sirf dikhne ke liye) */}
        <button
          type="button"
          className="group/btn mt-auto flex h-9 items-center justify-center gap-2 rounded-md border border-[#ffc61a] bg-[#ffc61a] text-sm font-semibold text-[#202124] transition-all duration-300 hover:bg-[#25272A] hover:text-[#ffc61a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60"
        >
          View Shop
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </Icon>
        </button>
      </div>
    </article>
  );
}