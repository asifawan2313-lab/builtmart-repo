"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Boxes,
  CircleHelp,
  HardHat,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Recycle,
  ShieldAlert,
  ShoppingCart,
  Star,
  Truck,
  UserCog,
  Wallet,
  X,
} from "lucide-react";

// Menu (simple list, shown directly). "badge" is the small yellow count.
const menu = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "My Materials", href: "/supplier/materials", icon: Package },
  { label: "Orders", href: "/supplierpanel/Orders", icon: ShoppingCart, badge: 1 },
  { label: "Reviews & Ratings", href: "/supplier/reviews", icon: Star },
  { label: "Payments & Wallet", href: "/supplier/payments", icon: Wallet },
  { label: "Notifications", href: "/supplier/notifications", icon: Bell },
  { label: "My Profile & Settings", href: "/supplier/profile", icon: UserCog },
  { label: "Inventory", href: "/supplier/inventory", icon: Boxes },
  { label: "Customer Enquiries", href: "/supplier/enquiries", icon: CircleHelp, badge: 2 },
  { label: "Messages", href: "/supplier/messages", icon: MessageSquare, badge: 3 },
  { label: "Customer Reused Materials", href: "/supplier/reused-materials", icon: Recycle },
  { label: "Deliveries", href: "/supplier/deliveries", icon: Truck },
  { label: "Disputes & Support", href: "/supplier/support", icon: ShieldAlert },
  { label: "Reports", href: "/supplier/reports", icon: BarChart3 },
];

export default function SupplierSidebar({ isOpen = false, onClose = () => {} }) {
  const pathname = usePathname();

  // Simple handler (connect it to real logout later)
  const handleLogout = () => {};

  return (
    <>
      {/* Dark background behind the menu on mobile */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar: slides in on mobile, fixed (sticky) on desktop */}
      <aside
        aria-label="Supplier menu"
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-[#202124] text-white shadow-2xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href="/supplier/dashboard" onClick={onClose} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffc61a] text-[#202124] shadow-md">
              <HardHat size={22} />
            </span>
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-baloo)] text-lg font-bold">
                Build<span className="text-[#ffc61a]">Mart</span>
              </span>
              <span className="block text-[10px] font-medium tracking-[0.2em] text-white/60">
                SUPPLIER PANEL
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 [scrollbar-width:thin]">
          {menu.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium leading-tight transition-colors duration-200 ${
                  isActive
                    ? "bg-[#ffc61a] text-[#202124] shadow-md"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      isActive ? "bg-[#202124] text-[#ffc61a]" : "bg-[#ffc61a] text-[#202124]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}