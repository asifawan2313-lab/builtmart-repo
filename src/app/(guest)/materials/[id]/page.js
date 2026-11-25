//(guest)/materials/[id]/page.js 
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, List, Search } from "lucide-react";
import BmPageHero from "../../../../component/shared/pageHero/BmPageHero";
import BmMaterialCategoryCard from "../../../../component/shared/materialCard/BmMaterialCategoryCard";
import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
import doorsWindows from "../../../../assets/images/guest/card/doorsWindows.jpg";
import electrical from "../../../../assets/images/guest/card/copperwire.jpg";
import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
import interiorDesign from "../../../../assets/images/guest/card/ceiling.jpg";
import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";
import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
import architectural from "../../../../assets/images/guest/card/tiles.jpg";
import bricks from "../../../../assets/images/guest/card/briks.jpg";
import sandImage from "../../../../assets/images/guest/card/sand.jpg";
import glassWindow from "../../../../assets/images/guest/card/window.jpg";
import secWindow from "../../../../assets/images/guest/card/secwindow.jpg";

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

/* =========================================================
   PAGE

   /materials/featured           -> sirf featured products
   /materials/all-categories     -> sari new categories
   /materials/reused-categories  -> sari reused categories
   /materials/bricks-blocks      -> us category ke products
   (product detail: /materials/[id]/[slug] wali alag file mein)
========================================================= */

