// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Camera, CheckCircle2, Lock } from "lucide-react";

// // ========== PAYMENT METHODS (localStorage helpers) ==========
// const PAYMENT_METHODS_KEY = "bm_supplier_payment_methods";

// const PAYMENT_METHOD_DEFS = [
//   {
//     id: "bank",
//     label: "Bank Transfer",
//     fields: [
//       { name: "bankName", label: "Bank Name", required: true },
//       { name: "accountTitle", label: "Account Title", required: true },
//       { name: "accountNumber", label: "Account Number / IBAN", required: true },
//       { name: "instructions", label: "Payment Instructions", textarea: true },
//     ],
//   },
//   {
//     id: "jazzcash",
//     label: "JazzCash",
//     fields: [
//       { name: "accountTitle", label: "Account Title", required: true },
//       { name: "mobileNumber", label: "Mobile Number", required: true },
//       { name: "instructions", label: "Payment Instructions", textarea: true },
//     ],
//   },
//   {
//     id: "easypaisa",
//     label: "Easypaisa",
//     fields: [
//       { name: "accountTitle", label: "Account Title", required: true },
//       { name: "mobileNumber", label: "Mobile Number", required: true },
//       { name: "instructions", label: "Payment Instructions", textarea: true },
//     ],
//   },
// ];

// const getDefaultPaymentMethods = () => ({
//   bank: { details: {}, active: false },
//   jazzcash: { details: {}, active: false },
//   easypaisa: { details: {}, active: false },
// });

// const isConfigured = (def, details = {}) =>
//   def.fields
//     .filter((f) => f.required)
//     .every((f) => (details[f.name] || "").trim() !== "");

// const loadPaymentMethods = () => {
//   const base = getDefaultPaymentMethods();
//   try {
//     const raw = localStorage.getItem(PAYMENT_METHODS_KEY);
//     if (!raw) return base;
//     const saved = JSON.parse(raw);
//     return {
//       bank: { ...base.bank, ...saved.bank },
//       jazzcash: { ...base.jazzcash, ...saved.jazzcash },
//       easypaisa: { ...base.easypaisa, ...saved.easypaisa },
//     };
//   } catch {
//     return base;
//   }
// };

// const savePaymentMethods = (methods) => {
//   try {
//     localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(methods));
//   } catch {}
// };

// // ========== DATA ==========
// const BM_TABS = [
//   { id: 1, label: "Profile" },
//   { id: 2, label: "Security" },
//   { id: 3, label: "Notifications" },
//   { id: 4, label: "Account Settings" },
// ];

// const BM_START_FORM = {
//   name: "Super Admin",
//   email: "admin@buildmart.pk",
// };

// const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

// const BM_START_NOTIFICATIONS = [
//   { id: 1, label: "In-app notifications", on: true },
//   { id: 2, label: "Email notifications", on: true },
// ];

// // ========== HELPER ==========
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

// // ========== NOTIFICATION ROW COMPONENT ==========
// const NotificationPreferenceRow = ({ item, onToggle }) => {
//   return (
//     <li className="flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4">
//       <p className="text-[color:var(--primary-text)]">
//         {item.label}{" "}
//         <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
//           {item.on ? "On" : "Off"}
//         </span>
//       </p>

//       <Toggle
//         checked={item.on}
//         label={item.label}
//         onChange={() => onToggle(item.id)}
//       />
//     </li>
//   );
// };

// // ========== ACCOUNT SETTINGS: PAYMENT METHODS ==========
// const AccountSettingsTab = ({ showToast, inputClass, labelClass, yellowBtn, whiteBtn }) => {
//   const [methods, setMethods] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [draft, setDraft] = useState({});
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     setMethods(loadPaymentMethods());
//   }, []);

//   if (!methods) return null;

//   const persist = (next) => {
//     setMethods(next);
//     savePaymentMethods(next);
//   };

//   const startEdit = (def) => {
//     setDraft({ ...methods[def.id].details });
//     setErrors({});
//     setEditingId(def.id);
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setDraft({});
//     setErrors({});
//   };

//   const handleSave = (e, def) => {
//     e.preventDefault();
//     const newErrors = {};
//     def.fields.forEach((f) => {
//       if (f.required && !(draft[f.name] || "").trim()) {
//         newErrors[f.name] = `${f.label} is required.`;
//       }
//     });
//     if (Object.keys(newErrors).length) {
//       setErrors(newErrors);
//       return;
//     }
//     const wasConfigured = isConfigured(def, methods[def.id].details);
//     persist({
//       ...methods,
//       [def.id]: {
//         details: draft,
//         active: wasConfigured ? methods[def.id].active : true,
//       },
//     });
//     cancelEdit();
//     showToast(`${def.label} details saved`);
//   };

