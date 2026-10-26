"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Star, User } from "lucide-react";

const productName = "Cement (Wazirabad stock)";

// Description data (simple list, shown directly)
const description = {
  title: "Ordinary Portland Cement (OPC) - Premium Quality Cement for All Your Construction Needs",
  intro:
    "Enhance the strength and durability of your construction projects with our high-quality Ordinary Portland Cement (OPC). Sourced from the finest materials and manufactured using state-of-the-art technology, our OPC is designed to meet the rigorous demands of modern construction.",
  sections: [
    {
      title: "Key Features:",
      items: [
        { label: "Superior Strength:", text: "Ensures strong and durable construction, perfect for a wide range of applications including residential, commercial, and industrial projects." },
        { label: "High Durability:", text: "Provides excellent resistance to cracking and weathering, making it ideal for long-lasting structures." },
        { label: "Consistent Quality:", text: "Manufactured to meet stringent quality standards, ensuring reliable performance in every batch." },
        { label: "Versatile Use:", text: "Suitable for general construction purposes, including concrete, mortar, plaster, and more." },
      ],
    },
    {
      title: "Applications:",
      items: [
        { label: "Residential Buildings:", text: "Ideal for constructing homes, apartments, and other residential structures." },
        { label: "Commercial Projects:", text: "Perfect for offices, shopping centres, and other commercial buildings." },
        { label: "Industrial Construction:", text: "Suitable for factories, warehouses, and other industrial facilities." },
        { label: "Infrastructure Projects:", text: "Great for roads, bridges, dams, and other infrastructure developments." },
      ],
    },
    {
      title: "Benefits:",
      items: [
        { label: "Enhanced Workability:", text: "Easy to mix and apply, ensuring smooth and efficient construction processes." },
        { label: "Optimal Setting Time:", text: "Balanced setting time allows for better handling and finishing." },
        { label: "Cost-Effective:", text: "High-performance cement that offers excellent value for money." },
      ],
    },
  ],
};

// Sample reviews (simple list, shown directly)
const reviews = [
  { name: "Ahmed K.", rating: 4, text: "Used it for a home construction project, and it has performed well. Easy to mix and set." },
  { name: "Usman R.", rating: 5, text: "Very satisfied with the performance. It worked flawlessly for my small renovation projects." },
  { name: "Bilal S.", rating: 5, text: "Great quality cement! It set quickly and has held up nicely. Would recommend for any masonry work." },
  { name: "Hamza T.", rating: 3, text: "Easy to work with and gives a clean finish." },
  { name: "Zain A.", rating: 4, text: "Good quality for the price. Works well for foundation work and slabs." },
  { name: "Faizan M.", rating: 5, text: "Strong cement and the supplier delivered on time. Will order again." },
  { name: "Saad H.", rating: 4, text: "Smooth mixing and a good final result for plaster work." },
  { name: "Imran Q.", rating: 5, text: "Best cement I have used for my roof. No cracks so far." },
];

export default function ProductTabs() {
  const [tab, setTab] = useState("description");
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef(null);

  // Simple handlers
  const handleTab = (id) => {
    setTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const handleAddReview = () => {}; // connect to the review modal later

  // Reviews move forward by one card every 3 seconds (stops on hover or touch)
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      const slider = sliderRef.current;
      const step = slider.firstChild.offsetWidth + 16; // card width + gap
      const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5;
      slider.scrollTo({ left: atEnd ? 0 : slider.scrollLeft + step, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="w-full">
      {/* Tabs */}
      <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
        {["description", "reviews"].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => handleTab(id)}
            className={`rounded-full px-5 py-2 text-xs font-semibold capitalize transition duration-300 ${
              tab === id
                ? "bg-[#ffc61a] text-[#12304A]"
                : "text-[#12304A] hover:bg-[#F3F5F7]"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Description */}
      <div id="description" className="mt-6 scroll-mt-24 space-y-5 text-sm leading-relaxed text-[#5B6B78]">
        <h2 className="text-sm font-semibold text-[#12304A]">{description.title}</h2>
        <p>{description.intro}</p>

        {description.sections.map(({ title, items }) => (
          <div key={title}>
            <h3 className="mb-2 font-semibold text-[#12304A]">{title}</h3>
            <ul className="space-y-1">
              {items.map(({ label, text }) => (
                <li key={label}>
                  <strong className="text-[#12304A]">{label}</strong> {text}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p>
          Choose <strong className="text-[#12304A]">Ordinary Portland Cement (OPC)</strong> from{" "}
          <strong className="text-[#12304A]">BuildMart</strong> for a reliable, durable, and cost-effective
          solution to all your construction needs. Whether you&apos;re building a home, commercial property,
          or infrastructure project, our OPC guarantees the strength and longevity you require.
        </p>
      </div>

      {/* Reviews heading */}
      <div id="reviews" className="mt-14 flex scroll-mt-24 flex-wrap items-center justify-between gap-4">
        <h2 className="font-[family-name:var(--font-baloo)] text-2xl font-bold text-[#12304A] sm:text-3xl">
          What buyers say about {productName}
        </h2>
        <button
          type="button"
          onClick={handleAddReview}
          className="flex items-center gap-1.5 rounded-full bg-[#ffc61a] px-5 py-2.5 text-xs font-semibold text-[#12304A] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
        >
          <Plus size={14} />
          Add a review
        </button>
      </div>

      {/* Reviews (move automatically, can also be swiped) */}
      <div
        ref={sliderRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map(({ name, rating, text }) => (
          <article
            key={name}
            className="flex w-[80%] flex-none snap-start flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)]"
          >
            <div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= rating ? "fill-[#ffc61a] text-[#ffc61a]" : "text-neutral-300"}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#5B6B78]">{text}</p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F5F7] text-[#12304A]">
                <User size={16} />
              </span>
              <span className="text-xs font-semibold text-[#12304A]">{name}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}