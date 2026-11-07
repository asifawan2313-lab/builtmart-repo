"use client";

import { useState } from "react";
import { CheckCircle2, Plus, Send, X } from "lucide-react";

// ========== DATA ==========
// Dropdown ke options. Naya category chahiye to bas aik naam aur likh dein.
const BM_CATEGORIES = [
  "COD Refused",
  "COD Amount Mismatch",
  "Customer Not Available",
  "Wrong Address",
  "Damaged Goods",
  "Delivery Delay",
  "Payment Issue",
  "Other",
];

// "Related Delivery" dropdown ke liye deliveries
const BM_DELIVERIES = [
  { id: 1, delivery: "RD-101", customer: "Ali Raza" },
  { id: 2, delivery: "RD-102", customer: "Sana Tariq" },
  { id: 3, delivery: "RD-103", customer: "Bilal Ahmed" },
  { id: 4, delivery: "RD-104", customer: "Fatima Noor" },
];

const BM_START_DISPUTES = [
  {
    id: 1,
    ticket: "TKT-8001",
    delivery: "RD-104",
    customer: "Fatima Noor",
    category: "COD Refused",
    date: "2026-11-02",
    status: "Under Review",
    description: "Customer ne delivery ke waqt COD dene se inkaar kar diya.",
    messages: [
      { from: "Rider", text: "Customer ne delivery ke waqt COD dene se inkaar kar diya.", date: "2026-11-02 · 06:10 PM" },
      { from: "Admin", text: "Hum ne customer se rabta kar liya hai, review jari hai.", date: "2026-11-03 · 10:00 AM" },
    ],
  },
];

const BM_HEADINGS = ["Ticket", "Delivery", "Customer", "Category", "Date", "Status", ""];

// Status ke hisab se badge ka rang
const BM_STATUS_COLORS = {
  Open: "bg-orange-50 text-orange-600",
  "Under Review": "bg-blue-50 text-blue-600",
  Resolved: "bg-green-50 text-green-700",
};

// Form ki shuruati (khali) halat
const BM_EMPTY_FORM = {
  deliveryId: "1",
  category: BM_CATEGORIES[0],
  description: "",
  evidence: "",
};

/* ---------------- Disputes table ---------------- */

