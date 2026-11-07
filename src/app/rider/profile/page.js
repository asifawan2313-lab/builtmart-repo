"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Lock, ShieldCheck, Upload, X } from "lucide-react";

// ========== DATA ==========
const BM_TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Rider Information" },
  { id: 3, label: "Security" },
  { id: 4, label: "Notifications" },
  { id: 5, label: "Get Verified (KYC)" },
];

// Vehicle type ke dropdown ka data
const BM_VEHICLE_TYPES = [
  { id: 1, label: "Bike" },
  { id: 2, label: "Rickshaw" },
  { id: 3, label: "Loader / Pickup" },
  { id: 4, label: "Truck" },
];

// Rider form ki shuruati values
const BM_START_RIDER = {
  fullName: "Hamza Ali",
  phone: "0300-7654321",
  email: "rider@demo.com",
  city: "Gujranwala",
  vehicleType: "Bike",
  vehicleNumber: "GRW-1234",
  licenceNumber: "GRW-45-1234",
  address: "Model Town, Gujranwala",
  about: "Reliable delivery rider for construction materials in Gujranwala — 3 saal ka tajurba.",
};

const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

// Modal ke upload fields. required = true wale lazmi hain.
const BM_KYC_FIELDS = [
  { id: 1, key: "idFront", label: "Identity card front", required: true },
  { id: 2, key: "idBack", label: "Identity card back", required: true },
  { id: 3, key: "licence", label: "Driving licence", required: true },
  { id: 4, key: "vehicleDocs", label: "Vehicle registration / documents (optional)", required: false },
];

