




// "use client";

// import { useState } from "react";
// import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

// /* ---------------- Dataset ---------------- */

// const initialDisputes = [
//   { id: "TKT-301", orderId: "ORD-1005", customer: "Ahmed Raza", supplier: "Brick House", type: "Quality issue", date: "2026-10-10", status: "Resolved" },
//   { id: "TKT-302", orderId: "ORD-1002", customer: "Sana Malik", supplier: "Brick House", type: "COD refused", date: "2026-10-17", status: "Open" },
//   { id: "TKT-303", orderId: "ORD-1003", customer: "Bilal Khan", supplier: "Sheikh Traders", type: "Paid but not delivered", date: "2026-10-18", status: "Under Review" },
//   { id: "TKT-304", orderId: "ORD-1007", customer: "Usman Ali", supplier: "Tile City", type: "Wrong item sent", date: "2026-10-19", status: "Waiting for Response" },
// ];

// const headings = ["Dispute ID", "Order ID", "Customer", "Supplier", "Dispute Type", "Date", "Status", "Actions"];
// const statusOptions = ["All", "Open", "Under Review", "Waiting for Response", "Resolved", "Rejected"];
// const outcomes = [
//   "Refund Issued",
//   "Replacement Provided",
//   "Resolved in Customer's Favor",
//   "Resolved in Supplier's Favor",
//   "No Action Required",
// ];
// const perPage = 8; // ek page par kitne rows

// /* ---------------- Shared styles ---------------- */

// // Status ke hisab se badge ka rang
// const badgeColors = {
//   Open: "bg-orange-50 text-orange-600 ring-orange-200",
//   "Under Review": "bg-orange-50 text-orange-600 ring-orange-200",
//   "Waiting for Response": "bg-blue-50 text-blue-600 ring-blue-200",
//   Resolved: "bg-green-50 text-green-700 ring-green-200",
//   Rejected: "bg-red-50 text-red-600 ring-red-200",
// };

// const btn =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
// const input =
//   "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
// const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";
// const modalCancelBtn =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// /* ---------------- Shared modal shell ---------------- */

// // Overlay + heading + close + "ID · type" line + Cancel/Confirm buttons: dono modals yahi use karte hain
// const DisputeModal = ({ title, dispute, onClose, confirmText, confirmClass, disabled, onConfirm, children }) => (
//   <div
//     onClick={onClose}
//     className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="relative w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
//     >
//       {/* Heading + Close */}
//       <div className="flex items-start justify-between gap-3">
//         <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">{title}</h2>
//         <button
//           type="button"
//           aria-label="Close"
//           onClick={onClose}
//           className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
//         {dispute.id} · {dispute.type}
//       </p>

//       {children}

//       {/* Cancel + Confirm */}
//       <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//         <button type="button" onClick={onClose} className={modalCancelBtn}>
//           Cancel
//         </button>
//         <button
//           type="button"
//           disabled={disabled}
//           onClick={onConfirm}
//           className={`rounded-md px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${confirmClass}`}
//         >
//           {confirmText}
//         </button>
//       </div>
//     </div>
//   </div>
// );

// /* ---------------- Reject modal ---------------- */

// const DisputeRejectModal = ({ dispute, onClose, onConfirm }) => {
//   const [reason, setReason] = useState("");

//   // Reason khali ho to Confirm button band rahega
//   const isEmpty = reason.trim() === "";

//   const handleConfirm = () => {
//     if (isEmpty) return;
//     onConfirm(reason.trim());
//   };

//   return (
//     <DisputeModal
//       title="Reject Dispute"
//       dispute={dispute}
//       onClose={onClose}
//       confirmText="Confirm Rejection"
//       confirmClass="bg-red-600 text-white hover:bg-red-700"
//       disabled={isEmpty}
//       onConfirm={handleConfirm}
//     >
//       <div className="mt-4">
//         <label htmlFor="disputeRejectReason" className={label}>Rejection Reason (required)</label>
//         <textarea
//           id="disputeRejectReason"
//           rows={3}
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           autoFocus
//           className={`${input} resize-y`}
//         />
//       </div>
//     </DisputeModal>
//   );
// };

// /* ---------------- Resolve modal ---------------- */

// const DisputeResolveModal = ({ dispute, onClose, onConfirm }) => {
//   const [outcome, setOutcome] = useState(outcomes[0]);
//   const [note, setNote] = useState("");

//   // Note khali ho to Confirm button band rahega
//   const isEmpty = note.trim() === "";

