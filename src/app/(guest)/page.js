// // // "use client";

// // // import { useEffect, useRef, useState } from "react";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { Bike, ChevronDown, ChevronLeft, ChevronRight, MapPin, Package, Search, Sparkles, Star, Store } from "lucide-react";
// // // import CategorySection from "../../component/materials/CategorySection/CategorySection";
// // // //import { categoryLinks, reusedLinks } from "../../component/materials/categoryItems";
// // // import { categoryLinks, reusedLinks } from "./materials/categoryItems";

// // // // Hero images: src/assets/images/guest/hero/
// // // import grey from "../../assets/images/guest/hero/grey.jpeg";
// // // import exterior from "../../assets/images/guest/hero/exterior.jpeg";
// // // import interior from "../../assets/images/guest/hero/interior.jpeg";

// // // /* ============================================================
// // //    1. HERO
// // //    ============================================================ */

// // // const BM_HERO_SLIDES = [
// // //   { id: 1, image: grey, alt: "Construction materials yard" },
// // //   { id: 2, image: exterior, alt: "House exterior" },
// // //   { id: 3, image: interior, alt: "House interior" },
// // // ];

// // // const BM_SEARCH_CATEGORIES = [
// // //   { id: 1, label: "Bricks" },
// // //   { id: 2, label: "Cement" },
// // //   { id: 3, label: "Steel / Saria" },
// // //   { id: 4, label: "Sand" },
// // //   { id: 5, label: "Tiles" },
// // //   { id: 6, label: "Paint" },
// // // ];

// // // const BM_SEARCH_LOCATIONS = [
// // //   { id: 1, label: "GT Road" },
// // //   { id: 2, label: "Satellite Town" },
// // //   { id: 3, label: "Model Town" },
// // //   { id: 4, label: "Citi Housing" },
// // //   { id: 5, label: "Wapda Town" },
// // //   { id: 6, label: "Kamoke" },
// // // ];

// // // const BM_SEARCH_SELECTS = [
// // //   { id: 1, label: "Category", all: "All categories", items: BM_SEARCH_CATEGORIES },
// // //   { id: 2, label: "Location", all: "All locations", items: BM_SEARCH_LOCATIONS },
// // // ];

// // // // href null = route abhi nahi, button banta hai
// // // const BM_HERO_TABS = [
// // //   { id: 1, label: "Materials", href: "/materials", icon: Package },
// // //   { id: 2, label: "Suppliers", href: "/suppliers", icon: Store },
// // //   { id: 3, label: "Riders", href: null, icon: Bike },
// // // ];

// // // const fieldClass =
// // //   "w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base outline-none focus:border-[color:var(--charcoal-black)]";
// // // const tabClass =
// // //   "inline-flex items-center gap-2 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] transition-colors hover:border-[color:var(--primary-yellow)] hover:bg-[var(--primary-yellow)] sm:px-5 sm:text-base";

// // // const Hero = () => {
// // //   const [current, setCurrent] = useState(0); // abhi kaun si image dikh rahi hai

// // //   // Har 5 second baad image badal jaye
// // //   useEffect(() => {
// // //     const timer = setInterval(() => setCurrent((p) => (p + 1) % BM_HERO_SLIDES.length), 5000);
// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   return (
// // //     <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[var(--charcoal-black)] text-[color:var(--white-cards)] lg:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
// // //       {BM_HERO_SLIDES.map(({ id, image, alt }, i) => (
// // //         <Image
// // //           key={id}
// // //           src={image}
// // //           alt={alt}
// // //           fill
// // //           sizes="100vw"
// // //           priority={i === 0}
// // //           className={`object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
// // //         />
// // //       ))}
// // //       <div className="absolute inset-0 bg-[var(--charcoal-black)] opacity-60" />

// // //       <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-10 2xl:px-12">
// // //         <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
// // //           Construction Platform for <span className="text-[color:var(--primary-yellow)]">Gujranwala</span>
// // //         </h1>

// // //         <div className="mt-8 w-full max-w-[1008px] rounded-xl bg-[var(--white-cards)] p-3 text-left sm:mt-10 sm:p-4">
// // //           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
// // //             <input
// // //               type="text"
// // //               placeholder="Material name"
// // //               aria-label="Material name"
// // //               className={`${fieldClass} text-[color:var(--primary-text)] placeholder:text-[color:var(--secondary-text)]`}
// // //             />

// // //             {BM_SEARCH_SELECTS.map(({ id, label, all, items }) => (
// // //               <div key={id} className="relative">
// // //                 <select aria-label={label} className={`${fieldClass} appearance-none pr-10 text-[color:var(--secondary-text)]`}>
// // //                   <option value="">{all}</option>
// // //                   {items.map((item) => (
// // //                     <option key={item.id} value={item.label}>
// // //                       {item.label}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--secondary-text)]" />
// // //               </div>
// // //             ))}

// // //             <button
// // //               type="button"
// // //               className="inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--primary-yellow)] px-6 py-3.5 text-base font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:col-span-2 lg:col-span-1"
// // //             >
// // //               <Search size={20} />
// // //               Search Materials
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-xl bg-[var(--white-cards)]/20 p-2 backdrop-blur-sm sm:mt-8">
// // //           {BM_HERO_TABS.map(({ id, label, href, icon: TabIcon }) => {
// // //             const content = (
// // //               <>
// // //                 <TabIcon size={18} aria-hidden="true" />
// // //                 {label}
// // //               </>
// // //             );

// // //             return href ? (
// // //               <Link key={id} href={href} className={tabClass}>
// // //                 {content}
// // //               </Link>
// // //             ) : (
// // //               <button key={id} type="button" className={tabClass}>
// // //                 {content}
// // //               </button>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // /* ============================================================
// // //    2. AI ASSISTANT
// // //    ============================================================ */

// // // const AiAssistant = () => (
// // //   <section className="px-4 py-12 md:px-12">
// // //     <div className="flex flex-col gap-8 rounded-3xl border border-[var(--border-color)] bg-[var(--white-cards)] p-8 md:flex-row md:items-center md:justify-between md:p-12">
// // //       <div className="max-w-2xl">
// // //         <p className="flex items-center gap-2 text-sm uppercase text-[var(--secondary-text)]">
// // //           <Sparkles className="h-5 w-5 text-[var(--primary-yellow)]" />
// // //           BuildMart AI Assistant · Demo
// // //         </p>
// // //         <h2 className="mt-2 text-3xl text-[var(--primary-text)] md:text-4xl">Plan quantities and budget for your plot</h2>
// // //         <p className="mt-4 text-[var(--secondary-text)]">
// // //           Get indicative material quantities and grey-structure / finishing cost breakdowns from plot size, floors and
// // //           rooms. Estimates are planning aids, not guaranteed quotations — actual costs depend on market rates, quality
// // //           and site conditions.
// // //         </p>
// // //       </div>

// // //       <Link
// // //         href="/ai-assistant"
// // //         className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal-black)] px-8 py-4 font-semibold text-white hover:bg-[var(--industrial-blue-grey)]"
// // //       >
// // //         Open AI Assistant →
// // //       </Link>
// // //     </div>
// // //   </section>
// // // );

// // // /* ============================================================
// // //    3. TOP SUPPLIERS (carousel)
// // //    ============================================================ */

// // // // logo khali ho to naam ka pehla harf dikhta hai
// // // const suppliers = [
// // //   { id: 1, logo: "", name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "Gujranwala" },
// // //   { id: 2, logo: "", name: "Pak Cement Traders", type: "Verified Supplier", services: "Cement | Bajri | Crush", city: "Gujranwala" },
// // //   { id: 3, logo: "", name: "Ittefaq Steel Point", type: "Retailer", services: "Steel Saria | Iron Sheets", city: "Wazirabad" },
// // //   { id: 4, logo: "", name: "City Sand & Bajri", type: "Verified Supplier", services: "Ravi Sand | Chenab Sand", city: "Lahore" },
// // //   { id: 5, logo: "", name: "Madina Tiles House", type: "Retailer", services: "Tiles | Marble | Sanitary", city: "Gujranwala" },
// // // ];

// // // const supplierArrow =
// // //   "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-white hover:bg-[var(--charcoal-black)]";

// // // const TopSuppliers = () => {
// // //   const [active, setActive] = useState(0);
// // //   const total = suppliers.length;
// // //   const half = Math.floor(total / 2);

// // //   const handlePrev = () => setActive((a) => (a - 1 + total) % total);
// // //   const handleNext = () => setActive((a) => (a + 1) % total);

// // //   return (
// // //     <section className="px-4 py-12 md:px-12">
// // //       <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">Top Rated Suppliers</h2>

// // //       {/* --step: cards ke beech ka fasla */}
// // //       <div className="relative h-[27rem] overflow-hidden [--step:15rem] md:[--step:20rem]">
// // //         {suppliers.map(({ id, logo, name, type, services, city }, i) => {
// // //           const offset = ((i - active + total + half) % total) - half; // 0 = beech wala
// // //           const isActive = offset === 0;
// // //           const far = Math.abs(offset) > 1;

// // //           return (
// // //             <article
// // //               key={id}
// // //               onClick={() => setActive(i)}
// // //               className={`absolute left-1/2 top-1/2 w-72 rounded-2xl border-2 bg-[var(--white-cards)] p-6 text-center transition-all duration-500 ease-in-out ${
// // //                 isActive ? "border-[var(--primary-yellow)] shadow-xl" : "cursor-pointer border-[var(--border-color)]"
// // //               }`}
// // //               style={{
// // //                 transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
// // //                 opacity: isActive ? 1 : far ? 0 : 0.55,
// // //                 zIndex: 10 - Math.abs(offset),
// // //                 pointerEvents: far ? "none" : "auto",
// // //               }}
// // //             >
// // //               <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--off-white-background)]">
// // //                 {logo ? (
// // //                   <Image src={logo} alt={name} fill sizes="96px" className="object-contain p-2" />
// // //                 ) : (
// // //                   <span className="text-3xl font-bold text-[var(--industrial-blue-grey)]">{name[0]}</span>
// // //                 )}
// // //               </div>

