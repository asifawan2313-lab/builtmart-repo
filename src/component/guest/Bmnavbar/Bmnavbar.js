// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Heart, HardHat, Menu, ShoppingCart, X } from "lucide-react";

// // href null = page abhi bana nahi (button banta hai, 404 nahi aata)
// const BM_NAV_LINKS = [
//   { id: 1, label: "Home", href: "/" },
//   { id: 2, label: "Materials", href: "/materials" },
//   // { id: 3, label: "Labour", href: "/labour" },
//   { id: 4, label: "Suppliers", href: "/suppliers" },
//  // { id: 5, label: "Used Material", href: "/materials/used-bricks" },
//   { id: 6, label: "About Us", href: "/about" },
//   { id: 7, label: "Contact Us", href: "/contact-us" },
//   { id: 8, label: "Blogs", href: "/blogs" },
// ];

// const BM_ICON_LINKS = [
//   { id: 1, label: "Wishlist", href: null, icon: Heart },
//   { id: 2, label: "Cart", href: null, icon: ShoppingCart },
// ];

// const iconClass =
//   "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[color:var(--white-cards)] transition-colors hover:bg-[var(--industrial-blue-grey)] hover:text-[color:var(--primary-yellow)]";
// const loginClass =
//   "hidden rounded-md border border-[color:var(--border-color)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)] sm:block 2xl:px-6 2xl:py-3.5 2xl:text-base";
// const signUpClass =
//   "hidden rounded-md bg-[var(--primary-yellow)] px-4 py-2.5 text-sm font-[family-name:Poppins-Bold] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:block 2xl:px-6 2xl:py-3.5 2xl:text-base";

// const BmNavbar = () => {
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
//   const handleMenuClose = () => setIsMenuOpen(false);

//   // Home sirf "/" par active, baaki apne route par
//   const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

//   const activeLinkClass = "text-[color:var(--primary-yellow)]";
//   const normalLinkClass = "text-[color:var(--white-cards)] hover:text-[color:var(--primary-yellow)]";
//   const menuActiveLinkClass = "bg-[var(--industrial-blue-grey)] text-[color:var(--primary-yellow)]";
//   const menuNormalLinkClass = "text-[color:var(--white-cards)] hover:bg-[var(--industrial-blue-grey)]";

//   return (
//     <header className="bm-navbar-root sticky top-0 z-50 w-full bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
//       <div className="bm-navbar-container mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-10 2xl:h-24 2xl:px-12">
//         {/* Left: logo + naam */}
//         <Link href="/" aria-label="BuildMart - Home" className="bm-navbar-brand flex shrink-0 items-center gap-3">
//           <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] 2xl:h-14 2xl:w-14">
//             <HardHat size={24} />
//           </span>
//           <span className="text-2xl leading-none font-[family-name:Baloo2-Bold] 2xl:text-4xl">
//             Build<span className="text-[color:var(--primary-yellow)]">Mart</span>
//           </span>
//         </Link>

//         {/* Beech: links (sirf lg aur bari screen par). xl se neeche gap kam taake overlap na ho */}
//         <nav className="hidden flex-1 justify-center lg:flex">
//           <ul className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
//             {BM_NAV_LINKS.map(({ id, label, href }) => (
//               <li key={id}>
//                 <Link
//                   href={href}
//                   className={`block py-2 text-sm font-[family-name:Poppins-Medium] whitespace-nowrap xl:text-base 2xl:text-lg ${
//                     isActive(href) ? activeLinkClass : normalLinkClass
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Right: Heart + Cart + Log In + Sign Up + menu button */}
//         <div className="flex shrink-0 items-center gap-1 sm:gap-2">
//           {BM_ICON_LINKS.map(({ id, label, href, icon: NavIcon }) =>
//             href ? (
//               <Link key={id} href={href} aria-label={label} className={iconClass}>
//                 <NavIcon size={22} />
//               </Link>
//             ) : (
//               <button key={id} type="button" aria-label={label} className={iconClass}>
//                 <NavIcon size={22} />
//               </button>
//             )
//           )}

//           {/* Login ka route abhi nahi, is liye button */}
//           <button type="button" className={`${loginClass} ml-1`}>
//             Log In
//           </button>
//           <Link href="/customer/sign-up" className={signUpClass}>
//             Sign Up
//           </Link>

//           <button
//             type="button"
//             onClick={handleMenuToggle}
//             aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={isMenuOpen}
//             aria-controls="bm-navbar-menu"
//             className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-[var(--industrial-blue-grey)] lg:hidden"
//           >
//             {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* Choti screen ka menu */}
//       {isMenuOpen && (
//         <div
//           id="bm-navbar-menu"
//           className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[color:var(--industrial-blue-grey)] bg-[var(--deep-charcoal)] px-4 py-4 sm:px-6 lg:hidden"
//         >
//           <ul className="flex flex-col gap-1">
//             {BM_NAV_LINKS.map(({ id, label, href }) => (
//               <li key={id}>
//                 <Link
//                   href={href}
//                   onClick={handleMenuClose}
//                   className={`block rounded-md px-3 py-3 text-base font-[family-name:Poppins-Medium] ${
//                     isActive(href) ? menuActiveLinkClass : menuNormalLinkClass
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Log In + Sign Up (sirf phone par, kyunke sm se bar mein hain) */}
//           <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[color:var(--industrial-blue-grey)] pt-4 sm:hidden">
//             <button
//               type="button"
//               className="rounded-md border border-[color:var(--border-color)] py-3 text-base font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)]"
//             >
//               Log In
//             </button>
//             <Link
//               href="/customer/sign-up"
//               onClick={handleMenuClose}
//               className="rounded-md bg-[var(--primary-yellow)] py-3 text-center text-base font-[family-name:Poppins-Bold] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default BmNavbar;















