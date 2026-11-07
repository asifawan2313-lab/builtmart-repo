"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import LabourTable from "../../../component/labour/LabourTable/LabourTable";

/* ============================================================
   DEMO DATA (sab naam, tareekhen aur amounts sirf UI ke liye hain)
   ============================================================ */

// history: negotiation ka record. by = "provider" ya "customer"
const initialBids = [
  {
    id: 1, code: "BID-501", job: "Bathroom pipe fitting", customer: "Demo Customer 1", price: 5500, date: "05 Nov 2026",
    status: "Submitted", message: "I can start on time and bring my own tools.",
    history: [{ id: 1, by: "provider", label: "Original bid", price: 5500 }],
  },
  {
    id: 2, code: "BID-498", job: "Kitchen leakage repair", customer: "Demo Customer 2", price: 3000, date: "04 Nov 2026",
    status: "Counteroffer Received", message: "Leak repair can be done in one day.",
    history: [
      { id: 1, by: "provider", label: "Original bid", price: 3000 },
      { id: 2, by: "customer", label: "Customer counteroffer", price: 2500 },
    ],
  },
  {
    id: 3, code: "BID-490", job: "Geyser line fitting", customer: "Demo Customer 3", price: 4200, date: "02 Nov 2026",
    status: "Accepted", message: "Fitting with new pipes.",
    history: [
      { id: 1, by: "provider", label: "Original bid", price: 4200 },
      { id: 2, by: "customer", label: "Accepted final price", price: 4200 },
    ],
  },
  {
    id: 4, code: "BID-486", job: "Sink replacement", customer: "Demo Customer 4", price: 2800, date: "01 Nov 2026",
    status: "Not Selected", message: "Can replace the sink the same day.",
    history: [{ id: 1, by: "provider", label: "Original bid", price: 2800 }],
  },
  {
    id: 5, code: "BID-470", job: "Roof tank line", customer: "Demo Customer 5", price: 7000, date: "28 Oct 2026",
    status: "Expired", message: "Two workers will be needed.",
    history: [{ id: 1, by: "provider", label: "Original bid", price: 7000 }],
  },
];

// Active = abhi chal rahi bids, Closed = khatam ho chuki
const activeStatuses = ["Submitted", "Under Negotiation", "Counteroffer Received"];

const tabs = [
  { id: "all", label: "All", test: () => true },
  { id: "active", label: "Active", test: (bid) => activeStatuses.includes(bid.status) },
  { id: "closed", label: "Closed", test: (bid) => !activeStatuses.includes(bid.status) },
];

const statusClass = {
  Submitted: "bg-blue-50 text-blue-700",
  "Under Negotiation": "bg-blue-50 text-blue-700",
  "Counteroffer Received": "bg-[#FDC716]/25 text-[#202124]",
  Accepted: "bg-green-50 text-green-700",
  "Not Selected": "bg-gray-100 text-gray-600",
  Withdrawn: "bg-gray-100 text-gray-600",
  Expired: "bg-gray-100 text-gray-600",
};

const rs = (amount) => `Rs. ${Number(amount).toLocaleString()}`;

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const outlineBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#D9E3E9] bg-white text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const box = "rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5";

/* ============================================================
   PAGE
   ============================================================ */

