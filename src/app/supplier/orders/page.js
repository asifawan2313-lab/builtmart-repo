"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, X, Send, Eye, MessageSquare, CircleCheck, CircleX } from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialOrders = [
  {
    id: "BM-ORD-1001", customer: "Ali Raza", phone: "0321-5556677", material: "A-Class Bricks", qty: 5000, unit: "brick", price: 18,
    method: "Cash on Delivery", payment: "Unpaid", status: "In Transit", delivery: "Delivery", address: "House 12, Satellite Town, Gujranwala",
    rider: "Imran Khan · 0345-1112233 · Mazda Truck LEB-4521 · On the Way",
    timeline: [{ text: "Order created — In Transit", date: "2026-10-15" }],
    chat: [
      { from: "customer", text: "Assalam o Alaikum, mera order kab tak pohanch jayega?", time: "Oct 17, 10:12 AM" },
      { from: "supplier", text: "Walaikum Salam! Rider nikal chuka hai, 1 ghante mein pohanch jayega.", time: "Oct 17, 10:20 AM" },
      { from: "customer", text: "Theek hai. Gate ke andar unload ho sakega?", time: "Oct 17, 10:31 AM" },
      { from: "supplier", text: "Ji bilkul, gate ke andar unload ho jayega.", time: "Oct 17, 10:35 AM" },
    ],
  },
  {
    id: "BM-ORD-1002", customer: "Sana Tariq", phone: "0300-1234567", material: "DG Cement (OPC)", qty: 50, unit: "bag", price: 1450,
    method: "Bank Transfer", payment: "Paid", status: "Pending", delivery: "Delivery", address: "Street 4, Model Town, Gujranwala",
    rider: "",
    timeline: [{ text: "Order created — Pending", date: "2026-10-18" }],
    chat: [{ from: "customer", text: "Kya cement kal tak mil jayega?", time: "Oct 18, 9:05 AM" }],
  },
  {
    id: "BM-ORD-1003", customer: "Bilal Ahmed", phone: "0333-2223344", material: "Reused Wooden Doors", qty: 2, unit: "door", price: 6500,
    method: "Cash on Delivery", payment: "Paid", status: "Delivered", delivery: "Delivery", address: "Plot 9, Citi Housing, Gujranwala",
    rider: "Imran Khan · 0345-1112233 · Mazda Truck LEB-4521 · Delivered",
    timeline: [{ text: "Order created — Pending", date: "2026-10-10" }, { text: "Status changed — Delivered", date: "2026-10-12" }],
    chat: [],
  },
  {
    id: "BM-ORD-1004", customer: "Hamza Iqbal", phone: "0345-7778899", material: "A-Class Bricks", qty: 3000, unit: "brick", price: 18,
    method: "JazzCash", payment: "Paid", status: "Confirmed", delivery: "Pickup", address: "Pickup from shop",
    rider: "",
    timeline: [{ text: "Order created — Pending", date: "2026-10-19" }, { text: "Status changed — Confirmed", date: "2026-10-19" }],
    chat: [],
  },
  {
    id: "BM-ORD-1005", customer: "Fatima Noor", phone: "0312-4445566", material: "Ravi Sand (Rait)", qty: 500, unit: "cft", price: 45,
    method: "Cash on Delivery", payment: "Unpaid", status: "Failed / Returned", delivery: "Delivery", address: "Block B, Wapda Town, Gujranwala",
    rider: "Imran Khan · 0345-1112233 · Mazda Truck LEB-4521 · Returned",
    timeline: [{ text: "Order created — In Transit", date: "2026-10-08" }, { text: "Status changed — Failed / Returned", date: "2026-10-09" }],
    chat: [],
  },
];

const headings = ["Order ID", "Customer", "Material / Quantity", "Unit Price", "Total", "Payment", "Status", "Actions"];
const statusOptions = ["All", "Pending", "Confirmed", "In Transit", "Delivered", "Cancelled", "Failed / Returned"];

/* ---------------- Shared styles + helpers ---------------- */

