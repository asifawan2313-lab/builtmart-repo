"use client";

import { useState } from "react";
import { Image as ImageIcon, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const tabs = ["All", "New", "Reused"];

const initialMaterials = [
  { id: 1, name: "Red Clay Bricks (A-Class)", category: "Category removed", supplier: "Brick House", price: "Rs 16/brick", stock: "In Stock", active: false, complaints: "None", type: "New" },
  { id: 2, name: "DG Khan Cement OPC", category: "Cement", supplier: "Sheikh Traders", price: "Rs 1,350/bag", stock: "In Stock", active: false, complaints: "None", type: "New" },
  { id: 3, name: "Grade 60 Steel Saria 12mm", category: "Steel / Saria", supplier: "Sheikh Traders", price: "Rs 265/kg", stock: "In Stock", active: false, complaints: "None", type: "New" },
  { id: 4, name: "Used Wooden Doors (set of 4)", category: "Doors & Windows", supplier: "Ahmed Raza", price: "Rs 9,000/door", stock: "Available", active: true, complaints: "None", type: "Reused" },
  { id: 5, name: "Leftover Porcelain Tiles", category: "Tiles", supplier: "Brick House", price: "Rs 110/sq ft", stock: "Available", active: true, complaints: "None", type: "Reused" },
  { id: 6, name: "Salvaged Iron Window Grills", category: "Grills & Iron Railings", supplier: "Bilal Khan", price: "Rs 2,500/piece", stock: "Available", active: true, complaints: "None", type: "Reused" },
  { id: 7, name: "Weather Shield Paint 16L", category: "Paint", supplier: "Sheikh Traders", price: "Rs 14,500/drum", stock: "In Stock", active: false, complaints: "None", type: "New" },
  { id: 8, name: "Ravi Sand (Truck)", category: "Sand / Rait", supplier: "Sheikh Traders", price: "Rs 28,000/truck", stock: "In Stock", active: false, complaints: "None", type: "New" },
  { id: 9, name: "Floor Tiles 2x2", category: "Tiles", supplier: "Tile City", price: "Rs 95/sq ft", stock: "In Stock", active: true, complaints: "None", type: "New" },
];

const headings = ["Material Name", "Category", "Supplier", "Price", "Availability", "Listing Status", "Complaints / Reports", "Actions"];
const perPage = 8; // ek page par kitne rows

export default function MaterialManagement() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [tab, setTab] = useState("All"); // All / New / Reused
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Active / Unavailable
  const [page, setPage] = useState(1);

  // Tab badalne par pehle page par wapas
  const handleTab = (name) => {
    setTab(name);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Active <-> Unavailable badalna
  const handleToggle = (id) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
  };

  // 1) Tab, search aur dropdown, teeno par poore utre hue materials chuno
  const visible = materials.reduce((all, m) => {
    const matchTab = tab === "All" || m.type === tab;
    const matchSearch = `${m.name} ${m.category} ${m.supplier}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || (status === "Active") === m.active;
    return matchTab && matchSearch && matchStatus ? [...all, m] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  const btn =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Material Management
      </h1>

      {/* Tabs: All / New / Reused */}
      <div className="mt-5 inline-flex rounded-lg bg-[var(--off-white-background)] p-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTab(t)}
            className={`rounded-md px-4 py-1.5 text-sm transition-colors ${
              tab === t
                ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + dropdown */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            <option>All</option>
            <option>Active</option>
            <option>Unavailable</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {(h === "Material Name" || h === "Price") && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((m) => (
                <tr
                  key={m.id}
                  className={`border-t border-[color:var(--border-color)] ${
                    m.category === "Category removed" ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
                        <ImageIcon size={20} />
                      </span>
                      <span className="font-medium text-[color:var(--primary-text)]">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.category}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.supplier}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.price}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                        m.active
                          ? "bg-green-50 text-green-700 ring-green-200"
                          : "bg-gray-100 text-gray-600 ring-gray-200"
                      }`}
                    >
                      {m.active ? "Active" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.complaints}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => console.log("View", m.name)} className={btn}>View</button>
                      <button type="button" onClick={() => handleToggle(m.id)} className={btn}>
                        {m.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} records</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}