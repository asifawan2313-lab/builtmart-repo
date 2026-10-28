"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const riders = [
  {
    id: 1, name: "Asif Nawaz", email: "asif@rider.pk", phone: "0304-1110001", verification: "Pending", active: true,
    city: "Lahore", registered: "2026-08-09", vehicle: "Loader Rickshaw",
    deliveries: [
      { id: "ORD-1001", customer: "Ahmed Raza", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", status: "Delivered" },
    ],
  },
  {
    id: 2, name: "Shahid Butt", email: "shahid@rider.pk", phone: "0304-1110002", verification: "Pending", active: true,
    city: "Faisalabad", registered: "2026-08-12", vehicle: "Suzuki Pickup",
    deliveries: [
      { id: "ORD-1003", customer: "Bilal Khan", material: "Steel Rebar 12mm", date: "2026-10-02", amount: "Rs 45,000", pay: "Paid", status: "Delivered" },
    ],
  },
  {
    id: 3, name: "Waqas Ahmed", email: "waqas@rider.pk", phone: "0304-1110003", verification: "Pending", active: true,
    city: "Gujranwala", registered: "2026-08-15", vehicle: "Motorbike",
    deliveries: [],
  },
];

const headings = ["Name", "Email", "Phone", "Verification Status", "Account Status", "Actions"];

const tones = {
  green: "bg-green-50 text-green-700 ring-green-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-600 ring-red-200",
};

// onView: View dabane par parent ko rider de deta hai (detail screen wahan khulti hai)
export default function RiderTab({ onView }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Active / Inactive
  const [list, setList] = useState(riders);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setList(list.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  // Dropdown ke hisab se kitne records nazar aa rahe hain
  const shown = list.reduce((n, r) => n + (status === "All" || (status === "Active") === r.active ? 1 : 0), 0);

  const btn =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

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
            {list.map((r) => {
              // Dropdown se match nahi karta to ye row dikhao hi mat
              if (status !== "All" && (status === "Active") !== r.active) return null;

              return (
                <tr key={r.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{r.name}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{r.email}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{r.phone}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones.amber}`}>{r.verification}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${r.active ? tones.green : tones.red}`}>
                      {r.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => onView(r)} className={btn}>View</button>
                      <button type="button" onClick={() => console.log("Edit", r.name)} className={btn}>Edit</button>
                      <button type="button" onClick={() => handleToggle(r.id)} className={btn}>
                        {r.active ? "Deactivate" : "Activate"}
                      </button>
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