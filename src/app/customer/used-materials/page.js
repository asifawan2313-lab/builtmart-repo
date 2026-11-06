"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, MapPin, Plus, Recycle, Upload, X } from "lucide-react";

/* ============================================================
   DATA (dropdown ke options)
   ============================================================ */

const categories = [
  "Used Bricks", "Reused Steel", "Leftover Cement", "Used Tiles", "Reusable Wood",
  "Used Doors & Windows", "Used Furniture", "Leftover Sand", "Used Glass Windows", "Used Aluminium Windows",
  "Used Grills & Gates", "Leftover Paint", "Used Electrical Wire", "Used Pipes", "Used Sanitary Items",
  "Used Ceiling Panels", "Used Scaffolding", "Used Roofing Sheets", "Used Marble & Stone", "Reusable Construction Equipment",
];
const conditions = ["Like new", "Good", "Fair"];
const locations = ["Gujranwala City", "Satellite Town", "Model Town", "GT Road", "Peoples Colony"];

const MAX_PHOTOS = 6;

const startValues = {
  name: "",
  category: categories[0],
  condition: "Good",
  quantity: "",
  price: "",
  location: locations[0],
  description: "",
};

const statusClass = { Live: "bg-green-50 text-green-700", Draft: "bg-[#F4F4F2] text-[#45484D]" };

const yellowBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292929]";

/* ============================================================
   1. SUBMIT MODAL (form + multiple photos)
   ============================================================ */

