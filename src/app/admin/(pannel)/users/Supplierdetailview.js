"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Eye, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";

const documents = ["cnic_front.pdf", "cnic_back.pdf", "ntn_certificate.pdf"];

const orderHeadings = ["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"];

const tones = {
  green: "bg-green-50 text-green-700 ring-green-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  red: "bg-red-50 text-red-600 ring-red-200",
};

export default function SupplierDetail({ supplier, onBack }) {
  const [search, setSearch] = useState("");

  const info = [
    { label: "Name", value: supplier.name },
    { label: "Email", value: supplier.email },
    { label: "Phone", value: supplier.phone },
    { label: "City", value: supplier.city },
    { label: "Registered", value: supplier.registered },
    { label: "Shop Name", value: supplier.shop },
    { label: "Business Type", value: supplier.type },
    { label: "Address", value: supplier.address },
    { label: "Submitted", value: supplier.submitted },
    { label: "Wallet Balance", value: supplier.wallet },
  ];

  // Search: kisi bhi column mein likha hua text mil jaye to order dikhao
  const match = (o) =>
    `${o.id} ${o.customer} ${o.material} ${o.date} ${o.amount} ${o.pay} ${o.status}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const shown = supplier.orders.reduce((n, o) => n + (match(o) ? 1 : 0), 0);

  const btn =
    "inline-flex items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Naam + Back */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">{supplier.shop}</h1>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
        >
          <ArrowLeft size={16} />
          Back to Suppliers
        </button>
      </div>

      {/* Status badges */}
      <div className="mt-4 flex gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
            supplier.verification === "Verified" ? tones.green : supplier.verification === "Pending" ? tones.amber : tones.red
          }`}
        >
          {supplier.verification}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${supplier.active ? tones.green : tones.red}`}>
          {supplier.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Info */}
      <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
        {info.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-[color:var(--secondary-text)]">{item.label}</p>
            <p className="mt-1 text-sm text-[color:var(--primary-text)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Uploaded documents: Preview = nayi tab, Download = file download */}
      <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Uploaded Documents</h2>
      <div className="mt-3 flex flex-col gap-3">
        {documents.map((doc) => (
          <div key={doc} className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
              <FileText size={16} className="text-[color:var(--secondary-text)]" />
              {doc}
            </span>
            <div className="flex gap-2">
              <a href={`/documents/${doc}`} target="_blank" rel="noreferrer" className={btn}>
                <Eye size={14} /> Preview
              </a>
              <a href={`/documents/${doc}`} download className={btn}>
                <Download size={14} /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">All Supplier Orders</h2>
      <div className="mt-3 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
              <tr>
                {orderHeadings.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {supplier.orders.map((o) => {
                if (!match(o)) return null;
                return (
                  <tr key={o.id} className="border-t border-[color:var(--border-color)]">
                    <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.id}</td>
                    <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.customer}</td>
                    <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.material}</td>
                    <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.date}</td>
                    <td className="px-4 py-3.5 text-[color:var(--primary-text)]">{o.amount}</td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones[o.payTone]}`}>{o.pay}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tones[o.statusTone]}`}>{o.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{shown} records</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
            <span>Page 1 / 1</span>
            <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">Listings</h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-[color:var(--primary-text)]">
        {supplier.listings.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}