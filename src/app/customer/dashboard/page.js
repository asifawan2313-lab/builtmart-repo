// import Image from "next/image";
// import Link from "next/link";
// import {
//   Activity,
//   ArrowRight,
//   Bell,
//   Calculator,
//   ChevronRight,
//   Clock,
//   CloudUpload,
//   Heart,
//   MessageSquare,
//   Package,
//   Recycle,
//   ShoppingBag,
//   ShoppingCart,
// } from "lucide-react";
// import BmCustomerStatCard from "../../../component/customer/BmCustomerStatCard/BmCustomerStatCard";

// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import bricks from "../../../assets/images/guest/card/briks.jpg";
// import sand from "../../../assets/images/guest/card/sand.jpg";

// /* ============================================================
//    DEMO DATA (sab numbers, naam aur amounts sirf UI ke liye hain)
//    ============================================================ */

// const stats = [
//   { id: 1, label: "Total Orders", value: 12, icon: ShoppingBag },
//   { id: 2, label: "Active Orders", value: 3, icon: Clock },
//   { id: 3, label: "Cart Items", value: 5, icon: ShoppingCart },
//   { id: 4, label: "Favourite Items", value: 8, icon: Heart },
//   { id: 5, label: "My Reused Listings", value: 4, icon: Recycle },
//   { id: 6, label: "Buyer Inquiries", value: 2, icon: MessageSquare },
// ];

// // href null = page abhi bana nahi (button banta hai, 404 nahi aata)
// const shortcuts = [
//   { id: 1, label: "Browse materials", href: "/materials", icon: Package },
//   { id: 2, label: "Estimate costs", href: null, icon: Calculator },
//   { id: 3, label: "Contact a supplier", href: "/suppliers", icon: MessageSquare },
//   { id: 4, label: "Sell used materials", href: null, icon: Recycle },
// ];

// const orders = [
//   { id: 1, code: "BM-1001", item: "Steel Saria Grade 60", date: "Nov 2, 2026", status: "Delivered", amount: "Rs. 67,500", image: steelSaria },
//   { id: 2, code: "BM-1002", item: "Red Clay Bricks (A-Class)", date: "Oct 30, 2026", status: "Processing", amount: "Rs. 40,000", image: bricks },
//   { id: 3, code: "BM-1003", item: "Ravi Sand (Rait)", date: "Oct 27, 2026", status: "Shipped", amount: "Rs. 18,000", image: sand },
// ];

// // Sirf supplier ke replies
// const notifications = [
//   { id: 1, supplier: "Al-Noor Building Store", detail: "Cement price and stock confirmed", time: "2 hours ago", unread: true },
//   { id: 2, supplier: "City Material Traders", detail: "Delivery available within Gujranwala", time: "Yesterday", unread: true },
//   { id: 3, supplier: "Zahid Construction Materials", detail: "Steel rates shared", time: "2 days ago", unread: false },
// ];

// const activities = [
//   { id: 1, text: "Added 2 items to cart", time: "2 hours ago", icon: ShoppingCart },
// ];

// const statusClass = {
//   Delivered: "bg-green-50 text-green-700",
//   Processing: "bg-blue-50 text-blue-700",
//   Shipped: "bg-[#FDC716]/25 text-[#202124]",
// };

// const panel = "overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm";
// const viewAll = "flex items-center gap-1 pr-4 text-xs font-semibold text-[#E5B20F] sm:text-sm";

// /* ============================================================
//    PAGE
//    ============================================================ */

// const CustomerDashboardPage = () => (
//   <main className="p-4 sm:p-6 lg:p-8">
//     {/* Heading + Upload button */}
//     <div className="flex flex-wrap items-center justify-between gap-3">
//       <div>
//         <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Dashboard</h1>
//         <p className="mt-1 text-xs text-[#45484D]">Sample dashboard data shown for demonstration purposes.</p>
//       </div>

//       <Link
//   href="/customer/used-materials"
//   className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292929]"
// >
//   <CloudUpload size={18} aria-hidden="true" />
//   Upload Reused Material
// </Link>
//     </div>

//     {/* Stat cards */}
//     <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//       {stats.map((stat) => (
//         <BmCustomerStatCard key={stat.id} {...stat} />
//       ))}
//     </section>

