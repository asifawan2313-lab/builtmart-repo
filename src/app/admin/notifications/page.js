"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  CheckCheck,
  Send,
} from "lucide-react";

/* ---------------- Datasets ---------------- */

const initialReceived = [
  {
    id: 1,
    title: "New supplier dispute",
    message: "Brick House reported a refused COD delivery.",
    type: "Dispute",
    sender: "Brick House",
    date: "17 Oct 2026, 10:30 UTC",
    status: "Unread",
    dispute: {
      id: "TKT-302",
      title: "COD refused",
      status: "Open",
      description: "Customer asked rider to come back later twice.",
      info: "Order: ORD-1002 · Customer: Sana Malik · Supplier: Brick House",
      lastMessage: { from: "Brick House", text: "Customer is not accepting delivery." },
    },
  },
  {
    id: 2,
    title: "Dispatch delay reported",
    message: "Bilal Khan is waiting for a paid order to be dispatched.",
    type: "Dispute",
    sender: "Bilal Khan",
    date: "18 Oct 2026, 09:15 UTC",
    status: "Unread",
    dispute: {
      id: "TKT-303",
      title: "Paid but not delivered",
      status: "Under Review",
      description: "Order was paid online but the supplier has not dispatched it.",
      info: "Order: ORD-1003 · Customer: Bilal Khan · Supplier: Sheikh Traders",
      lastMessage: { from: "Bilal Khan", text: "Order paid but not dispatched yet." },
    },
  },
  {
    id: 3,
    title: "Supplier documents awaiting review",
    message: "Tile City submitted documents for verification.",
    type: "Verification",
    sender: "Tile City",
    date: "13 Oct 2026, 14:45 UTC",
    status: "Read",
    dispute: null,
  },
];

const initialSent = [
  {
    id: 101,
    title: "Platform maintenance",
    message: "Short downtime on Sunday 2am.",
    type: "Announcement",
    audience: "All users",
    date: "15 Oct 2026, 00:00 UTC",
    status: "Sent",
  },
];

const tabs = ["Received", "Sent"];
const audiences = ["All Users", "Customers", "Suppliers", "Sub-Admins"];
const notificationTypes = ["Announcement", "Dispute", "Report", "Order", "Verification", "System"];

const receivedHeadings = ["Notification Title", "Message", "Type", "Sender", "Date & Time", "Status", "Actions"];
const sentHeadings = ["Notification Title", "Message", "Recipient / Audience", "Sent Date & Time", "Status", "Actions"];
const sortable = ["Date & Time", "Sent Date & Time"];
const perPage = 8; // ek page par kitne rows

/* ---------------- Shared styles ---------------- */

