




// "use client";

// import { useState } from "react";
// // import { ArrowLeft, ArrowUpDown, ChevronLeft, ChevronRight, Download, Eye, FileText, Plus, Search, X } from "lucide-react";
// import { ArrowLeft, ArrowUpDown, ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";

// /* ============================================================
//    DATASETS
//    ============================================================ */

// const initialUsers = {
//   customers: [
//     {
//       id: 1, name: "Ahmed Raza", email: "ahmed@mail.pk", phone: "0300-1112233", profile: "Complete", active: false, city: "Lahore", registered: "2026-08-19",
//       orders: [
//         { id: "ORD-1001", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
//         { id: "ORD-1005", material: "Leftover Porcelain Tiles", date: "2026-10-09", amount: "Rs 13,200", pay: "Refunded", payTone: "red", status: "Returned", statusTone: "red" },
//       ],
//     },
//     {
//       id: 2, name: "Sana Malik", email: "sana@mail.pk", phone: "0321-4455667", profile: "Complete", active: true, city: "Gujranwala", registered: "2026-08-22",
//       orders: [{ id: "ORD-1002", material: "Bricks Grade A", date: "2026-09-30", amount: "Rs 80,000", pay: "Paid", payTone: "green", status: "In Transit", statusTone: "green" }],
//     },
//     {
//       id: 3, name: "Bilal Khan", email: "bilal@mail.pk", phone: "0333-9988776", profile: "Complete", active: true, city: "Lahore", registered: "2026-09-01",
//       orders: [{ id: "ORD-1003", material: "Steel Rebar 12mm", date: "2026-10-02", amount: "Rs 45,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" }],
//     },
//     {
//       id: 4, name: "Hira Javed", email: "hira@mail.pk", phone: "0345-1239876", profile: "Complete", active: false, city: "Islamabad", registered: "2026-09-05",
//       orders: [{ id: "ORD-1004", material: "Floor Tiles", date: "2026-10-04", amount: "Rs 22,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" }],
//     },
//     {
//       id: 5, name: "Usman Tariq", email: "usman@mail.pk", phone: "0301-5566778", profile: "Complete", active: true, city: "Faisalabad", registered: "2026-09-12",
//       orders: [{ id: "ORD-1006", material: "Sand (Ravi)", date: "2026-10-10", amount: "Rs 18,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" }],
//     },
//   ],

//   suppliers: [
//     {
//       id: 1, name: "Imran Sheikh", shop: "Sheikh Traders", email: "imran@sheikhtraders.pk", phone: "0300-7778899", verification: "Verified", active: false,
//       city: "Lahore", registered: "2026-07-20", type: "Cement & Steel", address: "Shop 12, Ravi Road, Lahore", submitted: "2026-07-21", wallet: "Rs 18,500",
//       orders: [
//         { id: "ORD-1001", customer: "Ahmed Raza", material: "DG Khan Cement OPC", date: "2026-09-28", amount: "Rs 67,500", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" },
//         { id: "ORD-1003", customer: "Bilal Khan", material: "Grade 60 Steel Saria 12mm", date: "2026-10-16", amount: "Rs 106,000", pay: "Paid", payTone: "green", status: "Ready for Dispatch", statusTone: "blue" },
//         { id: "ORD-1004", customer: "Usman Tariq", material: "Ravi Sand (Truck)", date: "2026-10-18", amount: "Rs 28,000", pay: "Pending", payTone: "amber", status: "Pending", statusTone: "amber" },
//         { id: "ORD-1006", customer: "Sana Malik", material: "DG Khan Cement OPC", date: "2026-10-12", amount: "Rs 27,000", pay: "Pending", payTone: "amber", status: "Cancelled", statusTone: "red" },
//       ],
//     //   listings: ["DG Khan Cement OPC · In Stock", "Grade 60 Steel Saria 12mm · In Stock", "Weather Shield Paint 16L · In Stock", "Ravi Sand (Truck) · In Stock"],
    
//           listings: [
//         { id: 1, material: "DG Khan Cement OPC", category: "Cement", price: "Rs 1,350 / bag", stock: "In Stock" },
//         { id: 2, material: "Grade 60 Steel Saria 12mm", category: "Steel / Saria", price: "Rs 265 / kg", stock: "In Stock" },
//         { id: 3, material: "Weather Shield Paint 16L", category: "Paint", price: "Rs 9,800 / bucket", stock: "In Stock" },
//         { id: 4, material: "Ravi Sand (Truck)", category: "Sand / Rait", price: "Rs 28,000 / truck", stock: "In Stock" },
//       ],
  
  
//   },
//     {
//       id: 2, name: "Farah Iqbal", shop: "Brick House", email: "farah@brickhouse.pk", phone: "0322-1212121", verification: "Verified", active: true,
//       city: "Gujranwala", registered: "2026-07-25", type: "Bricks", address: "Shop 4, GT Road, Gujranwala", submitted: "2026-07-26", wallet: "Rs 9,200",
//       orders: [{ id: "ORD-1002", customer: "Sana Malik", material: "Bricks Grade A", date: "2026-09-30", amount: "Rs 80,000", pay: "Paid", payTone: "green", status: "Delivered", statusTone: "green" }],
//       // listings: ["Bricks Grade A · In Stock", "Bricks Grade B · In Stock"],

//             listings: [
//         { id: 1, material: "Bricks Grade A", category: "Bricks", price: "Rs 16 / brick", stock: "In Stock" },
//         { id: 2, material: "Bricks Grade B", category: "Bricks", price: "Rs 14 / brick", stock: "In Stock" },
//       ],

//     },
//     {
//       id: 3, name: "Kamran Ali", shop: "Tile City", email: "kamran@tilecity.pk", phone: "0312-3434343", verification: "Pending", active: true,
//       city: "Islamabad", registered: "2026-10-01", type: "Tiles", address: "Plot 7, Blue Area, Islamabad", submitted: "2026-10-02", wallet: "Rs 0",
//       orders: [], listings: [],
//     },
//     {
//       id: 4, name: "Nadia Hussain", shop: "PaintPro", email: "nadia@paintpro.pk", phone: "0336-5656565", verification: "Pending", active: true,
//       city: "Faisalabad", registered: "2026-10-03", type: "Paints", address: "Shop 9, Kohinoor Road, Faisalabad", submitted: "2026-10-04", wallet: "Rs 0",
//       orders: [], listings: [],
//     },
//     {
//       id: 5, name: "Zahid Mehmood", shop: "Zahid Iron Works", email: "zahid@ironworks.pk", phone: "0344-7878787", verification: "Rejected", active: true,
//       city: "Sialkot", registered: "2026-09-10", type: "Steel", address: "Unit 3, Industrial Area, Sialkot", submitted: "2026-09-11", wallet: "Rs 0",
//       orders: [], listings: [],
//     },
//   ],

//   riders: [
//     {
//       id: 1, name: "Hamza Transport", email: "hamza@transport.pk", phone: "0301-2223344", active: true, city: "Gujranwala", registered: "2026-09-15",
//       vehicleType: "Shehzore", vehicleNo: "GRW-2026", capacity: "2,500 kg", wallet: "Rs 4,800",
//       deliveries: [
//         { id: "RD-103", material: "Steel Rebar", date: "2026-11-03", amount: "Rs 3,000", status: "Delivered", tone: "green" },
//         { id: "RD-101", material: "Portland Cement", date: "2026-11-04", amount: "Rs 2,400", status: "In Transit", tone: "blue" },
//       ],
//     },
//     {
//       id: 2, name: "Asif Mehmood", email: "asif@mail.pk", phone: "0322-7788990", active: true, city: "Gujranwala", registered: "2026-09-20",
//       vehicleType: "Mazda Truck", vehicleNo: "LEB-4521", capacity: "4,000 kg", wallet: "Rs 1,200",
//       deliveries: [{ id: "RD-102", material: "Red Bricks", date: "2026-11-02", amount: "Rs 3,200", status: "Delivered", tone: "green" }],
//     },
//     {
//       id: 3, name: "Waqas Ahmed", email: "waqas@mail.pk", phone: "0333-1100220", active: false, city: "Sialkot", registered: "2026-10-05",
//       vehicleType: "Suzuki Pickup", vehicleNo: "SKT-1188", capacity: "800 kg", wallet: "Rs 0",
//       deliveries: [],
//     },
//   ],

