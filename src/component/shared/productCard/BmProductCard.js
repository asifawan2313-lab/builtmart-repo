"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

// categorySlug + slug = View Details /materials/[categorySlug]/[slug] par le jata hai
// view = "grid" ya "list". image null ho to "No image" dikhta hai.
// Badge: Featured > Reused > New
const BmProductCard = ({
  name,
  categorySlug,
  slug,
  price,
  unit,
  image,
  shop,
  location,
  condition,
  is_featured,
  view = "grid",
}) => {
  const isList = view === "list";

  let badgeText = "New";
  let badgeClass = "bg-[var(--charcoal-black)] text-white";

  if (is_featured) {
    badgeText = "Featured";
    badgeClass =
      "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]";
  } else if (condition === "reused") {
    badgeText = "Reused";
    badgeClass = "bg-[#384452] text-white";
  }

  // Handlers (abhi sirf alert)
  const handleFavourite = () => alert("Please login to save favourites.");
  const handleAddToCart = () => alert("Please login to add products to cart.");

  return (
    <article
      className={`flex h-full overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm transition-shadow hover:shadow-md ${
        isList ? "flex-row" : "flex-col"
      }`}
    >
      {/* Image + badge + favourite */}
      <div
        className={`relative bg-[var(--border-color)] ${
          isList ? "w-32 shrink-0 sm:w-48" : "aspect-[4/3]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
            No image
          </span>
        )}

        <span
          className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-semibold ${badgeClass}`}
        >
          {badgeText}
        </span>

        <button
          type="button"
          onClick={handleFavourite}
          aria-label="Add to favourites"
          className="absolute right-2 top-2 rounded-full bg-[var(--white-cards)] p-1.5 text-[color:var(--secondary-text)] shadow-sm transition-colors hover:text-[var(--hover-yellow)]"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link href={`/materials/${categorySlug}/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold text-[color:var(--primary-text)] hover:underline">
            {name}
          </h3>
        </Link>
        <p className="text-xs font-medium text-[color:var(--primary-text)]">
          {price
            ? `From Rs ${price.toLocaleString("en-US")} / ${unit}`
            : "Contact for price"}
        </p>
        <p className="text-xs text-[color:var(--secondary-text)]">{shop}</p>
        <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
          <MapPin size={11} aria-hidden="true" />
          {location}
        </p>

        <div className="mt-auto flex gap-2 pt-3">
          <Link
            href={`/materials/${categorySlug}/${slug}`}
            className="flex-1 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-2 py-1.5 text-center text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 rounded-md bg-[var(--primary-yellow)] px-2 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default BmProductCard;
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Heart, MapPin } from "lucide-react";

// // slug = product ka slug (View Details /materials/[slug] par le jata hai)
// // view = "grid" ya "list". image null ho to "No image" dikhta hai.
// // Badge: Featured > Reused > New
// const BmProductCard = ({
//   name,
//   slug,
//   price,
//   unit,
//   image,
//   shop,
//   location,
//   condition,
//   is_featured,
//   view = "grid",
// }) => {
//   const isList = view === "list";

//   let badgeText = "New";
//   let badgeClass = "bg-[var(--charcoal-black)] text-white";

//   if (is_featured) {
//     badgeText = "Featured";
//     badgeClass =
//       "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]";
//   } else if (condition === "reused") {
//     badgeText = "Reused";
//     badgeClass = "bg-[#384452] text-white";
//   }

//   // Handlers (abhi sirf alert)
//   const handleFavourite = () => alert("Please login to save favourites.");
//   const handleAddToCart = () => alert("Please login to add products to cart.");

//   return (
//     <article
//       className={`flex h-full overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm transition-shadow hover:shadow-md ${
//         isList ? "flex-row" : "flex-col"
//       }`}
//     >
//       {/* Image + badge + favourite */}
//       <div
//         className={`relative bg-[var(--border-color)] ${
//           isList ? "w-32 shrink-0 sm:w-48" : "aspect-[4/3]"
//         }`}
//       >
//         {image ? (
//           <Image
//             src={image}
//             alt={name}
//             fill
//             unoptimized
//             sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
//             className="object-cover"
//           />
//         ) : (
//           <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
//             No image
//           </span>
//         )}

//         <span
//           className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-semibold ${badgeClass}`}
//         >
//           {badgeText}
//         </span>

//         <button
//           type="button"
//           onClick={handleFavourite}
//           aria-label="Add to favourites"
//           className="absolute right-2 top-2 rounded-full bg-[var(--white-cards)] p-1.5 text-[color:var(--secondary-text)] shadow-sm transition-colors hover:text-[var(--hover-yellow)]"
//         >
//           <Heart size={14} />
//         </button>
//       </div>

//       {/* Info */}
//       <div className="flex flex-1 flex-col gap-1 p-3">
//         <Link href={`/materials/${slug}`}>
//           <h3 className="line-clamp-2 text-sm font-bold text-[color:var(--primary-text)] hover:underline">
//             {name}
//           </h3>
//         </Link>
//         <p className="text-xs font-medium text-[color:var(--primary-text)]">
//           {price
//             ? `From Rs ${price.toLocaleString("en-US")} / ${unit}`
//             : "Contact for price"}
//         </p>
//         <p className="text-xs text-[color:var(--secondary-text)]">{shop}</p>
//         <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
//           <MapPin size={11} aria-hidden="true" />
//           {location}
//         </p>

//         <div className="mt-auto flex gap-2 pt-3">
//           <Link
//             href={`/materials/${slug}`}
//             className="flex-1 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-2 py-1.5 text-center text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//           >
//             View Details
//           </Link>
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             className="flex-1 rounded-md bg-[var(--primary-yellow)] px-2 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default BmProductCard;

// "use client";

// import Image from "next/image";
// import { Heart, MapPin } from "lucide-react";

// // view = "grid" ya "list". image null ho to "No image" dikhta hai.
// // Badge: Featured > Reused > New
// const BmProductCard = ({
//   name,
//   price,
//   unit,
//   image,
//   shop,
//   location,
//   condition,
//   is_featured,
//   view = "grid",
// }) => {
//   const isList = view === "list";

//   let badgeText = "New";
//   let badgeClass = "bg-[var(--charcoal-black)] text-white";

//   if (is_featured) {
//     badgeText = "Featured";
//     badgeClass =
//       "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]";
//   } else if (condition === "reused") {
//     badgeText = "Reused";
//     badgeClass = "bg-[#384452] text-white";
//   }

//   // Handlers (abhi sirf alert)
//   const handleFavourite = () => alert("Please login to save favourites.");
//   const handleAddToCart = () => alert("Please login to add products to cart.");
//   const handleViewDetails = () =>
//     alert("Product details page will be added soon.");

//   return (
//     <article
//       className={`flex h-full overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm transition-shadow hover:shadow-md ${
//         isList ? "flex-row" : "flex-col"
//       }`}
//     >
//       {/* Image + badge + favourite */}
//       <div
//         className={`relative bg-[var(--border-color)] ${
//           isList ? "w-32 shrink-0 sm:w-48" : "aspect-[4/3]"
//         }`}
//       >
//         {image ? (
//           <Image
//             src={image}
//             alt={name}
//             fill
//             unoptimized
//             sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
//             className="object-cover"
//           />
//         ) : (
//           <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
//             No image
//           </span>
//         )}

//         <span
//           className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-semibold ${badgeClass}`}
//         >
//           {badgeText}
//         </span>

//         <button
//           type="button"
//           onClick={handleFavourite}
//           aria-label="Add to favourites"
//           className="absolute right-2 top-2 rounded-full bg-[var(--white-cards)] p-1.5 text-[color:var(--secondary-text)] shadow-sm transition-colors hover:text-[var(--hover-yellow)]"
//         >
//           <Heart size={14} />
//         </button>
//       </div>

//       {/* Info */}
//       <div className="flex flex-1 flex-col gap-1 p-3">
//         <h3 className="line-clamp-2 text-sm font-bold text-[color:var(--primary-text)]">
//           {name}
//         </h3>
//         <p className="text-xs font-medium text-[color:var(--primary-text)]">
//           {price
//             ? `From Rs ${price.toLocaleString("en-US")} / ${unit}`
//             : "Contact for price"}
//         </p>
//         <p className="text-xs text-[color:var(--secondary-text)]">{shop}</p>
//         <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
//           <MapPin size={11} aria-hidden="true" />
//           {location}
//         </p>

//         <div className="mt-auto flex gap-2 pt-3">
//           <button
//             type="button"
//             onClick={handleViewDetails}
//             className="flex-1 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-2 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//           >
//             View Details
//           </button>
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             className="flex-1 rounded-md bg-[var(--primary-yellow)] px-2 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default BmProductCard;