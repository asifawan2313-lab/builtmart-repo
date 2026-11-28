// // "use client";

// // import { useState } from "react";
// // import {
// //   Image as ImageIcon,
// //   ArrowUpDown,
// //   ChevronLeft,
// //   ChevronRight,
// //   X,
// // } from "lucide-react";

// // /* ============================================================
// //    1. DATA
// //    ============================================================ */

// // const tabs = ["All", "New", "Reused"];

// // const newMaterials = [
// //   {
// //     id: 1,
// //     name: "Red Clay Bricks (A-Class)",
// //     category: "Category removed",
// //     supplier: "Brick House",
// //     price: "Rs 16/brick",
// //     stock: "In Stock",
// //     status : "deactive",
// //     complaints: "None",
// //   },
// //   {
// //     id: 2,
// //     name: "DG Khan Cement OPC",
// //     category: "Cement",
// //     supplier: "Sheikh Traders",
// //     price: "Rs 1,350/bag",
// //     stock: "In Stock",
// //     status : "deactive",
// //     complaints: "None",
// //   },
// //   {
// //     id: 3,
// //     name: "Grade 60 Steel Saria 12mm",
// //     category: "Steel / Saria",
// //     supplier: "Sheikh Traders",
// //     price: "Rs 265/kg",
// //     stock: "In Stock",
// //     status : "deactive",
// //     complaints: "None",
// //   },
// //   {
// //     id: 7,
// //     name: "Weather Shield Paint 16L",
// //     category: "Paint",
// //     supplier: "Sheikh Traders",
// //     price: "Rs 14,500/drum",
// //     stock: "In Stock",
// //     status : "deactive",
// //     complaints: "None",
// //   },
// //   {
// //     id: 8,
// //     name: "Ravi Sand (Truck)",
// //     category: "Sand / Rait",
// //     supplier: "Sheikh Traders",
// //     price: "Rs 28,000/truck",
// //     stock: "In Stock",
// //     status : "deactive",
// //     complaints: "None",
// //   },
// //   {
// //     id: 9,
// //     name: "Floor Tiles 2x2",
// //     category: "Tiles",
// //     supplier: "Tile City",
// //     price: "Rs 95/sq ft",
// //     stock: "In Stock",
// //     status : "active",
// //     complaints: "None",
// //   },
// // ];

// // const reusedMaterials = [
// //   {
// //     id: 4,
// //     name: "Used Wooden Doors (set of 4)",
// //     category: "Doors & Windows",
// //     supplier: "Ahmed Raza",
// //     price: "Rs 9,000/door",
// //     stock: "Available",
// //     status : "active",
// //     complaints: "None",
// //   },
// //   {
// //     id: 5,
// //     name: "Leftover Porcelain Tiles",
// //     category: "Tiles",
// //     supplier: "Brick House",
// //     price: "Rs 110/sq ft",
// //     stock: "Available",
// //     status : "active",
// //     complaints: "None",
// //   },
// //   {
// //     id: 6,
// //     name: "Salvaged Iron Window Grills",
// //     category: "Grills & Iron Railings",
// //     supplier: "Bilal Khan",
// //     price: "Rs 2,500/piece",
// //     stock: "Available",
// //     status : "active",
// //     complaints: "None",
// //   },
// // ];

// // // Har tab ka apna dataset (seedha lookup, koi filter nahi)
// // const materialsByTab = {
// //   All: [...newMaterials, ...reusedMaterials],
// //   New: newMaterials,
// //   Reused: reusedMaterials,
// // };

// // // Active / Unavailable ki shuruati halat (id -> true/false)
// // const initialActive = Object.fromEntries(
// //   materialsByTab.All.map((m) => [m.id, m.status === "active"]),
// // );

// // const headings = [
// //   "Material Name",
// //   "Category",
// //   "Supplier",
// //   "Price",
// //   "Availability",
// //   "Listing Status",
// //   "Complaints / Reports",
// //   "Actions",
// // ];
// // const sortable = ["Material Name", "Price"];
// // const perPage = 8; // ek page par kitne rows