//   const handleConfirm = () => {
//     if (isEmpty) return;
//     onConfirm(outcome, note.trim());
//   };

//   return (
//     <DisputeModal
//       title="Resolve Dispute"
//       dispute={dispute}
//       onClose={onClose}
//       confirmText="Confirm Resolution"
//       confirmClass="bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//       disabled={isEmpty}
//       onConfirm={handleConfirm}
//     >
//       <div className="mt-4">
//         <label htmlFor="disputeOutcome" className={label}>Resolution Outcome</label>
//         <select id="disputeOutcome" value={outcome} onChange={(e) => setOutcome(e.target.value)} className={input}>
//           {outcomes.map((o) => (
//             <option key={o}>{o}</option>
//           ))}
//         </select>
//       </div>

//       <div className="mt-4">
//         <label htmlFor="disputeNote" className={label}>Resolution Note (required)</label>
//         <textarea
//           id="disputeNote"
//           rows={3}
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           className={`${input} resize-y`}
//         />
//       </div>
//     </DisputeModal>
//   );
// };

// /* ---------------- Page ---------------- */

// const DisputesPage = () => {
//   const [disputes, setDisputes] = useState(initialDisputes);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);
//   const [resolving, setResolving] = useState(null); // Resolve modal wali dispute
//   const [rejecting, setRejecting] = useState(null); // Reject modal wali dispute

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleStatus = (e) => {
//     setStatus(e.target.value);
//     setPage(1);
//   };

//   // Reject modal: confirm par status Rejected karo aur reason save karo
//   const handleReject = (reason) => {
//     setDisputes(
//       disputes.map((d) => (d.id === rejecting.id ? { ...d, status: "Rejected", reason } : d))
//     );
//     setRejecting(null);
//   };

//   // Resolve modal: confirm par status Resolved karo aur outcome + note save karo
//   const handleResolve = (outcome, note) => {
//     setDisputes(
//       disputes.map((d) => (d.id === resolving.id ? { ...d, status: "Resolved", outcome, note } : d))
//     );
//     setResolving(null);
//   };

//   // 1) Search aur dropdown dono par poore utre hue disputes chuno
//   const visible = disputes.reduce((all, d) => {
//     const matchSearch = `${d.id} ${d.orderId} ${d.customer} ${d.supplier} ${d.type}`
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     const matchStatus = status === "All" || d.status === status;
//     return matchSearch && matchStatus ? [...all, d] : all;
//   }, []);

//   // 2) Pages
//   const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
//   const current = Math.min(page, totalPages);

//   // 3) Sirf is page ke rows
//   const rows = visible.slice((current - 1) * perPage, current * perPage);

//   return (
//     <section className="p-4 sm:p-6 lg:p-8">
//       {/* Heading */}
//       <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
//         Disputes &amp; Support
//       </h1>

//       {/* Card */}
//       <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
//         {/* Search + dropdown */}
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
//             className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-52"
//           >
//             {statusOptions.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1000px] text-left text-sm">
//             <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
//               <tr>
//                 {headings.map((h) => (
//                   <th key={h} className="px-4 py-3 font-medium">
//                     <span className="inline-flex items-center gap-1">
//                       {h}
//                       {h === "Date" && <ArrowUpDown size={12} />}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {rows.map((d) => (
//                 <tr key={d.id} className="border-t border-[color:var(--border-color)]">
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.id}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.orderId}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.customer}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.supplier}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.type}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.date}</td>
//                   <td className="px-4 py-3">
//                     <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[d.status]}`}>
//                       {d.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       <button type="button" onClick={() => console.log("View", d.id)} className={btn}>View</button>

//                       {/* Resolve / Reject sirf unn disputes par jo abhi band nahi hue */}
//                       {d.status !== "Resolved" && d.status !== "Rejected" && (
//                         <>
//                           <button
//                             type="button"
//                             onClick={() => setResolving(d)}
//                             className="rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//                           >
//                             Resolve
//                           </button>
//                           <button type="button" onClick={() => setRejecting(d)} className={btn}>
//                             Reject
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer: records + pages */}
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
//             <span>Page {current} / {totalPages}</span>
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

//       {/* Modals */}
//       {resolving && (
//         <DisputeResolveModal
//           key={resolving.id}
//           dispute={resolving}
//           onClose={() => setResolving(null)}
//           onConfirm={handleResolve}
//         />
//       )}
//       {rejecting && (
//         <DisputeRejectModal
//           key={rejecting.id}
//           dispute={rejecting}
//           onClose={() => setRejecting(null)}
//           onConfirm={handleReject}
//         />
//       )}
//     </section>
//   );
// };

