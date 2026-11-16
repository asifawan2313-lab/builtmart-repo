
// export default RiderDisputesPage;





"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpDown, CheckCircle2, ChevronLeft, ChevronRight, Plus, Search, Send, Upload, X } from "lucide-react";


import BmViewDisputes from "../../../component/shared/Disputes/BmViewDisputes.js"


/* ------------------------------------------------------------------
   1) Simple data
------------------------------------------------------------------ */

const BM_ME = { name: "Usman Rider", role: "Rider" };

const BM_TABS = ["Disputes", "Support"];
const BM_STATUS_FILTERS = ["All", "Open", "Under Review", "Resolved", "Rejected"];
const BM_PAGE_SIZE = 5;
const MAX_PHOTOS = 5;

// Dispute kis ke against: Customer ya Supplier
const userTypes = ["Customer", "Supplier"];
const nameLabel = { Customer: "Customer Name", Supplier: "Supplier Name" };
const issueTypes = [
  "COD refused",
  "COD short payment",
  "Fare / payment issue",
  "Pickup delay at supplier",
  "Customer unreachable / wrong address",
  "Goods damaged or short",
  "Delivery commitment",
  "Other",
];

// Rider ki deliveries (Related Delivery dropdown ke liye)
const demoOrders = [
  { code: "RD-101", item: "Portland Cement", customer: "Sana Tariq", supplier: "Al-Rehman Depot" },
  { code: "RD-102", item: "Red Bricks", customer: "Ali Raza", supplier: "Al-Rehman Depot" },
  { code: "RD-103", item: "Steel Rebar", customer: "Bilal Ahmed", supplier: "Al-Rehman Depot" },
  { code: "RD-104", item: "Porcelain Floor Tiles", customer: "Hira Javed", supplier: "Modern Tiles" },
];

// Naam likhte waqt suggestions
const suggestions = {
  Customer: [...new Set(demoOrders.map((o) => o.customer))],
  Supplier: [...new Set(demoOrders.map((o) => o.supplier))],
};

const startValues = { userType: "", name: "", order: "", amount: "", issueType: "", subject: "", description: "" };

const rules = {
  userType: "Select who the dispute is against.",
  name: "Enter the name.",
  issueType: "Select an issue type.",
  subject: "Enter a short subject.",
  description: "Explain what happened.",
};

