// Reusable hero: sirf title aur subtitle (search bar nahi hai)
const BmPageHero = ({ title, subtitle }) => (
  <section className="bg-[var(--charcoal-black)] px-4 py-10 text-center sm:py-14">
    <h1 className="text-2xl font-bold text-white sm:text-4xl">{title}</h1>
    <p className="mt-2 text-sm text-[color:var(--border-color)] sm:text-base">
      {subtitle}
    </p>
  </section>
);

export default BmPageHero;