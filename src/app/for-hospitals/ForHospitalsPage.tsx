"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  TrendingDown, Users, Building2, Clock, CheckCircle,
  FileText, HeartHandshake, ArrowRight, Phone, ShieldCheck, Star
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
          subject: `New Hospital Partner Inquiry from ${form.hospital}`,
          from_name: "Maa Sewa Healthcare Website",
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
    <div className="bg-white min-h-screen">
      {/* Simplified Professional Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] -mr-48 -mt-48 opacity-40 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
              Hospital Partnership Program
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Optimize Patient Outcomes <br />
              &amp; <span className="text-primary">Bed Turnover</span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Partner with Maa Sewa to provide seamless post-discharge home care. We act as a reliable, clinically-governed extension of your hospital.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
              <a href="#partner-form" className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Request Partnership
              </a>
              <a href="tel:+916361376521" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-sm hover:border-primary transition-all">
                <Phone size={18} /> Talk to B2B Team
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-200/60">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none mb-2">{s.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>n>

      {/* Clinical Integration Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                   src="/expert_care.png"
                   alt="Clinical Collaboration"
                   fill
                   className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                   <p className="text-sm font-black uppercase tracking-[0.2em] mb-2 opacity-80">Clinically Aligned</p>
                   <h3 className="text-2xl font-black leading-tight">We act as an extension of your hospital clinical team.</h3>
                </div>
             </div>
             
             <div>
                <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-6 block">The Maasewa Edge</span>
                <h2 className="text-4xl md:text-5xl font-black text-text-heading mb-8 leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                   Clinical Integration & <br />
                   <span className="text-primary">Reporting</span>
                </h2>
                <div className="space-y-6">
                   {[
                      { 
                        title: "Real-time Patient Monitoring", 
                        desc: "Our nurses use a proprietary digital charting system that shares daily vitals and progress reports directly with the patient's primary consultant at your hospital." 
                      },
                      { 
                        title: "Seamless Handoff Protocols", 
                        desc: "We follow strict WHO-standard handoff protocols during hospital discharge to ensure all medical instructions are captured and implemented at home." 
                      },
                      { 
                        title: "Emergency Escalation Pathway", 
                        desc: "In case of any clinical deterioration at home, we have an established fast-track referral pathway back to your ER, ensuring zero delay in critical care." 
                      }
                   ].map((item, i) => (
                      <div key={i} className="flex gap-5 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all">
                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <CheckCircle size={20} />
                         </div>
                         <div>
                            <p className="font-black text-text-heading mb-1">{item.title}</p>
                            <p className="text-text-body text-sm leading-relaxed opacity-80">{item.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <span className="text-white">Partnership</span> <span className="text-blue-400">Models</span>
               </h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                  Choose a collaboration model that fits your hospital&apos;s operational structure and patient care goals.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  {
                    title: "Referral Partnership",
                    desc: "Ideal for hospitals wanting to offer reliable home care options to patients at discharge. We handle everything from assessment to deployment.",
                    tags: ["Standard Integration", "Quick Setup", "No Cost to Hospital"]
                  },
                  {
                    title: "Co-Branded Care",
                    desc: "An integrated model where home care is offered as an extended service of your hospital. Includes dedicated ward-coordinators.",
                    tags: ["Enhanced Revenue", "Joint Marketing", "Integrated Billing"]
                  },
                  {
                    title: "Unit Management",
                    desc: "A fully managed model where we operate the hospital's home-care vertical end-to-end, including recruitment and equipment logistics.",
                    tags: ["Full Operation Control", "Profit Sharing", "Highest Integration"]
                  }
               ].map((model, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] flex flex-col hover:border-primary/50 transition-all group/card">
                     <h3 className="text-2xl font-black mb-4 text-white group-hover/card:text-primary transition-colors">{model.title}</h3>
                     <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">{model.desc}</p>
                     <div className="flex flex-wrap gap-2">
                        {model.tags.map((tag, idx) => (
                           <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Empowering Healthcare Institutions Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
               <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Institutional Impact</span>
               <h2 className="text-4xl md:text-5xl font-black text-text-heading mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Empowering Healthcare <br />
                  <span className="text-primary">Institutions</span>
               </h2>
               <p className="text-text-body max-w-2xl mx-auto text-lg opacity-80">
                  We don&apos;t just care for patients; we optimize hospital operations and clinical outcomes through structured collaboration.
               </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { 
                    title: "Bed Turnover", 
                    desc: "Free up critical care beds faster by transitioning stable patients to a hospital-grade home environment.",
                    icon: Building2,
                    color: "blue"
                  },
                  { 
                    title: "Clinical Continuity", 
                    desc: "Direct digital reporting ensures the hospital consultant remains in control of the patient's recovery path.",
                    icon: FileText,
                    color: "emerald"
                  },
                  { 
                    title: "Infection Control", 
                    desc: "Significantly lower the risk of hospital-acquired MDR infections by reducing unnecessary institutional stays.",
                    icon: ShieldCheck,
                    color: "purple"
                  },
                  { 
                    title: "Patient Satisfaction", 
                    desc: "Improve your hospital's satisfaction scores by offering premium, stress-free recovery options at home.",
                    icon: Star,
                    color: "amber"
                  }
               ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                     <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all`}>
                        <item.icon size={28} />
                     </div>
                     <h3 className="text-xl font-black text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>{item.title}</h3>
                     <p className="text-text-body text-sm leading-relaxed opacity-70">{item.desc}</p>
                  </div>
               ))}
            </div>

            <div className="mt-20 p-12 rounded-[3rem] bg-white border border-slate-200 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                  <h3 className="text-3xl font-black text-text-heading mb-4">Ready to optimize your patient outcomes?</h3>
                  <p className="text-text-body text-lg opacity-80 mb-8">
                     Join 50+ leading hospitals in Pune and Mumbai who trust Maa Sewa for their post-discharge care.
                  </p>
                  <div className="flex flex-wrap gap-6">
                     <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-success" />
                        <span className="font-bold text-sm text-text-heading">Zero Setup Cost</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-success" />
                        <span className="font-bold text-sm text-text-heading">24/7 Dedicated Support</span>
                     </div>
                  </div>
               </div>
               <div className="flex-shrink-0">
                  <a href="#partner-form" className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/25">
                     Start Partnership
                  </a>
               </div>
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
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg"}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Phone size={18} /> Request Partnership
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
