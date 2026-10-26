"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

// Simple dataset: each view button is mapped directly below.
const views = [
  { name: "grid", label: "Grid view", Icon: LayoutGrid },
  { name: "list", label: "List view", Icon: List },
];

export default function MaterialViewToggle() {
  const [view, setView] = useState("grid");

  const handleView = (name) => setView(name);

  return (
    <div className="flex items-center gap-2">
      {views.map(({ name, label, Icon }) => (
        <button
          key={name}
          type="button"
          aria-label={label}
          aria-pressed={view === name}
          onClick={() => handleView(name)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-black)] ${
            view === name
              ? "bg-[var(--primary-yellow)] text-[var(--charcoal-black)]"
              : "text-[var(--secondary-text)] hover:bg-[var(--off-white-background)]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}