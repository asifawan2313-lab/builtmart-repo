// //(guest)/suppliers/[id]/page.js
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
import shop1 from "../../../../assets/images/supplier/shops/shop-1.jpg";
import shop2 from "../../../../assets/images/supplier/shops/shop-2.jpg";
import shop3 from "../../../../assets/images/supplier/shops/shop-3.jpg";
import shop4 from "../../../../assets/images/supplier/shops/shop-4.jpg";
import shop5 from "../../../../assets/images/supplier/shops/shop-5.jpg";
import shop6 from "../../../../assets/images/supplier/shops/shop-6.jpg";
import shop7 from "../../../../assets/images/supplier/shops/shop-7.jpg";
import shop8 from "../../../../assets/images/supplier/shops/shop-8.jpg";
import bricks from "../../../../assets/images/guest/card/briks.jpg";
import sandImage from "../../../../assets/images/guest/card/sand.jpg";
import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
import architectural from "../../../../assets/images/guest/card/tiles.jpg";
import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

// Supplier listing wala hi data (+ address, hours, delivery).
// image wahi hai jo supplier card mein use hoti hai.
const BM_SUPPLIERS = [
  { id: 1, name: "Al-Noor Building Store", slug: "al-noor-building-store", image: shop1, location: "GT Road", rating: 4.5, reviews: 98, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"], address: "Main GT Road, GT Road, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 2, name: "City Material Traders", slug: "city-material-traders", image: shop2, location: "Satellite Town", rating: 4.5, reviews: 86, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Sand"], address: "Aroop Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
  { id: 3, name: "Rehman Builders Supply", slug: "rehman-builders-supply", image: shop3, location: "Model Town", rating: 4.4, reviews: 64, is_verified: false, categories: ["Cement", "Steel", "Paints", "Pipes"], address: "Sialkot Bypass, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
  { id: 4, name: "Zahid Construction Materials", slug: "zahid-construction-materials", image: shop4, location: "Peoples Colony", rating: 4.6, reviews: 112, is_verified: true, categories: ["Cement", "Steel", "Tiles", "Marble"], address: "Rahwali Road, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 5, name: "Punjab Building Materials", slug: "punjab-building-materials", image: shop5, location: "GT Road", rating: 4.4, reviews: 76, is_verified: true, categories: ["Cement", "Bricks", "Paints", "Pipes"], address: "Wapda Town Chowk, GT Road, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
  { id: 6, name: "Modern Builders Mart", slug: "modern-builders-mart", image: shop6, location: "Satellite Town", rating: 4.8, reviews: 134, is_verified: true, categories: ["Cement", "Steel", "Sand", "Tiles"], address: "Khiali Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
  { id: 7, name: "Ali & Sons Traders", slug: "ali-sons-traders", image: shop7, location: "Model Town", rating: 4.2, reviews: 54, is_verified: false, categories: ["Bricks", "Tiles", "Paints", "Pipes"], address: "Main GT Road, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 8, name: "Rana Construction Supply", slug: "rana-construction-supply", image: shop8, location: "Peoples Colony", rating: 4.7, reviews: 89, is_verified: true, categories: ["Cement", "Bricks", "Sand", "Steel"], address: "Aroop Road, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
  { id: 9, name: "Gujranwala Tiles House", slug: "gujranwala-tiles-house", image: shop1, location: "Rahwali", rating: 4.9, reviews: 141, is_verified: true, categories: ["Tiles", "Marble", "Paints"], address: "Sialkot Bypass, Rahwali, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
  { id: 10, name: "Al-Rehman Depot", slug: "al-rehman-depot", image: shop2, location: "Civil Lines", rating: 4.3, reviews: 61, is_verified: false, categories: ["Cement", "Steel"], address: "Rahwali Road, Civil Lines, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 11, name: "Bilal Traders", slug: "bilal-traders", image: shop3, location: "Wapda Town", rating: 4.1, reviews: 38, is_verified: false, categories: ["Bricks", "Sand"], address: "Wapda Town Chowk, Wapda Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
  { id: 12, name: "Chenab Steel Works", slug: "chenab-steel-works", image: shop4, location: "GT Road", rating: 4.8, reviews: 120, is_verified: true, categories: ["Steel", "Pipes"], address: "Khiali Road, GT Road, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
  { id: 13, name: "Wapda Town Hardware", slug: "wapda-town-hardware", image: shop5, location: "Wapda Town", rating: 4.0, reviews: 45, is_verified: false, categories: ["Paints", "Pipes", "Tiles"], address: "Main GT Road, Wapda Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 14, name: "Garden Town Paint Mart", slug: "garden-town-paint-mart", image: shop6, location: "Garden Town", rating: 4.6, reviews: 72, is_verified: true, categories: ["Paints", "Tiles"], address: "Aroop Road, Garden Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
  { id: 15, name: "Civil Lines Sanitary Store", slug: "civil-lines-sanitary-store", image: shop7, location: "Civil Lines", rating: 4.4, reviews: 58, is_verified: true, categories: ["Pipes", "Tiles", "Marble"], address: "Sialkot Bypass, Civil Lines, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
  { id: 16, name: "Madina Marble House", slug: "madina-marble-house", image: shop8, location: "Rahwali", rating: 4.7, reviews: 93, is_verified: true, categories: ["Marble", "Tiles"], address: "Rahwali Road, Rahwali, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 17, name: "Iqbal Brick Kiln", slug: "iqbal-brick-kiln", image: shop1, location: "Peoples Colony", rating: 3.9, reviews: 31, is_verified: false, categories: ["Bricks", "Sand"], address: "Wapda Town Chowk, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
  { id: 18, name: "Star Pipes & Fittings", slug: "star-pipes-fittings", image: shop2, location: "Model Town", rating: 4.5, reviews: 67, is_verified: true, categories: ["Pipes", "Steel"], address: "Khiali Road, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
  { id: 19, name: "Noor Sand & Crush", slug: "noor-sand-crush", image: shop3, location: "Satellite Town", rating: 4.2, reviews: 49, is_verified: false, categories: ["Sand", "Bricks", "Cement"], address: "Main GT Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
  { id: 20, name: "Garden Cement Point", slug: "garden-cement-point", image: shop4, location: "Garden Town", rating: 4.3, reviews: 52, is_verified: true, categories: ["Cement", "Steel", "Sand"], address: "Aroop Road, Garden Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
];

// Demo products: category supplier ki categories se match hoti hai.
// Supplier ke products = wo products jin ki category supplier.categories mein ho.
// slug + categorySlug: BmProductCard ke View Details ke liye (/materials/[categorySlug]/[slug])
const BM_SUPPLIER_PRODUCTS = [
  { id: 1, name: "OPC Cement Bag (50 kg)", slug: "opc-cement-bag", price: 1350, unit: "bag", image: null, category: "Cement", categorySlug: "cement" },
  { id: 2, name: "White Cement Bag", slug: "white-cement-bag", price: 1900, unit: "bag", image: null, category: "Cement", categorySlug: "cement" },
  { id: 3, name: "Steel Saria Grade 60", slug: "steel-saria", price: 265, unit: "kg", image: steelSaria, category: "Steel", categorySlug: "steel-welding" },
  { id: 4, name: "Custom Steel Main Gate", slug: "custom-steel-main-gate", price: 1500, unit: "sq ft", image: metalAluminum, category: "Steel", categorySlug: "steel-welding" },
  { id: 5, name: "Red Clay Bricks (A-Class)", slug: "red-clay-bricks", price: 17, unit: "piece", image: bricks, category: "Bricks", categorySlug: "bricks-blocks" },
  { id: 6, name: "Concrete Blocks", slug: "concrete-blocks", price: 85, unit: "piece", image: bricks, category: "Bricks", categorySlug: "bricks-blocks" },
  { id: 7, name: "Porcelain Floor Tiles", slug: "porcelain-floor-tiles", price: 95, unit: "sq ft", image: architectural, category: "Tiles", categorySlug: "architectural-products" },
  { id: 8, name: "Wall Tiles (Glossy)", slug: "wall-tiles-glossy", price: 80, unit: "sq ft", image: architectural, category: "Tiles", categorySlug: "architectural-products" },
  { id: 9, name: "Ravi Sand (Rait)", slug: "ravi-sand", price: 9000, unit: "trolley", image: sandImage, category: "Sand", categorySlug: "sand-crush" },
  { id: 10, name: "Chenab Sand", slug: "chenab-sand", price: 7500, unit: "trolley", image: sandImage, category: "Sand", categorySlug: "sand-crush" },
  { id: 11, name: "Gold Emulsion Paint", slug: "gold-emulsion-paint", price: 7800, unit: "bucket", image: paintsFinishes, category: "Paints", categorySlug: "paints-finishes" },
  { id: 12, name: "Exterior Weather Paint", slug: "exterior-weather-paint", price: 9200, unit: "bucket", image: paintsFinishes, category: "Paints", categorySlug: "paints-finishes" },
  { id: 13, name: "PVC Pipe (4 inch)", slug: "pvc-pipe-4-inch", price: 120, unit: "ft", image: null, category: "Pipes", categorySlug: "pipes" },
  { id: 14, name: "CPVC Pipe (1 inch)", slug: "cpvc-pipe-1-inch", price: 95, unit: "ft", image: null, category: "Pipes", categorySlug: "pipes" },
  { id: 15, name: "Italian Marble Slab", slug: "italian-marble-slab", price: 650, unit: "sq ft", image: architectural, category: "Marble", categorySlug: "architectural-products" },
  { id: 16, name: "Local Marble Slab", slug: "local-marble-slab", price: 420, unit: "sq ft", image: architectural, category: "Marble", categorySlug: "architectural-products" },
];

// Supplier ki image na ho to ye default hero image show hogi (apni default image laga dein)
const BM_DEFAULT_HERO = shop1;

const PRODUCTS_PER_PAGE = 6; // supplier ke sare products ek saath load nahi hote

const BM_TABS = [
  { key: "overview", label: "Overview" },
  { key: "category", label: "Category" },
  { key: "products", label: "Products" },
];

const pageButton =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

const sectionHeading =
  "border-l-4 border-[var(--primary-yellow)] pl-2 text-sm font-bold text-[color:var(--primary-text)]";

/* =========================================================
   PAGE  (/suppliers/city-material-traders)
========================================================= */

const Page = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("overview");
  const [productCategory, setProductCategory] = useState("all");

  // URL ke slug se supplier dhoondhna
  const supplier = BM_SUPPLIERS.find((item) => item.slug === id);

  // Sirf is supplier ke products (+ category filter)
  const supplierProducts = supplier
    ? BM_SUPPLIER_PRODUCTS.filter(
        (product) =>
          supplier.categories.includes(product.category) &&
          (productCategory === "all" || product.category === productCategory)
      ).slice(0, PRODUCTS_PER_PAGE)
    : [];

  // Handlers (abhi sirf alert)
  const handleContactSupplier = () => alert(`Contacting ${supplier.name} (demo)`);
  const handlePagination = () => alert("Pagination will work with API data.");

  // Tab click: tab highlight ho aur page us section tak scroll kare
  const handleTabClick = (key) => {
    setActiveTab(key);
    document.getElementById(key).scrollIntoView({ behavior: "smooth" });
  };

  // Supplier na mile
  if (!supplier) {
    return (
      <main className="min-h-screen bg-[var(--off-white-background)] px-4 py-16 text-center">
        <p className="text-sm text-[color:var(--secondary-text)]">Supplier not found.</p>
        <Link
          href="/suppliers"
          className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <ArrowLeft size={14} />
          Back to Suppliers
        </Link>
      </main>
    );
  }

  const initials = supplier.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="min-h-screen bg-[var(--off-white-background)] pb-10">
      {/* HERO BANNER: supplier card wali image */}
      <div className="relative h-40 w-full bg-[var(--charcoal-black)] sm:h-56 md:h-64">
        <Image
          src={supplier.image || BM_DEFAULT_HERO}
          alt={supplier.name}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4">
        {/* SUPPLIER INFO CARD */}
        <div className="-mt-10 flex flex-col gap-4 rounded-xl border border-[var(--primary-yellow)]/40 bg-[var(--primary-yellow)]/10 p-4 shadow-md backdrop-blur-sm sm:-mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal-black)] text-sm font-bold text-white">
              {initials}
            </span>

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base font-bold text-[color:var(--primary-text)]">
                  {supplier.name}
                </h1>
                <span className="flex items-center gap-1 rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] px-2 py-0.5 text-[10px] text-[color:var(--primary-text)]">
                  {supplier.is_verified ? (
                    <ShieldCheck size={11} className="text-[color:var(--hover-yellow)]" />
                  ) : (
                    <ShieldAlert size={11} className="text-[color:var(--secondary-text)]" />
                  )}
                  {supplier.is_verified ? "Verified" : "Unverified"}
                </span>
              </div>

              <p className="text-xs text-[color:var(--secondary-text)]">
                {supplier.categories.join(", ")}
              </p>
              <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
                <Star size={12} className="fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]" />
                <span className="font-semibold text-[color:var(--primary-text)]">{supplier.rating}</span>
                ({supplier.reviews} reviews)
              </p>
              <p className="flex items-start gap-1 text-xs text-[color:var(--secondary-text)]">
                <MapPin size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                {supplier.address}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContactSupplier}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:w-auto"
          >
            <Phone size={14} />
            Contact Supplier
          </button>
        </div>

        {/* TABS: click par us section tak scroll hota hai */}
        <div className="mt-5 flex gap-6 border-b border-[color:var(--border-color)]">
          {BM_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab.key)}
              className={`-mb-px border-b-2 pb-2 text-xs transition-colors ${
                activeTab === tab.key
                  ? "border-[var(--primary-yellow)] font-semibold text-[color:var(--primary-text)]"
                  : "border-transparent text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        <section id="overview" className="mt-6 scroll-mt-24">
          <h2 className={sectionHeading}>Overview</h2>

          <h3 className="mt-3 text-xs font-bold uppercase text-[color:var(--primary-text)]">
            Welcome to {supplier.name}
          </h3>
          <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
            Supplier of {supplier.categories.slice(0, 3).join(", ").toLowerCase()} and more,
            with reliable service and on-time delivery.
          </p>
          <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">
            Sample shop profile shown for demonstration purposes.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
              <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
                <MapPin size={11} /> Address
              </p>
              <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.address}</p>
            </div>
            <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
              <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
                <Clock size={11} /> Opening hours
              </p>
              <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.hours}</p>
            </div>
            <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
              <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
                <Truck size={11} /> Delivery
              </p>
              <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.delivery}</p>
            </div>
          </div>
        </section>

        {/* CATEGORY */}
        <section id="category" className="mt-6 scroll-mt-24">
          <div className="overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)]">
            <h2 className="bg-[var(--primary-yellow)]/20 px-3 py-2 text-xs font-bold text-[color:var(--primary-text)]">
              Category
            </h2>
            <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3">
              {supplier.categories.map((category) => (
                <p
                  key={category}
                  className="flex items-center gap-2 text-xs text-[color:var(--primary-text)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-yellow)]" />
                  {category}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="mt-8 scroll-mt-24">
          <h2 className="text-center text-sm font-bold text-[color:var(--primary-text)]">
            Products by{" "}
            <span className="text-[color:var(--primary-yellow)]">{supplier.name}</span>
          </h2>

          {/* Category filter */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setProductCategory("all")}
              className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
                productCategory === "all"
                  ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
                  : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
              }`}
            >
              All Products
            </button>
            {supplier.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setProductCategory(category)}
                className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
                  productCategory === category
                    ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
                    : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {supplierProducts.length === 0 ? (
            <p className="mt-6 text-center text-xs text-[color:var(--secondary-text)]">
              No products found.
            </p>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {supplierProducts.map((product) => (
                  <BmProductCard
                    key={product.id}
                    name={product.name}
                    slug={product.slug}
                    categorySlug={product.categorySlug}
                    price={product.price}
                    unit={product.unit}
                    image={product.image}
                    shop={supplier.name}
                    location={supplier.location}
                  />
                ))}
              </div>

              {/* PAGINATION (abhi sirf alert) */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button type="button" aria-label="Previous page" onClick={handlePagination} className={pageButton}>
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={handlePagination}
                  className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
                >
                  1
                </button>
                <button type="button" onClick={handlePagination} className={pageButton}>2</button>
                <button type="button" onClick={handlePagination} className={pageButton}>3</button>
                <button type="button" aria-label="Next page" onClick={handlePagination} className={pageButton}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </>
          )}
        </section>

        <p className="mt-8 text-center text-[11px] text-[color:var(--secondary-text)]">
          All supplier information is for demo purposes only.
        </p>
      </div>
    </main>
  );
};

export default Page;

// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   MapPin,
//   Phone,
//   ShieldAlert,
//   ShieldCheck,
//   Star,
//   Truck,
// } from "lucide-react";
// import BmProductCard from "../../../../component/shared/productCard/BmProductCard";
// import shop1 from "../../../../assets/images/supplier/shops/shop-1.jpg";
// import shop2 from "../../../../assets/images/supplier/shops/shop-2.jpg";
// import shop3 from "../../../../assets/images/supplier/shops/shop-3.jpg";
// import shop4 from "../../../../assets/images/supplier/shops/shop-4.jpg";
// import shop5 from "../../../../assets/images/supplier/shops/shop-5.jpg";
// import shop6 from "../../../../assets/images/supplier/shops/shop-6.jpg";
// import shop7 from "../../../../assets/images/supplier/shops/shop-7.jpg";
// import shop8 from "../../../../assets/images/supplier/shops/shop-8.jpg";
// import bricks from "../../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../../assets/images/guest/card/sand.jpg";
// import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
// import architectural from "../../../../assets/images/guest/card/tiles.jpg";
// import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
// import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// // Supplier listing wala hi data (+ address, hours, delivery).
// // image wahi hai jo supplier card mein use hoti hai.
// const BM_SUPPLIERS = [
//   { id: 1, name: "Al-Noor Building Store", slug: "al-noor-building-store", image: shop1, location: "GT Road", rating: 4.5, reviews: 98, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"], address: "Main GT Road, GT Road, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 2, name: "City Material Traders", slug: "city-material-traders", image: shop2, location: "Satellite Town", rating: 4.5, reviews: 86, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Sand"], address: "Aroop Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 3, name: "Rehman Builders Supply", slug: "rehman-builders-supply", image: shop3, location: "Model Town", rating: 4.4, reviews: 64, is_verified: false, categories: ["Cement", "Steel", "Paints", "Pipes"], address: "Sialkot Bypass, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 4, name: "Zahid Construction Materials", slug: "zahid-construction-materials", image: shop4, location: "Peoples Colony", rating: 4.6, reviews: 112, is_verified: true, categories: ["Cement", "Steel", "Tiles", "Marble"], address: "Rahwali Road, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 5, name: "Punjab Building Materials", slug: "punjab-building-materials", image: shop5, location: "GT Road", rating: 4.4, reviews: 76, is_verified: true, categories: ["Cement", "Bricks", "Paints", "Pipes"], address: "Wapda Town Chowk, GT Road, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 6, name: "Modern Builders Mart", slug: "modern-builders-mart", image: shop6, location: "Satellite Town", rating: 4.8, reviews: 134, is_verified: true, categories: ["Cement", "Steel", "Sand", "Tiles"], address: "Khiali Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 7, name: "Ali & Sons Traders", slug: "ali-sons-traders", image: shop7, location: "Model Town", rating: 4.2, reviews: 54, is_verified: false, categories: ["Bricks", "Tiles", "Paints", "Pipes"], address: "Main GT Road, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 8, name: "Rana Construction Supply", slug: "rana-construction-supply", image: shop8, location: "Peoples Colony", rating: 4.7, reviews: 89, is_verified: true, categories: ["Cement", "Bricks", "Sand", "Steel"], address: "Aroop Road, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 9, name: "Gujranwala Tiles House", slug: "gujranwala-tiles-house", image: shop1, location: "Rahwali", rating: 4.9, reviews: 141, is_verified: true, categories: ["Tiles", "Marble", "Paints"], address: "Sialkot Bypass, Rahwali, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 10, name: "Al-Rehman Depot", slug: "al-rehman-depot", image: shop2, location: "Civil Lines", rating: 4.3, reviews: 61, is_verified: false, categories: ["Cement", "Steel"], address: "Rahwali Road, Civil Lines, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 11, name: "Bilal Traders", slug: "bilal-traders", image: shop3, location: "Wapda Town", rating: 4.1, reviews: 38, is_verified: false, categories: ["Bricks", "Sand"], address: "Wapda Town Chowk, Wapda Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 12, name: "Chenab Steel Works", slug: "chenab-steel-works", image: shop4, location: "GT Road", rating: 4.8, reviews: 120, is_verified: true, categories: ["Steel", "Pipes"], address: "Khiali Road, GT Road, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 13, name: "Wapda Town Hardware", slug: "wapda-town-hardware", image: shop5, location: "Wapda Town", rating: 4.0, reviews: 45, is_verified: false, categories: ["Paints", "Pipes", "Tiles"], address: "Main GT Road, Wapda Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 14, name: "Garden Town Paint Mart", slug: "garden-town-paint-mart", image: shop6, location: "Garden Town", rating: 4.6, reviews: 72, is_verified: true, categories: ["Paints", "Tiles"], address: "Aroop Road, Garden Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 15, name: "Civil Lines Sanitary Store", slug: "civil-lines-sanitary-store", image: shop7, location: "Civil Lines", rating: 4.4, reviews: 58, is_verified: true, categories: ["Pipes", "Tiles", "Marble"], address: "Sialkot Bypass, Civil Lines, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 16, name: "Madina Marble House", slug: "madina-marble-house", image: shop8, location: "Rahwali", rating: 4.7, reviews: 93, is_verified: true, categories: ["Marble", "Tiles"], address: "Rahwali Road, Rahwali, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 17, name: "Iqbal Brick Kiln", slug: "iqbal-brick-kiln", image: shop1, location: "Peoples Colony", rating: 3.9, reviews: 31, is_verified: false, categories: ["Bricks", "Sand"], address: "Wapda Town Chowk, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 18, name: "Star Pipes & Fittings", slug: "star-pipes-fittings", image: shop2, location: "Model Town", rating: 4.5, reviews: 67, is_verified: true, categories: ["Pipes", "Steel"], address: "Khiali Road, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 19, name: "Noor Sand & Crush", slug: "noor-sand-crush", image: shop3, location: "Satellite Town", rating: 4.2, reviews: 49, is_verified: false, categories: ["Sand", "Bricks", "Cement"], address: "Main GT Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 20, name: "Garden Cement Point", slug: "garden-cement-point", image: shop4, location: "Garden Town", rating: 4.3, reviews: 52, is_verified: true, categories: ["Cement", "Steel", "Sand"], address: "Aroop Road, Garden Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
// ];

// // Demo products: category supplier ki categories se match hoti hai.
// // Supplier ke products = wo products jin ki category supplier.categories mein ho.
// // slug: BmProductCard ke View Details ke liye (/materials/[slug])
// const BM_SUPPLIER_PRODUCTS = [
//   { id: 1, name: "OPC Cement Bag (50 kg)", slug: "opc-cement-bag", price: 1350, unit: "bag", image: null, category: "Cement" },
//   { id: 2, name: "White Cement Bag", slug: "white-cement-bag", price: 1900, unit: "bag", image: null, category: "Cement" },
//   { id: 3, name: "Steel Saria Grade 60", slug: "steel-saria", price: 265, unit: "kg", image: steelSaria, category: "Steel" },
//   { id: 4, name: "Custom Steel Main Gate", slug: "custom-steel-main-gate", price: 1500, unit: "sq ft", image: metalAluminum, category: "Steel" },
//   { id: 5, name: "Red Clay Bricks (A-Class)", slug: "red-clay-bricks", price: 17, unit: "piece", image: bricks, category: "Bricks" },
//   { id: 6, name: "Concrete Blocks", slug: "concrete-blocks", price: 85, unit: "piece", image: bricks, category: "Bricks" },
//   { id: 7, name: "Porcelain Floor Tiles", slug: "porcelain-floor-tiles", price: 95, unit: "sq ft", image: architectural, category: "Tiles" },
//   { id: 8, name: "Wall Tiles (Glossy)", slug: "wall-tiles-glossy", price: 80, unit: "sq ft", image: architectural, category: "Tiles" },
//   { id: 9, name: "Ravi Sand (Rait)", slug: "ravi-sand", price: 9000, unit: "trolley", image: sandImage, category: "Sand" },
//   { id: 10, name: "Chenab Sand", slug: "chenab-sand", price: 7500, unit: "trolley", image: sandImage, category: "Sand" },
//   { id: 11, name: "Gold Emulsion Paint", slug: "gold-emulsion-paint", price: 7800, unit: "bucket", image: paintsFinishes, category: "Paints" },
//   { id: 12, name: "Exterior Weather Paint", slug: "exterior-weather-paint", price: 9200, unit: "bucket", image: paintsFinishes, category: "Paints" },
//   { id: 13, name: "PVC Pipe (4 inch)", slug: "pvc-pipe-4-inch", price: 120, unit: "ft", image: null, category: "Pipes" },
//   { id: 14, name: "CPVC Pipe (1 inch)", slug: "cpvc-pipe-1-inch", price: 95, unit: "ft", image: null, category: "Pipes" },
//   { id: 15, name: "Italian Marble Slab", slug: "italian-marble-slab", price: 650, unit: "sq ft", image: architectural, category: "Marble" },
//   { id: 16, name: "Local Marble Slab", slug: "local-marble-slab", price: 420, unit: "sq ft", image: architectural, category: "Marble" },
// ];

// // Supplier ki image na ho to ye default hero image show hogi (apni default image laga dein)
// const BM_DEFAULT_HERO = shop1;

// const PRODUCTS_PER_PAGE = 6; // supplier ke sare products ek saath load nahi hote

// const BM_TABS = [
//   { key: "overview", label: "Overview" },
//   { key: "category", label: "Category" },
//   { key: "products", label: "Products" },
// ];

// const pageButton =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]";

// const sectionHeading =
//   "border-l-4 border-[var(--primary-yellow)] pl-2 text-sm font-bold text-[color:var(--primary-text)]";

// /* =========================================================
//    PAGE  (/suppliers/city-material-traders)
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [activeTab, setActiveTab] = useState("overview");
//   const [productCategory, setProductCategory] = useState("all");

//   // URL ke slug se supplier dhoondhna
//   const supplier = BM_SUPPLIERS.find((item) => item.slug === id);

//   // Sirf is supplier ke products (+ category filter)
//   const supplierProducts = supplier
//     ? BM_SUPPLIER_PRODUCTS.filter(
//         (product) =>
//           supplier.categories.includes(product.category) &&
//           (productCategory === "all" || product.category === productCategory)
//       ).slice(0, PRODUCTS_PER_PAGE)
//     : [];

//   // Handlers (abhi sirf alert)
//   const handleContactSupplier = () => alert(`Contacting ${supplier.name} (demo)`);
//   const handlePagination = () => alert("Pagination will work with API data.");

//   // Tab click: tab highlight ho aur page us section tak scroll kare
//   const handleTabClick = (key) => {
//     setActiveTab(key);
//     document.getElementById(key).scrollIntoView({ behavior: "smooth" });
//   };

//   // Supplier na mile
//   if (!supplier) {
//     return (
//       <main className="min-h-screen bg-[var(--off-white-background)] px-4 py-16 text-center">
//         <p className="text-sm text-[color:var(--secondary-text)]">Supplier not found.</p>
//         <Link
//           href="/suppliers"
//           className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//         >
//           <ArrowLeft size={14} />
//           Back to Suppliers
//         </Link>
//       </main>
//     );
//   }

//   const initials = supplier.name
//     .split(" ")
//     .map((word) => word[0])
//     .slice(0, 2)
//     .join("");

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)] pb-10">
//       {/* HERO BANNER: supplier card wali image */}
//       <div className="relative h-40 w-full bg-[var(--charcoal-black)] sm:h-56 md:h-64">
//         <Image
//           src={supplier.image || BM_DEFAULT_HERO}
//           alt={supplier.name}
//           fill
//           priority
//           unoptimized
//           sizes="100vw"
//           className="object-cover"
//         />
//       </div>

//       <div className="mx-auto w-full max-w-3xl px-4">
//         {/* SUPPLIER INFO CARD */}
//         <div className="-mt-10 flex flex-col gap-4 rounded-xl border border-[var(--primary-yellow)]/40 bg-[var(--primary-yellow)]/10 p-4 shadow-md backdrop-blur-sm sm:-mt-12 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-start gap-3">
//             <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal-black)] text-sm font-bold text-white">
//               {initials}
//             </span>

//             <div className="min-w-0 space-y-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-base font-bold text-[color:var(--primary-text)]">
//                   {supplier.name}
//                 </h1>
//                 <span className="flex items-center gap-1 rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] px-2 py-0.5 text-[10px] text-[color:var(--primary-text)]">
//                   {supplier.is_verified ? (
//                     <ShieldCheck size={11} className="text-[color:var(--hover-yellow)]" />
//                   ) : (
//                     <ShieldAlert size={11} className="text-[color:var(--secondary-text)]" />
//                   )}
//                   {supplier.is_verified ? "Verified" : "Unverified"}
//                 </span>
//               </div>

//               <p className="text-xs text-[color:var(--secondary-text)]">
//                 {supplier.categories.join(", ")}
//               </p>
//               <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
//                 <Star size={12} className="fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]" />
//                 <span className="font-semibold text-[color:var(--primary-text)]">{supplier.rating}</span>
//                 ({supplier.reviews} reviews)
//               </p>
//               <p className="flex items-start gap-1 text-xs text-[color:var(--secondary-text)]">
//                 <MapPin size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
//                 {supplier.address}
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleContactSupplier}
//             className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:w-auto"
//           >
//             <Phone size={14} />
//             Contact Supplier
//           </button>
//         </div>

//         {/* TABS: click par us section tak scroll hota hai */}
//         <div className="mt-5 flex gap-6 border-b border-[color:var(--border-color)]">
//           {BM_TABS.map((tab) => (
//             <button
//               key={tab.key}
//               type="button"
//               onClick={() => handleTabClick(tab.key)}
//               className={`-mb-px border-b-2 pb-2 text-xs transition-colors ${
//                 activeTab === tab.key
//                   ? "border-[var(--primary-yellow)] font-semibold text-[color:var(--primary-text)]"
//                   : "border-transparent text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* OVERVIEW */}
//         <section id="overview" className="mt-6 scroll-mt-24">
//           <h2 className={sectionHeading}>Overview</h2>

//           <h3 className="mt-3 text-xs font-bold uppercase text-[color:var(--primary-text)]">
//             Welcome to {supplier.name}
//           </h3>
//           <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
//             Supplier of {supplier.categories.slice(0, 3).join(", ").toLowerCase()} and more,
//             with reliable service and on-time delivery.
//           </p>
//           <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">
//             Sample shop profile shown for demonstration purposes.
//           </p>

//           <div className="mt-4 grid gap-3 sm:grid-cols-3">
//             <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
//               <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
//                 <MapPin size={11} /> Address
//               </p>
//               <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.address}</p>
//             </div>
//             <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
//               <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
//                 <Clock size={11} /> Opening hours
//               </p>
//               <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.hours}</p>
//             </div>
//             <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
//               <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
//                 <Truck size={11} /> Delivery
//               </p>
//               <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.delivery}</p>
//             </div>
//           </div>
//         </section>

//         {/* CATEGORY */}
//         <section id="category" className="mt-6 scroll-mt-24">
//           <div className="overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)]">
//             <h2 className="bg-[var(--primary-yellow)]/20 px-3 py-2 text-xs font-bold text-[color:var(--primary-text)]">
//               Category
//             </h2>
//             <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3">
//               {supplier.categories.map((category) => (
//                 <p
//                   key={category}
//                   className="flex items-center gap-2 text-xs text-[color:var(--primary-text)]"
//                 >
//                   <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-yellow)]" />
//                   {category}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* PRODUCTS */}
//         <section id="products" className="mt-8 scroll-mt-24">
//           <h2 className="text-center text-sm font-bold text-[color:var(--primary-text)]">
//             Products by{" "}
//             <span className="text-[color:var(--primary-yellow)]">{supplier.name}</span>
//           </h2>

//           {/* Category filter */}
//           <div className="mt-3 flex flex-wrap justify-center gap-2">
//             <button
//               type="button"
//               onClick={() => setProductCategory("all")}
//               className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
//                 productCategory === "all"
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//               }`}
//             >
//               All Products
//             </button>
//             {supplier.categories.map((category) => (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => setProductCategory(category)}
//                 className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
//                   productCategory === category
//                     ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
//                     : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {supplierProducts.length === 0 ? (
//             <p className="mt-6 text-center text-xs text-[color:var(--secondary-text)]">
//               No products found.
//             </p>
//           ) : (
//             <>
//               <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
//                 {supplierProducts.map((product) => (
//                   <BmProductCard
//                     key={product.id}
//                     name={product.name}
//                     slug={product.slug}
//                     price={product.price}
//                     unit={product.unit}
//                     image={product.image}
//                     shop={supplier.name}
//                     location={supplier.location}
//                   />
//                 ))}
//               </div>

//               {/* PAGINATION (abhi sirf alert) */}
//               <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
//                 <button type="button" aria-label="Previous page" onClick={handlePagination} className={pageButton}>
//                   <ChevronLeft size={14} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handlePagination}
//                   className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-semibold text-[color:var(--charcoal-black)]"
//                 >
//                   1
//                 </button>
//                 <button type="button" onClick={handlePagination} className={pageButton}>2</button>
//                 <button type="button" onClick={handlePagination} className={pageButton}>3</button>
//                 <button type="button" aria-label="Next page" onClick={handlePagination} className={pageButton}>
//                   <ChevronRight size={14} />
//                 </button>
//               </div>
//             </>
//           )}
//         </section>

//         <p className="mt-8 text-center text-[11px] text-[color:var(--secondary-text)]">
//           All supplier information is for demo purposes only.
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Page;
// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Clock,
//   MapPin,
//   Phone,
//   ShieldAlert,
//   ShieldCheck,
//   ShoppingCart,
//   Star,
//   Truck,
// } from "lucide-react";
// import shop1 from "../../../../assets/images/supplier/shops/shop-1.jpg";
// import shop2 from "../../../../assets/images/supplier/shops/shop-2.jpg";
// import shop3 from "../../../../assets/images/supplier/shops/shop-3.jpg";
// import shop4 from "../../../../assets/images/supplier/shops/shop-4.jpg";
// import shop5 from "../../../../assets/images/supplier/shops/shop-5.jpg";
// import shop6 from "../../../../assets/images/supplier/shops/shop-6.jpg";
// import shop7 from "../../../../assets/images/supplier/shops/shop-7.jpg";
// import shop8 from "../../../../assets/images/supplier/shops/shop-8.jpg";
// import bricks from "../../../../assets/images/guest/card/briks.jpg";
// import sandImage from "../../../../assets/images/guest/card/sand.jpg";
// import steelSaria from "../../../../assets/images/guest/card/steelSaria.jpg";
// import architectural from "../../../../assets/images/guest/card/tiles.jpg";
// import paintsFinishes from "../../../../assets/images/guest/card/paint.jpg";
// import metalAluminum from "../../../../assets/images/guest/card/grills.jpg";

// /* =========================================================
//    TEMPORARY DATA — baad mein API se aayega
// ========================================================= */

// // Supplier listing wala hi data (+ address, hours, delivery).
// // image wahi hai jo supplier card mein use hoti hai.
// const BM_SUPPLIERS = [
//   { id: 1, name: "Al-Noor Building Store", slug: "al-noor-building-store", image: shop1, location: "GT Road", rating: 4.5, reviews: 98, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"], address: "Main GT Road, GT Road, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 2, name: "City Material Traders", slug: "city-material-traders", image: shop2, location: "Satellite Town", rating: 4.5, reviews: 86, is_verified: true, categories: ["Cement", "Steel", "Bricks", "Sand"], address: "Aroop Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 3, name: "Rehman Builders Supply", slug: "rehman-builders-supply", image: shop3, location: "Model Town", rating: 4.4, reviews: 64, is_verified: false, categories: ["Cement", "Steel", "Paints", "Pipes"], address: "Sialkot Bypass, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 4, name: "Zahid Construction Materials", slug: "zahid-construction-materials", image: shop4, location: "Peoples Colony", rating: 4.6, reviews: 112, is_verified: true, categories: ["Cement", "Steel", "Tiles", "Marble"], address: "Rahwali Road, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 5, name: "Punjab Building Materials", slug: "punjab-building-materials", image: shop5, location: "GT Road", rating: 4.4, reviews: 76, is_verified: true, categories: ["Cement", "Bricks", "Paints", "Pipes"], address: "Wapda Town Chowk, GT Road, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 6, name: "Modern Builders Mart", slug: "modern-builders-mart", image: shop6, location: "Satellite Town", rating: 4.8, reviews: 134, is_verified: true, categories: ["Cement", "Steel", "Sand", "Tiles"], address: "Khiali Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 7, name: "Ali & Sons Traders", slug: "ali-sons-traders", image: shop7, location: "Model Town", rating: 4.2, reviews: 54, is_verified: false, categories: ["Bricks", "Tiles", "Paints", "Pipes"], address: "Main GT Road, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 8, name: "Rana Construction Supply", slug: "rana-construction-supply", image: shop8, location: "Peoples Colony", rating: 4.7, reviews: 89, is_verified: true, categories: ["Cement", "Bricks", "Sand", "Steel"], address: "Aroop Road, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 9, name: "Gujranwala Tiles House", slug: "gujranwala-tiles-house", image: shop1, location: "Rahwali", rating: 4.9, reviews: 141, is_verified: true, categories: ["Tiles", "Marble", "Paints"], address: "Sialkot Bypass, Rahwali, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 10, name: "Al-Rehman Depot", slug: "al-rehman-depot", image: shop2, location: "Civil Lines", rating: 4.3, reviews: 61, is_verified: false, categories: ["Cement", "Steel"], address: "Rahwali Road, Civil Lines, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 11, name: "Bilal Traders", slug: "bilal-traders", image: shop3, location: "Wapda Town", rating: 4.1, reviews: 38, is_verified: false, categories: ["Bricks", "Sand"], address: "Wapda Town Chowk, Wapda Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 12, name: "Chenab Steel Works", slug: "chenab-steel-works", image: shop4, location: "GT Road", rating: 4.8, reviews: 120, is_verified: true, categories: ["Steel", "Pipes"], address: "Khiali Road, GT Road, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 13, name: "Wapda Town Hardware", slug: "wapda-town-hardware", image: shop5, location: "Wapda Town", rating: 4.0, reviews: 45, is_verified: false, categories: ["Paints", "Pipes", "Tiles"], address: "Main GT Road, Wapda Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 14, name: "Garden Town Paint Mart", slug: "garden-town-paint-mart", image: shop6, location: "Garden Town", rating: 4.6, reviews: 72, is_verified: true, categories: ["Paints", "Tiles"], address: "Aroop Road, Garden Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 15, name: "Civil Lines Sanitary Store", slug: "civil-lines-sanitary-store", image: shop7, location: "Civil Lines", rating: 4.4, reviews: 58, is_verified: true, categories: ["Pipes", "Tiles", "Marble"], address: "Sialkot Bypass, Civil Lines, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 16, name: "Madina Marble House", slug: "madina-marble-house", image: shop8, location: "Rahwali", rating: 4.7, reviews: 93, is_verified: true, categories: ["Marble", "Tiles"], address: "Rahwali Road, Rahwali, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 17, name: "Iqbal Brick Kiln", slug: "iqbal-brick-kiln", image: shop1, location: "Peoples Colony", rating: 3.9, reviews: 31, is_verified: false, categories: ["Bricks", "Sand"], address: "Wapda Town Chowk, Peoples Colony, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
//   { id: 18, name: "Star Pipes & Fittings", slug: "star-pipes-fittings", image: shop2, location: "Model Town", rating: 4.5, reviews: 67, is_verified: true, categories: ["Pipes", "Steel"], address: "Khiali Road, Model Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 6:00 PM", delivery: "Within Gujranwala" },
//   { id: 19, name: "Noor Sand & Crush", slug: "noor-sand-crush", image: shop3, location: "Satellite Town", rating: 4.2, reviews: 49, is_verified: false, categories: ["Sand", "Bricks", "Cement"], address: "Main GT Road, Satellite Town, Gujranwala, Punjab (demo address)", hours: "9:00 AM – 9:00 PM", delivery: "Gujranwala and nearby areas" },
//   { id: 20, name: "Garden Cement Point", slug: "garden-cement-point", image: shop4, location: "Garden Town", rating: 4.3, reviews: 52, is_verified: true, categories: ["Cement", "Steel", "Sand"], address: "Aroop Road, Garden Town, Gujranwala, Punjab (demo address)", hours: "8:00 AM – 8:00 PM", delivery: "Free delivery on bulk orders in Gujranwala" },
// ];

// // Demo products: category supplier ki categories se match hoti hai.
// // Supplier ke products = wo products jin ki category supplier.categories mein ho.
// const BM_SUPPLIER_PRODUCTS = [
//   { id: 1, name: "OPC Cement Bag (50 kg)", price: 1350, unit: "bag", image: null, category: "Cement" },
//   { id: 2, name: "White Cement Bag", price: 1900, unit: "bag", image: null, category: "Cement" },
//   { id: 3, name: "Steel Saria Grade 60", price: 265, unit: "kg", image: steelSaria, category: "Steel" },
//   { id: 4, name: "Custom Steel Main Gate", price: 1500, unit: "sq ft", image: metalAluminum, category: "Steel" },
//   { id: 5, name: "Red Clay Bricks (A-Class)", price: 17, unit: "piece", image: bricks, category: "Bricks" },
//   { id: 6, name: "Concrete Blocks", price: 85, unit: "piece", image: bricks, category: "Bricks" },
//   { id: 7, name: "Porcelain Floor Tiles", price: 95, unit: "sq ft", image: architectural, category: "Tiles" },
//   { id: 8, name: "Wall Tiles (Glossy)", price: 80, unit: "sq ft", image: architectural, category: "Tiles" },
//   { id: 9, name: "Ravi Sand (Rait)", price: 9000, unit: "trolley", image: sandImage, category: "Sand" },
//   { id: 10, name: "Chenab Sand", price: 7500, unit: "trolley", image: sandImage, category: "Sand" },
//   { id: 11, name: "Gold Emulsion Paint", price: 7800, unit: "bucket", image: paintsFinishes, category: "Paints" },
//   { id: 12, name: "Exterior Weather Paint", price: 9200, unit: "bucket", image: paintsFinishes, category: "Paints" },
//   { id: 13, name: "PVC Pipe (4 inch)", price: 120, unit: "ft", image: null, category: "Pipes" },
//   { id: 14, name: "CPVC Pipe (1 inch)", price: 95, unit: "ft", image: null, category: "Pipes" },
//   { id: 15, name: "Italian Marble Slab", price: 650, unit: "sq ft", image: architectural, category: "Marble" },
//   { id: 16, name: "Local Marble Slab", price: 420, unit: "sq ft", image: architectural, category: "Marble" },
// ];

// // Supplier ki image na ho to ye default hero image show hogi (apni default image laga dein)
// const BM_DEFAULT_HERO = shop1;

// const BM_TABS = [
//   { key: "overview", label: "Overview" },
//   { key: "category", label: "Category" },
//   { key: "products", label: "Products" },
// ];

// const sectionHeading =
//   "border-l-4 border-[var(--primary-yellow)] pl-2 text-sm font-bold text-[color:var(--primary-text)]";

// /* =========================================================
//    PAGE  (/suppliers/city-material-traders)
// ========================================================= */

// const Page = () => {
//   const { id } = useParams();

//   const [activeTab, setActiveTab] = useState("overview");
//   const [productCategory, setProductCategory] = useState("all");

//   // URL ke slug se supplier dhoondhna
//   const supplier = BM_SUPPLIERS.find((item) => item.slug === id);

//   // Sirf is supplier ke products (+ category filter)
//   const supplierProducts = supplier
//     ? BM_SUPPLIER_PRODUCTS.filter(
//         (product) =>
//           supplier.categories.includes(product.category) &&
//           (productCategory === "all" || product.category === productCategory)
//       )
//     : [];

//   // Handlers (abhi sirf alert)
//   const handleContactSupplier = () => alert(`Contacting ${supplier.name} (demo)`);
//   const handleContactProduct = (name) =>
//     alert(`Contact ${supplier.name} about ${name} (demo)`);
//   const handleAddToCart = (name) =>
//     alert(`Please login to add ${name} to cart.`);

//   // Tab click: tab highlight ho aur page us section tak scroll kare
//   const handleTabClick = (key) => {
//     setActiveTab(key);
//     document.getElementById(key).scrollIntoView({ behavior: "smooth" });
//   };

//   // Supplier na mile
//   if (!supplier) {
//     return (
//       <main className="min-h-screen bg-[var(--off-white-background)] px-4 py-16 text-center">
//         <p className="text-sm text-[color:var(--secondary-text)]">Supplier not found.</p>
//         <Link
//           href="/suppliers"
//           className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//         >
//           <ArrowLeft size={14} />
//           Back to Suppliers
//         </Link>
//       </main>
//     );
//   }

//   const initials = supplier.name
//     .split(" ")
//     .map((word) => word[0])
//     .slice(0, 2)
//     .join("");

//   return (
//     <main className="min-h-screen bg-[var(--off-white-background)] pb-10">
//       {/* HERO BANNER: supplier card wali image */}
//       <div className="relative h-40 w-full bg-[var(--charcoal-black)] sm:h-56 md:h-64">
//         <Image
//           src={supplier.image || BM_DEFAULT_HERO}
//           alt={supplier.name}
//           fill
//           priority
//           unoptimized
//           sizes="100vw"
//           className="object-cover"
//         />
//       </div>

//       <div className="mx-auto w-full max-w-3xl px-4">
//         {/* SUPPLIER INFO CARD */}
//         <div className="-mt-10 flex flex-col gap-4 rounded-xl border border-[var(--primary-yellow)]/40 bg-[var(--primary-yellow)]/10 p-4 shadow-md backdrop-blur-sm sm:-mt-12 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-start gap-3">
//             <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal-black)] text-sm font-bold text-white">
//               {initials}
//             </span>

//             <div className="min-w-0 space-y-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-base font-bold text-[color:var(--primary-text)]">
//                   {supplier.name}
//                 </h1>
//                 <span className="flex items-center gap-1 rounded-full border border-[color:var(--border-color)] bg-[var(--white-cards)] px-2 py-0.5 text-[10px] text-[color:var(--primary-text)]">
//                   {supplier.is_verified ? (
//                     <ShieldCheck size={11} className="text-[color:var(--hover-yellow)]" />
//                   ) : (
//                     <ShieldAlert size={11} className="text-[color:var(--secondary-text)]" />
//                   )}
//                   {supplier.is_verified ? "Verified" : "Unverified"}
//                 </span>
//               </div>

//               <p className="text-xs text-[color:var(--secondary-text)]">
//                 {supplier.categories.join(", ")}
//               </p>
//               <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
//                 <Star size={12} className="fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]" />
//                 <span className="font-semibold text-[color:var(--primary-text)]">{supplier.rating}</span>
//                 ({supplier.reviews} reviews)
//               </p>
//               <p className="flex items-start gap-1 text-xs text-[color:var(--secondary-text)]">
//                 <MapPin size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
//                 {supplier.address}
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleContactSupplier}
//             className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:w-auto"
//           >
//             <Phone size={14} />
//             Contact Supplier
//           </button>
//         </div>

//         {/* TABS: click par us section tak scroll hota hai */}
//         <div className="mt-5 flex gap-6 border-b border-[color:var(--border-color)]">
//           {BM_TABS.map((tab) => (
//             <button
//               key={tab.key}
//               type="button"
//               onClick={() => handleTabClick(tab.key)}
//               className={`-mb-px border-b-2 pb-2 text-xs transition-colors ${
//                 activeTab === tab.key
//                   ? "border-[var(--primary-yellow)] font-semibold text-[color:var(--primary-text)]"
//                   : "border-transparent text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* OVERVIEW */}
//         <section id="overview" className="mt-6 scroll-mt-24">
//           <h2 className={sectionHeading}>Overview</h2>

//           <h3 className="mt-3 text-xs font-bold uppercase text-[color:var(--primary-text)]">
//             Welcome to {supplier.name}
//           </h3>
//           <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
//             Supplier of {supplier.categories.slice(0, 3).join(", ").toLowerCase()} and more,
//             with reliable service and on-time delivery.
//           </p>
//           <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">
//             Sample shop profile shown for demonstration purposes.
//           </p>

//           <div className="mt-4 grid gap-3 sm:grid-cols-3">
//             <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
//               <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
//                 <MapPin size={11} /> Address
//               </p>
//               <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.address}</p>
//             </div>
//             <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
//               <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
//                 <Clock size={11} /> Opening hours
//               </p>
//               <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.hours}</p>
//             </div>
//             <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3">
//               <p className="flex items-center gap-1 text-[10px] text-[color:var(--secondary-text)]">
//                 <Truck size={11} /> Delivery
//               </p>
//               <p className="mt-1 text-xs text-[color:var(--primary-text)]">{supplier.delivery}</p>
//             </div>
//           </div>
//         </section>

//         {/* CATEGORY */}
//         <section id="category" className="mt-6 scroll-mt-24">
//           <div className="overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)]">
//             <h2 className="bg-[var(--primary-yellow)]/20 px-3 py-2 text-xs font-bold text-[color:var(--primary-text)]">
//               Category
//             </h2>
//             <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3">
//               {supplier.categories.map((category) => (
//                 <p
//                   key={category}
//                   className="flex items-center gap-2 text-xs text-[color:var(--primary-text)]"
//                 >
//                   <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-yellow)]" />
//                   {category}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* PRODUCTS */}
//         <section id="products" className="mt-8 scroll-mt-24">
//           <h2 className="text-center text-sm font-bold text-[color:var(--primary-text)]">
//             Products by{" "}
//             <span className="text-[color:var(--primary-yellow)]">{supplier.name}</span>
//           </h2>

//           {/* Category filter */}
//           <div className="mt-3 flex flex-wrap justify-center gap-2">
//             <button
//               type="button"
//               onClick={() => setProductCategory("all")}
//               className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
//                 productCategory === "all"
//                   ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
//                   : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//               }`}
//             >
//               All Products
//             </button>
//             {supplier.categories.map((category) => (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => setProductCategory(category)}
//                 className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
//                   productCategory === category
//                     ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-[color:var(--charcoal-black)]"
//                     : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {supplierProducts.length === 0 ? (
//             <p className="mt-6 text-center text-xs text-[color:var(--secondary-text)]">
//               No products found.
//             </p>
//           ) : (
//             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//               {supplierProducts.map((product) => (
//                 <article
//                   key={product.id}
//                   className="flex flex-col rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 shadow-sm"
//                 >
//                   <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--border-color)]">
//                     {product.image ? (
//                       <Image
//                         src={product.image}
//                         alt={product.name}
//                         fill
//                         unoptimized
//                         sizes="(min-width: 768px) 25vw, (min-width: 640px) 45vw, 100vw"
//                         className="object-cover"
//                       />
//                     ) : (
//                       <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
//                         No image
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex flex-1 flex-col gap-1 pt-2">
//                     <h3 className="text-xs font-bold text-[color:var(--primary-text)]">
//                       {product.name}
//                     </h3>
//                     <p className="text-[11px] font-medium text-[color:var(--primary-text)]">
//                       From Rs {product.price.toLocaleString("en-US")} / {product.unit}
//                     </p>
//                     <span className="w-fit rounded-full border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-2 py-0.5 text-[10px] text-[color:var(--secondary-text)]">
//                       {product.category}
//                     </span>
//                     <p className="text-[11px] text-[color:var(--secondary-text)]">{supplier.name}</p>
//                     <p className="flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)]">
//                       <MapPin size={10} aria-hidden="true" />
//                       {supplier.location}
//                     </p>

//                     <div className="mt-auto flex gap-2 pt-2">
//                       <button
//                         type="button"
//                         onClick={() => handleContactProduct(product.name)}
//                         className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-[var(--primary-yellow)] px-2 py-1.5 text-[11px] font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                       >
//                         <Phone size={11} />
//                         Contact
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => handleAddToCart(product.name)}
//                         className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-[var(--charcoal-black)] bg-[var(--white-cards)] px-2 py-1.5 text-[11px] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                       >
//                         <ShoppingCart size={11} />
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </section>

//         <p className="mt-8 text-center text-[11px] text-[color:var(--secondary-text)]">
//           All supplier information is for demo purposes only.
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Page;