"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderChatModal from "./OrderChatModal";

// Orders (simple list, shown directly)
const orders = [
  {
    id: "BM-ORD-1001", customer: "Ali Raza", phone: "0321-5556677",
    material: "A-Class Bricks", quantity: "5,000 brick", unitPrice: "Rs. 18 / brick", total: "Rs. 90,000",
    payment: "Cash on Delivery", paid: false, method: "Delivery", status: "In Transit", canConfirm: false,
    address: "House 12, Satellite Town, Gujranwala",
    rider: "Imran Khan · 0345-1112233 · Mazda Truck LEB-4521 · On the Way", date: "2026-10-15",
  },
  {
    id: "BM-ORD-1002", customer: "Sana Tariq", phone: "0300-1234567",
    material: "DG Cement (OPC)", quantity: "50 bag", unitPrice: "Rs. 1,450 / bag", total: "Rs. 72,500",
    payment: "Bank Transfer", paid: true, method: "Delivery", status: "Pending", canConfirm: true,
    address: "Street 4, Model Town, Gujranwala",
    rider: "Not assigned yet", date: "2026-10-16",
  },
  {
    id: "BM-ORD-1003", customer: "Bilal Ahmed", phone: "0333-9876543",
    material: "Reused Wooden Doors", quantity: "2 door", unitPrice: "Rs. 6,500 / door", total: "Rs. 13,000",
    payment: "Cash on Delivery", paid: true, method: "Delivery", status: "Delivered", canConfirm: false,
    address: "Block B, Citi Housing, Gujranwala",
    rider: "Imran Khan · 0345-1112233 · Mazda Truck LEB-4521 · Delivered", date: "2026-10-12",
  },
  {
    id: "BM-ORD-1004", customer: "Hamza Iqbal", phone: "0312-4455667",
    material: "A-Class Bricks", quantity: "3,000 brick", unitPrice: "Rs. 18 / brick", total: "Rs. 54,000",
    payment: "JazzCash", paid: true, method: "Pickup", status: "Confirmed", canConfirm: false,
    address: "Pickup from supplier shop, Gujranwala",
    rider: "Not assigned yet", date: "2026-10-17",
  },
  {
    id: "BM-ORD-1005", customer: "Fatima Noor", phone: "0345-7788990",
    material: "Ravi Sand (Rait)", quantity: "500 cft", unitPrice: "Rs. 45 / cft", total: "Rs. 22,500",
    payment: "Cash on Delivery", paid: false, method: "Delivery", status: "Failed / Returned", canConfirm: false,
    address: "Peoples Colony, Gujranwala",
    rider: "Ahmed Ali · 0300-1234567 · Suzuki Pickup LEA-1122 · Returned", date: "2026-10-10",
  },
];

const statusOptions = ["All", "Pending", "Confirmed", "In Transit", "Delivered", "Failed / Returned"];
const actionItems = ["View", "Chat", "Confirm", "Cancel"];
const columns = ["Order ID", "Customer", "Material / Quantity", "Unit Price", "Total", "Payment", "Status", "Actions"];

// Colour of each status
const statusStyles = {
  "In Transit": "bg-sky-100 text-sky-700",
  Pending: "bg-orange-100 text-orange-600",
  Delivered: "bg-green-100 text-green-700",
  Confirmed: "bg-blue-100 text-blue-700",
  "Failed / Returned": "bg-red-100 text-red-600",
};

export default function OrdersTable() {
  const [openId, setOpenId] = useState(null); // order whose Actions menu is open
  const [selected, setSelected] = useState(null); // order shown in a popup
  const [view, setView] = useState(null); // "details", "chat" or null

  // View and Chat open a popup, the other actions only close the menu (connect them later)
  const handleAction = (item, order) => {
    setOpenId(null);
    if (item === "View" || item === "Chat") {
      setSelected(order);
      setView(item === "View" ? "details" : "chat");
    }
  };

  return (
    <div className="space-y-5">
      {/* Order status select */}
      <div className="max-w-xs">
        <label htmlFor="order-status" className="mb-2 block text-sm font-semibold text-[#202124]">
          Order Status
        </label>
        <select
          id="order-status"
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-[#202124] outline-none transition focus:border-[#ffc61a] focus:ring-2 focus:ring-[#ffc61a]/40"
        >
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Table (scrolls sideways on small screens) */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] whitespace-nowrap text-left text-xs text-[#202124]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-[11px] uppercase tracking-wide text-[#5B6B78]">
              {columns.map((column) => (
                <th key={column} className="px-3 py-3.5 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {orders.map((order) => {
              const { id, customer, material, quantity, unitPrice, total, payment, paid, status, canConfirm } = order;
              const isOpen = openId === id;

              return (
                <tr key={id} className="align-top transition-colors hover:bg-neutral-50">
                  <td className="px-3 py-4 font-semibold">{id}</td>
                  <td className="px-3 py-4">{customer}</td>
                  <td className="px-3 py-4">
                    <p>{material}</p>
                    <p className="text-xs text-[#5B6B78]">{quantity}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">{unitPrice}</td>
                  <td className="whitespace-nowrap px-3 py-4 font-semibold">{total}</td>

                  {/* Payment */}
                  <td className="px-3 py-4">
                    <p className="text-xs">{payment}</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        paid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {paid ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Actions menu */}
                  <td className="px-3 py-4">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-neutral-100"
                    >
                      Actions
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                      <ul className="mt-2 w-36 overflow-hidden rounded-md border border-neutral-200 bg-white py-1 text-center text-xs shadow-sm">
                        {actionItems.map((item) => (
                          <li key={item}>
                            <button
                              type="button"
                              onClick={() => handleAction(item, order)}
                              disabled={item === "Confirm" && !canConfirm}
                              className="w-full px-3 py-2 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Popups */}
      {view === "details" && (
        <OrderDetailsModal order={selected} onClose={() => setView(null)} onOpenChat={() => setView("chat")} />
      )}
      {view === "chat" && (
        <OrderChatModal order={selected} statusClass={statusStyles[selected.status]} onClose={() => setView(null)} />
      )}
    </div>
  );
}