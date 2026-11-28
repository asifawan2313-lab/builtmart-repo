"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  X,
  ArrowUpDown,
} from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminCategoryDataRow from "../../../component/admin/category/BmAdminCategoryDataRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "archived", label: "Archived" },
];

const BM_CATEGORIES = [
  {
    id: 1,
    name: "Bricks",
    description: "Clay, fly-ash and concrete bricks",
    listings: 1,
    status: "active",
  },
  {
    id: 2,
    name: "Cement",
    description: "OPC, SRC and white cement bags",
    listings: 1,
    status: "active",
  },
  {
    id: 3,
    name: "Sand / Rait",
    description: "Ravi, Chenab and fine sand",
    listings: 1,
    status: "active",
  },
  {
    id: 4,
    name: "Bajri",
    description: "Crushed stone and gravel",
    listings: 0,
    status: "archived",
  },
  {
    id: 5,
    name: "Steel / Saria",
    description: "Grade 40 and 60 steel bars",
    listings: 1,
    status: "active",
  },
];

const categoryHeadings = [
  { label: "Category Image / File" },
  { label: "Category Name", sort: true },
  { label: "Description" },
  { label: "Number of Listings", sort: true },
  { label: "Status" },
  { label: "Actions" },
];

const BM_EMPTY_FORM = { name: "", description: "", active: true };

const fieldClass =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const labelClass = "block text-sm text-[color:var(--secondary-text)]";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(BM_EMPTY_FORM);

  const query = search.trim().toLowerCase();

  const visibleCategories = BM_CATEGORIES.reduce((all, category) => {
    const matches =
      (filter === "all" || category.status === filter) &&
      `${category.name} ${category.description}`.toLowerCase().includes(query);

    return matches ? [...all, category] : all;
  }, []);

  const handleChange = (key, value) =>
    setForm((old) => ({ ...old, [key]: value }));

  const handleCloseAdd = () => {
    setAddOpen(false);
    setForm(BM_EMPTY_FORM);
  };

  const handleAddCategory = () => {
    alert(`Category "${form.name}" added (demo)`);
    handleCloseAdd();
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BmAdminKycPageheader
          title="Material Categories"
          description="Manage Categories here!."
        />
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <Plus size={16} />
          Add Category
        </button>
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
            aria-label="Filter by status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {BM_CATEGORY_FILTERS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            {/* <BmAdminKycTableheader role="category" /> */}
            <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                {categoryHeadings.map((heading) => (
                  <th key={heading.label} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {heading.label}
                      {heading.sort && <ArrowUpDown size={11} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visibleCategories.map((category) => (
                <BmAdminCategoryDataRow key={category.id} category={category} />
              ))}

              {visibleCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleCategories.length}{" "}
            {visibleCategories.length === 1 ? "record" : "records"}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              className="rounded p-1 hover:bg-[var(--off-white-background)]"
            >
              <ChevronLeft size={14} />
            </button>
            <span>Page 1 / 1</span>
            <button
              type="button"
              aria-label="Next page"
              className="rounded p-1 hover:bg-[var(--off-white-background)]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ADD CATEGORY MODAL */}
      {addOpen && (
        <div
          onClick={handleCloseAdd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-[color:var(--primary-text)]">
                Add Category
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

            <div>
              <label htmlFor="bm-cat-name" className={labelClass}>
                Category Name
              </label>
              <input
                id="bm-cat-name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="bm-cat-desc" className={labelClass}>
                Description
              </label>
              <textarea
                id="bm-cat-desc"
                rows={3}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="bm-cat-file" className={labelClass}>
                Image / File Upload
              </label>
              <input
                id="bm-cat-file"
                type="file"
                accept="image/*"
                className={`${fieldClass} file:mr-3 file:border-0 file:bg-transparent file:text-sm`}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.active}
                aria-label="Active"
                onClick={() => handleChange("active", !form.active)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  form.active
                    ? "bg-[var(--primary-yellow)]"
                    : "bg-[var(--border-color)]"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    form.active ? "translate-x-5" : ""
                  }`}
                />
              </button>
              <span className="text-sm text-[color:var(--primary-text)]">
                Active
              </span>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseAdd}
                className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
              >
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
