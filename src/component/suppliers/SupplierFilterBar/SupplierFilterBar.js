"use client";

import { MapPin, ShieldCheck, Star, RotateCcw } from "lucide-react";

// Options badalne hon to sirf yahan badlein (demo data)
const FILTERS = [
  {
    label: "Location",
    icon: MapPin,
    options: ["All Areas", "Satellite Town", "Model Town", "GT Road", "Peoples Colony"],
  },
  {
    label: "Verification Status",
    icon: ShieldCheck,
    options: ["All Suppliers", "Verified", "Unverified"],
  },
  {
    label: "Rating",
    icon: Star,
    options: ["Any Rating", "4.5 & above", "4.0 & above", "3.5 & above"],
  },
];

export default function SupplierFilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {FILTERS.map(({ label, icon: Icon, options }) => (
        // Box: normal grey border, andar click karne par black
        <label
          key={label}
          className="flex items-center gap-2 rounded-lg border border-[#E2E4E7] bg-white px-3 py-1.5 text-sm text-[#45484D] transition-colors focus-within:border-black focus-within:ring-1 focus-within:ring-black"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
          <select
            aria-label={label}
            defaultValue={options[0]}
            className="rounded-md border border-[#E2E4E7] bg-white px-2 py-1.5 text-sm text-[#202124] outline-none focus:border-black"
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      ))}

      {/* Clear All (abhi sirf dikhta hai, koi action nahi) */}
      <button
        type="button"
        className="ml-auto flex items-center gap-2 text-sm text-[#45484D] transition-colors hover:text-black"
      >
        Clear All
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}