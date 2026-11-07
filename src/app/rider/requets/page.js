"use client";

import { useState } from "react";
import { ArrowUpRight, Package, MapPin, User, Phone, X } from "lucide-react";

/* ---------------- Datasets ---------------- */

const requests = [
  {
    id: "RD-101", order: "DEMO-RD-101", title: "Portland Cement", qty: "20 bags", category: "Cement", weight: 1000, vehicle: "Shehzore",
    pickup: "Al-Rehman depot, Gujranwala City (demo)", pickupArea: "Gujranwala City", dropArea: "Model Town", drop: "Model Town, Gujranwala",
    budget: 0, needed: "05-Nov-2026, 9:55 pm", neededDate: "2026-11-05", deadline: "06-Nov-2026, 9:55 pm", requested: "04-Nov-2026, 9:55 pm",
    instructions: "Ground-floor unloading. Call before arrival.", cod: 29000,
  },
  {
    id: "RD-102", order: "DEMO-RD-102", title: "Red Bricks", qty: "400 bricks", category: "Bricks", weight: 1400, vehicle: "Shehzore",
    pickup: "Al-Rehman depot, Gujranwala City (demo)", pickupArea: "Gujranwala City", dropArea: "Satellite Town", drop: "Satellite Town, Gujranwala",
    budget: 0, needed: "05-Nov-2026, 9:55 pm", neededDate: "2026-11-05", deadline: "06-Nov-2026, 9:55 pm", requested: "04-Nov-2026, 9:55 pm",
    instructions: "Unload near the gate.", cod: 12000,
  },
  {
    id: "RD-103", order: "DEMO-RD-103", title: "Steel Rebar", qty: "750 kg", category: "Steel", weight: 750, vehicle: "Shehzore",
    pickup: "Al-Rehman depot, Gujranwala City (demo)", pickupArea: "Gujranwala City", dropArea: "Eminabad", drop: "Eminabad, Gujranwala",
    budget: 0, needed: "05-Nov-2026, 9:55 pm", neededDate: "2026-11-05", deadline: "06-Nov-2026, 9:55 pm", requested: "04-Nov-2026, 9:55 pm",
    instructions: "Site manager will receive the material.", cod: 198750,
  },
];

const categories = ["Cement", "Bricks", "Steel"];
const vehicles = ["Shehzore", "Mazda Truck", "Suzuki Pickup"];
const pickupAreas = ["Gujranwala City"];
const dropAreas = ["Model Town", "Satellite Town", "Eminabad"];

/* ---------------- Shared styles + helpers ---------------- */

const field =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const btn =
  "flex items-center gap-1.5 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

const kg = (n) => `${n.toLocaleString("en-US")} kg`;

const Badge = ({ text }) => (
  <span className="rounded-md bg-[var(--off-white-background)] px-2 py-0.5 text-[11px] text-[color:var(--primary-text)]">{text}</span>
);

// Overlay + close icon
const ModalShell = ({ size = "max-w-md", onClose, children }) => (
  <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
    <div onClick={(e) => e.stopPropagation()} className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
      >
        <X size={18} />
      </button>
      {children}
    </div>
  </div>
);

/* ---------------- Requests grid ---------------- */

