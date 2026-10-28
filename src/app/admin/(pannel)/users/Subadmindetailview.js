import { ArrowLeft } from "lucide-react";

export default function SubAdminDetail({ subAdmin, onBack }) {
  const info = [
    { label: "Name", value: subAdmin.name },
    { label: "Email", value: subAdmin.email },
    { label: "Phone", value: subAdmin.phone },
    { label: "City", value: subAdmin.city },
    { label: "Registered", value: subAdmin.registered },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Naam + Back */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">{subAdmin.name}</h1>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
        >
          <ArrowLeft size={16} />
          Back to Sub-Admins
        </button>
      </div>

      {/* Status badge */}
      <span
        className={`mt-4 inline-block rounded-full px-2.5 py-1 text-xs ring-1 ${
          subAdmin.active ? "bg-green-50 text-green-700 ring-green-200" : "bg-red-50 text-red-600 ring-red-200"
        }`}
      >
        {subAdmin.active ? "Active" : "Inactive"}
      </span>

      {/* Info */}
      <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
        {info.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-[color:var(--secondary-text)]">{item.label}</p>
            <p className="mt-1 text-sm text-[color:var(--primary-text)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Permitted modules */}
      <p className="mt-6 text-[color:var(--primary-text)]">
        Permitted modules: {subAdmin.modules.join(", ")}
      </p>
    </section>
  );
}