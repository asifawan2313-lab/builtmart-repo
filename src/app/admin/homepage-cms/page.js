// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   ChevronUp,
// //   ChevronDown,
// //   Eye,
// //   Pencil,
// //   Trash2,
// //   Plus,
// //   X,
// //   Image as ImageIcon,
// // } from "lucide-react";

// // // Images: src/assets/images/guest/hero/ (asli images admin upload se aayengi)
// // import exterior from "../../../assets/images/guest/hero/exterior.jpeg";
// // import interior from "../../../assets/images/guest/hero/interior.jpeg";
// // import grey from "../../../assets/images/guest/hero/grey.jpeg";

// // /* ---------------- Datasets ---------------- */

// // const initialSlides = [
// //   { id: 1, title: "Build smarter. Compare every material.", description: "New and reused construction materials from verified suppliers across Pakistan.", image: exterior, buttonText: "Browse Materials", buttonLink: "/materials", active: true },
// //   { id: 2, title: "Materials for your next build", description: "Cement, steel and bricks from verified local suppliers.", image: interior, buttonText: "Explore Suppliers", buttonLink: "/suppliers", active: true },
// //   { id: 3, title: "Give materials a second life", description: "Discover reusable doors, tiles and construction materials.", image: grey, buttonText: "Find Reused Materials", buttonLink: "/materials", active: true },
// // ];

// // const initialBanners = [
// //   { id: 1, title: "10% off Cement this week", description: "Limited time offer on all cement brands.", image: interior, buttonText: "Shop now", buttonLink: "/materials", active: true },
// //   { id: 2, title: "List your reused materials free", description: "Sell your leftover materials with no listing fee.", image: grey, buttonText: "List now", buttonLink: "/supplier", active: true },
// // ];

// // const initialAnnouncements = [
// //   { id: 1, text: "Free delivery in Lahore on orders above Rs 50,000", active: true },
// //   { id: 2, text: "New: Verified supplier badges", active: true },
// // ];

// // // Featured sections: naam + checked hai ya nahi
// // const initialFeatured = [
// //   { key: "suppliers", title: "Featured Suppliers", items: [{ name: "Sheikh Traders", on: false }, { name: "Brick House", on: true }] },
// //   { key: "newMaterials", title: "Featured New Materials", items: [{ name: "Red Clay Bricks (A-Class)", on: false }, { name: "Grade 60 Steel Saria 12mm", on: true }, { name: "Raw Sand (Truck)", on: false }, { name: "DG Khan Cement OPC", on: true }, { name: "Weather Shield Paint 16L", on: false }] },
// //   { key: "reusedMaterials", title: "Featured Reused Materials", items: [{ name: "Used Wooden Doors (set of 4)", on: false }, { name: "Salvaged Iron Window Grills", on: false }, { name: "Leftover Porcelain Tiles", on: true }] },
// //   { key: "blogs", title: "Featured Blogs", items: [{ name: "How to Choose the Right Cement Grade", on: true }, { name: "Reusing Materials Saves Money and the Planet", on: true }] },
// // ];

// // const emptyItem = { title: "", description: "", image: null, buttonText: "", buttonLink: "", active: true };

// // /* ---------------- Shared styles + helpers ---------------- */

// // const card = "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5";
// // const cardTitle = "text-sm font-semibold uppercase tracking-wide text-[color:var(--primary-text)]";
// // const input =
// //   "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
// // const label = "mb-1.5 block text-xs text-[color:var(--secondary-text)]";
// // const outlineBtn =
// //   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";
// // const yellowBtn =
// //   "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";
// // const iconBtn =
// //   "rounded-md p-1.5 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)] hover:text-[color:var(--primary-text)]";

// // // Sirf active items chuno
// // const onlyActive = (list) => list.reduce((all, i) => (i.active ? [...all, i] : all), []);

// // /* ---------------- Small shared pieces ---------------- */

// // // Image: static import ho ya upload ki hui blob url, dono chalte hain
// // const Img = ({ src, alt }) => <Image src={src} alt={alt} fill unoptimized className="object-cover" />;

// // // On / Off switch
// // const Switch = ({ on, onChange, name }) => (
// //   <button
// //     type="button"
// //     role="switch"
// //     aria-checked={on}
// //     aria-label={name}
// //     onClick={onChange}
// //     className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"}`}
// //   >
// //     <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`} />
// //   </button>
// // );

// // // Overlay + heading + subtitle + close icon: sab modals yahi use karte hain
// // const ModalShell = ({ title, subtitle, size = "max-w-xl", onClose, children }) => (
// //   <div
// //     onClick={onClose}
// //     className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
// //   >
// //     <div
// //       onClick={(e) => e.stopPropagation()}
// //       className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
// //     >
// //       <div className="flex items-start justify-between gap-3">
// //         <div>
// //           <h2 className="text-xl text-[color:var(--primary-text)]">{title}</h2>
// //           {subtitle && <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{subtitle}</p>}
// //         </div>
// //         <button
// //           type="button"
// //           aria-label="Close"
// //           onClick={onClose}
// //           className="text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
// //         >
// //           <X size={18} />
// //         </button>
// //       </div>
// //       {children}
// //     </div>
// //   </div>
// // );

// // /* ---------------- Hero slider (auto-move) ---------------- */

// // const HeroPreview = ({ slides, announcements }) => {
// //   const live = onlyActive(slides);
// //   const strip = onlyActive(announcements).map((a) => a.text).join("  ·  ");
// //   const [index, setIndex] = useState(0);

// //   // Slide number (slides kam ho jayen to bhi sahi rahe)
// //   const current = live.length ? index % live.length : 0;

// //   // Har 4 second baad agli slide (manual click par timer dobara shuru)
// //   useEffect(() => {
// //     if (live.length < 2) return;
// //     const timer = setTimeout(() => setIndex(current + 1), 4000);
// //     return () => clearTimeout(timer);
// //   }, [current, live.length]);

// //   const handlePrev = () => setIndex((current - 1 + live.length) % live.length);
// //   const handleNext = () => setIndex((current + 1) % live.length);

// //   return (
// //     <div className="overflow-hidden rounded-xl bg-[var(--charcoal-black)] shadow-sm">
// //       {/* Announcements ki peeli patti */}
// //       {strip && (
// //         <p className="truncate bg-[var(--primary-yellow)] px-4 py-1.5 text-xs text-[color:var(--charcoal-black)]">
// //           {strip}
// //         </p>
// //       )}

// //       {live.length === 0 ? (
// //         <p className="py-24 text-center text-sm text-[color:var(--border-color)]">No active slides</p>
// //       ) : (
// //         <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
// //           {/* Slides ki patti: translate se pichay move hoti hai */}
// //           <div
// //             className="flex h-full transition-transform duration-700 ease-in-out"
// //             style={{ transform: `translateX(-${current * 100}%)` }}
// //           >
// //             {live.map((s) => (
// //               <div key={s.id} className="relative h-full w-full shrink-0">
// //                 {s.image && <Img src={s.image} alt={s.title} />}
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
// //                 <div className="absolute inset-x-0 bottom-0 px-4 pb-12 text-white sm:px-8">
// //                   <h2 className="max-w-2xl text-xl font-semibold sm:text-3xl">{s.title}</h2>
// //                   <p className="mt-1 max-w-xl text-xs text-white/80 sm:text-sm">{s.description}</p>
// //                   {s.buttonText && (
// //                     <Link
// //                       href={s.buttonLink || "/"}
// //                       className="mt-3 inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:text-sm"
// //                     >
// //                       {s.buttonText}
// //                     </Link>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Arrows + dots */}
// //           <button
// //             type="button"
// //             aria-label="Previous slide"
// //             onClick={handlePrev}
// //             className="absolute bottom-3 left-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
// //           >
// //             <ChevronLeft size={16} />
// //           </button>
// //           <button
// //             type="button"
// //             aria-label="Next slide"
// //             onClick={handleNext}
// //             className="absolute bottom-3 right-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
// //           >
// //             <ChevronRight size={16} />
// //           </button>
// //           <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
// //             {live.map((s, i) => (
// //               <button
// //                 key={s.id}
// //                 type="button"
// //                 aria-label={`Slide ${i + 1}`}
// //                 onClick={() => setIndex(i)}
// //                 className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-[var(--primary-yellow)]" : "w-1.5 bg-white/60"}`}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // /* ---------------- Slides / Banners list (grid-list) ---------------- */

// // const ItemList = ({ kind, items, onToggle, onPreview, onEdit, onDelete }) => (
// //   <div>
// //     {items.length === 0 && <p className="py-4 text-sm text-[color:var(--secondary-text)]">Nothing here yet.</p>}
// //     {items.map((item) => (
// //       <div
// //         key={item.id}
// //         className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-color)] py-3 last:border-b-0"
// //       >
// //         <div className="flex min-w-0 flex-1 items-center gap-3">
// //           <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--off-white-background)] text-[color:var(--secondary-text)]">
// //             {item.image ? <Img src={item.image} alt={item.title} /> : <ImageIcon size={18} />}
// //           </div>
// //           <div className="min-w-0">
// //             <p className="truncate text-sm font-medium text-[color:var(--primary-text)]">{item.title}</p>
// //             <p className="line-clamp-1 text-xs text-[color:var(--secondary-text)]">{item.description}</p>
// //             <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] ${item.active ? "bg-green-50 text-green-700" : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"}`}>
// //               {item.active ? "Active" : "Inactive"}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-1">
// //           <Switch on={item.active} onChange={() => onToggle(kind, item.id)} name={`Toggle ${item.title}`} />
// //           <button type="button" aria-label={`Preview ${item.title}`} onClick={() => onPreview(item)} className={iconBtn}>
// //             <Eye size={16} />
// //           </button>
// //           <button type="button" aria-label={`Edit ${item.title}`} onClick={() => onEdit(kind, item)} className={iconBtn}>
// //             <Pencil size={16} />
// //           </button>
// //           <button type="button" aria-label={`Delete ${item.title}`} onClick={() => onDelete(kind, item)} className={`${iconBtn} text-red-500 hover:text-red-600`}>
// //             <Trash2 size={16} />
// //           </button>
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // );

// // /* ---------------- Featured checkboxes (grid) ---------------- */

// // const FeaturedBox = ({ section, onToggle }) => (
// //   <div className={card}>
// //     <h3 className={cardTitle}>{section.title}</h3>
// //     <div className="mt-3 flex flex-col gap-2">
// //       {section.items.map((item) => (
// //         <label key={item.name} className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
// //           <input
// //             type="checkbox"
// //             checked={item.on}
// //             onChange={() => onToggle(section.key, item.name)}
// //             className="h-4 w-4 accent-[var(--primary-yellow)]"
// //           />
// //           {item.name}
// //         </label>
// //       ))}
// //     </div>
// //   </div>
// // );

// // /* ---------------- Page ---------------- */

// // const CmsPage = () => {
// //   const [slides, setSlides] = useState(initialSlides);
// //   const [banners, setBanners] = useState(initialBanners);
// //   const [announcements, setAnnouncements] = useState(initialAnnouncements);
// //   const [featured, setFeatured] = useState(initialFeatured);
// //   const [newText, setNewText] = useState(""); // nayi announcement ka text
// //   const [about, setAbout] = useState("Helps homeowners and contractors compare and buy new and reused construction materials from verified suppliers.");
// //   const [email, setEmail] = useState("support@buildmart.pk");
// //   const [address, setAddress] = useState("3rd Floor, Arfa Tower, Lahore");

// //   // Modals
// //   const [form, setForm] = useState(null); // { kind, item } : create / edit form
// //   const [formData, setFormData] = useState(emptyItem); // form ke fields
// //   const [preview, setPreview] = useState(null); // preview wala item
// //   const [deleting, setDeleting] = useState(null); // { kind, item }

// //   // kind ("slide" ya "banner") ke hisab se sahi list aur uska setter
// //   const lists = { slide: [slides, setSlides], banner: [banners, setBanners] };
// //   const names = { slide: "Slide", banner: "Banner" };

// //   /* ---- slides + banners ---- */

// //   // Create ya Edit form kholo
// //   const handleOpenForm = (kind, item) => {
// //     setForm({ kind, item });
// //     setFormData(item ? { ...item } : emptyItem);
// //   };

// //   const handleFormChange = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

// //   // File chuni to uska temporary url image bana do
// //   const handleFile = (e) => {
// //     const file = e.target.files[0];
// //     if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
// //   };

// //   const handleSave = () => {
// //     const [list, setList] = lists[form.kind];
// //     setList(
// //       form.item
// //         ? list.map((i) => (i.id === form.item.id ? { ...formData, id: i.id } : i))
// //         : [...list, { ...formData, id: Date.now() }]
// //     );
// //     setForm(null);
// //   };

// //   const handleToggleItem = (kind, id) => {
// //     const [list, setList] = lists[kind];
// //     setList(list.map((i) => (i.id === id ? { ...i, active: !i.active } : i)));
// //   };

// //   const handleDeleteConfirm = () => {
// //     const [list, setList] = lists[deleting.kind];
// //     setList(list.reduce((all, i) => (i.id === deleting.item.id ? all : [...all, i]), []));
// //     setDeleting(null);
// //   };

// //   /* ---- announcements ---- */

// //   const handleAddAnnouncement = () => {
// //     if (newText.trim() === "") return;
// //     setAnnouncements([...announcements, { id: Date.now(), text: newText.trim(), active: true }]);
// //     setNewText("");
// //   };

// //   const handleToggleAnnouncement = (id) => {
// //     setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
// //   };

// //   const handleDeleteAnnouncement = (id) =>
// //     setAnnouncements(announcements.reduce((all, a) => (a.id === id ? all : [...all, a]), []));

// //   // Upar / neeche: pas wali announcement se jagah badal do
// //   const handleMove = (i, step) => {
// //     const j = i + step;
// //     if (j < 0 || j >= announcements.length) return;
// //     setAnnouncements(announcements.map((a, n) => (n === i ? announcements[j] : n === j ? announcements[i] : a)));
// //   };

// //   /* ---- featured ---- */

// //   const handleFeatured = (key, name) => {
// //     setFeatured(
// //       featured.map((s) =>
// //         s.key === key ? { ...s, items: s.items.map((i) => (i.name === name ? { ...i, on: !i.on } : i)) } : s
// //       )
// //     );
// //   };

// //   const handleSaveInfo = () => console.log("Saved", { about, email, address });

// //   return (
// //     <section className="p-4 sm:p-6 lg:p-8">
// //       <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">Homepage / CMS</h1>

// //       {/* Live preview: slider khud aage badhta hai, button par click se us page par jate hain */}
// //       <div className="mt-5">
// //         <HeroPreview slides={slides} announcements={announcements} />
// //       </div>

