"use client";

import { useState } from "react";
import { CheckCircle2, Plus, X } from "lucide-react";

import BmSupplierDisputesTable from "../../../component/supplier/Bmdisputetable.js";

// ========== DATA ==========
// Dropdown ke options. Naya category chahiye to bas aik naam aur likh dein.
const BM_CATEGORIES = [
  "COD Refused",
  "Payment Issue",
  "Return / Refund",
  "Delivery Commitment",
  "Quantity Disagreement",
  "Other",
];

// "Related Order ID" dropdown ke liye orders
const BM_ORDERS = [
  { id: 1, order: "BM-ORD-1001", customer: "Ali Raza" },
  { id: 2, order: "BM-ORD-1002", customer: "Sana Tariq" },
  { id: 3, order: "BM-ORD-1003", customer: "Bilal Ahmed" },
  { id: 4, order: "BM-ORD-1005", customer: "Fatima Noor" },
];

const BM_START_DISPUTES = [
  {
    id: 1,
    ticket: "TKT-7001",
    order: "BM-ORD-1005",
    customer: "Fatima Noor",
    category: "COD Refused",
    date: "2026-10-10",
    status: "Under Review",
  },
];

// Form ki shuruati (khali) halat
const BM_EMPTY_FORM = {
  orderId: "1",
  category: BM_CATEGORIES[0],
  description: "",
  evidence: "",
};

export default function SupplierDisputesPage() {
  // ===== State =====
  const [disputes, setDisputes] = useState(BM_START_DISPUTES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(BM_EMPTY_FORM);
  const [toast, setToast] = useState("");

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

    const selectedOrder = BM_ORDERS.find((o) => String(o.id) === form.orderId);

    const newTicket = {
      id: Date.now(),
      ticket: `TKT-${7001 + disputes.length}`,
      order: selectedOrder.order,
      customer: selectedOrder.customer,
      category: form.category,
      date: new Date().toISOString().slice(0, 10),
      status: "Open",
    };

    setDisputes([newTicket, ...disputes]);
    setIsFormOpen(false);
    setToast("Ticket submitted");
    setTimeout(() => setToast(""), 2500);
  };

  // Table ka "Open" button (ticket chat page abhi baqi hai)
  const handleOpenTicket = (id) => {
    console.log("Open ticket:", id);
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
            Dispute tickets, ticket chat aur Admin resolution
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
        <BmSupplierDisputesTable disputes={disputes} onOpen={handleOpenTicket} />
      </div>

      {/* ----- Toast ----- */}
      {toast && (
        <div className="bmDisputes-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
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
              {/* Related Order ID */}
              <div>
                <label className={labelClass}>Related Order ID</label>
                <select name="orderId" value={form.orderId} onChange={handleChange} className={inputClass}>
                  {BM_ORDERS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.order} — {o.customer}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dispute Category */}
              <div>
                <label className={labelClass}>Dispute Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  {BM_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>
                <textarea
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
                <label className={labelClass}>Evidence (file)</label>
                <input
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
}