//   labour: [
//     {
//       id: 1, name: "Shahid Ali", email: "shahid@mail.pk", phone: "0300-9090909", active: true, city: "Gujranwala", registered: "2026-09-02",
//       skill: "Mason", experience: "8 years", rate: "Rs 2,500 / day", availability: "Available",
//       jobs: [
//         { id: "JOB-11", customer: "Ahmed Raza", work: "Boundary wall", date: "2026-10-20", amount: "Rs 15,000", status: "Completed", tone: "green" },
//         { id: "JOB-14", customer: "Sana Malik", work: "Room plaster", date: "2026-11-01", amount: "Rs 7,500", status: "In Progress", tone: "blue" },
//       ],
//     },
//     {
//       id: 2, name: "Rafiq Ahmed", email: "rafiq@mail.pk", phone: "0312-5566778", active: true, city: "Lahore", registered: "2026-09-18",
//       skill: "Electrician", experience: "5 years", rate: "Rs 2,000 / day", availability: "Busy",
//       jobs: [{ id: "JOB-12", customer: "Bilal Khan", work: "House wiring", date: "2026-10-25", amount: "Rs 12,000", status: "Completed", tone: "green" }],
//     },
//     {
//       id: 3, name: "Tariq Hussain", email: "tariq@mail.pk", phone: "0345-4433221", active: false, city: "Gujranwala", registered: "2026-10-10",
//       skill: "Plumber", experience: "3 years", rate: "Rs 1,800 / day", availability: "Available",
//       jobs: [],
//     },
//   ],

//   subAdmins: [
//     {
//       id: 1, name: "Maria Saeed", email: "maria@buildmart.pk", phone: "0300-0000002", active: true, city: "Lahore", registered: "2026-09-18",
//       modules: ["Material Management", "Material Categories", "Blogs", "Reviews & Ratings"],
//     },
//   ],
// };

// /* ============================================================
//    TAB SETTINGS (har tab ki headings, columns, form fields)
//    ============================================================ */

// const activeOptions = ["All", "Active", "Inactive"];

// const tabConfig = [
//   {
//     key: "customers", label: "Customers", singular: "Customer", back: "Back to Customers", minWidth: "min-w-[820px]", options: activeOptions,
//     headings: ["Name", "Email", "Phone", "Profile Status", "Account Status", "Actions"],
//     columns: [{ key: "name" }, { key: "email" }, { key: "phone" }, { key: "profile", type: "grey" }, { key: "active", type: "status" }],
//     formFields: [
//       { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "city", label: "City" },
//     ],
//     info: [
//       { label: "Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" },
//       { label: "City", key: "city" }, { label: "Registered", key: "registered" },
//     ],
//   },
//   {
//     key: "suppliers", label: "Suppliers", singular: "Supplier", back: "Back to Suppliers", minWidth: "min-w-[980px]", options: ["All", "Verified", "Pending", "Rejected"],
//     headings: ["Name", "Shop Name", "Email", "Phone", "Verification Status", "Account Status", "Actions"],
//     columns: [{ key: "name" }, { key: "shop" }, { key: "email" }, { key: "phone" }, { key: "verification", type: "verify" }, { key: "active", type: "status" }],
//     formFields: [
//       { key: "name", label: "Name" }, { key: "shop", label: "Shop Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
//       { key: "city", label: "City" }, { key: "type", label: "Business Type" }, { key: "address", label: "Address", wide: true },
//     ],
//     info: [
//       { label: "Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" }, { label: "City", key: "city" },
//       { label: "Registered", key: "registered" }, { label: "Shop Name", key: "shop" }, { label: "Business Type", key: "type" },
//       { label: "Address", key: "address" }, { label: "Submitted", key: "submitted" }, { label: "Wallet Balance", key: "wallet" },
//     ],
//   },
//   {
//     key: "riders", label: "Riders", singular: "Rider", back: "Back to Riders", minWidth: "min-w-[900px]", options: activeOptions,
//     headings: ["Name", "Email", "Phone", "Vehicle", "Account Status", "Actions"],
//     columns: [{ key: "name" }, { key: "email" }, { key: "phone" }, { key: "vehicleType", type: "grey" }, { key: "active", type: "status" }],
//     formFields: [
//       { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "city", label: "City" },
//       { key: "vehicleType", label: "Vehicle Type" }, { key: "vehicleNo", label: "Vehicle Number" }, { key: "capacity", label: "Capacity" },
//     ],
//     info: [
//       { label: "Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" }, { label: "City", key: "city" },
//       { label: "Registered", key: "registered" }, { label: "Vehicle Type", key: "vehicleType" }, { label: "Vehicle Number", key: "vehicleNo" },
//       { label: "Capacity", key: "capacity" }, { label: "Wallet Balance", key: "wallet" },
//     ],
//   },
//   {
//     key: "labour", label: "Labour", singular: "Labour", back: "Back to Labour", minWidth: "min-w-[900px]", options: activeOptions,
//     headings: ["Name", "Email", "Phone", "Skill", "Account Status", "Actions"],
//     columns: [{ key: "name" }, { key: "email" }, { key: "phone" }, { key: "skill", type: "grey" }, { key: "active", type: "status" }],
//     formFields: [
//       { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "city", label: "City" },
//       { key: "skill", label: "Skill" }, { key: "experience", label: "Experience" }, { key: "rate", label: "Daily Rate" },
//     ],
//     info: [
//       { label: "Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" }, { label: "City", key: "city" },
//       { label: "Registered", key: "registered" }, { label: "Skill", key: "skill" }, { label: "Experience", key: "experience" },
//       { label: "Daily Rate", key: "rate" }, { label: "Availability", key: "availability" },
//     ],
//   },
//   {
//     key: "subAdmins", label: "Sub-Admins", singular: "Sub-Admin", back: "Back to Sub-Admins", minWidth: "min-w-[720px]", options: activeOptions,
//     headings: ["Name", "Email", "Phone", "Account Status", "Actions"],
//     columns: [{ key: "name" }, { key: "email" }, { key: "phone" }, { key: "active", type: "status" }],
//     formFields: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }],
//     info: [
//       { label: "Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" },
//       { label: "City", key: "city" }, { label: "Registered", key: "registered" },
//     ],
//   },
// ];

// const orderHeadings = ["Order ID", "Customer", "Material", "Order Date", "Total Amount", "Payment Status", "Order Status"];
// const deliveryHeadings = ["Delivery ID", "Material", "Date", "Amount", "Status"];
// const jobHeadings = ["Job ID", "Customer", "Work", "Date", "Amount", "Status"];
// const listingHeadings = ["Material", "Category", "Price", "Availability"];

// // const documents = ["cnic_front.pdf", "cnic_back.pdf", "ntn_certificate.pdf"];

// const moduleList = [
//   "Moderater", "Super Admin", 
// ];

// /* ============================================================
//    SHARED styles + small pieces
//    ============================================================ */

// const tones = {
//   green: "bg-green-50 text-green-700 ring-green-200",
//   amber: "bg-amber-50 text-amber-700 ring-amber-200",
//   blue: "bg-blue-50 text-blue-700 ring-blue-200",
//   red: "bg-red-50 text-red-600 ring-red-200",
//   grey: "bg-[var(--off-white-background)] text-[color:var(--secondary-text)] ring-[color:var(--border-color)]",
// };
// const verifyTones = { Verified: tones.green, Pending: tones.amber, Rejected: tones.red };

// const card = "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm";
// const btn =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
// const reviewBtn =
//   "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";
// // const docBtn = `inline-flex items-center gap-1.5 ${btn}`;
// const cell = "px-4 py-4 text-[color:var(--primary-text)]";
// const inputClass =
//   "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";

// const Badge = ({ tone, children }) => (
//   <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ring-1 ${tone}`}>{children}</span>
// );

// const StatusBadge = ({ active }) => <Badge tone={active ? tones.green : tones.red}>{active ? "Active" : "Inactive"}</Badge>;