const Page = () => {
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const isFeatured = id === "featured";
  const isAllCategories = id === "all-categories";
  const isReusedCategories = id === "reused-categories";
  const selectedCategory = BM_MATERIAL_CATEGORIES.find(
    (item) => item.slug === id
  );

  const isCategoryPage = isAllCategories || isReusedCategories;
  const isListingPage = isFeatured || selectedCategory;

  // Page ke hisab se title aur products select karein
  let pageTitle = "Page Not Found";
  let pageSubtitle = "This page does not exist.";
  let pageProducts = [];

  if (isFeatured) {
    pageTitle = "Featured Products";
    pageSubtitle = "Hand-picked construction materials from Gujranwala suppliers.";
    pageProducts = BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured);
  } else if (isAllCategories) {
    pageTitle = "All Categories";
    pageSubtitle = "Browse all construction material categories in Gujranwala.";
  } else if (isReusedCategories) {
    pageTitle = "Reused Materials";
    pageSubtitle = "Browse all reused material categories in Gujranwala.";
  } else if (selectedCategory) {
    pageTitle = selectedCategory.name;
    pageSubtitle = "Products available from Gujranwala suppliers.";
    pageProducts = BM_MATERIAL_PRODUCTS.filter(
      (product) => product.category === selectedCategory.name
    );
  }

  // Search sirf isi page ke products ke andar chalti hai
  const searchedProducts = pageProducts.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[var(--off-white-background)]">
      <BmPageHero title={pageTitle} subtitle={pageSubtitle} />

      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {(isCategoryPage || isListingPage) && (
          <Link
            href="/materials"
            className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <ArrowLeft size={14} />
            Back to Materials
          </Link>
        )}

        {/* CATEGORIES LISTING */}
        {isCategoryPage && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {BM_MATERIAL_CATEGORIES.filter(
              (item) => item.type === (isReusedCategories ? "reused" : "new")
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
        )}

        {/* PRODUCTS LISTING (Featured ya Category) */}
        {isListingPage && (
          <div className="mt-5">
            {/* Search + Grid/List toggle */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 sm:max-w-xs">
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

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`rounded-md border p-2 transition-colors ${
                    view === "grid"
                      ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                      : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`rounded-md border p-2 transition-colors ${
                    view === "list"
                      ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                      : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-[color:var(--secondary-text)]">
              {searchedProducts.length}{" "}
              {searchedProducts.length === 1 ? "product" : "products"} found
            </p>

            {searchedProducts.length === 0 ? (
              <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
                No products found.
              </p>
            ) : (
              <div
                className={`mt-4 ${
                  view === "grid"
                    ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-4"
                }`}
              >
                {searchedProducts.map((product) => (
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
                    view={view}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOT FOUND */}
        {!isCategoryPage && !isListingPage && (
          <div className="py-10 text-center">
            <p className="text-sm text-[color:var(--secondary-text)]">
              Category not found.
            </p>
            <Link
              href="/materials"
              className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              <ArrowLeft size={14} />
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Heart,
//   LayoutGrid,
//   List,
//   MapPin,
//   MessageCircle,
//   Minus,
//   Plus,
//   Search,
//   Share2,
//   ShoppingCart,
//   Star,
//   Store,
//   User,
//   X,
// } from "lucide-react";
// import BmPageHero from "../../../../component/shared/pageHero/BmPageHero";
// import BmMaterialCategoryCard from "../../../../component/shared/materialCard/BmMaterialCategoryCard";
// import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
// import doorsWindows from "../../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../../assets/images/guest/card/secwindow.jpg";

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
// // is_featured = true/false. moq = minimum order quantity (unit mein).
// // images = detail page ki gallery (ek ya zyada images)
// // unit / unitPlural = quantity ke saath dikhne wali unit (1 Door, 2 Doors)
// const BM_MATERIAL_PRODUCTS = [
//   {
//     id: 1,
//     name: "Red Clay Bricks (A-Class)",
//     slug: "red-clay-bricks",
//     price: 17,
//     unit: "Piece",
//     unitPlural: "Pieces",
//     moq: 1000,
//     image: bricks,
//     images: [bricks],
//     category: "Bricks & Blocks",
//     shop: "Al-Noor Building Store",
//     location: "GT Road",
//     condition: "new",
//     is_featured: true,
//     specifications: [
//       { label: "Grade", value: "A-Class" },
//       { label: "Size", value: "9 x 4.5 x 3 inch" },
//     ],
//     overview: "Well-burnt red clay bricks for load-bearing and partition walls. A common choice for house construction in Gujranwala.",
//     features: ["Uniform size and shape", "Well-burnt with good strength", "Low breakage during delivery"],
//     applications: ["House and building walls", "Boundary walls", "Foundation and plinth work"],
//     benefits: ["Easy to lay and plaster", "Keeps rooms comfortable in hot weather", "Locally available at a fair price"],
//     whyChoose: "Supplied by a local Gujranwala shop, so you can check the quality and arrange delivery quickly.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "03/11/2026", rating: 5, comment: "Good quality bricks with very few broken pieces." },
//       { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 4, comment: "Delivery was on time and the colour was uniform." },
//       { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 5, comment: "Strong bricks and the plaster sticks well." },
//       { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 4, comment: "Fair rate compared to other shops." },
//       { id: 5, name: "Sana B.", date: "08/10/2026", rating: 3, comment: "A few pieces were chipped but overall fine." },
//     ],
//   },
//   {
//     id: 2,
//     name: "Ravi Sand (Rait)",
//     slug: "ravi-sand",
//     price: 9000,
//     unit: "Trolley",
//     unitPlural: "Trolleys",
//     moq: 1,
//     image: sandImage,
//     images: [sandImage],
//     category: "Sand & Crush",
//     shop: "City Material Traders",
//     location: "Satellite Town",
//     condition: "new",
//     is_featured: true,
//     specifications: [
//       { label: "Type", value: "Ravi sand (Rait)" },
//       { label: "Grain", value: "Medium-fine" },
//     ],
//     overview: "Clean Ravi sand (Rait) used for plaster, masonry mortar and concrete mixing.",
//     features: ["Clean with low dust", "Medium-fine grain", "Supplied by the trolley"],
//     applications: ["Plaster work", "Brick and block masonry", "Concrete mixing with cement"],
//     benefits: ["Smooth finish in plaster", "Good binding with cement", "Easy to order by trolley"],
//     whyChoose: "A local supplier near you means shorter delivery time and easier repeat orders for ongoing work.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 4, comment: "Clean sand and a smooth plaster finish." },
//       { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Full trolley as promised." },
//       { id: 3, name: "Sana B.", date: "20/10/2026", rating: 5, comment: "Very little dust, good for masonry." },
//       { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 3, comment: "Delivery took a day longer than expected." },
//       { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 4, comment: "Good value for the price." },
//     ],
//   },
//   {
//     id: 3,
//     name: "Steel Saria Grade 60",
//     slug: "steel-saria",
//     price: 265,
//     unit: "Kg",
//     unitPlural: "Kg",
//     moq: 500,
//     image: steelSaria,
//     images: [steelSaria],
//     category: "Steel & Welding",
//     shop: "Zahid Construction Materials",
//     location: "Peoples Colony",
//     condition: "new",
//     is_featured: true,
//     specifications: [
//       { label: "Grade", value: "Grade 60" },
//       { label: "Type", value: "Deformed bars" },
//     ],
//     overview: "Grade 60 deformed steel bars (saria) for reinforced concrete work in houses and commercial buildings.",
//     features: ["High tensile strength", "Deformed surface grips concrete well", "Available in different sizes"],
//     applications: ["Columns and beams", "Roof slabs", "Foundations"],
//     benefits: ["Strong reinforcement for concrete", "Suitable for multi-storey work", "Sold by weight for exact billing"],
//     whyChoose: "Buy by the kilogram from a Gujranwala supplier and compare the rate with other shops on BuildMart.",
//     reviews: [
//       { id: 1, name: "Sana B.", date: "03/11/2026", rating: 5, comment: "Bars were straight and the weight matched the bill." },
//       { id: 2, name: "Hassan J.", date: "27/10/2026", rating: 4, comment: "Good rate for bulk quantity." },
//       { id: 3, name: "Nadia F.", date: "20/10/2026", rating: 5, comment: "Strong steel, easy to bend and tie." },
//       { id: 4, name: "Kamran W.", date: "14/10/2026", rating: 4, comment: "Delivered safely to site." },
//       { id: 5, name: "Bilal N.", date: "08/10/2026", rating: 4, comment: "Supplier explained the sizes clearly." },
//     ],
//   },
//   {
//     id: 4,
//     name: "Porcelain Floor Tiles",
//     slug: "porcelain-floor-tiles",
//     price: 95,
//     unit: "Sq Ft",
//     unitPlural: "Sq Ft",
//     moq: 100,
//     image: architectural,
//     images: [architectural],
//     category: "Architectural Products",
//     shop: "Punjab Building Materials",
//     location: "GT Road",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Type", value: "Porcelain" },
//       { label: "Size", value: "2 x 2 ft" },
//     ],
//     overview: "Glossy porcelain floor tiles for living rooms, bedrooms and offices.",
//     features: ["Smooth glossy surface", "Easy to clean", "Even size for neat fitting"],
//     applications: ["Living rooms and bedrooms", "Offices and shops", "Corridors"],
//     benefits: ["Gives rooms a clean modern look", "Simple daily cleaning", "Long lasting for indoor use"],
//     whyChoose: "Choose by the square foot and order only what your floor needs from a local tile supplier.",
//     reviews: [
//       { id: 1, name: "Nadia F.", date: "03/11/2026", rating: 4, comment: "Tiles look nice and the fitting was neat." },
//       { id: 2, name: "Kamran W.", date: "27/10/2026", rating: 4, comment: "Good finish for the price." },
//       { id: 3, name: "Bilal N.", date: "20/10/2026", rating: 5, comment: "Easy to clean and shiny." },
//       { id: 4, name: "Shazia M.", date: "14/10/2026", rating: 3, comment: "A few tiles had a minor size difference." },
//       { id: 5, name: "Usman R.", date: "08/10/2026", rating: 4, comment: "Supplier helped me calculate the quantity." },
//     ],
//   },
//   {
//     id: 5,
//     name: "Gold Emulsion Paint",
//     slug: "gold-emulsion-paint",
//     price: 7800,
//     unit: "Bucket",
//     unitPlural: "Buckets",
//     moq: 1,
//     image: paintsFinishes,
//     images: [paintsFinishes],
//     category: "Paints & Finishes",
//     shop: "Modern Builders Mart",
//     location: "Satellite Town",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Type", value: "Emulsion paint" },
//       { label: "Finish", value: "Smooth" },
//     ],
//     overview: "Smooth emulsion paint for interior walls and ceilings, sold in ready-to-use buckets.",
//     features: ["Smooth even coverage", "Easy to apply with roller or brush", "Washable finish"],
//     applications: ["Bedroom and lounge walls", "Ceilings", "Office interiors"],
//     benefits: ["Fresh clean look for rooms", "Easy touch-ups", "Wide use in home renovation"],
//     whyChoose: "Buy a full bucket from a local shop and confirm shade and quantity directly with the supplier.",
//     reviews: [
//       { id: 1, name: "Bilal N.", date: "03/11/2026", rating: 5, comment: "Even coverage and the walls look great." },
//       { id: 2, name: "Shazia M.", date: "27/10/2026", rating: 4, comment: "Easy to apply with a roller." },
//       { id: 3, name: "Usman R.", date: "20/10/2026", rating: 4, comment: "Colour matched what I selected." },
//       { id: 4, name: "Ahmad K.", date: "14/10/2026", rating: 5, comment: "Smooth finish on ceilings." },
//       { id: 5, name: "Faisal M.", date: "08/10/2026", rating: 3, comment: "Needed a second coat on one wall." },
//     ],
//   },
//   {
//     id: 6,
//     name: "Aluminium Sliding Window",
//     slug: "aluminium-sliding-window",
//     price: null,
//     unit: "Window",
//     unitPlural: "Windows",
//     moq: 1,
//     image: secWindow,
//     images: [secWindow, glassWindow],
//     category: "Metal & Aluminum Works",
//     shop: "Rehman Builders Supply",
//     location: "Model Town",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Frame", value: "Aluminium" },
//       { label: "Type", value: "Sliding" },
//     ],
//     overview: "Sliding windows with an aluminium frame, made to the size of your openings.",
//     features: ["Smooth sliding action", "Rust-free aluminium frame", "Made-to-measure sizes"],
//     applications: ["Bedrooms and lounges", "Offices", "Shops"],
//     benefits: ["Saves space as it slides, not swings", "Low maintenance", "Clean modern look"],
//     whyChoose: "Price depends on size, so contact the supplier with your measurements to get a quote.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "03/11/2026", rating: 4, comment: "Fitted neatly and slides smoothly." },
//       { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 4, comment: "Quick quote after sending measurements." },
//       { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 5, comment: "Frame looks clean and modern." },
//       { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 3, comment: "Fitting took a little longer than planned." },
//       { id: 5, name: "Sana B.", date: "08/10/2026", rating: 4, comment: "Good option for bedrooms." },
//     ],
//   },
//   {
//     id: 7,
//     name: "Tempered Glass Window",
//     slug: "tempered-glass-window",
//     price: 850,
//     unit: "Sq Ft",
//     unitPlural: "Sq Ft",
//     moq: 20,
//     image: glassWindow,
//     images: [glassWindow, secWindow],
//     category: "Glass & Glazing",
//     shop: "Ali & Sons Traders",
//     location: "Model Town",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Glass", value: "Tempered" },
//       { label: "Thickness", value: "6 mm to 12 mm" },
//     ],
//     overview: "Tempered glass cut to size for windows, partitions and building fronts.",
//     features: ["Stronger than normal glass", "Polished edges", "Cut to required size"],
//     applications: ["Windows", "Office partitions", "Shop fronts and facades"],
//     benefits: ["Better strength for daily use", "Bright and open look", "Suitable for commercial buildings"],
//     whyChoose: "Order by the square foot from a Gujranwala glass trader and get it cut to your size.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 5, comment: "Cut accurately and the edges were clean." },
//       { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Good thickness options for our shop front." },
//       { id: 3, name: "Sana B.", date: "20/10/2026", rating: 4, comment: "Glass is strong and clear." },
//       { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 5, comment: "Delivered without any damage." },
//       { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 3, comment: "Price is slightly high but quality is good." },
//     ],
//   },
//   {
//     id: 8,
//     name: "Copper Electrical Wire",
//     slug: "copper-electrical-wire",
//     price: 2200,
//     unit: "Coil",
//     unitPlural: "Coils",
//     moq: 1,
//     image: electrical,
//     images: [electrical],
//     category: "Electrical & Lighting",
//     shop: "Rana Construction Supply",
//     location: "Peoples Colony",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Conductor", value: "Copper" },
//       { label: "Insulation", value: "PVC" },
//     ],
//     overview: "PVC insulated copper wire for lighting and power wiring in homes and shops.",
//     features: ["Copper conductor", "PVC insulation", "Easy to pull through conduit"],
//     applications: ["House wiring", "Shop and office wiring", "Light and socket circuits"],
//     benefits: ["Reliable electrical connection", "Flexible for easy installation", "Sold in ready coils"],
//     whyChoose: "Buy a full coil from a local electrical supplier and ask about the wire size that suits your load.",
//     reviews: [
//       { id: 1, name: "Sana B.", date: "03/11/2026", rating: 4, comment: "Easy to pull and the insulation looked good." },
//       { id: 2, name: "Hassan J.", date: "27/10/2026", rating: 4, comment: "Fair rate for a full coil." },
//       { id: 3, name: "Nadia F.", date: "20/10/2026", rating: 5, comment: "Used it for full house wiring, no issues." },
//       { id: 4, name: "Kamran W.", date: "14/10/2026", rating: 3, comment: "Coil length could be explained more clearly." },
//       { id: 5, name: "Bilal N.", date: "08/10/2026", rating: 4, comment: "Supplier suggested the right wire size." },
//     ],
//   },
//   {
//     id: 9,
//     name: "Wooden Door (Deodar)",
//     slug: "wooden-door-deodar",
//     price: 18000,
//     unit: "Door",
//     unitPlural: "Doors",
//     moq: 1,
//     image: doorsWindows,
//     images: [doorsWindows],
//     category: "Doors & Windows",
//     shop: "Al-Noor Building Store",
//     location: "GT Road",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Wood", value: "Deodar" },
//       { label: "Type", value: "Solid panel door" },
//     ],
//     overview: "Solid deodar wood door with a natural polish, suitable for main entrances and rooms.",
//     features: ["Solid deodar wood", "Natural polished look", "Standard and custom sizes"],
//     applications: ["Main entrance doors", "Bedroom doors", "Interior rooms"],
//     benefits: ["Strong and long lasting", "Classic wooden appearance", "Can be made to your size"],
//     whyChoose: "Check the wood and polish in person at a local shop before you finalize your order.",
//     reviews: [
//       { id: 1, name: "Nadia F.", date: "03/11/2026", rating: 5, comment: "Solid door and the polish looks very good." },
//       { id: 2, name: "Kamran W.", date: "27/10/2026", rating: 4, comment: "Delivered safely and fitted well." },
//       { id: 3, name: "Bilal N.", date: "20/10/2026", rating: 5, comment: "Looks classic at our main entrance." },
//       { id: 4, name: "Shazia M.", date: "14/10/2026", rating: 4, comment: "Wood quality is good for the price." },
//       { id: 5, name: "Usman R.", date: "08/10/2026", rating: 3, comment: "Took a few days to prepare the size." },
//     ],
//   },
//   {
//     id: 10,
//     name: "Used Red Bricks",
//     slug: "used-red-bricks",
//     price: 10,
//     unit: "Piece",
//     unitPlural: "Pieces",
//     moq: 500,
//     image: bricks,
//     images: [bricks],
//     category: "Used Bricks",
//     shop: "Hassan Used Materials",
//     location: "Rahwali",
//     condition: "reused",
//     is_featured: false,
//     specifications: [
//       { label: "Source", value: "Dismantled buildings" },
//       { label: "Condition", value: "Cleaned and reusable" },
//     ],
//     overview: "Cleaned red bricks recovered from dismantled buildings, sold at a lower price than new bricks.",
//     features: ["Cleaned and sorted", "Lower cost than new bricks", "Standard size"],
//     applications: ["Boundary walls", "Garden and outdoor work", "Non-structural walls"],
//     benefits: ["Saves money on budget projects", "Reduces construction waste", "Quick availability"],
//     whyChoose: "A good option for low-cost projects. Inspect the bricks before buying for the work you plan.",
//     reviews: [
//       { id: 1, name: "Bilal N.", date: "03/11/2026", rating: 4, comment: "Good value for a boundary wall." },
//       { id: 2, name: "Shazia M.", date: "27/10/2026", rating: 4, comment: "Bricks were clean and mostly intact." },
//       { id: 3, name: "Usman R.", date: "20/10/2026", rating: 5, comment: "Saved a lot on our budget project." },
//       { id: 4, name: "Ahmad K.", date: "14/10/2026", rating: 3, comment: "A few bricks were cracked." },
//       { id: 5, name: "Faisal M.", date: "08/10/2026", rating: 4, comment: "Quick delivery from Rahwali." },
//     ],
//   },
//   {
//     id: 11,
//     name: "Reused Steel Saria",
//     slug: "reused-steel-saria",
//     price: 190,
//     unit: "Kg",
//     unitPlural: "Kg",
//     moq: 200,
//     image: steelSaria,
//     images: [steelSaria],
//     category: "Reused Steel",
//     shop: "Zahid Construction Materials",
//     location: "Peoples Colony",
//     condition: "reused",
//     is_featured: false,
//     specifications: [
//       { label: "Source", value: "Dismantled structures" },
//       { label: "Type", value: "Saria bars" },
//     ],
//     overview: "Reused steel saria recovered from old structures, suitable for non-critical work at a lower rate.",
//     features: ["Lower price per kg", "Recovered from old structures", "Sold by weight"],
//     applications: ["Fencing and gates", "Temporary structures", "Non-critical reinforcement"],
//     benefits: ["Budget-friendly steel", "Helps reuse building material", "Available in bulk"],
//     whyChoose: "Ask the supplier about the condition of the bars and get advice before using them in structural work.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "03/11/2026", rating: 4, comment: "Worked well for our boundary gate." },
//       { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 3, comment: "Some bars were bent but the rate was low." },
//       { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 4, comment: "Good for fencing work." },
//       { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 4, comment: "Supplier was honest about the condition." },
//       { id: 5, name: "Sana B.", date: "08/10/2026", rating: 3, comment: "Check the bars before buying." },
//     ],
//   },
//   {
//     id: 12,
//     name: "Used Wooden Door",
//     slug: "used-wooden-door",
//     price: 7500,
//     unit: "Door",
//     unitPlural: "Doors",
//     moq: 1,
//     image: doorsWindows,
//     images: [doorsWindows],
//     category: "Used Doors & Windows",
//     shop: "Bilal Traders",
//     location: "Wapda Town",
//     condition: "reused",
//     is_featured: false,
//     specifications: [
//       { label: "Material", value: "Solid wood" },
//       { label: "Condition", value: "Good, minor wear" },
//     ],
//     overview: "Solid wood door in good condition, recovered from a dismantled house.",
//     features: ["Solid wood", "Good condition with minor wear", "Lower price than a new door"],
//     applications: ["Room doors", "Store rooms", "Workshops"],
//     benefits: ["Saves money", "Solid build", "Can be repainted or polished"],
//     whyChoose: "See the door in person at the shop before buying to check its size and condition.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 4, comment: "Sturdy door and looked fine after polish." },
//       { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Good for our store room." },
//       { id: 3, name: "Sana B.", date: "20/10/2026", rating: 5, comment: "Great price for solid wood." },
//       { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 3, comment: "Minor scratches but acceptable." },
//       { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 4, comment: "Easy to repaint." },
//     ],
//   },
// ];

// // Delivery location dropdown ke options
// const BM_LOCATIONS = [
//   "GT Road",
//   "Satellite Town",
//   "Peoples Colony",
//   "Model Town",
//   "Rahwali",
//   "Wapda Town",
//   "Civil Lines",
//   "Garden Town",
// ];

// const BM_EMPTY_QUESTION = { name: "", question: "" };
// const BM_EMPTY_REVIEW = { name: "", rating: 5, comment: "" };

// const fieldClass =
//   "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
// const labelClass = "block text-sm text-[color:var(--secondary-text)]";

// const detailHeading =
//   "text-sm font-bold text-[color:var(--primary-text)]";
// const actionLink =
//   "inline-flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]";

// /* =========================================================
//    PAGE

//    /materials/steel-saria        -> product detail (product ka slug)
//    /materials/featured           -> sirf featured products
//    /materials/all-categories     -> sari new categories
//    /materials/reused-categories  -> sari reused categories
//    /materials/bricks-blocks      -> us category ke products
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [search, setSearch] = useState("");
//   const [view, setView] = useState("grid");
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [deliveryLocation, setDeliveryLocation] = useState("");
//   const [questionOpen, setQuestionOpen] = useState(false);
//   const [reviewOpen, setReviewOpen] = useState(false);
//   const [questionForm, setQuestionForm] = useState(BM_EMPTY_QUESTION);
//   const [reviewForm, setReviewForm] = useState(BM_EMPTY_REVIEW);
//   const reviewBoxRef = useRef(null);

//   // URL ke slug se product / category dhoondhna
//   const selectedProduct = BM_MATERIAL_PRODUCTS.find(
//     (product) => product.slug === id
//   );
//   const selectedCategory = BM_MATERIAL_CATEGORIES.find(
//     (item) => item.slug === id
//   );

//   const isFeatured = id === "featured";
//   const isAllCategories = id === "all-categories";
//   const isReusedCategories = id === "reused-categories";
//   const isCategoryPage = isAllCategories || isReusedCategories;
//   const isListingPage = isFeatured || selectedCategory;

//   // Product badalne par detail page ki state reset
//   useEffect(() => {
//     setQuantity(1);
//     setActiveTab("description");
//     setSelectedImage(0);
//     setDeliveryLocation("");
//     if (reviewBoxRef.current) reviewBoxRef.current.scrollLeft = 0;
//   }, [id]);

//   // Reviews har 3 second baad ek ek card aage move hote hain.
//   // Reviews do dafa render hote hain, is liye end par jump nazar nahi aata.
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const box = reviewBoxRef.current;
//       if (!box || !box.firstElementChild) return;

//       if (box.scrollLeft >= box.scrollWidth / 2) box.scrollLeft = 0;
//       box.scrollBy({ left: box.firstElementChild.offsetWidth, behavior: "smooth" });
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   // Quantity: default 1, minus se 1 se kam nahi hoti.
//   // Unit product ke dataset (unit / unitPlural) se aati hai.
//   const handleMinus = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };
//   const handlePlus = () => setQuantity(quantity + 1);
//   const handleAddToCart = () =>
//     alert(
//       `${quantity} ${quantity > 1 ? selectedProduct.unitPlural : selectedProduct.unit} of ${selectedProduct.name} added to cart (demo)`
//     );
//   const handleViewSupplier = () =>
//     alert(`Supplier page of ${selectedProduct.shop} will be added soon.`);
//   const handleWishlist = () => alert("Please login to add to wishlist.");
//   const handleShare = () => alert("Share this product (demo)");

//   // Tab click: tab highlight ho aur page us section tak scroll kare
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     document.getElementById(tab).scrollIntoView({ behavior: "smooth" });
//   };

//   // Ask Question modal
//   const handleCloseQuestion = () => {
//     setQuestionOpen(false);
//     setQuestionForm(BM_EMPTY_QUESTION);
//   };
//   const handleSubmitQuestion = () => {
//     alert(`Question sent to ${selectedProduct.shop} (demo)`);
//     handleCloseQuestion();
//   };

//   // Add Review modal
//   const handleCloseReview = () => {
//     setReviewOpen(false);
//     setReviewForm(BM_EMPTY_REVIEW);
//   };
//   const handleSubmitReview = () => {
//     alert(`Thank you! Your ${reviewForm.rating}-star review was submitted (demo)`);
//     handleCloseReview();
//   };

//   // ---------- Listing page ka title aur products ----------
//   let pageTitle = "Product Not Found";
//   let pageSubtitle = "This product does not exist.";
//   let pageProducts = [];

//   if (isFeatured) {
//     pageTitle = "Featured Products";
//     pageSubtitle = "Hand-picked construction materials from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured);
//   } else if (isAllCategories) {
//     pageTitle = "All Categories";
//     pageSubtitle = "Browse all construction material categories in Gujranwala.";
//   } else if (isReusedCategories) {
//     pageTitle = "Reused Materials";
//     pageSubtitle = "Browse all reused material categories in Gujranwala.";
//   } else if (selectedCategory) {
//     pageTitle = selectedCategory.name;
//     pageSubtitle = "Products available from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter(
//       (product) => product.category === selectedCategory.name
//     );
//   }

//   // Search sirf isi page ke products ke andar chalti hai
//   const searchedProducts = pageProducts.filter((product) =>
//     product.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       {selectedProduct ? (
//         /* =====================================================
//            PRODUCT DETAIL
//         ===================================================== */
//         <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8">
//           <Link
//             href="/materials"
//             className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//           >
//             <ArrowLeft size={14} />
//             Back to Products
//           </Link>

//           {/* TOP SECTION */}
//           <div className="mt-4 grid gap-6 md:grid-cols-5">
//             {/* Images */}
//             <div className="md:col-span-2">
//               <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 shadow-sm">
//                 <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--border-color)]">
//                   {selectedProduct.images[selectedImage] ? (
//                     <Image
//                       src={selectedProduct.images[selectedImage]}
//                       alt={selectedProduct.name}
//                       fill
//                       unoptimized
//                       sizes="(min-width: 768px) 40vw, 100vw"
//                       className="object-cover"
//                     />
//                   ) : (
//                     <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
//                       No image
//                     </span>
//                   )}
//                 </div>

//                 {/* Thumbnails: sirf tab jab product ki ek se zyada images hon */}
//                 {selectedProduct.images.length > 1 && (
//                   <div className="mt-2 flex gap-2">
//                     {selectedProduct.images.map((img, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => setSelectedImage(index)}
//                         aria-label={`Show image ${index + 1}`}
//                         className={`relative h-14 w-14 overflow-hidden rounded-md border-2 ${
//                           selectedImage === index
//                             ? "border-[var(--primary-yellow)]"
//                             : "border-[color:var(--border-color)]"
//                         }`}
//                       >
//                         <Image
//                           src={img}
//                           alt={`${selectedProduct.name} ${index + 1}`}
//                           fill
//                           unoptimized
//                           sizes="56px"
//                           className="object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Details */}
//             <div className="md:col-span-3">
//               <div className="flex flex-wrap gap-4">
//                 <button type="button" onClick={handleWishlist} className={actionLink}>
//                   <Heart size={12} /> Wishlist
//                 </button>
//                 <button type="button" onClick={() => setQuestionOpen(true)} className={actionLink}>
//                   <MessageCircle size={12} /> Ask Question
//                 </button>
//                 <button type="button" onClick={() => setReviewOpen(true)} className={actionLink}>
//                   <Star size={12} /> Add Review
//                 </button>
//                 <button type="button" onClick={handleShare} className={actionLink}>
//                   <Share2 size={12} /> Share
//                 </button>
//               </div>

//               <div className="mt-3 flex flex-wrap items-center gap-2">
//                 <h1 className="text-xl font-bold text-[color:var(--primary-text)]">
//                   {selectedProduct.name}
//                 </h1>
//                 <span
//                   className={`rounded-md px-2 py-0.5 text-[10px] font-semibold text-white ${
//                     selectedProduct.condition === "reused"
//                       ? "bg-[#384452]"
//                       : "bg-[var(--charcoal-black)]"
//                   }`}
//                 >
//                   {selectedProduct.condition === "reused" ? "Reused" : "New"}
//                 </span>
//               </div>

//               <p className="mt-2 text-xs text-[color:var(--secondary-text)]">
//                 {selectedProduct.overview}
//               </p>
//               <p className="mt-2 text-xs font-semibold text-[color:var(--primary-text)]">
//                 Note: Minimum Order Quantity {selectedProduct.moq} (per {selectedProduct.unit})
//               </p>

//               <p className="mt-3 text-xl font-bold text-[color:var(--primary-text)]">
//                 {selectedProduct.price
//                   ? `Rs ${selectedProduct.price.toLocaleString("en-US")}`
//                   : "Contact for price"}
//                 {selectedProduct.price && (
//                   <span className="text-xs font-normal text-[color:var(--secondary-text)]">
//                     {" "}
//                     / {selectedProduct.unit}
//                   </span>
//                 )}
//               </p>

//               {/* Quantity */}
//               <div className="mt-3 inline-flex items-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)]">
//                 <button
//                   type="button"
//                   onClick={handleMinus}
//                   aria-label="Decrease quantity"
//                   className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   <Minus size={12} />
//                 </button>
//                 <span className="min-w-24 px-2 text-center text-xs font-medium text-[color:var(--primary-text)]">
//                   {quantity}{" "}
//                   {quantity > 1 ? selectedProduct.unitPlural : selectedProduct.unit}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={handlePlus}
//                   aria-label="Increase quantity"
//                   className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   <Plus size={12} />
//                 </button>
//               </div>

//               {/* Delivery location */}
//               <div className="mt-3 flex w-full max-w-xs items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
//                 <MapPin size={14} className="text-[color:var(--secondary-text)]" />
//                 <select
//                   value={deliveryLocation || selectedProduct.location}
//                   onChange={(e) => setDeliveryLocation(e.target.value)}
//                   aria-label="Delivery location"
//                   className="w-full bg-transparent text-xs text-[color:var(--primary-text)] outline-none"
//                 >
//                   {BM_LOCATIONS.map((place) => (
//                     <option key={place} value={place}>
//                       {place}, Gujranwala
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Buttons */}
//               <div className="mt-3 flex max-w-sm gap-2">
//                 <button
//                   type="button"
//                   onClick={handleAddToCart}
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-3 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   <ShoppingCart size={14} />
//                   Add to Cart
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleViewSupplier}
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--charcoal-black)] bg-[var(--white-cards)] px-3 py-2 text-xs font-semibold text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   <Store size={14} />
//                   View Supplier
//                 </button>
//               </div>

//               <p className="mt-3 text-[11px] text-[color:var(--secondary-text)]">
//                 Supplier:{" "}
//                 <span className="font-semibold text-[color:var(--primary-text)]">
//                   {selectedProduct.shop}
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* SPECIFICATIONS */}
//           <section className="mt-6 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
//             <h2 className={detailHeading}>Specifications</h2>

//             <div className="mt-3 overflow-x-auto">
//               <table className="w-full min-w-[280px] border-collapse text-xs">
//                 <tbody>
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Category</td>
//                     <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                       {selectedProduct.category}
//                     </td>
//                   </tr>
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Condition</td>
//                     <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                       {selectedProduct.condition === "reused" ? "Reused" : "New"}
//                     </td>
//                   </tr>
//                   {selectedProduct.specifications.map((spec) => (
//                     <tr
//                       key={spec.label}
//                       className="border border-[color:var(--border-color)]"
//                     >
//                       <td className="px-3 py-2 text-[color:var(--secondary-text)]">
//                         {spec.label}
//                       </td>
//                       <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                         {spec.value}
//                       </td>
//                     </tr>
//                   ))}
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Unit</td>
//                     <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                       Per {selectedProduct.unit}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* TABS: click par us section tak scroll hota hai */}
//           <div className="mt-6 flex gap-2">
//             <button
//               type="button"
//               onClick={() => handleTabClick("description")}
//               className={`rounded-full border px-4 py-1 text-xs transition-colors ${
//                 activeTab === "description"
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//               }`}
//             >
//               Description
//             </button>
//             <button
//               type="button"
//               onClick={() => handleTabClick("reviews")}
//               className={`rounded-full border px-4 py-1 text-xs transition-colors ${
//                 activeTab === "reviews"
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//               }`}
//             >
//               Reviews
//             </button>
//           </div>

//           {/* DESCRIPTION */}
//           <section
//             id="description"
//             className="mt-4 scroll-mt-24 space-y-4 text-xs text-[color:var(--secondary-text)]"
//           >
//             <h3 className={detailHeading}>
//               {selectedProduct.name} – Quality {selectedProduct.category} for Your
//               Construction Needs
//             </h3>

//             <div>
//               <h4 className={detailHeading}>Product Overview</h4>
//               <p className="mt-1">{selectedProduct.overview}</p>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Key Features:</h4>
//               <div className="mt-1 space-y-1">
//                 {selectedProduct.features.map((item) => (
//                   <p key={item}>{item}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Applications:</h4>
//               <div className="mt-1 space-y-1">
//                 {selectedProduct.applications.map((item) => (
//                   <p key={item}>{item}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Benefits:</h4>
//               <div className="mt-1 space-y-1">
//                 {selectedProduct.benefits.map((item) => (
//                   <p key={item}>{item}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Why Choose This Product?</h4>
//               <p className="mt-1">{selectedProduct.whyChoose}</p>
//             </div>

//             <p className="text-[11px]">
//               Sample description shown for demonstration purposes.
//             </p>
//           </section>

//           {/* REVIEWS (description ke neeche, khud badalte rehte hain) */}
//           <section id="reviews" className="mt-8 scroll-mt-24">
//             <div className="flex flex-wrap items-center justify-between gap-2">
//               <h2 className={detailHeading}>
//                 What buyers say about {selectedProduct.name}
//               </h2>
//               <button
//                 type="button"
//                 onClick={() => setReviewOpen(true)}
//                 className="inline-flex items-center gap-1 rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-[11px] font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//               >
//                 <Plus size={12} />
//                 Add a Review
//               </button>
//             </div>

//             <div ref={reviewBoxRef} className="mt-3 flex overflow-x-hidden">
//               {selectedProduct.reviews
//                 .concat(selectedProduct.reviews)
//                 .map((review, index) => (
//                   <div
//                     key={`${review.id}-${index}`}
//                     className="w-full flex-none pr-3 sm:w-1/2 lg:w-1/4"
//                   >
//                     <div className="h-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 shadow-sm">
//                       <div className="flex items-center gap-0.5">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star
//                             key={star}
//                             size={11}
//                             className={
//                               star <= review.rating
//                                 ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
//                                 : "text-[color:var(--border-color)]"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <p className="mt-2 min-h-12 text-xs text-[color:var(--primary-text)]">
//                         {review.comment}
//                       </p>
//                       <div className="mt-2 flex items-center gap-2 border-t border-[color:var(--border-color)] pt-2">
//                         <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--border-color)] text-[color:var(--secondary-text)]">
//                           <User size={12} />
//                         </span>
//                         <div>
//                           <p className="text-[11px] font-medium text-[color:var(--primary-text)]">
//                             {review.name}
//                           </p>
//                           <p className="text-[10px] text-[color:var(--secondary-text)]">
//                             {review.date}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <p className="mt-2 text-[11px] text-[color:var(--secondary-text)]">
//               Sample reviews shown for demonstration purposes.
//             </p>
//           </section>

//           {/* RELATED PRODUCTS */}
//           <section className="mt-8">
//             <h2 className={detailHeading}>Related Products</h2>

//             {BM_MATERIAL_PRODUCTS.filter(
//               (product) =>
//                 product.category === selectedProduct.category &&
//                 product.id !== selectedProduct.id
//             ).length === 0 ? (
//               <p className="mt-3 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 text-xs text-[color:var(--secondary-text)]">
//                 No other sample products in this category yet.
//               </p>
//             ) : (
//               <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 {BM_MATERIAL_PRODUCTS.filter(
//                   (product) =>
//                     product.category === selectedProduct.category &&
//                     product.id !== selectedProduct.id
//                 ).map((product) => (
//                   <BmProductCard
//                     key={product.id}
//                     name={product.name}
//                     slug={product.slug}
//                     price={product.price}
//                     unit={product.unit}
//                     image={product.image}
//                     shop={product.shop}
//                     location={product.location}
//                     condition={product.condition}
//                     is_featured={product.is_featured}
//                   />
//                 ))}
//               </div>
//             )}
//           </section>

//           {/* ASK QUESTION MODAL */}
//           {questionOpen && (
//             <div
//               onClick={handleCloseQuestion}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
//             >
//               <div
//                 onClick={(e) => e.stopPropagation()}
//                 className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
//               >
//                 <div className="mb-4 flex items-center justify-between gap-3">
//                   <h2 className="text-xl font-semibold text-[color:var(--primary-text)]">
//                     Ask a Question
//                   </h2>
//                   <button
//                     type="button"
//                     onClick={handleCloseQuestion}
//                     aria-label="Close modal"
//                     className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>

//                 <p className="mb-4 text-xs text-[color:var(--secondary-text)]">
//                   About {selectedProduct.name} • {selectedProduct.shop}
//                 </p>

//                 <div>
//                   <label htmlFor="bm-q-name" className={labelClass}>
//                     Your Name
//                   </label>
//                   <input
//                     id="bm-q-name"
//                     value={questionForm.name}
//                     onChange={(e) =>
//                       setQuestionForm({ ...questionForm, name: e.target.value })
//                     }
//                     className={fieldClass}
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <label htmlFor="bm-q-text" className={labelClass}>
//                     Your Question
//                   </label>
//                   <textarea
//                     id="bm-q-text"
//                     rows={4}
//                     value={questionForm.question}
//                     onChange={(e) =>
//                       setQuestionForm({ ...questionForm, question: e.target.value })
//                     }
//                     className={fieldClass}
//                   />
//                 </div>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseQuestion}
//                     className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmitQuestion}
//                     className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                   >
//                     Send Question
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ADD REVIEW MODAL */}
//           {reviewOpen && (
//             <div
//               onClick={handleCloseReview}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
//             >
//               <div
//                 onClick={(e) => e.stopPropagation()}
//                 className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
//               >
//                 <div className="mb-4 flex items-center justify-between gap-3">
//                   <h2 className="text-xl font-semibold text-[color:var(--primary-text)]">
//                     Add a Review
//                   </h2>
//                   <button
//                     type="button"
//                     onClick={handleCloseReview}
//                     aria-label="Close modal"
//                     className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>

//                 <p className="mb-4 text-xs text-[color:var(--secondary-text)]">
//                   {selectedProduct.name}
//                 </p>

//                 <div>
//                   <label htmlFor="bm-r-name" className={labelClass}>
//                     Your Name
//                   </label>
//                   <input
//                     id="bm-r-name"
//                     value={reviewForm.name}
//                     onChange={(e) =>
//                       setReviewForm({ ...reviewForm, name: e.target.value })
//                     }
//                     className={fieldClass}
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <span className={labelClass}>Rating</span>
//                   <div className="mt-1 flex items-center gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         onClick={() => setReviewForm({ ...reviewForm, rating: star })}
//                         aria-label={`${star} star`}
//                       >
//                         <Star
//                           size={22}
//                           className={
//                             star <= reviewForm.rating
//                               ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
//                               : "text-[color:var(--border-color)]"
//                           }
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <label htmlFor="bm-r-text" className={labelClass}>
//                     Your Review
//                   </label>
//                   <textarea
//                     id="bm-r-text"
//                     rows={4}
//                     value={reviewForm.comment}
//                     onChange={(e) =>
//                       setReviewForm({ ...reviewForm, comment: e.target.value })
//                     }
//                     className={fieldClass}
//                   />
//                 </div>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={handleCloseReview}
//                     className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmitReview}
//                     className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         /* =====================================================
//            LISTING (featured / categories) ya NOT FOUND
//         ===================================================== */
//         <>
//           <BmPageHero title={pageTitle} subtitle={pageSubtitle} />

//           <div className="mx-auto w-full max-w-6xl px-4 py-8">
//             {(isCategoryPage || isListingPage) && (
//               <Link
//                 href="/materials"
//                 className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//               >
//                 <ArrowLeft size={14} />
//                 Back to Materials
//               </Link>
//             )}

//             {/* CATEGORIES LISTING */}
//             {isCategoryPage && (
//               <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//                 {BM_MATERIAL_CATEGORIES.filter(
//                   (item) => item.type === (isReusedCategories ? "reused" : "new")
//                 ).map((item) => (
//                   <BmMaterialCategoryCard
//                     key={item.id}
//                     name={item.name}
//                     image={item.image}
//                     slug={item.slug}
//                     type={item.type}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* PRODUCTS LISTING (Featured ya Category) */}
//             {isListingPage && (
//               <div className="mt-5">
//                 {/* Search + Grid/List toggle */}
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex w-full items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 sm:max-w-xs">
//                     <Search
//                       size={16}
//                       className="text-[color:var(--secondary-text)]"
//                     />
//                     <input
//                       type="text"
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       placeholder="Search products..."
//                       className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//                     />
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() => setView("grid")}
//                       aria-label="Grid view"
//                       className={`rounded-md border p-2 transition-colors ${
//                         view === "grid"
//                           ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                           : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                       }`}
//                     >
//                       <LayoutGrid size={16} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setView("list")}
//                       aria-label="List view"
//                       className={`rounded-md border p-2 transition-colors ${
//                         view === "list"
//                           ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                           : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                       }`}
//                     >
//                       <List size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <p className="mt-4 text-xs text-[color:var(--secondary-text)]">
//                   {searchedProducts.length}{" "}
//                   {searchedProducts.length === 1 ? "product" : "products"} found
//                 </p>

//                 {searchedProducts.length === 0 ? (
//                   <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//                     No products found.
//                   </p>
//                 ) : (
//                   <div
//                     className={`mt-4 ${
//                       view === "grid"
//                         ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                         : "flex flex-col gap-4"
//                     }`}
//                   >
//                     {searchedProducts.map((product) => (
//                       <BmProductCard
//                         key={product.id}
//                         name={product.name}
//                         slug={product.slug}
//                         price={product.price}
//                         unit={product.unit}
//                         image={product.image}
//                         shop={product.shop}
//                         location={product.location}
//                         condition={product.condition}
//                         is_featured={product.is_featured}
//                         view={view}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* NOT FOUND */}
//             {!isCategoryPage && !isListingPage && (
//               <div className="py-10 text-center">
//                 <p className="text-sm text-[color:var(--secondary-text)]">
//                   Product not found.
//                 </p>
//                 <Link
//                   href="/materials"
//                   className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   <ArrowLeft size={14} />
//                   Back to Products
//                 </Link>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </main>
//   );
// };

// export default Page;

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Heart,
//   LayoutGrid,
//   List,
//   MapPin,
//   MessageCircle,
//   MessageSquare,
//   Minus,
//   Plus,
//   Search,
//   Share2,
//   ShoppingCart,
//   Star,
//   Store,
//   User,
// } from "lucide-react";
// import BmPageHero from "../../../../component/shared/pageHero/BmPageHero";
// import BmMaterialCategoryCard from "../../../../component/shared/materialCard/BmMaterialCategoryCard";
// import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
// import doorsWindows from "../../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../../assets/images/guest/card/secwindow.jpg";

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
// // is_featured = true/false. moq = minimum order quantity (unit mein).
// // images = detail page ki gallery (ek ya zyada images)
// const BM_MATERIAL_PRODUCTS = [
//   {
//     id: 1,
//     name: "Red Clay Bricks (A-Class)",
//     slug: "red-clay-bricks",
//     price: 16500,
//     unit: "1,000",
//     moq: 1,
//     image: bricks,
//     images: [bricks],
//     category: "Bricks & Blocks",
//     shop: "Al-Noor Building Store",
//     location: "GT Road",
//     condition: "new",
//     is_featured: true,
//     specifications: [
//       { label: "Grade", value: "A-Class" },
//       { label: "Size", value: "9 x 4.5 x 3 inch" },
//       { label: "Colour", value: "Red" },
//       { label: "Use", value: "Walls and boundary walls" },
//     ],
//     overview: "Well-burnt red clay bricks for load-bearing and partition walls. A common choice for house construction in Gujranwala.",
//     features: ["Uniform size and shape", "Well-burnt with good strength", "Low breakage during delivery"],
//     applications: ["House and building walls", "Boundary walls", "Foundation and plinth work"],
//     benefits: ["Easy to lay and plaster", "Keeps rooms comfortable in hot weather", "Locally available at a fair price"],
//     whyChoose: "Supplied by a local Gujranwala shop, so you can check the quality and arrange delivery quickly.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "03/11/2026", rating: 5, comment: "Good quality bricks with very few broken pieces." },
//       { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 4, comment: "Delivery was on time and the colour was uniform." },
//       { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 5, comment: "Strong bricks and the plaster sticks well." },
//       { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 4, comment: "Fair rate compared to other shops." },
//       { id: 5, name: "Sana B.", date: "08/10/2026", rating: 3, comment: "A few pieces were chipped but overall fine." },
//     ],
//   },
//   {
//     id: 2,
//     name: "Ravi Sand (Rait)",
//     slug: "ravi-sand",
//     price: 9000,
//     unit: "trolley",
//     moq: 1,
//     image: sandImage,
//     images: [sandImage],
//     category: "Sand & Crush",
//     shop: "City Material Traders",
//     location: "Satellite Town",
//     condition: "new",
//     is_featured: true,
//     specifications: [
//       { label: "Type", value: "Ravi sand (Rait)" },
//       { label: "Grain", value: "Medium-fine" },
//       { label: "Use", value: "Plaster and masonry mortar" },
//       { label: "Supply", value: "Trolley load" },
//     ],
//     overview: "Clean Ravi sand (Rait) used for plaster, masonry mortar and concrete mixing.",
//     features: ["Clean with low dust", "Medium-fine grain", "Supplied by the trolley"],
//     applications: ["Plaster work", "Brick and block masonry", "Concrete mixing with cement"],
//     benefits: ["Smooth finish in plaster", "Good binding with cement", "Easy to order by trolley"],
//     whyChoose: "A local supplier near you means shorter delivery time and easier repeat orders for ongoing work.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 4, comment: "Clean sand and a smooth plaster finish." },
//       { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Full trolley as promised." },
//       { id: 3, name: "Sana B.", date: "20/10/2026", rating: 5, comment: "Very little dust, good for masonry." },
//       { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 3, comment: "Delivery took a day longer than expected." },
//       { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 4, comment: "Good value for the price." },
//     ],
//   },
//   {
//     id: 3,
//     name: "Steel Saria Grade 60",
//     slug: "steel-saria",
//     price: 265,
//     unit: "kg",
//     moq: 500,
//     image: steelSaria,
//     images: [steelSaria],
//     category: "Steel & Welding",
//     shop: "Zahid Construction Materials",
//     location: "Peoples Colony",
//     condition: "new",
//     is_featured: true,
//     specifications: [
//       { label: "Grade", value: "Grade 60" },
//       { label: "Type", value: "Deformed bars" },
//       { label: "Sizes", value: "8 mm to 25 mm" },
//       { label: "Use", value: "Columns, beams and slabs" },
//     ],
//     overview: "Grade 60 deformed steel bars (saria) for reinforced concrete work in houses and commercial buildings.",
//     features: ["High tensile strength", "Deformed surface grips concrete well", "Available in different sizes"],
//     applications: ["Columns and beams", "Roof slabs", "Foundations"],
//     benefits: ["Strong reinforcement for concrete", "Suitable for multi-storey work", "Sold by weight for exact billing"],
//     whyChoose: "Buy by the kilogram from a Gujranwala supplier and compare the rate with other shops on BuildMart.",
//     reviews: [
//       { id: 1, name: "Sana B.", date: "03/11/2026", rating: 5, comment: "Bars were straight and the weight matched the bill." },
//       { id: 2, name: "Hassan J.", date: "27/10/2026", rating: 4, comment: "Good rate for bulk quantity." },
//       { id: 3, name: "Nadia F.", date: "20/10/2026", rating: 5, comment: "Strong steel, easy to bend and tie." },
//       { id: 4, name: "Kamran W.", date: "14/10/2026", rating: 4, comment: "Delivered safely to site." },
//       { id: 5, name: "Bilal N.", date: "08/10/2026", rating: 4, comment: "Supplier explained the sizes clearly." },
//     ],
//   },
//   {
//     id: 4,
//     name: "Porcelain Floor Tiles",
//     slug: "porcelain-floor-tiles",
//     price: 95,
//     unit: "sq ft",
//     moq: 100,
//     image: architectural,
//     images: [architectural],
//     category: "Architectural Products",
//     shop: "Punjab Building Materials",
//     location: "GT Road",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Type", value: "Porcelain" },
//       { label: "Size", value: "2 x 2 ft" },
//       { label: "Finish", value: "Glossy" },
//       { label: "Use", value: "Indoor floors" },
//     ],
//     overview: "Glossy porcelain floor tiles for living rooms, bedrooms and offices.",
//     features: ["Smooth glossy surface", "Easy to clean", "Even size for neat fitting"],
//     applications: ["Living rooms and bedrooms", "Offices and shops", "Corridors"],
//     benefits: ["Gives rooms a clean modern look", "Simple daily cleaning", "Long lasting for indoor use"],
//     whyChoose: "Choose by the square foot and order only what your floor needs from a local tile supplier.",
//     reviews: [
//       { id: 1, name: "Nadia F.", date: "03/11/2026", rating: 4, comment: "Tiles look nice and the fitting was neat." },
//       { id: 2, name: "Kamran W.", date: "27/10/2026", rating: 4, comment: "Good finish for the price." },
//       { id: 3, name: "Bilal N.", date: "20/10/2026", rating: 5, comment: "Easy to clean and shiny." },
//       { id: 4, name: "Shazia M.", date: "14/10/2026", rating: 3, comment: "A few tiles had a minor size difference." },
//       { id: 5, name: "Usman R.", date: "08/10/2026", rating: 4, comment: "Supplier helped me calculate the quantity." },
//     ],
//   },
//   {
//     id: 5,
//     name: "Gold Emulsion Paint",
//     slug: "gold-emulsion-paint",
//     price: 7800,
//     unit: "bucket",
//     moq: 1,
//     image: paintsFinishes,
//     images: [paintsFinishes],
//     category: "Paints & Finishes",
//     shop: "Modern Builders Mart",
//     location: "Satellite Town",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Type", value: "Emulsion paint" },
//       { label: "Finish", value: "Smooth" },
//       { label: "Pack", value: "Bucket" },
//       { label: "Use", value: "Interior walls and ceilings" },
//     ],
//     overview: "Smooth emulsion paint for interior walls and ceilings, sold in ready-to-use buckets.",
//     features: ["Smooth even coverage", "Easy to apply with roller or brush", "Washable finish"],
//     applications: ["Bedroom and lounge walls", "Ceilings", "Office interiors"],
//     benefits: ["Fresh clean look for rooms", "Easy touch-ups", "Wide use in home renovation"],
//     whyChoose: "Buy a full bucket from a local shop and confirm shade and quantity directly with the supplier.",
//     reviews: [
//       { id: 1, name: "Bilal N.", date: "03/11/2026", rating: 5, comment: "Even coverage and the walls look great." },
//       { id: 2, name: "Shazia M.", date: "27/10/2026", rating: 4, comment: "Easy to apply with a roller." },
//       { id: 3, name: "Usman R.", date: "20/10/2026", rating: 4, comment: "Colour matched what I selected." },
//       { id: 4, name: "Ahmad K.", date: "14/10/2026", rating: 5, comment: "Smooth finish on ceilings." },
//       { id: 5, name: "Faisal M.", date: "08/10/2026", rating: 3, comment: "Needed a second coat on one wall." },
//     ],
//   },
//   {
//     id: 6,
//     name: "Aluminium Sliding Window",
//     slug: "aluminium-sliding-window",
//     price: null,
//     unit: "window",
//     moq: 1,
//     image: secWindow,
//     images: [secWindow, glassWindow],
//     category: "Metal & Aluminum Works",
//     shop: "Rehman Builders Supply",
//     location: "Model Town",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Frame", value: "Aluminium" },
//       { label: "Type", value: "Sliding" },
//       { label: "Glass", value: "Clear glass" },
//       { label: "Size", value: "Made to your measurements" },
//     ],
//     overview: "Sliding windows with an aluminium frame, made to the size of your openings.",
//     features: ["Smooth sliding action", "Rust-free aluminium frame", "Made-to-measure sizes"],
//     applications: ["Bedrooms and lounges", "Offices", "Shops"],
//     benefits: ["Saves space as it slides, not swings", "Low maintenance", "Clean modern look"],
//     whyChoose: "Price depends on size, so contact the supplier with your measurements to get a quote.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "03/11/2026", rating: 4, comment: "Fitted neatly and slides smoothly." },
//       { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 4, comment: "Quick quote after sending measurements." },
//       { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 5, comment: "Frame looks clean and modern." },
//       { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 3, comment: "Fitting took a little longer than planned." },
//       { id: 5, name: "Sana B.", date: "08/10/2026", rating: 4, comment: "Good option for bedrooms." },
//     ],
//   },
//   {
//     id: 7,
//     name: "Tempered Glass Window",
//     slug: "tempered-glass-window",
//     price: 850,
//     unit: "sq ft",
//     moq: 20,
//     image: glassWindow,
//     images: [glassWindow, secWindow],
//     category: "Glass & Glazing",
//     shop: "Ali & Sons Traders",
//     location: "Model Town",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Glass", value: "Tempered" },
//       { label: "Thickness", value: "6 mm to 12 mm" },
//       { label: "Edges", value: "Polished" },
//       { label: "Use", value: "Windows, partitions and facades" },
//     ],
//     overview: "Tempered glass cut to size for windows, partitions and building fronts.",
//     features: ["Stronger than normal glass", "Polished edges", "Cut to required size"],
//     applications: ["Windows", "Office partitions", "Shop fronts and facades"],
//     benefits: ["Better strength for daily use", "Bright and open look", "Suitable for commercial buildings"],
//     whyChoose: "Order by the square foot from a Gujranwala glass trader and get it cut to your size.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 5, comment: "Cut accurately and the edges were clean." },
//       { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Good thickness options for our shop front." },
//       { id: 3, name: "Sana B.", date: "20/10/2026", rating: 4, comment: "Glass is strong and clear." },
//       { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 5, comment: "Delivered without any damage." },
//       { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 3, comment: "Price is slightly high but quality is good." },
//     ],
//   },
//   {
//     id: 8,
//     name: "Copper Electrical Wire",
//     slug: "copper-electrical-wire",
//     price: 2200,
//     unit: "coil",
//     moq: 1,
//     image: electrical,
//     images: [electrical],
//     category: "Electrical & Lighting",
//     shop: "Rana Construction Supply",
//     location: "Peoples Colony",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Conductor", value: "Copper" },
//       { label: "Insulation", value: "PVC" },
//       { label: "Supply", value: "Coil" },
//       { label: "Use", value: "House wiring" },
//     ],
//     overview: "PVC insulated copper wire for lighting and power wiring in homes and shops.",
//     features: ["Copper conductor", "PVC insulation", "Easy to pull through conduit"],
//     applications: ["House wiring", "Shop and office wiring", "Light and socket circuits"],
//     benefits: ["Reliable electrical connection", "Flexible for easy installation", "Sold in ready coils"],
//     whyChoose: "Buy a full coil from a local electrical supplier and ask about the wire size that suits your load.",
//     reviews: [
//       { id: 1, name: "Sana B.", date: "03/11/2026", rating: 4, comment: "Easy to pull and the insulation looked good." },
//       { id: 2, name: "Hassan J.", date: "27/10/2026", rating: 4, comment: "Fair rate for a full coil." },
//       { id: 3, name: "Nadia F.", date: "20/10/2026", rating: 5, comment: "Used it for full house wiring, no issues." },
//       { id: 4, name: "Kamran W.", date: "14/10/2026", rating: 3, comment: "Coil length could be explained more clearly." },
//       { id: 5, name: "Bilal N.", date: "08/10/2026", rating: 4, comment: "Supplier suggested the right wire size." },
//     ],
//   },
//   {
//     id: 9,
//     name: "Wooden Door (Deodar)",
//     slug: "wooden-door-deodar",
//     price: 18000,
//     unit: "door",
//     moq: 1,
//     image: doorsWindows,
//     images: [doorsWindows],
//     category: "Doors & Windows",
//     shop: "Al-Noor Building Store",
//     location: "GT Road",
//     condition: "new",
//     is_featured: false,
//     specifications: [
//       { label: "Wood", value: "Deodar" },
//       { label: "Type", value: "Solid panel door" },
//       { label: "Finish", value: "Natural polish" },
//       { label: "Size", value: "Standard and custom" },
//     ],
//     overview: "Solid deodar wood door with a natural polish, suitable for main entrances and rooms.",
//     features: ["Solid deodar wood", "Natural polished look", "Standard and custom sizes"],
//     applications: ["Main entrance doors", "Bedroom doors", "Interior rooms"],
//     benefits: ["Strong and long lasting", "Classic wooden appearance", "Can be made to your size"],
//     whyChoose: "Check the wood and polish in person at a local shop before you finalize your order.",
//     reviews: [
//       { id: 1, name: "Nadia F.", date: "03/11/2026", rating: 5, comment: "Solid door and the polish looks very good." },
//       { id: 2, name: "Kamran W.", date: "27/10/2026", rating: 4, comment: "Delivered safely and fitted well." },
//       { id: 3, name: "Bilal N.", date: "20/10/2026", rating: 5, comment: "Looks classic at our main entrance." },
//       { id: 4, name: "Shazia M.", date: "14/10/2026", rating: 4, comment: "Wood quality is good for the price." },
//       { id: 5, name: "Usman R.", date: "08/10/2026", rating: 3, comment: "Took a few days to prepare the size." },
//     ],
//   },
//   {
//     id: 10,
//     name: "Used Red Bricks",
//     slug: "used-red-bricks",
//     price: 9500,
//     unit: "1,000",
//     moq: 1,
//     image: bricks,
//     images: [bricks],
//     category: "Used Bricks",
//     shop: "Hassan Used Materials",
//     location: "Rahwali",
//     condition: "reused",
//     is_featured: false,
//     specifications: [
//       { label: "Source", value: "Dismantled buildings" },
//       { label: "Condition", value: "Cleaned and reusable" },
//       { label: "Size", value: "Standard 9 inch" },
//       { label: "Use", value: "Boundary walls and non-structural work" },
//     ],
//     overview: "Cleaned red bricks recovered from dismantled buildings, sold at a lower price than new bricks.",
//     features: ["Cleaned and sorted", "Lower cost than new bricks", "Standard size"],
//     applications: ["Boundary walls", "Garden and outdoor work", "Non-structural walls"],
//     benefits: ["Saves money on budget projects", "Reduces construction waste", "Quick availability"],
//     whyChoose: "A good option for low-cost projects. Inspect the bricks before buying for the work you plan.",
//     reviews: [
//       { id: 1, name: "Bilal N.", date: "03/11/2026", rating: 4, comment: "Good value for a boundary wall." },
//       { id: 2, name: "Shazia M.", date: "27/10/2026", rating: 4, comment: "Bricks were clean and mostly intact." },
//       { id: 3, name: "Usman R.", date: "20/10/2026", rating: 5, comment: "Saved a lot on our budget project." },
//       { id: 4, name: "Ahmad K.", date: "14/10/2026", rating: 3, comment: "A few bricks were cracked." },
//       { id: 5, name: "Faisal M.", date: "08/10/2026", rating: 4, comment: "Quick delivery from Rahwali." },
//     ],
//   },
//   {
//     id: 11,
//     name: "Reused Steel Saria",
//     slug: "reused-steel-saria",
//     price: 190,
//     unit: "kg",
//     moq: 200,
//     image: steelSaria,
//     images: [steelSaria],
//     category: "Reused Steel",
//     shop: "Zahid Construction Materials",
//     location: "Peoples Colony",
//     condition: "reused",
//     is_featured: false,
//     specifications: [
//       { label: "Source", value: "Dismantled structures" },
//       { label: "Type", value: "Saria bars" },
//       { label: "Use", value: "Non-critical work" },
//       { label: "Advice", value: "Check condition before structural use" },
//     ],
//     overview: "Reused steel saria recovered from old structures, suitable for non-critical work at a lower rate.",
//     features: ["Lower price per kg", "Recovered from old structures", "Sold by weight"],
//     applications: ["Fencing and gates", "Temporary structures", "Non-critical reinforcement"],
//     benefits: ["Budget-friendly steel", "Helps reuse building material", "Available in bulk"],
//     whyChoose: "Ask the supplier about the condition of the bars and get advice before using them in structural work.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "03/11/2026", rating: 4, comment: "Worked well for our boundary gate." },
//       { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 3, comment: "Some bars were bent but the rate was low." },
//       { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 4, comment: "Good for fencing work." },
//       { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 4, comment: "Supplier was honest about the condition." },
//       { id: 5, name: "Sana B.", date: "08/10/2026", rating: 3, comment: "Check the bars before buying." },
//     ],
//   },
//   {
//     id: 12,
//     name: "Used Wooden Door",
//     slug: "used-wooden-door",
//     price: 7500,
//     unit: "door",
//     moq: 1,
//     image: doorsWindows,
//     images: [doorsWindows],
//     category: "Used Doors & Windows",
//     shop: "Bilal Traders",
//     location: "Wapda Town",
//     condition: "reused",
//     is_featured: false,
//     specifications: [
//       { label: "Material", value: "Solid wood" },
//       { label: "Condition", value: "Good, minor wear" },
//       { label: "Use", value: "Rooms and store rooms" },
//       { label: "Source", value: "Dismantled houses" },
//     ],
//     overview: "Solid wood door in good condition, recovered from a dismantled house.",
//     features: ["Solid wood", "Good condition with minor wear", "Lower price than a new door"],
//     applications: ["Room doors", "Store rooms", "Workshops"],
//     benefits: ["Saves money", "Solid build", "Can be repainted or polished"],
//     whyChoose: "See the door in person at the shop before buying to check its size and condition.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 4, comment: "Sturdy door and looked fine after polish." },
//       { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Good for our store room." },
//       { id: 3, name: "Sana B.", date: "20/10/2026", rating: 5, comment: "Great price for solid wood." },
//       { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 3, comment: "Minor scratches but acceptable." },
//       { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 4, comment: "Easy to repaint." },
//     ],
//   },
// ];

// // Delivery location dropdown ke options
// const BM_LOCATIONS = [
//   "GT Road",
//   "Satellite Town",
//   "Peoples Colony",
//   "Model Town",
//   "Rahwali",
//   "Wapda Town",
//   "Civil Lines",
//   "Garden Town",
// ];

// const detailHeading =
//   "text-sm font-bold text-[color:var(--primary-text)]";
// const actionLink =
//   "inline-flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]";

// /* =========================================================
//    PAGE

//    /materials/steel-saria        -> product detail (product ka slug)
//    /materials/featured           -> sirf featured products
//    /materials/all-categories     -> sari new categories
//    /materials/reused-categories  -> sari reused categories
//    /materials/bricks-blocks      -> us category ke products
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [search, setSearch] = useState("");
//   const [view, setView] = useState("grid");
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [deliveryLocation, setDeliveryLocation] = useState("");
//   const [reviewStart, setReviewStart] = useState(0);

//   // URL ke slug se product / category dhoondhna
//   const selectedProduct = BM_MATERIAL_PRODUCTS.find(
//     (product) => product.slug === id
//   );
//   const selectedCategory = BM_MATERIAL_CATEGORIES.find(
//     (item) => item.slug === id
//   );

//   const isFeatured = id === "featured";
//   const isAllCategories = id === "all-categories";
//   const isReusedCategories = id === "reused-categories";
//   const isCategoryPage = isAllCategories || isReusedCategories;
//   const isListingPage = isFeatured || selectedCategory;

//   // Product badalne par detail page ki state reset
//   useEffect(() => {
//     setQuantity(1);
//     setActiveTab("description");
//     setSelectedImage(0);
//     setDeliveryLocation("");
//     setReviewStart(0);
//   }, [id]);

//   // Reviews har 3 second baad apni jagah par automatically badalte hain
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setReviewStart((old) => old + 1);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   // Quantity kam se kam MOQ honi chahiye
//   const moq = selectedProduct ? selectedProduct.moq : 1;
//   const shownQuantity = quantity < moq ? moq : quantity;

//   // Handlers (abhi sirf alert)
//   const handleMinus = () => {
//     if (shownQuantity > moq) setQuantity(shownQuantity - 1);
//   };
//   const handlePlus = () => setQuantity(shownQuantity + 1);
//   const handleAddToCart = () =>
//     alert(`${shownQuantity} x ${selectedProduct.name} added to cart (demo)`);
//   const handleViewSupplier = () =>
//     alert(`Supplier page of ${selectedProduct.shop} will be added soon.`);
//   const handleContactSupplier = () =>
//     alert(`Contacting ${selectedProduct.shop} (demo)`);
//   const handleWishlist = () => alert("Please login to add to wishlist.");
//   const handleAskQuestion = () => alert("Ask a question (demo)");
//   const handleShare = () => alert("Share this product (demo)");
//   const handleAddReview = () => alert("Add a Review (demo)");

//   // Tab click: tab highlight ho aur page us section tak scroll kare
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     document.getElementById(tab).scrollIntoView({ behavior: "smooth" });
//   };

//   // ---------- Listing page ka title aur products ----------
//   let pageTitle = "Product Not Found";
//   let pageSubtitle = "This product does not exist.";
//   let pageProducts = [];

//   if (isFeatured) {
//     pageTitle = "Featured Products";
//     pageSubtitle = "Hand-picked construction materials from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured);
//   } else if (isAllCategories) {
//     pageTitle = "All Categories";
//     pageSubtitle = "Browse all construction material categories in Gujranwala.";
//   } else if (isReusedCategories) {
//     pageTitle = "Reused Materials";
//     pageSubtitle = "Browse all reused material categories in Gujranwala.";
//   } else if (selectedCategory) {
//     pageTitle = selectedCategory.name;
//     pageSubtitle = "Products available from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter(
//       (product) => product.category === selectedCategory.name
//     );
//   }

//   // Search sirf isi page ke products ke andar chalti hai
//   const searchedProducts = pageProducts.filter((product) =>
//     product.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       {selectedProduct ? (
//         /* =====================================================
//            PRODUCT DETAIL
//         ===================================================== */
//         <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8">
//           <Link
//             href="/materials"
//             className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//           >
//             <ArrowLeft size={14} />
//             Back to Products
//           </Link>

//           {/* TOP SECTION */}
//           <div className="mt-4 grid gap-6 md:grid-cols-5">
//             {/* Images */}
//             <div className="md:col-span-2">
//               <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 shadow-sm">
//                 <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--border-color)]">
//                   {selectedProduct.images[selectedImage] ? (
//                     <Image
//                       src={selectedProduct.images[selectedImage]}
//                       alt={selectedProduct.name}
//                       fill
//                       unoptimized
//                       sizes="(min-width: 768px) 40vw, 100vw"
//                       className="object-cover"
//                     />
//                   ) : (
//                     <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
//                       No image
//                     </span>
//                   )}
//                 </div>

//                 {/* Thumbnails: sirf tab jab product ki ek se zyada images hon */}
//                 {selectedProduct.images.length > 1 && (
//                   <div className="mt-2 flex gap-2">
//                     {selectedProduct.images.map((img, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => setSelectedImage(index)}
//                         aria-label={`Show image ${index + 1}`}
//                         className={`relative h-14 w-14 overflow-hidden rounded-md border-2 ${
//                           selectedImage === index
//                             ? "border-[var(--primary-yellow)]"
//                             : "border-[color:var(--border-color)]"
//                         }`}
//                       >
//                         <Image
//                           src={img}
//                           alt={`${selectedProduct.name} ${index + 1}`}
//                           fill
//                           unoptimized
//                           sizes="56px"
//                           className="object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Details */}
//             <div className="md:col-span-3">
//               <div className="flex flex-wrap gap-4">
//                 <button type="button" onClick={handleWishlist} className={actionLink}>
//                   <Heart size={12} /> Wishlist
//                 </button>
//                 <button type="button" onClick={handleAskQuestion} className={actionLink}>
//                   <MessageCircle size={12} /> Ask Question
//                 </button>
//                 <button type="button" onClick={handleAddReview} className={actionLink}>
//                   <Star size={12} /> Add Review
//                 </button>
//                 <button type="button" onClick={handleShare} className={actionLink}>
//                   <Share2 size={12} /> Share
//                 </button>
//               </div>

//               <div className="mt-3 flex flex-wrap items-center gap-2">
//                 <h1 className="text-xl font-bold text-[color:var(--primary-text)]">
//                   {selectedProduct.name}
//                 </h1>
//                 <span
//                   className={`rounded-md px-2 py-0.5 text-[10px] font-semibold text-white ${
//                     selectedProduct.condition === "reused"
//                       ? "bg-[#384452]"
//                       : "bg-[var(--charcoal-black)]"
//                   }`}
//                 >
//                   {selectedProduct.condition === "reused" ? "Reused" : "New"}
//                 </span>
//               </div>

//               <p className="mt-2 text-xs text-[color:var(--secondary-text)]">
//                 {selectedProduct.overview}
//               </p>
//               <p className="mt-2 text-xs font-semibold text-[color:var(--primary-text)]">
//                 Note: Minimum Order Quantity {selectedProduct.moq} (per {selectedProduct.unit})
//               </p>

//               <p className="mt-3 text-xl font-bold text-[color:var(--primary-text)]">
//                 {selectedProduct.price
//                   ? `Rs ${selectedProduct.price.toLocaleString("en-US")}`
//                   : "Contact for price"}
//                 {selectedProduct.price && (
//                   <span className="text-xs font-normal text-[color:var(--secondary-text)]">
//                     {" "}
//                     / {selectedProduct.unit}
//                   </span>
//                 )}
//               </p>
//               <button
//                 type="button"
//                 onClick={handleContactSupplier}
//                 className="mt-1 inline-flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//               >
//                 <MessageSquare size={12} /> Contact supplier
//               </button>

//               {/* Quantity */}
//               <div className="mt-3 inline-flex items-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)]">
//                 <button
//                   type="button"
//                   onClick={handleMinus}
//                   aria-label="Decrease quantity"
//                   className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   <Minus size={12} />
//                 </button>
//                 <span className="min-w-12 px-2 text-center text-xs text-[color:var(--primary-text)]">
//                   {shownQuantity}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={handlePlus}
//                   aria-label="Increase quantity"
//                   className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   <Plus size={12} />
//                 </button>
//               </div>
//               <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">
//                 Note: Minimum Order Quantity: {selectedProduct.moq}
//               </p>

//               {/* Delivery location */}
//               <div className="mt-3 flex w-full max-w-xs items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
//                 <MapPin size={14} className="text-[color:var(--secondary-text)]" />
//                 <select
//                   value={deliveryLocation || selectedProduct.location}
//                   onChange={(e) => setDeliveryLocation(e.target.value)}
//                   aria-label="Delivery location"
//                   className="w-full bg-transparent text-xs text-[color:var(--primary-text)] outline-none"
//                 >
//                   {BM_LOCATIONS.map((place) => (
//                     <option key={place} value={place}>
//                       {place}, Gujranwala
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Buttons */}
//               <div className="mt-3 flex max-w-sm gap-2">
//                 <button
//                   type="button"
//                   onClick={handleAddToCart}
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-3 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   <ShoppingCart size={14} />
//                   Add to Cart
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleViewSupplier}
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--charcoal-black)] bg-[var(--white-cards)] px-3 py-2 text-xs font-semibold text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   <Store size={14} />
//                   View Supplier
//                 </button>
//               </div>

