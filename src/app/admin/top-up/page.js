// // "use client";

// // import { useState } from "react";
// // import {
// //   ArrowUpDown,
// //   ChevronLeft,
// //   ChevronRight,
// //   Eye,
// //   FileText,
// //   Search,
// //   X,
// // } from "lucide-react";

// // /* ---------------- Dataset (demo) ---------------- */

// // const initialRequests = [
// //   {
// //     id: "TX-5006",
// //     name: "Sheikh Traders",
// //     type: "Supplier",
// //     amount: "Rs 10,000",
// //     method: "Bank Transfer",
// //     date: "2026-10-17",
// //     status: "Pending",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5006.pdf",
// //   },
// //   {
// //     id: "TX-5007",
// //     name: "Brick House",
// //     type: "Supplier",
// //     amount: "Rs 5,000",
// //     method: "JazzCash",
// //     date: "2026-10-18",
// //     status: "Pending",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5007.jpg",
// //   },
// //   {
// //     id: "TX-5008",
// //     name: "Brick House",
// //     type: "Supplier",
// //     amount: "Rs 8,000",
// //     method: "Bank Transfer",
// //     date: "2026-10-03",
// //     status: "Approved",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5008.pdf",
// //   },
// //   {
// //     id: "TX-5009",
// //     name: "Ali Raza",
// //     type: "Customer",
// //     amount: "Rs 3,000",
// //     method: "Easypaisa",
// //     date: "2026-10-19",
// //     status: "Pending",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5009.png",
// //   },
// //   {
// //     id: "TX-5010",
// //     name: "Hina Malik",
// //     type: "Customer",
// //     amount: "Rs 7,500",
// //     method: "JazzCash",
// //     date: "2026-10-12",
// //     status: "Approved",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5010.pdf",
// //   },
// //   {
// //     id: "TX-5011",
// //     name: "Usman Rider",
// //     type: "Rider",
// //     amount: "Rs 2,000",
// //     method: "Easypaisa",
// //     date: "2026-10-20",
// //     status: "Pending",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5011.jpg",
// //   },
// //   {
// //     id: "TX-5012",
// //     name: "Bilal Delivery",
// //     type: "Rider",
// //     amount: "Rs 4,500",
// //     method: "Bank Transfer",
// //     date: "2026-10-09",
// //     status: "Rejected",
// //     rejectionReason: "Receipt blurry hai",
// //     proofUrl: "/receipts/receipt_TX-5012.pdf",
// //   },
// //   {
// //     id: "TX-5013",
// //     name: "Sheikh Traders",
// //     type: "Supplier",
// //     amount: "Rs 15,000",
// //     method: "JazzCash",
// //     date: "2026-10-21",
// //     status: "Pending",
// //     rejectionReason: "—",
// //     proofUrl: "/receipts/receipt_TX-5013.png",
// //   },
// // ];

// // const tabs = ["All", "Customer", "Rider", "Supplier"];
// // const perPage = 8;

// // /* ---------------- Shared styles ---------------- */

// // const badgeColors = {
// //   Pending: "bg-orange-50 text-orange-600 ring-orange-200",
// //   Approved: "bg-green-50 text-green-700 ring-green-200",
// //   Rejected: "bg-red-50 text-red-600 ring-red-200",
// // };

// // const btn =
// //   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// // const yellowBtn =
// //   "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

// // const modalOutlineBtn = `inline-flex items-center gap-2 ${btn}`;

// // /* ---------------- Payment Proof ---------------- */

// // const proofName = (r) => r.proofUrl.split("/").pop();

// // const getProofType = (r) => {
// //   const extension = r.proofUrl.split(".").pop().toLowerCase();

// //   if (extension === "pdf") return "pdf";

// //   if (["jpg", "jpeg", "png", "webp"].includes(extension)) {
// //     return "image";
// //   }

// //   return "unknown";
// // };

// // /* ---------------- Shared modal shell ---------------- */

// // const ModalShell = ({ size, onClose, children }) => (
// //   <div
// //     onClick={onClose}
// //     className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
// //   >
// //     <div
// //       onClick={(e) => e.stopPropagation()}
// //       className={`relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
// //     >
// //       <button
// //         type="button"
// //         aria-label="Close"
// //         onClick={onClose}
// //         className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
// //       >
// //         <X size={18} />
// //       </button>

// //       {children}
// //     </div>
// //   </div>
// // );

// // /* ---------------- Table component ---------------- */

// // const TopUpTable = ({
// //   rows,
// //   showType,
// //   onPreview,
// //   onView,
// //   onApprove,
// //   onReject,
// // }) => {
// //   const headings = [
// //     "Request ID",
// //     "Name",
// //     ...(showType ? ["User Type"] : []),
// //     "Requested Amount",
// //     "Payment Method",
// //     "Payment Proof",
// //     "Request Date",
// //     "Status",
// //     "Actions",
// //   ];

