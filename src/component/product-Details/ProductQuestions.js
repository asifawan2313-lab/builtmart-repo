import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";

// Questions asked by customers (empty for now, shown directly when added)
const questions = [];
// Example: { question: "Is delivery available in Lahore?", answer: "Yes, within 2 days." }

export default function ProductQuestions() {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-[#F3F5F7] bg-white shadow-sm">
      {/* Header */}
      <h2 className="bg-[#ffc61a] px-5 py-4 text-base font-semibold text-[#12304A] sm:px-6">
        Questions about this product
      </h2>

      {questions.length === 0 ? (
        /* Empty state */
        <div className="group flex flex-col items-center px-4 py-12 text-center sm:py-14">
          <MessageCircleQuestion
            size={56}
            strokeWidth={1.5}
            className="text-[#12304A]/40 transition duration-300 group-hover:scale-110 group-hover:text-[#ffc61a]"
          />
          <p className="mt-5 text-sm leading-relaxed text-[#5B6B78]">
            There are no questions yet.
            <br />
            <Link href="/login" className="text-[#b07d00] transition hover:underline">
              Login
            </Link>{" "}
            or{" "}
            <Link href="/signup" className="text-[#b07d00] transition hover:underline">
              Register
            </Link>{" "}
            to ask the seller now and answer will show here.
          </p>
        </div>
      ) : (
        /* Questions list */
        <ul className="divide-y divide-[#F3F5F7]">
          {questions.map(({ question, answer }) => (
            <li key={question} className="px-5 py-4 text-sm sm:px-6">
              <p className="font-semibold text-[#12304A]">Q: {question}</p>
              <p className="mt-1 text-[#5B6B78]">A: {answer}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}