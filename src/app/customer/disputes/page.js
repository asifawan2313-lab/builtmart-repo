"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, FileWarning, Plus, Search } from "lucide-react";
import { disputes, statusClass } from "./disputeData";

const tabs = ["All", "Open", "Under Review", "Resolved", "Rejected"];

const CustomerDisputesPage = () => {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const text = query.trim().toLowerCase();
  const visible = disputes.filter(
    (d) => (tab === "All" || d.status === tab) && (!text || `${d.id} ${d.subject} ${d.supplier}`.toLowerCase().includes(text))
  );

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* Heading + button */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Disputes</h1>
          <p className="mt-1 text-xs text-[#45484D]">Complaints you have raised about suppliers.</p>
        </div>
        <Link
          href="/customer/disputes/new"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
        >
          <Plus size={16} aria-hidden="true" />
          Raise a Dispute
        </Link>
      </div>

      {/* Search + tabs */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Dispute status">
          {tabs.map((name) => {
            const isActive = tab === name;
            const count = disputes.filter((d) => name === "All" || d.status === name).length;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(name)}
                className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                  isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
                }`}
              >
                {name}
                <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search disputes"
            placeholder="Search disputes"
            className="h-10 w-full rounded-lg border border-[#D9E3E9] bg-white pl-9 pr-3 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
          />
        </div>
      </div>

      {/* List */}
      <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
        {visible.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#45484D]">No disputes found.</p>
        ) : (
          <ul className="divide-y divide-[#E2E4E7]">
            {visible.map(({ id, subject, supplier, date, status }) => (
              <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                  <FileWarning size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 basis-48">
                  <p className="truncate text-sm font-semibold text-[#202124]">{subject}</p>
                  <p className="truncate text-xs text-[#45484D]">{supplier}</p>
                  <p className="truncate text-xs text-[#45484D]">
                    #{id} · {date}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
                <Link
                  href={`/customer/disputes/${id}`}
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-[#D9E3E9] bg-white px-4 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
                >
                  View
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-4 text-center text-xs text-[#45484D]">Sample disputes shown for demonstration purposes.</p>
    </main>
  );
};

export default CustomerDisputesPage;