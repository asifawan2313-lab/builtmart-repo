"use client";

import { useState } from "react";
import {
  X,
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   1. ADD MODAL
   ============================================================ */

const CategoryAddModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [fileName, setFileName] = useState("");

  // Save: naam khali ho to save nahi hoga
  const handleSave = () => {
    if (name.trim() === "") return;
    onSave({ name: name.trim(), description, active, fileName });
  };

  const handleToggle = () => setActive(!active);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  const input =
    "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
  const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Heading + Close */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">Add Category</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Name */}
        <div className="mt-4">
          <label className={label}>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className={input}
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className={label}>Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${input} resize-y`}
          />
        </div>

        {/* Image / File Upload */}
        <div className="mt-4">
          <label className={label}>Image / File Upload</label>
          <input
            type="file"
            onChange={handleFile}
            className={`${input} cursor-pointer file:mr-3 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm`}
          />
        </div>

        {/* Active toggle */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={handleToggle}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              active ? "bg-[var(--primary-yellow)]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                active ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm text-[color:var(--primary-text)]">{active ? "Active" : "Inactive"}</span>
        </div>

        {/* Cancel + Save */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-[var(--primary-yellow)] px-5 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   2. EDIT MODAL
   ============================================================ */

const CategoryEditModal = ({ category, onClose, onSave }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [active, setActive] = useState(category.active);
  const [fileName, setFileName] = useState("");

  // Save: naam khali ho to save nahi hoga
  const handleSave = () => {
    if (name.trim() === "") return;
    onSave({ ...category, name: name.trim(), description, active, fileName });
  };

  const handleToggle = () => setActive(!active);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  const input =
    "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
  const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Heading + Close */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">Edit Category</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Name */}
        <div className="mt-4">
          <label className={label}>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={input}
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className={label}>Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${input} resize-y`}
          />
        </div>

        {/* Image / File Upload */}
        <div className="mt-4">
          <label className={label}>Image / File Upload</label>
          <input
            type="file"
            onChange={handleFile}
            className={`${input} cursor-pointer file:mr-3 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm`}
          />
        </div>

        {/* Active toggle */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={handleToggle}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              active ? "bg-[var(--primary-yellow)]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                active ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm text-[color:var(--primary-text)]">{active ? "Active" : "Inactive"}</span>
        </div>

        {/* Cancel + Save */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-[var(--primary-yellow)] px-5 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   3. DELETE MODAL
   ============================================================ */

const CategoryDeleteModal = ({ category, onClose, onConfirm }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        {/* Heading + Close */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl text-[color:var(--primary-text)] sm:text-2xl">Delete Category</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Question */}
        <p className="mt-4 text-base text-[color:var(--primary-text)]">Delete {category.name}?</p>

        {/* Warning: sirf tab dikhao jab category ki listings hon */}
        {category.listings > 0 && (
          <p className="mt-4 text-sm text-red-600">
            {category.listings} related listing(s) will be kept, not deleted. Without a category they will be
            unavailable for sale until reassigned.
          </p>
        )}

        {/* Cancel + Confirm Delete */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   4. CATEGORY DETAIL VIEW
   ============================================================ */

const detailHeadings = ["Product Name", "Supplier", "Price", "Availability", "Listing Status", "Complaints / Reports", "Actions"];

const CategoryDetail = ({ category, onBack }) => {
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
                {detailHeadings.map((h) => (
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
};

/* ============================================================
   5. CATEGORY MANAGEMENT (main list)
   ============================================================ */

const initialCategories = [
  {
    id: 1, name: "Bricks", description: "Clay, fly-ash and concrete bricks", listings: 1, active: true,
    products: [{ id: 1, name: "Red Clay Bricks (A-Class)", supplier: "Brick House", price: "Rs 16/brick", stock: "In Stock", active: true, complaints: "None" }],
  },
  {
    id: 2, name: "Cement", description: "OPC, SRC and white cement bags", listings: 1, active: true,
    products: [{ id: 1, name: "DG Khan Cement OPC", supplier: "Sheikh Traders", price: "Rs 1,350/bag", stock: "In Stock", active: true, complaints: "None" }],
  },
  {
    id: 3, name: "Sand / Rait", description: "Ravi, Chenab and fine sand", listings: 1, active: true,
    products: [{ id: 1, name: "Ravi Sand (Truck)", supplier: "Sheikh Traders", price: "Rs 28,000/truck", stock: "In Stock", active: true, complaints: "None" }],
  },
  { id: 4, name: "Bajri", description: "Crushed stone and gravel", listings: 0, active: true, products: [] },
  {
    id: 5, name: "Steel / Saria", description: "Grade 40 and 60 steel bars", listings: 1, active: true,
    products: [{ id: 1, name: "Grade 60 Steel Saria 12mm", supplier: "Sheikh Traders", price: "Rs 265/kg", stock: "In Stock", active: true, complaints: "None" }],
  },
  {
    id: 6, name: "Tiles", description: "Floor, wall and porcelain tiles", listings: 1, active: true,
    products: [{ id: 1, name: "Floor Tiles 2x2", supplier: "Tile City", price: "Rs 95/sq ft", stock: "In Stock", active: true, complaints: "None" }],
  },
  {
    id: 7, name: "Paint", description: "Emulsion, enamel and weather coat", listings: 1, active: true,
    products: [{ id: 1, name: "Weather Shield Paint 16L", supplier: "Sheikh Traders", price: "Rs 9,500/bucket", stock: "In Stock", active: true, complaints: "None" }],
  },
  {
    id: 8, name: "Doors & Windows", description: "Wooden, UPVC and aluminium", listings: 1, active: true,
    products: [{ id: 1, name: "Wooden Door (Deodar)", supplier: "Zahid Iron Works", price: "Rs 18,000/door", stock: "In Stock", active: true, complaints: "None" }],
  },
  { id: 9, name: "Plumbing", description: "Pipes, fittings and taps", listings: 0, active: false, products: [] },
  { id: 10, name: "Electrical", description: "Wires, switches and breakers", listings: 0, active: true, products: [] },
  { id: 11, name: "Wood / Timber", description: "Planks, boards and plywood", listings: 0, active: true, products: [] },
];

const headings = ["Category Image / File", "Category Name", "Description", "Number of Listings", "Status", "Actions"];
const perPage = 8; // ek page par kitne rows

const CategoryManagement = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Active / Inactive
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null); // null = list, warna us category ki detail
  const [editing, setEditing] = useState(null); // Edit modal wali category
  const [deleting, setDeleting] = useState(null); // Delete modal wali category
  const [adding, setAdding] = useState(false); // Add modal khula hai ya nahi

  // Add modal: save par nayi category list ke aakhir mein jod do
  const handleAdd = (data) => {
    const lastId = categories.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newCategory = {
      id: lastId + 1,
      name: data.name,
      description: data.description,
      listings: 0,
      active: data.active,
      products: [],
    };
    setCategories([...categories, newCategory]);
    setAdding(false);
  };

  // Edit modal: save par us category ko naye data se badal do
  const handleSave = (updated) => {
    setCategories(categories.map((c) => (c.id === updated.id ? updated : c)));
    setEditing(null);
  };

  // Delete modal: confirm par us category ko list se nikal do
  const handleDelete = () => {
    setCategories(categories.reduce((all, c) => (c.id === deleting.id ? all : [...all, c]), []));
    setDeleting(null);
  };

  // Category detail screen
  if (selected) {
    return <CategoryDetail category={selected} onBack={() => setSelected(null)} />;
  }

  // 1) Search aur dropdown dono par poore utre hue categories chuno
  const visible = categories.reduce((all, c) => {
    const matchSearch = `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || (status === "Active") === c.active;
    return matchSearch && matchStatus ? [...all, c] : all;
  }, []);

  // 2) Pages: kitne pages hain aur abhi kaun sa page khula hai
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  const btn =
    "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + Add button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
          Material Categories
        </h1>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <Plus size={16} />
          Add Category
        </button>
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
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {(h === "Category Name" || h === "Number of Listings") && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3">
                    <ImageIcon size={36} strokeWidth={1.5} className="text-[color:var(--primary-text)]" />
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{c.name}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{c.description}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{c.listings}</td>
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setSelected(c)} className={btn}>View</button>
                      <button type="button" onClick={() => setEditing(c)} className={btn}>Edit</button>
                      <button type="button" onClick={() => setDeleting(c)} className={btn}>Delete</button>
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

      {/* Modals */}
      {adding && (
        <CategoryAddModal
          onClose={() => setAdding(false)}
          onSave={handleAdd}
        />
      )}
      {editing && (
        <CategoryEditModal
          key={editing.id}
          category={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
      {deleting && (
        <CategoryDeleteModal
          category={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </section>
  );
};

/* ============================================================
   PAGE
   ============================================================ */

const CategoriesPage = () => {
  return <CategoryManagement />;
};

export default CategoriesPage;