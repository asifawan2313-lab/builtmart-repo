import Image from "next/image";
import Link from "next/link";

// Har card ki image public/banners/ folder mein rakhni hai
const banners = [
  {
    image: "/banners/suppliers.jpg",
    title: "Explore materials from different suppliers",
    text: "One place to browse shops instead of many calls.",
    link: "Browse suppliers",
    href: "/suppliers",
  },
  {
    image: "/banners/budget.jpg",
    title: "Budget-friendly construction options",
    text: "Sample promotion: compare listed prices before you buy.",
    link: "Compare prices",
    href: "/compare-prices",
  },
  {
    image: "/banners/reusable.jpg",
    title: "Find reusable construction materials",
    text: "Leftover and reclaimed stock at lower listed prices.",
    link: "See reusable",
    href: "/reused-materials",
  },
];

export default function Banner() {
  return (
    <section className="px-4 md:px-12 py-12">
      <div className="w-12 h-1 bg-[#202124] mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold text-[#202124] mb-8">Build More. Save More.</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {banners.map((b) => (
          <div key={b.title} className="relative overflow-hidden rounded-xl min-h-[22rem] flex">
            {/* Background image + dark overlay */}
            <Image
              src={b.image}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#202124]/70" />

            {/* Content */}
            <div className="relative z-10 p-8 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-bold">{b.title}</h3>
              <p className="mt-3 text-white/80">{b.text}</p>
              <Link href={b.href} className="mt-6 font-semibold underline underline-offset-4 w-fit">
                {b.link} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}