// // //               <h3 className="mt-4 truncate text-xl text-[var(--primary-text)]">{name}</h3>
// // //               <span className="mt-2 inline-block rounded bg-[var(--off-white-background)] px-3 py-1 text-sm text-[var(--industrial-blue-grey)]">{type}</span>
// // //               <p className="mt-3 text-sm text-[var(--secondary-text)]">{services}</p>
// // //               <p className="mt-3 flex items-center justify-center gap-1 text-sm text-[var(--secondary-text)]">
// // //                 <MapPin className="h-4 w-4 text-[var(--industrial-blue-grey)]" />
// // //                 {city}
// // //               </p>

// // //               <div className="mt-5 flex gap-3">
// // //                 <button
// // //                   type="button"
// // //                   tabIndex={isActive ? 0 : -1}
// // //                   className="flex-1 rounded-lg bg-[var(--primary-yellow)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--hover-yellow)]"
// // //                 >
// // //                   Contact
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   tabIndex={isActive ? 0 : -1}
// // //                   className="flex-1 rounded-lg border border-[var(--border-color)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
// // //                 >
// // //                   View Shop
// // //                 </button>
// // //               </div>
// // //             </article>
// // //           );
// // //         })}

// // //         <button type="button" onClick={handlePrev} aria-label="Previous supplier" className={`${supplierArrow} left-2`}>
// // //           <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
// // //         </button>
// // //         <button type="button" onClick={handleNext} aria-label="Next supplier" className={`${supplierArrow} right-2`}>
// // //           <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
// // //         </button>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // /* ============================================================
// // //    4. CUSTOMER REVIEWS (slider)
// // //    ============================================================ */

// // // const reviews = [
// // //   { id: 1, rating: 4, text: "The visualization demo helped us pick a floor finish before visiting the shop.", name: "Hira T.", tag: "AI Visualization demo" },
// // //   { id: 2, rating: 5, text: "Clear units on every listing — per bag, per kg, per trolley. Very helpful.", name: "Usman A.", tag: "Price listings" },
// // //   { id: 3, rating: 5, text: "Comparing cement prices from a few shops took minutes instead of a full day of calls.", name: "Ahmed R.", tag: "Cement comparison" },
// // //   { id: 4, rating: 5, text: "The cost estimator gave me a realistic starting budget before I talked to any contractor.", name: "Sana K.", tag: "Cost estimator" },
// // //   { id: 5, rating: 4, text: "Found leftover tiles at a good price from a seller nearby.", name: "Bilal M.", tag: "Reusable materials" },
// // // ];

// // // const Stars = ({ rating }) => (
// // //   <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
// // //     {[1, 2, 3, 4, 5].map((n) => (
// // //       <Star
// // //         key={n}
// // //         fill="currentColor"
// // //         className={`h-5 w-5 ${n <= rating ? "text-[var(--primary-yellow)]" : "text-[var(--border-color)]"}`}
// // //       />
// // //     ))}
// // //   </div>
// // // );

// // // const reviewArrow =
// // //   "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--white-cards)] text-[var(--primary-text)] shadow-md hover:bg-[var(--primary-yellow)]";

// // // const CustomerReviews = () => {
// // //   const [items, setItems] = useState(reviews); // cards ki current tarteeb
// // //   const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
// // //   const [animating, setAnimating] = useState(false);
// // //   const track = useRef(null);
// // //   const busy = useRef(false); // slide ke dauran dobara click na chale
// // //   const touchX = useRef(0);

// // //   const getStep = () => track.current.firstElementChild.offsetWidth + 24; // card + gap-6

// // //   // Aage: ek card left sarkao, phir pehla card aakhir mein laga do
// // //   const handleNext = () => {
// // //     if (busy.current) return;
// // //     busy.current = true;
// // //     setAnimating(true);
// // //     setShift(-getStep());
// // //   };

// // //   // Peeche: aakhri card pehle laga do (bina animation), phir right sarkao
// // //   const handlePrev = () => {
// // //     if (busy.current) return;
// // //     busy.current = true;
// // //     setAnimating(false);
// // //     setItems((a) => [a[a.length - 1], ...a.slice(0, -1)]);
// // //     setShift(-getStep());
// // //     requestAnimationFrame(() =>
// // //       requestAnimationFrame(() => {
// // //         setAnimating(true);
// // //         setShift(0);
// // //       })
// // //     );
// // //   };

// // //   const handleTransitionEnd = (e) => {
// // //     if (e.target !== e.currentTarget) return;
// // //     if (shift < 0) {
// // //       setAnimating(false);
// // //       setItems((a) => [...a.slice(1), a[0]]);
// // //       setShift(0);
// // //     }
// // //     busy.current = false;
// // //   };

// // //   // Mobile par swipe
// // //   const handleTouchEnd = (e) => {
// // //     const diff = e.changedTouches[0].clientX - touchX.current;
// // //     if (diff < -50) handleNext();
// // //     if (diff > 50) handlePrev();
// // //   };

// // //   return (
// // //     <section className="px-4 py-12 md:px-12">
// // //       <div className="mb-6 h-1 w-12 bg-[var(--primary-yellow)]" />
// // //       <h2 className="text-3xl text-[var(--primary-text)] md:text-4xl">What Our Customers Say</h2>
// // //       <p className="mb-8 mt-3 text-[var(--secondary-text)]">Sample testimonials shown for demonstration purposes.</p>

// // //       <div className="relative">
// // //         <button type="button" onClick={handlePrev} aria-label="Previous review" className={`${reviewArrow} left-2 md:-left-5`}>
// // //           <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
// // //         </button>

// // //         <div
// // //           className="overflow-hidden py-2"
// // //           onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
// // //           onTouchEnd={handleTouchEnd}
// // //         >
// // //           <div
// // //             ref={track}
// // //             onTransitionEnd={handleTransitionEnd}
// // //             className="flex gap-6"
// // //             style={{ transform: `translateX(${shift}px)`, transition: animating ? "transform 500ms ease-in-out" : "none" }}
// // //           >
// // //             {items.map(({ id, rating, text, name, tag }) => (
// // //               <article
// // //                 key={id}
// // //                 className="w-full shrink-0 rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-6 shadow-sm md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
// // //               >
// // //                 <Stars rating={rating} />
// // //                 <p className="mt-4 text-lg text-[var(--primary-text)]">“{text}”</p>

// // //                 <div className="mt-6 flex items-center gap-3">
// // //                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-xl font-bold text-white">
// // //                     {name[0]}
// // //                   </div>
// // //                   <div>
// // //                     <p className="font-semibold text-[var(--primary-text)]">{name}</p>
// // //                     <p className="text-sm text-[var(--secondary-text)]">{tag} · Demo review</p>
// // //                   </div>
// // //                 </div>
// // //               </article>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <button type="button" onClick={handleNext} aria-label="Next review" className={`${reviewArrow} right-2 md:-right-5`}>
// // //           <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
// // //         </button>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // /* ============================================================
// // //    5. FAQ
// // //    ============================================================ */

// // // const faqs = [
// // //   { id: 1, q: "What is BuildMart Gujranwala and how does it work?", a: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place." },
// // //   { id: 2, q: "Is BuildMart free to use?", a: "Browsing materials and comparing listed prices is open to everyone. Add your own details here if some features have charges." },
// // //   { id: 3, q: "How are the suppliers registered?", a: "Suppliers register with their shop details and verification documents. An administrator reviews each application before the supplier is verified." },
// // //   { id: 4, q: "How do I contact a supplier?", a: "Open any material or supplier listing and use the Contact button to send an inquiry. You can track its status from your account." },
// // //   { id: 5, q: "Are the prices shown live market rates?", a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying." },
// // // ];

// // // const Faq = () => (
// // //   <section className="px-4 py-12 md:px-12">
// // //     <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">
// // //       Frequently Asked <span className="text-[var(--industrial-blue-grey)]">Questions</span>
// // //     </h2>

// // //     <div className="mx-auto max-w-3xl space-y-4">
// // //       {faqs.map(({ id, q, a }) => (
// // //         <details
// // //           key={id}
// // //           className="group rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] open:border-[var(--industrial-blue-grey)] hover:border-[var(--industrial-blue-grey)]"
// // //         >
// // //           <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-[var(--primary-text)] [&::-webkit-details-marker]:hidden">
// // //             {q}
// // //             <ChevronDown className="h-5 w-5 shrink-0 text-[var(--industrial-blue-grey)] transition-transform duration-300 group-open:rotate-180" />
// // //           </summary>
// // //           <p className="px-5 pb-4 text-[var(--secondary-text)]">{a}</p>
// // //         </details>
// // //       ))}
// // //     </div>
// // //   </section>
// // // );

// // // /* ============================================================
// // //    PAGE
// // //    ============================================================ */

// // // const Page = () => (
// // //   <main>
// // //     <Hero />

// // //     <CategorySection
// // //       title="MarketPlace Categories"
// // //       placeholder="Search categories..."
// // //       items={categoryLinks}
// // //       label="categories"
// // //       exploreText="Explore All Categories"
// // //       exploreHref="/materials"
// // //     />

// // //     <CategorySection
// // //       title="Reused Materials"
// // //       placeholder="Search reused materials..."
// // //       items={reusedLinks}
// // //       label="reused materials"
// // //       exploreText="Explore All Reused Materials"
// // //       exploreHref="/materials/used-bricks"
// // //       withBorder
// // //     />

