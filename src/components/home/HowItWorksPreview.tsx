"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hospital, PhoneCall, Home, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Hospital,
    number: "01",
    title: "Hospital Discharge",
    desc: "Patient is discharged and needs continued professional care at home.",
    color: "blue",
  },
  {
    icon: PhoneCall,
    number: "02",
    title: "Coordinator Call",
    desc: "Our care coordinator calls within minutes to assess your specific needs.",
    color: "purple",
  },
  {
    icon: Home,
    number: "03",
    title: "Nurse at Your Door",
    desc: "A verified, trained nurse arrives at home — average time just 1.5 hours.",
    color: "green",
  },
];

export default function HowItWorksPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-text-heading mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            From Hospital to Home{" "}
            <span className="text-primary">in 1.5 Hours</span>
          </h2>
          <p className="text-text-body text-lg max-w-xl mx-auto">
            A seamless, stress-free transition from discharge to comfortable
            home recovery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center p-8 bg-bg-ice rounded-2xl border border-border-color"
            >
              <div className="relative inline-flex">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto ${
                    step.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : step.color === "purple"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <step.icon size={28} />
                </div>
              </div>
              <h3
                className="font-bold text-text-heading text-xl mb-2"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {step.title}
              </h3>
              <p className="text-text-body text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
          >
            See the full process <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
