



// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Camera, CheckCircle2, FileText, Lock, ShieldCheck, Upload } from "lucide-react";

// // ========== DATA ==========
// const BM_TABS = [
//   { id: 1, label: "Profile" },
//   { id: 2, label: "Security" },
//   { id: 3, label: "Notifications" },
//   { id: 4, label: "Get Verified (KYC)" },
// ];

// // Business form ki shuruati values
// const BM_START_BUSINESS = {
//   shopName: "Al-Madina Building Materials",
//   ownerName: "Muhammad Usman",
//   phone: "0300-1234567",
//   email: "supplier@demo.com",
//   address: "G.T. Road, Gujranwala",
//   description: "Bricks, cement, saria aur reused construction materials ke trusted supplier — 15 saal se.",
// };

// const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

// // Ek hi PDF mein ye saray documents hon
// const BM_KYC_DOCUMENTS = [
//   { id: 1, label: "Identity card front", required: true },
//   { id: 2, label: "Identity card back", required: true },
//   { id: 3, label: "Shop / business licence", required: true },
//   { id: 4, label: "Supporting documents (optional)", required: false },
// ];

// const SupplierProfilePage = () => {
//   // ===== State =====
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [business, setBusiness] = useState(BM_START_BUSINESS);
//   const [passwords, setPasswords] = useState(BM_EMPTY_PASSWORDS);
//   const [passwordError, setPasswordError] = useState("");
//   const [inApp, setInApp] = useState(true);
//   const [email, setEmail] = useState(false);
//   const [verifyStatus, setVerifyStatus] = useState("Pending Verification");
//   const [kycPdf, setKycPdf] = useState(""); // chuni hui PDF ka naam
//   const [kycError, setKycError] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const [toast, setToast] = useState("");

//   // ===== Helpers =====
//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // PDF chun li hai? (Submit button tabhi chalega)
//   const isKycReady = kycPdf !== "";

//   // ===== Handlers =====
//   const handleTabClick = (label) => setActiveTab(label);

//   // Profile picture
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setAvatar(URL.createObjectURL(file));
//   };

//   // Business fields (Get Verified tab mein)
//   const handleBusinessChange = (e) => {
//     setBusiness({ ...business, [e.target.name]: e.target.value });
//   };