// //       {/* Promotional banners ka preview */}
// //       <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
// //         {onlyActive(banners).map((b) => (
// //           <div key={b.id}>
// //             <div className="relative h-32 overflow-hidden rounded-xl bg-[var(--off-white-background)] sm:h-40">
// //               {b.image && <Img src={b.image} alt={b.title} />}
// //             </div>
// //             <p className="mt-1.5 text-sm font-semibold text-[color:var(--primary-text)]">{b.title}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Hero slides + Marquee */}
// //       <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
// //         <div className={`${card} lg:col-span-2`}>
// //           <div className="flex items-center justify-between gap-3">
// //             <h3 className={cardTitle}>Hero Slides</h3>
// //             <button type="button" onClick={() => handleOpenForm("slide", null)} className="flex items-center gap-1.5 text-xs text-[color:var(--primary-text)] hover:underline">
// //               <Plus size={14} /> Create New Slide
// //             </button>
// //           </div>
// //           <div className="mt-3">
// //             <ItemList kind="slide" items={slides} onToggle={handleToggleItem} onPreview={setPreview} onEdit={handleOpenForm} onDelete={(kind, item) => setDeleting({ kind, item })} />
// //           </div>
// //         </div>

// //         <div className={card}>
// //           <h3 className={cardTitle}>Marquee / Announcements</h3>
// //           <div className="mt-3">
// //             {announcements.map((a, i) => (
// //               <div key={a.id} className="flex items-center gap-2 border-b border-[color:var(--border-color)] py-3 last:border-b-0">
// //                 <Switch on={a.active} onChange={() => handleToggleAnnouncement(a.id)} name={`Toggle ${a.text}`} />
// //                 <p className="min-w-0 flex-1 text-xs text-[color:var(--primary-text)]">{a.text}</p>
// //                 <button type="button" aria-label="Move up" onClick={() => handleMove(i, -1)} className={iconBtn}><ChevronUp size={14} /></button>
// //                 <button type="button" aria-label="Move down" onClick={() => handleMove(i, 1)} className={iconBtn}><ChevronDown size={14} /></button>
// //                 <button type="button" aria-label="Delete announcement" onClick={() => handleDeleteAnnouncement(a.id)} className={`${iconBtn} text-red-500 hover:text-red-600`}><Trash2 size={14} /></button>
// //               </div>
// //             ))}
// //           </div>
// //           {/* Nayi announcement */}
// //           <div className="mt-3 flex gap-2">
// //             <input
// //               type="text"
// //               value={newText}
// //               onChange={(e) => setNewText(e.target.value)}
// //               placeholder="New announcement..."
// //               aria-label="New announcement"
// //               className={input}
// //             />
// //             <button type="button" onClick={handleAddAnnouncement} className={yellowBtn}>Add</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Promotional banners */}
// //       <div className={`mt-4 ${card}`}>
// //         <div className="flex items-center justify-between gap-3">
// //           <h3 className={cardTitle}>Promotional Banners</h3>
// //           <button type="button" onClick={() => handleOpenForm("banner", null)} className="flex items-center gap-1.5 text-xs text-[color:var(--primary-text)] hover:underline">
// //             <Plus size={14} /> Add Banner
// //           </button>
// //         </div>
// //         <div className="mt-3">
// //           <ItemList kind="banner" items={banners} onToggle={handleToggleItem} onPreview={setPreview} onEdit={handleOpenForm} onDelete={(kind, item) => setDeleting({ kind, item })} />
// //         </div>
// //       </div>

// //       {/* Featured sections */}
// //       <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
// //         {featured.map((section) => (
// //           <FeaturedBox key={section.key} section={section} onToggle={handleFeatured} />
// //         ))}
// //       </div>

// //       {/* About + Contact info */}
// //       <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
// //         <div className={card}>
// //           <h3 className={cardTitle}>About / Pages</h3>
// //           <label htmlFor="bmCmsAbout" className={`mt-3 ${label}`}>About text</label>
// //           <textarea id="bmCmsAbout" rows={4} value={about} onChange={(e) => setAbout(e.target.value)} className={`${input} resize-y`} />
// //         </div>

// //         <div className={card}>
// //           <h3 className={cardTitle}>Contact Info (Public)</h3>
// //           <label htmlFor="bmCmsEmail" className={`mt-3 ${label}`}>Email</label>
// //           <input id="bmCmsEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
// //           <label htmlFor="bmCmsAddress" className={`mt-3 ${label}`}>Address</label>
// //           <input id="bmCmsAddress" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={input} />
// //           <div className="mt-4 flex justify-end">
// //             <button type="button" onClick={handleSaveInfo} className={yellowBtn}>Save</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ---------- Create / Edit form (slide ya banner) ---------- */}
// //       {form && (
// //         <ModalShell
// //           title={`${form.item ? "Edit" : "Create New"} ${names[form.kind]}`}
// //           subtitle={form.kind === "slide" ? "Hero slide details" : "Promotion banner details"}
// //           onClose={() => setForm(null)}
// //         >
// //           <div className="mt-5">
// //             <label htmlFor="bmCmsTitle" className={label}>Title / Heading</label>
// //             <input id="bmCmsTitle" type="text" autoFocus value={formData.title} onChange={handleFormChange("title")} className={input} />
// //           </div>

// //           <div className="mt-4">
// //             <label htmlFor="bmCmsDesc" className={label}>Description / Text</label>
// //             <textarea id="bmCmsDesc" rows={3} value={formData.description} onChange={handleFormChange("description")} className={`${input} resize-y`} />
// //           </div>

// //           <div className="mt-4">
// //             <label htmlFor="bmCmsFile" className={label}>Image File Upload</label>
// //             <input id="bmCmsFile" type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-[color:var(--primary-text)]" />
// //             {formData.image && (
// //               <div className="relative mt-2 h-20 w-32 overflow-hidden rounded-md">
// //                 <Img src={formData.image} alt="Selected" />
// //               </div>
// //             )}
// //           </div>

// //           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
// //             <div>
// //               <label htmlFor="bmCmsBtnText" className={label}>Button Text</label>
// //               <input id="bmCmsBtnText" type="text" value={formData.buttonText} onChange={handleFormChange("buttonText")} className={input} />
// //             </div>
// //             <div>
// //               <label htmlFor="bmCmsBtnLink" className={label}>Button Link</label>
// //               <input id="bmCmsBtnLink" type="text" placeholder="/materials" value={formData.buttonLink} onChange={handleFormChange("buttonLink")} className={input} />
// //             </div>
// //           </div>

// //           <div className="mt-4 flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
// //             <Switch on={formData.active} onChange={() => setFormData({ ...formData, active: !formData.active })} name="Active" />
// //             Active
// //           </div>

// //           <div className="mt-6 flex justify-end gap-3">
// //             <button type="button" onClick={() => setForm(null)} className={outlineBtn}>Cancel</button>
// //             <button type="button" disabled={formData.title.trim() === ""} onClick={handleSave} className={yellowBtn}>
// //               Save {names[form.kind]}
// //             </button>
// //           </div>
// //         </ModalShell>
// //       )}

// //       {/* ---------- Preview ---------- */}
// //       {preview && (
// //         <ModalShell title="Slide Preview" subtitle="Selected slide" onClose={() => setPreview(null)}>
// //           <div className="relative mt-4 aspect-video overflow-hidden rounded-md bg-[var(--off-white-background)]">
// //             {preview.image && <Img src={preview.image} alt={preview.title} />}
// //           </div>
// //           <h3 className="mt-3 text-base font-semibold text-[color:var(--primary-text)]">{preview.title}</h3>
// //           <p className="mt-1 text-sm text-[color:var(--secondary-text)]">{preview.description}</p>
// //           {preview.buttonText && <p className="mt-2 text-sm text-[color:var(--primary-text)]">{preview.buttonText}</p>}
// //           <p className="mt-1 text-xs text-[color:var(--secondary-text)]">{preview.active ? "Active" : "Inactive"}</p>
// //         </ModalShell>
// //       )}

// //       {/* ---------- Delete confirmation ---------- */}
// //       {deleting && (
// //         <ModalShell title={`Delete ${names[deleting.kind]}?`} size="max-w-md" onClose={() => setDeleting(null)}>
// //           <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
// //             Delete &quot;{deleting.item.title}&quot;. This cannot be undone.
// //           </p>
// //           <div className="mt-5 flex justify-end gap-3">
// //             <button type="button" onClick={() => setDeleting(null)} className={outlineBtn}>Cancel</button>
// //             <button type="button" onClick={handleDeleteConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
// //               Confirm Delete
// //             </button>
// //           </div>
// //         </ModalShell>
// //       )}
// //     </section>
// //   );
// // };

// // export default CmsPage;



// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
//   Eye, Pencil, Trash2, Plus, X, Image as ImageIcon,
//   Search, ArrowUpDown, MoreVertical, Send, EyeOff, Upload,
// } from "lucide-react";

// // Hero images
// import exterior from "../../../assets/images/guest/hero/exterior.jpeg";
// import interior from "../../../assets/images/guest/hero/interior.jpeg";
// import grey from "../../../assets/images/guest/hero/grey.jpeg";

// /* ---------------- Initial Data ---------------- */

// const initialSlides = [
//   {
//     id: 1,
//     title: "Build smarter. Compare every material.",
//     description: "New and reused construction materials from verified suppliers across Pakistan.",
//     image: exterior,
//     buttonText: "Browse Materials",
//     buttonLink: "/materials",
//     active: true,
//   },
//   {
//     id: 2,
//     title: "Materials for your next build",
//     description: "Cement, steel and bricks from verified local suppliers.",
//     image: interior,
//     buttonText: "Explore Suppliers",
//     buttonLink: "/suppliers",
//     active: true,
//   },
//   {
//     id: 3,
//     title: "Give materials a second life",
//     description: "Discover reusable doors, tiles and construction materials.",
//     image: grey,
//     buttonText: "Find Reused Materials",
//     buttonLink: "/materials",
//     active: true,
//   },
// ];

// const initialBanners = [
//   {
//     id: 1,
//     title: "10% off Cement this week",
//     description: "Limited time offer on all cement brands.",
//     image: interior,
//     buttonText: "Shop now",
//     buttonLink: "/materials",
//     active: true,
//   },
//   {
//     id: 2,
//     title: "List your reused materials free",
//     description: "Sell your leftover materials with no listing fee.",
//     image: grey,
//     buttonText: "List now",
//     buttonLink: "/supplier",
//     active: true,
//   },
// ];

// const initialAnnouncements = [
//   { id: 1, text: "Free delivery in Lahore on orders above Rs 50,000", active: true },
//   { id: 2, text: "New: Verified supplier badges", active: true },
// ];

// const initialBlogs = [
//   {
//     id: 1,
//     title: "How to Choose the Right Cement Grade",
//     author: "BuildMart Team",
//     slug: "how-to-choose-the-right-cement-grade",
//     keywords: "cement, grade",
//     status: "Published",
//     date: "2026-10-06",
//     image: "",
//     imageName: "",
//     content: "OPC aur PPC cement ka farq, kis kaam ke liye kaun sa grade behtar hai aur kharidte waqt kin baton ka khayal rakhein.",
//   },
//   {
//     id: 2,
//     title: "Reusing Materials Saves Money and the Planet",
//     author: "Maria Saeed",
//     slug: "reusing-materials-saves-money-and-the-planet",
//     keywords: "reuse, savings",
//     status: "Published",
//     date: "2026-10-13",
//     image: "",
//     imageName: "",
//     content: "Purane darwaze, khirkiyan aur tiles dobara istemal karne se kharcha bhi kam hota hai aur mahol ko bhi faida hota hai.",
//   },
//   {
//     id: 3,
//     title: "Steel Prices: Q4 2026 Outlook",
//     author: "BuildMart Team",
//     slug: "steel-prices-q4-2026-outlook",
//     keywords: "steel, prices",
//     status: "Draft",
//     date: "2026-10-18",
//     image: "",
//     imageName: "",
//     content: "Saria ki qeematon ka is quarter ka jaiza aur aane wale mahino ka andaza.",
//   },
// ];

// // Screenshot mein nazar aane wale FAQs
// const initialFaqs = [
//   {
//     id: 1,
//     question: "What is BuildMart Gujranwala and how does it work?",
//     answer: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place.",
//     active: true,
//   },
//   { id: 2, question: "Is BuildMart free to use?", answer: "", active: true },
//   { id: 3, question: "How are the suppliers registered?", answer: "", active: true },
//   { id: 4, question: "How do I contact a supplier?", answer: "", active: true },
//   { id: 5, question: "Are the prices shown live market rates?", answer: "", active: true },
// ];

// const emptyItem = {
//   title: "",
//   description: "",
//   image: null,
//   buttonText: "",
//   buttonLink: "",
//   active: true,
// };

// const emptyBlog = {
//   title: "",
//   author: "",
//   slug: "",
//   keywords: "",
//   content: "",
//   status: "Draft",
//   image: "",
//   imageName: "",
// };

// const emptyFaq = {
//   question: "",
//   answer: "",
//   active: true,
// };

// /* ---------------- Shared Styles ---------------- */

// const card =
//   "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5";

// const cardTitle =
//   "text-sm font-semibold uppercase tracking-wide text-[color:var(--primary-text)]";

// const input =
//   "w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";

// const label = "mb-1.5 block text-xs text-[color:var(--secondary-text)]";

// const outlineBtn =
//   "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// const yellowBtn =
//   "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";

// const iconBtn =
//   "rounded-md p-1.5 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)] hover:text-[color:var(--primary-text)]";

// const menuItem =
//   "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

// const headings = [
//   "Title", "Author", "Slug", "Keywords",
//   "Featured Image", "Status", "Updated Date", "Actions",
// ];

// const statusOptions = ["All", "Published", "Draft"];
// const perPage = 8;

// const badgeColors = {
//   Published: "bg-green-50 text-green-700 ring-green-200",
//   Draft: "bg-orange-50 text-orange-600 ring-orange-200",
// };

// const onlyActive = (items) => items.filter((item) => item.active);

// const today = () => new Date().toISOString().slice(0, 10);

// const slugify = (text) =>
//   text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// /* ---------------- Shared Components ---------------- */

// const Switch = ({ on, onChange, name }) => (
//   <button
//     type="button"
//     role="switch"
//     aria-checked={on}
//     aria-label={name}
//     onClick={onChange}
//     className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
//       on ? "bg-[var(--primary-yellow)]" : "bg-[var(--border-color)]"
//     }`}
//   >
//     <span
//       className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
//         on ? "translate-x-4" : ""
//       }`}
//     />
//   </button>
// );