//     {/* Shortcuts */}
//     <section aria-label="Shortcuts" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//       {shortcuts.map(({ id, label, href, icon: ShortcutIcon }) => {
//         const className =
//           "flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-[#202124] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#45484D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]";
//         const content = (
//           <>
//             <span className="flex items-center gap-3">
//               <ShortcutIcon size={18} aria-hidden="true" />
//               {label}
//             </span>
//             <ArrowRight size={16} aria-hidden="true" />
//           </>
//         );

//         return href ? (
//           <Link key={id} href={href} className={className}>
//             {content}
//           </Link>
//         ) : (
//           <button key={id} type="button" className={className}>
//             {content}
//           </button>
//         );
//       })}
//     </section>

//     {/* Recent orders + notifications */}
//     <div className="mt-6 grid gap-4 xl:grid-cols-2">
//       {/* Recent Orders */}
//       <section className={panel}>
//         <div className="flex items-center justify-between border-b border-[#E2E4E7]">
//           <h2 className="flex items-center gap-3 text-base font-bold text-[#202124] sm:text-lg">
//             <span className="flex h-12 w-12 items-center justify-center rounded-br-xl bg-[#FDC716] text-[#202124]">
//               <Package size={22} aria-hidden="true" />
//             </span>
//             Recent Orders
//           </h2>
//           <span className={viewAll}>
//             View All <ArrowRight size={14} aria-hidden="true" />
//           </span>
//         </div>

//         <ul className="divide-y divide-[#E2E4E7]">
//           {orders.map(({ id, code, item, date, status, amount, image }) => (
//             <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap">
//               <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md bg-[#E2E4E7]">
//                 <Image src={image} alt={`${item} (demo image)`} fill sizes="56px" className="object-cover" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="truncate text-sm font-semibold text-[#202124]">Order #{code}</p>
//                 <p className="truncate text-xs text-[#45484D]">
//                   {item} · {date}
//                 </p>
//               </div>
//               <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
//               <p className="w-24 text-right text-sm font-bold text-[#202124]">{amount}</p>
//               <ChevronRight size={16} className="hidden shrink-0 text-[#A7ADB4] sm:block" aria-hidden="true" />
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Recent Notifications: supplier ke replies */}
//       <section className={panel}>
//         <div className="flex items-center justify-between border-b border-[#E2E4E7]">
//           <h2 className="flex items-center gap-3 text-base font-bold text-[#202124] sm:text-lg">
//             <span className="flex h-12 w-12 items-center justify-center rounded-br-xl bg-[#FDC716] text-[#202124]">
//               <Bell size={22} aria-hidden="true" />
//             </span>
//             Recent Notifications
//           </h2>
//           <span className={viewAll}>
//             View All <ArrowRight size={14} aria-hidden="true" />
//           </span>
//         </div>

//         <ul className="divide-y divide-[#E2E4E7]">
//           {notifications.map(({ id, supplier, detail, time, unread }) => (
//             <li key={id} className="flex items-start gap-3 px-4 py-3">
//               <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
//                 <MessageSquare size={18} aria-hidden="true" />
//               </span>
//               <div className="min-w-0 flex-1">
//                 <p className="text-sm font-semibold text-[#202124]">{supplier} replied to your inquiry</p>
//                 <p className="text-xs text-[#45484D]">{detail}</p>
//                 <p className="mt-0.5 text-xs text-[#A7ADB4]">{time}</p>
//               </div>
//               {unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FDC716]" aria-label="Unread" />}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>

//     {/* Recent Activity */}
//     <section className={`${panel} mt-4`}>
//       <div className="flex items-center justify-between border-b border-[#E2E4E7]">
//         <h2 className="flex items-center gap-3 text-base font-bold text-[#202124] sm:text-lg">
//           <span className="flex h-12 w-12 items-center justify-center rounded-br-xl bg-[#FDC716] text-[#202124]">
//             <Activity size={22} aria-hidden="true" />
//           </span>
//           Recent Activity
//         </h2>
//         <span className={viewAll}>
//           View All <ArrowRight size={14} aria-hidden="true" />
//         </span>
//       </div>

