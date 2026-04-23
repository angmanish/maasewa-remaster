"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Stethoscope, UserCheck, Activity, HeartPulse, Syringe, Pill,
  CheckCircle, Shield, ArrowRight, Clock,
} from "lucide-react";

const nursingShifts = [
  { hours: "8h", label: "Day / Night Shift", price: "Contact us", popular: false },
  { hours: "12h", label: "Extended Shift", price: "Contact us", popular: true },
  { hours: "24h", label: "Full-Day Shift", price: "Contact us", popular: false },
];

const services = [
  {
    icon: Stethoscope, title: "Home Nursing", color: "blue",
    desc: "Qualified GNM/BSc nurses for critical and non-critical home healthcare needs. Available for short-term and long-term medical support.",
    features: [
      "Vital signs monitoring & charting",
      "Medication administration (Oral/IV/IM)",
      "Wound care & advanced dressing",
      "Ryle's Tube (NG Tube) feeding & care",
      "Catheter insertion & management",
      "Tracheostomy care & suctioning",
      "Diabetes management & insulin care"
    ],
  },
  {
    icon: UserCheck, title: "Elder Care", color: "green",
    desc: "Compassionate caregivers trained to assist seniors with daily living, ensuring safety, dignity, and companionship at home.",
    features: [
      "Assistance with ADLs (Bathing/Dressing)",
      "Mobility support & fall prevention",
      "Bedsores prevention & repositioning",
      "Timely medication reminders",
      "Dietary management & meal assistance",
      "Companionship & mental stimulation",
      "Escort to doctor appointments"
    ],
  },
  {
    icon: Activity, title: "ICU Home Setup", color: "purple",
    desc: "Hospital-grade ICU infrastructure delivered to your bedroom, managed by critical-care specialists and trained nurses.",
    features: [
      "Oxygen concentrators & cylinders",
      "Multi-para cardiac monitors",
      "BiPAP, CPAP & Ventilator support",
      "Infusion pumps & suction machines",
      "ICU-trained nursing staff (24/7)",
      "DVT pumps & air mattresses",
      "Weekly doctor reviews"
    ],
  },
  {
    icon: HeartPulse, title: "Post-Op Care", color: "rose",
    desc: "Specialized recovery protocols after major surgeries like Joint Replacement, Cardiac surgery, or Abdominal procedures.",
    features: [
      "Surgical site infection prevention",
      "Pain management & monitoring",
      "Post-surgery mobilization",
      "Suture/Staple removal coordination",
      "Respiratory exercises (Spirometry)",
      "Physiotherapy coordination",
      "Patient & family rehab education"
    ],
  },
  {
    icon: Pill, title: "Specialized Care", color: "amber",
    desc: "Focused medical care for complex conditions including neurological, oncology, and end-of-life palliative needs.",
    features: [
      "Stroke rehabilitation & therapy",
      "Dementia & Alzheimer's support",
      "Oncology / Cancer care nursing",
      "Palliative & end-of-life care",
      "Parkinson's disease management",
      "Chronic pain management",
      "Respiratory & COPD support"
    ],
  },
  {
    icon: Syringe, title: "Injection Visit", color: "teal",
    desc: "On-demand nurse visits for clinical procedures that don't require full-day nursing, delivered at your convenience.",
    features: [
      "IM / IV / SC Injections",
      "IV Fluid / Saline administration",
      "Vaccinations (Adult & Pediatric)",
      "Blood sample collection",
      "ECG at home service",
      "Simple & complex dressing",
      "Nebulization & steam therapy"
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", badge: "bg-blue-50 text-blue-700" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", badge: "bg-purple-50 text-purple-700" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", badge: "bg-rose-50 text-rose-700" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-50 text-amber-700" },
  teal: { bg: "bg-teal-50", text: "text-teal-600", badge: "bg-teal-50 text-teal-700" },
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              Our Services
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-text-heading tracking-tight mb-5" style={{ fontFamily: "var(--font-jakarta)" }}>
              Professional Care,<br /><span className="text-primary">At Your Doorstep</span>
            </h1>
            <p className="text-text-body text-xl max-w-2xl mx-auto mb-8">
              Clinically verified staff, background-checked professionals, and transparent pricing — all delivered to your home.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-1">
              Book a Service <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Nursing Shifts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
              Nursing Shift Options
            </h2>
            <p className="text-text-body">Choose the shift duration that fits your care needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {nursingShifts.map((shift) => (
              <motion.div key={shift.hours}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl p-6 text-center border-2 transition-all ${shift.popular ? "border-primary shadow-xl" : "border-border-color"}`}
              >
                {shift.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock size={20} className="text-primary" />
                  <span className="text-3xl font-extrabold text-text-heading" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {shift.hours}
                  </span>
                </div>
                <p className="text-text-body text-sm mb-4">{shift.label}</p>
                <Link href="/contact" className="block w-full py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">
                  Get Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 bg-bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
              All Healthcare Services
            </h2>
            <p className="text-text-body">Comprehensive care for every stage of your recovery</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const c = colorMap[svc.color];
              return (
                <motion.div key={svc.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-border-color hover:shadow-lg transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-5`}>
                    <svc.icon size={24} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-text-heading text-xl" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {svc.title}
                    </h3>
                    <Shield size={14} className="text-success" />
                  </div>
                  <p className="text-text-body text-sm leading-relaxed mb-5">{svc.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-body">
                        <CheckCircle size={14} className="text-success flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact"
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full ${c.badge} hover:opacity-80 transition-opacity`}
                  >
                    Book Now <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-text-heading mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
            Not Sure Which Service You Need?
          </h2>
          <p className="text-text-body text-lg mb-8">
            Our healthcare coordinators will assess your needs and recommend the perfect care plan — free of charge.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:shadow-xl">
            Get Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