const LabourBidsPage = () => {
  const [bids, setBids] = useState(initialBids);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); // kaunsi bid khuli hai
  const [revisedPrice, setRevisedPrice] = useState("");
  const [error, setError] = useState("");

  const selected = bids.find((b) => b.id === selectedId);

  const handleOpen = (id) => {
    setSelectedId(id);
    setRevisedPrice("");
    setError("");
  };

  // Ek bid ko update karo (status badlo, history mein entry jodo)
  const updateBid = (id, status, entry, newPrice) =>
    setBids((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status,
              price: newPrice ?? b.price,
              history: entry ? [...b.history, { id: b.history.length + 1, ...entry }] : b.history,
            }
          : b
      )
    );

  // Counteroffer accept: final price dono taraf se tay (simulated)
  const handleAccept = () => {
    const counter = selected.history[selected.history.length - 1];
    updateBid(selected.id, "Accepted", { by: "provider", label: "Accepted final price", price: counter.price }, counter.price);
  };

  // Counteroffer reject: bid band
  const handleReject = () =>
    updateBid(selected.id, "Withdrawn", { by: "provider", label: "Counteroffer rejected", price: null });

  // Revised offer bhejna (form page ke andar hi hai)
  const handleRevise = (e) => {
    e.preventDefault();
    if (!Number(revisedPrice) || Number(revisedPrice) <= 0) {
      setError("Please enter a valid revised price.");
      return;
    }
    updateBid(selected.id, "Under Negotiation", { by: "provider", label: "Provider revised offer", price: Number(revisedPrice) });
    setRevisedPrice("");
    setError("");
  };

  const currentTab = tabs.find((t) => t.id === activeTab);
  const text = query.trim().toLowerCase();
  const visibleBids = bids.filter(
    (b) => currentTab.test(b) && (!text || `${b.code} ${b.job} ${b.customer}`.toLowerCase().includes(text))
  );

  // Table ke columns: har cell ka design yahan likha hai
  const columns = [
    { key: "code", label: "Bid ID", render: (b) => <span className="font-semibold">{b.code}</span> },
    { key: "job", label: "Job Title" },
    { key: "customer", label: "Customer" },
    { key: "price", label: "Proposed Price", render: (b) => <span className="font-semibold">{rs(b.price)}</span> },
    { key: "date", label: "Submitted" },
    {
      key: "status",
      label: "Status",
      render: (b) => (
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[b.status]}`}>{b.status}</span>
      ),
    },
    {
      key: "action",
      label: "",
      render: (b) => (
        <button type="button" onClick={() => handleOpen(b.id)} className={`${outlineBtn} h-8 rounded-md px-3 text-xs`}>
          View Details
        </button>
      ),
    },
  ];

  /* ---------- Bid details + negotiation ---------- */
  if (selected) {
    const canRespond = selected.status === "Counteroffer Received";
    const canRevise = canRespond || selected.status === "Under Negotiation";

    return (
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#384452] hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to My Bids
        </button>

        <section className={`${box} mt-4`}>
          <p className="text-xs text-[#565553]">{selected.code} · Submitted {selected.date}</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[#292929]">{selected.job}</h1>
          <p className="mt-1 text-sm text-[#565553]">Customer: {selected.customer}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[selected.status]}`}>{selected.status}</span>
            <span className="text-sm font-semibold text-[#202124]">Current price: {rs(selected.price)}</span>
          </div>

          <h2 className="mt-4 text-sm font-bold text-[#202124]">Your message</h2>
          <p className="mt-1 text-sm text-[#565553]">{selected.message}</p>
        </section>

        {/* Negotiation history */}
        <section className={`${box} mt-4`}>
          <h2 className="text-sm font-bold text-[#202124]">Negotiation history</h2>
          <ul className="mt-2 divide-y divide-[#D9E3E9]">
            {selected.history.map(({ id, by, label, price }) => (
              <li key={id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-semibold text-[#202124]">{label}</p>
                  <p className="text-xs text-[#565553]">{by === "provider" ? "You" : "Customer"}</p>
                </div>
                <p className="font-semibold text-[#384452]">{price ? rs(price) : "-"}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[#565553]">
            A counteroffer is not final until both sides agree. Once accepted, the booking appears in My Bookings (demo).
          </p>
        </section>

        {/* Respond */}
        {canRespond && (
          <section className={`${box} mt-4`}>
            <h2 className="text-sm font-bold text-[#202124]">Customer sent a counteroffer</h2>
            <p className="mt-1 text-sm text-[#565553]">
              Offered price: <span className="font-semibold text-[#202124]">{rs(selected.history[selected.history.length - 1].price)}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={handleAccept} className={`${yellowBtn} h-10 rounded-lg px-5`}>
                Accept Counteroffer
              </button>
              <button type="button" onClick={handleReject} className={`${outlineBtn} h-10 rounded-lg px-5`}>
                Reject
              </button>
            </div>
          </section>
        )}

        {/* Revised offer form (form page ke andar hi hai) */}
        {canRevise && (
          <form onSubmit={handleRevise} className={`${box} mt-4 space-y-3`}>
            <h2 className="text-sm font-bold text-[#202124]">Send a revised offer</h2>
            <label className="block max-w-xs text-xs font-semibold text-[#565553]">
              Revised Price (Rs.)
              <input
                type="number"
                min="0"
                value={revisedPrice}
                onChange={(e) => setRevisedPrice(e.target.value)}
                placeholder="e.g. 2800"
                className={`${field} mt-1 font-normal`}
              />
            </label>
            {error && <p role="alert" className="max-w-xs rounded bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
            <button type="submit" className={`${outlineBtn} h-10 rounded-lg px-5`}>
              Send Revised Offer
            </button>
          </form>
        )}

        {selected.status === "Accepted" && (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            Final price agreed: {rs(selected.price)}. Other bids on this job are closed (simulated).
          </p>
        )}
      </div>
    );
  }

  /* ---------- Bids table ---------- */
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Bids</h1>
          <p className="mt-1 text-xs text-[#565553]">Track your offers, counteroffers and final prices.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search bids"
            placeholder="Search bid, job or customer"
            className={`${field} pl-9`}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Bid status">
        {tabs.map(({ id, label, test }) => {
          const isActive = id === activeTab;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(id)}
              className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
              }`}
            >
              {label}
              <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>
                {bids.filter(test).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <LabourTable columns={columns} rows={visibleBids} emptyText="No bids found." />
      </div>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample bids shown for demonstration purposes.</p>
    </div>
  );
};

export default LabourBidsPage;