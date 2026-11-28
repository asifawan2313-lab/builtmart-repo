"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminUsermanegementDataRow from "../../../component/admin/usermanagement/BmAdminUsermanegementDataRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_TABS = [
  { key: "customer", label: "Customers" },
  { key: "supplier", label: "Suppliers" },
  { key: "rider", label: "Riders" },
  { key: "subadmin", label: "Sub-Admins" },
];

const BM_STATUS_FILTERS = ["All", "Active", "Inactive"];
const BM_MODULE_OPTIONS = ["Moderater", "Super Admin"];

const BM_USERS = [
  {
    id: "C1", userType: "customer", name: "Ahmed Raza", email: "ahmed@mail.pk", phone: "0300-1112233", city: "Lahore",
    registered: "2026-08-19", profileStatus: "Complete", accountStatus: "Inactive",
    orders: [
      { id: "ORD-1001", material: "DG Khan Cement OPC", date: "2026-09-28", amount: 67500, payment: "Paid", status: "Delivered" },
      { id: "ORD-1005", material: "Leftover Porcelain Tiles", date: "2026-10-09", amount: 13200, payment: "Refunded", status: "Returned" },
    ],
  },
  {
    id: "C2", userType: "customer", name: "Sana Malik", email: "sana@mail.pk", phone: "0321-4455667", city: "Gujranwala",
    registered: "2026-08-25", profileStatus: "Complete", accountStatus: "Active",
    orders: [
      { id: "ORD-1002", material: "Red Clay Bricks (A-Class)", date: "2026-10-15", amount: 80000, payment: "Pending", status: "In Transit" },
      { id: "ORD-1006", material: "DG Khan Cement OPC", date: "2026-10-12", amount: 27000, payment: "Pending", status: "Cancelled" },
    ],
  },
  {
    id: "S1", userType: "supplier", name: "Imran Sheikh", shop: "Sheikh Traders", email: "imran@sheikhtraders.pk", phone: "0300-7778899",
    city: "Lahore", registered: "2026-07-20", businessType: "Cement & Steel", address: "Shop 12, Ravi Road, Lahore",
    submitted: "2026-07-21", wallet: 18500, verification: "Verified", accountStatus: "Inactive",
    orders: [
      { id: "ORD-1001", customer: "Ahmed Raza", material: "DG Khan Cement OPC", date: "2026-09-28", amount: 67500, payment: "Paid", status: "Delivered" },
      { id: "ORD-1003", customer: "Bilal Khan", material: "Grade 60 Steel Saria 12mm", date: "2026-10-16", amount: 106000, payment: "Paid", status: "Ready for Dispatch" },
      { id: "ORD-1004", customer: "Usman Tariq", material: "Ravi Sand (Truck)", date: "2026-10-18", amount: 28000, payment: "Pending", status: "Pending" },
      { id: "ORD-1006", customer: "Sana Malik", material: "DG Khan Cement OPC", date: "2026-10-12", amount: 27000, payment: "Pending", status: "Cancelled" },
    ],
    listings: [
      { material: "DG Khan Cement OPC", category: "Cement", price: 1350, unit: "bag", availability: "In Stock" },
      { material: "Grade 60 Steel Saria 12mm", category: "Steel / Saria", price: 265, unit: "kg", availability: "In Stock" },
      { material: "Weather Shield Paint 18L", category: "Paint", price: 9800, unit: "bucket", availability: "In Stock" },
      { material: "Ravi Sand (Truck)", category: "Sand / Rait", price: 28000, unit: "truck", availability: "In Stock" },
    ],
  },
  {
    id: "S2", userType: "supplier", name: "Farah Iqbal", shop: "Brick House", email: "farah@brickhouse.pk", phone: "0322-1212121",
    city: "Gujranwala", registered: "2026-07-25", businessType: "Bricks", address: "GT Road, Gujranwala",
    submitted: "2026-07-26", wallet: 9200, verification: "Verified", accountStatus: "Active",
    orders: [
      { id: "ORD-1002", customer: "Sana Malik", material: "Red Clay Bricks (A-Class)", date: "2026-10-15", amount: 80000, payment: "Pending", status: "In Transit" },
      { id: "ORD-1005", customer: "Ahmed Raza", material: "Leftover Porcelain Tiles", date: "2026-10-09", amount: 13200, payment: "Refunded", status: "Returned" },
    ],
    listings: [
      { material: "Red Clay Bricks (A-Class)", category: "Bricks", price: 16, unit: "brick", availability: "In Stock" },
      { material: "Leftover Porcelain Tiles", category: "Tiles", price: 110, unit: "sq ft", availability: "Out of Stock" },
    ],
  },
  {
    id: "R1", userType: "rider", name: "Hamza Transport", email: "hamza@transport.pk", phone: "0301-2223344", city: "Gujranwala",
    registered: "2026-09-15", vehicle: "Shehzore", vehicleNumber: "GRW-2026", capacity: "2,500 kg", wallet: 4800,
    accountStatus: "Active",
    deliveries: [
      { id: "RD-103", material: "Steel Rebar", date: "2026-11-03", amount: 3000, status: "Delivered" },
      { id: "RD-101", material: "Portland Cement", date: "2026-11-04", amount: 2400, status: "In Transit" },
    ],
  },
  {
    id: "A1", userType: "subadmin", name: "Maria Saeed", email: "maria@buildmart.pk", phone: "0300-0000002", city: "Lahore",
    registered: "2026-09-18", accountStatus: "Active",
    modules: ["Material Management", "Material Categories", "Blogs", "Reviews & Ratings"],
  },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  password: "1234",
  status: "Active",
  modules: [],
};

