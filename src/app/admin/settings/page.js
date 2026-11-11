
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   BrickWall,
//   Camera,
//   CheckCircle2,
//   Construction,
//   DoorOpen,
//   Fence,
//   Hourglass,
//   LayoutGrid,
//   Lock,
//   Mountain,
//   Package,
//   PaintBucket,
//   PanelTop,
//   Recycle,
//   ShieldCheck,
//   Upload,
// } from "lucide-react";

// // ========== DATA ==========
// const BM_TABS = [
//   { id: 1, label: "Profile" },
//   { id: 2, label: "Platform & Branding" },
//   { id: 3, label: "Security" },
//   { id: 4, label: "Notifications" },
//   { id: 5, label: "Categories" },
//   { id: 6, label: "Statuses" },
//   { id: 7, label: "Sub-admins" },
//   { id: 8, label: "Get Verified (KYC)" },
// ];

// // Form ki shuruati values (Reset Demo Data dabane par yehi wapas aati hain)
// const BM_START_FORM = {
//   name: "Super Admin",
//   email: "admin@buildmart.pk",
//   platformName: "BuildMart",
//   tagline: "Construction Material Management & Comparison",
//   phone: "042-111-BUILD",
//   supportEmail: "support@buildmart.pk",
//   commission: "5",
// };

// const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

// const BM_START_NOTIFICATIONS = [
//   { id: 1, label: "Order updates", on: true },
//   { id: 2, label: "Dispute activity", on: true },
//   { id: 3, label: "Supplier verification", on: true },
// ];

// // const BM_START_CATEGORIES = [
// //   { id: 1, label: "Bricks", icon: BrickWall, on: true },
// //   { id: 2, label: "Cement", icon: Package, on: true },
// //   { id: 3, label: "Sand / Rait", icon: Hourglass, on: true },
// //   { id: 4, label: "Bajri", icon: Mountain, on: true },
// //   { id: 5, label: "Steel / Saria", icon: Construction, on: true },
// //   { id: 6, label: "Tiles", icon: LayoutGrid, on: true },
// //   { id: 7, label: "Paint", icon: PaintBucket, on: true },
// //   { id: 8, label: "Doors & Windows", icon: DoorOpen, on: true },
// //   { id: 9, label: "Ceiling Materials", icon: PanelTop, on: true },
// //   { id: 10, label: "Grills & Iron Railings", icon: Fence, on: true },
// //   { id: 11, label: "Reusable Materials", icon: Recycle, on: true },
// // ];

// const BM_ORDER_STATUSES = [
//   { id: 1, label: "Pending" },
//   { id: 2, label: "Confirmed" },
//   { id: 3, label: "Processing" },
//   { id: 4, label: "Ready for Dispatch" },
//   { id: 5, label: "In Transit" },
//   { id: 6, label: "Delivered" },
//   { id: 7, label: "Cancelled" },
//   { id: 8, label: "Returned" },
// ];

// const BM_DELIVERY_STATUSES = [
//   { id: 1, label: "Unassigned" },
//   { id: 2, label: "Pickup" },
//   { id: 3, label: "On the Way" },
//   { id: 4, label: "Delivered" },
//   { id: 5, label: "Failed" },
//   { id: 6, label: "Returned" },
// ];

// // KYC tab ke upload fields. required = true wale lazmi hain.
// const BM_KYC_FIELDS = [
//   { id: 1, key: "idFront", label: "Identity card front", required: true },
//   { id: 2, key: "idBack", label: "Identity card back", required: true },
//   { id: 3, key: "licence", label: "Business registration / authority letter", required: true },
//   { id: 4, key: "support", label: "Supporting documents (optional)", required: false },
// ];

// // ========== CHHOTE HELPERS (isi file ke andar) ==========

// // On / Off switch
// const Toggle = ({ checked, onChange, label }) => {
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       aria-label={label}
//       onClick={onChange}
//       className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
//         checked ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
//       }`}
//     >
//       <span
//         className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--white-cards)] shadow transition-all duration-300 ${
//           checked ? "left-[22px]" : "left-0.5"
//         }`}
//       />
//     </button>
//   );
// };