//   const handleToggleActive = (def) => {
//     const current = methods[def.id];
//     persist({ ...methods, [def.id]: { ...current, active: !current.active } });
//     showToast(`${def.label} ${current.active ? "deactivated" : "activated"}`);
//   };

//   return (
//     <section className="bmAdmin-account mt-8 max-w-3xl">
//       <h2 className="text-lg text-[color:var(--primary-text)]">
//         Supplier Wallet Payment Methods
//       </h2>
//       <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
//         These details are shown to suppliers in Wallet → Top-Up Request. Only
//         active and configured methods are visible.
//       </p>

//       <div className="mt-5 space-y-5">
//         {PAYMENT_METHOD_DEFS.map((def) => {
//           const entry = methods[def.id];
//           const configured = isConfigured(def, entry.details);
//           const isEditing = editingId === def.id;

//           return (
//             <div
//               key={def.id}
//               className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 sm:p-5"
//             >
//               <div className="flex flex-wrap items-center justify-between gap-3">
//                 <div className="flex items-center gap-2">
//                   <h3 className="text-base text-[color:var(--primary-text)]">
//                     {def.label}
//                   </h3>
//                   <span
//                     className={`rounded-full px-2.5 py-0.5 text-xs font-[family-name:Poppins-Medium] ${
//                       configured && entry.active
//                         ? "bg-[var(--primary-yellow)] text-[color:var(--primary-text)]"
//                         : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"
//                     }`}
//                   >
//                     {!configured ? "Not configured" : entry.active ? "Active" : "Inactive"}
//                   </span>
//                 </div>

//                 {configured && !isEditing && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-[color:var(--secondary-text)]">
//                       {entry.active ? "Deactivate" : "Activate"}
//                     </span>
//                     <Toggle
//                       checked={entry.active}
//                       label={`${entry.active ? "Deactivate" : "Activate"} ${def.label}`}
//                       onChange={() => handleToggleActive(def)}
//                     />
//                   </div>
//                 )}
//               </div>

//               {!isEditing && (
//                 <>
//                   {configured ? (
//                     <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//                       {def.fields.map((f) => (
//                         <div key={f.name} className={f.textarea ? "sm:col-span-2" : ""}>
//                           <dt className="text-xs text-[color:var(--secondary-text)]">
//                             {f.label}
//                           </dt>
//                           <dd className="mt-0.5 whitespace-pre-line break-words text-sm text-[color:var(--primary-text)]">
//                             {entry.details[f.name] || "—"}
//                           </dd>
//                         </div>
//                       ))}
//                     </dl>
//                   ) : (
//                     <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//                       No details added yet.
//                     </p>
//                   )}

//                   <button
//                     type="button"
//                     onClick={() => startEdit(def)}
//                     className={`${configured ? whiteBtn : yellowBtn} mt-4`}
//                   >
//                     {configured ? "Edit Details" : "Add Details"}
//                   </button>
//                 </>
//               )}

