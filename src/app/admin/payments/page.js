// // // import TopUpRequests from "./Topuprequest.js";

// // // export default function PaymentsPage() {
// // //   return <TopUpRequests />;
// // // }


// // "use client";

// // import { useState } from "react";
// // import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X, FileText, Eye, Download } from "lucide-react";

// // /* ---------------- Dataset ---------------- */

// // const initialRequests = [
// //   { id: "TX-5006", supplier: "Sheikh Traders", amount: "Rs 10,000", method: "Bank Transfer (Demo)", reference: "Receipt #88231", proof: "receipt_TX-5006.pdf", date: "2026-10-17", status: "Pending", walletBalance: "Rs 18,500", decisionDate: "—", rejectionReason: "—" },
// //   { id: "TX-5007", supplier: "Brick House", amount: "Rs 5,000", method: "JazzCash (Demo)", reference: "Ref JC-22910", proof: "receipt_TX-5007.pdf", date: "2026-10-18", status: "Pending", walletBalance: "Rs 12,000", decisionDate: "—", rejectionReason: "—" },
// //   { id: "TX-5008", supplier: "Brick House", amount: "Rs 8,000", method: "Bank Transfer (Demo)", reference: "—", proof: "receipt_TX-5008.pdf", date: "2026-10-03", status: "Approved", walletBalance: "Rs 20,000", decisionDate: "2026-10-04", rejectionReason: "—" },
// // ];

// // const headings = ["Request ID", "Supplier / Shop Name", "Requested Amount", "Payment Method", "Transaction Reference", "Payment Proof / Receipt", "Request Date", "Status", "Actions"];
// // const sortable = ["Request ID", "Requested Amount", "Request Date"];
// // const perPage = 8; // ek page par kitne rows

// // /* ---------------- Shared styles ---------------- */

// // // Status ke hisab se badge ka rang (table aur modal dono mein)
// // const badgeColors = {
// //   Pending: "bg-orange-50 text-orange-600 ring-orange-200",
// //   Approved: "bg-green-50 text-green-700 ring-green-200",
// //   Rejected: "bg-red-50 text-red-600 ring-red-200",
// // };

// // const btn =
// //   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
// // const modalOutlineBtn = `inline-flex items-center gap-2 ${btn}`;

// // /* ---------------- Shared modal shell ---------------- */

// // // Overlay + box + close icon: teeno modals yahi use karte hain
// // const BmModal = ({ name, size, onClose, children }) => (
// //   // Overlay: bahar click karne par band
// //   <div
// //     onClick={onClose}
// //     className={`bm${name}ModalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4`}
// //   >
// //     <div
// //       onClick={(e) => e.stopPropagation()}
// //       className={`bm${name}ModalBox relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
// //     >
// //       <button
// //         type="button"
// //         aria-label="Close"
// //         onClick={onClose}
// //         className={`bm${name}ModalCloseButton absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]`}
// //       >
// //         <X size={18} />
// //       </button>
// //       {children}
// //     </div>
// //   </div>
// // );

// // /* ---------------- Detail modal ---------------- */

// // const BmTopUpDetailModal = ({ request, onClose }) => {
// //   // Jab tak koi request select nahi, modal nahi dikhana
// //   if (!request) return null;

// //   const details = [
// //     { label: "Supplier", value: request.supplier },
// //     { label: "Amount", value: request.amount },
// //     { label: "Method", value: request.method },
// //     { label: "Reference", value: request.reference },
// //     { label: "Requested", value: request.date },
// //     { label: "Wallet Balance", value: request.walletBalance },
// //     { label: "Decision Date", value: request.decisionDate },
// //   ];

// //   const handlePreviewClick = () => console.log("Preview", request.proof);
// //   const handleDownloadClick = () => console.log("Download", request.proof);

// //   return (
// //     <BmModal name="TopUp" size="max-w-xl" onClose={onClose}>
// //       {/* Request ID */}
// //       <h2 className="bmTopUpModalTitleText pr-8 text-2xl text-[color:var(--primary-text)]">
// //         {request.id}
// //       </h2>

// //       {/* Status bar */}
// //       <div className={`bmTopUpModalStatusBadge mt-3 inline-block rounded-full px-3 py-1 text-xs ring-1 ${badgeColors[request.status]}`}>
// //         {request.status}
// //       </div>

