"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HardHat,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Wallet,
  Bell,
  Boxes,
  CircleHelp,
  MessageSquare,
  Recycle,
  Truck,
  ShieldAlert,
  ChartColumn,
  CircleUser,
  LogOut,
} from "lucide-react";

// 1) Menu ka simple data (har item ka unique id).
//    badge: chhota number (jaise 2 naye enquiries). Abhi sample hai.
//    My Profile & Settings sab se aakhir mein hai.
const BM_SUPPLIER_MENU = [
  { id: 1, label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { id: 2, label: "My Materials", href: "/supplier/my-materials", icon: Package },
  { id: 3, label: "Orders", href: "/supplier/orders", icon: ShoppingCart },
  { id: 4, label: "Reviews & Ratings", href: "/supplier/reviews", icon: Star },
  { id: 5, label: "Payments & Wallet", href: "/supplier/wallet", icon: Wallet },
  { id: 6, label: "Notifications", href: "/supplier/notifications", icon: Bell },
  { id: 7, label: "Inventory", href: "/supplier/inventory", icon: Boxes },
  { id: 8, label: "Customer Enquiries", href: "/supplier/enquiries", icon: CircleHelp, badge: 2 },
  { id: 9, label: "Messages", href: "/supplier/messages", icon: MessageSquare, badge: 1 },
  { id: 10, label: "Customer Reused Materials", href: "/supplier/reused-materials", icon: Recycle },
  { id: 11, label: "Deliveries", href: "/supplier/deliveries", icon: Truck },
  { id: 12, label: "Disputes & Support", href: "/supplier/disputes", icon: ShieldAlert },
  { id: 13, label: "Reports", href: "/supplier/reports", icon: ChartColumn },
  { id: 14, label: "My Profile & Settings", href: "/supplier/profile", icon: CircleUser },
];

// Menu items ki styling
const itemBase =
  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-[family-name:Poppins-Medium] transition-colors duration-200";
const activeClass = "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]";
const normalClass =
  "text-[color:var(--border-color)] hover:bg-[var(--industrial-blue-grey)] hover:text-[color:var(--white-cards)]";

// isOpen / onClose: sirf choti screen (phone, tablet) ke liye.
// Laptop par sidebar hamesha nazar aata hai.
const BmSupplierSidebar = ({ isOpen = false, onClose = () => {} }) => {
  // Abhi kaun sa page khula hai (active item ke liye)
  const pathname = usePathname();

  // Kisi bhi item par click karne se us ka raasta khule to wo active hai
  const isActive = (href) => pathname.startsWith(href);

  // 2) Logout ka simple handler
  const handleLogout = () => {
    console.log("Logout clicked");
    onClose();
  };

  // Esc dabane se band, khula ho to page scroll band
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  // Screen bari ho jaye (laptop) to drawer khud band ho jaye
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      {/* Dark parda (sirf choti screen par, jab sidebar khula ho) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`bm-supplierSidebar-overlay fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`bm-supplierSidebar-root fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[var(--deep-charcoal)] text-[color:var(--white-cards)] transition-transform duration-300 lg:w-[306px] lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 3) Upar: logo + SUPPLIER PANEL (+ band karne ka X, sirf choti screen par) */}
        <div className="bm-supplierSidebar-header flex items-center justify-between gap-3 border-b border-[color:var(--industrial-blue-grey)] px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]">
              <HardHat size={24} />
            </span>
            <div>
              <p className="text-lg leading-tight font-[family-name:Baloo2-Bold]">
                Build<span className="text-[color:var(--primary-yellow)]">Mart</span>
              </p>
              <p className="text-[11px] tracking-widest text-[color:var(--border-color)] uppercase">
                Supplier Panel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-[var(--industrial-blue-grey)] lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* 4) Menu + Logout (andar se scroll hota hai, to koi item chhupta nahi) */}
        <nav
          aria-label="Supplier menu"
          className="bm-supplierSidebar-nav flex-1 overflow-y-auto px-2.5 py-3 [scrollbar-color:var(--industrial-blue-grey)_transparent] [scrollbar-width:thin]"
        >
          <ul className="flex flex-col gap-1">
            {BM_SUPPLIER_MENU.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`bm-supplierSidebar-link ${itemBase} ${
                      active ? activeClass : normalClass
                    }`}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="flex-1">{item.label}</span>

                    {/* Chhota number (agar ho) */}
                    {item.badge && (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
                          active
                            ? "bg-[var(--charcoal-black)] text-[color:var(--white-cards)]"
                            : "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout: menu ke foran baad, lakeer ke saath */}
          <div className="mt-3 border-t border-[color:var(--industrial-blue-grey)] pt-3">
            <button
              type="button"
              onClick={handleLogout}
              className={`bm-supplierSidebar-logout-btn ${itemBase} ${normalClass}`}
            >
              <LogOut size={20} className="shrink-0" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default BmSupplierSidebar;