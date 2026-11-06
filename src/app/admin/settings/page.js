"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  BrickWall,
  Package,
  Hourglass,
  Mountain,
  Construction,
  LayoutGrid,
  PaintBucket,
  DoorOpen,
  PanelTop,
  Fence,
  Recycle,
} from "lucide-react";

/* ------------------------------------------------------------------
   1) Simple data (har item ka apna unique id)
------------------------------------------------------------------ */

// Form ki shuru ki values (Reset demo data dabane par yehi wapas aati hain)
const BM_START_FORM = {
  name: "Super Admin",
  email: "admin@buildmart.pk",
  platformName: "BuildMart",
  tagline: "Construction Material Management & Comparison",
  phone: "042-111-BUILD",
  supportEmail: "support@buildmart.pk",
  commission: "5",
};

const BM_START_NOTIFICATIONS = [
  { id: 1, label: "Order updates", on: true },
  { id: 2, label: "Dispute activity", on: true },
  { id: 3, label: "Supplier verification", on: true },
];

const BM_START_CATEGORIES = [
  { id: 1, label: "Bricks", icon: BrickWall, on: true },
  { id: 2, label: "Cement", icon: Package, on: true },
  { id: 3, label: "Sand / Rait", icon: Hourglass, on: true },
  { id: 4, label: "Bajri", icon: Mountain, on: true },
  { id: 5, label: "Steel / Saria", icon: Construction, on: true },
  { id: 6, label: "Tiles", icon: LayoutGrid, on: true },
  { id: 7, label: "Paint", icon: PaintBucket, on: true },
  { id: 8, label: "Doors & Windows", icon: DoorOpen, on: true },
  { id: 9, label: "Ceiling Materials", icon: PanelTop, on: true },
  { id: 10, label: "Grills & Iron Railings", icon: Fence, on: true },
  { id: 11, label: "Reusable Materials", icon: Recycle, on: true },
];

const BM_ORDER_STATUSES = [
  { id: 1, label: "Pending" },
  { id: 2, label: "Confirmed" },
  { id: 3, label: "Processing" },
  { id: 4, label: "Ready for Dispatch" },
  { id: 5, label: "In Transit" },
  { id: 6, label: "Delivered" },
  { id: 7, label: "Cancelled" },
  { id: 8, label: "Returned" },
];

const BM_DELIVERY_STATUSES = [
  { id: 1, label: "Unassigned" },
  { id: 2, label: "Pickup" },
  { id: 3, label: "On the Way" },
  { id: 4, label: "Delivered" },
  { id: 5, label: "Failed" },
  { id: 6, label: "Returned" },
];

/* ------------------------------------------------------------------
   2) Chhote helpers (isi file ke andar)
------------------------------------------------------------------ */

// Label aur input ki styling
const labelClass = "mb-1 block text-xs text-[color:var(--secondary-text)]";
const fieldClass =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] focus:ring-1 focus:ring-[color:var(--primary-yellow)] disabled:cursor-not-allowed disabled:bg-[var(--off-white-background)] disabled:text-[color:var(--secondary-text)]";

// Safed card (naam upar, andar ka content neeche)
const SettingsCard = ({ title, children }) => {
  return (
    <section
      aria-label={title}
      className="bm-adminSettings-card rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5"
    >
      <p className="text-xs font-[family-name:Poppins-Bold] tracking-wide text-[color:var(--secondary-text)] uppercase">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </section>
  );
};

// Label + input
const Field = ({ id, label, type = "text", ...rest }) => {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} type={type} className={fieldClass} {...rest} />
    </div>
  );
};

// On / Off switch
const Toggle = ({ checked, onChange, label }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-[var(--white-cards)] shadow transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
};