const RequestsGrid = ({ items, onView, onBid }) => (
  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
    {items.map((r) => (
      <div key={r.id} className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] text-[color:var(--secondary-text)]">{r.id} · {r.order}</p>
          <Badge text="Open" />
        </div>
        <h3 className="mt-2 text-base font-semibold text-[color:var(--primary-text)]">{r.title} · {r.qty}</h3>
        <p className="mt-1 text-xs text-[color:var(--secondary-text)]">{kg(r.weight)} · {r.vehicle}</p>
        <p className="mt-3 text-xs text-[color:var(--primary-text)]">{r.pickup}</p>
        <p className="text-xs text-[color:var(--primary-text)]">→ {r.drop}</p>
        <p className="mt-3 text-xs text-[color:var(--primary-text)]">Budget PKR {r.budget} · {r.needed}</p>
        <p className="text-[11px] text-[color:var(--secondary-text)]">Requested {r.requested}</p>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={() => onView(r.id)} className={btn}>
            View details <ArrowUpRight size={12} />
          </button>
          <button type="button" onClick={() => onBid(r.id)} className={yellowBtn}>Submit bid</button>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- My bids grid ---------------- */

const BidsGrid = ({ items, onView }) => (
  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
    {items.map((b) => (
      <div key={b.requestId} className="rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] text-[color:var(--secondary-text)]">{b.request.id} · {b.request.order}</p>
          <Badge text="Bid Submitted" />
        </div>
        <h3 className="mt-2 text-base font-semibold text-[color:var(--primary-text)]">{b.request.title} · {b.request.qty}</h3>
        <p className="mt-1 text-xs text-[color:var(--secondary-text)]">→ {b.request.drop}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[color:var(--primary-text)]">
          <p>My bid: <span className="font-semibold">PKR {Number(b.charges).toLocaleString("en-US")}</span></p>
          <p>Time: {b.eta || "—"}</p>
          <p className="col-span-2">Vehicle: {b.vehicle || "—"}</p>
        </div>
        {b.message && <p className="mt-2 text-xs text-[color:var(--secondary-text)]">“{b.message}”</p>}
        <div className="mt-3">
          <button type="button" onClick={() => onView(b.requestId)} className={btn}>
            View details <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- Page ---------------- */

const RiderRequestsPage = () => {
  const [tab, setTab] = useState("open");
  const [bids, setBids] = useState([]); // { requestId, charges, eta, ... }
  const [viewId, setViewId] = useState(null);
  const [bidId, setBidId] = useState(null);

  // Filters
  const [category, setCategory] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [minW, setMinW] = useState("");
  const [maxW, setMaxW] = useState("");

  // Bid form
  const [charges, setCharges] = useState("2400");
  const [eta, setEta] = useState("60-90 minutes");
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [bidVehicle, setBidVehicle] = useState("Shehzore · 2,500 kg");
  const [message, setMessage] = useState("");

  const handleClear = () => {
    setCategory("");
    setVehicle("");
    setPickup("");
    setDrop("");
    setDate("");
    setMinW("");
    setMaxW("");
  };

  // Bid form kholo (View modal se aaye to view band)
  const handleOpenBid = (id) => {
    setCharges("2400");
    setEta("60-90 minutes");
    setPickupTime("");
    setDeliveryTime("");
    setBidVehicle("Shehzore · 2,500 kg");
    setMessage("");
    setViewId(null);
    setBidId(id);
  };

  const canSend = Number(charges) > 0;

  const handleSend = () => {
    if (!canSend) return;
    setBids([...bids, { requestId: bidId, charges, eta, pickupTime, deliveryTime, vehicle: bidVehicle, message: message.trim() }]);
    setBidId(null);
  };

  const hasBid = (id) => bids.some((b) => b.requestId === id);

  // Open requests: jin par bid nahi hui + filters
  const openRequests = requests.reduce((all, r) => (hasBid(r.id) ? all : [...all, r]), []);
  const filtered = openRequests.reduce((all, r) => {
    const ok =
      (category === "" || r.category === category) &&
      (vehicle === "" || r.vehicle === vehicle) &&
      (pickup === "" || r.pickupArea === pickup) &&
      (drop === "" || r.dropArea === drop) &&
      (date === "" || r.neededDate === date) &&
      (minW === "" || r.weight >= Number(minW)) &&
      (maxW === "" || r.weight <= Number(maxW));
    return ok ? [...all, r] : all;
  }, []);

  // My bids: har bid ke saath uski request
  const myBids = bids.map((b) => ({ ...b, request: requests.find((r) => r.id === b.requestId) }));

  const viewing = requests.find((r) => r.id === viewId);
  const bidding = requests.find((r) => r.id === bidId);

  const tabs = [
    { key: "open", label: `Open Requests (${openRequests.length})` },
    { key: "bids", label: `My Bids (${bids.length})` },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <p className="text-[11px] uppercase tracking-wide text-[color:var(--secondary-text)]">BuildMart / Rider Workspace</p>
      <h1 className="mt-1 text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Delivery Requests</h1>
      <p className="mt-1 text-xs text-[color:var(--secondary-text)]">Construction material delivery · Gujranwala · demo</p>

      {/* Tabs */}
      <div className="mt-4 inline-flex rounded-lg bg-[var(--off-white-background)] p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-md px-3 py-1.5 text-xs ${
              tab === t.key ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]" : "text-[color:var(--secondary-text)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ---------- Open Requests ---------- */}
      {tab === "open" && (
        <>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Material category" className={field}>
              <option value="">Material category</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} aria-label="Vehicle type" className={field}>
              <option value="">Vehicle type</option>
              {vehicles.map((v) => <option key={v}>{v}</option>)}
            </select>
            <select value={pickup} onChange={(e) => setPickup(e.target.value)} aria-label="Pickup area" className={field}>
              <option value="">Pickup area</option>
              {pickupAreas.map((a) => <option key={a}>{a}</option>)}
            </select>
            <select value={drop} onChange={(e) => setDrop(e.target.value)} aria-label="Drop-off area" className={field}>
              <option value="">Drop-off area</option>
              {dropAreas.map((a) => <option key={a}>{a}</option>)}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Needed by date" className={field} />
            <input type="number" min="0" value={minW} onChange={(e) => setMinW(e.target.value)} placeholder="Min weight (kg)" aria-label="Min weight" className={field} />
            <input type="number" min="0" value={maxW} onChange={(e) => setMaxW(e.target.value)} placeholder="Max weight (kg)" aria-label="Max weight" className={field} />
            <button type="button" onClick={handleClear} className={`${field} text-center hover:bg-[var(--off-white-background)]`}>Clear filters</button>
          </div>

          {filtered.length === 0 && (
            <p className="mt-6 text-sm text-[color:var(--secondary-text)]">Koi delivery request nahi mili.</p>
          )}
          <RequestsGrid items={filtered} onView={setViewId} onBid={handleOpenBid} />
        </>
      )}

      {/* ---------- My Bids ---------- */}
      {tab === "bids" && (
        <>
          {myBids.length === 0 && (
            <p className="mt-6 text-sm text-[color:var(--secondary-text)]">Aap ne abhi tak kisi request par bid nahi ki.</p>
          )}
          <BidsGrid items={myBids} onView={setViewId} />
        </>
      )}

      {/* ---------- View details modal ---------- */}
      {viewing && (
        <ModalShell size="max-w-3xl" onClose={() => setViewId(null)}>
          <div className="flex items-start justify-between gap-3 pr-8">
            <p className="text-[11px] text-[color:var(--secondary-text)]">{viewing.id} · Order {viewing.order}</p>
            <Badge text={hasBid(viewing.id) ? "Bid Submitted" : "Published"} />
          </div>
          <h2 className="mt-1 text-2xl text-[color:var(--primary-text)]">{viewing.title}</h2>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{viewing.qty} · {kg(viewing.weight)} · {viewing.vehicle}</p>

          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-[color:var(--border-color)] pt-4 text-sm sm:grid-cols-2">
            {[
              { icon: Package, label: "Pickup", value: viewing.pickup },
              { icon: MapPin, label: "Drop-off area", value: viewing.dropArea },
              { icon: User, label: "Customer", value: "Hidden until you are selected" },
              { icon: Phone, label: "Contact", value: "Hidden until you are selected" },
              { label: "Exact address", value: "Hidden until you are selected", wide: true },
              { label: "Needed by", value: viewing.needed },
              { label: "Quote deadline", value: viewing.deadline },
              { label: "Instructions", value: viewing.instructions, wide: true },
              { label: "Customer expected budget", value: `PKR ${viewing.budget}` },
              { label: "Preferred time", value: "Not specified" },
              { label: "Supplier", value: viewing.pickup },
              { label: "Required capacity", value: kg(viewing.weight) },
              { label: "Fare", value: "Customer reviewing quotes" },
              { label: "COD to collect", value: `PKR ${viewing.cod.toLocaleString("en-US")}` },
            ].map((d) => (
              <div key={d.label} className={d.wide ? "sm:col-span-2" : ""}>
                <p className="flex items-center gap-1 text-xs text-[color:var(--secondary-text)]">
                  {d.icon && <d.icon size={12} />} {d.label}
                </p>
                <p className="text-[color:var(--primary-text)]">{d.value}</p>
              </div>
            ))}
          </div>

          {!hasBid(viewing.id) && (
            <div className="mt-4 border-t border-[color:var(--border-color)] pt-4">
              <button type="button" onClick={() => handleOpenBid(viewing.id)} className={yellowBtn}>Submit bid</button>
            </div>
          )}

          <div className="mt-4 border-t border-[color:var(--border-color)] pt-4">
            <h3 className="text-sm font-semibold text-[color:var(--primary-text)]">Timeline</h3>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-[color:var(--primary-text)]">Request Published (demo)</span>
              <span className="text-xs text-[color:var(--secondary-text)]">{viewing.requested}</span>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ---------- Submit bid modal (form) ---------- */}
      {bidding && (
        <ModalShell onClose={() => setBidId(null)}>
          <h2 className="pr-8 text-lg font-semibold text-[color:var(--primary-text)]">Submit delivery bid</h2>
          <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
            {bidding.id} · {bidding.qty} · {bidding.weight.toLocaleString("en-US")} kg · demo
          </p>

          <label htmlFor="bmBidCharges" className="mt-4 block text-sm text-[color:var(--primary-text)]">Delivery charges (PKR)</label>
          <input id="bmBidCharges" type="number" min="1" value={charges} onChange={(e) => setCharges(e.target.value)} className={`${field} mt-1`} />

          <label htmlFor="bmBidEta" className="mt-3 block text-sm text-[color:var(--primary-text)]">Estimated delivery time</label>
          <input id="bmBidEta" type="text" value={eta} onChange={(e) => setEta(e.target.value)} className={`${field} mt-1`} />

          <label htmlFor="bmBidPickup" className="mt-3 block text-sm text-[color:var(--primary-text)]">Expected pickup time</label>
          <input id="bmBidPickup" type="datetime-local" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className={`${field} mt-1`} />

          <label htmlFor="bmBidDelivery" className="mt-3 block text-sm text-[color:var(--primary-text)]">Expected delivery time</label>
          <input id="bmBidDelivery" type="datetime-local" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} className={`${field} mt-1`} />

          <label htmlFor="bmBidVehicle" className="mt-3 block text-sm text-[color:var(--primary-text)]">Vehicle to be used</label>
          <input id="bmBidVehicle" type="text" value={bidVehicle} onChange={(e) => setBidVehicle(e.target.value)} className={`${field} mt-1`} />

          <label htmlFor="bmBidMessage" className="mt-3 block text-sm text-[color:var(--primary-text)]">Message to customer</label>
          <textarea id="bmBidMessage" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} mt-1 resize-y`} />

          <button
            type="button"
            disabled={!canSend}
            onClick={handleSend}
            className="mt-4 w-full rounded-md bg-[var(--primary-yellow)] px-4 py-2.5 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send bid (demo)
          </button>
        </ModalShell>
      )}
    </section>
  );
};

export default RiderRequestsPage;