// const Img = ({ src, alt }) => (
//   <Image src={src} alt={alt} fill unoptimized className="object-cover" />
// );

// const ModalShell = ({ title, size = "max-w-xl", onClose, children }) => (
//   <div
//     onClick={onClose}
//     className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
//     >
//       <div className="flex items-center justify-between gap-3">
//         <h2 className="text-xl text-[color:var(--primary-text)]">{title}</h2>
//         <button type="button" onClick={onClose} aria-label="Close">
//           <X size={18} />
//         </button>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// const Thumb = ({ image, title, className = "h-12 w-20" }) => (
//   <span
//     className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--charcoal-black)] text-white ${className}`}
//   >
//     {image ? (
//       <Image src={image} alt={title || "Image"} fill unoptimized className="object-cover" />
//     ) : (
//       <ImageIcon size={20} />
//     )}
//   </span>
// );

// /* ---------------- Hero Preview ---------------- */

// const HeroPreview = ({ slides, announcements }) => {
//   const live = onlyActive(slides);
//   const strip = onlyActive(announcements).map((a) => a.text).join("  ·  ");
//   const [index, setIndex] = useState(0);
//   const current = live.length ? index % live.length : 0;

//   useEffect(() => {
//     if (live.length < 2) return;
//     const timer = setTimeout(() => setIndex(current + 1), 4000);
//     return () => clearTimeout(timer);
//   }, [current, live.length]);

//   const handlePrev = () => {
//     setIndex((current - 1 + live.length) % live.length);
//   };

//   const handleNext = () => {
//     setIndex((current + 1) % live.length);
//   };

//   return (
//     <div className="overflow-hidden rounded-xl bg-[var(--charcoal-black)] shadow-sm">
//       {strip && (
//         <p className="truncate bg-[var(--primary-yellow)] px-4 py-1.5 text-xs text-black">
//           {strip}
//         </p>
//       )}

//       {!live.length ? (
//         <p className="py-24 text-center text-sm text-white">No active slides</p>
//       ) : (
//         <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
//           <div
//             className="flex h-full transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${current * 100}%)` }}
//           >
//             {live.map((s) => (
//               <div key={s.id} className="relative h-full w-full shrink-0">
//                 {s.image && <Img src={s.image} alt={s.title} />}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
//                 <div className="absolute inset-x-0 bottom-0 px-4 pb-12 text-white sm:px-8">
//                   <h2 className="max-w-2xl text-xl font-semibold sm:text-3xl">
//                     {s.title}
//                   </h2>
//                   <p className="mt-1 max-w-xl text-xs text-white/80 sm:text-sm">
//                     {s.description}
//                   </p>
//                   {s.buttonText && (
//                     <Link
//                       href={s.buttonLink || "/"}
//                       className="mt-3 inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs text-black sm:text-sm"
//                     >
//                       {s.buttonText}
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             type="button"
//             aria-label="Previous slide"
//             onClick={handlePrev}
//             className="absolute bottom-3 left-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-black"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           <button
//             type="button"
//             aria-label="Next slide"
//             onClick={handleNext}
//             className="absolute bottom-3 right-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-black"
//           >
//             <ChevronRight size={16} />
//           </button>

//           <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
//             {live.map((s, i) => (
//               <button
//                 key={s.id}
//                 type="button"
//                 aria-label={`Slide ${i + 1}`}
//                 onClick={() => setIndex(i)}
//                 className={`h-1.5 rounded-full ${
//                   i === current ? "w-6 bg-[var(--primary-yellow)]" : "w-1.5 bg-white/60"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ---------------- Slides / Banners List ---------------- */

// const ItemList = ({ kind, items, onToggle, onPreview, onEdit, onDelete }) => (
//   <div>
//     {items.length === 0 && (
//       <p className="py-4 text-sm text-[color:var(--secondary-text)]">Nothing here yet.</p>
//     )}

//     {items.map((item) => (
//       <div
//         key={item.id}
//         className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-color)] py-3 last:border-b-0"
//       >
//         <div className="flex min-w-0 flex-1 items-center gap-3">
//           <Thumb image={item.image} title={item.title} />
//           <div className="min-w-0">
//             <p className="truncate text-sm font-medium text-[color:var(--primary-text)]">
//               {item.title}
//             </p>
//             <p className="line-clamp-1 text-xs text-[color:var(--secondary-text)]">
//               {item.description}
//             </p>
//             <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] ${
//               item.active ? "bg-green-50 text-green-700" : "bg-[var(--off-white-background)]"
//             }`}>
//               {item.active ? "Active" : "Inactive"}
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <Switch
//             on={item.active}
//             onChange={() => onToggle(kind, item.id)}
//             name={`Toggle ${item.title}`}
//           />
//           <button type="button" onClick={() => onPreview(item)} className={iconBtn}>
//             <Eye size={16} />
//           </button>
//           <button type="button" onClick={() => onEdit(kind, item)} className={iconBtn}>
//             <Pencil size={16} />
//           </button>
//           <button
//             type="button"
//             onClick={() => onDelete(kind, item)}
//             className={`${iconBtn} text-red-500`}
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// /* ---------------- Blog Table ---------------- */

// const BlogsTable = ({ rows, onMenu }) => (
//   <div className="overflow-x-auto">
//     <table className="w-full min-w-[1000px] text-left text-sm">
//       <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
//         <tr>
//           {headings.map((h) => (
//             <th key={h} className="px-4 py-3 font-medium">
//               <span className="inline-flex items-center gap-1">
//                 {h}
//                 {["Title", "Updated Date"].includes(h) && <ArrowUpDown size={12} />}
//               </span>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((b) => (
//           <tr key={b.id} className="border-t border-[color:var(--border-color)]">
//             <td className="max-w-[260px] px-4 py-3 text-[color:var(--primary-text)]">{b.title}</td>
//             <td className="px-4 py-3">{b.author}</td>
//             <td className="max-w-[240px] break-words px-4 py-3">{b.slug}</td>
//             <td className="px-4 py-3">{b.keywords || "—"}</td>
//             <td className="px-4 py-3">
//               <Thumb image={b.image} title={b.title} />
//             </td>
//             <td className="px-4 py-3">
//               <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[b.status]}`}>
//                 {b.status}
//               </span>
//             </td>
//             <td className="px-4 py-3">{b.date}</td>
//             <td className="px-4 py-3">
//               <button
//                 type="button"
//                 onClick={(e) => onMenu(e, b)}
//                 className="rounded-md border border-[color:var(--border-color)] p-1.5"
//                 aria-label={`Actions for ${b.title}`}
//               >
//                 <MoreVertical size={16} />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// /* ---------------- CMS Page ---------------- */

// export default function CmsPage() {
//   const [activeTab, setActiveTab] = useState("Hero");

//   const tabs = [
//     "Hero",
//     "Banners",
//     "Marquee",
//     "About",
//     "Contact",
//     "Blogs",
//     "Frequently Asked Questions",
//   ];

//   // Hero, banners, marquee
//   const [slides, setSlides] = useState(initialSlides);
//   const [banners, setBanners] = useState(initialBanners);
//   const [announcements, setAnnouncements] = useState(initialAnnouncements);
//   const [newText, setNewText] = useState("");

//   // About and contact
//   const [about, setAbout] = useState(
//     "Helps homeowners and contractors compare and buy new and reused construction materials from verified suppliers."
//   );
//   const [email, setEmail] = useState("support@buildmart.pk");
//   const [address, setAddress] = useState("3rd Floor, Arfa Tower, Lahore");

//   // Hero / banner form and preview
//   const [form, setForm] = useState(null);
//   const [formData, setFormData] = useState(emptyItem);
//   const [preview, setPreview] = useState(null);
//   const [deleting, setDeleting] = useState(null);

//   const lists = {
//     slide: [slides, setSlides],
//     banner: [banners, setBanners],
//   };

//   const names = {
//     slide: "Slide",
//     banner: "Banner",
//   };

//   const handleOpenForm = (kind, item = null) => {
//     setForm({ kind, item });
//     setFormData(item ? { ...item } : { ...emptyItem });
//   };

//   const handleFormChange = (key) => (e) => {
//     setFormData({ ...formData, [key]: e.target.value });
//   };

//   const handleFile = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData({ ...formData, image: URL.createObjectURL(file) });
//     }
//   };

//   const handleSaveItem = () => {
//     if (!form || !formData.title.trim()) return;

//     const [list, setList] = lists[form.kind];

//     setList(
//       form.item
//         ? list.map((item) =>
//             item.id === form.item.id ? { ...formData, id: item.id } : item
//           )
//         : [...list, { ...formData, id: Date.now() }]
//     );

//     setForm(null);
//   };

//   const handleToggleItem = (kind, id) => {
//     const [list, setList] = lists[kind];
//     setList(list.map((item) =>
//       item.id === id ? { ...item, active: !item.active } : item
//     ));
//   };

//   const handleDeleteItem = () => {
//     if (!deleting) return;
//     const [list, setList] = lists[deleting.kind];
//     setList(list.filter((item) => item.id !== deleting.item.id));
//     setDeleting(null);
//   };

//   // Marquee
//   const handleAddAnnouncement = () => {
//     if (!newText.trim()) return;
//     setAnnouncements([
//       ...announcements,
//       { id: Date.now(), text: newText.trim(), active: true },
//     ]);
//     setNewText("");
//   };

//   const handleToggleAnnouncement = (id) => {
//     setAnnouncements(announcements.map((a) =>
//       a.id === id ? { ...a, active: !a.active } : a
//     ));
//   };

//   const handleMoveAnnouncement = (index, step) => {
//     const nextIndex = index + step;
//     if (nextIndex < 0 || nextIndex >= announcements.length) return;

//     const updated = [...announcements];
//     [updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]];
//     setAnnouncements(updated);
//   };

//   // Blogs
//   const [blogs, setBlogs] = useState(initialBlogs);
//   const [featuredBlogs, setFeaturedBlogs] = useState([
//     "How to Choose the Right Cement Grade",
//     "Reusing Materials Saves Money and the Planet",
//   ]);

//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);
//   const [blogMenu, setBlogMenu] = useState(null);
//   const [viewId, setViewId] = useState(null);
//   const [deleteBlogId, setDeleteBlogId] = useState(null);
//   const [blogFormOpen, setBlogFormOpen] = useState(false);
//   const [editBlogId, setEditBlogId] = useState(null);
//   const [blogForm, setBlogForm] = useState(emptyBlog);
//   const [slugEdited, setSlugEdited] = useState(false);

//   const handleBlogSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleBlogStatus = (e) => {
//     setStatus(e.target.value);
//     setPage(1);
//   };

//   const handleBlogMenu = (e, blog) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setBlogMenu({
//       blog,
//       top: rect.bottom + 4,
//       left: Math.max(8, rect.right - 160),
//     });
//   };

//   const openAddBlog = () => {
//     setBlogForm({ ...emptyBlog });
//     setSlugEdited(false);
//     setEditBlogId(null);
//     setBlogFormOpen(true);
//   };

//   const openEditBlog = () => {
//     const b = blogMenu.blog;
//     setBlogForm({
//       title: b.title,
//       author: b.author,
//       slug: b.slug,
//       keywords: b.keywords,
//       content: b.content,
//       status: b.status,
//       image: b.image,
//       imageName: b.imageName,
//     });
//     setSlugEdited(true);
//     setEditBlogId(b.id);
//     setBlogFormOpen(true);
//     setBlogMenu(null);
//   };

//   const handleBlogTitle = (e) => {
//     const title = e.target.value;
//     setBlogForm({
//       ...blogForm,
//       title,
//       slug: slugEdited ? blogForm.slug : slugify(title),
//     });
//   };

//   const handleBlogSlug = (e) => {
//     setSlugEdited(true);
//     setBlogForm({ ...blogForm, slug: slugify(e.target.value) });
//   };

//   const handleBlogImage = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setBlogForm({
//       ...blogForm,
//       image: URL.createObjectURL(file),
//       imageName: file.name,
//     });
//   };

//   const saveBlog = () => {
//     if (!blogForm.title.trim() || !blogForm.author.trim()) return;

//     const values = {
//       ...blogForm,
//       title: blogForm.title.trim(),
//       author: blogForm.author.trim(),
//       slug: blogForm.slug.trim() || slugify(blogForm.title),
//       keywords: blogForm.keywords.trim(),
//       content: blogForm.content.trim(),
//       date: today(),
//     };

//     if (editBlogId === null) {
//       setBlogs([{ id: Date.now(), ...values }, ...blogs]);
//     } else {
//       setBlogs(blogs.map((b) =>
//         b.id === editBlogId ? { ...b, ...values } : b
//       ));
//     }

//     setBlogFormOpen(false);
//   };

//   const toggleBlogStatus = () => {
//     const blog = blogMenu.blog;
//     const nextStatus = blog.status === "Published" ? "Draft" : "Published";

//     setBlogs(blogs.map((b) =>
//       b.id === blog.id ? { ...b, status: nextStatus, date: today() } : b
//     ));

//     setBlogMenu(null);
//   };

//   const deleteBlog = () => {
//     setBlogs(blogs.filter((b) => b.id !== deleteBlogId));
//     setFeaturedBlogs(featuredBlogs.filter((title) =>
//       blogs.find((b) => b.id === deleteBlogId)?.title !== title
//     ));
//     setDeleteBlogId(null);
//   };

//   const visibleBlogs = blogs.filter((b) => {
//     const matchSearch = `${b.title} ${b.author} ${b.slug}`
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchStatus = status === "All" || b.status === status;
//     return matchSearch && matchStatus;
//   });

//   const totalPages = Math.max(1, Math.ceil(visibleBlogs.length / perPage));
//   const currentPage = Math.min(page, totalPages);
//   const blogRows = visibleBlogs.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );

//   const viewingBlog = blogs.find((b) => b.id === viewId);
//   const deletingBlog = blogs.find((b) => b.id === deleteBlogId);

//   // FAQs
//   const [faqs, setFaqs] = useState(initialFaqs);
//   const [faqFormOpen, setFaqFormOpen] = useState(false);
//   const [faqForm, setFaqForm] = useState(emptyFaq);
//   const [editFaqId, setEditFaqId] = useState(null);
//   const [deleteFaqId, setDeleteFaqId] = useState(null);

//   const openAddFaq = () => {
//     setFaqForm({ ...emptyFaq });
//     setEditFaqId(null);
//     setFaqFormOpen(true);
//   };

//   const openEditFaq = (faq) => {
//     setFaqForm({ ...faq });
//     setEditFaqId(faq.id);
//     setFaqFormOpen(true);
//   };

//   const saveFaq = () => {
//     if (!faqForm.question.trim()) return;