//   // Security form
//   const handlePasswordChange = (e) => {
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });
//     setPasswordError("");
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (passwords.next.length < 6) {
//       setPasswordError("New password kam az kam 6 characters ka ho.");
//       return;
//     }
//     if (passwords.next !== passwords.confirm) {
//       setPasswordError("New password aur Confirm password same nahi hain.");
//       return;
//     }
//     setPasswords(BM_EMPTY_PASSWORDS);
//     showToast("Password updated");
//   };

//   const handleResetDemo = () => {
//     setBusiness(BM_START_BUSINESS);
//     setPasswords(BM_EMPTY_PASSWORDS);
//     setPasswordError("");
//     setInApp(true);
//     setEmail(false);
//     setVerifyStatus("Pending Verification");
//     setKycPdf("");
//     setKycError("");
//     setAvatar(null);
//     showToast("Demo data reset");
//   };

//   // Notifications switches
//   const handleToggleInApp = () => setInApp(!inApp);
//   const handleToggleEmail = () => setEmail(!email);

//   // KYC: sirf aik PDF chunni hai
//   const handleKycFile = (e) => {
//     const file = e.target.files[0];
//     e.target.value = ""; // wahi file dobara chunni ho to bhi chale
//     if (!file) return;
//     if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
//       setKycPdf("");
//       setKycError("Sirf PDF file upload karein.");
//       return;
//     }
//     setKycError("");
//     setKycPdf(file.name);
//   };

//   const handleKycRemove = () => setKycPdf("");

//   // KYC: Submit Request (form submit)
//   const handleKycSubmit = (e) => {
//     e.preventDefault();
//     if (!isKycReady) return;
//     setVerifyStatus("Under Review");
//     showToast("Verification request submitted");
//   };

//   // ===== Common classes (dobara dobara na likhni paray) =====
//   const inputClass =
//     "bmProfile-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";
//   const labelClass =
//     "bmProfile-label mb-1.5 block text-sm text-[color:var(--primary-text)]";
//   const yellowBtn =
//     "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";
//   const whiteBtn =
//     "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2.5 text-sm text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";

//   // Verification chip ka rang
//   const chipClass =
//     verifyStatus === "Under Review"
//       ? "bg-blue-100 text-blue-600"
//       : "bg-orange-100 text-orange-500";

//   return (
//     <main className="bmProfile-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       <h1 className="bmProfile-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//         My Profile &amp; Settings
//       </h1>

//       {/* ----- Tabs ----- */}
//       <div className="bmProfile-tabs mt-6 flex flex-wrap gap-2">
//         {BM_TABS.map((tab) => (
//           <button
//             key={tab.id}
//             type="button"
//             onClick={() => handleTabClick(tab.label)}
//             className={`bmProfile-tabBtn cursor-pointer rounded-md border px-4 py-2 text-xs shadow-sm transition-colors duration-300 sm:text-sm ${
//               activeTab === tab.label
//                 ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
//                 : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* ================= TAB 1: Profile ================= */}
//       {activeTab === "Profile" && (
//         <section className="bmProfile-profile mt-8">
//           {/* Avatar: yellow gol, neeche camera */}
//           <label className="bmProfile-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)]">
//             {avatar ? (
//               <Image src={avatar} alt="Profile" fill unoptimized className="object-cover" />
//             ) : (
//               <span className="text-4xl text-[color:var(--primary-text)]">
//                 {business.shopName.charAt(0)}
//               </span>
//             )}
//             <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
//               <Camera size={14} />
//             </span>
//             <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
//           </label>

//           <h2 className="mt-5 break-words text-xl text-[color:var(--primary-text)] sm:text-2xl">
//             {business.shopName}
//           </h2>
//           <p className="mt-4 text-[color:var(--primary-text)]">{business.ownerName}</p>
//           <p className="mt-4 break-words text-[color:var(--primary-text)]">
//             {business.email} · {business.phone}
//           </p>
//           <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs ${chipClass}`}>
//             {verifyStatus}
//           </span>
//         </section>
//       )}

//       {/* ================= TAB 2: Security (form) ================= */}
//       {activeTab === "Security" && (
//         <section className="bmProfile-security mt-8 max-w-3xl">
//           <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
//             <Lock size={18} />
//             Security
//           </h2>

//           <form onSubmit={handlePasswordSubmit} className="mt-4">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <div>
//                 <label className={labelClass}>Current Password</label>
//                 <input name="current" type="password" value={passwords.current} onChange={handlePasswordChange} required className={inputClass} />
//               </div>
//               <div>
//                 <label className={labelClass}>New Password</label>
//                 <input name="next" type="password" value={passwords.next} onChange={handlePasswordChange} required className={inputClass} />
//               </div>
//               <div>
//                 <label className={labelClass}>Confirm Password</label>
//                 <input name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordChange} required className={inputClass} />
//               </div>
//             </div>

//             {passwordError && (
//               <p className="mt-3 text-sm text-red-600">{passwordError}</p>
//             )}

//             <div className="mt-4 flex flex-wrap gap-3">
//               <button type="submit" className={yellowBtn}>
//                 Update Password
//               </button>
//               <button type="button" onClick={handleResetDemo} className={whiteBtn}>
//                 Reset Demo Data
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* ================= TAB 3: Notifications ================= */}
//       {activeTab === "Notifications" && (
//         <section className="bmProfile-notifications mt-8 max-w-xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Notifications</h2>

//           {/* In-app */}
//           <div className="mt-4 flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4">
//             <p className="text-[color:var(--primary-text)]">
//               In-app notifications{" "}
//               <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
//                 {inApp ? "On" : "Off"}
//               </span>
//             </p>
//             <button
//               type="button"
//               role="switch"
//               aria-checked={inApp}
//               aria-label="In-app notifications"
//               onClick={handleToggleInApp}
//               className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
//                 inApp ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
//               }`}
//             >
//               <span
//                 className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--white-cards)] shadow transition-all duration-300 ${
//                   inApp ? "left-[22px]" : "left-0.5"
//                 }`}
//               />
//             </button>
//           </div>

//           {/* Email */}
//           <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4">
//             <p className="text-[color:var(--primary-text)]">
//               Email notifications{" "}
//               <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
//                 {email ? "On" : "Off"}
//               </span>
//             </p>
//             <button
//               type="button"
//               role="switch"
//               aria-checked={email}
//               aria-label="Email notifications"
//               onClick={handleToggleEmail}
//               className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
//                 email ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
//               }`}
//             >
//               <span
//                 className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--white-cards)] shadow transition-all duration-300 ${
//                   email ? "left-[22px]" : "left-0.5"
//                 }`}
//               />
//             </button>
//           </div>
//         </section>
//       )}

//       {/* ================= TAB 4: Get Verified (KYC) ================= */}
//       {activeTab === "Get Verified (KYC)" && (
//         <section className="bmProfile-kyc mt-8 max-w-3xl">
//           <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
//             <ShieldCheck size={20} />
//             Business Verification
//           </h2>

//           <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs ${chipClass}`}>
//             {verifyStatus}
//           </span>

//           {verifyStatus === "Pending Verification" ? (
//             <form onSubmit={handleKycSubmit} className="mt-6">
//               {/* Upar: Business Information */}
//               <h3 className="text-base text-[color:var(--primary-text)]">Business Information</h3>
//               <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label htmlFor="bmShopName" className={labelClass}>Shop Name</label>
//                   <input id="bmShopName" name="shopName" value={business.shopName} onChange={handleBusinessChange} required className={inputClass} />
//                 </div>
//                 <div>
//                   <label htmlFor="bmOwnerName" className={labelClass}>Owner Name</label>
//                   <input id="bmOwnerName" name="ownerName" value={business.ownerName} onChange={handleBusinessChange} required className={inputClass} />
//                 </div>
//                 <div>
//                   <label htmlFor="bmPhone" className={labelClass}>Phone Number</label>
//                   <input id="bmPhone" name="phone" value={business.phone} onChange={handleBusinessChange} required className={inputClass} />
//                 </div>
//                 <div>
//                   <label htmlFor="bmEmail" className={labelClass}>Email</label>
//                   <input id="bmEmail" name="email" type="email" value={business.email} onChange={handleBusinessChange} required className={inputClass} />
//                 </div>
//                 <div className="sm:col-span-2">
//                   <label htmlFor="bmAddress" className={labelClass}>Shop Address / Location</label>
//                   <input id="bmAddress" name="address" value={business.address} onChange={handleBusinessChange} required className={inputClass} />
//                 </div>
//                 <div className="sm:col-span-2">
//                   <label htmlFor="bmDescription" className={labelClass}>Business Description</label>
//                   <textarea id="bmDescription" name="description" rows={3} value={business.description} onChange={handleBusinessChange} className={inputClass} />
//                 </div>
//               </div>

//               {/* Neeche: documents ki aik PDF */}
//               <h3 className="mt-8 text-base text-[color:var(--primary-text)]">Documents</h3>
//               <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
//                 Neeche likhay saray documents aik hi PDF file mein jama karke upload karein.
//               </p>

//               <ul className="mt-4 flex flex-col gap-2">
//                 {BM_KYC_DOCUMENTS.map((doc) => (
//                   <li key={doc.id} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
//                     <FileText size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
//                     {doc.label}
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-5 flex flex-wrap items-center gap-3">
//                 <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]">
//                   <Upload size={16} />
//                   Upload PDF
//                   <input type="file" accept="application/pdf,.pdf" onChange={handleKycFile} className="hidden" />
//                 </label>

