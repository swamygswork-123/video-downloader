export default function FAQSection({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-gray-900 rounded-xl border border-gray-800 group"
            open={index === 0}
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-sm font-semibold text-gray-200 pr-4">
                {faq.question}
              </h3>
              <svg
                className="h-5 w-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-5 pb-5 -mt-1">
              <p className="text-gray-400 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
