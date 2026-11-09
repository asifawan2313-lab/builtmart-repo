"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import LabourTable from "../../../component/labour/LabourTable/LabourTable";

/* ============================================================
   DEMO DATA (sab naam, tareekhen aur amounts sirf UI ke liye hain)
   ============================================================ */

// chat: by = "me" (provider) ya "them" (customer)
const initialBookings = [
  {
    id: 1, code: "BKG-301", jobCode: "REQ-0990", customer: "Demo Customer 3", job: "Geyser line fitting", category: "Plumbing",
    description: "Fit a new geyser line with new pipes in the bathroom.", price: 4200, area: "Demo Area B",
    address: "Demo address, Gujranwala", phone: "03XX-XXXXXXX", date: "07 Nov 2026", duration: "1 day", booked: "03 Nov 2026",
    status: "Scheduled", bidCode: "BID-490",
    chat: [
      { id: 1, by: "them", text: "Please come after 10 am." },
      { id: 2, by: "me", text: "Sure, I will be there on time." },
    ],
  },
  {
    id: 2, code: "BKG-298", jobCode: "REQ-0981", customer: "Demo Customer 6", job: "Sink replacement", category: "Plumbing",
    description: "Replace the old kitchen sink with a new steel sink.", price: 2800, area: "Demo Area A",
    address: "Demo address, Gujranwala", phone: "03XX-XXXXXXX", date: "09 Nov 2026", duration: "1 day", booked: "02 Nov 2026",
    status: "Confirmed", bidCode: "BID-486",
    chat: [{ id: 1, by: "them", text: "The sink will be ready at the site." }],
  },
  {
    id: 3, code: "BKG-290", jobCode: "REQ-0970", customer: "Demo Customer 7", job: "Bathroom leak repair", category: "Plumbing",
    description: "Repair a pipe leak behind the bathroom wall.", price: 3500, area: "Demo Area C",
    address: "Demo address, Gujranwala", phone: "03XX-XXXXXXX", date: "05 Nov 2026", duration: "2 days", booked: "30 Oct 2026",
    status: "Work in Progress", bidCode: "BID-471",
    chat: [{ id: 1, by: "them", text: "Please send a photo when done." }],
  },
  {
    id: 4, code: "BKG-281", jobCode: "REQ-0955", customer: "Demo Customer 8", job: "Tap and mixer fitting", category: "Plumbing",
    description: "Fit new taps and mixers in two bathrooms.", price: 2200, area: "Demo Area D",
    address: "Demo address, Gujranwala", phone: "03XX-XXXXXXX", date: "28 Oct 2026", duration: "1 day", booked: "25 Oct 2026",
    status: "Completed", bidCode: "BID-455",
    chat: [{ id: 1, by: "me", text: "The work is finished." }],
  },
];

// Timeline ke qadam (Cancelled aur Disputed alag banner mein dikhte hain)
const steps = ["Pending Confirmation", "Confirmed", "Scheduled", "Work in Progress", "Completed"];

const activeStatuses = ["Pending Confirmation", "Confirmed", "Scheduled", "Work in Progress"];

const tabs = [
  { id: "all", label: "All", test: () => true },
  { id: "active", label: "Active", test: (b) => activeStatuses.includes(b.status) },
  { id: "completed", label: "Completed", test: (b) => b.status === "Completed" },
];

