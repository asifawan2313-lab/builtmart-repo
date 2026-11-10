// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import {
//   AlertTriangle,
//   CheckCircle2,
//   Eye,
//   ImagePlus,
//   Package,
//   PackageX,
//   Plus,
//   Search,
//   X,
// } from "lucide-react";

// import BmSupplierStats from "../../../component/supplier/Bmsupplierstatcard.js";
// import BmSupplierMaterialCards from "../../../component/supplier/Bmsuppliermaterialcards.js";

// import tiles from "../../../assets/images/guest/card/tiles.jpg";
// import briks from "../../../assets/images/guest/card/briks.jpg";
// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import sand from "../../../assets/images/guest/card/sand.jpg";

// // ========== DATA ==========
// const BM_CATEGORIES = [
//   "Bricks",
//   "Cement",
//   "Sand / Rait",
//   "Bajri",
//   "Steel / Saria",
//   "Tiles",
//   "Paint",
//   "Doors & Windows",
//   "Ceiling Materials",
//   "Grills / Iron Railings",
//   "Other Construction Materials",
//   "Reused Materials",
// ];
// const BM_TYPES = ["New Material", "Reused Material"];
// const BM_UNITS = ["Piece", "Brick", "Bag", "Kg", "Ton", "Cft", "Sq Ft", "Door"];
// const BM_QUALITY = ["A-Class", "B-Class", "Grade 53", "Grade 60", "Standard", "Premium", "Good Condition"];
// const BM_AVAILABILITY = ["Available", "Out of Stock"];
// const BM_STATUS_FILTERS = ["All", "Active", "Inactive", "Out of Stock"];
// const BM_LOW_STOCK = 10; // is se kam ya barabar quantity = low stock

// const BM_EMPTY_FORM = {
//   name: "",
//   type: "New Material",
//   category: "",
//   quality: "",
//   price: "",
//   unit: "Piece",
//   quantity: "0",
//   availability: "Available",
//   location: "",
//   pickup: "",
//   description: "",
//   image: null,
// };

// const BM_START_MATERIALS = [
//   { id: 1, name: "A-Class Bricks", type: "New Material", category: "Bricks", quality: "A-Class", price: 18, unit: "brick", quantity: 0, availability: "Out of Stock", location: "Gujranwala", pickup: "Pickup only", description: "Bhatta fired, uniform size, strong A-class brick.", image: briks, status: "Approved", active: false },
//   { id: 2, name: "DG Cement (OPC)", type: "New Material", category: "Cement", quality: "Grade 53", price: 1450, unit: "bag", quantity: 120, availability: "Available", location: "GT Road", pickup: "Truck delivery", description: "Grade 53 OPC cement, 50kg bag.", image: tiles, status: "Approved", active: true },
//   { id: 3, name: "Saria 12mm (Grade 60)", type: "New Material", category: "Steel / Saria", quality: "Grade 60", price: 265, unit: "kg", quantity: 8, availability: "Available", location: "Satellite Town", pickup: "Pickup only", description: "Grade 60 deformed bar, 12mm.", image: steelSaria, status: "Approved", active: true },
//   { id: 4, name: "Reused Wooden Doors", type: "Reused Material", category: "Reused Materials", quality: "Good Condition", price: 6500, unit: "door", quantity: 6, availability: "Available", location: "Model Town", pickup: "Pickup only", description: "Solid wood doors, good condition.", image: sand, status: "Approved", active: true },
//   { id: 5, name: "Chenab Sand", type: "New Material", category: "Sand / Rait", quality: "Standard", price: 55, unit: "cft", quantity: 400, availability: "Available", location: "Wazirabad Road", pickup: "Truck delivery", description: "Clean construction sand.", image: sand, status: "Pending", active: false },
// ];

// export default function SupplierListingsPage() {
//   // ===== State =====
//   const [materials, setMaterials] = useState(BM_START_MATERIALS);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null); // null = Add, number = Edit
//   const [form, setForm] = useState(BM_EMPTY_FORM);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [toast, setToast] = useState("");

