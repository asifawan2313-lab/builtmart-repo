"use client";

import { useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialMessages = [
  { id: 1, name: "Tariq Jamil", email: "tariq@mail.pk", subject: "Bulk order inquiry", date: "2026-10-16", status: "New", message: "Need 50,000 bricks for a project in Multan." },
  { id: 2, name: "Ayesha Noor", email: "ayesha@mail.pk", subject: "Supplier signup help", date: "2026-10-14", status: "In Progress", message: "How do I register my shop as a supplier on BuildMart?" },
  { id: 3, name: "Faisal Aziz", email: "faisal@mail.pk", subject: "Thanks", date: "2026-10-08", status: "Resolved", message: "Thanks for the quick support on my last order." },
];

const headings = ["From", "Subject", "Date", "Status", ""];
const sortable = ["From", "Date"];
const statusOptions = ["All", "New", "In Progress", "Resolved"];
const perPage = 8; // ek page par kitne rows

// Status ke hisab se badge ka rang
const badgeColors = {
  New: "bg-blue-50 text-blue-600 ring-blue-200",
  "In Progress": "bg-orange-50 text-orange-600 ring-orange-200",
  Resolved: "bg-green-50 text-green-700 ring-green-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

/* ---------------- Read modal ---------------- */

const MessageModal = ({ item, onClose }) => (
  // Overlay: bahar click karne par band
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
    >
      {/* Subject + Close */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl text-[color:var(--primary-text)]">{item.subject}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Name · email · date + status */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[color:var(--secondary-text)]">
        <span>{item.name} · {item.email} · {item.date}</span>
        <span className={`rounded-full px-2.5 py-0.5 ring-1 ${badgeColors[item.status]}`}>{item.status}</span>
      </div>

      {/* Message */}
      <p className="mt-5 text-sm text-[color:var(--primary-text)]">{item.message}</p>
    </div>
  </div>
);

/* ---------------- Page ---------------- */

const ContactManagementPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [readingId, setReadingId] = useState(null); // Read modal wala message

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Row ke dropdown se message ka status badalna
  const handleRowStatus = (id, newStatus) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status: newStatus } : m)));
  };

  // Modal ko hamesha taaza message milega
  const reading = messages.find((m) => m.id === readingId);

  // 1) Search aur dropdown dono par poore utre hue messages chuno
  const visible = messages.reduce((all, m) => {
    const matchSearch = `${m.name} ${m.email} ${m.subject} ${m.message}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || m.status === status;
    return matchSearch && matchStatus ? [...all, m] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Contact Management
      </h1>
      <p className="mt-1 text-sm text-[color:var(--secondary-text)] sm:text-base">
        Messages submitted through the public contact page.
      </p>

      {/* Card */}
      <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + dropdown */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              aria-label="Search"
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            aria-label="Status filter"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {sortable.includes(h) && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-t border-[color:var(--border-color)]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[color:var(--primary-text)]">{m.name}</p>
                    <p className="text-xs text-[color:var(--secondary-text)]">{m.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.subject}</td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.date}</td>
                  <td className="px-4 py-3">
                    <select
                      value={m.status}
                      onChange={(e) => handleRowStatus(m.id, e.target.value)}
                      aria-label={`Status of ${m.subject}`}
                      className="w-40 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none"
                    >
                      {statusOptions.slice(1).map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => setReadingId(m.id)} className={btn}>
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} {visible.length === 1 ? "record" : "records"}</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Read modal */}
      {reading && <MessageModal item={reading} onClose={() => setReadingId(null)} />}
    </section>
  );
};

export default ContactManagementPage;