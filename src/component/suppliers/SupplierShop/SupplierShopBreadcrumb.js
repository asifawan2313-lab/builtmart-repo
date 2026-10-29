import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function SupplierShopBreadcrumb({ name }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#E2E4E7] bg-white">
      <ol className="flex flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#565553] sm:px-6 sm:text-sm lg:px-10">
        {/* Home (sirf icon) */}
        <li>
          <Link href="/" aria-label="Home" className="flex items-center text-[#202124] transition-colors hover:text-[#E5B20F]">
            <Home size={16} />
          </Link>
        </li>

        <ChevronRight size={14} className="shrink-0 text-[#A7ADB4]" aria-hidden="true" />

        <li>
          <Link href="/supplier" className="transition-colors hover:text-[#E5B20F]">
            Suppliers
          </Link>
        </li>

        <ChevronRight size={14} className="shrink-0 text-[#A7ADB4]" aria-hidden="true" />

        {/* Maujooda shop (link nahi) */}
        <li aria-current="page" className="min-w-0 truncate text-[#202124]">
          {name}
        </li>
      </ol>
    </nav>
  );
}