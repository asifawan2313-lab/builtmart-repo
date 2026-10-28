
"use client";

import { useState } from "react";
import Link from "next/link";
import BmMaterialCard from "../../../component/guest/cards/Bmmaterialscards.js";

// Sample materials data
const newMaterials = [
  {
    id: 1,
    image: "/materials/red-clay-bricks.jpg",
    category: "Bricks",
    name: "Red Clay Bricks (A-Class)",
    price: 16500,
    unit: "per 1,000 bricks",
    supplier: "Al-Noor Building Store",
    location: "Lahore",
    status: "In stock",
  },
  {
    id: 2,
    image: "/materials/portland-cement.jpg",
    category: "Cement",
    name: "Ordinary Portland Cement",
    price: 1450,
    unit: "per 50kg bag",
    supplier: "Pak Cement Traders",
    location: "Rawalpindi",
    status: "In stock",
  },
  {
    id: 3,
    image: "/materials/ravi-sand.jpg",
    category: "Sand",
    name: "Ravi Sand (Rait)",
    price: 9000,
    unit: "per trolley",
    supplier: "City Sand & Bajri",
    location: "Lahore",
    status: "Limited stock",
  },
  {
    id: 4,
    image: "/materials/steel-saria.jpg",
    category: "Steel",
    name: "Steel Saria Grade 60",
    price: 265,
    unit: "per kg",
    supplier: "Ittefaq Steel Point",
    location: "Faisalabad",
    status: "In stock",
  },
];

export default function BmNewMaterials() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const text = searchQuery.trim().toLowerCase();

  const results = newMaterials.filter((m) =>
    `${m.name} ${m.category} ${m.supplier} ${m.location}`
      .toLowerCase()
      .includes(text)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <section className="px-4 md:px-12 py-12">
      {/* Section Heading */}
      <h2 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl 2xl:text-5xl text-center">
            New Material Hubs
          </h2>
       
      

      {/* Search Bar and Search Button */}
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto mb-10 flex items-center gap-2"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bricks, cement, steel, Lahore..."
          aria-label="Search new materials"
          className="flex-1 min-w-0 h-12 border border-[#E2E4E7] bg-white rounded-lg px-4 text-[#202124] placeholder:text-[#A7ADB4] focus:outline-none focus:border-[#45484D] focus:ring-1 focus:ring-[#45484D]"
        />

        <button
          type="submit"
          className="h-12 px-6 bg-[#FFC107] text-[#202124] font-semibold rounded-lg hover:bg-[#E5AC00] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Materials Cards */}
      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item) => (
            <BmMaterialCard
              key={item.id}
              material={item}
              badge="NEW"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#45484D] py-6">
          No materials match &quot;{searchQuery}&quot;.
        </p>
      )}

      {/* Explore Materials Button */}
      <div className="text-center mt-12">
       

        <Link
          href="/materials"
          className="inline-block bg-[#202124] text-white font-semibold rounded-lg px-8 py-3 hover:bg-[#45484D] transition-colors"
        >
          Explore New Materials →
        </Link>
      </div>
    </section>
  );
}