//       <ul className="divide-y divide-[#E2E4E7]">
//         {activities.map(({ id, text, time, icon: ActivityIcon }) => (
//           <li key={id} className="flex items-center gap-3 px-4 py-3">
//             <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
//               <ActivityIcon size={18} aria-hidden="true" />
//             </span>
//             <div className="min-w-0 flex-1">
//               <p className="text-sm font-semibold text-[#202124]">{text}</p>
//               <p className="text-xs text-[#A7ADB4]">{time}</p>
//             </div>
//             <span className="h-2 w-2 shrink-0 rounded-full bg-[#FDC716]" aria-hidden="true" />
//           </li>
//         ))}
//       </ul>
//     </section>
//   </main>
// );

// export default CustomerDashboardPage;






import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bell,
  Calculator,
  ChevronRight,
  Clock,
  CloudUpload,
  Heart,
  MessageSquare,
  Package,
  Recycle,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import BmCustomerStatCard from "../../../component/customer/BmCustomerStatCard/BmCustomerStatCard";

import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
import bricks from "../../../assets/images/guest/card/briks.jpg";
import sand from "../../../assets/images/guest/card/sand.jpg";

/* ============================================================
   DEMO DATA (sab numbers, naam aur amounts sirf UI ke liye hain)
   ============================================================ */

// href na ho to card sirf dikhta hai (cart page abhi bana nahi)
const stats = [
  { id: 1, label: "Total Orders", value: 12, icon: ShoppingBag, href: "/customer/orders" },
  { id: 2, label: "Active Orders", value: 3, icon: Clock, href: "/customer/orders" },
  { id: 3, label: "Cart Items", value: 5, icon: ShoppingCart },
  { id: 4, label: "Favourite Items", value: 8, icon: Heart, href: "/customer/favourites" },
  { id: 5, label: "My Reused Listings", value: 4, icon: Recycle, href: "/customer/used-materials" },
  { id: 6, label: "Buyer Inquiries", value: 2, icon: MessageSquare, href: "/customer/inquiries" },
];

// href null = page abhi bana nahi (button banta hai, 404 nahi aata)
const shortcuts = [
  { id: 1, label: "Browse materials", href: "/materials", icon: Package },
  { id: 2, label: "Estimate costs", href: null, icon: Calculator },
  { id: 3, label: "Contact a supplier", href: "/suppliers", icon: MessageSquare },
  { id: 4, label: "Sell used materials", href: "/customer/used-materials", icon: Recycle },
];

const orders = [
  { id: 1, code: "BM-1001", item: "Steel Saria Grade 60", date: "Nov 2, 2026", status: "Delivered", amount: "Rs. 67,500", image: steelSaria },
  { id: 2, code: "BM-1002", item: "Red Clay Bricks (A-Class)", date: "Oct 30, 2026", status: "Processing", amount: "Rs. 40,000", image: bricks },
  { id: 3, code: "BM-1003", item: "Ravi Sand (Rait)", date: "Oct 27, 2026", status: "Shipped", amount: "Rs. 18,000", image: sand },
];

// Sirf supplier ke replies
const notifications = [
  { id: 1, supplier: "Al-Noor Building Store", detail: "Cement price and stock confirmed", time: "2 hours ago", unread: true },
  { id: 2, supplier: "City Material Traders", detail: "Delivery available within Gujranwala", time: "Yesterday", unread: true },
  { id: 3, supplier: "Zahid Construction Materials", detail: "Steel rates shared", time: "2 days ago", unread: false },
];

// const activities = [
//   { id: 1, text: "Added 2 items to cart", time: "2 hours ago", icon: ShoppingCart },
// ];

const statusClass = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-[#FDC716]/25 text-[#202124]",
};

const panel = "overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm";
const viewAll = "flex items-center gap-1 pr-4 text-xs font-semibold text-[#E5B20F] sm:text-sm";
const rowLink = "transition-colors hover:bg-[#F4F4F2]";

/* ============================================================
   PAGE
   ============================================================ */