//   // ===== Helpers =====
//   const isOutOfStock = (item) =>
//     item.availability === "Out of Stock" || item.quantity === 0;

//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // ===== Stats (materials se khud hisab) =====
//   const stats = [
//     { id: 1, label: "Total Materials", value: materials.length, icon: Package },
//     { id: 2, label: "Active Materials", value: materials.filter((m) => m.active).length, icon: CheckCircle2 },
//     { id: 3, label: "Low Stock", value: materials.filter((m) => !isOutOfStock(m) && m.quantity <= BM_LOW_STOCK).length, icon: AlertTriangle },
//     { id: 4, label: "Out of Stock", value: materials.filter((m) => isOutOfStock(m)).length, icon: PackageX },
//   ];

//   // ===== Search + filters =====
//   const visibleMaterials = materials.filter((item) => {
//     const text = search.trim().toLowerCase();
//     const matchesSearch = !text || item.name.toLowerCase().includes(text);
//     const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
//     const matchesStatus =
//       statusFilter === "All" ||
//       (statusFilter === "Active" && item.active) ||
//       (statusFilter === "Inactive" && !item.active) ||
//       (statusFilter === "Out of Stock" && isOutOfStock(item));
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   // ===== Card handlers =====
//   const handleToggleActive = (id) => {
//     setMaterials(materials.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
//     showToast("Material status updated");
//   };

//   const handleMarkOut = (id) => {
//     setMaterials(materials.map((m) => (m.id === id ? { ...m, availability: "Out of Stock" } : m)));
//     showToast("Material marked out of stock");
//   };

//   const handleDuplicate = (id) => {
//     const original = materials.find((m) => m.id === id);
//     const copy = { ...original, id: Date.now(), name: `${original.name} (Copy)`, status: "Draft", active: false };
//     setMaterials([copy, ...materials]);
//     showToast("Material duplicated");
//   };

//   // ===== Form handlers =====
//   const handleOpenAdd = () => {
//     setEditingId(null);
//     setForm(BM_EMPTY_FORM);
//     setIsFormOpen(true);
//   };

//   const handleOpenEdit = (id) => {
//     const item = materials.find((m) => m.id === id);
//     setEditingId(id);
//     setForm({ ...item, price: String(item.price), quantity: String(item.quantity) });
//     setIsFormOpen(true);
//   };

//   const handleCloseForm = () => setIsFormOpen(false);

//   // Har input ke liye aik hi handler (input ke name se field milti hai)
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setForm({ ...form, image: URL.createObjectURL(file) });
//   };

//   const handleRemoveImage = () => setForm({ ...form, image: null });

//   // Save: status = "Pending" (Submit for Approval), "Draft", ya edit mein purana status
//   const saveMaterial = (status) => {
//     const data = {
//       ...form,
//       price: Number(form.price) || 0,
//       quantity: Number(form.quantity) || 0,
//       image: form.image || tiles,
//     };

//     if (editingId) {
//       setMaterials(materials.map((m) => (m.id === editingId ? { ...m, ...data } : m)));
//       showToast("Changes saved");
//     } else {
//       setMaterials([{ ...data, id: Date.now(), status, active: false }, ...materials]);
//       showToast(status === "Draft" ? "Saved as draft" : "Submitted for approval");
//     }
//     setIsFormOpen(false);
//   };

//   // Form submit (required fields browser khud check karta hai)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     saveMaterial("Pending");
//   };

//   const handleSaveDraft = () => saveMaterial("Draft");

//   const handleTogglePreview = () => setIsPreviewOpen(!isPreviewOpen);

//   // Public preview: sirf active aur approved
//   const publicItems = materials.filter((m) => m.active && m.status === "Approved");

//   // Input ki common styling (dobara dobara na likhni paray)
//   const inputClass =
//     "bmSupplierForm-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-[color:var(--heading-color)] outline-none focus:border-[color:var(--graphite-grey)]";
//   const labelClass =
//     "bmSupplierForm-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--heading-color)]";