// //       {/* Details grid */}
// //       <div className="bmTopUpModalDetailGrid mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
// //         {details.map((d) => (
// //           <div key={d.label}>
// //             <p className="text-sm text-[color:var(--secondary-text)]">{d.label}</p>
// //             <p className="text-sm text-[color:var(--primary-text)]">{d.value}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Receipt box */}
// //       <div className="bmTopUpModalReceiptBox mt-5 rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)] p-4 text-sm text-[color:var(--primary-text)]">
// //         <p className="font-semibold">Payment Receipt — Demo</p>
// //         <div className="mt-3 space-y-1 text-[color:var(--secondary-text)]">
// //           <p>{request.supplier}</p>
// //           <p>{request.amount} · {request.method}</p>
// //           <p>Reference: {request.reference}</p>
// //           <p>Date: {request.date}</p>
// //         </div>
// //       </div>

// //       {/* File row */}
// //       <div className="bmTopUpModalFileRow mt-5 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
// //         <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
// //           <FileText size={18} className="shrink-0" />
// //           <span className="break-all">{request.proof}</span>
// //         </div>
// //         <div className="flex gap-2">
// //           <button type="button" onClick={handlePreviewClick} className={modalOutlineBtn}>
// //             <Eye size={14} /> Preview
// //           </button>
// //           <button type="button" onClick={handleDownloadClick} className={modalOutlineBtn}>
// //             <Download size={14} /> Download
// //           </button>
// //         </div>
// //       </div>

// //       {/* Close button */}
// //       <div className="mt-5 flex justify-end">
// //         <button type="button" onClick={onClose} className={modalOutlineBtn}>
// //           Close
// //         </button>
// //       </div>
// //     </BmModal>
// //   );
// // };

// // /* ---------------- Approve modal ---------------- */

// // const BmTopUpApproveModal = ({ request, onCancel, onConfirm }) => {
// //   if (!request) return null;

// //   return (
// //     <BmModal name="Approve" size="max-w-md" onClose={onCancel}>
// //       <h2 className="bmApproveModalTitleText pr-8 text-xl text-[color:var(--primary-text)]">
// //         Approve Top-Up
// //       </h2>
// //       <p className="bmApproveModalMessageText mt-3 text-sm text-[color:var(--secondary-text)]">
// //         Approve {request.id} and credit {request.amount} to {request.supplier}&apos;s demo wallet?
// //       </p>
// //       <div className="bmApproveModalActions mt-6 flex justify-end gap-2">
// //         <button type="button" onClick={onCancel} className={btn}>
// //           Cancel
// //         </button>
// //         <button
// //           type="button"
// //           onClick={onConfirm}
// //           className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
// //         >
// //           Confirm Approval
// //         </button>
// //       </div>
// //     </BmModal>
// //   );
// // };

// // /* ---------------- Reject modal ---------------- */

// // const BmTopUpRejectModal = ({ request, onCancel, onConfirm }) => {
// //   const [reason, setReason] = useState("");
// //   const isEmpty = reason.trim() === "";

// //   if (!request) return null;

// //   const handleConfirm = () => onConfirm(reason.trim());

// //   return (
// //     <BmModal name="Reject" size="max-w-md" onClose={onCancel}>
// //       <h2 className="bmRejectModalTitleText pr-8 text-xl text-[color:var(--primary-text)]">
// //         Reject Top-Up
// //       </h2>
// //       <p className="bmRejectModalInfoText mt-2 text-sm text-[color:var(--secondary-text)]">
// //         {request.id} · {request.supplier} · {request.amount}
// //       </p>

// //       <label
// //         htmlFor="bmRejectReasonInput"
// //         className="mt-4 block text-sm text-[color:var(--primary-text)]"
// //       >
// //         Rejection reason (required)
// //       </label>
// //       <textarea
// //         id="bmRejectReasonInput"
// //         autoFocus
// //         rows={3}
// //         value={reason}
// //         onChange={(e) => setReason(e.target.value)}
// //         className="bmRejectModalReasonInput mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none"
// //       />

// //       <div className="bmRejectModalActions mt-5 flex justify-end gap-2">
// //         <button type="button" onClick={onCancel} className={btn}>
// //           Cancel
// //         </button>
// //         <button
// //           type="button"
// //           disabled={isEmpty}
// //           onClick={handleConfirm}
// //           className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
// //         >
// //           Confirm Rejection
// //         </button>
// //       </div>
// //     </BmModal>
// //   );
// // };

// // /* ---------------- Page ---------------- */

// // const PaymentsPage = () => {
// //   const [requests, setRequests] = useState(initialRequests);
// //   const [search, setSearch] = useState("");
// //   const [status, setStatus] = useState("All"); // All / Pending / Approved / Rejected
// //   const [page, setPage] = useState(1);
// //   const [selectedId, setSelectedId] = useState(null); // View modal
// //   const [approveId, setApproveId] = useState(null); // Approve confirmation modal
// //   const [rejectId, setRejectId] = useState(null); // Reject reason modal

// //   const handleSearch = (e) => {
// //     setSearch(e.target.value);
// //     setPage(1);
// //   };

