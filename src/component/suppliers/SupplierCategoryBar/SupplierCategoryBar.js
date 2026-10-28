// Demo categories (badalna ho to sirf yahan badlein)
const categories = ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints", "Pipes"];
const sortOptions = ["Recommended", "Highest Rated", "Most Reviews", "Name (A-Z)"];

const chip =
  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7ADB4]";

// Chhota icon helper: andar sirf SVG shape dalni hoti hai
function Icon({ children, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export default function SupplierCategoryBar() {
  return (
    <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Chips entrance animation */}
      <style>{`
        @keyframes bmChipIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Category chips (mobile par sideways scroll) */}
      <div className="flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Active chip */}
        <button type="button" className={`${chip} border-[#202124] bg-[#202124] text-white hover:bg-[#45484D]`}>
          <Icon>
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          </Icon>
          All Categories
        </button>

        {categories.map((name, i) => (
          <button
            key={name}
            type="button"
            style={{ animationDelay: `${(i + 1) * 60}ms` }}
            className={`${chip} animate-[bmChipIn_0.5s_ease-out_both] border-[#E2E4E7] bg-white text-[#45484D] hover:border-[#A7ADB4] hover:bg-[#F4F4F2] motion-reduce:animate-none`}
          >
            <Icon className="h-4 w-4 text-[#A7ADB4]">
              <circle cx="12" cy="12" r="8" />
            </Icon>
            {name}
          </button>
        ))}

        <button type="button" className={`${chip} border-[#E2E4E7] bg-white text-[#45484D] hover:bg-[#F4F4F2]`}>
          <Icon>
            <path d="M12 5v14M5 12h14" />
          </Icon>
          More
        </button>
      </div>

      {/* Sort By */}
      <label className="flex shrink-0 items-center gap-3 text-sm text-[#45484D]">
        Sort By
        <span className="relative">
          <select
            aria-label="Sort suppliers"
            className="h-10 cursor-pointer appearance-none rounded-lg border border-[#E2E4E7] bg-white pl-4 pr-10 text-sm font-medium text-[#202124] outline-none transition-colors duration-300 hover:border-[#A7ADB4] focus-visible:ring-2 focus-visible:ring-[#A7ADB4]"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#45484D]">
            <path d="m6 9 6 6 6-6" />
          </Icon>
        </span>
      </label>
    </div>
  );
}