//   return (
//     <main className="bmSupplier-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
//       {/* ----- Header ----- */}
//       <div className="bmSupplier-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="bmSupplier-title text-3xl text-[color:var(--heading-color)] sm:text-4xl">
//             My Materials
//           </h1>
//           <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
//             Manage the materials you list on BuildMart.
//           </p>
//         </div>

//         <div className="bmSupplier-headerActions flex flex-wrap gap-3">
//           <button
//             type="button"
//             onClick={handleTogglePreview}
//             className="bmSupplier-previewBtn flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--heading-color)] transition-colors duration-300 hover:bg-[var(--main-bg)]"
//           >
//             <Eye size={18} />
//             Public Preview
//           </button>
//           <button
//             type="button"
//             onClick={handleOpenAdd}
//             className="bmSupplier-addBtn flex cursor-pointer items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--white)] transition-colors duration-300 hover:bg-[var(--graphite-grey)]"
//           >
//             <Plus size={18} />
//             Add Material
//           </button>
//         </div>
//       </div>

//       {/* ----- Stats ----- */}
//       <div className="bmSupplier-stats mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
//         <BmSupplierStats stats={stats} />
//       </div>

//       {/* ----- Search + filters ----- */}
//       <div className="bmSupplier-filters mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_200px]">
//         <div className="flex min-w-0 items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--input-bg)] px-3">
//           <Search size={18} className="shrink-0 text-[color:var(--icon-color)]" />
//           <input
//             type="search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search materials..."
//             className="min-h-11 w-full min-w-0 bg-transparent text-sm outline-none"
//           />
//         </div>

//         <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${inputClass} min-h-11`}>
//           {BM_STATUS_FILTERS.map((s) => (
//             <option key={s} value={s}>{s}</option>
//           ))}
//         </select>

//         <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={`${inputClass} min-h-11`}>
//           <option value="All">All</option>
//           {BM_CATEGORIES.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       {/* ----- Cards ----- */}
//       <div className="bmSupplier-grid mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4">
//         <BmSupplierMaterialCards
//           materials={visibleMaterials}
//           onEdit={handleOpenEdit}
//           onToggleActive={handleToggleActive}
//           onDuplicate={handleDuplicate}
//           onMarkOut={handleMarkOut}
//         />
//       </div>

//       {visibleMaterials.length === 0 && (
//         <p className="mt-10 text-center text-sm text-[color:var(--secondary-text)]">
//           No materials found.
//         </p>
//       )}

//       {/* ----- Toast message ----- */}
//       {toast && (
//         <div className="bmSupplier-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white)] shadow-xl sm:right-6">
//           <CheckCircle2 size={18} />
//           {toast}
//         </div>
//       )}

//       {/* ===== Add / Edit form popup (form isi page mein) ===== */}
//       {isFormOpen && (
//         <div className="bmSupplierForm-overlay fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
//           <div className="bmSupplierForm-box max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl bg-[var(--card-bg)] p-5 sm:rounded-xl sm:p-7">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl text-[color:var(--heading-color)]">
//                 {editingId ? "Edit Material" : "Add Material"}
//               </h2>
//               <button type="button" onClick={handleCloseForm} aria-label="Close" className="cursor-pointer rounded-full p-1.5 text-[color:var(--secondary-text)] hover:bg-[var(--main-bg)]">
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="bmSupplierForm-form mt-5">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label className={labelClass}>Material Name *</label>
//                   <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Material Type *</label>
//                   <select name="type" value={form.type} onChange={handleChange} required className={inputClass}>
//                     {BM_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Category *</label>
//                   <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
//                     <option value="">Select category</option>
//                     {BM_CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Quality / Condition</label>
//                   <select name="quality" value={form.quality} onChange={handleChange} className={inputClass}>
//                     <option value="">Select quality</option>
//                     {BM_QUALITY.map((q) => (<option key={q} value={q}>{q}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Price (Rs.) *</label>
//                   <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Unit *</label>
//                   <select name="unit" value={form.unit} onChange={handleChange} required className={inputClass}>
//                     {BM_UNITS.map((u) => (<option key={u} value={u}>{u}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Available Quantity / Stock *</label>
//                   <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} required className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Availability</label>
//                   <select name="availability" value={form.availability} onChange={handleChange} className={inputClass}>
//                     {BM_AVAILABILITY.map((a) => (<option key={a} value={a}>{a}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Location *</label>
//                   <input name="location" value={form.location} onChange={handleChange} required placeholder="Gujranwala" className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Pickup / Delivery Information</label>
//                   <input name="pickup" value={form.pickup} onChange={handleChange} className={inputClass} />
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className={labelClass}>Description &amp; Specifications</label>
//                   <textarea name="description" rows={3} value={form.description} onChange={handleChange} className={inputClass} />
//                 </div>

