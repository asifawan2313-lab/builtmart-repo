"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Store,
  User,
  X,
} from "lucide-react";
import ProductGrid from "../../../../../component/materials/ProductGrid/ProductGrid";
import { suppliers } from "../../../suppliers/supplierData";
import { allProducts } from "../../materialData";

// Gujranwala areas for the location dropdown
const areas = [
  "Satellite Town", "Model Town", "Peoples Colony", "Civil Lines", "DC Colony",
  "Garden Town", "Wapda Town", "Citi Housing", "Rahwali", "Ghakhar Mandi",
  "Eminabad", "Qila Didar Singh", "Aroop", "Nowshera Road", "GT Road",
  "Sialkot Road", "Sheikhupura Road", "Hafizabad Road", "Kangniwala", "Gondlanwala Road",
];

const tabs = [
  { id: 1, key: "description", label: "Description" },
  { id: 2, key: "reviews", label: "Reviews" },
];

// Sample reviews (demo data)
const sampleReviews = [
  { id: 1, name: "Ahmed K.", rating: 4, text: "Used it for a home construction project, and it has performed well." },
  { id: 2, name: "Usman R.", rating: 5, text: "Very satisfied with the performance. Worked flawlessly for my renovation." },
  { id: 3, name: "Bilal S.", rating: 5, text: "Great quality! Held up nicely. Would recommend for any work." },
  { id: 4, name: "Hamza T.", rating: 3, text: "Easy to work with and gives a clean finish." },
  { id: 5, name: "Zain A.", rating: 4, text: "Good quality for the price. Works well for foundation work." },
  { id: 6, name: "Faizan M.", rating: 5, text: "Strong material and the supplier delivered on time." },
];

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

const GAP = 16; // review cards ke beech ka fasla (gap-4)

// Description har product ke naam aur category se banti hai (sample text)
const buildDescription = ({ name, category, description }) => {
  const type = category.toLowerCase();

  return {
    title: `${name} - Quality ${category} for Your Construction Needs`,
    intro: `${description}${/[.!?]$/.test(description) ? "" : "."} Chosen for dependable performance on residential, commercial and industrial projects across Gujranwala.`,
    sections: [
      {
        title: "Key Features:",
        items: [
          { label: "Reliable Quality:", text: `Selected to meet the quality expected from ${type} in everyday construction work.` },
          { label: "Durable Performance:", text: "Built for long-lasting use, helping your structure stay strong over time." },
          { label: "Clear Details:", text: "Listed with its unit and specifications, so you know exactly what you are getting." },
          { label: "Versatile Use:", text: "Suitable for a wide range of building, finishing and renovation tasks." },
        ],
      },
      {
        title: "Applications:",
        items: [
          { label: "Residential Buildings:", text: "Ideal for homes, apartments and other residential structures." },
          { label: "Commercial Projects:", text: "Perfect for offices, shops and other commercial buildings." },
          { label: "Industrial Construction:", text: "Suitable for factories, warehouses and other industrial facilities." },
          { label: "Renovation Work:", text: "Works well for repairs, upgrades and finishing jobs." },
        ],
      },
      {
        title: "Benefits:",
        items: [
          { label: "Easy to Use:", text: "Simple to handle and fit into your construction process." },
          { label: "Budget Planning:", text: "Listed prices and units make it easier to compare and plan your budget." },
          { label: "Local Supply:", text: "Available from suppliers in Gujranwala, so you can contact them directly." },
        ],
      },
    ],
  };
};

const roundBtn =
  "absolute top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E2E4E7] bg-white text-[#202124] shadow transition-colors hover:bg-[#FDC716]";
const stepBtn =
  "flex h-10 w-10 cursor-pointer items-center justify-center text-[#202124] transition-colors hover:bg-[#FDC716]/25";
const linkBtn =
  "inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#45484D] transition-colors hover:text-black";
const inputClass =
  "w-full rounded-lg border border-[#E2E4E7] bg-white px-3 py-2 text-sm text-[#202124] outline-none focus:border-[#202124] focus:ring-1 focus:ring-[#202124]";