// export default DisputesPage;



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Search,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------
   1) Simple data (har item ka apna unique id)
------------------------------------------------------------------ */

const BM_TABS = ["All Disputes", "Material Orders", "Labour Bookings"];
const BM_STATUS_FILTERS = ["All", "Open", "Under Review", "Resolved", "Rejected"];
const BM_OUTCOMES = [
  "Refund Issued",
  "Replacement Sent",
  "Partial Refund",
  "Supplier Warned",
  "No Action Needed",
];
const BM_PAGE_SIZE = 5; // aik page par kitni rows

// Table ke headings
const BM_COLUMNS = [
  { id: 1, label: "Dispute ID" },
  { id: 2, label: "Order ID" },
  { id: 3, label: "Customer" },
  { id: 4, label: "Supplier" },
  { id: 5, label: "Dispute Type" },
  { id: 6, label: "Date", sortable: true },
  { id: 7, label: "Status" },
  { id: 8, label: "Actions" },
];

// kind: "material" ya "labour" (tabs isi se filter hote hain)
const BM_START_DISPUTES = [
  {
    id: 1,
    ticket: "TKT-301",
    kind: "material",
    order: "ORD-1005",
    customer: "Ahmed Raza",
    supplier: "Brick House",
    type: "Quality issue",
    date: "2026-10-10",
    status: "Resolved",
    description: "Half the tiles arrived cracked.",
    file: "cracked_tiles.jpg",
    messages: [
      { id: 1, who: "Ahmed Raza", date: "2026-10-10", text: "Tiles are cracked, see photo." },
      { id: 2, who: "Brick House", date: "2026-10-10", text: "Sorry, please return them." },
      { id: 3, who: "Admin", date: "2026-10-11", text: "Refund approved after return." },
    ],
    outcome: "Refund Issued",
    note: "Refund issued after return.",
    decisionDate: "2026-10-11",
    rejectReason: "",
  },
  {
    id: 2,
    ticket: "TKT-302",
    kind: "material",
    order: "ORD-1002",
    customer: "Sana Malik",
    supplier: "Brick House",
    type: "COD refused",
    date: "2026-10-17",
    status: "Open",
    description: "Customer refused to pay cash on delivery.",
    file: "refusal_photo.jpg",
    messages: [
      { id: 1, who: "Brick House", date: "2026-10-17", text: "Customer refused the COD payment at the door." },
    ],
    outcome: "",
    note: "",
    decisionDate: "",
    rejectReason: "",
  },
  {
    id: 3,
    ticket: "TKT-303",
    kind: "material",
    order: "ORD-1003",
    customer: "Bilal Khan",
    supplier: "Sheikh Traders",
    type: "Paid but not delivered",
    date: "2026-10-18",
    status: "Under Review",
    description: "I paid online but the order never arrived.",
    file: "payment_receipt.jpg",
    messages: [
      { id: 1, who: "Bilal Khan", date: "2026-10-18", text: "Paid on 15 Oct, still not delivered." },
      { id: 2, who: "Sheikh Traders", date: "2026-10-18", text: "Rider is delayed, will deliver tomorrow." },
    ],
    outcome: "",
    note: "",
    decisionDate: "",
    rejectReason: "",
  },
  {
    id: 4,
    ticket: "LTKT-101",
    kind: "labour",
    order: "LBOOK-103",
    customer: "Bilal Khan",
    supplier: "Worker: Ghulam Rasool",
    type: "Project delay",
    date: "2026-11-03",
    status: "Open",
    description: "Worker arrived 3 days late.",
    file: "",
    messages: [
      { id: 1, who: "Bilal Khan", date: "2026-11-03", text: "Worker did not come on the agreed day." },
    ],
    outcome: "",
    note: "",
    decisionDate: "",
    rejectReason: "",
  },
];

// Status chip ke rang
const BM_CHIP_COLORS = {
  Open: "border-orange-300 bg-orange-50 text-orange-500",
  "Under Review": "border-orange-300 bg-orange-50 text-orange-500",
  Resolved: "border-green-300 bg-green-50 text-green-600",
  Rejected: "border-red-300 bg-red-50 text-red-500",
};

/* ------------------------------------------------------------------
   2) Chhote helpers (isi file ke andar)
------------------------------------------------------------------ */

const fieldClass =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] focus:ring-1 focus:ring-[color:var(--primary-yellow)]";
const btnClass =
  "cursor-pointer whitespace-nowrap rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]";

