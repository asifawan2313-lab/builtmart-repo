// // "use client";

// // import { useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";
// // import { Clock, MapPin, MessageCircle, PackageSearch, Phone, Shield, ShieldCheck, Star, Store, Truck, X } from "lucide-react";
// // import ProductGrid from "../../../../component/materials/ProductGrid/ProductGrid";
// // import { getSupplier } from "../supplierData";
// // import { allProducts } from "../../materials/materialData";

// // const tabs = [
// //   { id: 1, label: "Overview", href: "#overview" },
// //   { id: 2, label: "Category", href: "#category" },
// //   { id: 3, label: "Products", href: "#products" },
// // ];

// // const SupplierDetailPage = () => {
// //   const { slug } = useParams(); // link se slug, e.g. modern-builders-mart
// //   const [action, setAction] = useState(null); // "message" ya "call" = login box khula hai
// //   const [selected, setSelected] = useState("All Products"); // products ka category chip
// //   const supplier = getSupplier(slug);

// //   // Supplier na mile to message
// //   if (!supplier) {
// //     return (
// //       <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F4F4F2] px-4 text-center">
// //         <Store className="h-10 w-10 text-[#A7ADB4]" aria-hidden="true" />
// //         <h1 className="text-2xl font-bold text-[#202124]">Supplier not found</h1>
// //         <Link
// //           href="/suppliers"
// //           className="rounded-lg bg-[#FDC716] px-6 py-2.5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
// //         >
// //           Back to Suppliers
// //         </Link>
// //       </main>
// //     );
// //   }

// //   const { name, initials, location, rating, reviews, description, tags, image, verified, address, hours, delivery } = supplier;
// //   const BadgeIcon = verified ? ShieldCheck : Shield;

// //   // Is supplier ke products (materialData se, supplier ke naam se)
// //   const items = allProducts.filter((p) => p.supplier === name);
// //   const productCategories = [...new Set(items.map((p) => p.category))];
// //   const categoryNames = productCategories.length ? productCategories : tags;
// //   const visible = selected === "All Products" ? items : items.filter((p) => p.category === selected);

// //   const infoList = [
// //     { id: 1, icon: MapPin, label: "Address", value: address },
// //     { id: 2, icon: Clock, label: "Opening hours", value: hours },
// //     { id: 3, icon: Truck, label: "Delivery", value: delivery },
// //   ];

// //   const handleClose = () => setAction(null);

// //   return (
// //     <main className="bg-[#F4F4F2] pb-14">
// //       {/* Hero: sirf shop ki image */}
// //       <section className="relative h-44 overflow-hidden bg-[#202124] sm:h-60">
// //         <Image src={image} alt={`${name} shop (demo image)`} fill priority sizes="100vw" className="object-cover" />
// //         <div className="absolute inset-0 bg-[#202124]/60" />
// //       </section>

// //       <div className="mx-auto max-w-5xl px-4 sm:px-6">
// //         {/* Header card (hero ke upar thoda overlap) */}
// //         <section className="relative z-10 -mt-14 rounded-2xl border border-[#E2E4E7] bg-white p-5 shadow-lg sm:p-6">
// //           <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
// //             <div className="flex items-start gap-4">
// //               <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#202124] text-lg font-bold text-white ring-4 ring-[#FDC716] sm:h-20 sm:w-20 sm:text-xl">
// //                 {initials}
// //               </span>

// //               <div className="min-w-0">
// //                 <div className="flex flex-wrap items-center gap-2">
// //                   <h1 className="text-xl font-extrabold text-[#202124] sm:text-2xl">{name}</h1>
// //                   <span
// //                     className={`flex items-center gap-1 rounded-md border border-[#E2E4E7] bg-[#F4F4F2] px-2 py-0.5 text-xs font-medium ${
// //                       verified ? "text-blue-600" : "text-[#565553]"
// //                     }`}
// //                   >
// //                     <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
// //                     {verified ? "Verified (demo)" : "Unverified"}
// //                   </span>
// //                 </div>