// //   const sortable = ["Request ID", "Requested Amount", "Request Date"];

// //   const cell = "px-4 py-3 text-[color:var(--primary-text)]";

// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="w-full min-w-[1000px] text-left text-sm">
// //         <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
// //           <tr>
// //             {headings.map((h) => (
// //               <th key={h} className="px-4 py-3 font-medium">
// //                 <span className="inline-flex items-center gap-1">
// //                   {h}
// //                   {sortable.includes(h) && <ArrowUpDown size={12} />}
// //                 </span>
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {rows.map((r) => (
// //             <tr
// //               key={r.id}
// //               className="border-t border-[color:var(--border-color)]"
// //             >
// //               <td className={cell}>{r.id}</td>

// //               <td className={cell}>{r.name}</td>

// //               {showType && <td className={cell}>{r.type}</td>}

// //               <td className={cell}>{r.amount}</td>

// //               <td className={cell}>{r.method}</td>

// //               <td className="px-4 py-3">
// //                 <button
// //                   type="button"
// //                   onClick={() => onPreview(r)}
// //                   className="inline-flex items-center gap-1 text-xs text-[color:var(--primary-yellow)] hover:underline"
// //                 >
// //                   <FileText size={14} /> {proofName(r)}
// //                 </button>
// //               </td>

// //               <td className={cell}>{r.date}</td>

// //               <td className="px-4 py-3">
// //                 <span
// //                   className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[r.status]}`}
// //                 >
// //                   {r.status}
// //                 </span>
// //               </td>

// //               <td className="px-4 py-3">
// //                 <div className="flex gap-2">
// //                   <button
// //                     type="button"
// //                     onClick={() => onView(r)}
// //                     className={btn}
// //                   >
// //                     View
// //                   </button>

// //                   {r.status === "Pending" && (
// //                     <>
// //                       <button
// //                         type="button"
// //                         onClick={() => onApprove(r)}
// //                         className={yellowBtn}
// //                       >
// //                         Approve
// //                       </button>

// //                       <button
// //                         type="button"
// //                         onClick={() => onReject(r)}
// //                         className={btn}
// //                       >
// //                         Reject
// //                       </button>
// //                     </>
// //                   )}
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}

// //           {rows.length === 0 && (
// //             <tr>
// //               <td
// //                 colSpan={headings.length}
// //                 className="px-4 py-10 text-center text-[color:var(--secondary-text)]"
// //               >
// //                 Koi request nahi mili
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // /* ---------------- Page ---------------- */

// // const TopUpRequestsPage = () => {
// //   const [requests, setRequests] = useState(initialRequests);
// //   const [tab, setTab] = useState("All");
// //   const [search, setSearch] = useState("");
// //   const [status, setStatus] = useState("All");
// //   const [page, setPage] = useState(1);
// //   const [selectedId, setSelectedId] = useState(null);
// //   const [approveId, setApproveId] = useState(null);
// //   const [rejectId, setRejectId] = useState(null);
// //   const [reason, setReason] = useState("");

// //   const handleTab = (t) => {
// //     setTab(t);
// //     setPage(1);
// //   };

// //   const handleSearch = (e) => {
// //     setSearch(e.target.value);
// //     setPage(1);
// //   };

// //   const handleStatus = (e) => {
// //     setStatus(e.target.value);
// //     setPage(1);
// //   };

// //   // Receipt naye browser tab mein khulti hai
// //   const handlePreview = (r) => {
// //     window.open(r.proofUrl, "_blank", "noopener,noreferrer");
// //   };

// //   const handleViewClick = (r) => setSelectedId(r.id);

// //   const handleViewClose = () => setSelectedId(null);

// //   const handleApproveClick = (r) => setApproveId(r.id);

// //   const handleApproveCancel = () => setApproveId(null);

// //   const handleApproveConfirm = () => {
// //     setRequests(
// //       requests.map((r) =>
// //         r.id === approveId ? { ...r, status: "Approved" } : r
// //       )
// //     );

// //     setApproveId(null);
// //     setSelectedId(null);
// //   };

// //   const handleRejectClick = (r) => {
// //     setReason("");
// //     setRejectId(r.id);
// //   };

// //   const handleRejectCancel = () => setRejectId(null);

// //   const handleRejectConfirm = () => {
// //     setRequests(
// //       requests.map((r) =>
// //         r.id === rejectId
// //           ? {
// //               ...r,
// //               status: "Rejected",
// //               rejectionReason: reason.trim(),
// //             }
// //           : r
// //       )
// //     );

// //     setRejectId(null);
// //     setSelectedId(null);
// //   };

// //   const selected = requests.find((r) => r.id === selectedId);

// //   const approveRequest = requests.find((r) => r.id === approveId);

// //   const rejectRequest = requests.find((r) => r.id === rejectId);

// //   // Har tab ke records
// //   const counts = requests.reduce(
// //     (all, r) => ({
// //       ...all,
// //       [r.type]: (all[r.type] || 0) + 1,
// //       All: all.All + 1,
// //     }),
// //     { All: 0 }
// //   );

// //   // Tab + search + status
// //   const visible = requests.reduce((all, r) => {
// //     const matchTab = tab === "All" || r.type === tab;

// //     const matchSearch = `${r.id} ${r.name} ${r.type} ${r.method}`
// //       .toLowerCase()
// //       .includes(search.toLowerCase());

// //     const matchStatus = status === "All" || r.status === status;

// //     return matchTab && matchSearch && matchStatus ? [...all, r] : all;
// //   }, []);

// //   const totalPages = Math.max(1, Math.ceil(visible.length / perPage));

// //   const current = Math.min(page, totalPages);

// //   const rows = visible.slice(
// //     (current - 1) * perPage,
// //     current * perPage
// //   );

// //   const detailRows = selected
// //     ? [
// //         { label: "Name", value: selected.name },
// //         { label: "User Type", value: selected.type },
// //         { label: "Payment Method", value: selected.method },
// //         { label: "Amount", value: selected.amount },
// //         { label: "Date", value: selected.date },
// //         ...(selected.status === "Rejected"
// //           ? [
// //               {
// //                 label: "Rejection Reason",
// //                 value: selected.rejectionReason,
// //               },
// //             ]
// //           : []),
// //       ]
// //     : [];

// //   return (
// //     <section className="p-4 sm:p-6 lg:p-8">
// //       <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
// //         Top-Up Requests
// //       </h1>

// //       {/* Tabs */}
// //       <div className="mt-5 flex gap-2 overflow-x-auto">
// //         {tabs.map((t) => (
// //           <button
// //             key={t}
// //             type="button"
// //             onClick={() => handleTab(t)}
// //             className={`shrink-0 rounded-md border px-4 py-2 text-sm ${
// //               tab === t
// //                 ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
// //                 : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
// //             }`}
// //           >
// //             {t} ({counts[t] || 0})
// //           </button>
// //         ))}
// //       </div>

// //       <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
// //         {/* Search + status */}
// //         <div className="flex flex-col gap-3 p-3 sm:flex-row">
// //           <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
// //             <Search
// //               size={16}
// //               className="shrink-0 text-[color:var(--secondary-text)]"
// //             />

// //             <input
// //               type="text"
// //               value={search}
// //               onChange={handleSearch}
// //               placeholder="Search..."
// //               className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
// //             />
// //           </div>

// //           <select
// //             value={status}
// //             onChange={handleStatus}
// //             className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
// //           >
// //             <option>All</option>
// //             <option>Pending</option>
// //             <option>Approved</option>
// //             <option>Rejected</option>
// //           </select>
// //         </div>

// //         <TopUpTable
// //           rows={rows}
// //           showType={tab === "All"}
// //           onPreview={handlePreview}
// //           onView={handleViewClick}
// //           onApprove={handleApproveClick}
// //           onReject={handleRejectClick}
// //         />

// //         {/* Footer */}
// //         <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
// //           <span>{visible.length} records</span>

// //           <div className="flex items-center gap-3">
// //             <button
// //               type="button"
// //               aria-label="Previous page"
// //               disabled={current === 1}
// //               onClick={() => setPage(current - 1)}
// //               className="disabled:opacity-30"
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
// //               className="disabled:opacity-30"
// //             >
// //               <ChevronRight size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* View modal */}
// //       {selected && (
// //         <ModalShell size="max-w-xl" onClose={handleViewClose}>
// //           <h2 className="pr-8 text-2xl text-[color:var(--primary-text)]">
// //             {selected.id}
// //           </h2>

// //           <div
// //             className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ring-1 ${badgeColors[selected.status]}`}
// //           >
// //             {selected.status}
// //           </div>

// //           <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
// //             {detailRows.map((d) => (
// //               <div key={d.label}>
// //                 <p className="text-sm text-[color:var(--secondary-text)]">
// //                   {d.label}
// //                 </p>

// //                 <p className="text-sm text-[color:var(--primary-text)]">
// //                   {d.value}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Payment Proof Preview */}
// //           <div className="mt-5 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)]">
// //             {getProofType(selected) === "pdf" ? (
// //               <iframe
// //                 src={selected.proofUrl}
// //                 title={`Payment Proof ${selected.id}`}
// //                 className="h-[400px] w-full"
// //               />
// //             ) : getProofType(selected) === "image" ? (
// //               // eslint-disable-next-line @next/next/no-img-element
// //               <img
// //                 src={selected.proofUrl}
// //                 alt={`Payment Proof ${selected.id}`}
// //                 className="max-h-[400px] w-full object-contain"
// //               />
// //             ) : (
// //               <p className="p-5 text-sm text-[color:var(--secondary-text)]">
// //                 Unsupported file format.
// //               </p>
// //             )}
// //           </div>

// //           <div className="mt-4 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
// //             <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
// //               <FileText size={18} className="shrink-0" />

// //               <span className="break-all">{proofName(selected)}</span>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={() => handlePreview(selected)}
// //               className={modalOutlineBtn}
// //             >
// //               <Eye size={14} /> Preview
// //             </button>
// //           </div>

// //           {/* Last par buttons */}
// //           <div className="mt-5 flex flex-wrap justify-end gap-2">
// //             <button
// //               type="button"
// //               onClick={handleViewClose}
// //               className={btn}
// //             >
// //               Close
// //             </button>

// //             {selected.status === "Pending" && (
// //               <>
// //                 <button
// //                   type="button"
// //                   onClick={() => handleRejectClick(selected)}
// //                   className={btn}
// //                 >
// //                   Reject
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={() => handleApproveClick(selected)}
// //                   className={yellowBtn}
// //                 >
// //                   Approve
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </ModalShell>
// //       )}

// //       {/* Approve modal */}
// //       {approveRequest && (
// //         <ModalShell size="max-w-md" onClose={handleApproveCancel}>
// //           <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
// //             Approve Top-Up
// //           </h2>

// //           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
// //             Approve {approveRequest.id} and credit {approveRequest.amount} to{" "}
// //             {approveRequest.name}&apos;s wallet?
// //           </p>

// //           <div className="mt-6 flex justify-end gap-2">
// //             <button
// //               type="button"
// //               onClick={handleApproveCancel}
// //               className={btn}
// //             >
// //               Cancel
// //             </button>

// //             <button
// //               type="button"
// //               onClick={handleApproveConfirm}
// //               className={yellowBtn}
// //             >
// //               Confirm Approval
// //             </button>
// //           </div>
// //         </ModalShell>
// //       )}

// //       {/* Reject modal */}
// //       {rejectRequest && (
// //         <ModalShell size="max-w-md" onClose={handleRejectCancel}>
// //           <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
// //             Reject Top-Up
// //           </h2>

// //           <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
// //             {rejectRequest.id} · {rejectRequest.name} · {rejectRequest.amount}
// //           </p>

// //           <label
// //             htmlFor="rejectReason"
// //             className="mt-4 block text-sm text-[color:var(--primary-text)]"
// //           >
// //             Rejection reason (required)
// //           </label>

// //           <textarea
// //             id="rejectReason"
// //             autoFocus
// //             rows={3}
// //             value={reason}
// //             onChange={(e) => setReason(e.target.value)}
// //             className="mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none"
// //           />

// //           <div className="mt-5 flex justify-end gap-2">
// //             <button
// //               type="button"
// //               onClick={handleRejectCancel}
// //               className={btn}
// //             >
// //               Cancel
// //             </button>

// //             <button
// //               type="button"
// //               disabled={reason.trim() === ""}
// //               onClick={handleRejectConfirm}
// //               className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
// //             >
// //               Confirm Rejection
// //             </button>
// //           </div>
// //         </ModalShell>
// //       )}
// //     </section>
// //   );
// // };

// // export default TopUpRequestsPage;






// "use client";

// import { useState } from "react";
// import { createPortal } from "react-dom";
// import {
//   ArrowUpDown,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   FileText,
//   Search,
//   X,
// } from "lucide-react";

// /* ---------------- Dataset (demo) ---------------- */

// const initialRequests = [
//   {
//     id: "TX-5006",
//     name: "Sheikh Traders",
//     type: "Supplier",
//     amount: "Rs 10,000",
//     method: "Bank Transfer",
//     date: "2026-10-17",
//     status: "Pending",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5006.pdf",
//   },
//   {
//     id: "TX-5007",
//     name: "Brick House",
//     type: "Supplier",
//     amount: "Rs 5,000",
//     method: "JazzCash",
//     date: "2026-10-18",
//     status: "Pending",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5007.jpg",
//   },
//   {
//     id: "TX-5008",
//     name: "Brick House",
//     type: "Supplier",
//     amount: "Rs 8,000",
//     method: "Bank Transfer",
//     date: "2026-10-03",
//     status: "Approved",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5008.pdf",
//   },
//   {
//     id: "TX-5009",
//     name: "Ali Raza",
//     type: "Customer",
//     amount: "Rs 3,000",
//     method: "Easypaisa",
//     date: "2026-10-19",
//     status: "Pending",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5009.png",
//   },
//   {
//     id: "TX-5010",
//     name: "Hina Malik",
//     type: "Customer",
//     amount: "Rs 7,500",
//     method: "JazzCash",
//     date: "2026-10-12",
//     status: "Approved",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5010.pdf",
//   },
//   {
//     id: "TX-5011",
//     name: "Usman Rider",
//     type: "Rider",
//     amount: "Rs 2,000",
//     method: "Easypaisa",
//     date: "2026-10-20",
//     status: "Pending",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5011.jpg",
//   },
//   {
//     id: "TX-5012",
//     name: "Bilal Delivery",
//     type: "Rider",
//     amount: "Rs 4,500",
//     method: "Bank Transfer",
//     date: "2026-10-09",
//     status: "Rejected",
//     rejectionReason: "Receipt blurry hai",
//     proofUrl: "/receipts/receipt_TX-5012.pdf",
//   },
//   {
//     id: "TX-5013",
//     name: "Sheikh Traders",
//     type: "Supplier",
//     amount: "Rs 15,000",
//     method: "JazzCash",
//     date: "2026-10-21",
//     status: "Pending",
//     rejectionReason: "—",
//     proofUrl: "/receipts/receipt_TX-5013.png",
//   },
// ];

// const tabs = ["All", "Customer", "Rider", "Supplier"];
// const perPage = 8;

// /* ---------------- Shared styles ---------------- */

// const badgeColors = {
//   Pending: "bg-orange-50 text-orange-600 ring-orange-200",
//   Approved: "bg-green-50 text-green-700 ring-green-200",
//   Rejected: "bg-red-50 text-red-600 ring-red-200",
// };

// const btn =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// const yellowBtn =
//   "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

// const modalOutlineBtn = `inline-flex items-center gap-2 ${btn}`;

// /* ---------------- Payment Proof ---------------- */

// const proofName = (r) => r.proofUrl.split("/").pop();

// const getProofType = (r) => {
//   const extension = r.proofUrl.split(".").pop().toLowerCase();

//   if (extension === "pdf") return "pdf";

//   if (["jpg", "jpeg", "png", "webp"].includes(extension)) {
//     return "image";
//   }

//   return "unknown";
// };

// /* ---------------- Shared modal shell ---------------- */

// const ModalShell = ({ size, onClose, children }) =>
//   createPortal(
//     <div
//       onClick={onClose}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={`relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
//       >
//         <button
//           type="button"
//           aria-label="Close"
//           onClick={onClose}
//           className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//         >
//           <X size={18} />
//         </button>

//         {children}
//       </div>
//     </div>,
//     document.body
//   );

// /* ---------------- Request row + its own modals ---------------- */

// const TopUpRequestRow = ({
//   request,
//   showType,
//   onPreview,
//   onApprove,
//   onReject,
// }) => {
//   const [showView, setShowView] = useState(false);
//   const [showApprove, setShowApprove] = useState(false);
//   const [showReject, setShowReject] = useState(false);
//   const [reason, setReason] = useState("");

//   const detailRows = [
//     { label: "Name", value: request.name },
//     { label: "User Type", value: request.type },
//     { label: "Payment Method", value: request.method },
//     { label: "Amount", value: request.amount },
//     { label: "Date", value: request.date },
//     ...(request.status === "Rejected"
//       ? [
//           {
//             label: "Rejection Reason",
//             value: request.rejectionReason,
//           },
//         ]
//       : []),
//   ];

//   const handleViewClick = () => setShowView(true);

//   const handleViewClose = () => setShowView(false);

//   const handleApproveClick = () => setShowApprove(true);

//   const handleApproveCancel = () => setShowApprove(false);

//   const handleApproveConfirm = () => {
//     onApprove(request.id);
//     setShowApprove(false);
//     setShowView(false);
//   };

//   const handleRejectClick = () => {
//     setReason("");
//     setShowReject(true);
//   };

//   const handleRejectCancel = () => setShowReject(false);

//   const handleRejectConfirm = () => {
//     onReject(request.id, reason.trim());
//     setShowReject(false);
//     setShowView(false);
//   };

//   return (
//     <>
//       <tr className="border-t border-[color:var(--border-color)]">
//         <td className="px-4 py-3 text-[color:var(--primary-text)]">
//           {request.id}
//         </td>

//         <td className="px-4 py-3 text-[color:var(--primary-text)]">
//           {request.name}
//         </td>

//         {showType && (
//           <td className="px-4 py-3 text-[color:var(--primary-text)]">
//             {request.type}
//           </td>
//         )}

//         <td className="px-4 py-3 text-[color:var(--primary-text)]">
//           {request.amount}
//         </td>

//         <td className="px-4 py-3 text-[color:var(--primary-text)]">
//           {request.method}
//         </td>

//         <td className="px-4 py-3">
//           <button
//             type="button"
//             onClick={() => onPreview(request)}
//             className="inline-flex items-center gap-1 text-xs text-[color:var(--primary-yellow)] hover:underline"
//           >
//             <FileText size={14} />
//             {proofName(request)}
//           </button>
//         </td>

//         <td className="px-4 py-3 text-[color:var(--primary-text)]">
//           {request.date}
//         </td>

//         <td className="px-4 py-3">
//           <span
//             className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[request.status]}`}
//           >
//             {request.status}
//           </span>
//         </td>

//         <td className="px-4 py-3">
//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={handleViewClick}
//               className={btn}
//             >
//               View
//             </button>

//             {request.status === "Pending" && (
//               <>
//                 <button
//                   type="button"
//                   onClick={handleApproveClick}
//                   className={yellowBtn}
//                 >
//                   Approve
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleRejectClick}
//                   className={btn}
//                 >
//                   Reject
//                 </button>
//               </>
//             )}
//           </div>
//         </td>
//       </tr>

//       {/* View modal - isi request row ka apna modal */}

//       {showView && (
//         <ModalShell size="max-w-xl" onClose={handleViewClose}>
//           <h2 className="pr-8 text-2xl text-[color:var(--primary-text)]">
//             {request.id}
//           </h2>

//           <div
//             className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ring-1 ${badgeColors[request.status]}`}
//           >
//             {request.status}
//           </div>

//           <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {detailRows.map((d) => (
//               <div key={d.label}>
//                 <p className="text-sm text-[color:var(--secondary-text)]">
//                   {d.label}
//                 </p>

//                 <p className="text-sm text-[color:var(--primary-text)]">
//                   {d.value}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Payment Proof Preview */}

//           <div className="mt-5 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)]">
//             {getProofType(request) === "pdf" ? (
//               <iframe
//                 src={request.proofUrl}
//                 title={`Payment Proof ${request.id}`}
//                 className="h-[400px] w-full"
//               />
//             ) : getProofType(request) === "image" ? (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img
//                 src={request.proofUrl}
//                 alt={`Payment Proof ${request.id}`}
//                 className="max-h-[400px] w-full object-contain"
//               />
//             ) : (
//               <p className="p-5 text-sm text-[color:var(--secondary-text)]">
//                 Unsupported file format.
//               </p>
//             )}
//           </div>

//           <div className="mt-4 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
//               <FileText size={18} className="shrink-0" />

//               <span className="break-all">{proofName(request)}</span>
//             </div>

//             <button
//               type="button"
//               onClick={() => onPreview(request)}
//               className={modalOutlineBtn}
//             >
//               <Eye size={14} />
//               Preview
//             </button>
//           </div>

//           {/* Last par buttons */}

//           <div className="mt-5 flex flex-wrap justify-end gap-2">
//             <button
//               type="button"
//               onClick={handleViewClose}
//               className={btn}
//             >
//               Close
//             </button>

//             {request.status === "Pending" && (
//               <>
//                 <button
//                   type="button"
//                   onClick={handleRejectClick}
//                   className={btn}
//                 >
//                   Reject
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleApproveClick}
//                   className={yellowBtn}
//                 >
//                   Approve
//                 </button>
//               </>
//             )}
//           </div>
//         </ModalShell>
//       )}

