// import AboutStory from "./(section)/aboutstory.js";

// export default function AboutPage() {
//   return (
//     <main className="bg-[var(--off-white-background)]">
//       <AboutStory />
//     </main>
//   );
// }

import Image from "next/image";

import storyImg from "../../../assets/images/guest/about/about.png";

/* ============================================================
   1. OUR STORY
   ============================================================ */

function AboutStory() {
  return (
    <section className="px-4 md:px-12 py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Left: text */}
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[var(--primary-text)]">
            <span className="w-10 h-1 bg-[var(--primary-yellow)]" />
            Our Story
          </p>

          <h2 className="text-3xl md:text-4xl text-[var(--primary-text)] mt-4">
            Building a Smarter Construction Experience
          </h2>

          <p className="text-lg text-[var(--primary-text)] mt-5">
            BuildMart is a local construction material management and comparison platform,
            designed to make the process of buying construction materials easier, faster and
            more transparent.
          </p>
          <p className="text-[var(--secondary-text)] mt-4">
            We understand the challenges people face in Gujranwala — from finding the right rates
            and quality to checking availability and comparing suppliers. That&apos;s why we
            created BuildMart — a single platform where buyers, suppliers and service providers
            come together.
          </p>
        </div>

        {/* Right: image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src={storyImg}
            alt="Gujranwala"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function Page() {
  return (
    <main className="bg-[var(--off-white-background)]">
      <AboutStory />
    </main>
  );
}