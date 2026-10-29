"use client";

import { useState } from "react";

export default function SupplierShopContent({ supplier }) {
  const [activeTab, setActiveTab] = useState("Products"); // Products, About Shop, Reviews, Contact
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");

  // Is shop ki categories (sidebar mein dikhengi)
  const categories = ["All", ...supplier.tags];

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-10">
      {/* Step 7: <SupplierShopTabs activeTab={activeTab} onChange={setActiveTab} /> */}

      {activeTab === "Products" && (
        <div>
          {/* Step 8: Toolbar (search, sort) | Step 9: Category sidebar | Step 11: Product grid */}
          <p className="text-sm text-[#565553]">
            Products yahan aayenge. Search: "{search}" | Category: {category} | Sort: {sort} | Categories: {categories.length}
          </p>
        </div>
      )}

      {/* Step 12: Contact (Shop info) */}
      {activeTab === "Contact" && <p className="text-sm text-[#565553]">Contact yahan aayega.</p>}

      {/* Step 13: Reviews */}
      {activeTab === "Reviews" && <p className="text-sm text-[#565553]">Reviews yahan aayenge.</p>}

      {/* Step 14: About Shop */}
      {activeTab === "About Shop" && <p className="text-sm text-[#565553]">About yahan aayega.</p>}
    </section>
  );
}