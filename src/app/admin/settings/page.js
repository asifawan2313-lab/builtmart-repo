
"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Lock } from "lucide-react";

// ========== DATA ==========
const BM_TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Security" },
  { id: 3, label: "Notifications" },
];

const BM_START_FORM = {
  name: "Super Admin",
  email: "admin@buildmart.pk",
};

const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

const BM_START_NOTIFICATIONS = [
  { id: 1, label: "In-app notifications", on: true },
  { id: 2, label: "Email notifications", on: true },
  // { id: 3, label: "Supplier verification", on: true },
];

// ========== HELPER ==========
const Toggle = ({ checked, onChange, label }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
        checked ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--white-cards)] shadow transition-all duration-300 ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [form, setForm] = useState(BM_START_FORM);
  const [passwords, setPasswords] = useState(BM_EMPTY_PASSWORDS);
  const [passwordError, setPasswordError] = useState("");
  const [notifications, setNotifications] = useState(BM_START_NOTIFICATIONS);
  const [avatar, setAvatar] = useState(null);
  const [toast, setToast] = useState("");

  // ===== Helpers =====
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const handleTabClick = (label) => setActiveTab(label);

  // Profile picture
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  // Profile form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    showToast("Changes saved");
  };

  // Security form
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordError("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwords.next.length < 6) {
      setPasswordError("New password kam az kam 6 characters ka ho.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setPasswordError("New password aur Confirm password same nahi hain.");
      return;
    }

    if (passwords.next === passwords.current) {
      setPasswordError("New password purane password se alag hona chahiye.");
      return;
    }

    setPasswords(BM_EMPTY_PASSWORDS);
    setPasswordError("");
    showToast("Password updated");
  };

  // Reset Demo Data
  const handleResetDemo = () => {
    setForm(BM_START_FORM);
    setPasswords(BM_EMPTY_PASSWORDS);
    setPasswordError("");
    setNotifications(BM_START_NOTIFICATIONS);
    setAvatar(null);
    showToast("Demo data reset");
  };

  // Notification switches
  const handleNotificationToggle = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, on: !item.on } : item
      )
    );
  };

  // ===== Common classes =====
  const inputClass =
    "bmAdmin-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] disabled:cursor-not-allowed disabled:bg-[var(--off-white-background)] disabled:text-[color:var(--secondary-text)]";

  const labelClass =
    "bmAdmin-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]";

  const yellowBtn =
    "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";

  const whiteBtn =
    "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";

  return (
    <main className="bmAdmin-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="bmAdmin-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        Settings
      </h1>

      <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
        There is no public admin signup.
      </p>

      {/* ----- Tabs ----- */}
      <div className="bmAdmin-tabs mt-6 flex flex-wrap gap-2">
        {BM_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.label)}
            className={`bmAdmin-tabBtn cursor-pointer rounded-md border px-4 py-2 text-xs font-[family-name:Poppins-Medium] shadow-sm transition-colors duration-300 sm:text-sm ${
              activeTab === tab.label
                ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: Profile ================= */}
      {activeTab === "Profile" && (
        <section className="bmAdmin-profile mt-8 max-w-3xl">
          <label className="bmAdmin-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)]">
            {avatar ? (
              <Image
                src={avatar}
                alt="Profile"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="font-[family-name:Baloo2-Bold] text-4xl text-[color:var(--primary-text)]">
                {form.name.charAt(0)}
              </span>
            )}

            <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
              <Camera size={14} />
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>

          <h2 className="mt-5 break-words text-xl text-[color:var(--primary-text)] sm:text-2xl">
            {form.name}
          </h2>

          <p className="mt-2 break-words text-[color:var(--primary-text)]">
            {form.email}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
              Super Admin
            </span>
          </div>

          {/* Admin Profile form */}
          <form onSubmit={handleFormSave} className="mt-8">
            <h3 className="text-lg text-[color:var(--primary-text)]">
              Admin Profile
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  name="email"
                  value={form.email}
                  disabled
                  className={inputClass}
                />
              </div>
            </div>

            <button type="submit" className={`${yellowBtn} mt-5`}>
              Save Changes
            </button>
          </form>
        </section>
      )}

      {/* ================= TAB 2: Security ================= */}
      {activeTab === "Security" && (
        <section className="bmAdmin-security mt-8 max-w-3xl">
          <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
            <Lock size={18} />
            Security
          </h2>

          <form onSubmit={handlePasswordSubmit} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Current Password</label>
                <input
                  name="current"
                  type="password"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>New Password</label>
                <input
                  name="next"
                  type="password"
                  value={passwords.next}
                  onChange={handlePasswordChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Confirm Password</label>
                <input
                  name="confirm"
                  type="password"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {passwordError && (
              <p className="mt-3 text-sm text-red-600">{passwordError}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button type="submit" className={yellowBtn}>
                Update Password
              </button>

              <button
                type="button"
                onClick={handleResetDemo}
                className={whiteBtn}
              >
                Reset Demo Data
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ================= TAB 3: Notifications ================= */}
      {activeTab === "Notifications" && (
        <section className="bmAdmin-notifications mt-8 max-w-xl">
          <h2 className="text-lg text-[color:var(--primary-text)]">
            Notification Preferences
          </h2>

          <ul className="mt-4">
            {notifications.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4"
              >
                <p className="text-[color:var(--primary-text)]">
                  {item.label}{" "}
                  <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
                    {item.on ? "On" : "Off"}
                  </span>
                </p>

                <Toggle
                  checked={item.on}
                  label={item.label}
                  onChange={() => handleNotificationToggle(item.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== Toast ===== */}
      {toast && (
        <div className="bmAdmin-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </main>
  );
}
