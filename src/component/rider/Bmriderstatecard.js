"use client";

// Upar ke 4 stat cards. Data page se props mein aata hai.
export default function BmRiderStatCards({ stats }) {
  return (
    <>
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="bmRiderStats-card min-w-0 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5"
          >
            <Icon size={20} strokeWidth={1.5} className="text-[color:var(--secondary-text)]" />
            <p className="bmRiderStats-value mt-4 break-words text-2xl text-[color:var(--primary-text)] sm:text-3xl">
              {item.value}
            </p>
            <p className="bmRiderStats-label mt-1 text-xs text-[color:var(--secondary-text)]">
              {item.label}
            </p>
          </div>
        );
      })}
    </>
  );
}