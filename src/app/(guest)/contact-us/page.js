// import ContactHero from "./(section)/contacthero.js";
// import ContactCards from './(section)/contactcard.js'
// import ContactForm from './(section)/contactform.js'

// export default function ContactPage() {
//   return (
//     <main className="bg-[var(--off-white-background)] pt-10 md:pt-20">
//       <ContactHero />
//       <ContactCards/>
//       <ContactForm/>
//     </main>
//   );
// }





"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, Camera, Mail, MapPin, MessageCircle, Play, Users } from "lucide-react";

import contactBg from "../../../assets/images/guest/contact/contactbanner.png";

/* ============================================================
   1. CONTACT HERO
   ============================================================ */

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--industrial-blue-grey)]">
      <Image src={contactBg} alt="" fill priority sizes="100vw" className="object-cover object-center" />

      {/* Halka overlay: text ko support dene ke liye */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-charcoal)]/60 via-[var(--industrial-blue-grey)]/30 to-transparent" />

      {/* Text: left taraf */}
      <div className="relative z-10 flex items-center px-4 md:pl-[12%] lg:pl-[25%] min-h-[16rem] sm:min-h-[20rem] lg:min-h-[25rem]">
        <div className="text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">GET IN TOUCH!</h1>
          <p className="text-lg sm:text-xl lg:text-2xl mt-2">We&apos;re here to assist you.</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   2. CONTACT CARDS
   ============================================================ */

// detailBefore + detailBold + detailAfter: bold hissa alag dikhane ke liye.
// Phone card chahiye to bas aik aur { ... } likh dein (icon: Phone, lucide-react se import karein).
const CONTACTCARDS = [
  { id: 1, title: "Email:", detailBefore: "Get a response within ", detailBold: "24 hours", detailAfter: "", linkText: "hello@buildmart.example", icon: Mail },
  { id: 2, title: "Live chat on WhatsApp", detailBefore: "", detailBold: "Instant support", detailAfter: " available now", linkText: "Let's Chat", icon: MessageCircle },
  { id: 3, title: "Office:", detailBefore: "Schedule a meeting", detailBold: "", detailAfter: "", linkText: "GT Road, Gujranwala (demo address)", icon: MapPin },
];

function ContactCards() {
  // Simple handler (abhi sirf console mein likhta hai)
  const handleContact = (title) => {
    console.log("Contact clicked:", title);
  };

  return (
    <section className="bm-contactCards-root bg-[var(--off-white-background)] py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10">
        {/* Phone par aik, sm se aage do cards ek line mein, aakhri card beech mein */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {CONTACTCARDS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="bm-contactCards-card flex w-full items-start justify-between gap-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--primary-yellow)] hover:shadow-lg sm:w-[calc(50%-12px)] sm:p-7"
              >
                <div className="min-w-0">
                  <h3 className="text-lg text-[color:var(--primary-text)] sm:text-xl">{item.title}</h3>
                  <span className="mt-2 block h-0.5 w-6 bg-[var(--primary-yellow)]" />

                  <p className="mt-4 text-sm text-[color:var(--secondary-text)] sm:text-base">
                    {item.detailBefore}
                    {item.detailBold && (
                      <strong className="font-[family-name:Poppins-Bold] text-[color:var(--primary-text)]">
                        {item.detailBold}
                      </strong>
                    )}
                    {item.detailAfter}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleContact(item.title)}
                    className="bm-contactCards-link-btn mt-3 text-left text-sm font-[family-name:Poppins-Medium] break-words text-[color:var(--industrial-blue-grey)] hover:underline sm:text-base"
                  >
                    {item.linkText}
                  </button>
                </div>

                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--off-white-background)] text-[color:var(--industrial-blue-grey)] sm:h-[68px] sm:w-[68px]">
                  <Icon size={28} />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. CONTACT FORM
   ============================================================ */

// Social links abhi "#" par hain. Asli pages ke link yahan likh dein.
// Naye lucide mein brand icons nahi hain, is liye milte julte icons use kiye hain.
const socials = [
  { name: "Facebook", href: "#", icon: Users },
  { name: "Instagram", href: "#", icon: Camera },
  { name: "LinkedIn", href: "#", icon: Briefcase },
  { name: "YouTube", href: "#", icon: Play },
];

// Teeno inputs ka ek jaisa design (sirf neeche ki line)
const fieldClass =
  "w-full bg-transparent border-b border-[var(--border-color)] py-3 text-[var(--primary-text)] outline-none placeholder:text-[var(--secondary-text)] focus:border-[var(--industrial-blue-grey)]";

function ContactForm() {
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
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="w-11 h-11 rounded-full border border-[var(--border-color)] text-[var(--industrial-blue-grey)] flex items-center justify-center hover:bg-[var(--primary-yellow)] hover:text-[var(--charcoal-black)]"
              >
                <Icon size={20} />
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

/* ============================================================
   PAGE
   ============================================================ */

export default function Page() {
  return (
    <main className="bg-[var(--off-white-background)] pt-10 md:pt-20">
      <ContactHero />
      <ContactCards />
      <ContactForm />
    </main>
  );
}