//     if (editFaqId === null) {
//       setFaqs([...faqs, { ...faqForm, id: Date.now() }]);
//     } else {
//       setFaqs(faqs.map((faq) =>
//         faq.id === editFaqId ? { ...faqForm, id: faq.id } : faq
//       ));
//     }

//     setFaqFormOpen(false);
//   };

//   const deleteFaq = () => {
//     setFaqs(faqs.filter((faq) => faq.id !== deleteFaqId));
//     setDeleteFaqId(null);
//   };

//   const toggleFeaturedBlog = (title) => {
//     setFeaturedBlogs((prev) =>
//       prev.includes(title)
//         ? prev.filter((item) => item !== title)
//         : [...prev, title]
//     );
//   };

//   return (
//     <section className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl leading-tight text-[color:var(--primary-text)] sm:text-4xl">
//         Homepage / CMS
//       </h1>

//       {/* CMS Tabs */}
//       <div className="mt-6 flex gap-2 overflow-x-auto border-b border-[color:var(--border-color)] pb-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             type="button"
//             onClick={() => setActiveTab(tab)}
//             className={`shrink-0 rounded-md px-4 py-2 text-sm transition ${
//               activeTab === tab
//                 ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
//                 : "text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ================= HERO TAB ================= */}
//       {activeTab === "Hero" && (
//         <div className="mt-5">
//           <h2 className={cardTitle}>Hero Preview</h2>

//           <div className="mt-3">
//             <HeroPreview slides={slides} announcements={announcements} />
//           </div>

//           <div className={`mt-5 ${card}`}>
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <h3 className={cardTitle}>Hero Slides</h3>
//               <button
//                 type="button"
//                 onClick={() => handleOpenForm("slide")}
//                 className={yellowBtn}
//               >
//                 <Plus size={15} className="mr-1 inline" />
//                 Create New Slide
//               </button>
//             </div>

//             <div className="mt-3">
//               <ItemList
//                 kind="slide"
//                 items={slides}
//                 onToggle={handleToggleItem}
//                 onPreview={setPreview}
//                 onEdit={handleOpenForm}
//                 onDelete={(kind, item) => setDeleting({ kind, item })}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= BANNERS TAB ================= */}
//       {activeTab === "Banners" && (
//         <div className="mt-5">
//           <div className={card}>
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <h2 className={cardTitle}>Promotional Banners</h2>
//               <button
//                 type="button"
//                 onClick={() => handleOpenForm("banner")}
//                 className={yellowBtn}
//               >
//                 <Plus size={15} className="mr-1 inline" />
//                 Add Banner
//               </button>
//             </div>

//             <div className="mt-3">
//               <ItemList
//                 kind="banner"
//                 items={banners}
//                 onToggle={handleToggleItem}
//                 onPreview={setPreview}
//                 onEdit={handleOpenForm}
//                 onDelete={(kind, item) => setDeleting({ kind, item })}
//               />
//             </div>
//           </div>

//           <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {onlyActive(banners).map((b) => (
//               <div key={b.id} className={card}>
//                 <div className="relative h-40 overflow-hidden rounded-lg">
//                   {b.image && <Img src={b.image} alt={b.title} />}
//                 </div>
//                 <p className="mt-2 text-sm font-semibold text-[color:var(--primary-text)]">
//                   {b.title}
//                 </p>
//                 <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
//                   {b.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ================= MARQUEE TAB ================= */}
//       {activeTab === "Marquee" && (
//         <div className={`mt-5 ${card}`}>
//           <h2 className={cardTitle}>Marquee / Announcements</h2>

//           <div className="mt-3">
//             {announcements.map((a, i) => (
//               <div
//                 key={a.id}
//                 className="flex flex-wrap items-center gap-2 border-b border-[color:var(--border-color)] py-3 last:border-b-0"
//               >
//                 <Switch
//                   on={a.active}
//                   onChange={() => handleToggleAnnouncement(a.id)}
//                   name={`Toggle ${a.text}`}
//                 />

//                 <p className="min-w-0 flex-1 text-sm text-[color:var(--primary-text)]">
//                   {a.text}
//                 </p>

//                 <button
//                   type="button"
//                   aria-label="Move up"
//                   onClick={() => handleMoveAnnouncement(i, -1)}
//                   className={iconBtn}
//                 >
//                   <ChevronUp size={15} />
//                 </button>

//                 <button
//                   type="button"
//                   aria-label="Move down"
//                   onClick={() => handleMoveAnnouncement(i, 1)}
//                   className={iconBtn}
//                 >
//                   <ChevronDown size={15} />
//                 </button>

//                 <button
//                   type="button"
//                   aria-label="Delete announcement"
//                   onClick={() => setAnnouncements(announcements.filter((x) => x.id !== a.id))}
//                   className={`${iconBtn} text-red-500`}
//                 >
//                   <Trash2 size={15} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 flex flex-col gap-2 sm:flex-row">
//             <input
//               type="text"
//               value={newText}
//               onChange={(e) => setNewText(e.target.value)}
//               placeholder="New announcement..."
//               className={input}
//             />
//             <button type="button" onClick={handleAddAnnouncement} className={yellowBtn}>
//               Add
//             </button>
//           </div>

//           <div className="mt-5 rounded-md bg-[var(--primary-yellow)] p-3 text-sm text-[color:var(--charcoal-black)]">
//             {onlyActive(announcements).map((a) => a.text).join("  ·  ") || "No active announcements"}
//           </div>
//         </div>
//       )}

//       {/* ================= ABOUT TAB ================= */}
//       {activeTab === "About" && (
//         <div className={`mt-5 ${card}`}>
//           <h2 className={cardTitle}>About Content</h2>

//           <label className={`mt-4 ${label}`} htmlFor="cmsAbout">
//             About text
//           </label>

//           <textarea
//             id="cmsAbout"
//             rows={7}
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//             className={`${input} resize-y`}
//           />

//           <div className="mt-4 flex justify-end">
//             <button
//               type="button"
//               onClick={() => console.log("About saved:", about)}
//               className={yellowBtn}
//             >
//               Save About
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= CONTACT TAB ================= */}
//       {activeTab === "Contact" && (
//         <div className={`mt-5 ${card}`}>
//           <h2 className={cardTitle}>Contact Information</h2>

//           <label className={`mt-4 ${label}`} htmlFor="cmsEmail">Email</label>
//           <input
//             id="cmsEmail"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={input}
//           />

//           <label className={`mt-4 ${label}`} htmlFor="cmsAddress">Address</label>
//           <input
//             id="cmsAddress"
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className={input}
//           />

//           <div className="mt-4 flex justify-end">
//             <button
//               type="button"
//               onClick={() => console.log("Contact saved:", { email, address })}
//               className={yellowBtn}
//             >
//               Save Contact
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= BLOGS TAB ================= */}
//       {activeTab === "Blogs" && (
//         <div className="mt-5">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <h2 className="text-2xl text-[color:var(--primary-text)]">Blogs Management</h2>
//             <button type="button" onClick={openAddBlog} className={yellowBtn}>
//               <Plus size={16} className="mr-1 inline" />
//               Add Blog
//             </button>
//           </div>

//           <div className="mt-5 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
//             <div className="flex flex-col gap-3 p-3 sm:flex-row">
//               <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
//                 <Search size={16} className="text-[color:var(--secondary-text)]" />
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={handleBlogSearch}
//                   placeholder="Search..."
//                   className="w-full bg-transparent text-sm outline-none"
//                 />
//               </div>

//               <select
//                 value={status}
//                 onChange={handleBlogStatus}
//                 className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm sm:w-44"
//               >
//                 {statusOptions.map((s) => <option key={s}>{s}</option>)}
//               </select>
//             </div>

//             <BlogsTable rows={blogRows} onMenu={handleBlogMenu} />

//             <div className="flex items-center justify-between border-t border-[color:var(--border-color)] px-4 py-3 text-xs text-[color:var(--secondary-text)]">
//               <span>{visibleBlogs.length} records</span>
//               <div className="flex items-center gap-3">
//                 <button
//                   type="button"
//                   disabled={currentPage === 1}
//                   onClick={() => setPage(currentPage - 1)}
//                   className="disabled:opacity-30"
//                 >
//                   <ChevronLeft size={16} />
//                 </button>
//                 <span>Page {currentPage} / {totalPages}</span>
//                 <button
//                   type="button"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setPage(currentPage + 1)}
//                   className="disabled:opacity-30"
//                 >
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Featured Blogs isi Blogs tab mein */}
//           <div className={`mt-5 ${card}`}>
//             <h3 className={cardTitle}>Featured Blogs</h3>
//             <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
//               Select the blogs you want to show as featured on the guest page.
//             </p>

//             <div className="mt-4 flex flex-col gap-3">
//               {blogs.map((blog) => (
//                 <label
//                   key={blog.id}
//                   className="flex items-center gap-2 text-sm text-[color:var(--primary-text)]"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={featuredBlogs.includes(blog.title)}
//                     onChange={() => toggleFeaturedBlog(blog.title)}
//                     className="h-4 w-4 accent-[var(--primary-yellow)]"
//                   />
//                   {blog.title}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= FAQ TAB ================= */}
//       {activeTab === "Frequently Asked Questions" && (
//         <div className="mt-5">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h2 className="text-2xl text-[color:var(--primary-text)]">
//                 Frequently Asked Questions
//               </h2>
//               <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
//                 Manage the questions and answers shown on the guest page.
//               </p>
//             </div>

//             <button type="button" onClick={openAddFaq} className={yellowBtn}>
//               <Plus size={16} className="mr-1 inline" />
//               Add FAQ
//             </button>
//           </div>

//           <div className="mt-5 flex flex-col gap-3">
//             {faqs.map((faq) => (
//               <div key={faq.id} className={card}>
//                 <div className="flex flex-wrap items-start justify-between gap-3">
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-semibold text-[color:var(--primary-text)]">
//                       {faq.question}
//                     </p>
//                     <p className="mt-2 whitespace-pre-line text-sm text-[color:var(--secondary-text)]">
//                       {faq.answer || "Answer not added yet."}
//                     </p>
//                     <span className={`mt-3 inline-block rounded px-2 py-1 text-xs ${
//                       faq.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
//                     }`}>
//                       {faq.active ? "Active" : "Inactive"}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Switch
//                       on={faq.active}
//                       onChange={() => setFaqs(faqs.map((f) =>
//                         f.id === faq.id ? { ...f, active: !f.active } : f
//                       ))}
//                       name={`Toggle ${faq.question}`}
//                     />

//                     <button
//                       type="button"
//                       onClick={() => openEditFaq(faq)}
//                       className={iconBtn}
//                       aria-label="Edit FAQ"
//                     >
//                       <Pencil size={16} />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => setDeleteFaqId(faq.id)}
//                       className={`${iconBtn} text-red-500`}
//                       aria-label="Delete FAQ"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ================= SLIDE / BANNER FORM ================= */}
//       {form && (
//         <ModalShell
//           title={`${form.item ? "Edit" : "Create New"} ${names[form.kind]}`}
//           onClose={() => setForm(null)}
//         >
//           <div className="mt-5">
//             <label className={label}>Title / Heading</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={handleFormChange("title")}
//               className={input}
//             />
//           </div>

//           <div className="mt-4">
//             <label className={label}>Description / Text</label>
//             <textarea
//               rows={3}
//               value={formData.description}
//               onChange={handleFormChange("description")}
//               className={`${input} resize-y`}
//             />
//           </div>

//           <div className="mt-4">
//             <label className={label}>Image File Upload</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFile}
//               className="block w-full text-sm"
//             />
//             {formData.image && (
//               <div className="relative mt-2 h-20 w-32 overflow-hidden rounded-md">
//                 <Img src={formData.image} alt="Selected" />
//               </div>
//             )}
//           </div>

//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className={label}>Button Text</label>
//               <input
//                 type="text"
//                 value={formData.buttonText}
//                 onChange={handleFormChange("buttonText")}
//                 className={input}
//               />
//             </div>
//             <div>
//               <label className={label}>Button Link</label>
//               <input
//                 type="text"
//                 placeholder="/materials"
//                 value={formData.buttonLink}
//                 onChange={handleFormChange("buttonLink")}
//                 className={input}
//               />
//             </div>
//           </div>

//           <div className="mt-4 flex items-center gap-2 text-sm">
//             <Switch
//               on={formData.active}
//               onChange={() => setFormData({ ...formData, active: !formData.active })}
//               name="Active"
//             />
//             Active
//           </div>

//           <div className="mt-6 flex justify-end gap-3">
//             <button type="button" onClick={() => setForm(null)} className={outlineBtn}>
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!formData.title.trim()}
//               onClick={handleSaveItem}
//               className={yellowBtn}
//             >
//               Save {names[form.kind]}
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* ================= PREVIEW MODAL ================= */}
//       {preview && (
//         <ModalShell title="Preview" onClose={() => setPreview(null)}>
//           <div className="relative mt-4 aspect-video overflow-hidden rounded-md bg-[var(--off-white-background)]">
//             {preview.image && <Img src={preview.image} alt={preview.title} />}
//           </div>
//           <h3 className="mt-3 font-semibold text-[color:var(--primary-text)]">
//             {preview.title}
//           </h3>
//           <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
//             {preview.description}
//           </p>
//           {preview.buttonText && (
//             <p className="mt-2 text-sm">{preview.buttonText} — {preview.buttonLink}</p>
//           )}
//           <p className="mt-1 text-xs">{preview.active ? "Active" : "Inactive"}</p>
//         </ModalShell>
//       )}

//       {/* ================= DELETE SLIDE / BANNER ================= */}
//       {deleting && (
//         <ModalShell
//           title={`Delete ${names[deleting.kind]}?`}
//           size="max-w-md"
//           onClose={() => setDeleting(null)}
//         >
//           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//             Delete "{deleting.item.title}". This cannot be undone.
//           </p>
//           <div className="mt-5 flex justify-end gap-3">
//             <button type="button" onClick={() => setDeleting(null)} className={outlineBtn}>
//               Cancel
//             </button>
//             <button type="button" onClick={handleDeleteItem} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white">
//               Confirm Delete
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* ================= BLOG ACTION MENU ================= */}
//       {blogMenu && activeTab === "Blogs" && (
//         <>
//           <div onClick={() => setBlogMenu(null)} className="fixed inset-0 z-40" />
//           <div
//             style={{ top: blogMenu.top, left: blogMenu.left }}
//             className="fixed z-50 w-40 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-1 shadow-lg"
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 setViewId(blogMenu.blog.id);
//                 setBlogMenu(null);
//               }}
//               className={menuItem}
//             >
//               <Eye size={16} /> View
//             </button>