// // //     <AiAssistant />
// // //     <TopSuppliers />
// // //     <CustomerReviews />
// // //     <Faq />
// // //   </main>
// // // );

// // // export default Page;




// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Bike, ChevronDown, ChevronLeft, ChevronRight, MapPin, Package, Search, Sparkles, Star, Store } from "lucide-react";
// // import CategorySection from "../../component/materials/CategorySection/CategorySection";
// // //import { categoryLinks, reusedLinks } from "../../component/materials/categoryItems";
// // import { categoryLinks, reusedLinks } from "./materials/categoryItems";

// // // Hero images: src/assets/images/guest/hero/
// // import grey from "../../assets/images/guest/hero/grey.jpeg";
// // import exterior from "../../assets/images/guest/hero/exterior.jpeg";
// // import interior from "../../assets/images/guest/hero/interior.jpeg";

// // // Banner image: src/assets/images/guest/banner/
// // import findBanner from "../../assets/images/guest/banner/findEverything.gif";

// // /* ============================================================
// //    1. HERO
// //    ============================================================ */

// // const BM_HERO_SLIDES = [
// //   { id: 1, image: grey, alt: "Construction materials yard" },
// //   { id: 2, image: exterior, alt: "House exterior" },
// //   { id: 3, image: interior, alt: "House interior" },
// // ];

// // const BM_SEARCH_CATEGORIES = [
// //   { id: 1, label: "Bricks" },
// //   { id: 2, label: "Cement" },
// //   { id: 3, label: "Steel / Saria" },
// //   { id: 4, label: "Sand" },
// //   { id: 5, label: "Tiles" },
// //   { id: 6, label: "Paint" },
// // ];

// // const BM_SEARCH_LOCATIONS = [
// //   { id: 1, label: "GT Road" },
// //   { id: 2, label: "Satellite Town" },
// //   { id: 3, label: "Model Town" },
// //   { id: 4, label: "Citi Housing" },
// //   { id: 5, label: "Wapda Town" },
// //   { id: 6, label: "Kamoke" },
// // ];

// // const BM_SEARCH_SELECTS = [
// //   { id: 1, label: "Category", all: "All categories", items: BM_SEARCH_CATEGORIES },
// //   { id: 2, label: "Location", all: "All locations", items: BM_SEARCH_LOCATIONS },
// // ];

// // // href null = route abhi nahi, button banta hai
// // const BM_HERO_TABS = [
// //   { id: 1, label: "Materials", href: "/materials", icon: Package },
// //   { id: 2, label: "Suppliers", href: "/suppliers", icon: Store },
// //   { id: 3, label: "Riders", href: null, icon: Bike },
// // ];

// // const fieldClass =
// //   "w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base outline-none focus:border-[color:var(--charcoal-black)]";
// // const tabClass =
// //   "inline-flex items-center gap-2 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] transition-colors hover:border-[color:var(--primary-yellow)] hover:bg-[var(--primary-yellow)] sm:px-5 sm:text-base";

// // const Hero = () => {
// //   const [current, setCurrent] = useState(0); // abhi kaun si image dikh rahi hai

// //   // Har 5 second baad image badal jaye
// //   useEffect(() => {
// //     const timer = setInterval(() => setCurrent((p) => (p + 1) % BM_HERO_SLIDES.length), 5000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   return (
// //     <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[var(--charcoal-black)] text-[color:var(--white-cards)] lg:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
// //       {BM_HERO_SLIDES.map(({ id, image, alt }, i) => (
// //         <Image
// //           key={id}
// //           src={image}
// //           alt={alt}
// //           fill
// //           sizes="100vw"
// //           priority={i === 0}
// //           className={`object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
// //         />
// //       ))}
// //       <div className="absolute inset-0 bg-[var(--charcoal-black)] opacity-60" />

// //       <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-10 2xl:px-12">
// //         <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
// //           Construction Platform for <span className="text-[color:var(--primary-yellow)]">Gujranwala</span>
// //         </h1>

// //         <div className="mt-8 w-full max-w-[1008px] rounded-xl bg-[var(--white-cards)] p-3 text-left sm:mt-10 sm:p-4">
// //           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
// //             <input
// //               type="text"
// //               placeholder="Material name"
// //               aria-label="Material name"
// //               className={`${fieldClass} text-[color:var(--primary-text)] placeholder:text-[color:var(--secondary-text)]`}
// //             />

// //             {BM_SEARCH_SELECTS.map(({ id, label, all, items }) => (
// //               <div key={id} className="relative">
// //                 <select aria-label={label} className={`${fieldClass} appearance-none pr-10 text-[color:var(--secondary-text)]`}>
// //                   <option value="">{all}</option>
// //                   {items.map((item) => (
// //                     <option key={item.id} value={item.label}>
// //                       {item.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--secondary-text)]" />
// //               </div>
// //             ))}

// //             <button
// //               type="button"
// //               className="inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--primary-yellow)] px-6 py-3.5 text-base font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:col-span-2 lg:col-span-1"
// //             >
// //               <Search size={20} />
// //               Search Materials
// //             </button>
// //           </div>
// //         </div>

// //         <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-xl bg-[var(--white-cards)]/20 p-2 backdrop-blur-sm sm:mt-8">
// //           {BM_HERO_TABS.map(({ id, label, href, icon: TabIcon }) => {
// //             const content = (
// //               <>
// //                 <TabIcon size={18} aria-hidden="true" />
// //                 {label}
// //               </>
// //             );

// //             return href ? (
// //               <Link key={id} href={href} className={tabClass}>
// //                 {content}
// //               </Link>
// //             ) : (
// //               <button key={id} type="button" className={tabClass}>
// //                 {content}
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // /* ============================================================
// //    FIND EVERYTHING BANNER (Reused Materials ke neeche)
// //    ============================================================ */

// // // GIF animated hai, is liye unoptimized (warna animation ruk sakti hai)
// // const FindBanner = () => (
// //   <section className="border-t border-[var(--border-color)] bg-[var(--white-cards)]">
// //     <Image
// //       src={findBanner}
// //       alt="BuildMart banner: find everything you need to build"
// //       unoptimized
// //       sizes="100vw"
// //       className="h-auto w-full"
// //     />
// //   </section>
// // );

// // /* ============================================================
// //    2. AI ASSISTANT
// //    ============================================================ */

// // const AiAssistant = () => (
// //   <section className="px-4 py-12 md:px-12">
// //     <div className="flex flex-col gap-8 rounded-3xl border border-[var(--border-color)] bg-[var(--white-cards)] p-8 md:flex-row md:items-center md:justify-between md:p-12">
// //       <div className="max-w-2xl">
// //         <p className="flex items-center gap-2 text-sm uppercase text-[var(--secondary-text)]">
// //           <Sparkles className="h-5 w-5 text-[var(--primary-yellow)]" />
// //           BuildMart AI Assistant · Demo
// //         </p>
// //         <h2 className="mt-2 text-3xl text-[var(--primary-text)] md:text-4xl">Plan quantities and budget for your plot</h2>
// //         <p className="mt-4 text-[var(--secondary-text)]">
// //           Get indicative material quantities and grey-structure / finishing cost breakdowns from plot size, floors and
// //           rooms. Estimates are planning aids, not guaranteed quotations — actual costs depend on market rates, quality
// //           and site conditions.
// //         </p>
// //       </div>

// //       <Link
// //         href="/ai-assistant"
// //         className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal-black)] px-8 py-4 font-semibold text-white hover:bg-[var(--industrial-blue-grey)]"
// //       >
// //         Open AI Assistant →
// //       </Link>
// //     </div>
// //   </section>
// // );

// // /* ============================================================
// //    3. TOP SUPPLIERS (carousel)
// //    ============================================================ */

// // // logo khali ho to naam ka pehla harf dikhta hai
// // const suppliers = [
// //   { id: 1, logo: "", name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "Gujranwala" },
// //   { id: 2, logo: "", name: "Pak Cement Traders", type: "Verified Supplier", services: "Cement | Bajri | Crush", city: "Gujranwala" },
// //   { id: 3, logo: "", name: "Ittefaq Steel Point", type: "Retailer", services: "Steel Saria | Iron Sheets", city: "Wazirabad" },
// //   { id: 4, logo: "", name: "City Sand & Bajri", type: "Verified Supplier", services: "Ravi Sand | Chenab Sand", city: "Lahore" },
// //   { id: 5, logo: "", name: "Madina Tiles House", type: "Retailer", services: "Tiles | Marble | Sanitary", city: "Gujranwala" },
// // ];

// // const supplierArrow =
// //   "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-white hover:bg-[var(--charcoal-black)]";

// // const TopSuppliers = () => {
// //   const [active, setActive] = useState(0);
// //   const total = suppliers.length;
// //   const half = Math.floor(total / 2);

// //   const handlePrev = () => setActive((a) => (a - 1 + total) % total);
// //   const handleNext = () => setActive((a) => (a + 1) % total);

// //   return (
// //     <section className="px-4 py-12 md:px-12">
// //       <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">Top Rated Suppliers</h2>

// //       {/* --step: cards ke beech ka fasla */}
// //       <div className="relative h-[27rem] overflow-hidden [--step:15rem] md:[--step:20rem]">
// //         {suppliers.map(({ id, logo, name, type, services, city }, i) => {
// //           const offset = ((i - active + total + half) % total) - half; // 0 = beech wala
// //           const isActive = offset === 0;
// //           const far = Math.abs(offset) > 1;