//       {/* Approve modal - isi request row ka apna modal */}

//       {showApprove && (
//         <ModalShell size="max-w-md" onClose={handleApproveCancel}>
//           <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
//             Approve Top-Up
//           </h2>

//           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//             Approve {request.id} and credit {request.amount} to{" "}
//             {request.name}&apos;s wallet?
//           </p>

//           <div className="mt-6 flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={handleApproveCancel}
//               className={btn}
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={handleApproveConfirm}
//               className={yellowBtn}
//             >
//               Confirm Approval
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* Reject modal - isi request row ka apna modal */}

//       {showReject && (
//         <ModalShell size="max-w-md" onClose={handleRejectCancel}>
//           <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
//             Reject Top-Up
//           </h2>

//           <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
//             {request.id} · {request.name} · {request.amount}
//           </p>

//           <label
//             htmlFor={`rejectReason-${request.id}`}
//             className="mt-4 block text-sm text-[color:var(--primary-text)]"
//           >
//             Rejection reason (required)
//           </label>

//           <textarea
//             id={`rejectReason-${request.id}`}
//             autoFocus
//             rows={3}
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none"
//           />

//           <div className="mt-5 flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={handleRejectCancel}
//               className={btn}
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               disabled={reason.trim() === ""}
//               onClick={handleRejectConfirm}
//               className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
//             >
//               Confirm Rejection
//             </button>
//           </div>
//         </ModalShell>
//       )}
//     </>
//   );
// };

