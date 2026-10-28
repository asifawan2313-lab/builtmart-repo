"use client";

import { useState } from "react";
import MaterialTabs from "../../../component/materials/MaterialTabs";
import MaterialViewToggle from "../../../component/materials/MaterialViewToggle";
import MaterialFilter from "../../../component/materials/MaterialFilter";
import ProductGrid from "../../../component/materials/ProductGrid";

export default function MaterialsPage() {
  const [view, setView] = useState("list"); // "list" or "grid"

  const handleView = (name) => setView(name);

  return (
    <main className="p-4">
      {/* Row 1: tabs left, view toggle right */}
      <div className="flex items-center justify-between gap-4">
        <MaterialTabs />
        <MaterialViewToggle view={view} onViewChange={handleView} />
      </div>

      {/* Row 2: filter left, products right */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
        <div className="w-full md:w-64 md:shrink-0">
          <MaterialFilter />
        </div>

        <div className="min-w-0 flex-1">
          <ProductGrid view={view} />
        </div>
      </div>
    </main>
  );
}