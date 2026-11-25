"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import BmPageHero from "../../../component/shared/pageHero/BmPageHero";
import BmMaterialCategoryCard from "../../../component/shared/materialCard/BmMaterialCategoryCard";
import BmProductCard from "../../../component/shared/productCard/BmProductCard";
import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
import electrical from "../../../assets/images/guest/card/copperwire.jpg";
import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
import architectural from "../../../assets/images/guest/card/tiles.jpg";
import bricks from "../../../assets/images/guest/card/briks.jpg";
import sandImage from "../../../assets/images/guest/card/sand.jpg";
import glassWindow from "../../../assets/images/guest/card/window.jpg";
import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

// Categories: type = "new" ya "reused"
const BM_MATERIAL_CATEGORIES = [
  { id: 1, name: "Doors & Windows", slug: "doors-windows", image: doorsWindows, type: "new" },
  { id: 2, name: "Electrical & Lighting", slug: "electrical-lighting", image: electrical, type: "new" },
  { id: 3, name: "Interior Design", slug: "interior-design", image: interiorDesign, type: "new" },
  { id: 4, name: "Metal & Aluminum Works", slug: "metal-aluminum-works", image: metalAluminum, type: "new" },
  { id: 5, name: "Architectural Products", slug: "architectural-products", image: architectural, type: "new" },
  { id: 6, name: "Sand & Crush", slug: "sand-crush", image: sandImage, type: "new" },
  { id: 7, name: "Steel & Welding", slug: "steel-welding", image: steelSaria, type: "new" },
  { id: 8, name: "Paints & Finishes", slug: "paints-finishes", image: paintsFinishes, type: "new" },
  { id: 9, name: "Bricks & Blocks", slug: "bricks-blocks", image: bricks, type: "new" },
  { id: 10, name: "Glass & Glazing", slug: "glass-glazing", image: glassWindow, type: "new" },

  { id: 11, name: "Used Bricks", slug: "used-bricks", image: bricks, type: "reused" },
  { id: 12, name: "Used Tiles", slug: "used-tiles", image: architectural, type: "reused" },
  { id: 13, name: "Leftover Sand", slug: "leftover-sand", image: sandImage, type: "reused" },
  { id: 14, name: "Used Glass Windows", slug: "used-glass-windows", image: glassWindow, type: "reused" },
  { id: 15, name: "Used Grills & Gates", slug: "used-grills-gates", image: metalAluminum, type: "reused" },
  { id: 16, name: "Reused Steel", slug: "reused-steel", image: steelSaria, type: "reused" },
  { id: 17, name: "Used Doors & Windows", slug: "used-doors-windows", image: doorsWindows, type: "reused" },
  { id: 18, name: "Leftover Paint", slug: "leftover-paint", image: paintsFinishes, type: "reused" },
  { id: 19, name: "Used Aluminium Windows", slug: "used-aluminium-windows", image: secWindow, type: "reused" },
  { id: 20, name: "Used Ceiling Panels", slug: "used-ceiling-panels", image: interiorDesign, type: "reused" },
];

// Products: category = category ka name, condition = "new" ya "reused",
// is_featured = true/false
const BM_MATERIAL_PRODUCTS = [
  { id: 1, name: "Red Clay Bricks (A-Class)", slug: "red-clay-bricks", price: 17, unit: "Piece", image: bricks, category: "Bricks & Blocks", categorySlug: "bricks-blocks", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: true },
  { id: 2, name: "Ravi Sand (Rait)", slug: "ravi-sand", price: 9000, unit: "Trolley", image: sandImage, category: "Sand & Crush", categorySlug: "sand-crush", shop: "City Material Traders", location: "Satellite Town", condition: "new", is_featured: true },
  { id: 3, name: "Steel Saria Grade 60", slug: "steel-saria", price: 265, unit: "Kg", image: steelSaria, category: "Steel & Welding", categorySlug: "steel-welding", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "new", is_featured: true },
  { id: 4, name: "Porcelain Floor Tiles", slug: "porcelain-floor-tiles", price: 95, unit: "Sq Ft", image: architectural, category: "Architectural Products", categorySlug: "architectural-products", shop: "Punjab Building Materials", location: "GT Road", condition: "new", is_featured: false },
  { id: 5, name: "Gold Emulsion Paint", slug: "gold-emulsion-paint", price: 7800, unit: "Bucket", image: paintsFinishes, category: "Paints & Finishes", categorySlug: "paints-finishes", shop: "Modern Builders Mart", location: "Satellite Town", condition: "new", is_featured: false },
  { id: 6, name: "Aluminium Sliding Window", slug: "aluminium-sliding-window", price: null, unit: "Window", image: secWindow, category: "Metal & Aluminum Works", categorySlug: "metal-aluminum-works", shop: "Rehman Builders Supply", location: "Model Town", condition: "new", is_featured: false },
  { id: 7, name: "Tempered Glass Window", slug: "tempered-glass-window", price: 850, unit: "Sq Ft", image: glassWindow, category: "Glass & Glazing", categorySlug: "glass-glazing", shop: "Ali & Sons Traders", location: "Model Town", condition: "new", is_featured: false },
  { id: 8, name: "Copper Electrical Wire", slug: "copper-electrical-wire", price: 2200, unit: "Coil", image: electrical, category: "Electrical & Lighting", categorySlug: "electrical-lighting", shop: "Rana Construction Supply", location: "Peoples Colony", condition: "new", is_featured: false },
  { id: 9, name: "Wooden Door (Deodar)", slug: "wooden-door-deodar", price: 18000, unit: "Door", image: doorsWindows, category: "Doors & Windows", categorySlug: "doors-windows", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: false },
  { id: 10, name: "Used Red Bricks", slug: "used-red-bricks", price: 10, unit: "Piece", image: bricks, category: "Used Bricks", categorySlug: "used-bricks", shop: "Hassan Used Materials", location: "Rahwali", condition: "reused", is_featured: false },
  { id: 11, name: "Reused Steel Saria", slug: "reused-steel-saria", price: 190, unit: "Kg", image: steelSaria, category: "Reused Steel", categorySlug: "reused-steel", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "reused", is_featured: false },
  { id: 12, name: "Used Wooden Door", slug: "used-wooden-door", price: 7500, unit: "Door", image: doorsWindows, category: "Used Doors & Windows", categorySlug: "used-doors-windows", shop: "Bilal Traders", location: "Wapda Town", condition: "reused", is_featured: false },
];

