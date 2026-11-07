"use client";

import { useState } from "react";
import { Pencil, X, CircleCheck } from "lucide-react";

/* ---------------- Datasets ---------------- */

const vehicleTypes = ["Shehzore", "Mazda Truck", "Suzuki Pickup", "Loader Rickshaw"];
const availabilityOptions = ["Available", "Busy", "Offline"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const areas = ["Gujranwala City", "Satellite Town", "Model Town", "Eminabad", "People's Colony", "Wapda Town"];

const vehicleFields = [
  { key: "vehicleName", label: "Vehicle name / model", type: "text" },
  { key: "registration", label: "Registration number", type: "text" },
  { key: "capacity", label: "Maximum weight capacity (kg)", type: "number" },
];

const chargeFields = [
  { key: "minPrice", label: "Minimum delivery price (PKR)" },
  { key: "maxPrice", label: "Maximum delivery price (PKR)" },
  { key: "perKm", label: "Per KM rate (PKR)" },
  { key: "loading", label: "Loading charges (PKR)" },
  { key: "unloading", label: "Unloading charges (PKR)" },
  { key: "other", label: "Other charges (PKR)" },
];

const timeFields = [
  { key: "estimated", label: "Estimated delivery time" },
  { key: "minTime", label: "Minimum delivery time" },
  { key: "maxTime", label: "Maximum delivery time" },
  { key: "hours", label: "Available delivery hours" },
  { key: "city", label: "City" },
];

const startSettings = {
  vehicleType: "Shehzore",
  vehicleName: "",
  registration: "DEMO-2026",
  capacity: "2500",
  availability: "Available",
  images: "",
  minPrice: "2400",
  maxPrice: "4800",
  perKm: "0",
  loading: "0",
  unloading: "0",
  other: "0",
  estimated: "60-90 minutes",
  minTime: "1 hour",
  maxTime: "3 hours",
  hours: "08:00-18:00",
  city: "Gujranwala",
  workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  pickupAreas: ["Gujranwala City", "Satellite Town", "Model Town", "Eminabad"],
  deliveryAreas: ["Gujranwala City", "Satellite Town", "Model Town", "Eminabad"],
};

/* ---------------- Shared styles + helpers ---------------- */

const field =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const labelStyle = "mb-1 block text-xs text-[color:var(--secondary-text)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const outlineBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// Form ki galtiyan dhoondna (khali object = sab theek)
const checkSettings = (s) => {
  const errors = {};
  if (s.registration.trim() === "") errors.registration = "Registration number zaroori hai";
  if (!(Number(s.capacity) > 0)) errors.capacity = "Capacity 0 se zyada honi chahiye";
  if (!(Number(s.minPrice) > 0)) errors.minPrice = "Minimum price 0 se zyada honi chahiye";
  if (Number(s.maxPrice) < Number(s.minPrice)) errors.maxPrice = "Maximum price minimum se kam nahi ho sakti";
  if (s.workDays.length === 0) errors.workDays = "Kam az kam ek din chunen";
  if (s.pickupAreas.length === 0) errors.pickupAreas = "Kam az kam ek pickup area chunen";
  if (s.deliveryAreas.length === 0) errors.deliveryAreas = "Kam az kam ek delivery area chunen";
  return errors;
};

// Overlay + close icon
const ModalShell = ({ size = "max-w-md", onClose, children }) => (
  <div onClick={onClose} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
    <div onClick={(e) => e.stopPropagation()} className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
      >
        <X size={18} />
      </button>
      {children}
    </div>
  </div>
);

// Checkbox ki list (din ya areas)
const CheckGroup = ({ title, items, chosen, error, onToggle }) => (
  <div>
    <p className="text-xs font-medium text-[color:var(--primary-text)]">{title}</p>
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-1.5 text-xs text-[color:var(--primary-text)]">
          <input
            type="checkbox"
            checked={chosen.includes(item)}
            onChange={() => onToggle(item)}
            className="h-3.5 w-3.5 accent-[var(--primary-yellow)]"
          />
          {item}
        </label>
      ))}
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

