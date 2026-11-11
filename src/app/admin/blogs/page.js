// import BlogsManagement from "./blogmanegment.js";

// export default function BlogsPage() {
//   return <BlogsManagement />;
// }


// "use client";

// import { useState } from "react";
// import { Image as ImageIcon, Plus, Search, ArrowUpDown, ChevronLeft, ChevronRight, MoreVertical, Eye, Pencil, Send, EyeOff, Trash2 } from "lucide-react";

// const initialBlogs = [
//   { id: 1, title: "How to Choose the Right Cement Grade", author: "BuildMart Team", slug: "how-to-choose-the-right-cement-grade", keywords: "—", status: "Published", date: "2026-10-06" },
//   { id: 2, title: "Reusing Materials Saves Money and the Planet", author: "Maria Saeed", slug: "reusing-materials-saves-money-and-the-planet", keywords: "—", status: "Published", date: "2026-10-13" },
//   { id: 3, title: "Steel Prices: Q4 2026 Outlook", author: "BuildMart Team", slug: "steel-prices-q4-2026-outlook", keywords: "—", status: "Draft", date: "2026-10-18" },
// ];

// const headings = ["Title", "Author", "Slug", "Keywords", "Featured Image", "Status", "Updated Date", "Actions"];
// const sortable = ["Title", "Updated Date"];
// const statusOptions = ["All", "Published", "Draft"];
// const perPage = 8; // ek page par kitne rows

// // Status ke hisab se badge ka rang
// const badgeColors = {
//   Published: "bg-green-50 text-green-700 ring-green-200",
//   Draft: "bg-orange-50 text-orange-600 ring-orange-200",
// };