// //           return (
// //             <article
// //               key={id}
// //               onClick={() => setActive(i)}
// //               className={`absolute left-1/2 top-1/2 w-72 rounded-2xl border-2 bg-[var(--white-cards)] p-6 text-center transition-all duration-500 ease-in-out ${
// //                 isActive ? "border-[var(--primary-yellow)] shadow-xl" : "cursor-pointer border-[var(--border-color)]"
// //               }`}
// //               style={{
// //                 transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
// //                 opacity: isActive ? 1 : far ? 0 : 0.55,
// //                 zIndex: 10 - Math.abs(offset),
// //                 pointerEvents: far ? "none" : "auto",
// //               }}
// //             >
// //               <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--off-white-background)]">
// //                 {logo ? (
// //                   <Image src={logo} alt={name} fill sizes="96px" className="object-contain p-2" />
// //                 ) : (
// //                   <span className="text-3xl font-bold text-[var(--industrial-blue-grey)]">{name[0]}</span>
// //                 )}
// //               </div>

// //               <h3 className="mt-4 truncate text-xl text-[var(--primary-text)]">{name}</h3>
// //               <span className="mt-2 inline-block rounded bg-[var(--off-white-background)] px-3 py-1 text-sm text-[var(--industrial-blue-grey)]">{type}</span>
// //               <p className="mt-3 text-sm text-[var(--secondary-text)]">{services}</p>
// //               <p className="mt-3 flex items-center justify-center gap-1 text-sm text-[var(--secondary-text)]">
// //                 <MapPin className="h-4 w-4 text-[var(--industrial-blue-grey)]" />
// //                 {city}
// //               </p>

// //               <div className="mt-5 flex gap-3">
// //                 <button
// //                   type="button"
// //                   tabIndex={isActive ? 0 : -1}
// //                   className="flex-1 rounded-lg bg-[var(--primary-yellow)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--hover-yellow)]"
// //                 >
// //                   Contact
// //                 </button>
// //                 <button
// //                   type="button"
// //                   tabIndex={isActive ? 0 : -1}
// //                   className="flex-1 rounded-lg border border-[var(--border-color)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
// //                 >
// //                   View Shop
// //                 </button>
// //               </div>
// //             </article>
// //           );
// //         })}

// //         <button type="button" onClick={handlePrev} aria-label="Previous supplier" className={`${supplierArrow} left-2`}>
// //           <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
// //         </button>
// //         <button type="button" onClick={handleNext} aria-label="Next supplier" className={`${supplierArrow} right-2`}>
// //           <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
// //         </button>
// //       </div>
// //     </section>
// //   );
// // };

// // /* ============================================================
// //    4. CUSTOMER REVIEWS (slider)
// //    ============================================================ */

// // const reviews = [
// //   { id: 1, rating: 4, text: "The visualization demo helped us pick a floor finish before visiting the shop.", name: "Hira T.", tag: "AI Visualization demo" },
// //   { id: 2, rating: 5, text: "Clear units on every listing — per bag, per kg, per trolley. Very helpful.", name: "Usman A.", tag: "Price listings" },
// //   { id: 3, rating: 5, text: "Comparing cement prices from a few shops took minutes instead of a full day of calls.", name: "Ahmed R.", tag: "Cement comparison" },
// //   { id: 4, rating: 5, text: "The cost estimator gave me a realistic starting budget before I talked to any contractor.", name: "Sana K.", tag: "Cost estimator" },
// //   { id: 5, rating: 4, text: "Found leftover tiles at a good price from a seller nearby.", name: "Bilal M.", tag: "Reusable materials" },
// // ];

// // const Stars = ({ rating }) => (
// //   <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
// //     {[1, 2, 3, 4, 5].map((n) => (
// //       <Star
// //         key={n}
// //         fill="currentColor"
// //         className={`h-5 w-5 ${n <= rating ? "text-[var(--primary-yellow)]" : "text-[var(--border-color)]"}`}
// //       />
// //     ))}
// //   </div>
// // );

// // const reviewArrow =
// //   "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--white-cards)] text-[var(--primary-text)] shadow-md hover:bg-[var(--primary-yellow)]";

// // const CustomerReviews = () => {
// //   const [items, setItems] = useState(reviews); // cards ki current tarteeb
// //   const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
// //   const [animating, setAnimating] = useState(false);
// //   const track = useRef(null);
// //   const busy = useRef(false); // slide ke dauran dobara click na chale
// //   const touchX = useRef(0);

// //   const getStep = () => track.current.firstElementChild.offsetWidth + 24; // card + gap-6

// //   // Aage: ek card left sarkao, phir pehla card aakhir mein laga do
// //   const handleNext = () => {
// //     if (busy.current) return;
// //     busy.current = true;
// //     setAnimating(true);
// //     setShift(-getStep());
// //   };

// //   // Peeche: aakhri card pehle laga do (bina animation), phir right sarkao
// //   const handlePrev = () => {
// //     if (busy.current) return;
// //     busy.current = true;
// //     setAnimating(false);
// //     setItems((a) => [a[a.length - 1], ...a.slice(0, -1)]);
// //     setShift(-getStep());
// //     requestAnimationFrame(() =>
// //       requestAnimationFrame(() => {
// //         setAnimating(true);
// //         setShift(0);
// //       })
// //     );
// //   };

// //   const handleTransitionEnd = (e) => {
// //     if (e.target !== e.currentTarget) return;
// //     if (shift < 0) {
// //       setAnimating(false);
// //       setItems((a) => [...a.slice(1), a[0]]);
// //       setShift(0);
// //     }
// //     busy.current = false;
// //   };

// //   // Mobile par swipe
// //   const handleTouchEnd = (e) => {
// //     const diff = e.changedTouches[0].clientX - touchX.current;
// //     if (diff < -50) handleNext();
// //     if (diff > 50) handlePrev();
// //   };

// //   return (
// //     <section className="px-4 py-12 md:px-12">
// //       <div className="mb-6 h-1 w-12 bg-[var(--primary-yellow)]" />
// //       <h2 className="text-3xl text-[var(--primary-text)] md:text-4xl">What Our Customers Say</h2>
// //       <p className="mb-8 mt-3 text-[var(--secondary-text)]">Sample testimonials shown for demonstration purposes.</p>

// //       <div className="relative">
// //         <button type="button" onClick={handlePrev} aria-label="Previous review" className={`${reviewArrow} left-2 md:-left-5`}>
// //           <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
// //         </button>

// //         <div
// //           className="overflow-hidden py-2"
// //           onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
// //           onTouchEnd={handleTouchEnd}
// //         >
// //           <div
// //             ref={track}
// //             onTransitionEnd={handleTransitionEnd}
// //             className="flex gap-6"
// //             style={{ transform: `translateX(${shift}px)`, transition: animating ? "transform 500ms ease-in-out" : "none" }}
// //           >
// //             {items.map(({ id, rating, text, name, tag }) => (
// //               <article
// //                 key={id}
// //                 className="w-full shrink-0 rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-6 shadow-sm md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
// //               >
// //                 <Stars rating={rating} />
// //                 <p className="mt-4 text-lg text-[var(--primary-text)]">“{text}”</p>

// //                 <div className="mt-6 flex items-center gap-3">
// //                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-xl font-bold text-white">
// //                     {name[0]}
// //                   </div>
// //                   <div>
// //                     <p className="font-semibold text-[var(--primary-text)]">{name}</p>
// //                     <p className="text-sm text-[var(--secondary-text)]">{tag} · Demo review</p>
// //                   </div>
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         </div>

// //         <button type="button" onClick={handleNext} aria-label="Next review" className={`${reviewArrow} right-2 md:-right-5`}>
// //           <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
// //         </button>
// //       </div>
// //     </section>
// //   );
// // };

// // /* ============================================================
// //    5. FAQ
// //    ============================================================ */

// // const faqs = [
// //   { id: 1, q: "What is BuildMart Gujranwala and how does it work?", a: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place." },
// //   { id: 2, q: "Is BuildMart free to use?", a: "Browsing materials and comparing listed prices is open to everyone. Add your own details here if some features have charges." },
// //   { id: 3, q: "How are the suppliers registered?", a: "Suppliers register with their shop details and verification documents. An administrator reviews each application before the supplier is verified." },
// //   { id: 4, q: "How do I contact a supplier?", a: "Open any material or supplier listing and use the Contact button to send an inquiry. You can track its status from your account." },
// //   { id: 5, q: "Are the prices shown live market rates?", a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying." },
// // ];

// // const Faq = () => (
// //   <section className="px-4 py-12 md:px-12">
// //     <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">
// //       Frequently Asked <span className="text-[var(--industrial-blue-grey)]">Questions</span>
// //     </h2>

// //     <div className="mx-auto max-w-3xl space-y-4">
// //       {faqs.map(({ id, q, a }) => (
// //         <details
// //           key={id}
// //           className="group rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] open:border-[var(--industrial-blue-grey)] hover:border-[var(--industrial-blue-grey)]"
// //         >
// //           <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-[var(--primary-text)] [&::-webkit-details-marker]:hidden">
// //             {q}
// //             <ChevronDown className="h-5 w-5 shrink-0 text-[var(--industrial-blue-grey)] transition-transform duration-300 group-open:rotate-180" />
// //           </summary>
// //           <p className="px-5 pb-4 text-[var(--secondary-text)]">{a}</p>
// //         </details>
// //       ))}
// //     </div>
// //   </section>
// // );

// // /* ============================================================
// //    PAGE
// //    ============================================================ */

// // const Page = () => (
// //   <main>
// //     <Hero />

// //     <CategorySection
// //       title="MarketPlace Categories"
// //       placeholder="Search categories..."
// //       items={categoryLinks}
// //       label="categories"
// //       exploreText="Explore All Categories"
// //       exploreHref="/materials"
// //     />

