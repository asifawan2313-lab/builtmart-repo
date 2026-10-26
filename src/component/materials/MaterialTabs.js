"use client";

import { useState } from "react";

// Simple dataset: each tab is mapped directly below.
const tabs = ["All Products", "All Shops"];

export default function MaterialTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTab = (name) => setActiveTab(name);

  return (
    <div
      role="tablist"
      className="grid w-full grid-cols-2 overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--white-cards)] sm:inline-grid sm:w-auto"
    >
      {tabs.map((name) => (
        <button
          key={name}
          type="button"
          role="tab"
          aria-selected={activeTab === name}
          onClick={() => handleTab(name)}
          className={`h-9 px-4 text-sm font-semibold leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--charcoal-black)] sm:w-44 sm:px-0 ${
            activeTab === name
              ? "bg-[var(--primary-yellow)] text-[var(--charcoal-black)]"
              : "text-[var(--primary-text)] hover:bg-[var(--off-white-background)]"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}