// Change password ka popup
const PasswordModal = ({ onClose, onSaved }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  // Esc dabane se popup band ho jaye
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Save: pehle check, phir band
  // (Asli "current password sahi hai ya nahi" ki jaanch backend ke baad hogi)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!current || !next || !confirm) {
      setError("Please fill in all fields.");
    } else if (next.length < 6) {
      setError("New password must be at least 6 characters.");
    } else if (next !== confirm) {
      setError("New password and confirm password do not match.");
    } else if (next === current) {
      setError("New password must be different from the current password.");
    } else {
      onSaved();
    }
  };

  return (
    // Dark parda: us par click karne se bhi popup band hota hai
    <div
      onClick={onClose}
      className="bm-adminSettings-overlay fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="bm-password-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bm-adminSettings-modal max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-xl bg-[var(--white-cards)] p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="bm-password-title"
            className="text-xl text-[color:var(--primary-text)]"
          >
            Change password
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[color:var(--primary-text)] hover:opacity-70"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <Field
            id="bm-current-password"
            label="Current password"
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <Field
            id="bm-new-password"
            label="New password"
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
          <Field
            id="bm-confirm-password"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-3 py-2 text-sm text-[color:var(--primary-text)]"
          >
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

/* ------------------------------------------------------------------
   3) Settings page (poora code isi page.js mein)
------------------------------------------------------------------ */
const BmAdminSettings = () => {
  const [form, setForm] = useState(BM_START_FORM);
  const [notifications, setNotifications] = useState(BM_START_NOTIFICATIONS);
  const [categories, setCategories] = useState(BM_START_CATEGORIES);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [message, setMessage] = useState(""); // chhota sa "ho gaya" ka paigham

  // Paigham 4 second baad khud hat jaye
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  // 4) Handlers
  // Koi bhi input badle: form ki value foran badal jati hai ("save automatically")
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Commission: sirf number, 0 se 100 tak
    if (name === "commission") {
      const digits = value.replace(/\D/g, "");
      const limited = digits === "" ? "" : String(Math.min(100, Number(digits)));
      setForm({ ...form, commission: limited });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleNotificationToggle = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, on: !item.on } : item
      )
    );
  };

  const handleCategoryToggle = (id) => {
    setCategories(
      categories.map((item) =>
        item.id === id ? { ...item, on: !item.on } : item
      )
    );
  };

  const handlePasswordOpen = () => {
    setIsPasswordOpen(true);
  };

  const handlePasswordClose = () => {
    setIsPasswordOpen(false);
  };

  const handlePasswordSaved = () => {
    setIsPasswordOpen(false);
    setMessage("Password changed successfully.");
  };

  // Reset demo data: pooche ga, phir sab kuch shuru ki halat par
  const handleReset = () => {
    const sure = window.confirm("Restore all settings to their original state?");
    if (!sure) return;

    setForm(BM_START_FORM);
    setNotifications(BM_START_NOTIFICATIONS);
    setCategories(BM_START_CATEGORIES);
    setMessage("Demo data has been reset.");
  };

  return (
    <section className="bm-adminSettings-root p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
        Settings
      </h1>
      <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
        Changes save automatically. There is no public admin signup.
      </p>

      {/* "Ho gaya" ka paigham */}
      {message && (
        <p
          role="status"
          className="mt-3 inline-block rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-sm text-[color:var(--charcoal-black)]"
        >
          {message}
        </p>
      )}

      {/* 8 cards: phone/tablet par aik ke neeche aik, laptop par 2 columns */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Admin Profile */}
        <SettingsCard title="Admin Profile">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              id="bm-admin-name"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
            />
            <Field
              id="bm-admin-email"
              label="Email"
              name="email"
              value={form.email}
              disabled
            />
          </div>
          <button
            type="button"
            onClick={handlePasswordOpen}
            className="bm-adminSettings-password-btn mt-4 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
          >
            Change password
          </button>
        </SettingsCard>

        {/* Platform & Branding */}
        <SettingsCard title="Platform & Branding">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              id="bm-platform-name"
              label="Platform name"
              name="platformName"
              value={form.platformName}
              onChange={handleFormChange}
            />
            <Field
              id="bm-tagline"
              label="Tagline"
              name="tagline"
              value={form.tagline}
              onChange={handleFormChange}
            />
            <Field
              id="bm-contact-phone"
              label="Contact phone"
              name="phone"
              value={form.phone}
              onChange={handleFormChange}
            />
            <Field
              id="bm-contact-email"
              label="Contact email"
              name="supportEmail"
              value={form.supportEmail}
              onChange={handleFormChange}
            />
          </div>
        </SettingsCard>

        {/* Listings & Commission */}
        <SettingsCard title="Listings & Commission">
          <div className="max-w-[140px]">
            <Field
              id="bm-commission"
              label="Platform commission %"
              name="commission"
              inputMode="numeric"
              value={form.commission}
              onChange={handleFormChange}
            />
          </div>
        </SettingsCard>

        {/* Notification Preferences */}
        <SettingsCard title="Notification Preferences">
          <ul className="flex flex-col gap-3">
            {notifications.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm text-[color:var(--primary-text)]"
              >
                {item.label}
                <Toggle
                  checked={item.on}
                  label={item.label}
                  onChange={() => handleNotificationToggle(item.id)}
                />
              </li>
            ))}
          </ul>
        </SettingsCard>

        {/* Active Categories */}
        <SettingsCard title="Active Categories">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm text-[color:var(--primary-text)]"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={16} className="shrink-0 text-[color:var(--industrial-blue-grey)]" />
                    {item.label}
                  </span>
                  <Toggle
                    checked={item.on}
                    label={item.label}
                    onChange={() => handleCategoryToggle(item.id)}
                  />
                </li>
              );
            })}
          </ul>
        </SettingsCard>

        {/* Order & Delivery Statuses */}
        <SettingsCard title="Order & Delivery Statuses">
          <p className="text-xs text-[color:var(--secondary-text)]">Order</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {BM_ORDER_STATUSES.map((item) => (
              <li
                key={item.id}
                className="rounded border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-2 py-0.5 text-[11px] text-[color:var(--secondary-text)]"
              >
                {item.label}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-[color:var(--secondary-text)]">Delivery</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {BM_DELIVERY_STATUSES.map((item) => (
              <li
                key={item.id}
                className="rounded border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-2 py-0.5 text-[11px] text-[color:var(--secondary-text)]"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </SettingsCard>

        {/* Sub-admin Permissions */}
        <SettingsCard title="Sub-admin Permissions">
          <p className="text-sm text-[color:var(--secondary-text)]">
            Create sub-admins and choose their modules under User Management →
            Sub-admins.
          </p>
          <Link
            href="/admin/users"
            className="bm-adminSettings-subadmin-link mt-4 inline-block rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Manage sub-admins
          </Link>
        </SettingsCard>

        {/* Demo Data */}
        <SettingsCard title="Demo Data">
          <p className="text-sm text-[color:var(--secondary-text)]">
            Restore all sample records to their original state.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="bm-adminSettings-reset-btn mt-4 rounded-md bg-[var(--charcoal-black)] px-3 py-1.5 text-xs font-[family-name:Poppins-Medium] text-[color:var(--white-cards)] hover:bg-[var(--industrial-blue-grey)]"
          >
            Reset demo data
          </button>
        </SettingsCard>
      </div>

      {/* Change password ka popup (sirf tab nazar aata hai jab button dabaya ho) */}
      {isPasswordOpen && (
        <PasswordModal
          onClose={handlePasswordClose}
          onSaved={handlePasswordSaved}
        />
      )}
    </section>
  );
};

export default BmAdminSettings;