// //     <CategorySection
// //       title="Reused Materials"
// //       placeholder="Search reused materials..."
// //       items={reusedLinks}
// //       label="reused materials"
// //       exploreText="Explore All Reused Materials"
// //       exploreHref="/materials/used-bricks"
// //       withBorder
// //     />

// //     <FindBanner />

// //     <AiAssistant />
// //     <TopSuppliers />
// //     <CustomerReviews />
// //     <Faq />
// //   </main>
// // );

// // export default Page;














// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Bike,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Image as ImageIcon,
//   MapPin,
//   Package,
//   Phone,
//   Search,
//   Sparkles,
//   Star,
//   Store,
// } from "lucide-react";
// import CategorySection from "../../component/materials/CategorySection/CategorySection";
// //import { categoryLinks, reusedLinks } from "../../component/materials/categoryItems";
// import { categoryLinks, reusedLinks } from "./materials/categoryItems";

// // Hero images: src/assets/images/guest/hero/
// import grey from "../../assets/images/guest/hero/grey.jpeg";
// import exterior from "../../assets/images/guest/hero/exterior.jpeg";
// import interior from "../../assets/images/guest/hero/interior.jpeg";

// // Banner card ki image: src/assets/images/guest/card/
// import doorsWindows from "../../assets/images/guest/card/doorsWindows.jpg";

// /* ============================================================
//    1. HERO
//    ============================================================ */

// const BM_HERO_SLIDES = [
//   { id: 1, image: grey, alt: "Construction materials yard" },
//   { id: 2, image: exterior, alt: "House exterior" },
//   { id: 3, image: interior, alt: "House interior" },
// ];

// const BM_SEARCH_CATEGORIES = [
//   { id: 1, label: "Bricks" },
//   { id: 2, label: "Cement" },
//   { id: 3, label: "Steel / Saria" },
//   { id: 4, label: "Sand" },
//   { id: 5, label: "Tiles" },
//   { id: 6, label: "Paint" },
// ];

// const BM_SEARCH_LOCATIONS = [
//   { id: 1, label: "GT Road" },
//   { id: 2, label: "Satellite Town" },
//   { id: 3, label: "Model Town" },
//   { id: 4, label: "Citi Housing" },
//   { id: 5, label: "Wapda Town" },
//   { id: 6, label: "Kamoke" },
// ];

// const BM_SEARCH_SELECTS = [
//   { id: 1, label: "Category", all: "All categories", items: BM_SEARCH_CATEGORIES },
//   { id: 2, label: "Location", all: "All locations", items: BM_SEARCH_LOCATIONS },
// ];

// // href null = route abhi nahi, button banta hai
// const BM_HERO_TABS = [
//   { id: 1, label: "Materials", href: "/materials", icon: Package },
//   { id: 2, label: "Suppliers", href: "/suppliers", icon: Store },
//   { id: 3, label: "Riders", href: null, icon: Bike },
// ];

// const fieldClass =
//   "w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base outline-none focus:border-[color:var(--charcoal-black)]";
// const tabClass =
//   "inline-flex items-center gap-2 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] transition-colors hover:border-[color:var(--primary-yellow)] hover:bg-[var(--primary-yellow)] sm:px-5 sm:text-base";

// const Hero = () => {
//   const [current, setCurrent] = useState(0); // abhi kaun si image dikh rahi hai

//   // Har 5 second baad image badal jaye
//   useEffect(() => {
//     const timer = setInterval(() => setCurrent((p) => (p + 1) % BM_HERO_SLIDES.length), 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[var(--charcoal-black)] text-[color:var(--white-cards)] lg:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
//       {BM_HERO_SLIDES.map(({ id, image, alt }, i) => (
//         <Image
//           key={id}
//           src={image}
//           alt={alt}
//           fill
//           sizes="100vw"
//           priority={i === 0}
//           className={`object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
//         />
//       ))}
//       <div className="absolute inset-0 bg-[var(--charcoal-black)] opacity-60" />

//       <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-10 2xl:px-12">
//         <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
//           Construction Platform for <span className="text-[color:var(--primary-yellow)]">Gujranwala</span>
//         </h1>

//         <div className="mt-8 w-full max-w-[1008px] rounded-xl bg-[var(--white-cards)] p-3 text-left sm:mt-10 sm:p-4">
//           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
//             <input
//               type="text"
//               placeholder="Material name"
//               aria-label="Material name"
//               className={`${fieldClass} text-[color:var(--primary-text)] placeholder:text-[color:var(--secondary-text)]`}
//             />

//             {BM_SEARCH_SELECTS.map(({ id, label, all, items }) => (
//               <div key={id} className="relative">
//                 <select aria-label={label} className={`${fieldClass} appearance-none pr-10 text-[color:var(--secondary-text)]`}>
//                   <option value="">{all}</option>
//                   {items.map((item) => (
//                     <option key={item.id} value={item.label}>
//                       {item.label}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--secondary-text)]" />
//               </div>
//             ))}

//             <button
//               type="button"
//               className="inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--primary-yellow)] px-6 py-3.5 text-base font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:col-span-2 lg:col-span-1"
//             >
//               <Search size={20} />
//               Search Materials
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-xl bg-[var(--white-cards)]/20 p-2 backdrop-blur-sm sm:mt-8">
//           {BM_HERO_TABS.map(({ id, label, href, icon: TabIcon }) => {
//             const content = (
//               <>
//                 <TabIcon size={18} aria-hidden="true" />
//                 {label}
//               </>
//             );

//             return href ? (
//               <Link key={id} href={href} className={tabClass}>
//                 {content}
//               </Link>
//             ) : (
//               <button key={id} type="button" className={tabClass}>
//                 {content}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ============================================================
//    FIND EVERYTHING BANNER (Reused Materials ke neeche, code se bana hai: text saaf rehta hai)
//    ============================================================ */

// // Card ke gird floating labels. Phone par card ke neeche row mein, sm se upar card ke aas paas
// const BM_BANNER_LABELS = [
//   { id: 1, text: "Location Based Search", icon: MapPin, style: "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]", position: "sm:left-4 sm:top-24 md:left-16" },
//   { id: 2, text: "Image Display", icon: ImageIcon, style: "bg-[var(--charcoal-black)] text-[color:var(--white-cards)]", position: "sm:right-4 sm:top-12 md:right-16" },
//   { id: 3, text: "Contact Method", icon: Phone, style: "border border-[var(--charcoal-black)] bg-[var(--white-cards)] text-[color:var(--charcoal-black)]", position: "sm:bottom-6 sm:right-8 md:right-28" },
// ];

// const FindBanner = () => (
//   <section className="relative overflow-hidden border-t border-[var(--border-color)] bg-[var(--white-cards)] px-4 py-10 md:px-12">
//     {/* Peeche halki yellow roshni */}
//     <span aria-hidden="true" className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[var(--primary-yellow)]/25 blur-3xl" />
//     <span aria-hidden="true" className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[var(--primary-yellow)]/25 blur-3xl" />

//     <div className="relative mx-auto max-w-5xl text-center">
//       <h2 className="text-3xl text-[var(--primary-text)] md:text-4xl">
//         Find Everything You Need to <span className="text-[var(--primary-yellow)]">Build</span>
//       </h2>
//       <p className="mt-2 text-[var(--secondary-text)]">Quality materials, trusted riders and more — all in one place.</p>
//       <div className="mx-auto mt-3 h-1 w-12 bg-[var(--primary-yellow)]" />

//       <div className="relative mt-8 sm:h-80">
//         {/* Demo product card */}
//         <article className="mx-auto w-64 rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-2 text-left shadow-xl sm:absolute sm:left-1/2 sm:top-0 sm:-translate-x-1/2">
//           <div className="relative h-32 overflow-hidden rounded-lg bg-[var(--border-color)]">
//             <Image src={doorsWindows} alt="Wooden door (demo image)" fill sizes="256px" className="object-cover" />
//           </div>
//           <div className="space-y-1 p-2">
//             <div className="flex items-start justify-between gap-2">
//               <h3 className="text-sm font-semibold text-[var(--primary-text)]">Wooden Door (Deodar)</h3>
//               <Heart size={16} className="shrink-0 text-[var(--secondary-text)]" aria-hidden="true" />
//             </div>
//             <p className="text-xs text-[var(--secondary-text)]">
//               Starting from <span className="font-semibold text-red-600">Rs 18,000</span>
//             </p>
//             <p className="flex items-center gap-1 text-xs text-[var(--secondary-text)]">
//               <MapPin size={12} className="shrink-0" aria-hidden="true" />
//               Peoples Colony, Gujranwala
//             </p>
//             <p className="flex items-center gap-1 text-xs text-[var(--secondary-text)]">
//               <Star size={12} className="fill-[var(--primary-yellow)] text-[var(--primary-yellow)]" aria-hidden="true" />
//               Sample listing (demo)
//             </p>
//             <span className="mt-2 flex h-9 items-center justify-center rounded-lg bg-[var(--charcoal-black)] text-xs font-semibold text-white">
//               View Details
//             </span>
//           </div>
//         </article>

//         {/* Floating labels */}
//         <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-0">
//           {BM_BANNER_LABELS.map(({ id, text, icon: LabelIcon, style, position }) => (
//             <span
//               key={id}
//               className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-md sm:absolute ${style} ${position}`}
//             >
//               <LabelIcon size={16} aria-hidden="true" />
//               {text}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   </section>
// );

// /* ============================================================
//    2. AI ASSISTANT
//    ============================================================ */