// //   const handleStatus = (e) => {
// //     setStatus(e.target.value);
// //     setPage(1);
// //   };

// //   // View: modal kholo / band karo
// //   const handleViewClick = (request) => setSelectedId(request.id);
// //   const handleModalClose = () => setSelectedId(null);

// //   // Approve / Reject: status, decision date aur reason badal do
// //   const handleStatusChange = (id, newStatus, reason = "—") => {
// //     const today = new Date().toISOString().slice(0, 10);
// //     setRequests(
// //       requests.map((r) =>
// //         r.id === id
// //           ? { ...r, status: newStatus, decisionDate: today, rejectionReason: reason }
// //           : r
// //       )
// //     );
// //   };

// //   // Receipt click
// //   const handleReceiptClick = (proof) => console.log("Receipt", proof);

// //   // Approve: confirmation modal kholo, cancel par band, confirm par approve
// //   const handleApproveClick = (request) => setApproveId(request.id);
// //   const handleApproveCancel = () => setApproveId(null);
// //   const handleApproveConfirm = () => {
// //     handleStatusChange(approveId, "Approved");
// //     setApproveId(null);
// //   };

// //   // Reject: reason modal kholo, cancel par band, confirm par reason ke saath reject
// //   const handleRejectClick = (request) => setRejectId(request.id);
// //   const handleRejectCancel = () => setRejectId(null);
// //   const handleRejectConfirm = (reason) => {
// //     handleStatusChange(rejectId, "Rejected", reason);
// //     setRejectId(null);
// //   };

// //   // Modals ko hamesha taaza request milegi
// //   const selected = requests.find((r) => r.id === selectedId);
// //   const approveRequest = requests.find((r) => r.id === approveId);
// //   const rejectRequest = requests.find((r) => r.id === rejectId);

// //   // 1) Search aur dropdown dono par poore utre hue requests chuno
// //   const visible = requests.reduce((all, r) => {
// //     const matchSearch = `${r.id} ${r.supplier} ${r.method} ${r.reference}`
// //       .toLowerCase()
// //       .includes(search.toLowerCase());
// //     const matchStatus = status === "All" || r.status === status;
// //     return matchSearch && matchStatus ? [...all, r] : all;
// //   }, []);

// //   // 2) Pages
// //   const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
// //   const current = Math.min(page, totalPages);

// //   // 3) Sirf is page ke rows
// //   const rows = visible.slice((current - 1) * perPage, current * perPage);

// //   return (
// //     <section className="bmTopUpSection p-4 sm:p-6 lg:p-8">
// //       {/* Heading */}
// //       <h1 className="bmTopUpHeadingText text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
// //         Top-Up Requests
// //       </h1>

// //       {/* Card */}
// //       <div className="bmTopUpCard mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
// //         {/* Search + dropdown */}
// //         <div className="bmTopUpToolbar flex flex-col gap-3 p-3 sm:flex-row">
// //           <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
// //             <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
// //             <input
// //               type="text"
// //               value={search}
// //               onChange={handleSearch}
// //               placeholder="Search..."
// //               className="bmTopUpSearchInput w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
// //             />
// //           </div>
// //           <select
// //             value={status}
// //             onChange={handleStatus}
// //             className="bmTopUpStatusSelect rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
// //           >
// //             <option>All</option>
// //             <option>Pending</option>
// //             <option>Approved</option>
// //             <option>Rejected</option>
// //           </select>
// //         </div>

// //         {/* Table (chhoti screen par sirf table scroll hoti hai, page nahi) */}
// //         <div className="overflow-x-auto">
// //           <table className="bmTopUpTable w-full min-w-[1200px] text-left text-sm">
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
// //               {rows.map((r) => (
// //                 <tr key={r.id} className="border-t border-[color:var(--border-color)]">
// //                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.id}</td>
// //                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.supplier}</td>
// //                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.amount}</td>
// //                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.method}</td>
// //                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.reference}</td>
// //                   <td className="px-4 py-3">
// //                     <button
// //                       type="button"
// //                       onClick={() => handleReceiptClick(r.proof)}
// //                       className="bmTopUpReceiptButton text-xs text-[color:var(--primary-yellow)] hover:underline"
// //                     >
// //                       {r.proof}
// //                     </button>
// //                   </td>
// //                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{r.date}</td>
// //                   <td className="px-4 py-3">
// //                     <span className={`bmTopUpStatusBadge rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[r.status]}`}>
// //                       {r.status}
// //                     </span>
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     <div className="flex gap-2">
// //                       <button
// //                         type="button"
// //                         onClick={() => handleViewClick(r)}
// //                         className={`bmTopUpViewButton ${btn}`}
// //                       >
// //                         View
// //                       </button>

