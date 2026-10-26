"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </>
    ),
  },
  {
    label: "Supplier Verification",
  href: "/admin/supplier-verification",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    label: "Listings Moderation",
    href: "/admin/listings",
    icon: (
      <>
        <path d="m3 17 2 2 4-4" />
        <path d="m3 7 2 2 4-4" />
        <path d="M13 6h8M13 12h8M13 18h8" />
      </>
    ),
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    label: "Sub Admin",
    href: "/admin/sub-admins",
    icon: (
      <>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    label: "Rider",
    href: "/admin/riders",
    icon: (
      <>
        <circle cx="18.5" cy="17.5" r="3.5" />
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="15" cy="5" r="1" />
        <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
      </>
    ),
  },
  {
    label: "Complaints & Reports",
    href: "/admin/complaints",
    badge: 1, // number badal dein, ya hata dein
    icon: (
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
  },
  {
    label: "Logout",
    href: "/login",
    icon: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5M21 12H9" />
      </>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  // Dashboard sirf /admin par active ho, baaki apne page aur uske andar ke pages par
  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-neutral-200 bg-white p-5">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-white">
          BM
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Admin Panel</p>
          <p className="text-[10px] text-neutral-500">BuildMart Gujranwala</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 text-sm text-neutral-700">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-100 ${
              isActive(item.href) ? "bg-neutral-100 font-semibold text-neutral-900" : ""
            }`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {item.icon}
            </svg>
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                {item.badge}
              </span>
            ) : (
              <span className="text-neutral-400">&rsaquo;</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}