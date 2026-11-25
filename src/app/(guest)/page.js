"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Package,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Store,
} from "lucide-react";

import BmMaterialCategoryCard from "../../component/shared/materialCard/BmMaterialCategoryCard";
import BmSupplierCard from "../../component/shared/supplierCard/BmSupplierCard";

// Hero images
import grey from "../../assets/images/guest/hero/grey.jpeg";
import exterior from "../../assets/images/guest/hero/exterior.jpeg";
import interior from "../../assets/images/guest/hero/interior.jpeg";

// Category images
import doorsWindows from "../../assets/images/guest/card/doorsWindows.jpg";
import electrical from "../../assets/images/guest/card/copperwire.jpg";
import steelWelding from "../../assets/images/guest/card/steelSaria.jpg";
import interiorDesign from "../../assets/images/guest/card/ceiling.jpg";
import metalAluminum from "../../assets/images/guest/card/grills.jpg";
import paintsFinishes from "../../assets/images/guest/card/paint.jpg";
import architectural from "../../assets/images/guest/card/tiles.jpg";
import usedBricks from "../../assets/images/guest/card/briks.jpg";
import sandImage from "../../assets/images/guest/card/sand.jpg";
import glassWindow from "../../assets/images/guest/card/window.jpg";
import secWindow from "../../assets/images/guest/card/secwindow.jpg";

// Supplier images (suppliers page wali hi)
import shop1 from "../../assets/images/supplier/shops/shop-1.jpg";
import shop2 from "../../assets/images/supplier/shops/shop-2.jpg";
import shop5 from "../../assets/images/supplier/shops/shop-5.jpg";
import shop6 from "../../assets/images/supplier/shops/shop-6.jpg";

/* ============================================================
   DEMO DATA
   ============================================================ */

const BM_HERO_SLIDES = [
  { id: 1, image: grey, alt: "Construction materials yard" },
  { id: 2, image: exterior, alt: "House exterior" },
  { id: 3, image: interior, alt: "House interior" },
];

const BM_SEARCH_SELECTS = [
  {
    id: 1,
    label: "Category",
    all: "All categories",
    items: ["Bricks", "Cement", "Steel / Saria", "Sand", "Tiles", "Paint"],
  },
  {
    id: 2,
    label: "Location",
    all: "All locations",
    items: [
      "GT Road",
      "Satellite Town",
      "Model Town",
      "Citi Housing",
      "Wapda Town",
      "Kamoke",
    ],
  },
];

const BM_HERO_TABS = [
  { id: 1, label: "Materials", href: "/materials", icon: Package },
  { id: 2, label: "Suppliers", href: "/suppliers", icon: Store },
];

const toSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

/* MATERIAL CATEGORIES */
const categories = [
  { id: 1, name: "Doors & Windows", image: doorsWindows },
  { id: 2, name: "Construction Chemicals", image: null },
  { id: 3, name: "Electrical & Lighting", image: electrical },
  { id: 4, name: "Steel & Welding", image: steelWelding },
  { id: 5, name: "Interior Design", image: interiorDesign },
  { id: 6, name: "Furniture & Fixtures", image: null },
  { id: 7, name: "Metal & Aluminum Works", image: metalAluminum },
  { id: 8, name: "Paints & Finishes", image: paintsFinishes },
  { id: 9, name: "Architectural Products", image: architectural },
  { id: 10, name: "Bricks & Blocks", image: usedBricks },
  { id: 11, name: "Sand & Crush", image: sandImage },
  { id: 12, name: "Glass & Glazing", image: glassWindow },
  { id: 13, name: "Aluminium Windows", image: secWindow },
  { id: 14, name: "Woodworks", image: null },
].map((item) => ({
  ...item,
  href: `/materials/${toSlug(item.name)}`,
}));

/* REUSED MATERIAL CATEGORIES */
const reusedCategories = [
  { id: 1, name: "Used Bricks", image: usedBricks },
  { id: 2, name: "Reused Steel", image: steelWelding },
  { id: 3, name: "Used Tiles", image: architectural },
  { id: 4, name: "Used Doors & Windows", image: doorsWindows },
  { id: 5, name: "Leftover Sand", image: sandImage },
  { id: 6, name: "Leftover Paint", image: paintsFinishes },
  { id: 7, name: "Used Glass Windows", image: glassWindow },
  { id: 8, name: "Used Aluminium Windows", image: secWindow },
  { id: 9, name: "Used Grills & Gates", image: metalAluminum },
  { id: 10, name: "Used Ceiling Panels", image: interiorDesign },
  { id: 11, name: "Sand & Crush", image: sandImage },
  { id: 12, name: "Glass & Glazing", image: glassWindow },
  { id: 13, name: "Aluminium Windows", image: secWindow },
  { id: 14, name: "Woodworks", image: null },
].map((item) => ({
  ...item,
  href: `/materials/${toSlug(item.name)}?type=reused`,
}));