// //                       {/* Approve / Reject sirf Pending requests par */}
// //                       {r.status === "Pending" && (
// //                         <>
// //                           <button
// //                             type="button"
// //                             onClick={() => handleApproveClick(r)}
// //                             className="bmTopUpApproveButton rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
// //                           >
// //                             Approve
// //                           </button>
// //                           <button
// //                             type="button"
// //                             onClick={() => handleRejectClick(r)}
// //                             className={`bmTopUpRejectButton ${btn}`}
// //                           >
// //                             Reject
// //                           </button>
// //                         </>
// //                       )}
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Footer: records + pages */}
// //         <div className="bmTopUpFooter flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
// //           <span>{visible.length} records</span>
// //           <div className="flex items-center gap-3">
// //             <button
// //               type="button"
// //               aria-label="Previous page"
// //               disabled={current === 1}
// //               onClick={() => setPage(current - 1)}
// //               className="bmTopUpPrevButton disabled:opacity-30"
// //             >
// //               <ChevronLeft size={16} />
// //             </button>
// //             <span>Page {current} / {totalPages}</span>
// //             <button
// //               type="button"
// //               aria-label="Next page"
// //               disabled={current === totalPages}
// //               onClick={() => setPage(current + 1)}
// //               className="bmTopUpNextButton disabled:opacity-30"
// //             >
// //               <ChevronRight size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modals */}
// //       <BmTopUpDetailModal request={selected} onClose={handleModalClose} />
// //       <BmTopUpApproveModal
// //         request={approveRequest}
// //         onCancel={handleApproveCancel}
// //         onConfirm={handleApproveConfirm}
// //       />
// //       {rejectRequest && (
// //         <BmTopUpRejectModal
// //           request={rejectRequest}
// //           onCancel={handleRejectCancel}
// //           onConfirm={handleRejectConfirm}
// //         />
// //       )}
// //     </section>
// //   );
// // };

// // export default PaymentsPage;




// "use client";

// import { useState } from "react";
// import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, FileText, Search, X } from "lucide-react";

// /* ---------------- Dataset (demo) ---------------- */

// const initialRequests = [
//   { id: "TX-5006", name: "Sheikh Traders", type: "Supplier", amount: "Rs 10,000", method: "Bank Transfer", date: "2026-10-17", status: "Pending", rejectionReason: "—" },
//   { id: "TX-5007", name: "Brick House", type: "Supplier", amount: "Rs 5,000", method: "JazzCash", date: "2026-10-18", status: "Pending", rejectionReason: "—" },
//   { id: "TX-5008", name: "Brick House", type: "Supplier", amount: "Rs 8,000", method: "Bank Transfer", date: "2026-10-03", status: "Approved", rejectionReason: "—" },
//   { id: "TX-5009", name: "Ali Raza", type: "Customer", amount: "Rs 3,000", method: "Easypaisa", date: "2026-10-19", status: "Pending", rejectionReason: "—" },
//   { id: "TX-5010", name: "Hina Malik", type: "Customer", amount: "Rs 7,500", method: "JazzCash", date: "2026-10-12", status: "Approved", rejectionReason: "—" },
//   { id: "TX-5011", name: "Usman Rider", type: "Rider", amount: "Rs 2,000", method: "Easypaisa", date: "2026-10-20", status: "Pending", rejectionReason: "—" },
//   { id: "TX-5012", name: "Bilal Delivery", type: "Rider", amount: "Rs 4,500", method: "Bank Transfer", date: "2026-10-09", status: "Rejected", rejectionReason: "Receipt blurry hai" },
//   { id: "TX-5013", name: "Sheikh Traders", type: "Supplier", amount: "Rs 15,000", method: "JazzCash", date: "2026-10-21", status: "Pending", rejectionReason: "—" },
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

// /* ---------------- Proof image (admin ke pass ayi hui receipt - demo) ---------------- */

// const proofSvg = (r) =>
//   `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320"><rect width="480" height="320" fill="#f8fafc"/><rect x="16" y="16" width="448" height="288" rx="12" fill="#fff" stroke="#e2e8f0"/><text x="36" y="58" font-size="22" font-family="Arial" fill="#111827">Payment Receipt</text><text x="36" y="100" font-size="15" font-family="Arial" fill="#475569">${r.name}</text><text x="36" y="130" font-size="15" font-family="Arial" fill="#475569">${r.amount} - ${r.method}</text><text x="36" y="160" font-size="15" font-family="Arial" fill="#475569">Date: ${r.date}</text><text x="36" y="190" font-size="15" font-family="Arial" fill="#475569">Ref: ${r.id}</text><text x="36" y="270" font-size="18" font-family="Arial" fill="#16a34a">Transfer successful</text></svg>`;

