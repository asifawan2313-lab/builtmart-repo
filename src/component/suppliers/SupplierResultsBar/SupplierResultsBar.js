// Demo views (badalna ho to sirf yahan badlein)
const views = [
  { name: "Grid", icon: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /> },
  { name: "List", icon: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /> },
];

// Chhota icon helper: andar sirf SVG shape dalni hoti hai
function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      {children}
    </svg>
  );
}

// start, end, total abhi demo numbers hain
export default function SupplierResultsBar({ start = 1, end = 12, total = 48 }) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      {/* Entrance animation */}
      <style>{`
        @keyframes bmResultsIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Results count */}
      <p className="animate-[bmResultsIn_0.5s_ease-out_both] text-sm text-[#45484D] motion-reduce:animate-none">
        Showing {start}–{end} of {total} suppliers
      </p>

      {/* Grid / List toggle (radio + CSS: bina JavaScript ke chalta hai) */}
      <div
        role="radiogroup"
        aria-label="View mode"
        style={{ animationDelay: "100ms" }}
        className="flex animate-[bmResultsIn_0.5s_ease-out_both] gap-1 rounded-xl bg-[#F4F4F2] p-1 motion-reduce:animate-none"
      >
        {views.map(({ name, icon }, i) => (
          <label key={name} className="cursor-pointer">
            <input type="radio" name="supplier-view" defaultChecked={i === 0} className="peer sr-only" />
            <span className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#45484D] transition-all duration-300 ease-out hover:-translate-y-0.5 peer-checked:bg-[#202124] peer-checked:text-white peer-checked:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-[#A7ADB4]">
              <Icon>{icon}</Icon>
              {name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}