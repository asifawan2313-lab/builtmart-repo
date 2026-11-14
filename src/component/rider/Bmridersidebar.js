"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Banknote,
  Bell,
  CircleDollarSign,
  ClipboardList,
  Gavel,
  HandCoins,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Route,
  Settings,
  SlidersHorizontal,
  Truck,
  User,
  Wallet,
  MessageCircle,
  TriangleAlert,
  X,
} from "lucide-react";

// ========== DATA ==========
// Menu ke items. Naya page add karna ho to bas aik { ... } aur likh dein.
const BM_MENU = [
  { id: 1, label: "Dashboard", href: "/rider/dashboard", icon: LayoutDashboard },
  { id: 2, label: "Delivery Requets", href: "/rider/requets", icon: ClipboardList },
  // { id: 3, label: "My Bids", href: "/rider/bids", icon: Gavel },
  { id: 3, label: "Fixed Rate Settings", href: "/rider/fixed-rates", icon: SlidersHorizontal },
  { id: 4, label: "My Deliveries", href: "/rider/deliveries", icon: Route },
  { id: 5, label: "Delivery History", href: "/rider/history", icon: History },
  // { id: 7, label: "COD Collection", href: "/rider/cod-collection", icon: HandCoins },
  { id: 6, label: "Wallet", href: "/rider/wallet", icon: Wallet },
  { id: 7, label: "My Earnings", href: "/rider/earnings", icon: CircleDollarSign },
  { id: 8, label: "Notifications", href: "/rider/notifications", icon: Bell },
  { id: 9, label: "Messages", href: "/rider/messages", icon: MessageCircle },
  { id: 10, label: "Disputes", href: "/rider/disputes", icon: TriangleAlert },
  { id: 11, label: "My Profile", href: "/rider/profile", icon: User },

  
];

export default function BmRiderSidebar() {
  const router = useRouter();
  const pathname = usePathname(); // abhi kaun sa page khula hai
  const [isOpen, setIsOpen] = useState(false); // sirf mobile: menu khula ya band

  // ===== Handlers =====
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Menu item par click: page kholo, mobile par menu band karo
  const handleNavigate = (href) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* ----- Mobile / tablet top bar (laptop par chhupa hota hai) ----- */}
      <div className="bmRiderSidebar-topBar sticky top-0 z-30 flex items-center justify-between bg-[var(--deep-charcoal)] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2 text-[color:var(--white-cards)]">
          <Truck size={22} className="text-[color:var(--primary-yellow)]" />
          <span className="font-[family-name:Baloo2-Bold] text-xl">BuildMart</span>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open menu"
          className="cursor-pointer rounded-md p-1.5 text-[color:var(--white-cards)] hover:bg-white/10"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ----- Mobile: andhera parda (is par click se menu band) ----- */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="bmRiderSidebar-overlay fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ----- Sidebar: mobile par slide hota hai, laptop par hamesha nazar ata hai ----- */}
      <aside
        className={`bmRiderSidebar-root fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[var(--deep-charcoal)] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="bmRiderSidebar-brand flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2 text-[color:var(--white-cards)]">
            <Truck size={24} className="text-[color:var(--primary-yellow)]" />
            <span className="font-[family-name:Baloo2-Bold] text-xl">BuildMart</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close menu"
            className="cursor-pointer rounded-md p-1 text-[color:var(--border-color)] hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chhota heading */}
        <p className="bmRiderSidebar-label px-5 pb-2 pt-5 text-[11px] uppercase tracking-wider text-[color:var(--border-color)]/70">
          Rider Workspace · Demo
        </p>

        {/* Menu items (zyada hon to scroll hota hai) */}
        <nav className="bmRiderSidebar-nav flex-1 overflow-y-auto px-3 pb-3">
          <ul className="flex flex-col gap-1">
            {BM_MENU.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.href)}
                    className={`bmRiderSidebar-item flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-300 ${
                      isActive
                        ? "bg-[var(--primary-yellow)] font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]"
                        : "text-[color:var(--white-cards)] hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.6} className="shrink-0" />
                    <span className="min-w-0 truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout (sab se neeche) */}
        <div className="bmRiderSidebar-bottom border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="bmRiderSidebar-logout flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-[color:var(--white-cards)] transition-colors duration-300 hover:bg-white/10"
          >
            <LogOut size={18} strokeWidth={1.6} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}