// // const btn =
// //   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// // /* ============================================================
// //    MATERIAL DATA ROW + USKE APNE MODALS (View, Deactivate)
// //    ============================================================ */

// // const MaterialDataRow = ({ m, isActive, onToggle }) => {
// //   const [showView, setShowView] = useState(false);
// //   const [showDeactivate, setShowDeactivate] = useState(false);
// //   const [reason, setReason] = useState("");

// //   // View: isi row ka modal khulta hai
// //   const handleViewClick = () => setShowView(true);
// //   const handleViewClose = () => setShowView(false);

// //   // Active listing par Deactivate = reason wala modal, band listing par Activate = seedha active
// //   const handleToggleClick = () => {
// //     if (isActive) {
// //       setReason("");
// //       setShowDeactivate(true);
// //     } else {
// //       onToggle(m.id);
// //     }
// //   };
// //   const handleDeactivateClose = () => setShowDeactivate(false);

// //   // Reason likhe bagair confirm nahi hota (reason backend mein baad mein jayega)
// //   const handleDeactivateConfirm = (e) => {
// //     e.preventDefault();
// //     if (!reason.trim()) return;
// //     onToggle(m.id);
// //     setShowDeactivate(false);
// //   };

// //   // Row aur View modal dono mein aik hi status badge
// //   const statusBadge = (
// //     <span
// //       className={`bmMaterialStatusBadge rounded-full px-2.5 py-1 text-xs ring-1 ${
// //         isActive
// //           ? "bg-green-50 text-green-700 ring-green-200"
// //           : "bg-gray-100 text-gray-600 ring-gray-200"
// //       }`}
// //     >
// //       {isActive ? "Active" : "Unavailable"}
// //     </span>
// //   );

// //   return (
// //     <>
// //       <tr
// //         className={`border-t border-[color:var(--border-color)] ${
// //           m.category === "Category removed" ? "bg-yellow-50" : ""
// //         }`}
// //       >
// //         <td className="px-4 py-3">
// //           <div className="flex items-center gap-3">
// //             <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
// //               <ImageIcon size={20} />
// //             </span>
// //             <span className="font-medium text-[color:var(--primary-text)]">
// //               {m.name}
// //             </span>
// //           </div>
// //         </td>
// //         <td className="px-4 py-3 text-[color:var(--primary-text)]">
// //           {m.category}
// //         </td>
// //         <td className="px-4 py-3 text-[color:var(--primary-text)]">
// //           {m.supplier}
// //         </td>
// //         <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.price}</td>
// //         <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.stock}</td>
// //         <td className="px-4 py-3">{statusBadge}</td>
// //         <td className="px-4 py-3 text-[color:var(--primary-text)]">
// //           {m.complaints}
// //         </td>
// //         <td className="px-4 py-3">
// //           <div className="flex gap-2">
// //             <button
// //               type="button"
// //               onClick={handleViewClick}
// //               className={"bmMaterialViewButton cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"}
// //             >
// //               View
// //             </button>
// //             <button
// //               type="button"
// //               onClick={handleToggleClick}
// //               className={"bmMaterialToggleButton cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"}
// //             >
// //               {isActive ? "Deactivate" : "Activate"}
// //             </button>
// //           </div>
// //         </td>
// //       </tr>

// //       {/* Is row ka apna View modal */}
// //       {showView && (
// //         <tr>
// //           <td colSpan={8} className="p-0">
// //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
// //               <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-6 shadow-xl">
// //                 <button
// //                   type="button"
// //                   aria-label="Close"
// //                   onClick={handleViewClose}
// //                   className="absolute right-4 top-4 cursor-pointer rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
// //                 >
// //                   <X size={18} />
// //                 </button>

