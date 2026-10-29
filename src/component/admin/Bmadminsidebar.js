"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HardHat,
  X,
  LayoutDashboard,
  Users,
  Layers,
  Package,
  ShoppingCart,
  Truck,
  Wallet,
  MessagesSquare,
  Newspaper,
  House,
  Mail,
  Star,
  Bell,
  ChartColumn,
  Settings,
  LogOut,
} from "lucide-react";

const BM_ADMIN_MENU = [
  { id: 1, label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { id: 2, label: "User Management", href: "/admin/users", icon: Users },
  { id: 3, label: "Material Categories", href: "/admin/categories", icon: Layers },
  { id: 4, label: "Material Management", href: "/admin/materials", icon: Package },
  { id: 5, label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { id: 6, label: "Deliveries & Riders", href: "/admin/deliveries", icon: Truck },
  // { id: 7, label: "Top-Up Requests", href: "/admin/payments", icon: Wallet },

  { id: 7, label: "Top-Up Requests", href: "/admin/payments", icon: Wallet },
  { id: 8, label: "Disputes & Support", href: "/admin/disputes", icon: MessagesSquare },
  { id: 9, label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { id: 10, label: "Homepage / CMS", href: "/admin/homepage-cms", icon: House },
  { id: 11, label: "Contact Management", href: "/admin/contacts", icon: Mail },
  { id: 12, label: "Reviews & Ratings", href: "/admin/reviews", icon: Star },
  { id: 13, label: "Notifications", href: "/admin/notifications", icon: Bell },
  { id: 14, label: "Reports & Analytics", href: "/admin/reports", icon: ChartColumn },
  { id: 15, label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function BmAdminSidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();
  const isActive = (href) => pathname.startsWith(href);

  const handleLogout = () => {
    console.log("Logout clicked");
    onClose();
  };

  const itemBase =
    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[15px] transition-colors duration-200";
  const activeClass = "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]";
  const normalClass =
    "text-[color:var(--border-color)] hover:bg-[var(--industrial-blue-grey)] hover:text-[color:var(--white-cards)]";

  return (
    <>
      {/* Dark parda: sirf choti screen par */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Laptop par jagah gherne wala khali block */}
      <div aria-hidden="true" className="hidden shrink-0 lg:block lg:w-[306px]" />

      {/* Asli sidebar: hamesha fixed */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[var(--deep-charcoal)] text-[color:var(--white-cards)] transition-transform duration-300 lg:w-[306px] lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--industrial-blue-grey)] px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]">
              <HardHat size={24} />
            </span>
            <div>
              <p className="text-lg leading-tight">BuildMart</p>
              <p className="text-[11px] tracking-widest text-[color:var(--primary-yellow)] uppercase">
                Admin Panel
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

        <nav aria-label="Admin menu" className="flex-1 overflow-y-auto px-2.5 py-3">
          <ul className="flex flex-col gap-1">
            {BM_ADMIN_MENU.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`${itemBase} ${isActive(item.href) ? activeClass : normalClass}`}
                  >
                    <Icon size={20} className="shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 border-t border-[color:var(--industrial-blue-grey)] pt-3">
            <button type="button" onClick={handleLogout} className={`${itemBase} ${normalClass}`}>
              <LogOut size={20} className="shrink-0" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}