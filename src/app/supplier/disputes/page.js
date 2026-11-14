// "use client";

// import { useState } from "react";
// import { CheckCircle2, Plus, X } from "lucide-react";

// import BmSupplierDisputesTable from "../../../component/supplier/Bmdisputetable.js";

// // ========== DATA ==========
// // Dropdown ke options. Naya category chahiye to bas aik naam aur likh dein.
// const BM_CATEGORIES = [
//   "COD Refused",
//   "Payment Issue",
//   "Return / Refund",
//   "Delivery Commitment",
//   "Quantity Disagreement",
//   "Other",
// ];

// // "Related Order ID" dropdown ke liye orders
// const BM_ORDERS = [
//   { id: 1, order: "BM-ORD-1001", customer: "Ali Raza" },
//   { id: 2, order: "BM-ORD-1002", customer: "Sana Tariq" },
//   { id: 3, order: "BM-ORD-1003", customer: "Bilal Ahmed" },
//   { id: 4, order: "BM-ORD-1005", customer: "Fatima Noor" },
// ];

// const BM_START_DISPUTES = [
//   {
//     id: 1,
//     ticket: "TKT-7001",
//     order: "BM-ORD-1005",
//     customer: "Fatima Noor",
//     category: "COD Refused",
//     date: "2026-10-10",
//     status: "Under Review",
//   },
// ];

// // Form ki shuruati (khali) halat
// const BM_EMPTY_FORM = {
//   orderId: "1",
//   category: BM_CATEGORIES[0],
//   description: "",
//   evidence: "",
// };

// export default function SupplierDisputesPage() {
//   // ===== State =====
//   const [disputes, setDisputes] = useState(BM_START_DISPUTES);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [form, setForm] = useState(BM_EMPTY_FORM);
//   const [toast, setToast] = useState("");

//   // ===== Handlers =====
//   const handleOpenForm = () => {
//     setForm(BM_EMPTY_FORM);
//     setIsFormOpen(true);
//   };

//   const handleCloseForm = () => {
//     setIsFormOpen(false);
//   };

//   // Har input ke liye aik hi handler (input ke name se field milti hai)
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Evidence file: sirf naam yaad rakhte hain (upload backend baad mein)
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setForm({ ...form, evidence: file ? file.name : "" });
//   };

//   // Submit Ticket: nayi ticket table ke upar add karo
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const selectedOrder = BM_ORDERS.find((o) => String(o.id) === form.orderId);

//     const newTicket = {
//       id: Date.now(),
//       ticket: `TKT-${7001 + disputes.length}`,
//       order: selectedOrder.order,
//       customer: selectedOrder.customer,
//       category: form.category,
//       date: new Date().toISOString().slice(0, 10),
//       status: "Open",
//     };

//     setDisputes([newTicket, ...disputes]);
//     setIsFormOpen(false);
//     setToast("Ticket submitted");
//     setTimeout(() => setToast(""), 2500);
//   };

//   // Table ka "Open" button (ticket chat page abhi baqi hai)
//   const handleOpenTicket = (id) => {
//     console.log("Open ticket:", id);
//   };

//   // Input ki common styling
//   const inputClass =
//     "bmDisputes-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";
//   const labelClass =
//     "bmDisputes-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]";

//   return (
//     <main className="bmDisputes-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       {/* ----- Header: heading (left) + Create Dispute (right) ----- */}
//       <div className="bmDisputes-header flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div>
//           <h1 className="bmDisputes-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//             Disputes &amp; Support
//           </h1>
//           <p className="bmDisputes-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
//             Dispute tickets, ticket chat aur Admin resolution
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={handleOpenForm}
//           className="bmDisputes-createBtn flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] sm:w-auto"
//         >
//           <Plus size={16} />
//           Create Dispute
//         </button>
//       </div>

//       {/* ----- Tickets table ----- */}
//       <div className="bmDisputes-tableBox mt-6">
//         <BmSupplierDisputesTable disputes={disputes} onOpen={handleOpenTicket} />
//       </div>

//       {/* ----- Toast ----- */}
//       {toast && (
//         <div className="bmDisputes-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
//           <CheckCircle2 size={18} />
//           {toast}
//         </div>
//       )}

//       {/* ===== Create Dispute modal (form isi page mein) ===== */}
//       {isFormOpen && (
//         <div className="bmDisputes-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//           <div className="bmDisputes-modal max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-lg bg-[var(--white-cards)] p-5 sm:p-6">
//             <div className="flex items-center justify-between border-b border-[color:var(--border-color)] pb-3">
//               <h2 className="text-xl text-[color:var(--primary-text)]">Create Dispute</h2>
//               <button
//                 type="button"
//                 onClick={handleCloseForm}
//                 aria-label="Close"
//                 className="cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
//               {/* Related Order ID */}
//               <div>
//                 <label className={labelClass}>Related Order ID</label>
//                 <select name="orderId" value={form.orderId} onChange={handleChange} className={inputClass}>
//                   {BM_ORDERS.map((o) => (
//                     <option key={o.id} value={o.id}>
//                       {o.order} — {o.customer}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Dispute Category */}
//               <div>
//                 <label className={labelClass}>Dispute Category</label>
//                 <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
//                   {BM_CATEGORIES.map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className={labelClass}>Description</label>
//                 <textarea
//                   name="description"
//                   rows={4}
//                   value={form.description}
//                   onChange={handleChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               {/* Evidence */}
//               <div>
//                 <label className={labelClass}>Evidence (file)</label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className={`${inputClass} cursor-pointer file:mr-2 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm`}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="cursor-pointer rounded-md bg-[var(--primary-yellow)] py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
//               >
//                 Submit Ticket
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Eye, FileWarning, Plus, Search, Send, Upload, X } from "lucide-react";

/* ============================================================
   DATA (demo)
   ============================================================ */

const tabs = ["All", "Open", "Under Review", "Resolved", "Rejected"];

