"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Send, Upload } from "lucide-react";
import { orders } from "../../orders/orderData";

/* ============================================================
   DEMO DATA (dropdown ke options)
   ============================================================ */

const supplierOptions = [
  "Al-Noor Building Store",
  "City Material Traders",
  "Zahid Construction Materials",
  "Punjab Building Materials",
  "Modern Builders Mart",
  "Rehman Builders Supply",
];
const inquiryOptions = [
  "BM-INQ-1001 · Red Clay Bricks (A-Class)",
  "BM-INQ-1002 · Ravi Sand (Rait)",
  "BM-INQ-1003 · Steel Saria Grade 60",
  "BM-INQ-1004 · Porcelain Floor Tiles",
];
const orderOptions = orders.map(({ code, item }) => `Order #${code} · ${item}`);
const issueOptions = ["Wrong material", "Wrong quantity", "Quality issue", "Price mismatch", "No response", "Other"];

// Zaroori fields aur unka error message
const required = {
  supplier: "Select a supplier.",
  issue: "Select an issue type.",
  subject: "Enter a subject.",
  description: "Describe the problem.",
};

const startValues = { supplier: "", inquiry: "", order: "", issue: "", subject: "", description: "" };

const Field = ({ label, name, isRequired, error, children }) => (
  <div>
    <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-[#202124]">
      {label}{" "}
      {isRequired ? <span className="text-red-600">*</span> : <span className="font-normal text-[#45484D]">(optional)</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const CustomerNewDisputePage = () => {
  const [values, setValues] = useState(startValues);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const inputClass = (name) =>
    `w-full rounded-lg border bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 ${
      errors[name] ? "border-red-500" : "border-[#D9E3E9]"
    }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
    setDone(false);
  };

  const handleFiles = (e) => setFiles(Array.from(e.target.files).slice(0, 5));

  // DEMO: sirf validation chalti hai, dispute asal mein nahi banta
  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    Object.keys(required).forEach((key) => {
      if (!values[key].trim()) next[key] = required[key];
    });
    setErrors(next);
    setDone(Object.keys(next).length === 0);
  };

  const select = (name, label, options, isRequired) => (
    <Field label={label} name={name} isRequired={isRequired} error={errors[name]}>
      <select id={name} name={name} value={values[name]} onChange={handleChange} className={`${inputClass(name)} h-11`}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </Field>
  );

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <Link href="/customer/disputes" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#45484D] hover:text-[#202124]">
        <ArrowLeft size={14} aria-hidden="true" />
        My Disputes
      </Link>

      <h1 className="mt-3 text-2xl font-extrabold text-[#292929] sm:text-3xl">Raise a Dispute</h1>
      <p className="mt-1 text-xs text-[#45484D]">Tell us about the problem and attach photos if you have them.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2">{select("supplier", "Supplier", supplierOptions, true)}</div>
        <div>{select("inquiry", "Related Inquiry", inquiryOptions, false)}</div>
        <div>{select("order", "Related Order", orderOptions, false)}</div>
        <div>{select("issue", "Issue Type", issueOptions, true)}</div>

        <Field label="Subject" name="subject" isRequired error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
            placeholder="Short title of the problem"
            className={`${inputClass("subject")} h-11`}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Description" name="description" isRequired error={errors.description}>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={values.description}
              onChange={handleChange}
              placeholder="Explain what happened"
              className={`${inputClass("description")} resize-none py-3`}
            />
          </Field>
        </div>

        {/* Evidence */}
        <div className="sm:col-span-2">
          <p className="mb-1.5 text-sm font-semibold text-[#202124]">
            Evidence <span className="font-normal text-[#45484D]">(optional)</span>
          </p>
          <label
            htmlFor="evidence"
            className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 border-dashed border-[#D9E3E9] bg-[#F4F4F2] px-4 py-6 text-center transition-colors hover:border-[#FDC716]"
          >
            <Upload size={26} className="text-[#384452]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#202124]">Upload photos</span>
            <span className="text-xs text-[#45484D]">JPG or PNG, up to 5 photos</span>
          </label>
          <input id="evidence" type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />
          {files.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-[#45484D]">
              {files.map((file) => (
                <li key={file.name} className="truncate">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-3 sm:col-span-2">
          <Link
            href="/customer/disputes"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#202124] bg-white px-6 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-7 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
          >
            <Send size={16} aria-hidden="true" />
            Submit Dispute
          </button>
        </div>

        {done && (
          <p role="status" className="flex items-start gap-2 rounded-lg bg-[#F4F4F2] p-3 text-xs text-[#202124] sm:col-span-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
            Form is valid. This is a demo, so no dispute was created and nothing was saved.
          </p>
        )}
      </form>
    </main>
  );
};

export default CustomerNewDisputePage;