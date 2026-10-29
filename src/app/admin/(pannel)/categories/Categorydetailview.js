"use client";

import { useState } from "react";
import { ArrowLeft, Image as ImageIcon, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const headings = ["Product Name", "Supplier", "Price", "Availability", "Listing Status", "Complaints / Reports", "Actions"];

export default function CategoryDetail({ category, onBack }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Active / Inactive
  const [products, setProducts] = useState(category.products);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  // Search aur dropdown dono par poore utre hue products chuno
  const visible = products.reduce((all, p) => {
    const matchSearch = `${p.name} ${p.supplier}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || (status === "Active") === p.active;
    return matchSearch && matchStatus ? [...all, p] : all;
  }, []);

  const btn =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Naam + Back */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">{category.name}</h1>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </button>
      </div>

      <p className="mt-3 text-[color:var(--secondary-text)]">{category.description}</p>

      {/* Card */}
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
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {(h === "Product Name" || h === "Price") && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
                        <ImageIcon size={20} />
                      </span>
                      <span className="font-medium text-[color:var(--primary-text)]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{p.supplier}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{p.price}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                        p.active
                          ? "bg-green-50 text-green-700 ring-green-200"
                          : "bg-red-50 text-red-600 ring-red-200"
                      }`}
                    >
                      {p.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{p.complaints}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => console.log("View", p.name)} className={btn}>View</button>
                      <button type="button" onClick={() => handleToggle(p.id)} className={btn}>
                        {p.active ? "Deactivate" : "Activate"}
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
          <span>{visible.length} record(s)</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}