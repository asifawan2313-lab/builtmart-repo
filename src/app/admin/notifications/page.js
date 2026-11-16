"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, Eye, FileWarning, MessageSquare, Package, Send, ShieldCheck, Trash2, Wallet, X } from "lucide-react";

/* ---------------- Datasets (demo) ---------------- */

// Har type ka icon
const typeIcon = {
  dispute: FileWarning,
  support: MessageSquare,
  verification: ShieldCheck,
  topup: Wallet,
  order: Package,
  announcement: Bell,
  report: MessageSquare,
  system: Bell,
};

const initialReceived = [
  { id: 1, type: "dispute", title: "New supplier dispute TKT-302", text: "Brick House reported a refused COD delivery.", time: "2 hours ago", read: false },
  { id: 2, type: "dispute", title: "Dispute TKT-303 needs review", text: "Bilal Khan is waiting for a paid order to be dispatched.", time: "5 hours ago", read: false },
  { id: 3, type: "topup", title: "New top-up request TX-5009", text: "Ali Raza requested a Rs 3,000 wallet top-up.", time: "Yesterday", read: false },
  { id: 4, type: "verification", title: "Supplier documents awaiting review", text: "Tile City submitted documents for verification.", time: "Yesterday", read: true },
  { id: 5, type: "support", title: "New support request SUP-201", text: "Ghulam Rasool cannot update his profile photo.", time: "2 days ago", read: true },
  { id: 6, type: "order", title: "Order ORD-1010 placed", text: "A new order is waiting for supplier confirmation.", time: "3 days ago", read: true },
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
const pills = ["All", "Unread", "Read"];
const sentPills = ["All", "Sent", "Draft"];
const audiences = ["All Users", "Customers", "Suppliers", "Riders", "Labour", "Sub-Admins"];
const notificationTypes = ["Announcement", "Dispute", "Report", "Order", "Verification", "System"];

const emptyForm = { title: "", message: "", audience: audiences[0], type: notificationTypes[0] };

/* ---------------- Shared styles ---------------- */

const badgeColors = {
  Sent: "bg-green-50 text-green-700 ring-green-200",
  Draft: "bg-orange-50 text-orange-600 ring-orange-200",
};

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const topBtn =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 text-sm text-[color:var(--primary-text)] transition-colors hover:border-[color:var(--primary-yellow)] hover:bg-[var(--primary-yellow)]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[color:var(--border-color)] disabled:hover:bg-[var(--white-cards)]";
const iconBtn =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] transition-colors hover:border-[color:var(--primary-yellow)] hover:bg-[var(--primary-yellow)]/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[color:var(--border-color)] disabled:hover:bg-[var(--white-cards)]";
const modalBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn = "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const input =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const label = "mb-1.5 block text-sm text-[color:var(--secondary-text)]";

/* ---------------- Small shared pieces ---------------- */