// //                 <p className="mt-1 text-sm text-[#45484D]">{tags.join(", ")}</p>
// //                 <p className="mt-1 flex items-center gap-1 text-sm text-[#45484D]">
// //                   <Star className="h-4 w-4 shrink-0 fill-[#FDC716] text-[#FDC716]" aria-hidden="true" />
// //                   <b className="text-[#202124]">{rating}</b> ({reviews}+ reviews, demo)
// //                 </p>
// //                 <p className="mt-1 flex items-start gap-1 text-xs text-[#45484D]">
// //                   <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
// //                   {address}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* WhatsApp / Call Now: dono par login maangta hai */}
// //             <div className="flex flex-col gap-2 sm:flex-row md:w-52 md:flex-col">
// //               <button
// //                 type="button"
// //                 onClick={() => setAction("message")}
// //                 className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
// //               >
// //                 <MessageCircle size={16} aria-hidden="true" />
// //                 WhatsApp
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setAction("call")}
// //                 className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
// //               >
// //                 <Phone size={16} aria-hidden="true" />
// //                 Call Now
// //               </button>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Tabs (page ke sections par le jate hain) */}
// //         <nav aria-label="Supplier sections" className="mt-6 flex gap-6 border-b border-[#E2E4E7]">
// //           {tabs.map(({ id, label, href }) => (
// //             <a
// //               key={id}
// //               href={href}
// //               className="-mb-px border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-[#45484D] transition-colors hover:border-[#FDC716] hover:text-[#202124]"
// //             >
// //               {label}
// //             </a>
// //           ))}
// //         </nav>

// //         {/* Overview */}
// //         <section id="overview" className="scroll-mt-28 pt-8">
// //           <h2 className="border-l-4 border-[#FDC716] pl-3 text-lg font-extrabold text-[#202124]">Overview</h2>
// //           <p className="mt-4 text-sm font-bold uppercase text-[#202124]">Welcome to {name}</p>
// //           <p className="mt-2 text-sm leading-6 text-[#45484D]">{description}</p>
// //           <p className="mt-2 text-xs text-[#45484D]">Sample shop profile shown for demonstration purposes.</p>

// //           <ul className="mt-5 grid gap-3 sm:grid-cols-3">
// //             {infoList.map(({ id, icon: InfoIcon, label, value }) => (
// //               <li key={id} className="flex items-start gap-3 rounded-lg border border-[#E2E4E7] bg-white p-3">
// //                 <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#45484D]" aria-hidden="true" />
// //                 <div className="min-w-0">
// //                   <p className="text-xs text-[#A7ADB4]">{label}</p>
// //                   <p className="break-words text-sm text-[#202124]">{value}</p>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         </section>

// //         {/* Category */}
// //         <section id="category" className="scroll-mt-28 pt-8">
// //           <div className="overflow-hidden rounded-xl border border-[#E2E4E7] bg-white">
// //             <h2 className="bg-[#FDC716]/25 px-5 py-3 text-base font-bold text-[#202124]">Category</h2>
// //             <ul className="grid gap-2 p-5 text-sm text-[#45484D] sm:grid-cols-2 lg:grid-cols-3">
// //               {categoryNames.map((c) => (
// //                 <li key={c} className="flex items-center gap-2">
// //                   <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FDC716]" aria-hidden="true" />
// //                   {c}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </section>

// //         {/* Products */}
// //         <section id="products" className="scroll-mt-28 pt-10">
// //           <h2 className="text-center text-xl font-extrabold text-[#202124] sm:text-2xl">
// //             Products by <span className="text-[#E5B20F]">{name}</span>
// //           </h2>

// //           {/* Category chips */}
// //           <div className="mt-4 flex flex-wrap justify-center gap-2">
// //             {["All Products", ...productCategories].map((c) => (
// //               <button
// //                 key={c}
// //                 type="button"
// //                 aria-pressed={selected === c}
// //                 onClick={() => setSelected(c)}
// //                 className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
// //                   selected === c
// //                     ? "border-[#FDC716] bg-[#FDC716] text-[#202124]"
// //                     : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#FDC716]/25"
// //                 }`}
// //               >
// //                 {c}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="mt-6">
// //             {visible.length === 0 ? (
// //               <p className="flex items-center gap-2 rounded-xl border border-[#E2E4E7] bg-white p-6 text-sm text-[#45484D]">
// //                 <PackageSearch size={18} aria-hidden="true" />
// //                 No sample products listed for this supplier yet.
// //               </p>
// //             ) : (
// //               <ProductGrid items={visible} cols="grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" />
// //             )}
// //           </div>

// //           <p className="mt-4 text-center text-xs text-[#45484D]">All supplier information is for demo purposes only.</p>
// //         </section>
// //       </div>

