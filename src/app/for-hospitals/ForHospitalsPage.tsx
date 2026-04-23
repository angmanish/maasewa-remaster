"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingDown, Users, Building2, Clock, CheckCircle,
  FileText, HeartHandshake, ArrowRight, Phone,
} from "lucide-react";

const stats = [
  { icon: TrendingDown, value: "40%", label: "Reduction in Readmissions" },
  { icon: Users, value: "2000+", label: "Patients Discharged" },
  { icon: Building2, value: "50+", label: "Hospital Partners" },
  { icon: Clock, value: "3.8h", label: "Average Response Time" },
];

const benefits = [
  { icon: HeartHandshake, title: "Seamless Discharge Support", desc: "We coordinate directly with your discharge team to ensure zero gaps in patient care post-hospitalization." },
  { icon: Clock, title: "24/7 Availability", desc: "Our care coordinators are available around the clock, including weekends and holidays." },
  { icon: FileText, title: "Complete Documentation", desc: "Detailed care reports, medication logs, and clinical observations shared with your hospital team." },
  { icon: CheckCircle, title: "Verified Staff", desc: "All staff are police-verified, background-checked, and clinically trained to hospital standards." },
];

export default function ForHospitalsPage() {
  const [form, setForm] = useState({ hospital: "", name: "", email: "", phone: "", city: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-blue-400 py-28 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              For Healthcare Providers
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5" style={{ fontFamily: "var(--font-jakarta)" }}>
              Reduce Readmission Rates<br />by <span className="text-yellow-300">40%</span>
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-8">
              Partner with Maasewa Healthcare to provide seamless post-discharge home care for your patients — improving outcomes and freeing up beds.
            </p>
            <a href="#partner-form" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-blue-50 transition-all hover:shadow-xl hover:-translate-y-1">
              Become a Partner <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-bg-ice border border-border-color"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mx-auto mb-3">
                  <s.icon size={22} />
                </div>
                <p className="text-3xl font-extrabold text-text-heading" style={{ fontFamily: "var(--font-jakarta)" }}>{s.value}</p>
                <p className="text-text-body text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>Why Hospitals Choose Maasewa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-border-color shadow-sm flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                  <b.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-text-heading text-lg mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>{b.title}</h3>
                  <p className="text-text-body text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section id="partner-form" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>Request a Partnership</h2>
            <p className="text-text-body">Fill the form and our B2B team will reach out within 24 hours.</p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center p-10 bg-emerald-50 rounded-2xl border border-emerald-200"
            >
              <CheckCircle size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-heading mb-2">Request Received!</h3>
              <p className="text-text-body">Our partnership team will contact you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-bg-ice p-8 rounded-2xl border border-border-color">
              {[
                { key: "hospital", label: "Hospital / Clinic Name", type: "text", placeholder: "e.g. Apollo Hospitals" },
                { key: "name", label: "Your Name", type: "text", placeholder: "Contact person" },
                { key: "email", label: "Email Address", type: "email", placeholder: "you@hospital.com" },
                { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                { key: "city", label: "City", type: "text", placeholder: "e.g. Pune" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-text-heading mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border-color bg-white text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-text-heading mb-1.5">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your patient volumes or specific requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border-color bg-white text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all text-sm resize-none"
                />
              </div>
              <button type="submit"
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-dark transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Request Partnership
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
