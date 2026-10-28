import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const tones = {
  green: "bg-green-50 text-green-700 ring-green-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-600 ring-red-200",
};

const headings = ["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"];

export default function RiderDetail({ rider, onBack }) {
  const info = [
    { label: "Name", value: rider.name },
    { label: "Email", value: rider.email },
    { label: "Phone", value: rider.phone },
    { label: "City", value: rider.city },
    { label: "Registered", value: rider.registered },
    { label: "Vehicle", value: rider.vehicle },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Naam + Back */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">{rider.name}</h1>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
        >
          <ArrowLeft size={16} />
          Back to Riders
        </button>
      </div>

      {/* Status badges */}
      <div className="mt-4 flex gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones.amber}`}>{rider.verification}</span>
        <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${rider.active ? tones.green : tones.red}`}>
          {rider.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Info */}
      <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
        {info.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-[color:var(--secondary-text)]">{item.label}</p>
            <p className="mt-1 text-sm text-[color:var(--primary-text)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Deliveries */}
      <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Assigned Deliveries</h2>
      <div className="mt-3 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rider.deliveries.map((d) => (
                <tr key={d.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{d.id}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{d.customer}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{d.material}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{d.date}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{d.amount}</td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones.green}`}>{d.pay}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones.green}`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{rider.deliveries.length} record(s)</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}