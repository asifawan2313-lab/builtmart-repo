// Sample sawal jawab hain. Apne mutabiq badal lein.
const faqs = [
  {
    q: "What is BuildMart Gujranwala and how does it work?",
    a: "BuildMart is a marketplace where you can browse construction materials, compare supplier prices and send inquiries to shops in one place.",
  },
  {
    q: "Is BuildMart free to use?",
    a: "Browsing materials and comparing listed prices is open to everyone. Add your own details here if some features have charges.",
  },
  {
    q: "How are the suppliers registered?",
    a: "Suppliers register with their shop details and verification documents. An administrator reviews each application before the supplier is verified.",
  },
  {
    q: "How do I contact a supplier?",
    a: "Open any material or supplier listing and use the Contact button to send an inquiry. You can track its status from your account.",
  },
  {
    q: "Are the prices shown live market rates?",
    a: "Prices come from supplier listings and may change. Always confirm the final price and availability with the supplier before buying.",
  },
];

export default function Faqquestion() {
  return (
    <section className="px-4 md:px-12 py-12">
      <h2 className="text-3xl md:text-4xl text-center text-[var(--primary-text)] mb-10">
        Frequently Asked <span className="text-[var(--industrial-blue-grey)]">Questions</span>
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group bg-[var(--white-cards)] border border-[var(--border-color)] rounded-lg hover:border-[var(--industrial-blue-grey)] open:border-[var(--industrial-blue-grey)]"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-[var(--primary-text)] font-medium [&::-webkit-details-marker]:hidden">
              {item.q}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 shrink-0 text-[var(--industrial-blue-grey)] transition-transform duration-300 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>

            <p className="px-5 pb-4 text-[var(--secondary-text)]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}