// //       {/* Login box (WhatsApp / Call Now dabane par) */}
// //       {action && (
// //         <div
// //           onClick={handleClose}
// //           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
// //           role="dialog"
// //           aria-modal="true"
// //           aria-label="Login required"
// //         >
// //           <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
// //             <button
// //               type="button"
// //               aria-label="Close"
// //               onClick={handleClose}
// //               className="absolute right-3 top-3 cursor-pointer text-[#45484D] hover:text-[#202124]"
// //             >
// //               <X size={18} />
// //             </button>

// //             <h2 className="text-lg font-extrabold text-[#202124]">Login required</h2>
// //             <p className="mt-2 text-sm text-[#45484D]">
// //               Please log in to {action === "message" ? "message" : "call"} {name}.
// //             </p>

// //             <div className="mt-5 grid grid-cols-2 gap-3">
// //               <button type="button" className="h-10 cursor-pointer rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]">
// //                 Log In
// //               </button>
// //               <button type="button" className="h-10 cursor-pointer rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]">
// //                 Sign Up
// //               </button>
// //             </div>

// //             <button type="button" onClick={handleClose} className="mt-3 w-full cursor-pointer text-xs text-[#45484D] hover:text-[#202124]">
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // };

// // export default SupplierDetailPage;






// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { Clock, MapPin, MessageCircle, PackageSearch, Phone, Shield, ShieldCheck, Star, Store, Truck, X } from "lucide-react";
// import ProductGrid from "../../../../component/materials/ProductGrid/ProductGrid";
// import { getSupplier } from "../supplierData";
// import { allProducts } from "../../materials/materialData";

// const tabs = [
//   { id: 1, label: "Overview", href: "#overview" },
//   { id: 2, label: "Category", href: "#category" },
//   { id: 3, label: "Products", href: "#products" },
// ];

// const SupplierDetailPage = () => {
//   const { slug } = useParams(); // link se slug, e.g. modern-builders-mart
//   const [action, setAction] = useState(null); // "message" ya "call" = login box khula hai
//   const [selected, setSelected] = useState("All Products"); // products ka category chip
//   const supplier = getSupplier(slug);

//   // Supplier na mile to message
//   if (!supplier) {
//     return (
//       <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F4F4F2] px-4 text-center">
//         <Store className="h-10 w-10 text-[#A7ADB4]" aria-hidden="true" />
//         <h1 className="text-2xl font-bold text-[#202124]">Supplier not found</h1>
//         <Link
//           href="/suppliers"
//           className="rounded-lg bg-[#FDC716] px-6 py-2.5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
//         >
//           Back to Suppliers
//         </Link>
//       </main>
//     );
//   }

//   const { name, initials, rating, reviews, description, tags, image, verified, address, hours, delivery } = supplier;
//   const BadgeIcon = verified ? ShieldCheck : Shield;

//   // Is supplier ke products (materialData se, supplier ke naam se)
//   const items = allProducts.filter((p) => p.supplier === name);
//   const productCategories = [...new Set(items.map((p) => p.category))];
//   const categoryNames = productCategories.length ? productCategories : tags;
//   const visible = selected === "All Products" ? items : items.filter((p) => p.category === selected);

//   const infoList = [
//     { id: 1, icon: MapPin, label: "Address", value: address },
//     { id: 2, icon: Clock, label: "Opening hours", value: hours },
//     { id: 3, icon: Truck, label: "Delivery", value: delivery },
//   ];

//   const handleClose = () => setAction(null);

//   return (
//     <main className="bg-[#F4F4F2] pb-14">
//       {/* Hero: patli band, sirf shop ki image */}
//       <section className="relative h-24 overflow-hidden bg-[#202124] sm:h-32">
//         <Image src={image} alt={`${name} shop (demo image)`} fill priority sizes="100vw" className="object-cover" />
//         <div className="absolute inset-0 bg-[#202124]/65" />
//       </section>

//       <div className="mx-auto max-w-5xl px-4 sm:px-6">
//         {/* Header card: halka rang, hero ke neeche thoda overlap */}
//         <section className="relative z-10 -mt-6 rounded-2xl border border-[#E2E4E7] bg-[#FDF3C8] p-4 shadow-md sm:p-5">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-4">
//               <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#202124] bg-[#202124] text-lg font-bold text-white sm:h-20 sm:w-20 sm:text-xl">
//                 {initials}
//               </span>