//               {isEditing && (
//                 <form onSubmit={(e) => handleSave(e, def)} className="mt-4">
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                     {def.fields.map((f) => (
//                       <div key={f.name} className={f.textarea ? "sm:col-span-2" : ""}>
//                         <label className={labelClass}>{f.label}</label>
//                         {f.textarea ? (
//                           <textarea
//                             rows={3}
//                             value={draft[f.name] || ""}
//                             onChange={(e) =>
//                               setDraft({ ...draft, [f.name]: e.target.value })
//                             }
//                             className={inputClass}
//                           />
//                         ) : (
//                           <input
//                             value={draft[f.name] || ""}
//                             onChange={(e) => {
//                               setDraft({ ...draft, [f.name]: e.target.value });
//                               setErrors({ ...errors, [f.name]: "" });
//                             }}
//                             className={inputClass}
//                           />
//                         )}
//                         {errors[f.name] && (
//                           <p className="mt-1 text-xs text-red-600">{errors[f.name]}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-4 flex flex-wrap gap-3">
//                     <button type="submit" className={yellowBtn}>
//                       Save Changes
//                     </button>
//                     <button type="button" onClick={cancelEdit} className={whiteBtn}>
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default function AdminSettingsPage() {
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [form, setForm] = useState(BM_START_FORM);
//   const [passwords, setPasswords] = useState(BM_EMPTY_PASSWORDS);
//   const [passwordError, setPasswordError] = useState("");
//   const [notifications, setNotifications] = useState(BM_START_NOTIFICATIONS);
//   const [avatar, setAvatar] = useState(null);
//   const [toast, setToast] = useState("");

//   // ===== Helpers =====
//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(""), 2500);
//   };

//   const handleTabClick = (label) => setActiveTab(label);

//   // Profile picture
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setAvatar(URL.createObjectURL(file));
//   };

//   // Profile form
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
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
//     setPasswordError("");
//     showToast("Password updated");
//   };

//   // Reset Demo Data
//   const handleResetDemo = () => {
//     setForm(BM_START_FORM);
//     setPasswords(BM_EMPTY_PASSWORDS);
//     setPasswordError("");
//     setNotifications(BM_START_NOTIFICATIONS);
//     setAvatar(null);
//     showToast("Demo data reset");
//   };

//   // Notification switches
//   const handleNotificationToggle = (id) => {
//     setNotifications(
//       notifications.map((item) =>
//         item.id === id ? { ...item, on: !item.on } : item
//       )
//     );
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
//           <label className="bmAdmin-avatar relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--primary-yellow)]">
//             {avatar ? (
//               <Image
//                 src={avatar}
//                 alt="Profile"
//                 fill
//                 unoptimized
//                 className="object-cover"
//               />
//             ) : (
//               <span className="font-[family-name:Baloo2-Bold] text-4xl text-[color:var(--primary-text)]">
//                 {form.name.charAt(0)}
//               </span>
//             )}

//             <span className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center bg-[var(--charcoal-black)]/70 text-[color:var(--white-cards)]">
//               <Camera size={14} />
//             </span>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="hidden"
//             />
//           </label>

//           <h2 className="mt-5 break-words text-xl text-[color:var(--primary-text)] sm:text-2xl">
//             {form.name}
//           </h2>

//           <p className="mt-2 break-words text-[color:var(--primary-text)]">
//             {form.email}
//           </p>

//           <div className="mt-3 flex flex-wrap gap-2">
//             <span className="rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
//               Super Admin
//             </span>
//           </div>

//           {/* Admin Profile form */}
//           <form onSubmit={handleFormSave} className="mt-8">
//             <h3 className="text-lg text-[color:var(--primary-text)]">
//               Admin Profile
//             </h3>

//             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Name</label>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleFormChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Email</label>
//                 <input
//                   name="email"
//                   value={form.email}
//                   disabled
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             <button type="submit" className={`${yellowBtn} mt-5`}>
//               Save Changes
//             </button>
//           </form>
//         </section>
//       )}

//       {/* ================= TAB 2: Security ================= */}
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
//                 <input
//                   name="current"
//                   type="password"
//                   value={passwords.current}
//                   onChange={handlePasswordChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>New Password</label>
//                 <input
//                   name="next"
//                   type="password"
//                   value={passwords.next}
//                   onChange={handlePasswordChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Confirm Password</label>
//                 <input
//                   name="confirm"
//                   type="password"
//                   value={passwords.confirm}
//                   onChange={handlePasswordChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {passwordError && (
//               <p className="mt-3 text-sm text-red-600">{passwordError}</p>
//             )}

//             <div className="mt-4 flex flex-wrap gap-3">
//               <button type="submit" className={yellowBtn}>
//                 Update Password
//               </button>

//               <button
//                 type="button"
//                 onClick={handleResetDemo}
//                 className={whiteBtn}
//               >
//                 Reset Demo Data
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* ================= TAB 3: Notifications ================= */}
//       {activeTab === "Notifications" && (
//         <section className="bmAdmin-notifications mt-8 max-w-xl">
//           <h2 className="text-lg text-[color:var(--primary-text)]">
//             Notification Preferences
//           </h2>

//           <ul className="mt-4">
//             {notifications.map((item) => (
//               <NotificationPreferenceRow
//                 key={item.id}
//                 item={item}
//                 onToggle={handleNotificationToggle}
//               />
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* ================= TAB 4: Account Settings ================= */}
//       {activeTab === "Account Settings" && (
//         <AccountSettingsTab
//           showToast={showToast}
//           inputClass={inputClass}
//           labelClass={labelClass}
//           yellowBtn={yellowBtn}
//           whiteBtn={whiteBtn}
//         />
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

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Lock, X } from "lucide-react";

// ========== PAYMENT ACCOUNTS (localStorage helpers) ==========
const ACCOUNTS_KEY = "bm_supplier_payment_accounts";
const WALLET_OPTIONS = ["Easypaisa", "JazzCash"];

const EMPTY_ACCOUNT = {
  type: "", // "bank" | "wallet"
  walletType: "", // "Easypaisa" | "JazzCash"
  name: "", // bank name ya wallet name
  accountTitle: "",
  accountNumber: "",
  instructions: "",
};

const loadAccounts = () => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveAccounts = (list) => {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
  } catch {}
};

