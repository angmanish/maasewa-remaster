"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, ArrowRight, Send } from "lucide-react";

export default function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "39faab4c-e920-4d0f-ad46-fb7ace0a94c6", // Replace with your key
          subject: `New Care Request from ${form.name}`,
          from_name: "Maasewa Healthcare Website",
          ...form,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please check your connection or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-extrabold text-text-heading mb-4 tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-text-body text-xl">
              Ready to start? Our care coordinators are available 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-text-heading mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Contact Information
                </h2>
                <p className="text-text-body text-sm">We respond to all inquiries within 30 minutes during business hours.</p>
              </div>

              {[
                { icon: Phone, label: "Phone", value: "+91 6361376521", href: "tel:+916361376521" },
                { icon: Mail, label: "Email", value: "info@maasewahealthcare.com", href: "mailto:info@maasewahealthcare.com" },
                { icon: MapPin, label: "Address", value: "Gate no 1313, Om Sai Housing Society, near Zenda Chowk, Pune, 411062", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 p-5 bg-bg-ice rounded-2xl border border-border-color">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-text-heading font-medium text-sm hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-text-heading font-medium text-sm leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/916361376521?text=Hi%2C%20I%20need%20home%20healthcare%20services"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:bg-[#1ebe5d] transition-all hover:shadow-lg"
              >
                <MessageCircle size={22} className="fill-white" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-emerald-50 rounded-2xl border border-emerald-200"
                >
                  <CheckCircle size={56} className="text-success mb-5" />
                  <h3 className="text-2xl font-bold text-text-heading mb-3">We&apos;ll Call You Back!</h3>
                  <p className="text-text-body max-w-sm">
                    Our care coordinator will call you within 30 minutes to discuss your requirements.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-bg-ice p-8 rounded-2xl border border-border-color space-y-5">
                  <h3 className="text-xl font-bold text-text-heading mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Request Aftercare
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                      { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-semibold text-text-heading mb-1.5">{field.label}</label>
                        <input type={field.type} required placeholder={field.placeholder}
                          value={(form as Record<string, string>)[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border-color bg-white text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-1.5">Email Address</label>
                    <input type="email" placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border-color bg-white text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-1.5">Service Needed</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border-color bg-white text-text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm"
                    >
                      <option value="">Select a service...</option>
                      {["Home Nursing", "Elder Care", "ICU Home Setup", "Post-Op Care", "Specialized Care", "Injection Visit"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-1.5">Message (Optional)</label>
                    <textarea rows={4} placeholder="Describe your care needs, patient condition, or any questions..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border-color bg-white text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm resize-none"
                    />
                  </div>
                  <button type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg"}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Request
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-text-muted">
                    We respond within 30 minutes · Available 24/7
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
