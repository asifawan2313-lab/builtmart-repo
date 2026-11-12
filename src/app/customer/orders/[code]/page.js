"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  CalendarDays,
  Car,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Home,
  MapPin,
  MessageSquare,
  PackageCheck,
  Phone,
  Store,
  Truck,
  User,
  X,
} from "lucide-react";
import { getOrder } from "../orderData";

// Demo: har order par yehi delivery charges aur payment ka tareeqa
const DELIVERY_CHARGES = 200;
const PAYMENT_METHOD = "Cash on Delivery";

// Timeline ke qadam (icon ke saath)
const steps = [
  { label: "Order Placed", icon: ClipboardList },
  { label: "Confirmed by Supplier", icon: ClipboardCheck },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: PackageCheck },
];
const rejectedSteps = [
  { label: "Order Placed", icon: ClipboardList },
  { label: "Rejected by Supplier", icon: X },
];
const currentStep = { Processing: 1, Shipped: 2, Delivered: 3 };

const statusClass = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-[#FDC716]/25 text-[#202124]",
  Rejected: "bg-red-50 text-red-700",
};

// Timeline ke gol ka style har halat ke liye
const circleClass = {
  done: "border-[#FDC716] bg-[#FDC716] text-[#202124]",
  current: "border-[#FDC716] bg-white text-[#202124]",
  pending: "border-[#D9E3E9] bg-white text-[#A7ADB4]",
  rejected: "border-red-600 bg-red-600 text-white",
};

const panel = "relative rounded-xl border border-[#E2E4E7] bg-white p-5 shadow-sm";
const yellowBtn =
  "inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-[#FDC716] px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F]";
const outlineBtn =
  "inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-[#202124] bg-white px-5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#F4F4F2]";
const darkBtn =
  "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#202124] text-sm font-semibold text-white transition-colors hover:bg-[#45484D]";

// "Rs. 67,500" se number, aur number se wapas "Rs. 67,700"
const toNumber = (text) => Number(text.replace(/\D/g, ""));
const toRs = (number) => `Rs. ${number.toLocaleString("en-US")}`;

// Card ka title: card ke left kinare par yellow patti
const CardTitle = ({ children }) => (
  <h2 className="relative mb-4 text-lg font-bold text-[#202124]">
    <span className="absolute -left-5 top-0.5 h-6 w-1 rounded-r-full bg-[#FDC716]" aria-hidden="true" />
    {children}
  </h2>
);

// Icon + label + value ki jodi
const IconInfo = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon size={20} className="mt-0.5 shrink-0 text-[#202124]" aria-hidden="true" />
    <div className="min-w-0">
      <p className="text-xs text-[#45484D]">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-[#202124]">{value}</p>
    </div>
  </div>
);