//             <button type="button" onClick={openEditBlog} className={menuItem}>
//               <Pencil size={16} /> Edit
//             </button>

//             <button type="button" onClick={toggleBlogStatus} className={menuItem}>
//               {blogMenu.blog.status === "Published" ? <EyeOff size={16} /> : <Send size={16} />}
//               {blogMenu.blog.status === "Published" ? "Unpublish" : "Publish"}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setDeleteBlogId(blogMenu.blog.id);
//                 setBlogMenu(null);
//               }}
//               className={`${menuItem} text-red-600`}
//             >
//               <Trash2 size={16} /> Delete
//             </button>
//           </div>
//         </>
//       )}

//       {/* ================= ADD / EDIT BLOG ================= */}
//       {blogFormOpen && activeTab === "Blogs" && (
//         <ModalShell
//           title={editBlogId === null ? "Add Blog" : "Edit Blog"}
//           size="max-w-2xl"
//           onClose={() => setBlogFormOpen(false)}
//         >
//           <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <label className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
//               Title *
//               <input
//                 type="text"
//                 value={blogForm.title}
//                 onChange={handleBlogTitle}
//                 className={input}
//               />
//             </label>

//             <label className="text-xs text-[color:var(--secondary-text)]">
//               Author *
//               <input
//                 type="text"
//                 value={blogForm.author}
//                 onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
//                 className={input}
//               />
//             </label>

//             <label className="text-xs text-[color:var(--secondary-text)]">
//               Status
//               <select
//                 value={blogForm.status}
//                 onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
//                 className={input}
//               >
//                 <option>Draft</option>
//                 <option>Published</option>
//               </select>
//             </label>

//             <label className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
//               Slug
//               <input
//                 type="text"
//                 value={blogForm.slug}
//                 onChange={handleBlogSlug}
//                 className={input}
//               />
//             </label>

//             <label className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
//               Keywords (comma se alag karein)
//               <input
//                 type="text"
//                 value={blogForm.keywords}
//                 onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
//                 className={input}
//               />
//             </label>

//             <label className="text-xs text-[color:var(--secondary-text)] sm:col-span-2">
//               Content
//               <textarea
//                 rows={5}
//                 value={blogForm.content}
//                 onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
//                 className={`${input} resize-y`}
//               />
//             </label>

//             <div className="sm:col-span-2">
//               <p className="text-xs text-[color:var(--secondary-text)]">Featured Image</p>
//               <div className="mt-2 flex flex-wrap items-center gap-3">
//                 <Thumb
//                   image={blogForm.image}
//                   title={blogForm.title}
//                   className="h-16 w-24"
//                 />

//                 <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2 text-sm">
//                   <Upload size={16} />
//                   {blogForm.imageName || "Upload Image"}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleBlogImage}
//                     className="hidden"
//                   />
//                 </label>

//                 {blogForm.image && (
//                   <button
//                     type="button"
//                     onClick={() => setBlogForm({ ...blogForm, image: "", imageName: "" })}
//                     className="text-xs text-red-600"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end gap-3">
//             <button type="button" onClick={() => setBlogFormOpen(false)} className={outlineBtn}>
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!blogForm.title.trim() || !blogForm.author.trim()}
//               onClick={saveBlog}
//               className={yellowBtn}
//             >
//               {editBlogId === null ? "Add Blog" : "Save Changes"}
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* ================= VIEW BLOG ================= */}
//       {viewingBlog && activeTab === "Blogs" && (
//         <ModalShell
//           title={viewingBlog.title}
//           size="max-w-2xl"
//           onClose={() => setViewId(null)}
//         >
//           <div className="mt-3 flex flex-wrap items-center gap-2">
//             <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${badgeColors[viewingBlog.status]}`}>
//               {viewingBlog.status}
//             </span>
//             <span className="text-xs text-[color:var(--secondary-text)]">
//               Updated {viewingBlog.date}
//             </span>
//           </div>

//           <Thumb
//             image={viewingBlog.image}
//             title={viewingBlog.title}
//             className="mt-4 h-40 w-full"
//           />

//           <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
//             <div>
//               <p className="text-xs text-[color:var(--secondary-text)]">Author</p>
//               <p>{viewingBlog.author}</p>
//             </div>
//             <div>
//               <p className="text-xs text-[color:var(--secondary-text)]">Keywords</p>
//               <p>{viewingBlog.keywords || "—"}</p>
//             </div>
//             <div className="sm:col-span-2">
//               <p className="text-xs text-[color:var(--secondary-text)]">Slug</p>
//               <p className="break-words">{viewingBlog.slug}</p>
//             </div>
//             <div className="sm:col-span-2">
//               <p className="text-xs text-[color:var(--secondary-text)]">Content</p>
//               <p className="whitespace-pre-line">{viewingBlog.content || "—"}</p>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button type="button" onClick={() => setViewId(null)} className={outlineBtn}>
//               Close
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* ================= DELETE BLOG ================= */}
//       {deletingBlog && activeTab === "Blogs" && (
//         <ModalShell title="Delete Blog" onClose={() => setDeleteBlogId(null)} size="max-w-md">
//           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//             Are you sure you want to delete "{deletingBlog.title}"? Yeh wapas nahi ho sakta.
//           </p>
//           <div className="mt-5 flex justify-end gap-3">
//             <button type="button" onClick={() => setDeleteBlogId(null)} className={outlineBtn}>
//               Cancel
//             </button>
//             <button type="button" onClick={deleteBlog} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white">
//               Confirm Delete
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* ================= ADD / EDIT FAQ ================= */}
//       {faqFormOpen && activeTab === "Frequently Asked Questions" && (
//         <ModalShell
//           title={editFaqId === null ? "Add FAQ" : "Edit FAQ"}
//           onClose={() => setFaqFormOpen(false)}
//         >
//           <div className="mt-4">
//             <label className={label}>Question</label>
//             <input
//               type="text"
//               value={faqForm.question}
//               onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
//               className={input}
//               placeholder="Enter question"
//             />
//           </div>

//           <div className="mt-4">
//             <label className={label}>Answer</label>
//             <textarea
//               rows={5}
//               value={faqForm.answer}
//               onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
//               className={`${input} resize-y`}
//               placeholder="Enter answer"
//             />
//           </div>

//           <div className="mt-4 flex items-center gap-2 text-sm">
//             <Switch
//               on={faqForm.active}
//               onChange={() => setFaqForm({ ...faqForm, active: !faqForm.active })}
//               name="FAQ active"
//             />
//             Active
//           </div>

//           <div className="mt-6 flex justify-end gap-3">
//             <button type="button" onClick={() => setFaqFormOpen(false)} className={outlineBtn}>
//               Cancel
//             </button>
//             <button
//               type="button"
//               disabled={!faqForm.question.trim()}
//               onClick={saveFaq}
//               className={yellowBtn}
//             >
//               Save FAQ
//             </button>
//           </div>
//         </ModalShell>
//       )}

//       {/* ================= DELETE FAQ ================= */}
//       {deleteFaqId !== null && activeTab === "Frequently Asked Questions" && (
//         <ModalShell title="Delete FAQ?" size="max-w-md" onClose={() => setDeleteFaqId(null)}>
//           <p className="mt-3 text-sm text-[color:var(--secondary-text)]">
//             Are you sure you want to delete this question?
//           </p>
//           <div className="mt-5 flex justify-end gap-3">
//             <button type="button" onClick={() => setDeleteFaqId(null)} className={outlineBtn}>
//               Cancel
//             </button>
//             <button type="button" onClick={deleteFaq} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white">
//               Confirm Delete
//             </button>
//           </div>
//         </ModalShell>
//       )}
//     </section>
//   );
// }



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
  Search,
  MoreVertical,
  Upload,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Check,
} from "lucide-react";

// Hero images — original CMS file ke imports
import exterior from "../../../assets/images/guest/hero/exterior.jpeg";
import interior from "../../../assets/images/guest/hero/interior.jpeg";
import grey from "../../../assets/images/guest/hero/grey.jpeg";

/* =========================================================
   BM CMS DATA
========================================================= */

const BM_CMS_TABS = [
  "Hero",
  "Banners",
  "Marquee",
  "About",
  "Contact",
  "Blogs",
  "Frequently Asked Questions",
  "Platform & Branding",
];

const BM_CMS_INITIAL_SLIDES = [
  {
    id: 1,
    title: "Build smarter. Compare every material.",
    description:
      "New and reused construction materials from verified suppliers across Pakistan.",
    image: exterior,
    buttonText: "Browse Materials",
    buttonLink: "/materials",
    active: true,
  },
  {
    id: 2,
    title: "Materials for your next build",
    description: "Cement, steel and bricks from verified local suppliers.",
    image: interior,
    buttonText: "Explore Suppliers",
    buttonLink: "/suppliers",
    active: true,
  },
  {
    id: 3,
    title: "Give materials a second life",
    description:
      "Discover reusable doors, tiles and construction materials.",
    image: grey,
    buttonText: "Find Reused Materials",
    buttonLink: "/materials",
    active: true,
  },
];

const BM_CMS_INITIAL_BANNERS = [
  {
    id: 1,
    title: "10% off Cement this week",
    description: "Limited time offer on all cement brands.",
    image: interior,
    buttonText: "Shop now",
    buttonLink: "/materials",
    active: true,
  },
  {
    id: 2,
    title: "List your reused materials free",
    description: "Sell your leftover materials with no listing fee.",
    image: grey,
    buttonText: "List now",
    buttonLink: "/supplier",
    active: true,
  },
];

const BM_CMS_INITIAL_MARQUEE = [
  {
    id: 1,
    text: "New: Verified supplier badges",
    active: true,
  },
  {
    id: 2,
    text: "Compare construction material prices on BuildMart",
    active: true,
  },
];

const BM_CMS_INITIAL_BLOGS = [
  {
    id: 1,
    title: "How to Choose the Right Cement Grade",
    author: "BuildMart Team",
    slug: "how-to-choose-the-right-cement-grade",
    keywords: "cement, grade",
    status: "Published",
    date: "2026-10-06",
    image: "",
    imageName: "",
    content:
      "OPC aur PPC cement ka farq, kis kaam ke liye kaun sa grade behtar hai aur kharidte waqt kin baton ka khayal rakhein.",
    readingTime: "5",
    featured: true,
  },
  {
    id: 2,
    title: "Reusing Materials Saves Money and the Planet",
    author: "Maria Saeed",
    slug: "reusing-materials-saves-money-and-the-planet",
    keywords: "reuse, savings",
    status: "Published",
    date: "2026-10-13",
    image: "",
    imageName: "",
    content:
      "Purane darwaze, khirkiyan aur tiles dobara istemal karne se kharcha bhi kam hota hai aur mahol ko bhi faida hota hai.",
    readingTime: "4",
    featured: true,
  },
  {
    id: 3,
    title: "Steel Prices: Q4 2026 Outlook",
    author: "BuildMart Team",
    slug: "steel-prices-q4-2026-outlook",
    keywords: "steel, prices",
    status: "Draft",
    date: "2026-10-18",
    image: "",
    imageName: "",
    content:
      "Saria ki qeematon ka is quarter ka jaiza aur aane wale mahino ka andaza.",
    readingTime: "6",
    featured: false,
  },
];

const BM_CMS_INITIAL_FAQS = [
  {
    id: 1,
    question: "What is BuildMart Gujranwala and how does it work?",
    answer:
      "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place.",
    active: true,
  },
  {
    id: 2,
    question: "Is BuildMart free to use?",
    answer: "",
    active: true,
  },
  {
    id: 3,
    question: "How are the suppliers registered?",
    answer: "",
    active: true,
  },
  {
    id: 4,
    question: "How do I contact a supplier?",
    answer: "",
    active: true,
  },
  {
    id: 5,
    question: "Are the prices shown live market rates?",
    answer: "",
    active: true,
  },
];

const BM_CMS_EMPTY_ITEM = {
  title: "",
  description: "",
  image: null,
  buttonText: "",
  buttonLink: "",
  active: true,
};

const BM_CMS_EMPTY_BLOG = {
  title: "",
  author: "BuildMart Team",
  slug: "",
  keywords: "",
  content: "",
  status: "Draft",
  image: "",
  imageName: "",
  readingTime: "",
  featured: false,
};

const BM_CMS_EMPTY_FAQ = {
  question: "",
  answer: "",
  active: true,
};

const BM_CMS_INITIAL_PLATFORM = {
  platformName: "BuildMart",
  tagline: "Construction Material Management & Comparison",
  phone: "042-111-BUILD",
  supportEmail: "support@buildmart.pk",
};

/* =========================================================
   BM CMS SHARED CLASSES
========================================================= */

const BM_CMS_CARD =
  "rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm sm:p-5";

const BM_CMS_CARD_TITLE =
  "text-sm font-semibold uppercase tracking-wide text-[color:var(--primary-text)]";

const BM_CMS_INPUT =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";

const BM_CMS_LABEL =
  "mb-1 block text-xs text-[color:var(--secondary-text)]";

const BM_CMS_BUTTON =
  "rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

const BM_CMS_YELLOW_BUTTON =
  "rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] disabled:cursor-not-allowed disabled:opacity-50";

const BM_CMS_ICON_BUTTON =
  "rounded-md p-1.5 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)] hover:text-[color:var(--primary-text)]";

const BM_CMS_MENU_ITEM =
  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]";

const BM_CMS_ONLY_ACTIVE = (items) =>
  items.reduce((all, item) => (item.active ? [...all, item] : all), []);

const BM_CMS_TODAY = () => new Date().toISOString().slice(0, 10);

const BM_CMS_SLUGIFY = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* =========================================================
   BM CMS SMALL COMPONENTS
========================================================= */

const BmCmsImage = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    fill
    unoptimized
    className="object-cover"
  />
);

const BmCmsSwitch = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
      checked
        ? "bg-[var(--primary-yellow)]"
        : "bg-[var(--border-color)]"
    }`}
  >
    <span
      className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-4" : ""
      }`}
    />
  </button>
);

const BmCmsModal = ({
  title,
  onClose,
  children,
  size = "max-w-xl",
}) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative my-auto w-full ${size} rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl text-[color:var(--primary-text)]">
          {title}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={BM_CMS_ICON_BUTTON}
        >
          <X size={18} />
        </button>
      </div>

      {children}
    </div>
  </div>
);

/* =========================================================
   BM CMS RICH TEXT EDITOR
   About aur Blog dono mein use hoga
========================================================= */