const badgeColors = {
  Pending: "bg-orange-50 text-orange-600",
  Confirmed: "bg-blue-50 text-blue-600",
  "In Transit": "bg-blue-50 text-blue-600",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-600",
  "Failed / Returned": "bg-red-50 text-red-600",
  Paid: "bg-green-50 text-green-700",
  Unpaid: "bg-orange-50 text-orange-600",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";
const field =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const menuItem =
  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

const rs = (n) => `Rs. ${n.toLocaleString("en-US")}`;
const total = (o) => o.qty * o.price;

const Badge = ({ text }) => (
  <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${badgeColors[text]}`}>{text}</span>
);

// Overlay + heading + close icon: sab modals yahi use karte hain
const ModalShell = ({ title, size = "max-w-2xl", onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
        <h2 className="text-lg text-[color:var(--primary-text)]">{title}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------------- Orders table ---------------- */

const OrdersTable = ({ orders, onMenu }) => (
  <div className="overflow-x-auto rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
    <table className="w-full min-w-[1000px] text-left text-sm">
      <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
        <tr>
          {headings.map((h) => (
            <th key={h} className="px-4 py-3 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id} className="border-t border-[color:var(--border-color)]">
            <td className="px-4 py-3 font-semibold text-[color:var(--primary-text)]">{o.id}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{o.customer}</td>
            <td className="px-4 py-3">
              <p className="text-[color:var(--primary-text)]">{o.material}</p>
              <p className="text-xs text-[color:var(--secondary-text)]">{o.qty.toLocaleString("en-US")} {o.unit}</p>
            </td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{rs(o.price)} / {o.unit}</td>
            <td className="px-4 py-3 font-semibold text-[color:var(--primary-text)]">{rs(total(o))}</td>
            <td className="px-4 py-3">
              <p className="text-xs text-[color:var(--primary-text)]">{o.method}</p>
              <Badge text={o.payment} />
            </td>
            <td className="px-4 py-3"><Badge text={o.status} /></td>
            <td className="px-4 py-3">
              <button
                type="button"
                aria-label={`Actions for ${o.id}`}
                onClick={(e) => onMenu(e, o)}
                className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
              >
                Actions <ChevronDown size={14} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------- Cancel modal (reason zaroori) ---------------- */

const CancelModal = ({ order, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const isEmpty = reason.trim() === "";

  return (
    <ModalShell title="Cancel Order" size="max-w-md" onClose={onClose}>
      <p className="mt-4 text-sm text-[color:var(--secondary-text)]">
        Cancel {order.id} for {order.customer}?
      </p>
      <label htmlFor="bmCancelReason" className="mt-4 block text-sm text-[color:var(--primary-text)]">
        Cancellation reason (required)
      </label>
      <textarea
        id="bmCancelReason"
        rows={3}
        autoFocus
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className={`${field} mt-1.5 resize-y`}
      />
      <div className="mt-5 flex justify-end gap-3">
        <button type="button" onClick={onClose} className={btn}>Keep Order</button>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onConfirm(reason.trim())}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm Cancellation
        </button>
      </div>
    </ModalShell>
  );
};

/* ---------------- Chat modal ---------------- */

const ChatModal = ({ order, onClose, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(order.id, message.trim());
    setMessage("");
  };

  return (
    <ModalShell title={`Order Chat — ${order.id}`} size="max-w-xl" onClose={onClose}>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-base font-semibold text-[color:var(--primary-text)]">{order.customer} · Supplier</p>
        <Badge text={order.status} />
      </div>

      <div className="mt-3 flex h-72 flex-col gap-3 overflow-y-auto rounded-md bg-[var(--off-white-background)] p-3">
        {order.chat.length === 0 && (
          <p className="m-auto text-sm text-[color:var(--secondary-text)]">No messages yet</p>
        )}
        {order.chat.map((c, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-md border border-[color:var(--border-color)] px-3 py-2 ${
              c.from === "supplier"
                ? "self-end bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "self-start bg-[var(--white-cards)] text-[color:var(--primary-text)]"
            }`}
          >
            <p className="text-xs font-semibold">{c.from}</p>
            <p className="text-sm">{c.text}</p>
            <p className="mt-1 text-[10px] opacity-70">{c.time}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          aria-label="Message"
          className={field}
        />
        <button
          type="button"
          aria-label="Send message"
          disabled={message.trim() === ""}
          onClick={handleSend}
          className={`${yellowBtn} px-3`}
        >
          <Send size={16} />
        </button>
      </div>
    </ModalShell>
  );
};

