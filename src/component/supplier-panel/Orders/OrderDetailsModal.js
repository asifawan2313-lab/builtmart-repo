import ModalShell from "./ModalShell";

export default function OrderDetailsModal({ order, onClose, onOpenChat }) {
  const { id, customer, phone, material, quantity, unitPrice, total, payment, paid, method, address, status, rider, date } = order;

  // Details in two columns: [label, value]
  const fields = [
    ["Order ID", id],
    ["Customer", `${customer} · ${phone}`],
    ["Materials / Quantity", `${material} · ${quantity}`],
    ["Unit Price", unitPrice],
    ["Material Subtotal", total],
    ["Order Total", total],
    ["Payment", `${payment} · ${paid ? "Paid" : "Unpaid"}`],
    ["Method", method],
    ["Address", address],
    ["Status", status],
  ];

  return (
    <ModalShell title={`Order Details — ${id}`} onClose={onClose}>
      {/* Details */}
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-[#5B6B78]">{label}</p>
            <p className="text-sm font-semibold text-[#202124]">{value}</p>
          </div>
        ))}

        <div className="sm:col-span-2">
          <p className="text-xs text-[#5B6B78]">Rider</p>
          <p className="text-sm font-semibold text-[#202124]">{rider}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-5 border-t border-neutral-200 pt-4">
        <h3 className="text-sm font-bold text-[#202124]">Order Timeline</h3>
        <div className="mt-3 border-l-2 border-[#ffc61a] pl-3">
          <p className="text-sm text-[#202124]">Order created — {status}</p>
          <p className="text-xs text-[#5B6B78]">{date}</p>
        </div>
      </div>

      {/* Opens the chat popup */}
      <button
        type="button"
        onClick={onOpenChat}
        className="mt-5 rounded-md bg-[#ffc61a] px-4 py-2.5 text-sm font-semibold text-[#202124] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
      >
        Open Order Chat
      </button>
    </ModalShell>
  );
}