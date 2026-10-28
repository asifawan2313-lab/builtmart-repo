import StatsCards from "../../../component/supplier-panel/SupplierDashboard/StatsCards";
import RecentOrders from "../../../component/supplier-panel/SupplierDashboard/RecentOrders";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#202124] sm:text-3xl">Dashboard</h1>
      </div>

      {/* Stats cards */}
      <StatsCards />

      {/* Recent orders (left) and next card (right) */}
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="min-w-0">
          <RecentOrders />
        </div>

        {/* Customer Reused Materials card will come here */}
        <div className="min-w-0"></div>
      </div>
    </div>
  );
}