/* ---------------- Page ---------------- */

const SupplierOrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [status, setStatus] = useState("All"); // main page ka Order Status
  const [demoStatus, setDemoStatus] = useState("All"); // Customer My Orders screen ka Order Status
  const [demoOpen, setDemoOpen] = useState(false); // inner screen
  const [menu, setMenu] = useState(null); // khula menu: { order, top, left }
  const [viewId, setViewId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  // Actions button ke neeche menu kholo
  const handleMenu = (e, order) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ order, top: rect.bottom + 4, left: Math.max(8, rect.right - 176) });
  };

  // Menu ka koi option: pehle menu band, phir uska modal
  const handleMenuView = () => { setViewId(menu.order.id); setMenu(null); };
  const handleMenuChat = () => { setChatId(menu.order.id); setMenu(null); };
  const handleMenuConfirm = () => { setConfirmId(menu.order.id); setMenu(null); };
  const handleMenuCancel = () => { setCancelId(menu.order.id); setMenu(null); };

  // View modal se chat kholo
  const handleOpenChat = (id) => { setViewId(null); setChatId(id); };

  // Status badalna + timeline mein entry
  const handleStatusChange = (id, newStatus) => {
    const today = new Date().toISOString().slice(0, 10);
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: newStatus, timeline: [...o.timeline, { text: `Status changed — ${newStatus}`, date: today }] } : o
      )
    );
  };

  const handleConfirm = () => {
    handleStatusChange(confirmId, "Confirmed");
    setConfirmId(null);
  };

  const handleCancel = (reason) => {
    handleStatusChange(cancelId, "Cancelled");
    console.log("Cancel reason", cancelId, reason);
    setCancelId(null);
  };

  // Chat mein supplier ka message jodo
  const handleSend = (id, text) => {
    const time = new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    setOrders(orders.map((o) => (o.id === id ? { ...o, chat: [...o.chat, { from: "supplier", text, time }] } : o)));
  };

  // Modals ko hamesha taaza order milega
  const findOrder = (id) => orders.find((o) => o.id === id);
  const viewing = findOrder(viewId);
  const chatting = findOrder(chatId);
  const confirming = findOrder(confirmId);
  const cancelling = findOrder(cancelId);

  // Order Status dropdown ke hisab se orders
  const pick = (s) => orders.reduce((all, o) => (s === "All" || o.status === s ? [...all, o] : all), []);

  // Dono screens (main + customer demo) ka same hissa: dropdown + table
  const renderOrders = (value, setValue) => (
    <>
      <label htmlFor="bmOrderStatus" className="mt-5 block text-sm font-semibold text-[color:var(--primary-text)]">
        Order Status
      </label>
      <select
        id="bmOrderStatus"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${field} mt-1.5 max-w-xs`}
      >
        {statusOptions.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <div className="mt-4">
        <OrdersTable orders={pick(value)} onMenu={handleMenu} />
      </div>
    </>
  );

  // Menu ke options ki shartein
  const canConfirm = menu && menu.order.status === "Pending";
  const canCancel = menu && (menu.order.status === "Pending" || menu.order.status === "Confirmed");

  return (
    <>
      {/* Inner screen: Customer My Orders — Demo (list sirf hide hoti hai) */}
      {demoOpen && (
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Customer My Orders — Demo</h1>
            <button type="button" onClick={() => setDemoOpen(false)} className={`${btn} flex items-center gap-2`}>
              <ArrowLeft size={16} /> Back to Orders
            </button>
          </div>
          {renderOrders(demoStatus, setDemoStatus)}
        </section>
      )}

      <section className={`p-4 sm:p-6 lg:p-8 ${demoOpen ? "hidden" : ""}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Orders</h1>
            <p className="mt-1 text-sm text-[color:var(--secondary-text)]">Customer orders</p>
          </div>
          <button type="button" onClick={() => setDemoOpen(true)} className={`${btn} shadow-sm`}>
            Customer My Orders — Demo
          </button>
        </div>
        {renderOrders(status, setStatus)}
      </section>

      {/* ---------- Actions menu: bahar click par band ---------- */}
      {menu && (
        <>
          <div onClick={() => setMenu(null)} className="fixed inset-0 z-40" />
          <div
            style={{ top: menu.top, left: menu.left }}
            className="fixed z-50 w-44 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-1 shadow-lg"
          >
            <button type="button" onClick={handleMenuView} className={menuItem}><Eye size={16} /> View</button>
            <button type="button" onClick={handleMenuChat} className={menuItem}><MessageSquare size={16} /> Open Chat</button>
            <button type="button" disabled={!canConfirm} onClick={handleMenuConfirm} className={menuItem}><CircleCheck size={16} /> Confirm Order</button>
            <button type="button" disabled={!canCancel} onClick={handleMenuCancel} className={`${menuItem} text-red-600`}><CircleX size={16} /> Cancel Order</button>
          </div>
        </>
      )}

      {/* ---------- View modal ---------- */}
      {viewing && (
        <ModalShell title={`Order Details — ${viewing.id}`} onClose={() => setViewId(null)}>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
            {[
              { label: "Order ID", value: viewing.id },
              { label: "Customer", value: `${viewing.customer} · ${viewing.phone}` },
              { label: "Materials / Quantity", value: `${viewing.material} · ${viewing.qty} ${viewing.unit}` },
              { label: "Unit Price", value: `${rs(viewing.price)} / ${viewing.unit}` },
              { label: "Material Subtotal", value: rs(total(viewing)) },
              { label: "Order Total", value: rs(total(viewing)) },
              { label: "Payment", value: `${viewing.method} · ${viewing.payment}` },
              { label: "Method", value: viewing.delivery },
              { label: "Address", value: viewing.address },
              { label: "Status", value: viewing.status },
            ].map((d) => (
              <div key={d.label}>
                <p className="text-xs text-[color:var(--secondary-text)]">{d.label}</p>
                <p className="font-semibold text-[color:var(--primary-text)]">{d.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="text-xs text-[color:var(--secondary-text)]">Rider</p>
              <p className="font-semibold text-[color:var(--primary-text)]">{viewing.rider || "Not assigned yet"}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-[color:var(--border-color)] pt-4">
            <h3 className="text-sm font-semibold text-[color:var(--primary-text)]">Order Timeline</h3>
            <div className="mt-3 flex flex-col gap-3 border-l-2 border-[var(--primary-yellow)] pl-3">
              {viewing.timeline.map((t, i) => (
                <div key={i}>
                  <p className="text-sm text-[color:var(--primary-text)]">{t.text}</p>
                  <p className="text-xs text-[color:var(--secondary-text)]">{t.date}</p>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => handleOpenChat(viewing.id)} className={`mt-4 ${yellowBtn}`}>
              Open Order Chat
            </button>
          </div>
        </ModalShell>
      )}

      {/* ---------- Chat ---------- */}
      {chatting && <ChatModal key={chatting.id} order={chatting} onClose={() => setChatId(null)} onSend={handleSend} />}

      {/* ---------- Confirm order ---------- */}
      {confirming && (
        <ModalShell title="Confirm Order" size="max-w-md" onClose={() => setConfirmId(null)}>
          <p className="mt-4 text-sm text-[color:var(--secondary-text)]">
            Confirm {confirming.id} for {confirming.customer}? The customer will be notified.
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setConfirmId(null)} className={btn}>Cancel</button>
            <button type="button" onClick={handleConfirm} className={yellowBtn}>Confirm Order</button>
          </div>
        </ModalShell>
      )}

      {/* ---------- Cancel order ---------- */}
      {cancelling && <CancelModal key={cancelling.id} order={cancelling} onClose={() => setCancelId(null)} onConfirm={handleCancel} />}
    </>
  );
};

export default SupplierOrdersPage;