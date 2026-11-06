import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  Gem,
  Handshake,
  MapPin,
  Scale,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";

// About Us images: src/assets/images/guest/about/
import heroImg from "../../../assets/images/guest/about/about-hero.jpg";
import whoImg from "../../../assets/images/guest/about/about-who-we-are.jpg";
import materialsImg from "../../../assets/images/guest/about/about-materials.jpg";
import suppliersImg from "../../../assets/images/guest/about/about-suppliers.jpg";
import reusedImg from "../../../assets/images/guest/about/about-reused-materials.jpg";
import labourImg from "../../../assets/images/guest/about/about-labour.jpg";
import aiImg from "../../../assets/images/guest/about/about.jpg";
import deliveryImg from "../../../assets/images/guest/about/about-delivery.jpg";
import communityImg from "../../../assets/images/guest/about/about-community.jpg";

// SEO: page ka title aur description
export const metadata = {
  title: "About Us | BuildMart Gujranwala",
  description:
    "BuildMart Gujranwala is a digital construction materials marketplace that connects customers with local suppliers.",
};

const MATERIALS_ROUTE = "/materials"; // Explore Materials buttons yahin jate hain

/* ============================================================
   DATA (text ya images badalni hon to sirf yahan badlein)
   ============================================================ */

const whoPoints = [
  "Local construction marketplace.",
  "Customers and suppliers connection.",
  "New and reused materials.",
  "Construction-related services.",
];

const aims = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To simplify construction material shopping through a convenient and organized digital marketplace.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To create a trusted digital construction marketplace that makes material sourcing easier and more accessible.",
  },
];

const offers = [
  { title: "Construction Materials", text: "Explore different construction materials.", image: materialsImg },
  { title: "Local Suppliers", text: "Discover local material suppliers.", image: suppliersImg },
  { title: "Reused Materials", text: "Explore reusable construction materials.", image: reusedImg },
  { title: "Labour Services", text: "Discover construction professionals.", image: labourImg },
  { title: "AI Construction Tools", text: "Explore estimation and visualization tools.", image: aiImg },
  { title: "Delivery Support", text: "Connect with delivery riders.", image: deliveryImg },
];

const benefits = [
  { icon: Scale, title: "Easy Comparison", text: "Compare material prices and supplier options." },
  { icon: MapPin, title: "Local Marketplace", text: "Discover suppliers in Gujranwala." },
  { icon: ShieldCheck, title: "Convenience", text: "Explore materials from one platform." },
  { icon: Gem, title: "Multiple Solutions", text: "Find new materials, reused materials and construction-related services." },
];

const steps = [
  { icon: Search, title: "Explore Materials", text: "Browse different construction categories." },
  { icon: Scale, title: "Compare Options", text: "Check products, prices and supplier information." },
  { icon: Handshake, title: "Choose a Supplier", text: "Find a suitable supplier for your requirements." },
  { icon: Check, title: "Connect and Proceed", text: "Contact the supplier and discuss your order." },
];

// Dohraya jane wale classes
const exploreBtn =
  "group inline-flex items-center gap-2 rounded-lg bg-[#FDC716] px-6 py-3 text-sm font-semibold text-[#202124] transition-colors duration-300 hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
const eyebrow = "flex items-center gap-3 text-sm font-medium";

/* ============================================================
   1. HERO
   ============================================================ */

