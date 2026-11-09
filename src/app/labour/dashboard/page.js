import Link from "next/link";
import { ChevronRight } from "lucide-react";

/* ============================================================
   DEMO DATA (sab naam, tareekhen aur amounts sirf UI ke liye hain)
   ============================================================ */

const provider = {
  name: "Demo Provider",
  verification: "Pending Verification",
};

const stats = [
  { id: 1, label: "Total Requests", value: 24 },
  { id: 2, label: "New Requests", value: 5 },
  { id: 3, label: "Submitted Bids", value: 14 },
  { id: 4, label: "Accepted Bids", value: 4 },
  { id: 5, label: "Active Bookings", value: 2 },
  { id: 6, label: "Completed Jobs", value: 9 },
  { id: 7, label: "Pending Actions", value: 3 },
];

const recentRequests = [
  { id: 1, code: "REQ-1001", title: "Bathroom pipe fitting", area: "Demo Area A", budget: "Rs. 6,000", date: "05 Nov 2026" },
  { id: 2, code: "REQ-1002", title: "Kitchen leakage repair", area: "Demo Area B", budget: "Rs. 3,500", date: "04 Nov 2026" },
  { id: 3, code: "REQ-1003", title: "Water tank line setup", area: "Demo Area C", budget: "Rs. 8,000", date: "03 Nov 2026" },
];

const recentBids = [
  { id: 1, code: "BID-501", job: "Bathroom pipe fitting", price: "Rs. 5,500", status: "Submitted" },
  { id: 2, code: "BID-498", job: "Kitchen leakage repair", price: "Rs. 3,000", status: "Counteroffer Received" },
  { id: 3, code: "BID-490", job: "Geyser line fitting", price: "Rs. 4,200", status: "Accepted" },
];

const upcomingBookings = [
  { id: 1, code: "BKG-301", job: "Geyser line fitting", date: "07 Nov 2026", status: "Scheduled" },
  { id: 2, code: "BKG-298", job: "Sink replacement", date: "09 Nov 2026", status: "Confirmed" },
];

const notifications = [
  { id: 1, text: "New job request matches your skills.", time: "10 min ago", unread: true },
  { id: 2, text: "Customer sent a counteroffer on BID-498.", time: "2 hours ago", unread: true },
  { id: 3, text: "Booking BKG-301 confirmed.", time: "Yesterday", unread: false },
];

// Status ke rang
const statusClass = {
  Submitted: "bg-blue-50 text-blue-700",
  "Counteroffer Received": "bg-[#FDC716]/25 text-[#202124]",
  Accepted: "bg-green-50 text-green-700",
  Scheduled: "bg-blue-50 text-blue-700",
  Confirmed: "bg-green-50 text-green-700",
};

const box = "rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm";

/* ============================================================
   PAGE
   ============================================================ */

const LabourDashboardPage = () => (
  <div className="mx-auto max-w-6xl">
    {/* Heading */}
    <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Dashboard</h1>
    <p className="mt-1 text-sm text-[#565553]">Welcome back, {provider.name}</p>

    {/* Verification notice: sirf tab jab provider verified na ho */}
    {provider.verification !== "Verified" && (
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#FDC716] bg-[#FDC716]/15 px-4 py-3 text-sm text-[#202124]">
        <p>
          Verification status: <span className="font-semibold">{provider.verification}</span>
        </p>
        <Link href="/labour/profile" className="inline-flex items-center gap-1 text-xs font-semibold underline">
          Submit documents
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
    )}

    {/* Stat cards */}
    <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {stats.map(({ id, label, value }) => (
        <article key={id} className={box}>
          <p className="text-2xl font-extrabold text-[#292929]">{value}</p>
          <p className="mt-1 text-xs text-[#565553]">{label}</p>
        </article>
      ))}
    </section>

    {/* Lists */}
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      {/* Recent job requests */}
      <section className={box}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#202124]">Recent Job Requests</h2>
          <Link href="/labour/requests" className="text-xs font-semibold text-[#384452] hover:underline">View all</Link>
        </div>
        <ul className="mt-2 divide-y divide-[#D9E3E9]">
          {recentRequests.map(({ id, code, title, area, budget, date }) => (
            <li key={id} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-[#202124]">{title}</p>
                <p className="shrink-0 text-sm font-semibold text-[#384452]">{budget}</p>
              </div>
              <p className="text-xs text-[#565553]">{code} · {area}, Gujranwala · {date}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent bids */}
      <section className={box}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#202124]">Recent Bids</h2>
          <Link href="/labour/bids" className="text-xs font-semibold text-[#384452] hover:underline">View all</Link>
        </div>
        <ul className="mt-2 divide-y divide-[#D9E3E9]">
          {recentBids.map(({ id, code, job, price, status }) => (
            <li key={id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#202124]">{job}</p>
                <p className="text-xs text-[#565553]">{code} · {price}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Upcoming bookings */}
      <section className={box}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#202124]">Upcoming Bookings</h2>
          <Link href="/labour/bookings" className="text-xs font-semibold text-[#384452] hover:underline">View all</Link>
        </div>
        <ul className="mt-2 divide-y divide-[#D9E3E9]">
          {upcomingBookings.map(({ id, code, job, date, status }) => (
            <li key={id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#202124]">{job}</p>
                <p className="text-xs text-[#565553]">{code} · {date}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent notifications */}
      <section className={box}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#202124]">Recent Notifications</h2>
          <Link href="/labour/notifications" className="text-xs font-semibold text-[#384452] hover:underline">View all</Link>
        </div>
        <ul className="mt-2 divide-y divide-[#D9E3E9]">
          {notifications.map(({ id, text, time, unread }) => (
            <li key={id} className="flex items-start gap-3 py-3">
              <span
                aria-label={unread ? "Unread" : "Read"}
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`}
              />
              <div>
                <p className="text-sm text-[#202124]">{text}</p>
                <p className="text-xs text-[#565553]">{time}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>

    <p className="mt-4 text-center text-xs text-[#565553]">Sample data shown for demonstration purposes.</p>
  </div>
);

export default LabourDashboardPage;