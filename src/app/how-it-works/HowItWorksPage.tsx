"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Hospital, PhoneCall, UserCheck, Home as HomeIcon,
  ArrowRight, Clock, ChevronDown, CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Hospital,
    title: "Hospital Discharge",
    subtitle: "Step 1",
    color: "blue",
    desc: "Your doctor clears you for home care. Don't worry — we work directly with discharge coordinators at partner hospitals to make the handoff seamless.",
    details: ["Receive discharge papers", "Coordinator notified automatically", "Care plan discussed with doctor"],
  },
  {
    icon: PhoneCall,
    title: "Coordinator Assessment Call",
    subtitle: "Step 2",
    color: "purple",
    desc: "Within minutes of your request, our care coordinator calls to understand your exact needs, medical history, and preferred schedule.",
    details: ["Free 15-min assessment call", "Nurse profile matched to your needs", "Transparent pricing discussed"],
  },
  {
    icon: UserCheck,
    title: "Nurse Dispatched",
    subtitle: "Step 3",
    color: "amber",
    desc: "A verified, background-checked nurse is dispatched with all necessary supplies. You receive real-time updates on their arrival.",
    details: ["Police verified & background checked", "Nurse profile shared in advance", "Real-time arrival tracking"],
  },
  {
    icon: HomeIcon,
    title: "Home Care Begins",
    subtitle: "Step 4",
    color: "green",
    desc: "The nurse arrives, sets up, and begins care. Family members are briefed. Ongoing reports are shared with you and your doctor.",
    details: ["Avg. arrival: 3.8 hours", "Setup in under 30 minutes", "Daily care reports sent to family"],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
};

const faqs = [
  { q: "How quickly can you get a nurse to my home?", a: "Our average response time is 3.8 hours from first contact to nurse arrival. In urgent cases, we can often dispatch within 2 hours." },
  { q: "Are your nurses certified and background-checked?", a: "Absolutely. All nurses are GNM/B.Sc Nursing qualified, police verified, and undergo comprehensive background checks before joining our team." },
  { q: "What if I'm not satisfied with the assigned nurse?", a: "Your satisfaction is our priority. If you're unhappy for any reason, we'll replace the nurse within 24 hours at no extra charge." },
  { q: "Do you cover my city?", a: "We currently serve 15 major cities across India. Check our Cities page to see if we're near you, or join the waitlist for upcoming cities." },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              How It Works
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-text-heading tracking-tight mb-5" style={{ fontFamily: "var(--font-jakarta)" }}>
              From Hospital to Home<br /><span className="text-primary">in 3.8 Hours</span>
            </h1>
            <p className="text-text-body text-xl max-w-2xl mx-auto mb-8">
              A simple, stress-free process designed to get you the care you need — fast, safely, and with complete peace of mind.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="flex items-center gap-2 px-7 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-1">
                Start Now <ArrowRight size={18} />
              </Link>
              <a href="tel:+916361376521" className="flex items-center gap-2 px-7 py-4 border-2 border-border-color text-text-heading rounded-full font-bold hover:border-primary hover:text-primary transition-all">
                <Clock size={18} /> Call: +91 6361376521
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-8 top-10 bottom-10 w-0.5 timeline-connector hidden md:block" />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const c = colorMap[step.color];
                return (
                  <motion.div key={step.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex gap-6 md:gap-10"
                  >
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center shadow-sm border ${c.border}`}>
                        <step.icon size={26} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-bg-ice rounded-2xl p-6 border border-border-color">
                      <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">{step.subtitle}</span>
                      <h3 className="text-xl font-bold text-text-heading mt-1 mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {step.title}
                      </h3>
                      <p className="text-text-body text-sm leading-relaxed mb-4">{step.desc}</p>
                      <ul className="space-y-1.5">
                        {step.details.map((d) => (
                          <li key={d} className="flex items-center gap-2 text-sm text-text-body">
                            <CheckCircle size={14} className="text-success flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg-ice">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-text-heading text-center mb-10" style={{ fontFamily: "var(--font-jakarta)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-border-color overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-text-heading">{faq.q}</span>
                  <ChevronDown size={18} className={`text-text-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-text-body text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-text-heading mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
            Ready to Get Started?
          </h2>
          <p className="text-text-body mb-8">It takes less than 5 minutes to get care on the way to your home.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:shadow-xl">
            Request Aftercare Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
