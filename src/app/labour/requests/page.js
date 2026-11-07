"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Search, Users, Wallet } from "lucide-react";
import LabourGrid from "../../../component/labour/LabourGrid/LabourGrid";

/* ============================================================
   DEMO DATA (sab naam, tareekhen aur amounts sirf UI ke liye hain)
   ============================================================ */

// Sirf wahi requests jo is provider ki skill aur area se match karti hain (simulated)
const initialRequests = [
  {
    id: 1, code: "REQ-1001", title: "Bathroom pipe fitting", category: "Plumbing", skill: "Pipe fitting",
    description: "Fix and fit new pipes in two bathrooms. Old pipes need to be removed first.",
    extra: "Worker should bring own tools.", area: "Demo Area A", address: "Demo address, Gujranwala",
    budget: "Rs. 6,000", workers: 1, start: "08 Nov 2026", duration: "2 days", date: "05 Nov 2026", bid: null,
  },
  {
    id: 2, code: "REQ-1002", title: "Kitchen leakage repair", category: "Plumbing", skill: "Leak repair",
    description: "Water leaks under the kitchen sink and drips onto the cabinet.",
    extra: "Work in the morning only.", area: "Demo Area B", address: "Demo address, Gujranwala",
    budget: "Rs. 3,500", workers: 1, start: "09 Nov 2026", duration: "1 day", date: "04 Nov 2026", bid: null,
  },
  {
    id: 3, code: "REQ-1003", title: "Water tank line setup", category: "Plumbing", skill: "Pipe fitting",
    description: "New line from the roof tank to the kitchen and both bathrooms.",
    extra: "Two workers needed for roof work.", area: "Demo Area C", address: "Demo address, Gujranwala",
    budget: "Rs. 8,000", workers: 2, start: "12 Nov 2026", duration: "3 days", date: "03 Nov 2026", bid: null,
  },
  {
    id: 4, code: "REQ-1004", title: "Sanitary fitting in new house", category: "Plumbing", skill: "Sanitary fitting",
    description: "Fit basin, commode and shower in a newly built house.",
    extra: "Fittings will be provided by the customer.", area: "Demo Area B", address: "Demo address, Gujranwala",
    budget: "Rs. 5,000", workers: 1, start: "14 Nov 2026", duration: "2 days", date: "02 Nov 2026", bid: null,
  },
];

// Work images ki jaghen (image null ho to "No image" dikhta hai)
const workImages = [
  { id: 1, image: null },
  { id: 2, image: null },
  { id: 3, image: null },
];

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const outlineBtn =
  "inline-flex cursor-pointer items-center justify-center border border-[#D9E3E9] bg-white text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const box = "rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5";

const emptyForm = { price: "", time: "", startDate: "", message: "" };

/* ============================================================
   PAGE
   ============================================================ */

const LabourRequestsPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); // kaunsi request khuli hai
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const selected = requests.find((r) => r.id === selectedId);

  const handleOpen = (id) => {
    setSelectedId(id);
    setForm(emptyForm);
    setError("");
  };

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // Bid bhejna (simulated): bid sirf is page ki state mein save hoti hai
  const handleSubmitBid = (e) => {
    e.preventDefault();

    if (!Number(form.price) || Number(form.price) <= 0) {
      setError("Please enter a valid proposed price.");
      return;
    }
    if (!form.time.trim() || !form.startDate) {
      setError("Please enter the completion time and your available start date.");
      return;
    }

    setRequests((prev) => prev.map((r) => (r.id === selectedId ? { ...r, bid: { ...form } } : r)));
    setError("");
  };

  const text = query.trim().toLowerCase();
  const visibleRequests = requests.filter(
    (r) => !text || `${r.code} ${r.title} ${r.category} ${r.area}`.toLowerCase().includes(text)
  );

  /* ---------- Request details + Submit Bid form ---------- */
  if (selected) {
    return (
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#384452] hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Labour Requests
        </button>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* Request details */}
          <div className="space-y-5">
            <section className={box}>
              <p className="text-xs text-[#565553]">{selected.code} · Posted {selected.date}</p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#292929]">{selected.title}</h1>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-[#292929] px-2 py-1 font-semibold text-[#FDC716]">{selected.category}</span>
                <span className="rounded bg-[#F4F4F2] px-2 py-1 text-[#565553]">{selected.skill}</span>
              </div>

              <h2 className="mt-4 text-sm font-bold text-[#202124]">Job description</h2>
              <p className="mt-1 text-sm text-[#565553]">{selected.description}</p>

              <h2 className="mt-4 text-sm font-bold text-[#202124]">Additional requirements</h2>
              <p className="mt-1 text-sm text-[#565553]">{selected.extra}</p>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-[#565553]">Work location</dt>
                  <dd className="font-semibold text-[#202124]">{selected.area}, Gujranwala</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#565553]">Expected budget</dt>
                  <dd className="font-semibold text-[#202124]">{selected.budget}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#565553]">Workers required</dt>
                  <dd className="font-semibold text-[#202124]">{selected.workers}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#565553]">Preferred start / duration</dt>
                  <dd className="font-semibold text-[#202124]">{selected.start} · {selected.duration}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-[#565553]">
                Full address is shared only after your bid is accepted.
              </p>
            </section>

            <section className={box}>
              <h2 className="text-sm font-bold text-[#202124]">Work images</h2>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {workImages.map(({ id, image }) => (
                  <div key={id} className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#D9E3E9]">
                    {/* Image aane par yahan Image component lagayein */}
                    {!image && <span className="text-xs text-[#565553]">No image</span>}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Submit Bid form (form page ke andar hi hai) */}
          <aside className={`${box} h-fit`}>
            {selected.bid ? (
              <div>
                <h2 className="text-sm font-bold text-green-700">Bid submitted</h2>
                <p className="mt-2 text-sm text-[#565553]">
                  Your bid of <span className="font-semibold text-[#202124]">Rs. {Number(selected.bid.price).toLocaleString()}</span> for{" "}
                  {selected.bid.time} was sent to the customer (demo).
                </p>
                <p className="mt-1 text-xs text-[#565553]">The customer can accept it or send a counteroffer.</p>
                <Link href="/labour/bids" className={`${yellowBtn} mt-4 h-10 w-full rounded-lg`}>
                  Go to My Bids
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmitBid} className="space-y-3">
                <h2 className="text-sm font-bold text-[#202124]">Submit your bid</h2>

                <label className="block text-xs font-semibold text-[#565553]">
                  Proposed Price (Rs.)
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="e.g. 5000"
                    className={`${field} mt-1 font-normal`}
                  />
                </label>

                <label className="block text-xs font-semibold text-[#565553]">
                  Estimated Completion Time
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    placeholder="e.g. 2 days"
                    className={`${field} mt-1 font-normal`}
                  />
                </label>

                <label className="block text-xs font-semibold text-[#565553]">
                  Available Start Date
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className={`${field} mt-1 font-normal`}
                  />
                </label>

                <label className="block text-xs font-semibold text-[#565553]">
                  Additional Message
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell the customer why you are the right worker"
                    className="mt-1 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 py-2 text-sm font-normal text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
                  />
                </label>

                {error && <p role="alert" className="rounded bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

                <button type="submit" className={`${yellowBtn} h-10 w-full rounded-lg`}>
                  Submit Bid
                </button>
                <p className="text-center text-xs text-[#565553]">Demo only: nothing is sent to a real customer.</p>
              </form>
            )}
          </aside>
        </div>
      </div>
    );
  }

  /* ---------- Request cards ---------- */
  const RequestCard = ({ id, code, title, category, description, area, budget, workers, start, duration, date, bid }) => (
    <article className="flex flex-col rounded-xl border border-[#D9E3E9] bg-white p-3 text-[#202124] shadow-sm">
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-lg bg-[#D9E3E9]">
        {/* Image ki jagah: image aane par yahan lagayein */}
        <span className="text-xs text-[#565553]">No image</span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold">{title}</h3>
          <span className="shrink-0 rounded bg-[#292929] px-2 py-0.5 text-[10px] font-semibold text-[#FDC716]">{category}</span>
        </div>
        <p className="text-[11px] text-[#565553]">{code} · Posted {date}</p>
        <p className="line-clamp-2 text-xs text-[#565553]">{description}</p>

        <div className="mt-1 space-y-1 text-xs text-[#565553]">
          <p className="flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" />{area}, Gujranwala</p>
          <p className="flex items-center gap-1.5"><Wallet size={12} aria-hidden="true" />Budget {budget}</p>
          <p className="flex items-center gap-1.5"><Users size={12} aria-hidden="true" />{workers} worker(s) required</p>
          <p className="flex items-center gap-1.5"><CalendarDays size={12} aria-hidden="true" />Start {start} · {duration}</p>
        </div>

        <div className="mt-auto flex gap-2 pt-3">
          <button type="button" onClick={() => handleOpen(id)} className={`${outlineBtn} h-9 flex-1 rounded-md text-xs`}>
            View Details
          </button>
          {bid ? (
            <span className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-green-50 text-xs font-semibold text-green-700">
              Bid submitted
            </span>
          ) : (
            <button type="button" onClick={() => handleOpen(id)} className={`${yellowBtn} h-9 flex-1 rounded-md text-xs`}>
              Submit Bid
            </button>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Labour Requests</h1>
          <p className="mt-1 text-xs text-[#565553]">
            Only jobs that match your skills and service areas appear here (simulated).
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search requests"
            placeholder="Search request, title or area"
            className={`${field} pl-9`}
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-[#565553]">{visibleRequests.length} requests found</p>

      <div className="mt-3">
        {visibleRequests.length ? (
          <LabourGrid items={visibleRequests} Card={RequestCard} view="grid" />
        ) : (
          <p className="rounded-xl border border-[#D9E3E9] bg-white px-4 py-10 text-center text-sm text-[#565553]">
            No requests found.
          </p>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample requests shown for demonstration purposes.</p>
    </div>
  );
};

export default LabourRequestsPage;