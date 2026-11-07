"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, FileWarning, MessageSquare, Phone, Truck } from "lucide-react";
import { getOrder } from "../orderData";

const steps = ["Order Placed", "Confirmed by Supplier", "Shipped", "Delivered"];
const currentStep = { Processing: 1, Shipped: 2, Delivered: 3 };

const statusClass = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-[#FDC716]/25 text-[#202124]",
};

const panel = "rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm";
const panelTitle = "mb-3 text-xs font-bold uppercase tracking-wide text-[#45484D]";
const yellowBtn =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]";
const headerOutlineBtn =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#202124] bg-white px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]";
const darkBtn =
  "flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#202124] text-xs font-semibold text-white transition-colors hover:bg-[#45484D]";

// Label + value ki chhoti jodi
const Info = ({ label, value }) => (
  <div>
    <p className="text-[11px] text-[#45484D]">{label}</p>
    <p className="mt-0.5 text-sm font-semibold text-[#202124]">{value}</p>
  </div>
);

const CustomerOrderDetailPage = ({ params }) => {
  const { code } = use(params);
  const order = getOrder(code);
  if (!order) notFound();

  const { item, category, supplier, supplierLocation, date, status, qty, rate, amount, image, receiver, phone, address, rider } = order;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <Link href="/customer/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#45484D] hover:text-[#202124]">
        <ArrowLeft size={14} aria-hidden="true" />
        My Orders
      </Link>

      {/* Heading + actions */}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Order #{code}</h1>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
          </div>
          <p className="mt-1 text-xs text-[#45484D]">Placed on {date} · Sample order shown for demonstration purposes.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/customer/inquiries" className={yellowBtn}>
            <MessageSquare size={16} aria-hidden="true" />
            Message Supplier
          </Link>
          <Link href="/customer/disputes/new" className={headerOutlineBtn}>
            <FileWarning size={16} aria-hidden="true" />
            Raise a Dispute
          </Link>
        </div>
      </div>

      {/* Order status */}
      <section className={`${panel} mt-6`}>
        <h2 className="text-base font-bold text-[#202124]">Order Status</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-4">
          {steps.map((step, i) => {
            const state = status === "Delivered" || i < currentStep[status] ? "done" : i === currentStep[status] ? "current" : "pending";
            const caption = i === 0 ? date : state === "done" ? "Completed" : state === "current" ? "In progress" : "Pending";

            return (
              <li key={step}>
                <div className="flex items-center">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[#202124] ${
                      state === "done" ? "border-[#FDC716] bg-[#FDC716]" : state === "current" ? "border-[#FDC716] bg-white" : "border-[#D9E3E9] bg-white"
                    }`}
                  >
                    {state === "done" && <Check size={14} strokeWidth={3} aria-hidden="true" />}
                  </span>
                  {i < steps.length - 1 && (
                    <span className={`hidden h-0.5 flex-1 sm:block ${state === "done" ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`} />
                  )}
                </div>
                <p className={`mt-2 text-sm font-semibold ${state === "pending" ? "text-[#45484D]" : "text-[#202124]"}`}>{step}</p>
                <p className="text-xs text-[#45484D]">{caption}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-6 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Items + delivery */}
        <div className="space-y-4">
          <section className="overflow-hidden rounded-xl border border-[#E2E4E7] bg-white shadow-sm">
            <h2 className="border-b border-[#E2E4E7] px-5 py-4 text-base font-bold text-[#202124]">Items</h2>
            <div className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md bg-[#E2E4E7]">
                <Image src={image} alt={`${item} (demo image)`} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 basis-40">
                <p className="text-sm font-semibold text-[#202124]">{item}</p>
                <p className="text-xs text-[#45484D]">{category}</p>
              </div>
              <p className="text-sm text-[#45484D]">
                Qty {qty} × {rate}
              </p>
              <p className="w-28 text-right text-sm font-bold text-[#202124]">{amount}</p>
            </div>
            <div className="flex items-center justify-between border-t border-[#E2E4E7] bg-[#F4F4F2] px-5 py-4 text-base font-bold text-[#202124]">
              <span>Total</span>
              <span>{amount}</span>
            </div>
          </section>

          <section className={panel}>
            <h2 className="mb-4 text-base font-bold text-[#202124]">Delivery Details</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Info label="Receiver" value={receiver} />
              <Info label="Phone" value={phone} />
              <Info label="Delivery Address" value={address} />
            </div>
          </section>
        </div>

        {/* Rider (sirf jab book ho) + supplier */}
        <div className="space-y-4">
          {rider && (
            <section className={panel}>
              <h2 className={panelTitle}>Delivery Rider</h2>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDC716] text-lg font-bold text-[#202124]">
                  {rider.name[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#202124]">{rider.name}</p>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                    <Truck size={13} aria-hidden="true" />
                    {rider.status}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <Info label="Phone" value={rider.phone} />
                <Info label="Vehicle" value={rider.vehicle} />
                <Info label={rider.timeLabel} value={rider.time} />
              </div>
              <a href={`tel:${rider.phone}`} className={`${darkBtn} mt-4 w-full`}>
                <Phone size={14} aria-hidden="true" />
                Call Rider
              </a>
            </section>
          )}

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
            <div className="mt-4 flex gap-2">
              <Link href="/suppliers" className={darkBtn}>
                View Shop
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CustomerOrderDetailPage;