"use client";

import { useState } from "react";
import { Image as ImageIcon, Plus, Search, ArrowUpDown, ChevronLeft, ChevronRight, MoreVertical, Eye, Pencil, Send, EyeOff, Trash2 } from "lucide-react";

const initialBlogs = [
  { id: 1, title: "How to Choose the Right Cement Grade", author: "BuildMart Team", slug: "how-to-choose-the-right-cement-grade", keywords: "—", status: "Published", date: "2026-10-06" },
  { id: 2, title: "Reusing Materials Saves Money and the Planet", author: "Maria Saeed", slug: "reusing-materials-saves-money-and-the-planet", keywords: "—", status: "Published", date: "2026-10-13" },
  { id: 3, title: "Steel Prices: Q4 2026 Outlook", author: "BuildMart Team", slug: "steel-prices-q4-2026-outlook", keywords: "—", status: "Draft", date: "2026-10-18" },
];

const headings = ["Title", "Author", "Slug", "Keywords", "Featured Image", "Status", "Updated Date", "Actions"];
const sortable = ["Title", "Updated Date"];
const statusOptions = ["All", "Published", "Draft"];
const perPage = 8; // ek page par kitne rows

// Status ke hisab se badge ka rang
const badgeColors = {
  Published: "bg-green-50 text-green-700 ring-green-200",
  Draft: "bg-orange-50 text-orange-600 ring-orange-200",
};

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [menu, setMenu] = useState(null); // khula menu: { blog, top, left }

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
    setMenu({ blog, top: rect.bottom + 4, left: rect.right - 160 });
  };

  const handleCloseMenu = () => setMenu(null);

  // Publish <-> Unpublish badalna
  const handleToggle = () => {
    const newStatus = menu.blog.status === "Published" ? "Draft" : "Published";
    setBlogs(blogs.map((b) => (b.id === menu.blog.id ? { ...b, status: newStatus } : b)));
    setMenu(null);
  };

  // Delete: us blog ko list se nikal do
  const handleDelete = () => {
    setBlogs(blogs.reduce((all, b) => (b.id === menu.blog.id ? all : [...all, b]), []));
    setMenu(null);
  };

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

  const item =
    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Heading + Add button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Blogs</h1>
        <button
          type="button"
          onClick={() => console.log("Add Blog")}
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
              className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
            />
          </div>
          <select
            value={status}
            onChange={handleStatus}
            className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none sm:w-44"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
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
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.keywords}</td>
                  <td className="px-4 py-3">
                    <span className="flex h-12 w-[72px] items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
                      <ImageIcon size={20} />
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--primary-text)]">{b.date}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      aria-label="Actions menu"
                      onClick={(e) => handleOpenMenu(e, b)}
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

        {/* Footer: records + pages */}
        <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
          <span>{visible.length} records</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
              className="disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Page {current} / {totalPages}</span>
            <button
              type="button"
              aria-label="Next page"
              disabled={current === totalPages}
              onClick={() => setPage(current + 1)}
              className="disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Actions menu: bahar click par band, table ke scroll mein kat'ta nahi */}
      {menu && (
        <>
          <div onClick={handleCloseMenu} className="fixed inset-0 z-40" />
          <div
            style={{ top: menu.top, left: menu.left }}
            className="fixed z-50 w-40 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-1 shadow-lg"
          >
            <button type="button" onClick={() => { console.log("View", menu.blog.title); handleCloseMenu(); }} className={item}>
              <Eye size={16} /> View
            </button>
            <button type="button" onClick={() => { console.log("Edit", menu.blog.title); handleCloseMenu(); }} className={item}>
              <Pencil size={16} /> Edit
            </button>
            <button type="button" onClick={handleToggle} className={item}>
              {menu.blog.status === "Published" ? <EyeOff size={16} /> : <Send size={16} />}
              {menu.blog.status === "Published" ? "Unpublish" : "Publish"}
            </button>
            <button type="button" onClick={handleDelete} className={`${item} text-red-600`}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </>
      )}
    </section>
  );
}