const BmCmsRichTextEditor = ({ value, onChange, editorId }) => {
  const handleCommand = (command) => {
    document.execCommand(command, false, null);
  };

  const handleHeading = (heading) => {
    document.execCommand("formatBlock", false, heading);
  };

  return (
    <div className="bmCms-richEditor overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[color:var(--border-color)] p-2">
        <button
          type="button"
          title="Heading 1"
          onClick={() => handleHeading("h1")}
          className={BM_CMS_ICON_BUTTON}
        >
          <Heading1 size={16} />
        </button>

        <button
          type="button"
          title="Heading 2"
          onClick={() => handleHeading("h2")}
          className={BM_CMS_ICON_BUTTON}
        >
          <Heading2 size={16} />
        </button>

        <button
          type="button"
          title="Bold"
          onClick={() => handleCommand("bold")}
          className={BM_CMS_ICON_BUTTON}
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          title="Italic"
          onClick={() => handleCommand("italic")}
          className={BM_CMS_ICON_BUTTON}
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          title="Underline"
          onClick={() => handleCommand("underline")}
          className={BM_CMS_ICON_BUTTON}
        >
          <Underline size={16} />
        </button>

        <button
          type="button"
          title="Bullet list"
          onClick={() => handleCommand("insertUnorderedList")}
          className={BM_CMS_ICON_BUTTON}
        >
          <List size={16} />
        </button>

        <button
          type="button"
          title="Numbered list"
          onClick={() => handleCommand("insertOrderedList")}
          className={BM_CMS_ICON_BUTTON}
        >
          <ListOrdered size={16} />
        </button>
      </div>

      <div
        id={editorId}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value || "" }}
        className="min-h-[180px] p-4 text-sm text-[color:var(--primary-text)] outline-none sm:min-h-[230px]"
      />
    </div>
  );
};

/* =========================================================
   BM CMS ITEM LIST — HERO / BANNERS
========================================================= */