//               <p className="mt-3 text-[11px] text-[color:var(--secondary-text)]">
//                 Supplier:{" "}
//                 <span className="font-semibold text-[color:var(--primary-text)]">
//                   {selectedProduct.shop}
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* SPECIFICATIONS */}
//           <section className="mt-6 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
//             <h2 className={detailHeading}>Specifications</h2>

//             <div className="mt-3 overflow-x-auto">
//               <table className="w-full min-w-[280px] border-collapse text-xs">
//                 <tbody>
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Category</td>
//                     <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                       {selectedProduct.category}
//                     </td>
//                   </tr>
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Condition</td>
//                     <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                       {selectedProduct.condition === "reused" ? "Reused" : "New"}
//                     </td>
//                   </tr>
//                   {selectedProduct.specifications.map((spec) => (
//                     <tr
//                       key={spec.label}
//                       className="border border-[color:var(--border-color)]"
//                     >
//                       <td className="px-3 py-2 text-[color:var(--secondary-text)]">
//                         {spec.label}
//                       </td>
//                       <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                         {spec.value}
//                       </td>
//                     </tr>
//                   ))}
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Unit</td>
//                     <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
//                       Per {selectedProduct.unit}
//                     </td>
//                   </tr>
//                   <tr className="border border-[color:var(--border-color)]">
//                     <td className="px-3 py-2 text-[color:var(--secondary-text)]">Tags</td>
//                     <td className="px-3 py-2 text-right">
//                       <span className="rounded-full border border-[color:var(--border-color)] px-2 py-0.5 text-[10px] text-[color:var(--secondary-text)]">
//                         {selectedProduct.category}
//                       </span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* TABS: click par us section tak scroll hota hai */}
//           <div className="mt-6 flex gap-2">
//             <button
//               type="button"
//               onClick={() => handleTabClick("description")}
//               className={`rounded-full border px-4 py-1 text-xs transition-colors ${
//                 activeTab === "description"
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//               }`}
//             >
//               Description
//             </button>
//             <button
//               type="button"
//               onClick={() => handleTabClick("reviews")}
//               className={`rounded-full border px-4 py-1 text-xs transition-colors ${
//                 activeTab === "reviews"
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//               }`}
//             >
//               Reviews
//             </button>
//           </div>