// const AiAssistant = () => (
//   <section className="px-4 py-12 md:px-12">
//     <div className="flex flex-col gap-8 rounded-3xl border border-[var(--border-color)] bg-[var(--white-cards)] p-8 md:flex-row md:items-center md:justify-between md:p-12">
//       <div className="max-w-2xl">
//         <p className="flex items-center gap-2 text-sm uppercase text-[var(--secondary-text)]">
//           <Sparkles className="h-5 w-5 text-[var(--primary-yellow)]" />
//           BuildMart AI Assistant · Demo
//         </p>
//         <h2 className="mt-2 text-3xl text-[var(--primary-text)] md:text-4xl">Plan quantities and budget for your plot</h2>
//         <p className="mt-4 text-[var(--secondary-text)]">
//           Get indicative material quantities and grey-structure / finishing cost breakdowns from plot size, floors and
//           rooms. Estimates are planning aids, not guaranteed quotations — actual costs depend on market rates, quality
//           and site conditions.
//         </p>
//       </div>

//       <Link
//         href="/ai-assistant"
//         className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal-black)] px-8 py-4 font-semibold text-white hover:bg-[var(--industrial-blue-grey)]"
//       >
//         Open AI Assistant →
//       </Link>
//     </div>
//   </section>
// );

// /* ============================================================
//    3. TOP SUPPLIERS (carousel)
//    ============================================================ */

// // logo khali ho to naam ka pehla harf dikhta hai
// const suppliers = [
//   { id: 1, logo: "", name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "Gujranwala" },
//   { id: 2, logo: "", name: "Pak Cement Traders", type: "Verified Supplier", services: "Cement | Bajri | Crush", city: "Gujranwala" },
//   { id: 3, logo: "", name: "Ittefaq Steel Point", type: "Retailer", services: "Steel Saria | Iron Sheets", city: "Wazirabad" },
//   { id: 4, logo: "", name: "City Sand & Bajri", type: "Verified Supplier", services: "Ravi Sand | Chenab Sand", city: "Lahore" },
//   { id: 5, logo: "", name: "Madina Tiles House", type: "Retailer", services: "Tiles | Marble | Sanitary", city: "Gujranwala" },
// ];

// const supplierArrow =
//   "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-white hover:bg-[var(--charcoal-black)]";

// const TopSuppliers = () => {
//   const [active, setActive] = useState(0);
//   const total = suppliers.length;
//   const half = Math.floor(total / 2);

//   const handlePrev = () => setActive((a) => (a - 1 + total) % total);
//   const handleNext = () => setActive((a) => (a + 1) % total);

//   return (
//     <section className="px-4 py-12 md:px-12">
//       <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">Top Rated Suppliers</h2>

//       {/* --step: cards ke beech ka fasla */}
//       <div className="relative h-[27rem] overflow-hidden [--step:15rem] md:[--step:20rem]">
//         {suppliers.map(({ id, logo, name, type, services, city }, i) => {
//           const offset = ((i - active + total + half) % total) - half; // 0 = beech wala
//           const isActive = offset === 0;
//           const far = Math.abs(offset) > 1;

//           return (
//             <article
//               key={id}
//               onClick={() => setActive(i)}
//               className={`absolute left-1/2 top-1/2 w-72 rounded-2xl border-2 bg-[var(--white-cards)] p-6 text-center transition-all duration-500 ease-in-out ${
//                 isActive ? "border-[var(--primary-yellow)] shadow-xl" : "cursor-pointer border-[var(--border-color)]"
//               }`}
//               style={{
//                 transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
//                 opacity: isActive ? 1 : far ? 0 : 0.55,
//                 zIndex: 10 - Math.abs(offset),
//                 pointerEvents: far ? "none" : "auto",
//               }}
//             >
//               <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--off-white-background)]">
//                 {logo ? (
//                   <Image src={logo} alt={name} fill sizes="96px" className="object-contain p-2" />
//                 ) : (
//                   <span className="text-3xl font-bold text-[var(--industrial-blue-grey)]">{name[0]}</span>
//                 )}
//               </div>

//               <h3 className="mt-4 truncate text-xl text-[var(--primary-text)]">{name}</h3>
//               <span className="mt-2 inline-block rounded bg-[var(--off-white-background)] px-3 py-1 text-sm text-[var(--industrial-blue-grey)]">{type}</span>
//               <p className="mt-3 text-sm text-[var(--secondary-text)]">{services}</p>
//               <p className="mt-3 flex items-center justify-center gap-1 text-sm text-[var(--secondary-text)]">
//                 <MapPin className="h-4 w-4 text-[var(--industrial-blue-grey)]" />
//                 {city}
//               </p>

//               <div className="mt-5 flex gap-3">
//                 <button
//                   type="button"
//                   tabIndex={isActive ? 0 : -1}
//                   className="flex-1 rounded-lg bg-[var(--primary-yellow)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--hover-yellow)]"
//                 >
//                   Contact
//                 </button>
//                 <button
//                   type="button"
//                   tabIndex={isActive ? 0 : -1}
//                   className="flex-1 rounded-lg border border-[var(--border-color)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                 >
//                   View Shop
//                 </button>
//               </div>
//             </article>
//           );
//         })}

//         <button type="button" onClick={handlePrev} aria-label="Previous supplier" className={`${supplierArrow} left-2`}>
//           <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
//         </button>
//         <button type="button" onClick={handleNext} aria-label="Next supplier" className={`${supplierArrow} right-2`}>
//           <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
//         </button>
//       </div>
//     </section>
//   );
// };

// /* ============================================================
//    4. CUSTOMER REVIEWS (slider)
//    ============================================================ */

// const reviews = [
//   { id: 1, rating: 4, text: "The visualization demo helped us pick a floor finish before visiting the shop.", name: "Hira T.", tag: "AI Visualization demo" },
//   { id: 2, rating: 5, text: "Clear units on every listing — per bag, per kg, per trolley. Very helpful.", name: "Usman A.", tag: "Price listings" },
//   { id: 3, rating: 5, text: "Comparing cement prices from a few shops took minutes instead of a full day of calls.", name: "Ahmed R.", tag: "Cement comparison" },
//   { id: 4, rating: 5, text: "The cost estimator gave me a realistic starting budget before I talked to any contractor.", name: "Sana K.", tag: "Cost estimator" },
//   { id: 5, rating: 4, text: "Found leftover tiles at a good price from a seller nearby.", name: "Bilal M.", tag: "Reusable materials" },
// ];

// const Stars = ({ rating }) => (
//   <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
//     {[1, 2, 3, 4, 5].map((n) => (
//       <Star
//         key={n}
//         fill="currentColor"
//         className={`h-5 w-5 ${n <= rating ? "text-[var(--primary-yellow)]" : "text-[var(--border-color)]"}`}
//       />
//     ))}
//   </div>
// );

// const reviewArrow =
//   "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--white-cards)] text-[var(--primary-text)] shadow-md hover:bg-[var(--primary-yellow)]";

// const CustomerReviews = () => {
//   const [items, setItems] = useState(reviews); // cards ki current tarteeb
//   const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
//   const [animating, setAnimating] = useState(false);
//   const track = useRef(null);
//   const busy = useRef(false); // slide ke dauran dobara click na chale
//   const touchX = useRef(0);

//   const getStep = () => track.current.firstElementChild.offsetWidth + 24; // card + gap-6

//   // Aage: ek card left sarkao, phir pehla card aakhir mein laga do
//   const handleNext = () => {
//     if (busy.current) return;
//     busy.current = true;
//     setAnimating(true);
//     setShift(-getStep());
//   };

//   // Peeche: aakhri card pehle laga do (bina animation), phir right sarkao
//   const handlePrev = () => {
//     if (busy.current) return;
//     busy.current = true;
//     setAnimating(false);
//     setItems((a) => [a[a.length - 1], ...a.slice(0, -1)]);
//     setShift(-getStep());
//     requestAnimationFrame(() =>
//       requestAnimationFrame(() => {
//         setAnimating(true);
//         setShift(0);
//       })
//     );
//   };

//   const handleTransitionEnd = (e) => {
//     if (e.target !== e.currentTarget) return;
//     if (shift < 0) {
//       setAnimating(false);
//       setItems((a) => [...a.slice(1), a[0]]);
//       setShift(0);
//     }
//     busy.current = false;
//   };

//   // Mobile par swipe
//   const handleTouchEnd = (e) => {
//     const diff = e.changedTouches[0].clientX - touchX.current;
//     if (diff < -50) handleNext();
//     if (diff > 50) handlePrev();
//   };

//   return (
//     <section className="px-4 py-12 md:px-12">
//       <div className="mb-6 h-1 w-12 bg-[var(--primary-yellow)]" />
//       <h2 className="text-3xl text-[var(--primary-text)] md:text-4xl">What Our Customers Say</h2>
//       <p className="mb-8 mt-3 text-[var(--secondary-text)]">Sample testimonials shown for demonstration purposes.</p>

//       <div className="relative">
//         <button type="button" onClick={handlePrev} aria-label="Previous review" className={`${reviewArrow} left-2 md:-left-5`}>
//           <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
//         </button>

//         <div
//           className="overflow-hidden py-2"
//           onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div
//             ref={track}
//             onTransitionEnd={handleTransitionEnd}
//             className="flex gap-6"
//             style={{ transform: `translateX(${shift}px)`, transition: animating ? "transform 500ms ease-in-out" : "none" }}
//           >
//             {items.map(({ id, rating, text, name, tag }) => (
//               <article
//                 key={id}
//                 className="w-full shrink-0 rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-6 shadow-sm md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
//               >
//                 <Stars rating={rating} />
//                 <p className="mt-4 text-lg text-[var(--primary-text)]">“{text}”</p>