// // Table ke neeche: records + page (abhi 1 page)
// const TableFooter = ({ text }) => (
//   <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
//     <span>{text}</span>
//     <div className="flex items-center gap-3">
//       <button type="button" aria-label="Previous page"><ChevronLeft size={16} /></button>
//       <span>Page 1 / 1</span>
//       <button type="button" aria-label="Next page"><ChevronRight size={16} /></button>
//     </div>
//   </div>
// );

// const THead = ({ headings }) => (
//   <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
//     <tr>
//       {headings.map((h) => (
//         <th key={h} className="px-4 py-3 font-medium">
//           <span className="inline-flex items-center gap-1">
//             {h}
//             {h === "Name" && <ArrowUpDown size={12} />}
//           </span>
//         </th>
//       ))}
//     </tr>
//   </thead>
// );

// /* ============================================================
//    TABLES + GRIDS (components)
//    ============================================================ */

// // Users ka main table (sab tabs). View / Edit sab ke liye, baqi buttons shart ke saath
// const UsersTable = ({ tab, items, onView, onEdit, onToggle, onReview }) => (
//   <div className="overflow-x-auto">
//     <table className={`w-full text-left text-sm ${tab.minWidth}`}>
//       <THead headings={tab.headings} />
//       <tbody>
//         {items.map((item) => {
//           // Supplier sirf Verified ho to Activate/Deactivate, Pending ho to Review
//           const canToggle = !item.verification || item.verification === "Verified";
//           const canReview = item.verification === "Pending";

//           return (
//             <tr key={item.id} className="border-t border-[color:var(--border-color)]">
//               {tab.columns.map((c) => (
//                 <td key={c.key} className={c.type ? "px-4 py-4" : cell}>
//                   {c.type === "status" && <StatusBadge active={item.active} />}
//                   {c.type === "grey" && <Badge tone={tones.grey}>{item[c.key]}</Badge>}
//                   {c.type === "verify" && <Badge tone={verifyTones[item[c.key]]}>{item[c.key]}</Badge>}
//                   {!c.type && item[c.key]}
//                 </td>
//               ))}
//               <td className="px-4 py-4">
//                 <div className="flex gap-2">
//                   <button type="button" onClick={() => onView(item.id)} className={btn}>View</button>
//                   <button type="button" onClick={() => onEdit(item)} className={btn}>Edit</button>
//                   {canToggle && (
//                     <button type="button" onClick={() => onToggle(item.id)} className={btn}>
//                       {item.active ? "Deactivate" : "Activate"}
//                     </button>
//                   )}
//                   {canReview && (
//                     <button type="button" onClick={() => onReview(item.name)} className={reviewBtn}>Review</button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// );

// // Detail screen ke tables (orders, deliveries, jobs). rows: har row cells ki list; cell = text ya { text, tone }
// const DataTable = ({ headings, rows, minWidth }) => (
//   <div className="overflow-x-auto">
//     <table className={`w-full text-left text-sm ${minWidth}`}>
//       <THead headings={headings} />
//       <tbody>
//         {rows.map((row, r) => (
//           <tr key={r} className="border-t border-[color:var(--border-color)]">
//             {row.map((c, i) => (
//               <td key={i} className="px-4 py-3.5 text-[color:var(--primary-text)]">
//                 {typeof c === "object" ? <Badge tone={tones[c.tone]}>{c.text}</Badge> : c}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// // Label + value ka grid
// const InfoGrid = ({ info }) => (
//   <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
//     {info.map((item) => (
//       <div key={item.label}>
//         <p className="text-xs text-[color:var(--secondary-text)]">{item.label}</p>
//         <p className="mt-1 text-sm text-[color:var(--primary-text)]">{item.value}</p>
//       </div>
//     ))}
//   </div>
// );

// /* ============================================================
//    PAGE: User Management
//    ============================================================ */

// const UsersPage = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [detail, setDetail] = useState(null); // { tab, id } : khuli hui detail screen
//   const [orderSearch, setOrderSearch] = useState(""); // supplier detail ke orders ka search

//   // Add / Edit popup
//   const [editing, setEditing] = useState(null); // { tab, id } (id null = naya sub-admin)
//   const [form, setForm] = useState({});
//   const [formStatus, setFormStatus] = useState("Active");
//   const [picked, setPicked] = useState({}); // sub-admin ke modules

//   const tab = tabConfig[tabIndex];

//   /* ---------- Handlers ---------- */

//   const handleTab = (i) => {
//     setTabIndex(i);
//     setSearch("");
//     setStatus("All");
//   };

//   const handleView = (id) => {
//     setOrderSearch("");
//     setDetail({ tab: tab.key, id });
//   };

//   // Active <-> Inactive
//   const handleToggle = (id) => {
//     setUsers({ ...users, [tab.key]: users[tab.key].map((u) => (u.id === id ? { ...u, active: !u.active } : u)) });
//   };

//   const handleReview = (name) => console.log("Review", name);

//   // Edit: us item ki values form mein bharo
//   const handleOpenEdit = (item) => {
//     setForm(tab.formFields.reduce((all, f) => ({ ...all, [f.key]: item[f.key] || "" }), {}));
//     setFormStatus(item.active ? "Active" : "Inactive");
//     setPicked((item.modules || []).reduce((all, m) => ({ ...all, [m]: true }), {}));
//     setEditing({ tab: tab.key, id: item.id });
//   };

//   // Add Sub-Admin: khali form
//   const handleOpenAdd = () => {
//     setForm({ name: "", email: "", phone: "", password: "1234" });
//     setFormStatus("Active");
//     setPicked({});
//     setEditing({ tab: "subAdmins", id: null });
//   };

//   const handleSave = () => {
//     if (form.name.trim() === "") return;
//     const active = formStatus === "Active";
//     const modules = moduleList.reduce((all, m) => (picked[m] ? [...all, m] : all), []);
//     const { password, ...values } = form; // password abhi save nahi hota (frontend demo)

//     if (editing.id === null) {
//       const next = { id: Date.now(), ...values, active, city: "-", registered: new Date().toISOString().slice(0, 10), modules };
//       setUsers({ ...users, subAdmins: [...users.subAdmins, next] });
//     } else {
//       setUsers({
//         ...users,
//         [editing.tab]: users[editing.tab].map((u) =>
//           u.id === editing.id ? { ...u, ...values, active, ...(editing.tab === "subAdmins" ? { modules } : {}) } : u
//         ),
//       });
//     }
//     setEditing(null);
//   };

//   /* ---------- Data ---------- */

//   // Search + dropdown dono se rows chuno
//   const list = users[tab.key].reduce((all, u) => {
//     const text = `${u.name} ${u.email} ${u.phone} ${u.shop || ""} ${u.vehicleType || ""} ${u.skill || ""}`.toLowerCase();
//     const matchSearch = text.includes(search.toLowerCase());
//     const matchStatus =
//       status === "All" || (tab.key === "suppliers" ? u.verification === status : (status === "Active") === u.active);
//     return matchSearch && matchStatus ? [...all, u] : all;
//   }, []);

//   // Detail wali cheez (hamesha taaza data)
//   const detailTab = detail ? tabConfig.find((t) => t.key === detail.tab) : null;
//   const detailItem = detail ? users[detail.tab].find((u) => u.id === detail.id) : null;

//   // Supplier ke orders: search ke hisab se
//   const supplierOrders = detailItem && detail.tab === "suppliers"
//     ? detailItem.orders.reduce((all, o) => {
//         const text = `${o.id} ${o.customer} ${o.material} ${o.date} ${o.amount} ${o.pay} ${o.status}`.toLowerCase();
//         return text.includes(orderSearch.toLowerCase()) ? [...all, o] : all;
//       }, [])
//     : [];

//   const editTab = editing ? tabConfig.find((t) => t.key === editing.tab) : null;

//   /* ---------- Detail screen ---------- */

//   const detailScreen = detailItem && (
//     <section className="p-4 sm:p-6 lg:p-8">
//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
//           {detail.tab === "suppliers" ? detailItem.shop : detailItem.name}
//         </h1>
//         <button
//           type="button"
//           onClick={() => setDetail(null)}
//           className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
//         >
//           <ArrowLeft size={16} />
//           {detailTab.back}
//         </button>
//       </div>

