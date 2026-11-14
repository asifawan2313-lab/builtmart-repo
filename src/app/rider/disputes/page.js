"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Eye, FileWarning, Plus, Search, Send, Upload, X } from "lucide-react";

/* ============================================================
   DATA (demo)
   ============================================================ */

const tabs = ["All", "Open", "Under Review", "Resolved", "Rejected"];

// Status badge ke Tailwind classes
const statusClass = {
  Open: "bg-[#FDC716]/25 text-[#202124]",
  "Under Review": "bg-blue-50 text-blue-700",
  Resolved: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

const startDisputes = [
  { id: "DSP-5005", subject: "Customer refused COD payment", against: "Sana Tariq", role: "Customer", order: "RD-101", issueType: "COD refused", amount: "29000", date: "Nov 4, 2026", status: "Open", evidence: ["door_photo.png", "cod_refusal.png"],
    description: "I reached Model Town with the cement and the customer refused to pay Rs 29,000 cash on delivery at the door. I brought the material back to the depot.", adminResponse: null, outcome: "" },
  { id: "DSP-5004", subject: "Loading delayed at the depot", against: "Al-Rehman Depot", role: "Supplier", order: "RD-102", issueType: "Pickup delay at supplier", amount: "", date: "Nov 3, 2026", status: "Under Review", evidence: ["depot_waiting.png"],
    description: "I waited 3 hours at the depot for the bricks to be loaded, so the delivery to Satellite Town was late.",
    adminResponse: { text: "We have contacted the supplier and asked for their side within 2 working days.", date: "Nov 4, 2026" }, outcome: "" },
  { id: "DSP-5003", subject: "Fare received is short", against: "Bilal Ahmed", role: "Customer", order: "RD-103", issueType: "Fare / payment issue", amount: "500", date: "Oct 28, 2026", status: "Under Review", evidence: [],
    description: "The agreed fare was Rs 3,000 but the customer paid only Rs 2,500.",
    adminResponse: { text: "We are checking the fare record for this delivery.", date: "Oct 29, 2026" }, outcome: "" },
  { id: "DSP-5002", subject: "Wrong address, customer not answering", against: "Hira Javed", role: "Customer", order: "RD-104", issueType: "Customer unreachable / wrong address", amount: "600", date: "Oct 20, 2026", status: "Resolved", evidence: ["call_log.png", "address_photo.png"],
    description: "The address given was wrong and the customer did not answer my calls for 2 hours.",
    adminResponse: { text: "Call log confirms the customer was unreachable. Waiting charges are approved.", date: "Oct 22, 2026" }, outcome: "Resolved in your favour: Rs 600 waiting charges added to your wallet." },
  { id: "DSP-5001", subject: "Damaged bags at loading", against: "Al-Rehman Depot", role: "Supplier", order: "RD-101", issueType: "Goods damaged or short", amount: "", date: "Oct 12, 2026", status: "Rejected", evidence: [],
    description: "Some cement bags were torn when I received them at the depot.",
    adminResponse: { text: "No photos were taken at the time of loading, so the damage cannot be confirmed.", date: "Oct 14, 2026" }, outcome: "Rejected: no evidence was provided." },
];

// Dispute kis ke against: Customer ya Supplier
const userTypes = ["Customer", "Supplier"];
const nameLabel = { Customer: "Customer Name", Supplier: "Supplier Name" };
const issueTypes = [
  "COD refused",
  "COD short payment",
  "Fare / payment issue",
  "Pickup delay at supplier",
  "Customer unreachable / wrong address",
  "Goods damaged or short",
  "Delivery commitment",
  "Other",
];
const MAX_PHOTOS = 5;

// Rider ki deliveries (Related Delivery dropdown ke liye)
const demoOrders = [
  { code: "RD-101", item: "Portland Cement", customer: "Sana Tariq", supplier: "Al-Rehman Depot" },
  { code: "RD-102", item: "Red Bricks", customer: "Ali Raza", supplier: "Al-Rehman Depot" },
  { code: "RD-103", item: "Steel Rebar", customer: "Bilal Ahmed", supplier: "Al-Rehman Depot" },
  { code: "RD-104", item: "Porcelain Floor Tiles", customer: "Hira Javed", supplier: "Modern Tiles" },
];

// Naam likhte waqt suggestions
const suggestions = {
  Customer: [...new Set(demoOrders.map((order) => order.customer))],
  Supplier: [...new Set(demoOrders.map((order) => order.supplier))],
};

const startValues = { userType: "", name: "", order: "", amount: "", issueType: "", subject: "", description: "" };

const rules = {
  userType: "Select who the dispute is against.",
  name: "Enter the name.",
  issueType: "Select an issue type.",
  subject: "Enter a short subject.",
  description: "Explain what happened.",
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

const backBtn = "inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#45484D] hover:text-[#202124]";

/* ============================================================
   PAGE: list + raise form + detail, sab isi file mein
   ============================================================ */

const RiderDisputesPage = () => {
  const [disputes, setDisputes] = useState(startDisputes);
  const [screen, setScreen] = useState("list"); // list / new / detail
  const [detailId, setDetailId] = useState(null);
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const [values, setValues] = useState(startValues);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  const text = query.trim().toLowerCase();
  const visible = disputes.reduce((all, d) => {
    const matchTab = tab === "All" || d.status === tab;
    const matchText = !text || `${d.id} ${d.subject} ${d.against}`.toLowerCase().includes(text);
    return matchTab && matchText ? [...all, d] : all;
  }, []);

  const detail = disputes.find((d) => d.id === detailId);

  const inputClass = (name) =>
    `h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 disabled:cursor-not-allowed disabled:bg-[#F4F4F2] ${
      errors[name] ? "border-red-500" : "border-[#D9E3E9]"
    }`;

  /* ---------- Handlers ---------- */

  const handleOpenNew = () => {
    setValues(startValues);
    setPhotos([]);
    setErrors({});
    setScreen("new");
  };
  const handleBackToList = () => setScreen("list");

  const handleView = (id) => {
    setDetailId(id);
    setScreen("detail");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // User type badalne par purana naam saaf
    setValues((v) => ({ ...v, [name]: value, ...(name === "userType" && { name: "" }) }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  // Ek se zyada photos (MAX_PHOTOS tak)
  const handleFiles = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({ id: Math.random().toString(36).slice(2), name: file.name }));
    setPhotos((list) => [...list, ...picked].slice(0, MAX_PHOTOS));
    e.target.value = "";
  };

  const handleRemovePhoto = (id) => setPhotos((list) => list.filter((photo) => photo.id !== id));

  // Evidence ki image nayi tab mein khulti hai
  const handlePreview = (name) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="#F4F4F2"/><text x="240" y="150" font-size="26" font-family="Arial" text-anchor="middle" fill="#292929">${name}</text><text x="240" y="185" font-size="15" font-family="Arial" text-anchor="middle" fill="#6b6b6b">Demo evidence image</text></svg>`;
    window.open(URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })), "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = Object.entries(rules).reduce(
      (all, [key, message]) => (values[key].trim() ? all : { ...all, [key]: message }),
      {}
    );
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const order = demoOrders.find((o) => o.code === values.order);
    const newDispute = {
      id: `DSP-${5001 + disputes.length}`,
      subject: values.subject.trim(),
      against: values.name.trim(),
      role: values.userType,
      order: order ? order.code : "—",
      issueType: values.issueType,
      amount: values.amount,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Open",
      evidence: photos.map((p) => p.name),
      description: values.description.trim(),
      adminResponse: null,
      outcome: "",
    };

    setDisputes([newDispute, ...disputes]);
    setTab("All");
    setQuery("");
    setScreen("list");
    setToast("Dispute submitted. Admin will review it soon.");
    setTimeout(() => setToast(""), 3000);
  };

  /* ---------- Screens ---------- */

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* ================= LIST ================= */}
      {screen === "list" && (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">My Disputes</h1>
              <p className="mt-1 text-xs text-[#45484D]">Complaints you have raised about customers and suppliers.</p>
            </div>
            <button
              type="button"
              onClick={handleOpenNew}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
            >
              <Plus size={16} aria-hidden="true" />
              Raise a Dispute
            </button>
          </div>

          {/* Tabs + search */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Dispute status">
              {tabs.map((name) => {
                const isActive = tab === name;
                const count = disputes.reduce((n, d) => (name === "All" || d.status === name ? n + 1 : n), 0);
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTab(name)}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold text-[#202124] transition-colors ${
                      isActive ? "border-[#FDC716] bg-[#FDC716]" : "border-[#D9E3E9] bg-white hover:border-[#FDC716]"
                    }`}
                  >
                    {name}
                    <span className={`rounded-full px-1.5 text-[11px] leading-5 ${isActive ? "bg-white" : "bg-[#F4F4F2]"}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45484D]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search disputes"
                placeholder="Search disputes"
                className="h-10 w-full rounded-lg border border-[#D9E3E9] bg-white pl-9 pr-3 text-sm text-[#202124] outline-none placeholder:text-[#45484D]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40"
              />
            </div>
          </div>

          {/* List */}
          <section className="mt-4 overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
            {visible.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-[#45484D]">No disputes found.</p>
            ) : (
              <ul className="divide-y divide-[#E2E4E7]">
                {visible.map(({ id, subject, against, role, date, status }) => (
                  <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                      <FileWarning size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 basis-48">
                      <p className="truncate text-sm font-semibold text-[#202124]">{subject}</p>
                      <p className="truncate text-xs text-[#45484D]">
                        {against} · {role}
                      </p>
                      <p className="truncate text-xs text-[#45484D]">
                        #{id} · {date}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
                    <button
                      type="button"
                      onClick={() => handleView(id)}
                      className="inline-flex h-9 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#D9E3E9] bg-white px-4 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
                    >
                      View
                      <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="mt-4 text-center text-xs text-[#45484D]">Sample disputes shown for demonstration purposes.</p>
        </>
      )}

      {/* ================= RAISE A DISPUTE ================= */}
      {screen === "new" && (
        <>
          <button type="button" onClick={handleBackToList} className={backBtn}>
            <ArrowLeft size={14} aria-hidden="true" />
            My Disputes
          </button>

          <h1 className="mt-3 text-2xl font-extrabold text-[#292929] sm:text-3xl">Raise a Dispute</h1>
          <p className="mt-1 text-xs text-[#45484D]">Tell us about the delivery problem and attach photos if you have them.</p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 grid max-w-3xl gap-5 rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6"
          >
            <Field label="Dispute Against" name="userType" required error={errors.userType}>
              <select id="userType" name="userType" value={values.userType} onChange={handleChange} className={inputClass("userType")}>
                <option value="">Select user type</option>
                {userTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

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

            <Field label="Related Delivery" name="order">
              <select id="order" name="order" value={values.order} onChange={handleChange} className={inputClass("order")}>
                <option value="">Select related delivery</option>
                {demoOrders.map(({ code, item }) => (
                  <option key={code} value={code}>
                    {code} · {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Amount Involved (PKR)" name="amount">
              <input
                id="amount"
                name="amount"
                type="number"
                min="0"
                value={values.amount}
                onChange={handleChange}
                placeholder="COD or fare amount (optional)"
                className={inputClass("amount")}
              />
            </Field>

            <Field label="Issue Type" name="issueType" required error={errors.issueType}>
              <select id="issueType" name="issueType" value={values.issueType} onChange={handleChange} className={inputClass("issueType")}>
                <option value="">Select issue type</option>
                {issueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>

            <Field label="Subject" name="subject" required error={errors.subject}>
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
                        onClick={() => handleRemovePhoto(id)}
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
              <button
                type="button"
                onClick={handleBackToList}
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#202124] bg-white px-6 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] px-7 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]"
              >
                <Send size={16} aria-hidden="true" />
                Submit Dispute
              </button>
            </div>
          </form>
        </>
      )}

      {/* ================= DETAIL ================= */}
      {screen === "detail" && detail && (
        <>
          <button type="button" onClick={handleBackToList} className={backBtn}>
            <ArrowLeft size={14} aria-hidden="true" />
            My Disputes
          </button>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">{detail.subject}</h1>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[detail.status]}`}>{detail.status}</span>
          </div>
          <p className="mt-1 text-xs text-[#45484D]">
            #{detail.id} · {detail.date}
          </p>

          <section className="mt-6 max-w-3xl rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm sm:p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[#45484D]">Against</dt>
                <dd className="text-sm font-semibold text-[#202124]">
                  {detail.against} · {detail.role}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#45484D]">Related Delivery</dt>
                <dd className="text-sm font-semibold text-[#202124]">{detail.order}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#45484D]">Issue Type</dt>
                <dd className="text-sm font-semibold text-[#202124]">{detail.issueType}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#45484D]">Date</dt>
                <dd className="text-sm font-semibold text-[#202124]">{detail.date}</dd>
              </div>
              {detail.amount && (
                <div>
                  <dt className="text-xs text-[#45484D]">Amount Involved</dt>
                  <dd className="text-sm font-semibold text-[#202124]">PKR {Number(detail.amount).toLocaleString()}</dd>
                </div>
              )}
            </dl>

            <h2 className="mt-6 text-sm font-semibold text-[#202124]">Description</h2>
            <p className="mt-1 break-words text-sm text-[#45484D]">{detail.description}</p>

            <h2 className="mt-6 text-sm font-semibold text-[#202124]">Evidence ({detail.evidence.length})</h2>
            {detail.evidence.length === 0 ? (
              <p className="mt-1 text-sm text-[#45484D]">No photos attached.</p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-2">
                {detail.evidence.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => handlePreview(name)}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#F4F4F2] px-3 py-1.5 text-xs text-[#202124] hover:bg-[#D9E3E9]"
                    >
                      <Eye size={12} aria-hidden="true" />
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {detail.adminResponse && (
              <div className="mt-6 rounded-lg bg-[#F4F4F2] p-4">
                <h2 className="text-sm font-semibold text-[#202124]">Admin Response</h2>
                <p className="mt-1 break-words text-sm text-[#45484D]">{detail.adminResponse.text}</p>
                <p className="mt-1 text-xs text-[#45484D]">{detail.adminResponse.date}</p>
              </div>
            )}

            {detail.outcome && (
              <div className="mt-4 rounded-lg border border-[#E2E4E7] p-4">
                <h2 className="text-sm font-semibold text-[#202124]">Outcome</h2>
                <p className="mt-1 break-words text-sm text-[#45484D]">{detail.outcome}</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* ===== Toast ===== */}
      {toast && (
        <div role="status" className="fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[#202124] px-4 py-3 text-sm text-white shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </main>
  );
};

export default RiderDisputesPage;