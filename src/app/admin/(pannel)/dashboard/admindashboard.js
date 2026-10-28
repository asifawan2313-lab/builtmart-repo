import {
  Users,
  Store,
  ShieldAlert,
  Bike,
  HardHat,
  Package,
  Sparkles,
  Recycle,
  Clock,
  Truck,
  MessagesSquare,
  Wallet,
} from "lucide-react";
import BmAdminStatCard from "../../../../component/admin/Bmadminstatcard.js";

// Admin ka naam (baad mein login se aayega)
const BM_ADMIN_NAME = "Super Admin";

// 1) 12 stat cards ka simple data (har item ka unique id).
//    highlight: true = icon ka dabba peela (jin par admin ko dhyan dena hai).
//    Numbers abhi sample hain.
const BM_ADMIN_STATS = [
  { id: 1, title: "Total Customers", value: 5, icon: Users, highlight: false },
  { id: 2, title: "Total Suppliers", value: 5, icon: Store, highlight: false },
  { id: 3, title: "Pending Verifications", value: 2, icon: ShieldAlert, highlight: true },
  { id: 4, title: "Total Riders", value: 3, icon: Bike, highlight: false },
  { id: 5, title: "Total Labour", value: 3, icon: HardHat, highlight: false },
  { id: 6, title: "Total Materials", value: 9, icon: Package, highlight: false },
  { id: 7, title: "New Materials", value: 5, icon: Sparkles, highlight: false },
  { id: 8, title: "Reused Materials", value: 4, icon: Recycle, highlight: false },
  { id: 9, title: "Pending Orders", value: 1, icon: Clock, highlight: true },
  { id: 10, title: "Active Deliveries", value: 1, icon: Truck, highlight: false },
  { id: 11, title: "Open Disputes", value: 2, icon: MessagesSquare, highlight: true },
  { id: 12, title: "Pending Wallet Requests", value: 2, icon: Wallet, highlight: true },
];

export default function BmAdminDashboard() {
  return (
    <section className="bm-adminDashboard-root p-4 sm:p-6 lg:p-8">
      {/* Greeting */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Hello, {BM_ADMIN_NAME}
      </h1>
      <p className="mt-1 text-sm text-[color:var(--secondary-text)] sm:text-base">
        Here&apos;s what&apos;s happening on BuildMart today.
      </p>

      {/* Stat cards: data par seedha map (phone par 1, tablet par 2, laptop par 3, bari screen par 4) */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {BM_ADMIN_STATS.map((item) => (
          <BmAdminStatCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            highlight={item.highlight}
          />
        ))}
      </div>
    </section>
  );
}