// Poora form (page aur modal dono isi ko use karte hain)
const SettingsFields = ({ values, errors, prefix, onField, onToggle }) => (
  <div className="flex flex-col gap-6">
    {/* Vehicle information */}
    <div>
      <h3 className="text-sm font-semibold text-[color:var(--primary-text)]">Vehicle information</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${prefix}VehicleType`} className={labelStyle}>Vehicle type</label>
          <select id={`${prefix}VehicleType`} value={values.vehicleType} onChange={(e) => onField("vehicleType", e.target.value)} className={field}>
            {vehicleTypes.map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        {vehicleFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`${prefix}${f.key}`} className={labelStyle}>{f.label}</label>
            <input
              id={`${prefix}${f.key}`}
              type={f.type}
              min={f.type === "number" ? "0" : undefined}
              value={values[f.key]}
              onChange={(e) => onField(f.key, e.target.value)}
              className={field}
            />
            {errors[f.key] && <p className="mt-1 text-xs text-red-600">{errors[f.key]}</p>}
          </div>
        ))}
        <div>
          <label htmlFor={`${prefix}Availability`} className={labelStyle}>Vehicle availability</label>
          <select id={`${prefix}Availability`} value={values.availability} onChange={(e) => onField("availability", e.target.value)} className={field}>
            {availabilityOptions.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${prefix}Images`} className={labelStyle}>Vehicle images</label>
          <input
            id={`${prefix}Images`}
            type="file"
            multiple
            onChange={(e) => onField("images", Array.from(e.target.files).map((f) => f.name).join(", "))}
            className={`${field} cursor-pointer file:mr-3 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm`}
          />
          {values.images && <p className="mt-1 text-xs text-[color:var(--secondary-text)]">{values.images}</p>}
        </div>
      </div>
    </div>

    {/* Delivery charges */}
    <div className="border-t border-[color:var(--border-color)] pt-5">
      <h3 className="text-sm font-semibold text-[color:var(--primary-text)]">Delivery charges</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {chargeFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`${prefix}${f.key}`} className={labelStyle}>{f.label}</label>
            <input id={`${prefix}${f.key}`} type="number" min="0" value={values[f.key]} onChange={(e) => onField(f.key, e.target.value)} className={field} />
            {errors[f.key] && <p className="mt-1 text-xs text-red-600">{errors[f.key]}</p>}
          </div>
        ))}
      </div>
    </div>

    {/* Delivery time */}
    <div className="border-t border-[color:var(--border-color)] pt-5">
      <h3 className="text-sm font-semibold text-[color:var(--primary-text)]">Delivery time</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {timeFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`${prefix}${f.key}`} className={labelStyle}>{f.label}</label>
            <input id={`${prefix}${f.key}`} type="text" value={values[f.key]} onChange={(e) => onField(f.key, e.target.value)} className={field} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <CheckGroup title="Working days" items={days} chosen={values.workDays} error={errors.workDays} onToggle={(d) => onToggle("workDays", d)} />
      </div>
    </div>

    {/* Service areas */}
    <div className="border-t border-[color:var(--border-color)] pt-5">
      <h3 className="text-sm font-semibold text-[color:var(--primary-text)]">Service areas</h3>
      <div className="mt-3 flex flex-col gap-4">
        <CheckGroup title="Pickup areas" items={areas} chosen={values.pickupAreas} error={errors.pickupAreas} onToggle={(a) => onToggle("pickupAreas", a)} />
        <CheckGroup title="Delivery areas" items={areas} chosen={values.deliveryAreas} error={errors.deliveryAreas} onToggle={(a) => onToggle("deliveryAreas", a)} />
      </div>
    </div>
  </div>
);

/* ---------------- Page ---------------- */

const RiderRatesPage = () => {
  const [form, setForm] = useState(startSettings); // page ka form
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [modalForm, setModalForm] = useState(null); // null = modal band
  const [modalErrors, setModalErrors] = useState({});

  // Ek field badalna (page aur modal dono ke liye)
  const handlePageField = (key, value) => setForm({ ...form, [key]: value });
  const handleModalField = (key, value) => setModalForm({ ...modalForm, [key]: value });

  // Checkbox: list mein ho to nikalo, nahi to jodo
  const toggleItem = (values, listKey, item) => {
    const list = values[listKey];
    const next = list.includes(item)
      ? list.reduce((all, x) => (x === item ? all : [...all, x]), [])
      : [...list, item];
    return { ...values, [listKey]: next };
  };
  const handlePageToggle = (listKey, item) => setForm(toggleItem(form, listKey, item));
  const handleModalToggle = (listKey, item) => setModalForm(toggleItem(modalForm, listKey, item));

  // Page ka Save settings button
  const handleSave = () => {
    const found = checkSettings(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setNotice("");
      return;
    }
    setNotice("Settings save ho gayi (demo).");
  };

  // Edit settings: modal kholo (page ke form ki copy ke saath)
  const handleOpenEdit = () => {
    setModalErrors({});
    setModalForm(form);
  };
  const handleCloseEdit = () => setModalForm(null);

  // Modal ka Save changes: page ka form bhi update hota hai
  const handleSaveEdit = () => {
    const found = checkSettings(modalForm);
    setModalErrors(found);
    if (Object.keys(found).length > 0) return;
    setForm(modalForm);
    setErrors({});
    setNotice("Settings update ho gayi (demo).");
    setModalForm(null);
  };

  const handleCloseNotice = () => setNotice("");

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + Edit button */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--secondary-text)]">BuildMart / Rider Workspace</p>
          <h1 className="mt-1 text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Fixed Rate Settings</h1>
          <p className="mt-1 text-xs text-[color:var(--secondary-text)]">Default vehicle, delivery pricing and service coverage · demo</p>
        </div>
        <button type="button" onClick={handleOpenEdit} className={`${outlineBtn} flex items-center gap-2 shadow-sm`}>
          <Pencil size={14} />
          Edit settings
        </button>
      </div>

      {/* Success message */}
      {notice && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
          <span className="flex items-center gap-2">
            <CircleCheck size={16} />
            {notice}
          </span>
          <button type="button" aria-label="Dismiss" onClick={handleCloseNotice}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page form */}
      <div className="mt-5 max-w-3xl rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-6">
        <SettingsFields values={form} errors={errors} prefix="bmPage" onField={handlePageField} onToggle={handlePageToggle} />
        <button type="button" onClick={handleSave} className={`${yellowBtn} mt-6`}>
          Save settings
        </button>
      </div>

      {/* Edit settings modal */}
      {modalForm && (
        <ModalShell size="max-w-3xl" onClose={handleCloseEdit}>
          <h2 className="pr-8 text-xl text-[color:var(--primary-text)] sm:text-2xl">Edit settings</h2>
          <div className="mt-4">
            <SettingsFields values={modalForm} errors={modalErrors} prefix="bmModal" onField={handleModalField} onToggle={handleModalToggle} />
          </div>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={handleCloseEdit} className={outlineBtn}>Cancel</button>
            <button type="button" onClick={handleSaveEdit} className={yellowBtn}>Save changes</button>
          </div>
        </ModalShell>
      )}
    </section>
  );
};

export default RiderRatesPage;