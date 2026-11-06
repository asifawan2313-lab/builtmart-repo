import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Shield, ShieldCheck } from "lucide-react";

const MAX_TAGS = 4; // is se zyada tags "+N" mein badal jate hain

// Tag style: hover par border + rang yellow mein badalta hai
const tag =
  "cursor-default rounded-full border border-[#D9E3E9] bg-[#F4F4F2] px-3 py-1 text-xs text-[#565553] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffc61a] hover:bg-[#ffc61a]/15 hover:text-[#202124]";

// Attention-grabbing logo: ghoomti ring + ripple lehren + glow + chamak
const SupplierLogo = ({ initials, index = 0 }) => {
  const delay = `${-index * 0.7}s`; // har card ka logo alag timing par

  return (
    <span
      style={{ animation: "bmLogoGlow 2.4s ease-in-out infinite alternate", animationDelay: delay }}
      className="bm-logo relative h-12 w-12 shrink-0 rounded-full"
    >
      {/* Bahar phailti lehren (do, alag alag waqt par) */}
      {[0, 1.2].map((d) => (
        <i
          key={d}
          style={{ animation: "bmLogoRipple 2.4s ease-out infinite", animationDelay: `calc(${delay} + ${d}s)` }}
          className="absolute inset-0 rounded-full border-2 border-[#ffc61a]"
        />
      ))}

      {/* Ghoomti hui yellow gradient ring */}
      <i
        style={{
          animation: "bmLogoSpin 3s linear infinite",
          animationDelay: delay,
          background: "conic-gradient(from 0deg, #ffc61a, #202124 35%, #A7ADB4 60%, #ffc61a)",
        }}
        className="absolute -inset-[3px] rounded-full"
      />

      {/* Andar ka dark circle + initials + chamak */}
      <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-[#202124] text-sm font-bold text-white">
        <i
          style={{ animation: "bmLogoShine 3.2s ease-in-out infinite", animationDelay: delay }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <span className="relative">{initials}</span>
      </span>
    </span>
  );
};

const SupplierCard = ({ supplier, index = 0 }) => {
  const { name, slug, initials, location, rating, reviews, tags, image, verified } = supplier;
  const extra = tags.length - MAX_TAGS;
  const BadgeIcon = verified ? ShieldCheck : Shield;

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className="group flex animate-[bmCardIn_0.6s_ease-out_both] flex-col rounded-xl border border-[#D9E3E9] bg-white p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc61a] hover:shadow-xl motion-reduce:animate-none"
    >
      {/* Card aur logo ki animations (card jahan bhi lagayen, khud chalengi) */}
      <style>{`
        @keyframes bmCardIn     { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bmLogoSpin   { to { transform: rotate(360deg); } }
        @keyframes bmLogoRipple { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes bmLogoShine  { 0%, 55% { transform: translateX(-160%) skewX(-20deg); } 100% { transform: translateX(260%) skewX(-20deg); } }
        @keyframes bmLogoGlow   { from { box-shadow: 0 0 0 0 rgba(255,198,26,0); } to { box-shadow: 0 0 16px 2px rgba(255,198,26,.55); } }
        @media (prefers-reduced-motion: reduce) {
          .bm-logo, .bm-logo i { animation: none !important; }
        }
      `}</style>

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
          <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
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

        {/* View Shop: is supplier ka shop page kholta hai, e.g. /suppliers/al-noor-building-store */}
        <Link
          href={`/suppliers/${slug}`}
          className="group/btn mt-auto flex h-9 items-center justify-center gap-2 rounded-md border border-[#ffc61a] bg-[#ffc61a] text-sm font-semibold text-[#202124] transition-all duration-300 hover:bg-[#25272A] hover:text-[#ffc61a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60"
        >
          View Shop
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default SupplierCard;