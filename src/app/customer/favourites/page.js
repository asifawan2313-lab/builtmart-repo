import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ShieldCheck } from "lucide-react";
import { allProducts } from "../../(guest)/materials/materialData";
import { suppliers } from "../../(guest)/suppliers/supplierData";

/* ============================================================
   DEMO DATA (pehle 3 materials aur pehli 2 shops)
   ============================================================ */

const materials = allProducts.slice(0, 3);
const stores = suppliers.slice(0, 2);

const card = "flex flex-col overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm";
const grid = "mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3";
const outlineBtn =
  "inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-[#E2E4E7] bg-white px-3 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20";

// Dil wala button (favourite se hatane ke liye)
const HeartButton = () => (
  <button type="button" aria-label="Remove from favourites" className="shrink-0 cursor-pointer">
    <Heart size={16} className="fill-[#202124] text-[#202124]" aria-hidden="true" />
  </button>
);

/* ============================================================
   PAGE
   ============================================================ */

const CustomerFavouritesPage = () => (
  <main className="p-4 sm:p-6 lg:p-8">
    <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Favourites</h1>
    <p className="mt-1 text-xs text-[#45484D]">Materials and stores you&apos;ve saved.</p>

    {/* Materials */}
    <section className="mt-6">
      <h2 className="text-sm font-bold text-[#202124]">Materials</h2>

      <div className={grid}>
        {materials.map(({ id, name, slug, categorySlug, category, price, supplier, location, image }) => (
          <article key={id} className={card}>
            <Link href={`/materials/${categorySlug}/${slug}`} className="relative block h-44 bg-[#E2E4E7]">
              <Image src={image} alt={`${name} (demo image)`} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
            </Link>

            <div className="flex flex-1 flex-col gap-1 p-3">
              <p className="text-[11px] text-[#45484D]">{category}</p>
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 text-sm font-bold text-[#202124]">{name}</h3>
                <HeartButton />
              </div>
              <p className="text-sm font-extrabold text-[#202124]">{price}</p>
              <p className="flex items-center gap-1 text-[11px] text-[#45484D]">
                <MapPin size={11} className="shrink-0" aria-hidden="true" />
                <span className="line-clamp-1">
                  {supplier} · {location}
                </span>
              </p>

              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden="true" />
                  In stock
                </span>
                <Link href={`/materials/${categorySlug}/${slug}`} className={outlineBtn}>
                  View details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Stores */}
    <section className="mt-8">
      <h2 className="text-sm font-bold text-[#202124]">Stores</h2>

      <div className={grid}>
        {stores.map(({ slug, name, location, tags, image, verified }) => (
          <article key={slug} className={card}>
            <Link href={`/suppliers/${slug}`} className="relative block h-44 bg-[#E2E4E7]">
              <Image src={image} alt={`${name} (demo image)`} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
            </Link>

            <div className="flex flex-1 flex-col gap-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-[#202124]">
                  <span className="line-clamp-1">{name}</span>
                  {verified && <ShieldCheck size={14} className="shrink-0 text-green-600" aria-label="Verified" />}
                </h3>
                <HeartButton />
              </div>

              <p className="flex items-center gap-1 text-[11px] text-[#45484D]">
                <MapPin size={11} className="shrink-0" aria-hidden="true" />
                {location}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-1 flex gap-2">
                <Link
                  href={`/suppliers/${slug}`}
                  className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md bg-[#202124] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#45484D]"
                >
                  View store
                </Link>
                <button type="button" className={outlineBtn}>
                  Contact
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default CustomerFavouritesPage;