//       <div className="mt-4 flex gap-2">
//         {detail.tab === "suppliers" && <Badge tone={verifyTones[detailItem.verification]}>{detailItem.verification}</Badge>}
//         <StatusBadge active={detailItem.active} />
//       </div>

//       <InfoGrid info={detailTab.info.map((i) => ({ label: i.label, value: detailItem[i.key] || "-" }))} />

//       {/* Customer: orders */}
//       {detail.tab === "customers" && (
//         <>
//           <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Orders</h2>
//           <div className={`mt-4 ${card}`}>
//             <DataTable
//               headings={orderHeadings}
//               minWidth="min-w-[900px]"
//               rows={detailItem.orders.map((o) => [o.id, detailItem.name, o.material, o.date, o.amount, { text: o.pay, tone: o.payTone }, { text: o.status, tone: o.statusTone }])}
//             />
//             <TableFooter text={`${detailItem.orders.length} records`} />
//           </div>
//         </>
//       )}

//       {/* Supplier: documents, orders, listings */}
//       {detail.tab === "suppliers" && (
//         <>
//           <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Uploaded Documents</h2>
//           <div className="mt-3 flex flex-col gap-3">
//             {documents.map((doc) => (
//               <div key={doc} className="flex flex-wrap items-center justify-between gap-3">
//                 <span className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
//                   <FileText size={16} className="text-[color:var(--secondary-text)]" />
//                   {doc}
//                 </span>
//                 <div className="flex gap-2">
//                   <a href={`/documents/${doc}`} target="_blank" rel="noreferrer" className={docBtn}><Eye size={14} /> Preview</a>
//                   <a href={`/documents/${doc}`} download className={docBtn}><Download size={14} /> Download</a>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">All Supplier Orders</h2>
//           <div className={`mt-4 ${card}`}>
//             <div className="p-3">
//               <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
//                 <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
//                 <input
//                   type="text"
//                   value={orderSearch}
//                   onChange={(e) => setOrderSearch(e.target.value)}
//                   placeholder="Search..."
//                   aria-label="Search orders"
//                   className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//                 />
//               </div>
//             </div>
//             <DataTable
//               headings={orderHeadings}
//               minWidth="min-w-[900px]"
//               rows={supplierOrders.map((o) => [o.id, o.customer, o.material, o.date, o.amount, { text: o.pay, tone: o.payTone }, { text: o.status, tone: o.statusTone }])}
//             />
//             <TableFooter text={`${supplierOrders.length} records`} />
//           </div>

//           <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">Listings</h2>
//           <ul className="mt-3 flex flex-col gap-2 text-sm text-[color:var(--primary-text)]">
//             {detailItem.listings.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* Rider: deliveries */}
//       {detail.tab === "riders" && (
//         <>
//           <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Deliveries</h2>
//           <div className={`mt-4 ${card}`}>
//             <DataTable
//               headings={deliveryHeadings}
//               minWidth="min-w-[700px]"
//               rows={detailItem.deliveries.map((d) => [d.id, d.material, d.date, d.amount, { text: d.status, tone: d.tone }])}
//             />
//             <TableFooter text={`${detailItem.deliveries.length} records`} />
//           </div>
//         </>
//       )}

//       {/* Labour: jobs */}
//       {detail.tab === "labour" && (
//         <>
//           <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">Jobs</h2>
//           <div className={`mt-4 ${card}`}>
//             <DataTable
//               headings={jobHeadings}
//               minWidth="min-w-[760px]"
//               rows={detailItem.jobs.map((j) => [j.id, j.customer, j.work, j.date, j.amount, { text: j.status, tone: j.tone }])}
//             />
//             <TableFooter text={`${detailItem.jobs.length} records`} />
//           </div>
//         </>
//       )}

//       {/* Sub-admin: modules */}
//       {detail.tab === "subAdmins" && (
//         <p className="mt-6 text-[color:var(--primary-text)]">Permitted modules: {detailItem.modules.join(", ")}</p>
//       )}
//     </section>
//   );

//   /* ---------- Page ---------- */

//   return (
//     <>
//       {/* Detail screen khuli ho to list sirf chhupti hai (hidden), isliye wapas aane par sab waisa hi milta hai */}
//       {detailScreen}

//       <section className={`p-4 sm:p-6 lg:p-8 ${detail ? "hidden" : ""}`}>
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">User Management</h1>

//           {/* Sirf Sub-Admins tab par */}
//           {tab.key === "subAdmins" && (
//             <button
//               type="button"
//               onClick={handleOpenAdd}
//               className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//             >
//               <Plus size={16} />
//               Add Sub-Admin
//             </button>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="mt-5 overflow-x-auto">
//           <div className="inline-flex gap-1 rounded-lg bg-[var(--border-color)]/50 p-1">
//             {tabConfig.map((t, i) => (
//               <button
//                 key={t.key}
//                 type="button"
//                 onClick={() => handleTab(i)}
//                 className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors sm:px-4 ${
//                   tabIndex === i
//                     ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
//                     : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//                 }`}
//               >
//                 {t.label} ({users[t.key].length})
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search + dropdown */}
//         <div className={`mt-5 ${card}`}>
//           <div className="flex flex-col gap-3 p-3 sm:flex-row">
//             <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
//               <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search..."
//                 aria-label="Search"
//                 className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//               />
//             </div>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               aria-label="Status"
//               className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
//             >
//               {tab.options.map((o) => (
//                 <option key={o}>{o}</option>
//               ))}
//             </select>
//           </div>

//           <UsersTable tab={tab} items={list} onView={handleView} onEdit={handleOpenEdit} onToggle={handleToggle} onReview={handleReview} />
//           <TableFooter text={`${list.length} ${list.length === 1 ? "record" : "records"}`} />
//         </div>
//       </section>

//       {/* ---------- Add / Edit popup (form isi page mein) ---------- */}
//       {editing && (
//         <div onClick={() => setEditing(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
//           <div onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6">
//             <button
//               type="button"
//               onClick={() => setEditing(null)}
//               aria-label="Close"
//               className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
//               {editing.id === null ? "Add Sub-Admin" : `Edit ${editTab.singular}`}
//             </h2>

//             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//               {editTab.formFields.map((f) => (
//                 <label key={f.key} htmlFor={`bmUser-${f.key}`} className={`text-xs text-[color:var(--secondary-text)] ${f.wide ? "sm:col-span-2" : ""}`}>
//                   {f.label}
//                   <input
//                     id={`bmUser-${f.key}`}
//                     type="text"
//                     value={form[f.key]}
//                     onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
//                     className={inputClass}
//                   />
//                 </label>
//               ))}

//               {/* Password sirf naya sub-admin banate waqt */}
//               {editing.id === null && (
//                 <label htmlFor="bmUser-password" className="text-xs text-[color:var(--secondary-text)]">
//                   Password
//                   <input
//                     id="bmUser-password"
//                     type="text"
//                     value={form.password}
//                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                     className={inputClass}
//                   />
//                 </label>
//               )}

//               <label htmlFor="bmUser-status" className="text-xs text-[color:var(--secondary-text)]">
//                 Account Status
//                 <select id="bmUser-status" value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className={inputClass}>
//                   <option>Active</option>
//                   <option>Inactive</option>
//                 </select>
//               </label>
//             </div>

//             {editing.id === null && (
//               <p className="mt-3 text-xs text-[color:var(--secondary-text)]">
//                 Ask this sub-admin to reset their password after their first login.
//               </p>
//             )}

//             {/* Permitted modules: sirf sub-admin ke liye */}
//             {editing.tab === "subAdmins" && (
//               <>
//                 <h3 className="mt-5 text-sm text-[color:var(--primary-text)]">Permitted modules</h3>
//                 <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
//                   {moduleList.map((m) => (
//                     <label key={m} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
//                       <input
//                         type="checkbox"
//                         checked={!!picked[m]}
//                         onChange={() => setPicked({ ...picked, [m]: !picked[m] })}
//                         className="h-4 w-4 accent-[var(--primary-yellow)]"
//                       />
//                       {m}
//                     </label>
//                   ))}
//                 </div>
//               </>
//             )}

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setEditing(null)}
//                 className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 disabled={form.name === undefined || form.name.trim() === ""}
//                 onClick={handleSave}
//                 className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UsersPage;






