"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// ---------- Simple datasets ----------

const categories = [
  "Cement", "Bricks", "Steel / Rebar", "Sand", "Crush / Gravel", "Blocks",
  "Tiles", "Marble", "Granite", "Wood / Timber", "Paint", "Plumbing Materials",
  "Electrical Materials", "Pipes & Fittings", "Doors", "Windows", "Glass",
  "Roofing Materials", "Insulation Materials", "Waterproofing Materials",
  "Gypsum / Plaster", "Ceiling Materials", "Sanitary Fittings",
  "Bathroom Accessories", "Kitchen Accessories", "Hardware & Fasteners",
  "Adhesives & Grout", "Construction Chemicals", "Pavers",
  "Precast Concrete Products", "Formwork Materials", "Reinforcement Accessories",
  "Door Locks & Handles", "Lighting Fixtures", "Switches & Sockets",
  "Decorative Wall Panels",
];

const locations = [
  "Gujranwala", "Satellite Town", "Model Town", "Peoples Colony",
  "Civil Lines", "DC Colony", "Garden Town", "Wapda Town", "Citi Housing",
  "Rahwali", "Ghakhar Mandi", "Eminabad", "Qila Didar Singh", "Aroop",
  "Nowshera Road", "GT Road", "Sialkot Road", "Sheikhupura Road",
  "Hafizabad Road", "Kangniwala", "Gondlanwala Road",
];

const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"];
const qualities = ["New", "Reused"];
const availabilities = ["In Stock", "Out of Stock"];

// ---------- Shared Tailwind classes ----------

const titleClass = "mb-2 block text-sm font-semibold text-[var(--primary-text)]";
const boxClass =
  "w-full rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[var(--primary-text)]";
const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-yellow)]";

// ---------- Component ----------

export default function MaterialFilter() {
  const [selected, setSelected] = useState({
    category: "Cement",
    location: locations[0],
    sort: sortOptions[0],
  });
  const [openName, setOpenName] = useState(""); // which dropdown is open
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checked, setChecked] = useState({ New: true, "In Stock": true });

  const handleOpen = (name) => setOpenName(openName === name ? "" : name);

  const handleSelect = (name, value) => {
    setSelected({ ...selected, [name]: value });
    setOpenName("");
  };

  const handleCheck = (name) => setChecked({ ...checked, [name]: !checked[name] });

  const handleClear = () => {
    setSelected({ category: "Cement", location: locations[0], sort: sortOptions[0] });
    setOpenName("");
    setMinPrice("");
    setMaxPrice("");
    setChecked({});
  };

  // One dropdown (used for Categories, Location and Sort By).
  const renderDropdown = (name, title, options) => (
    <div className="mt-5">
      <span className={titleClass}>{title}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => handleOpen(name)}
          className={`flex items-center justify-between text-left ${boxClass} ${focusClass}`}
        >
          {selected[name]}
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition ${openName === name ? "rotate-180" : ""}`}
          />
        </button>

        {openName === name && (
          <>
            {/* invisible layer: clicking anywhere outside closes the list */}
            <div className="fixed inset-0 z-10" onClick={() => setOpenName("")} />
            <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] p-1 shadow-lg [scrollbar-width:thin]">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(name, option)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${focusClass} ${
                    selected[name] === option
                      ? "bg-[var(--charcoal-black)] font-semibold text-[var(--white-cards)]"
                      : "hover:bg-[var(--off-white-background)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // One checkbox group (used for Quality and Availability).
  const renderChecks = (title, options) => (
    <div className="mt-5">
      <span className={titleClass}>{title}</span>
      <div className="flex flex-col gap-2.5">
        {options.map((name) => (
          <label key={name} className="flex cursor-pointer items-center gap-3 text-sm text-[var(--secondary-text)]">
            <input
              type="checkbox"
              checked={!!checked[name]}
              onChange={() => handleCheck(name)}
              className="peer sr-only"
            />
            <span
              className={`flex h-5 w-5 items-center justify-center rounded border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--primary-yellow)] ${
                checked[name]
                  ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)]"
                  : "border-[var(--border-color)] bg-[var(--white-cards)]"
              }`}
            >
              {checked[name] && <Check className="h-3.5 w-3.5 text-[var(--charcoal-black)]" strokeWidth={3} />}
            </span>
            {name}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside
      aria-label="Material filters"
      className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--white-cards)] p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-[var(--primary-text)]">Filters</p>
        <button
          type="button"
          onClick={handleClear}
          className={`rounded text-sm text-[var(--secondary-text)] underline transition hover:text-[var(--primary-text)] ${focusClass}`}
        >
          Clear All
        </button>
      </div>

      {renderDropdown("category", "Categories", categories)}
      {renderDropdown("location", "Location", locations)}

      {/* Price range */}
      <div className="mt-5">
        <span className={titleClass}>Price Range</span>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-[var(--secondary-text)]">
            Min Price (Rs.)
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="e.g. 1000"
              className={`mt-1 ${boxClass} ${focusClass}`}
            />
          </label>
          <label className="text-xs text-[var(--secondary-text)]">
            Max Price (Rs.)
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 2000"
              className={`mt-1 ${boxClass} ${focusClass}`}
            />
          </label>
        </div>
      </div>

      {renderDropdown("sort", "Sort By", sortOptions)}
      {renderChecks("Quality", qualities)}
      {renderChecks("Availability", availabilities)}
    </aside>
  );
}