// const BlogsPage = () => {
//   const [blogs, setBlogs] = useState(initialBlogs);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);
//   const [menu, setMenu] = useState(null); // khula menu: { blog, top, left }

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleStatus = (e) => {
//     setStatus(e.target.value);
//     setPage(1);
//   };

//   // Teen dots dabane par menu button ke neeche khulta hai
//   const handleOpenMenu = (e, blog) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMenu({ blog, top: rect.bottom + 4, left: rect.right - 160 });
//   };

//   const handleCloseMenu = () => setMenu(null);

//   // Publish <-> Unpublish badalna
//   const handleToggle = () => {
//     const newStatus = menu.blog.status === "Published" ? "Draft" : "Published";
//     setBlogs(blogs.map((b) => (b.id === menu.blog.id ? { ...b, status: newStatus } : b)));
//     setMenu(null);
//   };

//   // Delete: us blog ko list se nikal do
//   const handleDelete = () => {
//     setBlogs(blogs.reduce((all, b) => (b.id === menu.blog.id ? all : [...all, b]), []));
//     setMenu(null);
//   };

//   // 1) Search aur dropdown dono par poore utre hue blogs chuno
//   const visible = blogs.reduce((all, b) => {
//     const matchSearch = `${b.title} ${b.author} ${b.slug}`.toLowerCase().includes(search.toLowerCase());
//     const matchStatus = status === "All" || b.status === status;
//     return matchSearch && matchStatus ? [...all, b] : all;
//   }, []);

//   // 2) Pages
//   const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
//   const current = Math.min(page, totalPages);

//   // 3) Sirf is page ke rows
//   const rows = visible.slice((current - 1) * perPage, current * perPage);

//   const item =
//     "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

//   return (
//     <section className="p-4 sm:p-6 lg:p-8">
//       {/* Heading + Add button */}
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Blogs</h1>
//         <button
//           type="button"
//           onClick={() => console.log("Add Blog")}
//           className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//         >
//           <Plus size={16} />
//           Add Blog
//         </button>
//       </div>

//       {/* Card */}
//       <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
//         {/* Search + dropdown */}
//         <div className="flex flex-col gap-3 p-3 sm:flex-row">
//           <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
//             <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
//             <input
//               type="text"
//               value={search}
//               onChange={handleSearch}
//               placeholder="Search..."
//               className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
//             />
//           </div>
//           <select
//             value={status}
//             onChange={handleStatus}
//             className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
//           >
//             {statusOptions.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1000px] text-left text-sm">
//             <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
//               <tr>
//                 {headings.map((h) => (
//                   <th key={h} className="px-4 py-3 font-medium">
//                     <span className="inline-flex items-center gap-1">
//                       {h}
//                       {sortable.includes(h) && <ArrowUpDown size={12} />}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {rows.map((b) => (
//                 <tr key={b.id} className="border-t border-[color:var(--border-color)]">
//                   <td className="max-w-[260px] px-4 py-3 text-[color:var(--primary-text)]">{b.title}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.author}</td>
//                   <td className="max-w-[240px] break-words px-4 py-3 text-[color:var(--primary-text)]">{b.slug}</td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.keywords}</td>
//                   <td className="px-4 py-3">
//                     <span className="flex h-12 w-[72px] items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
//                       <ImageIcon size={20} />
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[b.status]}`}>
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.date}</td>
//                   <td className="px-4 py-3">
//                     <button
//                       type="button"
//                       aria-label="Actions menu"
//                       onClick={(e) => handleOpenMenu(e, b)}
//                       className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] p-1.5 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
//                     >
//                       <MoreVertical size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer: records + pages */}
//         <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
//           <span>{visible.length} records</span>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               aria-label="Previous page"
//               disabled={current === 1}
//               onClick={() => setPage(current - 1)}
//               className="disabled:opacity-30"
//             >
//               <ChevronLeft size={16} />
//             </button>
//             <span>Page {current} / {totalPages}</span>
//             <button
//               type="button"
//               aria-label="Next page"
//               disabled={current === totalPages}
//               onClick={() => setPage(current + 1)}
//               className="disabled:opacity-30"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Actions menu: bahar click par band, table ke scroll mein kat'ta nahi */}
//       {menu && (
//         <>
//           <div onClick={handleCloseMenu} className="fixed inset-0 z-40" />
//           <div
//             style={{ top: menu.top, left: menu.left }}
//             className="fixed z-50 w-40 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-1 shadow-lg"
//           >
//             <button type="button" onClick={() => { console.log("View", menu.blog.title); handleCloseMenu(); }} className={item}>
//               <Eye size={16} /> View
//             </button>
//             <button type="button" onClick={() => { console.log("Edit", menu.blog.title); handleCloseMenu(); }} className={item}>
//               <Pencil size={16} /> Edit
//             </button>
//             <button type="button" onClick={handleToggle} className={item}>
//               {menu.blog.status === "Published" ? <EyeOff size={16} /> : <Send size={16} />}
//               {menu.blog.status === "Published" ? "Unpublish" : "Publish"}
//             </button>
//             <button type="button" onClick={handleDelete} className={`${item} text-red-600`}>
//               <Trash2 size={16} /> Delete
//             </button>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default BlogsPage;



"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon, Plus, Search, ArrowUpDown, ChevronLeft, ChevronRight, MoreVertical,
  Eye, Pencil, Send, EyeOff, Trash2, Upload, X,
} from "lucide-react";

/* ---------------- Dataset ---------------- */

const initialBlogs = [
  {
    id: 1, title: "How to Choose the Right Cement Grade", author: "BuildMart Team", slug: "how-to-choose-the-right-cement-grade", keywords: "cement, grade",
    status: "Published", date: "2026-10-06", image: "", imageName: "",
    content: "OPC aur PPC cement ka farq, kis kaam ke liye kaun sa grade behtar hai aur kharidte waqt kin baton ka khayal rakhein.",
  },
  {
    id: 2, title: "Reusing Materials Saves Money and the Planet", author: "Maria Saeed", slug: "reusing-materials-saves-money-and-the-planet", keywords: "reuse, savings",
    status: "Published", date: "2026-10-13", image: "", imageName: "",
    content: "Purane darwaze, khirkiyan aur tiles dobara istemal karne se kharcha bhi kam hota hai aur mahol ko bhi faida hota hai.",
  },
  {
    id: 3, title: "Steel Prices: Q4 2026 Outlook", author: "BuildMart Team", slug: "steel-prices-q4-2026-outlook", keywords: "steel, prices",
    status: "Draft", date: "2026-10-18", image: "", imageName: "",
    content: "Saria ki qeematon ka is quarter ka jaiza aur aane wale mahino ka andaza.",
  },
];

const headings = ["Title", "Author", "Slug", "Keywords", "Featured Image", "Status", "Updated Date", "Actions"];
const sortable = ["Title", "Updated Date"];
const statusOptions = ["All", "Published", "Draft"];
const perPage = 8; // ek page par kitne rows

const emptyForm = { title: "", author: "", slug: "", keywords: "", content: "", status: "Draft", image: "", imageName: "" };

/* ---------------- Shared styles + helpers ---------------- */

const badgeColors = {
  Published: "bg-green-50 text-green-700 ring-green-200",
  Draft: "bg-orange-50 text-orange-600 ring-orange-200",
};

const field =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const btn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";
const menuItem =
  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// "How To Choose" -> "how-to-choose"
const slugify = (text) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const today = () => new Date().toISOString().slice(0, 10);

// Overlay + heading + close icon
const ModalShell = ({ title, size = "max-w-md", onClose, children }) => (
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
      <h2 className="pr-8 text-xl text-[color:var(--primary-text)]">{title}</h2>
      {children}
    </div>
  </div>
);

// Featured image: upload hui ho to wo, warna icon wala dabba
const Thumb = ({ blog, className }) => (
  <span className={`relative flex items-center justify-center overflow-hidden rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)] ${className}`}>
    {blog.image ? <Image src={blog.image} alt={blog.title} fill unoptimized className="object-cover" /> : <ImageIcon size={20} />}
  </span>
);

/* ---------------- Blogs table ---------------- */

const BlogsTable = ({ rows, onMenu }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[1000px] text-left text-sm">
      <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
        <tr>
          {headings.map((h) => (
            <th key={h} className="px-4 py-3 font-medium">
              <span className="inline-flex items-center gap-1">
                {h}
                {sortable.includes(h) && <ArrowUpDown size={12} />}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((b) => (
          <tr key={b.id} className="border-t border-[color:var(--border-color)]">
            <td className="max-w-[260px] px-4 py-3 text-[color:var(--primary-text)]">{b.title}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.author}</td>
            <td className="max-w-[240px] break-words px-4 py-3 text-[color:var(--primary-text)]">{b.slug}</td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.keywords || "—"}</td>
            <td className="px-4 py-3"><Thumb blog={b} className="h-12 w-[72px]" /></td>
            <td className="px-4 py-3">
              <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[b.status]}`}>{b.status}</span>
            </td>
            <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.date}</td>
            <td className="px-4 py-3">
              <button
                type="button"
                aria-label={`Actions menu for ${b.title}`}
                onClick={(e) => onMenu(e, b)}
                className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] p-1.5 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------- Page ---------------- */

