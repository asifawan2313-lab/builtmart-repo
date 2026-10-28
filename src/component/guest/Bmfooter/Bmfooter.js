
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Quick Links
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Materials', href: '/materials' },
  { label: 'Suppliers', href: '/suppliers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Customer Support Links
const supportLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Help and Support', href: '/help' },
];

const linkClass =
  'text-white/70 hover:text-[var(--primary-yellow)]';

export default function BmFooter() {
  // Hooks must be inside the component function
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[var(--deep-charcoal)] text-white">
      <div className="px-4 md:px-12 pt-16 pb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-lg bg-[var(--primary-yellow)] text-[var(--charcoal-black)] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 18h18M5 18a7 7 0 0 1 14 0M12 8v4" />
              </svg>
            </span>

            <span className="text-3xl font-bold">
              Build
              <span className="text-[var(--primary-yellow)]">
                Mart
              </span>
            </span>
          </Link>

          <p className="text-white/70 mt-6 max-w-xs">
            Explore construction materials, compare supplier listings
            and discover reusable building resources in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl mb-5">Quick Links</h3>

          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl mb-5">Customer Support</h3>

          <ul className="space-y-3">
            {supportLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl mb-5">Contact (Demo)</h3>

          <ul className="space-y-3 text-white/70">
            <li>Email: hello@buildmart.example</li>
            <li>Phone: +92 300 0000000 (sample)</li>
            <li>Location: Placeholder for demo</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-4 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
        <p>
          © {year} BuildMart. Academic demo project.
        </p>

        <div className="flex gap-6">
          <Link href="/privacy" className={linkClass}>
            Privacy Policy
          </Link>

          <Link href="/terms" className={linkClass}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
