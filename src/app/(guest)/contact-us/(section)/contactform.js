"use client";

import { useState } from "react";

// Social links abhi "#" par hain. Asli pages ke link yahan likh dein.
const iconProps = {
  viewBox: "0 0 24 24",
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const socials = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg {...iconProps}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg {...iconProps}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

// Teeno inputs ka ek jaisa design (sirf neeche ki line)
const fieldClass =
  "w-full bg-transparent border-b border-[var(--border-color)] py-3 text-[var(--primary-text)] outline-none placeholder:text-[var(--secondary-text)] focus:border-[var(--industrial-blue-grey)]";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Backend aane par yahan message bhejne ka code aayega
    e.target.reset();
    setSent(true);
  }

  return (
    <section className="px-4 md:px-12 py-12">
      <div className="max-w-5xl mx-auto bg-[var(--white-cards)] border border-[var(--border-color)] rounded-3xl shadow-sm p-8 md:p-14 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Left: heading + text + social icons */}
        <div>
          <h2 className="text-3xl md:text-4xl text-[var(--primary-text)]">Send us a message</h2>
          <div className="w-12 h-1 bg-[var(--primary-yellow)] mt-2" />

          <p className="text-lg text-[var(--secondary-text)] mt-6">
            We&apos;re happy to help you connect, list, and discover with confidence.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="w-11 h-11 rounded-full border border-[var(--border-color)] text-[var(--industrial-blue-grey)] flex items-center justify-center hover:bg-[var(--primary-yellow)] hover:text-[var(--charcoal-black)]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Your Name" aria-label="Your Name" required className={fieldClass} />
          <input type="email" placeholder="Email Address" aria-label="Email Address" required className={fieldClass} />
          <input type="text" placeholder="Company (optional)" aria-label="Company" className={fieldClass} />
          <textarea rows="3" placeholder="Write your message here" aria-label="Message" required className={`${fieldClass} resize-none`} />

          <button
            type="submit"
            className="w-full bg-[var(--primary-yellow)] text-[var(--charcoal-black)] font-semibold rounded-xl py-4 hover:bg-[var(--hover-yellow)]"
          >
            Leave us a Message →
          </button>

          {sent && (
            <p role="status" className="text-sm text-[var(--secondary-text)]">
              Thank you! (Demo form: message abhi kahin bheja nahi ja raha.)
            </p>
          )}
        </form>
      </div>
    </section>
  );
}