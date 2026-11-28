"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BmSupplierNotificationPageheader from "../../../component/supplier/pageheader/BmSupplierNotificationPageheader.js";
import BmSupplierOrderDataRow from "../../../component/supplier/order/BmSupplierOrderDataRow.js";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_ORDER_FILTERS = ["All", "Pending", "Confirmed", "In Transit", "Delivered", "Failed / Returned"];

const BM_ORDERS = [
  {
    id: "BM-ORD-1001", customer: "Ali Raza", phone: "0321-5556677",
    material: "A-Class Bricks", qty: 5000, unit: "brick", unitPrice: 18,
    paymentMethod: "Cash on Delivery", paymentStatus: "Unpaid", status: "In Transit",
    address: "House 12, Satellite Town, Gujranwala",
    rider: "Imran Khan · 0345-1112233 · Mazda Truck LEB-4521 · On the Way",
    timeline: [{ label: "Order created — In Transit", date: "2026-10-15" }],
    messages: [
      { from: "customer", text: "Assalam o Alaikum, mera order kab tak pohanch jayega?", time: "Oct 17, 10:12 AM" },
      { from: "supplier", text: "Walaikum Salam! Rider nikal chuka hai, 1 ghante mein pohanch jayega.", time: "Oct 17, 10:20 AM" },
      { from: "customer", text: "Theek hai. Gate ke andar unload ho sakega?", time: "Oct 17, 10:31 AM" },
    ],
  },
  {
    id: "BM-ORD-1002", customer: "Sana Tariq", phone: "0333-1002003",
    material: "DG Cement (OPC)", qty: 50, unit: "bag", unitPrice: 1450,
    paymentMethod: "Bank Transfer", paymentStatus: "Paid", status: "Pending",
    address: "Street 4, Model Town, Gujranwala",
    rider: "",
    timeline: [{ label: "Order created — Pending", date: "2026-10-17" }],
    messages: [
      { from: "customer", text: "Order confirm kab tak hoga?", time: "Oct 17, 09:00 AM" },
    ],
  },
  {
    id: "BM-ORD-1003", customer: "Bilal Ahmed", phone: "0345-7001122",
    material: "Reused Wooden Doors", qty: 2, unit: "door", unitPrice: 6500,
    paymentMethod: "Cash on Delivery", paymentStatus: "Paid", status: "Delivered",
    address: "Peoples Colony, Gujranwala",
    rider: "Asif Nawaz · 0300-9876543 · Suzuki Pickup SKT-1188 · Delivered",
    timeline: [
      { label: "Order created — Pending", date: "2026-10-10" },
      { label: "Delivered", date: "2026-10-13" },
    ],
    messages: [
      { from: "supplier", text: "Aap ka order deliver ho gaya hai, shukriya.", time: "Oct 13, 04:00 PM" },
    ],
  },
  {
    id: "BM-ORD-1004", customer: "Hamza Iqbal", phone: "0300-4004004",
    material: "A-Class Bricks", qty: 3000, unit: "brick", unitPrice: 18,
    paymentMethod: "JazzCash", paymentStatus: "Paid", status: "Confirmed",
    address: "Gulshan Colony, Gujranwala",
    rider: "",
    timeline: [
      { label: "Order created — Pending", date: "2026-10-18" },
      { label: "Confirmed", date: "2026-10-18" },
    ],
    messages: [
      { from: "supplier", text: "Aap ka order confirm ho gaya hai.", time: "Oct 18, 11:00 AM" },
    ],
  },
  {
    id: "BM-ORD-1005", customer: "Fatima Noor", phone: "0322-5005005",
    material: "Ravi Sand (Rait)", qty: 500, unit: "cft", unitPrice: 45,
    paymentMethod: "Cash on Delivery", paymentStatus: "Unpaid", status: "Failed / Returned",
    address: "Wapda Town, Gujranwala",
    rider: "Bilal Delivery · 0345-4433221 · Rickshaw LHR-7731 · Returned",
    timeline: [
      { label: "Order created — Pending", date: "2026-10-12" },
      { label: "Failed / Returned", date: "2026-10-14" },
    ],
    messages: [
      { from: "customer", text: "Mujhe ye order ab nahi chahiye.", time: "Oct 14, 12:30 PM" },
    ],
  },
  {
    id: "BM-ORD-1006", customer: "Zara Sheikh", phone: "0301-6006006",
    material: "DG Cement (OPC)", qty: 30, unit: "bag", unitPrice: 1450,
    paymentMethod: "Easypaisa", paymentStatus: "Paid", status: "Pending",
    address: "Citi Housing, Gujranwala",
    rider: "",
    timeline: [{ label: "Order created — Pending", date: "2026-10-19" }],
    messages: [
      { from: "customer", text: "Kya kal tak delivery ho sakti hai?", time: "Oct 19, 02:15 PM" },
    ],
  },
];

const th = "px-4 py-3 font-medium";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [filter, setFilter] = useState("All");

  const visibleOrders = BM_ORDERS.reduce(
    (all, order) =>
      filter === "All" || order.status === filter ? [...all, order] : all,
    []
  );

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmSupplierNotificationPageheader
        title="Orders"
        description="Customer orders"
      />

      {/* ORDER STATUS FILTER */}
      <div className="mb-4">
        <label
          htmlFor="bm-order-status"
          className="block text-sm font-semibold text-[color:var(--primary-text)]"
        >
          Order Status
        </label>
        <select
          id="bm-order-status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-2 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none sm:w-80"
        >
          {BM_ORDER_FILTERS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE CARD */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                <th className={th}>Order ID</th>
                <th className={th}>Customer</th>
                <th className={th}>Material / Quantity</th>
                <th className={th}>Unit Price</th>
                <th className={th}>Total</th>
                <th className={th}>Payment</th>
                <th className={th}>Status</th>
                <th className={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleOrders.map((order) => (
                <BmSupplierOrderDataRow key={order.id} order={order} />
              ))}

              {visibleOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleOrders.length} {visibleOrders.length === 1 ? "record" : "records"}
          </span>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronLeft size={14} />
            </button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;