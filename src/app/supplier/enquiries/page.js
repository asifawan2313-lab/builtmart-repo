"use client";

import { useState } from "react";

// ========== DATA ==========
const BM_TABS = ["All", "New", "Responded", "Closed"];
const BM_STATUSES = ["New", "Responded", "Closed"];

const BM_START_ENQUIRIES = [
  {
    id: 1,
    customer: "Usama Javed",
    code: "ENQ-201",
    date: "2026-10-17",
    material: "A-Class Bricks",
    message: "10,000 eent ka bulk rate kya hoga? Delivery Kamoke tak ho jayegi?",
    status: "New",
    replies: [],
  },
  {
    id: 2,
    customer: "Ayesha Khan",
    code: "ENQ-202",
    date: "2026-10-16",
    material: "DG Cement (OPC)",
    message: "Cement fresh hai? Manufacturing date kya hai?",
    status: "Responded",
    replies: [{ id: 1, text: "Ji bilkul, is mahine ka stock hai." }],
  },
  {
    id: 3,
    customer: "Kashif Mehmood",
    code: "ENQ-203",
    date: "2026-10-14",
    material: "Saria 12mm (Grade 60)",
    message: "Saria dobara kab available hoga?",
    status: "New",
    replies: [],
  },
];

// Status chip ke rang (screenshot ke mutabiq)
const BM_CHIP_COLORS = {
  New: "bg-orange-100 text-orange-500",
  Responded: "bg-green-100 text-green-600",
  Closed: "bg-gray-200 text-gray-600",
};

export default function SupplierEnquiriesPage() {
  // ===== State =====
  const [enquiries, setEnquiries] = useState(BM_START_ENQUIRIES);
  const [activeTab, setActiveTab] = useState("All");
  const [drafts, setDrafts] = useState({}); // { enquiryId: "likha hua reply" }

  // ===== Tab filter: All = sab, warna sirf us status wali chats =====
  const visibleEnquiries = enquiries.filter(
    (item) => activeTab === "All" || item.status === activeTab
  );

  // ===== Handlers =====
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (id, newStatus) => {
    setEnquiries(
      enquiries.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleDraftChange = (id, text) => {
    setDrafts({ ...drafts, [id]: text });
  };

  // Reply button: reply save karo, status Responded karo (Closed ho to Closed hi rahe)
  const handleReplySubmit = (e, id) => {
    e.preventDefault();

    const text = (drafts[id] || "").trim();
    if (!text) return;

    setEnquiries(
      enquiries.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Closed" ? "Closed" : "Responded",
              replies: [...item.replies, { id: Date.now(), text }],
            }
          : item
      )
    );

    setDrafts({ ...drafts, [id]: "" });
  };

  return (
    <main className="bmEnquiries-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* ----- Heading ----- */}
      <h1 className="bmEnquiries-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        Customer Enquiries
      </h1>
      <p className="bmEnquiries-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
        Order se pehle customers ke sawalat. Enquiry se order automatically
        create nahi hota.
      </p>

      {/* ----- Tabs ----- */}
      <div className="bmEnquiries-tabs mt-6 flex flex-wrap gap-2">
        {BM_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabClick(tab)}
            className={`bmEnquiries-tabBtn cursor-pointer rounded-full border px-4 py-1.5 text-xs font-[family-name:Poppins-Medium] transition-colors duration-300 sm:text-sm ${
              activeTab === tab
                ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ----- Enquiry list ----- */}
      <div className="bmEnquiries-list mt-6 flex flex-col gap-5">
        {visibleEnquiries.map((item) => (
          <form
            key={item.id}
            onSubmit={(e) => handleReplySubmit(e, item.id)}
            className="bmEnquiries-card min-w-0 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5"
          >
            {/* Upar: naam, code, date, material (left) + status chip + dropdown (right) */}
            <div className="bmEnquiries-top flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words text-[color:var(--primary-text)]">
                  <span className="font-[family-name:Poppins-Medium] text-lg">
                    {item.customer}
                  </span>
                  <span className="text-xs text-[color:var(--secondary-text)]">
                    {" "}
                    · {item.code} · {item.date}
                  </span>
                </p>
                <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
                  Related Material:{" "}
                  <span className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                    {item.material}
                  </span>
                </p>
              </div>

              <div className="bmEnquiries-statusBox flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${
                    BM_CHIP_COLORS[item.status]
                  }`}
                >
                  {item.status}
                </span>

                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  aria-label="Change enquiry status"
                  className="bmEnquiries-select cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
                >
                  {BM_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer ka sawal */}
            <p className="bmEnquiries-message mt-4 break-words rounded-md bg-gray-200/70 px-4 py-3 text-sm text-[color:var(--primary-text)] sm:text-base">
              &ldquo;{item.message}&rdquo;
            </p>

            {/* Supplier ke replies: halka yellow box + yellow left line */}
            {item.replies.map((reply) => (
              <p
                key={reply.id}
                className="bmEnquiries-reply mt-3 ml-0 break-words rounded-md border-l-4 border-[color:var(--primary-yellow)] bg-yellow-50 px-4 py-3 text-sm text-[color:var(--primary-text)] sm:ml-3 sm:text-base"
              >
                <span className="font-[family-name:Poppins-Medium]">
                  Aapka reply:
                </span>{" "}
                {reply.text}
              </p>
            ))}

            {/* Reply form */}
            <div className="bmEnquiries-replyRow mt-4 flex gap-3">
              <input
                type="text"
                value={drafts[item.id] || ""}
                onChange={(e) => handleDraftChange(item.id, e.target.value)}
                placeholder="Reply likhein..."
                className="bmEnquiries-input min-h-11 w-full min-w-0 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]"
              />
              <button
                type="submit"
                className="bmEnquiries-replyBtn shrink-0 cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] sm:px-7"
              >
                Reply
              </button>
            </div>
          </form>
        ))}

        {/* Khali tab */}
        {visibleEnquiries.length === 0 && (
          <div className="bmEnquiries-empty rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-8 text-center text-sm text-[color:var(--secondary-text)]">
            Is tab mein koi enquiry nahi hai.
          </div>
        )}
      </div>
    </main>
  );
}