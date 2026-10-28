
import SupplierCard, { Icon } from "./SupplierCard";
import { suppliers } from "./suppliersData";

{/*import SupplierCard, { Icon } from "./SupplierCard";
import { suppliers } from "./suppliersData";*/}

const pages = [1, 2, 3, 4]; // demo pagination
const pageBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]";

export default function SupplierGrid() {
  return (
    <section className="mt-5">
      {/* Animations: card entrance + logo gradient blobs */}
      <style>{`
        @keyframes bmCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bmBlobA {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(22px, 22px) scale(1.3); }
        }
        @keyframes bmBlobB {
          from { transform: translate(0, 0) scale(1.2); }
          to   { transform: translate(-22px, -20px) scale(0.9); }
        }
      `}</style>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {suppliers.map((supplier, i) => (
          <SupplierCard key={supplier.id} supplier={supplier} index={i} />
        ))}
      </div>

      {/* Demo note + pagination */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-[#45484D]">
          <Icon className="h-4 w-4 shrink-0 text-[#A7ADB4]">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v4h1" />
          </Icon>
          All supplier information is for demo purposes only. Verification status and reviews are sample data.
        </p>

        <nav aria-label="Pagination" className="flex gap-2">
          <button type="button" aria-label="Previous page" className={`${pageBtn} border-[#E2E4E7] bg-white text-[#45484D]`}>
            <Icon><path d="m15 6-6 6 6 6" /></Icon>
          </button>
          {pages.map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === 1 ? "page" : undefined}
              className={`${pageBtn} ${n === 1 ? "border-[#202124] bg-[#202124] text-white" : "border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#F4F4F2]"}`}
            >
              {n}
            </button>
          ))}
          <button type="button" aria-label="Next page" className={`${pageBtn} border-[#E2E4E7] bg-white text-[#45484D]`}>
            <Icon><path d="m9 6 6 6-6 6" /></Icon>
          </button>
        </nav>
      </div>
    </section>
  );
}