const Badge = ({ status }) => (
  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[status]}`}>{status}</span>
);

// Overlay + heading + subtitle + close icon: sab modals yahi use karte hain
const ModalShell = ({ title, subtitle, onClose, children }) => (
  <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
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

/* ---------------- Page ---------------- */

const NotificationsPage = () => {
  const [received, setReceived] = useState(initialReceived);
  const [sent, setSent] = useState(initialSent);
  const [tab, setTab] = useState(0); // 0 = Received, 1 = Sent
  const [pill, setPill] = useState("All"); // Received: All / Unread / Read
  const [sentPill, setSentPill] = useState("All"); // Sent: All / Sent / Draft
  const [viewing, setViewing] = useState(null); // Sent ka View modal
  const [deleting, setDeleting] = useState(null); // { scope: "received" | "sent" | "all", id }
  const [sendOpen, setSendOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const isReceived = tab === 0;
  const unread = received.reduce((n, r) => (r.read ? n : n + 1), 0);
  const tabLabels = [`Received Notifications (${unread} unread)`, "Sent Notifications"];
  const readCount = received.length - unread;
  const receivedCount = { All: received.length, Unread: unread, Read: readCount };
  const sentCount = sent.reduce((c, n) => ({ ...c, [n.status]: c[n.status] + 1 }), { All: sent.length, Sent: 0, Draft: 0 });

  const visibleReceived = received.reduce((all, n) => {
    const match = pill === "All" || (pill === "Unread" ? !n.read : n.read);
    return match ? [...all, n] : all;
  }, []);
  const visibleSent = sent.reduce((all, n) => (sentPill === "All" || n.status === sentPill ? [...all, n] : all), []);

  // ---- Tabs ----
  const handleTab = (i) => {
    setTab(i);
    setPill("All");
    setSentPill("All");
  };

  // ---- Received: read / delete ----
  const handleRead = (id) => setReceived(received.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const handleReadAll = () => setReceived(received.map((n) => ({ ...n, read: true })));

  // ---- Delete: pehle confirmation, phir confirm par hatao ----
  const handleDeleteConfirm = () => {
    if (deleting.scope === "all") {
      setReceived([]);
    } else if (deleting.scope === "received") {
      setReceived(received.reduce((all, n) => (n.id === deleting.id ? all : [...all, n]), []));
    } else {
      setSent(sent.reduce((all, n) => (n.id === deleting.id ? all : [...all, n]), []));
    }
    setDeleting(null);
  };

  // ---- Send New Notification (form isi page mein) ----
  const handleOpenSend = () => {
    setForm(emptyForm);
    setSendOpen(true);
  };
  const handleCloseSend = () => setSendOpen(false);
  const handleFormChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = (saveStatus) => {
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

  const isEmpty = form.title.trim() === "";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Notifications</h1>

      {/* Main tabs */}
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

      {/* ================= RECEIVED: list ================= */}
      {isReceived && (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            {/* All / Unread */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Notification filter">
              {pills.map((name) => {
                const active = pill === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setPill(name)}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm text-[color:var(--primary-text)] transition-colors ${
                      active
                        ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)]"
                        : "border-[color:var(--border-color)] bg-[var(--white-cards)] hover:border-[color:var(--primary-yellow)]"
                    }`}
                  >
                    {name}
                    <span className={`min-w-5 rounded-full px-1.5 text-[11px] leading-5 ${active ? "bg-[var(--white-cards)]" : "bg-[var(--off-white-background)]"}`}>
                      {receivedCount[name]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={handleReadAll} disabled={unread === 0} className={topBtn}>
                <CheckCheck size={16} aria-hidden="true" />
                Mark All Read
              </button>
              <button type="button" onClick={() => setDeleting({ scope: "all" })} disabled={received.length === 0} className={topBtn}>
                <Trash2 size={16} aria-hidden="true" />
                Delete All
              </button>
            </div>
          </div>

          {visibleReceived.length === 0 ? (
            <section className="mt-4 rounded-xl border-2 border-dashed border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-12 text-center text-sm text-[color:var(--secondary-text)]">
              No notifications yet.
            </section>
          ) : (
            <section className="mt-4 overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
              {visibleReceived.map(({ id, type, title, text, time, read }) => {
                const Icon = typeIcon[type] || Bell;
                return (
                  <div
                    key={id}
                    className={`flex items-start gap-2 border-t border-[color:var(--border-color)] px-4 py-4 transition-colors first:border-t-0 hover:bg-[var(--off-white-background)] sm:px-5 ${
                      read ? "bg-[var(--white-cards)]" : "bg-[var(--primary-yellow)]/10"
                    }`}
                  >
                    {/* Click karne se sirf read hoti hai */}
                    <button type="button" onClick={() => handleRead(id)} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--off-white-background)] text-[color:var(--primary-text)]">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm text-[color:var(--primary-text)] ${read ? "" : "font-semibold"}`}>{title}</p>
                        <p className="mt-0.5 text-xs text-[color:var(--secondary-text)]">{text}</p>
                        <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">{time}</p>
                      </div>
                      {!read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary-yellow)]" aria-label="Unread" />}
                    </button>

                    <div className="flex shrink-0 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleRead(id)}
                        disabled={read}
                        aria-label="Mark as read"
                        title="Mark as read"
                        className={iconBtn}
                      >
                        <Check size={15} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting({ scope: "received", id })}
                        aria-label="Delete notification"
                        title="Delete"
                        className={iconBtn}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </>
      )}

      {/* ================= SENT: list (Received jaisa design) ================= */}
      {!isReceived && (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sent filter">
              {sentPills.map((name) => {
                const active = sentPill === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSentPill(name)}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm text-[color:var(--primary-text)] transition-colors ${
                      active
                        ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)]"
                        : "border-[color:var(--border-color)] bg-[var(--white-cards)] hover:border-[color:var(--primary-yellow)]"
                    }`}
                  >
                    {name}
                    <span className={`min-w-5 rounded-full px-1.5 text-[11px] leading-5 ${active ? "bg-[var(--white-cards)]" : "bg-[var(--off-white-background)]"}`}>
                      {sentCount[name]}
                    </span>
                  </button>
                );
              })}
            </div>

            <button type="button" onClick={handleOpenSend} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${yellowBtn}`}>
              <Send size={16} />
              Send New Notification
            </button>
          </div>

          {visibleSent.length === 0 ? (
            <section className="mt-4 rounded-xl border-2 border-dashed border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-12 text-center text-sm text-[color:var(--secondary-text)]">
              No notifications found.
            </section>
          ) : (
            <section className="mt-4 overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
              {visibleSent.map((n) => {
                const Icon = typeIcon[n.type.toLowerCase()] || Bell;
                return (
                  <div
                    key={n.id}
                    className="flex items-start gap-2 border-t border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-4 transition-colors first:border-t-0 hover:bg-[var(--off-white-background)] sm:px-5"
                  >
                    {/* Click karne se View modal khulta hai */}
                    <button type="button" onClick={() => setViewing(n)} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--off-white-background)] text-[color:var(--primary-text)]">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[color:var(--primary-text)]">{n.title}</p>
                        <p className="mt-0.5 text-xs text-[color:var(--secondary-text)]">{n.message}</p>
                        <p className="mt-1 text-[11px] text-[color:var(--secondary-text)]">
                          To: {n.audience} · {n.date}
                        </p>
                      </div>
                      <Badge status={n.status} />
                    </button>

                    <div className="flex shrink-0 gap-1.5">
                      <button type="button" onClick={() => setViewing(n)} aria-label="View notification" title="View" className={iconBtn}>
                        <Eye size={15} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting({ scope: "sent", id: n.id })}
                        aria-label="Delete notification"
                        title="Delete"
                        className={iconBtn}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </>
      )}

      {/* ================= View modal (Sent) ================= */}
      {viewing && (
        <ModalShell title={viewing.title} subtitle="Sent notification" onClose={() => setViewing(null)}>
          <p className="mt-5 text-sm text-[color:var(--primary-text)]">{viewing.message}</p>
          <p className="mt-4 text-sm text-[color:var(--primary-text)]">Type: {viewing.type}</p>
          <p className="mt-4 text-sm text-[color:var(--primary-text)]">Recipients / Audience: {viewing.audience}</p>
          <p className="mt-4 text-sm text-[color:var(--secondary-text)]">{viewing.date}</p>
          <div className="mt-4">
            <Badge status={viewing.status} />
          </div>
          <div className="mt-6 flex justify-end border-t border-[color:var(--border-color)] pt-4">
            <button type="button" onClick={() => setViewing(null)} className={modalBtn}>
              Close
            </button>
          </div>
        </ModalShell>
      )}

      {/* ================= Delete confirmation modal ================= */}
      {deleting && (
        <ModalShell title={deleting.scope === "all" ? "Delete All Notifications?" : "Delete Notification?"} onClose={() => setDeleting(null)}>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
            {deleting.scope === "all"
              ? "All received notifications will be deleted. This cannot be undone."
              : "Only this selected notification will be deleted. This cannot be undone."}
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setDeleting(null)} className={modalBtn}>
              Cancel
            </button>
            <button type="button" onClick={handleDeleteConfirm} className="rounded-md bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700">
              Confirm Delete
            </button>
          </div>
        </ModalShell>
      )}

      {/* ================= Send New Notification modal (form isi page mein) ================= */}
      {sendOpen && (
        <ModalShell title="Send New Notification" subtitle="New notification" onClose={handleCloseSend}>
          <div className="mt-5">
            <label htmlFor="bmNotifTitle" className={label}>
              Notification Title
            </label>
            <input id="bmNotifTitle" type="text" autoFocus value={form.title} onChange={handleFormChange("title")} className={input} />
          </div>

          <div className="mt-4">
            <label htmlFor="bmNotifMessage" className={label}>
              Message
            </label>
            <textarea id="bmNotifMessage" rows={3} value={form.message} onChange={handleFormChange("message")} className={`${input} resize-y`} />
          </div>

          <div className="mt-4">
            <label htmlFor="bmNotifAudience" className={label}>
              Recipient Type / Audience
            </label>
            <select id="bmNotifAudience" value={form.audience} onChange={handleFormChange("audience")} className={input}>
              {audiences.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="bmNotifType" className={label}>
              Notification Type
            </label>
            <select id="bmNotifType" value={form.type} onChange={handleFormChange("type")} className={input}>
              {notificationTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={handleCloseSend} className={modalBtn}>
              Cancel
            </button>
            <button type="button" disabled={isEmpty} onClick={() => handleSave("Draft")} className={`${modalBtn} disabled:cursor-not-allowed disabled:opacity-50`}>
              Save draft
            </button>
            <button
              type="button"
              disabled={isEmpty}
              onClick={() => handleSave("Sent")}
              className={`rounded-md px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${yellowBtn}`}
            >
              Send Notification
            </button>
          </div>
        </ModalShell>
      )}
    </section>
  );
};

export default NotificationsPage;