// const proofSrc = (r) => `data:image/svg+xml;utf8,${encodeURIComponent(proofSvg(r))}`;
// const proofName = (r) => `receipt_${r.id}.png`;

// /* ---------------- Shared modal shell ---------------- */

// const ModalShell = ({ size, onClose, children }) => (
//   <div
//     onClick={onClose}
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className={`relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
//     >
//       <button
//         type="button"
//         aria-label="Close"
//         onClick={onClose}
//         className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//       >
//         <X size={18} />
//       </button>
//       {children}
//     </div>
//   </div>
// );

// /* ---------------- Table component ---------------- */

// const TopUpTable = ({ rows, showType, onPreview, onView, onApprove, onReject }) => {
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
//   const cell = "px-4 py-3 text-[color:var(--primary-text)]";

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
//             <tr key={r.id} className="border-t border-[color:var(--border-color)]">
//               <td className={cell}>{r.id}</td>
//               <td className={cell}>{r.name}</td>
//               {showType && <td className={cell}>{r.type}</td>}
//               <td className={cell}>{r.amount}</td>
//               <td className={cell}>{r.method}</td>
//               <td className="px-4 py-3">
//                 <button
//                   type="button"
//                   onClick={() => onPreview(r)}
//                   className="inline-flex items-center gap-1 text-xs text-[color:var(--primary-yellow)] hover:underline"
//                 >
//                   <FileText size={14} /> {proofName(r)}
//                 </button>
//               </td>
//               <td className={cell}>{r.date}</td>
//               <td className="px-4 py-3">
//                 <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[r.status]}`}>
//                   {r.status}
//                 </span>
//               </td>
//               <td className="px-4 py-3">
//                 <div className="flex gap-2">
//                   <button type="button" onClick={() => onView(r)} className={btn}>
//                     View
//                   </button>
//                   {r.status === "Pending" && (
//                     <>
//                       <button type="button" onClick={() => onApprove(r)} className={yellowBtn}>
//                         Approve
//                       </button>
//                       <button type="button" onClick={() => onReject(r)} className={btn}>
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//           {rows.length === 0 && (
//             <tr>
//               <td colSpan={headings.length} className="px-4 py-10 text-center text-[color:var(--secondary-text)]">
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
//   const [selectedId, setSelectedId] = useState(null);
//   const [approveId, setApproveId] = useState(null);
//   const [rejectId, setRejectId] = useState(null);
//   const [reason, setReason] = useState("");

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
//     const blob = new Blob([proofSvg(r)], { type: "image/svg+xml" });
//     window.open(URL.createObjectURL(blob), "_blank");
//   };

//   const handleViewClick = (r) => setSelectedId(r.id);
//   const handleViewClose = () => setSelectedId(null);

//   const handleApproveClick = (r) => setApproveId(r.id);
//   const handleApproveCancel = () => setApproveId(null);
//   const handleApproveConfirm = () => {
//     setRequests(requests.map((r) => (r.id === approveId ? { ...r, status: "Approved" } : r)));
//     setApproveId(null);
//     setSelectedId(null);
//   };

//   const handleRejectClick = (r) => {
//     setReason("");
//     setRejectId(r.id);
//   };
//   const handleRejectCancel = () => setRejectId(null);
//   const handleRejectConfirm = () => {
//     setRequests(
//       requests.map((r) =>
//         r.id === rejectId ? { ...r, status: "Rejected", rejectionReason: reason.trim() } : r
//       )
//     );
//     setRejectId(null);
//     setSelectedId(null);
//   };

//   const selected = requests.find((r) => r.id === selectedId);
//   const approveRequest = requests.find((r) => r.id === approveId);
//   const rejectRequest = requests.find((r) => r.id === rejectId);

//   // Har tab ke records
//   const counts = requests.reduce(
//     (all, r) => ({ ...all, [r.type]: (all[r.type] || 0) + 1, All: all.All + 1 }),
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
//   const rows = visible.slice((current - 1) * perPage, current * perPage);

//   const detailRows = selected
//     ? [
//         { label: "Name", value: selected.name },
//         { label: "User Type", value: selected.type },
//         { label: "Payment Method", value: selected.method },
//         { label: "Amount", value: selected.amount },
//         { label: "Date", value: selected.date },
//         ...(selected.status === "Rejected"
//           ? [{ label: "Rejection Reason", value: selected.rejectionReason }]
//           : []),
//       ]
//     : [];

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
//             <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
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
//           onView={handleViewClick}
//           onApprove={handleApproveClick}
//           onReject={handleRejectClick}
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

//       {/* View modal */}
//       {selected && (
//         <ModalShell size="max-w-xl" onClose={handleViewClose}>
//           <h2 className="pr-8 text-2xl text-[color:var(--primary-text)]">{selected.id}</h2>
//           <div className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ring-1 ${badgeColors[selected.status]}`}>
//             {selected.status}
//           </div>

