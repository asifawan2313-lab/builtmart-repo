"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import BmAdminKycPageheader from "../pageheader/BmAdminKycPageheader";


const CHIP = {
  green: "border-green-400 bg-green-50 text-green-700",
  blue: "border-blue-300 bg-blue-50 text-blue-600",
  orange: "border-orange-300 bg-orange-50 text-orange-500",
  red: "border-red-300 bg-red-50 text-red-500",
  gray: "border-[color:var(--border-color)] bg-[var(--off-white-background)] text-[color:var(--secondary-text)]",
};

const STATUS_COLOR = {
  Active: "green",
  Verified: "green",
  Paid: "green",
  Delivered: "green",
  "In Stock": "green",
  Inactive: "red",
  Rejected: "red",
  Refunded: "red",
  Returned: "red",
  Cancelled: "red",
  "Out of Stock": "red",
  Pending: "orange",
  Incomplete: "orange",
  "In Transit": "blue",
  "Ready for Dispatch": "blue",
};

const BACK_LABEL = {
  customer: "Customers",
  supplier: "Suppliers",
  rider: "Riders",
  subadmin: "Sub-Admins",
};

const formatRs = (amount) => `Rs ${amount.toLocaleString("en-US")}`;

const MODULE_OPTIONS = ["Moderater", "Super Admin"];

const input =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";
const outlineBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

