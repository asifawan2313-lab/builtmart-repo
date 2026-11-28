"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import BmAdminKycPageheader from "../../../component/admin/pageheader/BmAdminKycPageheader";
import BmAdminDisputeDataRow from "../../../component/admin/disputes/BmAdminDisputeDataRow";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

const BM_DISPUTE_TABS = [
  { key: "dispute", label: "Disputes" },
  { key: "support", label: "Support" },
];

const BM_DISPUTE_STATUS_FILTERS = ["All", "Open", "Under Review", "Resolved", "Rejected"];

const BM_DISPUTES = [
  {
    id: "TKT-301", kind: "dispute", orderId: "ORD-1005",
    raisedBy: "Ahmed Raza", raisedRole: "Customer",
    againstName: "Brick House", againstRole: "Supplier",
    type: "Quality issue", date: "2026-10-10", status: "Resolved",
    description: "Bricks were damaged on arrival.",
    messages: [
      { side: "raised", text: "The bricks arrived damaged.", time: "Oct 10, 11:05 AM" },
      { side: "against", text: "Refund approved after return.", time: "Oct 10, 01:30 PM" },
    ],
  },
  {
    id: "TKT-302", kind: "dispute", orderId: "ORD-1002",
    raisedBy: "Brick House", raisedRole: "Supplier",
    againstName: "Sana Malik", againstRole: "Customer",
    type: "COD refused", date: "2026-10-17", status: "Open",
    description: "Customer refused to pay cash on delivery.",
    messages: [
      { side: "raised", text: "Customer refused the COD payment at the door.", file: "refusal_photo.png", time: "Oct 17, 02:10 PM" },
      { side: "against", text: "The bricks were not the quality I ordered.", time: "Oct 17, 03:45 PM" },
    ],
  },
  {
    id: "TKT-303", kind: "dispute", orderId: "ORD-1003",
    raisedBy: "Bilal Khan", raisedRole: "Customer",
    againstName: "Sheikh Traders", againstRole: "Supplier",
    type: "Paid but not delivered", date: "2026-10-18", status: "Under Review",
    description: "Online payment done but the order has not arrived.",
    messages: [
      { side: "raised", text: "I paid online but nothing arrived.", time: "Oct 18, 10:00 AM" },
      { side: "against", text: "Rider is delayed, will deliver tomorrow.", time: "Oct 18, 12:20 PM" },
    ],
  },
  {
    id: "TKT-304", kind: "dispute", orderId: "ORD-1008",
    raisedBy: "Sheikh Traders", raisedRole: "Supplier",
    againstName: "Usman Rider", againstRole: "Rider",
    type: "Damaged in transit", date: "2026-10-20", status: "Open",
    description: "Cement bags were torn during delivery.",
    messages: [
      { side: "raised", text: "Bags were already torn when I picked them up.", time: "Oct 20, 09:15 AM" },
      { side: "against", text: "The bags were fine when I loaded them.", time: "Oct 20, 10:40 AM" },
    ],
  },
  {
    id: "LTKT-101", kind: "dispute", orderId: "LBOOK-103",
    raisedBy: "Bilal Khan", raisedRole: "Customer",
    againstName: "Ghulam Rasool", againstRole: "Labour",
    type: "Project delay", date: "2026-11-03", status: "Open",
    description: "Worker did not come on the agreed day.",
    messages: [
      { side: "raised", text: "Worker did not come on the agreed day.", time: "Nov 03, 08:30 AM" },
      { side: "against", text: "I had an emergency, I can come tomorrow.", time: "Nov 03, 09:10 AM" },
    ],
  },
  {
    id: "STKT-201", kind: "support", orderId: "—",
    raisedBy: "Hina Malik", raisedRole: "Customer",
    againstName: "BuildMart", againstRole: "Support",
    type: "Top-up not received", date: "2026-11-05", status: "Open",
    description: "Wallet top-up was approved but balance did not change.",
    messages: [
      { side: "raised", text: "My top-up was approved but my wallet is still empty.", time: "Nov 05, 04:00 PM" },
      { side: "against", text: "We are checking this and will update you soon.", time: "Nov 05, 04:25 PM" },
    ],
  },
];

const th = "px-4 py-3 font-medium";

/* =========================================================
   PAGE
========================================================= */

const Page = () => {
  const [tab, setTab] = useState("dispute");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const query = search.trim().toLowerCase();

  // Tab + status dropdown + search teeno yahin lagte hain
  const visibleRequests = BM_DISPUTES.reduce((all, item) => {
    const matches =
      item.kind === tab &&
      (status === "All" || item.status === status) &&
      `${item.id} ${item.orderId} ${item.raisedBy} ${item.againstName}`
        .toLowerCase()
        .includes(query);

    return matches ? [...all, item] : all;
  }, []);

  const tabLabel = tab === "dispute" ? "Disputes" : "Support";

  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <BmAdminKycPageheader title="Disputes & Support" />

      {/* TABS */}
      <div className="mb-4 inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
        {BM_DISPUTE_TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`rounded-md px-4 py-1.5 text-sm transition-colors ${
              tab === item.key
                ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:p-4">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-48"
          >
            {BM_DISPUTE_STATUS_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-[var(--off-white-background)] text-[11px] uppercase text-[color:var(--secondary-text)]">
              <tr>
                <th className={th}>Ticket ID</th>
                <th className={th}>Order ID</th>
                <th className={th}>Raised By</th>
                <th className={th}>Against</th>
                <th className={th}>{tab === "dispute" ? "Dispute Type" : "Issue Type"}</th>
                <th className={th}>
                  <span className="inline-flex items-center gap-1">
                    Date <ArrowUpDown size={11} />
                  </span>
                </th>
                <th className={th}>Status</th>
                <th className={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleRequests.map((request) => (
                <BmAdminDisputeDataRow
                  key={request.id}
                  request={request}
                  requests={visibleRequests}
                  listTitle={tabLabel}
                />
              ))}

              {visibleRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[color:var(--secondary-text)]"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (abhi kuch implement nahi) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>
            {visibleRequests.length}{" "}
            {visibleRequests.length === 1 ? "record" : "records"}
          </span>

          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronLeft size={14} />
            </button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page" className="rounded p-1 hover:bg-[var(--off-white-background)]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;