import Link from "next/link";
import {
  ShieldCheck,
  Package,
  CircleCheck,
  PackageX,
  Wallet,
  ShoppingCart,
  Clock,
  CircleHelp,
  Image as ImageIcon,
} from "lucide-react";

export const metadata = { title: "Dashboard | BuildMart Supplier" };

// 1) Simple datasets
const bmStats = [
  { id: 1, label: "Total Materials", value: "5", icon: Package, style: "dark" },
  { id: 2, label: "Active Materials", value: "4", icon: CircleCheck, style: "light" },
  { id: 3, label: "Out of Stock", value: "1", icon: PackageX, style: "light" },
  { id: 4, label: "Wallet Balance", value: "Rs. 4,800", icon: Wallet, style: "yellow" },
  { id: 5, label: "Total Orders", value: "5", icon: ShoppingCart, style: "light" },
  { id: 6, label: "Pending Orders", value: "1", icon: Clock, style: "light" },
  { id: 7, label: "Completed Orders", value: "1", icon: CircleCheck, style: "light" },
  { id: 8, label: "New Enquiries / Unread", value: "2 / 3", icon: CircleHelp, style: "light" },
];

const bmOrders = [
  { id: "BM-ORD-1001", customer: "Ali Raza", material: "A-Class Bricks", total: "Rs. 90,000", status: "In Transit" },
  { id: "BM-ORD-1002", customer: "Sana Tariq", material: "DG Cement (OPC)", total: "Rs. 72,500", status: "Pending" },
  { id: "BM-ORD-1003", customer: "Bilal Ahmed", material: "Reused Wooden Doors", total: "Rs. 13,000", status: "Delivered" },
  { id: "BM-ORD-1004", customer: "Hamza Iqbal", material: "A-Class Bricks", total: "Rs. 54,000", status: "Confirmed" },
  { id: "BM-ORD-1005", customer: "Fatima Noor", material: "Ravi Sand (Rait)", total: "Rs. 22,500", status: "Failed / Returned" },
];

const bmReused = [
  { id: 1, name: "Purane Ghar ki Eent (2,000 pcs)", owner: "Tahir Mehmood · Sialkot", price: "Rs. 9 / brick" },
  { id: 2, name: "Leftover Porcelain Tiles", owner: "Nadia Shah · Gujranwala", price: "Rs. 120 / sq ft" },
  { id: 3, name: "Extra Cement Bags", owner: "Farhan Ali · Lahore", price: "Rs. 1,100 / bag" },
  { id: 4, name: "Iron Grills & Railings", owner: "Zainab Akhtar · Gujranwala", price: "Rs. 4,000 / piece" },
];

const bmAccount = [
  { id: 1, label: "Wallet Balance", value: "Rs. 4,800" },
  { id: 2, label: "Platform fees paid", value: "Rs. 200" },
  { id: 3, label: "Pending top-ups", value: "Rs. 2,000" },
];

const bmOrderHeadings = ["Order ID", "Customer", "Material", "Total", "Status"];

// 2) Style objects (if/else ki jagah)
const bmCardStyles = {
  dark: { card: "bg-[var(--charcoal-black)] text-[color:var(--white-cards)]", icon: "bg-white/10 text-[color:var(--white-cards)]" },
  yellow: { card: "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]", icon: "bg-white/40 text-[color:var(--charcoal-black)]" },
  light: { card: "bg-[var(--white-cards)] text-[color:var(--primary-text)] border border-[color:var(--border-color)]", icon: "bg-[var(--off-white-background)] text-[color:var(--primary-text)]" },
};

const bmStatusColors = {
  "In Transit": "bg-blue-50 text-blue-600 ring-blue-200",
  Pending: "bg-orange-50 text-orange-600 ring-orange-200",
  Delivered: "bg-green-50 text-green-700 ring-green-200",
  Confirmed: "bg-sky-50 text-sky-600 ring-sky-200",
  "Failed / Returned": "bg-red-50 text-red-600 ring-red-200",
};

const bmCard = "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5";

export default function SupplierDashboardPage() {
  return (
    <section className="bm-supplierDashboard-page p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <div className="bm-supplierDashboard-header">
        <h1 className="text-3xl leading-tight font-[family-name:Baloo2-Bold] text-[color:var(--primary-text)] sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
          Al-Madina Building Materials ka business summary
        </p>
      </div>

      {/* Verification banner */}
      <div className="bm-supplierDashboard-verifyBanner mt-5 flex flex-col gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-[color:var(--primary-text)]" />
          <div className="text-sm text-[color:var(--primary-text)]">
            <p className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Supplier Verification Status:</span>
              <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs text-orange-600 ring-1 ring-orange-200">
                Pending Verification
              </span>
            </p>
            <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
              Admin aapke documents review kar raha hai. Verified status sirf Admin control karta hai.
            </p>
          </div>
        </div>
        <Link
          href="/supplier/profile"
          className="shrink-0 self-start rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)] sm:self-auto"
        >
          View Details
        </Link>
      </div>

      {/* Stat cards */}
      <div className="bm-supplierDashboard-stats mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {bmStats.map((s) => {
          const Icon = s.icon;
          const style = bmCardStyles[s.style];
          return (
            <div key={s.id} className={`bm-supplierDashboard-statCard flex items-center gap-4 rounded-xl p-4 shadow-sm ${style.card}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${style.icon}`}>
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] uppercase opacity-80">{s.label}</p>
                <p className="text-xl font-semibold sm:text-2xl">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent orders + Reused materials */}
      <div className="bm-supplierDashboard-lists mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Recent Orders */}
        <div className={`bm-supplierDashboard-ordersCard xl:col-span-2 ${bmCard}`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-[color:var(--primary-text)]">Recent Orders</h2>
            <Link href="/supplier/orders" className="text-xs text-[color:var(--primary-text)] hover:underline">
              View all
            </Link>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
                <tr>
                  {bmOrderHeadings.map((h) => (
                    <th key={h} className="px-3 py-2.5 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bmOrders.map((o) => (
                  <tr key={o.id} className="border-t border-[color:var(--border-color)] text-xs text-[color:var(--primary-text)]">
                    <td className="px-3 py-3">{o.id}</td>
                    <td className="px-3 py-3">{o.customer}</td>
                    <td className="px-3 py-3">{o.material}</td>
                    <td className="px-3 py-3">{o.total}</td>
                    <td className="px-3 py-3">
                      <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] ring-1 ${bmStatusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Reused Materials */}
        <div className={`bm-supplierDashboard-reusedCard ${bmCard}`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-[color:var(--primary-text)]">Customer Reused Materials</h2>
            <Link href="/supplier/reused-materials" className="text-xs text-[color:var(--primary-text)] hover:underline">
              View all
            </Link>
          </div>

          <ul className="mt-3 flex flex-col gap-3">
            {bmReused.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <span className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
                  <ImageIcon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[color:var(--primary-text)]">{m.name}</p>
                  <p className="truncate text-[11px] text-[color:var(--secondary-text)]">{m.owner}</p>
                  <p className="text-[11px] text-[color:var(--primary-text)]">{m.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Account Summary */}
      <div className={`bm-supplierDashboard-accountCard mt-5 ${bmCard}`}>
        <h2 className="text-base font-semibold text-[color:var(--primary-text)]">Account Summary</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {bmAccount.map((a) => (
            <div key={a.id}>
              <p className="text-xs text-[color:var(--secondary-text)]">{a.label}</p>
              <p className="mt-1 text-lg font-semibold text-[color:var(--primary-text)]">{a.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}