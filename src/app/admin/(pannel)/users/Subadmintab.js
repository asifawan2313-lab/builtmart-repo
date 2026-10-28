"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import AddSubAdminModal from "./Addsubadminmodal.js";

const subAdmins = [
  {
    id: 1, name: "Maria Saeed", email: "maria@buildmart.pk", phone: "0300-0000002", active: true,
    city: "Lahore", registered: "2026-09-18",
    modules: ["Material Management", "Material Categories", "Blogs", "Reviews & Ratings"],
  },
];

const headings = ["Name", "Email", "Phone", "Account Status", "Actions"];

// onView: detail screen | addOpen / onAddClose: "Add Sub-Admin" modal (button parent mein hai)
export default function SubAdminTab({ onView, addOpen, onAddClose }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Active / Inactive
  const [list, setList] = useState(subAdmins);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setList(list.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  // Modal se naya sub-admin list mein jodna
  const handleAdd = (newAdmin) => {
    setList([...list, newAdmin]);
    onAddClose();
  };

  // Dropdown ke hisab se kitne records nazar aa rahe hain
  const shown = list.reduce((n, a) => n + (status === "All" || (status === "Active") === a.active ? 1 : 0), 0);

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
        <table className="w-full min-w-[720px] text-left text-sm">
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
            {list.map((a) => {
              // Dropdown se match nahi karta to ye row dikhao hi mat
              if (status !== "All" && (status === "Active") !== a.active) return null;

              return (
                <tr key={a.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{a.name}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{a.email}</td>
                  <td className="px-4 py-4 text-[color:var(--primary-text)]">{a.phone}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                        a.active
                          ? "bg-green-50 text-green-700 ring-green-200"
                          : "bg-red-50 text-red-600 ring-red-200"
                      }`}
                    >
                      {a.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => onView(a)} className={btn}>View</button>
                      <button type="button" onClick={() => console.log("Edit", a.name)} className={btn}>Edit</button>
                      <button type="button" onClick={() => handleToggle(a.id)} className={btn}>
                        {a.active ? "Deactivate" : "Activate"}
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
        <span>{shown} record(s)</span>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
          <span>Page 1 / 1</span>
          <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Add Sub-Admin modal */}
      {addOpen && <AddSubAdminModal onClose={onAddClose} onSave={handleAdd} />}
    </div>
  );
}