// /* ---------------- Table component ---------------- */

// const TopUpTable = ({
//   rows,
//   showType,
//   onPreview,
//   onApprove,
//   onReject,
// }) => {
//   const headings = [
//     "Request ID",
//     "Name",
//     ...(showType ? ["User Type"] : []),
//     "Requested Amount",
//     "Payment Method",
//     "Payment Proof",
//     "Request Date",
//     "Status",
//     "Actions",
//   ];

//   const sortable = ["Request ID", "Requested Amount", "Request Date"];

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[1000px] text-left text-sm">
//         <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
//           <tr>
//             {headings.map((h) => (
//               <th key={h} className="px-4 py-3 font-medium">
//                 <span className="inline-flex items-center gap-1">
//                   {h}
//                   {sortable.includes(h) && <ArrowUpDown size={12} />}
//                 </span>
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {rows.map((r) => (
//             <TopUpRequestRow
//               key={r.id}
//               request={r}
//               showType={showType}
//               onPreview={onPreview}
//               onApprove={onApprove}
//               onReject={onReject}
//             />
//           ))}

//           {rows.length === 0 && (
//             <tr>
//               <td
//                 colSpan={headings.length}
//                 className="px-4 py-10 text-center text-[color:var(--secondary-text)]"
//               >
//                 Koi request nahi mili
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// /* ---------------- Page ---------------- */

// const TopUpRequestsPage = () => {
//   const [requests, setRequests] = useState(initialRequests);
//   const [tab, setTab] = useState("All");
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   const handleTab = (t) => {
//     setTab(t);
//     setPage(1);
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleStatus = (e) => {
//     setStatus(e.target.value);
//     setPage(1);
//   };

//   // Receipt naye browser tab mein khulti hai

//   const handlePreview = (r) => {
//     window.open(r.proofUrl, "_blank", "noopener,noreferrer");
//   };

//   // Parent sirf requests ka data update karta hai

//   const handleApprove = (id) => {
//     setRequests((previousRequests) =>
//       previousRequests.map((r) =>
//         r.id === id ? { ...r, status: "Approved" } : r
//       )
//     );
//   };

//   const handleReject = (id, rejectionReason) => {
//     setRequests((previousRequests) =>
//       previousRequests.map((r) =>
//         r.id === id
//           ? {
//               ...r,
//               status: "Rejected",
//               rejectionReason,
//             }
//           : r
//       )
//     );
//   };

//   // Har tab ke records

//   const counts = requests.reduce(
//     (all, r) => ({
//       ...all,
//       [r.type]: (all[r.type] || 0) + 1,
//       All: all.All + 1,
//     }),
//     { All: 0 }
//   );

//   // Tab + search + status

//   const visible = requests.reduce((all, r) => {
//     const matchTab = tab === "All" || r.type === tab;

//     const matchSearch = `${r.id} ${r.name} ${r.type} ${r.method}`
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchStatus = status === "All" || r.status === status;

//     return matchTab && matchSearch && matchStatus ? [...all, r] : all;
//   }, []);

//   const totalPages = Math.max(1, Math.ceil(visible.length / perPage));

//   const current = Math.min(page, totalPages);

//   const rows = visible.slice(
//     (current - 1) * perPage,
//     current * perPage
//   );

//   return (
//     <section className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
//         Top-Up Requests
//       </h1>

//       {/* Tabs */}

//       <div className="mt-5 flex gap-2 overflow-x-auto">
//         {tabs.map((t) => (
//           <button
//             key={t}
//             type="button"
//             onClick={() => handleTab(t)}
//             className={`shrink-0 rounded-md border px-4 py-2 text-sm ${
//               tab === t
//                 ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                 : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//             }`}
//           >
//             {t} ({counts[t] || 0})
//           </button>
//         ))}
//       </div>

//       <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
//         {/* Search + status */}

//         <div className="flex flex-col gap-3 p-3 sm:flex-row">
//           <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
//             <Search
//               size={16}
//               className="shrink-0 text-[color:var(--secondary-text)]"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={handleSearch}
//               placeholder="Search..."
//               className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//             />
//           </div>

//           <select
//             value={status}
//             onChange={handleStatus}
//             className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
//           >
//             <option>All</option>
//             <option>Pending</option>
//             <option>Approved</option>
//             <option>Rejected</option>
//           </select>
//         </div>

//         <TopUpTable
//           rows={rows}
//           showType={tab === "All"}
//           onPreview={handlePreview}
//           onApprove={handleApprove}
//           onReject={handleReject}
//         />

//         {/* Footer */}

//         <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
//           <span>{visible.length} records</span>

//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               aria-label="Previous page"
//               disabled={current === 1}
//               onClick={() => setPage(current - 1)}
//               className="disabled:opacity-30"
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
//               className="disabled:opacity-30"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopUpRequestsPage;



"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminTopupDataRow from "../../../component/admin/top-up/BmAdminTopupDataRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_TOPUP_TABS = ["All", "Customer", "Rider", "Supplier"];
const BM_TOPUP_STATUS_FILTERS = ["All", "Pending", "Approved", "Rejected"];

const BM_TOPUPS = [
  { id: "TX-5006", name: "Sheikh Traders", userType: "Supplier", amount: 10000, method: "Bank Transfer", proofName: "receipt_TX-5006.pdf", proofUrl: "/documents/receipt_TX-5006.pdf", date: "2026-10-17", status: "Pending" },
  { id: "TX-5009", name: "Ali Raza", userType: "Customer", amount: 3000, method: "Easypaisa", proofName: "receipt_TX-5009.png", proofUrl: "/documents/receipt_TX-5009.png", date: "2026-10-19", status: "Pending" },
  { id: "TX-5010", name: "Hina Malik", userType: "Customer", amount: 7500, method: "JazzCash", proofName: "receipt_TX-5010.pdf", proofUrl: "/documents/receipt_TX-5010.pdf", date: "2026-10-12", status: "Approved" },
  { id: "TX-5011", name: "Usman Rider", userType: "Rider", amount: 2000, method: "Easypaisa", proofName: "receipt_TX-5011.jpg", proofUrl: "/documents/receipt_TX-5011.jpg", date: "2026-10-20", status: "Pending" },
  { id: "TX-5012", name: "Bilal Delivery", userType: "Rider", amount: 4500, method: "Bank Transfer", proofName: "receipt_TX-5012.pdf", proofUrl: "/documents/receipt_TX-5012.pdf", date: "2026-10-09", status: "Rejected" },
];

const th = "px-4 py-3 font-medium";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Har tab ke saamne count: { All: 5, Supplier: 1, Customer: 2, Rider: 2 }
  const counts = BM_TOPUPS.reduce(
    (total, item) => ({
      ...total,
      All: total.All + 1,
      [item.userType]: (total[item.userType] || 0) + 1,
    }),
    { All: 0 }
  );

  const query = search.trim().toLowerCase();

  // Tab + status dropdown + search teeno yahin lagte hain
  const visibleRequests = BM_TOPUPS.reduce((all, item) => {
    const matches =
      (tab === "All" || item.userType === tab) &&
      (status === "All" || item.status === status) &&
      `${item.id} ${item.name}`.toLowerCase().includes(query);

    return matches ? [...all, item] : all;
  }, []);

  // User Type column sirf "All" tab mein dikhta hai
  const showUserType = tab === "All";
  const columnCount = showUserType ? 9 : 8;

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader title="Top-Up Requests" />

      {/* USER TABS */}
      <div className="mb-4 flex flex-wrap gap-2">
        {BM_TOPUP_TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-md border px-4 py-2 text-sm transition-colors ${
              tab === item
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {item} ({counts[item] || 0})
          </button>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:p-4">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-48"
          >
            {BM_TOPUP_STATUS_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                <th className={th}>
                  <span className="inline-flex items-center gap-1">
                    Request ID <ArrowUpDown size={11} />
                  </span>
                </th>
                <th className={th}>Name</th>
                {showUserType && <th className={th}>User Type</th>}
                <th className={th}>
                  <span className="inline-flex items-center gap-1">
                    Requested Amount <ArrowUpDown size={11} />
                  </span>
                </th>
                <th className={th}>Payment Method</th>
                <th className={th}>Payment Proof</th>
                <th className={th}>
                  <span className="inline-flex items-center gap-1">
                    Request Date <ArrowUpDown size={11} />
                  </span>
                </th>
                <th className={th}>Status</th>
                <th className={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleRequests.map((request) => (
                <BmAdminTopupDataRow
                  key={request.id}
                  request={request}
                  showUserType={showUserType}
                />
              ))}

              {visibleRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={columnCount}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleRequests.length}{" "}
            {visibleRequests.length === 1 ? "record" : "records"}
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