// // Categories ki grid (2 columns, har category ke saath switch)
// const CategoryGrid = ({ categories, onToggle }) => {
//   return (
//     <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
//       {categories.map((item) => {
//         const Icon = item.icon;
//         return (
//           <li
//             key={item.id}
//             className="flex items-center justify-between gap-3 border-b border-[color:var(--border-color)] py-3 text-[color:var(--primary-text)]"
//           >
//             <span className="flex min-w-0 items-center gap-3">
//               <Icon size={18} className="shrink-0 text-[color:var(--industrial-blue-grey)]" />
//               <span className="truncate">{item.label}</span>
//             </span>
//             <Toggle checked={item.on} label={item.label} onChange={() => onToggle(item.id)} />
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default function AdminSettingsPage() {
//   const router = useRouter();

//   // ===== State =====
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [form, setForm] = useState(BM_START_FORM);
//   const [passwords, setPasswords] = useState(BM_EMPTY_PASSWORDS);
//   const [passwordError, setPasswordError] = useState("");
//   const [notifications, setNotifications] = useState(BM_START_NOTIFICATIONS);
//   const [categories, setCategories] = useState(BM_START_CATEGORIES);
//   const [verifyStatus, setVerifyStatus] = useState("Pending Verification");
//   const [kycFiles, setKycFiles] = useState({}); // { idFront: "naam.jpg", ... }
//   const [avatar, setAvatar] = useState(null);
//   const [toast, setToast] = useState("");

//   // ===== Helpers =====
//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // Lazmi 3 files chun li hain? (Submit button tabhi chalega)
//   const isKycReady = BM_KYC_FIELDS.filter((f) => f.required).every((f) => kycFiles[f.key]);

//   // ===== Handlers =====
//   const handleTabClick = (label) => setActiveTab(label);

//   // Profile picture
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setAvatar(URL.createObjectURL(file));
//   };

//   // Form ke inputs
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     // Commission: sirf number, 0 se 100 tak
//     if (name === "commission") {
//       const digits = value.replace(/\D/g, "");
//       const limited = digits === "" ? "" : String(Math.min(100, Number(digits)));
//       setForm({ ...form, commission: limited });
//       return;
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const handleFormSave = (e) => {
//     e.preventDefault();
//     showToast("Changes saved");
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
//     if (passwords.next === passwords.current) {
//       setPasswordError("New password purane password se alag hona chahiye.");
//       return;
//     }
//     setPasswords(BM_EMPTY_PASSWORDS);
//     showToast("Password updated");
//   };

//   // Reset Demo Data: sab kuch shuruati halat par
//   const handleResetDemo = () => {
//     setForm(BM_START_FORM);
//     setPasswords(BM_EMPTY_PASSWORDS);
//     setPasswordError("");
//     setNotifications(BM_START_NOTIFICATIONS);
//     setCategories(BM_START_CATEGORIES);
//     setVerifyStatus("Pending Verification");
//     setKycFiles({});
//     setAvatar(null);
//     showToast("Demo data reset");
//   };

//   // Switches
//   const handleNotificationToggle = (id) => {
//     setNotifications(
//       notifications.map((item) => (item.id === id ? { ...item, on: !item.on } : item))
//     );
//   };

//   const handleCategoryToggle = (id) => {
//     setCategories(categories.map((item) => (item.id === id ? { ...item, on: !item.on } : item)));
//   };

//   // Sub-admins page par jao
//   const handleManageSubAdmins = () => router.push("/admin/users");

//   // KYC: file chunna
//   const handleKycFile = (key, e) => {
//     const file = e.target.files[0];
//     if (file) setKycFiles({ ...kycFiles, [key]: file.name });
//   };

//   // KYC: Submit Request (form submit)
//   const handleKycSubmit = (e) => {
//     e.preventDefault();
//     if (!isKycReady) return;
//     setVerifyStatus("Under Review");
//     showToast("Verification request submitted");
//   };

//   // ===== Common classes =====
//   const inputClass =
//     "bmAdmin-input w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)] disabled:cursor-not-allowed disabled:bg-[var(--off-white-background)] disabled:text-[color:var(--secondary-text)]";
//   const labelClass =
//     "bmAdmin-label mb-1.5 block text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]";
//   const yellowBtn =
//     "cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]";
//   const whiteBtn =
//     "cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]";
//   const chipClass =
//     "rounded border border-[color:var(--border-color)] bg-[var(--off-white-background)] px-2.5 py-1 text-xs text-[color:var(--secondary-text)]";

//   // Verification chip ka rang
//   const verifyChipClass =
//     verifyStatus === "Under Review"
//       ? "bg-blue-100 text-blue-600"
//       : "bg-orange-100 text-orange-500";

//   return (
//     <main className="bmAdmin-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       <h1 className="bmAdmin-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//         Settings
//       </h1>
//       <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
//         There is no public admin signup.
//       </p>

//       {/* ----- Tabs ----- */}
//       <div className="bmAdmin-tabs mt-6 flex flex-wrap gap-2">
//         {BM_TABS.map((tab) => (
//           <button
//             key={tab.id}
//             type="button"
//             onClick={() => handleTabClick(tab.label)}
//             className={`bmAdmin-tabBtn cursor-pointer rounded-md border px-4 py-2 text-xs font-[family-name:Poppins-Medium] shadow-sm transition-colors duration-300 sm:text-sm ${
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
//         <section className="bmAdmin-profile mt-8 max-w-3xl">
//           {/* Avatar: yellow gol, neeche camera */}
//           <label className="bmAdmin-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)]">
//             {avatar ? (
//               <Image src={avatar} alt="Profile" fill unoptimized className="object-cover" />
//             ) : (
//               <span className="font-[family-name:Baloo2-Bold] text-4xl text-[color:var(--primary-text)]">
//                 {form.name.charAt(0)}
//               </span>
//             )}
//             <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
//               <Camera size={14} />
//             </span>
//             <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
//           </label>

//           <h2 className="mt-5 break-words text-xl text-[color:var(--primary-text)] sm:text-2xl">
//             {form.name}
//           </h2>
//           <p className="mt-2 break-words text-[color:var(--primary-text)]">{form.email}</p>
//           <div className="mt-3 flex flex-wrap gap-2">
//             <span className="rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//               Super Admin
//             </span>
//             <span className={`rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${verifyChipClass}`}>
//               {verifyStatus}
//             </span>
//           </div>

//           {/* Admin Profile form */}
//           <form onSubmit={handleFormSave} className="mt-8">
//             <h3 className="text-lg text-[color:var(--primary-text)]">Admin Profile</h3>

//             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Name</label>
//                 <input name="name" value={form.name} onChange={handleFormChange} required className={inputClass} />
//               </div>
//               <div>
//                 <label className={labelClass}>Email</label>
//                 <input name="email" value={form.email} disabled className={inputClass} />
//               </div>
//             </div>

//             <button type="submit" className={`${yellowBtn} mt-5`}>
//               Save Changes
//             </button>
//           </form>
//         </section>
//       )}

//       {/* ================= TAB 2: Platform & Branding (form) ================= */}
//       {activeTab === "Platform & Branding" && (
//         <section className="bmAdmin-platform mt-8 max-w-3xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Platform &amp; Branding</h2>

//           <form onSubmit={handleFormSave} className="mt-4">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Platform name</label>
//                 <input name="platformName" value={form.platformName} onChange={handleFormChange} required className={inputClass} />
//               </div>
//               <div>
//                 <label className={labelClass}>Tagline</label>
//                 <input name="tagline" value={form.tagline} onChange={handleFormChange} required className={inputClass} />
//               </div>
//               <div>
//                 <label className={labelClass}>Contact phone</label>
//                 <input name="phone" value={form.phone} onChange={handleFormChange} required className={inputClass} />
//               </div>
//               <div>
//                 <label className={labelClass}>Contact email</label>
//                 <input name="supportEmail" type="email" value={form.supportEmail} onChange={handleFormChange} required className={inputClass} />
//               </div>
//             </div>

//             {/* Listings & Commission */}
//             <h3 className="mt-8 text-lg text-[color:var(--primary-text)]">Listings &amp; Commission</h3>
//             <div className="mt-4 max-w-[200px]">
//               <label className={labelClass}>Platform commission %</label>
//               <input
//                 name="commission"
//                 inputMode="numeric"
//                 value={form.commission}
//                 onChange={handleFormChange}
//                 required
//                 className={inputClass}
//               />
//             </div>

//             <button type="submit" className={`${yellowBtn} mt-5`}>
//               Save Changes
//             </button>
//           </form>
//         </section>
//       )}

//       {/* ================= TAB 3: Security (form) ================= */}
//       {activeTab === "Security" && (
//         <section className="bmAdmin-security mt-8 max-w-3xl">
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

//             {passwordError && <p className="mt-3 text-sm text-red-600">{passwordError}</p>}

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

//       {/* ================= TAB 4: Notifications ================= */}
//       {activeTab === "Notifications" && (
//         <section className="bmAdmin-notifications mt-8 max-w-xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Notification Preferences</h2>

//           <ul className="mt-4">
//             {notifications.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4"
//               >
//                 <p className="text-[color:var(--primary-text)]">
//                   {item.label}{" "}
//                   <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
//                     {item.on ? "On" : "Off"}
//                   </span>
//                 </p>
//                 <Toggle
//                   checked={item.on}
//                   label={item.label}
//                   onChange={() => handleNotificationToggle(item.id)}
//                 />
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* ================= TAB 5: Categories ================= */}
//       {activeTab === "Categories" && (
//         <section className="bmAdmin-categories mt-8 max-w-4xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Active Categories</h2>
//           <div className="mt-2">
//             <CategoryGrid categories={categories} onToggle={handleCategoryToggle} />
//           </div>
//         </section>
//       )}

//       {/* ================= TAB 6: Statuses ================= */}
//       {activeTab === "Statuses" && (
//         <section className="bmAdmin-statuses mt-8 max-w-3xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Order &amp; Delivery Statuses</h2>

//           <p className="mt-4 text-sm text-[color:var(--secondary-text)]">Order</p>
//           <ul className="mt-2 flex flex-wrap gap-2">
//             {BM_ORDER_STATUSES.map((item) => (
//               <li key={item.id} className={chipClass}>
//                 {item.label}
//               </li>
//             ))}
//           </ul>

//           <p className="mt-6 text-sm text-[color:var(--secondary-text)]">Delivery</p>
//           <ul className="mt-2 flex flex-wrap gap-2">
//             {BM_DELIVERY_STATUSES.map((item) => (
//               <li key={item.id} className={chipClass}>
//                 {item.label}
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* ================= TAB 7: Sub-admins ================= */}
//       {activeTab === "Sub-admins" && (
//         <section className="bmAdmin-subadmins mt-8 max-w-xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">Sub-admin Permissions</h2>
//           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//             Create sub-admins and choose their modules under User Management → Sub-admins.
//           </p>
//           <button type="button" onClick={handleManageSubAdmins} className={`${yellowBtn} mt-4`}>
//             Manage sub-admins
//           </button>
//         </section>
//       )}