// Label ... amount ki ek line
const PriceRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-[#E2E4E7] py-3 text-sm text-[#202124]">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const CustomerOrderDetailPage = ({ params }) => {
  const { code } = use(params);
  const order = getOrder(code);
  if (!order) notFound();

  const { item, category, supplier, supplierLocation, date, status, qty, rate, amount, image, receiver, phone, address, rider, rejectReason } = order;
  const isRejected = status === "Rejected";
  const flow = isRejected ? rejectedSteps : steps;

  // Order Details ke andar wali jaankari
  const summary = [
    { label: "Order ID", value: `#${code}` },
    { label: "Order Date", value: date },
    { label: "Payment Method", value: PAYMENT_METHOD },
    { label: "Quantity", value: qty },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#45484D]">
        <Link href="/customer/dashboard" aria-label="Dashboard" className="hover:text-[#202124]">
          <Home size={16} aria-hidden="true" />
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link href="/customer/orders" className="font-medium hover:text-[#202124]">
          My Orders
        </Link>
      </nav>

      {/* Heading + actions */}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#292929] sm:text-3xl">Order #{code}</h1>
            <span className={`rounded-full px-4 py-1 text-sm font-semibold ${statusClass[status]}`}>{status}</span>
          </div>
          <p className="mt-1 text-sm text-[#45484D]">
            Placed on <span className="font-semibold text-[#202124]">{date}</span> · Sample order shown for demonstration purposes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/customer/inquiries" className={yellowBtn}>
            <MessageSquare size={18} aria-hidden="true" />
            Message Supplier
          </Link>
          <Link href="/customer/disputes/new" className={outlineBtn}>
            <AlertTriangle size={18} aria-hidden="true" />
            Raise a Dispute
          </Link>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Order details + delivery */}
        <div className="space-y-4">
          <section className={panel}>
            <CardTitle>Order Details</CardTitle>

            <div className="flex flex-wrap items-center gap-4 pb-5">
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#E2E4E7]">
                <Image src={image} alt={`${item} (demo image)`} fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 basis-40">
                <p className="text-base font-bold text-[#202124]">{item}</p>
                <p className="text-sm text-[#45484D]">{category}</p>
              </div>
              <p className="text-sm text-[#202124] sm:border-l sm:border-[#E2E4E7] sm:pl-6">
                Qty: {qty} × {rate}
              </p>
              <p className="w-32 text-right text-2xl font-extrabold text-[#202124]">{amount}</p>
            </div>

            <div className="border-t border-[#E2E4E7]">
              <PriceRow label="Subtotal" value={amount} />
              <PriceRow label="Delivery Charges" value={toRs(DELIVERY_CHARGES)} />
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-[#F4F4F2] px-4 py-3 font-bold text-[#202124]">
              <span>Total Amount</span>
              <span className="text-lg">{toRs(toNumber(amount) + DELIVERY_CHARGES)}</span>
            </div>

            {/* Order ID, tareekh, payment */}
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-[#E2E4E7] pt-5 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[#E2E4E7]">
              {summary.map(({ label, value }) => (
                <div key={label} className="sm:px-5 sm:first:pl-0">
                  <dt className="text-xs text-[#45484D]">{label}</dt>
                  <dd className="mt-0.5 text-sm font-bold text-[#202124]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={panel}>
            <CardTitle>Delivery Details</CardTitle>
            <div className="grid gap-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#E2E4E7]">
              <div className="sm:pr-5">
                <IconInfo icon={User} label="Receiver" value={receiver} />
              </div>
              <div className="sm:px-5">
                <IconInfo icon={Phone} label="Phone" value={phone} />
              </div>
              <div className="sm:pl-5">
                <IconInfo icon={MapPin} label="Delivery Address" value={address} />
              </div>
            </div>
          </section>
        </div>

        {/* Order status + rider (sirf jab book ho) + supplier */}
        <div className="space-y-4">
          <section className={panel}>
            <CardTitle>Order Status</CardTitle>
            <ol>
              {flow.map(({ label, icon: StepIcon }, i) => {
                const state = isRejected
                  ? i === 0 ? "done" : "rejected"
                  : status === "Delivered" || i < currentStep[status] ? "done" : i === currentStep[status] ? "current" : "pending";
                const caption = i === 0 ? date : { done: "Completed", rejected: "Rejected", current: "In progress", pending: "Pending" }[state];

                return (
                  <li key={label} className="relative flex gap-3 pb-6 last:pb-0">
                    {i < flow.length - 1 && (
                      <span
                        className={`absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-0.5 ${state === "done" ? "bg-[#FDC716]" : "bg-[#D9E3E9]"}`}
                        aria-hidden="true"
                      />
                    )}
                    <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${circleClass[state]}`}>
                      <StepIcon size={16} aria-hidden="true" />
                    </span>
                    <div className="pt-0.5">
                      <p className={`text-sm font-bold ${state === "pending" ? "text-[#45484D]" : state === "rejected" ? "text-red-700" : "text-[#202124]"}`}>
                        {label}
                      </p>
                      <p className="text-xs text-[#45484D]">{caption}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Reject hone ki wajah */}
            {isRejected && rejectReason && (
              <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                <span className="font-semibold">Reason: </span>
                {rejectReason}
              </p>
            )}
          </section>

          {rider && (
            <section className={panel}>
              <CardTitle>Rider Information</CardTitle>
              <div className="flex items-center gap-3 border-b border-[#E2E4E7] pb-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FDC716] text-2xl font-bold text-[#202124]">
                  {rider.name[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-[#202124]">{rider.name}</p>
                  <p className="flex items-center gap-2 text-sm font-semibold text-green-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden="true" />
                    {rider.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <IconInfo icon={Phone} label="Phone" value={rider.phone} />
                <IconInfo icon={Car} label="Vehicle" value={rider.vehicle} />
                <IconInfo icon={CalendarDays} label={rider.timeLabel} value={rider.time} />
              </div>
            </section>
          )}

          <section className={panel}>
            <CardTitle>Supplier Information</CardTitle>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#202124] text-lg font-bold text-[#FDC716]">
                {supplier[0]}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#202124]">{supplier}</p>
                <p className="text-xs text-[#45484D]">{supplierLocation}</p>
              </div>
            </div>
            <Link href="/suppliers" className={`${darkBtn} mt-4`}>
              <Store size={18} aria-hidden="true" />
              View Shop
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CustomerOrderDetailPage;