const BmCmsItemList = ({
  kind,
  items,
  onToggle,
  onPreview,
  onEdit,
  onDelete,
}) => (
  <div>
    {items.length === 0 && (
      <p className="py-4 text-sm text-[color:var(--secondary-text)]">
        Nothing here yet.
      </p>
    )}

    {items.map((item) => (
      <div
        key={item.id}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-color)] py-3 last:border-b-0"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--off-white-background)] text-[color:var(--secondary-text)]">
            {item.image ? (
              <BmCmsImage src={item.image} alt={item.title} />
            ) : (
              <ImageIcon size={18} />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[color:var(--primary-text)]">
              {item.title}
            </p>

            <p className="line-clamp-1 text-xs text-[color:var(--secondary-text)]">
              {item.description}
            </p>

            <span
              className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] ${
                item.active
                  ? "bg-green-50 text-green-700"
                  : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"
              }`}
            >
              {item.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <BmCmsSwitch
            checked={item.active}
            onChange={() => onToggle(kind, item.id)}
            label={`Toggle ${item.title}`}
          />

          <button
            type="button"
            onClick={() => onPreview(item)}
            aria-label={`Preview ${item.title}`}
            className={BM_CMS_ICON_BUTTON}
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            onClick={() => onEdit(kind, item)}
            aria-label={`Edit ${item.title}`}
            className={BM_CMS_ICON_BUTTON}
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(kind, item)}
            aria-label={`Delete ${item.title}`}
            className={`${BM_CMS_ICON_BUTTON} text-red-500`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

/* =========================================================
   BM CMS HERO PREVIEW
========================================================= */

const BmCmsHeroPreview = ({ slides }) => {
  const liveSlides = BM_CMS_ONLY_ACTIVE(slides);
  const [index, setIndex] = useState(0);

  const current = liveSlides.length ? index % liveSlides.length : 0;

  useEffect(() => {
    if (liveSlides.length < 2) return;

    const timer = setTimeout(() => {
      setIndex((old) => old + 1);
    }, 4000);

    return () => clearTimeout(timer);
  }, [current, liveSlides.length]);

  const handlePrevious = () => {
    if (!liveSlides.length) return;
    setIndex((current - 1 + liveSlides.length) % liveSlides.length);
  };

  const handleNext = () => {
    if (!liveSlides.length) return;
    setIndex((current + 1) % liveSlides.length);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-[var(--charcoal-black)] shadow-sm">
      {liveSlides.length === 0 ? (
        <p className="py-24 text-center text-sm text-white">
          No active slides
        </p>
      ) : (
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {liveSlides.map((slide) => (
              <div
                key={slide.id}
                className="relative h-full w-full shrink-0"
              >
                {slide.image && (
                  <BmCmsImage src={slide.image} alt={slide.title} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 px-4 pb-12 text-white sm:px-8">
                  <h2 className="max-w-2xl text-xl font-semibold sm:text-3xl">
                    {slide.title}
                  </h2>

                  <p className="mt-1 max-w-xl text-xs text-white/80 sm:text-sm">
                    {slide.description}
                  </p>

                  {slide.buttonText && (
                    <Link
                      href={slide.buttonLink || "/"}
                      className="mt-3 inline-block rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs text-[color:var(--charcoal-black)] sm:text-sm"
                    >
                      {slide.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={handlePrevious}
            className="absolute bottom-3 left-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-[color:var(--charcoal-black)]"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={handleNext}
            className="absolute bottom-3 right-3 rounded-md bg-[var(--primary-yellow)] p-1.5 text-[color:var(--charcoal-black)]"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {liveSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-[var(--primary-yellow)]"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   BM CMS BLOG IMAGE
========================================================= */

const BmCmsBlogThumb = ({ blog, className = "h-12 w-[72px]" }) => (
  <span
    className={`relative flex items-center justify-center overflow-hidden rounded-md bg-[var(--charcoal-black)] text-white ${className}`}
  >
    {blog.image ? (
      <Image
        src={blog.image}
        alt={blog.title}
        fill
        unoptimized
        className="object-cover"
      />
    ) : (
      <ImageIcon size={20} />
    )}
  </span>
);

/* =========================================================
   BM CMS BLOG TABLE
========================================================= */

const BmCmsBlogsTable = ({ blogs, onMenu }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[850px] text-left text-sm">
      <thead className="bg-[var(--off-white-background)] text-xs uppercase text-[color:var(--secondary-text)]">
        <tr>
          {[
            "Title",
            "Author",
            "Reading Time",
            "Featured",
            "Status",
            "Updated Date",
            "Actions",
          ].map((heading) => (
            <th key={heading} className="px-4 py-3 font-medium">
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {blogs.map((blog) => (
          <tr
            key={blog.id}
            className="border-t border-[color:var(--border-color)]"
          >
            <td className="px-4 py-3 text-[color:var(--primary-text)]">
              <div className="flex items-center gap-2">
                <BmCmsBlogThumb blog={blog} />
                <span className="max-w-[220px]">{blog.title}</span>
              </div>
            </td>

            <td className="px-4 py-3 text-[color:var(--primary-text)]">
              {blog.author}
            </td>

            <td className="px-4 py-3 text-[color:var(--primary-text)]">
              {blog.readingTime || "—"} min
            </td>

            <td className="px-4 py-3">
              {blog.featured ? (
                <span className="text-green-600">Featured</span>
              ) : (
                <span className="text-[color:var(--secondary-text)]">No</span>
              )}
            </td>

            <td className="px-4 py-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs ${
                  blog.status === "Published"
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {blog.status}
              </span>
            </td>

            <td className="px-4 py-3 text-[color:var(--primary-text)]">
              {blog.date}
            </td>

            <td className="px-4 py-3">
              <button
                type="button"
                onClick={(e) => onMenu(e, blog)}
                aria-label={`Actions for ${blog.title}`}
                className="rounded-md border border-[color:var(--border-color)] p-1.5 text-[color:var(--primary-text)]"
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

/* =========================================================
   BM CMS MAIN PAGE
========================================================= */

export default function BmCmsPage() {
  const [activeTab, setActiveTab] = useState("Hero");

  // Hero, banners and marquee
  const [slides, setSlides] = useState(BM_CMS_INITIAL_SLIDES);
  const [banners, setBanners] = useState(BM_CMS_INITIAL_BANNERS);
  const [announcements, setAnnouncements] = useState(
    BM_CMS_INITIAL_MARQUEE
  );
  const [newAnnouncement, setNewAnnouncement] = useState("");

  // About and Contact
  const [aboutContent, setAboutContent] = useState(
    "<h2>About BuildMart</h2><p>BuildMart helps homeowners and contractors compare construction material prices and connect with local suppliers.</p>"
  );

  const [contact, setContact] = useState({
    email: "support@buildmart.pk",
    phone: "042-111-BUILD",
    address: "Gujranwala, Pakistan",
  });

  // Blogs
  const [blogs, setBlogs] = useState(BM_CMS_INITIAL_BLOGS);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogStatus, setBlogStatus] = useState("All");
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState(BM_CMS_EMPTY_BLOG);
  const [blogEditId, setBlogEditId] = useState(null);
  const [blogMenu, setBlogMenu] = useState(null);
  const [blogView, setBlogView] = useState(null);
  const [blogDeleteId, setBlogDeleteId] = useState(null);
  const [slugEdited, setSlugEdited] = useState(false);

  // FAQs
  const [faqs, setFaqs] = useState(BM_CMS_INITIAL_FAQS);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [faqForm, setFaqForm] = useState(BM_CMS_EMPTY_FAQ);
  const [faqEditId, setFaqEditId] = useState(null);

  // Platform and branding
  const [platform, setPlatform] = useState(BM_CMS_INITIAL_PLATFORM);
  const [brandLogo, setBrandLogo] = useState("");
  const [brandLogoName, setBrandLogoName] = useState("");

  // Hero / banner form
  const [itemModal, setItemModal] = useState(null);
  const [itemForm, setItemForm] = useState(BM_CMS_EMPTY_ITEM);
  const [itemPreview, setItemPreview] = useState(null);
  const [itemDelete, setItemDelete] = useState(null);

  const [toast, setToast] = useState("");

  const BM_CMS_LISTS = {
    slide: [slides, setSlides],
    banner: [banners, setBanners],
  };

  const BM_CMS_NAMES = {
    slide: "Hero Slide",
    banner: "Banner",
  };

  const BM_CMS_SHOW_TOAST = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  /* ---------------- Hero and Banner handlers ---------------- */

  const BM_CMS_OPEN_ITEM = (kind, item = null) => {
    setItemModal({ kind, item });
    setItemForm(item ? { ...item } : BM_CMS_EMPTY_ITEM);
  };

  const BM_CMS_CHANGE_ITEM = (key, value) => {
    setItemForm((old) => ({ ...old, [key]: value }));
  };

  const BM_CMS_UPLOAD_ITEM_IMAGE = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      BM_CMS_CHANGE_ITEM("image", URL.createObjectURL(file));
    }
  };

  const BM_CMS_SAVE_ITEM = () => {
    if (!itemForm.title.trim() || !itemModal) return;

    const [list, setList] = BM_CMS_LISTS[itemModal.kind];

    if (itemModal.item) {
      setList(
        list.map((item) =>
          item.id === itemModal.item.id
            ? { ...itemForm, id: item.id }
            : item
        )
      );
    } else {
      setList([
        ...list,
        {
          ...itemForm,
          id: Date.now(),
        },
      ]);
    }

    setItemModal(null);
    BM_CMS_SHOW_TOAST(`${BM_CMS_NAMES[itemModal.kind]} saved`);
  };

  const BM_CMS_TOGGLE_ITEM = (kind, id) => {
    const [list, setList] = BM_CMS_LISTS[kind];

    setList(
      list.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const BM_CMS_DELETE_ITEM = () => {
    const [list, setList] = BM_CMS_LISTS[itemDelete.kind];

    setList(list.filter((item) => item.id !== itemDelete.item.id));
    setItemDelete(null);
  };

  /* ---------------- Marquee handlers ---------------- */

  const BM_CMS_ADD_ANNOUNCEMENT = () => {
    if (!newAnnouncement.trim()) return;

    setAnnouncements([
      ...announcements,
      {
        id: Date.now(),
        text: newAnnouncement.trim(),
        active: true,
      },
    ]);

    setNewAnnouncement("");
  };

  const BM_CMS_TOGGLE_ANNOUNCEMENT = (id) => {
    setAnnouncements(
      announcements.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const BM_CMS_DELETE_ANNOUNCEMENT = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
  };

  const BM_CMS_MOVE_ANNOUNCEMENT = (index, step) => {
    const nextIndex = index + step;

    if (nextIndex < 0 || nextIndex >= announcements.length) return;

    const updated = [...announcements];
    [updated[index], updated[nextIndex]] = [
      updated[nextIndex],
      updated[index],
    ];

    setAnnouncements(updated);
  };

  /* ---------------- Blog handlers ---------------- */

  const BM_CMS_OPEN_ADD_BLOG = () => {
    setBlogForm(BM_CMS_EMPTY_BLOG);
    setBlogEditId(null);
    setSlugEdited(false);
    setBlogModalOpen(true);
  };

  const BM_CMS_OPEN_EDIT_BLOG = (blog) => {
    setBlogForm({ ...blog });
    setBlogEditId(blog.id);
    setSlugEdited(true);
    setBlogModalOpen(true);
    setBlogMenu(null);
  };

  const BM_CMS_CHANGE_BLOG = (key, value) => {
    setBlogForm((old) => ({ ...old, [key]: value }));
  };

  const BM_CMS_CHANGE_BLOG_TITLE = (value) => {
    setBlogForm((old) => ({
      ...old,
      title: value,
      slug: slugEdited ? old.slug : BM_CMS_SLUGIFY(value),
    }));
  };

  const BM_CMS_CHANGE_BLOG_SLUG = (value) => {
    setSlugEdited(true);
    BM_CMS_CHANGE_BLOG("slug", BM_CMS_SLUGIFY(value));
  };

  const BM_CMS_UPLOAD_BLOG_IMAGE = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBlogForm((old) => ({
      ...old,
      image: URL.createObjectURL(file),
      imageName: file.name,
    }));
  };

  const BM_CMS_SAVE_BLOG = () => {
    if (!blogForm.title.trim() || !blogForm.author.trim()) return;

    const blogData = {
      ...blogForm,
      title: blogForm.title.trim(),
      author: blogForm.author.trim(),
      slug: blogForm.slug.trim() || BM_CMS_SLUGIFY(blogForm.title),
      date: BM_CMS_TODAY(),
    };

    if (blogEditId === null) {
      setBlogs((old) => [
        { id: Date.now(), ...blogData },
        ...old,
      ]);
    } else {
      setBlogs((old) =>
        old.map((blog) =>
          blog.id === blogEditId ? { ...blog, ...blogData } : blog
        )
      );
    }

    setBlogModalOpen(false);
    BM_CMS_SHOW_TOAST("Blog saved");
  };

  const BM_CMS_TOGGLE_BLOG_STATUS = (blog) => {
    setBlogs((old) =>
      old.map((item) =>
        item.id === blog.id
          ? {
              ...item,
              status:
                item.status === "Published" ? "Draft" : "Published",
              date: BM_CMS_TODAY(),
            }
          : item
      )
    );

    setBlogMenu(null);
  };

  const BM_CMS_TOGGLE_FEATURED_BLOG = (id) => {
    setBlogs((old) =>
      old.map((blog) =>
        blog.id === id ? { ...blog, featured: !blog.featured } : blog
      )
    );
  };

  const BM_CMS_BLOGS_VISIBLE = blogs.filter((blog) => {
    const matchesSearch = `${blog.title} ${blog.author} ${blog.slug}`
      .toLowerCase()
      .includes(blogSearch.toLowerCase());

    const matchesStatus =
      blogStatus === "All" || blog.status === blogStatus;

    return matchesSearch && matchesStatus;
  });

  const BM_CMS_BLOG_DELETE = () => {
    setBlogs((old) => old.filter((blog) => blog.id !== blogDeleteId));
    setBlogDeleteId(null);
  };

  /* ---------------- FAQ handlers ---------------- */

  const BM_CMS_OPEN_ADD_FAQ = () => {
    setFaqForm(BM_CMS_EMPTY_FAQ);
    setFaqEditId(null);
    setFaqModalOpen(true);
  };

  const BM_CMS_OPEN_EDIT_FAQ = (faq) => {
    setFaqForm({ ...faq });
    setFaqEditId(faq.id);
    setFaqModalOpen(true);
  };

  const BM_CMS_SAVE_FAQ = () => {
    if (!faqForm.question.trim()) return;

    if (faqEditId === null) {
      setFaqs((old) => [
        ...old,
        { ...faqForm, id: Date.now() },
      ]);
    } else {
      setFaqs((old) =>
        old.map((faq) =>
          faq.id === faqEditId ? { ...faqForm, id: faq.id } : faq
        )
      );
    }

    setFaqModalOpen(false);
    BM_CMS_SHOW_TOAST("FAQ saved");
  };

  const BM_CMS_TOGGLE_FAQ = (id) => {
    setFaqs((old) =>
      old.map((faq) =>
        faq.id === id ? { ...faq, active: !faq.active } : faq
      )
    );
  };

  const BM_CMS_DELETE_FAQ = (id) => {
    setFaqs((old) => old.filter((faq) => faq.id !== id));
  };

  /* ---------------- Contact and Platform handlers ---------------- */

  const BM_CMS_CHANGE_CONTACT = (key, value) => {
    setContact((old) => ({ ...old, [key]: value }));
  };

  const BM_CMS_CHANGE_PLATFORM = (key, value) => {
    setPlatform((old) => ({ ...old, [key]: value }));
  };

  const BM_CMS_UPLOAD_LOGO = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBrandLogo(URL.createObjectURL(file));
    setBrandLogoName(file.name);
  };

  /* =========================================================
     BM CMS PAGE UI
  ========================================================= */

  return (
    <main className="bmCms-root mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl text-[color:var(--primary-text)] sm:text-4xl">
          Homepage / CMS
        </h1>

        <p className="mt-2 text-sm text-[color:var(--secondary-text)]">
          Manage your BuildMart website content.
        </p>
      </div>

      {/* CMS TABS */}
      <div className="bmCms-tabs mb-6 flex flex-wrap gap-2">
        {BM_CMS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-md border px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm ${
              activeTab === tab
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* =====================================================
          TAB 1 — HERO
      ===================================================== */}

      {activeTab === "Hero" && (
        <section className="bmCms-hero">
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--primary-text)]">
            Hero Section
          </h2>

          <BmCmsHeroPreview slides={slides} />

          <div className={`${BM_CMS_CARD} mt-5`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className={BM_CMS_CARD_TITLE}>Hero Slides</h3>

              <button
                type="button"
                onClick={() => BM_CMS_OPEN_ITEM("slide")}
                className={BM_CMS_YELLOW_BUTTON}
              >
                <span className="inline-flex items-center gap-2">
                  <Plus size={15} />
                  Create New Slide
                </span>
              </button>
            </div>

            <div className="mt-3">
              <BmCmsItemList
                kind="slide"
                items={slides}
                onToggle={BM_CMS_TOGGLE_ITEM}
                onPreview={setItemPreview}
                onEdit={BM_CMS_OPEN_ITEM}
                onDelete={(kind, item) => setItemDelete({ kind, item })}
              />
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          TAB 2 — BANNERS
      ===================================================== */}

      {activeTab === "Banners" && (
        <section className="bmCms-banners">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                Promotional Banners
              </h2>
              <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
                Manage homepage promotional banners.
              </p>
            </div>

            <button
              type="button"
              onClick={() => BM_CMS_OPEN_ITEM("banner")}
              className={BM_CMS_YELLOW_BUTTON}
            >
              <span className="inline-flex items-center gap-2">
                <Plus size={15} />
                Add Banner
              </span>
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BM_CMS_ONLY_ACTIVE(banners).map((banner) => (
              <div
                key={banner.id}
                className="overflow-hidden rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)]"
              >
                <div className="relative h-36 bg-[var(--off-white-background)] sm:h-44">
                  {banner.image && (
                    <BmCmsImage
                      src={banner.image}
                      alt={banner.title}
                    />
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-[color:var(--primary-text)]">
                    {banner.title}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
                    {banner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${BM_CMS_CARD} mt-5`}>
            <h3 className={BM_CMS_CARD_TITLE}>Manage Banners</h3>

            <div className="mt-3">
              <BmCmsItemList
                kind="banner"
                items={banners}
                onToggle={BM_CMS_TOGGLE_ITEM}
                onPreview={setItemPreview}
                onEdit={BM_CMS_OPEN_ITEM}
                onDelete={(kind, item) => setItemDelete({ kind, item })}
              />
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          TAB 3 — MARQUEE
      ===================================================== */}

      {activeTab === "Marquee" && (
        <section className="bmCms-marquee max-w-4xl">
          <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
            Marquee / Announcements
          </h2>

          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
            Manage the announcement messages shown on the website.
          </p>

          <div className={`${BM_CMS_CARD} mt-5`}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Write announcement..."
                className={BM_CMS_INPUT}
              />

              <button
                type="button"
                onClick={BM_CMS_ADD_ANNOUNCEMENT}
                className={BM_CMS_YELLOW_BUTTON}
              >
                <span className="inline-flex items-center gap-2">
                  <Plus size={15} />
                  Add
                </span>
              </button>
            </div>

            <div className="mt-4">
              {announcements.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-3 border-b border-[color:var(--border-color)] py-3 last:border-0"
                >
                  <BmCmsSwitch
                    checked={item.active}
                    onChange={() =>
                      BM_CMS_TOGGLE_ANNOUNCEMENT(item.id)
                    }
                    label={`Toggle ${item.text}`}
                  />

                  <p className="min-w-0 flex-1 text-sm text-[color:var(--primary-text)]">
                    {item.text}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      BM_CMS_MOVE_ANNOUNCEMENT(index, -1)
                    }
                    aria-label="Move announcement up"
                    className={BM_CMS_ICON_BUTTON}
                  >
                    <ChevronUp size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      BM_CMS_MOVE_ANNOUNCEMENT(index, 1)
                    }
                    aria-label="Move announcement down"
                    className={BM_CMS_ICON_BUTTON}
                  >
                    <ChevronDown size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      BM_CMS_DELETE_ANNOUNCEMENT(item.id)
                    }
                    aria-label="Delete announcement"
                    className={`${BM_CMS_ICON_BUTTON} text-red-500`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          TAB 4 — ABOUT
      ===================================================== */}

      {activeTab === "About" && (
        <section className="bmCms-about max-w-5xl">
          <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
            About Page Content
          </h2>

          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
            Manage the content displayed on the public About page.
          </p>

          <div className={`${BM_CMS_CARD} mt-5`}>
            <label className={BM_CMS_LABEL}>About Content</label>

            <BmCmsRichTextEditor
              editorId="bmCmsAboutEditor"
              value={aboutContent}
              onChange={setAboutContent}
            />

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => BM_CMS_SHOW_TOAST("About content saved")}
                className={BM_CMS_YELLOW_BUTTON}
              >
                <span className="inline-flex items-center gap-2">
                  <Check size={15} />
                  Save Changes
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          TAB 5 — CONTACT
      ===================================================== */}

      {activeTab === "Contact" && (
        <section className="bmCms-contact max-w-3xl">
          <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
            Contact Information
          </h2>

          <div className={`${BM_CMS_CARD} mt-5`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bmCmsContactEmail" className={BM_CMS_LABEL}>
                  Contact Email
                </label>
                <input
                  id="bmCmsContactEmail"
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    BM_CMS_CHANGE_CONTACT("email", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>

              <div>
                <label htmlFor="bmCmsContactPhone" className={BM_CMS_LABEL}>
                  Contact Phone
                </label>
                <input
                  id="bmCmsContactPhone"
                  type="text"
                  value={contact.phone}
                  onChange={(e) =>
                    BM_CMS_CHANGE_CONTACT("phone", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bmCmsContactAddress" className={BM_CMS_LABEL}>
                  Address
                </label>
                <textarea
                  id="bmCmsContactAddress"
                  rows={3}
                  value={contact.address}
                  onChange={(e) =>
                    BM_CMS_CHANGE_CONTACT("address", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => BM_CMS_SHOW_TOAST("Contact information saved")}
                className={BM_CMS_YELLOW_BUTTON}
              >
                Save Changes
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          TAB 6 — BLOGS
      ===================================================== */}

      {activeTab === "Blogs" && (
        <section className="bmCms-blogs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                Blogs
              </h2>
              <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
                Manage blogs and choose which blogs appear as featured.
              </p>
            </div>

            <button
              type="button"
              onClick={BM_CMS_OPEN_ADD_BLOG}
              className={BM_CMS_YELLOW_BUTTON}
            >
              <span className="inline-flex items-center gap-2">
                <Plus size={16} />
                Add Blog
              </span>
            </button>
          </div>

          {/* Search and status */}
          <div className={`${BM_CMS_CARD} mt-5`}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--border-color)] px-3 py-2">
                <Search
                  size={16}
                  className="text-[color:var(--secondary-text)]"
                />
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-full bg-transparent text-sm text-[color:var(--primary-text)] outline-none"
                />
              </div>

              <select
                value={blogStatus}
                onChange={(e) => setBlogStatus(e.target.value)}
                className={`${BM_CMS_INPUT} sm:mt-0 sm:w-44`}
              >
                <option>All</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>

            <div className="mt-4">
              <BmCmsBlogsTable
                blogs={BM_CMS_BLOGS_VISIBLE}
                onMenu={(e, blog) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setBlogMenu({
                    blog,
                    top: rect.bottom + 4,
                    left: Math.max(8, rect.right - 160),
                  });
                }}
              />
            </div>

            <p className="mt-3 text-xs text-[color:var(--secondary-text)]">
              {BM_CMS_BLOGS_VISIBLE.length}{" "}
              {BM_CMS_BLOGS_VISIBLE.length === 1 ? "record" : "records"}
            </p>
          </div>

          {/* Featured blogs */}
          <div className={`${BM_CMS_CARD} mt-5`}>
            <h3 className={BM_CMS_CARD_TITLE}>Featured Blogs</h3>

            <p className="mt-1 text-xs text-[color:var(--secondary-text)]">
              Select the blogs you want to show in the Featured Blogs section.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {blogs.map((blog) => (
                <label
                  key={blog.id}
                  className="flex items-center gap-3 text-sm text-[color:var(--primary-text)]"
                >
                  <input
                    type="checkbox"
                    checked={blog.featured}
                    onChange={() =>
                      BM_CMS_TOGGLE_FEATURED_BLOG(blog.id)
                    }
                    className="h-4 w-4 accent-[var(--primary-yellow)]"
                  />

                  <span>{blog.title}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BLOG ACTIONS MENU */}
      {blogMenu && (
        <>
          <div
            onClick={() => setBlogMenu(null)}
            className="fixed inset-0 z-40"
          />

          <div
            style={{
              top: blogMenu.top,
              left: blogMenu.left,
            }}
            className="fixed z-50 w-40 overflow-hidden rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-1 shadow-lg"
          >
            <button
              type="button"
              onClick={() => {
                setBlogView(blogMenu.blog);
                setBlogMenu(null);
              }}
              className={BM_CMS_MENU_ITEM}
            >
              <Eye size={16} />
              View
            </button>

            <button
              type="button"
              onClick={() => BM_CMS_OPEN_EDIT_BLOG(blogMenu.blog)}
              className={BM_CMS_MENU_ITEM}
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => BM_CMS_TOGGLE_BLOG_STATUS(blogMenu.blog)}
              className={BM_CMS_MENU_ITEM}
            >
              {blogMenu.blog.status === "Published" ? "Unpublish" : "Publish"}
            </button>

            <button
              type="button"
              onClick={() => {
                setBlogDeleteId(blogMenu.blog.id);
                setBlogMenu(null);
              }}
              className={`${BM_CMS_MENU_ITEM} text-red-600`}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </>
      )}

      {/* ADD / EDIT BLOG MODAL */}
      {blogModalOpen && (
        <BmCmsModal
          title={blogEditId === null ? "Add Blog" : "Edit Blog"}
          onClose={() => setBlogModalOpen(false)}
          size="max-w-3xl"
        >
          <div className="grid max-h-[75vh] grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
            <div>
              <label htmlFor="bmCmsBlogTitle" className={BM_CMS_LABEL}>
                Blog Title *
              </label>
              <input
                id="bmCmsBlogTitle"
                value={blogForm.title}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG_TITLE(e.target.value)
                }
                className={BM_CMS_INPUT}
              />
            </div>

            <div>
              <label htmlFor="bmCmsBlogSlug" className={BM_CMS_LABEL}>
                Slug
              </label>
              <input
                id="bmCmsBlogSlug"
                value={blogForm.slug}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG_SLUG(e.target.value)
                }
                className={BM_CMS_INPUT}
              />
            </div>

            <div>
              <label htmlFor="bmCmsBlogKeywords" className={BM_CMS_LABEL}>
                Keywords / Tags
              </label>
              <input
                id="bmCmsBlogKeywords"
                value={blogForm.keywords}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG("keywords", e.target.value)
                }
                className={BM_CMS_INPUT}
              />
            </div>

            <div>
              <label htmlFor="bmCmsBlogAuthor" className={BM_CMS_LABEL}>
                Author
              </label>
              <input
                id="bmCmsBlogAuthor"
                value={blogForm.author}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG("author", e.target.value)
                }
                className={BM_CMS_INPUT}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="bmCmsBlogDescription"
                className={BM_CMS_LABEL}
              >
                Short Description
              </label>
              <textarea
                id="bmCmsBlogDescription"
                rows={3}
                value={blogForm.description || ""}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG("description", e.target.value)
                }
                className={BM_CMS_INPUT}
              />
            </div>

            <div>
              <label
                htmlFor="bmCmsBlogReadingTime"
                className={BM_CMS_LABEL}
              >
                Estimated Reading Time (minutes)
              </label>
              <input
                id="bmCmsBlogReadingTime"
                type="number"
                min="1"
                value={blogForm.readingTime}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG("readingTime", e.target.value)
                }
                placeholder="e.g. 5"
                className={BM_CMS_INPUT}
              />
            </div>

            <div>
              <label htmlFor="bmCmsBlogStatus" className={BM_CMS_LABEL}>
                Status
              </label>
              <select
                id="bmCmsBlogStatus"
                value={blogForm.status}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG("status", e.target.value)
                }
                className={BM_CMS_INPUT}
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>

            {/* Featured image upload */}
            <div className="sm:col-span-2">
              <label className={BM_CMS_LABEL}>
                Featured Image / File Upload
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <BmCmsBlogThumb
                  blog={blogForm}
                  className="h-16 w-24"
                />

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)]">
                  <Upload size={16} />
                  {blogForm.imageName || "Choose File"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={BM_CMS_UPLOAD_BLOG_IMAGE}
                    className="hidden"
                  />
                </label>

                {blogForm.image && (
                  <button
                    type="button"
                    onClick={() => {
                      BM_CMS_CHANGE_BLOG("image", "");
                      BM_CMS_CHANGE_BLOG("imageName", "");
                    }}
                    className="text-xs text-red-600"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Rich text content */}
            <div className="sm:col-span-2">
              <label className={BM_CMS_LABEL}>Full Content</label>

              <BmCmsRichTextEditor
                editorId="bmCmsBlogEditor"
                value={blogForm.content}
                onChange={(value) =>
                  BM_CMS_CHANGE_BLOG("content", value)
                }
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[color:var(--primary-text)] sm:col-span-2">
              <input
                type="checkbox"
                checked={blogForm.featured}
                onChange={(e) =>
                  BM_CMS_CHANGE_BLOG("featured", e.target.checked)
                }
                className="h-4 w-4 accent-[var(--primary-yellow)]"
              />
              Show in Featured Blogs
            </label>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setBlogModalOpen(false)}
              className={BM_CMS_BUTTON}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!blogForm.title.trim() || !blogForm.author.trim()}
              onClick={BM_CMS_SAVE_BLOG}
              className={BM_CMS_YELLOW_BUTTON}
            >
              {blogEditId === null ? "Save Blog" : "Save Changes"}
            </button>
          </div>
        </BmCmsModal>
      )}

      {/* BLOG VIEW MODAL */}
      {blogView && (
        <BmCmsModal
          title={blogView.title}
          onClose={() => setBlogView(null)}
          size="max-w-3xl"
        >
          <div className="flex flex-wrap gap-3 text-xs text-[color:var(--secondary-text)]">
            <span>{blogView.author}</span>
            <span>{blogView.date}</span>
            <span>{blogView.readingTime || "—"} min read</span>
            <span>{blogView.status}</span>
          </div>

          <div className="mt-4">
            <BmCmsBlogThumb
              blog={blogView}
              className="h-48 w-full"
            />
          </div>

          <div
            className="prose mt-4 max-w-none text-sm text-[color:var(--primary-text)]"
            dangerouslySetInnerHTML={{
              __html: blogView.content || "",
            }}
          />
        </BmCmsModal>
      )}

      {/* BLOG DELETE MODAL */}
      {blogDeleteId !== null && (
        <BmCmsModal
          title="Delete Blog"
          onClose={() => setBlogDeleteId(null)}
        >
          <p className="text-sm text-[color:var(--secondary-text)]">
            Are you sure you want to delete this blog?
          </p>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setBlogDeleteId(null)}
              className={BM_CMS_BUTTON}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={BM_CMS_BLOG_DELETE}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
            >
              Confirm Delete
            </button>
          </div>
        </BmCmsModal>
      )}

      {/* =====================================================
          TAB 7 — FAQ
      ===================================================== */}

      {activeTab === "Frequently Asked Questions" && (
        <section className="bmCms-faq max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
                Manage the questions and answers displayed on the guest page.
              </p>
            </div>

            <button
              type="button"
              onClick={BM_CMS_OPEN_ADD_FAQ}
              className={BM_CMS_YELLOW_BUTTON}
            >
              <span className="inline-flex items-center gap-2">
                <Plus size={15} />
                Add FAQ
              </span>
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`${BM_CMS_CARD} flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-[color:var(--primary-text)]">
                    {faq.question}
                  </h3>

                  <p className="mt-2 whitespace-pre-line text-sm text-[color:var(--secondary-text)]">
                    {faq.answer || "No answer added yet."}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded px-2 py-1 text-xs ${
                      faq.active
                        ? "bg-green-50 text-green-700"
                        : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"
                    }`}
                  >
                    {faq.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <BmCmsSwitch
                    checked={faq.active}
                    onChange={() => BM_CMS_TOGGLE_FAQ(faq.id)}
                    label={`Toggle ${faq.question}`}
                  />

                  <button
                    type="button"
                    onClick={() => BM_CMS_OPEN_EDIT_FAQ(faq)}
                    className={BM_CMS_ICON_BUTTON}
                    aria-label="Edit FAQ"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => BM_CMS_DELETE_FAQ(faq.id)}
                    className={`${BM_CMS_ICON_BUTTON} text-red-500`}
                    aria-label="Delete FAQ"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ADD / EDIT FAQ MODAL */}
      {faqModalOpen && (
        <BmCmsModal
          title={faqEditId === null ? "Add FAQ" : "Edit FAQ"}
          onClose={() => setFaqModalOpen(false)}
        >
          <div>
            <label htmlFor="bmCmsFaqQuestion" className={BM_CMS_LABEL}>
              Question
            </label>
            <input
              id="bmCmsFaqQuestion"
              value={faqForm.question}
              onChange={(e) =>
                setFaqForm((old) => ({
                  ...old,
                  question: e.target.value,
                }))
              }
              className={BM_CMS_INPUT}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="bmCmsFaqAnswer" className={BM_CMS_LABEL}>
              Answer
            </label>
            <textarea
              id="bmCmsFaqAnswer"
              rows={5}
              value={faqForm.answer}
              onChange={(e) =>
                setFaqForm((old) => ({
                  ...old,
                  answer: e.target.value,
                }))
              }
              className={BM_CMS_INPUT}
            />
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
            <input
              type="checkbox"
              checked={faqForm.active}
              onChange={(e) =>
                setFaqForm((old) => ({
                  ...old,
                  active: e.target.checked,
                }))
              }
              className="h-4 w-4 accent-[var(--primary-yellow)]"
            />
            Active
          </label>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setFaqModalOpen(false)}
              className={BM_CMS_BUTTON}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={BM_CMS_SAVE_FAQ}
              disabled={!faqForm.question.trim()}
              className={BM_CMS_YELLOW_BUTTON}
            >
              Save FAQ
            </button>
          </div>
        </BmCmsModal>
      )}

      {/* =====================================================
          TAB 8 — PLATFORM & BRANDING
      ===================================================== */}

      {activeTab === "Platform & Branding" && (
        <section className="bmCms-platform max-w-3xl">
          <h2 className="text-lg font-semibold text-[color:var(--primary-text)]">
            Platform & Branding
          </h2>

          <div className={`${BM_CMS_CARD} mt-5`}>
            <h3 className={BM_CMS_CARD_TITLE}>Platform Information</h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bmCmsPlatformName" className={BM_CMS_LABEL}>
                  Platform Name
                </label>
                <input
                  id="bmCmsPlatformName"
                  value={platform.platformName}
                  onChange={(e) =>
                    BM_CMS_CHANGE_PLATFORM("platformName", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>

              <div>
                <label htmlFor="bmCmsTagline" className={BM_CMS_LABEL}>
                  Tagline
                </label>
                <input
                  id="bmCmsTagline"
                  value={platform.tagline}
                  onChange={(e) =>
                    BM_CMS_CHANGE_PLATFORM("tagline", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>

              <div>
                <label htmlFor="bmCmsPlatformPhone" className={BM_CMS_LABEL}>
                  Contact Phone
                </label>
                <input
                  id="bmCmsPlatformPhone"
                  value={platform.phone}
                  onChange={(e) =>
                    BM_CMS_CHANGE_PLATFORM("phone", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>

              <div>
                <label htmlFor="bmCmsPlatformEmail" className={BM_CMS_LABEL}>
                  Contact Email
                </label>
                <input
                  id="bmCmsPlatformEmail"
                  type="email"
                  value={platform.supportEmail}
                  onChange={(e) =>
                    BM_CMS_CHANGE_PLATFORM("supportEmail", e.target.value)
                  }
                  className={BM_CMS_INPUT}
                />
              </div>
            </div>
          </div>

          <div className={`${BM_CMS_CARD} mt-5`}>
            <h3 className={BM_CMS_CARD_TITLE}>Branding</h3>

            <div className="mt-4">
              <label className={BM_CMS_LABEL}>Platform Logo</label>

              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--off-white-background)]">
                  {brandLogo ? (
                    <Image
                      src={brandLogo}
                      alt="BuildMart logo"
                      fill
                      unoptimized
                      className="object-contain p-2"
                    />
                  ) : (
                    <ImageIcon
                      size={24}
                      className="text-[color:var(--secondary-text)]"
                    />
                  )}
                </div>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)]">
                  <Upload size={16} />
                  {brandLogoName || "Upload Logo"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={BM_CMS_UPLOAD_LOGO}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => BM_CMS_SHOW_TOAST("Platform settings saved")}
                className={BM_CMS_YELLOW_BUTTON}
              >
                Save Changes
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          HERO / BANNER CREATE AND EDIT MODAL
      ===================================================== */}

      {itemModal && (
        <BmCmsModal
          title={`${itemModal.item ? "Edit" : "Create New"} ${
            BM_CMS_NAMES[itemModal.kind]
          }`}
          onClose={() => setItemModal(null)}
        >
          <div>
            <label htmlFor="bmCmsItemTitle" className={BM_CMS_LABEL}>
              Title / Heading
            </label>
            <input
              id="bmCmsItemTitle"
              value={itemForm.title}
              onChange={(e) =>
                BM_CMS_CHANGE_ITEM("title", e.target.value)
              }
              className={BM_CMS_INPUT}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="bmCmsItemDescription" className={BM_CMS_LABEL}>
              Description / Text
            </label>
            <textarea
              id="bmCmsItemDescription"
              rows={3}
              value={itemForm.description}
              onChange={(e) =>
                BM_CMS_CHANGE_ITEM("description", e.target.value)
              }
              className={BM_CMS_INPUT}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="bmCmsItemImage" className={BM_CMS_LABEL}>
              Image File Upload
            </label>
            <input
              id="bmCmsItemImage"
              type="file"
              accept="image/*"
              onChange={BM_CMS_UPLOAD_ITEM_IMAGE}
              className="block w-full text-sm text-[color:var(--primary-text)]"
            />

            {itemForm.image && (
              <div className="relative mt-3 h-24 w-40 overflow-hidden rounded-md">
                <BmCmsImage src={itemForm.image} alt="Selected image" />
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bmCmsItemButtonText" className={BM_CMS_LABEL}>
                Button Text
              </label>
              <input
                id="bmCmsItemButtonText"
                value={itemForm.buttonText}
                onChange={(e) =>
                  BM_CMS_CHANGE_ITEM("buttonText", e.target.value)
                }
                className={BM_CMS_INPUT}
              />
            </div>

            <div>
              <label htmlFor="bmCmsItemButtonLink" className={BM_CMS_LABEL}>
                Button Link
              </label>
              <input
                id="bmCmsItemButtonLink"
                value={itemForm.buttonLink}
                onChange={(e) =>
                  BM_CMS_CHANGE_ITEM("buttonLink", e.target.value)
                }
                placeholder="/materials"
                className={BM_CMS_INPUT}
              />
            </div>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-[color:var(--primary-text)]">
            <BmCmsSwitch
              checked={itemForm.active}
              onChange={() =>
                BM_CMS_CHANGE_ITEM("active", !itemForm.active)
              }
              label="Active"
            />
            Active
          </label>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setItemModal(null)}
              className={BM_CMS_BUTTON}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={BM_CMS_SAVE_ITEM}
              disabled={!itemForm.title.trim()}
              className={BM_CMS_YELLOW_BUTTON}
            >
              Save {BM_CMS_NAMES[itemModal.kind]}
            </button>
          </div>
        </BmCmsModal>
      )}

      {/* HERO / BANNER PREVIEW MODAL */}
      {itemPreview && (
        <BmCmsModal
          title="Preview"
          onClose={() => setItemPreview(null)}
        >
          <div className="relative aspect-video overflow-hidden rounded-md bg-[var(--off-white-background)]">
            {itemPreview.image && (
              <BmCmsImage
                src={itemPreview.image}
                alt={itemPreview.title}
              />
            )}
          </div>

          <h3 className="mt-3 font-semibold text-[color:var(--primary-text)]">
            {itemPreview.title}
          </h3>

          <p className="mt-1 text-sm text-[color:var(--secondary-text)]">
            {itemPreview.description}
          </p>

          <p className="mt-2 text-xs text-[color:var(--secondary-text)]">
            {itemPreview.active ? "Active" : "Inactive"}
          </p>
        </BmCmsModal>
      )}

      {/* HERO / BANNER DELETE MODAL */}
      {itemDelete && (
        <BmCmsModal
          title={`Delete ${BM_CMS_NAMES[itemDelete.kind]}?`}
          onClose={() => setItemDelete(null)}
        >
          <p className="text-sm text-[color:var(--secondary-text)]">
            Delete "{itemDelete.item.title}". This cannot be undone.
          </p>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setItemDelete(null)}
              className={BM_CMS_BUTTON}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={BM_CMS_DELETE_ITEM}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
            >
              Confirm Delete
            </button>
          </div>
        </BmCmsModal>
      )}

      {/* TOAST */}
      {toast && (
        <div className="bmCms-toast fixed bottom-5 right-4 z-[60] rounded-md bg-[var(--charcoal-black)] px-4 py-3 text-sm text-white shadow-xl sm:right-6">
          {toast}
        </div>
      )}
    </main>
  );
}