"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, HardHat, Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "../../shared/cart/CartProvider";

// href null = page abhi bana nahi (button banta hai, 404 nahi aata)
const BM_NAV_LINKS = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Materials", href: "/materials" },
  // { id: 3, label: "Labour", href: "/labour" },
  { id: 4, label: "Suppliers", href: "/suppliers" },
  // { id: 5, label: "Used Material", href: "/materials/used-bricks" },
  { id: 6, label: "About Us", href: "/about" },
  { id: 7, label: "Contact Us", href: "/contact-us" },
  { id: 8, label: "Blogs", href: "/blogs" },
];

// showCount true = is icon par cart ka count aata hai
const BM_ICON_LINKS = [
  { id: 1, label: "Wishlist", href: null, icon: Heart, showCount: false },
  { id: 2, label: "Cart", href: null, icon: ShoppingCart, showCount: true },
];

const iconClass =
  "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[color:var(--white-cards)] transition-colors hover:bg-[var(--industrial-blue-grey)] hover:text-[color:var(--primary-yellow)]";
const badgeClass =
  "absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary-yellow)] px-1 text-[10px] font-bold leading-none text-[color:var(--charcoal-black)]";
const loginClass =
  "hidden rounded-md border border-[color:var(--border-color)] px-4 py-2.5 text-sm font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)] sm:block 2xl:px-6 2xl:py-3.5 2xl:text-base";
const signUpClass =
  "hidden rounded-md bg-[var(--primary-yellow)] px-4 py-2.5 text-sm font-[family-name:Poppins-Bold] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:block 2xl:px-6 2xl:py-3.5 2xl:text-base";

const BmNavbar = () => {
  const pathname = usePathname();
  const { count } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

  // Home sirf "/" par active, baaki apne route par
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const activeLinkClass = "text-[color:var(--primary-yellow)]";
  const normalLinkClass = "text-[color:var(--white-cards)] hover:text-[color:var(--primary-yellow)]";
  const menuActiveLinkClass = "bg-[var(--industrial-blue-grey)] text-[color:var(--primary-yellow)]";
  const menuNormalLinkClass = "text-[color:var(--white-cards)] hover:bg-[var(--industrial-blue-grey)]";

  return (
    <header className="bm-navbar-root sticky top-0 z-50 w-full bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
      <div className="bm-navbar-container mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-10 2xl:h-24 2xl:px-12">
        {/* Left: logo + naam */}
        <Link href="/" aria-label="BuildMart - Home" className="bm-navbar-brand flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] 2xl:h-14 2xl:w-14">
            <HardHat size={24} />
          </span>
          <span className="text-2xl leading-none font-[family-name:Baloo2-Bold] 2xl:text-4xl">
            Build<span className="text-[color:var(--primary-yellow)]">Mart</span>
          </span>
        </Link>

        {/* Beech: links (sirf lg aur bari screen par). xl se neeche gap kam taake overlap na ho */}
        <nav className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
            {BM_NAV_LINKS.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  className={`block py-2 text-sm font-[family-name:Poppins-Medium] whitespace-nowrap xl:text-base 2xl:text-lg ${
                    isActive(href) ? activeLinkClass : normalLinkClass
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Heart + Cart + Log In + Sign Up + menu button */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {BM_ICON_LINKS.map(({ id, label, href, icon: NavIcon, showCount }) => {
            const badge = showCount && count > 0 && (
              <span className={badgeClass} aria-hidden="true">
                {count > 99 ? "99+" : count}
              </span>
            );
            const iconLabel = showCount && count > 0 ? `${label}, ${count} items` : label;

            return href ? (
              <Link key={id} href={href} aria-label={iconLabel} className={iconClass}>
                <NavIcon size={22} />
                {badge}
              </Link>
            ) : (
              <button key={id} type="button" aria-label={iconLabel} className={iconClass}>
                <NavIcon size={22} />
                {badge}
              </button>
            );
          })}

          {/* Login ka route abhi nahi, is liye button */}
          <button type="button" className={`${loginClass} ml-1`}>
            Log In
          </button>
          <Link href="/customer/sign-up" className={signUpClass}>
            Sign Up
          </Link>

          <button
            type="button"
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="bm-navbar-menu"
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-[var(--industrial-blue-grey)] lg:hidden"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Choti screen ka menu */}
      {isMenuOpen && (
        <div
          id="bm-navbar-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[color:var(--industrial-blue-grey)] bg-[var(--deep-charcoal)] px-4 py-4 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {BM_NAV_LINKS.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  onClick={handleMenuClose}
                  className={`block rounded-md px-3 py-3 text-base font-[family-name:Poppins-Medium] ${
                    isActive(href) ? menuActiveLinkClass : menuNormalLinkClass
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Log In + Sign Up (sirf phone par, kyunke sm se bar mein hain) */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[color:var(--industrial-blue-grey)] pt-4 sm:hidden">
            <button
              type="button"
              className="rounded-md border border-[color:var(--border-color)] py-3 text-base font-[family-name:Poppins-Medium] hover:bg-[var(--industrial-blue-grey)]"
            >
              Log In
            </button>
            <Link
              href="/customer/sign-up"
              onClick={handleMenuClose}
              className="rounded-md bg-[var(--primary-yellow)] py-3 text-center text-base font-[family-name:Poppins-Bold] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default BmNavbar;