//               <div className="min-w-0">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h1 className="text-lg font-extrabold text-[#202124] sm:text-xl">{name}</h1>
//                   <span
//                     className={`flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-xs font-medium ${
//                       verified ? "text-blue-600" : "text-[#565553]"
//                     }`}
//                   >
//                     <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
//                     {verified ? "Verified (demo)" : "Unverified"}
//                   </span>
//                 </div>

//                 <p className="mt-1 text-xs text-[#45484D] sm:text-sm">{tags.join(", ")}</p>
//                 <p className="mt-1 flex items-center gap-1 text-xs text-[#45484D] sm:text-sm">
//                   <Star className="h-4 w-4 shrink-0 fill-[#FDC716] text-[#FDC716]" aria-hidden="true" />
//                   <b className="text-[#202124]">{rating}</b> ({reviews}+ reviews, demo)
//                 </p>
//                 <p className="mt-1 flex items-start gap-1 text-xs text-[#45484D]">
//                   <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
//                   {address}
//                 </p>
//               </div>
//             </div>

//             {/* WhatsApp / Call Now: dono par login maangta hai */}
//             <div className="flex w-full shrink-0 flex-col gap-2 md:w-56">
//               <button
//                 type="button"
//                 onClick={() => setAction("message")}
//                 className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
//               >
//                 <MessageCircle size={16} aria-hidden="true" />
//                 WhatsApp
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setAction("call")}
//                 className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
//               >
//                 <Phone size={16} aria-hidden="true" />
//                 Call Now
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Tabs (page ke sections par le jate hain) */}
//         <nav aria-label="Supplier sections" className="mt-6 flex gap-6 border-b border-[#E2E4E7]">
//           {tabs.map(({ id, label, href }) => (
//             <a
//               key={id}
//               href={href}
//               className="-mb-px border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-[#45484D] transition-colors hover:border-[#FDC716] hover:text-[#202124]"
//             >
//               {label}
//             </a>
//           ))}
//         </nav>

//         {/* Overview */}
//         <section id="overview" className="scroll-mt-28 pt-8">
//           <h2 className="border-l-4 border-[#FDC716] pl-3 text-lg font-extrabold text-[#202124]">Overview</h2>
//           <p className="mt-4 text-sm font-bold uppercase text-[#202124]">Welcome to {name}</p>
//           <p className="mt-2 text-sm leading-6 text-[#45484D]">{description}</p>
//           <p className="mt-2 text-xs text-[#45484D]">Sample shop profile shown for demonstration purposes.</p>

//           <ul className="mt-5 grid gap-3 sm:grid-cols-3">
//             {infoList.map(({ id, icon: InfoIcon, label, value }) => (
//               <li key={id} className="flex items-start gap-3 rounded-lg border border-[#E2E4E7] bg-white p-3">
//                 <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#45484D]" aria-hidden="true" />
//                 <div className="min-w-0">
//                   <p className="text-xs text-[#A7ADB4]">{label}</p>
//                   <p className="break-words text-sm text-[#202124]">{value}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Category */}
//         <section id="category" className="scroll-mt-28 pt-8">
//           <div className="overflow-hidden rounded-xl border border-[#E2E4E7] bg-white">
//             <h2 className="bg-[#FDF3C8] px-5 py-3 text-base font-bold text-[#202124]">Category</h2>
//             <ul className="grid gap-2 p-5 text-sm text-[#45484D] sm:grid-cols-2 lg:grid-cols-3">
//               {categoryNames.map((c) => (
//                 <li key={c} className="flex items-center gap-2">
//                   <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FDC716]" aria-hidden="true" />
//                   {c}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>

//         {/* Products */}
//         <section id="products" className="scroll-mt-28 pt-10">
//           <h2 className="text-center text-xl font-extrabold text-[#202124] sm:text-2xl">
//             Products by <span className="text-[#E5B20F]">{name}</span>
//           </h2>

//           {/* Category chips */}
//           <div className="mt-4 flex flex-wrap justify-center gap-2">
//             {["All Products", ...productCategories].map((c) => (
//               <button
//                 key={c}
//                 type="button"
//                 aria-pressed={selected === c}
//                 onClick={() => setSelected(c)}
//                 className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
//                   selected === c
//                     ? "border-[#FDC716] bg-[#FDC716] text-[#202124]"
//                     : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#FDC716]/25"
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>

//           <div className="mt-6">
//             {visible.length === 0 ? (
//               <p className="flex items-center gap-2 rounded-xl border border-[#E2E4E7] bg-white p-6 text-sm text-[#45484D]">
//                 <PackageSearch size={18} aria-hidden="true" />
//                 No sample products listed for this supplier yet.
//               </p>
//             ) : (
//               <ProductGrid items={visible} cols="grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" />
//             )}
//           </div>

//           <p className="mt-4 text-center text-xs text-[#45484D]">All supplier information is for demo purposes only.</p>
//         </section>
//       </div>

//       {/* Login box (WhatsApp / Call Now dabane par) */}
//       {action && (
//         <div
//           onClick={handleClose}
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Login required"
//         >
//           <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
//             <button
//               type="button"
//               aria-label="Close"
//               onClick={handleClose}
//               className="absolute right-3 top-3 cursor-pointer text-[#45484D] hover:text-[#202124]"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="text-lg font-extrabold text-[#202124]">Login required</h2>
//             <p className="mt-2 text-sm text-[#45484D]">
//               Please log in to {action === "message" ? "message" : "call"} {name}.
//             </p>

//             <div className="mt-5 grid grid-cols-2 gap-3">
//               <button type="button" className="h-10 cursor-pointer rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]">
//                 Log In
//               </button>
//               <button type="button" className="h-10 cursor-pointer rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]">
//                 Sign Up
//               </button>
//             </div>

//             <button type="button" onClick={handleClose} className="mt-3 w-full cursor-pointer text-xs text-[#45484D] hover:text-[#202124]">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default SupplierDetailPage;









"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, MapPin, MessageCircle, PackageSearch, Phone, Shield, ShieldCheck, Star, Store, Truck, X } from "lucide-react";
import ProductGrid from "../../../../component/materials/ProductGrid/ProductGrid";
import { getSupplier } from "../supplierData";
import { allProducts } from "../../materials/materialData";

const tabs = [
  { id: 1, label: "Overview", href: "#overview" },
  { id: 2, label: "Category", href: "#category" },
  { id: 3, label: "Products", href: "#products" },
];