const statusClass = {
  "Pending Confirmation": "bg-gray-100 text-gray-600",
  Confirmed: "bg-green-50 text-green-700",
  Scheduled: "bg-blue-50 text-blue-700",
  "Work in Progress": "bg-[#FDC716]/25 text-[#202124]",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-gray-100 text-gray-600",
  Disputed: "bg-red-50 text-red-700",
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

const LabourBookingsPage = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); // kaun si booking khuli hai
  const [message, setMessage] = useState("");

  const selected = bookings.find((b) => b.id === selectedId);

  const handleOpen = (id) => {
    setSelectedId(id);
    setMessage("");
  };

  // Booking ka status badlo (provider sirf apne permitted qadam utha sakta hai)
  const setStatus = (id, status) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));

  // Chat message bhejna (simulated: sirf is page ki state mein)
  const handleSend = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedId ? { ...b, chat: [...b.chat, { id: b.chat.length + 1, by: "me", text }] } : b
      )
    );
    setMessage("");
  };

  const currentTab = tabs.find((t) => t.id === activeTab);
  const text = query.trim().toLowerCase();
  const visibleBookings = bookings.filter(
    (b) => currentTab.test(b) && (!text || `${b.code} ${b.job} ${b.customer}`.toLowerCase().includes(text))
  );

  // Table ke columns: har cell ka design yahan likha hai
  const columns = [
    { key: "code", label: "Booking ID", render: (b) => <span className="font-semibold">{b.code}</span> },
    { key: "customer", label: "Customer" },
    { key: "job", label: "Job Title" },
    { key: "category", label: "Category" },
    { key: "price", label: "Agreed Price", render: (b) => <span className="font-semibold">{rs(b.price)}</span> },
    { key: "date", label: "Scheduled" },
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

  /* ---------- Booking details ---------- */
  if (selected) {
    const stepIndex = steps.indexOf(selected.status);
    const canStart = ["Confirmed", "Scheduled"].includes(selected.status);
    const showAddress = selected.status !== "Pending Confirmation";

    return (
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#384452] hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to My Bookings
        </button>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {/* Booking info */}
            <section className={box}>
              <p className="text-xs text-[#565553]">
                {selected.code} · Job {selected.jobCode} · Accepted bid {selected.bidCode} · Booked {selected.booked}
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#292929]">{selected.job}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[selected.status]}`}>{selected.status}</span>
                <span className="rounded bg-[#292929] px-2 py-1 text-xs font-semibold text-[#FDC716]">{selected.category}</span>
              </div>

              <p className="mt-4 text-sm text-[#565553]">{selected.description}</p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-[#565553]">Final agreed price</dt>
                  <dd className="font-semibold text-[#202124]">{rs(selected.price)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#565553]">Scheduled start / duration</dt>
                  <dd className="font-semibold text-[#202124]">{selected.date} · {selected.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#565553]">Customer</dt>
                  <dd className="font-semibold text-[#202124]">{selected.customer}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#565553]">Contact</dt>
                  <dd className="font-semibold text-[#202124]">{showAddress ? selected.phone : "Shared after confirmation"}</dd>
                </div>
              </dl>

              <p className="mt-3 flex items-start gap-1.5 text-sm text-[#565553]">
                <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                {showAddress ? `${selected.address} (${selected.area})` : `${selected.area}, Gujranwala (full address shared after confirmation)`}
              </p>
            </section>

            {/* Timeline */}
            <section className={box}>
              <h2 className="text-sm font-bold text-[#202124]">Booking timeline</h2>

              {["Cancelled", "Disputed"].includes(selected.status) ? (
                <p className={`mt-3 rounded px-3 py-2 text-sm ${statusClass[selected.status]}`}>
                  This booking is {selected.status.toLowerCase()}.
                </p>
              ) : (
                <ol className="mt-3 space-y-2">
                  {steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-3 text-sm">
                      <span className={`h-3 w-3 shrink-0 rounded-full ${index <= stepIndex ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`} aria-hidden="true" />
                      <span className={index <= stepIndex ? "font-semibold text-[#202124]" : "text-[#565553]"}>{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {/* Provider ke permitted actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {canStart && (
                  <button type="button" onClick={() => setStatus(selected.id, "Work in Progress")} className={`${outlineBtn} h-10 rounded-lg px-5`}>
                    Start Work
                  </button>
                )}
                {selected.status === "Work in Progress" && (
                  <button type="button" onClick={() => setStatus(selected.id, "Completed")} className={`${yellowBtn} h-10 rounded-lg px-5`}>
                    Mark as Completed
                  </button>
                )}
              </div>

              {selected.status === "Completed" && (
                <p className="mt-3 rounded bg-[#FDC716]/20 px-3 py-2 text-xs text-[#202124]">
                  You marked this job completed. The customer must still confirm it or raise a dispute. Your update is not their approval.
                </p>
              )}
            </section>
          </div>

          {/* Booking chat (form page ke andar hi hai) */}
          <aside className={`${box} flex h-fit flex-col`}>
            <h2 className="text-sm font-bold text-[#202124]">Booking chat</h2>
            <p className="text-xs text-[#565553]">Simulated chat, linked to this booking only.</p>

            <ul className="mt-3 flex max-h-72 min-h-40 flex-col gap-2 overflow-y-auto rounded-lg bg-[#F4F4F2] p-3">
              {selected.chat.map(({ id, by, text: chatText }) => (
                <li
                  key={id}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    by === "me" ? "self-end bg-[#FDC716] text-[#292929]" : "self-start bg-white text-[#202124]"
                  }`}
                >
                  {chatText}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSend} className="mt-3 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="Type a message"
                placeholder="Type a message"
                className={`${field} flex-1`}
              />
              <button type="submit" className={`${yellowBtn} h-10 rounded-lg px-4`}>
                Send
              </button>
            </form>
          </aside>
        </div>
      </div>
    );
  }

  /* ---------- Bookings table ---------- */
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Bookings</h1>
          <p className="mt-1 text-xs text-[#565553]">Created automatically when a customer accepts your bid.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search bookings"
            placeholder="Search booking, job or customer"
            className={`${field} pl-9`}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Booking status">
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
                {bookings.filter(test).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <LabourTable columns={columns} rows={visibleBookings} emptyText="No bookings found." />
      </div>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample bookings shown for demonstration purposes.</p>
    </div>
  );
};

export default LabourBookingsPage;