// Status badge ke Tailwind classes
const statusClass = {
  Open: "bg-[#FDC716]/25 text-[#202124]",
  "Under Review": "bg-blue-50 text-blue-700",
  Resolved: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

const startDisputes = [
  { id: "DSP-3005", subject: "Customer refused COD payment", against: "Fatima Noor", role: "Customer", order: "BM-ORD-1005", issueType: "COD refused", date: "Nov 3, 2026", status: "Open", evidence: ["refusal_photo.png", "door_photo.png"],
    description: "The customer refused to pay cash on delivery at the door and the order came back.", adminResponse: null, outcome: "" },
  { id: "DSP-3004", subject: "Rider delivered late", against: "Usman Rider", role: "Rider", order: "BM-ORD-1001", issueType: "Delivery commitment", date: "Nov 3, 2026", status: "Under Review", evidence: ["delay_chat.png"],
    description: "The rider reached 2 days late and the customer cancelled part of the order.",
    adminResponse: { text: "We have contacted the rider and asked for a reply within 3 working days.", date: "Nov 4, 2026" }, outcome: "" },
  { id: "DSP-3003", subject: "Half payment received", against: "Bilal Ahmed", role: "Customer", order: "BM-ORD-1003", issueType: "Payment issue", date: "Oct 28, 2026", status: "Under Review", evidence: [],
    description: "The customer paid Rs 5,000 less than the order total.",
    adminResponse: { text: "We are checking the payment record.", date: "Oct 29, 2026" }, outcome: "" },
  { id: "DSP-3002", subject: "Wrong quantity claimed", against: "Sana Tariq", role: "Customer", order: "BM-ORD-1002", issueType: "Quantity disagreement", date: "Oct 20, 2026", status: "Resolved", evidence: ["quantity_sheet.png", "delivery_note.png"],
    description: "The customer says 100 bricks were short, but the delivery note shows the full count.",
    adminResponse: { text: "The delivery note matches the order, so the claim was not valid.", date: "Oct 22, 2026" }, outcome: "Resolved in favour of the supplier." },
  { id: "DSP-3001", subject: "Return request after use", against: "Ali Raza", role: "Customer", order: "BM-ORD-1001", issueType: "Return / Refund", date: "Oct 12, 2026", status: "Rejected", evidence: [],
    description: "The customer wants to return cement bags after opening them.",
    adminResponse: { text: "The return reason was not supported by any evidence.", date: "Oct 14, 2026" }, outcome: "Rejected: no evidence was provided." },
];

// Dispute kis ke against: Customer ya Rider
const userTypes = ["Customer", "Rider"];
const nameLabel = { Customer: "Customer Name", Rider: "Rider Name" };
const issueTypes = ["COD refused", "Payment issue", "Return / Refund", "Delivery commitment", "Quantity disagreement", "Other"];
const MAX_PHOTOS = 5;

const demoOrders = [
  { code: "BM-ORD-1001", item: "Red Clay Bricks (A-Class)", customer: "Ali Raza", rider: "Usman Rider" },
  { code: "BM-ORD-1002", item: "Ravi Sand (Rait)", customer: "Sana Tariq", rider: "Bilal Delivery" },
  { code: "BM-ORD-1003", item: "Steel Saria Grade 60", customer: "Bilal Ahmed", rider: "Usman Rider" },
  { code: "BM-ORD-1005", item: "Porcelain Floor Tiles", customer: "Fatima Noor", rider: "Bilal Delivery" },
];

// Naam likhte waqt suggestions
const suggestions = {
  Customer: [...new Set(demoOrders.map((order) => order.customer))],
  Rider: [...new Set(demoOrders.map((order) => order.rider))],
};

const startValues = { userType: "", name: "", order: "", issueType: "", subject: "", description: "" };

const rules = {
  userType: "Select who the dispute is against.",
  name: "Enter the name.",
  issueType: "Select an issue type.",
  subject: "Enter a short subject.",
  description: "Explain what happened.",
};

/* ============================================================
   SMALL PARTS
   ============================================================ */

const Field = ({ label, name, required, error, className = "", children }) => (
  <div className={className}>
    <label htmlFor={name} className="mb-1 block text-sm font-semibold text-[#202124]">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const backBtn = "inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#45484D] hover:text-[#202124]";

/* ============================================================
   PAGE: list + raise form + detail, sab isi file mein
   ============================================================ */

const SupplierDisputesPage = () => {
  const [disputes, setDisputes] = useState(startDisputes);
  const [screen, setScreen] = useState("list"); // list / new / detail
  const [detailId, setDetailId] = useState(null);
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const [values, setValues] = useState(startValues);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  const text = query.trim().toLowerCase();
  const visible = disputes.reduce((all, d) => {
    const matchTab = tab === "All" || d.status === tab;
    const matchText = !text || `${d.id} ${d.subject} ${d.against}`.toLowerCase().includes(text);
    return matchTab && matchText ? [...all, d] : all;
  }, []);

  const detail = disputes.find((d) => d.id === detailId);

  const inputClass = (name) =>
    `h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 disabled:cursor-not-allowed disabled:bg-[#F4F4F2] ${
      errors[name] ? "border-red-500" : "border-[#D9E3E9]"
    }`;

  /* ---------- Handlers ---------- */

  const handleOpenNew = () => {
    setValues(startValues);
    setPhotos([]);
    setErrors({});
    setScreen("new");
  };
  const handleBackToList = () => setScreen("list");

  const handleView = (id) => {
    setDetailId(id);
    setScreen("detail");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // User type badalne par purana naam saaf
    setValues((v) => ({ ...v, [name]: value, ...(name === "userType" && { name: "" }) }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  // Ek se zyada photos (MAX_PHOTOS tak)
  const handleFiles = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({ id: Math.random().toString(36).slice(2), name: file.name }));
    setPhotos((list) => [...list, ...picked].slice(0, MAX_PHOTOS));
    e.target.value = "";
  };

  const handleRemovePhoto = (id) => setPhotos((list) => list.filter((photo) => photo.id !== id));

  // Evidence ki image nayi tab mein khulti hai
  const handlePreview = (name) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="#F4F4F2"/><text x="240" y="150" font-size="26" font-family="Arial" text-anchor="middle" fill="#292929">${name}</text><text x="240" y="185" font-size="15" font-family="Arial" text-anchor="middle" fill="#6b6b6b">Demo evidence image</text></svg>`;
    window.open(URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })), "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = Object.entries(rules).reduce(
      (all, [key, message]) => (values[key].trim() ? all : { ...all, [key]: message }),
      {}
    );
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const order = demoOrders.find((o) => o.code === values.order);
    const newDispute = {
      id: `DSP-${3001 + disputes.length}`,
      subject: values.subject.trim(),
      against: values.name.trim(),
      role: values.userType,
      order: order ? order.code : "—",
      issueType: values.issueType,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Open",
      evidence: photos.map((p) => p.name),
      description: values.description.trim(),
      adminResponse: null,
      outcome: "",
    };

    setDisputes([newDispute, ...disputes]);
    setTab("All");
    setQuery("");
    setScreen("list");
    setToast("Dispute submitted");
    setTimeout(() => setToast(""), 2500);
  };

  /* ---------- Screens ---------- */

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* ================= LIST ================= */}
      {screen === "list" && (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Disputes</h1>
              <p className="mt-1 text-xs text-[#45484D]">Complaints you have raised about customers and riders.</p>
            </div>
            <button
              type="button"
              onClick={handleOpenNew}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
            >
              <Plus size={16} aria-hidden="true" />
              Raise a Dispute
            </button>
          </div>

          {/* Tabs + search */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Dispute status">
              {tabs.map((name) => {
                const isActive = tab === name;
                const count = disputes.reduce((n, d) => (name === "All" || d.status === name ? n + 1 : n), 0);
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTab(name)}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                      isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
                    }`}
                  >
                    {name}
                    <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search disputes"
                placeholder="Search disputes"
                className="h-10 w-full rounded-lg border border-[#D9E3E9] bg-white pl-9 pr-3 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
              />
            </div>
          </div>

          {/* List */}
          <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
            {visible.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-[#45484D]">No disputes found.</p>
            ) : (
              <ul className="divide-y divide-[#E2E4E7]">
                {visible.map(({ id, subject, against, role, date, status }) => (
                  <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                      <FileWarning size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 basis-48">
                      <p className="truncate text-sm font-semibold text-[#202124]">{subject}</p>
                      <p className="truncate text-xs text-[#45484D]">
                        {against} · {role}
                      </p>
                      <p className="truncate text-xs text-[#45484D]">
                        #{id} · {date}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
                    <button
                      type="button"
                      onClick={() => handleView(id)}
                      className="inline-flex h-9 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#D9E3E9] bg-white px-4 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
                    >
                      View
                      <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="mt-4 text-center text-xs text-[#45484D]">Sample disputes shown for demonstration purposes.</p>
        </>
      )}

      {/* ================= RAISE A DISPUTE (Support ka option nahi) ================= */}
      {screen === "new" && (
        <>
          <button type="button" onClick={handleBackToList} className={backBtn}>
            <ArrowLeft size={14} aria-hidden="true" />
            My Disputes
          </button>

          <h1 className="mt-3 text-2xl font-extrabold text-[#292929] sm:text-3xl">Raise a Dispute</h1>
          <p className="mt-1 text-xs text-[#45484D]">Tell us about the problem and attach photos if you have them.</p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6"
          >
            <Field label="Dispute Against" name="userType" required error={errors.userType}>
              <select id="userType" name="userType" value={values.userType} onChange={handleChange} className={inputClass("userType")}>
                <option value="">Select user type</option>
                {userTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

            <Field label={nameLabel[values.userType] || "Name"} name="name" required error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                list="name-options"
                value={values.name}
                onChange={handleChange}
                disabled={!values.userType}
                placeholder={values.userType ? `Enter ${nameLabel[values.userType].toLowerCase()}` : "Select user type first"}
                className={inputClass("name")}
              />
              <datalist id="name-options">
                {(suggestions[values.userType] || []).map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </Field>

            <Field label="Related Order" name="order" className="sm:col-span-2">
              <select id="order" name="order" value={values.order} onChange={handleChange} className={inputClass("order")}>
                <option value="">Select related order</option>
                {demoOrders.map(({ code, item }) => (
                  <option key={code} value={code}>
                    {code} · {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Issue Type" name="issueType" required error={errors.issueType}>
              <select id="issueType" name="issueType" value={values.issueType} onChange={handleChange} className={inputClass("issueType")}>
                <option value="">Select issue type</option>
                {issueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

            <Field label="Subject" name="subject" required error={errors.subject}>
              <input
                id="subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={handleChange}
                placeholder="Short title of the problem"
                className={inputClass("subject")}
              />
            </Field>

            <Field label="Description" name="description" required error={errors.description} className="sm:col-span-2">
              <textarea
                id="description"
                name="description"
                rows={5}
                value={values.description}
                onChange={handleChange}
                placeholder="Explain what happened"
                className={`${inputClass("description")} h-auto resize-none py-3`}
              />
            </Field>

            {/* Evidence: photos */}
            <div className="sm:col-span-2">
              <p className="mb-1 text-sm font-semibold text-[#202124]">
                Evidence <span className="font-normal text-[#45484D]">(optional)</span>
              </p>
              <label
                htmlFor="evidence"
                className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 border-dashed border-[#D9E3E9] bg-[#F4F4F2] px-4 py-6 text-center transition-colors hover:border-[#FDC716]"
              >
                <Upload size={24} className="text-[#384452]" aria-hidden="true" />
                <span className="text-sm font-semibold text-[#202124]">Upload photos</span>
                <span className="text-xs text-[#45484D]">
                  JPG or PNG, up to {MAX_PHOTOS} photos ({photos.length}/{MAX_PHOTOS})
                </span>
              </label>
              <input id="evidence" type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />

              {photos.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {photos.map(({ id, name }) => (
                    <li key={id} className="flex max-w-full items-center gap-2 rounded-full bg-[#F4F4F2] py-1 pl-3 pr-1 text-xs text-[#202124]">
                      <span className="truncate">{name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(id)}
                        aria-label={`Remove ${name}`}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-[#D9E3E9]"
                      >
                        <X size={12} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={handleBackToList}
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#202124] bg-white px-6 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-7 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
              >
                <Send size={16} aria-hidden="true" />
                Submit Dispute
              </button>
            </div>
          </form>
        </>
      )}

      {/* ================= DETAIL ================= */}
      {screen === "detail" && detail && (
        <>
          <button type="button" onClick={handleBackToList} className={backBtn}>
            <ArrowLeft size={14} aria-hidden="true" />
            My Disputes
          </button>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">{detail.subject}</h1>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[detail.status]}`}>{detail.status}</span>
          </div>
          <p className="mt-1 text-xs text-[#45484D]">
            #{detail.id} · {detail.date}
          </p>

          <section className="mt-6 max-w-3xl rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[#45484D]">Against</dt>
                <dd className="text-sm font-semibold text-[#202124]">
                  {detail.against} · {detail.role}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#45484D]">Related Order</dt>
                <dd className="text-sm font-semibold text-[#202124]">{detail.order}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#45484D]">Issue Type</dt>
                <dd className="text-sm font-semibold text-[#202124]">{detail.issueType}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#45484D]">Date</dt>
                <dd className="text-sm font-semibold text-[#202124]">{detail.date}</dd>
              </div>
            </dl>

            <h2 className="mt-6 text-sm font-semibold text-[#202124]">Description</h2>
            <p className="mt-1 break-words text-sm text-[#45484D]">{detail.description}</p>

            <h2 className="mt-6 text-sm font-semibold text-[#202124]">Evidence ({detail.evidence.length})</h2>
            {detail.evidence.length === 0 ? (
              <p className="mt-1 text-sm text-[#45484D]">No photos attached.</p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-2">
                {detail.evidence.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => handlePreview(name)}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#F4F4F2] px-3 py-1.5 text-xs text-[#202124] hover:bg-[#D9E3E9]"
                    >
                      <Eye size={12} aria-hidden="true" />
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {detail.adminResponse && (
              <div className="mt-6 rounded-lg bg-[#F4F4F2] p-4">
                <h2 className="text-sm font-semibold text-[#202124]">Admin Response</h2>
                <p className="mt-1 break-words text-sm text-[#45484D]">{detail.adminResponse.text}</p>
                <p className="mt-1 text-xs text-[#45484D]">{detail.adminResponse.date}</p>
              </div>
            )}

            {detail.outcome && (
              <div className="mt-4 rounded-lg border border-[#E2E4E7] p-4">
                <h2 className="text-sm font-semibold text-[#202124]">Outcome</h2>
                <p className="mt-1 break-words text-sm text-[#45484D]">{detail.outcome}</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* ===== Toast ===== */}
      {toast && (
        <div role="status" className="fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[#202124] px-4 py-3 text-sm text-white shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </main>
  );
};

export default SupplierDisputesPage;