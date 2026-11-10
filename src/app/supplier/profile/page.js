"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Lock, ShieldCheck, Upload, X } from "lucide-react";

// ========== DATA ==========
const BM_TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Business Information" },
  { id: 3, label: "Security" },
  { id: 4, label: "Notifications" },
  { id: 5, label: "Get Verified (KYC)" },
];

// Business form ki shuruati values
const BM_START_BUSINESS = {
  shopName: "Al-Madina Building Materials",
  ownerName: "Muhammad Usman",
  phone: "0300-1234567",
  email: "supplier@demo.com",
  address: "G.T. Road, Gujranwala",
  description: "Bricks, cement, saria aur reused construction materials ke trusted supplier — 15 saal se.",
};

const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

// Modal ke upload fields. required = true wale lazmi hain.
const BM_KYC_FIELDS = [
  { id: 1, key: "idFront", label: "Identity card front", required: true },
  { id: 2, key: "idBack", label: "Identity card back", required: true },
  { id: 3, key: "licence", label: "Shop / business licence", required: true },
  { id: 4, key: "support", label: "Supporting documents (optional)", required: false },
];

export default function SupplierProfilePage() {
  // ===== State =====
  const [activeTab, setActiveTab] = useState("Profile");
  const [business, setBusiness] = useState(BM_START_BUSINESS);
  const [passwords, setPasswords] = useState(BM_EMPTY_PASSWORDS);
  const [passwordError, setPasswordError] = useState("");
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState("Pending Verification");
  const [isKycOpen, setIsKycOpen] = useState(false);
  const [kycFiles, setKycFiles] = useState({}); // { idFront: "naam.jpg", ... }
  const [avatar, setAvatar] = useState(null);
  const [toast, setToast] = useState("");

  // ===== Helpers =====
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  // Lazmi 3 files chun li hain? (Submit button tabhi chalega)
  const isKycReady = BM_KYC_FIELDS.filter((f) => f.required).every((f) => kycFiles[f.key]);

  // ===== Handlers =====
  const handleTabClick = (label) => setActiveTab(label);

  // Profile picture
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  // Business form
  const handleBusinessChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const handleBusinessSave = (e) => {
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
    setPasswords(BM_EMPTY_PASSWORDS);
    showToast("Password updated");
  };

  const handleResetDemo = () => {
    setBusiness(BM_START_BUSINESS);
    setPasswords(BM_EMPTY_PASSWORDS);
    setPasswordError("");
    setInApp(true);
    setEmail(false);
    setVerifyStatus("Pending Verification");
    setKycFiles({});
    setAvatar(null);
    showToast("Demo data reset");
  };

  // Notifications switches
  const handleToggleInApp = () => setInApp(!inApp);
  const handleToggleEmail = () => setEmail(!email);

  // KYC modal
  const handleOpenKyc = () => setIsKycOpen(true);
  const handleCloseKyc = () => setIsKycOpen(false);

  const handleKycFile = (key, e) => {
    const file = e.target.files[0];
    if (file) setKycFiles({ ...kycFiles, [key]: file.name });
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (!isKycReady) return;
    setVerifyStatus("Under Review");
    setIsKycOpen(false);
    showToast("Verification request submitted");
  };

  // ===== Common classes (dobara dobara na likhni paray) =====
  const inputClass =
    "bmProfile-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";
  const labelClass =
    "bmProfile-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]";
  const yellowBtn =
    "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";
  const whiteBtn =
    "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";

  // Verification chip ka rang
  const chipClass =
    verifyStatus === "Under Review"
      ? "bg-blue-100 text-blue-600"
      : "bg-orange-100 text-orange-500";

  return (
    <main className="bmProfile-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="bmProfile-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        My Profile &amp; Settings
      </h1>

      {/* ----- Tabs ----- */}
      <div className="bmProfile-tabs mt-6 flex flex-wrap gap-2">
        {BM_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.label)}
            className={`bmProfile-tabBtn cursor-pointer rounded-md border px-4 py-2 text-xs font-[family-name:Poppins-Medium] shadow-sm transition-colors duration-300 sm:text-sm ${
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
        <section className="bmProfile-profile mt-8">
          {/* Avatar: yellow gol, neeche camera */}
          <label className="bmProfile-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)]">
            {avatar ? (
              <Image src={avatar} alt="Profile" fill unoptimized className="object-cover" />
            ) : (
              <span className="font-[family-name:Baloo2-Bold] text-4xl text-[color:var(--primary-text)]">
                {business.shopName.charAt(0)}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
              <Camera size={14} />
            </span>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>

          <h2 className="mt-5 break-words text-xl text-[color:var(--primary-text)] sm:text-2xl">
            {business.shopName}
          </h2>
          <p className="mt-4 text-[color:var(--primary-text)]">{business.ownerName}</p>
          <p className="mt-4 break-words text-[color:var(--primary-text)]">
            {business.email} · {business.phone}
          </p>
          <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${chipClass}`}>
            {verifyStatus}
          </span>
        </section>
      )}

      {/* ================= TAB 2: Business Information (form) ================= */}
      {activeTab === "Business Information" && (
        <section className="bmProfile-business mt-8 max-w-3xl">
          <h2 className="text-lg text-[color:var(--primary-text)]">Business Information</h2>

          <form onSubmit={handleBusinessSave} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Shop Name</label>
                <input name="shopName" value={business.shopName} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Owner Name</label>
                <input name="ownerName" value={business.ownerName} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input name="phone" value={business.phone} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input name="email" type="email" value={business.email} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Shop Address / Location</label>
                <input name="address" value={business.address} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Business Description</label>
                <textarea name="description" rows={3} value={business.description} onChange={handleBusinessChange} className={inputClass} />
              </div>
            </div>

            <button type="submit" className={`${yellowBtn} mt-5`}>
              Save Changes
            </button>
          </form>
        </section>
      )}

      {/* ================= TAB 3: Security (form) ================= */}
      {activeTab === "Security" && (
        <section className="bmProfile-security mt-8 max-w-3xl">
          <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
            <Lock size={18} />
            Security
          </h2>

          <form onSubmit={handlePasswordSubmit} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Current Password</label>
                <input name="current" type="password" value={passwords.current} onChange={handlePasswordChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>New Password</label>
                <input name="next" type="password" value={passwords.next} onChange={handlePasswordChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Confirm Password</label>
                <input name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordChange} required className={inputClass} />
              </div>
            </div>

            {passwordError && (
              <p className="mt-3 text-sm text-red-600">{passwordError}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button type="submit" className={yellowBtn}>
                Update Password
              </button>
              <button type="button" onClick={handleResetDemo} className={whiteBtn}>
                Reset Demo Data
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ================= TAB 4: Notifications ================= */}
      {activeTab === "Notifications" && (
        <section className="bmProfile-notifications mt-8 max-w-xl">
          <h2 className="text-lg text-[color:var(--primary-text)]">Notifications</h2>

          {/* In-app */}
          <div className="mt-4 flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4">
            <p className="text-[color:var(--primary-text)]">
              In-app notifications{" "}
              <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
                {inApp ? "On" : "Off"}
              </span>
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={inApp}
              aria-label="In-app notifications"
              onClick={handleToggleInApp}
              className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
                inApp ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--white-cards)] shadow transition-all duration-300 ${
                  inApp ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4">
            <p className="text-[color:var(--primary-text)]">
              Email notifications{" "}
              <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
                {email ? "On" : "Off"}
              </span>
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={email}
              aria-label="Email notifications"
              onClick={handleToggleEmail}
              className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
                email ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--white-cards)] shadow transition-all duration-300 ${
                  email ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </section>
      )}

      {/* ================= TAB 5: Get Verified (KYC) ================= */}
      {activeTab === "Get Verified (KYC)" && (
        <section className="bmProfile-kyc mt-8">
          <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
            <ShieldCheck size={20} />
            Business Verification
          </h2>

          <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${chipClass}`}>
            {verifyStatus}
          </span>

          {verifyStatus === "Pending Verification" && (
            <div className="mt-4">
              <button type="button" onClick={handleOpenKyc} className={yellowBtn}>
                Get Verified
              </button>
            </div>
          )}
        </section>
      )}

      {/* ===== Toast ===== */}
      {toast && (
        <div className="bmProfile-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* ===== Get Verified modal (form isi page mein) ===== */}
      {isKycOpen && (
        <div className="bmProfile-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bmProfile-modal max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[var(--white-cards)] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
              <h2 className="text-xl text-[color:var(--primary-text)]">Get Verified</h2>
              <button type="button" onClick={handleCloseKyc} aria-label="Close" className="cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]">
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm text-[color:var(--secondary-text)]">
              Upload documents that help verify your identity and business.
            </p>

            <form onSubmit={handleKycSubmit} className="mt-5">
              <div className="flex flex-col gap-5">
                {BM_KYC_FIELDS.map((field) => (
                  <div key={field.id}>
                    <p className="mb-2 text-sm text-[color:var(--primary-text)]">{field.label}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]">
                        <Upload size={16} />
                        Upload File
                        <input
                          type="file"
                          onChange={(e) => handleKycFile(field.key, e)}
                          className="hidden"
                        />
                      </label>

                      {kycFiles[field.key] && (
                        <span className="min-w-0 max-w-full truncate text-xs text-[color:var(--secondary-text)]">
                          {kycFiles[field.key]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Lazmi files na hon to button halka aur band rehta hai */}
              <button
                type="submit"
                disabled={!isKycReady}
                className="mt-6 cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--primary-yellow)]"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}