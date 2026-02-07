"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most websites launch in 4\u20137 weeks. Web apps and mobile apps typically take 6\u201312 weeks depending on complexity. During our discovery call, we\u2019ll map out a timeline with specific milestones\u2014so you always know what\u2019s coming next.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is different, so pricing depends on scope, complexity, and timeline. We\u2019ll provide a detailed, fixed-price quote after our discovery call\u2014no surprise invoices, no scope creep charges. You approve the budget before any work begins.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Every package includes revision rounds (2\u20133 depending on your plan). We design iteratively, showing you progress at each stage, so revisions are small and focused rather than full redesigns. Our goal is to get it right, not to nickel-and-dime you.",
  },
  {
    question: "Do I own the code and design files?",
    answer:
      "Yes\u2014100%. You own all code, designs, assets, and content. Everything lives in your repository and your accounts. If you ever want to part ways, you take everything with you. No lock-in, no licensing fees, no hostage situations.",
  },
  {
    question: "Do you handle hosting and deployment?",
    answer:
      "We set up hosting on modern, reliable platforms (Vercel, AWS, or your preference) and handle the full deployment. We\u2019ll configure your domain, SSL, and analytics. You get admin access to everything\u2014we just make sure it\u2019s done right.",
  },
  {
    question: "What happens after launch? Do you offer maintenance?",
    answer:
      "Every project includes post-launch support (1\u20136 months depending on your plan). After that, we offer affordable monthly maintenance plans for updates, bug fixes, and performance monitoring. We\u2019re not a build-and-vanish shop.",
  },
  {
    question: "What if I\u2019m not happy with the result?",
    answer:
      "We build iteratively with your approval at every milestone. You see wireframes, designs, and working demos before we move forward. This process ensures the final product matches your vision. If something\u2019s off, we address it in your revision rounds at no extra cost.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "You get direct access to your developer\u2014no account managers or middlemen. We use your preferred channel (Slack, email, or calls) and provide weekly progress updates with demos. You\u2019ll always know exactly where things stand.",
  },
]

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-brand-border/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left sm:py-6"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-brand-text sm:text-lg">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-subtle transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-brand-muted leading-relaxed sm:pb-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding relative">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Questions?{" "}
              <span className="text-gradient-emerald">Answers.</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Everything you need to know before getting started.
            </p>
          </div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-brand-muted">
              Still have questions?{" "}
              <a
                href="/#contact"
                className="font-medium text-brand-emerald-glow underline underline-offset-4 hover:text-brand-emerald-light"
              >
                Reach out
              </a>{" "}
              and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