const field =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [tab, setTab] = useState("customer");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const query = search.trim().toLowerCase();

  // Har tab ke saamne count
  const counts = BM_USERS.reduce(
    (total, user) => ({ ...total, [user.userType]: (total[user.userType] || 0) + 1 }),
    {}
  );

  // Tab + status dropdown + search teeno yahin lagte hain
  const visibleUsers = BM_USERS.reduce((all, user) => {
    const matches =
      user.userType === tab &&
      (filter === "All" || user.accountStatus === filter) &&
      `${user.name} ${user.email} ${user.phone} ${user.shop || ""}`
        .toLowerCase()
        .includes(query);

    return matches ? [...all, user] : all;
  }, []);

  const handleTab = (key) => {
    setTab(key);
    setSearch("");
    setFilter("All");
  };

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleToggleModule = (item) =>
    handleChange(
      "modules",
      form.modules.includes(item)
        ? form.modules.reduce((all, m) => (m === item ? all : [...all, m]), [])
        : [...form.modules, item]
    );

  const handleCloseAdd = () => {
    setAddOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleSaveAdd = () => {
    // API call yahan aayegi
    alert(`Sub-admin added: ${JSON.stringify(form)}`);
    handleCloseAdd();
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <BmAdminKycPageheader title="User Management" />

        {tab === "subadmin" && (
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            <Plus size={16} />
            Add Sub-Admin
          </button>
        )}
      </div>

      {/* TABS */}
      <div className="mb-4 overflow-x-auto">
        <div className="inline-flex gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
          {BM_TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleTab(item.key)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-sm ${
                tab === item.key
                  ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                  : "text-[color:var(--secondary-text)]"
              }`}
            >
              {item.label} ({counts[item.key] || 0})
            </button>
          ))}
        </div>
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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by account status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-48"
          >
            {BM_STATUS_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                <th className="px-4 py-3 font-medium">
                  <span className="inline-flex items-center gap-1">
                    Name <ArrowUpDown size={11} />
                  </span>
                </th>
                {tab === "supplier" && <th className="px-4 py-3 font-medium">Shop Name</th>}
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                {tab === "customer" && <th className="px-4 py-3 font-medium">Profile Status</th>}
                {tab === "supplier" && <th className="px-4 py-3 font-medium">Verification Status</th>}
                {tab === "rider" && <th className="px-4 py-3 font-medium">Vehicle</th>}
                <th className="px-4 py-3 font-medium">Account Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleUsers.map((user) => (
                <BmAdminUsermanegementDataRow
                  key={user.id}
                  user={user}
                />
              ))}

              {visibleUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleUsers.length} {visibleUsers.length === 1 ? "record" : "records"}
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

      {/* ADD SUB-ADMIN MODAL */}
      {addOpen && (
        <div
          onClick={handleCloseAdd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                Add Sub-Admin
              </h2>
              <button
                type="button"
                onClick={handleCloseAdd}
                aria-label="Close modal"
                className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs text-[color:var(--secondary-text)]">Name</label>
                <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={field} />
              </div>
              <div>
                <label className="text-xs text-[color:var(--secondary-text)]">Email</label>
                <input type="text" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={field} />
              </div>
              <div>
                <label className="text-xs text-[color:var(--secondary-text)]">Phone</label>
                <input type="text" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={field} />
              </div>
              <div>
                <label className="text-xs text-[color:var(--secondary-text)]">Password</label>
                <input type="text" value={form.password} onChange={(e) => handleChange("password", e.target.value)} className={field} />
              </div>
              <div>
                <label className="text-xs text-[color:var(--secondary-text)]">Account Status</label>
                <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className={field}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <p className="mt-3 text-xs text-[color:var(--secondary-text)]">
              Ask this sub-admin to reset their password after their first login.
            </p>

            <p className="mt-5 text-xs font-semibold text-[color:var(--primary-text)]">
              Permitted modules
            </p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BM_MODULE_OPTIONS.map((item) => (
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
              <button type="button" onClick={handleCloseAdd} className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]">
                Cancel
              </button>
              <button type="button" onClick={handleSaveAdd} className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;