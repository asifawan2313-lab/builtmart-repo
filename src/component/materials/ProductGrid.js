"use client";

import products from "../../assests/data/products";
import ProductCard from "./ProductCard";

// view = "list" or "grid". Every product in the dataset is shown with .map()
export default function ProductGrid({ view = "list" }) {
  return (
    <section aria-label="Products">
      <p className="mb-3 text-sm text-[var(--secondary-text)]">
        {products.length} products
      </p>

      <div
        className={
          view === "list"
            ? "flex flex-col gap-4"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} view={view} />
        ))}
      </div>
    </section>
  );
}