"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  X,
} from "lucide-react";

/* ============================================================
   DATASETS
   ============================================================ */

const initialUsers = {
  customers: [
    {
      id: 1,
      name: "Ahmed Raza",
      email: "ahmed@mail.pk",
      phone: "0300-1112233",
      profile: "Complete",
      active: false,
      city: "Lahore",
      registered: "2026-08-19",
      orders: [
        {
          id: "ORD-1001",
          material: "DG Khan Cement OPC",
          date: "2026-09-28",
          amount: "Rs 67,500",
          pay: "Paid",
          payTone: "green",
          status: "Delivered",
          statusTone: "green",
        },
        {
          id: "ORD-1005",
          material: "Leftover Porcelain Tiles",
          date: "2026-10-09",
          amount: "Rs 13,200",
          pay: "Refunded",
          payTone: "red",
          status: "Returned",
          statusTone: "red",
        },
      ],
    },
    {
      id: 2,
      name: "Sana Malik",
      email: "sana@mail.pk",
      phone: "0321-4455667",
      profile: "Complete",
      active: true,
      city: "Gujranwala",
      registered: "2026-08-22",
      orders: [
        {
          id: "ORD-1002",
          material: "Bricks Grade A",
          date: "2026-09-30",
          amount: "Rs 80,000",
          pay: "Paid",
          payTone: "green",
          status: "In Transit",
          statusTone: "green",
        },
      ],
    },
    {
      id: 3,
      name: "Bilal Khan",
      email: "bilal@mail.pk",
      phone: "0333-9988776",
      profile: "Complete",
      active: true,
      city: "Lahore",
      registered: "2026-09-01",
      orders: [
        {
          id: "ORD-1003",
          material: "Steel Rebar 12mm",
          date: "2026-10-02",
          amount: "Rs 45,000",
          pay: "Paid",
          payTone: "green",
          status: "Delivered",
          statusTone: "green",
        },
      ],
    },
    {
      id: 4,
      name: "Hira Javed",
      email: "hira@mail.pk",
      phone: "0345-1239876",
      profile: "Complete",
      active: false,
      city: "Islamabad",
      registered: "2026-09-05",
      orders: [
        {
          id: "ORD-1004",
          material: "Floor Tiles",
          date: "2026-10-04",
          amount: "Rs 22,000",
          pay: "Paid",
          payTone: "green",
          status: "Delivered",
          statusTone: "green",
        },
      ],
    },
    {
      id: 5,
      name: "Usman Tariq",
      email: "usman@mail.pk",
      phone: "0301-5566778",
      profile: "Complete",
      active: true,
      city: "Faisalabad",
      registered: "2026-09-12",
      orders: [
        {
          id: "ORD-1006",
          material: "Sand (Ravi)",
          date: "2026-10-10",
          amount: "Rs 18,500",
          pay: "Paid",
          payTone: "green",
          status: "Delivered",
          statusTone: "green",
        },
      ],
    },
  ],

  suppliers: [
    {
      id: 1,
      name: "Imran Sheikh",
      shop: "Sheikh Traders",
      email: "imran@sheikhtraders.pk",
      phone: "0300-7778899",
      verification: "Verified",
      active: false,
      city: "Lahore",
      registered: "2026-07-20",
      type: "Cement & Steel",
      address: "Shop 12, Ravi Road, Lahore",
      submitted: "2026-07-21",
      wallet: "Rs 18,500",
      orders: [
        {
          id: "ORD-1001",
          customer: "Ahmed Raza",
          material: "DG Khan Cement OPC",
          date: "2026-09-28",
          amount: "Rs 67,500",
          pay: "Paid",
          payTone: "green",
          status: "Delivered",
          statusTone: "green",
        },
        {
          id: "ORD-1003",
          customer: "Bilal Khan",
          material: "Grade 60 Steel Saria 12mm",
          date: "2026-10-16",
          amount: "Rs 106,000",
          pay: "Paid",
          payTone: "green",
          status: "Ready for Dispatch",
          statusTone: "blue",
        },
        {
          id: "ORD-1004",
          customer: "Usman Tariq",
          material: "Ravi Sand (Truck)",
          date: "2026-10-18",
          amount: "Rs 28,000",
          pay: "Pending",
          payTone: "amber",
          status: "Pending",
          statusTone: "amber",
        },
        {
          id: "ORD-1006",
          customer: "Sana Malik",
          material: "DG Khan Cement OPC",
          date: "2026-10-12",
          amount: "Rs 27,000",
          pay: "Pending",
          payTone: "amber",
          status: "Cancelled",
          statusTone: "red",
        },
      ],
      listings: [
        {
          id: 1,
          material: "DG Khan Cement OPC",
          category: "Cement",
          price: "Rs 1,350 / bag",
          stock: "In Stock",
        },
        {
          id: 2,
          material: "Grade 60 Steel Saria 12mm",
          category: "Steel / Saria",
          price: "Rs 265 / kg",
          stock: "In Stock",
        },
        {
          id: 3,
          material: "Weather Shield Paint 16L",
          category: "Paint",
          price: "Rs 9,800 / bucket",
          stock: "In Stock",
        },
        {
          id: 4,
          material: "Ravi Sand (Truck)",
          category: "Sand / Rait",
          price: "Rs 28,000 / truck",
          stock: "In Stock",
        },
      ],
    },
    {
      id: 2,
      name: "Farah Iqbal",
      shop: "Brick House",
      email: "farah@brickhouse.pk",
      phone: "0322-1212121",
      verification: "Verified",
      active: true,
      city: "Gujranwala",
      registered: "2026-07-25",
      type: "Bricks",
      address: "Shop 4, GT Road, Gujranwala",
      submitted: "2026-07-26",
      wallet: "Rs 9,200",
      orders: [
        {
          id: "ORD-1002",
          customer: "Sana Malik",
          material: "Bricks Grade A",
          date: "2026-09-30",
          amount: "Rs 80,000",
          pay: "Paid",
          payTone: "green",
          status: "Delivered",
          statusTone: "green",
        },
      ],
      listings: [
        {
          id: 1,
          material: "Bricks Grade A",
          category: "Bricks",
          price: "Rs 16 / brick",
          stock: "In Stock",
        },
        {
          id: 2,
          material: "Bricks Grade B",
          category: "Bricks",
          price: "Rs 14 / brick",
          stock: "In Stock",
        },
      ],
    },
    {
      id: 3,
      name: "Kamran Ali",
      shop: "Tile City",
      email: "kamran@tilecity.pk",
      phone: "0312-3434343",
      verification: "Pending",
      active: true,
      city: "Islamabad",
      registered: "2026-10-01",
      type: "Tiles",
      address: "Plot 7, Blue Area, Islamabad",
      submitted: "2026-10-02",
      wallet: "Rs 0",
      orders: [],
      listings: [],
    },
    {
      id: 4,
      name: "Nadia Hussain",
      shop: "PaintPro",
      email: "nadia@paintpro.pk",
      phone: "0336-5656565",
      verification: "Pending",
      active: true,
      city: "Faisalabad",
      registered: "2026-10-03",
      type: "Paints",
      address: "Shop 9, Kohinoor Road, Faisalabad",
      submitted: "2026-10-04",
      wallet: "Rs 0",
      orders: [],
      listings: [],
    },
    {
      id: 5,
      name: "Zahid Mehmood",
      shop: "Zahid Iron Works",
      email: "zahid@ironworks.pk",
      phone: "0344-7878787",
      verification: "Rejected",
      active: true,
      city: "Sialkot",
      registered: "2026-09-10",
      type: "Steel",
      address: "Unit 3, Industrial Area, Sialkot",
      submitted: "2026-09-11",
      wallet: "Rs 0",
      orders: [],
      listings: [],
    },
  ],

  riders: [
    {
      id: 1,
      name: "Hamza Transport",
      email: "hamza@transport.pk",
      phone: "0301-2223344",
      active: true,
      city: "Gujranwala",
      registered: "2026-09-15",
      vehicleType: "Shehzore",
      vehicleNo: "GRW-2026",
      capacity: "2,500 kg",
      wallet: "Rs 4,800",
      deliveries: [
        {
          id: "RD-103",
          material: "Steel Rebar",
          date: "2026-11-03",
          amount: "Rs 3,000",
          status: "Delivered",
          tone: "green",
        },
        {
          id: "RD-101",
          material: "Portland Cement",
          date: "2026-11-04",
          amount: "Rs 2,400",
          status: "In Transit",
          tone: "blue",
        },
      ],
    },
    {
      id: 2,
      name: "Asif Mehmood",
      email: "asif@mail.pk",
      phone: "0322-7788990",
      active: true,
      city: "Gujranwala",
      registered: "2026-09-20",
      vehicleType: "Mazda Truck",
      vehicleNo: "LEB-4521",
      capacity: "4,000 kg",
      wallet: "Rs 1,200",
      deliveries: [
        {
          id: "RD-102",
          material: "Red Bricks",
          date: "2026-11-02",
          amount: "Rs 3,200",
          status: "Delivered",
          tone: "green",
        },
      ],
    },
    {
      id: 3,
      name: "Waqas Ahmed",
      email: "waqas@mail.pk",
      phone: "0333-1100220",
      active: false,
      city: "Sialkot",
      registered: "2026-10-05",
      vehicleType: "Suzuki Pickup",
      vehicleNo: "SKT-1188",
      capacity: "800 kg",
      wallet: "Rs 0",
      deliveries: [],
    },
  ],

  labour: [
    {
      id: 1,
      name: "Shahid Ali",
      email: "shahid@mail.pk",
      phone: "0300-9090909",
      active: true,
      city: "Gujranwala",
      registered: "2026-09-02",
      skill: "Mason",
      experience: "8 years",
      rate: "Rs 2,500 / day",
      availability: "Available",
      jobs: [
        {
          id: "JOB-11",
          customer: "Ahmed Raza",
          work: "Boundary wall",
          date: "2026-10-20",
          amount: "Rs 15,000",
          status: "Completed",
          tone: "green",
        },
        {
          id: "JOB-14",
          customer: "Sana Malik",
          work: "Room plaster",
          date: "2026-11-01",
          amount: "Rs 7,500",
          status: "In Progress",
          tone: "blue",
        },
      ],
    },
    {
      id: 2,
      name: "Rafiq Ahmed",
      email: "rafiq@mail.pk",
      phone: "0312-5566778",
      active: true,
      city: "Lahore",
      registered: "2026-09-18",
      skill: "Electrician",
      experience: "5 years",
      rate: "Rs 2,000 / day",
      availability: "Busy",
      jobs: [
        {
          id: "JOB-12",
          customer: "Bilal Khan",
          work: "House wiring",
          date: "2026-10-25",
          amount: "Rs 12,000",
          status: "Completed",
          tone: "green",
        },
      ],
    },
    {
      id: 3,
      name: "Tariq Hussain",
      email: "tariq@mail.pk",
      phone: "0345-4433221",
      active: false,
      city: "Gujranwala",
      registered: "2026-10-10",
      skill: "Plumber",
      experience: "3 years",
      rate: "Rs 1,800 / day",
      availability: "Available",
      jobs: [],
    },
  ],

  subAdmins: [
    {
      id: 1,
      name: "Maria Saeed",
      email: "maria@buildmart.pk",
      phone: "0300-0000002",
      active: true,
      city: "Lahore",
      registered: "2026-09-18",
      modules: [
        "Material Management",
        "Material Categories",
        "Blogs",
        "Reviews & Ratings",
      ],
    },
  ],
};

/* ============================================================
   TAB SETTINGS
   ============================================================ */

const activeOptions = ["All", "Active", "Inactive"];

const tabConfig = [
  {
    key: "customers",
    label: "Customers",
    singular: "Customer",
    back: "Back to Customers",
    minWidth: "min-w-[820px]",
    options: activeOptions,
    headings: [
      "Name",
      "Email",
      "Phone",
      "Profile Status",
      "Account Status",
      "Actions",
    ],
    columns: [
      { key: "name" },
      { key: "email" },
      { key: "phone" },
      { key: "profile", type: "grey" },
      { key: "active", type: "status" },
    ],
    formFields: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
    ],
    info: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "City", key: "city" },
      { label: "Registered", key: "registered" },
    ],
  },
  {
    key: "suppliers",
    label: "Suppliers",
    singular: "Supplier",
    back: "Back to Suppliers",
    minWidth: "min-w-[980px]",
    options: ["All", "Verified", "Pending", "Rejected"],
    headings: [
      "Name",
      "Shop Name",
      "Email",
      "Phone",
      "Verification Status",
      "Account Status",
      "Actions",
    ],
    columns: [
      { key: "name" },
      { key: "shop" },
      { key: "email" },
      { key: "phone" },
      { key: "verification", type: "verify" },
      { key: "active", type: "status" },
    ],
    formFields: [
      { key: "name", label: "Name" },
      { key: "shop", label: "Shop Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      { key: "type", label: "Business Type" },
      { key: "address", label: "Address", wide: true },
    ],
    info: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "City", key: "city" },
      { label: "Registered", key: "registered" },
      { label: "Shop Name", key: "shop" },
      { label: "Business Type", key: "type" },
      { label: "Address", key: "address" },
      { label: "Submitted", key: "submitted" },
      { label: "Wallet Balance", key: "wallet" },
    ],
  },
  {
    key: "riders",
    label: "Riders",
    singular: "Rider",
    back: "Back to Riders",
    minWidth: "min-w-[900px]",
    options: activeOptions,
    headings: [
      "Name",
      "Email",
      "Phone",
      "Vehicle",
      "Account Status",
      "Actions",
    ],
    columns: [
      { key: "name" },
      { key: "email" },
      { key: "phone" },
      { key: "vehicleType", type: "grey" },
      { key: "active", type: "status" },
    ],
    formFields: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      { key: "vehicleType", label: "Vehicle Type" },
      { key: "vehicleNo", label: "Vehicle Number" },
      { key: "capacity", label: "Capacity" },
    ],
    info: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "City", key: "city" },
      { label: "Registered", key: "registered" },
      { label: "Vehicle Type", key: "vehicleType" },
      { label: "Vehicle Number", key: "vehicleNo" },
      { label: "Capacity", key: "capacity" },
      { label: "Wallet Balance", key: "wallet" },
    ],
  },
  {
    key: "labour",
    label: "Labour",
    singular: "Labour",
    back: "Back to Labour",
    minWidth: "min-w-[900px]",
    options: activeOptions,
    headings: [
      "Name",
      "Email",
      "Phone",
      "Skill",
      "Account Status",
      "Actions",
    ],
    columns: [
      { key: "name" },
      { key: "email" },
      { key: "phone" },
      { key: "skill", type: "grey" },
      { key: "active", type: "status" },
    ],
    formFields: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      { key: "skill", label: "Skill" },
      { key: "experience", label: "Experience" },
      { key: "rate", label: "Daily Rate" },
    ],
    info: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "City", key: "city" },
      { label: "Registered", key: "registered" },
      { label: "Skill", key: "skill" },
      { label: "Experience", key: "experience" },
      { label: "Daily Rate", key: "rate" },
      { label: "Availability", key: "availability" },
    ],
  },
  {
    key: "subAdmins",
    label: "Sub-Admins",
    singular: "Sub-Admin",
    back: "Back to Sub-Admins",
    minWidth: "min-w-[720px]",
    options: activeOptions,
    headings: [
      "Name",
      "Email",
      "Phone",
      "Account Status",
      "Actions",
    ],
    columns: [
      { key: "name" },
      { key: "email" },
      { key: "phone" },
      { key: "active", type: "status" },
    ],
    formFields: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
    info: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "City", key: "city" },
      { label: "Registered", key: "registered" },
    ],
  },
];