const sectionHeading =
  "text-center text-lg font-bold text-[color:var(--primary-text)]";
const exploreButton =
  "inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)]";
const selectClass =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";
const pageButton =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  // All Products filters ki state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // All Products: featured nahi, aur filters match karein
  const filteredProducts = BM_MATERIAL_PRODUCTS.filter(
    (product) =>
      !product.is_featured &&
      product.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (category === "all" || product.category === category) &&
      (condition === "all" || product.condition === condition)
  );

  if (sortBy === "low") {
    filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "high") {
    filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  return (
    <main className="min-h-screen bg-[var(--off-white-background)]">
      <BmPageHero
        title="Find Construction Materials"
        subtitle="Find and compare construction materials in Gujranwala."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {/* ALL CATEGORIES */}
        <section>
          <h2 className={sectionHeading}>All Categories</h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {BM_MATERIAL_CATEGORIES.filter((item) => item.type === "new").map(
              (item) => (
                <BmMaterialCategoryCard
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  slug={item.slug}
                  type={item.type}
                />
              )
            )}
          </div>

          <div className="mt-5 text-center">
            <Link href="/materials/all-categories" className={exploreButton}>
              Explore All Categories
            </Link>
          </div>
        </section>

        {/* REUSED MATERIALS */}
        <section className="mt-12">
          <h2 className={sectionHeading}>Reused Materials</h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {BM_MATERIAL_CATEGORIES.filter(
              (item) => item.type === "reused"
            ).map((item) => (
              <BmMaterialCategoryCard
                key={item.id}
                name={item.name}
                image={item.image}
                slug={item.slug}
                type={item.type}
              />
            ))}
          </div>

          <div className="mt-5 text-center">
            <Link href="/materials/reused-categories" className={exploreButton}>
              Explore Reused Materials
            </Link>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="mt-12">
          <h2 className={sectionHeading}>Featured Products</h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured)
              .slice(0, 3)
              .map((product) => (
                <BmProductCard
                  key={product.id}
                  name={product.name}
                  slug={product.slug}
                  categorySlug={product.categorySlug}
                  price={product.price}
                  unit={product.unit}
                  image={product.image}
                  shop={product.shop}
                  location={product.location}
                  condition={product.condition}
                  is_featured={product.is_featured}
                />
              ))}
          </div>

          <div className="mt-5 text-center">
            <Link href="/materials/featured" className={exploreButton}>
              Explore Featured Products
            </Link>
          </div>
        </section>

        {/* ALL PRODUCTS */}
        <section className="mt-12">
          <h2 className={sectionHeading}>All Products</h2>

          {/* FILTERS */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
              <Search
                size={16}
                className="text-[color:var(--secondary-text)]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
              className={selectClass}
            >
              <option value="all">All Categories</option>
              {BM_MATERIAL_CATEGORIES.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              aria-label="Filter by condition"
              className={selectClass}
            >
              <option value="all">New and Reused</option>
              <option value="new">New</option>
              <option value="reused">Reused</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className={selectClass}
            >
              <option value="latest">Sort by: Latest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length === 0 ? (
            <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
              No products found.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <BmProductCard
                  key={product.id}
                  name={product.name}
                  slug={product.slug}
                  categorySlug={product.categorySlug}
                  price={product.price}
                  unit={product.unit}
                  image={product.image}
                  shop={product.shop}
                  location={product.location}
                  condition={product.condition}
                  is_featured={product.is_featured}
                />
              ))}
            </div>
          )}

          {/* PAGINATION (abhi kuch implement nahi) */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button type="button" aria-label="Previous page" className={pageButton}>
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
            >
              1
            </button>
            <button type="button" className={pageButton}>2</button>
            <button type="button" className={pageButton}>3</button>
            <button type="button" aria-label="Next page" className={pageButton}>
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import BmPageHero from "../../../component/shared/pageHero/BmPageHero";
// import BmMaterialCategoryCard from "../../../component/shared/materialCard/BmMaterialCategoryCard";
// import BmProductCard from "../../../component/shared/productCard/BmProductCard";
// import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// // Categories: type = "new" ya "reused"
// const BM_MATERIAL_CATEGORIES = [
//   { id: 1, name: "Doors & Windows", slug: "doors-windows", image: doorsWindows, type: "new" },
//   { id: 2, name: "Electrical & Lighting", slug: "electrical-lighting", image: electrical, type: "new" },
//   { id: 3, name: "Interior Design", slug: "interior-design", image: interiorDesign, type: "new" },
//   { id: 4, name: "Metal & Aluminum Works", slug: "metal-aluminum-works", image: metalAluminum, type: "new" },
//   { id: 5, name: "Architectural Products", slug: "architectural-products", image: architectural, type: "new" },
//   { id: 6, name: "Sand & Crush", slug: "sand-crush", image: sandImage, type: "new" },
//   { id: 7, name: "Steel & Welding", slug: "steel-welding", image: steelSaria, type: "new" },
//   { id: 8, name: "Paints & Finishes", slug: "paints-finishes", image: paintsFinishes, type: "new" },
//   { id: 9, name: "Bricks & Blocks", slug: "bricks-blocks", image: bricks, type: "new" },
//   { id: 10, name: "Glass & Glazing", slug: "glass-glazing", image: glassWindow, type: "new" },

//   { id: 11, name: "Used Bricks", slug: "used-bricks", image: bricks, type: "reused" },
//   { id: 12, name: "Used Tiles", slug: "used-tiles", image: architectural, type: "reused" },
//   { id: 13, name: "Leftover Sand", slug: "leftover-sand", image: sandImage, type: "reused" },
//   { id: 14, name: "Used Glass Windows", slug: "used-glass-windows", image: glassWindow, type: "reused" },
//   { id: 15, name: "Used Grills & Gates", slug: "used-grills-gates", image: metalAluminum, type: "reused" },
//   { id: 16, name: "Reused Steel", slug: "reused-steel", image: steelSaria, type: "reused" },
//   { id: 17, name: "Used Doors & Windows", slug: "used-doors-windows", image: doorsWindows, type: "reused" },
//   { id: 18, name: "Leftover Paint", slug: "leftover-paint", image: paintsFinishes, type: "reused" },
//   { id: 19, name: "Used Aluminium Windows", slug: "used-aluminium-windows", image: secWindow, type: "reused" },
//   { id: 20, name: "Used Ceiling Panels", slug: "used-ceiling-panels", image: interiorDesign, type: "reused" },
// ];

// // Products: category = category ka name, condition = "new" ya "reused",
// // is_featured = true/false
// const BM_MATERIAL_PRODUCTS = [
//   { id: 1, name: "Red Clay Bricks (A-Class)", slug: "red-clay-bricks", price: 17, unit: "Piece", image: bricks, category: "Bricks & Blocks", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: true },
//   { id: 2, name: "Ravi Sand (Rait)", slug: "ravi-sand", price: 9000, unit: "Trolley", image: sandImage, category: "Sand & Crush", shop: "City Material Traders", location: "Satellite Town", condition: "new", is_featured: true },
//   { id: 3, name: "Steel Saria Grade 60", slug: "steel-saria", price: 265, unit: "Kg", image: steelSaria, category: "Steel & Welding", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "new", is_featured: true },
//   { id: 4, name: "Porcelain Floor Tiles", slug: "porcelain-floor-tiles", price: 95, unit: "Sq Ft", image: architectural, category: "Architectural Products", shop: "Punjab Building Materials", location: "GT Road", condition: "new", is_featured: false },
//   { id: 5, name: "Gold Emulsion Paint", slug: "gold-emulsion-paint", price: 7800, unit: "Bucket", image: paintsFinishes, category: "Paints & Finishes", shop: "Modern Builders Mart", location: "Satellite Town", condition: "new", is_featured: false },
//   { id: 6, name: "Aluminium Sliding Window", slug: "aluminium-sliding-window", price: null, unit: "Window", image: secWindow, category: "Metal & Aluminum Works", shop: "Rehman Builders Supply", location: "Model Town", condition: "new", is_featured: false },
//   { id: 7, name: "Tempered Glass Window", slug: "tempered-glass-window", price: 850, unit: "Sq Ft", image: glassWindow, category: "Glass & Glazing", shop: "Ali & Sons Traders", location: "Model Town", condition: "new", is_featured: false },
//   { id: 8, name: "Copper Electrical Wire", slug: "copper-electrical-wire", price: 2200, unit: "Coil", image: electrical, category: "Electrical & Lighting", shop: "Rana Construction Supply", location: "Peoples Colony", condition: "new", is_featured: false },
//   { id: 9, name: "Wooden Door (Deodar)", slug: "wooden-door-deodar", price: 18000, unit: "Door", image: doorsWindows, category: "Doors & Windows", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: false },
//   { id: 10, name: "Used Red Bricks", slug: "used-red-bricks", price: 10, unit: "Piece", image: bricks, category: "Used Bricks", shop: "Hassan Used Materials", location: "Rahwali", condition: "reused", is_featured: false },
//   { id: 11, name: "Reused Steel Saria", slug: "reused-steel-saria", price: 190, unit: "Kg", image: steelSaria, category: "Reused Steel", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "reused", is_featured: false },
//   { id: 12, name: "Used Wooden Door", slug: "used-wooden-door", price: 7500, unit: "Door", image: doorsWindows, category: "Used Doors & Windows", shop: "Bilal Traders", location: "Wapda Town", condition: "reused", is_featured: false },
// ];

// const sectionHeading =
//   "text-center text-lg font-bold text-[color:var(--primary-text)]";
// const exploreButton =
//   "inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)]";
// const selectClass =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";
// const pageButton =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

// /* =========================================================
//    PAGE
// ========================================================= */

// const Page = () => {
//   // All Products filters ki state
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [condition, setCondition] = useState("all");
//   const [sortBy, setSortBy] = useState("latest");

//   // All Products: featured nahi, aur filters match karein
//   const filteredProducts = BM_MATERIAL_PRODUCTS.filter(
//     (product) =>
//       !product.is_featured &&
//       product.name.toLowerCase().includes(search.trim().toLowerCase()) &&
//       (category === "all" || product.category === category) &&
//       (condition === "all" || product.condition === condition)
//   );

//   if (sortBy === "low") {
//     filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
//   } else if (sortBy === "high") {
//     filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
//   }

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       <BmPageHero
//         title="Find Construction Materials"
//         subtitle="Find and compare construction materials in Gujranwala."
//       />

//       <div className="mx-auto w-full max-w-6xl px-4 py-8">
//         {/* ALL CATEGORIES */}
//         <section>
//           <h2 className={sectionHeading}>All Categories</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter((item) => item.type === "new").map(
//               (item) => (
//                 <BmMaterialCategoryCard
//                   key={item.id}
//                   name={item.name}
//                   image={item.image}
//                   slug={item.slug}
//                   type={item.type}
//                 />
//               )
//             )}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/all-categories" className={exploreButton}>
//               Explore All Categories
//             </Link>
//           </div>
//         </section>

//         {/* REUSED MATERIALS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Reused Materials</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter(
//               (item) => item.type === "reused"
//             ).map((item) => (
//               <BmMaterialCategoryCard
//                 key={item.id}
//                 name={item.name}
//                 image={item.image}
//                 slug={item.slug}
//                 type={item.type}
//               />
//             ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/reused-categories" className={exploreButton}>
//               Explore Reused Materials
//             </Link>
//           </div>
//         </section>

//         {/* FEATURED PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Featured Products</h2>

//           <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured)
//               .slice(0, 3)
//               .map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   slug={product.slug}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/featured" className={exploreButton}>
//               Explore Featured Products
//             </Link>
//           </div>
//         </section>

//         {/* ALL PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>All Products</h2>

//           {/* FILTERS */}
//           <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
//             <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
//               <Search
//                 size={16}
//                 className="text-[color:var(--secondary-text)]"
//               />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//               />
//             </div>

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               aria-label="Filter by category"
//               className={selectClass}
//             >
//               <option value="all">All Categories</option>
//               {BM_MATERIAL_CATEGORIES.map((item) => (
//                 <option key={item.id} value={item.name}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               aria-label="Filter by condition"
//               className={selectClass}
//             >
//               <option value="all">New and Reused</option>
//               <option value="new">New</option>
//               <option value="reused">Reused</option>
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               aria-label="Sort products"
//               className={selectClass}
//             >
//               <option value="latest">Sort by: Latest</option>
//               <option value="low">Price: Low to High</option>
//               <option value="high">Price: High to Low</option>
//             </select>
//           </div>

//           {/* PRODUCTS */}
//           {filteredProducts.length === 0 ? (
//             <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//               No products found.
//             </p>
//           ) : (
//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredProducts.map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   slug={product.slug}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//             </div>
//           )}

//           {/* PAGINATION (abhi kuch implement nahi) */}
//           <div className="mt-8 flex items-center justify-center gap-2">
//             <button type="button" aria-label="Previous page" className={pageButton}>
//               <ChevronLeft size={14} />
//             </button>
//             <button
//               type="button"
//               className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
//             >
//               1
//             </button>
//             <button type="button" className={pageButton}>2</button>
//             <button type="button" className={pageButton}>3</button>
//             <button type="button" aria-label="Next page" className={pageButton}>
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Page;
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import BmPageHero from "../../../component/shared/pageHero/BmPageHero";

// import BmMaterialCategoryCard from "../../../component/shared/materialCard/BmMaterialCategoryCard";

// import BmProductCard from "../../../component/shared/productCard/BmProductCard";


// import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// // Categories: type = "new" ya "reused"
// const BM_MATERIAL_CATEGORIES = [
//   { id: 1, name: "Doors & Windows", slug: "doors-windows", image: "/images/guest/materials/categories/doors-windows.jpg", type: "new" },
//   { id: 2, name: "Electrical & Lighting", slug: "electrical-lighting", image: "/images/guest/materials/categories/electrical-lighting.jpg", type: "new" },
//   { id: 3, name: "Interior Design", slug: "interior-design", image: "/images/guest/materials/categories/interior-design.jpg", type: "new" },
//   { id: 4, name: "Metal & Aluminum Works", slug: "metal-aluminum-works", image: "/images/guest/materials/categories/metal-aluminum-works.jpg", type: "new" },
//   { id: 5, name: "Architectural Products", slug: "architectural-products", image: "/images/guest/materials/categories/architectural-products.jpg", type: "new" },
//   { id: 6, name: "Sand & Crush", slug: "sand-crush", image: "/images/guest/materials/categories/sand-crush.jpg", type: "new" },
//   { id: 7, name: "Steel & Welding", slug: "steel-welding", image: "/images/guest/materials/categories/steel-welding.jpg", type: "new" },
//   { id: 8, name: "Paints & Finishes", slug: "paints-finishes", image: "/images/guest/materials/categories/paints-finishes.jpg", type: "new" },
//   { id: 9, name: "Bricks & Blocks", slug: "bricks-blocks", image: "/images/guest/materials/categories/bricks-blocks.jpg", type: "new" },
//   { id: 10, name: "Glass & Glazing", slug: "glass-glazing", image: "/images/guest/materials/categories/glass-glazing.jpg", type: "new" },

//   { id: 11, name: "Used Bricks", slug: "used-bricks", image: "/images/guest/materials/categories/used-bricks.jpg", type: "reused" },
//   { id: 12, name: "Used Tiles", slug: "used-tiles", image: "/images/guest/materials/categories/used-tiles.jpg", type: "reused" },
//   { id: 13, name: "Leftover Sand", slug: "leftover-sand", image: "/images/guest/materials/categories/leftover-sand.jpg", type: "reused" },
//   { id: 14, name: "Used Glass Windows", slug: "used-glass-windows", image: "/images/guest/materials/categories/used-glass-windows.jpg", type: "reused" },
//   { id: 15, name: "Used Grills & Gates", slug: "used-grills-gates", image: "/images/guest/materials/categories/used-grills-gates.jpg", type: "reused" },
//   { id: 16, name: "Reused Steel", slug: "reused-steel", image: "/images/guest/materials/categories/reused-steel.jpg", type: "reused" },
//   { id: 17, name: "Used Doors & Windows", slug: "used-doors-windows", image: "/images/guest/materials/categories/used-doors-windows.jpg", type: "reused" },
//   { id: 18, name: "Leftover Paint", slug: "leftover-paint", image: "/images/guest/materials/categories/leftover-paint.jpg", type: "reused" },
//   { id: 19, name: "Used Aluminium Windows", slug: "used-aluminium-windows", image: "/images/guest/materials/categories/used-aluminium-windows.jpg", type: "reused" },
//   { id: 20, name: "Used Ceiling Panels", slug: "used-ceiling-panels", image: "/images/guest/materials/categories/used-ceiling-panels.jpg", type: "reused" },
// ];

// // Products: category = category ka name, condition = "new" ya "reused",
// // is_featured = true/false
// const BM_MATERIAL_PRODUCTS = [
//   { id: 1, name: "Red Clay Bricks (A-Class)", price: 16500, unit: "1,000", image: "/images/guest/materials/products/red-clay-bricks.jpg", category: "Bricks & Blocks", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: true },
//   { id: 2, name: "Ravi Sand (Rait)", price: 9000, unit: "trolley", image: "/images/guest/materials/products/ravi-sand.jpg", category: "Sand & Crush", shop: "City Material Traders", location: "Satellite Town", condition: "new", is_featured: true },
//   { id: 3, name: "Steel Saria Grade 60", price: 265, unit: "kg", image: "/images/guest/materials/products/steel-saria.jpg", category: "Steel & Welding", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "new", is_featured: true },
//   { id: 4, name: "Porcelain Floor Tiles", price: 95, unit: "sq ft", image: "/images/guest/materials/products/porcelain-tiles.jpg", category: "Architectural Products", shop: "Punjab Building Materials", location: "GT Road", condition: "new", is_featured: false },
//   { id: 5, name: "Gold Emulsion Paint", price: 7800, unit: "bucket", image: "/images/guest/materials/products/emulsion-paint.jpg", category: "Paints & Finishes", shop: "Modern Builders Mart", location: "Satellite Town", condition: "new", is_featured: false },
//   { id: 6, name: "Aluminium Sliding Window", price: null, unit: "", image: "/images/guest/materials/products/aluminium-window.jpg", category: "Metal & Aluminum Works", shop: "Rehman Builders Supply", location: "Model Town", condition: "new", is_featured: false },
//   { id: 7, name: "Tempered Glass Window", price: 850, unit: "sq ft", image: "/images/guest/materials/products/tempered-glass.jpg", category: "Glass & Glazing", shop: "Ali & Sons Traders", location: "Model Town", condition: "new", is_featured: false },
//   { id: 8, name: "Copper Electrical Wire", price: 2200, unit: "coil", image: "/images/guest/materials/products/copper-wire.jpg", category: "Electrical & Lighting", shop: "Rana Construction Supply", location: "Peoples Colony", condition: "new", is_featured: false },
//   { id: 9, name: "Wooden Door (Deodar)", price: 18000, unit: "door", image: "/images/guest/materials/products/wooden-door.jpg", category: "Doors & Windows", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: false },
//   { id: 10, name: "Used Red Bricks", price: 9500, unit: "1,000", image: "/images/guest/materials/products/used-bricks.jpg", category: "Used Bricks", shop: "Hassan Used Materials", location: "Rahwali", condition: "reused", is_featured: false },
//   { id: 11, name: "Reused Steel Saria", price: 190, unit: "kg", image: "/images/guest/materials/products/reused-steel.jpg", category: "Reused Steel", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "reused", is_featured: false },
//   { id: 12, name: "Used Wooden Door", price: 7500, unit: "door", image: "/images/guest/materials/products/used-door.jpg", category: "Used Doors & Windows", shop: "Bilal Traders", location: "Wapda Town", condition: "reused", is_featured: false },
// ];

// const sectionHeading =
//   "text-center text-lg font-bold text-[color:var(--primary-text)]";
// const exploreButton =
//   "inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)]";
// const selectClass =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";
// const pageButton =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

// /* =========================================================
//    PAGE
// ========================================================= */

// const Page = () => {
//   // All Products filters ki state
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [condition, setCondition] = useState("all");
//   const [sortBy, setSortBy] = useState("latest");

//   // All Products: featured nahi, aur filters match karein
//   const filteredProducts = BM_MATERIAL_PRODUCTS.filter(
//     (product) =>
//       !product.is_featured &&
//       product.name.toLowerCase().includes(search.trim().toLowerCase()) &&
//       (category === "all" || product.category === category) &&
//       (condition === "all" || product.condition === condition)
//   );

//   if (sortBy === "low") {
//     filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
//   } else if (sortBy === "high") {
//     filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
//   }

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       <BmPageHero
//         title="Find Construction Materials"
//         subtitle="Find and compare construction materials in Gujranwala."
//       />

//       <div className="mx-auto w-full max-w-6xl px-4 py-8">
//         {/* ALL CATEGORIES */}
//         <section>
//           <h2 className={sectionHeading}>All Categories</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter((item) => item.type === "new").map(
//               (item) => (
//                 <BmMaterialCategoryCard
//                   key={item.id}
//                   name={item.name}
//                   image={item.image}
//                   slug={item.slug}
//                   type={item.type}
//                 />
//               )
//             )}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/all-categories" className={exploreButton}>
//               Explore All Categories
//             </Link>
//           </div>
//         </section>

//         {/* REUSED MATERIALS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Reused Materials</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter(
//               (item) => item.type === "reused"
//             ).map((item) => (
//               <BmMaterialCategoryCard
//                 key={item.id}
//                 name={item.name}
//                 image={item.image}
//                 slug={item.slug}
//                 type={item.type}
//               />
//             ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/reused-categories" className={exploreButton}>
//               Explore Reused Materials
//             </Link>
//           </div>
//         </section>

//         {/* FEATURED PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Featured Products</h2>

//           <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured)
//               .slice(0, 3)
//               .map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/featured" className={exploreButton}>
//               Explore Featured Products
//             </Link>
//           </div>
//         </section>

//         {/* ALL PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>All Products</h2>

//           {/* FILTERS */}
//           <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
//             <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
//               <Search
//                 size={16}
//                 className="text-[color:var(--secondary-text)]"
//               />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//               />
//             </div>

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               aria-label="Filter by category"
//               className={selectClass}
//             >
//               <option value="all">All Categories</option>
//               {BM_MATERIAL_CATEGORIES.map((item) => (
//                 <option key={item.id} value={item.name}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               aria-label="Filter by condition"
//               className={selectClass}
//             >
//               <option value="all">New and Reused</option>
//               <option value="new">New</option>
//               <option value="reused">Reused</option>
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               aria-label="Sort products"
//               className={selectClass}
//             >
//               <option value="latest">Sort by: Latest</option>
//               <option value="low">Price: Low to High</option>
//               <option value="high">Price: High to Low</option>
//             </select>
//           </div>

//           {/* PRODUCTS */}
//           {filteredProducts.length === 0 ? (
//             <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//               No products found.
//             </p>
//           ) : (
//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredProducts.map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//             </div>
//           )}

//           {/* PAGINATION (abhi kuch implement nahi) */}
//           <div className="mt-8 flex items-center justify-center gap-2">
//             <button type="button" aria-label="Previous page" className={pageButton}>
//               <ChevronLeft size={14} />
//             </button>
//             <button
//               type="button"
//               className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
//             >
//               1
//             </button>
//             <button type="button" className={pageButton}>2</button>
//             <button type="button" className={pageButton}>3</button>
//             <button type="button" aria-label="Next page" className={pageButton}>
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Page;





// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import BmPageHero from "../../../component/shared/pageHero/BmPageHero";

// import BmMaterialCategoryCard from "../../../component/shared/materialCard/BmMaterialCategoryCard";

// import BmProductCard from "../../../component/shared/productCard/BmProductCard";

// import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// // Categories: type = "new" ya "reused"
// const BM_MATERIAL_CATEGORIES = [
//   { id: 1, name: "Doors & Windows", slug: "doors-windows", image: doorsWindows, type: "new" },
//   { id: 2, name: "Electrical & Lighting", slug: "electrical-lighting", image: electrical, type: "new" },
//   { id: 3, name: "Interior Design", slug: "interior-design", image: interiorDesign, type: "new" },
//   { id: 4, name: "Metal & Aluminum Works", slug: "metal-aluminum-works", image: metalAluminum, type: "new" },
//   { id: 5, name: "Architectural Products", slug: "architectural-products", image: architectural, type: "new" },
//   { id: 6, name: "Sand & Crush", slug: "sand-crush", image: sandImage, type: "new" },
//   { id: 7, name: "Steel & Welding", slug: "steel-welding", image: steelSaria, type: "new" },
//   { id: 8, name: "Paints & Finishes", slug: "paints-finishes", image: paintsFinishes, type: "new" },
//   { id: 9, name: "Bricks & Blocks", slug: "bricks-blocks", image: bricks, type: "new" },
//   { id: 10, name: "Glass & Glazing", slug: "glass-glazing", image: glassWindow, type: "new" },

//   { id: 11, name: "Used Bricks", slug: "used-bricks", image: bricks, type: "reused" },
//   { id: 12, name: "Used Tiles", slug: "used-tiles", image: architectural, type: "reused" },
//   { id: 13, name: "Leftover Sand", slug: "leftover-sand", image: sandImage, type: "reused" },
//   { id: 14, name: "Used Glass Windows", slug: "used-glass-windows", image: glassWindow, type: "reused" },
//   { id: 15, name: "Used Grills & Gates", slug: "used-grills-gates", image: metalAluminum, type: "reused" },
//   { id: 16, name: "Reused Steel", slug: "reused-steel", image: steelSaria, type: "reused" },
//   { id: 17, name: "Used Doors & Windows", slug: "used-doors-windows", image: doorsWindows, type: "reused" },
//   { id: 18, name: "Leftover Paint", slug: "leftover-paint", image: paintsFinishes, type: "reused" },
//   { id: 19, name: "Used Aluminium Windows", slug: "used-aluminium-windows", image: secWindow, type: "reused" },
//   { id: 20, name: "Used Ceiling Panels", slug: "used-ceiling-panels", image: interiorDesign, type: "reused" },
// ];

// // Products: category = category ka name, condition = "new" ya "reused",
// // is_featured = true/false
// const BM_MATERIAL_PRODUCTS = [
//   { id: 1, name: "Red Clay Bricks (A-Class)", price: 16500, unit: "1,000", image: bricks, category: "Bricks & Blocks", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: true },
//   { id: 2, name: "Ravi Sand (Rait)", price: 9000, unit: "trolley", image: sandImage, category: "Sand & Crush", shop: "City Material Traders", location: "Satellite Town", condition: "new", is_featured: true },
//   { id: 3, name: "Steel Saria Grade 60", price: 265, unit: "kg", image: steelSaria, category: "Steel & Welding", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "new", is_featured: true },
//   { id: 4, name: "Porcelain Floor Tiles", price: 95, unit: "sq ft", image: architectural, category: "Architectural Products", shop: "Punjab Building Materials", location: "GT Road", condition: "new", is_featured: false },
//   { id: 5, name: "Gold Emulsion Paint", price: 7800, unit: "bucket", image: paintsFinishes, category: "Paints & Finishes", shop: "Modern Builders Mart", location: "Satellite Town", condition: "new", is_featured: false },
//   { id: 6, name: "Aluminium Sliding Window", price: null, unit: "", image: secWindow, category: "Metal & Aluminum Works", shop: "Rehman Builders Supply", location: "Model Town", condition: "new", is_featured: false },
//   { id: 7, name: "Tempered Glass Window", price: 850, unit: "sq ft", image: glassWindow, category: "Glass & Glazing", shop: "Ali & Sons Traders", location: "Model Town", condition: "new", is_featured: false },
//   { id: 8, name: "Copper Electrical Wire", price: 2200, unit: "coil", image: electrical, category: "Electrical & Lighting", shop: "Rana Construction Supply", location: "Peoples Colony", condition: "new", is_featured: false },
//   { id: 9, name: "Wooden Door (Deodar)", price: 18000, unit: "door", image: doorsWindows, category: "Doors & Windows", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: false },
//   { id: 10, name: "Used Red Bricks", price: 9500, unit: "1,000", image: bricks, category: "Used Bricks", shop: "Hassan Used Materials", location: "Rahwali", condition: "reused", is_featured: false },
//   { id: 11, name: "Reused Steel Saria", price: 190, unit: "kg", image: steelSaria, category: "Reused Steel", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "reused", is_featured: false },
//   { id: 12, name: "Used Wooden Door", price: 7500, unit: "door", image: doorsWindows, category: "Used Doors & Windows", shop: "Bilal Traders", location: "Wapda Town", condition: "reused", is_featured: false },
// ];

// const sectionHeading =
//   "text-center text-lg font-bold text-[color:var(--primary-text)]";
// const exploreButton =
//   "inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)]";
// const selectClass =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";
// const pageButton =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

// /* =========================================================
//    PAGE
// ========================================================= */

// const Page = () => {
//   // All Products filters ki state
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [condition, setCondition] = useState("all");
//   const [sortBy, setSortBy] = useState("latest");

//   // All Products: featured nahi, aur filters match karein
//   const filteredProducts = BM_MATERIAL_PRODUCTS.filter(
//     (product) =>
//       !product.is_featured &&
//       product.name.toLowerCase().includes(search.trim().toLowerCase()) &&
//       (category === "all" || product.category === category) &&
//       (condition === "all" || product.condition === condition)
//   );

//   if (sortBy === "low") {
//     filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
//   } else if (sortBy === "high") {
//     filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
//   }

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       <BmPageHero
//         title="Find Construction Materials"
//         subtitle="Find and compare construction materials in Gujranwala."
//       />

//       <div className="mx-auto w-full max-w-6xl px-4 py-8">
//         {/* ALL CATEGORIES */}
//         <section>
//           <h2 className={sectionHeading}>All Categories</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter((item) => item.type === "new").map(
//               (item) => (
//                 <BmMaterialCategoryCard
//                   key={item.id}
//                   name={item.name}
//                   image={item.image}
//                   slug={item.slug}
//                   type={item.type}
//                 />
//               )
//             )}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/all-categories" className={exploreButton}>
//               Explore All Categories
//             </Link>
//           </div>
//         </section>

//         {/* REUSED MATERIALS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Reused Materials</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter(
//               (item) => item.type === "reused"
//             ).map((item) => (
//               <BmMaterialCategoryCard
//                 key={item.id}
//                 name={item.name}
//                 image={item.image}
//                 slug={item.slug}
//                 type={item.type}
//               />
//             ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/reused-categories" className={exploreButton}>
//               Explore Reused Materials
//             </Link>
//           </div>
//         </section>

//         {/* FEATURED PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Featured Products</h2>

//           <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured)
//               .slice(0, 3)
//               .map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/featured" className={exploreButton}>
//               Explore Featured Products
//             </Link>
//           </div>
//         </section>

//         {/* ALL PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>All Products</h2>

//           {/* FILTERS */}
//           <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
//             <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
//               <Search
//                 size={16}
//                 className="text-[color:var(--secondary-text)]"
//               />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//               />
//             </div>

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               aria-label="Filter by category"
//               className={selectClass}
//             >
//               <option value="all">All Categories</option>
//               {BM_MATERIAL_CATEGORIES.map((item) => (
//                 <option key={item.id} value={item.name}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               aria-label="Filter by condition"
//               className={selectClass}
//             >
//               <option value="all">New and Reused</option>
//               <option value="new">New</option>
//               <option value="reused">Reused</option>
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               aria-label="Sort products"
//               className={selectClass}
//             >
//               <option value="latest">Sort by: Latest</option>
//               <option value="low">Price: Low to High</option>
//               <option value="high">Price: High to Low</option>
//             </select>
//           </div>

//           {/* PRODUCTS */}
//           {filteredProducts.length === 0 ? (
//             <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//               No products found.
//             </p>
//           ) : (
//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredProducts.map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//             </div>
//           )}

//           {/* PAGINATION (abhi kuch implement nahi) */}
//           <div className="mt-8 flex items-center justify-center gap-2">
//             <button type="button" aria-label="Previous page" className={pageButton}>
//               <ChevronLeft size={14} />
//             </button>
//             <button
//               type="button"
//               className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
//             >
//               1
//             </button>
//             <button type="button" className={pageButton}>2</button>
//             <button type="button" className={pageButton}>3</button>
//             <button type="button" aria-label="Next page" className={pageButton}>
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Page;




// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import BmPageHero from "../../../component/shared/pageHero/BmPageHero";
// import BmMaterialCategoryCard from "../../../component/shared/materialCard/BmMaterialCategoryCard";
// import BmProductCard from "../../../component/shared/productCard/BmProductCard";
// import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// // Categories: type = "new" ya "reused"
// const BM_MATERIAL_CATEGORIES = [
//   { id: 1, name: "Doors & Windows", slug: "doors-windows", image: doorsWindows, type: "new" },
//   { id: 2, name: "Electrical & Lighting", slug: "electrical-lighting", image: electrical, type: "new" },
//   { id: 3, name: "Interior Design", slug: "interior-design", image: interiorDesign, type: "new" },
//   { id: 4, name: "Metal & Aluminum Works", slug: "metal-aluminum-works", image: metalAluminum, type: "new" },
//   { id: 5, name: "Architectural Products", slug: "architectural-products", image: architectural, type: "new" },
//   { id: 6, name: "Sand & Crush", slug: "sand-crush", image: sandImage, type: "new" },
//   { id: 7, name: "Steel & Welding", slug: "steel-welding", image: steelSaria, type: "new" },
//   { id: 8, name: "Paints & Finishes", slug: "paints-finishes", image: paintsFinishes, type: "new" },
//   { id: 9, name: "Bricks & Blocks", slug: "bricks-blocks", image: bricks, type: "new" },
//   { id: 10, name: "Glass & Glazing", slug: "glass-glazing", image: glassWindow, type: "new" },

//   { id: 11, name: "Used Bricks", slug: "used-bricks", image: bricks, type: "reused" },
//   { id: 12, name: "Used Tiles", slug: "used-tiles", image: architectural, type: "reused" },
//   { id: 13, name: "Leftover Sand", slug: "leftover-sand", image: sandImage, type: "reused" },
//   { id: 14, name: "Used Glass Windows", slug: "used-glass-windows", image: glassWindow, type: "reused" },
//   { id: 15, name: "Used Grills & Gates", slug: "used-grills-gates", image: metalAluminum, type: "reused" },
//   { id: 16, name: "Reused Steel", slug: "reused-steel", image: steelSaria, type: "reused" },
//   { id: 17, name: "Used Doors & Windows", slug: "used-doors-windows", image: doorsWindows, type: "reused" },
//   { id: 18, name: "Leftover Paint", slug: "leftover-paint", image: paintsFinishes, type: "reused" },
//   { id: 19, name: "Used Aluminium Windows", slug: "used-aluminium-windows", image: secWindow, type: "reused" },
//   { id: 20, name: "Used Ceiling Panels", slug: "used-ceiling-panels", image: interiorDesign, type: "reused" },
// ];

// // Products: category = category ka name, condition = "new" ya "reused",
// // is_featured = true/false
// const BM_MATERIAL_PRODUCTS = [
//   { id: 1, name: "Red Clay Bricks (A-Class)", slug: "red-clay-bricks", price: 16500, unit: "1,000", image: bricks, category: "Bricks & Blocks", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: true },
//   { id: 2, name: "Ravi Sand (Rait)", slug: "ravi-sand", price: 9000, unit: "trolley", image: sandImage, category: "Sand & Crush", shop: "City Material Traders", location: "Satellite Town", condition: "new", is_featured: true },
//   { id: 3, name: "Steel Saria Grade 60", slug: "steel-saria", price: 265, unit: "kg", image: steelSaria, category: "Steel & Welding", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "new", is_featured: true },
//   { id: 4, name: "Porcelain Floor Tiles", slug: "porcelain-floor-tiles", price: 95, unit: "sq ft", image: architectural, category: "Architectural Products", shop: "Punjab Building Materials", location: "GT Road", condition: "new", is_featured: false },
//   { id: 5, name: "Gold Emulsion Paint", slug: "gold-emulsion-paint", price: 7800, unit: "bucket", image: paintsFinishes, category: "Paints & Finishes", shop: "Modern Builders Mart", location: "Satellite Town", condition: "new", is_featured: false },
//   { id: 6, name: "Aluminium Sliding Window", slug: "aluminium-sliding-window", price: null, unit: "window", image: secWindow, category: "Metal & Aluminum Works", shop: "Rehman Builders Supply", location: "Model Town", condition: "new", is_featured: false },
//   { id: 7, name: "Tempered Glass Window", slug: "tempered-glass-window", price: 850, unit: "sq ft", image: glassWindow, category: "Glass & Glazing", shop: "Ali & Sons Traders", location: "Model Town", condition: "new", is_featured: false },
//   { id: 8, name: "Copper Electrical Wire", slug: "copper-electrical-wire", price: 2200, unit: "coil", image: electrical, category: "Electrical & Lighting", shop: "Rana Construction Supply", location: "Peoples Colony", condition: "new", is_featured: false },
//   { id: 9, name: "Wooden Door (Deodar)", slug: "wooden-door-deodar", price: 18000, unit: "door", image: doorsWindows, category: "Doors & Windows", shop: "Al-Noor Building Store", location: "GT Road", condition: "new", is_featured: false },
//   { id: 10, name: "Used Red Bricks", slug: "used-red-bricks", price: 9500, unit: "1,000", image: bricks, category: "Used Bricks", shop: "Hassan Used Materials", location: "Rahwali", condition: "reused", is_featured: false },
//   { id: 11, name: "Reused Steel Saria", slug: "reused-steel-saria", price: 190, unit: "kg", image: steelSaria, category: "Reused Steel", shop: "Zahid Construction Materials", location: "Peoples Colony", condition: "reused", is_featured: false },
//   { id: 12, name: "Used Wooden Door", slug: "used-wooden-door", price: 7500, unit: "door", image: doorsWindows, category: "Used Doors & Windows", shop: "Bilal Traders", location: "Wapda Town", condition: "reused", is_featured: false },
// ];

// const sectionHeading =
//   "text-center text-lg font-bold text-[color:var(--primary-text)]";
// const exploreButton =
//   "inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] transition-colors hover:bg-[var(--hover-yellow)]";
// const selectClass =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";
// const pageButton =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

// /* =========================================================
//    PAGE
// ========================================================= */

// const Page = () => {
//   // All Products filters ki state
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [condition, setCondition] = useState("all");
//   const [sortBy, setSortBy] = useState("latest");

//   // All Products: featured nahi, aur filters match karein
//   const filteredProducts = BM_MATERIAL_PRODUCTS.filter(
//     (product) =>
//       !product.is_featured &&
//       product.name.toLowerCase().includes(search.trim().toLowerCase()) &&
//       (category === "all" || product.category === category) &&
//       (condition === "all" || product.condition === condition)
//   );

//   if (sortBy === "low") {
//     filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
//   } else if (sortBy === "high") {
//     filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
//   }

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       <BmPageHero
//         title="Find Construction Materials"
//         subtitle="Find and compare construction materials in Gujranwala."
//       />

//       <div className="mx-auto w-full max-w-6xl px-4 py-8">
//         {/* ALL CATEGORIES */}
//         <section>
//           <h2 className={sectionHeading}>All Categories</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter((item) => item.type === "new").map(
//               (item) => (
//                 <BmMaterialCategoryCard
//                   key={item.id}
//                   name={item.name}
//                   image={item.image}
//                   slug={item.slug}
//                   type={item.type}
//                 />
//               )
//             )}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/all-categories" className={exploreButton}>
//               Explore All Categories
//             </Link>
//           </div>
//         </section>

//         {/* REUSED MATERIALS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Reused Materials</h2>

//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter(
//               (item) => item.type === "reused"
//             ).map((item) => (
//               <BmMaterialCategoryCard
//                 key={item.id}
//                 name={item.name}
//                 image={item.image}
//                 slug={item.slug}
//                 type={item.type}
//               />
//             ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/reused-categories" className={exploreButton}>
//               Explore Reused Materials
//             </Link>
//           </div>
//         </section>

//         {/* FEATURED PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>Featured Products</h2>

//           <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured)
//               .slice(0, 3)
//               .map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   slug={product.slug}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//           </div>

//           <div className="mt-5 text-center">
//             <Link href="/materials/featured" className={exploreButton}>
//               Explore Featured Products
//             </Link>
//           </div>
//         </section>

//         {/* ALL PRODUCTS */}
//         <section className="mt-12">
//           <h2 className={sectionHeading}>All Products</h2>

//           {/* FILTERS */}
//           <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
//             <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
//               <Search
//                 size={16}
//                 className="text-[color:var(--secondary-text)]"
//               />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//               />
//             </div>

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               aria-label="Filter by category"
//               className={selectClass}
//             >
//               <option value="all">All Categories</option>
//               {BM_MATERIAL_CATEGORIES.map((item) => (
//                 <option key={item.id} value={item.name}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               aria-label="Filter by condition"
//               className={selectClass}
//             >
//               <option value="all">New and Reused</option>
//               <option value="new">New</option>
//               <option value="reused">Reused</option>
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               aria-label="Sort products"
//               className={selectClass}
//             >
//               <option value="latest">Sort by: Latest</option>
//               <option value="low">Price: Low to High</option>
//               <option value="high">Price: High to Low</option>
//             </select>
//           </div>

//           {/* PRODUCTS */}
//           {filteredProducts.length === 0 ? (
//             <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//               No products found.
//             </p>
//           ) : (
//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredProducts.map((product) => (
//                 <BmProductCard
//                   key={product.id}
//                   name={product.name}
//                   slug={product.slug}
//                   price={product.price}
//                   unit={product.unit}
//                   image={product.image}
//                   shop={product.shop}
//                   location={product.location}
//                   condition={product.condition}
//                   is_featured={product.is_featured}
//                 />
//               ))}
//             </div>
//           )}

//           {/* PAGINATION (abhi kuch implement nahi) */}
//           <div className="mt-8 flex items-center justify-center gap-2">
//             <button type="button" aria-label="Previous page" className={pageButton}>
//               <ChevronLeft size={14} />
//             </button>
//             <button
//               type="button"
//               className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
//             >
//               1
//             </button>
//             <button type="button" className={pageButton}>2</button>
//             <button type="button" className={pageButton}>3</button>
//             <button type="button" aria-label="Next page" className={pageButton}>
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Page;