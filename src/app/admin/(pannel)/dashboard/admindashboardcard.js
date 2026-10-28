"use client";

// Sample data hai (screenshot jaisa). Asli data aane par replace karein.
// tone: badge ka rang (green, blue, orange, red, gray)
const cards = [
  {
    title: "Recent Orders",
    action: "View all",
    boldTitle: true,
    rows: [
      { title: "ORD-1001", sub: "Ahmed Raza", amount: "Rs 67,500", badges: [{ text: "Delivered", tone: "green" }] },
      { title: "ORD-1002", sub: "Sana Malik", amount: "Rs 80,000", badges: [{ text: "In Transit", tone: "blue" }] },
      { title: "ORD-1003", sub: "Bilal Khan", amount: "Rs 106,000", badges: [{ text: "Ready for Dispatch", tone: "blue" }] },
      { title: "ORD-1004", sub: "Usman Tariq", amount: "Rs 28,000", badges: [{ text: "Pending", tone: "orange" }] },
      { title: "ORD-1005", sub: "Ahmed Raza", amount: "Rs 13,200", badges: [{ text: "Returned", tone: "red" }] },
    ],
  },
  {
    title: "New Supplier Registrations",
    action: "Review",
    boldTitle: true,
    rows: [
      { title: "PaintPro", sub: "Lahore", badges: [{ text: "Pending", tone: "orange" }] },
      { title: "Tile City", sub: "Islamabad", badges: [{ text: "Pending", tone: "orange" }] },
      { title: "Zahid Iron Works", sub: "Gujranwala", badges: [{ text: "Rejected", tone: "red" }] },
      { title: "Brick House", sub: "Karachi", badges: [{ text: "Verified", tone: "green" }] },
      { title: "Sheikh Traders", sub: "Lahore", badges: [{ text: "Verified", tone: "green" }] },
    ],
  },
  {
    title: "Recently Added Materials",
    rows: [
      { title: "Weather Shield Paint 16L", badges: [{ text: "New", tone: "blue" }, { text: "Approved", tone: "green" }] },
      { title: "Salvaged Iron Window Grills", badges: [{ text: "Reused", tone: "gray" }, { text: "Approved", tone: "green" }] },
      { title: "Used Gypsum Ceiling Boards", badges: [{ text: "Reused", tone: "gray" }, { text: "Inactive", tone: "red" }] },
      { title: "Leftover Porcelain Tiles", badges: [{ text: "Reused", tone: "gray" }, { text: "Approved", tone: "green" }] },
      { title: "Used Wooden Doors (set of 4)", badges: [{ text: "Reused", tone: "gray" }, { text: "Approved", tone: "green" }] },
    ],
  },
  {
    title: "Pending Approvals",
    rows: [
      { title: "Supplier: Tile City", button: "Review" },
      { title: "Supplier: PaintPro", button: "Review" },
      { title: "Top-up: Sheikh Traders · Rs 10,000", button: "Review" },
      { title: "Top-up: Brick House · Rs 5,000", button: "Review" },
    ],
  },
  {
    title: "Latest Disputes",
    boldTitle: true,
    rows: [
      { title: "TKT-301", sub: "Quality issue", badges: [{ text: "Resolved", tone: "green" }] },
      { title: "TKT-302", sub: "COD refused", badges: [{ text: "Open", tone: "orange" }] },
      { title: "TKT-303", sub: "Paid but not delivered", badges: [{ text: "Under Review", tone: "orange" }] },
    ],
  },
  {
    title: "Recent Transactions",
    rows: [
      { title: "Payment", sub: "Ahmed Raza", amount: "Rs 67,500", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Payment", sub: "Bilal Khan", amount: "Rs 106,000", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Payment", sub: "Ahmed Raza", amount: "Rs 13,200", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Refund", sub: "Ahmed Raza", amount: "Rs 13,200", badges: [{ text: "Completed", tone: "green" }] },
      { title: "Payment", sub: "Bilal Khan", amount: "Rs 32,000", badges: [{ text: "Completed", tone: "green" }] },
    ],
  },
];

// Badge ke rang (status ke liye aam rang: hara, neela, narangi, laal, grey)
const tones = {
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function AdminDashboardCards() {
  // Simple handler: abhi sirf console mein likhta hai
  const handleAction = (label) => {
    console.log(label + " clicked");
  };

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[var(--white-cards)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm"
        >
          {/* Card ka title + (optional) action button */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-text)]">
              {card.title}
            </h3>
            {card.action && (
              <button
                type="button"
                onClick={() => handleAction(card.action)}
                className="text-xs text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:underline"
              >
                {card.action}
              </button>
            )}
          </div>

          {/* Rows */}
          <div>
            {card.rows.map((row, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm text-[var(--primary-text)] border-b border-[var(--border-color)] last:border-b-0"
              >
                <p className="min-w-0">
                  <span className={card.boldTitle ? "font-semibold" : ""}>{row.title}</span>
                  {row.sub && <span> · {row.sub}</span>}
                </p>

                <div className="flex items-center gap-3">
                  {row.amount && <span>{row.amount}</span>}

                  {row.badges &&
                    row.badges.map((b) => (
                      <span
                        key={b.text}
                        className={`text-xs px-2.5 py-0.5 rounded-full border ${tones[b.tone]}`}
                      >
                        {b.text}
                      </span>
                    ))}

                  {row.button && (
                    <button
                      type="button"
                      onClick={() => handleAction(row.button)}
                      className="text-xs text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:underline"
                    >
                      {row.button}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}