const Chip = ({ label }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${CHIP[STATUS_COLOR[label] || "gray"]}`}
  >
    {label}
  </span>
);

// Inner table (rows = cells ki arrays)
const DetailTable = ({ title, headings, rows, search, onSearch }) => (
  <div className="mt-6">
    <h2 className="mb-3 text-sm font-semibold text-[color:var(--primary-text)]">{title}</h2>

    <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
      {onSearch && (
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
            <tr>
              {headings.map((heading) => (
                <th key={heading} className="px-4 py-3 font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, index) => (
              <tr key={index} className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
                {cells.map((cell, i) => (
                  <td key={i} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={headings.length} className="px-4 py-8 text-center text-sm text-[color:var(--secondary-text)]">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (abhi kuch implement nahi) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
        <span>
          {rows.length} {rows.length === 1 ? "record" : "records"}
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
  </div>
);

const BmAdminUsermanegementDataRow = ({ user }) => {
  const role = user.userType;
  const rowRef = useRef(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLeft, setViewLeft] = useState(0);
  const [orderSearch, setOrderSearch] = useState("");
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.accountStatus,
    modules: user.modules || [],
  });

  const isActive = user.accountStatus === "Active";

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleToggleModule = (item) =>
    handleChange(
      "modules",
      form.modules.includes(item)
        ? form.modules.reduce((all, m) => (m === item ? all : [...all, m]), [])
        : [...form.modules, item]
    );

  // Inner screen sidebar ke saath dikhane ke liye page ke <main> ki left position li jati hai
  const handleView = () => {
    const main = rowRef.current ? rowRef.current.closest("main") : null;
    setViewLeft(main ? main.getBoundingClientRect().left : 0);
    setViewOpen(true);
  };

  const handleToggleStatus = () => {
    // API call yahan aayegi
    alert(`${user.name} ${isActive ? "deactivated" : "activated"}`);
  };

  const handleSave = () => {
    // API call yahan aayegi
    alert(`Sub-admin updated: ${JSON.stringify(form)}`);
    setEditOpen(false);
  };

  const baseFields = [
    ["Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone],
    ["City", user.city],
    ["Registered", user.registered],
  ];

  const extraFields = {
    customer: [],
    subadmin: [],
    supplier: [
      ["Shop Name", user.shop],
      ["Business Type", user.businessType],
      ["Address", user.address],
      ["Submitted", user.submitted],
      ["Wallet Balance", formatRs(user.wallet || 0)],
    ],
    rider: [
      ["Vehicle Type", user.vehicle],
      ["Vehicle Number", user.vehicleNumber],
      ["Capacity", user.capacity],
      ["Wallet Balance", formatRs(user.wallet || 0)],
    ],
  };

  const fields = [...baseFields, ...extraFields[role]];

  const query = orderSearch.trim().toLowerCase();

  const supplierOrderRows = (user.orders || []).reduce(
    (all, o) =>
      `${o.id} ${o.customer} ${o.material}`.toLowerCase().includes(query)
        ? [...all, [o.id, o.customer, o.material, o.date, formatRs(o.amount), <Chip key="p" label={o.payment} />, <Chip key="s" label={o.status} />]]
        : all,
    []
  );

  const customerOrderRows = (user.orders || []).map((o) => [
    o.id, user.name, o.material, o.date, formatRs(o.amount),
    <Chip key="p" label={o.payment} />, <Chip key="s" label={o.status} />,
  ]);

  const listingRows = (user.listings || []).map((l) => [
    l.material, l.category, `${formatRs(l.price)} / ${l.unit}`, <Chip key="a" label={l.availability} />,
  ]);

  const deliveryRows = (user.deliveries || []).map((d) => [
    d.id, d.material, d.date, formatRs(d.amount), <Chip key="s" label={d.status} />,
  ]);

  const statusChips = role === "supplier"
    ? [user.verification, user.accountStatus]
    : [user.accountStatus];

  return (
    <tr ref={rowRef} className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-4">{user.name}</td>
      {role === "supplier" && <td className="px-4 py-4">{user.shop}</td>}
      <td className="px-4 py-4">{user.email}</td>
      <td className="px-4 py-4">{user.phone}</td>

      {role === "customer" && (
        <td className="px-4 py-4">
          <Chip label={user.profileStatus} />
        </td>
      )}
      {role === "supplier" && (
        <td className="px-4 py-4">
          <Chip label={user.verification} />
        </td>
      )}
      {role === "rider" && (
        <td className="px-4 py-4">
          <Chip label={user.vehicle} />
        </td>
      )}

      <td className="px-4 py-4">
        <Chip label={user.accountStatus} />
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={handleView} className={outlineBtn}>
            View
          </button>

          {/* Edit sirf sub-admin tab mein */}
          {role === "subadmin" && (
            <button type="button" onClick={() => setEditOpen(true)} className={outlineBtn}>
              Edit
            </button>
          )}

          <button type="button" onClick={handleToggleStatus} className={outlineBtn}>
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>

        {/* EDIT SUB-ADMIN MODAL */}
        {editOpen && (
          <div
            onClick={() => setEditOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                  Edit Sub-Admin
                </h2>
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-[color:var(--secondary-text)]">Name</label>
                  <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={input} />
                </div>
                <div>
                  <label className="text-xs text-[color:var(--secondary-text)]">Email</label>
                  <input type="text" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={input} />
                </div>
                <div>
                  <label className="text-xs text-[color:var(--secondary-text)]">Phone</label>
                  <input type="text" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={input} />
                </div>
                <div>
                  <label className="text-xs text-[color:var(--secondary-text)]">Account Status</label>
                  <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className={input}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <p className="mt-5 text-xs font-semibold text-[color:var(--primary-text)]">
                Permitted modules
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {MODULE_OPTIONS.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
                    <input
                      type="checkbox"
                      checked={form.modules.includes(item)}
                      onChange={() => handleToggleModule(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setEditOpen(false)} className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]">
                  Cancel
                </button>
                <button type="button" onClick={handleSave} className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INNER SCREEN (View) */}
        {viewOpen && (
          <div
            style={{ left: viewLeft }}
            className="fixed inset-y-0 right-0 z-40 overflow-y-auto bg-[var(--off-white-background)] p-4 text-left sm:p-6 lg:p-8"
          >
            <div className="mx-auto w-full max-w-[1600px]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <BmAdminKycPageheader title={user.name} />

                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={handleToggleStatus} className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]">
                    {isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button type="button" onClick={() => setViewOpen(false)} className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]">
                    <ArrowLeft size={14} />
                    Back to {BACK_LABEL[role]}
                  </button>
                </div>
              </div>

              {/* STATUS CHIPS */}
              <div className="flex flex-wrap gap-2 border-b border-[color:var(--border-color)] pb-5">
                {statusChips.map((label) => (
                  <Chip key={label} label={label} />
                ))}
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-[color:var(--border-color)] py-5 sm:grid-cols-2 lg:grid-cols-3">
                {fields.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-[color:var(--secondary-text)]">{label}</p>
                    <p className="mt-0.5 text-sm text-[color:var(--primary-text)]">{value}</p>
                  </div>
                ))}
              </div>

              {/* ROLE KE HISAAB SE SECTIONS */}
              {role === "customer" && (
                <DetailTable
                  title="Orders"
                  headings={["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"]}
                  rows={customerOrderRows}
                />
              )}

              {role === "supplier" && (
                <>
                  <DetailTable
                    title="All Supplier Orders"
                    headings={["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"]}
                    rows={supplierOrderRows}
                    search={orderSearch}
                    onSearch={setOrderSearch}
                  />
                  <DetailTable
                    title="Listings"
                    headings={["Material", "Category", "Price", "Availability"]}
                    rows={listingRows}
                  />
                </>
              )}

              {role === "rider" && (
                <DetailTable
                  title="Deliveries"
                  headings={["Delivery ID", "Material", "Date", "Amount", "Status"]}
                  rows={deliveryRows}
                />
              )}

              {role === "subadmin" && (
                <p className="py-5 text-sm text-[color:var(--primary-text)]">
                  Permitted modules: {(user.modules || []).join(", ")}
                </p>
              )}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmAdminUsermanegementDataRow;