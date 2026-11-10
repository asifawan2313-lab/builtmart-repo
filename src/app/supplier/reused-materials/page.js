"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

import BmSupplierReusedCards from "../../../component/supplier/Bmreusedmaterialscard.js";

import briks from "../../../assets/images/guest/card/briks.jpg";
import tiles from "../../../assets/images/guest/card/tiles.jpg";
import sand from "../../../assets/images/guest/card/sand.jpg";
import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";

// ========== DATA ==========
// Customers ki reused listings. Naya item add karna ho to bas aik { ... } aur likh dein.
const BM_LISTINGS = [
  {
    id: 1,
    title: "Purane Ghar ki Eent (2,000 pcs)",
    category: "Bricks",
    seller: "Tahir Mehmood",
    date: "2026-10-17",
    price: 9,
    unit: "brick",
    quantity: "2000 brick",
    location: "Sialkot",
    description: "Demolition se nikli saaf eent, foundation ke liye munasib.",
    image: briks,
  },
  {
    id: 2,
    title: "Leftover Porcelain Tiles",
    category: "Tiles",
    seller: "Nadia Shah",
    date: "2026-10-16",
    price: 120,
    unit: "sq ft",
    quantity: "350 sq ft",
    location: "Gujranwala",
    description: "Naye ghar ki tiles bachi hain, box pack, koi crack nahi.",
    image: tiles,
  },
  {
    id: 3,
    title: "Extra Cement Bags",
    category: "Cement",
    seller: "Farhan Ali",
    date: "2026-10-15",
    price: 1100,
    unit: "bag",
    quantity: "40 bag",
    location: "Lahore",
    description: "Kaam mukammal hone ke baad bache hue bags, sealed pack.",
    image: sand,
  },
  {
    id: 4,
    title: "Iron Grills & Railings",
    category: "Grills / Iron Railings",
    seller: "Zainab Akhtar",
    date: "2026-10-13",
    price: 4000,
    unit: "piece",
    quantity: "6 piece",
    location: "Gujranwala",
    description: "Purani window grills, achi halat mein, dobara paint ho sakti hain.",
    image: steelSaria,
  },
];

export default function SupplierReusedPage() {
  const router = useRouter();

  // ===== State =====
  const [selected, setSelected] = useState(null); // jo listing modal mein khuli hai
  const [enquiryText, setEnquiryText] = useState("");
  const [toast, setToast] = useState("");

  // ===== Handlers =====

  // Details / Enquire: modal kholo
  const handleDetails = (id) => {
    setSelected(BM_LISTINGS.find((item) => item.id === id));
    setEnquiryText("");
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  // Message: Messages page par us customer ki chat ke saath jao
  const handleMessage = (id) => {
    const item = BM_LISTINGS.find((listing) => listing.id === id);
    router.push(`/supplier/messages?customer=${encodeURIComponent(item.seller)}`);
  };

  const handleEnquiryChange = (e) => {
    setEnquiryText(e.target.value);
  };

  // Send Enquiry (form submit)
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    setSelected(null);
    setToast("Enquiry sent");
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <main className="bmReused-root mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h1 className="bmReused-title text-3xl text-[color:var(--primary-text)] sm:text-4xl">
        Reused Materials
      </h1>
      <p className="bmReused-subtitle mt-2 text-sm text-[color:var(--secondary-text)]">
        Customers ki recently added reusable listings. Yeh listing customer ki
        hi rahegi — aap purchase interest dikha sakte hain.
      </p>

      {/* ----- Cards grid ----- */}
      <div className="bmReused-grid mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        <BmSupplierReusedCards
          listings={BM_LISTINGS}
          onDetails={handleDetails}
          onMessage={handleMessage}
        />
      </div>

      {/* ----- Toast ----- */}
      {toast && (
        <div className="bmReused-toast fixed bottom-5 right-4 z-[60] flex items-center gap-2 rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-[color:var(--white-cards)] shadow-xl sm:right-6">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* ===== Details / Enquire modal (form isi page mein) ===== */}
      {selected && (
        <div className="bmReused-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bmReused-modal max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-lg bg-[var(--white-cards)] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 border-b border-[color:var(--border-color)] pb-3">
              <h2 className="break-words text-lg text-[color:var(--primary-text)] sm:text-xl">
                {selected.title}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close"
                className="shrink-0 cursor-pointer rounded-full p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image */}
            <div className="relative mt-4 aspect-[16/8] w-full overflow-hidden rounded-md bg-[var(--border-color)]">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(min-width: 640px) 500px, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-4 text-sm text-[color:var(--primary-text)]">
              {selected.description}
            </p>

            {/* Quantity, Price, Location, Seller */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <p className="text-[color:var(--secondary-text)]">
                Quantity:{" "}
                <span className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  {selected.quantity}
                </span>
              </p>
              <p className="text-[color:var(--secondary-text)]">
                Price:{" "}
                <span className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  Rs. {selected.price.toLocaleString()}/{selected.unit}
                </span>
              </p>
              <p className="text-[color:var(--secondary-text)]">
                Location:{" "}
                <span className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  {selected.location}
                </span>
              </p>
              <p className="text-[color:var(--secondary-text)]">
                Seller:{" "}
                <span className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  {selected.seller}
                </span>
              </p>
            </div>

            {/* Enquiry form */}
            <form onSubmit={handleEnquirySubmit} className="mt-4">
              <textarea
                rows={3}
                value={enquiryText}
                onChange={handleEnquiryChange}
                required
                placeholder="Customer ko enquiry / message likhein..."
                className="bmReused-textarea w-full rounded-md border border-[color:var(--primary-yellow)] bg-[var(--white-cards)] px-3 py-2.5 text-sm text-[color:var(--primary-text)] outline-none"
              />
              <button
                type="submit"
                className="mt-3 w-full cursor-pointer rounded-md bg-[var(--primary-yellow)] py-2.5 text-sm font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}