//                 <div className="mt-6 flex items-center gap-3">
//                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-xl font-bold text-white">
//                     {name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-[var(--primary-text)]">{name}</p>
//                     <p className="text-sm text-[var(--secondary-text)]">{tag} · Demo review</p>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>

//         <button type="button" onClick={handleNext} aria-label="Next review" className={`${reviewArrow} right-2 md:-right-5`}>
//           <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
//         </button>
//       </div>
//     </section>
//   );
// };

// /* ============================================================
//    5. FAQ
//    ============================================================ */

// const faqs = [
//   { id: 1, q: "What is BuildMart Gujranwala and how does it work?", a: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place." },
//   { id: 2, q: "Is BuildMart free to use?", a: "Browsing materials and comparing listed prices is open to everyone. Add your own details here if some features have charges." },
//   { id: 3, q: "How are the suppliers registered?", a: "Suppliers register with their shop details and verification documents. An administrator reviews each application before the supplier is verified." },
//   { id: 4, q: "How do I contact a supplier?", a: "Open any material or supplier listing and use the Contact button to send an inquiry. You can track its status from your account." },
//   { id: 5, q: "Are the prices shown live market rates?", a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying." },
// ];

// const Faq = () => (
//   <section className="px-4 py-12 md:px-12">
//     <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">
//       Frequently Asked <span className="text-[var(--industrial-blue-grey)]">Questions</span>
//     </h2>

//     <div className="mx-auto max-w-3xl space-y-4">
//       {faqs.map(({ id, q, a }) => (
//         <details
//           key={id}
//           className="group rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] open:border-[var(--industrial-blue-grey)] hover:border-[var(--industrial-blue-grey)]"
//         >
//           <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-[var(--primary-text)] [&::-webkit-details-marker]:hidden">
//             {q}
//             <ChevronDown className="h-5 w-5 shrink-0 text-[var(--industrial-blue-grey)] transition-transform duration-300 group-open:rotate-180" />
//           </summary>
//           <p className="px-5 pb-4 text-[var(--secondary-text)]">{a}</p>
//         </details>
//       ))}
//     </div>
//   </section>
// );

// /* ============================================================
//    PAGE
//    ============================================================ */

// const Page = () => (
//   <main>
//     <Hero />

//     <CategorySection
//       title="MarketPlace Categories"
//       placeholder="Search categories..."
//       items={categoryLinks}
//       label="categories"
//       exploreText="Explore All Categories"
//       exploreHref="/materials"
//     />

//     <CategorySection
//       title="Reused Materials"
//       placeholder="Search reused materials..."
//       items={reusedLinks}
//       label="reused materials"
//       exploreText="Explore All Reused Materials"
//       exploreHref="/materials/used-bricks"
//       withBorder
//     />

//     <FindBanner />

//     <AiAssistant />
//     <TopSuppliers />
//     <CustomerReviews />
//     <Faq />
//   </main>
// );

// export default Page;






"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bike, ChevronDown, ChevronLeft, ChevronRight, MapPin, Package, Search, Sparkles, Star, Store } from "lucide-react";
import CategorySection from "../../component/materials/CategorySection/CategorySection";
//import { categoryLinks, reusedLinks } from "../../component/materials/categoryItems";
import { categoryLinks, reusedLinks } from "./materials/categoryItems";

// Hero images: src/assets/images/guest/hero/
import grey from "../../assets/images/guest/hero/grey.jpeg";
import exterior from "../../assets/images/guest/hero/exterior.jpeg";
import interior from "../../assets/images/guest/hero/interior.jpeg";

// Banner image: src/assets/images/guest/banner/
import findBanner from "../../assets/images/guest/banner/findEverything.gif";

/* ============================================================
   1. HERO
   ============================================================ */

const BM_HERO_SLIDES = [
  { id: 1, image: grey, alt: "Construction materials yard" },
  { id: 2, image: exterior, alt: "House exterior" },
  { id: 3, image: interior, alt: "House interior" },
];

const BM_SEARCH_CATEGORIES = [
  { id: 1, label: "Bricks" },
  { id: 2, label: "Cement" },
  { id: 3, label: "Steel / Saria" },
  { id: 4, label: "Sand" },
  { id: 5, label: "Tiles" },
  { id: 6, label: "Paint" },
];

const BM_SEARCH_LOCATIONS = [
  { id: 1, label: "GT Road" },
  { id: 2, label: "Satellite Town" },
  { id: 3, label: "Model Town" },
  { id: 4, label: "Citi Housing" },
  { id: 5, label: "Wapda Town" },
  { id: 6, label: "Kamoke" },
];

const BM_SEARCH_SELECTS = [
  { id: 1, label: "Category", all: "All categories", items: BM_SEARCH_CATEGORIES },
  { id: 2, label: "Location", all: "All locations", items: BM_SEARCH_LOCATIONS },
];

// href null = route abhi nahi, button banta hai
const BM_HERO_TABS = [
  { id: 1, label: "Materials", href: "/materials", icon: Package },
  { id: 2, label: "Suppliers", href: "/suppliers", icon: Store },
  { id: 3, label: "Riders", href: null, icon: Bike },
];

const fieldClass =
  "w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base outline-none focus:border-[color:var(--charcoal-black)]";
const tabClass =
  "inline-flex items-center gap-2 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] transition-colors hover:border-[color:var(--primary-yellow)] hover:bg-[var(--primary-yellow)] sm:px-5 sm:text-base";

