
import OrdersTable from "../../../component/supplier-panel/Orders/OrdersTable";

export default function SupplierOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-[#202124]">
        Orders Management
      </h1>

      <OrdersTable />
    </div>
  );
}
