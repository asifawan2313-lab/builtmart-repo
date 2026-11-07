"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Image as ImageIcon } from "lucide-react";
import { getDispute, statusClass } from "../disputeData";

const panel = "rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm";
const panelTitle = "mb-3 text-xs font-bold uppercase tracking-wide text-[#45484D]";

// Kitne steps pure hue (done) aur kaun sa chal raha hai (current)
const doneCount = { Open: 1, "Under Review": 1, Resolved: 3, Rejected: 3 };
const currentStep = { Open: null, "Under Review": 1, Resolved: null, Rejected: null };

const Info = ({ label, value }) => (
  <div>
    <p className="text-[11px] text-[#45484D]">{label}</p>
    <p className="mt-0.5 text-sm font-semibold text-[#202124]">{value}</p>
  </div>
);

const CustomerDisputeDetailPage = ({ params }) => {
  const { id } = use(params);
  const dispute = getDispute(id);
  if (!dispute) notFound();

  const { subject, supplier, supplierLocation, material, issueType, token, date, status, description, evidence, adminResponse, outcome } = dispute;
  const steps = ["Submitted", "Under Review", status === "Rejected" ? "Rejected" : "Resolved"];

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <Link href="/customer/disputes" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#45484D] hover:text-[#202124]">
        <ArrowLeft size={14} aria-hidden="true" />
        My Disputes
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">{subject}</h1>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
      </div>
      <p className="mt-1 text-xs text-[#45484D]">
        Dispute #{id} · Raised on {date}
      </p>

      <div className="mt-6 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {/* Summary */}
          <section className={panel}>
            <h2 className="mb-4 text-base font-bold text-[#202124]">Dispute Summary</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Info label="Supplier" value={supplier} />
              <Info label="Material" value={material} />
              <Info label="Issue Type" value={issueType} />
              <Info label="Inquiry Token" value={token} />
            </div>

            <p className="mt-5 text-[11px] text-[#45484D]">Description</p>
            <p className="mt-0.5 text-sm leading-6 text-[#202124]">{description}</p>

            {/* Chat admin ko bheji gayi thi */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#F4F4F2] px-4 py-3">
              <p className="text-xs text-[#45484D]">The full chat with the supplier was shared with Admin.</p>
              <Link href="/customer/inquiries" className="text-sm font-semibold text-[#202124] underline hover:text-[#E5B20F]">
                View chat
              </Link>
            </div>

            <p className="mt-5 text-[11px] text-[#45484D]">Evidence</p>
            {evidence === 0 ? (
              <p className="mt-1 text-sm text-[#45484D]">No photos attached.</p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-3">
                {Array.from({ length: evidence }, (_, i) => (
                  <span key={i} className="flex h-20 w-28 items-center justify-center rounded-lg bg-[#E2E4E7] text-[#45484D]">
                    <ImageIcon size={22} aria-label={`Evidence photo ${i + 1}`} />
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Progress */}
          <section className={panel}>
            <h2 className="mb-4 text-base font-bold text-[#202124]">Progress</h2>
            <ol>
              {steps.map((step, i) => {
                const state = i < doneCount[status] ? "done" : i === currentStep[status] ? "current" : "pending";
                const caption = i === 0 ? date : state === "done" ? "Completed" : state === "current" ? "In progress" : "Pending";

                return (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[#202124] ${
                          state === "done" ? "border-[#FDC716] bg-[#FDC716]" : state === "current" ? "border-[#FDC716] bg-white" : "border-[#D9E3E9] bg-white"
                        }`}
                      >
                        {state === "done" && <Check size={14} strokeWidth={3} aria-hidden="true" />}
                      </span>
                      {i < steps.length - 1 && <span className={`min-h-7 w-0.5 flex-1 ${state === "done" ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`} />}
                    </div>
                    <div className="pb-5">
                      <p className={`text-sm font-semibold ${state === "pending" ? "text-[#45484D]" : "text-[#202124]"}`}>{step}</p>
                      <p className="text-xs text-[#45484D]">{caption}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <div className="space-y-4">
          <section className={panel}>
            <h2 className={panelTitle}>Admin Response</h2>
            {adminResponse ? (
              <>
                <p className="text-sm leading-6 text-[#202124]">{adminResponse.text}</p>
                <p className="mt-2 text-xs text-[#45484D]">{adminResponse.date}</p>
              </>
            ) : (
              <p className="text-sm text-[#45484D]">No response from Admin yet.</p>
            )}
          </section>

          <section className={panel}>
            <h2 className={panelTitle}>Final Outcome</h2>
            <p className="text-sm text-[#45484D]">{outcome || "Not decided yet."}</p>
          </section>

          <section className={panel}>
            <h2 className={panelTitle}>Supplier</h2>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#202124] text-lg font-bold text-[#FDC716]">
                {supplier[0]}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#202124]">{supplier}</p>
                <p className="truncate text-xs text-[#45484D]">{supplierLocation}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CustomerDisputeDetailPage;