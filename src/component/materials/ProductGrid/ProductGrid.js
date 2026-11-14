// import Image from "next/image";
// import Link from "next/link";
// import { MapPin, Phone } from "lucide-react";

// // cols: grid ke columns (default 3). Har card product details page par jata hai
// const ProductGrid = ({ items, cols = "grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" }) => (
//   <div className={`grid ${cols}`}>
//     {items.map(({ id, name, slug, categorySlug, category, price, supplier, location, image }) => (
//       <article key={id} className="flex flex-col rounded-xl border border-[#E2E4E7] bg-white p-2 shadow-sm">
//         <Link href={`/materials/${categorySlug}/${slug}`} className="block">
//           <div className="relative h-44 overflow-hidden rounded-lg bg-[#E2E4E7]">
//             <Image src={image} alt={`${name} (demo image)`} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw" className="object-cover" />
//           </div>
//           <h3 className="mt-3 line-clamp-2 px-1 text-sm font-semibold text-[#202124]">{name}</h3>
//         </Link>

//         <div className="flex flex-1 flex-col gap-1 px-1 pb-1 pt-1">
//           <p className="text-sm font-bold text-[#202124]">{price}</p>
//           <span className="w-fit rounded-full bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">{category}</span>
//           <p className="text-xs text-[#45484D]">{supplier}</p>
//           <p className="flex items-center gap-1 text-xs text-[#45484D]">
//             <MapPin size={12} aria-hidden="true" />
//             {location}
//           </p>
//           <button
//             type="button"
//             className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
//           >
//             <Phone size={13} aria-hidden="true" />
//             Contact
//           </button>
//         </div>
//       </article>
//     ))}
//   </div>
// );

// export default ProductGrid;




"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Phone, ShoppingCart } from "lucide-react";
import { getPrice, useCart } from "../../shared/cart/CartProvider";

const btn =
  "inline-flex h-8 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-lg px-1 text-[11px] font-semibold transition-colors";

// cols: grid ke columns (default 3). Har card product details page par jata hai
const ProductGrid = ({ items, cols = "grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" }) => {
  const { add, has } = useCart();

  return (
    <div className={`grid ${cols}`}>
      {items.map((item) => {
        const { id, name, slug, categorySlug, category, price, supplier, location, image } = item;
        const canAdd = getPrice(price) !== null; // "Contact for price" cart mein nahi jata
        const inCart = has(id);

        return (
          <article key={id} className="flex flex-col rounded-xl border border-[#E2E4E7] bg-white p-2 shadow-sm">
            <Link href={`/materials/${categorySlug}/${slug}`} className="block">
              <div className="relative h-44 overflow-hidden rounded-lg bg-[#E2E4E7]">
                <Image src={image} alt={`${name} (demo image)`} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-3 line-clamp-2 px-1 text-sm font-semibold text-[#202124]">{name}</h3>
            </Link>

            <div className="flex flex-1 flex-col gap-1 px-1 pb-1 pt-1">
              <p className="text-sm font-bold text-[#202124]">{price}</p>
              <span className="w-fit rounded-full bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">{category}</span>
              <p className="text-xs text-[#45484D]">{supplier}</p>
              <p className="flex items-center gap-1 text-xs text-[#45484D]">
                <MapPin size={12} aria-hidden="true" />
                {location}
              </p>

              <div className="mt-3 flex gap-2">
                <button type="button" className={`${btn} bg-[#FDC716] text-[#202124] hover:bg-[#E5B20F]`}>
                  <Phone size={12} aria-hidden="true" />
                  Contact
                </button>
                {canAdd && (
                  <button
                    type="button"
                    onClick={() => add(item)}
                    className={`${btn} border border-[#202124] bg-white text-[#202124] hover:bg-[#FDC716]/25`}
                  >
                    {inCart ? <Check size={12} aria-hidden="true" /> : <ShoppingCart size={12} aria-hidden="true" />}
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

export default ProductGrid;