import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const tones = {
  green: "bg-green-50 text-green-700 ring-green-200",
  red: "bg-red-50 text-red-600 ring-red-200",
};

const orderHeadings = ["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"];

export default function CustomerDetail({ customer, onBack }) {
  const info = [
    { label: "Name", value: customer.name },
    { label: "Email", value: customer.email },
    { label: "Phone", value: customer.phone },
    { label: "City", value: customer.city },
    { label: "Registered", value: customer.registered },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Naam + Back */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
          {customer.name}
        </h1>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
        >
          <ArrowLeft size={16} />
          Back to Customers
        </button>
      </div>

      {/* Status */}
      <span
        className={`mt-4 inline-block rounded-full px-2.5 py-1 text-xs ring-1 ${
          customer.active ? tones.green : tones.red
        }`}
      >
        {customer.active ? "Active" : "Inactive"}
      </span>

      {/* Info */}
      <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
        {info.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-[color:var(--secondary-text)]">{item.label}</p>
            <p className="mt-1 text-sm text-[color:var(--primary-text)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Orders</h2>

      <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {orderHeadings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customer.orders.map((o) => (
                <tr key={o.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.id}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{customer.name}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.material}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.date}</td>
                  <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.amount}</td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones[o.payTone]}`}>{o.pay}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones[o.statusTone]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{customer.orders.length} records</span>
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