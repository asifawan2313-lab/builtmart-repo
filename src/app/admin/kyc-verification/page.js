"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Search,
  ShieldCheck,
  ShieldX,
  ArrowUpDown
} from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminKycDataRow from "../../../component/admin/kcy-verification/BmAdminKycDataRow";

/* =========================================================
   TEMPORARY DATA (demo / invented) — baad mein API se aayega
========================================================= */

const BM_KYC_ROLE_TABS = [
  { key: "supplier", label: "Supplier KYC" },
  { key: "rider", label: "Rider KYC" },
];

const BM_KYC_STATUS_TABS = [
  { key: "all", label: "All Requests" },
  { key: "pending", label: "Pending" },
  { key: "verified", label: "Verified" },
  { key: "rejected", label: "Rejected" },
];

const BM_KYC_STATS = {
  supplier: [
    { label: "Total Verification Requests", value: 2, icon: ClipboardList },
    { label: "Pending Verification", value: 1, icon: Clock },
    { label: "Verified Suppliers", value: 1, icon: ShieldCheck },
    { label: "Rejected Requests", value: 0, icon: ShieldX },
  ],
  rider: [
    { label: "Total Verification Requests", value: 3, icon: ClipboardList },
    { label: "Pending Verification", value: 1, icon: Clock },
    { label: "Verified Riders", value: 1, icon: ShieldCheck },
    { label: "Rejected Requests", value: 1, icon: ShieldX },
  ],
};

const BM_KYC_REQUESTS = [
  {
    id: "RDR-101",
    userType: "rider",
    name: "Hamza Ali",
    detail: "Bike · GRW-1234",
    email: "hamza@rider.pk",
    phone: "0300-7654321",
    address: "Model Town, Gujranwala",
    about: "Reliable delivery rider for construction materials, 3 years experience.",
    registeredOn: "05/10/2026",
    submittedOn: "15/10/2026",
    status: "pending",
    decisionDate: "",
    rejectionReason: "",
    history: "",
    documentName: "hamza-rider-kyc-documents.pdf",
    documentUrl: "/documents/hamza-rider-kyc-documents.pdf",
  },
  {
    id: "RDR-102",
    userType: "rider",
    name: "Bilal Delivery",
    detail: "Rickshaw · LHR-7731",
    email: "bilal@rider.pk",
    phone: "0345-4433221",
    address: "Satellite Town, Gujranwala",
    about: "Local deliveries for small material orders.",
    registeredOn: "01/09/2026",
    submittedOn: "10/09/2026",
    status: "rejected",
    decisionDate: "12/09/2026",
    rejectionReason: "CNIC back side is not clear.",
    history: "Rejected on 12/09/2026",
    documentName: "bilal-rider-kyc-documents.pdf",
    documentUrl: "/documents/bilal-rider-kyc-documents.pdf",
  },
  {
    id: "RDR-103",
    userType: "rider",
    name: "Asif Mehmood",
    detail: "Mazda Truck · LEB-4521",
    email: "asif@rider.pk",
    phone: "0322-7788990",
    address: "GT Road, Gujranwala",
    about: "Heavy load truck driver, bricks and steel.",
    registeredOn: "20/09/2026",
    submittedOn: "01/10/2026",
    status: "verified",
    decisionDate: "03/10/2026",
    rejectionReason: "",
    history: "Verified on 03/10/2026",
    documentName: "asif-rider-kyc-documents.pdf",
    documentUrl: "/documents/asif-rider-kyc-documents.pdf",
  },
  {
    id: "SUP-201",
    userType: "supplier",
    name: "Al-Rehman Depot",
    detail: "Cement & Steel",
    email: "info@alrehman.pk",
    phone: "0301-1122334",
    address: "Sialkot Bypass, Gujranwala",
    about: "Wholesale cement and steel supplier since 2012.",
    registeredOn: "08/10/2026",
    submittedOn: "14/10/2026",
    status: "pending",
    decisionDate: "",
    rejectionReason: "",
    history: "",
    documentName: "alrehman-supplier-kyc-documents.pdf",
    documentUrl: "/documents/alrehman-supplier-kyc-documents.pdf",
  },
  {
    id: "SUP-202",
    userType: "supplier",
    name: "Gujranwala Tiles House",
    detail: "Tiles & Sanitary",
    email: "sales@gtiles.pk",
    phone: "0333-9988776",
    address: "Rahwali, Gujranwala",
    about: "Tiles, marble and bathroom fittings.",
    registeredOn: "11/09/2026",
    submittedOn: "25/09/2026",
    status: "verified",
    decisionDate: "27/09/2026",
    rejectionReason: "",
    history: "Verified on 27/09/2026",
    documentName: "gtiles-supplier-kyc-documents.pdf",
    documentUrl: "/documents/gtiles-supplier-kyc-documents.pdf",
  },
];

const BmAdminKycTableheader = ({ role }) => {
  const isSupplier = role === "supplier";

  // Headings role ke hisaab se yahin condition laga kar manage hoti hain
  const headings = [
    { label: isSupplier ? "Business Name" : "Rider Name", sort: true },
    { label: isSupplier ? "Category" : "Vehicle" },
    { label: "Email" },
    { label: "Phone Number" },
    { label: "Submission Date", sort: true },
    { label: isSupplier ? "KYC Status" : "Verification Status" },
    { label: "Actions" },
  ];

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
  const [role, setRole] = useState("supplier");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const visibleRequests = BM_KYC_REQUESTS.reduce((all, request) => {
    const matches =
      request.userType === role &&
      (status === "all" || request.status === status) &&
      `${request.name} ${request.email} ${request.phone}`
        .toLowerCase()
        .includes(query);

    return matches ? [...all, request] : all;
  }, []);

  const handleRoleChange = (key) => {
    setRole(key);
    setStatus("all");
    setSearch("");
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader
        title="KYC Verification"
        description="Manage Supplier, Rider verification requests in one place."
      />

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BM_KYC_STATS[role].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-[color:var(--secondary-text)]">
                {label}
              </p>
              <Icon size={16} className="text-[color:var(--secondary-text)]" />
            </div>
            <p className="mt-2 text-3xl text-[color:var(--primary-text)]">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* PARENT TABS */}
      <div className="mb-5 flex flex-wrap gap-2">
        {BM_KYC_ROLE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleRoleChange(tab.key)}
            className={`rounded-md border px-4 py-2 text-sm transition-colors ${
              role === tab.key
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* STATUS TABS */}
      <div className="mb-4 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
        {BM_KYC_STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatus(tab.key)}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors sm:text-sm ${
              status === tab.key
                ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <BmAdminKycTableheader role={role} />

            <tbody>
              {visibleRequests.map((request) => (
                <BmAdminKycDataRow key={request.id} request={request} />
              ))}

              {visibleRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
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