// kind: "dispute" ya "support"
// raisedBy / against: { name, role }
// messages: by = "me" | "other" | "admin"
const BM_START_DISPUTES = [
  {
    id: 1, ticket: "RTKT-5001", kind: "dispute", order: "RD-101",
    raisedBy: BM_ME, against: { name: "Sana Tariq", role: "Customer" },
    type: "COD refused", date: "2026-11-04", status: "Open",
    description: "Customer refused to pay Rs 29,000 cash on delivery at the door.",
    messages: [
      { id: 1, by: "me", date: "Nov 4, 02:10 PM", text: "Customer refused the COD payment at Model Town.", image: "cod_refusal.png" },
      { id: 2, by: "other", date: "Nov 4, 03:00 PM", text: "The material was not what I ordered." },
    ],
    favour: "", note: "", decisionDate: "", rejectReason: "",
  },
  {
    id: 2, ticket: "RTKT-5002", kind: "dispute", order: "RD-102",
    raisedBy: BM_ME, against: { name: "Al-Rehman Depot", role: "Supplier" },
    type: "Pickup delay at supplier", date: "2026-11-03", status: "Under Review",
    description: "I waited 3 hours at the depot for the bricks to be loaded.",
    messages: [
      { id: 1, by: "me", date: "Nov 3, 11:00 AM", text: "Waited 3 hours for loading, delivery got late.", image: "depot_waiting.png" },
      { id: 2, by: "other", date: "Nov 3, 12:30 PM", text: "Stock was being arranged, sorry for the delay." },
      { id: 3, by: "admin", date: "Nov 4, 10:00 AM", text: "We are checking both sides, please wait." },
    ],
    favour: "", note: "", decisionDate: "", rejectReason: "",
  },
  {
    id: 3, ticket: "RTKT-5003", kind: "dispute", order: "RD-103",
    raisedBy: BM_ME, against: { name: "Bilal Ahmed", role: "Customer" },
    type: "Fare / payment issue", date: "2026-10-28", status: "Resolved",
    description: "The agreed fare was Rs 3,000 but the customer paid only Rs 2,500.",
    messages: [
      { id: 1, by: "me", date: "Oct 28, 05:00 PM", text: "Customer paid Rs 500 less than the fare." },
      { id: 2, by: "other", date: "Oct 28, 06:10 PM", text: "I will send the rest tomorrow." },
      { id: 3, by: "admin", date: "Oct 30, 10:00 AM", text: "Remaining Rs 500 has been added to the rider wallet." },
    ],
    favour: "Usman Rider", note: "Remaining Rs 500 added to the rider wallet.", decisionDate: "2026-10-30", rejectReason: "",
  },
  {
    id: 4, ticket: "RTKT-5004", kind: "dispute", order: "RD-104",
    raisedBy: { name: "Hira Javed", role: "Customer" }, against: BM_ME,
    type: "Delivery commitment", date: "2026-11-05", status: "Open",
    description: "Rider reached 2 hours after the promised time.",
    messages: [
      { id: 1, by: "other", date: "Nov 5, 06:00 PM", text: "Rider was 2 hours late for the tile delivery." },
    ],
    favour: "", note: "", decisionDate: "", rejectReason: "",
  },
  {
    id: 5, ticket: "RTKT-5005", kind: "dispute", order: "RD-101",
    raisedBy: BM_ME, against: { name: "Al-Rehman Depot", role: "Supplier" },
    type: "Goods damaged or short", date: "2026-10-12", status: "Rejected",
    description: "Some cement bags were torn when I received them at the depot.",
    messages: [
      { id: 1, by: "me", date: "Oct 12, 09:00 AM", text: "Bags were already torn at pickup." },
      { id: 2, by: "admin", date: "Oct 14, 11:00 AM", text: "Rejected: no photos were taken at the time of loading." },
    ],
    favour: "", note: "", decisionDate: "2026-10-14", rejectReason: "No photos were taken at the time of loading.",
  },
  {
    id: 6, ticket: "SUP-301", kind: "support", order: "",
    raisedBy: BM_ME, against: null,
    type: "Account help", date: "2026-11-06", status: "Open",
    description: "Unable to upload my vehicle documents.",
    messages: [
      { id: 1, by: "me", date: "Nov 6, 01:15 PM", text: "Vehicle document upload shows an error.", image: "upload_error.png" },
    ],
    favour: "", note: "", decisionDate: "", rejectReason: "",
  },
  {
    id: 7, ticket: "SUP-302", kind: "support", order: "",
    raisedBy: BM_ME, against: null,
    type: "Delivery fee", date: "2026-10-25", status: "Resolved",
    description: "Delivery fee not shown in my wallet.",
    messages: [
      { id: 1, by: "me", date: "Oct 25, 04:00 PM", text: "Fee for RD-210 is missing from my wallet." },
      { id: 2, by: "admin", date: "Oct 26, 10:00 AM", text: "Fee added to your wallet." },
    ],
    favour: "", note: "Fee for RD-210 added to the wallet.", decisionDate: "2026-10-26", rejectReason: "",
  },
  {
    id: 8, ticket: "SUP-303", kind: "support", order: "",
    raisedBy: BM_ME, against: null,
    type: "Wallet top-up", date: "2026-11-02", status: "Under Review",
    description: "My top-up is not credited yet.",
    messages: [
      { id: 1, by: "me", date: "Nov 2, 11:00 AM", text: "I sent Rs 5,000 but my wallet is not updated.", image: "topup_receipt.png" },
      { id: 2, by: "admin", date: "Nov 2, 12:10 PM", text: "We are checking your payment, please wait." },
    ],
    favour: "", note: "", decisionDate: "", rejectReason: "",
  },
];

const BM_CHIP_COLORS = {
  Open: "border-orange-300 bg-orange-50 text-orange-500",
  "Under Review": "border-orange-300 bg-orange-50 text-orange-500",
  Resolved: "border-green-300 bg-green-50 text-green-600",
  Rejected: "border-red-300 bg-red-50 text-red-500",
};

const BM_ROLE_COLORS = {
  Customer: "bg-blue-50 text-blue-600",
  Supplier: "bg-purple-50 text-purple-600",
  Rider: "bg-teal-50 text-teal-600",
  Labour: "bg-orange-50 text-orange-600",
};

const fieldClass =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] focus:ring-1 focus:ring-[color:var(--primary-yellow)]";
const btnClass =
  "cursor-pointer whitespace-nowrap rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]";
const yellowBtnClass =
  "cursor-pointer whitespace-nowrap rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] shadow-sm transition-colors duration-300 hover:bg-[var(--hover-yellow)]";
const labelClass = "mb-1 block text-sm text-[color:var(--primary-text)]";

/* ------------------------------------------------------------------
   2) Chhote helpers
------------------------------------------------------------------ */

// Demo image (chat mein dikhne wali)
const bmProofSrc = (name) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="#F4F4F2"/><text x="240" y="150" font-size="26" font-family="Arial" text-anchor="middle" fill="#292929">${name}</text><text x="240" y="185" font-size="15" font-family="Arial" text-anchor="middle" fill="#6b6b6b">Demo evidence image</text></svg>`;
  return { src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, svg };
};

// Dusri party (jo "me" nahi hai)
const bmOther = (d) => (d.raisedBy.name === BM_ME.name ? d.against : d.raisedBy);

const RoleLabel = ({ role }) => (
  <span className={`rounded px-1.5 py-0.5 text-[10px] ${BM_ROLE_COLORS[role]}`}>{role}</span>
);

// Disputes / Support ki table (sirf View, Resolve / Reject nahi)
const DisputesTable = ({ rows, isDispute, sortDir, onSort, onView }) => {
  const headings = [
    "Ticket ID",
    ...(isDispute ? ["Order ID"] : []),
    "Raised By",
    ...(isDispute ? ["Against"] : []),
    isDispute ? "Dispute Type" : "Support Type",
    "Date",
    "Status",
    "Actions",
  ];
  const cell = "px-4 py-4 align-top";

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-left text-sm">
        <thead className="bg-[var(--off-white-background)] text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
          <tr>
            {headings.map((h) => (
              <th key={h} className="px-4 py-3">
                {h === "Date" ? (
                  <button
                    type="button"
                    onClick={onSort}
                    aria-label={`Sort by date (${sortDir === "asc" ? "oldest first" : "newest first"})`}
                    className="flex cursor-pointer items-center gap-1 uppercase tracking-wider"
                  >
                    {h}
                    <ArrowUpDown size={12} />
                  </button>
                ) : (
                  h
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[color:var(--border-color)] text-[color:var(--primary-text)]">
              <td className={cell}>{row.ticket}</td>
              {isDispute && <td className={cell}>{row.order}</td>}
              <td className={cell}>
                <p>{row.raisedBy.name}</p>
                <div className="mt-1"><RoleLabel role={row.raisedBy.role} /></div>
              </td>
              {isDispute && (
                <td className={cell}>
                  <p>{row.against.name}</p>
                  <div className="mt-1"><RoleLabel role={row.against.role} /></div>
                </td>
              )}
              <td className={cell}>{row.type}</td>
              <td className={`${cell} whitespace-nowrap`}>{row.date}</td>
              <td className={cell}>
                <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${BM_CHIP_COLORS[row.status]}`}>
                  {row.status}
                </span>
              </td>
              <td className={cell}>
                <button type="button" onClick={() => onView(row.id)} className={btnClass}>
                  View
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={headings.length} className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

/* ------------------------------------------------------------------
   3) Page: list + raise form + chat screen, sab isi file mein
------------------------------------------------------------------ */
const RiderDisputesPage = () => {
  const chatRef = useRef(null);

  const [disputes, setDisputes] = useState(BM_START_DISPUTES);
  const [screen, setScreen] = useState("list"); // list / new
  const [tab, setTab] = useState(BM_TABS[0]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState(null);
  const [reply, setReply] = useState("");

  const [values, setValues] = useState(startValues);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  const isDispute = tab === "Disputes";

  // ===== Filter =====
  const text = search.trim().toLowerCase();
  const filtered = disputes.reduce((all, d) => {
    const matchesTab = d.kind === (isDispute ? "dispute" : "support");
    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
    const matchesSearch =
      !text ||
      [d.ticket, d.order, d.raisedBy.name, d.against ? d.against.name : "", d.type].some((v) => v.toLowerCase().includes(text));
    return matchesTab && matchesStatus && matchesSearch ? [...all, d] : all;
  }, []);

  // ===== Sort + pages =====
  const sorted = [...filtered].sort((a, b) =>
    sortDir === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / BM_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = sorted.slice((currentPage - 1) * BM_PAGE_SIZE, currentPage * BM_PAGE_SIZE);

  const viewing = disputes.find((d) => d.id === viewId);

  // Chat hamesha neeche tak scroll rahe
  const messageCount = viewing ? viewing.messages.length : 0;
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [viewId, messageCount]);

  const inputClass = (name) =>
    `${fieldClass} h-11 ${errors[name] ? "border-red-500" : ""} disabled:cursor-not-allowed disabled:bg-[var(--off-white-background)]`;

  // ===== Handlers =====
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

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
  const handleSortToggle = () => setSortDir(sortDir === "asc" ? "desc" : "asc");
  const handlePrevPage = () => setPage(Math.max(1, currentPage - 1));
  const handleNextPage = () => setPage(Math.min(totalPages, currentPage + 1));

  // View (chat)
  const handleView = (id) => {
    setReply("");
    setViewId(id);
  };
  const handleCloseView = () => setViewId(null);

  const handleImageOpen = (name) => {
    const blob = new Blob([bmProofSrc(name).svg], { type: "image/svg+xml" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  // Rider ka jawab
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setDisputes(
      disputes.map((d) =>
        d.id === viewId
          ? { ...d, messages: [...d.messages, { id: Date.now(), by: "me", date: "Just now", text: reply.trim() }] }
          : d
      )
    );
    setReply("");
  };

  // Raise a Dispute form
  const handleOpenNew = () => {
    setValues(startValues);
    setPhotos([]);
    setErrors({});
    setScreen("new");
  };
  const handleBackToList = () => setScreen("list");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // User type badalne par purana naam saaf
    setValues((v) => ({ ...v, [name]: value, ...(name === "userType" && { name: "" }) }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({ id: Math.random().toString(36).slice(2), name: file.name }));
    setPhotos((list) => [...list, ...picked].slice(0, MAX_PHOTOS));
    e.target.value = "";
  };
  const handleRemovePhoto = (id) => setPhotos((list) => list.reduce((all, p) => (p.id === id ? all : [...all, p]), []));

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
      id: Date.now(),
      ticket: `RTKT-${5001 + disputes.length}`,
      kind: "dispute",
      order: order ? order.code : "—",
      raisedBy: BM_ME,
      against: { name: values.name.trim(), role: values.userType },
      type: values.issueType,
      date: new Date().toISOString().slice(0, 10),
      status: "Open",
      description: values.description.trim(),
      messages: [
        { id: 1, by: "me", date: "Just now", text: values.description.trim(), ...(photos[0] ? { image: photos[0].name } : {}) },
        ...photos.slice(1).map((p, i) => ({ id: i + 2, by: "me", date: "Just now", text: "", image: p.name })),
      ],
      favour: "",
      note: "",
      decisionDate: "",
      rejectReason: "",
    };

    setDisputes([newDispute, ...disputes]);
    setTab("Disputes");
    setStatusFilter("All");
    setSearch("");
    setPage(1);
    setScreen("list");
    showToast("Dispute submitted. Admin will review it soon.");
  };

  // Chat bubble: me right (yellow), dusri party left, admin beech
  const bubbleFor = (d, m) => {
    if (m.by === "me")
      return { who: { name: "You", role: "" }, wrap: "justify-end", box: "bg-yellow-100 border border-yellow-300" };
    if (m.by === "other")
      return { who: bmOther(d), wrap: "justify-start", box: "bg-[var(--white-cards)] border border-[color:var(--border-color)]" };
    return { who: { name: "Admin", role: "" }, wrap: "justify-center", box: "bg-gray-100 border border-gray-300" };
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* ================= List screen ================= */}
      <div className={viewing || screen === "new" ? "hidden" : ""}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Disputes &amp; Support</h1>
          <button
            type="button"
            onClick={handleOpenNew}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm text-[color:var(--charcoal-black)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
          >
            <Plus size={16} />
            Raise a Dispute
          </button>
        </div>

        <div className="mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-gray-200/70 p-1">
          {BM_TABS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => handleTabClick(label)}
              className={`cursor-pointer rounded-md px-4 py-1.5 text-xs transition-colors duration-300 sm:text-sm ${
                tab === label
                  ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                  : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
          <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_200px]">
            <div className="flex min-w-0 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3">
              <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
              <input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                aria-label="Search"
                className="min-h-10 w-full min-w-0 bg-transparent text-sm outline-none"
              />
            </div>
            <select value={statusFilter} onChange={handleStatusChange} aria-label="Filter by status" className={`${fieldClass} min-h-10`}>
              {BM_STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <DisputesTable rows={rows} isDispute={isDispute} sortDir={sortDir} onSort={handleSortToggle} onView={handleView} />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
            <span>{sorted.length} records</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handlePrevPage} disabled={currentPage === 1} aria-label="Previous page" className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40">
                <ChevronLeft size={16} />
              </button>
              <span>
                Page {currentPage} / {totalPages}
              </span>
              <button type="button" onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Next page" className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Raise a Dispute (form isi page mein) ================= */}
      {screen === "new" && !viewing && (
        <>
          <button type="button" onClick={handleBackToList} className="flex cursor-pointer items-center gap-2 text-sm text-[color:var(--primary-text)] hover:opacity-70">
            <ArrowLeft size={16} />
            Back to Disputes
          </button>

          <h1 className="mt-3 text-2xl text-[color:var(--primary-text)] sm:text-3xl">Raise a Dispute</h1>
          <p className="mt-1 text-xs text-[color:var(--secondary-text)]">Tell us about the delivery problem and attach photos if you have them.</p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-5 shadow-sm sm:grid-cols-2 sm:p-6"
          >
            <div>
              <label htmlFor="userType" className={labelClass}>Dispute Against <span className="text-red-600">*</span></label>
              <select id="userType" name="userType" value={values.userType} onChange={handleChange} className={inputClass("userType")}>
                <option value="">Select user type</option>
                {userTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              {errors.userType && <p className="mt-1 text-xs text-red-600">{errors.userType}</p>}
            </div>

            <div>
              <label htmlFor="name" className={labelClass}>{nameLabel[values.userType] || "Name"} <span className="text-red-600">*</span></label>
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
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="order" className={labelClass}>Related Delivery</label>
              <select id="order" name="order" value={values.order} onChange={handleChange} className={inputClass("order")}>
                <option value="">Select related delivery</option>
                {demoOrders.map(({ code, item }) => (
                  <option key={code} value={code}>
                    {code} · {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className={labelClass}>Amount Involved (PKR)</label>
              <input id="amount" name="amount" type="number" min="0" value={values.amount} onChange={handleChange} placeholder="COD or fare amount (optional)" className={inputClass("amount")} />
            </div>

            <div>
              <label htmlFor="issueType" className={labelClass}>Issue Type <span className="text-red-600">*</span></label>
              <select id="issueType" name="issueType" value={values.issueType} onChange={handleChange} className={inputClass("issueType")}>
                <option value="">Select issue type</option>
                {issueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              {errors.issueType && <p className="mt-1 text-xs text-red-600">{errors.issueType}</p>}
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>Subject <span className="text-red-600">*</span></label>
              <input id="subject" name="subject" type="text" value={values.subject} onChange={handleChange} placeholder="Short title of the problem" className={inputClass("subject")} />
              {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className={labelClass}>Description <span className="text-red-600">*</span></label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={values.description}
                onChange={handleChange}
                placeholder="Explain what happened"
                className={`${inputClass("description")} h-auto resize-none py-3`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>

            {/* Evidence: photos */}
            <div className="sm:col-span-2">
              <p className="mb-1 text-sm text-[color:var(--primary-text)]">
                Evidence <span className="text-[color:var(--secondary-text)]">(optional)</span>
              </p>
              <label
                htmlFor="evidence"
                className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 border-dashed border-[color:var(--border-color)] bg-[var(--off-white-background)] px-4 py-6 text-center transition-colors hover:border-[color:var(--primary-yellow)]"
              >
                <Upload size={24} className="text-[color:var(--secondary-text)]" aria-hidden="true" />
                <span className="text-sm text-[color:var(--primary-text)]">Upload photos</span>
                <span className="text-xs text-[color:var(--secondary-text)]">
                  JPG or PNG, up to {MAX_PHOTOS} photos ({photos.length}/{MAX_PHOTOS})
                </span>
              </label>
              <input id="evidence" type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />

              {photos.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {photos.map(({ id, name }) => (
                    <li key={id} className="flex max-w-full items-center gap-2 rounded-full bg-[var(--off-white-background)] py-1 pl-3 pr-1 text-xs text-[color:var(--primary-text)]">
                      <span className="truncate">{name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(id)}
                        aria-label={`Remove ${name}`}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-[var(--border-color)]"
                      >
                        <X size={12} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 sm:col-span-2">
              <button type="button" onClick={handleBackToList} className={`${btnClass} px-6 py-2.5 text-sm`}>
                Cancel
              </button>
              <button type="submit" className={`${yellowBtnClass} inline-flex items-center gap-2 px-7 py-2.5`}>
                <Send size={16} aria-hidden="true" />
                Submit Dispute
              </button>
            </div>
          </form>
        </>
      )}

      {/* ----- Toast ----- */}
      {toast && (
        <div role="status" className="fixed bottom-5 right-4 z-[80] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* ================= Inner screen: left conversations, right chat ================= */}
      {viewing && (
        <div>
          <button type="button" onClick={handleCloseView} className="flex cursor-pointer items-center gap-2 text-sm text-[color:var(--primary-text)] hover:opacity-70">
            <ArrowLeft size={16} />
            Back to {tab}
          </button>

          <div className="mt-4 grid grid-cols-1 overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm lg:grid-cols-[320px_minmax(0,1fr)]">
            {/* ----- Left: conversations ----- */}
            <aside className="hidden max-h-[44rem] flex-col overflow-y-auto border-r border-[color:var(--border-color)] lg:flex">
              <h2 className="px-4 py-4 text-lg text-[color:var(--primary-text)]">{isDispute ? "Disputes" : "Support"}</h2>
              {sorted.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleView(d.id)}
                  className={`flex w-full cursor-pointer items-start gap-3 border-t border-[color:var(--border-color)] px-4 py-3 text-left transition-colors duration-300 ${
                    d.id === viewing.id ? "bg-[var(--off-white-background)]" : "hover:bg-[var(--off-white-background)]"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal-black)] text-sm text-[color:var(--primary-yellow)]">
                    {(d.kind === "dispute" ? bmOther(d) : d.raisedBy).name.charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm text-[color:var(--primary-text)]">
                        {(d.kind === "dispute" ? bmOther(d) : d.raisedBy).name}
                      </span>
                      <span className="shrink-0 text-[10px] text-[color:var(--secondary-text)]">{d.date}</span>
                    </span>
                    <span className="block truncate text-xs text-[color:var(--secondary-text)]">{d.type}</span>
                    <span className="block truncate text-xs text-[color:var(--secondary-text)]">
                      {d.messages[d.messages.length - 1].text || "Photo"}
                    </span>
                    <span className="mt-1 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[color:var(--primary-text)]">{d.ticket}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] ${BM_CHIP_COLORS[d.status]}`}>{d.status}</span>
                    </span>
                  </span>
                </button>
              ))}
            </aside>

            {/* ----- Right: chat ----- */}
            <div className="flex min-w-0 flex-col">
              <div className="border-b border-[color:var(--border-color)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg text-[color:var(--primary-text)]">
                    {viewing.ticket} — {viewing.type}
                  </h2>
                  <span className={`rounded-full border px-3 py-0.5 text-xs ${BM_CHIP_COLORS[viewing.status]}`}>{viewing.status}</span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--primary-text)]">{viewing.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[color:var(--primary-text)]">
                  <span className="flex items-center gap-2">
                    Raised by: {viewing.raisedBy.name} <RoleLabel role={viewing.raisedBy.role} />
                  </span>
                  {viewing.against && (
                    <span className="flex items-center gap-2">
                      Against: {viewing.against.name} <RoleLabel role={viewing.against.role} />
                    </span>
                  )}
                  {viewing.order && <span>Delivery: {viewing.order}</span>}
                </div>
              </div>

              {/* Chat window */}
              <div ref={chatRef} className="flex h-80 flex-col gap-3 overflow-y-auto bg-[var(--off-white-background)] p-4 lg:h-[26rem]">
                {viewing.messages.map((m) => {
                  const b = bubbleFor(viewing, m);
                  return (
                    <BmViewDisputes
                     m={m}
                      key={m.id}
                      handleImageOpen={handleImageOpen}
                      bmProofSrc={bmProofSrc}
                      RoleLabel={RoleLabel}
                      b={b}
                    
                    />
                    // <div key={m.id} className={`flex ${b.wrap}`}>
                    //   <div className={`max-w-[85%] rounded-lg px-3 py-2 sm:max-w-[70%] ${b.box}`}>
                    //     <p className="flex items-center gap-2 text-xs text-[color:var(--secondary-text)]">
                    //       {b.who.name}
                    //       {b.who.role && <RoleLabel role={b.who.role} />}
                    //     </p>
                    //     {m.text && <p className="mt-1 break-words text-sm text-[color:var(--primary-text)]">{m.text}</p>}
                    //     {m.image && (
                    //       <button
                    //         type="button"
                    //         onClick={() => handleImageOpen(m.image)}
                    //         aria-label={`Open ${m.image}`}
                    //         className="mt-2 block cursor-pointer overflow-hidden rounded-md border border-[color:var(--border-color)]"
                    //       >
                    //         {/* eslint-disable-next-line @next/next/no-img-element */}
                    //         <img src={bmProofSrc(m.image).src} alt={m.image} className="h-auto w-56 max-w-full" />
                    //       </button>
                    //     )}
                    //     <p className="mt-1 text-right text-[10px] text-[color:var(--secondary-text)]">{m.date}</p>
                    //   </div>
                    // </div>
                  );
                })}
              </div>

              {/* Admin ka faisla */}
              {viewing.status === "Resolved" && (
                <div className="flex flex-col gap-2 border-t border-[color:var(--border-color)] p-4 text-sm text-[color:var(--primary-text)]">
                  {viewing.kind === "dispute" && <p>Resolved in favour of: {viewing.favour}</p>}
                  <p className="break-words">Description: {viewing.note}</p>
                  <p>Decision Date: {viewing.decisionDate}</p>
                </div>
              )}
              {viewing.status === "Rejected" && (
                <div className="flex flex-col gap-2 border-t border-[color:var(--border-color)] p-4 text-sm text-[color:var(--primary-text)]">
                  <p className="break-words">Rejection Reason: {viewing.rejectReason}</p>
                  <p>Decision Date: {viewing.decisionDate}</p>
                </div>
              )}

              {/* Last par sirf jawab likhne ka box (Resolve / Reject nahi) */}
              {(viewing.status === "Open" || viewing.status === "Under Review") && (
                <form onSubmit={handleSendReply} className="flex items-center gap-2 border-t border-[color:var(--border-color)] p-4">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type a message"
                    aria-label="Type a message"
                    className={fieldClass}
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!reply.trim()}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RiderDisputesPage;