//           {/* DESCRIPTION */}
//           <section
//             id="description"
//             className="mt-4 scroll-mt-24 space-y-4 text-xs text-[color:var(--secondary-text)]"
//           >
//             <h3 className={detailHeading}>
//               {selectedProduct.name} – Quality {selectedProduct.category} for Your
//               Construction Needs
//             </h3>

//             <div>
//               <h4 className={detailHeading}>Product Overview</h4>
//               <p className="mt-1">{selectedProduct.overview}</p>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Key Features:</h4>
//               <div className="mt-1 space-y-1">
//                 {selectedProduct.features.map((item) => (
//                   <p key={item}>{item}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Applications:</h4>
//               <div className="mt-1 space-y-1">
//                 {selectedProduct.applications.map((item) => (
//                   <p key={item}>{item}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Benefits:</h4>
//               <div className="mt-1 space-y-1">
//                 {selectedProduct.benefits.map((item) => (
//                   <p key={item}>{item}</p>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className={detailHeading}>Why Choose This Product?</h4>
//               <p className="mt-1">{selectedProduct.whyChoose}</p>
//             </div>

//             <p className="text-[11px]">
//               Sample description shown for demonstration purposes.
//             </p>
//           </section>

//           {/* REVIEWS (description ke neeche, khud badalte rehte hain) */}
//           <section id="reviews" className="mt-8 scroll-mt-24">
//             <div className="flex flex-wrap items-center justify-between gap-2">
//               <h2 className={detailHeading}>
//                 What buyers say about {selectedProduct.name}
//               </h2>
//               <button
//                 type="button"
//                 onClick={handleAddReview}
//                 className="inline-flex items-center gap-1 rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-[11px] font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//               >
//                 <Plus size={12} />
//                 Add a Review
//               </button>
//             </div>