//                 {kycPdf && (
//                   <span className="flex min-w-0 max-w-full items-center gap-2 text-xs text-[color:var(--secondary-text)]">
//                     <span className="truncate">{kycPdf}</span>
//                     <button type="button" onClick={handleKycRemove} className="cursor-pointer text-red-600 hover:underline">
//                       Remove
//                     </button>
//                   </span>
//                 )}
//               </div>
//               {kycError && <p className="mt-2 text-sm text-red-600">{kycError}</p>}

//               {/* PDF na ho to button halka aur band rehta hai */}
//               <button
//                 type="submit"
//                 disabled={!isKycReady}
//                 className="mt-6 cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--primary-yellow)]"
//               >
//                 Submit Request
//               </button>
//             </form>
//           ) : (
//             <p className="mt-6 text-sm text-[color:var(--secondary-text)]">
//               Aap ke documents review mein hain. Natija jald bata diya jayega.
//             </p>
//           )}
//         </section>
//       )}

//       {/* ===== Toast ===== */}
//       {toast && (
//         <div className="bmProfile-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
//           <CheckCircle2 size={18} />
//           {toast}
//         </div>
//       )}
//     </main>
//   );
// };

// export default SupplierProfilePage;





"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, FileText, Lock, ShieldCheck, Upload } from "lucide-react";

// ========== DATA ==========
const BM_TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Security" },
  { id: 3, label: "Notifications" },
  { id: 4, label: "Get Verified (KYC)" },
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

// Ek hi PDF mein ye saray documents hon
const BM_KYC_DOCUMENTS = [
  { id: 1, label: "Identity card front", required: true },
  { id: 2, label: "Identity card back", required: true },
  { id: 3, label: "Shop / business licence", required: true },
  { id: 4, label: "Supporting documents (optional)", required: false },
];

