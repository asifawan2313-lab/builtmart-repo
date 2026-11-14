// import Image from "next/image";

// import Link from "next/link";
// import { MapPin, Phone } from "lucide-react";

// // Products ki list (rows): har row product details par jati hai
// const ProductTable = ({ items }) => (
//   <div className="flex flex-col gap-3">
//     {items.map(({ id, name, slug, categorySlug, category, price, supplier, location, image }) => (
//       <article key={id} className="flex flex-col gap-3 rounded-xl border border-[#E2E4E7] bg-white p-3 shadow-sm sm:flex-row">
//         <Link href={`/materials/${categorySlug}/${slug}`} className="relative block h-40 shrink-0 overflow-hidden rounded-lg bg-[#E2E4E7] sm:h-32 sm:w-44">
//           <Image src={image} alt={`${name} (demo image)`} fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover" />
//         </Link>

//         <div className="flex flex-1 flex-col gap-1">
//           <Link href={`/materials/${categorySlug}/${slug}`} className="text-sm font-semibold text-[#202124] hover:underline sm:text-base">
//             {name}
//           </Link>
//           <p className="text-sm font-bold text-[#202124]">{price}</p>
//           <span className="w-fit rounded-full bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">{category}</span>
//           <p className="text-xs text-[#45484D]">{supplier}</p>
//           <p className="flex items-center gap-1 text-xs text-[#45484D]">
//             <MapPin size={12} aria-hidden="true" />
//             {location}
//           </p>
//           <button
//             type="button"
//             className="mt-2 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-6 text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] sm:w-fit"
//           >
//             <Phone size={13} aria-hidden="true" />
//             Contact
//           </button>
//         </div>
//       </article>
//     ))}
//   </div>
// );

// export default ProductTable;





"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Phone, ShoppingCart } from "lucide-react";
import { getPrice, useCart } from "../../shared/cart/CartProvider";

const btn =
  "inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-xs font-semibold transition-colors sm:w-32 sm:flex-none";

// Products ki list (rows): har row product details par jati hai
const ProductTable = ({ items }) => {
  const { add, has } = useCart();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const { id, name, slug, categorySlug, category, price, supplier, location, image } = item;
        const canAdd = getPrice(price) !== null;
        const inCart = has(id);

        return (
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

              <div className="mt-2 flex gap-2">
                <button type="button" className={`${btn} bg-[#FDC716] text-[#202124] hover:bg-[#E5B20F]`}>
                  <Phone size={13} aria-hidden="true" />
                  Contact
                </button>
                {canAdd && (
                  <button
                    type="button"
                    onClick={() => add(item)}
                    className={`${btn} border border-[#202124] bg-white text-[#202124] hover:bg-[#FDC716]/25`}
                  >
                    {inCart ? <Check size={13} aria-hidden="true" /> : <ShoppingCart size={13} aria-hidden="true" />}
                    {inCart ? "Added" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductTable;