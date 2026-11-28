"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search ,ArrowUpDown} from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";

import BmAdminOrderDataRow from "../../../component/admin/order/BmAdminOrderDataRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_ORDER_FILTERS = [
  "All",
  "Pending",
  "Processing",
  "Ready for Dispatch",
  "In Transit",
  "Delivered",
  "Returned",
  "Cancelled",
];

const BM_ORDERS = [
  {
    id: "ORD-1001",
    customer: "Ahmed Raza",
    customerPhone: "0300-1112233",
    supplier: "Sheikh Traders",
    supplierPhone: "0300-7778899",
    address: "House 22, DHA Phase 5, Lahore",
    material: "DG Khan Cement OPC × 50",
    amount: 67500,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Delivered",
    deliveryStatus: "Delivered",
    rider: "Asif Nawaz",
    date: "2026-09-28",
    timeline: [
      { label: "Pending", date: "2026-09-28" },
      { label: "Confirmed", date: "2026-09-29" },
      { label: "In Transit", date: "2026-09-30" },
      { label: "Delivered", date: "2026-10-01" },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Sana Malik",
    customerPhone: "0321-4455667",
    supplier: "Brick House",
    supplierPhone: "0333-2211009",
    address: "Street 4, Satellite Town, Gujranwala",
    material: "Red Clay Bricks (A-Class) × 5000",
    amount: 80000,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "In Transit",
    deliveryStatus: "In Transit",
    rider: "Usman Rider",
    date: "2026-10-15",
    timeline: [
      { label: "Pending", date: "2026-10-15" },
      { label: "Confirmed", date: "2026-10-15" },
      { label: "In Transit", date: "2026-10-16" },
    ],
  },
  {
    id: "ORD-1003",
    customer: "Bilal Khan",
    customerPhone: "0345-9988776",
    supplier: "Sheikh Traders",
    supplierPhone: "0300-7778899",
    address: "Model Town, Gujranwala",
    material: "Grade 60 Steel Saria 12mm × 400kg",
    amount: 106000,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Ready for Dispatch",
    deliveryStatus: "Ready for Dispatch",
    rider: "",
    date: "2026-10-16",
    timeline: [
      { label: "Pending", date: "2026-10-16" },
      { label: "Confirmed", date: "2026-10-16" },
      { label: "Ready for Dispatch", date: "2026-10-17" },
    ],
  },
  {
    id: "ORD-1005",
    customer: "Ahmed Raza",
    customerPhone: "0300-1112233",
    supplier: "Brick House",
    supplierPhone: "0333-2211009",
    address: "House 22, DHA Phase 5, Lahore",
    material: "Leftover Porcelain Tiles × 120 sq ft",
    amount: 13200,
    paymentMethod: "Online",
    paymentStatus: "Refunded",
    status: "Returned",
    deliveryStatus: "Returned",
    rider: "Asif Nawaz",
    date: "2026-10-09",
    timeline: [
      { label: "Pending", date: "2026-10-09" },
      { label: "Delivered", date: "2026-10-11" },
      { label: "Returned", date: "2026-10-13" },
    ],
  },
  {
    id: "ORD-1006",
    customer: "Sana Malik",
    customerPhone: "0321-4455667",
    supplier: "Sheikh Traders",
    supplierPhone: "0300-7778899",
    address: "Street 4, Satellite Town, Gujranwala",
    material: "DG Khan Cement OPC × 20",
    amount: 27000,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Cancelled",
    deliveryStatus: "Cancelled",
    rider: "",
    date: "2026-10-12",
    timeline: [
      { label: "Pending", date: "2026-10-12" },
      { label: "Cancelled", date: "2026-10-12" },
    ],
  },
];




const BmAdminKycTableheader = ({ role }) => {
  const isSupplier = role === "supplier";

  // Headings role ke hisaab se yahin condition laga kar manage hoti hain
  const orderHeadings = [
    { label: "Order ID", sort: true },
    { label: "Customer" },
    { label: "Supplier" },
    { label: "Total Amount", sort: true },
    { label: "Payment Status" },
    { label: "Order Status" },
    { label: "Order Date", sort: true },
    { label: "" },
  ];

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
    order: orderHeadings,
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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const query = search.trim().toLowerCase();

  const visibleOrders = BM_ORDERS.reduce((all, order) => {
    const matches =
      (filter === "All" || order.status === filter) &&
      `${order.id} ${order.customer} ${order.supplier}`
        .toLowerCase()
        .includes(query);

    return matches ? [...all, order] : all;
  }, []);

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader title="Orders" />

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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by order status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-48"
          >
            {BM_ORDER_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <BmAdminKycTableheader role="order" />

            <tbody>
              {visibleOrders.map((order) => (
                <BmAdminOrderDataRow key={order.id} order={order} />
              ))}

              {visibleOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleOrders.length}{" "}
            {visibleOrders.length === 1 ? "record" : "records"}
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