const SupplierProfilePage = () => {
  // ===== State =====
  const [activeTab, setActiveTab] = useState("Profile");
  const [business, setBusiness] = useState(BM_START_BUSINESS);
  const [passwords, setPasswords] = useState(BM_EMPTY_PASSWORDS);
  const [passwordError, setPasswordError] = useState("");
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState("Pending Verification");
  const [kycPdf, setKycPdf] = useState(""); // chuni hui PDF ka naam
  const [kycError, setKycError] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [toast, setToast] = useState("");

  // ===== Helpers =====
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  // PDF chun li hai? (Submit button tabhi chalega)
  const isKycReady = kycPdf !== "";

  // ===== Handlers =====
  const handleTabClick = (label) => setActiveTab(label);

  // Profile picture
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  // Business fields (Get Verified tab mein)
  const handleBusinessChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  // Profile: Save Changes
  const handleProfileSave = (e) => {
    e.preventDefault();
    showToast("Profile updated");
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
    setKycPdf("");
    setKycError("");
    setAvatar(null);
    showToast("Demo data reset");
  };

  // Notifications switches
  const handleToggleInApp = () => setInApp(!inApp);
  const handleToggleEmail = () => setEmail(!email);

  // KYC: sirf aik PDF chunni hai
  const handleKycFile = (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // wahi file dobara chunni ho to bhi chale
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setKycPdf("");
      setKycError("Sirf PDF file upload karein.");
      return;
    }
    setKycError("");
    setKycPdf(file.name);
  };

  const handleKycRemove = () => setKycPdf("");

  // KYC: Submit Request (form submit)
  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (!isKycReady) return;
    setVerifyStatus("Under Review");
    showToast("Verification request submitted");
  };

  // ===== Common classes (dobara dobara na likhni paray) =====
  const inputClass =
    "bmProfile-input w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";
  const labelClass =
    "bmProfile-label mb-1.5 block text-sm text-[color:var(--primary-text)]";
  const yellowBtn =
    "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";
  const whiteBtn =
    "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2.5 text-sm text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";

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
            className={`bmProfile-tabBtn cursor-pointer rounded-md border px-4 py-2 text-xs shadow-sm transition-colors duration-300 sm:text-sm ${
              activeTab === tab.label
                ? "border-[color:var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: Profile (avatar + editable form) ================= */}
      {activeTab === "Profile" && (
        <section className="bmProfile-profile mt-8">
          {/* Avatar: yellow gol, neeche camera */}
          <label className="bmProfile-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)] sm:h-32 sm:w-32">
            {avatar ? (
              <Image src={avatar} alt="Profile" fill unoptimized className="object-cover" />
            ) : (
              <span className="text-4xl text-[color:var(--primary-text)]">
                {business.shopName.charAt(0)}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
              <Camera size={14} />
            </span>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>

          <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs ${chipClass}`}>
            {verifyStatus}
          </span>

          <form onSubmit={handleProfileSave} className="mt-6 max-w-3xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bmShopName" className={labelClass}>Shop Name</label>
                <input id="bmShopName" name="shopName" value={business.shopName} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bmOwnerName" className={labelClass}>Owner Name</label>
                <input id="bmOwnerName" name="ownerName" value={business.ownerName} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bmPhone" className={labelClass}>Phone Number</label>
                <input id="bmPhone" name="phone" value={business.phone} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bmEmail" className={labelClass}>Email</label>
                <input id="bmEmail" name="email" type="email" value={business.email} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bmAddress" className={labelClass}>Shop Address / Location</label>
                <input id="bmAddress" name="address" value={business.address} onChange={handleBusinessChange} required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="bmDescription" className={labelClass}>Business Description</label>
                <textarea id="bmDescription" name="description" rows={3} value={business.description} onChange={handleBusinessChange} className={inputClass} />
              </div>
            </div>

            <button type="submit" className={`${yellowBtn} mt-6`}>
              Save Changes
            </button>
          </form>
        </section>
      )}

      {/* ================= TAB 2: Security (form) ================= */}
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

      {/* ================= TAB 3: Notifications ================= */}
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

      {/* ================= TAB 4: Get Verified (KYC) ================= */}
      {activeTab === "Get Verified (KYC)" && (
        <section className="bmProfile-kyc mt-8 max-w-3xl">
          <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
            <ShieldCheck size={20} />
            Business Verification
          </h2>

          <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs ${chipClass}`}>
            {verifyStatus}
          </span>

          {verifyStatus === "Pending Verification" ? (
            <form onSubmit={handleKycSubmit} className="mt-6">
              {/* Neeche: documents ki aik PDF */}
              <h3 className="text-base text-[color:var(--primary-text)]">Documents</h3>
              <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
                Neeche likhay saray documents aik hi PDF file mein jama karke upload karein.
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {BM_KYC_DOCUMENTS.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
                    <FileText size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
                    {doc.label}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]">
                  <Upload size={16} />
                  Upload PDF
                  <input type="file" accept="application/pdf,.pdf" onChange={handleKycFile} className="hidden" />
                </label>

                {kycPdf && (
                  <span className="flex min-w-0 max-w-full items-center gap-2 text-xs text-[color:var(--secondary-text)]">
                    <span className="truncate">{kycPdf}</span>
                    <button type="button" onClick={handleKycRemove} className="cursor-pointer text-red-600 hover:underline">
                      Remove
                    </button>
                  </span>
                )}
              </div>
              {kycError && <p className="mt-2 text-sm text-red-600">{kycError}</p>}

              {/* PDF na ho to button halka aur band rehta hai */}
              <button
                type="submit"
                disabled={!isKycReady}
                className="mt-6 cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--primary-yellow)]"
              >
                Submit Request
              </button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-[color:var(--secondary-text)]">
              Aap ke documents review mein hain. Natija jald bata diya jayega.
            </p>
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
    </main>
  );
};

export default SupplierProfilePage;