//           <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {detailRows.map((d) => (
//               <div key={d.label}>
//                 <p className="text-sm text-[color:var(--secondary-text)]">{d.label}</p>
//                 <p className="text-sm text-[color:var(--primary-text)]">{d.value}</p>
//               </div>
//             ))}
//           </div>

//           {/* Payment proof: image seedhi yahin dikhti hai */}
//           <div className="mt-5 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)]">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img src={proofSrc(selected)} alt={`Payment proof ${selected.id}`} className="h-auto w-full" />
//           </div>

//           <div className="mt-4 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
//               <FileText size={18} className="shrink-0" />
//               <span className="break-all">{proofName(selected)}</span>
//             </div>
//             <button type="button" onClick={() => handlePreview(selected)} className={modalOutlineBtn}>
//               <Eye size={14} /> Preview
//             </button>
//           </div>

//           {/* Last par buttons */}
//           <div className="mt-5 flex flex-wrap justify-end gap-2">
//             <button type="button" onClick={handleViewClose} className={btn}>
//               Close
//             </button>
//             {selected.status === "Pending" && (
//               <>
//                 <button type="button" onClick={() => handleRejectClick(selected)} className={btn}>
//                   Reject
//                 </button>
//                 <button type="button" onClick={() => handleApproveClick(selected)} className={yellowBtn}>
//                   Approve
//                 </button>
//               </>
//             )}
//           </div>
//         </ModalShell>
//       )}

//       {/* Approve modal */}
//       {approveRequest && (
//         <ModalShell size="max-w-md" onClose={handleApproveCancel}>
//           <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">Approve Top-Up</h2>
//           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//             Approve {approveRequest.id} and credit {approveRequest.amount} to {approveRequest.name}&apos;s wallet?
//           </p>
//           <div className="mt-6 flex justify-end gap-2">
//             <button type="button" onClick={handleApproveCancel} className={btn}>
//               Cancel
//             </button>
//             <button type="button" onClick={handleApproveConfirm} className={yellowBtn}>
//               Confirm Approval
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* Reject modal */}
//       {rejectRequest && (
//         <ModalShell size="max-w-md" onClose={handleRejectCancel}>
//           <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">Reject Top-Up</h2>
//           <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
//             {rejectRequest.id} · {rejectRequest.name} · {rejectRequest.amount}
//           </p>
//           <label htmlFor="rejectReason" className="mt-4 block text-sm text-[color:var(--primary-text)]">
//             Rejection reason (required)
//           </label>
//           <textarea
//             id="rejectReason"
//             autoFocus
//             rows={3}
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none"
//           />
//           <div className="mt-5 flex justify-end gap-2">
//             <button type="button" onClick={handleRejectCancel} className={btn}>
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
//     </section>
//   );
// };

// export default TopUpRequestsPage;





"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Search,
  X,
} from "lucide-react";

/* ---------------- Dataset (demo) ---------------- */

const initialRequests = [
  {
    id: "TX-5006",
    name: "Sheikh Traders",
    type: "Supplier",
    amount: "Rs 10,000",
    method: "Bank Transfer",
    date: "2026-10-17",
    status: "Pending",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5006.pdf",
  },
  {
    id: "TX-5007",
    name: "Brick House",
    type: "Supplier",
    amount: "Rs 5,000",
    method: "JazzCash",
    date: "2026-10-18",
    status: "Pending",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5007.jpg",
  },
  {
    id: "TX-5008",
    name: "Brick House",
    type: "Supplier",
    amount: "Rs 8,000",
    method: "Bank Transfer",
    date: "2026-10-03",
    status: "Approved",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5008.pdf",
  },
  {
    id: "TX-5009",
    name: "Ali Raza",
    type: "Customer",
    amount: "Rs 3,000",
    method: "Easypaisa",
    date: "2026-10-19",
    status: "Pending",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5009.png",
  },
  {
    id: "TX-5010",
    name: "Hina Malik",
    type: "Customer",
    amount: "Rs 7,500",
    method: "JazzCash",
    date: "2026-10-12",
    status: "Approved",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5010.pdf",
  },
  {
    id: "TX-5011",
    name: "Usman Rider",
    type: "Rider",
    amount: "Rs 2,000",
    method: "Easypaisa",
    date: "2026-10-20",
    status: "Pending",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5011.jpg",
  },
  {
    id: "TX-5012",
    name: "Bilal Delivery",
    type: "Rider",
    amount: "Rs 4,500",
    method: "Bank Transfer",
    date: "2026-10-09",
    status: "Rejected",
    rejectionReason: "Receipt blurry hai",
    proofUrl: "/receipts/receipt_TX-5012.pdf",
  },
  {
    id: "TX-5013",
    name: "Sheikh Traders",
    type: "Supplier",
    amount: "Rs 15,000",
    method: "JazzCash",
    date: "2026-10-21",
    status: "Pending",
    rejectionReason: "—",
    proofUrl: "/receipts/receipt_TX-5013.png",
  },
];

