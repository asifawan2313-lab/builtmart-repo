"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function CategoryEditModal({ category, onClose, onSave }) {
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
}