//                 {/* Images */}
//                 <div className="sm:col-span-2">
//                   <label className={labelClass}>Material Images</label>
//                   <div className="flex flex-wrap items-center gap-3">
//                     {form.image && (
//                       <div className="relative h-20 w-20 overflow-hidden rounded-md border border-[color:var(--border-color)]">
//                         <Image src={form.image} alt="Material" fill unoptimized className="object-cover" />
//                         <button type="button" onClick={handleRemoveImage} aria-label="Remove image" className="absolute right-1 top-1 cursor-pointer rounded-full bg-[var(--charcoal-black)] p-0.5 text-[color:var(--white)]">
//                           <X size={12} />
//                         </button>
//                       </div>
//                     )}
//                     <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[color:var(--border-color)] text-[11px] text-[color:var(--secondary-text)] hover:bg-[var(--main-bg)]">
//                       <ImagePlus size={20} />
//                       Add Image
//                       <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//                 {!editingId && (
//                   <button type="button" onClick={handleSaveDraft} className="cursor-pointer rounded-md border border-[color:var(--border-color)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--heading-color)] hover:bg-[var(--main-bg)]">
//                     Save as Draft
//                   </button>
//                 )}
//                 <button type="submit" className="cursor-pointer rounded-md bg-[var(--charcoal-black)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--white)] hover:bg-[var(--graphite-grey)]">
//                   {editingId ? "Save Changes" : "Submit for Approval"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ===== Public Preview popup ===== */}
//       {isPreviewOpen && (
//         <div className="bmSupplierPreview-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="bmSupplierPreview-box max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-[var(--card-bg)] p-5 sm:p-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl text-[color:var(--heading-color)]">Public Marketplace — Demo Preview</h2>
//               <button type="button" onClick={handleTogglePreview} aria-label="Close" className="cursor-pointer rounded-full p-1.5 hover:bg-[var(--main-bg)]">
//                 <X size={20} />
//               </button>
//             </div>

//             {BM_TYPES.map((type) => (
//               <div key={type} className="mt-5">
//                 <p className="text-xs uppercase tracking-widest text-[color:var(--secondary-text)]">
//                   {type === "New Material" ? "New Materials" : "Reused Materials"}
//                 </p>
//                 <div className="mt-3 flex flex-col gap-3">
//                   {publicItems.filter((m) => m.type === type).map((m) => (
//                     <div key={m.id} className="flex items-center gap-3">
//                       <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--silver)]">
//                         <Image src={m.image} alt={m.name} fill unoptimized className="object-cover" />
//                       </div>
//                       <div className="min-w-0">
//                         <p className="truncate text-sm font-[family-name:Poppins-Medium] text-[color:var(--heading-color)]">{m.name}</p>
//                         <p className="text-xs text-[color:var(--secondary-text)]">Rs. {Number(m.price).toLocaleString()} / {m.unit}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Globe,
  Plus,
  Package,
  CircleCheck,
  TriangleAlert,
  PackageX,
  Power,
  Pencil,
  X,
  ImagePlus,
  Star,
} from "lucide-react";

// Card images: src/assets/images/guest/card/ (asli images supplier upload karega)
import briks from "../../../assets/images/guest/card/briks.jpg";
import paint from "../../../assets/images/guest/card/paint.jpg";
import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
import sand from "../../../assets/images/guest/card/sand.jpg";