const orderHeadings = [
  "Order ID",
  "Customer",
  "Material",
  "Order Date",
  "Total Amount",
  "Payment Status",
  "Order Status",
];

const deliveryHeadings = [
  "Delivery ID",
  "Material",
  "Date",
  "Amount",
  "Status",
];

const jobHeadings = [
  "Job ID",
  "Customer",
  "Work",
  "Date",
  "Amount",
  "Status",
];

const listingHeadings = [
  "Material",
  "Category",
  "Price",
  "Availability",
];

const moduleList = ["Moderater", "Super Admin"];

/* ============================================================
   SHARED STYLES + SMALL PIECES
   ============================================================ */

const tones = {
  green: "bg-green-50 text-green-700 ring-green-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  red: "bg-red-50 text-red-600 ring-red-200",
  grey:
    "bg-[var(--off-white-background)] text-[color:var(--secondary-text)] ring-[color:var(--border-color)]",
};

const verifyTones = {
  Verified: tones.green,
  Pending: tones.amber,
  Rejected: tones.red,
};

const card =
  "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm";

const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

const reviewBtn =
  "rounded-md bg-[var(--primary-yellow)] px-3 py-1.5 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]";

const cell = "px-4 py-4 text-[color:var(--primary-text)]";

const inputClass =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[color:var(--primary-yellow)]";