const RiderProfilePage = () => {
  // ===== State =====
  const [activeTab, setActiveTab] = useState("Profile");
  const [rider, setRider] = useState(BM_START_RIDER);
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

  // Lazmi files chun li hain? (Submit button tabhi chalega)
  const isKycReady = BM_KYC_FIELDS.every((f) => !f.required || kycFiles[f.key]);

  // ===== Handlers =====
  const handleTabClick = (label) => setActiveTab(label);

  // Profile picture
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  // Rider form
  const handleRiderChange = (e) => {
    setRider({ ...rider, [e.target.name]: e.target.value });
  };

  const handleRiderSave = (e) => {
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
    setRider(BM_START_RIDER);
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
    "bmRiderProfile-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";
  const labelClass =
    "bmRiderProfile-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]";
  const yellowBtn =
    "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";
  const whiteBtn =
    "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";
  const toggleTrack =
    "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300";

  // Verification chip ka rang (sirf palette ke rang)
  const chipClass =
    verifyStatus === "Under Review"
      ? "bg-[var(--industrial-blue-grey)] text-[color:var(--white-cards)]"
      : "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]";

  return (
    <main className="bmRiderProfile-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="bmRiderProfile-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        My Profile &amp; Settings
      </h1>

      {/* ----- Tabs ----- */}
      <div className="bmRiderProfile-tabs mt-6 flex flex-wrap gap-2">
        {BM_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.label)}
            className={`bmRiderProfile-tabBtn cursor-pointer rounded-md border px-4 py-2 text-xs font-[family-name:Poppins-Medium] shadow-sm transition-colors duration-300 sm:text-sm ${
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
        <section className="bmRiderProfile-profile mt-8">
          {/* Avatar: peela gol, neeche camera */}
          <label className="bmRiderProfile-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)]">
            {avatar ? (
              <Image src={avatar} alt="Profile" fill unoptimized className="object-cover" />
            ) : (
              <span className="font-[family-name:Baloo2-Bold] text-4xl text-[color:var(--primary-text)]">
                {rider.fullName.charAt(0)}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
              <Camera size={14} />
            </span>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>

          <h2 className="mt-5 break-words text-xl text-[color:var(--primary-text)] sm:text-2xl">
            {rider.fullName}
          </h2>
          <p className="mt-4 text-[color:var(--primary-text)]">
            Delivery Rider · {rider.vehicleType} · {rider.vehicleNumber}
          </p>
          <p className="mt-4 break-words text-[color:var(--primary-text)]">
            {rider.email} · {rider.phone}
          </p>
          <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${chipClass}`}>
            {verifyStatus}
          </span>
        </section>
      )}

      {/* ================= TAB 2: Rider Information (form) ================= */}
      {activeTab === "Rider Information" && (
        <section className="bmRiderProfile-info mt-8 max-w-3xl">
          <h2 className="text-lg text-[color:var(--primary-text)]">Rider Information</h2>

          <form onSubmit={handleRiderSave} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bm-rider-fullName" className={labelClass}>Full Name</label>
                <input id="bm-rider-fullName" name="fullName" value={rider.fullName} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bm-rider-phone" className={labelClass}>Phone Number</label>
                <input id="bm-rider-phone" name="phone" value={rider.phone} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bm-rider-email" className={labelClass}>Email</label>
                <input id="bm-rider-email" name="email" type="email" value={rider.email} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bm-rider-city" className={labelClass}>City</label>
                <input id="bm-rider-city" name="city" value={rider.city} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bm-rider-vehicleType" className={labelClass}>Vehicle Type</label>
                <select id="bm-rider-vehicleType" name="vehicleType" value={rider.vehicleType} onChange={handleRiderChange} className={inputClass}>
                  {BM_VEHICLE_TYPES.map((type) => (
                    <option key={type.id} value={type.label}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bm-rider-vehicleNumber" className={labelClass}>Vehicle Number</label>
                <input id="bm-rider-vehicleNumber" name="vehicleNumber" value={rider.vehicleNumber} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bm-rider-licenceNumber" className={labelClass}>Driving Licence Number</label>
                <input id="bm-rider-licenceNumber" name="licenceNumber" value={rider.licenceNumber} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bm-rider-address" className={labelClass}>Address / Service Area</label>
                <input id="bm-rider-address" name="address" value={rider.address} onChange={handleRiderChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bm-rider-about" className={labelClass}>About</label>
                <textarea id="bm-rider-about" name="about" rows={3} value={rider.about} onChange={handleRiderChange} className={inputClass} />
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
        <section className="bmRiderProfile-security mt-8 max-w-3xl">
          <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
            <Lock size={18} />
            Security
          </h2>

          <form onSubmit={handlePasswordSubmit} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="bm-rider-current" className={labelClass}>Current Password</label>
                <input id="bm-rider-current" name="current" type="password" value={passwords.current} onChange={handlePasswordChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bm-rider-next" className={labelClass}>New Password</label>
                <input id="bm-rider-next" name="next" type="password" value={passwords.next} onChange={handlePasswordChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bm-rider-confirm" className={labelClass}>Confirm Password</label>
                <input id="bm-rider-confirm" name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordChange} required className={inputClass} />
              </div>
            </div>

            {passwordError && (
              <p role="alert" className="mt-3 rounded-md border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-3 py-2 text-sm text-[color:var(--primary-text)]">
                {passwordError}
              </p>
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
        <section className="bmRiderProfile-notifications mt-8 max-w-xl">
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
              className={`${toggleTrack} ${
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
              className={`${toggleTrack} ${
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
        <section className="bmRiderProfile-kyc mt-8">
          <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
            <ShieldCheck size={20} />
            Rider Verification
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
        <div className="bmRiderProfile-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* ===== Get Verified modal (form isi page mein) ===== */}
      {isKycOpen && (
        <div className="bmRiderProfile-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bmRiderProfile-modal max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[var(--white-cards)] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
              <h2 className="text-xl text-[color:var(--primary-text)]">Get Verified</h2>
              <button type="button" onClick={handleCloseKyc} aria-label="Close" className="cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]">
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm text-[color:var(--secondary-text)]">
              Upload documents that help verify your identity and your vehicle.
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
};

export default RiderProfilePage;