// //                 <h2 className="pr-8 text-lg font-semibold text-[color:var(--primary-text)]">
// //                   {m.name}
// //                 </h2>

// //                 <div className="mt-4 flex h-52 w-full items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
// //                   <ImageIcon size={40} />
// //                 </div>

// //                 <div className="mt-5 space-y-4 text-[color:var(--primary-text)]">
// //                   <p>{m.category}</p>
// //                   <p>Supplier: {m.supplier}</p>
// //                   <p>
// //                     {m.price} · {m.stock}
// //                   </p>
// //                   <div className="flex">{statusBadge}</div>
// //                 </div>

// //                 <h3 className="mt-5 font-semibold text-[color:var(--primary-text)]">
// //                   Complaints &amp; policy violations
// //                 </h3>
// //                 <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
// //                   {m.complaints === "None" ? "No reports received." : m.complaints}
// //                 </p>

// //                 <div className="mt-6 flex justify-end">
// //                   <button
// //                     type="button"
// //                     onClick={handleViewClose}
// //                     className={`${btn} cursor-pointer px-4 py-2 text-sm`}
// //                   >
// //                     Close
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </td>
// //         </tr>
// //       )}

// //       {/* Is row ka apna Deactivate modal */}
// //       {showDeactivate && (
// //         <tr>
// //           <td colSpan={8} className="p-0">
// //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
// //               <form
// //                 onSubmit={handleDeactivateConfirm}
// //                 className="relative w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-6 shadow-xl"
// //               >
// //                 <button
// //                   type="button"
// //                   aria-label="Close"
// //                   onClick={handleDeactivateClose}
// //                   className="absolute right-4 top-4 cursor-pointer rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
// //                 >
// //                   <X size={18} />
// //                 </button>

// //                 <h2 className="pr-8 text-lg font-semibold text-[color:var(--primary-text)]">
// //                   Deactivate listing
// //                 </h2>
// //                 <p className="mt-3 text-sm text-[color:var(--primary-text)]">
// //                   {m.name} will no longer be available for sale.
// //                 </p>

// //                 <label
// //                   htmlFor={`deactivate-reason-${m.id}`}
// //                   className="mt-5 block text-xs text-[color:var(--primary-text)]"
// //                 >
// //                   Deactivation reason (required)
// //                 </label>
// //                 <textarea
// //                   id={`deactivate-reason-${m.id}`}
// //                   rows={3}
// //                   value={reason}
// //                   onChange={(e) => setReason(e.target.value)}
// //                   className="mt-1.5 w-full resize-y rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] focus:ring-1 focus:ring-[color:var(--primary-yellow)]"
// //                 />

// //                 <div className="mt-4 flex flex-wrap justify-end gap-3">
// //                   <button
// //                     type="button"
// //                     onClick={handleDeactivateClose}
// //                     className={`${btn} cursor-pointer px-4 py-2 text-sm`}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={!reason.trim()}
// //                     className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
// //                   >
// //                     Confirm Deactivation
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </td>
// //         </tr>
// //       )}
// //     </>
// //   );
// // };

// // /* ============================================================
// //    2. MATERIAL MANAGEMENT
// //    ============================================================ */

// // const MaterialManagement = () => {
// //   const [tab, setTab] = useState("All"); // All / New / Reused
// //   const [activeMap, setActiveMap] = useState(initialActive);
// //   const [page, setPage] = useState(1);

// //   // Tab badalne par pehle page par wapas
// //   const handleTabClick = (name) => {
// //     setTab(name);
// //     setPage(1);
// //   };

// //   // Active <-> Unavailable badalna
// //   const handleToggleClick = (id) => {
// //     setActiveMap({ ...activeMap, [id]: !activeMap[id] });
// //   };

// //   // Is tab ka dataset
// //   const list = materialsByTab[tab];

// //   // Pages
// //   const totalPages = Math.max(1, Math.ceil(list.length / perPage));
// //   const current = Math.min(page, totalPages);

// //   // Sirf is page ke rows
// //   const rows = list.slice((current - 1) * perPage, current * perPage);

// //   return (
// //     <section className="bmMaterialSection p-4 sm:p-6 lg:p-8">
// //       {/* Heading */}
// //       <h1 className="bmMaterialHeadingText text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
// //         Material Management
// //       </h1>

// //       {/* Tabs: All / New / Reused */}
// //       <div className="bmMaterialTabRow mt-5 inline-flex rounded-lg bg-[var(--off-white-background)] p-1">
// //         {tabs.map((t) => (
// //           <button
// //             key={t}
// //             type="button"
// //             onClick={() => handleTabClick(t)}
// //             className={`bmMaterialTabButton rounded-md px-4 py-1.5 text-sm transition-colors ${
// //               tab === t
// //                 ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
// //                 : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
// //             }`}
// //           >
// //             {t}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Card */}
// //       <div className="bmMaterialCard mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
// //         {/* Table (chhoti screen par sirf table scroll hoti hai, page nahi) */}
// //         <div className="overflow-x-auto">
// //           <table className="bmMaterialTable w-full min-w-[1100px] text-left text-sm">
// //             <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
// //               <tr>
// //                 {headings.map((h) => (
// //                   <th key={h} className="px-4 py-3 font-medium">
// //                     <span className="inline-flex items-center gap-1">
// //                       {h}
// //                       {sortable.includes(h) && <ArrowUpDown size={12} />}
// //                     </span>
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {rows.map((m) => {
// //                 return (
// //                   <MaterialDataRow
// //                     key={m.id}
// //                     m={m}
// //                     isActive={activeMap[m.id]}
// //                     onToggle={handleToggleClick}
// //                   />
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Footer: records + pages */}
// //         <div className="bmMaterialFooter flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
// //           <span>{list.length} records</span>
// //           <div className="flex items-center gap-3">
// //             <button
// //               type="button"
// //               aria-label="Previous page"
// //               disabled={current === 1}
// //               onClick={() => setPage(current - 1)}
// //               className="bmMaterialPrevButton disabled:opacity-30"
// //             >
// //               <ChevronLeft size={16} />
// //             </button>
// //             <span>
// //               Page {current} / {totalPages}
// //             </span>
// //             <button
// //               type="button"
// //               aria-label="Next page"
// //               disabled={current === totalPages}
// //               onClick={() => setPage(current + 1)}
// //               className="bmMaterialNextButton disabled:opacity-30"
// //             >
// //               <ChevronRight size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // /* ============================================================
// //    PAGE
// //    ============================================================ */

// // const MaterialsPage = () => <MaterialManagement />;

// // export default MaterialsPage;




// "use client";

// import { useState } from "react";
// import {
//   Image as ImageIcon,
//   ArrowUpDown,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";

// /* ============================================================
//    1. DATA
//    ============================================================ */

// const tabs = ["All", "New", "Reused"];

// const newMaterials = [
//   {
//     id: 1,
//     name: "Red Clay Bricks (A-Class)",
//     category: "Category removed",
//     supplier: "Brick House",
//     price: "Rs 16/brick",
//     stock: "In Stock",
//     status : "deactive",
//     complaints: "None",
//   },
//   {
//     id: 2,
//     name: "DG Khan Cement OPC",
//     category: "Cement",
//     supplier: "Sheikh Traders",
//     price: "Rs 1,350/bag",
//     stock: "In Stock",
//     status : "deactive",
//     complaints: "None",
//   },
//   {
//     id: 3,
//     name: "Grade 60 Steel Saria 12mm",
//     category: "Steel / Saria",
//     supplier: "Sheikh Traders",
//     price: "Rs 265/kg",
//     stock: "In Stock",
//     status : "deactive",
//     complaints: "None",
//   },
//   {
//     id: 7,
//     name: "Weather Shield Paint 16L",
//     category: "Paint",
//     supplier: "Sheikh Traders",
//     price: "Rs 14,500/drum",
//     stock: "In Stock",
//     status : "deactive",
//     complaints: "None",
//   },
//   {
//     id: 8,
//     name: "Ravi Sand (Truck)",
//     category: "Sand / Rait",
//     supplier: "Sheikh Traders",
//     price: "Rs 28,000/truck",
//     stock: "In Stock",
//     status : "deactive",
//     complaints: "None",
//   },
//   {
//     id: 9,
//     name: "Floor Tiles 2x2",
//     category: "Tiles",
//     supplier: "Tile City",
//     price: "Rs 95/sq ft",
//     stock: "In Stock",
//     status : "active",
//     complaints: "None",
//   },
// ];

// const reusedMaterials = [
//   {
//     id: 4,
//     name: "Used Wooden Doors (set of 4)",
//     category: "Doors & Windows",
//     supplier: "Ahmed Raza",
//     price: "Rs 9,000/door",
//     stock: "Available",
//     status : "active",
//     complaints: "None",
//   },
//   {
//     id: 5,
//     name: "Leftover Porcelain Tiles",
//     category: "Tiles",
//     supplier: "Brick House",
//     price: "Rs 110/sq ft",
//     stock: "Available",
//     status : "active",
//     complaints: "None",
//   },
//   {
//     id: 6,
//     name: "Salvaged Iron Window Grills",
//     category: "Grills & Iron Railings",
//     supplier: "Bilal Khan",
//     price: "Rs 2,500/piece",
//     stock: "Available",
//     status : "active",
//     complaints: "None",
//   },
// ];

// // Har tab ka apna dataset (seedha lookup, koi filter nahi)
// const materialsByTab = {
//   All: [...newMaterials, ...reusedMaterials],
//   New: newMaterials,
//   Reused: reusedMaterials,
// };

// // Active / Unavailable ki shuruati halat (id -> true/false)
// const initialActive = Object.fromEntries(
//   materialsByTab.All.map((m) => [m.id, m.status === "active"]),
// );

// const headings = [
//   "Material Name",
//   "Category",
//   "Supplier",
//   "Price",
//   "Availability",
//   "Listing Status",
//   "Complaints / Reports",
//   "Actions",
// ];
// const sortable = ["Material Name", "Price"];
// const perPage = 8; // ek page par kitne rows

// const btn =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
// const fieldClass =
//   "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] focus:ring-1 focus:ring-[var(--primary-yellow)]";

// /* ============================================================
//    2. Popup (overlay + X button)
//    ============================================================ */

// const ModalShell = ({ size = "max-w-md", onClose, children }) => (
//   <div
//     onClick={onClose}
//     className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
//   >
//     <div
//       role="dialog"
//       aria-modal="true"
//       onClick={(e) => e.stopPropagation()}
//       className={`relative my-auto max-h-[92vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
//     >
//       <button
//         type="button"
//         onClick={onClose}
//         aria-label="Close"
//         className="absolute right-4 top-4 cursor-pointer text-[color:var(--primary-text)] hover:opacity-70"
//       >
//         <X size={18} />
//       </button>
//       {children}
//     </div>
//   </div>
// );

// /* ============================================================
//    3. Table ki separate row component (apne View + Deactivate modal ke saath)
//    ============================================================ */

// const MaterialDataRow = ({
//   m,
//   isActive,
//   onView,
//   onToggle,
//   viewId,
//   deactivateId,
//   reason,
//   setReason,
//   handleCloseView,
//   handleCloseDeactivate,
//   handleConfirmDeactivate,
// }) => {
//   // Row aur View modal dono mein aik hi status badge
//   const statusBadge = (
//     <span
//       className={`bmMaterialStatusBadge rounded-full px-2.5 py-1 text-xs ring-1 ${
//         isActive
//           ? "bg-green-50 text-green-700 ring-green-200"
//           : "bg-gray-100 text-gray-600 ring-gray-200"
//       }`}
//     >
//       {isActive ? "Active" : "Unavailable"}
//     </span>
//   );

//   return (
//     <tr
//       className={`border-t border-[color:var(--border-color)] ${
//         m.category === "Category removed" ? "bg-yellow-50" : ""
//       }`}
//     >
//       <td className="px-4 py-3">
//         <div className="flex items-center gap-3">
//           <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
//             <ImageIcon size={20} />
//           </span>
//           <span className="font-medium text-[color:var(--primary-text)]">
//             {m.name}
//           </span>
//         </div>
//       </td>
//       <td className="px-4 py-3 text-[color:var(--primary-text)]">
//         {m.category}
//       </td>
//       <td className="px-4 py-3 text-[color:var(--primary-text)]">
//         {m.supplier}
//       </td>
//       <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.price}</td>
//       <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.stock}</td>
//       <td className="px-4 py-3">{statusBadge}</td>
//       <td className="px-4 py-3 text-[color:var(--primary-text)]">
//         {m.complaints}
//       </td>
//       <td className="px-4 py-3">
//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => onView(m.id)}
//             className={"bmMaterialViewButton cursor-pointer " + btn}
//           >
//             View
//           </button>
//           <button
//             type="button"
//             onClick={() => onToggle(m.id)}
//             className={"bmMaterialToggleButton cursor-pointer " + btn}
//           >
//             {isActive ? "Deactivate" : "Activate"}
//           </button>
//         </div>

//         {/* Is row ka apna View modal */}
//         {viewId === m.id && (
//           <ModalShell size="max-w-2xl" onClose={handleCloseView}>
//             <h2 className="pr-8 text-lg font-semibold text-[color:var(--primary-text)]">
//               {m.name}
//             </h2>

//             <div className="mt-4 flex h-52 w-full items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
//               <ImageIcon size={40} />
//             </div>

//             <div className="mt-5 space-y-4 text-[color:var(--primary-text)]">
//               <p>{m.category}</p>
//               <p>Supplier: {m.supplier}</p>
//               <p>
//                 {m.price} · {m.stock}
//               </p>
//               <div className="flex">{statusBadge}</div>
//             </div>

//             <h3 className="mt-5 font-semibold text-[color:var(--primary-text)]">
//               Complaints &amp; policy violations
//             </h3>
//             <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
//               {m.complaints === "None" ? "No reports received." : m.complaints}
//             </p>

//             <div className="mt-6 flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleCloseView}
//                 className={`cursor-pointer ${btn} px-4 py-2 text-sm`}
//               >
//                 Close
//               </button>
//             </div>
//           </ModalShell>
//         )}

//         {/* Is row ka apna Deactivate modal */}
//         {deactivateId === m.id && (
//           <ModalShell onClose={handleCloseDeactivate}>
//             <form onSubmit={handleConfirmDeactivate}>
//               <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
//                 Deactivate listing
//               </h2>

//               <p className="mt-3 text-sm text-[color:var(--primary-text)]">
//                 {m.name} will no longer be available for sale.
//               </p>

//               <label
//                 htmlFor="bm-deactivate-reason"
//                 className="mt-4 block text-xs text-[color:var(--secondary-text)]"
//               >
//                 Deactivation reason (required)
//               </label>

//               <textarea
//                 id="bm-deactivate-reason"
//                 rows={3}
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 className={`${fieldClass} mt-1`}
//               />

//               <div className="mt-5 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={handleCloseDeactivate}
//                   className={`cursor-pointer ${btn} px-4 py-2 text-sm`}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={!reason.trim()}
//                   className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm text-[color:var(--white-cards)] hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
//                 >
//                   Confirm Deactivation
//                 </button>
//               </div>
//             </form>
//           </ModalShell>
//         )}
//       </td>
//     </tr>
//   );
// };

// /* ============================================================
//    4. MATERIAL MANAGEMENT
//    ============================================================ */

// const MaterialManagement = () => {
//   const [tab, setTab] = useState("All"); // All / New / Reused
//   const [activeMap, setActiveMap] = useState(initialActive);
//   const [page, setPage] = useState(1);

//   const [viewId, setViewId] = useState(null);
//   const [deactivateId, setDeactivateId] = useState(null);
//   const [reason, setReason] = useState("");

//   // Tab badalne par pehle page par wapas
//   const handleTabClick = (name) => {
//     setTab(name);
//     setPage(1);
//   };

//   // View
//   const handleViewClick = (id) => setViewId(id);
//   const handleCloseView = () => setViewId(null);

//   // Active ho to Deactivate (reason wala modal), warna seedha Activate
//   const handleToggleClick = (id) => {
//     if (activeMap[id]) {
//       setReason("");
//       setDeactivateId(id);
//     } else {
//       setActiveMap({ ...activeMap, [id]: true });
//     }
//   };
//   const handleCloseDeactivate = () => setDeactivateId(null);

//   // Reason likhe bagair confirm nahi hota
//   const handleConfirmDeactivate = (e) => {
//     e.preventDefault();
//     if (!reason.trim()) return;
//     setActiveMap({ ...activeMap, [deactivateId]: false });
//     setDeactivateId(null);
//   };

//   // Is tab ka dataset
//   const list = materialsByTab[tab];

//   // Pages
//   const totalPages = Math.max(1, Math.ceil(list.length / perPage));
//   const current = Math.min(page, totalPages);

//   // Sirf is page ke rows
//   const rows = list.slice((current - 1) * perPage, current * perPage);

//   return (
//     <section className="bmMaterialSection p-4 sm:p-6 lg:p-8">
//       {/* Heading */}
//       <h1 className="bmMaterialHeadingText text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
//         Material Management
//       </h1>

//       {/* Tabs: All / New / Reused */}
//       <div className="bmMaterialTabRow mt-5 inline-flex rounded-lg bg-[var(--off-white-background)] p-1">
//         {tabs.map((t) => (
//           <button
//             key={t}
//             type="button"
//             onClick={() => handleTabClick(t)}
//             className={`bmMaterialTabButton rounded-md px-4 py-1.5 text-sm transition-colors ${
//               tab === t
//                 ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
//                 : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* Card */}
//       <div className="bmMaterialCard mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
//         {/* Table (chhoti screen par sirf table scroll hoti hai, page nahi) */}
//         <div className="overflow-x-auto">
//           <table className="bmMaterialTable w-full min-w-[1100px] text-left text-sm">
//             <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
//               <tr>
//                 {headings.map((h) => (
//                   <th key={h} className="px-4 py-3 font-medium">
//                     <span className="inline-flex items-center gap-1">
//                       {h}
//                       {sortable.includes(h) && <ArrowUpDown size={12} />}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {rows.map((m) => (
//                 <MaterialDataRow
//                   key={m.id}
//                   m={m}
//                   isActive={activeMap[m.id]}
//                   onView={handleViewClick}
//                   onToggle={handleToggleClick}
//                   viewId={viewId}
//                   deactivateId={deactivateId}
//                   reason={reason}
//                   setReason={setReason}
//                   handleCloseView={handleCloseView}
//                   handleCloseDeactivate={handleCloseDeactivate}
//                   handleConfirmDeactivate={handleConfirmDeactivate}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer: records + pages */}
//         <div className="bmMaterialFooter flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
//           <span>{list.length} records</span>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               aria-label="Previous page"
//               disabled={current === 1}
//               onClick={() => setPage(current - 1)}
//               className="bmMaterialPrevButton disabled:opacity-30"
//             >
//               <ChevronLeft size={16} />
//             </button>
//             <span>
//               Page {current} / {totalPages}
//             </span>
//             <button
//               type="button"
//               aria-label="Next page"
//               disabled={current === totalPages}
//               onClick={() => setPage(current + 1)}
//               className="bmMaterialNextButton disabled:opacity-30"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ============================================================
//    PAGE
//    ============================================================ */

// const MaterialsPage = () => <MaterialManagement />;

// export default MaterialsPage;




"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight,ArrowUpDown} from "lucide-react";
import BmAdminMaterialDataRow from "../../../component/admin/material-manegement/BmAdminMaterialDataRow.js";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader.js"

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_MATERIAL_TABS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "reused", label: "Reused" },
];

