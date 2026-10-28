
"use client";

import { useState } from "react";
import Link from "next/link";
import BmMaterialCard from "../../../component/guest/cards/Bmmaterialscards.js";

// Sample reused materials data
const reusedMaterials = [
  {
    id: 1,
    image: "/materials/reused-bricks.jpg",
    category: "Bricks",
    name: "Leftover Red Bricks",
    price: 9000,
    unit: "per 1,000 bricks",
    supplier: "Sample Seller 1",
    location: "Gujranwala",
    status: "Good condition",
  },
  {
    id: 2,
    image: "/materials/reused-tiles.jpg",
    category: "Tiles",
    name: "Floor Tiles (2x2 ft)",
    price: 120,
    unit: "per sq ft",
    supplier: "Sample Seller 2",
    location: "Gujranwala",
    status: "Like new",
  },
  {
    id: 3,
    image: "/materials/reused-steel.jpg",
    category: "Steel",
    name: "Used Steel Rods",
    price: 180,
    unit: "per kg",
    supplier: "Sample Seller 3",
    location: "Wazirabad",
    status: "Good condition",
  },
  {
    id: 4,
    image: "/materials/reused-wood.jpg",
    category: "Wood",
    name: "Door Frames (Deodar)",
    price: 6500,
    unit: "per piece",
    supplier: "Sample Seller 4",
    location: "Gujranwala",
    status: "Used",
  },
];

export default function BmReusedMaterials() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const text = searchQuery.trim().toLowerCase();

  const results = reusedMaterials.filter((m) =>
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
            Reuse Material Hubs
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
          placeholder="Search bricks, tiles, steel, Gujranwala..."
          aria-label="Search reused materials"
          className="flex-1 min-w-0 h-12 border border-[#E2E4E7] bg-white rounded-lg px-4 text-[#202124] placeholder:text-[#A7ADB4] focus:outline-none focus:border-[#45484D] focus:ring-1 focus:ring-[#45484D]"
        />

        <button
          type="submit"
          className="h-12 px-6 bg-[#FFC107] text-[#202124] font-semibold rounded-lg hover:bg-[#E5AC00] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Reused Materials Cards */}
      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item) => (
            <BmMaterialCard
              key={item.id}
              material={item}
              badge="REUSED"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#45484D] py-6">
          No materials match &quot;{searchQuery}&quot;.
        </p>
      )}

      {/* Explore Reused Materials Button */}
      <div className="text-center mt-12">
       

        <Link
          href="/reused-materials"
          className="inline-block bg-[#202124] text-white font-semibold rounded-lg px-8 py-3 hover:bg-[#45484D] transition-colors"
        >
          Explore Reused Materials →
        </Link>
      </div>
    </section>
  );
}
