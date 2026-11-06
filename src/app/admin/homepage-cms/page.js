"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
} from "lucide-react";

// Images: src/assets/images/guest/hero/ (asli images admin upload se aayengi)
import exterior from "../../../assets/images/guest/hero/exterior.jpeg";
import interior from "../../../assets/images/guest/hero/interior.jpeg";
import grey from "../../../assets/images/guest/hero/grey.jpeg";

/* ---------------- Datasets ---------------- */

const initialSlides = [
  { id: 1, title: "Build smarter. Compare every material.", description: "New and reused construction materials from verified suppliers across Pakistan.", image: exterior, buttonText: "Browse Materials", buttonLink: "/materials", active: true },
  { id: 2, title: "Materials for your next build", description: "Cement, steel and bricks from verified local suppliers.", image: interior, buttonText: "Explore Suppliers", buttonLink: "/suppliers", active: true },
  { id: 3, title: "Give materials a second life", description: "Discover reusable doors, tiles and construction materials.", image: grey, buttonText: "Find Reused Materials", buttonLink: "/materials", active: true },
];

const initialBanners = [
  { id: 1, title: "10% off Cement this week", description: "Limited time offer on all cement brands.", image: interior, buttonText: "Shop now", buttonLink: "/materials", active: true },
  { id: 2, title: "List your reused materials free", description: "Sell your leftover materials with no listing fee.", image: grey, buttonText: "List now", buttonLink: "/supplier", active: true },
];

const initialAnnouncements = [
  { id: 1, text: "Free delivery in Lahore on orders above Rs 50,000", active: true },
  { id: 2, text: "New: Verified supplier badges", active: true },
];

// Featured sections: naam + checked hai ya nahi
const initialFeatured = [
  { key: "suppliers", title: "Featured Suppliers", items: [{ name: "Sheikh Traders", on: false }, { name: "Brick House", on: true }] },
  { key: "newMaterials", title: "Featured New Materials", items: [{ name: "Red Clay Bricks (A-Class)", on: false }, { name: "Grade 60 Steel Saria 12mm", on: true }, { name: "Raw Sand (Truck)", on: false }, { name: "DG Khan Cement OPC", on: true }, { name: "Weather Shield Paint 16L", on: false }] },
  { key: "reusedMaterials", title: "Featured Reused Materials", items: [{ name: "Used Wooden Doors (set of 4)", on: false }, { name: "Salvaged Iron Window Grills", on: false }, { name: "Leftover Porcelain Tiles", on: true }] },
  { key: "blogs", title: "Featured Blogs", items: [{ name: "How to Choose the Right Cement Grade", on: true }, { name: "Reusing Materials Saves Money and the Planet", on: true }] },
];

const emptyItem = { title: "", description: "", image: null, buttonText: "", buttonLink: "", active: true };

/* ---------------- Shared styles + helpers ---------------- */

const card = "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5";
const cardTitle = "text-sm font-semibold uppercase tracking-wide text-[color:var(--primary-text)]";
const input =
  "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const label = "mb-1.5 block text-xs text-[color:var(--secondary-text)]";
const outlineBtn =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
const yellowBtn =
  "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";
const iconBtn =
  "rounded-md p-1.5 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)] hover:text-[color:var(--primary-text)]";

// Sirf active items chuno
const onlyActive = (list) => list.reduce((all, i) => (i.active ? [...all, i] : all), []);

/* ---------------- Small shared pieces ---------------- */

// Image: static import ho ya upload ki hui blob url, dono chalte hain
const Img = ({ src, alt }) => <Image src={src} alt={alt} fill unoptimized className="object-cover" />;

