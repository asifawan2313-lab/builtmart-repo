"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";

const CHIP = {
  green: "bg-green-50 text-green-700",
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
};

const STATUS_COLOR = {
  Pending: "orange",
  Confirmed: "blue",
  "In Transit": "blue",
  Delivered: "green",
  "Failed / Returned": "red",
  Paid: "green",
  Unpaid: "orange",
};

const MODAL_TITLE = {
  view: "Order Details",
  confirm: "Confirm Order",
  cancel: "Cancel Order",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const redBtn =
  "rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700";

const formatRs = (amount) => `Rs. ${amount.toLocaleString("en-US")}`;

const Chip = ({ label }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${CHIP[STATUS_COLOR[label]]}`}
  >
    {label}
  </span>
);

const BmSupplierOrderDataRow = ({ order }) => {
  // null | "view" | "confirm" | "cancel"  (teeno ke liye ek hi modal)
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");

  const total = order.qty * order.unitPrice;
  const isPending = order.status === "Pending";
  const canCancel = isPending || order.status === "Confirmed";

  const handleClose = () => {
    setMode(null);
    setMessage("");
    setReason("");
  };

  const handleSend = () => {
    alert(`Message sent on ${order.id}: ${message}`);
    setMessage("");
  };

  const handleConfirmOrder = () => {
    alert(`${order.id} confirmed. Customer notified (demo)`);
    handleClose();
  };

  const handleCancelOrder = () => {
    alert(`${order.id} cancelled. Reason: ${reason}`);
    handleClose();
  };

  const viewFields = [
    ["Order ID", order.id],
    ["Customer", `${order.customer} · ${order.phone}`],
    ["Materials / Quantity", `${order.material} · ${order.qty.toLocaleString("en-US")} ${order.unit}`],
    ["Unit Price", `${formatRs(order.unitPrice)} / ${order.unit}`],
    ["Material Subtotal", formatRs(total)],
    ["Order Total", formatRs(total)],
    ["Payment", `${order.paymentMethod} · ${order.paymentStatus}`],
    ["Method", "Delivery"],
    ["Address", order.address],
    ["Status", order.status],
  ];

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-4 font-semibold">{order.id}</td>
      <td className="px-4 py-4">{order.customer}</td>
      <td className="px-4 py-4">
        <p>{order.material}</p>
        <p className="text-xs text-[color:var(--secondary-text)]">
          {order.qty.toLocaleString("en-US")} {order.unit}
        </p>
      </td>
      <td className="px-4 py-4">
        {formatRs(order.unitPrice)} / {order.unit}
      </td>
      <td className="px-4 py-4 font-semibold">{formatRs(total)}</td>
      <td className="px-4 py-4">
        <p className="text-xs">{order.paymentMethod}</p>
        <Chip label={order.paymentStatus} />
      </td>
      <td className="px-4 py-4">
        <Chip label={order.status} />
      </td>

      <td className="px-4 py-4">
        <button type="button" onClick={() => setMode("view")} className={btn}>
          View
        </button>

        {/* EK HI MODAL — view / confirm / cancel, mode ke hisaab se */}
        {mode && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[92vh] w-full overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6 ${
                mode === "view" ? "max-w-2xl" : "max-w-md"
              }`}
            >
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
                <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                  {MODAL_TITLE[mode]}
                  {mode === "view" && ` — ${order.id}`}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* VIEW BODY */}
              {mode === "view" && (
                <div className="mt-4">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    {viewFields.map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-[color:var(--secondary-text)]">
                          {label}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-[color:var(--primary-text)]">
                          {value}
                        </p>
                      </div>
                    ))}

                    {order.rider && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-[color:var(--secondary-text)]">
                          Rider
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-[color:var(--primary-text)]">
                          {order.rider}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 border-t border-[color:var(--border-color)] pt-4">
                    <p className="mb-3 text-xs font-semibold text-[color:var(--primary-text)]">
                      Order Timeline
                    </p>

                    <div className="space-y-3 border-l-2 border-[var(--primary-yellow)] pl-3">
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
              )}

              {/* VIEW BODY — chat + buttons */}
              {mode === "view" && (
                <div className="mt-5 border-t border-[color:var(--border-color)] pt-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[color:var(--primary-text)]">
                      Chat · {order.customer}
                    </p>
                    <Chip label={order.status} />
                  </div>
                  <div className="max-h-56 space-y-3 overflow-y-auto rounded-md bg-[var(--off-white-background)] p-3">
                    {order.messages.map((msg, index) => {
                      const isSupplier = msg.from === "supplier";

                      return (
                        <div
                          key={index}
                          className={`flex ${isSupplier ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-md border p-2.5 ${
                              isSupplier
                                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)]"
                                : "border-[color:var(--border-color)] bg-[var(--white-cards)]"
                            }`}
                          >
                            <p className="text-xs font-semibold text-[color:var(--primary-text)]">
                              {msg.from}
                            </p>
                            <p className="text-sm text-[color:var(--primary-text)]">
                              {msg.text}
                            </p>
                            <p className="mt-1 text-[10px] text-[color:var(--secondary-text)]">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message..."
                      className="w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]"
                    />
                    <button
                      type="button"
                      onClick={handleSend}
                      aria-label="Send message"
                      className="flex h-9 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
                    >
                      <Send size={15} />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-[color:var(--border-color)] pt-4">
                    <button type="button" onClick={handleClose} className={btn}>
                      Close
                    </button>

                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => setMode("cancel")}
                        className="rounded-md border border-red-300 bg-[var(--white-cards)] px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      >
                        Cancel Order
                      </button>
                    )}

                    {isPending && (
                      <button type="button" onClick={() => setMode("confirm")} className={yellowBtn}>
                        Confirm Order
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* CONFIRM BODY */}
              {mode === "confirm" && (
                <>
                  <p className="mt-4 text-sm text-[color:var(--secondary-text)]">
                    Confirm {order.id} for {order.customer}? The customer will be
                    notified.
                  </p>

                  <div className="mt-5 flex justify-end gap-2">
                    <button type="button" onClick={handleClose} className={btn}>
                      Cancel
                    </button>
                    <button type="button" onClick={handleConfirmOrder} className={yellowBtn}>
                      Confirm Order
                    </button>
                  </div>
                </>
              )}

              {/* CANCEL BODY */}
              {mode === "cancel" && (
                <>
                  <p className="mt-4 text-sm text-[color:var(--secondary-text)]">
                    Cancel {order.id} for {order.customer}?
                  </p>

                  <label
                    htmlFor={`bm-cancel-reason-${order.id}`}
                    className="mt-3 block text-sm text-[color:var(--primary-text)]"
                  >
                    Cancellation reason
                  </label>
                  <textarea
                    id={`bm-cancel-reason-${order.id}`}
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
                  />

                  <div className="mt-5 flex justify-end gap-2">
                    <button type="button" onClick={handleClose} className={btn}>
                      Keep Order
                    </button>
                    <button type="button" onClick={handleCancelOrder} className={redBtn}>
                      Confirm Cancellation
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmSupplierOrderDataRow;