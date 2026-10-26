import Image from "next/image";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

// Trust points (simple list, shown directly)
const features = [
  { icon: ShieldCheck, text: "Verified Suppliers" },
  { icon: Truck, text: "On-Time Delivery" },
  { icon: BadgeCheck, text: "Best Prices & Quality" },
];

export default function SuppliersHero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0D1B2A]">
      {/* Background picture: put it in public/images/hero/suppliers-hero.jpg */}
      <Image
        src="/images/hero/suppliers-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right"
      />

      {/* Navy overlay (solid on the text side, fades towards the picture) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0D1B2A]/95 via-[#0D1B2A]/80 to-[#0D1B2A]/50 lg:from-[#0D1B2A] lg:from-40% lg:via-[#0D1B2A]/60 lg:to-transparent" />

      {/* Content */}
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 md:py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc61a]">
            Trusted Suppliers
          </p>

          <h1 className="mt-3 font-[family-name:var(--font-baloo)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Find the Best Construction Material Suppliers in Gujranwala
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Connect with verified suppliers for all your construction needs. Get quality
            materials, competitive prices and reliable service from trusted local
            businesses.
          </p>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-0">
            {features.map(({ icon: Icon, text }, index) => (
              <div
                key={text}
                className={`group flex items-center gap-3 ${
                  index > 0 ? "sm:ml-8 sm:border-l sm:border-white/20 sm:pl-8" : ""
                }`}
              >
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#ffc61a] transition-transform duration-300 group-hover:scale-110"
                />
                <p className="max-w-[6rem] text-sm leading-snug text-white">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}