const RiderDisputesTable = ({ disputes, onOpen }) => (
  <div className="overflow-x-auto rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
    <table className="w-full min-w-[800px] text-left text-sm">
      <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
        <tr>
          {BM_HEADINGS.map((h, i) => (
            <th key={i} className="px-4 py-3 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {disputes.map((d) => (
          <tr key={d.id} className="border-t border-[color:var(--border-color)]">
            <td className="px-4 py-3 font-semibold text-[color:var(--primary-text)]">{d.ticket}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.delivery}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.customer}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.category}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{d.date}</td>
            <td className="px-4 py-3">
              <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${BM_STATUS_COLORS[d.status]}`}>{d.status}</span>
            </td>
            <td className="px-4 py-3">
              <button
                type="button"
                onClick={() => onOpen(d.id)}
                className="cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
              >
                Open
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------- Page ---------------- */

const RiderDisputesPage = () => {
  // ===== State =====
  const [disputes, setDisputes] = useState(BM_START_DISPUTES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(BM_EMPTY_FORM);
  const [toast, setToast] = useState("");
  const [openId, setOpenId] = useState(null); // khuli hui ticket
  const [reply, setReply] = useState("");

  // Jo ticket khuli hai (hamesha taaza data)
  const openTicket = disputes.find((d) => d.id === openId);

  // ===== Handlers =====
  const handleOpenForm = () => {
    setForm(BM_EMPTY_FORM);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Har input ke liye aik hi handler (input ke name se field milti hai)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Evidence file: sirf naam yaad rakhte hain (upload backend baad mein)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, evidence: file ? file.name : "" });
  };

  // Submit Ticket: nayi ticket table ke upar add karo
  const handleSubmit = (e) => {
    e.preventDefault();

    const selected = BM_DELIVERIES.find((d) => String(d.id) === form.deliveryId);

    const newTicket = {
      id: Date.now(),
      ticket: `TKT-${8001 + disputes.length}`,
      delivery: selected.delivery,
      customer: selected.customer,
      category: form.category,
      date: new Date().toISOString().slice(0, 10),
      status: "Open",
      description: form.description.trim(),
      messages: [{ from: "Rider", text: form.description.trim(), date: new Date().toISOString().slice(0, 10) }],
    };

    setDisputes([newTicket, ...disputes]);
    setIsFormOpen(false);
    setToast("Ticket submitted");
    setTimeout(() => setToast(""), 2500);
  };

  // Table ka "Open" button: ticket ka modal kholo
  const handleOpenTicket = (id) => {
    setReply("");
    setOpenId(id);
  };

  // Ticket chat mein rider ka reply
  const handleReply = () => {
    if (reply.trim() === "") return;
    const date = new Date().toISOString().slice(0, 10);
    setDisputes(
      disputes.map((d) => (d.id === openId ? { ...d, messages: [...d.messages, { from: "Rider", text: reply.trim(), date }] } : d))
    );
    setReply("");
  };

  // Input ki common styling
  const inputClass =
    "bmDisputes-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";
  const labelClass =
    "bmDisputes-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]";

  return (
    <main className="bmDisputes-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* ----- Header: heading (left) + Create Dispute (right) ----- */}
      <div className="bmDisputes-header flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="bmDisputes-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
            Disputes &amp; Support
          </h1>
          <p className="bmDisputes-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
            Delivery dispute tickets, ticket chat aur Admin resolution
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenForm}
          className="bmDisputes-createBtn flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] sm:w-auto"
        >
          <Plus size={16} />
          Create Dispute
        </button>
      </div>

      {/* ----- Tickets table ----- */}
      <div className="bmDisputes-tableBox mt-6">
        <RiderDisputesTable disputes={disputes} onOpen={handleOpenTicket} />
      </div>

      {/* ----- Toast ----- */}
      {toast && (
        <div className="bmDisputes-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* ===== Ticket modal: details + chat + reply ===== */}
      {openTicket && (
        <div onClick={() => setOpenId(null)} className="bmDisputes-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div onClick={(e) => e.stopPropagation()} className="bmDisputes-modal max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg bg-[var(--white-cards)] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
              <h2 className="text-xl text-[color:var(--primary-text)]">{openTicket.ticket} — {openTicket.category}</h2>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs ${BM_STATUS_COLORS[openTicket.status]}`}>
              {openTicket.status}
            </span>
            <p className="mt-3 text-sm text-[color:var(--primary-text)]">{openTicket.description}</p>
            <p className="mt-3 text-sm text-[color:var(--primary-text)]">
              Delivery: {openTicket.delivery} · Customer: {openTicket.customer} · Date: {openTicket.date}
            </p>

            {/* Chat */}
            <div className="mt-4 flex max-h-60 flex-col gap-3 overflow-y-auto rounded-md bg-[var(--off-white-background)] p-3">
              {openTicket.messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-md px-3 py-2 ${
                    m.from === "Rider"
                      ? "self-end bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
                      : "self-start border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
                  }`}
                >
                  <p className="text-xs font-semibold">{m.from}</p>
                  <p className="text-sm">{m.text}</p>
                  <p className="mt-1 text-[10px] text-[color:var(--secondary-text)]">{m.date}</p>
                </div>
              ))}
            </div>

            {/* Reply */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply likhein..."
                aria-label="Reply"
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Send reply"
                disabled={reply.trim() === ""}
                onClick={handleReply}
                className="cursor-pointer rounded-md bg-[var(--primary-yellow)] px-3 text-[color:var(--primary-text)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Create Dispute modal (form isi page mein) ===== */}
      {isFormOpen && (
        <div className="bmDisputes-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bmDisputes-modal max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-lg bg-[var(--white-cards)] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[color:var(--border-color)] pb-3">
              <h2 className="text-xl text-[color:var(--primary-text)]">Create Dispute</h2>
              <button
                type="button"
                onClick={handleCloseForm}
                aria-label="Close"
                className="cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              {/* Related Delivery */}
              <div>
                <label htmlFor="bmDisputeDelivery" className={labelClass}>Related Delivery ID</label>
                <select id="bmDisputeDelivery" name="deliveryId" value={form.deliveryId} onChange={handleChange} className={inputClass}>
                  {BM_DELIVERIES.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.delivery} — {d.customer}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dispute Category */}
              <div>
                <label htmlFor="bmDisputeCategory" className={labelClass}>Dispute Category</label>
                <select id="bmDisputeCategory" name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  {BM_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="bmDisputeDescription" className={labelClass}>Description</label>
                <textarea
                  id="bmDisputeDescription"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Evidence */}
              <div>
                <label htmlFor="bmDisputeEvidence" className={labelClass}>Evidence (file)</label>
                <input
                  id="bmDisputeEvidence"
                  type="file"
                  onChange={handleFileChange}
                  className={`${inputClass} cursor-pointer file:mr-2 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm`}
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer rounded-md bg-[var(--primary-yellow)] py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default RiderDisputesPage;