//             <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//               {[0, 1, 2, 3].map((position) => {
//                 const review =
//                   selectedProduct.reviews[
//                     (reviewStart + position) % selectedProduct.reviews.length
//                   ];

//                 return (
//                   <div
//                     key={`${review.id}-${position}`}
//                     className={`rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 shadow-sm ${
//                       ["", "hidden sm:block", "hidden lg:block", "hidden lg:block"][
//                         position
//                       ]
//                     }`}
//                   >
//                     <div className="flex items-center gap-0.5">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={11}
//                           className={
//                             star <= review.rating
//                               ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
//                               : "text-[color:var(--border-color)]"
//                           }
//                         />
//                       ))}
//                     </div>
//                     <p className="mt-2 min-h-12 text-xs text-[color:var(--primary-text)]">
//                       {review.comment}
//                     </p>
//                     <div className="mt-2 flex items-center gap-2 border-t border-[color:var(--border-color)] pt-2">
//                       <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--border-color)] text-[color:var(--secondary-text)]">
//                         <User size={12} />
//                       </span>
//                       <div>
//                         <p className="text-[11px] font-medium text-[color:var(--primary-text)]">
//                           {review.name}
//                         </p>
//                         <p className="text-[10px] text-[color:var(--secondary-text)]">
//                           {review.date}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <p className="mt-2 text-[11px] text-[color:var(--secondary-text)]">
//               Sample reviews shown for demonstration purposes.
//             </p>
//           </section>

//           {/* RELATED PRODUCTS */}
//           <section className="mt-8">
//             <h2 className={detailHeading}>Related Products</h2>

//             {BM_MATERIAL_PRODUCTS.filter(
//               (product) =>
//                 product.category === selectedProduct.category &&
//                 product.id !== selectedProduct.id
//             ).length === 0 ? (
//               <p className="mt-3 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 text-xs text-[color:var(--secondary-text)]">
//                 No other sample products in this category yet.
//               </p>
//             ) : (
//               <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 {BM_MATERIAL_PRODUCTS.filter(
//                   (product) =>
//                     product.category === selectedProduct.category &&
//                     product.id !== selectedProduct.id
//                 ).map((product) => (
//                   <BmProductCard
//                     key={product.id}
//                     name={product.name}
//                     slug={product.slug}
//                     price={product.price}
//                     unit={product.unit}
//                     image={product.image}
//                     shop={product.shop}
//                     location={product.location}
//                     condition={product.condition}
//                     is_featured={product.is_featured}
//                   />
//                 ))}
//               </div>
//             )}
//           </section>
//         </div>
//       ) : (
//         /* =====================================================
//            LISTING (featured / categories) ya NOT FOUND
//         ===================================================== */
//         <>
//           <BmPageHero title={pageTitle} subtitle={pageSubtitle} />

//           <div className="mx-auto w-full max-w-6xl px-4 py-8">
//             {(isCategoryPage || isListingPage) && (
//               <Link
//                 href="/materials"
//                 className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//               >
//                 <ArrowLeft size={14} />
//                 Back to Materials
//               </Link>
//             )}

//             {/* CATEGORIES LISTING */}
//             {isCategoryPage && (
//               <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//                 {BM_MATERIAL_CATEGORIES.filter(
//                   (item) => item.type === (isReusedCategories ? "reused" : "new")
//                 ).map((item) => (
//                   <BmMaterialCategoryCard
//                     key={item.id}
//                     name={item.name}
//                     image={item.image}
//                     slug={item.slug}
//                     type={item.type}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* PRODUCTS LISTING (Featured ya Category) */}
//             {isListingPage && (
//               <div className="mt-5">
//                 {/* Search + Grid/List toggle */}
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex w-full items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 sm:max-w-xs">
//                     <Search
//                       size={16}
//                       className="text-[color:var(--secondary-text)]"
//                     />
//                     <input
//                       type="text"
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       placeholder="Search products..."
//                       className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//                     />
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() => setView("grid")}
//                       aria-label="Grid view"
//                       className={`rounded-md border p-2 transition-colors ${
//                         view === "grid"
//                           ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                           : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                       }`}
//                     >
//                       <LayoutGrid size={16} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setView("list")}
//                       aria-label="List view"
//                       className={`rounded-md border p-2 transition-colors ${
//                         view === "list"
//                           ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                           : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                       }`}
//                     >
//                       <List size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <p className="mt-4 text-xs text-[color:var(--secondary-text)]">
//                   {searchedProducts.length}{" "}
//                   {searchedProducts.length === 1 ? "product" : "products"} found
//                 </p>

//                 {searchedProducts.length === 0 ? (
//                   <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//                     No products found.
//                   </p>
//                 ) : (
//                   <div
//                     className={`mt-4 ${
//                       view === "grid"
//                         ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                         : "flex flex-col gap-4"
//                     }`}
//                   >
//                     {searchedProducts.map((product) => (
//                       <BmProductCard
//                         key={product.id}
//                         name={product.name}
//                         slug={product.slug}
//                         price={product.price}
//                         unit={product.unit}
//                         image={product.image}
//                         shop={product.shop}
//                         location={product.location}
//                         condition={product.condition}
//                         is_featured={product.is_featured}
//                         view={view}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* NOT FOUND */}
//             {!isCategoryPage && !isListingPage && (
//               <div className="py-10 text-center">
//                 <p className="text-sm text-[color:var(--secondary-text)]">
//                   Product not found.
//                 </p>
//                 <Link
//                   href="/materials"
//                   className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   <ArrowLeft size={14} />
//                   Back to Products
//                 </Link>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </main>
//   );
// };

// export default Page;

// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, LayoutGrid, List, Search } from "lucide-react";
// import BmPageHero from "../../../../component/shared/pageHero/BmPageHero";

// import BmMaterialCategoryCard from "../../../../component/shared/materialCard/BmMaterialCategoryCard";

// import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
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

// /* =========================================================
//    PAGE

//    /materials/featured           -> sirf featured products
//    /materials/all-categories     -> sari new categories
//    /materials/reused-categories  -> sari reused categories
//    /materials/bricks-blocks      -> us category ke products
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [search, setSearch] = useState("");
//   const [view, setView] = useState("grid");

//   const isFeatured = id === "featured";
//   const isAllCategories = id === "all-categories";
//   const isReusedCategories = id === "reused-categories";
//   const selectedCategory = BM_MATERIAL_CATEGORIES.find(
//     (item) => item.slug === id
//   );

//   const isCategoryPage = isAllCategories || isReusedCategories;
//   const isProductPage = isFeatured || selectedCategory;

//   // Page ke hisab se title aur products select karein
//   let pageTitle = "Page Not Found";
//   let pageSubtitle = "This page does not exist.";
//   let pageProducts = [];

//   if (isFeatured) {
//     pageTitle = "Featured Products";
//     pageSubtitle = "Hand-picked construction materials from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured);
//   } else if (isAllCategories) {
//     pageTitle = "All Categories";
//     pageSubtitle = "Browse all construction material categories in Gujranwala.";
//   } else if (isReusedCategories) {
//     pageTitle = "Reused Materials";
//     pageSubtitle = "Browse all reused material categories in Gujranwala.";
//   } else if (selectedCategory) {
//     pageTitle = selectedCategory.name;
//     pageSubtitle = "Products available from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter(
//       (product) => product.category === selectedCategory.name
//     );
//   }

//   // Search sirf isi page ke products ke andar chalti hai
//   const searchedProducts = pageProducts.filter((product) =>
//     product.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       <BmPageHero title={pageTitle} subtitle={pageSubtitle} />

//       <div className="mx-auto w-full max-w-6xl px-4 py-8">
//         <Link
//           href="/materials"
//           className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//         >
//           <ArrowLeft size={14} />
//           Back to Materials
//         </Link>

//         {/* CATEGORIES LISTING */}
//         {isCategoryPage && (
//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter(
//               (item) => item.type === (isReusedCategories ? "reused" : "new")
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
//         )}

//         {/* PRODUCTS LISTING (Featured ya Category) */}
//         {isProductPage && (
//           <div className="mt-5">
//             {/* Search + Grid/List toggle */}
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex w-full items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 sm:max-w-xs">
//                 <Search
//                   size={16}
//                   className="text-[color:var(--secondary-text)]"
//                 />
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setView("grid")}
//                   aria-label="Grid view"
//                   className={`rounded-md border p-2 transition-colors ${
//                     view === "grid"
//                       ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                       : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                   }`}
//                 >
//                   <LayoutGrid size={16} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setView("list")}
//                   aria-label="List view"
//                   className={`rounded-md border p-2 transition-colors ${
//                     view === "list"
//                       ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                       : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                   }`}
//                 >
//                   <List size={16} />
//                 </button>
//               </div>
//             </div>

//             <p className="mt-4 text-xs text-[color:var(--secondary-text)]">
//               {searchedProducts.length}{" "}
//               {searchedProducts.length === 1 ? "product" : "products"} found
//             </p>

//             {searchedProducts.length === 0 ? (
//               <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//                 No products found.
//               </p>
//             ) : (
//               <div
//                 className={`mt-4 ${
//                   view === "grid"
//                     ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                     : "flex flex-col gap-4"
//                 }`}
//               >
//                 {searchedProducts.map((product) => (
//                   <BmProductCard
//                     key={product.id}
//                     name={product.name}
//                     price={product.price}
//                     unit={product.unit}
//                     image={product.image}
//                     shop={product.shop}
//                     location={product.location}
//                     condition={product.condition}
//                     is_featured={product.is_featured}
//                     view={view}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* NOT FOUND */}
//         {!isCategoryPage && !isProductPage && (
//           <p className="mt-10 text-center text-sm text-[color:var(--secondary-text)]">
//             Category not found.
//           </p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Page;




// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, LayoutGrid, List, Search } from "lucide-react";

// import BmPageHero from "../../../../component/shared/pageHero/BmPageHero";

// import BmMaterialCategoryCard from "../../../../component/shared/materialCard/BmMaterialCategoryCard";

// import BmProductCard from "../../../../component/shared/productCard/BmProductCard";


// import doorsWindows from "../../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../../assets/images/guest/card/secwindow.jpg";

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

// /* =========================================================
//    PAGE

//    /materials/featured           -> sirf featured products
//    /materials/all-categories     -> sari new categories
//    /materials/reused-categories  -> sari reused categories
//    /materials/bricks-blocks      -> us category ke products
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [search, setSearch] = useState("");
//   const [view, setView] = useState("grid");

//   const isFeatured = id === "featured";
//   const isAllCategories = id === "all-categories";
//   const isReusedCategories = id === "reused-categories";
//   const selectedCategory = BM_MATERIAL_CATEGORIES.find(
//     (item) => item.slug === id
//   );

//   const isCategoryPage = isAllCategories || isReusedCategories;
//   const isProductPage = isFeatured || selectedCategory;

//   // Page ke hisab se title aur products select karein
//   let pageTitle = "Page Not Found";
//   let pageSubtitle = "This page does not exist.";
//   let pageProducts = [];

//   if (isFeatured) {
//     pageTitle = "Featured Products";
//     pageSubtitle = "Hand-picked construction materials from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured);
//   } else if (isAllCategories) {
//     pageTitle = "All Categories";
//     pageSubtitle = "Browse all construction material categories in Gujranwala.";
//   } else if (isReusedCategories) {
//     pageTitle = "Reused Materials";
//     pageSubtitle = "Browse all reused material categories in Gujranwala.";
//   } else if (selectedCategory) {
//     pageTitle = selectedCategory.name;
//     pageSubtitle = "Products available from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter(
//       (product) => product.category === selectedCategory.name
//     );
//   }

//   // Search sirf isi page ke products ke andar chalti hai
//   const searchedProducts = pageProducts.filter((product) =>
//     product.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       <BmPageHero title={pageTitle} subtitle={pageSubtitle} />

//       <div className="mx-auto w-full max-w-6xl px-4 py-8">
//         <Link
//           href="/materials"
//           className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//         >
//           <ArrowLeft size={14} />
//           Back to Materials
//         </Link>

//         {/* CATEGORIES LISTING */}
//         {isCategoryPage && (
//           <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//             {BM_MATERIAL_CATEGORIES.filter(
//               (item) => item.type === (isReusedCategories ? "reused" : "new")
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
//         )}

//         {/* PRODUCTS LISTING (Featured ya Category) */}
//         {isProductPage && (
//           <div className="mt-5">
//             {/* Search + Grid/List toggle */}
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex w-full items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 sm:max-w-xs">
//                 <Search
//                   size={16}
//                   className="text-[color:var(--secondary-text)]"
//                 />
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setView("grid")}
//                   aria-label="Grid view"
//                   className={`rounded-md border p-2 transition-colors ${
//                     view === "grid"
//                       ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                       : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                   }`}
//                 >
//                   <LayoutGrid size={16} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setView("list")}
//                   aria-label="List view"
//                   className={`rounded-md border p-2 transition-colors ${
//                     view === "list"
//                       ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                       : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                   }`}
//                 >
//                   <List size={16} />
//                 </button>
//               </div>
//             </div>

//             <p className="mt-4 text-xs text-[color:var(--secondary-text)]">
//               {searchedProducts.length}{" "}
//               {searchedProducts.length === 1 ? "product" : "products"} found
//             </p>

