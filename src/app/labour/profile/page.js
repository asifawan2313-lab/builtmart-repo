









"use client";

import { useEffect, useState } from "react";
import { Camera, Lock, Pencil, ShieldCheck, Upload, X } from "lucide-react";
import { labourCategories, labourAreas } from "../../(guest)/labour/labourData";

/* ============================================================
   DEMO DATA (sab values sirf UI ke liye hain)
   ============================================================ */

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "work", label: "Work Information" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "kyc", label: "Get Verified (KYC)" },
];

// verification admin tay karta hai: provider isay khud nahi badal sakta
const initialProfile = {
  name: "Demo Provider",
  email: "demo@example.com",
  phone: "03XX-XXXXXXX",
  address: "Demo address, Gujranwala",
  specialization: "Plumbing",
  experience: "5",
  skills: "Pipe fitting, Leak repair",
  areas: ["Demo Area A", "Demo Area B"],
  description: "Demo profile. Real description appears here once the provider adds it.",
  verification: "Pending Verification",
};

const emptyPassword = { current: "", next: "", confirm: "" };

// required = true wali files ke baghair Submit nahi hota
const documents = [
  { key: "front", label: "Identity card front", required: true },
  { key: "back", label: "Identity card back", required: true },
  { key: "skill", label: "Skill certificate or work proof (optional)", required: false },
  { key: "extra", label: "Supporting documents (optional)", required: false },
];

const preferenceRows = [
  { key: "inApp", label: "In-app notifications" },
  { key: "email", label: "Email notifications" },
];

const verificationClass = {
  Verified: "bg-green-100 text-green-800",
  Rejected: "bg-red-50 text-red-700",
  "Requires Resubmission": "bg-red-50 text-red-700",
};

// Click (focus) par border yellow hoti hai
const field =
  "h-10 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm font-normal text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";

const yellowBtn =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#FDC716] bg-[#FDC716] px-5 text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60 disabled:cursor-not-allowed disabled:opacity-50";

const outlineBtn =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#D9E3E9] bg-white px-4 text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const label = "block text-xs font-semibold text-[#565553]";

/* ============================================================
   PAGE (saare forms aur modal page ke andar hi hain)
   ============================================================ */

