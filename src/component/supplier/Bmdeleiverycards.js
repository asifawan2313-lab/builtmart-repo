"use client";

import { CheckCircle2, MapPin, Phone, Truck } from "lucide-react";

// Progress ke 4 steps
const BM_STEPS = ["Accepted", "Picked Up", "On the Way", "Delivered"];

// Status chip ke rang
const BM_STATUS_COLORS = {
  Confirmed: "bg-blue-100 text-blue-600",
  "Ready for Dispatch": "bg-orange-100 text-orange-500",
  "In Transit": "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-600",
};

// Delivery cards ki grid. Data aur handlers page se aate hain.
export default function BmSupplierDeliveryCards({ deliveries, onConfirmPickup, onMarkReady }) {
  return (
    <>
      {deliveries.map((item) => (
        <div
          key={item.id}
          className="bmDeliveryCards-card min-w-0 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5"
        >
          {/* ----- Upar: order + material (left), status chip (right) ----- */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="break-words text-lg text-[color:var(--primary-text)] sm:text-xl">
                {item.order}
              </h3>
              <p className="mt-0.5 break-words text-xs text-[color:var(--secondary-text)]">
                {item.material} · {item.quantity}
              </p>
            </div>
            <span
              className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-[family-name:Poppins-Medium] ${
                BM_STATUS_COLORS[item.status]
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* ----- Pickup + Drop-off ----- */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Pickup */}
            <div className="bmDeliveryCards-pickup rounded-md bg-gray-200/60 p-3">
              <p className="text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
                Pickup
              </p>
              <p className="mt-1 flex items-start gap-1.5 break-words text-sm text-[color:var(--primary-text)]">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {item.pickup}
              </p>

              {item.pickupConfirmed ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-[family-name:Poppins-Medium] text-green-600">
                  <CheckCircle2 size={14} />
                  Confirmed
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => onConfirmPickup(item.id)}
                  className="bmDeliveryCards-pickupBtn mt-2 cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]"
                >
                  Confirm Pickup
                </button>
              )}
            </div>

            {/* Drop-off */}
            <div className="bmDeliveryCards-dropoff rounded-md bg-gray-200/60 p-3">
              <p className="text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
                Drop-off
              </p>
              <p className="mt-1 flex items-start gap-1.5 break-words text-sm text-[color:var(--primary-text)]">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {item.dropoff}
              </p>
              <p className="mt-1 break-words text-xs text-[color:var(--secondary-text)]">
                {item.customer} · {item.phone}
              </p>
            </div>
          </div>

          {/* ----- Assigned Rider ----- */}
          <div className="bmDeliveryCards-rider mt-3 rounded-md border border-[color:var(--border-color)] p-3 sm:p-4">
            <p className="text-[11px] uppercase tracking-wider text-[color:var(--secondary-text)]">
              Assigned Rider
            </p>

            {item.rider ? (
              <>
                {/* Rider ki info */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[color:var(--primary-text)]">
                  <span className="flex items-center gap-2">
                    <Truck size={16} />
                    {item.rider.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[color:var(--secondary-text)]">
                    <Phone size={13} />
                    {item.rider.phone}
                  </span>
                  <span className="text-xs text-[color:var(--secondary-text)]">
                    {item.rider.vehicle}
                  </span>
                </div>

                {/* 4 steps ki progress line */}
                <div className="mt-4 grid grid-cols-4">
                  {BM_STEPS.map((label, index) => {
                    const number = index + 1;
                    const isDone = item.step >= number;
                    const isLineDone = item.step >= number + 1;

                    return (
                      <div key={label} className="relative flex flex-col items-center">
                        {/* Agle step tak line (aakhri step ke baad nahi) */}
                        {number < BM_STEPS.length && (
                          <span
                            className={`absolute left-1/2 top-3 h-0.5 w-full ${
                              isLineDone ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
                            }`}
                          />
                        )}

                        <span
                          className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] ${
                            isDone ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
                          }`}
                        >
                          {number}
                        </span>
                        <span className="mt-1.5 text-center text-[10px] text-[color:var(--primary-text)] sm:text-[11px]">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
                Rider abhi assign nahi hua. Pehle order ko Ready for Dispatch
                mark karein.
              </p>
            )}
          </div>

          {/* ----- Mark Ready for Dispatch (sirf jab rider assign na ho) ----- */}
          {!item.rider && (
            <button
              type="button"
              onClick={() => onMarkReady(item.id)}
              className="bmDeliveryCards-readyBtn mt-3 w-full cursor-pointer rounded-md bg-[var(--primary-yellow)] py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
            >
              Mark Ready for Dispatch
            </button>
          )}
        </div>
      ))}
    </>
  );
}