// Sample data hai (screenshot jaisa). Asli data aane par replace karein.
const notifications = [
  {
    title: "Supplier verification approved",
    message: "Brick House is now verified.",
    meta: "Supplier: S2 · 2026-08-25",
  },
  {
    title: "Platform maintenance",
    message: "Short downtime on Sunday 2am.",
    meta: "All users · 2026-10-15",
  },
];

export default function AdminNotifications() {
  return (
    <section className="bg-[var(--white-cards)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-text)] mb-3">
        Notifications
      </h3>

      <div>
        {notifications.map((n, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 py-3 text-sm border-b border-[var(--border-color)] last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <p className="text-[var(--primary-text)]">
              <span className="font-semibold">{n.title}</span> — {n.message}
            </p>
            <p className="text-xs text-[var(--secondary-text)] shrink-0">{n.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}