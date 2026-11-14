

"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  X,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* ==================================================================
   1) DATA (simple arrays, every item has a unique id)
   This is sample data. When the backend is ready, replace
   BM_START_RECORDS with API data; the fields must stay the same.
================================================================== */

const BM_TABS = [
  { id: 1, key: "supplier", label: "Supplier KYC" },
  // { id: 2, key: "labour", label: "Labour KYC" },
  { id: 3, key: "rider", label: "Rider KYC" },
];

const BM_STATUS_FILTERS = [
  { id: 1, label: "All" },
  { id: 2, label: "Pending" },
  { id: 3, label: "Verified" },
  { id: 4, label: "Rejected" },
];

// Table columns for each tab (Status and Actions columns are added below)
const BM_COLUMNS = {
  supplier: [
    { id: 1, label: "Supplier Name", key: "name" },
    { id: 2, label: "Shop / Business Name", key: "shop" },
    { id: 3, label: "Email", key: "email" },
    { id: 4, label: "Phone Number", key: "phone" },
    { id: 5, label: "Submission Date", key: "submittedOn" },
  ],
  // labour: [
  //   { id: 1, label: "Labour Name", key: "name" },
  //   { id: 2, label: "Email / Phone", key: "contact" },
  //   { id: 3, label: "CNIC Number", key: "cnic" },
  //   { id: 4, label: "Skill / Specialization", key: "skill" },
  //   { id: 5, label: "Submission Date", key: "submittedOn" },
  // ],
  rider: [
    { id: 1, label: "Rider Name", key: "name" },
    { id: 2, label: "Phone Number", key: "phone" },
    { id: 3, label: "Email", key: "email" },
    { id: 4, label: "Vehicle Type", key: "vehicleType" },
    { id: 5, label: "Submission Date", key: "submittedOn" },
  ],
};

// Search runs on these fields
const BM_SEARCH_KEYS = {
  supplier: ["name", "shop"],
  // labour: ["name", "skill"],
  rider: ["name", "vehicleType"],
};

// Registered information shown in the View modal
const BM_DETAIL_FIELDS = {
  supplier: [
    { id: 1, label: "Supplier / Owner Name", key: "name" },
    { id: 2, label: "Shop / Business Name", key: "shop" },
    { id: 3, label: "Email Address", key: "email" },
    { id: 4, label: "Phone Number", key: "phone" },
    { id: 5, label: "Business Address", key: "address" },
    { id: 6, label: "Business Description", key: "description" },
    { id: 7, label: "Registration Date", key: "registeredOn" },
  ],
  // labour: [
  //   { id: 1, label: "Full Name", key: "name" },
  //   { id: 2, label: "Profile Information", key: "profile" },
  //   { id: 3, label: "Email", key: "email" },
  //   { id: 4, label: "Phone Number", key: "phone" },
  //   { id: 5, label: "CNIC Number", key: "cnic" },
  //   { id: 6, label: "Labour Skills / Specializations", key: "skill" },
  //   { id: 7, label: "Experience", key: "experience" },
  //   { id: 8, label: "Registration Date", key: "registeredOn" },
  // ],
  rider: [
    { id: 1, label: "Rider Name", key: "name" },
    { id: 2, label: "Contact Number", key: "phone" },
    { id: 3, label: "Email", key: "email" },
    { id: 4, label: "CNIC Number", key: "cnic" },
    { id: 5, label: "Vehicle Type", key: "vehicleType" },
    { id: 6, label: "Vehicle Registration", key: "vehicleRegistration" },
    { id: 7, label: "Registration Date", key: "registeredOn" },
  ],
};

// Documents that must be inside the single PDF.
// Confirm the Labour and Rider lists against your registration forms.
const BM_REQUIRED_DOCS = {
  supplier: [
    { id: 1, label: "CNIC Front Side" },
    { id: 2, label: "CNIC Back Side" },
    { id: 3, label: "Shop / Business Licence or applicable NTN document" },
  ],
  // labour: [
  //   { id: 1, label: "CNIC Front Side" },
  //   { id: 2, label: "CNIC Back Side" },
  //   { id: 3, label: "Skill certificate / experience proof" },
  // ],
  rider: [
    { id: 1, label: "CNIC Front Side" },
    { id: 2, label: "CNIC Back Side" },
    { id: 3, label: "Driving licence" },
    { id: 4, label: "Vehicle registration" },
  ],
};

// Sample PDF: put any PDF at public/demo/kyc-sample.pdf
const BM_SAMPLE_PDF = "/demo/kyc-sample.pdf";

const BM_START_RECORDS = {
  supplier: [
    { id: "SUP-101", name: "Muhammad Usman", shop: "Al-Madina Building Materials", email: "usman@almadina.example", phone: "0300-1234567", address: "G.T. Road, Gujranwala", description: "Bricks, cement, steel bars and reused construction materials.", registeredOn: "2026-09-02", submittedOn: "2026-10-18", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "almadina-kyc-documents.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "SUP-102", name: "Tariq Sheikh", shop: "Sheikh Traders", email: "tariq@sheikh.example", phone: "0301-2345678", address: "Satellite Town, Gujranwala", description: "Wholesale supplier of cement and steel.", registeredOn: "2026-08-21", submittedOn: "2026-09-25", status: "Verified", decidedOn: "2026-09-27", rejectionReason: "", history: [{ id: 1, status: "Verified", reason: "", date: "2026-09-27" }], documentName: "sheikh-traders-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "SUP-103", name: "Zahid Mehmood", shop: "Zahid Iron Works", email: "zahid@ironworks.example", phone: "0302-3456789", address: "Model Town, Gujranwala", description: "Grills, gates and iron railings.", registeredOn: "2026-09-10", submittedOn: "2026-10-05", status: "Rejected", decidedOn: "2026-10-07", rejectionReason: "The NTN document scan is not clear. Please resubmit with a clear copy.", history: [{ id: 1, status: "Rejected", reason: "The NTN document scan is not clear. Please resubmit with a clear copy.", date: "2026-10-07" }], documentName: "zahid-iron-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "SUP-104", name: "Rana Asif", shop: "Brick House", email: "asif@brickhouse.example", phone: "0303-4567890", address: "Kamoke, Gujranwala", description: "A-class and B-class bricks.", registeredOn: "2026-10-01", submittedOn: "2026-10-19", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "brickhouse-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "SUP-105", name: "Noman Ali", shop: "Tile City", email: "noman@tilecity.example", phone: "0304-5678901", address: "Citi Housing, Gujranwala", description: "Floor, wall and porcelain tiles.", registeredOn: "2026-09-18", submittedOn: "2026-10-20", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "tilecity-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "SUP-106", name: "Faisal Iqbal", shop: "PaintPro", email: "faisal@paintpro.example", phone: "0305-6789012", address: "Wapda Town, Gujranwala", description: "Emulsion, enamel and weather coat paints.", registeredOn: "2026-08-30", submittedOn: "2026-09-12", status: "Verified", decidedOn: "2026-09-14", rejectionReason: "", history: [{ id: 1, status: "Verified", reason: "", date: "2026-09-14" }], documentName: "paintpro-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "SUP-107", name: "Adnan Butt", shop: "Butt Sand & Bajri", email: "adnan@buttsand.example", phone: "0306-7890123", address: "Rahwali, Gujranwala", description: "Chenab sand and gravel.", registeredOn: "2026-09-05", submittedOn: "2026-09-30", status: "Rejected", decidedOn: "2026-10-02", rejectionReason: "The back side of the CNIC is missing from the PDF.", history: [{ id: 1, status: "Rejected", reason: "The back side of the CNIC is missing from the PDF.", date: "2026-10-02" }], documentName: "butt-sand-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  ],
  // labour: [
  //   { id: "LAB-201", name: "Imran Khan", email: "imran@labour.example", phone: "0310-1111111", contact: "imran@labour.example / 0310-1111111", cnic: "34101-*******-1", skill: "Mason", experience: "8 years", profile: "Skilled in mason, brick and block work.", registeredOn: "2026-09-04", submittedOn: "2026-10-17", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "imran-khan-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  //   { id: "LAB-202", name: "Asad Raza", email: "asad@labour.example", phone: "0311-2222222", contact: "asad@labour.example / 0311-2222222", cnic: "34101-*******-3", skill: "Electrician", experience: "5 years", profile: "House wiring and panel work.", registeredOn: "2026-08-25", submittedOn: "2026-09-20", status: "Verified", decidedOn: "2026-09-22", rejectionReason: "", history: [{ id: 1, status: "Verified", reason: "", date: "2026-09-22" }], documentName: "asad-raza-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  //   { id: "LAB-203", name: "Shahid Ali", email: "shahid@labour.example", phone: "0312-3333333", contact: "shahid@labour.example / 0312-3333333", cnic: "34101-*******-5", skill: "Plumber", experience: "6 years", profile: "Bathroom and kitchen plumbing.", registeredOn: "2026-09-12", submittedOn: "2026-10-03", status: "Rejected", decidedOn: "2026-10-05", rejectionReason: "Experience proof is not included in the PDF.", history: [{ id: 1, status: "Rejected", reason: "Experience proof is not included in the PDF.", date: "2026-10-05" }], documentName: "shahid-ali-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  //   { id: "LAB-204", name: "Waseem Akram", email: "waseem@labour.example", phone: "0313-4444444", contact: "waseem@labour.example / 0313-4444444", cnic: "34101-*******-7", skill: "Painter", experience: "10 years", profile: "House and door painting.", registeredOn: "2026-09-20", submittedOn: "2026-10-19", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "waseem-akram-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  //   { id: "LAB-205", name: "Naveed Anjum", email: "naveed@labour.example", phone: "0314-5555555", contact: "naveed@labour.example / 0314-5555555", cnic: "34101-*******-9", skill: "Tile fitter", experience: "4 years", profile: "Floor and wall tile fitting.", registeredOn: "2026-10-02", submittedOn: "2026-10-20", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "naveed-anjum-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  // ],
  rider: [
    { id: "RID-301", name: "Hamza Ali", phone: "0300-7654321", email: "hamza@rider.example", cnic: "34101-*******-2", vehicleType: "Bike", vehicleRegistration: "GRW-1234", registeredOn: "2026-09-08", submittedOn: "2026-10-18", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "hamza-ali-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "RID-302", name: "Bilal Ahmed", phone: "0301-8765432", email: "bilal@rider.example", cnic: "34101-*******-4", vehicleType: "Rickshaw", vehicleRegistration: "GRW-5678", registeredOn: "2026-08-28", submittedOn: "2026-09-18", status: "Verified", decidedOn: "2026-09-20", rejectionReason: "", history: [{ id: 1, status: "Verified", reason: "", date: "2026-09-20" }], documentName: "bilal-ahmed-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "RID-303", name: "Saqib Hussain", phone: "0302-9876543", email: "saqib@rider.example", cnic: "34101-*******-6", vehicleType: "Loader / Pickup", vehicleRegistration: "GRW-9012", registeredOn: "2026-09-14", submittedOn: "2026-10-06", status: "Rejected", decidedOn: "2026-10-08", rejectionReason: "The driving licence copy is blurry.", history: [{ id: 1, status: "Rejected", reason: "The driving licence copy is blurry.", date: "2026-10-08" }], documentName: "saqib-hussain-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "RID-304", name: "Danish Raza", phone: "0303-6543210", email: "danish@rider.example", cnic: "34101-*******-8", vehicleType: "Bike", vehicleRegistration: "GRW-3456", registeredOn: "2026-10-03", submittedOn: "2026-10-20", status: "Pending", decidedOn: "", rejectionReason: "", history: [], documentName: "danish-raza-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
    { id: "RID-305", name: "Arslan Javed", phone: "0304-5432109", email: "arslan@rider.example", cnic: "34101-*******-0", vehicleType: "Truck", vehicleRegistration: "GRW-7890", registeredOn: "2026-09-22", submittedOn: "2026-10-12", status: "Verified", decidedOn: "2026-10-14", rejectionReason: "", history: [{ id: 1, status: "Verified", reason: "", date: "2026-10-14" }], documentName: "arslan-javed-kyc.pdf", documentUrl: BM_SAMPLE_PDF },
  ],
};

// Rows per page
const BM_PER_PAGE = 5;

// Status badge colours: Pending orange, Verified green, Rejected red
const BM_STATUS_TONE = {
  Pending: "border-orange-200 bg-orange-100 text-orange-700",
  Verified: "border-green-200 bg-green-100 text-green-700",
  Rejected: "border-red-200 bg-red-100 text-red-700",
};

/* ==================================================================
   2) Small helpers
================================================================== */

// Today's date (YYYY-MM-DD)
const todayText = () => new Date().toISOString().slice(0, 10);

// Small status label
const StatusBadge = ({ status }) => (
  <span
    className={`bmKyc-badge inline-block rounded-full border px-2.5 py-0.5 text-xs font-[family-name:Poppins-Medium] whitespace-nowrap ${BM_STATUS_TONE[status]}`}
  >
    {status}
  </span>
);

// Dark overlay + centered box (common part of every modal)
const ModalShell = ({ zClass, widthClass, onClose, children }) => (
  <div
    onClick={onClose}
    className={`bmKyc-overlay fixed inset-0 flex items-center justify-center bg-black/60 p-4 ${zClass}`}
  >
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
      className={`bmKyc-modal max-h-[92vh] w-full overflow-y-auto rounded-lg bg-[var(--white-cards)] shadow-xl ${widthClass}`}
    >
      {children}
    </div>
  </div>
);

/* ==================================================================
   3) KYC Verification page
================================================================== */

const AdminKycVerificationPage = () => {
  // ===== State =====
  const [records, setRecords] = useState(BM_START_RECORDS);
  const [activeTab, setActiveTab] = useState("supplier");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [viewingId, setViewingId] = useState(null); // record whose details are open
  const [isRejecting, setIsRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [toast, setToast] = useState("");

  // ===== Data of the current tab =====
  const list = records[activeTab];
  const columns = BM_COLUMNS[activeTab];
  const tabLabel = BM_TABS.reduce((name, t) => (t.key === activeTab ? t.label : name), "");

  // 1) Stats: how many records in each status
  const countStatus = (name) => list.reduce((n, r) => (r.status === name ? n + 1 : n), 0);
  const stats = [
    { id: 1, label: "Total Requests", value: list.length },
    { id: 2, label: "Pending Verification", value: countStatus("Pending") },
    { id: 3, label: "Verified", value: countStatus("Verified") },
    { id: 4, label: "Rejected", value: countStatus("Rejected") },
  ];

  // 2) Pick the records that match both search and status filter
  const searchText = search.trim().toLowerCase();
  const visible = list.reduce((all, r) => {
    const text = BM_SEARCH_KEYS[activeTab].map((key) => r[key]).join(" ").toLowerCase();
    const matchSearch = text.includes(searchText);
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus ? [...all, r] : all;
  }, []);

  // 3) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / BM_PER_PAGE));
  const current = Math.min(page, totalPages);
  const rows = visible.slice((current - 1) * BM_PER_PAGE, current * BM_PER_PAGE);

  // 4) The record whose details are open
  const viewing = list.find((r) => r.id === viewingId);

  // ===== Helpers =====
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  // Change one record (only in the current tab)
  const updateRecord = (id, changes) => {
    setRecords({
      ...records,
      [activeTab]: list.map((r) => (r.id === id ? { ...r, ...changes } : r)),
    });
  };

  // Esc closes the top-most modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (isRejecting) setIsRejecting(false);
      else if (viewingId) setViewingId(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isRejecting, viewingId]);

  // ===== Handlers =====
  // Switch tab: same page, only the data inside changes
  const handleTabClick = (key) => {
    setActiveTab(key);
    setSearch("");
    setStatusFilter("All");
    setPage(1);
    setViewingId(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => setPage(current - 1);
  const handleNextPage = () => setPage(current + 1);

  const handleView = (id) => setViewingId(id);
  const handleCloseView = () => setViewingId(null);

  // Preview: open the PDF in a new browser tab
  const handlePreview = () => {
    window.open(viewing.documentUrl, "_blank", "noopener,noreferrer");
  };

  // Approve: Pending -> Verified
  const handleApprove = () => {
    const date = todayText();
    updateRecord(viewing.id, {
      status: "Verified",
      decidedOn: date,
      rejectionReason: "",
      history: [...viewing.history, { id: viewing.history.length + 1, status: "Verified", reason: "", date }],
    });
    showToast(`${viewing.name}'s KYC has been approved`);
  };

  // Reject: first ask for a reason
  const handleRejectOpen = () => {
    setReason("");
    setReasonError("");
    setIsRejecting(true);
  };

  const handleRejectCancel = () => setIsRejecting(false);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    setReasonError("");
  };

  // Confirm reject: Pending -> Rejected (reason required)
  const handleRejectConfirm = () => {
    const cleanReason = reason.trim();
    if (cleanReason.length < 5) {
      setReasonError("A rejection reason is required (at least 5 characters).");
      return;
    }
    const date = todayText();
    updateRecord(viewing.id, {
      status: "Rejected",
      decidedOn: date,
      rejectionReason: cleanReason,
      history: [...viewing.history, { id: viewing.history.length + 1, status: "Rejected", reason: cleanReason, date }],
    });
    setIsRejecting(false);
    showToast(`${viewing.name}'s KYC has been rejected`);
  };

  // ===== Common classes =====
  const outlineBtn =
    "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";
  const yellowBtn =
    "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";

  return (
    <main className="bmKyc-root p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        KYC Verification
      </h1>
      <p className="mt-1 text-sm text-[color:var(--secondary-text)] sm:text-base">
        Manage Supplier,  Rider verification requests in one place.
      </p>

      {/* ----- Tabs ----- */}
      <div className="bmKyc-tabs mt-6 flex flex-wrap gap-2">
        {BM_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.key)}
            className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-[family-name:Poppins-Medium] shadow-sm transition-colors duration-300 ${
              activeTab === tab.key
                ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----- Stats (of the current tab) ----- */}
      <div className="bmKyc-stats mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm"
          >
            <p className="text-xs text-[color:var(--secondary-text)] sm:text-sm">{item.label}</p>
            <p className="mt-2 text-3xl leading-none font-[family-name:Baloo2-Bold] text-[color:var(--primary-text)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ----- Table card ----- */}
      <div className="bmKyc-card mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + status filter */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder={
                activeTab === "supplier"
                  ? "Search by supplier name or shop name..."
                  : "Search by name or " + (activeTab === "labour" ? "skill" : "vehicle") + "..."
              }
              aria-label="Search"
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            aria-label="Status filter"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {BM_STATUS_FILTERS.map((f) => (
              <option key={f.id} value={f.label}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs text-[color:var(--secondary-text)] uppercase">
              <tr>
                {columns.map((col) => (
                  <th key={col.id} className="px-4 py-3 font-medium">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium">Verification Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[color:var(--border-color)]">
                  {columns.map((col) => (
                    <td key={col.id} className="px-4 py-3 text-[color:var(--primary-text)]">
                      {row[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleView(row.id)}
                      className="bmKyc-viewBtn flex cursor-pointer items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]">
              No {tabLabel} requests found.
            </p>
          )}
        </div>

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} record(s)</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={handlePrevPage}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
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
              onClick={handleNextPage}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= View Details modal ================= */}
      {viewing && (
        <ModalShell zClass="z-[70]" widthClass="max-w-3xl" onClose={handleCloseView}>
          {/* Title + status + X */}
          <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] p-5 sm:p-6">
            <div>
              <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">
                {tabLabel} Details
              </h2>
              <p className="mt-1 text-xs text-[color:var(--secondary-text)]">ID: {viewing.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={viewing.status} />
              <button
                type="button"
                onClick={handleCloseView}
                aria-label="Close"
                className="cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {/* A. Information the user already saved (not asked again) */}
            <h3 className="text-base text-[color:var(--primary-text)]">A. Registered Information</h3>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {BM_DETAIL_FIELDS[activeTab].map((field) => (
                <div key={field.id}>
                  <dt className="text-xs text-[color:var(--secondary-text)]">{field.label}</dt>
                  <dd className="mt-0.5 text-sm break-words text-[color:var(--primary-text)]">
                    {viewing[field.key]}
                  </dd>
                </div>
              ))}
            </dl>

            {/* B. Verification information */}
            <h3 className="mt-6 text-base text-[color:var(--primary-text)]">B. Verification Information</h3>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[color:var(--secondary-text)]">KYC Submission Date</dt>
                <dd className="mt-0.5 text-sm text-[color:var(--primary-text)]">{viewing.submittedOn}</dd>
              </div>
              <div>
                <dt className="text-xs text-[color:var(--secondary-text)]">Verification Status</dt>
                <dd className="mt-0.5">
                  <StatusBadge status={viewing.status} />
                </dd>
              </div>
              {viewing.decidedOn && (
                <div>
                  <dt className="text-xs text-[color:var(--secondary-text)]">Decision Date</dt>
                  <dd className="mt-0.5 text-sm text-[color:var(--primary-text)]">{viewing.decidedOn}</dd>
                </div>
              )}
              {viewing.status === "Rejected" && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[color:var(--secondary-text)]">Rejection Reason</dt>
                  <dd className="mt-0.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {viewing.rejectionReason}
                  </dd>
                </div>
              )}
            </dl>

            {/* Previous decisions (if any) */}
            {viewing.history.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-[color:var(--secondary-text)]">Verification History</p>
                <ul className="mt-1 flex flex-col gap-1">
                  {viewing.history.map((h) => (
                    <li key={h.id} className="text-xs text-[color:var(--primary-text)]">
                      {h.date} · {h.status}
                      {h.reason && ` · ${h.reason}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* C. One combined PDF */}
            <h3 className="mt-6 text-base text-[color:var(--primary-text)]">C. Uploaded Verification Document</h3>
            <p className="mt-2 text-xs text-[color:var(--secondary-text)]">
              This single PDF should contain these documents in this order:
            </p>
            <ol className="mt-1 list-inside list-decimal text-sm text-[color:var(--primary-text)]">
              {BM_REQUIRED_DOCS[activeTab].map((doc) => (
                <li key={doc.id}>{doc.label}</li>
              ))}
            </ol>

            {/* Single document card */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[color:var(--border-color)] bg-[var(--off-white-background)] p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]">
                  <FileText size={20} />
                </span>
                <p className="min-w-0 truncate text-sm text-[color:var(--primary-text)]">
                  {viewing.documentName}
                </p>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={handlePreview} className={`${outlineBtn} flex items-center gap-1.5`}>
                  <Eye size={16} />
                  Preview
                </button>
                <a
                  href={viewing.documentUrl}
                  download={viewing.documentName}
                  className={`${outlineBtn} flex items-center gap-1.5`}
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>

            {/* Actions: only on Pending */}
            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[color:var(--border-color)] pt-4">
              {viewing.status === "Pending" ? (
                <>
                  <button type="button" onClick={handleRejectOpen} className={outlineBtn}>
                    Reject
                  </button>
                  <button type="button" onClick={handleApprove} className={yellowBtn}>
                    Approve
                  </button>
                </>
              ) : (
                <>
                  <p className="mr-auto text-xs text-[color:var(--secondary-text)]">
                    This request has already been {viewing.status === "Verified" ? "verified" : "rejected"}.
                    {viewing.status === "Rejected" && " The user can resubmit a corrected PDF."}
                  </p>
                  <button type="button" onClick={handleCloseView} className={outlineBtn}>
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </ModalShell>
      )}

      {/* ================= Reject confirmation modal (reason required) ================= */}
      {viewing && isRejecting && (
        <ModalShell zClass="z-[80]" widthClass="max-w-md" onClose={handleRejectCancel}>
          <div className="p-5 sm:p-6">
            <h2 className="text-xl text-[color:var(--primary-text)]">Reject KYC request</h2>
            <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
              Write the reason for rejection so {viewing.name} knows what to fix. They will be able to resubmit a corrected PDF.
            </p>

            <label htmlFor="bm-kyc-reason" className="mt-4 mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
              Rejection Reason
            </label>
            <textarea
              id="bm-kyc-reason"
              rows={4}
              value={reason}
              onChange={handleReasonChange}
              placeholder="Example: The back side of the CNIC is missing from the PDF."
              className="w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
            />
            {reasonError && (
              <p role="alert" className="mt-2 text-sm text-red-700">
                {reasonError}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={handleRejectCancel} className={outlineBtn}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="cursor-pointer rounded-md bg-[var(--charcoal-black)] px-4 py-2 text-sm font-[family-name:Poppins-Medium] text-[color:var(--white-cards)] transition-colors duration-300 hover:bg-[var(--industrial-blue-grey)]"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ===== Toast ===== */}
      {toast && (
        <div
          role="status"
          className="bmKyc-toast fixed right-4 bottom-5 z-[100] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6"
        >
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </main>
  );
};

export default AdminKycVerificationPage;