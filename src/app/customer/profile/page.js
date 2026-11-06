"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Lock } from "lucide-react";

/* ============================================================
   DATA (demo)
   ============================================================ */

const tabs = ["Profile", "Personal Information", "Security", "Notifications"];

const startProfile = {
  name: "Ali Raza",
  phone: "0300-1234567",
  email: "customer@demo.com",
  address: "G.T. Road, Gujranwala",
};

// Personal Information form ki fields
const infoFields = [
  { name: "name", label: "Full Name", type: "text", span: "" },
  { name: "phone", label: "Phone Number", type: "tel", span: "" },
  { name: "email", label: "Email", type: "email", span: "" },
  { name: "address", label: "Delivery Address", type: "text", span: "sm:col-span-2" },
];

const passwordFields = [
  { name: "current", label: "Current Password" },
  { name: "next", label: "New Password" },
  { name: "confirm", label: "Confirm Password" },
];

const toggles = [
  { name: "inApp", label: "In-app notifications" },
  { name: "email", label: "Email notifications" },
   { name: "orders", label: "Order & delivery updates", on: true },
  { name: "supplier", label: "Supplier replies", on: true },
  { name: "offers", label: "Offers & promotions", on: false },
];

const inputClass =
  "h-11 w-full rounded-lg border border-[#D9E3E9] bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40";
const yellowBtn =
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-lg bg-[#FDC716] px-6 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]";

/* ============================================================
   1. PROFILE TAB
   ============================================================ */

const ProfileTab = ({ profile }) => {
  const [photo, setPhoto] = useState("");

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <section>
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[#FDC716]">
        {photo ? (
          <Image src={photo} alt="Profile photo" fill unoptimized sizes="112px" className="object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-4xl font-bold text-[#202124]">{profile.name[0]}</span>
        )}
        <label
          htmlFor="photo"
          className="absolute inset-x-0 bottom-0 flex h-8 cursor-pointer items-center justify-center bg-[#202124]/70 text-white transition-colors hover:bg-[#202124]"
        >
          <Camera size={16} aria-label="Change photo" />
        </label>
        <input id="photo" type="file" accept="image/*" onChange={handlePhoto} className="sr-only" />
      </div>

      <h2 className="mt-4 text-xl font-bold text-[#202124]">{profile.name}</h2>
      <p className="mt-2 text-sm text-[#202124]">
        {profile.email} · {profile.phone}
      </p>
      <p className="mt-1 text-sm text-[#45484D]">{profile.address}</p>
    </section>
  );
};

/* ============================================================
   2. PERSONAL INFORMATION TAB
   ============================================================ */

const InfoTab = ({ profile, onSave }) => {
  const [values, setValues] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(values);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-base font-bold text-[#202124]">Personal Information</h2>
      <div className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-2">
        {infoFields.map(({ name, label, type, span }) => (
          <div key={name} className={span}>
            <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#202124]">
              {label}
            </label>
            <input id={name} name={name} type={type} value={values[name]} onChange={handleChange} required className={inputClass} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className={yellowBtn}>
          Save Changes
        </button>
        {saved && <p className="text-sm text-green-700">Saved. (Demo only)</p>}
      </div>
    </form>
  );
};

/* ============================================================
   3. SECURITY TAB
   ============================================================ */

const SecurityTab = () => {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [message, setMessage] = useState({ text: "", ok: false });

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setMessage({ text: "", ok: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { current, next, confirm } = values;
    if (!current || !next || !confirm) return setMessage({ text: "Fill in all three fields.", ok: false });
    if (next.length < 8) return setMessage({ text: "New password must be at least 8 characters.", ok: false });
    if (next !== confirm) return setMessage({ text: "New passwords do not match.", ok: false });
    setValues({ current: "", next: "", confirm: "" });
    setMessage({ text: "Password updated. (Demo only)", ok: true });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="flex items-center gap-2 text-base font-bold text-[#202124]">
        <Lock size={16} aria-hidden="true" />
        Security
      </h2>
      <div className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-3">
        {passwordFields.map(({ name, label }) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#202124]">
              {label}
            </label>
            <input id={name} name={name} type="password" value={values[name]} onChange={handleChange} className={inputClass} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className={yellowBtn}>
          Update Password
        </button>
        {message.text && <p className={`text-sm ${message.ok ? "text-green-700" : "text-red-600"}`}>{message.text}</p>}
      </div>
    </form>
  );
};

/* ============================================================
   4. NOTIFICATIONS TAB
   ============================================================ */

// const NotificationsTab = () => {
//   const [on, setOn] = useState({ inApp: true, email: false });

//   return (
//     <section className="max-w-2xl">
//       <h2 className="text-base font-bold text-[#202124]">Notifications</h2>
//       <ul className="mt-2">
//         {toggles.map(({ name, label }) => (
//           <li key={name} className="flex items-center justify-between gap-4 border-b border-[#E2E4E7] py-4">
//             <p className="text-sm text-[#202124]">
//               {label} <span className="ml-1 text-xs text-[#45484D]">{on[name] ? "On" : "Off"}</span>
//             </p>
//             <button
//               type="button"
//               role="switch"
//               aria-checked={on[name]}
//               aria-label={label}
//               onClick={() => setOn((v) => ({ ...v, [name]: !v[name] }))}
//               className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${on[name] ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`}
//             >
//               <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on[name] ? "left-[22px]" : "left-0.5"}`} />
//             </button>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };


const NotificationsTab = () => {
  const [on, setOn] = useState(Object.fromEntries(toggles.map(({ name, on }) => [name, on])));

  return (
    <section className="max-w-2xl rounded-2xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-[#202124]">Notifications</h2>
      <ul className="mt-4 space-y-4">
        {toggles.map(({ name, label }) => (
          <li key={name} className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#202124]">{label}</p>
            <button
              type="button"
              role="switch"
              aria-checked={on[name]}
              aria-label={label}
              onClick={() => setOn((v) => ({ ...v, [name]: !v[name] }))}
              className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${on[name] ? "bg-[#202124]" : "bg-[#D9E3E9]"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on[name] ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};


/* ============================================================
   PAGE
   ============================================================ */

const CustomerProfilePage = () => {
  const [tab, setTab] = useState("Profile");
  const [profile, setProfile] = useState(startProfile);

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Profile &amp; Settings</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTab(name)}
            className={`h-10 cursor-pointer rounded-lg border px-4 text-sm font-semibold text-[#202124] transition-colors ${
              tab === name ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Profile" && <ProfileTab profile={profile} />}
        {tab === "Personal Information" && <InfoTab profile={profile} onSave={setProfile} />}
        {tab === "Security" && <SecurityTab />}
        {tab === "Notifications" && <NotificationsTab />}
      </div>
    </main>
  );
};

export default CustomerProfilePage;