// Demo file: asli file abhi nahi hai, is liye canvas se aik JPEG image banti hai
const bmMakeDemoFile = (fileName) => {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#F4F4F2";
  ctx.fillRect(0, 0, 800, 500);
  ctx.fillStyle = "#292929";
  ctx.textAlign = "center";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText(fileName, 400, 240);
  ctx.font = "22px sans-serif";
  ctx.fillText("Demo evidence file", 400, 290);

  return canvas.toDataURL("image/jpeg", 0.9);
};

// Data URL ko Blob mein badalta hai (taake nayi tab mein khul sake)
const bmDataUrlToBlob = (dataUrl) => {
  const [head, body] = dataUrl.split(",");
  const mime = head.match(/:(.*?);/)[1];
  const bytes = atob(body);
  const array = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) array[i] = bytes.charCodeAt(i);
  return new Blob([array], { type: mime });
};

// Popup (overlay + X button). Bahar click karne se band hota hai.
const ModalShell = ({ size = "max-w-md", onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className="bm-adminDisputes-overlay fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`bm-adminDisputes-modal relative my-auto max-h-[92vh] w-full ${size} overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer text-[color:var(--primary-text)] hover:opacity-70"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

// Disputes ki table (grid/table ka component, isi file ke andar)
const DisputesTable = ({ rows, sortDir, onSort, onView, onResolve, onReject }) => {
  return (
    <div className="bm-adminDisputes-tableWrap overflow-x-auto">
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead className="bg-[var(--off-white-background)] text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
          <tr>
            {BM_COLUMNS.map((col) => (
              <th key={col.id} className="px-4 py-3 font-[family-name:Poppins-Medium]">
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={onSort}
                    aria-label={`Sort by date (${sortDir === "asc" ? "oldest first" : "newest first"})`}
                    className="flex cursor-pointer items-center gap-1 uppercase tracking-wider"
                  >
                    {col.label}
                    <ArrowUpDown size={12} />
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            // Resolve / Reject sirf unpar jo abhi khule hain
            const isOpenCase = row.status === "Open" || row.status === "Under Review";

            return (
              <tr
                key={row.id}
                className="border-t border-[color:var(--border-color)] text-[color:var(--primary-text)]"
              >
                <td className="px-4 py-4">{row.ticket}</td>
                <td className="px-4 py-4">{row.order}</td>
                <td className="px-4 py-4">{row.customer}</td>
                <td className="px-4 py-4">{row.supplier}</td>
                <td className="px-4 py-4">{row.type}</td>
                <td className="whitespace-nowrap px-4 py-4">{row.date}</td>
                <td className="px-4 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${
                      BM_CHIP_COLORS[row.status]
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onView(row.id)} className={btnClass}>
                      View
                    </button>
                    {isOpenCase && (
                      <>
                        <button
                          type="button"
                          onClick={() => onResolve(row.id)}
                          className="cursor-pointer whitespace-nowrap rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] shadow-sm transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
                        >
                          Resolve
                        </button>
                        <button type="button" onClick={() => onReject(row.id)} className={btnClass}>
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}

          {rows.length === 0 && (
            <tr>
              <td
                colSpan={BM_COLUMNS.length}
                className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
              >
                No disputes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

/* ------------------------------------------------------------------
   3) Page (poora code isi page.js mein)
------------------------------------------------------------------ */
const BmAdminDisputes = () => {
  const router = useRouter();

  // ===== State =====
  const [disputes, setDisputes] = useState(BM_START_DISPUTES);
  const [tab, setTab] = useState(BM_TABS[0]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDir, setSortDir] = useState("asc"); // "asc" = purani date pehle
  const [page, setPage] = useState(1);

  const [viewId, setViewId] = useState(null); // View modal
  const [resolveId, setResolveId] = useState(null); // Resolve modal
  const [rejectId, setRejectId] = useState(null); // Reject modal
  const [outcome, setOutcome] = useState(BM_OUTCOMES[0]);
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState("");

  // ===== Filter (tab + status + search) =====
  const text = search.trim().toLowerCase();
  const filtered = disputes.reduce((all, d) => {
    const matchesTab =
      tab === "All Disputes" ||
      (tab === "Material Orders" && d.kind === "material") ||
      (tab === "Labour Bookings" && d.kind === "labour");
    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
    const matchesSearch =
      !text ||
      [d.ticket, d.order, d.customer, d.supplier, d.type].some((value) =>
        value.toLowerCase().includes(text)
      );

    return matchesTab && matchesStatus && matchesSearch ? [...all, d] : all;
  }, []);

  // ===== Sort (date) aur pages =====
  const sorted = [...filtered].sort((a, b) =>
    sortDir === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / BM_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = sorted.slice((currentPage - 1) * BM_PAGE_SIZE, currentPage * BM_PAGE_SIZE);

  // Modal mein jo dispute khuli hai
  const viewing = disputes.find((d) => d.id === viewId);
  const resolving = disputes.find((d) => d.id === resolveId);
  const rejecting = disputes.find((d) => d.id === rejectId);

  // ===== Helpers =====
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  // Aik dispute mein tabdili
  const updateDispute = (id, changes) => {
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, ...changes } : d)));
  };

  const today = () => new Date().toISOString().slice(0, 10);

  // ===== Handlers: tabs, search, filter, sort, pages =====
  const handleTabClick = (label) => {
    setTab(label);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleSortToggle = () => {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
  };

  const handlePrevPage = () => setPage(Math.max(1, currentPage - 1));
  const handleNextPage = () => setPage(Math.min(totalPages, currentPage + 1));

  // ===== Handlers: View modal =====
  const handleView = (id) => setViewId(id);
  const handleCloseView = () => setViewId(null);

  // Order ID par click: us order ki list par jao
  const handleOpenOrder = (order) => {
    setViewId(null);
    router.push(order.startsWith("LBOOK") ? "/admin/labour-requests" : "/admin/orders");
  };

  // Preview: file nayi tab mein khulti hai
  const handlePreview = (fileName) => {
    const blob = bmDataUrlToBlob(bmMakeDemoFile(fileName));
    window.open(URL.createObjectURL(blob), "_blank");
  };

  // Download: file computer mein save hoti hai
  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = bmMakeDemoFile(fileName);
    link.download = fileName;
    link.click();
  };

  // ===== Handlers: Resolve modal =====
  const handleOpenResolve = (id) => {
    setOutcome(BM_OUTCOMES[0]);
    setNote("");
    setResolveId(id);
  };
  const handleCloseResolve = () => setResolveId(null);

  const handleConfirmResolve = (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    updateDispute(resolveId, {
      status: "Resolved",
      outcome,
      note: note.trim(),
      decisionDate: today(),
      messages: [
        ...resolving.messages,
        { id: Date.now(), who: "Admin", date: today(), text: note.trim() },
      ],
    });
    setResolveId(null);
    showToast("Dispute resolved.");
  };

  // ===== Handlers: Reject modal =====
  const handleOpenReject = (id) => {
    setReason("");
    setRejectId(id);
  };
  const handleCloseReject = () => setRejectId(null);

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    updateDispute(rejectId, {
      status: "Rejected",
      rejectReason: reason.trim(),
      decisionDate: today(),
      messages: [
        ...rejecting.messages,
        { id: Date.now(), who: "Admin", date: today(), text: reason.trim() },
      ],
    });
    setRejectId(null);
    showToast("Dispute rejected.");
  };

  return (
    <section className="bm-adminDisputes-root p-4 sm:p-6 lg:p-8">
      {/* ----- Heading ----- */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Disputes &amp; Support
      </h1>

      {/* ----- Tabs ----- */}
      <div className="bm-adminDisputes-tabs mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-gray-200/70 p-1">
        {BM_TABS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => handleTabClick(label)}
            className={`cursor-pointer rounded-md px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:text-sm ${
              tab === label
                ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ----- Card: search + filter + table + pages ----- */}
      <div className="bm-adminDisputes-card mt-5 overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_200px]">
          <div className="flex min-w-0 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              aria-label="Search disputes"
              className="min-h-10 w-full min-w-0 bg-transparent text-sm outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={handleStatusChange}
            aria-label="Filter by status"
            className={`${fieldClass} min-h-10`}
          >
            {BM_STATUS_FILTERS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <DisputesTable
          rows={rows}
          sortDir={sortDir}
          onSort={handleSortToggle}
          onView={handleView}
          onResolve={handleOpenResolve}
          onReject={handleOpenReject}
        />

        {/* Neeche: records aur pages */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{sorted.length} records</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ----- Toast ----- */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-4 z-[80] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6"
        >
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* ================= View modal ================= */}
      {viewing && (
        <ModalShell size="max-w-xl" onClose={handleCloseView}>
          <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
            {viewing.ticket} — {viewing.type}
          </h2>

          {/* Status ki lambi patti */}
          <p
            className={`mt-3 w-full rounded-full border px-3 py-0.5 text-xs ${BM_CHIP_COLORS[viewing.status]}`}
          >
            {viewing.status}
          </p>

          <p className="mt-4 text-sm text-[color:var(--primary-text)]">{viewing.description}</p>

          <p className="mt-3 break-words text-sm text-[color:var(--primary-text)]">
            Order:{" "}
            <button
              type="button"
              onClick={() => handleOpenOrder(viewing.order)}
              className="cursor-pointer underline hover:opacity-70"
            >
              {viewing.order}
            </button>{" "}
            · Customer: {viewing.customer} · Supplier: {viewing.supplier}
          </p>

          {/* Attachment: Preview aur Download */}
          {viewing.file && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-color)] pb-4">
              <span className="flex min-w-0 items-center gap-2 text-sm text-[color:var(--primary-text)]">
                <FileText size={20} className="shrink-0 text-[color:var(--secondary-text)]" />
                <span className="truncate">{viewing.file}</span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handlePreview(viewing.file)}
                  className={`${btnClass} flex items-center gap-1.5`}
                >
                  <Eye size={14} />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(viewing.file)}
                  className={`${btnClass} flex items-center gap-1.5`}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Baat cheet */}
          <div className="mt-4 flex flex-col gap-3 border-b border-[color:var(--border-color)] pb-4">
            {viewing.messages.map((msg) => (
              <div key={msg.id}>
                <p className="text-xs text-[color:var(--secondary-text)]">
                  {msg.who} · {msg.date}
                </p>
                <p className="break-words text-sm text-[color:var(--primary-text)]">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Faisla (sirf Resolved ya Rejected par) */}
          {viewing.status === "Resolved" && (
            <div className="mt-4 flex flex-col gap-3 text-[color:var(--primary-text)]">
              <p className="break-words">
                <span className="font-[family-name:Poppins-Medium]">Resolution Outcome:</span>{" "}
                {viewing.outcome}
              </p>
              <p className="break-words">
                <span className="font-[family-name:Poppins-Medium]">Resolution Note:</span>{" "}
                {viewing.note}
              </p>
              <p>
                <span className="font-[family-name:Poppins-Medium]">Decision Date:</span>{" "}
                {viewing.decisionDate}
              </p>
            </div>
          )}

          {viewing.status === "Rejected" && (
            <div className="mt-4 flex flex-col gap-3 text-[color:var(--primary-text)]">
              <p className="break-words">
                <span className="font-[family-name:Poppins-Medium]">Rejection Reason:</span>{" "}
                {viewing.rejectReason}
              </p>
              <p>
                <span className="font-[family-name:Poppins-Medium]">Decision Date:</span>{" "}
                {viewing.decisionDate}
              </p>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleCloseView}
              className="cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
            >
              Close
            </button>
          </div>
        </ModalShell>
      )}

      {/* ================= Resolve Dispute modal (form) ================= */}
      {resolving && (
        <ModalShell onClose={handleCloseResolve}>
          <form onSubmit={handleConfirmResolve}>
            <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">Resolve Dispute</h2>

            <label
              htmlFor="bm-resolve-outcome"
              className="mt-4 block text-xs text-[color:var(--secondary-text)]"
            >
              Resolution Outcome
            </label>
            <select
              id="bm-resolve-outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className={`${fieldClass} mt-1`}
            >
              {BM_OUTCOMES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label
              htmlFor="bm-resolve-note"
              className="mt-4 block text-xs text-[color:var(--secondary-text)]"
            >
              Resolution Note (required)
            </label>
            <textarea
              id="bm-resolve-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`${fieldClass} mt-1`}
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseResolve}
                className="cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!note.trim()}
                className="cursor-pointer rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--primary-yellow)]"
              >
                Confirm Resolution
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {/* ================= Reject Dispute modal (form) ================= */}
      {rejecting && (
        <ModalShell onClose={handleCloseReject}>
          <form onSubmit={handleConfirmReject}>
            <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">Reject Dispute</h2>

            <label
              htmlFor="bm-reject-reason"
              className="mt-4 block text-xs text-[color:var(--secondary-text)]"
            >
              Rejection Reason (required)
            </label>
            <textarea
              id="bm-reject-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`${fieldClass} mt-1`}
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseReject}
                className="cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!reason.trim()}
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-[family-name:Poppins-Medium] text-[color:var(--white-cards)] hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </ModalShell>
      )}
    </section>
  );
};

export default BmAdminDisputes;