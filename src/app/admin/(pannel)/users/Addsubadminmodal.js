"use client";

import { useState } from "react";
import { X } from "lucide-react";

const moduleList = [
  "User Management", "Material Categories", "Material Management", "Orders",
  "Deliveries & Riders", "Top-Up Requests", "Disputes & Support", "Blogs",
  "Homepage / CMS", "Contact Management", "Reviews & Ratings", "Notifications",
  "Reports & Analytics", "Settings",
];

const fields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "password", label: "Password" },
];

export default function AddSubAdminModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "1234", status: "Active" });
  const [picked, setPicked] = useState({}); // { "Blogs": true, ... }

  const handleSave = () => {
    if (!form.name) return; // naam khali ho to save nahi
    onSave({
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      active: form.status === "Active",
      city: "-",
      registered: new Date().toISOString().slice(0, 10),
      modules: moduleList.reduce((all, m) => (picked[m] ? [...all, m] : all), []),
    });
  };

  const input =
    "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6">
        {/* Band karne ka X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl text-[color:var(--primary-text)]">Add Sub-Admin</h2>

        {/* Fields */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className="text-xs text-[color:var(--secondary-text)]">
              {f.label}
              <input
                type="text"
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className={input}
              />
            </label>
          ))}

          <label className="text-xs text-[color:var(--secondary-text)]">
            Account Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={input}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>

        <p className="mt-3 text-xs text-[color:var(--secondary-text)]">
          Ask this sub-admin to reset their password after their first login.
        </p>

        {/* Permitted modules */}
        <h3 className="mt-5 text-sm text-[color:var(--primary-text)]">Permitted modules</h3>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {moduleList.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
              <input
                type="checkbox"
                checked={!!picked[m]}
                onChange={() => setPicked({ ...picked, [m]: !picked[m] })}
                className="h-4 w-4 accent-[var(--primary-yellow)]"
              />
              {m}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}