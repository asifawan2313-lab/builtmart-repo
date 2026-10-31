// import UserManagement from "./Usermanagement.js";

// export default function UsersPage() {
//   return <UserManagement />;
// }


"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Plus,
  Search,
  X,
} from "lucide-react";

/* ============================================================
   SHARED: sab tabs aur detail screens mein use hone wale hisse
   ============================================================ */

const tones = {
  green: "bg-green-50 text-green-700 ring-green-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  red: "bg-red-50 text-red-600 ring-red-200",
  grey: "bg-[var(--off-white-background)] text-[color:var(--secondary-text)] ring-[color:var(--border-color)]",
};

const card = "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm";
const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const cell = "px-4 py-4 text-[color:var(--primary-text)]";
const orderCell = "px-4 py-3.5 text-[color:var(--primary-text)]";

const orderHeadings = ["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"];

function Badge({ tone, children }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${tone}`}>{children}</span>;
}

function StatusBadge({ active }) {
  return <Badge tone={active ? tones.green : tones.red}>{active ? "Active" : "Inactive"}</Badge>;
}

// Search box (aur chaho to status dropdown bhi)
function SearchBar({ search, onSearch, status, onStatus, options }) {
  return (
    <div className="flex flex-col gap-3 p-3 sm:flex-row">
      <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
        <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search..."
          aria-label="Search"
          className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
        />
      </div>
      {options && (
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          aria-label="Status"
          className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
    </div>
  );
}

// Table: heading wali patti + rows (children). minWidth poori class likhni hai, jaise "min-w-[820px]"
function DataTable({ headings, minWidth, children }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left text-sm ${minWidth}`}>
        <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
          <tr>
            {headings.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                <span className="inline-flex items-center gap-1">
                  {h}
                  {h === "Name" && <ArrowUpDown size={12} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TableFooter({ text }) {
  return (
    <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
      <span>{text}</span>
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
        <span>Page 1 / 1</span>
        <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

// Detail screens ka upar wala hissa: naam + Back button
function DetailHeader({ title, backText, onBack }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">{title}</h1>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
      >
        <ArrowLeft size={16} />
        {backText}
      </button>
    </div>
  );
}

// Label + value ka grid
function InfoGrid({ info }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
      {info.map((item) => (
        <div key={item.label}>
          <p className="text-xs text-[color:var(--secondary-text)]">{item.label}</p>
          <p className="mt-1 text-sm text-[color:var(--primary-text)]">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// Orders ka table (Customer aur Supplier dono detail mein). withSearch = upar search box dikhao
function OrdersCard({ orders, withSearch = false }) {
  const [search, setSearch] = useState("");

  // Search: kisi bhi column mein likha hua text mil jaye to order dikhao
  const match = (o) =>
    `${o.id} ${o.customer} ${o.material} ${o.date} ${o.amount} ${o.pay} ${o.status}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const shown = orders.reduce((n, o) => n + (match(o) ? 1 : 0), 0);

  return (
    <div className={`mt-4 ${card}`}>
      {withSearch && <SearchBar search={search} onSearch={setSearch} />}

      <DataTable headings={orderHeadings} minWidth="min-w-[900px]">
        {orders.map((o) => {
          if (!match(o)) return null;
          return (
            <tr key={o.id} className="border-t border-[color:var(--border-color)]">
              <td className={orderCell}>{o.id}</td>
              <td className={orderCell}>{o.customer}</td>
              <td className={orderCell}>{o.material}</td>
              <td className={orderCell}>{o.date}</td>
              <td className={orderCell}>{o.amount}</td>
              <td className="px-4 py-3.5"><Badge tone={tones[o.payTone]}>{o.pay}</Badge></td>
              <td className="px-4 py-3.5"><Badge tone={tones[o.statusTone]}>{o.status}</Badge></td>
            </tr>
          );
        })}
      </DataTable>

      <TableFooter text={`${shown} records`} />
    </div>
  );
}

/* ============================================================
   1. CUSTOMERS
   ============================================================ */

const customers = [
  {
    id: 1, name: "Ahmed Raza", email: "ahmed@mail.pk", phone: "0300-1112233", profile: "Complete", active: false,
    city: "Lahore", registered: "2026-08-19",
    orders: [
      { id: "ORD-1001", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
      { id: "ORD-1005", material: "Leftover Porcelain Tiles", date: "2026-10-09", amount: "Rs 13,200", pay: "Refunded", payTone: "red", status: "Returned", statusTone: "red" },
    ],
  },
  {
    id: 2, name: "Sana Malik", email: "sana@mail.pk", phone: "0321-4455667", profile: "Complete", active: true,
    city: "Gujranwala", registered: "2026-08-22",
    orders: [
      { id: "ORD-1002", material: "Bricks Grade A", date: "2026-09-30", amount: "Rs 80,000", pay: "Paid", payTone: "green", status: "In Transit", statusTone: "green" },
    ],
  },
  {
    id: 3, name: "Bilal Khan", email: "bilal@mail.pk", phone: "0333-9988776", profile: "Complete", active: true,
    city: "Lahore", registered: "2026-09-01",
    orders: [
      { id: "ORD-1003", material: "Steel Rebar 12mm", date: "2026-10-02", amount: "Rs 45,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
  },
  {
    id: 4, name: "Hira Javed", email: "hira@mail.pk", phone: "0345-1239876", profile: "Complete", active: false,
    city: "Islamabad", registered: "2026-09-05",
    orders: [
      { id: "ORD-1004", material: "Floor Tiles", date: "2026-10-04", amount: "Rs 22,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
  },
  {
    id: 5, name: "Usman Tariq", email: "usman@mail.pk", phone: "0301-5566778", profile: "Complete", active: true,
    city: "Faisalabad", registered: "2026-09-12",
    orders: [
      { id: "ORD-1006", material: "Sand (Ravi)", date: "2026-10-10", amount: "Rs 18,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
  },
];

const customerHeadings = ["Name", "Email", "Phone", "Profile Status", "Account Status", "Actions"];

// list aur onToggle parent se aate hain, taake detail se wapas aane par changes mehfooz rahen
function CustomerTab({ list, onView, onToggle }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <div className={`mt-5 ${card}`}>
      <SearchBar search={search} onSearch={setSearch} status={status} onStatus={setStatus} options={["All", "Active", "Inactive"]} />

      <DataTable headings={customerHeadings} minWidth="min-w-[820px]">
        {list.map((c) => (
          <tr key={c.id} className="border-t border-[color:var(--border-color)]">
            <td className={cell}>{c.name}</td>
            <td className={cell}>{c.email}</td>
            <td className={cell}>{c.phone}</td>
            <td className="px-4 py-4"><Badge tone={tones.grey}>{c.profile}</Badge></td>
            <td className="px-4 py-4"><StatusBadge active={c.active} /></td>
            <td className="px-4 py-4">
              <div className="flex gap-2">
                <button type="button" onClick={() => onView(c)} className={btn}>View</button>
                <button type="button" onClick={() => console.log("Edit", c.name)} className={btn}>Edit</button>
                <button type="button" onClick={() => onToggle(c.id)} className={btn}>
                  {c.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      <TableFooter text={`${list.length} records`} />
    </div>
  );
}

function CustomerDetail({ customer, onBack }) {
  const info = [
    { label: "Name", value: customer.name },
    { label: "Email", value: customer.email },
    { label: "Phone", value: customer.phone },
    { label: "City", value: customer.city },
    { label: "Registered", value: customer.registered },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <DetailHeader title={customer.name} backText="Back to Customers" onBack={onBack} />

      <div className="mt-4">
        <StatusBadge active={customer.active} />
      </div>

      <InfoGrid info={info} />

      <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Orders</h2>
      <OrdersCard orders={customer.orders.map((o) => ({ ...o, customer: customer.name }))} />
    </section>
  );
}

/* ============================================================
   2. SUPPLIERS
   ============================================================ */

const suppliers = [
  {
    id: 1, name: "Imran Sheikh", shop: "Sheikh Traders", email: "imran@sheikhtraders.pk", phone: "0300-7778899",
    verification: "Verified", active: false,
    city: "Lahore", registered: "2026-07-20", type: "Cement & Steel", address: "Shop 12, Ravi Road, Lahore",
    submitted: "2026-07-21", wallet: "Rs 18,500",
    orders: [
      { id: "ORD-1001", customer: "Ahmed Raza", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
      { id: "ORD-1003", customer: "Bilal Khan", material: "Grade 60 Steel Saria 12mm", date: "2026-10-16", amount: "Rs 106,000", pay: "Paid", payTone: "green", status: "Ready for Dispatch", statusTone: "blue" },
      { id: "ORD-1004", customer: "Usman Tariq", material: "Ravi Sand (Truck)", date: "2026-10-18", amount: "Rs 28,000", pay: "Pending", payTone: "amber", status: "Pending", statusTone: "amber" },
      { id: "ORD-1006", customer: "Sana Malik", material: "DG Khan Cement OPC", date: "2026-10-12", amount: "Rs 27,000", pay: "Pending", payTone: "amber", status: "Cancelled", statusTone: "red" },
    ],
    listings: ["DG Khan Cement OPC · In Stock", "Grade 60 Steel Saria 12mm · In Stock", "Weather Shield Paint 16L · In Stock", "Ravi Sand (Truck) · In Stock"],
  },
  {
    id: 2, name: "Farah Iqbal", shop: "Brick House", email: "farah@brickhouse.pk", phone: "0322-1212121",
    verification: "Verified", active: true,
    city: "Gujranwala", registered: "2026-07-25", type: "Bricks", address: "Shop 4, GT Road, Gujranwala",
    submitted: "2026-07-26", wallet: "Rs 9,200",
    orders: [
      { id: "ORD-1002", customer: "Sana Malik", material: "Bricks Grade A", date: "2026-09-30", amount: "Rs 80,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
    ],
    listings: ["Bricks Grade A · In Stock", "Bricks Grade B · In Stock"],
  },
  {
    id: 3, name: "Kamran Ali", shop: "Tile City", email: "kamran@tilecity.pk", phone: "0312-3434343",
    verification: "Pending", active: true,
    city: "Islamabad", registered: "2026-10-01", type: "Tiles", address: "Plot 7, Blue Area, Islamabad",
    submitted: "2026-10-02", wallet: "Rs 0",
    orders: [],
    listings: [],
  },
  {
    id: 4, name: "Nadia Hussain", shop: "PaintPro", email: "nadia@paintpro.pk", phone: "0336-5656565",
    verification: "Pending", active: true,
    city: "Faisalabad", registered: "2026-10-03", type: "Paints", address: "Shop 9, Kohinoor Road, Faisalabad",
    submitted: "2026-10-04", wallet: "Rs 0",
    orders: [],
    listings: [],
  },
  {
    id: 5, name: "Zahid Mehmood", shop: "Zahid Iron Works", email: "zahid@ironworks.pk", phone: "0344-7878787",
    verification: "Rejected", active: true,
    city: "Sialkot", registered: "2026-09-10", type: "Steel", address: "Unit 3, Industrial Area, Sialkot",
    submitted: "2026-09-11", wallet: "Rs 0",
    orders: [],
    listings: [],
  },
];

const supplierHeadings = ["Name", "Shop Name", "Email", "Phone", "Verification Status", "Account Status", "Actions"];
const verifyTones = { Verified: tones.green, Pending: tones.amber, Rejected: tones.red };
const documents = ["cnic_front.pdf", "cnic_back.pdf", "ntn_certificate.pdf"];

const reviewBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
const docBtn = `inline-flex items-center gap-1.5 ${btn}`;

// onView: View dabane par parent ko supplier de deta hai (detail screen wahan khulti hai)
function SupplierTab({ onView }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Verified / Pending / Rejected
  const [list, setList] = useState(suppliers);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setList(list.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  // Dropdown ke hisab se kitne records nazar aa rahe hain
  const shown = list.reduce((n, s) => n + (status === "All" || s.verification === status ? 1 : 0), 0);

  return (
    <div className={`mt-5 ${card}`}>
      <SearchBar
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
        options={["All", "Verified", "Pending", "Rejected"]}
      />

      <DataTable headings={supplierHeadings} minWidth="min-w-[980px]">
        {list.map((s) => {
          // Dropdown se match nahi karta to ye row dikhao hi mat
          if (status !== "All" && s.verification !== status) return null;

          return (
            <tr key={s.id} className="border-t border-[color:var(--border-color)]">
              <td className={cell}>{s.name}</td>
              <td className={cell}>{s.shop}</td>
              <td className={cell}>{s.email}</td>
              <td className={cell}>{s.phone}</td>
              <td className="px-4 py-4"><Badge tone={verifyTones[s.verification]}>{s.verification}</Badge></td>
              <td className="px-4 py-4"><StatusBadge active={s.active} /></td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button type="button" onClick={() => onView(s)} className={btn}>View</button>

                  {s.verification === "Verified" && (
                    <button type="button" onClick={() => handleToggle(s.id)} className={btn}>
                      {s.active ? "Deactivate" : "Activate"}
                    </button>
                  )}

                  {s.verification === "Pending" && (
                    <button type="button" onClick={() => console.log("Review", s.name)} className={reviewBtn}>
                      Review
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </DataTable>

      <TableFooter text={`${shown} records`} />
    </div>
  );
}

function SupplierDetail({ supplier, onBack }) {
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

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <DetailHeader title={supplier.shop} backText="Back to Suppliers" onBack={onBack} />

      {/* Status badges */}
      <div className="mt-4 flex gap-2">
        <Badge tone={verifyTones[supplier.verification]}>{supplier.verification}</Badge>
        <StatusBadge active={supplier.active} />
      </div>

      <InfoGrid info={info} />

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
              <a href={`/documents/${doc}`} target="_blank" rel="noreferrer" className={docBtn}>
                <Eye size={14} /> Preview
              </a>
              <a href={`/documents/${doc}`} download className={docBtn}>
                <Download size={14} /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">All Supplier Orders</h2>
      <OrdersCard orders={supplier.orders} withSearch />

      <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">Listings</h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-[color:var(--primary-text)]">
        {supplier.listings.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   3. SUB-ADMINS
   ============================================================ */

const subAdmins = [
  {
    id: 1, name: "Maria Saeed", email: "maria@buildmart.pk", phone: "0300-0000002", active: true,
    city: "Lahore", registered: "2026-09-18",
    modules: ["Material Management", "Material Categories", "Blogs", "Reviews & Ratings"],
  },
];

const subAdminHeadings = ["Name", "Email", "Phone", "Account Status", "Actions"];

const moduleList = [
  "User Management", "Material Categories", "Material Management", "Orders",
  "Deliveries & Riders", "Top-Up Requests", "Disputes & Support", "Blogs",
  "Homepage / CMS", "Contact Management", "Reviews & Ratings", "Notifications",
  "Reports & Analytics", "Settings",
];

const modalFields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "password", label: "Password" },
];

// "Add Sub-Admin" ka popup
function AddSubAdminModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "1234", status: "Active" });
  const [picked, setPicked] = useState({}); // { "Blogs": true, ... }

  const handleSave = () => {
    if (!form.name) return; // naam khali ho to save nahi
    onSave({
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      active: form.status === "Active",
      city: "-",
      registered: new Date().toISOString().slice(0, 10),
      modules: moduleList.reduce((all, m) => (picked[m] ? [...all, m] : all), []),
    });
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6">
        {/* Band karne ka X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl text-[color:var(--primary-text)]">Add Sub-Admin</h2>

        {/* Fields */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {modalFields.map((f) => (
            <label key={f.key} className="text-xs text-[color:var(--secondary-text)]">
              {f.label}
              <input
                type="text"
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className={inputClass}
              />
            </label>
          ))}

          <label className="text-xs text-[color:var(--secondary-text)]">
            Account Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={inputClass}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>

        <p className="mt-3 text-xs text-[color:var(--secondary-text)]">
          Ask this sub-admin to reset their password after their first login.
        </p>

        {/* Permitted modules */}
        <h3 className="mt-5 text-sm text-[color:var(--primary-text)]">Permitted modules</h3>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {moduleList.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
              <input
                type="checkbox"
                checked={!!picked[m]}
                onChange={() => setPicked({ ...picked, [m]: !picked[m] })}
                className="h-4 w-4 accent-[var(--primary-yellow)]"
              />
              {m}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// onView: detail screen | addOpen / onAddClose: "Add Sub-Admin" popup (button parent mein hai)
function SubAdminTab({ onView, addOpen, onAddClose }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All"); // All / Active / Inactive
  const [list, setList] = useState(subAdmins);

  // Active <-> Inactive badalna
  const handleToggle = (id) => {
    setList(list.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  // Popup se naya sub-admin list mein jodna
  const handleAdd = (newAdmin) => {
    setList([...list, newAdmin]);
    onAddClose();
  };

  // Dropdown ke hisab se kitne records nazar aa rahe hain
  const shown = list.reduce((n, a) => n + (status === "All" || (status === "Active") === a.active ? 1 : 0), 0);

  return (
    <div className={`mt-5 ${card}`}>
      <SearchBar search={search} onSearch={setSearch} status={status} onStatus={setStatus} options={["All", "Active", "Inactive"]} />

      <DataTable headings={subAdminHeadings} minWidth="min-w-[720px]">
        {list.map((a) => {
          // Dropdown se match nahi karta to ye row dikhao hi mat
          if (status !== "All" && (status === "Active") !== a.active) return null;

          return (
            <tr key={a.id} className="border-t border-[color:var(--border-color)]">
              <td className={cell}>{a.name}</td>
              <td className={cell}>{a.email}</td>
              <td className={cell}>{a.phone}</td>
              <td className="px-4 py-4"><StatusBadge active={a.active} /></td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button type="button" onClick={() => onView(a)} className={btn}>View</button>
                  <button type="button" onClick={() => console.log("Edit", a.name)} className={btn}>Edit</button>
                  <button type="button" onClick={() => handleToggle(a.id)} className={btn}>
                    {a.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </DataTable>

      <TableFooter text={`${shown} record(s)`} />

      {addOpen && <AddSubAdminModal onClose={onAddClose} onSave={handleAdd} />}
    </div>
  );
}

function SubAdminDetail({ subAdmin, onBack }) {
  const info = [
    { label: "Name", value: subAdmin.name },
    { label: "Email", value: subAdmin.email },
    { label: "Phone", value: subAdmin.phone },
    { label: "City", value: subAdmin.city },
    { label: "Registered", value: subAdmin.registered },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <DetailHeader title={subAdmin.name} backText="Back to Sub-Admins" onBack={onBack} />

      <div className="mt-4">
        <StatusBadge active={subAdmin.active} />
      </div>

      <InfoGrid info={info} />

      <p className="mt-6 text-[color:var(--primary-text)]">Permitted modules: {subAdmin.modules.join(", ")}</p>
    </section>
  );
}

/* ============================================================
   PAGE: User Management
   ============================================================ */

const tabs = ["Customers (5)", "Suppliers (5)", "Sub-Admins (1)"];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [customerList, setCustomerList] = useState(customers);
  const [customer, setCustomer] = useState(null); // customer detail
  const [supplier, setSupplier] = useState(null); // supplier detail
  const [subAdmin, setSubAdmin] = useState(null); // sub-admin detail
  const [addOpen, setAddOpen] = useState(false); // Add Sub-Admin popup

  // Customer Active <-> Inactive badalna
  const handleToggle = (id) => {
    setCustomerList(customerList.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const detailOpen = customer || supplier || subAdmin;

  return (
    <>
      {/* Detail screens: list sirf chhupti hai (hidden), is liye wapas aane par sab kuch waisa hi milta hai */}
      {customer && <CustomerDetail customer={customer} onBack={() => setCustomer(null)} />}
      {supplier && <SupplierDetail supplier={supplier} onBack={() => setSupplier(null)} />}
      {subAdmin && <SubAdminDetail subAdmin={subAdmin} onBack={() => setSubAdmin(null)} />}

      <section className={`p-4 sm:p-6 lg:p-8 ${detailOpen ? "hidden" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">User Management</h1>

          {/* Sirf Sub-Admins tab par */}
          {activeTab === 2 && (
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              <Plus size={16} />
              Add Sub-Admin
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-5 overflow-x-auto">
          <div className="inline-flex gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors sm:px-4 ${
                  activeTab === i
                    ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                    : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 0 && <CustomerTab list={customerList} onView={setCustomer} onToggle={handleToggle} />}
        {activeTab === 1 && <SupplierTab onView={setSupplier} />}
        {activeTab === 2 && (
          <SubAdminTab onView={setSubAdmin} addOpen={addOpen} onAddClose={() => setAddOpen(false)} />
        )}
      </section>
    </>
  );
}