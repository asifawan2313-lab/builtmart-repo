"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CHIP = {
  green: "border-green-400 bg-green-50 text-green-700",
  blue: "border-blue-300 bg-blue-50 text-blue-600",
  orange: "border-orange-300 bg-orange-50 text-orange-500",
  red: "border-red-300 bg-red-50 text-red-500",
};

const STATUS_COLOR = {
  Paid: "green",
  Pending: "orange",
  Refunded: "red",
  Delivered: "green",
  "In Transit": "blue",
  "Ready for Dispatch": "blue",
  Processing: "orange",
  Returned: "red",
  Cancelled: "red",
};

const COMMISSION_RATE = 0.05;

const formatRs = (amount) => `Rs ${amount.toLocaleString("en-US")}`;

const Chip = ({ label }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${CHIP[STATUS_COLOR[label]]}`}
  >
    {label}
  </span>
);

const BmAdminOrderDataRow = ({ order }) => {
  const [viewOpen, setViewOpen] = useState(false);

  const commission = order.amount * COMMISSION_RATE;
  const payable = order.amount - commission;

  const summary = [
    ["Order amount", formatRs(order.amount)],
    [`Commission (${COMMISSION_RATE * 100}%)`, formatRs(commission)],
    ["Supplier payable", formatRs(payable)],
  ];

  const details = [
    ["Customer", `${order.customer} · ${order.customerPhone}`],
    ["Supplier", `${order.supplier} · ${order.supplierPhone}`],
    ["Address", order.address],
    ["Material", order.material],
  ];

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3 font-semibold">{order.id}</td>
      <td className="px-4 py-3">{order.customer}</td>
      <td className="px-4 py-3">{order.supplier}</td>
      <td className="px-4 py-3">{formatRs(order.amount)}</td>
      <td className="px-4 py-3">
        <p className="text-xs">{order.paymentMethod}</p>
        <Chip label={order.paymentStatus} />
      </td>
      <td className="px-4 py-3">
        <Chip label={order.status} />
      </td>
      <td className="px-4 py-3">{order.date}</td>

      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => setViewOpen(true)}
          className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
        >
          View
        </button>

        {/* VIEW MODAL */}
        {viewOpen && (
          <div
            onClick={() => setViewOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                    {order.id}
                  </h2>
                  <Chip label={order.status} />
                </div>

                <button
                  type="button"
                  onClick={() => setViewOpen(false)}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="space-y-2 text-sm text-[color:var(--primary-text)]">
                    {details.map(([label, value]) => (
                      <p key={label}>
                        <span className="font-semibold">{label}:</span> {value}
                      </p>
                    ))}

                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">Delivery:</span>
                      <Chip label={order.deliveryStatus} />
                      {order.rider && <span>by {order.rider}</span>}
                    </p>
                  </div>

                  <div className="mt-4 rounded-lg bg-[var(--off-white-background)] p-3 text-xs text-[color:var(--primary-text)]">
                    {summary.map(([label, value]) => (
                      <div key={label} className="flex justify-between py-1">
                        <span>{label}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}

                    <div className="flex items-center justify-between py-1">
                      <span>{order.paymentMethod} payment</span>
                      <Chip label={order.paymentStatus} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold text-[color:var(--primary-text)]">
                    Timeline
                  </p>

                  <div className="space-y-3 border-l-2 border-[var(--primary-yellow)] pl-4">
                    {order.timeline.map((step) => (
                      <div key={step.label}>
                        <p className="text-sm text-[color:var(--primary-text)]">
                          {step.label}
                        </p>
                        <p className="text-xs text-[color:var(--secondary-text)]">
                          {step.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewOpen(false)}
                  className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmAdminOrderDataRow;