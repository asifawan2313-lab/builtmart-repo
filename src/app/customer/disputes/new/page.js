// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ArrowLeft, CheckCircle2, Send, Upload } from "lucide-react";
// import { orders } from "../../orders/orderData";

// /* ============================================================
//    DEMO DATA (dropdown ke options)
//    ============================================================ */

// const supplierOptions = [
//   "Al-Noor Building Store",
//   "City Material Traders",
//   "Zahid Construction Materials",
//   "Punjab Building Materials",
//   "Modern Builders Mart",
//   "Rehman Builders Supply",
// ];
// const inquiryOptions = [
//   "BM-INQ-1001 · Red Clay Bricks (A-Class)",
//   "BM-INQ-1002 · Ravi Sand (Rait)",
//   "BM-INQ-1003 · Steel Saria Grade 60",
//   "BM-INQ-1004 · Porcelain Floor Tiles",
// ];
// const orderOptions = orders.map(({ code, item }) => `Order #${code} · ${item}`);
// const issueOptions = ["Wrong material", "Wrong quantity", "Quality issue", "Price mismatch", "No response", "Other"];

// // Zaroori fields aur unka error message
// const required = {
//   supplier: "Select a supplier.",
//   issue: "Select an issue type.",
//   subject: "Enter a subject.",
//   description: "Describe the problem.",
// };

// const startValues = { supplier: "", inquiry: "", order: "", issue: "", subject: "", description: "" };

// const Field = ({ label, name, isRequired, error, children }) => (
//   <div>
//     <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-[#202124]">
//       {label}{" "}
//       {isRequired ? <span className="text-red-600">*</span> : <span className="font-normal text-[#45484D]">(optional)</span>}
//     </label>
//     {children}
//     {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
//   </div>
// );

// const CustomerNewDisputePage = () => {
//   const [values, setValues] = useState(startValues);
//   const [files, setFiles] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [done, setDone] = useState(false);

//   const inputClass = (name) =>
//     `w-full rounded-lg border bg-white px-3 text-sm text-[#202124] outline-none transition-colors focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 ${
//       errors[name] ? "border-red-500" : "border-[#D9E3E9]"
//     }`;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues((v) => ({ ...v, [name]: value }));
//     setErrors((er) => ({ ...er, [name]: "" }));
//     setDone(false);
//   };

//   const handleFiles = (e) => setFiles(Array.from(e.target.files).slice(0, 5));

//   // DEMO: sirf validation chalti hai, dispute asal mein nahi banta
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const next = {};
//     Object.keys(required).forEach((key) => {
//       if (!values[key].trim()) next[key] = required[key];
//     });
//     setErrors(next);
//     setDone(Object.keys(next).length === 0);
//   };

//   const select = (name, label, options, isRequired) => (
//     <Field label={label} name={name} isRequired={isRequired} error={errors[name]}>
//       <select id={name} name={name} value={values[name]} onChange={handleChange} className={`${inputClass(name)} h-11`}>
//         <option value="">Select {label.toLowerCase()}</option>
//         {options.map((option) => (
//           <option key={option}>{option}</option>
//         ))}
//       </select>
//     </Field>
//   );

//   return (
//     <main className="p-4 sm:p-6 lg:p-8">
//       <Link href="/customer/disputes" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#45484D] hover:text-[#202124]">
//         <ArrowLeft size={14} aria-hidden="true" />
//         My Disputes
//       </Link>

//       <h1 className="mt-3 text-2xl font-extrabold text-[#292929] sm:text-3xl">Raise a Dispute</h1>
//       <p className="mt-1 text-xs text-[#45484D]">Tell us about the problem and attach photos if you have them.</p>

//       <form onSubmit={handleSubmit} noValidate className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
//         <div className="sm:col-span-2">{select("supplier", "Supplier", supplierOptions, true)}</div>
//         <div>{select("inquiry", "Related Inquiry", inquiryOptions, false)}</div>
//         <div>{select("order", "Related Order", orderOptions, false)}</div>
//         <div>{select("issue", "Issue Type", issueOptions, true)}</div>

//         <Field label="Subject" name="subject" isRequired error={errors.subject}>
//           <input
//             id="subject"
//             name="subject"
//             type="text"
//             value={values.subject}
//             onChange={handleChange}
//             placeholder="Short title of the problem"
//             className={`${inputClass("subject")} h-11`}
//           />
//         </Field>

//         <div className="sm:col-span-2">
//           <Field label="Description" name="description" isRequired error={errors.description}>
//             <textarea
//               id="description"
//               name="description"
//               rows={5}
//               value={values.description}
//               onChange={handleChange}
//               placeholder="Explain what happened"
//               className={`${inputClass("description")} resize-none py-3`}
//             />
//           </Field>
//         </div>

//         {/* Evidence */}
//         <div className="sm:col-span-2">
//           <p className="mb-1.5 text-sm font-semibold text-[#202124]">
//             Evidence <span className="font-normal text-[#45484D]">(optional)</span>
//           </p>
//           <label
//             htmlFor="evidence"
//             className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 border-dashed border-[#D9E3E9] bg-[#F4F4F2] px-4 py-6 text-center transition-colors hover:border-[#FDC716]"
//           >
//             <Upload size={26} className="text-[#384452]" aria-hidden="true" />
//             <span className="text-sm font-semibold text-[#202124]">Upload photos</span>
//             <span className="text-xs text-[#45484D]">JPG or PNG, up to 5 photos</span>
//           </label>
//           <input id="evidence" type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />
//           {files.length > 0 && (
//             <ul className="mt-2 space-y-1 text-xs text-[#45484D]">
//               {files.map((file) => (
//                 <li key={file.name} className="truncate">
//                   {file.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-wrap justify-end gap-3 sm:col-span-2">
//           <Link
//             href="/customer/disputes"
//             className="inline-flex h-11 items-center justify-center rounded-lg border border-[#202124] bg-white px-6 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
//           >
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-7 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
//           >
//             <Send size={16} aria-hidden="true" />
//             Submit Dispute
//           </button>
//         </div>

//         {done && (
//           <p role="status" className="flex items-start gap-2 rounded-lg bg-[#F4F4F2] p-3 text-xs text-[#202124] sm:col-span-2">
//             <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
//             Form is valid. This is a demo, so no dispute was created and nothing was saved.
//           </p>
//         )}
//       </form>
//     </main>
//   );
// };

// export default CustomerNewDisputePage;





"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Upload, X } from "lucide-react";
import { orders } from "../../orders/orderData";

/* ============================================================
   DATA
   ============================================================ */

// Pehle yeh chunna hota hai: dispute ya support
const kinds = ["Dispute", "Support"];

// Dispute: kis ke against
const userTypes = ["Supplier", "Rider", "Customer"];
const nameLabel = { Supplier: "Shop Name", Rider: "Rider Name", Customer: "Customer Name" };
const issueTypes = ["Wrong material", "Quality issue", "Price mismatch", "No response", "Other"];
const MAX_PHOTOS = 5;

// Naam likhte waqt suggestions orders ke data se (Customer ke liye koi suggestion nahi)
const suggestions = {
  Supplier: [...new Set(orders.map((order) => order.supplier))],
  Rider: [...new Set(orders.filter((order) => order.rider).map((order) => order.rider.name))],
  Customer: [],
};

const startValues = { userType: "", name: "", order: "", issueType: "", subject: "", description: "" };

// Har qism ke zaroori fields: khali ho to ye message dikhta hai
const rules = {
  Dispute: {
    userType: "Select who the dispute is against.",
    name: "Enter the name.",
    issueType: "Select an issue type.",
    subject: "Enter a short subject.",
    description: "Explain what happened.",
  },
  Support: {
    subject: "Enter a short subject.",
    description: "Explain what you need help with.",
  },
};

/* ============================================================
   SMALL PARTS
   ============================================================ */

const Field = ({ label, name, required, error, className = "", children }) => (
  <div className={className}>
    <label htmlFor={name} className="mb-1 block text-sm font-semibold text-[#202124]">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

/* ============================================================
   PAGE
   ============================================================ */

const CustomerNewDisputePage = () => {
  const [kind, setKind] = useState("Dispute");
  const [values, setValues] = useState(startValues);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isDispute = kind === "Dispute";

  const inputClass = (name) =>
    `h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 disabled:cursor-not-allowed disabled:bg-[#F4F4F2] ${
      errors[name] ? "border-red-500" : "border-[#D9E3E9]"
    }`;

  const handleKind = (next) => {
    setKind(next);
    setErrors({});
    setSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // User type badalne par purana naam saaf
    setValues((v) => ({ ...v, [name]: value, ...(name === "userType" && { name: "" }) }));
    setErrors((er) => ({ ...er, [name]: "" }));
    setSubmitted(false);
  };

  // Ek se zyada photos (MAX_PHOTOS tak)
  const handleFiles = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({ id: Math.random().toString(36).slice(2), name: file.name }));
    setPhotos((list) => [...list, ...picked].slice(0, MAX_PHOTOS));
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    Object.entries(rules[kind]).forEach(([key, message]) => {
      if (!values[key].trim()) next[key] = message;
    });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // DEMO: asli app mein yahan backend ko bheja jayega
    setValues(startValues);
    setPhotos([]);
    setSubmitted(true);
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Raise a Dispute</h1>
      <p className="mt-1 text-xs text-[#45484D]">Tell us about the problem and attach photos if you have them.</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6"
      >
        {/* 0. Dispute ya Support */}
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-semibold text-[#202124]">
            Type <span className="text-red-600">*</span>
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Request type">
            {kinds.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={kind === name}
                onClick={() => handleKind(name)}
                className={`h-10 cursor-pointer rounded-full border px-6 text-sm font-semibold text-[#202124] transition-colors ${
                  kind === name ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Sirf Dispute: kis ke against, us ka naam, related order */}
        {isDispute && (
          <>
            <Field label="Dispute Against" name="userType" required error={errors.userType}>
              <select id="userType" name="userType" value={values.userType} onChange={handleChange} className={inputClass("userType")}>
                <option value="">Select user type</option>
                {userTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

            {/* Us ka naam (Supplier ho to shop ka naam) */}
            <Field label={nameLabel[values.userType] || "Name"} name="name" required error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                list="name-options"
                value={values.name}
                onChange={handleChange}
                disabled={!values.userType}
                placeholder={values.userType ? `Enter ${nameLabel[values.userType].toLowerCase()}` : "Select user type first"}
                className={inputClass("name")}
              />
              <datalist id="name-options">
                {(suggestions[values.userType] || []).map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </Field>

            <Field label="Related Order" name="order" className="sm:col-span-2">
              <select id="order" name="order" value={values.order} onChange={handleChange} className={inputClass("order")}>
                <option value="">Select related order</option>
                {orders.map(({ code, item }) => (
                  <option key={code} value={code}>
                    {code} · {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Issue Type" name="issueType" required error={errors.issueType}>
              <select id="issueType" name="issueType" value={values.issueType} onChange={handleChange} className={inputClass("issueType")}>
                <option value="">Select issue type</option>
                {issueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>
          </>
        )}

        <Field label="Subject" name="subject" required error={errors.subject} className={isDispute ? "" : "sm:col-span-2"}>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
            placeholder="Short title of the problem"
            className={inputClass("subject")}
          />
        </Field>

        <Field label="Description" name="description" required error={errors.description} className="sm:col-span-2">
          <textarea
            id="description"
            name="description"
            rows={5}
            value={values.description}
            onChange={handleChange}
            placeholder="Explain what happened"
            className={`${inputClass("description")} h-auto resize-none py-3`}
          />
        </Field>

        {/* Evidence: photos */}
        <div className="sm:col-span-2">
          <p className="mb-1 text-sm font-semibold text-[#202124]">
            Evidence <span className="font-normal text-[#45484D]">(optional)</span>
          </p>
          <label
            htmlFor="evidence"
            className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 border-dashed border-[#D9E3E9] bg-[#F4F4F2] px-4 py-6 text-center transition-colors hover:border-[#FDC716]"
          >
            <Upload size={24} className="text-[#384452]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#202124]">Upload photos</span>
            <span className="text-xs text-[#45484D]">
              JPG or PNG, up to {MAX_PHOTOS} photos ({photos.length}/{MAX_PHOTOS})
            </span>
          </label>
          <input id="evidence" type="file" accept="image/*" multiple onChange={handleFiles} className="sr-only" />

          {photos.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {photos.map(({ id, name }) => (
                <li key={id} className="flex max-w-full items-center gap-2 rounded-full bg-[#F4F4F2] py-1 pl-3 pr-1 text-xs text-[#202124]">
                  <span className="truncate">{name}</span>
                  <button
                    type="button"
                    onClick={() => setPhotos((list) => list.filter((photo) => photo.id !== id))}
                    aria-label={`Remove ${name}`}
                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-[#D9E3E9]"
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 sm:col-span-2">
          {submitted && <p className="mr-auto text-sm text-green-700">{kind} submitted. (Demo only)</p>}
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
            {isDispute ? "Submit Dispute" : "Submit Request"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CustomerNewDisputePage;