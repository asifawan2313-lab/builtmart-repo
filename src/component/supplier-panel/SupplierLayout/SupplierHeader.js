"use client";

import Link from "next/link";
import { Bell, Menu } from "lucide-react";

// DEMO DATA: sirf UI ke liye, baad mein asal data se badlein
const user = { name: "Muhammad Usman", initial: "A" };
const shopName = "Al-Madina Building Materials";
const status = "Pending Verification";

export default function SupplierHeader({ onMenuClick = () => {} }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-[#202124] px-4 text-white sm:px-6">
      {/* Menu button: sirf mobile aur tablet par */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Welcome text */}
      <p className="min-w-0 flex-1 truncate text-sm text-white/90">
        <span className="hidden sm:inline">Welcome back, </span>
        <b className="font-semibold text-white">{user.name}</b>
      </p>

      {/* Shop button: tablet se upar nazar aata hai */}
      <button
        type="button"
        className="hidden max-w-[200px] truncate rounded-md bg-white px-3 py-1.5 text-xs font-medium text-[#202124] transition hover:bg-[#F4F4F2] md:block"
      >
        {shopName}
      </button>

      {/* Verification status */}
      <span className="hidden whitespace-nowrap rounded-full border border-[#ffc61a]/30 bg-[#ffc61a]/15 px-3 py-1 text-xs font-medium text-[#ffc61a] sm:block">
        {status}
      </span>

      {/* Notifications */}
      <Link
        href="/supplierpanel/notifications"
        aria-label="Notifications"
        className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <Bell size={20} />
      </Link>

      {/* Avatar */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffc61a] text-sm font-bold text-[#202124]">
        {user.initial}
      </span>
    </header>
  );
}