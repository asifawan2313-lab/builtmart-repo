// "use client";

// import { useState } from "react";
// import { CheckCircle2 } from "lucide-react";

// import BmSupplierDeliveryCards from "../../../component/supplier/Bmdeleiverycards.js";

// // ========== DATA ==========
// // step = rider ki progress (1 Accepted, 2 Picked Up, 3 On the Way, 4 Delivered)
// // rider = null matlab abhi assign nahi hua
// const BM_START_DELIVERIES = [
//   {
//     id: 1,
//     order: "BM-ORD-1001",
//     material: "A-Class Bricks",
//     quantity: "5,000 brick",
//     status: "In Transit",
//     pickup: "G.T. Road, Gujranwala",
//     pickupConfirmed: true,
//     dropoff: "House 12, Satellite Town, Gujranwala",
//     customer: "Ali Raza",
//     phone: "0321-5556677",
//     rider: { name: "Imran Khan", phone: "0345-1112233", vehicle: "Mazda Truck LEB-4521" },
//     step: 3,
//   },
//   {
//     id: 2,
//     order: "BM-ORD-1002",
//     material: "DG Cement (OPC)",
//     quantity: "50 bag",
//     status: "Confirmed",
//     pickup: "G.T. Road, Gujranwala",
//     pickupConfirmed: false,
//     dropoff: "Model Town, Gujranwala",
//     customer: "Sana Tariq",
//     phone: "0333-9988776",
//     rider: null,
//     step: 0,
//   },
//   {
//     id: 3,
//     order: "BM-ORD-1003",
//     material: "Reused Wooden Doors",
//     quantity: "2 door",
//     status: "Delivered",
//     pickup: "G.T. Road, Gujranwala",
//     pickupConfirmed: true,
//     dropoff: "DC Road, Gujranwala",
//     customer: "Bilal Ahmed",
//     phone: "0300-4445566",
//     rider: { name: "Asad Ali", phone: "0311-2223344", vehicle: "Shehzore GAA-882" },
//     step: 4,
//   },
//   {
//     id: 4,
//     order: "BM-ORD-1004",
//     material: "A-Class Bricks",
//     quantity: "3,000 brick",
//     status: "Confirmed",
//     pickup: "G.T. Road, Gujranwala",
//     pickupConfirmed: false,
//     dropoff: "Wapda Town, Gujranwala",
//     customer: "Hamza Iqbal",
//     phone: "0302-7778899",
//     rider: null,
//     step: 0,
//   },
// ];

// // Demo: "Mark Ready for Dispatch" par yehi rider assign hota hai
// const BM_DEMO_RIDER = {
//   name: "Kamran Ali",
//   phone: "0300-1239876",
//   vehicle: "Suzuki Pickup LHR-3310",
// };

// export default function SupplierDeliveriesPage() {
//   // ===== State =====
//   const [deliveries, setDeliveries] = useState(BM_START_DELIVERIES);
//   const [toast, setToast] = useState("");

//   const showToast = (message) => {
//     setToast(message);
//     setTimeout(() => setToast(""), 2500);
//   };

//   // ===== Handlers =====

//   // Confirm Pickup: pickup "Confirmed" ho jata hai
//   const handleConfirmPickup = (id) => {
//     setDeliveries(
//       deliveries.map((item) =>
//         item.id === id ? { ...item, pickupConfirmed: true } : item
//       )
//     );
//     showToast("Pickup confirmed");
//   };

//   // Mark Ready for Dispatch: demo rider assign, progress step 1 (Accepted)
//   const handleMarkReady = (id) => {
//     setDeliveries(
//       deliveries.map((item) =>
//         item.id === id
//           ? { ...item, status: "Ready for Dispatch", rider: BM_DEMO_RIDER, step: 1 }
//           : item
//       )
//     );
//     showToast("Order marked ready for dispatch");
//   };

//   return (
//     <main className="bmDeliveries-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//       <h1 className="bmDeliveries-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
//         Deliveries
//       </h1>
//       <p className="bmDeliveries-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
//         Rider ke saath delivery coordination
//       </p>

//       {/* ----- Delivery cards: mobile/tablet 1 column, bari screen 2 ----- */}
//       <div className="bmDeliveries-grid mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
//         <BmSupplierDeliveryCards
//           deliveries={deliveries}
//           onConfirmPickup={handleConfirmPickup}
//           onMarkReady={handleMarkReady}
//         />
//       </div>

//       {/* ----- Toast ----- */}
//       {toast && (
//         <div className="bmDeliveries-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
//           <CheckCircle2 size={18} />
//           {toast}
//         </div>
//       )}
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import { CheckCircle2, MapPin, Phone, Truck } from "lucide-react";

// ========== PROGRESS STEPS ==========
const BM_STEPS = ["Accepted", "Picked Up", "On the Way", "Delivered"];