//       {/* ================= TAB 8: Get Verified (KYC), modal nahi, isi page par ================= */}
//       {activeTab === "Get Verified (KYC)" && (
//         <section className="bmAdmin-kyc mt-8 max-w-3xl">
//           <h2 className="flex items-center gap-2 text-lg text-[color:var(--primary-text)]">
//             <ShieldCheck size={20} />
//             Admin Verification
//           </h2>

//           <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-[family-name:Poppins-Medium] ${verifyChipClass}`}>
//             {verifyStatus}
//           </span>

//           {/* Pehle: upload fields aur Submit Request. Submit ke baad: review ka paigham */}
//           {verifyStatus === "Pending Verification" ? (
//             <form onSubmit={handleKycSubmit} className="mt-6">
//               <p className="text-sm text-[color:var(--secondary-text)]">
//                 Upload documents that help verify your identity and authority.
//               </p>

//               <div className="mt-5 flex flex-col gap-5">
//                 {BM_KYC_FIELDS.map((field) => (
//                   <div key={field.id}>
//                     <p className="mb-2 text-sm text-[color:var(--primary-text)]">{field.label}</p>

//                     <div className="flex flex-wrap items-center gap-3">
//                       <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm transition-colors duration-300 hover:bg-[var(--off-white-background)]">
//                         <Upload size={16} />
//                         Upload File
//                         <input
//                           type="file"
//                           onChange={(e) => handleKycFile(field.key, e)}
//                           className="hidden"
//                         />
//                       </label>

//                       {kycFiles[field.key] && (
//                         <span className="min-w-0 max-w-full truncate text-xs text-[color:var(--secondary-text)]">
//                           {kycFiles[field.key]}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Lazmi files na hon to button halka aur band rehta hai */}
//               <button
//                 type="submit"
//                 disabled={!isKycReady}
//                 className="mt-6 cursor-pointer rounded-md bg-[var(--primary-yellow)] px-5 py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--primary-yellow)]"
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
//         <div className="bmAdmin-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
//           <CheckCircle2 size={18} />
//           {toast}
//         </div>
//       )}
//     </main>
//   );
// }




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
  { id: 1, label: "Order updates", on: true },
  { id: 2, label: "Dispute activity", on: true },
  { id: 3, label: "Supplier verification", on: true },
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
