"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  FileWarning,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Recycle,
  ShoppingBag,
  UserCog,
  X,
} from "lucide-react";

// href null = page abhi bana nahi (click par kuch nahi hoga, 404 nahi aayega).
// Page banne par us item ka href asli route se badal dein, jaise "/customer/orders".
const MENU = [
  { id: 1, label: "Dashboard", href: "/customer", icon: LayoutDashboard },
  // { id: 2, label: "My Orders", href: null, icon: ShoppingBag },
  { id: 2, label: "My Orders", href: "/customer/orders", icon: ShoppingBag },
  // { id: 3, label: "Favourites", href: null, icon: Heart },
  { id: 3, label: "Favourites", href: "/customer/favourites", icon: Heart },
  //{ id: 4, label: "My Inquiries", href: null, icon: MessageSquare },
  { id: 4, label: "My Inquiries", href: "/customer/inquiries", icon: MessageSquare },
 // { id: 5, label: "Disputes", href: null, icon: FileWarning },
 { id: 5, label: "Disputes", href: "/customer/disputes", icon: FileWarning },
 // { id: 6, label: "My Used Materials", href: null, icon: Recycle },
 { id: 6, label: "My Used Materials", href: "/customer/used-materials", icon: Recycle },
 // { id: 7, label: "Notifications", href: null, icon: Bell },
 { id: 7, label: "Notifications", href: "/customer/notifications", icon: Bell },
  //{ id: 8, label: "Profile & Settings", href: null, icon: UserCog },
  { id: 8, label: "Profile & Settings", href: "/customer/profile", icon: UserCog },
];

const itemClass =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";
const normalClass = "text-white hover:bg-[#FDC716]/25";

const BmCustomerSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile par sidebar khula hai ya nahi

  const isActive = (href) => !!href && (href === "/customer" ? pathname === href : pathname.startsWith(href));
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="fixed left-3 top-3 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#45484D] bg-[#202124] text-white shadow-sm lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Mobile parda */}
      {open && <div onClick={handleClose} className="fixed inset-0 z-40 bg-black/50 lg:hidden" aria-hidden="true" />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#45484D] bg-[#202124] transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand: sirf text */}
        <div className="flex h-16 items-center justify-between border-b border-[#45484D] px-5">
          <span className="text-xl font-extrabold text-white">BuildMart</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={handleClose}
            className="cursor-pointer text-[#A7ADB4] hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Customer menu" className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {MENU.map(({ id, label, href, icon: MenuIcon }) => {
              const className = `${itemClass} ${isActive(href) ? "bg-[#FDC716] text-[#202124]" : normalClass}`;

              return (
                <li key={id}>
                  {href ? (
                    <Link
                      href={href}
                      onClick={handleClose}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={className}
                    >
                      <MenuIcon size={18} aria-hidden="true" />
                      {label}
                    </Link>
                  ) : (
                    <button type="button" className={`${className} cursor-pointer text-left`}>
                      <MenuIcon size={18} aria-hidden="true" />
                      {label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout: abhi koi logout flow nahi, is liye sirf button */}
        <div className="border-t border-[#45484D] p-3">
          <button type="button" className={`${itemClass} ${normalClass} cursor-pointer`}>
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default BmCustomerSidebar;