/* RECENTLY LISTED REUSED MATERIALS */
const recentReused = [
  { id: 1, name: "Used Bricks", image: usedBricks },
  { id: 2, name: "Reused Steel", image: steelWelding },
  { id: 3, name: "Used Tiles", image: architectural },
  { id: 4, name: "Used Doors & Windows", image: doorsWindows },
  { id: 5, name: "Leftover Sand", image: sandImage },
  { id: 6, name: "Leftover Paint", image: paintsFinishes },
  { id: 7, name: "Used Glass Windows", image: glassWindow },
  { id: 8, name: "Used Aluminium Windows", image: secWindow },
];

/* SUPPLIERS (BmSupplierCard ke props ke mutabiq) */
const suppliers = [
  {
    id: 1,
    name: "City Material Traders",
    slug: "city-material-traders",
    image: shop2,
    location: "Satellite Town",
    rating: 4.5,
    reviews: 86,
    is_verified: true,
    categories: ["Cement", "Steel", "Bricks", "Sand"],
  },
  {
    id: 2,
    name: "Al-Noor Building Store",
    slug: "al-noor-building-store",
    image: shop1,
    location: "GT Road",
    rating: 4.5,
    reviews: 98,
    is_verified: true,
    categories: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"],
  },
  {
    id: 3,
    name: "Punjab Building Materials",
    slug: "punjab-building-materials",
    image: shop5,
    location: "GT Road",
    rating: 4.4,
    reviews: 76,
    is_verified: true,
    categories: ["Cement", "Bricks", "Paints", "Pipes"],
  },
  {
    id: 4,
    name: "Modern Builders Mart",
    slug: "modern-builders-mart",
    image: shop6,
    location: "Satellite Town",
    rating: 4.8,
    reviews: 134,
    is_verified: true,
    categories: ["Cement", "Steel", "Sand", "Tiles"],
  },
];

const banners = {
  delivery: {
    icon: Bike,
    title: "Construction Material Delivery",
    text: "Need materials delivered to your site? Find a rider for transport service.",
    button: "Find a Rider",
    alert: "find a rider",
  },
  ai: {
    icon: Sparkles,
    title: "Estimate your construction cost before you build.",
    text: "Plan your budget, estimate material quantities and explore costs.",
    button: "Calculate Construction Cost",
    alert: "open cost estimator",
    chips: ["Grey Structure", "Complete House", "Finishing", "Tiles & Paint"],
  },
};

/* ============================================================
   COMMON STYLES
   ============================================================ */

const api = (name) => () => alert(`API call: ${name}`);

const yellowBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-semibold text-[var(--charcoal-black)] transition-all duration-300 hover:bg-[var(--hover-yellow)]";

const arrowBtn =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-color)] bg-white shadow-md transition-all duration-300 hover:border-[var(--primary-yellow)] hover:bg-[var(--primary-yellow)]";

const fieldClass =
  "w-full rounded-lg border border-[var(--border-color)] bg-white px-4 py-3 text-sm text-[var(--primary-text)] outline-none transition focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/20";

const tabClass =
  "inline-flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--charcoal-black)] transition hover:border-[var(--primary-yellow)] hover:bg-[var(--primary-yellow)] sm:px-5 sm:text-base";

