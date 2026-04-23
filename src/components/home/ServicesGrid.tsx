"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Stethoscope,
  UserCheck,
  Activity,
  HeartPulse,
  Syringe,
  Pill,
  ArrowRight,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Home Nursing",
    desc: "Certified GNM/BSc nurses for ICU care, tracheostomy, wound dressing, and 24/7 post-hospitalization monitoring.",
    color: "blue",
    href: "/services",
  },
  {
    icon: Activity,
    title: "ICU Home Setup",
    desc: "Critical care infrastructure including cardiac monitors, ventilators, and infusion pumps with expert clinical supervision.",
    color: "purple",
    href: "/services",
  },
  {
    icon: UserCheck,
    title: "Elder Care",
    desc: "Professional caregivers for mobility support, hygiene, and companionship tailored for senior safety and dignity.",
    color: "green",
    href: "/services",
  },
  {
    icon: HeartPulse,
    title: "Post-Op Care",
    desc: "Dedicated recovery support after surgery, focusing on wound healing, pain management, and preventing complications.",
    color: "rose",
    href: "/services",
  },
  {
    icon: Pill,
    title: "Specialized Care",
    desc: "Tailored care plans for complex neurological needs, including Stroke, Dementia, and Palliative recovery support.",
    color: "amber",
    href: "/services",
  },
  {
    icon: Syringe,
    title: "Injection Visit",
    desc: "Trained nurses for IM/IV injections, IV drips, vaccinations, and diagnostic blood collection at your preferred time.",
    color: "teal",
    href: "/services",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  green: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
  amber: "bg-amber-50 text-amber-600",
  teal: "bg-teal-50 text-teal-600",
};

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-bg-ice">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-text-heading mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Comprehensive Home Healthcare
          </h2>
          <p className="text-text-body text-lg max-w-2xl mx-auto">
            From post-discharge nursing to ICU-level home care — we cover every
            step of your recovery journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border-color hover:shadow-xl transition-all group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl ${colorMap[service.color]} flex items-center justify-center mb-4`}
              >
                <service.icon size={24} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className="font-bold text-text-heading text-lg"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {service.title}
                </h3>
                <Shield size={14} className="text-success" />
              </div>
              <p className="text-text-body text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-3 transition-all"
              >
                Learn more <ArrowRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