//             {searchedProducts.length === 0 ? (
//               <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//                 No products found.
//               </p>
//             ) : (
//               <div
//                 className={`mt-4 ${
//                   view === "grid"
//                     ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                     : "flex flex-col gap-4"
//                 }`}
//               >
//                 {searchedProducts.map((product) => (
//                   <BmProductCard
//                     key={product.id}
//                     name={product.name}
//                     price={product.price}
//                     unit={product.unit}
//                     image={product.image}
//                     shop={product.shop}
//                     location={product.location}
//                     condition={product.condition}
//                     is_featured={product.is_featured}
//                     view={view}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* NOT FOUND */}
//         {!isCategoryPage && !isProductPage && (
//           <p className="mt-10 text-center text-sm text-[color:var(--secondary-text)]">
//             Category not found.
//           </p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Page;



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   LayoutGrid,
//   List,
//   MapPin,
//   MessageSquare,
//   Minus,
//   Plus,
//   Search,
//   ShoppingCart,
//   Star,
//   Store,
// } from "lucide-react";
// import BmPageHero from "../../../../component/shared/pageHero/BmPageHero";
// import BmMaterialCategoryCard from "../../../../component/shared/materialCard/BmMaterialCategoryCard";
// import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
// import doorsWindows from "../../../../assets/images/guest/card/doorsWindows.jpg";
// import electrical from "../../../../assets/images/guest/card/copperwire.jpg";
// import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
// import interiorDesign from "../../../../assets/images/guest/card/ceiling.jpg";
// import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";
// import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
// import architectural from "../../../../assets/images/guest/card/tiles.jpg";
// import bricks from "../../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../../assets/images/guest/card/sand.jpg";
// import glassWindow from "../../../../assets/images/guest/card/window.jpg";
// import secWindow from "../../../../assets/images/guest/card/secwindow.jpg";

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
// // is_featured = true/false. moq = minimum order quantity (unit mein).
// const BM_MATERIAL_PRODUCTS = [
//   {
//     id: 1,
//     name: "Red Clay Bricks (A-Class)",
//     slug: "red-clay-bricks",
//     price: 16500,
//     unit: "1,000",
//     moq: 1,
//     image: bricks,
//     category: "Bricks & Blocks",
//     shop: "Al-Noor Building Store",
//     location: "GT Road",
//     condition: "new",
//     is_featured: true,
//     rating: 4.5,
//     specifications: [
//       { label: "Grade", value: "A-Class" },
//       { label: "Size", value: "9 x 4.5 x 3 inch" },
//       { label: "Colour", value: "Red" },
//       { label: "Use", value: "Walls and boundary walls" },
//     ],
//     overview: "Well-burnt red clay bricks for load-bearing and partition walls. A common choice for house construction in Gujranwala.",
//     features: ["Uniform size and shape", "Well-burnt with good strength", "Low breakage during delivery"],
//     applications: ["House and building walls", "Boundary walls", "Foundation and plinth work"],
//     benefits: ["Easy to lay and plaster", "Keeps rooms comfortable in hot weather", "Locally available at a fair price"],
//     whyChoose: "Supplied by a local Gujranwala shop, so you can check the quality and arrange delivery quickly.",
//     reviews: [
//       { id: 1, name: "Usman R.", date: "12/10/2026", rating: 5, comment: "Good quality bricks with very few broken pieces in the load." },
//       { id: 2, name: "Ahmad K.", date: "28/10/2026", rating: 4, comment: "Delivery was on time and the colour was uniform." },
//     ],
//   },
//   {
//     id: 2,
//     name: "Ravi Sand (Rait)",
//     slug: "ravi-sand",
//     price: 9000,
//     unit: "trolley",
//     moq: 1,
//     image: sandImage,
//     category: "Sand & Crush",
//     shop: "City Material Traders",
//     location: "Satellite Town",
//     condition: "new",
//     is_featured: true,
//     rating: 4,
//     specifications: [
//       { label: "Type", value: "Ravi sand (Rait)" },
//       { label: "Grain", value: "Medium-fine" },
//       { label: "Use", value: "Plaster and masonry mortar" },
//       { label: "Supply", value: "Trolley load" },
//     ],
//     overview: "Clean Ravi sand (Rait) used for plaster, masonry mortar and concrete mixing.",
//     features: ["Clean with low dust", "Medium-fine grain", "Supplied by the trolley"],
//     applications: ["Plaster work", "Brick and block masonry", "Concrete mixing with cement"],
//     benefits: ["Smooth finish in plaster", "Good binding with cement", "Easy to order by trolley"],
//     whyChoose: "A local supplier near you means shorter delivery time and easier repeat orders for ongoing work.",
//     reviews: [
//       { id: 1, name: "Faisal M.", date: "05/10/2026", rating: 4, comment: "Sand was clean and the plaster finish came out smooth." },
//       { id: 2, name: "Tariq H.", date: "19/10/2026", rating: 4, comment: "Trolley quantity was full as promised." },
//     ],
//   },
//   {
//     id: 3,
//     name: "Steel Saria Grade 60",
//     slug: "steel-saria",
//     price: 265,
//     unit: "kg",
//     moq: 500,
//     image: steelSaria,
//     category: "Steel & Welding",
//     shop: "Zahid Construction Materials",
//     location: "Peoples Colony",
//     condition: "new",
//     is_featured: true,
//     rating: 4.5,
//     specifications: [
//       { label: "Grade", value: "Grade 60" },
//       { label: "Type", value: "Deformed bars" },
//       { label: "Sizes", value: "8 mm to 25 mm" },
//       { label: "Use", value: "Columns, beams and slabs" },
//     ],
//     overview: "Grade 60 deformed steel bars (saria) for reinforced concrete work in houses and commercial buildings.",
//     features: ["High tensile strength", "Deformed surface grips concrete well", "Available in different sizes"],
//     applications: ["Columns and beams", "Roof slabs", "Foundations"],
//     benefits: ["Strong reinforcement for concrete", "Suitable for multi-storey work", "Sold by weight for exact billing"],
//     whyChoose: "Buy by the kilogram from a Gujranwala supplier and compare the rate with other shops on BuildMart.",
//     reviews: [
//       { id: 1, name: "Imran S.", date: "02/10/2026", rating: 5, comment: "Bars were straight and the weight matched the bill." },
//       { id: 2, name: "Zain A.", date: "21/10/2026", rating: 4, comment: "Good rate for bulk quantity." },
//     ],
//   },
//   {
//     id: 4,
//     name: "Porcelain Floor Tiles",
//     slug: "porcelain-floor-tiles",
//     price: 95,
//     unit: "sq ft",
//     moq: 100,
//     image: architectural,
//     category: "Architectural Products",
//     shop: "Punjab Building Materials",
//     location: "GT Road",
//     condition: "new",
//     is_featured: false,
//     rating: 4,
//     specifications: [
//       { label: "Type", value: "Porcelain" },
//       { label: "Size", value: "2 x 2 ft" },
//       { label: "Finish", value: "Glossy" },
//       { label: "Use", value: "Indoor floors" },
//     ],
//     overview: "Glossy porcelain floor tiles for living rooms, bedrooms and offices.",
//     features: ["Smooth glossy surface", "Easy to clean", "Even size for neat fitting"],
//     applications: ["Living rooms and bedrooms", "Offices and shops", "Corridors"],
//     benefits: ["Gives rooms a clean modern look", "Simple daily cleaning", "Long lasting for indoor use"],
//     whyChoose: "Choose by the square foot and order only what your floor needs from a local tile supplier.",
//     reviews: [
//       { id: 1, name: "Sana B.", date: "08/10/2026", rating: 4, comment: "Tiles look nice and the fitting was neat." },
//       { id: 2, name: "Hassan J.", date: "24/10/2026", rating: 4, comment: "Good finish for the price." },
//     ],
//   },
//   {
//     id: 5,
//     name: "Gold Emulsion Paint",
//     slug: "gold-emulsion-paint",
//     price: 7800,
//     unit: "bucket",
//     moq: 1,
//     image: paintsFinishes,
//     category: "Paints & Finishes",
//     shop: "Modern Builders Mart",
//     location: "Satellite Town",
//     condition: "new",
//     is_featured: false,
//     rating: 4.5,
//     specifications: [
//       { label: "Type", value: "Emulsion paint" },
//       { label: "Finish", value: "Smooth" },
//       { label: "Pack", value: "Bucket" },
//       { label: "Use", value: "Interior walls and ceilings" },
//     ],
//     overview: "Smooth emulsion paint for interior walls and ceilings, sold in ready-to-use buckets.",
//     features: ["Smooth even coverage", "Easy to apply with roller or brush", "Washable finish"],
//     applications: ["Bedroom and lounge walls", "Ceilings", "Office interiors"],
//     benefits: ["Fresh clean look for rooms", "Easy touch-ups", "Wide use in home renovation"],
//     whyChoose: "Buy a full bucket from a local shop and confirm shade and quantity directly with the supplier.",
//     reviews: [
//       { id: 1, name: "Nadia F.", date: "10/10/2026", rating: 5, comment: "Coverage was even and the walls look great." },
//       { id: 2, name: "Kamran W.", date: "30/10/2026", rating: 4, comment: "Easy to apply with a roller." },
//     ],
//   },
//   {
//     id: 6,
//     name: "Aluminium Sliding Window",
//     slug: "aluminium-sliding-window",
//     price: null,
//     unit: "window",
//     moq: 1,
//     image: secWindow,
//     category: "Metal & Aluminum Works",
//     shop: "Rehman Builders Supply",
//     location: "Model Town",
//     condition: "new",
//     is_featured: false,
//     rating: 4,
//     specifications: [
//       { label: "Frame", value: "Aluminium" },
//       { label: "Type", value: "Sliding" },
//       { label: "Glass", value: "Clear glass" },
//       { label: "Size", value: "Made to your measurements" },
//     ],
//     overview: "Sliding windows with an aluminium frame, made to the size of your openings.",
//     features: ["Smooth sliding action", "Rust-free aluminium frame", "Made-to-measure sizes"],
//     applications: ["Bedrooms and lounges", "Offices", "Shops"],
//     benefits: ["Saves space as it slides, not swings", "Low maintenance", "Clean modern look"],
//     whyChoose: "Price depends on size, so contact the supplier with your measurements to get a quote.",
//     reviews: [
//       { id: 1, name: "Rizwan Q.", date: "15/10/2026", rating: 4, comment: "Windows were fitted neatly and slide smoothly." },
//       { id: 2, name: "Ayesha T.", date: "01/11/2026", rating: 4, comment: "Supplier gave a quick quote after measurements." },
//     ],
//   },
//   {
//     id: 7,
//     name: "Tempered Glass Window",
//     slug: "tempered-glass-window",
//     price: 850,
//     unit: "sq ft",
//     moq: 20,
//     image: glassWindow,
//     category: "Glass & Glazing",
//     shop: "Ali & Sons Traders",
//     location: "Model Town",
//     condition: "new",
//     is_featured: false,
//     rating: 4.5,
//     specifications: [
//       { label: "Glass", value: "Tempered" },
//       { label: "Thickness", value: "6 mm to 12 mm" },
//       { label: "Edges", value: "Polished" },
//       { label: "Use", value: "Windows, partitions and facades" },
//     ],
//     overview: "Tempered glass cut to size for windows, partitions and building fronts.",
//     features: ["Stronger than normal glass", "Polished edges", "Cut to required size"],
//     applications: ["Windows", "Office partitions", "Shop fronts and facades"],
//     benefits: ["Better strength for daily use", "Bright and open look", "Suitable for commercial buildings"],
//     whyChoose: "Order by the square foot from a Gujranwala glass trader and get it cut to your size.",
//     reviews: [
//       { id: 1, name: "Bilal N.", date: "07/10/2026", rating: 5, comment: "Glass was cut accurately and edges were clean." },
//       { id: 2, name: "Shazia M.", date: "26/10/2026", rating: 4, comment: "Good thickness options for our shop front." },
//     ],
//   },
//   {
//     id: 8,
//     name: "Copper Electrical Wire",
//     slug: "copper-electrical-wire",
//     price: 2200,
//     unit: "coil",
//     moq: 1,
//     image: electrical,
//     category: "Electrical & Lighting",
//     shop: "Rana Construction Supply",
//     location: "Peoples Colony",
//     condition: "new",
//     is_featured: false,
//     rating: 4,
//     specifications: [
//       { label: "Conductor", value: "Copper" },
//       { label: "Insulation", value: "PVC" },
//       { label: "Supply", value: "Coil" },
//       { label: "Use", value: "House wiring" },
//     ],
//     overview: "PVC insulated copper wire for lighting and power wiring in homes and shops.",
//     features: ["Copper conductor", "PVC insulation", "Easy to pull through conduit"],
//     applications: ["House wiring", "Shop and office wiring", "Light and socket circuits"],
//     benefits: ["Reliable electrical connection", "Flexible for easy installation", "Sold in ready coils"],
//     whyChoose: "Buy a full coil from a local electrical supplier and ask about the wire size that suits your load.",
//     reviews: [
//       { id: 1, name: "Adeel P.", date: "11/10/2026", rating: 4, comment: "Wire was easy to pull and the insulation looked good." },
//       { id: 2, name: "Noman L.", date: "29/10/2026", rating: 4, comment: "Fair rate for a full coil." },
//     ],
//   },
//   {
//     id: 9,
//     name: "Wooden Door (Deodar)",
//     slug: "wooden-door-deodar",
//     price: 18000,
//     unit: "door",
//     moq: 1,
//     image: doorsWindows,
//     category: "Doors & Windows",
//     shop: "Al-Noor Building Store",
//     location: "GT Road",
//     condition: "new",
//     is_featured: false,
//     rating: 4.5,
//     specifications: [
//       { label: "Wood", value: "Deodar" },
//       { label: "Type", value: "Solid panel door" },
//       { label: "Finish", value: "Natural polish" },
//       { label: "Size", value: "Standard and custom" },
//     ],
//     overview: "Solid deodar wood door with a natural polish, suitable for main entrances and rooms.",
//     features: ["Solid deodar wood", "Natural polished look", "Standard and custom sizes"],
//     applications: ["Main entrance doors", "Bedroom doors", "Interior rooms"],
//     benefits: ["Strong and long lasting", "Classic wooden appearance", "Can be made to your size"],
//     whyChoose: "Check the wood and polish in person at a local shop before you finalize your order.",
//     reviews: [
//       { id: 1, name: "Waqar D.", date: "04/10/2026", rating: 5, comment: "Solid door and the polish looks very good." },
//       { id: 2, name: "Sobia G.", date: "23/10/2026", rating: 4, comment: "Delivered safely and fitted well." },
//     ],
//   },
//   {
//     id: 10,
//     name: "Used Red Bricks",
//     slug: "used-red-bricks",
//     price: 9500,
//     unit: "1,000",
//     moq: 1,
//     image: bricks,
//     category: "Used Bricks",
//     shop: "Hassan Used Materials",
//     location: "Rahwali",
//     condition: "reused",
//     is_featured: false,
//     rating: 4,
//     specifications: [
//       { label: "Source", value: "Dismantled buildings" },
//       { label: "Condition", value: "Cleaned and reusable" },
//       { label: "Size", value: "Standard 9 inch" },
//       { label: "Use", value: "Boundary walls and non-structural work" },
//     ],
//     overview: "Cleaned red bricks recovered from dismantled buildings, sold at a lower price than new bricks.",
//     features: ["Cleaned and sorted", "Lower cost than new bricks", "Standard size"],
//     applications: ["Boundary walls", "Garden and outdoor work", "Non-structural walls"],
//     benefits: ["Saves money on budget projects", "Reduces construction waste", "Quick availability"],
//     whyChoose: "A good option for low-cost projects. Inspect the bricks before buying for the work you plan.",
//     reviews: [
//       { id: 1, name: "Salman E.", date: "09/10/2026", rating: 4, comment: "Good value for a boundary wall." },
//       { id: 2, name: "Rubina C.", date: "27/10/2026", rating: 4, comment: "Bricks were clean and mostly intact." },
//     ],
//   },
//   {
//     id: 11,
//     name: "Reused Steel Saria",
//     slug: "reused-steel-saria",
//     price: 190,
//     unit: "kg",
//     moq: 200,
//     image: steelSaria,
//     category: "Reused Steel",
//     shop: "Zahid Construction Materials",
//     location: "Peoples Colony",
//     condition: "reused",
//     is_featured: false,
//     rating: 3.5,
//     specifications: [
//       { label: "Source", value: "Dismantled structures" },
//       { label: "Type", value: "Saria bars" },
//       { label: "Use", value: "Non-critical work" },
//       { label: "Advice", value: "Check condition before structural use" },
//     ],
//     overview: "Reused steel saria recovered from old structures, suitable for non-critical work at a lower rate.",
//     features: ["Lower price per kg", "Recovered from old structures", "Sold by weight"],
//     applications: ["Fencing and gates", "Temporary structures", "Non-critical reinforcement"],
//     benefits: ["Budget-friendly steel", "Helps reuse building material", "Available in bulk"],
//     whyChoose: "Ask the supplier about the condition of the bars and get advice before using them in structural work.",
//     reviews: [
//       { id: 1, name: "Danish V.", date: "13/10/2026", rating: 4, comment: "Worked well for our boundary gate." },
//       { id: 2, name: "Hira Z.", date: "31/10/2026", rating: 3, comment: "Some bars were bent but the rate was low." },
//     ],
//   },
//   {
//     id: 12,
//     name: "Used Wooden Door",
//     slug: "used-wooden-door",
//     price: 7500,
//     unit: "door",
//     moq: 1,
//     image: doorsWindows,
//     category: "Used Doors & Windows",
//     shop: "Bilal Traders",
//     location: "Wapda Town",
//     condition: "reused",
//     is_featured: false,
//     rating: 4,
//     specifications: [
//       { label: "Material", value: "Solid wood" },
//       { label: "Condition", value: "Good, minor wear" },
//       { label: "Use", value: "Rooms and store rooms" },
//       { label: "Source", value: "Dismantled houses" },
//     ],
//     overview: "Solid wood door in good condition, recovered from a dismantled house.",
//     features: ["Solid wood", "Good condition with minor wear", "Lower price than a new door"],
//     applications: ["Room doors", "Store rooms", "Workshops"],
//     benefits: ["Saves money", "Solid build", "Can be repainted or polished"],
//     whyChoose: "See the door in person at the shop before buying to check its size and condition.",
//     reviews: [
//       { id: 1, name: "Mehwish A.", date: "14/10/2026", rating: 4, comment: "Door was sturdy and looked fine after polish." },
//       { id: 2, name: "Akram Y.", date: "02/11/2026", rating: 4, comment: "Good for our store room." },
//     ],
//   },
// ];

