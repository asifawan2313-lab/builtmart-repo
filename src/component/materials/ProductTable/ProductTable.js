import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

// Products ki list (rows): har row product details par jati hai
const ProductTable = ({ items }) => (
  <div className="flex flex-col gap-3">
    {items.map(({ id, name, slug, categorySlug, category, price, supplier, location, image }) => (
      <article key={id} className="flex flex-col gap-3 rounded-xl border border-[#E2E4E7] bg-white p-3 shadow-sm sm:flex-row">
        <Link href={`/materials/${categorySlug}/${slug}`} className="relative block h-40 shrink-0 overflow-hidden rounded-lg bg-[#E2E4E7] sm:h-32 sm:w-44">
          <Image src={image} alt={`${name} (demo image)`} fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover" />
        </Link>

        <div className="flex flex-1 flex-col gap-1">
          <Link href={`/materials/${categorySlug}/${slug}`} className="text-sm font-semibold text-[#202124] hover:underline sm:text-base">
            {name}
          </Link>
          <p className="text-sm font-bold text-[#202124]">{price}</p>
          <span className="w-fit rounded-full bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">{category}</span>
          <p className="text-xs text-[#45484D]">{supplier}</p>
          <p className="flex items-center gap-1 text-xs text-[#45484D]">
            <MapPin size={12} aria-hidden="true" />
            {location}
          </p>
          <button
            type="button"
            className="mt-2 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-6 text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] sm:w-fit"
          >
            <Phone size={13} aria-hidden="true" />
            Contact
          </button>
        </div>
      </article>
    ))}
  </div>
);

export default ProductTable;