const Field = ({ label, name, required, error, children }) => (
  <div>
    <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#202124]">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const SubmitModal = ({ onClose, onSave }) => {
  const [values, setValues] = useState(startValues);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  // Escape dabane par modal band
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const inputClass = (name) =>
    `h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 ${
      errors[name] ? "border-red-500" : "border-[#D9E3E9]"
    }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  // Ek se zyada photos chun sakte hain (aakhir tak MAX_PHOTOS)
  const handleFiles = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).slice(2),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPhotos((list) => [...list, ...picked].slice(0, MAX_PHOTOS));
    e.target.value = "";
  };

  const handleRemovePhoto = (id) => setPhotos((list) => list.filter((photo) => photo.id !== id));

  // Draft mein sirf naam zaroori hai, Live mein naam, quantity aur price
  const handleSave = (status) => {
    const next = {};
    if (!values.name.trim()) next.name = "Enter the material name.";
    if (status === "Live") {
      if (!values.quantity.trim()) next.quantity = "Enter quantity and unit.";
      if (!(Number(values.price) > 0)) next.price = "Enter a valid price.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) onSave({ ...values, photos, status });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-title"
        noValidate
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave("Live");
        }}
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <h2 id="submit-title" className="text-xl font-bold text-[#202124]">
            Submit used material
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-full p-1.5 text-[#45484D] transition-colors hover:bg-[#F4F4F2] hover:text-[#202124]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Material name" name="name" required error={errors.name}>
              <input id="name" name="name" type="text" value={values.name} onChange={handleChange} className={inputClass("name")} />
            </Field>
          </div>

          <Field label="Category" name="category">
            <select id="category" name="category" value={values.category} onChange={handleChange} className={inputClass("category")}>
              {categories.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          <Field label="Condition" name="condition">
            <select id="condition" name="condition" value={values.condition} onChange={handleChange} className={inputClass("condition")}>
              {conditions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          <Field label="Quantity & unit" name="quantity" required error={errors.quantity}>
            <input
              id="quantity"
              name="quantity"
              type="text"
              value={values.quantity}
              onChange={handleChange}
              placeholder="e.g. 500 bricks"
              className={inputClass("quantity")}
            />
          </Field>

          <Field label="Asking price (Rs)" name="price" required error={errors.price}>
            <input id="price" name="price" type="number" min="0" value={values.price} onChange={handleChange} className={inputClass("price")} />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Location" name="location">
              <select id="location" name="location" value={values.location} onChange={handleChange} className={inputClass("location")}>
                {locations.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Description" name="description">
              <textarea
                id="description"
                name="description"
                rows={3}
                value={values.description}
                onChange={handleChange}
                className={`${inputClass("description")} h-auto resize-none py-2.5`}
              />
            </Field>
          </div>

          {/* Photos: ek se zyada */}
          <div className="sm:col-span-2">
            <p className="mb-1 text-sm font-medium text-[#202124]">
              Photos{" "}
              <span className="font-normal text-[#45484D]">
                ({photos.length}/{MAX_PHOTOS})
              </span>
            </p>

            <label
              htmlFor="photos"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#D9E3E9] bg-[#F4F4F2] px-4 py-4 text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716]"
            >
              <Upload size={18} aria-hidden="true" />
              Choose photos
            </label>
            <input id="photos" type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />

            {photos.length > 0 && (
              <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map(({ id, name, url }) => (
                  <li key={id} className="relative aspect-square overflow-hidden rounded-lg bg-[#E2E4E7]">
                    <Image src={url} alt={name} fill unoptimized sizes="96px" className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(id)}
                      aria-label={`Remove ${name}`}
                      className="absolute right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#202124]/80 text-white hover:bg-[#202124]"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => handleSave("Draft")}
            className="h-11 cursor-pointer rounded-lg px-4 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
          >
            Save draft
          </button>
          <button type="submit" className={`${yellowBtn} h-11 px-6`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

/* ============================================================
   PAGE
   ============================================================ */

const CustomerUsedMaterialsPage = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  // DEMO: item sirf is page ki list mein aata hai (home page par asli listing backend ke baad hogi)
  const handleSave = (item) => {
    setItems((list) => [{ id: Date.now(), ...item }, ...list]);
    setOpen(false);
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Used Materials</h1>
          <p className="mt-1 text-xs text-[#45484D]">Your listings go live on the home page right away.</p>
        </div>
        <button type="button" onClick={() => setOpen(true)} className={`${yellowBtn} h-10 gap-2 px-5`}>
          <Plus size={16} aria-hidden="true" />
          Submit material
        </button>
      </div>

      {items.length === 0 ? (
        <section className="mt-6 flex flex-col items-center rounded-xl border-2 border-dashed border-[#D9E3E9] bg-white px-4 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F4F4F2] text-[#202124]">
            <Recycle size={26} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-base font-bold text-[#202124]">No submissions yet</h2>
          <p className="mt-1 max-w-sm text-sm text-[#45484D]">
            Have leftover bricks, tiles or steel? List them for other builders in Gujranwala.
          </p>
          <button type="button" onClick={() => setOpen(true)} className={`${yellowBtn} mt-5 h-11 px-6`}>
            Submit your first item
          </button>
        </section>
      ) : (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(({ id, name, category, condition, quantity, price, location, photos, status }) => (
            <article key={id} className="overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
              <div className="relative h-44 bg-[#E2E4E7]">
                {photos.length > 0 ? (
                  <Image src={photos[0].url} alt={name} fill unoptimized sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[#45484D]">
                    <ImageIcon size={28} aria-label="No photo" />
                  </span>
                )}
                <span className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusClass[status]}`}>{status}</span>
                {photos.length > 1 && (
                  <span className="absolute right-2 top-2 rounded-full bg-[#202124]/80 px-2.5 py-0.5 text-[11px] font-medium text-white">
                    {photos.length} photos
                  </span>
                )}
              </div>

              <div className="space-y-1 p-3">
                <h3 className="truncate text-sm font-bold text-[#202124]">{name}</h3>
                <p className="truncate text-xs text-[#45484D]">
                  {category} · {condition}
                </p>
                <p className="text-sm font-extrabold text-[#202124]">{price ? `Rs. ${Number(price).toLocaleString()}` : "Price not set"}</p>
                <p className="truncate text-xs text-[#45484D]">{quantity || "Quantity not set"}</p>
                <p className="flex items-center gap-1 text-xs text-[#45484D]">
                  <MapPin size={12} className="shrink-0" aria-hidden="true" />
                  {location}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}

      {open && <SubmitModal onClose={() => setOpen(false)} onSave={handleSave} />}
    </main>
  );
};

export default CustomerUsedMaterialsPage;