const Hero = () => {
  const [current, setCurrent] = useState(0); // abhi kaun si image dikh rahi hai

  // Har 5 second baad image badal jaye
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % BM_HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[var(--charcoal-black)] text-[color:var(--white-cards)] lg:min-h-[calc(100vh-5rem)] 2xl:min-h-[calc(100vh-6rem)]">
      {BM_HERO_SLIDES.map(({ id, image, alt }, i) => (
        <Image
          key={id}
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[var(--charcoal-black)] opacity-60" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-10 2xl:px-12">
        <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
          Construction Platform for <span className="text-[color:var(--primary-yellow)]">Gujranwala</span>
        </h1>

        <div className="mt-8 w-full max-w-[1008px] rounded-xl bg-[var(--white-cards)] p-3 text-left sm:mt-10 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Material name"
              aria-label="Material name"
              className={`${fieldClass} text-[color:var(--primary-text)] placeholder:text-[color:var(--secondary-text)]`}
            />

            {BM_SEARCH_SELECTS.map(({ id, label, all, items }) => (
              <div key={id} className="relative">
                <select aria-label={label} className={`${fieldClass} appearance-none pr-10 text-[color:var(--secondary-text)]`}>
                  <option value="">{all}</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--secondary-text)]" />
              </div>
            ))}

            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--primary-yellow)] px-6 py-3.5 text-base font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:col-span-2 lg:col-span-1"
            >
              <Search size={20} />
              Search Materials
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-xl bg-[var(--white-cards)]/20 p-2 backdrop-blur-sm sm:mt-8">
          {BM_HERO_TABS.map(({ id, label, href, icon: TabIcon }) => {
            const content = (
              <>
                <TabIcon size={18} aria-hidden="true" />
                {label}
              </>
            );

            return href ? (
              <Link key={id} href={href} className={tabClass}>
                {content}
              </Link>
            ) : (
              <button key={id} type="button" className={tabClass}>
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FIND EVERYTHING BANNER (Reused Materials ke neeche)
   ============================================================ */

// Poori width, oonchai screen ka 65%. GIF animated hai, is liye unoptimized.
// object-contain: image kati nahi, poori dikhti hai
const FindBanner = () => (
  <section className="relative h-[65vh] min-h-[360px] max-h-[720px] w-full overflow-hidden border-t border-[var(--border-color)] bg-[var(--white-cards)]">
    {/* Image ke dono taraf halki yellow roshni */}
    <span aria-hidden="true" className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[var(--primary-yellow)]/25 blur-3xl" />
    <span aria-hidden="true" className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[var(--primary-yellow)]/25 blur-3xl" />

    <Image
      src={findBanner}
      alt="BuildMart banner: find everything you need to build"
      fill
      unoptimized
      sizes="100vw"
      className="object-contain"
    />
  </section>
);

/* ============================================================
   2. AI ASSISTANT
   ============================================================ */

const AiAssistant = () => (
  <section className="px-4 py-12 md:px-12">
    <div className="flex flex-col gap-8 rounded-3xl border border-[var(--border-color)] bg-[var(--white-cards)] p-8 md:flex-row md:items-center md:justify-between md:p-12">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-sm uppercase text-[var(--secondary-text)]">
          <Sparkles className="h-5 w-5 text-[var(--primary-yellow)]" />
          BuildMart AI Assistant · Demo
        </p>
        <h2 className="mt-2 text-3xl text-[var(--primary-text)] md:text-4xl">Plan quantities and budget for your plot</h2>
        <p className="mt-4 text-[var(--secondary-text)]">
          Get indicative material quantities and grey-structure / finishing cost breakdowns from plot size, floors and
          rooms. Estimates are planning aids, not guaranteed quotations — actual costs depend on market rates, quality
          and site conditions.
        </p>
      </div>

      <Link
        href="/ai-assistant"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal-black)] px-8 py-4 font-semibold text-white hover:bg-[var(--industrial-blue-grey)]"
      >
        Open AI Assistant →
      </Link>
    </div>
  </section>
);

/* ============================================================
   3. TOP SUPPLIERS (carousel)
   ============================================================ */

// logo khali ho to naam ka pehla harf dikhta hai
const suppliers = [
  { id: 1, logo: "", name: "Al-Noor Building Store", type: "Retailer", services: "Bricks | Cement | Sand", city: "Gujranwala" },
  { id: 2, logo: "", name: "Pak Cement Traders", type: "Verified Supplier", services: "Cement | Bajri | Crush", city: "Gujranwala" },
  { id: 3, logo: "", name: "Ittefaq Steel Point", type: "Retailer", services: "Steel Saria | Iron Sheets", city: "Wazirabad" },
  { id: 4, logo: "", name: "City Sand & Bajri", type: "Verified Supplier", services: "Ravi Sand | Chenab Sand", city: "Lahore" },
  { id: 5, logo: "", name: "Madina Tiles House", type: "Retailer", services: "Tiles | Marble | Sanitary", city: "Gujranwala" },
];

const supplierArrow =
  "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-white hover:bg-[var(--charcoal-black)]";

const TopSuppliers = () => {
  const [active, setActive] = useState(0);
  const total = suppliers.length;
  const half = Math.floor(total / 2);

  const handlePrev = () => setActive((a) => (a - 1 + total) % total);
  const handleNext = () => setActive((a) => (a + 1) % total);

  return (
    <section className="px-4 py-12 md:px-12">
      <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">Top Rated Suppliers</h2>

      {/* --step: cards ke beech ka fasla */}
      <div className="relative h-[27rem] overflow-hidden [--step:15rem] md:[--step:20rem]">
        {suppliers.map(({ id, logo, name, type, services, city }, i) => {
          const offset = ((i - active + total + half) % total) - half; // 0 = beech wala
          const isActive = offset === 0;
          const far = Math.abs(offset) > 1;

          return (
            <article
              key={id}
              onClick={() => setActive(i)}
              className={`absolute left-1/2 top-1/2 w-72 rounded-2xl border-2 bg-[var(--white-cards)] p-6 text-center transition-all duration-500 ease-in-out ${
                isActive ? "border-[var(--primary-yellow)] shadow-xl" : "cursor-pointer border-[var(--border-color)]"
              }`}
              style={{
                transform: `translate(calc(-50% + ${offset} * var(--step)), -50%) scale(${isActive ? 1 : 0.85})`,
                opacity: isActive ? 1 : far ? 0 : 0.55,
                zIndex: 10 - Math.abs(offset),
                pointerEvents: far ? "none" : "auto",
              }}
            >
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--off-white-background)]">
                {logo ? (
                  <Image src={logo} alt={name} fill sizes="96px" className="object-contain p-2" />
                ) : (
                  <span className="text-3xl font-bold text-[var(--industrial-blue-grey)]">{name[0]}</span>
                )}
              </div>

              <h3 className="mt-4 truncate text-xl text-[var(--primary-text)]">{name}</h3>
              <span className="mt-2 inline-block rounded bg-[var(--off-white-background)] px-3 py-1 text-sm text-[var(--industrial-blue-grey)]">{type}</span>
              <p className="mt-3 text-sm text-[var(--secondary-text)]">{services}</p>
              <p className="mt-3 flex items-center justify-center gap-1 text-sm text-[var(--secondary-text)]">
                <MapPin className="h-4 w-4 text-[var(--industrial-blue-grey)]" />
                {city}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  className="flex-1 rounded-lg bg-[var(--primary-yellow)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--hover-yellow)]"
                >
                  Contact
                </button>
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  className="flex-1 rounded-lg border border-[var(--border-color)] py-2 text-sm font-semibold text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
                >
                  View Shop
                </button>
              </div>
            </article>
          );
        })}

        <button type="button" onClick={handlePrev} aria-label="Previous supplier" className={`${supplierArrow} left-2`}>
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button type="button" onClick={handleNext} aria-label="Next supplier" className={`${supplierArrow} right-2`}>
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

/* ============================================================
   4. CUSTOMER REVIEWS (slider)
   ============================================================ */

const reviews = [
  { id: 1, rating: 4, text: "The visualization demo helped us pick a floor finish before visiting the shop.", name: "Hira T.", tag: "AI Visualization demo" },
  { id: 2, rating: 5, text: "Clear units on every listing — per bag, per kg, per trolley. Very helpful.", name: "Usman A.", tag: "Price listings" },
  { id: 3, rating: 5, text: "Comparing cement prices from a few shops took minutes instead of a full day of calls.", name: "Ahmed R.", tag: "Cement comparison" },
  { id: 4, rating: 5, text: "The cost estimator gave me a realistic starting budget before I talked to any contractor.", name: "Sana K.", tag: "Cost estimator" },
  { id: 5, rating: 4, text: "Found leftover tiles at a good price from a seller nearby.", name: "Bilal M.", tag: "Reusable materials" },
];

const Stars = ({ rating }) => (
  <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        fill="currentColor"
        className={`h-5 w-5 ${n <= rating ? "text-[var(--primary-yellow)]" : "text-[var(--border-color)]"}`}
      />
    ))}
  </div>
);

const reviewArrow =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--white-cards)] text-[var(--primary-text)] shadow-md hover:bg-[var(--primary-yellow)]";

const CustomerReviews = () => {
  const [items, setItems] = useState(reviews); // cards ki current tarteeb
  const [shift, setShift] = useState(0); // track kitna sarka hua hai (px)
  const [animating, setAnimating] = useState(false);
  const track = useRef(null);
  const busy = useRef(false); // slide ke dauran dobara click na chale
  const touchX = useRef(0);

  const getStep = () => track.current.firstElementChild.offsetWidth + 24; // card + gap-6

  // Aage: ek card left sarkao, phir pehla card aakhir mein laga do
  const handleNext = () => {
    if (busy.current) return;
    busy.current = true;
    setAnimating(true);
    setShift(-getStep());
  };

  // Peeche: aakhri card pehle laga do (bina animation), phir right sarkao
  const handlePrev = () => {
    if (busy.current) return;
    busy.current = true;
    setAnimating(false);
    setItems((a) => [a[a.length - 1], ...a.slice(0, -1)]);
    setShift(-getStep());
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimating(true);
        setShift(0);
      })
    );
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (shift < 0) {
      setAnimating(false);
      setItems((a) => [...a.slice(1), a[0]]);
      setShift(0);
    }
    busy.current = false;
  };

  // Mobile par swipe
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchX.current;
    if (diff < -50) handleNext();
    if (diff > 50) handlePrev();
  };

  return (
    <section className="px-4 py-12 md:px-12">
      <div className="mb-6 h-1 w-12 bg-[var(--primary-yellow)]" />
      <h2 className="text-3xl text-[var(--primary-text)] md:text-4xl">What Our Customers Say</h2>
      <p className="mb-8 mt-3 text-[var(--secondary-text)]">Sample testimonials shown for demonstration purposes.</p>

      <div className="relative">
        <button type="button" onClick={handlePrev} aria-label="Previous review" className={`${reviewArrow} left-2 md:-left-5`}>
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div
          className="overflow-hidden py-2"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={track}
            onTransitionEnd={handleTransitionEnd}
            className="flex gap-6"
            style={{ transform: `translateX(${shift}px)`, transition: animating ? "transform 500ms ease-in-out" : "none" }}
          >
            {items.map(({ id, rating, text, name, tag }) => (
              <article
                key={id}
                className="w-full shrink-0 rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-6 shadow-sm md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <Stars rating={rating} />
                <p className="mt-4 text-lg text-[var(--primary-text)]">“{text}”</p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--industrial-blue-grey)] text-xl font-bold text-white">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--primary-text)]">{name}</p>
                    <p className="text-sm text-[var(--secondary-text)]">{tag} · Demo review</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleNext} aria-label="Next review" className={`${reviewArrow} right-2 md:-right-5`}>
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

/* ============================================================
   5. FAQ
   ============================================================ */

const faqs = [
  { id: 1, q: "What is BuildMart Gujranwala and how does it work?", a: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place." },
  { id: 2, q: "Is BuildMart free to use?", a: "Browsing materials and comparing listed prices is open to everyone. Add your own details here if some features have charges." },
  { id: 3, q: "How are the suppliers registered?", a: "Suppliers register with their shop details and verification documents. An administrator reviews each application before the supplier is verified." },
  { id: 4, q: "How do I contact a supplier?", a: "Open any material or supplier listing and use the Contact button to send an inquiry. You can track its status from your account." },
  { id: 5, q: "Are the prices shown live market rates?", a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying." },
];

const Faq = () => (
  <section className="px-4 py-12 md:px-12">
    <h2 className="mb-10 text-center text-3xl text-[var(--primary-text)] md:text-4xl">
      Frequently Asked <span className="text-[var(--industrial-blue-grey)]">Questions</span>
    </h2>

    <div className="mx-auto max-w-3xl space-y-4">
      {faqs.map(({ id, q, a }) => (
        <details
          key={id}
          className="group rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] open:border-[var(--industrial-blue-grey)] hover:border-[var(--industrial-blue-grey)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-[var(--primary-text)] [&::-webkit-details-marker]:hidden">
            {q}
            <ChevronDown className="h-5 w-5 shrink-0 text-[var(--industrial-blue-grey)] transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-4 text-[var(--secondary-text)]">{a}</p>
        </details>
      ))}
    </div>
  </section>
);

/* ============================================================
   PAGE
   ============================================================ */

const Page = () => (
  <main>
    <Hero />

    <CategorySection
      title="MarketPlace Categories"
      placeholder="Search categories..."
      items={categoryLinks}
      label="categories"
      exploreText="Explore All Categories"
      exploreHref="/materials"
    />

    <CategorySection
      title="Reused Materials"
      placeholder="Search reused materials..."
      items={reusedLinks}
      label="reused materials"
      exploreText="Explore All Reused Materials"
      exploreHref="/materials/used-bricks"
      withBorder
    />

    <FindBanner />

    <AiAssistant />
    <TopSuppliers />
    <CustomerReviews />
    <Faq />
  </main>
);

export default Page;