const AboutHero = () => {
  return (
    <section className="relative flex min-h-[460px] items-center overflow-hidden bg-[#25272A] text-white lg:min-h-[520px]">
      <Image src={heroImg} alt="Modern house under construction" fill priority sizes="100vw" className="object-cover object-right" />
      {/* Mobile par poora parda, bade screen par left se fade */}
      <div className="absolute inset-0 bg-[#25272A]/70 md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#25272A] from-30% via-[#25272A]/70 to-transparent md:block" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-xl">
          <p className={eyebrow}>
            <span className="h-0.5 w-8 bg-[#FDC716]" /> About Us
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Building Better Connections,
            <span className="block text-[#FDC716]">Building Better Futures.</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/85 sm:text-base">
            BuildMart Gujranwala is a digital construction materials marketplace designed to connect customers with
            local suppliers. We make it easier to explore construction materials, compare prices, discover suppliers
            and find reliable construction solutions — all in one place.
          </p>

          <Link href={MATERIALS_ROUTE} className={`${exploreBtn} mt-7`}>
            Explore Materials
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   2. WHO WE ARE
   ============================================================ */

const AboutWhoWeAre = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div>
          <p className={`${eyebrow} text-[#202124]`}>
            <span className="h-0.5 w-8 bg-[#FDC716]" /> Who We Are
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#202124] sm:text-4xl">A Smarter Way to Build</h2>
          <p className="mt-4 text-base leading-7 text-[#565553]">
            BuildMart provides a convenient platform where customers can explore construction materials and suppliers
            without visiting multiple shops.
          </p>

          <ul className="mt-5 space-y-2.5">
            {whoPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-[#202124] sm:text-base">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FDC716]">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#D9E3E9]">
          <Image
            src={whoImg}
            alt="Construction materials shop"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   3. MISSION & VISION
   ============================================================ */

const AboutMissionVision = () => {
  return (
    <section className="bg-[#F4F4F2]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-0">
        {aims.map(({ icon: AimIcon, title, text }, i) => (
          <div
            key={title}
            className={`flex items-start gap-5 md:px-8 ${i === 1 ? "md:border-l md:border-[#FDC716]" : ""}`}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FDC716] text-[#202124]">
              <AimIcon size={26} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-[#202124]">{title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-[#565553] sm:text-base">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   4. WHAT WE OFFER
   ============================================================ */

const AboutOffers = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="text-center">
          <p className={`${eyebrow} justify-center text-[#202124]`}>
            <span className="h-0.5 w-8 bg-[#FDC716]" /> What We Offer
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#202124] sm:text-4xl">Everything You Need for Construction</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {offers.map(({ title, text, image }) => (
            <article
              key={title}
              className="overflow-hidden rounded-xl border border-[#D9E3E9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FDC716] hover:shadow-lg"
            >
              <div className="relative h-28 sm:h-32">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-bold text-[#202124]">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-[#565553]">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   5. WHY CHOOSE BUILDMART
   ============================================================ */

const AboutWhyChoose = () => {
  return (
    <section className="bg-[#F4F4F2]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="text-center">
          <p className={`${eyebrow} justify-center text-[#202124]`}>
            <span className="h-0.5 w-8 bg-[#FDC716]" /> Why Choose BuildMart?
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {benefits.map(({ icon: BenefitIcon, title, text }, i) => (
            <div key={title} className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-[#D9E3E9]" : ""}`}>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#E5B20F] shadow-sm">
                <BenefitIcon size={28} aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-base font-bold text-[#202124]">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#565553]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   6. HOW IT WORKS (mobile par upar neeche, desktop par ek line mein)
   ============================================================ */

const AboutHowItWorks = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="text-center">
          <p className={`${eyebrow} justify-center text-[#202124]`}>
            <span className="h-0.5 w-8 bg-[#FDC716]" /> How BuildMart Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#202124] sm:text-4xl">Simple Steps to Get Started</h2>
        </div>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps.map(({ icon: StepIcon, title, text }, i) => (
            <li key={title} className="relative flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDC716] text-base font-extrabold text-[#202124]">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#202124]">
                  <StepIcon size={18} className="shrink-0 text-[#384452]" aria-hidden="true" />
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#565553]">{text}</p>
              </div>
              {/* Steps ke beech teer (sirf bade screen par) */}
              {i < steps.length - 1 && (
                <ArrowRight size={18} className="absolute -right-4 top-2.5 hidden text-[#384452] lg:block" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ============================================================
   7. MARKETPLACE COMMUNITY
   ============================================================ */

const AboutCommunity = () => {
  return (
    <section className="relative flex min-h-[300px] items-center overflow-hidden bg-[#25272A] text-white">
      <Image src={communityImg} alt="Construction team on site" fill sizes="100vw" className="object-cover object-right" />
      <div className="absolute inset-0 bg-[#25272A]/70 md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#25272A] from-35% via-[#25272A]/70 to-transparent md:block" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="max-w-md">
          <h2 className="text-3xl font-extrabold text-[#FDC716] sm:text-4xl">Our Marketplace Community</h2>
          <p className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
            BuildMart brings together customers, suppliers, labour professionals and delivery riders on one digital
            platform to build a stronger construction community.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   8. FINAL CALL TO ACTION
   ============================================================ */

const AboutCta = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#25272A] px-6 py-8 text-white sm:px-10 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to Build Smarter?</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Explore construction materials, discover suppliers and make your construction journey easier with BuildMart.
            </p>
          </div>

          <Link href={MATERIALS_ROUTE} className={`${exploreBtn} shrink-0`}>
            Explore Materials
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   PAGE (navbar aur footer (guest) layout se aate hain)
   ============================================================ */

export default function Page() {
  return (
    <main>
      <AboutHero />
      <AboutWhoWeAre />
      <AboutMissionVision />
      <AboutOffers />
      <AboutWhyChoose />
      <AboutHowItWorks />
      <AboutCommunity />
      <AboutCta />
    </main>
  );
}