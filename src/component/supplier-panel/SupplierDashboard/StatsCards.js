import Link from "next/link";

// DEMO DATA: sirf UI ke liye, baad mein asal data se badlein
const stats = [
  { label: "Total Materials", value: "5" },
  { label: "Active Materials", value: "4" },
  { label: "Out of Stock", value: "1" },
  { label: "Wallet Balance", value: "Rs. 4,800" },
  { label: "Total Orders", value: "5", href: "/supplierpanel/Orders" },
  { label: "Pending Orders", value: "1" },
  { label: "Completed Orders", value: "1" },
  { label: "New Enquiries / Unread", value: "2 / 3" },
];

export default function StatsCards() {
  return (
    <section
      aria-label="Business summary"
      className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4 sm:gap-4"
    >
      {stats.map(({ label, value, href }) => {
        // Cards with an href are links (whole card clickable), the others stay plain
        const Card = href ? Link : "div";

        return (
          <Card
            key={label}
            {...(href ? { href } : {})}
            className="rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#45484D]">{label}</p>
            <p className="mt-1 text-2xl font-extrabold text-[#202124] sm:text-3xl">{value}</p>
          </Card>
        );
      })}
    </section>
  );
}