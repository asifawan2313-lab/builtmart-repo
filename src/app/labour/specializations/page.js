"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import LabourTable from "../../../component/labour/LabourTable/LabourTable";
import { labourCategories, labourAreas } from "../../(guest)/labour/labourData";

/* ============================================================
   DEMO DATA (sab values sirf UI ke liye hain)
   ============================================================ */

const initialItems = [
  { id: 1, category: "Plumbing", skills: ["Pipe fitting", "Leak repair"], experience: 5, areas: ["Demo Area A", "Demo Area B"], availability: "Available" },
  { id: 2, category: "Painting", skills: ["Wall painting", "Wall finishing"], experience: 3, areas: ["Demo Area B"], availability: "Busy this week" },
];

const availabilityOptions = ["Available", "Busy this week"];

const emptyForm = { category: "", skills: "", experience: "", areas: [], availability: "Available" };

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const outlineBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#D9E3E9] bg-white text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

/* ============================================================
   PAGE
   ============================================================ */

const LabourSpecializationsPage = () => {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState(null); // null = form band, "new" = naya, number = edit
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleAdd = () => {
    setEditingId("new");
    setForm(emptyForm);
    setError("");
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item, skills: item.skills.join(", "), experience: String(item.experience) });
    setError("");
  };

  const handleToggleArea = (area) =>
    setForm((prev) => ({
      ...prev,
      areas: prev.areas.includes(area) ? prev.areas.filter((a) => a !== area) : [...prev.areas, area],
    }));

  // Save (simulated): sirf is page ki state mein
  const handleSave = (e) => {
    e.preventDefault();

    if (!form.category) return setError("Please choose a specialization.");
    if (form.experience === "" || Number(form.experience) < 0) return setError("Please enter your experience in years.");
    if (form.areas.length === 0) return setError("Please select at least one service area.");

    const saved = {
      category: form.category,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      experience: Number(form.experience),
      areas: form.areas,
      availability: form.availability,
    };

    setItems((prev) =>
      editingId === "new"
        ? [...prev, { id: Date.now(), ...saved }]
        : prev.map((item) => (item.id === editingId ? { ...item, ...saved } : item))
    );
    setEditingId(null);
    setError("");
  };

  // Sirf wo categories jo abhi add nahi hui (approved platform categories)
  const freeCategories = labourCategories.filter((c) => !items.some((i) => i.category === c.name));

  // Table ke columns: har cell ka design yahan likha hai
  const columns = [
    { key: "category", label: "Specialization", render: (i) => <span className="font-semibold">{i.category}</span> },
    { key: "skills", label: "Skills", render: (i) => i.skills.join(", ") || "-" },
    { key: "experience", label: "Experience", render: (i) => `${i.experience} yrs` },
    { key: "areas", label: "Service Areas", render: (i) => i.areas.join(", ") },
    {
      key: "availability",
      label: "Availability",
      render: (i) => (
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${i.availability === "Available" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
          {i.availability}
        </span>
      ),
    },
    {
      key: "action",
      label: "",
      render: (i) => (
        <button type="button" onClick={() => handleEdit(i)} className={`${outlineBtn} h-8 rounded-md px-3 text-xs`}>
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Specializations</h1>
          <p className="mt-1 text-xs text-[#565553]">
            Job requests that match these skills and areas will reach you. Only approved categories can be added.
          </p>
        </div>

        {editingId === null && freeCategories.length > 0 && (
          <button type="button" onClick={handleAdd} className={`${yellowBtn} h-10 rounded-lg px-4`}>
            <Plus size={16} aria-hidden="true" />
            Add Specialization
          </button>
        )}
      </div>

      {/* Add / Edit form (form page ke andar hi hai) */}
      {editingId !== null && (
        <form onSubmit={handleSave} className="mt-5 space-y-4 rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-bold text-[#202124]">{editingId === "new" ? "Add specialization" : "Edit specialization"}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-[#565553]">
              Specialization
              <select
                value={form.category}
                disabled={editingId !== "new"}
                onChange={(e) => handleChange("category", e.target.value)}
                className={`${field} mt-1 font-normal disabled:bg-[#F4F4F2]`}
              >
                <option value="">Choose a category</option>
                {(editingId === "new" ? freeCategories : labourCategories).map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Experience (years)
              <input type="number" min="0" value={form.experience} onChange={(e) => handleChange("experience", e.target.value)} className={`${field} mt-1 font-normal`} />
            </label>

            <label className="block text-xs font-semibold text-[#565553] sm:col-span-2">
              Skills (separate with commas)
              <input type="text" value={form.skills} onChange={(e) => handleChange("skills", e.target.value)} placeholder="e.g. Pipe fitting, Leak repair" className={`${field} mt-1 font-normal`} />
            </label>

            <label className="block text-xs font-semibold text-[#565553]">
              Availability
              <select value={form.availability} onChange={(e) => handleChange("availability", e.target.value)} className={`${field} mt-1 font-normal`}>
                {availabilityOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>
          </div>

          <fieldset>
            <legend className="text-xs font-semibold text-[#565553]">Service areas (Gujranwala)</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {labourAreas.map((area) => (
                <label key={area} className="flex cursor-pointer items-center gap-2 text-sm text-[#202124]">
                  <input type="checkbox" checked={form.areas.includes(area)} onChange={() => handleToggleArea(area)} className="h-4 w-4 accent-[#FDC716]" />
                  {area}
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p role="alert" className="rounded bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" className={`${yellowBtn} h-10 rounded-lg px-5`}>Save</button>
            <button type="button" onClick={() => setEditingId(null)} className={`${outlineBtn} h-10 rounded-lg px-5`}>Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-5">
        <LabourTable columns={columns} rows={items} emptyText="No specializations yet." />
      </div>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample data shown for demonstration purposes.</p>
    </div>
  );
};

export default LabourSpecializationsPage;