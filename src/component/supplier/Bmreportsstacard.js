"use client";

// 8 stat cards ki grid. Har card ka data page se aata hai.
export default function BmReportStatCards({ stats }) {
  return (
    <>
      {stats.map((item) => {
        // Icon ko component ki tarah use karne ke liye bara letter chahiye
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`bmReportCards-card flex items-center gap-4 rounded-lg border p-4 shadow-sm sm:p-5 ${item.cardColor}`}
          >
            {/* Icon ka dabba */}
            <span
              className={`bmReportCards-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.iconColor}`}
            >
              <Icon size={22} strokeWidth={1.5} />
            </span>

            {/* Label aur value */}
            <div className="min-w-0">
              <p className={`bmReportCards-label text-[11px] uppercase tracking-wider ${item.textColor}`}>
                {item.label}
              </p>
              <p className={`bmReportCards-value font-[family-name:Baloo2-Bold] text-2xl sm:text-3xl ${item.textColor}`}>
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}