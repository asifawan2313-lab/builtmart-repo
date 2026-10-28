"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HardHat, Menu, X } from "lucide-react";

// 1) Links ka simple data (har link ka apna unique id)
const BM_NAV_LINKS = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Materials", href: "/BmMaterials" },
  { id: 3, label: "Suppliers", href: "/suppliers" },
  { id: 4, label: "About", href: "/about" },
  { id: 5, label: "Contact", href: "/contact-us" },
];

export default function BmNavbar() {
  // Abhi kaun sa page khula hai (active link ke liye)
  const pathname = usePathname();

  // Choti screen ka menu khula hai ya band
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2) Buttons ke simple handlers
  const handleLogin = () => {
    console.log("Log In clicked");
    setIsMenuOpen(false);
  };

  const handleSignUp = () => {
    console.log("Sign Up clicked");
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Home sirf "/" par active hoga, baaki links apne route par
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Bari screen ke links: active = peela, baaki safed (hover par peela)
  const activeLinkClass = "text-[color:var(--primary-yellow)]";
  const normalLinkClass =
    "text-[color:var(--white-cards)] hover:text-[color:var(--primary-yellow)]";

  // Choti screen ke menu links: active = peela text + dabba, baaki safed
  const menuActiveLinkClass =
    "bg-[var(--industrial-blue-grey)] text-[color:var(--primary-yellow)]";
  const menuNormalLinkClass =
    "text-[color:var(--white-cards)] hover:bg-[var(--industrial-blue-grey)]";

  return (
    <header className="bm-navbar-root sticky top-0 z-50 w-full bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
      <div className="bm-navbar-container mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-10 2xl:h-24 2xl:px-12">
        {/* 3) Left side: peela dabba (hard hat) + BuildMart */}
        <Link
          href="/"
          aria-label="BuildMart - Home"
          className="bm-navbar-brand flex shrink-0 items-center gap-3"
        >
          <span className="bm-navbar-brand-icon flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] 2xl:h-14 2xl:w-14">
            <HardHat size={24} />
          </span>
          <span className="bm-navbar-brand-name text-2xl leading-none font-[family-name:Baloo2-Bold] 2xl:text-4xl">
            Build<span className="text-[color:var(--primary-yellow)]">Mart</span>
          </span>
        </Link>

        {/* 4) Beech mein: links (sirf lg yaani laptop aur bari screen par) */}
        <nav className="bm-navbar-nav hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-8 2xl:gap-10">
            {BM_NAV_LINKS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`bm-navbar-link block py-2 text-base font-[family-name:Poppins-Medium] whitespace-nowrap 2xl:text-lg ${
                    isActive(item.href) ? activeLinkClass : normalLinkClass
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 5) Right side: Log In + Sign Up + menu button */}
        <div className="bm-navbar-actions flex shrink-0 items-center gap-3">
          {/* Log In: sm se bari screen par nazar aata hai */}
          <button
            type="button"
            onClick={handleLogin}
            className="bm-navbar-login-btn hidden rounded-md border border-[color:var(--border-color)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)] sm:block 2xl:px-6 2xl:py-3.5 2xl:text-base"
          >
            Log In
          </button>

          {/* Sign Up: sm se bari screen par nazar aata hai */}
          <button
            type="button"
            onClick={handleSignUp}
            className="bm-navbar-signup-btn hidden rounded-md bg-[var(--primary-yellow)] px-4 py-2.5 text-sm font-[family-name:Poppins-Bold] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:block 2xl:px-6 2xl:py-3.5 2xl:text-base"
          >
            Sign Up
          </button>

          {/* Menu button: sirf lg se choti screen par */}
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="bm-navbar-menu"
            className="bm-navbar-menu-btn flex h-10 w-10 items-center justify-center rounded-md hover:bg-[var(--industrial-blue-grey)] lg:hidden"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 6) Choti screen ka menu (lg se choti screen par, menu button dabane par) */}
      {isMenuOpen && (
        <div
          id="bm-navbar-menu"
          className="bm-navbar-menu absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[color:var(--industrial-blue-grey)] bg-[var(--deep-charcoal)] px-4 py-4 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {BM_NAV_LINKS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={handleMenuClose}
                  className={`bm-navbar-menu-link block rounded-md px-3 py-3 text-base font-[family-name:Poppins-Medium] ${
                    isActive(item.href) ? menuActiveLinkClass : menuNormalLinkClass
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Log In + Sign Up menu ke andar (sirf phone par, kyunke sm se bar mein hain) */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[color:var(--industrial-blue-grey)] pt-4 sm:hidden">
            <button
              type="button"
              onClick={handleLogin}
              className="bm-navbar-menu-login-btn rounded-md border border-[color:var(--border-color)] py-3 text-base font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)]"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="bm-navbar-menu-signup-btn rounded-md bg-[var(--primary-yellow)] py-3 text-base font-[family-name:Poppins-Bold] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}