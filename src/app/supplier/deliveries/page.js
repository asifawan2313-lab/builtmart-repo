"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import BmSupplierDeliveryCards from "../../../component/supplier/Bmdeleiverycards.js";

// ========== DATA ==========
// step = rider ki progress (1 Accepted, 2 Picked Up, 3 On the Way, 4 Delivered)
// rider = null matlab abhi assign nahi hua
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
    rider: { name: "Imran Khan", phone: "0345-1112233", vehicle: "Mazda Truck LEB-4521" },
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
    rider: { name: "Asad Ali", phone: "0311-2223344", vehicle: "Shehzore GAA-882" },
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

// Demo: "Mark Ready for Dispatch" par yehi rider assign hota hai
const BM_DEMO_RIDER = {
  name: "Kamran Ali",
  phone: "0300-1239876",
  vehicle: "Suzuki Pickup LHR-3310",
};

export default function SupplierDeliveriesPage() {
  // ===== State =====
  const [deliveries, setDeliveries] = useState(BM_START_DELIVERIES);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  // ===== Handlers =====

  // Confirm Pickup: pickup "Confirmed" ho jata hai
  const handleConfirmPickup = (id) => {
    setDeliveries(
      deliveries.map((item) =>
        item.id === id ? { ...item, pickupConfirmed: true } : item
      )
    );
    showToast("Pickup confirmed");
  };

  // Mark Ready for Dispatch: demo rider assign, progress step 1 (Accepted)
  const handleMarkReady = (id) => {
    setDeliveries(
      deliveries.map((item) =>
        item.id === id
          ? { ...item, status: "Ready for Dispatch", rider: BM_DEMO_RIDER, step: 1 }
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

      {/* ----- Delivery cards: mobile/tablet 1 column, bari screen 2 ----- */}
      <div className="bmDeliveries-grid mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <BmSupplierDeliveryCards
          deliveries={deliveries}
          onConfirmPickup={handleConfirmPickup}
          onMarkReady={handleMarkReady}
        />
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