// On / Off switch
const Switch = ({ on, onChange, name }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={name}
    onClick={onChange}
    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"}`}
  >
    <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`} />
  </button>
);

// Overlay + heading + subtitle + close icon: sab modals yahi use karte hain
const ModalShell = ({ title, subtitle, size = "max-w-xl", onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl text-[color:var(--primary-text)]">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{subtitle}</p>}
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------------- Hero slider (auto-move) ---------------- */

const HeroPreview = ({ slides, announcements }) => {
  const live = onlyActive(slides);
  const strip = onlyActive(announcements).map((a) => a.text).join("  ·  ");
  const [index, setIndex] = useState(0);

  // Slide number (slides kam ho jayen to bhi sahi rahe)
  const current = live.length ? index % live.length : 0;

  // Har 4 second baad agli slide (manual click par timer dobara shuru)
  useEffect(() => {
    if (live.length < 2) return;
    const timer = setTimeout(() => setIndex(current + 1), 4000);
    return () => clearTimeout(timer);
  }, [current, live.length]);

  const handlePrev = () => setIndex((current - 1 + live.length) % live.length);
  const handleNext = () => setIndex((current + 1) % live.length);

  return (
    <div className="overflow-hidden rounded-xl bg-[var(--charcoal-black)] shadow-sm">
      {/* Announcements ki peeli patti */}
      {strip && (
        <p className="truncate bg-[var(--primary-yellow)] px-4 py-1.5 text-xs text-[color:var(--charcoal-black)]">
          {strip}
        </p>
      )}

      {live.length === 0 ? (
        <p className="py-24 text-center text-sm text-[color:var(--border-color)]">No active slides</p>
      ) : (
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
          {/* Slides ki patti: translate se pichay move hoti hai */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {live.map((s) => (
              <div key={s.id} className="relative h-full w-full shrink-0">
                {s.image && <Img src={s.image} alt={s.title} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-12 text-white sm:px-8">
                  <h2 className="max-w-2xl text-xl font-semibold sm:text-3xl">{s.title}</h2>
                  <p className="mt-1 max-w-xl text-xs text-white/80 sm:text-sm">{s.description}</p>
                  {s.buttonText && (
                    <Link
                      href={s.buttonLink || "/"}
                      className="mt-3 inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:text-sm"
                    >
                      {s.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Arrows + dots */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={handlePrev}
            className="absolute bottom-3 left-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={handleNext}
            className="absolute bottom-3 right-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {live.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-[var(--primary-yellow)]" : "w-1.5 bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- Slides / Banners list (grid-list) ---------------- */

const ItemList = ({ kind, items, onToggle, onPreview, onEdit, onDelete }) => (
  <div>
    {items.length === 0 && <p className="py-4 text-sm text-[color:var(--secondary-text)]">Nothing here yet.</p>}
    {items.map((item) => (
      <div
        key={item.id}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-color)] py-3 last:border-b-0"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--off-white-background)] text-[color:var(--secondary-text)]">
            {item.image ? <Img src={item.image} alt={item.title} /> : <ImageIcon size={18} />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[color:var(--primary-text)]">{item.title}</p>
            <p className="line-clamp-1 text-xs text-[color:var(--secondary-text)]">{item.description}</p>
            <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] ${item.active ? "bg-green-50 text-green-700" : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"}`}>
              {item.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Switch on={item.active} onChange={() => onToggle(kind, item.id)} name={`Toggle ${item.title}`} />
          <button type="button" aria-label={`Preview ${item.title}`} onClick={() => onPreview(item)} className={iconBtn}>
            <Eye size={16} />
          </button>
          <button type="button" aria-label={`Edit ${item.title}`} onClick={() => onEdit(kind, item)} className={iconBtn}>
            <Pencil size={16} />
          </button>
          <button type="button" aria-label={`Delete ${item.title}`} onClick={() => onDelete(kind, item)} className={`${iconBtn} text-red-500 hover:text-red-600`}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- Featured checkboxes (grid) ---------------- */

const FeaturedBox = ({ section, onToggle }) => (
  <div className={card}>
    <h3 className={cardTitle}>{section.title}</h3>
    <div className="mt-3 flex flex-col gap-2">
      {section.items.map((item) => (
        <label key={item.name} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
          <input
            type="checkbox"
            checked={item.on}
            onChange={() => onToggle(section.key, item.name)}
            className="h-4 w-4 accent-[var(--primary-yellow)]"
          />
          {item.name}
        </label>
      ))}
    </div>
  </div>
);

/* ---------------- Page ---------------- */

const CmsPage = () => {
  const [slides, setSlides] = useState(initialSlides);
  const [banners, setBanners] = useState(initialBanners);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [featured, setFeatured] = useState(initialFeatured);
  const [newText, setNewText] = useState(""); // nayi announcement ka text
  const [about, setAbout] = useState("Helps homeowners and contractors compare and buy new and reused construction materials from verified suppliers.");
  const [email, setEmail] = useState("support@buildmart.pk");
  const [address, setAddress] = useState("3rd Floor, Arfa Tower, Lahore");

  // Modals
  const [form, setForm] = useState(null); // { kind, item } : create / edit form
  const [formData, setFormData] = useState(emptyItem); // form ke fields
  const [preview, setPreview] = useState(null); // preview wala item
  const [deleting, setDeleting] = useState(null); // { kind, item }

  // kind ("slide" ya "banner") ke hisab se sahi list aur uska setter
  const lists = { slide: [slides, setSlides], banner: [banners, setBanners] };
  const names = { slide: "Slide", banner: "Banner" };

  /* ---- slides + banners ---- */

  // Create ya Edit form kholo
  const handleOpenForm = (kind, item) => {
    setForm({ kind, item });
    setFormData(item ? { ...item } : emptyItem);
  };

  const handleFormChange = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  // File chuni to uska temporary url image bana do
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
  };

  const handleSave = () => {
    const [list, setList] = lists[form.kind];
    setList(
      form.item
        ? list.map((i) => (i.id === form.item.id ? { ...formData, id: i.id } : i))
        : [...list, { ...formData, id: Date.now() }]
    );
    setForm(null);
  };

  const handleToggleItem = (kind, id) => {
    const [list, setList] = lists[kind];
    setList(list.map((i) => (i.id === id ? { ...i, active: !i.active } : i)));
  };

  const handleDeleteConfirm = () => {
    const [list, setList] = lists[deleting.kind];
    setList(list.reduce((all, i) => (i.id === deleting.item.id ? all : [...all, i]), []));
    setDeleting(null);
  };

  /* ---- announcements ---- */

  const handleAddAnnouncement = () => {
    if (newText.trim() === "") return;
    setAnnouncements([...announcements, { id: Date.now(), text: newText.trim(), active: true }]);
    setNewText("");
  };

  const handleToggleAnnouncement = (id) => {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const handleDeleteAnnouncement = (id) =>
    setAnnouncements(announcements.reduce((all, a) => (a.id === id ? all : [...all, a]), []));

  // Upar / neeche: pas wali announcement se jagah badal do
  const handleMove = (i, step) => {
    const j = i + step;
    if (j < 0 || j >= announcements.length) return;
    setAnnouncements(announcements.map((a, n) => (n === i ? announcements[j] : n === j ? announcements[i] : a)));
  };

  /* ---- featured ---- */

  const handleFeatured = (key, name) => {
    setFeatured(
      featured.map((s) =>
        s.key === key ? { ...s, items: s.items.map((i) => (i.name === name ? { ...i, on: !i.on } : i)) } : s
      )
    );
  };

  const handleSaveInfo = () => console.log("Saved", { about, email, address });

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Homepage / CMS</h1>

      {/* Live preview: slider khud aage badhta hai, button par click se us page par jate hain */}
      <div className="mt-5">
        <HeroPreview slides={slides} announcements={announcements} />
      </div>

      {/* Promotional banners ka preview */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {onlyActive(banners).map((b) => (
          <div key={b.id}>
            <div className="relative h-32 overflow-hidden rounded-xl bg-[var(--off-white-background)] sm:h-40">
              {b.image && <Img src={b.image} alt={b.title} />}
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[color:var(--primary-text)]">{b.title}</p>
          </div>
        ))}
      </div>

      {/* Hero slides + Marquee */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className={cardTitle}>Hero Slides</h3>
            <button type="button" onClick={() => handleOpenForm("slide", null)} className="flex items-center gap-1.5 text-xs text-[color:var(--primary-text)] hover:underline">
              <Plus size={14} /> Create New Slide
            </button>
          </div>
          <div className="mt-3">
            <ItemList kind="slide" items={slides} onToggle={handleToggleItem} onPreview={setPreview} onEdit={handleOpenForm} onDelete={(kind, item) => setDeleting({ kind, item })} />
          </div>
        </div>

        <div className={card}>
          <h3 className={cardTitle}>Marquee / Announcements</h3>
          <div className="mt-3">
            {announcements.map((a, i) => (
              <div key={a.id} className="flex items-center gap-2 border-b border-[color:var(--border-color)] py-3 last:border-b-0">
                <Switch on={a.active} onChange={() => handleToggleAnnouncement(a.id)} name={`Toggle ${a.text}`} />
                <p className="min-w-0 flex-1 text-xs text-[color:var(--primary-text)]">{a.text}</p>
                <button type="button" aria-label="Move up" onClick={() => handleMove(i, -1)} className={iconBtn}><ChevronUp size={14} /></button>
                <button type="button" aria-label="Move down" onClick={() => handleMove(i, 1)} className={iconBtn}><ChevronDown size={14} /></button>
                <button type="button" aria-label="Delete announcement" onClick={() => handleDeleteAnnouncement(a.id)} className={`${iconBtn} text-red-500 hover:text-red-600`}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          {/* Nayi announcement */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="New announcement..."
              aria-label="New announcement"
              className={input}
            />
            <button type="button" onClick={handleAddAnnouncement} className={yellowBtn}>Add</button>
          </div>
        </div>
      </div>

      {/* Promotional banners */}
      <div className={`mt-4 ${card}`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className={cardTitle}>Promotional Banners</h3>
          <button type="button" onClick={() => handleOpenForm("banner", null)} className="flex items-center gap-1.5 text-xs text-[color:var(--primary-text)] hover:underline">
            <Plus size={14} /> Add Banner
          </button>
        </div>
        <div className="mt-3">
          <ItemList kind="banner" items={banners} onToggle={handleToggleItem} onPreview={setPreview} onEdit={handleOpenForm} onDelete={(kind, item) => setDeleting({ kind, item })} />
        </div>
      </div>

      {/* Featured sections */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {featured.map((section) => (
          <FeaturedBox key={section.key} section={section} onToggle={handleFeatured} />
        ))}
      </div>

      {/* About + Contact info */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={card}>
          <h3 className={cardTitle}>About / Pages</h3>
          <label htmlFor="bmCmsAbout" className={`mt-3 ${label}`}>About text</label>
          <textarea id="bmCmsAbout" rows={4} value={about} onChange={(e) => setAbout(e.target.value)} className={`${input} resize-y`} />
        </div>

        <div className={card}>
          <h3 className={cardTitle}>Contact Info (Public)</h3>
          <label htmlFor="bmCmsEmail" className={`mt-3 ${label}`}>Email</label>
          <input id="bmCmsEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          <label htmlFor="bmCmsAddress" className={`mt-3 ${label}`}>Address</label>
          <input id="bmCmsAddress" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={input} />
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={handleSaveInfo} className={yellowBtn}>Save</button>
          </div>
        </div>
      </div>

      {/* ---------- Create / Edit form (slide ya banner) ---------- */}
      {form && (
        <ModalShell
          title={`${form.item ? "Edit" : "Create New"} ${names[form.kind]}`}
          subtitle={form.kind === "slide" ? "Hero slide details" : "Promotion banner details"}
          onClose={() => setForm(null)}
        >
          <div className="mt-5">
            <label htmlFor="bmCmsTitle" className={label}>Title / Heading</label>
            <input id="bmCmsTitle" type="text" autoFocus value={formData.title} onChange={handleFormChange("title")} className={input} />
          </div>

          <div className="mt-4">
            <label htmlFor="bmCmsDesc" className={label}>Description / Text</label>
            <textarea id="bmCmsDesc" rows={3} value={formData.description} onChange={handleFormChange("description")} className={`${input} resize-y`} />
          </div>

          <div className="mt-4">
            <label htmlFor="bmCmsFile" className={label}>Image File Upload</label>
            <input id="bmCmsFile" type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-[color:var(--primary-text)]" />
            {formData.image && (
              <div className="relative mt-2 h-20 w-32 overflow-hidden rounded-md">
                <Img src={formData.image} alt="Selected" />
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bmCmsBtnText" className={label}>Button Text</label>
              <input id="bmCmsBtnText" type="text" value={formData.buttonText} onChange={handleFormChange("buttonText")} className={input} />
            </div>
            <div>
              <label htmlFor="bmCmsBtnLink" className={label}>Button Link</label>
              <input id="bmCmsBtnLink" type="text" placeholder="/materials" value={formData.buttonLink} onChange={handleFormChange("buttonLink")} className={input} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
            <Switch on={formData.active} onChange={() => setFormData({ ...formData, active: !formData.active })} name="Active" />
            Active
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setForm(null)} className={outlineBtn}>Cancel</button>
            <button type="button" disabled={formData.title.trim() === ""} onClick={handleSave} className={yellowBtn}>
              Save {names[form.kind]}
            </button>
          </div>
        </ModalShell>
      )}

      {/* ---------- Preview ---------- */}
      {preview && (
        <ModalShell title="Slide Preview" subtitle="Selected slide" onClose={() => setPreview(null)}>
          <div className="relative mt-4 aspect-video overflow-hidden rounded-md bg-[var(--off-white-background)]">
            {preview.image && <Img src={preview.image} alt={preview.title} />}
          </div>
          <h3 className="mt-3 text-base font-semibold text-[color:var(--primary-text)]">{preview.title}</h3>
          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{preview.description}</p>
          {preview.buttonText && <p className="mt-2 text-sm text-[color:var(--primary-text)]">{preview.buttonText}</p>}
          <p className="mt-1 text-xs text-[color:var(--secondary-text)]">{preview.active ? "Active" : "Inactive"}</p>
        </ModalShell>
      )}

      {/* ---------- Delete confirmation ---------- */}
      {deleting && (
        <ModalShell title={`Delete ${names[deleting.kind]}?`} size="max-w-md" onClose={() => setDeleting(null)}>
          <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
            Delete &quot;{deleting.item.title}&quot;. This cannot be undone.
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setDeleting(null)} className={outlineBtn}>Cancel</button>
            <button type="button" onClick={handleDeleteConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
              Confirm Delete
            </button>
          </div>
        </ModalShell>
      )}
    </section>
  );
};

export default CmsPage;