// Status ke hisab se badge ka rang
const badgeColors = {
  Unread: "bg-blue-50 text-blue-600 ring-blue-200",
  Read: "bg-[var(--off-white-background)] text-[color:var(--secondary-text)] ring-[color:var(--border-color)]",
  Sent: "bg-green-50 text-green-700 ring-green-200",
  Draft: "bg-orange-50 text-orange-600 ring-orange-200",
  Open: "bg-orange-50 text-orange-600 ring-orange-200",
  "Under Review": "bg-orange-50 text-orange-600 ring-orange-200",
  "Waiting for Response": "bg-blue-50 text-blue-600 ring-blue-200",
  Resolved: "bg-green-50 text-green-700 ring-green-200",
  Rejected: "bg-red-50 text-red-600 ring-red-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const topBtn = `flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]`;
const modalBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const input =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";
const cell = "px-4 py-3 text-[color:var(--primary-text)]";

/* ---------------- Small shared pieces ---------------- */

const Badge = ({ status }) => (
  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[status]}`}>
    {status}
  </span>
);

// Overlay + heading + subtitle + close icon: sab modals yahi use karte hain
const ModalShell = ({ title, subtitle, onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl text-[color:var(--primary-text)]">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{subtitle}</p>}
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------------- View modal (received + sent) ---------------- */

const ViewModal = ({ item, isReceived, onClose, onOpenDispute }) => {
  // Upar wali lines: label + value ka chhota dataset
  const lines = isReceived
    ? [`Type: ${item.type}`, `Sender: ${item.sender}`]
    : [`Type: ${item.type}`, `Recipients / Audience: ${item.audience}`];

  const d = item.dispute;

  return (
    <ModalShell
      title={item.title}
      subtitle={isReceived ? "Received notification" : "Sent notification"}
      onClose={onClose}
    >
      <p className="mt-5 text-sm text-[color:var(--primary-text)]">{item.message}</p>

      {lines.map((line) => (
        <p key={line} className="mt-4 text-sm text-[color:var(--primary-text)]">{line}</p>
      ))}

      <p className="mt-4 text-sm text-[color:var(--secondary-text)]">{item.date}</p>

      {/* Sent: status badge */}
      {!isReceived && (
        <div className="mt-4">
          <Badge status={item.status} />
        </div>
      )}

      {/* Received + dispute: dispute ka khulasa */}
      {isReceived && d && (
        <div className="mt-5 border-t border-[color:var(--border-color)] pt-5">
          <h3 className="text-base font-semibold text-[color:var(--primary-text)]">
            {d.id} — {d.title}
          </h3>
          <div className="mt-2">
            <Badge status={d.status} />
          </div>
          <p className="mt-3 text-sm text-[color:var(--primary-text)]">{d.description}</p>
          <p className="mt-2 text-sm text-[color:var(--primary-text)]">{d.info}</p>
          <p className="mt-2 text-sm text-[color:var(--primary-text)]">
            <span className="font-semibold">{d.lastMessage.from}:</span> {d.lastMessage.text}
          </p>
          <button type="button" onClick={() => onOpenDispute(d.id)} className={`mt-3 ${btn}`}>
            Open Related Dispute
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-end border-t border-[color:var(--border-color)] pt-4">
        <button type="button" onClick={onClose} className={modalBtn}>
          Close
        </button>
      </div>
    </ModalShell>
  );
};

/* ---------------- Delete confirmation modal ---------------- */

const DeleteModal = ({ all, onCancel, onConfirm }) => (
  <ModalShell
    title={all ? "Delete All Notifications?" : "Delete Notification?"}
    onClose={onCancel}
  >
    <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
      {all
        ? "All received notifications will be deleted. This cannot be undone."
        : "Only this selected notification will be deleted. This cannot be undone."}
    </p>
    <div className="mt-5 flex justify-end gap-3">
      <button type="button" onClick={onCancel} className={modalBtn}>
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="rounded-md bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700"
      >
        Confirm Delete
      </button>
    </div>
  </ModalShell>
);

/* ---------------- Send New Notification modal ---------------- */

const SendModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: audiences[0],
    type: notificationTypes[0],
  });

  // Title khali ho to Send / Save draft band rahenge
  const isEmpty = form.title.trim() === "";

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <ModalShell title="Send New Notification" subtitle="New notification" onClose={onClose}>
      <div className="mt-5">
        <label htmlFor="bmNotifTitle" className={label}>Notification Title</label>
        <input
          id="bmNotifTitle"
          type="text"
          autoFocus
          value={form.title}
          onChange={handleChange("title")}
          className={input}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="bmNotifMessage" className={label}>Message</label>
        <textarea
          id="bmNotifMessage"
          rows={3}
          value={form.message}
          onChange={handleChange("message")}
          className={`${input} resize-y`}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="bmNotifAudience" className={label}>Recipient Type / Audience</label>
        <select id="bmNotifAudience" value={form.audience} onChange={handleChange("audience")} className={input}>
          {audiences.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="bmNotifType" className={label}>Notification Type</label>
        <select id="bmNotifType" value={form.type} onChange={handleChange("type")} className={input}>
          {notificationTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className={modalBtn}>
          Cancel
        </button>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onSave(form, "Draft")}
          className={`${modalBtn} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onSave(form, "Sent")}
          className={`rounded-md px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${yellowBtn}`}
        >
          Send Notification
        </button>
      </div>
    </ModalShell>
  );
};

/* ---------------- Page ---------------- */

