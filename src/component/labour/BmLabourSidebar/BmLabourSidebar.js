"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  CalendarCheck,
  Gavel,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  User,
  Wallet,
  Wrench,
  X,
} from "lucide-react";

const items = [
  { id: 1, label: "Dashboard", href: "/labour/dashboard", icon: LayoutDashboard },
  { id: 2, label: "My Specializations", href: "/labour/specializations", icon: Wrench },
  { id: 3, label: "Labour Requests", href: "/labour/requests", icon: Inbox },
  { id: 4, label: "My Bids", href: "/labour/bids", icon: Gavel },
  { id: 5, label: "My Bookings", href: "/labour/bookings", icon: CalendarCheck },
  { id: 6, label: "Chat / Messages", href: "/labour/messages", icon: MessageSquare },
  { id: 7, label: "Payments & Wallet", href: "/labour/wallet", icon: Wallet },
  { id: 8, label: "Notifications", href: "/labour/notifications", icon: Bell },
  { id: 9, label: "My Profile & Settings", href: "/labour/profile", icon: User },
  { id: 10, label: "Logout", href: "/labour/sign-in", icon: LogOut },
];

const BmLabourSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // chhoti screen par menu khula hai ya band

  return (
    <>
      {/* Menu button: sirf lg se choti screen par */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed left-3 top-3 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[#292929] text-white ring-1 ring-[#FDC716] lg:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-[#384452] bg-[#292929] pt-16 transition-transform lg:translate-x-0 lg:pt-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 px-3 pb-6">
          {items.map(({ id, label, href, icon: ItemIcon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={id}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#FDC716] text-[#292929]"
                    : "text-gray-200 hover:bg-[#FFF0A8] hover:text-[#292929] active:bg-[#FDC716] active:text-[#292929]"
                }`}
              >
                <ItemIcon size={18} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default BmLabourSidebar;