const BM_MATERIALS = [
  { id: 1, type: "new", name: "Red Clay Bricks (A-Class)", category: "Category removed", supplier: "Brick House", price: "Rs 16/brick", availability: "In Stock", status: "unavailable", complaints: 0 },
  { id: 2, type: "new", name: "DG Khan Cement OPC", category: "Cement", supplier: "Sheikh Traders", price: "Rs 1,350/bag", availability: "In Stock", status: "unavailable", complaints: 0 },
  { id: 3, type: "new", name: "Floor Tiles 2x2", category: "Tiles", supplier: "Tile City", price: "Rs 95/sq ft", availability: "In Stock", status: "active", complaints: 0 },
  { id: 4, type: "reused", name: "Used Wooden Doors (set of 4)", category: "Doors & Windows", supplier: "Ahmed Raza", price: "Rs 9,000/door", availability: "Available", status: "active", complaints: 0 },
  { id: 5, type: "reused", name: "Leftover Porcelain Tiles", category: "Tiles", supplier: "Brick House", price: "Rs 110/sq ft", availability: "Available", status: "active", complaints: 0 },
];



const BmAdminKycTableheader = ({ role }) => {
  const isSupplier = role === "supplier";

  // Headings role ke hisaab se yahin condition laga kar manage hoti hain
  const materialHeadings = [
    { label: "Material Name", sort: true },
    { label: "Category" },
    { label: "Supplier" },
    { label: "Price", sort: true },
    { label: "Availability" },
    { label: "Listing Status" },
    { label: "Complaints / Reports" },
    { label: "Actions" },
  ];

  const categoryHeadings = [
    { label: "Category Image / File" },
    { label: "Category Name", sort: true },
    { label: "Description" },
    { label: "Number of Listings", sort: true },
    { label: "Status" },
    { label: "Actions" },
  ];

  const kycHeadings = [
    { label: isSupplier ? "Business Name" : "Rider Name", sort: true },
    { label: isSupplier ? "Category" : "Vehicle" },
    { label: "Email" },
    { label: "Phone Number" },
    { label: "Submission Date", sort: true },
    { label: isSupplier ? "KYC Status" : "Verification Status" },
    { label: "Actions" },
  ];

  const headingsByRole = {
    material: materialHeadings,
    category: categoryHeadings,
  };

  const headings = headingsByRole[role] || kycHeadings;

  return (
    <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
      <tr>
        {headings.map((heading) => (
          <th key={heading.label} className="px-4 py-3 font-medium">
            <span className="inline-flex items-center gap-1">
              {heading.label}
              {heading.sort && <ArrowUpDown size={11} />}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [tab, setTab] = useState("all");

  const visibleMaterials = BM_MATERIALS.reduce(
    (all, material) =>
      tab === "all" || material.type === tab ? [...all, material] : all,
    []
  );

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader title="Material Management" />

      {/* TABS */}
      <div className="mb-4 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
        {BM_MATERIAL_TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`rounded-md px-4 py-1.5 text-sm transition-colors ${
              tab === item.key
                ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <BmAdminKycTableheader role="material" />

            <tbody>
              {visibleMaterials.map((material) => (
                <BmAdminMaterialDataRow key={material.id} material={material} />
              ))}

              {visibleMaterials.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No materials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleMaterials.length}{" "}
            {visibleMaterials.length === 1 ? "record" : "records"}
          </span>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronLeft size={14} />
            </button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;