// ========== DATA ==========
const BM_TABS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Security" },
  { id: 3, label: "Notifications" },
  { id: 4, label: "Account Settings" },
];

const BM_START_FORM = {
  name: "Super Admin",
  email: "admin@buildmart.pk",
};

const BM_EMPTY_PASSWORDS = { current: "", next: "", confirm: "" };

const BM_START_NOTIFICATIONS = [
  { id: 1, label: "In-app notifications", on: true },
  { id: 2, label: "Email notifications", on: true },
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

// ========== NOTIFICATION ROW COMPONENT ==========
const NotificationPreferenceRow = ({ item, onToggle }) => {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-[color:var(--border-color)] py-4">
      <p className="text-[color:var(--primary-text)]">
        {item.label}{" "}
        <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
          {item.on ? "On" : "Off"}
        </span>
      </p>

      <Toggle
        checked={item.on}
        label={item.label}
        onChange={() => onToggle(item.id)}
      />
    </li>
  );
};

// ========== ACCOUNT MODAL (Add / Edit / View) ==========
const AccountModal = ({ mode, account, onClose, onSave, inputClass, labelClass, yellowBtn }) => {
  const [form, setForm] = useState(account || EMPTY_ACCOUNT);
  const [errors, setErrors] = useState({});

  const isView = mode === "view";
  const isWallet = form.type === "wallet";
  const title =
    mode === "add" ? "Add New Account" : mode === "edit" ? "Edit Account" : "View Account";

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTypeChange = (e) => {
    setForm({ ...form, type: e.target.value, walletType: "", name: "" });
    setErrors({});
  };

  const handleWalletChange = (e) => {
    // wallet choose karte hi wallet name khud bhar jata hai
    setForm({ ...form, walletType: e.target.value, name: e.target.value });
    setErrors((prev) => ({ ...prev, walletType: "", name: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;

    const newErrors = {};
    if (!form.type) newErrors.type = "Please select account type.";
    if (isWallet && !form.walletType) newErrors.walletType = "Please select a wallet.";
    if (!form.name.trim()) newErrors.name = `${isWallet ? "Wallet" : "Bank"} name is required.`;
    if (!form.accountTitle.trim()) newErrors.accountTitle = "Account title is required.";
    if (!form.accountNumber.trim()) {
      newErrors.accountNumber = `${isWallet ? "Mobile number" : "Account number / IBAN"} is required.`;
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSave({
      ...form,
      name: form.name.trim(),
      accountTitle: form.accountTitle.trim(),
      accountNumber: form.accountNumber.trim(),
    });
  };

  const errorText = (key) =>
    errors[key] ? <p className="mt-1 text-xs text-red-600">{errors[key]}</p> : null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl text-[color:var(--primary-text)]">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="cursor-pointer text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Account type */}
          <div>
            <label className={labelClass}>Account Type</label>
            <select
              value={form.type}
              onChange={handleTypeChange}
              disabled={isView}
              className={inputClass}
            >
              <option value="">Select account type</option>
              <option value="bank">Bank</option>
              <option value="wallet">Wallet</option>
            </select>
            {errorText("type")}
          </div>

          {/* Wallet select hone par: Easypaisa / JazzCash */}
          {isWallet && (
            <div>
              <label className={labelClass}>Select Wallet</label>
              <select
                value={form.walletType}
                onChange={handleWalletChange}
                disabled={isView}
                className={inputClass}
              >
                <option value="">Select wallet</option>
                {WALLET_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              {errorText("walletType")}
            </div>
          )}

          {/* Type choose hone ke baad baqi fields */}
          {form.type && (
            <>
              <div>
                <label className={labelClass}>{isWallet ? "Wallet Name" : "Bank Name"}</label>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  disabled={isView}
                  readOnly={isWallet}
                  placeholder={isWallet ? "Select a wallet above" : "e.g. HBL, Meezan Bank"}
                  className={inputClass}
                />
                {errorText("name")}
              </div>

              <div>
                <label className={labelClass}>Account Title</label>
                <input
                  value={form.accountTitle}
                  onChange={(e) => setField("accountTitle", e.target.value)}
                  disabled={isView}
                  className={inputClass}
                />
                {errorText("accountTitle")}
              </div>

              <div>
                <label className={labelClass}>
                  {isWallet ? "Mobile Number" : "Account Number / IBAN"}
                </label>
                <input
                  value={form.accountNumber}
                  onChange={(e) => setField("accountNumber", e.target.value)}
                  disabled={isView}
                  className={inputClass}
                />
                {errorText("accountNumber")}
              </div>

              <div>
                <label className={labelClass}>Payment Instructions (optional)</label>
                <textarea
                  rows={3}
                  value={form.instructions}
                  onChange={(e) => setField("instructions", e.target.value)}
                  disabled={isView}
                  className={inputClass}
                />
              </div>
            </>
          )}

          {!isView && (
            <div className="flex justify-end pt-1">
              <button type="submit" className={yellowBtn}>
                {mode === "add" ? "Add" : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ========== ACCOUNT SETTINGS: PAYMENT ACCOUNTS TABLE ==========
const AccountSettingsTab = ({ showToast, inputClass, labelClass, yellowBtn }) => {
  const [accounts, setAccounts] = useState(null);
  const [modal, setModal] = useState(null); // { mode, account }

  useEffect(() => {
    setAccounts(loadAccounts());
  }, []);

  if (!accounts) return null;

  const persist = (next) => {
    setAccounts(next);
    saveAccounts(next);
  };

  const handleSave = (data) => {
    if (modal.mode === "add") {
      persist([...accounts, { ...data, id: Date.now(), active: true }]);
      showToast("Account added");
    } else {
      persist(accounts.map((a) => (a.id === modal.account.id ? { ...a, ...data } : a)));
      showToast("Account updated");
    }
    setModal(null);
  };

  const handleToggleActive = (acc) => {
    persist(accounts.map((a) => (a.id === acc.id ? { ...a, active: !a.active } : a)));
    showToast(`${acc.name} ${acc.active ? "deactivated" : "activated"}`);
  };

  const headings = ["Type", "Name", "Account Title", "Account Number", "Status", "Actions"];

  return (
    <section className="bmAdmin-account mt-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg text-[color:var(--primary-text)]">
            Supplier Wallet Payment Methods
          </h2>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
            Active accounts are shown to suppliers in Wallet → Top-Up Request.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModal({ mode: "add", account: null })}
          className={yellowBtn}
        >
          Add New Account
        </button>
      </div>

      <div className="mt-5 overflow-x-auto rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
            <tr>
              {headings.map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {accounts.length === 0 && (
              <tr className="border-t border-[color:var(--border-color)]">
                <td
                  colSpan={headings.length}
                  className="px-4 py-8 text-center text-[color:var(--secondary-text)]"
                >
                  No accounts added yet. Click &quot;Add New Account&quot; to create one.
                </td>
              </tr>
            )}

            {accounts.map((acc) => (
              <tr key={acc.id} className="border-t border-[color:var(--border-color)]">
                <td className="px-4 py-3 text-[color:var(--primary-text)]">
                  {acc.type === "bank" ? "Bank" : "Wallet"}
                </td>
                <td className="px-4 py-3 text-[color:var(--primary-text)]">{acc.name}</td>
                <td className="px-4 py-3 text-[color:var(--primary-text)]">{acc.accountTitle}</td>
                <td className="break-all px-4 py-3 text-[color:var(--primary-text)]">
                  {acc.accountNumber}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={acc.active}
                      label={`${acc.active ? "Deactivate" : "Activate"} ${acc.name}`}
                      onChange={() => handleToggleActive(acc)}
                    />
                    <span className="text-xs text-[color:var(--secondary-text)]">
                      {acc.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModal({ mode: "view", account: acc })}
                      className="cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal({ mode: "edit", account: acc })}
                      className="cursor-pointer rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--hover-yellow)]"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <AccountModal
          mode={modal.mode}
          account={modal.account}
          onClose={() => setModal(null)}
          onSave={handleSave}
          inputClass={inputClass}
          labelClass={labelClass}
          yellowBtn={yellowBtn}
        />
      )}
    </section>
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
              <NotificationPreferenceRow
                key={item.id}
                item={item}
                onToggle={handleNotificationToggle}
              />
            ))}
          </ul>
        </section>
      )}

      {/* ================= TAB 4: Account Settings ================= */}
      {activeTab === "Account Settings" && (
        <AccountSettingsTab
          showToast={showToast}
          inputClass={inputClass}
          labelClass={labelClass}
          yellowBtn={yellowBtn}
        />
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