// const tabClass =
//   "rounded-md border px-4 py-2 text-sm transition-colors";
// const detailHeading =
//   "text-sm font-bold text-[color:var(--primary-text)]";
// const outlineButton =
//   "inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// /* =========================================================
//    PAGE

//    /materials/steel-saria        -> product detail (product ka slug)
//    /materials/featured           -> sirf featured products
//    /materials/all-categories     -> sari new categories
//    /materials/reused-categories  -> sari reused categories
//    /materials/bricks-blocks      -> us category ke products
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [search, setSearch] = useState("");
//   const [view, setView] = useState("grid");
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");

//   // URL ke slug se product / category dhoondhna
//   const selectedProduct = BM_MATERIAL_PRODUCTS.find(
//     (product) => product.slug === id
//   );
//   const selectedCategory = BM_MATERIAL_CATEGORIES.find(
//     (item) => item.slug === id
//   );

//   const isFeatured = id === "featured";
//   const isAllCategories = id === "all-categories";
//   const isReusedCategories = id === "reused-categories";
//   const isCategoryPage = isAllCategories || isReusedCategories;
//   const isListingPage = isFeatured || selectedCategory;

//   // Product badalne par quantity aur tab reset
//   useEffect(() => {
//     setQuantity(1);
//     setActiveTab("description");
//   }, [id]);

//   // Quantity kam se kam MOQ honi chahiye
//   const moq = selectedProduct ? selectedProduct.moq : 1;
//   const shownQuantity = quantity < moq ? moq : quantity;

//   // Handlers (abhi sirf alert)
//   const handleMinus = () => {
//     if (shownQuantity > moq) setQuantity(shownQuantity - 1);
//   };
//   const handlePlus = () => setQuantity(shownQuantity + 1);
//   const handleAddToCart = () =>
//     alert(`${shownQuantity} x ${selectedProduct.name} added to cart (demo)`);
//   const handleContactSupplier = () =>
//     alert(`Contacting ${selectedProduct.shop} (demo)`);
//   const handleViewSupplier = () =>
//     alert(`Supplier page of ${selectedProduct.shop} will be added soon.`);
//   const handleAddReview = () => alert("Add a Review (demo)");

//   // ---------- Listing page ka title aur products ----------
//   let pageTitle = "Product Not Found";
//   let pageSubtitle = "This product does not exist.";
//   let pageProducts = [];

//   if (isFeatured) {
//     pageTitle = "Featured Products";
//     pageSubtitle = "Hand-picked construction materials from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter((product) => product.is_featured);
//   } else if (isAllCategories) {
//     pageTitle = "All Categories";
//     pageSubtitle = "Browse all construction material categories in Gujranwala.";
//   } else if (isReusedCategories) {
//     pageTitle = "Reused Materials";
//     pageSubtitle = "Browse all reused material categories in Gujranwala.";
//   } else if (selectedCategory) {
//     pageTitle = selectedCategory.name;
//     pageSubtitle = "Products available from Gujranwala suppliers.";
//     pageProducts = BM_MATERIAL_PRODUCTS.filter(
//       (product) => product.category === selectedCategory.name
//     );
//   }

//   // Search sirf isi page ke products ke andar chalti hai
//   const searchedProducts = pageProducts.filter((product) =>
//     product.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)]">
//       {selectedProduct ? (
//         /* =====================================================
//            PRODUCT DETAIL
//         ===================================================== */
//         <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8">
//           <Link
//             href="/materials"
//             className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//           >
//             <ArrowLeft size={14} />
//             Back to Products
//           </Link>

//           {/* TOP SECTION */}
//           <section className="mt-4 grid gap-6 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-6 md:grid-cols-2">
//             <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--border-color)]">
//               {selectedProduct.image ? (
//                 <Image
//                   src={selectedProduct.image}
//                   alt={selectedProduct.name}
//                   fill
//                   unoptimized
//                   sizes="(min-width: 768px) 50vw, 100vw"
//                   className="object-cover"
//                 />
//               ) : (
//                 <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
//                   No image
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-3">
//               <div className="flex flex-wrap items-center gap-2">
//                 <span className="text-xs font-medium text-[color:var(--secondary-text)]">
//                   {selectedProduct.category}
//                 </span>
//                 <span
//                   className={`rounded-md px-2 py-0.5 text-[10px] font-semibold text-white ${
//                     selectedProduct.condition === "reused"
//                       ? "bg-[#384452]"
//                       : "bg-[var(--charcoal-black)]"
//                   }`}
//                 >
//                   {selectedProduct.condition === "reused" ? "Reused" : "New"}
//                 </span>
//               </div>

//               <h1 className="text-xl font-bold text-[color:var(--primary-text)] sm:text-2xl">
//                 {selectedProduct.name}
//               </h1>

//               {/* Rating */}
//               <div className="flex items-center gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={14}
//                     className={
//                       star <= Math.round(selectedProduct.rating)
//                         ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
//                         : "text-[color:var(--border-color)]"
//                     }
//                   />
//                 ))}
//                 <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
//                   {selectedProduct.rating} ({selectedProduct.reviews.length} reviews)
//                 </span>
//               </div>

//               {/* Price */}
//               <div>
//                 <p className="text-2xl font-bold text-[color:var(--primary-text)]">
//                   {selectedProduct.price
//                     ? `Rs ${selectedProduct.price.toLocaleString("en-US")}`
//                     : "Contact for price"}
//                 </p>
//                 {selectedProduct.price && (
//                   <p className="text-xs text-[color:var(--secondary-text)]">
//                     per {selectedProduct.unit}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-1 text-sm text-[color:var(--secondary-text)]">
//                 <p>
//                   Minimum order: {selectedProduct.moq} (per {selectedProduct.unit})
//                 </p>
//                 <p className="flex items-center gap-1">
//                   <MapPin size={14} aria-hidden="true" />
//                   {selectedProduct.location}, Gujranwala
//                 </p>
//                 <p className="flex items-center gap-1">
//                   <Store size={14} aria-hidden="true" />
//                   Supplier: {selectedProduct.shop}
//                 </p>
//               </div>

//               {/* Quantity */}
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-[color:var(--primary-text)]">
//                   Quantity
//                 </span>
//                 <div className="inline-flex items-center rounded-md border border-[color:var(--border-color)]">
//                   <button
//                     type="button"
//                     onClick={handleMinus}
//                     aria-label="Decrease quantity"
//                     className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                   >
//                     <Minus size={14} />
//                   </button>
//                   <span className="min-w-12 px-2 text-center text-sm text-[color:var(--primary-text)]">
//                     {shownQuantity}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={handlePlus}
//                     aria-label="Increase quantity"
//                     className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                   >
//                     <Plus size={14} />
//                   </button>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="mt-auto flex flex-col gap-2 sm:flex-row">
//                 <button
//                   type="button"
//                   onClick={handleAddToCart}
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-3 py-2 text-sm font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   <ShoppingCart size={16} />
//                   Add to Cart
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleContactSupplier}
//                   className={outlineButton}
//                 >
//                   <MessageSquare size={16} />
//                   Contact Supplier
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleViewSupplier}
//                   className={outlineButton}
//                 >
//                   <Store size={16} />
//                   View Supplier
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* SPECIFICATIONS */}
//           <section className="mt-6 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-6">
//             <h2 className={detailHeading}>Specifications</h2>

//             <div className="mt-3 overflow-x-auto rounded-md border border-[color:var(--border-color)]">
//               <table className="w-full min-w-[320px] text-left text-sm">
//                 <tbody>
//                   <tr className="border-b border-[color:var(--border-color)]">
//                     <th className="w-2/5 bg-[var(--off-white-background)] px-4 py-2 font-medium text-[color:var(--secondary-text)]">
//                       Category
//                     </th>
//                     <td className="px-4 py-2 text-[color:var(--primary-text)]">
//                       {selectedProduct.category}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-[color:var(--border-color)]">
//                     <th className="bg-[var(--off-white-background)] px-4 py-2 font-medium text-[color:var(--secondary-text)]">
//                       Condition
//                     </th>
//                     <td className="px-4 py-2 text-[color:var(--primary-text)]">
//                       {selectedProduct.condition === "reused" ? "Reused" : "New"}
//                     </td>
//                   </tr>
//                   {selectedProduct.specifications.map((spec) => (
//                     <tr
//                       key={spec.label}
//                       className="border-b border-[color:var(--border-color)] last:border-b-0"
//                     >
//                       <th className="bg-[var(--off-white-background)] px-4 py-2 font-medium text-[color:var(--secondary-text)]">
//                         {spec.label}
//                       </th>
//                       <td className="px-4 py-2 text-[color:var(--primary-text)]">
//                         {spec.value}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* TABS */}
//           <section className="mt-6 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-6">
//             <div className="flex flex-wrap gap-2">
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("description")}
//                 className={`${tabClass} ${
//                   activeTab === "description"
//                     ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                     : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 }`}
//               >
//                 Description
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("reviews")}
//                 className={`${tabClass} ${
//                   activeTab === "reviews"
//                     ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                     : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 }`}
//               >
//                 Reviews ({selectedProduct.reviews.length})
//               </button>
//             </div>

//             {/* DESCRIPTION TAB */}
//             {activeTab === "description" && (
//               <div className="mt-5 space-y-5 text-sm text-[color:var(--secondary-text)]">
//                 <div>
//                   <h3 className={detailHeading}>Product Overview</h3>
//                   <p className="mt-1">{selectedProduct.overview}</p>
//                 </div>

//                 <div>
//                   <h3 className={detailHeading}>Key Features</h3>
//                   <ul className="mt-1 list-disc space-y-1 pl-5">
//                     {selectedProduct.features.map((item) => (
//                       <li key={item}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div>
//                   <h3 className={detailHeading}>Applications</h3>
//                   <ul className="mt-1 list-disc space-y-1 pl-5">
//                     {selectedProduct.applications.map((item) => (
//                       <li key={item}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div>
//                   <h3 className={detailHeading}>Benefits</h3>
//                   <ul className="mt-1 list-disc space-y-1 pl-5">
//                     {selectedProduct.benefits.map((item) => (
//                       <li key={item}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div>
//                   <h3 className={detailHeading}>Why Choose This Product?</h3>
//                   <p className="mt-1">{selectedProduct.whyChoose}</p>
//                 </div>
//               </div>
//             )}

//             {/* REVIEWS TAB */}
//             {activeTab === "reviews" && (
//               <div className="mt-5">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div className="flex items-center gap-2">
//                     <span className="text-2xl font-bold text-[color:var(--primary-text)]">
//                       {selectedProduct.rating}
//                     </span>
//                     <div className="flex items-center gap-0.5">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={14}
//                           className={
//                             star <= Math.round(selectedProduct.rating)
//                               ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
//                               : "text-[color:var(--border-color)]"
//                           }
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-[color:var(--secondary-text)]">
//                       {selectedProduct.reviews.length} reviews
//                     </span>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleAddReview}
//                     className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                   >
//                     Add a Review
//                   </button>
//                 </div>

//                 <div className="mt-4 grid gap-3 sm:grid-cols-2">
//                   {selectedProduct.reviews.map((review) => (
//                     <div
//                       key={review.id}
//                       className="rounded-lg border border-[color:var(--border-color)] p-3"
//                     >
//                       <div className="flex items-center gap-0.5">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star
//                             key={star}
//                             size={12}
//                             className={
//                               star <= review.rating
//                                 ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
//                                 : "text-[color:var(--border-color)]"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <p className="mt-2 text-sm text-[color:var(--primary-text)]">
//                         {review.comment}
//                       </p>
//                       <p className="mt-2 text-xs text-[color:var(--secondary-text)]">
//                         {review.name} • {review.date}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <p className="mt-3 text-[11px] text-[color:var(--secondary-text)]">
//                   Sample reviews shown for demonstration purposes.
//                 </p>
//               </div>
//             )}
//           </section>

//           {/* RELATED PRODUCTS */}
//           <section className="mt-6">
//             <h2 className={detailHeading}>Related Products</h2>

//             {BM_MATERIAL_PRODUCTS.filter(
//               (product) =>
//                 product.category === selectedProduct.category &&
//                 product.id !== selectedProduct.id
//             ).length === 0 ? (
//               <p className="mt-3 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 text-center text-sm text-[color:var(--secondary-text)]">
//                 No related products in this category yet.
//               </p>
//             ) : (
//               <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 {BM_MATERIAL_PRODUCTS.filter(
//                   (product) =>
//                     product.category === selectedProduct.category &&
//                     product.id !== selectedProduct.id
//                 ).map((product) => (
//                   <BmProductCard
//                     key={product.id}
//                     name={product.name}
//                     slug={product.slug}
//                     price={product.price}
//                     unit={product.unit}
//                     image={product.image}
//                     shop={product.shop}
//                     location={product.location}
//                     condition={product.condition}
//                     is_featured={product.is_featured}
//                   />
//                 ))}
//               </div>
//             )}
//           </section>
//         </div>
//       ) : (
//         /* =====================================================
//            LISTING (featured / categories) ya NOT FOUND
//         ===================================================== */
//         <>
//           <BmPageHero title={pageTitle} subtitle={pageSubtitle} />

//           <div className="mx-auto w-full max-w-6xl px-4 py-8">
//             {(isCategoryPage || isListingPage) && (
//               <Link
//                 href="/materials"
//                 className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//               >
//                 <ArrowLeft size={14} />
//                 Back to Materials
//               </Link>
//             )}

//             {/* CATEGORIES LISTING */}
//             {isCategoryPage && (
//               <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
//                 {BM_MATERIAL_CATEGORIES.filter(
//                   (item) => item.type === (isReusedCategories ? "reused" : "new")
//                 ).map((item) => (
//                   <BmMaterialCategoryCard
//                     key={item.id}
//                     name={item.name}
//                     image={item.image}
//                     slug={item.slug}
//                     type={item.type}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* PRODUCTS LISTING (Featured ya Category) */}
//             {isListingPage && (
//               <div className="mt-5">
//                 {/* Search + Grid/List toggle */}
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="flex w-full items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 sm:max-w-xs">
//                     <Search
//                       size={16}
//                       className="text-[color:var(--secondary-text)]"
//                     />
//                     <input
//                       type="text"
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       placeholder="Search products..."
//                       className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//                     />
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() => setView("grid")}
//                       aria-label="Grid view"
//                       className={`rounded-md border p-2 transition-colors ${
//                         view === "grid"
//                           ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                           : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                       }`}
//                     >
//                       <LayoutGrid size={16} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setView("list")}
//                       aria-label="List view"
//                       className={`rounded-md border p-2 transition-colors ${
//                         view === "list"
//                           ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                           : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//                       }`}
//                     >
//                       <List size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 <p className="mt-4 text-xs text-[color:var(--secondary-text)]">
//                   {searchedProducts.length}{" "}
//                   {searchedProducts.length === 1 ? "product" : "products"} found
//                 </p>

//                 {searchedProducts.length === 0 ? (
//                   <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">
//                     No products found.
//                   </p>
//                 ) : (
//                   <div
//                     className={`mt-4 ${
//                       view === "grid"
//                         ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                         : "flex flex-col gap-4"
//                     }`}
//                   >
//                     {searchedProducts.map((product) => (
//                       <BmProductCard
//                         key={product.id}
//                         name={product.name}
//                         slug={product.slug}
//                         price={product.price}
//                         unit={product.unit}
//                         image={product.image}
//                         shop={product.shop}
//                         location={product.location}
//                         condition={product.condition}
//                         is_featured={product.is_featured}
//                         view={view}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* NOT FOUND */}
//             {!isCategoryPage && !isListingPage && (
//               <div className="py-10 text-center">
//                 <p className="text-sm text-[color:var(--secondary-text)]">
//                   Product not found.
//                 </p>
//                 <Link
//                   href="/materials"
//                   className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   <ArrowLeft size={14} />
//                   Back to Products
//                 </Link>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </main>
//   );
// };

// export default Page;