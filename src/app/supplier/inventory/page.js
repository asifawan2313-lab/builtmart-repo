"use client";

import { useState } from "react";
import { Boxes, TriangleAlert, PackageX, Minus, Plus } from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialItems = [
  { id: 1, name: "A-Class Bricks", category: "Bricks", stock: 0, adjust: "", price: "18", unit: "brick", availability: "Out of Stock" },
  { id: 2, name: "DG Cement (OPC)", category: "Cement", stock: 0, adjust: "", price: "1450", unit: "bag", availability: "Out of Stock" },
  { id: 3, name: "Saria 12mm (Grade 60)", category: "Steel / Saria", stock: 0, adjust: "", price: "265", unit: "kg", availability: "Out of Stock" },
  { id: 4, name: "Reused Wooden Doors", category: "Doors & Windows", stock: 0, adjust: "", price: "6500", unit: "door", availability: "Out of Stock" },
  { id: 5, name: "Ravi Sand (Rait)", category: "Sand / Rait", stock: 0, adjust: "", price: "45", unit: "cft", availability: "Out of Stock" },
];

const headings = ["Material", "Current Stock", "Adjust Quantity", "Price (Rs.)", "Unit", "Availability"];
const availabilityOptions = ["Available", "Limited", "Out of Stock"];

/* ---------------- Shared styles ---------------- */

const badgeColors = {
  Available: "bg-green-50 text-green-700",
  Limited: "bg-orange-50 text-orange-600",
  "Out of Stock": "bg-red-50 text-red-600",
};

const field =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const stepBtn =
  "flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* ---------------- Stat cards grid ---------------- */

const StatCards = ({ items }) => (
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
    {items.map((s) => (
      <div
        key={s.title}
        className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm ${
          s.dark ? "border-[var(--charcoal-black)] bg-[var(--charcoal-black)] text-white" : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
        }`}
      >
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${s.dark ? "bg-white/15" : "bg-[var(--primary-yellow)]/30 text-[color:var(--charcoal-black)]"}`}>
          <s.icon size={22} />
        </span>
        <div>
          <p className="text-xs uppercase">{s.title}</p>
          <p className="text-2xl font-bold">{s.value}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- Inventory table ---------------- */

const InventoryTable = ({ items, onAdjust, onStep, onField }) => (
  <div className="mt-5 overflow-x-auto rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
    <table className="w-full min-w-[900px] text-left text-sm">
      <thead className="text-xs uppercase text-[color:var(--secondary-text)]">
        <tr>
          {headings.map((h) => (
            <th key={h} className="px-4 py-3 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((m) => (
          <tr key={m.id} className="border-t border-[color:var(--border-color)]">
            <td className="px-4 py-3">
              <p className="font-semibold text-[color:var(--primary-text)]">{m.name}</p>
              <p className="text-xs text-[color:var(--secondary-text)]">{m.category}</p>
            </td>
            <td className="px-4 py-3 font-semibold text-[color:var(--primary-text)]">{m.stock}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <button type="button" aria-label={`Decrease ${m.name}`} onClick={() => onStep(m.id, -1)} className={stepBtn}><Minus size={14} /></button>
                <input
                  type="number"
                  min="1"
                  value={m.adjust}
                  aria-label={`Quantity for ${m.name}`}
                  onChange={(e) => onAdjust(m.id, e.target.value)}
                  className={`${field} w-24`}
                />
                <button type="button" aria-label={`Increase ${m.name}`} onClick={() => onStep(m.id, 1)} className={stepBtn}><Plus size={14} /></button>
              </div>
            </td>
            <td className="px-4 py-3">
              <input type="number" value={m.price} aria-label={`Price of ${m.name}`} onChange={(e) => onField(m.id, "price", e.target.value)} className={`${field} w-24`} />
            </td>
            <td className="px-4 py-3">
              <input type="text" value={m.unit} aria-label={`Unit of ${m.name}`} onChange={(e) => onField(m.id, "unit", e.target.value)} className={`${field} w-24`} />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <select
                  value={m.availability}
                  aria-label={`Availability of ${m.name}`}
                  onChange={(e) => onField(m.id, "availability", e.target.value)}
                  className={`${field} w-36`}
                >
                  {availabilityOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${badgeColors[m.availability]}`}>{m.availability}</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------- Page ---------------- */

const SupplierInventoryPage = () => {
  const [items, setItems] = useState(initialItems);

  // Kisi bhi item ka ek field badlo
  const handleField = (id, key, value) => setItems(items.map((m) => (m.id === id ? { ...m, [key]: value } : m)));

  const handleAdjust = (id, value) => handleField(id, "adjust", value);

  // + / - : box ki quantity (khali ho to 1) stock mein jodo ya ghatao, stock 0 se neeche nahi jata
  const handleStep = (id, direction) =>
    setItems(
      items.map((m) => {
        if (m.id !== id) return m;
        const amount = Number(m.adjust) > 0 ? Number(m.adjust) : 1;
        return { ...m, stock: Math.max(0, m.stock + direction * amount), adjust: "" };
      })
    );

  // Cards ke numbers availability se
  const count = (value) => items.reduce((n, m) => (m.availability === value ? n + 1 : n), 0);

  const stats = [
    { title: "Total stock items", value: items.length, icon: Boxes, dark: true },
    { title: "Low stock", value: count("Limited"), icon: TriangleAlert },
    { title: "Out of stock", value: count("Out of Stock"), icon: PackageX },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Inventory</h1>
      <p className="mt-1 text-sm text-[color:var(--secondary-text)]">Stock, quantity, price aur availability manage karein</p>

      <StatCards items={stats} />
      <InventoryTable items={items} onAdjust={handleAdjust} onStep={handleStep} onField={handleField} />
    </section>
  );
};

export default SupplierInventoryPage;