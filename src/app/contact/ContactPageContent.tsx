"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, MessageCircle, CheckCircle2,
  Clock, ShieldCheck, ArrowUpRight
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6361376521",
    sub: "Available 24 hours, 7 days",
    href: "tel:+916361376521",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@maasewahealthcare.com",
    sub: "Response within 30 minutes",
    href: "mailto:info@maasewahealthcare.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Gate no 1313, Om Sai Housing Society",
    sub: "Near Zenda Chowk, Pune — 411062",
    href: undefined,
  },
];

export default function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "39faab4c-e920-4d0f-ad46-fb7ace0a94c6",
          subject: `New Inquiry from ${form.name}`,
          from_name: "Maa Sewa Healthcare Website",
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert("Something went wrong. Please call us directly.");
    } catch {
      alert("Connection error. Please call +91 6361376521.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* ── Page Header ── */}
      <section className="pt-36 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-primary text-[11px] font-black uppercase tracking-[0.35em] mb-5">
              Get in Touch
            </p>
            <h1
              className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Contact <br />
              <span className="text-primary">Maa Sewa</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Reach our clinical team for patient admissions, corporate partnerships, or service inquiries. We respond within 30 minutes, around the clock.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-16 xl:gap-24">

            {/* ── Left: Contact Details ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactDetails.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-5 p-6 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-md transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-base font-bold text-slate-800 hover:text-primary transition-colors block">{item.value}</a>
                      ) : (
                        <p className="text-base font-bold text-slate-800">{item.value}</p>
                      )}
                      <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Pillars */}
              <div className="p-8 rounded-2xl bg-slate-900 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Why Families Trust Us</p>
                <ul className="space-y-4">
                  {[
                    { icon: Clock, text: "24/7 Clinical Dispatch" },
                    { icon: ShieldCheck, text: "Police-Verified Nursing Staff" },
                    { icon: CheckCircle2, text: "Hospital-Certified Protocols" },
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                      <t.icon size={16} className="text-primary flex-shrink-0" />
                      {t.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/916361376521?text=Hi%2C%20I%20need%20home%20healthcare%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:shadow-xl hover:shadow-[#25D366]/25 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={20} />
                  <span>Chat on WhatsApp Now</span>
                </div>
                <ArrowUpRight size={18} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[480px] flex flex-col items-center justify-center text-center p-12 bg-emerald-50 rounded-3xl border border-emerald-100"
                >
                  <CheckCircle2 size={60} className="text-emerald-500 mb-6" />
                  <h3 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Request Received
                  </h3>
                  <p className="text-slate-500 max-w-xs mb-8">
                    A clinical coordinator will contact you within 30 minutes to discuss your care needs.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-slate-400">All fields marked with * are required.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name *</label>
                      <input
                        required type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Phone Number *</label>
                      <input
                        required type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Service Required</label>
                    <div className="relative">
                      <select
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        className="w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none"
                      >
                        <option value="">Select a service...</option>
                        {["Home Nursing (ICU)", "Elder Care & Companionship", "Post-Operative Recovery", "Physiotherapy", "Dementia Care", "Injection / Dressing Visit", "Corporate Partnership", "Other"].map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Additional Details</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe the patient's condition, preferred timing, or any specific requirements..."
                      className="w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : "Send Request"}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                      We respond within 30 minutes · Available 24 / 7
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