const LabourProfilePage = () => {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [password, setPassword] = useState(emptyPassword);
  const [prefs, setPrefs] = useState({ inApp: true, email: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState({ error: "", ok: "" });

  const fail = (error) => setNote({ error, ok: "" });
  const succeed = (ok) => setNote({ error: "", ok });

  const handleTab = (id) => {
    setTab(id);
    setNote({ error: "", ok: "" });
  };

  // Edit Profile: form ko maujooda details se bharo aur Work Information tab kholo
  const handleEditProfile = () => {
    setForm(profile);
    handleTab("work");
  };

  // Escape dabane par modal band
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsModalOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const handleToggleArea = (area) =>
    setForm((prev) => ({
      ...prev,
      areas: prev.areas.includes(area) ? prev.areas.filter((a) => a !== area) : [...prev.areas, area],
    }));

  // Work information save (simulated: sirf is page ki state mein)
  const handleSaveWork = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return fail("Please enter your name and phone number.");
    if (form.experience === "" || Number(form.experience) < 0) return fail("Please enter your experience in years.");
    if (form.areas.length === 0) return fail("Please select at least one service area.");

    setProfile({ ...profile, ...form });
    succeed("Changes saved (demo).");
  };

  const handlePassword = (e) => {
    e.preventDefault();
    const { current, next, confirm } = password;

    if (!current || !next || !confirm) return fail("Please fill all password fields.");
    if (next.length < 6) return fail("New password must be at least 6 characters.");
    if (next !== confirm) return fail("New passwords do not match.");

    setPassword(emptyPassword);
    succeed("Password updated (demo).");
  };

  // KYC: documents bhejna (simulated). Verified sirf admin karega, yahan kabhi nahi
  const handleSubmitKyc = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsModalOpen(false);
  };

  const canSubmit = documents.filter((d) => d.required).every((d) => files[d.key]);

  const message = (
    <>
      {note.error && <p role="alert" className="rounded bg-red-50 px-3 py-2 text-xs text-red-700">{note.error}</p>}
      {note.ok && <p role="status" className="rounded bg-green-50 px-3 py-2 text-xs text-green-700">{note.ok}</p>}
    </>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Profile &amp; Settings</h1>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Profile sections">
        {tabs.map(({ id, label: tabLabel }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => handleTab(id)}
            className={`h-9 cursor-pointer rounded-lg border px-4 text-sm font-semibold text-[#202124] transition-colors ${
              tab === id ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
            }`}
          >
            {tabLabel}
          </button>
        ))}
      </div>

      <section className="mt-5 rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-6">
        {/* ---------- Profile ---------- */}
        {tab === "profile" && (
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              {/* Image ki jagah: photo aane par yahan Image lagayein */}
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#D9E3E9]">
                <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[#292929]/70 text-white">
                  <Camera size={14} aria-hidden="true" />
                </span>
              </div>

              <button type="button" onClick={handleEditProfile} className={yellowBtn}>
                <Pencil size={14} aria-hidden="true" />
                Edit Profile
              </button>
            </div>

            <h2 className="mt-4 text-xl font-extrabold text-[#292929]">{profile.name}</h2>
            <p className="mt-1 text-sm text-[#565553]">{profile.specialization} · {profile.experience} years experience</p>
            <p className="mt-1 text-sm text-[#565553]">{profile.email} · {profile.phone}</p>
            <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${verificationClass[profile.verification] || "bg-[#FDC716]/25 text-[#202124]"}`}>
              {profile.verification}
            </span>
          </div>
        )}

        {/* ---------- Work Information ---------- */}
        {tab === "work" && (
          <form onSubmit={handleSaveWork} className="space-y-4">
            <h2 className="text-sm font-bold text-[#202124]">Work Information</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Full Name
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${field} mt-1`} />
              </label>
              <label className={label}>
                Phone Number
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${field} mt-1`} />
              </label>
              <label className={label}>
                Email
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${field} mt-1`} />
              </label>
              <label className={label}>
                Experience (years)
                <input type="number" min="0" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={`${field} mt-1`} />
              </label>
              <label className={label}>
                Main Specialization
                <select value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className={`${field} mt-1`}>
                  {labourCategories.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>
              <label className={label}>
                Skills (separate with commas)
                <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className={`${field} mt-1`} />
              </label>
              <label className={`${label} sm:col-span-2`}>
                Address
                <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={`${field} mt-1`} />
              </label>
            </div>

            <fieldset>
              <legend className={label}>Service areas (Gujranwala)</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {labourAreas.map((area) => (
                  <label key={area} className="flex cursor-pointer items-center gap-2 text-sm text-[#202124]">
                    <input type="checkbox" checked={form.areas.includes(area)} onChange={() => handleToggleArea(area)} className="h-4 w-4 accent-[#FDC716]" />
                    {area}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className={label}>
              Short Description
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 py-2 text-sm font-normal text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
              />
            </label>

            {message}
            <button type="submit" className={yellowBtn}>Save Changes</button>
          </form>
        )}

        {/* ---------- Security ---------- */}
        {tab === "security" && (
          <form onSubmit={handlePassword} className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#202124]">
              <Lock size={16} aria-hidden="true" />
              Security
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { key: "current", text: "Current Password" },
                { key: "next", text: "New Password" },
                { key: "confirm", text: "Confirm Password" },
              ].map(({ key, text }) => (
                <label key={key} className={label}>
                  {text}
                  <input
                    type="password"
                    value={password[key]}
                    onChange={(e) => setPassword({ ...password, [key]: e.target.value })}
                    autoComplete={key === "current" ? "current-password" : "new-password"}
                    className={`${field} mt-1`}
                  />
                </label>
              ))}
            </div>

            {message}
            <button type="submit" className={yellowBtn}>Update Password</button>
          </form>
        )}

        {/* ---------- Notifications ---------- */}
        {tab === "notifications" && (
          <div>
            <h2 className="text-sm font-bold text-[#202124]">Notifications</h2>
            <ul className="mt-3 divide-y divide-[#D9E3E9]">
              {preferenceRows.map(({ key, label: rowLabel }) => {
                const isOn = prefs[key];
                return (
                  <li key={key} className="flex items-center justify-between gap-4 py-4">
                    <p className="text-sm text-[#202124]">
                      {rowLabel} <span className="ml-1 text-xs text-[#565553]">{isOn ? "On" : "Off"}</span>
                    </p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isOn}
                      aria-label={rowLabel}
                      onClick={() => setPrefs({ ...prefs, [key]: !isOn })}
                      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${isOn ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${isOn ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ---------- Get Verified (KYC) ---------- */}
        {tab === "kyc" && (
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#202124]">
              <ShieldCheck size={18} aria-hidden="true" />
              Verification
            </h2>

            <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${verificationClass[profile.verification] || "bg-[#FDC716]/25 text-[#202124]"}`}>
              {profile.verification}
            </span>

            {submitted ? (
              <p className="mt-3 text-sm text-[#565553]">
                Your documents were submitted (demo). The admin will review them. You are marked Verified only after approval.
              </p>
            ) : (
              <div className="mt-4">
                <button type="button" onClick={() => setIsModalOpen(true)} className={yellowBtn}>
                  Get Verified
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <p className="mt-4 text-center text-xs text-[#565553]">Sample data shown for demonstration purposes.</p>

      {/* ---------- Get Verified modal ---------- */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="kyc-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmitKyc}
            className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#D9E3E9] pb-3">
              <h2 id="kyc-title" className="text-lg font-bold text-[#202124]">Get Verified</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close" className="cursor-pointer text-[#565553] hover:text-[#202124]">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-[#565553]">Upload documents that help verify your identity and skills.</p>

            {documents.map(({ key, label: docLabel }) => (
              <div key={key}>
                <p className="text-sm font-semibold text-[#202124]">{docLabel}</p>
                <label className={`${outlineBtn} mt-2 max-w-full`}>
                  <Upload size={14} aria-hidden="true" />
                  <span className="truncate">{files[key]?.name || "Upload File"}</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="sr-only"
                    onChange={(e) => setFiles({ ...files, [key]: e.target.files[0] || null })}
                  />
                </label>
              </div>
            ))}

            <button type="submit" disabled={!canSubmit} className={yellowBtn}>
              Submit Request
            </button>
            <p className="text-xs text-[#565553]">Demo only: no file is uploaded to a server.</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LabourProfilePage;