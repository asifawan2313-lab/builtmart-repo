// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronRight, Search } from "lucide-react";
// import { orders } from "./orderData";

// /* ============================================================
//    DEMO DATA (sab naam, tareekhen aur amounts sirf UI ke liye hain)
//    ============================================================ */

// // Har tab apna test rakhta hai: order is tab mein aaye ya nahi
// const tabs = [
//   { id: "all", label: "All", test: () => true },
//   { id: "active", label: "Active", test: (order) => order.status !== "Delivered" },
//   { id: "delivered", label: "Delivered", test: (order) => order.status === "Delivered" },
// ];

// const statusClass = {
//   Delivered: "bg-green-50 text-green-700",
//   Processing: "bg-blue-50 text-blue-700",
//   Shipped: "bg-[#FDC716]/25 text-[#202124]",
// };

// /* ============================================================
//    PAGE
//    ============================================================ */

// const CustomerOrdersPage = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [query, setQuery] = useState("");

//   const currentTab = tabs.find((tab) => tab.id === activeTab);
//   const text = query.trim().toLowerCase();
//   const visibleOrders = orders.filter(
//     (order) =>
//       currentTab.test(order) &&
//       (!text || `${order.code} ${order.item} ${order.supplier}`.toLowerCase().includes(text))
//   );

//   return (
//     <main className="p-4 sm:p-6 lg:p-8">
//       {/* Heading + search */}
//       <div className="flex flex-wrap items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Orders</h1>
//           <p className="mt-1 text-xs text-[#45484D]">Track your orders, delivery riders and supplier details.</p>
//         </div>

//         <div className="relative w-full sm:w-72">
//           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
//           <input
//             type="search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             aria-label="Search orders"
//             placeholder="Search order or material"
//             className="h-10 w-full rounded-lg border border-[#D9E3E9] bg-white pl-9 pr-3 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
//           />
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Order status">
//         {tabs.map(({ id, label, test }) => {
//           const isActive = id === activeTab;
//           return (
//             <button
//               key={id}
//               type="button"
//               role="tab"
//               aria-selected={isActive}
//               onClick={() => setActiveTab(id)}
//               className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
//                 isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
//               }`}
//             >
//               {label}
//               <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>
//                 {orders.filter(test).length}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Orders list */}
//       <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
//         {visibleOrders.length === 0 ? (
//           <p className="px-4 py-10 text-center text-sm text-[#45484D]">No orders found.</p>
//         ) : (
//           <ul className="divide-y divide-[#E2E4E7]">
//             {visibleOrders.map(({ id, code, item, supplier, date, status, amount, image }) => (
//               <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4">
//                 <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-[#E2E4E7]">
//                   <Image src={image} alt={`${item} (demo image)`} fill sizes="64px" className="object-cover" />
//                 </div>

//                 <div className="min-w-0 flex-1 basis-40">
//                   <p className="truncate text-sm font-semibold text-[#202124]">Order #{code}</p>
//                   <p className="truncate text-xs text-[#45484D]">{item}</p>
//                   <p className="truncate text-xs text-[#45484D]">
//                     {supplier} · {date}
//                   </p>
//                 </div>

//                 <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
//                 <p className="w-24 text-right text-sm font-bold text-[#202124]">{amount}</p>

//                 {/* View Details: order detail page /customer/orders/[code] par jata hai */}
//                 <Link
//                   href={`/customer/orders/${code}`}
//                   className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-[#D9E3E9] bg-white px-4 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
//                 >
//                   View Details
//                   <ChevronRight size={14} aria-hidden="true" />
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <p className="mt-4 text-center text-xs text-[#45484D]">Sample orders shown for demonstration purposes.</p>
//     </main>
//   );
// };

// export default CustomerOrdersPage;






"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { orders } from "./orderData";

/* ============================================================
   DATA
   ============================================================ */

// Har tab apna test rakhta hai: order is tab mein aaye ya nahi
const tabs = [
  { id: "all", label: "All", test: () => true },
  { id: "active", label: "Active", test: (order) => ["Processing", "Shipped"].includes(order.status) },
  { id: "delivered", label: "Delivered", test: (order) => order.status === "Delivered" },
  { id: "rejected", label: "Rejected", test: (order) => order.status === "Rejected" },
];

const statusClass = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-[#FDC716]/25 text-[#202124]",
  Rejected: "bg-red-50 text-red-700",
};

/* ============================================================
   PAGE
   ============================================================ */

const CustomerOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

  const currentTab = tabs.find((tab) => tab.id === activeTab);
  const text = query.trim().toLowerCase();
  const visibleOrders = orders.filter(
    (order) =>
      currentTab.test(order) &&
      (!text || `${order.code} ${order.item} ${order.supplier}`.toLowerCase().includes(text))
  );

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* Heading + search */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Orders</h1>
          <p className="mt-1 text-xs text-[#45484D]">Track your orders, delivery riders and supplier details.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search orders"
            placeholder="Search order or material"
            className="h-10 w-full rounded-lg border border-[#D9E3E9] bg-white pl-9 pr-3 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Order status">
        {tabs.map(({ id, label, test }) => {
          const isActive = id === activeTab;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
              className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
              }`}
            >
              {label}
              <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>
                {orders.filter(test).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders list */}
      <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
        {visibleOrders.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#45484D]">No orders found.</p>
        ) : (
          <ul className="divide-y divide-[#E2E4E7]">
            {visibleOrders.map(({ id, code, item, supplier, date, status, amount, image }) => (
              <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4">
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-[#E2E4E7]">
                  <Image src={image} alt={`${item} (demo image)`} fill sizes="64px" className="object-cover" />
                </div>

                <div className="min-w-0 flex-1 basis-40">
                  <p className="truncate text-sm font-semibold text-[#202124]">Order #{code}</p>
                  <p className="truncate text-xs text-[#45484D]">{item}</p>
                  <p className="truncate text-xs text-[#45484D]">
                    {supplier} · {date}
                  </p>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
                <p className="w-24 text-right text-sm font-bold text-[#202124]">{amount}</p>

                {/* View Details: order detail page /customer/orders/[code] par jata hai */}
                <Link
                  href={`/customer/orders/${code}`}
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-[#D9E3E9] bg-white px-4 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
                >
                  View Details
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-4 text-center text-xs text-[#45484D]">Sample orders shown for demonstration purposes.</p>
    </main>
  );
};

export default CustomerOrdersPage;