const SupplierDetailPage = () => {
  const { slug } = useParams(); // link se slug, e.g. modern-builders-mart
  const [action, setAction] = useState(null); // "message" ya "call" = login box khula hai
  const [selected, setSelected] = useState("All Products"); // products ka category chip
  const supplier = getSupplier(slug);

  // Supplier na mile to message
  if (!supplier) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F4F4F2] px-4 text-center">
        <Store className="h-10 w-10 text-[#A7ADB4]" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-[#202124]">Supplier not found</h1>
        <Link
          href="/suppliers"
          className="rounded-lg bg-[#FDC716] px-6 py-2.5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
        >
          Back to Suppliers
        </Link>
      </main>
    );
  }

  const { name, initials, rating, reviews, description, tags, image, verified, address, hours, delivery } = supplier;
  const BadgeIcon = verified ? ShieldCheck : Shield;

  // Is supplier ke products (materialData se, supplier ke naam se)
  const items = allProducts.filter((p) => p.supplier === name);
  const productCategories = [...new Set(items.map((p) => p.category))];
  const categoryNames = productCategories.length ? productCategories : tags;
  const visible = selected === "All Products" ? items : items.filter((p) => p.category === selected);

  const infoList = [
    { id: 1, icon: MapPin, label: "Address", value: address },
    { id: 2, icon: Clock, label: "Opening hours", value: hours },
    { id: 3, icon: Truck, label: "Delivery", value: delivery },
  ];

  const handleClose = () => setAction(null);

  return (
    <main className="bg-[#F4F4F2] pb-14">
      {/* Hero: bara banner, supplier ki apni shop image */}
      <section className="relative h-56 overflow-hidden bg-[#202124] sm:h-72 lg:h-96">
        <Image src={image} alt={`${name} shop (demo image)`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#202124]/40" />
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header card: white, hero ke neeche thoda overlap */}
        <section className="relative z-10 -mt-10 rounded-2xl border border-[#FDE9A0] bg-[#FFFBEA] p-4 shadow-md sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#FDC716] bg-[#202124] text-lg font-bold text-white sm:h-20 sm:w-20 sm:text-xl">
                {initials}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-extrabold text-[#202124] sm:text-xl">{name}</h1>
                  <span
                    className={`flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-xs font-medium ${
                      verified ? "text-blue-600" : "text-[#565553]"
                    }`}
                  >
                    <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {verified ? "Verified (demo)" : "Unverified"}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#45484D] sm:text-sm">{tags.join(", ")}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-[#45484D] sm:text-sm">
                  <Star className="h-4 w-4 shrink-0 fill-[#FDC716] text-[#FDC716]" aria-hidden="true" />
                  <b className="text-[#202124]">{rating}</b> ({reviews}+ reviews, demo)
                </p>
                <p className="mt-1 flex items-start gap-1 text-xs text-[#45484D]">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {address}
                </p>
              </div>
            </div>

            {/* WhatsApp / Call Now: dono par login maangta hai */}
            <div className="flex w-full shrink-0 flex-col gap-2 md:w-56">
              <button
                type="button"
                onClick={() => setAction("message")}
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setAction("call")}
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
              >
                <Phone size={16} aria-hidden="true" />
                Call Now
              </button>
            </div>
          </div>
        </section>

        {/* Tabs (page ke sections par le jate hain) */}
        <nav aria-label="Supplier sections" className="mt-6 flex gap-6 border-b border-[#E2E4E7]">
          {tabs.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className="-mb-px border-b-2 border-transparent px-1 pb-3 text-sm font-semibold text-[#45484D] transition-colors hover:border-[#FDC716] hover:text-[#202124]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Overview */}
        <section id="overview" className="scroll-mt-28 pt-8">
          <h2 className="border-l-4 border-[#FDC716] pl-3 text-lg font-extrabold text-[#202124]">Overview</h2>
          <p className="mt-4 text-sm font-bold uppercase text-[#202124]">Welcome to {name}</p>
          <p className="mt-2 text-sm leading-6 text-[#45484D]">{description}</p>
          <p className="mt-2 text-xs text-[#45484D]">Sample shop profile shown for demonstration purposes.</p>

          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {infoList.map(({ id, icon: InfoIcon, label, value }) => (
              <li key={id} className="flex items-start gap-3 rounded-lg border border-[#E2E4E7] bg-white p-3">
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#45484D]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs text-[#A7ADB4]">{label}</p>
                  <p className="break-words text-sm text-[#202124]">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Category */}
        <section id="category" className="scroll-mt-28 pt-8">
          <div className="overflow-hidden rounded-xl border border-[#E2E4E7] bg-white">
            <h2 className="bg-[#FDF3C8] px-5 py-3 text-base font-bold text-[#202124]">Category</h2>
            <ul className="grid gap-2 p-5 text-sm text-[#45484D] sm:grid-cols-2 lg:grid-cols-3">
              {categoryNames.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FDC716]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-28 pt-10">
          <h2 className="text-center text-xl font-extrabold text-[#202124] sm:text-2xl">
            Products by <span className="text-[#E5B20F]">{name}</span>
          </h2>

          {/* Category chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["All Products", ...productCategories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={selected === c}
                onClick={() => setSelected(c)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  selected === c
                    ? "border-[#FDC716] bg-[#FDC716] text-[#202124]"
                    : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#FDC716]/25"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {visible.length === 0 ? (
              <p className="flex items-center gap-2 rounded-xl border border-[#E2E4E7] bg-white p-6 text-sm text-[#45484D]">
                <PackageSearch size={18} aria-hidden="true" />
                No sample products listed for this supplier yet.
              </p>
            ) : (
              <ProductGrid items={visible} cols="grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" />
            )}
          </div>

          <p className="mt-4 text-center text-xs text-[#45484D]">All supplier information is for demo purposes only.</p>
        </section>
      </div>

      {/* Login box (WhatsApp / Call Now dabane par) */}
      {action && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Login required"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="absolute right-3 top-3 cursor-pointer text-[#45484D] hover:text-[#202124]"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-extrabold text-[#202124]">Login required</h2>
            <p className="mt-2 text-sm text-[#45484D]">
              Please log in to {action === "message" ? "message" : "call"} {name}.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" className="h-10 cursor-pointer rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]">
                Log In
              </button>
              <button type="button" className="h-10 cursor-pointer rounded-lg border border-[#202124] bg-white text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]">
                Sign Up
              </button>
            </div>

            <button type="button" onClick={handleClose} className="mt-3 w-full cursor-pointer text-xs text-[#45484D] hover:text-[#202124]">
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SupplierDetailPage;