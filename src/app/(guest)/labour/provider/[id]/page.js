"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarCheck, MapPin, MessageCircle, Star } from "lucide-react";
import { labourProviders } from "../../labourData";

/* ============================================================
   DEMO DATA (reviews aur previous work sirf UI ke liye hain)
   ============================================================ */

const demoReviews = [
  { id: 1, name: "Demo Customer 1", text: "Work was on time and neat." },
  { id: 2, name: "Demo Customer 2", text: "Fair price and good communication." },
  { id: 3, name: "Demo Customer 3", text: "Would hire again." },
];

// Previous work ki 3 jaghen (image null ho to "No image" dikhta hai)
const portfolio = [
  { id: 1, image: null },
  { id: 2, image: null },
  { id: 3, image: null },
];

const yellowBtn =
  "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 border border-[#FDC716] bg-[#FDC716] text-sm font-semibold text-[#292929] transition-colors hover:border-[#E5B20F] hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

const outlineBtn =
  "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 border border-[#292929] bg-white text-sm font-semibold text-[#292929] transition-colors hover:bg-[#FDC716]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC716]/60";

/* ============================================================
   PAGE
   ============================================================ */

const ProviderDetailPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState("");

  const provider = labourProviders.find((p) => String(p.id) === String(id));

  // Galat id par saaf message
  if (!provider) {
    return (
      <main className="bg-[#F4F4F2] px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold text-[#292929]">Provider not found</h1>
        <p className="mt-2 text-sm text-[#565553]">This labour profile does not exist.</p>
        <Link href="/labour/listing" className="mt-4 inline-block text-sm font-semibold text-[#202124] underline">
          Back to all labour
        </Link>
      </main>
    );
  }

  const { name, category, skills, experience, areas, verification, rating, reviews, availability, image } = provider;
  const isVerified = verification.startsWith("Verified");
  const shownReviews = demoReviews.slice(0, reviews);

  return (
    <main className="bg-[#F4F4F2] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <p className="text-xs text-[#565553]">
          <Link href="/labour" className="font-semibold text-[#202124] hover:underline">Labour</Link> /{" "}
          <Link href={`/labour/listing?category=${category.toLowerCase().replace(/\s+/g, "-")}`} className="font-semibold text-[#202124] hover:underline">
            {category}
          </Link>{" "}
          / {name}
        </p>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_300px]">
          {/* Left: profile, work, reviews */}
          <div className="space-y-5">
            {/* Profile */}
            <section className="rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Image ki jagah: image null ho to "No image" dikhta hai */}
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-[#D9E3E9] sm:w-40">
                  {image ? (
                    <Image src={image} alt={name} fill sizes="160px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-extrabold text-[#292929]">{name}</h1>
                  <p className="mt-1 text-sm text-[#565553]">{category} · {experience} years experience</p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className={`rounded px-2 py-1 ${isVerified ? "bg-green-100 text-green-800" : "bg-[#FDC716]/30 text-[#202124]"}`}>
                      {verification}
                    </span>
                    <span className="flex items-center gap-1 rounded bg-[#F4F4F2] px-2 py-1 text-[#565553]">
                      <Star size={12} aria-hidden="true" />
                      {rating ? `${rating} (${reviews} reviews)` : "No rating yet"}
                    </span>
                    <span className="rounded bg-[#F4F4F2] px-2 py-1 text-[#565553]">{availability}</span>
                  </div>

                  <p className="mt-3 flex items-center gap-1 text-xs text-[#565553]">
                    <MapPin size={12} className="shrink-0" aria-hidden="true" />
                    Service areas: {areas.join(", ")}, Gujranwala
                  </p>
                </div>
              </div>

              <h2 className="mt-5 text-sm font-bold text-[#202124]">About</h2>
              <p className="mt-1 text-sm text-[#565553]">
                Demo profile of a {category.toLowerCase()} professional with {experience} years of experience.
                Real description will appear here once the provider adds it.
              </p>

              <h2 className="mt-4 text-sm font-bold text-[#202124]">Main specialization and skills</h2>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-[#292929] px-2 py-1 font-semibold text-[#FDC716]">{category}</span>
                {skills.map((s) => (
                  <span key={s} className="rounded bg-[#F4F4F2] px-2 py-1 text-[#565553]">{s}</span>
                ))}
              </div>
            </section>

            {/* Previous work */}
            <section className="rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-bold text-[#202124]">Previous Work</h2>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {portfolio.map(({ id: workId, image: workImage }) => (
                  <div key={workId} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#D9E3E9]">
                    {workImage ? (
                      <Image src={workImage} alt={`${name} previous work ${workId}`} fill sizes="200px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-[#565553]">No image</span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-bold text-[#202124]">Customer Reviews</h2>
              {shownReviews.length ? (
                <ul className="mt-2 divide-y divide-[#D9E3E9]">
                  {shownReviews.map(({ id: reviewId, name: reviewer, text }) => (
                    <li key={reviewId} className="py-3">
                      <p className="text-sm font-semibold text-[#202124]">{reviewer}</p>
                      <p className="text-sm text-[#565553]">{text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[#565553]">No reviews yet.</p>
              )}
              <p className="mt-2 text-xs text-[#565553]">Sample reviews shown for demonstration purposes.</p>
            </section>
          </div>

          {/* Right: actions */}
          <aside className="h-fit space-y-3 rounded-xl border border-[#D9E3E9] bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#202124]">Hire {name}</h2>
            <p className="text-xs text-[#565553]">Post your job and this provider can send you a bid.</p>

            <button type="button" onClick={() => setNotice("Post a Job form is the next task.")} className={`${yellowBtn} rounded-lg`}>
              <CalendarCheck size={16} aria-hidden="true" />
              Request Work / Post a Job
            </button>
            <button type="button" onClick={() => setNotice("Chat opens after a booking (next task).")} className={`${outlineBtn} rounded-lg`}>
              <MessageCircle size={16} aria-hidden="true" />
              Contact / Chat
            </button>

            {notice && <p className="rounded bg-[#FDC716]/20 px-3 py-2 text-xs text-[#202124]">{notice}</p>}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProviderDetailPage;