"use client";

import { Mail, MessageCircle, MapPin } from "lucide-react";

// 1) Contact cards ka simple data (har card ka unique id).
//    detailBefore + detailBold + detailAfter: bold hissa alag dikhane ke liye.
//    Phone card chahiye to bas aik aur { ... } likh dein (icon: Phone, lucide-react se import karein).
const CONTACTCARDS = [
  {
    id: 1,
    title: "Email:",
    detailBefore: "Get a response within ",
    detailBold: "24 hours",
    detailAfter: "",
    linkText: "hello@buildmart.example",
    icon: Mail,
  },
  {
    id: 2,
    title: "Live chat on WhatsApp",
    detailBefore: "",
    detailBold: "Instant support",
    detailAfter: " available now",
    linkText: "Let's Chat",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "Office:",
    detailBefore: "Schedule a meeting",
    detailBold: "",
    detailAfter: "",
    linkText: "GT Road, Gujranwala (demo address)",
    icon: MapPin,
  },
];

export default function ContactCards() {
  // 2) Simple handler (abhi sirf console mein likhta hai)
  const handleContact = (title) => {
    console.log("Contact clicked:", title);
  };

  return (
    <section className="bm-contactCards-root bg-[var(--off-white-background)] py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10">
        {/* 3) Cards: phone par aik, sm se aage do cards ek line mein, aakhri card beech mein */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {CONTACTCARDS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="bm-contactCards-card flex w-full items-start justify-between gap-4 rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--primary-yellow)] hover:shadow-lg sm:w-[calc(50%-12px)] sm:p-7"
              >
                {/* Left: title, detail, link */}
                <div className="min-w-0">
                  <h3 className="text-lg text-[color:var(--primary-text)] sm:text-xl">
                    {item.title}
                  </h3>
                  {/* Chhoti peeli lakeer */}
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

                {/* Right: icon ka dabba */}
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