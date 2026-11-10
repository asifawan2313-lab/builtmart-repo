// Aik chhota stat card (jaise "Total Customers  5").
// Dashboard mein bhi use hoga, aur Users, Orders waghera ke pages par bhi.
//
// title     = card ka naam
// value     = bara number
// icon      = lucide-react ka icon (component), jaise Users
// highlight = true ho to icon ka dabba peela hota hai (jin par dhyan dena ho)
export default function BmAdminStatCard({ title, value, icon: Icon, highlight = false }) {
  return (
    <article className="bm-adminStatCard-root rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm transition-colors duration-200 hover:border-[color:var(--primary-yellow)] sm:p-5">
      {/* Upar: naam (left) + icon ka dabba (right) */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-[color:var(--primary-text)]">{title}</p>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
            highlight
              ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
              : "bg-[var(--off-white-background)] text-[color:var(--industrial-blue-grey)]"
          }`}
        >
          <Icon size={18} />
        </span>
      </div>

      {/* Neeche: bara number */}
      <p className="mt-3 text-4xl leading-none font-[family-name:Baloo2-Bold] text-[color:var(--primary-text)] sm:mt-4">
        {value}
      </p>
    </article>
  );
}