const BlogsPage = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [menu, setMenu] = useState(null); // khula menu: { blog, top, left }
  const [viewId, setViewId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Add / Edit form
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null); // null = naya blog
  const [form, setForm] = useState(emptyForm);
  const [slugEdited, setSlugEdited] = useState(false); // slug haath se badla to title se auto na badle

  /* ---------- Handlers ---------- */

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // Teen dots dabane par menu button ke neeche khulta hai
  const handleOpenMenu = (e, blog) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ blog, top: rect.bottom + 4, left: Math.max(8, rect.right - 160) });
  };

  const handleCloseMenu = () => setMenu(null);

  // Menu ke options: pehle menu band, phir uska kaam
  const handleMenuView = () => {
    setViewId(menu.blog.id);
    setMenu(null);
  };

  const handleMenuDelete = () => {
    setDeleteId(menu.blog.id);
    setMenu(null);
  };

  // Publish <-> Unpublish badalna
  const handleToggle = () => {
    const newStatus = menu.blog.status === "Published" ? "Draft" : "Published";
    setBlogs(blogs.map((b) => (b.id === menu.blog.id ? { ...b, status: newStatus, date: today() } : b)));
    setMenu(null);
  };

  // Add Blog: khali form
  const handleOpenAdd = () => {
    setForm(emptyForm);
    setSlugEdited(false);
    setEditId(null);
    setFormOpen(true);
  };

  // Menu se Edit: blog ki values form mein
  const handleMenuEdit = () => {
    const { title, author, slug, keywords, content, status: s, image, imageName } = menu.blog;
    setForm({ title, author, slug, keywords, content, status: s, image, imageName });
    setSlugEdited(true);
    setEditId(menu.blog.id);
    setFormOpen(true);
    setMenu(null);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Title likhte waqt slug khud ban jaye (jab tak haath se na badla ho)
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({ ...form, title, slug: slugEdited ? form.slug : slugify(title) });
  };

  const handleSlugChange = (e) => {
    setSlugEdited(true);
    setForm({ ...form, slug: slugify(e.target.value) });
  };

  // Featured image: preview ke liye temporary url
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: URL.createObjectURL(file), imageName: file.name });
  };

  const handleRemoveImage = () => setForm({ ...form, image: "", imageName: "" });

  const canSave = form.title.trim() !== "" && form.author.trim() !== "";

  const handleSave = () => {
    if (!canSave) return;
    const values = {
      title: form.title.trim(),
      author: form.author.trim(),
      slug: form.slug.trim() || slugify(form.title),
      keywords: form.keywords.trim(),
      content: form.content.trim(),
      status: form.status,
      image: form.image,
      imageName: form.imageName,
      date: today(),
    };

    if (editId === null) {
      setBlogs([{ id: Date.now(), ...values }, ...blogs]);
    } else {
      setBlogs(blogs.map((b) => (b.id === editId ? { ...b, ...values } : b)));
    }
    setFormOpen(false);
  };

  // Delete confirm: us blog ko list se nikal do
  const handleDeleteConfirm = () => {
    setBlogs(blogs.reduce((all, b) => (b.id === deleteId ? all : [...all, b]), []));
    setDeleteId(null);
  };

  /* ---------- Data ---------- */

  // 1) Search aur dropdown dono par poore utre hue blogs chuno
  const visible = blogs.reduce((all, b) => {
    const matchSearch = `${b.title} ${b.author} ${b.slug}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || b.status === status;
    return matchSearch && matchStatus ? [...all, b] : all;
  }, []);

  // 2) Pages
  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);

  // 3) Sirf is page ke rows
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  const viewing = blogs.find((b) => b.id === viewId);
  const deleting = blogs.find((b) => b.id === deleteId);

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + Add button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Blogs</h1>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <Plus size={16} />
          Add Blog
        </button>
      </div>

      {/* Card */}
      <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
        {/* Search + dropdown */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
            <Search size={16} className="shrink-0 text-[color:var(--secondary-text)]" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              aria-label="Search"
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            aria-label="Status"
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <BlogsTable rows={rows} onMenu={handleOpenMenu} />

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} {visible.length === 1 ? "record" : "records"}</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)} className="disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button type="button" aria-label="Next page" disabled={current === totalPages} onClick={() => setPage(current + 1)} className="disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Actions menu: bahar click par band ---------- */}
      {menu && (
        <>
          <div onClick={handleCloseMenu} className="fixed inset-0 z-40" />
          <div
            style={{ top: menu.top, left: menu.left }}
            className="fixed z-50 w-40 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-1 shadow-lg"
          >
            <button type="button" onClick={handleMenuView} className={menuItem}><Eye size={16} /> View</button>
            <button type="button" onClick={handleMenuEdit} className={menuItem}><Pencil size={16} /> Edit</button>
            <button type="button" onClick={handleToggle} className={menuItem}>
              {menu.blog.status === "Published" ? <EyeOff size={16} /> : <Send size={16} />}
              {menu.blog.status === "Published" ? "Unpublish" : "Publish"}
            </button>
            <button type="button" onClick={handleMenuDelete} className={`${menuItem} text-red-600`}><Trash2 size={16} /> Delete</button>
          </div>
        </>
      )}

      {/* ---------- Add / Edit Blog (form isi page mein) ---------- */}
      {formOpen && (
        <ModalShell title={editId === null ? "Add Blog" : "Edit Blog"} size="max-w-2xl" onClose={() => setFormOpen(false)}>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label htmlFor="bmBlogTitle" className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
              Title *
              <input id="bmBlogTitle" name="title" type="text" value={form.title} onChange={handleTitleChange} className={field} />
            </label>

            <label htmlFor="bmBlogAuthor" className="text-xs text-[color:var(--secondary-text)]">
              Author *
              <input id="bmBlogAuthor" name="author" type="text" value={form.author} onChange={handleChange} className={field} />
            </label>

            <label htmlFor="bmBlogStatus" className="text-xs text-[color:var(--secondary-text)]">
              Status
              <select id="bmBlogStatus" name="status" value={form.status} onChange={handleChange} className={field}>
                <option>Draft</option>
                <option>Published</option>
              </select>
            </label>

            <label htmlFor="bmBlogSlug" className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
              Slug
              <input id="bmBlogSlug" name="slug" type="text" value={form.slug} onChange={handleSlugChange} className={field} />
            </label>

            <label htmlFor="bmBlogKeywords" className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
              Keywords (comma se alag karein)
              <input id="bmBlogKeywords" name="keywords" type="text" value={form.keywords} onChange={handleChange} className={field} />
            </label>

            <label htmlFor="bmBlogContent" className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
              Content
              <textarea id="bmBlogContent" name="content" rows={5} value={form.content} onChange={handleChange} className={`${field} resize-y`} />
            </label>

            {/* Featured image */}
            <div className="sm:col-span-2">
              <p className="text-xs text-[color:var(--secondary-text)]">Featured Image</p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <Thumb blog={{ image: form.image, title: form.title }} className="h-16 w-24" />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] shadow-sm hover:bg-[var(--off-white-background)]">
                  <Upload size={16} /> {form.imageName || "Upload Image"}
                  <input type="file" accept="image/*" aria-label="Featured image" onChange={handleImage} className="hidden" />
                </label>
                {form.image && (
                  <button type="button" onClick={handleRemoveImage} className="text-xs text-red-600 hover:underline">Remove</button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setFormOpen(false)} className={btn}>Cancel</button>
            <button type="button" disabled={!canSave} onClick={handleSave} className={yellowBtn}>
              {editId === null ? "Add Blog" : "Save Changes"}
            </button>
          </div>
        </ModalShell>
      )}

      {/* ---------- View modal ---------- */}
      {viewing && (
        <ModalShell title={viewing.title} size="max-w-2xl" onClose={() => setViewId(null)}>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[viewing.status]}`}>{viewing.status}</span>
            <span className="text-xs text-[color:var(--secondary-text)]">Updated {viewing.date}</span>
          </div>

          <Thumb blog={viewing} className="mt-4 h-40 w-full" />

          <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs text-[color:var(--secondary-text)]">Author</p>
              <p className="text-[color:var(--primary-text)]">{viewing.author}</p>
            </div>
            <div>
              <p className="text-xs text-[color:var(--secondary-text)]">Keywords</p>
              <p className="text-[color:var(--primary-text)]">{viewing.keywords || "—"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[color:var(--secondary-text)]">Slug</p>
              <p className="break-words text-[color:var(--primary-text)]">{viewing.slug}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[color:var(--secondary-text)]">Content</p>
              <p className="whitespace-pre-line text-[color:var(--primary-text)]">{viewing.content || "—"}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => setViewId(null)} className={btn}>Close</button>
          </div>
        </ModalShell>
      )}

      {/* ---------- Delete confirmation ---------- */}
      {deleting && (
        <ModalShell title="Delete Blog" onClose={() => setDeleteId(null)}>
          <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
            Are you sure you want to delete &quot;{deleting.title}&quot;? Yeh wapas nahi ho sakta.
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setDeleteId(null)} className={btn}>Cancel</button>
            <button type="button" onClick={handleDeleteConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
              Confirm Delete
            </button>
          </div>
        </ModalShell>
      )}
    </section>
  );
};

export default BlogsPage;