const NotificationsPage = () => {
  const router = useRouter();

  const [received, setReceived] = useState(initialReceived);
  const [sent, setSent] = useState(initialSent);
  const [tab, setTab] = useState(0); // 0 = Received, 1 = Sent
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState(null); // View modal wali notification
  const [deleting, setDeleting] = useState(null); // id ya "all"
  const [sendOpen, setSendOpen] = useState(false);

  const isReceived = tab === 0;
  const unread = received.reduce((n, r) => n + (r.status === "Unread" ? 1 : 0), 0);
  const tabLabels = [`Received Notifications (${unread} unread)`, "Sent Notifications"];
  const statusOptions = isReceived ? ["All", "Unread", "Read"] : ["All", "Sent", "Draft"];
  const headings = isReceived ? receivedHeadings : sentHeadings;

  const handleTab = (i) => {
    setTab(i);
    setSearch("");
    setStatus("All");
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // View: modal kholo, received ho to Read mark kar do
  const handleView = (item) => {
    setViewing(item);
    if (isReceived) {
      setReceived(received.map((r) => (r.id === item.id ? { ...r, status: "Read" } : r)));
    }
  };

  // Mark All as Read
  const handleMarkAll = () => setReceived(received.map((r) => ({ ...r, status: "Read" })));

  // Delete / Delete All: pehle confirmation, phir confirm par hatao
  const handleDeleteConfirm = () => {
    if (deleting === "all") {
      setReceived([]);
    } else if (isReceived) {
      setReceived(received.filter((r) => r.id !== deleting));
    } else {
      setSent(sent.filter((s) => s.id !== deleting));
    }
    setDeleting(null);
  };

  // Send New Notification: Sent ya Draft ke taur par sent list mein jodo
  const handleSave = (form, saveStatus) => {
    const now = new Date();
    const day = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });

    setSent([
      {
        id: Date.now(),
        title: form.title.trim(),
        message: form.message.trim(),
        type: form.type,
        audience: form.audience,
        date: `${day}, ${time} UTC`,
        status: saveStatus,
      },
      ...sent,
    ]);
    setSendOpen(false);
    handleTab(1);
  };

  // Open Related Dispute: disputes page par jao, wahan wohi dispute ka chat khulega
  const handleOpenDispute = (id) => router.push(`/admin/disputes?dispute=${id}`);

  // 1) Search aur dropdown dono par poore utre hue notifications chuno
  const list = isReceived ? received : sent;
  const visible = list.reduce((all, n) => {
    const matchSearch = `${n.title} ${n.message} ${n.type} ${n.sender || n.audience}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "All" || n.status === status;
    return matchSearch && matchStatus ? [...all, n] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Notifications</h1>

      {/* Tabs */}
      <div className="mt-5 overflow-x-auto">
        <div className="inline-flex gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
          {tabLabels.map((text, i) => (
            <button
              key={text}
              type="button"
              onClick={() => handleTab(i)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors sm:px-4 ${
                tab === i
                  ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                  : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Top buttons */}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        {isReceived ? (
          <>
            <button type="button" onClick={() => setDeleting("all")} className={topBtn}>
              <Trash2 size={16} />
              Delete All
            </button>
            <button type="button" onClick={handleMarkAll} className={topBtn}>
              <CheckCheck size={16} />
              Mark All as Read
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setSendOpen(true)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${yellowBtn}`}
          >
            <Send size={16} />
            Send New Notification
          </button>
        )}
      </div>

      {/* Card */}
      <div className="mt-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
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
            aria-label="Status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className={`w-full text-left text-sm ${isReceived ? "min-w-[1000px]" : "min-w-[860px]"}`}>
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {headings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      {h}
                      {sortable.includes(h) && <ArrowUpDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((n) => (
                <tr key={n.id} className="border-t border-[color:var(--border-color)]">
                  {/* Unread title bold */}
                  <td className={`max-w-[260px] px-4 py-3 text-[color:var(--primary-text)] ${n.status === "Read" ? "" : "font-semibold"}`}>
                    {n.title}
                  </td>
                  <td className={`max-w-[300px] ${cell}`}>{n.message}</td>
                  <td className={cell}>{isReceived ? n.type : n.audience}</td>
                  {isReceived && <td className={cell}>{n.sender}</td>}
                  <td className={cell}>{n.date}</td>
                  <td className="px-4 py-3"><Badge status={n.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleView(n)} className={btn}>View</button>
                      <button
                        type="button"
                        onClick={() => setDeleting(n.id)}
                        className={`inline-flex items-center gap-1.5 text-red-600 ${btn}`}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
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

      {/* Modals */}
      {viewing && (
        <ViewModal
          item={viewing}
          isReceived={isReceived}
          onClose={() => setViewing(null)}
          onOpenDispute={handleOpenDispute}
        />
      )}
      {deleting && (
        <DeleteModal all={deleting === "all"} onCancel={() => setDeleting(null)} onConfirm={handleDeleteConfirm} />
      )}
      {sendOpen && <SendModal onClose={() => setSendOpen(false)} onSave={handleSave} />}
    </section>
  );
};

export default NotificationsPage;