/* ---------------- Datasets ---------------- */

const initialMaterials = [
  { id: 1, name: "A-Class Bricks", type: "New Material", category: "Bricks", quality: "A-Class", price: 18, unit: "brick", qty: 0, availability: "Out of Stock", location: "Gujranwala", pickup: "", description: "Bhatta fired, uniform size, strong A-class eent.", images: [briks], approval: "Approved", deactivated: true },
  { id: 2, name: "DG Cement (OPC)", type: "New Material", category: "Cement", quality: "Grade 53", price: 1450, unit: "bag", qty: 0, availability: "Out of Stock", location: "Gujranwala", pickup: "", description: "Ordinary Portland Cement, 50kg bag.", images: [paint], approval: "Approved", deactivated: true },
  { id: 3, name: "Saria 12mm (Grade 60)", type: "New Material", category: "Steel / Saria", quality: "Grade 60", price: 265, unit: "kg", qty: 0, availability: "Out of Stock", location: "Gujranwala", pickup: "", description: "Grade 60 deformed steel bars, 12mm.", images: [steelSaria], approval: "Approved", deactivated: false },
  { id: 4, name: "Reused Wooden Doors", type: "Reused Material", category: "Doors & Windows", quality: "Good", price: 6500, unit: "door", qty: 8, availability: "Available", location: "Gujranwala", pickup: "Pickup from shop", description: "Solid wood doors in good condition.", images: [doorsWindows], approval: "Approved", deactivated: false },
  { id: 5, name: "Ravi Sand (Truck)", type: "New Material", category: "Sand", quality: "Washed", price: 28000, unit: "truck", qty: 3, availability: "Low Stock", location: "Gujranwala", pickup: "", description: "Clean washed Ravi sand.", images: [sand], approval: "Approved", deactivated: true },
];

const emptyForm = {
  name: "", type: "New Material", category: "", quality: "", price: "", unit: "Piece",
  qty: "0", availability: "Available", location: "", pickup: "", description: "", images: [],
};

const types = ["New Material", "Reused Material"];
const categories = ["Bricks", "Cement", "Steel / Saria", "Sand", "Paint", "Tiles", "Doors & Windows", "Others"];
const units = ["Piece", "brick", "bag", "kg", "door", "truck", "ton", "sq ft"];
const availabilityOptions = ["Available", "Low Stock", "Out of Stock"];
const statusFilters = ["All", "Available", "Low Stock", "Out of Stock", "Deactivated"];

/* ---------------- Shared styles + helpers ---------------- */

const badgeColors = {
  Available: "bg-green-50 text-green-700 ring-green-200",
  "Low Stock": "bg-orange-50 text-orange-600 ring-orange-200",
  "Out of Stock": "bg-red-50 text-red-600 ring-red-200",
  Approved: "bg-green-50 text-green-700 ring-green-200",
  "Pending Approval": "bg-orange-50 text-orange-600 ring-orange-200",
  Draft: "bg-[var(--off-white-background)] text-[color:var(--secondary-text)] ring-[color:var(--border-color)]",
};

const field =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const label = "mb-1.5 block text-sm text-[color:var(--primary-text)]";
const outlineBtn =
  "inline-flex items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)] disabled:cursor-not-allowed disabled:opacity-40";
const yellowBtn =
  "inline-flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";

const rs = (n) => `Rs. ${Number(n).toLocaleString("en-US")}`;

// Image: static import ho ya upload ki hui blob url, dono chalte hain
const Img = ({ src, alt }) => <Image src={src} alt={alt} fill unoptimized className="object-cover" />;

