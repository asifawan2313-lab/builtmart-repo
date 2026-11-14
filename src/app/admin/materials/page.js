// import MaterialManagement from "./Materialmanegment.js";

// export default function MaterialsPage() {
//   return <MaterialManagement />;
// }

"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MaterialDataRow from "../../../component/admin/MaterialDataRow";

/* ============================================================
   1. DATA
   ============================================================ */

const tabs = ["All", "New", "Reused"];

const newMaterials = [
  {
    id: 1,
    name: "Red Clay Bricks (A-Class)",
    category: "Category removed",
    supplier: "Brick House",
    price: "Rs 16/brick",
    stock: "In Stock",
    status : "deactive",
    complaints: "None",
  },
  {
    id: 2,
    name: "DG Khan Cement OPC",
    category: "Cement",
    supplier: "Sheikh Traders",
    price: "Rs 1,350/bag",
    stock: "In Stock",
    status : "deactive",
    complaints: "None",
  },
  {
    id: 3,
    name: "Grade 60 Steel Saria 12mm",
    category: "Steel / Saria",
    supplier: "Sheikh Traders",
    price: "Rs 265/kg",
    stock: "In Stock",
    status : "deactive",
    complaints: "None",
  },
  {
    id: 7,
    name: "Weather Shield Paint 16L",
    category: "Paint",
    supplier: "Sheikh Traders",
    price: "Rs 14,500/drum",
    stock: "In Stock",
    status : "deactive",
    complaints: "None",
  },
  {
    id: 8,
    name: "Ravi Sand (Truck)",
    category: "Sand / Rait",
    supplier: "Sheikh Traders",
    price: "Rs 28,000/truck",
    stock: "In Stock",
    status : "deactive",
    complaints: "None",
  },
  {
    id: 9,
    name: "Floor Tiles 2x2",
    category: "Tiles",
    supplier: "Tile City",
    price: "Rs 95/sq ft",
    stock: "In Stock",
    status : "active",
    complaints: "None",
  },
];

const reusedMaterials = [
  {
    id: 4,
    name: "Used Wooden Doors (set of 4)",
    category: "Doors & Windows",
    supplier: "Ahmed Raza",
    price: "Rs 9,000/door",
    stock: "Available",
    status : "active",
    complaints: "None",
  },
  {
    id: 5,
    name: "Leftover Porcelain Tiles",
    category: "Tiles",
    supplier: "Brick House",
    price: "Rs 110/sq ft",
    stock: "Available",
    status : "active",
    complaints: "None",
  },
  {
    id: 6,
    name: "Salvaged Iron Window Grills",
    category: "Grills & Iron Railings",
    supplier: "Bilal Khan",
    price: "Rs 2,500/piece",
    stock: "Available",
    status : "active",
    complaints: "None",
  },
];

// Har tab ka apna dataset (seedha lookup, koi filter nahi)
const materialsByTab = {
  All: [...newMaterials, ...reusedMaterials],
  New: newMaterials,
  Reused: reusedMaterials,
};

// Active / Unavailable ki shuruati halat (id -> true/false)
const initialActive = Object.fromEntries(
  materialsByTab.All.map((m) => [m.id, m.active]),
);

const headings = [
  "Material Name",
  "Category",
  "Supplier",
  "Price",
  "Availability",
  "Listing Status",
  "Complaints / Reports",
  "Actions",
];
const sortable = ["Material Name", "Price"];
const perPage = 8; // ek page par kitne rows

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* ============================================================
   2. MATERIAL MANAGEMENT
   ============================================================ */

const MaterialManagement = () => {
  const [tab, setTab] = useState("All"); // All / New / Reused
  const [activeMap, setActiveMap] = useState(initialActive);
  const [page, setPage] = useState(1);

  // Tab badalne par pehle page par wapas
  const handleTabClick = (name) => {
    setTab(name);
    setPage(1);
  };

  // Active <-> Unavailable badalna
  const handleToggleClick = (id) => {
    setActiveMap({ ...activeMap, [id]: !activeMap[id] });
  };

  // View click
  const handleViewClick = (name) => console.log("View", name);

  // Is tab ka dataset
  const list = materialsByTab[tab];

  // Pages
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(page, totalPages);

  // Sirf is page ke rows
  const rows = list.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="bmMaterialSection p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="bmMaterialHeadingText text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Material Management
      </h1>

      {/* Tabs: All / New / Reused */}
      <div className="bmMaterialTabRow mt-5 inline-flex rounded-lg bg-[var(--off-white-background)] p-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTabClick(t)}
            className={`bmMaterialTabButton rounded-md px-4 py-1.5 text-sm transition-colors ${
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
      <div className="bmMaterialCard mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Table (chhoti screen par sirf table scroll hoti hai, page nahi) */}
        <div className="overflow-x-auto">
          <table className="bmMaterialTable w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {sortable.includes(h) && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((m, key) => {
                return <MaterialDataRow m={m}  key ={key}/>;
              })}
            </tbody>
          </table>
        </div>

        {/* Footer: records + pages */}
        <div className="bmMaterialFooter flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{list.length} records</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="bmMaterialPrevButton disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>
              Page {current} / {totalPages}
            </span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="bmMaterialNextButton disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   PAGE
   ============================================================ */

const MaterialsPage = () => <MaterialManagement />;

export default MaterialsPage;