const tabs = ["All", "Customer", "Rider", "Supplier"];
const perPage = 8;

/* ---------------- Shared styles ---------------- */

const badgeColors = {
  Pending: "bg-orange-50 text-orange-600 ring-orange-200",
  Approved: "bg-green-50 text-green-700 ring-green-200",
  Rejected: "bg-red-50 text-red-600 ring-red-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

const modalOutlineBtn = `inline-flex items-center gap-2 ${btn}`;

/* ---------------- Payment Proof ---------------- */

const proofName = (r) => r.proofUrl.split("/").pop();

const getProofType = (r) => {
  const extension = r.proofUrl.split(".").pop().toLowerCase();

  if (extension === "pdf") return "pdf";

  if (["jpg", "jpeg", "png", "webp"].includes(extension)) {
    return "image";
  }

  return "unknown";
};

/* ---------------- Shared modal shell ---------------- */

const ModalShell = ({ size, onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
      >
        <X size={18} />
      </button>

      {children}
    </div>
  </div>
);

/* ---------------- Table component ---------------- */

const TopUpTable = ({
  rows,
  showType,
  onPreview,
  onView,
  onApprove,
  onReject,
}) => {
  const headings = [
    "Request ID",
    "Name",
    ...(showType ? ["User Type"] : []),
    "Requested Amount",
    "Payment Method",
    "Payment Proof",
    "Request Date",
    "Status",
    "Actions",
  ];

  const sortable = ["Request ID", "Requested Amount", "Request Date"];

  const cell = "px-4 py-3 text-[color:var(--primary-text)]";

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
          <tr>
            {headings.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                <span className="inline-flex items-center gap-1">
                  {h}
                  {sortable.includes(h) && <ArrowUpDown size={12} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-t border-[color:var(--border-color)]"
            >
              <td className={cell}>{r.id}</td>

              <td className={cell}>{r.name}</td>

              {showType && <td className={cell}>{r.type}</td>}

              <td className={cell}>{r.amount}</td>

              <td className={cell}>{r.method}</td>

              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => onPreview(r)}
                  className="inline-flex items-center gap-1 text-xs text-[color:var(--primary-yellow)] hover:underline"
                >
                  <FileText size={14} /> {proofName(r)}
                </button>
              </td>

              <td className={cell}>{r.date}</td>

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[r.status]}`}
                >
                  {r.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onView(r)}
                    className={btn}
                  >
                    View
                  </button>

                  {r.status === "Pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => onApprove(r)}
                        className={yellowBtn}
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => onReject(r)}
                        className={btn}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={headings.length}
                className="px-4 py-10 text-center text-[color:var(--secondary-text)]"
              >
                Koi request nahi mili
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

/* ---------------- Page ---------------- */

const TopUpRequestsPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");

  const handleTab = (t) => {
    setTab(t);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Receipt naye browser tab mein khulti hai
  const handlePreview = (r) => {
    window.open(r.proofUrl, "_blank", "noopener,noreferrer");
  };

  const handleViewClick = (r) => setSelectedId(r.id);

  const handleViewClose = () => setSelectedId(null);

  const handleApproveClick = (r) => setApproveId(r.id);

  const handleApproveCancel = () => setApproveId(null);

  const handleApproveConfirm = () => {
    setRequests(
      requests.map((r) =>
        r.id === approveId ? { ...r, status: "Approved" } : r
      )
    );

    setApproveId(null);
    setSelectedId(null);
  };

  const handleRejectClick = (r) => {
    setReason("");
    setRejectId(r.id);
  };

  const handleRejectCancel = () => setRejectId(null);

  const handleRejectConfirm = () => {
    setRequests(
      requests.map((r) =>
        r.id === rejectId
          ? {
              ...r,
              status: "Rejected",
              rejectionReason: reason.trim(),
            }
          : r
      )
    );

    setRejectId(null);
    setSelectedId(null);
  };

  const selected = requests.find((r) => r.id === selectedId);

  const approveRequest = requests.find((r) => r.id === approveId);

  const rejectRequest = requests.find((r) => r.id === rejectId);

  // Har tab ke records
  const counts = requests.reduce(
    (all, r) => ({
      ...all,
      [r.type]: (all[r.type] || 0) + 1,
      All: all.All + 1,
    }),
    { All: 0 }
  );

  // Tab + search + status
  const visible = requests.reduce((all, r) => {
    const matchTab = tab === "All" || r.type === tab;

    const matchSearch = `${r.id} ${r.name} ${r.type} ${r.method}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = status === "All" || r.status === status;

    return matchTab && matchSearch && matchStatus ? [...all, r] : all;
  }, []);

  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));

  const current = Math.min(page, totalPages);

  const rows = visible.slice(
    (current - 1) * perPage,
    current * perPage
  );

  const detailRows = selected
    ? [
        { label: "Name", value: selected.name },
        { label: "User Type", value: selected.type },
        { label: "Payment Method", value: selected.method },
        { label: "Amount", value: selected.amount },
        { label: "Date", value: selected.date },
        ...(selected.status === "Rejected"
          ? [
              {
                label: "Rejection Reason",
                value: selected.rejectionReason,
              },
            ]
          : []),
      ]
    : [];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Top-Up Requests
      </h1>

      {/* Tabs */}
      <div className="mt-5 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTab(t)}
            className={`shrink-0 rounded-md border px-4 py-2 text-sm ${
              tab === t
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {t} ({counts[t] || 0})
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + status */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search
              size={16}
              className="shrink-0 text-[color:var(--secondary-text)]"
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>

          <select
            value={status}
            onChange={handleStatus}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <TopUpTable
          rows={rows}
          showType={tab === "All"}
          onPreview={handlePreview}
          onView={handleViewClick}
          onApprove={handleApproveClick}
          onReject={handleRejectClick}
        />

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} records</span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            <span>
              Page {current} / {totalPages}
            </span>

            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* View modal */}
      {selected && (
        <ModalShell size="max-w-xl" onClose={handleViewClose}>
          <h2 className="pr-8 text-2xl text-[color:var(--primary-text)]">
            {selected.id}
          </h2>

          <div
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ring-1 ${badgeColors[selected.status]}`}
          >
            {selected.status}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {detailRows.map((d) => (
              <div key={d.label}>
                <p className="text-sm text-[color:var(--secondary-text)]">
                  {d.label}
                </p>

                <p className="text-sm text-[color:var(--primary-text)]">
                  {d.value}
                </p>
              </div>
            ))}
          </div>

          {/* Payment Proof Preview */}
          <div className="mt-5 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)]">
            {getProofType(selected) === "pdf" ? (
              <iframe
                src={selected.proofUrl}
                title={`Payment Proof ${selected.id}`}
                className="h-[400px] w-full"
              />
            ) : getProofType(selected) === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selected.proofUrl}
                alt={`Payment Proof ${selected.id}`}
                className="max-h-[400px] w-full object-contain"
              />
            ) : (
              <p className="p-5 text-sm text-[color:var(--secondary-text)]">
                Unsupported file format.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
              <FileText size={18} className="shrink-0" />

              <span className="break-all">{proofName(selected)}</span>
            </div>

            <button
              type="button"
              onClick={() => handlePreview(selected)}
              className={modalOutlineBtn}
            >
              <Eye size={14} /> Preview
            </button>
          </div>

          {/* Last par buttons */}
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={handleViewClose}
              className={btn}
            >
              Close
            </button>

            {selected.status === "Pending" && (
              <>
                <button
                  type="button"
                  onClick={() => handleRejectClick(selected)}
                  className={btn}
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => handleApproveClick(selected)}
                  className={yellowBtn}
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </ModalShell>
      )}

      {/* Approve modal */}
      {approveRequest && (
        <ModalShell size="max-w-md" onClose={handleApproveCancel}>
          <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
            Approve Top-Up
          </h2>

          <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
            Approve {approveRequest.id} and credit {approveRequest.amount} to{" "}
            {approveRequest.name}&apos;s wallet?
          </p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleApproveCancel}
              className={btn}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApproveConfirm}
              className={yellowBtn}
            >
              Confirm Approval
            </button>
          </div>
        </ModalShell>
      )}

      {/* Reject modal */}
      {rejectRequest && (
        <ModalShell size="max-w-md" onClose={handleRejectCancel}>
          <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
            Reject Top-Up
          </h2>

          <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
            {rejectRequest.id} · {rejectRequest.name} · {rejectRequest.amount}
          </p>

          <label
            htmlFor="rejectReason"
            className="mt-4 block text-sm text-[color:var(--primary-text)]"
          >
            Rejection reason (required)
          </label>

          <textarea
            id="rejectReason"
            autoFocus
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-transparent p-3 text-sm text-[color:var(--primary-text)] outline-none"
          />

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleRejectCancel}
              className={btn}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={reason.trim() === ""}
              onClick={handleRejectConfirm}
              className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
            >
              Confirm Rejection
            </button>
          </div>
        </ModalShell>
      )}
    </section>
  );
};

export default TopUpRequestsPage;