// ========== STATUS COLORS ==========
const BM_STATUS_COLORS = {
  Confirmed: "bg-blue-100 text-blue-600",
  "Ready for Dispatch": "bg-orange-100 text-orange-500",
  "In Transit": "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-600",
};

// ========== DATA ==========
const BM_START_DELIVERIES = [
  {
    id: 1,
    order: "BM-ORD-1001",
    material: "A-Class Bricks",
    quantity: "5,000 brick",
    status: "In Transit",
    pickup: "G.T. Road, Gujranwala",
    pickupConfirmed: true,
    dropoff: "House 12, Satellite Town, Gujranwala",
    customer: "Ali Raza",
    phone: "0321-5556677",
    rider: {
      name: "Imran Khan",
      phone: "0345-1112233",
      vehicle: "Mazda Truck LEB-4521",
    },
    step: 3,
  },
  {
    id: 2,
    order: "BM-ORD-1002",
    material: "DG Cement (OPC)",
    quantity: "50 bag",
    status: "Confirmed",
    pickup: "G.T. Road, Gujranwala",
    pickupConfirmed: false,
    dropoff: "Model Town, Gujranwala",
    customer: "Sana Tariq",
    phone: "0333-9988776",
    rider: null,
    step: 0,
  },
  {
    id: 3,
    order: "BM-ORD-1003",
    material: "Reused Wooden Doors",
    quantity: "2 door",
    status: "Delivered",
    pickup: "G.T. Road, Gujranwala",
    pickupConfirmed: true,
    dropoff: "DC Road, Gujranwala",
    customer: "Bilal Ahmed",
    phone: "0300-4445566",
    rider: {
      name: "Asad Ali",
      phone: "0311-2223344",
      vehicle: "Shehzore GAA-882",
    },
    step: 4,
  },
  {
    id: 4,
    order: "BM-ORD-1004",
    material: "A-Class Bricks",
    quantity: "3,000 brick",
    status: "Confirmed",
    pickup: "G.T. Road, Gujranwala",
    pickupConfirmed: false,
    dropoff: "Wapda Town, Gujranwala",
    customer: "Hamza Iqbal",
    phone: "0302-7778899",
    rider: null,
    step: 0,
  },
];

// ========== DEMO RIDER ==========
const BM_DEMO_RIDER = {
  name: "Kamran Ali",
  phone: "0300-1239876",
  vehicle: "Suzuki Pickup LHR-3310",
};

// ========== SINGLE DELIVERY CARD COMPONENT ==========
function BmSupplierDeliveryCard({ item, onConfirmPickup, onMarkReady }) {
  return (
    <div className="bmDeliveryCards-card min-w-0 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5">
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
                  <div
                    key={label}
                    className="relative flex flex-col items-center"
                  >
                    {/* Agle step tak line */}
                    {number < BM_STEPS.length && (
                      <span
                        className={`absolute left-1/2 top-3 h-0.5 w-full ${
                          isLineDone
                            ? "bg-[var(--primary-yellow)]"
                            : "bg-[var(--border-color)]"
                        }`}
                      />
                    )}

                    <span
                      className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] ${
                        isDone
                          ? "bg-[var(--primary-yellow)]"
                          : "bg-[var(--border-color)]"
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

      {/* ----- Mark Ready for Dispatch ----- */}
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
  );
}

// ========== MAIN PAGE ==========
export default function SupplierDeliveriesPage() {
  // ===== State =====
  const [deliveries, setDeliveries] = useState(BM_START_DELIVERIES);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  // ===== Handlers =====

  // Confirm Pickup
  const handleConfirmPickup = (id) => {
    setDeliveries(
      deliveries.map((item) =>
        item.id === id ? { ...item, pickupConfirmed: true } : item
      )
    );

    showToast("Pickup confirmed");
  };

  // Mark Ready for Dispatch
  const handleMarkReady = (id) => {
    setDeliveries(
      deliveries.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Ready for Dispatch",
              rider: BM_DEMO_RIDER,
              step: 1,
            }
          : item
      )
    );

    showToast("Order marked ready for dispatch");
  };

  return (
    <main className="bmDeliveries-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="bmDeliveries-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        Deliveries
      </h1>

      <p className="bmDeliveries-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
        Rider ke saath delivery coordination
      </p>

      {/* ----- Delivery cards grid ----- */}
      <div className="bmDeliveries-grid mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        {deliveries.map((item) => (
          <BmSupplierDeliveryCard
            key={item.id}
            item={item}
            onConfirmPickup={handleConfirmPickup}
            onMarkReady={handleMarkReady}
          />
        ))}
      </div>

      {/* ----- Toast ----- */}
      {toast && (
        <div className="bmDeliveries-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
    </main>
  );
}
