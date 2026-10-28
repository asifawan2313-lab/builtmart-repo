import Link from "next/link";

// Orders (simple list, shown directly)
const orders = [
  { id: "BM-ORD-1001", customer: "Ali Raza", material: "A-Class Bricks", total: "Rs. 90,000", status: "In Transit" },
  { id: "BM-ORD-1002", customer: "Sana Tariq", material: "DG Cement (OPC)", total: "Rs. 72,500", status: "Pending" },
  { id: "BM-ORD-1003", customer: "Bilal Ahmed", material: "Reused Wooden Doors", total: "Rs. 13,000", status: "Delivered" },
  { id: "BM-ORD-1004", customer: "Hamza Iqbal", material: "A-Class Bricks", total: "Rs. 54,000", status: "Confirmed" },
  { id: "BM-ORD-1005", customer: "Fatima Noor", material: "Ravi Sand (Rait)", total: "Rs. 22,500", status: "Failed / Returned" },
];

// Colour of each status
const statusStyles = {
  "In Transit": "bg-sky-100 text-sky-700",
  Pending: "bg-orange-100 text-orange-600",
  Delivered: "bg-green-100 text-green-700",
  Confirmed: "bg-blue-100 text-blue-700",
  "Failed / Returned": "bg-red-100 text-red-600",
};

const columns = ["Order ID", "Customer", "Material", "Total", "Status"];

export default function RecentOrders() {
  return (
    <section className="w-full rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-[#202124] sm:text-xl">Recent Orders</h2>
        {/* Opens the My Orders screen (to be built next) */}
        <Link
          href="/supplierpanel/Orders"
          className="text-sm font-medium text-[#202124] transition-colors hover:text-[#b07d00] hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Table (scrolls sideways on small screens) */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[540px] whitespace-nowrap text-left text-xs">
          <thead>
            <tr className="bg-neutral-100 text-[11px] uppercase tracking-wide text-[#5B6B78]">
              {columns.map((column) => (
                <th key={column} className="px-2.5 py-2.5 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100 text-[#202124]">
            {orders.map(({ id, customer, material, total, status }) => (
              <tr key={id} className="transition-colors hover:bg-neutral-50">
                <td className="px-2.5 py-3 font-semibold">{id}</td>
                <td className="px-2.5 py-3">{customer}</td>
                <td className="px-2.5 py-3">{material}</td>
                <td className="px-2.5 py-3">{total}</td>
                <td className="px-2.5 py-3">
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-medium ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}