const Badge = ({ text }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-xs ring-1 ${badgeColors[text]}`}>{text}</span>
);

// Overlay + heading + close icon: sab modals yahi use karte hain
const ModalShell = ({ title, onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative my-auto w-full max-w-3xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
        <h2 className="text-lg text-[color:var(--primary-text)]">{title}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------------- Stat cards (grid) ---------------- */

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="flex items-center gap-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-yellow)]/20 text-[color:var(--charcoal-black)]">
      <Icon size={22} />
    </span>
    <div>
      <p className="text-xs uppercase text-[color:var(--secondary-text)]">{title}</p>
      <p className="text-2xl font-semibold text-[color:var(--primary-text)]">{value}</p>
    </div>
  </div>
);

/* ---------------- Material card (grid) ---------------- */

const MaterialCard = ({ m, onEdit, onToggle, onOutOfStock }) => (
  <div className="overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
    {/* Image + chips */}
    <div className="relative h-40 bg-[var(--off-white-background)]">
      {m.images[0] && <Img src={m.images[0]} alt={m.name} />}
      {m.deactivated && <div className="absolute inset-0 bg-black/50" />}
      <span className="absolute left-3 top-3 rounded-full bg-[var(--primary-yellow)] px-2.5 py-0.5 text-xs text-[color:var(--charcoal-black)]">
        {m.type}
      </span>
      {m.deactivated && (
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs text-[color:var(--secondary-text)]">
          Deactivated
        </span>
      )}
    </div>

    <div className="p-4">
      <h3 className="text-base font-semibold text-[color:var(--primary-text)]">{m.name}</h3>
      <p className="text-xs text-[color:var(--secondary-text)]">
        {m.category}{m.quality && ` · ${m.quality}`}
      </p>

      <p className="mt-3 text-xl font-semibold text-[color:var(--primary-text)]">
        {rs(m.price)} <span className="text-sm font-normal text-[color:var(--secondary-text)]">/ {m.unit}</span>
      </p>
      <p className="text-sm text-[color:var(--primary-text)]">{m.qty} {m.unit} available</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge text={m.availability} />
        <Badge text={m.approval} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-[color:var(--border-color)] pt-4">
        <button type="button" onClick={() => onEdit(m)} className={outlineBtn}>
          <Pencil size={14} /> Edit
        </button>
        <button type="button" onClick={() => onToggle(m.id)} className={outlineBtn}>
          <Power size={14} /> {m.deactivated ? "Activate" : "Deactivate"}
        </button>
        <button
          type="button"
          disabled={m.availability === "Out of Stock"}
          onClick={() => onOutOfStock(m.id)}
          className={outlineBtn}
        >
          <PackageX size={14} /> Mark Out of Stock
        </button>
      </div>
    </div>
  </div>
);

/* ---------------- Page ---------------- */

const MyMaterialsPage = () => {
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState(null); // null = form band, "new" ya material id
  const [data, setData] = useState(emptyForm); // form ke fields
  const [previewOpen, setPreviewOpen] = useState(false);

  // Stat cards ke numbers
  const count = (test) => materials.reduce((n, m) => n + (test(m) ? 1 : 0), 0);
  const stats = [
    { title: "Total Materials", value: materials.length, icon: Package },
    { title: "Active Materials", value: count((m) => !m.deactivated), icon: CircleCheck },
    { title: "Low Stock", value: count((m) => m.availability === "Low Stock"), icon: TriangleAlert },
    { title: "Out of Stock", value: count((m) => m.availability === "Out of Stock"), icon: PackageX },
    { title: "Deactivated Materials", value: count((m) => m.deactivated), icon: Power },
  ];

  /* ---- card buttons ---- */

  const handleToggle = (id) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, deactivated: !m.deactivated } : m)));
  };

  const handleOutOfStock = (id) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, qty: 0, availability: "Out of Stock" } : m)));
  };

  /* ---- add / edit form ---- */

  const handleAdd = () => {
    setData(emptyForm);
    setEditing("new");
  };

  const handleEdit = (m) => {
    setData({ ...m, price: String(m.price), qty: String(m.qty) });
    setEditing(m.id);
  };

  const handleChange = (key) => (e) => setData({ ...data, [key]: e.target.value });

  // Nayi images chuno: pehli image Primary hogi
  const handleFiles = (e) => {
    const urls = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    setData({ ...data, images: [...data.images, ...urls] });
  };

  const handleRemoveImage = (i) => {
    setData({ ...data, images: data.images.reduce((all, img, n) => (n === i ? all : [...all, img]), []) });
  };

  const handleSetPrimary = (i) => {
    setData({ ...data, images: [data.images[i], ...data.images.reduce((all, img, n) => (n === i ? all : [...all, img]), [])] });
  };

  // Save: approval = "Draft" ya "Pending Approval". Edit mein purana approval status rehta hai
  const handleSave = (approval) => {
    const old = materials.find((m) => m.id === editing);
    const item = {
      ...data,
      price: Number(data.price) || 0,
      qty: Number(data.qty) || 0,
      approval: old ? old.approval : approval,
      deactivated: old ? old.deactivated : false,
    };
    setMaterials(old ? materials.map((m) => (m.id === editing ? { ...item, id: m.id } : m)) : [...materials, { ...item, id: Date.now() }]);
    setEditing(null);
  };

  // Required fields bhare hon to hi Submit chalega
  const isValid =
    data.name.trim() !== "" && data.category !== "" && data.price !== "" && data.location.trim() !== "";
  const isEdit = editing !== "new" && editing !== null;

  /* ---- search + dropdowns ---- */

  const visible = materials.reduce((all, m) => {
    const matchSearch = `${m.name} ${m.category} ${m.quality}`.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || m.type === typeFilter;
    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Deactivated" ? m.deactivated : m.availability === statusFilter);
    return matchSearch && matchType && matchStatus ? [...all, m] : all;
  }, []);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + buttons */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">My Materials</h1>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{materials.length} materials</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setPreviewOpen(true)} className={`${outlineBtn} px-4 py-2 text-sm`}>
            <Globe size={16} /> Public Preview
          </button>
          <button type="button" onClick={handleAdd} className={yellowBtn}>
            <Plus size={16} /> Add Material
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} icon={s.icon} />
        ))}
      </div>

      {/* Search + dropdowns */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search materials..."
          aria-label="Search materials"
          className={`${field} sm:max-w-xs`}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Type filter" className={`${field} sm:w-44`}>
          <option>All</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Status filter" className={`${field} sm:w-52`}>
          {statusFilters.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Material cards */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((m) => (
          <MaterialCard key={m.id} m={m} onEdit={handleEdit} onToggle={handleToggle} onOutOfStock={handleOutOfStock} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-8 text-center text-sm text-[color:var(--secondary-text)]">No materials found.</p>
      )}

      {/* ---------- Add / Edit form ---------- */}
      {editing !== null && (
        <ModalShell title={isEdit ? "Edit Material" : "Add Material"} onClose={() => setEditing(null)}>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bmMatName" className={label}>Material Name *</label>
              <input id="bmMatName" type="text" autoFocus value={data.name} onChange={handleChange("name")} className={field} />
            </div>
            <div>
              <label htmlFor="bmMatType" className={label}>Material Type *</label>
              <select id="bmMatType" value={data.type} onChange={handleChange("type")} className={field}>
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bmMatCategory" className={label}>Category *</label>
              <select id="bmMatCategory" value={data.category} onChange={handleChange("category")} className={field}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bmMatQuality" className={label}>Quality / Condition</label>
              <input id="bmMatQuality" type="text" value={data.quality} onChange={handleChange("quality")} className={field} />
            </div>

            <div>
              <label htmlFor="bmMatPrice" className={label}>Price (Rs.) *</label>
              <input id="bmMatPrice" type="number" min="0" value={data.price} onChange={handleChange("price")} className={field} />
            </div>
            <div>
              <label htmlFor="bmMatUnit" className={label}>Unit *</label>
              <select id="bmMatUnit" value={data.unit} onChange={handleChange("unit")} className={field}>
                {units.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bmMatQty" className={label}>Available Quantity / Stock *</label>
              <input id="bmMatQty" type="number" min="0" value={data.qty} onChange={handleChange("qty")} className={field} />
            </div>
            <div>
              <label htmlFor="bmMatAvail" className={label}>Availability</label>
              <select id="bmMatAvail" value={data.availability} onChange={handleChange("availability")} className={field}>
                {availabilityOptions.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bmMatLocation" className={label}>Location *</label>
              <input id="bmMatLocation" type="text" value={data.location} onChange={handleChange("location")} className={field} />
            </div>
            <div>
              <label htmlFor="bmMatPickup" className={label}>Pickup / Delivery Information</label>
              <input id="bmMatPickup" type="text" value={data.pickup} onChange={handleChange("pickup")} className={field} />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="bmMatDesc" className={label}>Description &amp; Specifications</label>
            <textarea id="bmMatDesc" rows={3} value={data.description} onChange={handleChange("description")} className={`${field} resize-y`} />
          </div>

          {/* Images */}
          <p className={`mt-4 ${label}`}>Material Images</p>
          <div className="flex flex-wrap gap-3">
            {data.images.map((img, i) => (
              <div key={i} className="w-28">
                <div className="relative h-24 overflow-hidden rounded-md bg-[var(--off-white-background)]">
                  <Img src={img} alt={`Material ${i + 1}`} />
                  <button
                    type="button"
                    aria-label={`Remove image ${i + 1}`}
                    onClick={() => handleRemoveImage(i)}
                    className="absolute right-1 top-1 rounded bg-[var(--charcoal-black)] p-0.5 text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleSetPrimary(i)}
                  className={`mt-1 flex w-full items-center justify-center gap-1 rounded-md px-2 py-1 text-xs ${
                    i === 0
                      ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                      : "border border-[color:var(--border-color)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
                  }`}
                >
                  {i === 0 && <Star size={12} />} {i === 0 ? "Primary" : "Set primary"}
                </button>
              </div>
            ))}

            <label className="flex h-24 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-[color:var(--border-color)] text-xs text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]">
              <ImagePlus size={22} />
              Add images
              <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" aria-label="Add images" />
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            {isEdit ? (
              <>
                <button type="button" onClick={() => setEditing(null)} className={`${outlineBtn} px-4 py-2 text-sm`}>Cancel</button>
                <button type="button" disabled={!isValid} onClick={() => handleSave("Pending Approval")} className={yellowBtn}>Save Changes</button>
              </>
            ) : (
              <>
                <button type="button" disabled={data.name.trim() === ""} onClick={() => handleSave("Draft")} className={`${outlineBtn} px-4 py-2 text-sm`}>Save as Draft</button>
                <button type="button" disabled={!isValid} onClick={() => handleSave("Pending Approval")} className={yellowBtn}>Submit for Approval</button>
              </>
            )}
          </div>
        </ModalShell>
      )}

      {/* ---------- Public preview ---------- */}
      {previewOpen && (
        <ModalShell title="Public Marketplace — Demo Preview" onClose={() => setPreviewOpen(false)}>
          {types.map((t) => {
            // Public par sirf active aur approved materials dikhte hain
            const items = materials.reduce(
              (all, m) => (m.type === t && !m.deactivated && m.approval === "Approved" ? [...all, m] : all),
              []
            );
            return (
              <div key={t} className="mt-5">
                <h3 className="text-base font-semibold text-[color:var(--primary-text)]">{t}s</h3>
                {items.length === 0 && <p className="mt-3 text-sm text-[color:var(--secondary-text)]">No active materials.</p>}
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {items.map((m) => (
                    <div key={m.id} className="flex gap-3 border-b border-[color:var(--border-color)] pb-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-[var(--off-white-background)]">
                        {m.images[0] && <Img src={m.images[0]} alt={m.name} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--primary-text)]">{m.name}</p>
                        <p className="text-sm text-[color:var(--primary-text)]">{rs(m.price)} / {m.unit}</p>
                        <p className="text-xs text-[color:var(--secondary-text)]">{m.qty} {m.unit} · supplier</p>
                        <div className="mt-1"><Badge text={m.availability} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </ModalShell>
      )}
    </section>
  );
};

export default MyMaterialsPage;