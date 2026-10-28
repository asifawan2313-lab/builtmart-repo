import Link from "next/link";

export default function AiAssistant() {
  return (
    <section className="px-4 md:px-12 py-12">
      <div className="bg-[var(--white-cards)] border border-[var(--border-color)] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-2xl">
          {/* Chhota label + icon */}
          <p className="flex items-center gap-2 text-sm uppercase text-[var(--secondary-text)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--primary-yellow)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
            </svg>
            BuildMart AI Assistant · Demo
          </p>

          <h2 className="text-3xl md:text-4xl text-[var(--primary-text)] mt-2">
            Plan quantities and budget for your plot
          </h2>

          <p className="text-[var(--secondary-text)] mt-4">
            Get indicative material quantities and grey-structure / finishing cost breakdowns from
            plot size, floors and rooms. Estimates are planning aids, not guaranteed quotations —
            actual costs depend on market rates, quality and site conditions.
          </p>
        </div>

        <Link
          href="/ai-assistant"
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-[var(--charcoal-black)] text-white font-semibold rounded-xl px-8 py-4 hover:bg-[var(--industrial-blue-grey)]"
        >
          Open AI Assistant →
        </Link>
      </div>
    </section>
  );
}