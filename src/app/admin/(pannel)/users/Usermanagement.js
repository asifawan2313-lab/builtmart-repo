"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CustomerDetail from "./Customerdetailview.js";
import SupplierTab from "./Suppliertab.js";
import SupplierDetail from "./Supplierdetailview.js";
import RiderTab from "./Ridertab.js";
import RiderDetail from "./Riderdetailview.js";
import SubAdminDetail from "./Subadmindetailview.js";

import SubAdminTab from "./Subadmintab.js";

const tabs = ["Customers (5)", "Suppliers (5)", "Riders (3)", "Labour (3)", "Sub-Admins (1)"];

const customers = [
  {
    id: 1, name: "Ahmed Raza", email: "ahmed@mail.pk", phone: "0300-1112233", profile: "Complete", active: false,
    city: "Lahore", registered: "2026-08-19",
    orders: [
      { id: "ORD-1001", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
      { id: "ORD-1005", material: "Leftover Porcelain Tiles", date: "2026-10-09", amount: "Rs 13,200", pay: "Refunded", payTone: "red", status: "Returned", statusTone: "red" },
    ],
  },
  {
    id: 2, name: "Sana Malik", email: "sana@mail.pk", phone: "0321-4455667", profile: "Complete", active: true,
    city: "Gujranwala", registered: "2026-08-22",
    orders: [
      { id: "ORD-1002", material: "Bricks Grade A", date: "2026-09-30", amount: "Rs 80,000", pay: "Paid", payTone: "green", status: "In Transit", statusTone: "green" },
    ],
  },
  {
    id: 3, name: "Bilal Khan", email: "bilal@mail.pk", phone: "0333-9988776", profile: "Complete", active: true,
    city: "Lahore", registered: "2026-09-01",
    orders: [
      { id: "ORD-1003", material: "Steel Rebar 12mm", date: "2026-10-02", amount: "Rs 45,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
  },
  {
    id: 4, name: "Hira Javed", email: "hira@mail.pk", phone: "0345-1239876", profile: "Complete", active: false,
    city: "Islamabad", registered: "2026-09-05",
    orders: [
      { id: "ORD-1004", material: "Floor Tiles", date: "2026-10-04", amount: "Rs 22,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
  },
  {
    id: 5, name: "Usman Tariq", email: "usman@mail.pk", phone: "0301-5566778", profile: "Complete", active: true,
    city: "Faisalabad", registered: "2026-09-12",
    orders: [
      { id: "ORD-1006", material: "Sand (Ravi)", date: "2026-10-10", amount: "Rs 18,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
  },
];

const headings = ["Name", "Email", "Phone", "Profile Status", "Account Status", "Actions"];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null); // customer detail
  const [supplier, setSupplier] = useState(null); // supplier detail
  const [rider, setRider] = useState(null); // rider detail
    const [subAdmin, setSubAdmin] = useState(null); // sub-admin detail
      const [addOpen, setAddOpen] = useState(false); // Add Sub-Admin modal
  const [list, setList] = useState(customers);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setList(list.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  // Customer detail screen
  if (selected) {
    return <CustomerDetail customer={selected} onBack={() => setSelected(null)} />;
  }

  const btn =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    <>
      {/* Supplier / Rider detail: list sirf chhupti hai (hidden), is liye wapas aane par sab kuch waisa hi milta hai */}
      {supplier && <SupplierDetail supplier={supplier} onBack={() => setSupplier(null)} />}
      {rider && <RiderDetail rider={rider} onBack={() => setRider(null)} />}
              {subAdmin && <SubAdminDetail subAdmin={subAdmin} onBack={() => setSubAdmin(null)} />}

      {/* <section className={`p-4 sm:p-6 lg:p-8 ${supplier || rider ? "hidden" : ""}`}> */}
            <section className={`p-4 sm:p-6 lg:p-8 ${supplier || rider || subAdmin ? "hidden" : ""}`}>
        {/* <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
          User Management
        </h1> */}
                <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
            User Management
          </h1>

          {/* Sirf Sub-Admins tab par */}
          {activeTab === 4 && (
            <button
              type="button"
              // onClick={() => console.log("Add Sub-Admin")}
                            onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              <Plus size={16} />
              Add Sub-Admin
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-5 overflow-x-auto">
          <div className="inline-flex gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors sm:px-4 ${
                  activeTab === i
                    ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                    : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Suppliers tab */}
        {activeTab === 1 && <SupplierTab onView={setSupplier} />}

        {/* Riders tab */}
        {activeTab === 2 && <RiderTab onView={setRider} />}
        {/* Sub-Admins tab */}
        {/* {activeTab === 4 && <SubAdminTab />} */}
                {/* {activeTab === 4 && <SubAdminTab onView={setSubAdmin} />} */}
                        {activeTab === 4 && (
          <SubAdminTab onView={setSubAdmin} addOpen={addOpen} onAddClose={() => setAddOpen(false)} />
        )}

        {/* Customers tab */}
        {activeTab === 0 && (
          <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
            {/* Search + status */}
            <div className="flex flex-col gap-3 p-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
                <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
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
                className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
                  <tr>
                    {headings.map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">
                        <span className="inline-flex items-center gap-1">
                          {h}
                          {h === "Name" && <ArrowUpDown size={12} />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {list.map((c) => (
                    <tr key={c.id} className="border-t border-[color:var(--border-color)]">
                      <td className="px-4 py-4 text-[color:var(--primary-text)]">{c.name}</td>
                      <td className="px-4 py-4 text-[color:var(--primary-text)]">{c.email}</td>
                      <td className="px-4 py-4 text-[color:var(--primary-text)]">{c.phone}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-[var(--off-white-background)] px-2.5 py-1 text-xs text-[color:var(--secondary-text)] ring-1 ring-[color:var(--border-color)]">
                          {c.profile}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                            c.active
                              ? "bg-green-50 text-green-700 ring-green-200"
                              : "bg-red-50 text-red-600 ring-red-200"
                          }`}
                        >
                          {c.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setSelected(c)} className={btn}>View</button>
                          <button type="button" onClick={() => console.log("Edit", c.name)} className={btn}>Edit</button>
                          <button type="button" onClick={() => handleToggle(c.id)} className={btn}>
                            {c.active ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
              <span>{list.length} records</span>
              <div className="flex items-center gap-3">
                <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
                <span>Page 1 / 1</span>
                <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}