const CustomerDashboardPage = () => (
  <main className="p-4 sm:p-6 lg:p-8">
    {/* Heading + Upload button */}
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-xs text-[#45484D]">Sample dashboard data shown for demonstration purposes.</p>
      </div>

      <Link
        href="/customer/used-materials"
        className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292929]"
      >
        <CloudUpload size={18} aria-hidden="true" />
        Upload Reused Material
      </Link>
    </div>

    {/* Stat cards */}
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <BmCustomerStatCard key={stat.id} {...stat} />
      ))}
    </section>

    {/* Shortcuts */}
    <section aria-label="Shortcuts" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {shortcuts.map(({ id, label, href, icon: ShortcutIcon }) => {
        const className =
          "flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-[#202124] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#45484D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]";
        const content = (
          <>
            <span className="flex items-center gap-3">
              <ShortcutIcon size={18} aria-hidden="true" />
              {label}
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </>
        );

        return href ? (
          <Link key={id} href={href} className={className}>
            {content}
          </Link>
        ) : (
          <button key={id} type="button" className={className}>
            {content}
          </button>
        );
      })}
    </section>

    {/* Recent orders + notifications */}
    <div className="mt-6 grid gap-4 xl:grid-cols-2">
      {/* Recent Orders */}
      <section className={panel}>
        <div className="flex items-center justify-between border-b border-[#E2E4E7]">
          <h2 className="flex items-center gap-3 text-base font-bold text-[#202124] sm:text-lg">
            <span className="flex h-12 w-12 items-center justify-center rounded-br-xl bg-[#FDC716] text-[#202124]">
              <Package size={22} aria-hidden="true" />
            </span>
            Recent Orders
          </h2>
          <Link href="/customer/orders" className={viewAll}>
            View All <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <ul className="divide-y divide-[#E2E4E7]">
          {orders.map(({ id, code, item, date, status, amount, image }) => (
            <li key={id}>
              <Link href={`/customer/orders/${code}`} className={`flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap ${rowLink}`}>
                <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md bg-[#E2E4E7]">
                  <Image src={image} alt={`${item} (demo image)`} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#202124]">Order #{code}</p>
                  <p className="truncate text-xs text-[#45484D]">
                    {item} · {date}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
                <p className="w-24 text-right text-sm font-bold text-[#202124]">{amount}</p>
                <ChevronRight size={16} className="hidden shrink-0 text-[#A7ADB4] sm:block" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Notifications: supplier ke replies */}
      <section className={panel}>
        <div className="flex items-center justify-between border-b border-[#E2E4E7]">
          <h2 className="flex items-center gap-3 text-base font-bold text-[#202124] sm:text-lg">
            <span className="flex h-12 w-12 items-center justify-center rounded-br-xl bg-[#FDC716] text-[#202124]">
              <Bell size={22} aria-hidden="true" />
            </span>
            Recent Notifications
          </h2>
          <Link href="/customer/notifications" className={viewAll}>
            View All <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <ul className="divide-y divide-[#E2E4E7]">
          {notifications.map(({ id, supplier, detail, time, unread }) => (
            <li key={id}>
              <Link href="/customer/inquiries" className={`flex items-start gap-3 px-4 py-3 ${rowLink}`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MessageSquare size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#202124]">{supplier} replied to your inquiry</p>
                  <p className="text-xs text-[#45484D]">{detail}</p>
                  <p className="mt-0.5 text-xs text-[#A7ADB4]">{time}</p>
                </div>
                {unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FDC716]" aria-label="Unread" />}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>

    {/* Recent Activity */}
    {/* <section className={`${panel} mt-4`}>
      <div className="flex items-center justify-between border-b border-[#E2E4E7]">
        <h2 className="flex items-center gap-3 text-base font-bold text-[#202124] sm:text-lg">
          <span className="flex h-12 w-12 items-center justify-center rounded-br-xl bg-[#FDC716] text-[#202124]">
            <Activity size={22} aria-hidden="true" />
          </span>
          Recent Activity
        </h2>
        <span className={viewAll}>
          View All <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>

      <ul className="divide-y divide-[#E2E4E7]">
        {activities.map(({ id, text, time, icon: ActivityIcon }) => (
          <li key={id} className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
              <ActivityIcon size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#202124]">{text}</p>
              <p className="text-xs text-[#A7ADB4]">{time}</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#FDC716]" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section> */}
  </main>
);

export default CustomerDashboardPage;