const Badge = ({ tone, children }) => (
  <span
    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ring-1 ${tone}`}
  >
    {children}
  </span>
);

const StatusBadge = ({ active }) => (
  <Badge tone={active ? tones.green : tones.red}>
    {active ? "Active" : "Inactive"}
  </Badge>
);

// Table footer
const TableFooter = ({ text }) => (
  <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
    <span>{text}</span>

    <div className="flex items-center gap-3">
      <button type="button" aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>

      <span>Page 1 / 1</span>

      <button type="button" aria-label="Next page">
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const THead = ({ headings }) => (
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
);

/* ============================================================
   TABLES
   ============================================================ */

// Users main table
const UsersTable = ({
  tab,
  items,
  onView,
  onEdit,
  onToggle,
  onReview,
}) => (
  <div className="overflow-x-auto">
    <table className={`w-full text-left text-sm ${tab.minWidth}`}>
      <THead headings={tab.headings} />

      <tbody>
        {items.map((item) => {
          const canToggle =
            !item.verification || item.verification === "Verified";

          const canReview = item.verification === "Pending";

          return (
            <tr
              key={item.id}
              className="border-t border-[color:var(--border-color)]"
            >
              {tab.columns.map((c) => (
                <td
                  key={c.key}
                  className={c.type ? "px-4 py-4" : cell}
                >
                  {c.type === "status" && (
                    <StatusBadge active={item.active} />
                  )}

                  {c.type === "grey" && (
                    <Badge tone={tones.grey}>{item[c.key]}</Badge>
                  )}

                  {c.type === "verify" && (
                    <Badge tone={verifyTones[item[c.key]]}>
                      {item[c.key]}
                    </Badge>
                  )}

                  {!c.type && item[c.key]}
                </td>
              ))}

              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onView(item.id)}
                    className={btn}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className={btn}
                  >
                    Edit
                  </button>

                  {canToggle && (
                    <button
                      type="button"
                      onClick={() => onToggle(item.id)}
                      className={btn}
                    >
                      {item.active ? "Deactivate" : "Activate"}
                    </button>
                  )}

                  {canReview && (
                    <button
                      type="button"
                      onClick={() => onReview(item.name)}
                      className={reviewBtn}
                    >
                      Review
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Detail screen tables
const DataTable = ({ headings, rows, minWidth }) => (
  <div className="overflow-x-auto">
    <table className={`w-full text-left text-sm ${minWidth}`}>
      <THead headings={headings} />

      <tbody>
        {rows.map((row, r) => (
          <tr
            key={r}
            className="border-t border-[color:var(--border-color)]"
          >
            {row.map((c, i) => (
              <td
                key={i}
                className="px-4 py-3.5 text-[color:var(--primary-text)]"
              >
                {typeof c === "object" && c !== null ? (
                  <Badge tone={tones[c.tone]}>
                    {c.text}
                  </Badge>
                ) : (
                  c
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Label + value grid
const InfoGrid = ({ info }) => (
  <div className="mt-5 grid grid-cols-1 gap-5 border-y border-[color:var(--border-color)] py-6 sm:grid-cols-2 lg:grid-cols-3">
    {info.map((item) => (
      <div key={item.label}>
        <p className="text-xs text-[color:var(--secondary-text)]">
          {item.label}
        </p>

        <p className="mt-1 text-sm text-[color:var(--primary-text)]">
          {item.value}
        </p>
      </div>
    ))}
  </div>
);

/* ============================================================
   PAGE: USER MANAGEMENT
   ============================================================ */

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [detail, setDetail] = useState(null);
  const [orderSearch, setOrderSearch] = useState("");

  // Add / Edit popup
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [formStatus, setFormStatus] = useState("Active");
  const [picked, setPicked] = useState({});

  const tab = tabConfig[tabIndex];

  /* ---------- HANDLERS ---------- */

  const handleTab = (i) => {
    setTabIndex(i);
    setSearch("");
    setStatus("All");
  };

  const handleView = (id) => {
    setOrderSearch("");
    setDetail({ tab: tab.key, id });
  };

  // Active <-> Inactive
  const handleToggle = (id) => {
    setUsers({
      ...users,
      [tab.key]: users[tab.key].map((u) =>
        u.id === id ? { ...u, active: !u.active } : u
      ),
    });
  };

  const handleReview = (name) => console.log("Review", name);

  // Edit existing user
  const handleOpenEdit = (item) => {
    setForm(
      tab.formFields.reduce(
        (all, f) => ({
          ...all,
          [f.key]: item[f.key] || "",
        }),
        {}
      )
    );

    setFormStatus(item.active ? "Active" : "Inactive");

    setPicked(
      (item.modules || []).reduce(
        (all, m) => ({
          ...all,
          [m]: true,
        }),
        {}
      )
    );

    setEditing({ tab: tab.key, id: item.id });
  };

  // Add Sub-Admin
  const handleOpenAdd = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "1234",
    });

    setFormStatus("Active");
    setPicked({});
    setEditing({ tab: "subAdmins", id: null });
  };

  const handleSave = () => {
    if (form.name.trim() === "") return;

    const active = formStatus === "Active";

    const modules = moduleList.reduce(
      (all, m) => (picked[m] ? [...all, m] : all),
      []
    );

    const { password, ...values } = form;

    if (editing.id === null) {
      const next = {
        id: Date.now(),
        ...values,
        active,
        city: "-",
        registered: new Date().toISOString().slice(0, 10),
        modules,
      };

      setUsers({
        ...users,
        subAdmins: [...users.subAdmins, next],
      });
    } else {
      setUsers({
        ...users,
        [editing.tab]: users[editing.tab].map((u) =>
          u.id === editing.id
            ? {
                ...u,
                ...values,
                active,
                ...(editing.tab === "subAdmins" ? { modules } : {}),
              }
            : u
        ),
      });
    }

    setEditing(null);
  };

  /* ---------- DATA ---------- */

  // Search + status filter
  const list = users[tab.key].reduce((all, u) => {
    const text =
      `${u.name} ${u.email} ${u.phone} ${u.shop || ""} ${u.vehicleType || ""} ${u.skill || ""}`.toLowerCase();

    const matchSearch = text.includes(search.toLowerCase());

    const matchStatus =
      status === "All" ||
      (tab.key === "suppliers"
        ? u.verification === status
        : (status === "Active") === u.active);

    return matchSearch && matchStatus ? [...all, u] : all;
  }, []);

  // Detail data
  const detailTab = detail
    ? tabConfig.find((t) => t.key === detail.tab)
    : null;

  const detailItem = detail
    ? users[detail.tab].find((u) => u.id === detail.id)
    : null;

  // Supplier orders search
  const supplierOrders =
    detailItem && detail.tab === "suppliers"
      ? (detailItem.orders || []).reduce((all, o) => {
          const text =
            `${o.id} ${o.customer} ${o.material} ${o.date} ${o.amount} ${o.pay} ${o.status}`.toLowerCase();

          return text.includes(orderSearch.toLowerCase())
            ? [...all, o]
            : all;
        }, [])
      : [];

  const editTab = editing
    ? tabConfig.find((t) => t.key === editing.tab)
    : null;

  /* ---------- DETAIL SCREEN ---------- */

  const detailScreen = detailItem && (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
          {detail.tab === "suppliers"
            ? detailItem.shop
            : detailItem.name}
        </h1>

        <button
          type="button"
          onClick={() => setDetail(null)}
          className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]"
        >
          <ArrowLeft size={16} />
          {detailTab.back}
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        {detail.tab === "suppliers" && (
          <Badge tone={verifyTones[detailItem.verification]}>
            {detailItem.verification}
          </Badge>
        )}

        <StatusBadge active={detailItem.active} />
      </div>

      <InfoGrid
        info={detailTab.info.map((i) => ({
          label: i.label,
          value: detailItem[i.key] || "-",
        }))}
      />

      {/* Customer: Orders */}
      {detail.tab === "customers" && (
        <>
          <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">
            Orders
          </h2>

          <div className={`mt-4 ${card}`}>
            <DataTable
              headings={orderHeadings}
              minWidth="min-w-[900px]"
              rows={(detailItem.orders || []).map((o) => [
                o.id,
                detailItem.name,
                o.material,
                o.date,
                o.amount,
                { text: o.pay, tone: o.payTone },
                { text: o.status, tone: o.statusTone },
              ])}
            />

            <TableFooter
              text={`${(detailItem.orders || []).length} records`}
            />
          </div>
        </>
      )}

      {/* Supplier: Orders and Listings */}
      {detail.tab === "suppliers" && (
        <>
          {/* All Supplier Orders */}
          <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">
            All Supplier Orders
          </h2>

          <div className={`mt-4 ${card}`}>
            <div className="p-3">
              <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
                <Search
                  size={16}
                  className="shrink-0 text-[color:var(--secondary-text)]"
                />

                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search..."
                  aria-label="Search orders"
                  className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
                />
              </div>
            </div>

            <DataTable
              headings={orderHeadings}
              minWidth="min-w-[900px]"
              rows={supplierOrders.map((o) => [
                o.id,
                o.customer,
                o.material,
                o.date,
                o.amount,
                { text: o.pay, tone: o.payTone },
                { text: o.status, tone: o.statusTone },
              ])}
            />

            <TableFooter
              text={`${supplierOrders.length} records`}
            />
          </div>

          {/* Listings Table */}
          <h2 className="mt-8 text-lg text-[color:var(--primary-text)]">
            Listings
          </h2>

          <div className={`mt-4 ${card}`}>
            <DataTable
              headings={listingHeadings}
              minWidth="min-w-[700px]"
              rows={(detailItem.listings || []).map((item) => [
                item.material,
                item.category,
                item.price,
                {
                  text: item.stock,
                  tone: item.stock === "In Stock" ? "green" : "red",
                },
              ])}
            />

            <TableFooter
              text={`${(detailItem.listings || []).length} records`}
            />
          </div>
        </>
      )}

      {/* Rider: Deliveries */}
      {detail.tab === "riders" && (
        <>
          <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">
            Deliveries
          </h2>

          <div className={`mt-4 ${card}`}>
            <DataTable
              headings={deliveryHeadings}
              minWidth="min-w-[700px]"
              rows={detailItem.deliveries.map((d) => [
                d.id,
                d.material,
                d.date,
                d.amount,
                { text: d.status, tone: d.tone },
              ])}
            />

            <TableFooter
              text={`${detailItem.deliveries.length} records`}
            />
          </div>
        </>
      )}

      {/* Labour: Jobs */}
      {detail.tab === "labour" && (
        <>
          <h2 className="mt-6 text-lg text-[color:var(--primary-text)]">
            Jobs
          </h2>

          <div className={`mt-4 ${card}`}>
            <DataTable
              headings={jobHeadings}
              minWidth="min-w-[760px]"
              rows={detailItem.jobs.map((j) => [
                j.id,
                j.customer,
                j.work,
                j.date,
                j.amount,
                { text: j.status, tone: j.tone },
              ])}
            />

            <TableFooter
              text={`${detailItem.jobs.length} records`}
            />
          </div>
        </>
      )}

      {/* Sub-admin: Modules */}
      {detail.tab === "subAdmins" && (
        <p className="mt-6 text-[color:var(--primary-text)]">
          Permitted modules: {detailItem.modules.join(", ")}
        </p>
      )}
    </section>
  );

  /* ---------- PAGE ---------- */

  return (
    <>
      {/* Detail screen */}
      {detailScreen}

      <section className={`p-4 sm:p-6 lg:p-8 ${detail ? "hidden" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
            User Management
          </h1>

          {/* Add Sub-Admin button */}
          {tab.key === "subAdmins" && (
            <button
              type="button"
              onClick={handleOpenAdd}
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
            {tabConfig.map((t, i) => (
              <button
                key={t.key}
                type="button"
                onClick={() => handleTab(i)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors sm:px-4 ${
                  tabIndex === i
                    ? "bg-[var(--white-cards)] text-[color:var(--primary-text)] shadow-sm"
                    : "text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
                }`}
              >
                {t.label} ({users[t.key].length})
              </button>
            ))}
          </div>
        </div>

        {/* Search + Dropdown */}
        <div className={`mt-5 ${card}`}>
          <div className="flex flex-col gap-3 p-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
              <Search
                size={16}
                className="shrink-0 text-[color:var(--secondary-text)]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                aria-label="Search"
                className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Status"
              className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
            >
              {tab.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <UsersTable
            tab={tab}
            items={list}
            onView={handleView}
            onEdit={handleOpenEdit}
            onToggle={handleToggle}
            onReview={handleReview}
          />

          <TableFooter
            text={`${list.length} ${list.length === 1 ? "record" : "records"}`}
          />
        </div>
      </section>

      {/* ---------- ADD / EDIT POPUP ---------- */}
      {editing && (
        <div
          onClick={() => setEditing(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
          >
            <button
              type="button"
              onClick={() => setEditing(null)}
              aria-label="Close"
              className="absolute right-4 top-4 text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
            >
              <X size={18} />
            </button>

            <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">
              {editing.id === null
                ? "Add Sub-Admin"
                : `Edit ${editTab.singular}`}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {editTab.formFields.map((f) => (
                <label
                  key={f.key}
                  htmlFor={`bmUser-${f.key}`}
                  className={`text-xs text-[color:var(--secondary-text)] ${
                    f.wide ? "sm:col-span-2" : ""
                  }`}
                >
                  {f.label}

                  <input
                    id={`bmUser-${f.key}`}
                    type="text"
                    value={form[f.key] ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.key]: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </label>
              ))}

              {/* Password for new Sub-Admin */}
              {editing.id === null && (
                <label
                  htmlFor="bmUser-password"
                  className="text-xs text-[color:var(--secondary-text)]"
                >
                  Password

                  <input
                    id="bmUser-password"
                    type="text"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </label>
              )}

              <label
                htmlFor="bmUser-status"
                className="text-xs text-[color:var(--secondary-text)]"
              >
                Account Status

                <select
                  id="bmUser-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className={inputClass}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>
            </div>

            {editing.id === null && (
              <p className="mt-3 text-xs text-[color:var(--secondary-text)]">
                Ask this sub-admin to reset their password after their first
                login.
              </p>
            )}

            {/* Permitted modules */}
            {editing.tab === "subAdmins" && (
              <>
                <h3 className="mt-5 text-sm text-[color:var(--primary-text)]">
                  Permitted modules
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {moduleList.map((m) => (
                    <label
                      key={m}
                      className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]"
                    >
                      <input
                        type="checkbox"
                        checked={!!picked[m]}
                        onChange={() =>
                          setPicked({
                            ...picked,
                            [m]: !picked[m],
                          })
                        }
                        className="h-4 w-4 accent-[var(--primary-yellow)]"
                      />

                      {m}
                    </label>
                  ))}
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!form.name || form.name.trim() === ""}
                onClick={handleSave}
                className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