/* ============================================================
   1. HERO
   ============================================================ */

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % BM_HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[var(--charcoal-black)] text-white sm:min-h-[560px] lg:min-h-[calc(100vh-5rem)]">
      {BM_HERO_SLIDES.map(({ id, image, alt }, i) => (
        <Image
          key={id}
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-10">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Construction Platform for{" "}
          <span className="text-[var(--primary-yellow)]">Gujranwala</span>
        </h1>

        {/* Hero Search */}
        <div className="mt-8 w-full max-w-[1000px] rounded-xl bg-white p-3 text-left sm:mt-10 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Material name"
              aria-label="Material name"
              className={fieldClass}
            />

            {BM_SEARCH_SELECTS.map(({ id, label, all, items }) => (
              <div key={id} className="relative">
                <select aria-label={label} className={`${fieldClass} appearance-none pr-10`}>
                  <option value="">{all}</option>
                  {items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            ))}

            <button
              type="button"
              onClick={api("search materials")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary-yellow)] px-5 py-3 text-sm font-semibold text-[var(--charcoal-black)] transition hover:bg-[var(--hover-yellow)] sm:col-span-2 lg:col-span-1"
            >
              <Search size={18} />
              Search Materials
            </button>
          </div>
        </div>

        {/* Hero navigation */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-xl bg-white/20 p-2 backdrop-blur-sm">
          {BM_HERO_TABS.map(({ id, label, href, icon: TabIcon }) => (
            <Link key={id} href={href} className={tabClass}>
              <TabIcon size={18} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   2. GENERAL SECTION (centered heading + button cards ke neeche)
   ============================================================ */

const Section = ({ title, subtitle, button, children, href }) => (
  <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--primary-text)] sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--secondary-text)] sm:text-base">
          {subtitle}
        </p>
      </div>

      {children}

      {button && (
        <div className="mt-6 flex justify-center">
          <Link href={href} className={yellowBtn}>
            {button}
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  </section>
);

/* ============================================================
   3. CATEGORY SECTION (Materials page jaisa 5 x 2 grid)
   ============================================================ */

const CategorySection = ({ title, subtitle, categories, button, href }) => (
  <Section title={title} subtitle={subtitle} button={button} href={href}>
    <div className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {categories.slice(0, 10).map((category) => (
        <BmMaterialCategoryCard key={category.id} {...category} />
      ))}
    </div>
  </Section>
);

/* ============================================================
   4. BANNER
   ============================================================ */

const Banner = ({
  icon: BannerIcon,
  title,
  text,
  button,
  alert: action,
  chips,
}) => (
  <section className="px-4 py-5 sm:px-6 lg:px-10">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl bg-[var(--charcoal-black)] p-5 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <BannerIcon
          size={40}
          className="shrink-0 text-[var(--primary-yellow)] sm:h-11 sm:w-11"
        />

        <div>
          <h2 className="text-xl font-bold text-[var(--primary-yellow)] sm:text-2xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-gray-300 sm:text-base">
            {text}
          </p>

          <button
            type="button"
            onClick={api(action)}
            className={`${yellowBtn} mt-4`}
          >
            {button}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {chips && (
        <div className="flex flex-wrap gap-2 md:w-60 md:flex-col">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-[var(--industrial-blue-grey)] px-4 py-2 text-center text-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  </section>
);

/* ============================================================
   5. SUPPLIER CAROUSEL
   ============================================================ */

const SupplierCarousel = () => {
  const [active, setActive] = useState(0);
  const total = suppliers.length;
  const half = Math.floor(total / 2);

  const move = (step) => {
    setActive((a) => (a + step + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(() => move(1), 4000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="relative mt-6 h-[25rem] overflow-hidden [--step:12rem] sm:[--step:15rem] md:[--step:18rem]">
      {suppliers.map((supplier, index) => {
        const offset =
          ((index - active + total + half) % total) - half;

        const isActive = offset === 0;
        const far = Math.abs(offset) > 1;

        return (
          <div
            key={supplier.id}
            onClick={() => setActive(index)}
            style={{
              transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.82})`,
              opacity: isActive ? 1 : far ? 0 : 0.6,
              zIndex: 10 - Math.abs(offset),
              pointerEvents: far ? "none" : "auto",
            }}
            className="absolute left-1/2 top-1/2 w-[260px] transition-all duration-500 ease-in-out sm:w-[290px]"
          >
            <BmSupplierCard {...supplier} isActive={isActive} />
          </div>
        );
      })}

      <button
        type="button"
        aria-label="Previous supplier"
        onClick={() => move(-1)}
        className={`${arrowBtn} left-1 md:left-4`}
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        aria-label="Next supplier"
        onClick={() => move(1)}
        className={`${arrowBtn} right-1 md:right-4`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

/* ============================================================
   6. HOME PAGE
   ============================================================ */

const Page = () => (
  <main className="min-w-0 overflow-hidden bg-[var(--off-white-background)]">
    <Hero />

    {/* MATERIAL CATEGORIES */}
    <CategorySection
      title="Explore Construction Materials"
      subtitle="Find everything you need for your construction project."
      categories={categories}
      button="Explore All Categories"
      href="/materials/all-categories"
    />

    {/* REUSED MATERIAL CATEGORIES */}
    <CategorySection
      title="Reused Materials"
      subtitle="Discover affordable reusable materials for your construction project."
      categories={reusedCategories}
      button="Explore Reused Materials"
      href="/materials/reused-categories"
    />

    {/* AI ESTIMATOR */}
    <Banner {...banners.ai} />

    {/* TOP RATED SUPPLIERS */}
    <Section
      title="Top Rated Suppliers"
      subtitle="Discover reliable construction material suppliers in Gujranwala."
      button="Explore All Suppliers"
      href="/suppliers"
    >
      <SupplierCarousel />
    </Section>

    {/* RECENT REUSED MATERIALS */}
    <Section
      title="Recently Listed Reused Materials"
      subtitle="Explore reused materials from the community."
      button="View All"
      href="/materials/reused-categories"
    >
      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {recentReused.map((item) => (
          <BmMaterialCategoryCard
            key={item.id}
            {...item}
            href={`/materials/${toSlug(item.name)}?type=reused`}
          />
        ))}
      </div>
    </Section>

    {/* RIDER / DELIVERY */}
    <Banner {...banners.delivery} />

    <p className="px-4 pb-6 pt-3 text-center text-xs text-[var(--secondary-text)]">
      Sample data shown for demonstration purposes.
    </p>
  </main>
);

export default Page;