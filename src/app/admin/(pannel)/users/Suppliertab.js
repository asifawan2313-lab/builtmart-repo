"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const suppliers = [
  {
    id: 1, name: "Imran Sheikh", shop: "Sheikh Traders", email: "imran@sheikhtraders.pk", phone: "0300-7778899",
    verification: "Verified", active: false,
    city: "Lahore", registered: "2026-07-20", type: "Cement & Steel", address: "Shop 12, Ravi Road, Lahore",
    submitted: "2026-07-21", wallet: "Rs 18,500",
    orders: [
      { id: "ORD-1001", customer: "Ahmed Raza", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
      { id: "ORD-1003", customer: "Bilal Khan", material: "Grade 60 Steel Saria 12mm", date: "2026-10-16", amount: "Rs 106,000", pay: "Paid", payTone: "green", status: "Ready for Dispatch", statusTone: "blue" },
      { id: "ORD-1004", customer: "Usman Tariq", material: "Ravi Sand (Truck)", date: "2026-10-18", amount: "Rs 28,000", pay: "Pending", payTone: "amber", status: "Pending", statusTone: "amber" },
      { id: "ORD-1006", customer: "Sana Malik", material: "DG Khan Cement OPC", date: "2026-10-12", amount: "Rs 27,000", pay: "Pending", payTone: "amber", status: "Cancelled", statusTone: "red" },
    ],
    listings: ["DG Khan Cement OPC · In Stock", "Grade 60 Steel Saria 12mm · In Stock", "Weather Shield Paint 16L · In Stock", "Ravi Sand (Truck) · In Stock"],
  },
  {
    id: 2, name: "Farah Iqbal", shop: "Brick House", email: "farah@brickhouse.pk", phone: "0322-1212121",
    verification: "Verified", active: true,
    city: "Gujranwala", registered: "2026-07-25", type: "Bricks", address: "Shop 4, GT Road, Gujranwala",
    submitted: "2026-07-26", wallet: "Rs 9,200",
    orders: [
      { id: "ORD-1002", customer: "Sana Malik", material: "Bricks Grade A", date: "2026-09-30", amount: "Rs 80,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
    listings: ["Bricks Grade A · In Stock", "Bricks Grade B · In Stock"],
  },
  {
    id: 3, name: "Kamran Ali", shop: "Tile City", email: "kamran@tilecity.pk", phone: "0312-3434343",
    verification: "Pending", active: true,
    city: "Islamabad", registered: "2026-10-01", type: "Tiles", address: "Plot 7, Blue Area, Islamabad",
    submitted: "2026-10-02", wallet: "Rs 0",
    orders: [],
    listings: [],
  },
  {
    id: 4, name: "Nadia Hussain", shop: "PaintPro", email: "nadia@paintpro.pk", phone: "0336-5656565",
    verification: "Pending", active: true,
    city: "Faisalabad", registered: "2026-10-03", type: "Paints", address: "Shop 9, Kohinoor Road, Faisalabad",
    submitted: "2026-10-04", wallet: "Rs 0",
    orders: [],
    listings: [],
  },
  {
    id: 5, name: "Zahid Mehmood", shop: "Zahid Iron Works", email: "zahid@ironworks.pk", phone: "0344-7878787",
    verification: "Rejected", active: true,
    city: "Sialkot", registered: "2026-09-10", type: "Steel", address: "Unit 3, Industrial Area, Sialkot",
    submitted: "2026-09-11", wallet: "Rs 0",
    orders: [],
    listings: [],
  },
];

const headings = ["Name", "Shop Name", "Email", "Phone", "Verification Status", "Account Status", "Actions"];

const tones = {
  Verified: "bg-green-50 text-green-700 ring-green-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Rejected: "bg-red-50 text-red-600 ring-red-200",
};

// onView: View dabane par parent ko supplier de deta hai (detail screen wahan khulti hai)
export default function SupplierTab({ onView }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Verified / Pending / Rejected
  const [list, setList] = useState(suppliers);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setList(list.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  // Dropdown ke hisab se kitne records nazar aa rahe hain
  const shown = list.reduce((n, s) => n + (status === "All" || s.verification === status ? 1 : 0), 0);

  const btn =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
  const reviewBtn =
    "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

  return (
    <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
      {/* Search + dropdown */}
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
          <option>Verified</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
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
            {list.map((s) => {
              // Dropdown se match nahi karta to ye row dikhao hi mat
              if (status !== "All" && s.verification !== status) return null;

              return (
                <tr key={s.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.name}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.shop}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.email}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{s.phone}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones[s.verification]}`}>
                      {s.verification}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                        s.active ? tones.Verified : tones.Rejected
                      }`}
                    >
                      {s.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => onView(s)} className={btn}>
                        View
                      </button>

                      {s.verification === "Verified" && (
                        <button type="button" onClick={() => handleToggle(s.id)} className={btn}>
                          {s.active ? "Deactivate" : "Activate"}
                        </button>
                      )}

                      {s.verification === "Pending" && (
                        <button type="button" onClick={() => console.log("Review", s.name)} className={reviewBtn}>
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
        <span>{shown} records</span>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
          <span>Page 1 / 1</span>
          <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}