const ProductDetailPage = () => {
  const { category, productSlug } = useParams();
  const product = allProducts.find((p) => p.slug === productSlug && p.categorySlug === category);

  const [active, setActive] = useState(0); // slider image number
  const [qty, setQty] = useState(1);
  const [area, setArea] = useState(product?.location ?? areas[0]);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const [showAsk, setShowAsk] = useState(false);
  const [sent, setSent] = useState("");
  const [tab, setTab] = useState("description");

  // Add review popup
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewer, setReviewer] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [ratingError, setRatingError] = useState(false);
  const [reviewSent, setReviewSent] = useState("");

  // Reviews slider: cards ek ek karke aage sarakte hain
  const [items, setItems] = useState(sampleReviews); // cards ki current tarteeb
  const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false); // hover / touch par ruk jaye
  const track = useRef(null);
  const busy = useRef(false); // slide ke dauran dobara na chale

  const closeReview = () => {
    setShowReview(false);
    setRatingError(false);
  };

  // Ek card left sarkao
  const next = () => {
    if (busy.current || !track.current) return;
    busy.current = true;
    setAnimating(true);
    setShift(-(track.current.firstElementChild.offsetWidth + GAP));
  };

  // Slide khatam: pehla card aakhir mein bhejo aur track reset karo (bina jhatke ke)
  const handleSlideEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    setAnimating(false);
    setItems((a) => [...a.slice(1), a[0]]);
    setShift(0);
    busy.current = false;
  };

  // Har 3 second baad agla card (reduce motion par band)
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  // Review popup Escape key se band
  useEffect(() => {
    if (!showReview) return;
    const onKey = (e) => e.key === "Escape" && closeReview();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showReview]);

  // Product not found
  if (!product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F4F4F2] px-4 text-center">
        <Package className="h-10 w-10 text-[#A7ADB4]" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-[#202124]">Product not found</h1>
        <Link
          href={`/materials/${category}`}
          className="rounded-lg bg-[#FDC716] px-6 py-2.5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const { name, price, category: categoryName, description, specs = [], availability, image } = product;
  const gallery = product.gallery ?? [image];
  const supplier = suppliers.find((s) => s.name === product.supplier);
  const related = allProducts.filter((p) => p.categorySlug === category && p.slug !== productSlug);
  const details = buildDescription({ name, category: categoryName, description });

  // Optional fields: safe demo values are used when a product does not have them
  const unit = String(price).split("/")[1]?.trim() ?? "unit";
  const maxOrder = product.maxOrder ?? 200;
  const type = product.type ?? (product.reused ? "Reused" : "New");
  const tags = product.tags ?? [categoryName];
  const rows = [["Category", categoryName], ["Type", type], ...specs];

  // Simple handlers (demo only, nothing is sent anywhere)
  const handlePrev = () => setActive((a) => (a - 1 + gallery.length) % gallery.length);
  const handleNext = () => setActive((a) => (a + 1) % gallery.length);
  const handleQty = (value) => setQty(Math.min(maxOrder, Math.max(1, Number(value) || 1)));
  const handleWishlist = () => setLiked(!liked);
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
  };
  const handleAsk = () => setShowAsk(!showAsk);
  const handleCart = () => setAdded(true);
  const handleReview = () => setShowReview(true);
  const handleTab = (key) => {
    setTab(key);
    document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSend = (message) => (e) => {
    e.preventDefault();
    setSent(message);
    setShowAsk(false);
  };

  // Review submit: rating zaroori hai, phir card slider mein jud jata hai
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!rating) {
      setRatingError(true);
      return;
    }
    const newReview = { id: Date.now(), name: reviewer.trim(), rating, text: reviewText.trim() };
    setItems((a) => (busy.current ? [...a, newReview] : [newReview, ...a]));
    setReviewSent("Thanks, your review was added (demo, not saved).");
    setRating(0);
    setHoverRating(0);
    setReviewer("");
    setReviewText("");
    closeReview();
  };

  return (
    <main className="bg-[#F4F4F2] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/materials/${category}`}
          className="inline-flex items-center gap-2 text-sm text-[#45484D] transition-colors hover:text-black"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Products
        </Link>

        {/* Image slider left, info right */}
        <section className="mt-5 grid gap-8 md:grid-cols-2">
          {/* Slider */}
          <div className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#E2E4E7] bg-white">
              <Image
                src={gallery[active]}
                alt={`${name} (demo image)`}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain p-4"
              />
              {gallery.length > 1 && (
                <>
                  <button type="button" aria-label="Previous image" onClick={handlePrev} className={`${roundBtn} left-3`}>
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" aria-label="Next image" onClick={handleNext} className={`${roundBtn} right-3`}>
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Show image ${i + 1}`}
                        aria-current={active === i}
                        onClick={() => setActive(i)}
                        className={`h-2 cursor-pointer rounded-full transition-all ${
                          active === i ? "w-6 bg-[#FDC716]" : "w-2 bg-[#A7ADB4]"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0">
            {/* Wishlist, Ask question, Add review, Share */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <button type="button" onClick={handleWishlist} aria-pressed={liked} className={linkBtn}>
                <Heart size={14} className={liked ? "fill-[#FDC716] text-[#FDC716]" : ""} aria-hidden="true" />
                Wishlist
              </button>
              <button type="button" onClick={handleAsk} className={linkBtn}>
                <MessageCircle size={14} aria-hidden="true" />
                Ask question
              </button>
              <button type="button" onClick={handleReview} className={linkBtn}>
                <Star size={14} aria-hidden="true" />
                Add Review
              </button>
              <button type="button" onClick={handleShare} className={linkBtn}>
                <Share2 size={14} aria-hidden="true" />
                {copied ? "Link copied" : "Share"}
              </button>
            </div>

            {/* Ask question form (demo) */}
            {showAsk && (
              <form onSubmit={handleSend("Your question was noted (demo, not sent).")} className="mt-3 space-y-2">
                <textarea required rows={3} placeholder="Type your question..." aria-label="Your question" className={inputClass} />
                <button type="submit" className="h-9 cursor-pointer rounded-lg bg-[#FDC716] px-5 text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]">
                  Send
                </button>
              </form>
            )}
            {sent && <p className="mt-2 text-xs text-[#45484D]">{sent}</p>}

            <h1 className="mt-4 text-2xl font-extrabold text-[#202124] sm:text-3xl">{name}</h1>
            <p className="mt-3 text-sm leading-6 text-[#45484D]">{description}</p>
            <p className="mt-2 text-sm font-semibold text-[#202124]">
              Note: Maximum Order Quantity {maxOrder} {unit}s
            </p>

            <p className="mt-4 text-2xl font-extrabold text-[#202124]">{price}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#45484D]">
              <Package size={14} aria-hidden="true" />
              {availability}
            </p>

            {/* Quantity */}
            <div className="mt-4 inline-flex items-center overflow-hidden rounded-lg border border-[#E2E4E7] bg-white">
              <button type="button" aria-label="Decrease quantity" onClick={() => handleQty(qty - 1)} className={stepBtn}>
                <Minus size={16} />
              </button>
              <input
                type="number"
                min={1}
                max={maxOrder}
                value={qty}
                onChange={(e) => handleQty(e.target.value)}
                aria-label="Quantity"
                className="h-10 w-20 bg-transparent text-center text-sm font-semibold text-[#202124] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button type="button" aria-label="Increase quantity" onClick={() => handleQty(qty + 1)} className={stepBtn}>
                <Plus size={16} />
              </button>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-[#45484D]">
              <Info size={13} aria-hidden="true" />
              Note: Maximum Order Quantity {maxOrder}
            </p>

            {/* Location */}
            <label className="mt-4 block">
              <span className="sr-only">Location</span>
              <div className="relative max-w-xs">
                <MapPin size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
                <select value={area} onChange={(e) => setArea(e.target.value)} className={`${inputClass} h-10 pl-9`}>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}, Gujranwala
                    </option>
                  ))}
                </select>
              </div>
            </label>

            {/* Add to Cart + View Supplier */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCart}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
              >
                <ShoppingCart size={16} aria-hidden="true" />
                {added ? "Added (demo)" : "Add to Cart"}
              </button>
              {supplier && (
                <Link
                  href={`/suppliers/${supplier.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
                >
                  <Store size={16} aria-hidden="true" />
                  View Supplier
                </Link>
              )}
            </div>

            <p className="mt-3 text-xs text-[#45484D]">
              Supplier: <span className="font-semibold text-[#202124]">{product.supplier}</span>
            </p>
          </div>
        </section>

        {/* Specifications (pehle yeh) */}
        <section className="mt-8 rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#202124]">Specifications</h2>
          <dl className="mt-3 divide-y divide-[#E2E4E7] rounded-lg border border-[#E2E4E7] text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-4 py-2.5">
                <dt className="text-[#45484D]">{label}</dt>
                <dd className="text-right font-medium text-[#202124]">{value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2 px-4 py-2.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-[#45484D]">Tags</dt>
              <dd className="flex flex-wrap gap-1.5 sm:justify-end">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#E2E4E7] bg-[#F4F4F2] px-2.5 py-0.5 text-[11px] text-[#45484D]">
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        {/* Description / Reviews (specifications ke baad) */}
        <section className="mt-8">
          {/* Tabs: click par neeche us hisse tak scroll */}
          <div role="tablist" className="inline-flex gap-1 rounded-full border border-[#E2E4E7] bg-white p-1">
            {tabs.map(({ id, key, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => handleTab(key)}
                className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  tab === key ? "bg-[#FDC716] text-[#202124]" : "text-[#45484D] hover:bg-[#F4F4F2]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Description */}
          <div id="description" className="mt-6 scroll-mt-24 space-y-5 text-sm leading-6 text-[#45484D]">
            <h2 className="text-base font-bold text-[#202124]">{details.title}</h2>
            <p>{details.intro}</p>

            {details.sections.map(({ title, items: points }) => (
              <div key={title}>
                <h3 className="mb-1.5 font-bold text-[#202124]">{title}</h3>
                <ul className="space-y-1">
                  {points.map(({ label, text }) => (
                    <li key={label}>
                      <strong className="text-[#202124]">{label}</strong> {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p>
              Choose <strong className="text-[#202124]">{name}</strong> from{" "}
              <strong className="text-[#202124]">BuildMart</strong> for a reliable and cost-effective solution to your
              construction needs. Contact the supplier directly to confirm price and availability before you buy.
            </p>
            <p className="text-xs">Sample description shown for demonstration purposes.</p>
          </div>

          {/* Reviews heading + Add a review */}
          <div id="reviews" className="mt-10 flex scroll-mt-24 flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-extrabold text-[#202124] sm:text-2xl">What buyers say about {name}</h2>
            <button
              type="button"
              onClick={handleReview}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-[#FDC716] px-5 text-xs font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
            >
              <Plus size={14} aria-hidden="true" />
              Add a review
            </button>
          </div>
          {reviewSent && <p className="mt-3 text-xs text-[#45484D]">{reviewSent}</p>}

          {/* Review cards: ek ek karke aage sarakte hain */}
          <div
            className="mt-4 overflow-hidden py-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <div
              ref={track}
              onTransitionEnd={handleSlideEnd}
              className="flex gap-4"
              style={{
                transform: `translateX(${shift}px)`,
                transition: animating ? "transform 500ms ease-in-out" : "none",
              }}
            >
              {items.map(({ id, name: reviewerName, rating: stars, text }) => (
                <article
                  key={id}
                  className="flex w-[85%] shrink-0 flex-col justify-between rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
                >
                  <div>
                    <div className="flex" role="img" aria-label={`${stars} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} size={14} className={n <= stars ? "fill-[#FDC716] text-[#FDC716]" : "text-[#E2E4E7]"} />
                      ))}
                    </div>
                    <p className="mt-3 break-words text-xs leading-relaxed text-[#45484D]">{text}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                      <User size={16} aria-hidden="true" />
                    </span>
                    <span className="truncate text-xs font-semibold text-[#202124]">{reviewerName}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-2 text-xs text-[#45484D]">Sample reviews shown for demonstration purposes.</p>
        </section>

        {/* Related products */}
        <section className="mt-10">
          <h2 className="text-lg font-extrabold text-[#202124]">Related Products</h2>
          {related.length === 0 ? (
            <p className="mt-3 rounded-xl border border-[#E2E4E7] bg-white p-5 text-sm text-[#45484D]">
              No other sample products in this category yet.
            </p>
          ) : (
            <div className="mt-4">
              <ProductGrid items={related} />
            </div>
          )}
        </section>
      </div>

      {/* Add review popup */}
      {showReview && (
        <div onClick={closeReview} className="fixed inset-0 z-50 flex items-center justify-center bg-[#202124]/60 p-4">
          <form
            role="dialog"
            aria-modal="true"
            aria-label="Add review"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmitReview}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold text-[#202124]">Add Review</h2>
                <p className="mt-0.5 truncate text-xs text-[#45484D]">{name}</p>
              </div>
              <button
                type="button"
                onClick={closeReview}
                aria-label="Close"
                className="cursor-pointer rounded-full p-1.5 text-[#45484D] transition-colors hover:bg-[#F4F4F2] hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Star rating: hover par bharte hain, click se lagti hai */}
            <p className="mt-4 text-sm font-semibold text-[#202124]">Your rating</p>
            <div className="mt-1.5 flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setRating(n);
                    setRatingError(false);
                  }}
                  onMouseEnter={() => setHoverRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  aria-pressed={rating === n}
                  className="cursor-pointer p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={n <= (hoverRating || rating) ? "fill-[#FDC716] text-[#FDC716]" : "text-[#E2E4E7]"}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-[#45484D]">{ratingLabels[(hoverRating || rating) - 1] ?? ""}</span>
            </div>
            {ratingError && <p className="mt-1 text-xs text-red-600">Please select a star rating.</p>}

            {/* Name + review */}
            <div className="mt-4 space-y-3">
              <input
                type="text"
                required
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                className={inputClass}
              />
              <textarea
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                aria-label="Your review"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={closeReview}
                className="h-10 flex-1 cursor-pointer rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 flex-1 cursor-pointer rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;