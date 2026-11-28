"use client";

import { useState } from "react";
import { ArrowLeft, Send, X } from "lucide-react";

const STATUS_CHIP = {
  Open: "border-orange-300 bg-orange-50 text-orange-500",
  "Under Review": "border-orange-300 bg-orange-50 text-orange-500",
  Resolved: "border-green-400 bg-green-50 text-green-700",
  Rejected: "border-red-300 bg-red-50 text-red-500",
};

const ROLE_CHIP = {
  Customer: "bg-blue-50 text-blue-600",
  Supplier: "bg-purple-50 text-purple-600",
  Rider: "bg-teal-50 text-teal-600",
  Labour: "bg-orange-50 text-orange-600",
  Support: "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const redBtn =
  "rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700";

const StatusChip = ({ status }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] ${STATUS_CHIP[status]}`}
  >
    {status}
  </span>
);

const RoleChip = ({ role }) => (
  <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] ${ROLE_CHIP[role]}`}>
    {role}
  </span>
);

const BmAdminDisputeDataRow = ({ request, requests, listTitle }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeId, setActiveId] = useState(request.id);
  const [message, setMessage] = useState("");
  // null | "resolve" | "reject"  (dono ke liye ek hi modal)
  const [action, setAction] = useState(null);
  const [note, setNote] = useState("");

  // Chat mein jo dispute abhi khula hai
  const active = requests.find((item) => item.id === activeId) || request;
  const canAct = active.status === "Open" || active.status === "Under Review";

  const handleOpenChat = () => {
    setActiveId(request.id);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setAction(null);
    setNote("");
    setMessage("");
  };

  const handleSend = () => {
    alert(`Message sent on ${active.id}: ${message}`);
    setMessage("");
  };

  const handleCloseAction = () => {
    setAction(null);
    setNote("");
  };

  const handleResolve = () => {
    alert(`${active.id} resolved. Note: ${note}`);
    handleCloseChat();
  };

  const handleReject = () => {
    alert(`${active.id} rejected. Reason: ${note}`);
    handleCloseChat();
  };

  return (
    <tr className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]">
      <td className="px-4 py-3 align-top">{request.id}</td>
      <td className="px-4 py-3 align-top">{request.orderId}</td>
      <td className="px-4 py-3 align-top">
        <p>{request.raisedBy}</p>
        <RoleChip role={request.raisedRole} />
      </td>
      <td className="px-4 py-3 align-top">
        <p>{request.againstName}</p>
        <RoleChip role={request.againstRole} />
      </td>
      <td className="px-4 py-3 align-top">{request.type}</td>
      <td className="px-4 py-3 align-top">{request.date}</td>
      <td className="px-4 py-3 align-top">
        <StatusChip status={request.status} />
      </td>

      <td className="px-4 py-3 align-top">
        <button type="button" onClick={handleOpenChat} className={btn}>
          View
        </button>

        {/* CHAT MODAL (view) */}
        {chatOpen && (
          <div
            onClick={handleCloseChat}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 text-left sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-[var(--white-cards)] shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[color:var(--border-color)] px-4 py-3">
                <button
                  type="button"
                  onClick={handleCloseChat}
                  className="inline-flex items-center gap-2 text-sm text-[color:var(--primary-text)]"
                >
                  <ArrowLeft size={16} />
                  Back to {listTitle}
                </button>
                <button
                  type="button"
                  onClick={handleCloseChat}
                  aria-label="Close chat"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[300px_1fr]">
                {/* LEFT — saari conversations */}
                <aside className="hidden min-h-0 flex-col overflow-y-auto border-r border-[color:var(--border-color)] md:flex">
                  <p className="border-b border-[color:var(--border-color)] px-4 py-3 font-semibold text-[color:var(--primary-text)]">
                    {listTitle}
                  </p>

                  {requests.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`flex gap-3 border-b border-[color:var(--border-color)] px-4 py-3 text-left hover:bg-[var(--off-white-background)] ${
                        item.id === active.id ? "bg-[var(--off-white-background)]" : ""
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--charcoal-black)] text-sm text-[color:var(--primary-yellow)]">
                        {item.raisedBy.charAt(0)}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex justify-between gap-2 text-sm text-[color:var(--primary-text)]">
                          <span className="truncate">{item.raisedBy}</span>
                          <span className="shrink-0 text-[10px] text-[color:var(--secondary-text)]">
                            {item.date}
                          </span>
                        </span>
                        <span className="block truncate text-xs text-[color:var(--secondary-text)]">
                          {item.type}
                        </span>
                        <span className="block truncate text-xs text-[color:var(--secondary-text)]">
                          {item.messages[item.messages.length - 1].text}
                        </span>
                        <span className="mt-1 flex items-center justify-between gap-2">
                          <span className="text-[10px] text-[color:var(--primary-text)]">
                            {item.id}
                          </span>
                          <StatusChip status={item.status} />
                        </span>
                      </span>
                    </button>
                  ))}
                </aside>

                {/* RIGHT — selected chat */}
                <section className="flex min-h-0 flex-col">
                  <div className="border-b border-[color:var(--border-color)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-[color:var(--primary-text)]">
                        {active.id} — {active.type}
                      </h3>
                      <StatusChip status={active.status} />
                    </div>

                    <p className="mt-2 text-sm text-[color:var(--primary-text)]">
                      {active.description}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[color:var(--primary-text)]">
                      <span className="inline-flex items-center gap-2">
                        Raised by: {active.raisedBy} <RoleChip role={active.raisedRole} />
                      </span>
                      <span className="inline-flex items-center gap-2">
                        Against: {active.againstName} <RoleChip role={active.againstRole} />
                      </span>
                      <span>
                        Order: <span className="underline">{active.orderId}</span>
                      </span>
                    </div>
                  </div>

                  {/* MESSAGES */}
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[var(--off-white-background)] p-4">
                    {active.messages.map((msg, index) => {
                      const isRaised = msg.side === "raised";

                      return (
                        <div
                          key={index}
                          className={`flex ${isRaised ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-lg border p-3 sm:max-w-[60%] ${
                              isRaised
                                ? "border-[color:var(--border-color)] bg-[var(--white-cards)]"
                                : "border-[var(--primary-yellow)] bg-[var(--primary-yellow)]/20"
                            }`}
                          >
                            <p className="flex items-center gap-2 text-xs text-[color:var(--secondary-text)]">
                              {isRaised ? active.raisedBy : active.againstName}
                              <RoleChip role={isRaised ? active.raisedRole : active.againstRole} />
                            </p>

                            <p className="mt-1 text-sm text-[color:var(--primary-text)]">
                              {msg.text}
                            </p>

                            {msg.file && (
                              <div className="mt-2 flex h-28 w-44 items-center justify-center rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)] text-xs text-[color:var(--primary-text)]">
                                {msg.file}
                              </div>
                            )}

                            <p className="mt-1 text-right text-[10px] text-[color:var(--secondary-text)]">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* INPUT + RESOLVE / REJECT */}
                  <div className="border-t border-[color:var(--border-color)] p-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        className="w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)]"
                      />
                      <button
                        type="button"
                        onClick={handleSend}
                        aria-label="Send message"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
                      >
                        <Send size={15} />
                      </button>
                    </div>

                    {canAct && (
                      <div className="mt-3 flex justify-end gap-2">
                        <button type="button" onClick={() => setAction("reject")} className={btn}>
                          Reject
                        </button>
                        <button type="button" onClick={() => setAction("resolve")} className={yellowBtn}>
                          Resolve
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* RESOLVE / REJECT MODAL — ek hi modal, action ke hisaab se text badalta hai */}
        {chatOpen && action && (
          <div
            onClick={handleCloseAction}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 text-left"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                    {action === "resolve" ? "Resolve Dispute" : "Reject Dispute"}
                  </h2>
                  <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
                    {active.id} · {active.type}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseAction}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <label
                htmlFor={`bm-dispute-note-${active.id}`}
                className="block text-sm text-[color:var(--secondary-text)]"
              >
                {action === "resolve" ? "Resolution note" : "Rejection reason"}
              </label>
              <textarea
                id={`bm-dispute-note-${active.id}`}
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40"
              />

              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={handleCloseAction} className={btn}>
                  Cancel
                </button>

                {action === "resolve" ? (
                  <button type="button" onClick={handleResolve} className={yellowBtn}>
                    Confirm Resolve
                  </button>
                ) : (
                  <button type="button" onClick={handleReject} className={redBtn}>
                    Confirm Rejection
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BmAdminDisputeDataRow;