"use client";

import { motion } from "framer-motion";
import { 
  Check, Star, Shield, Clock, 
  Heart, Activity, UserCheck, 
  ArrowRight, Sparkles, Zap,
  TrendingUp, Award
} from "lucide-react";
import Link from "next/link";

const packages = [
  {
    id: "basic-recovery",
    name: "Basic Recovery",
    tagline: "Standard post-hospital support",
    icon: Activity,
    price: "₹900 - ₹1,200",
    period: "per day",
    color: "blue",
    features: [
      "8h/12h Shift Assistance",
      "Basic Vitals Monitoring",
      "Medication Reminders",
      "General Mobility Support",
      "Daily Care Logs",
      "Care Coordinator Support"
    ],
    popular: false,
    description: "Ideal for patients who need basic assistance and monitoring during their initial recovery phase at home."
  },
  {
    id: "advanced-nursing",
    name: "Advanced Nursing",
    tagline: "Highly skilled clinical care",
    icon: Zap,
    price: "₹1,200 - ₹1,800",
    period: "per day",
    color: "emerald",
    features: [
      "B.Sc/GNM Certified Nurses",
      "Wound & Drain Management",
      "IV Infusion & Injections",
      "Catheter & Ryle's Tube Care",
      "Post-Surgical Monitoring",
      "24/7 Clinical Supervision"
    ],
    popular: true,
    description: "Our most recommended plan for complex recoveries requiring professional nursing interventions and clinical expertise."
  },
  {
    id: "icu-home",
    name: "Home ICU setup",
    tagline: "Critical care at home",
    icon: Activity,
    price: "₹2,000 - ₹4,000",
    period: "per day",
    color: "rose",
    features: [
      "ICU-Trained Staff (24/7)",
      "Ventilator & Oxygen Support",
      "Critical Care Monitoring",
      "Real-time Vitals Sync",
      "Emergency Backup Plans",
      "Priority Doctor Access"
    ],
    popular: false,
    description: "Hospital-grade intensive care delivered at home for critically ill patients needing constant monitoring."
  },
  {
    id: "elder-care",
    name: "Elderly Essential",
    tagline: "Dedicated senior support",
    icon: Heart,
    price: "₹20k - ₹50k",
    period: "per month",
    color: "blue",
    features: [
      "Full-time Care Assistant",
      "Chronic Disease Management",
      "Physiotherapy Coordination",
      "Mental Wellness Support",
      "Doctor Visit Arrangements",
      "Social Engagement Plans"
    ],
    popular: false,
    description: "A comprehensive monthly plan focused on improving the quality of life and health for seniors."
  }
];

const benefits = [
  { icon: Shield, title: "Verified Staff", desc: "Every nurse and caregiver is police-verified and background-checked." },
  { icon: Clock, title: "Quick Deployment", desc: "Get a caregiver at your doorstep within 3.8 hours of booking." },
  { icon: Activity, title: "Daily Reports", desc: "Digital health reports shared daily with family and treating doctors." },
  { icon: UserCheck, title: "Free Replacement", desc: "Not satisfied with the staff? We provide a free replacement within 24h." }
];

const colorVariants: Record<string, any> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    accent: "bg-blue-600",
    shadow: "shadow-blue-200/50",
    gradient: "from-blue-600 to-blue-400"
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
    accent: "bg-emerald-600",
    shadow: "shadow-emerald-200/50",
    gradient: "from-emerald-600 to-emerald-400"
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-100",
    accent: "bg-rose-600",
    shadow: "shadow-rose-200/50",
    gradient: "from-rose-600 to-rose-400"
  }
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden mesh-gradient">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -mr-48 -mt-48 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-white border border-blue-100 text-primary rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles size={14} className="text-yellow-400 fill-yellow-400" />
              Tailored Care Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-text-heading leading-[1.1] tracking-tighter mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
              Transparent <span className="text-primary">Care Packages</span>
            </h1>
            <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-2xl mx-auto opacity-80">
              Flexible, comprehensive, and clinical home care plans designed to fit your specific needs and budget. No hidden costs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => {
              const styles = colorVariants[pkg.color] || colorVariants.blue;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative group h-full flex flex-col p-6 rounded-[2.5rem] bg-white border ${pkg.popular ? 'border-primary ring-4 ring-primary/5' : 'border-slate-100'} hover:border-primary/30 transition-all duration-500 hover:shadow-2xl`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 flex items-center gap-2 whitespace-nowrap">
                      <TrendingUp size={12} /> Recommended
                    </div>
                  )}

                  <motion.div 
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className={`w-12 h-12 rounded-2xl ${styles.bg} ${styles.text} flex items-center justify-center mb-5`}
                  >
                    <pkg.icon size={24} />
                  </motion.div>

                  <div className="mb-6">
                    <h3 className="text-xl font-black text-text-heading mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>{pkg.name}</h3>
                    <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{pkg.tagline}</p>
                  </div>

                  <div className="mb-6 flex flex-col">
                    <span className="text-2xl font-black text-text-heading leading-none">{pkg.price}</span>
                    <span className="text-[10px] font-bold text-text-muted mt-1">{pkg.period}</span>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`w-4 h-4 rounded-full ${styles.bg} ${styles.text} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check size={10} strokeWidth={4} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className={`block w-full py-3.5 rounded-2xl text-center font-black text-xs transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25' 
                        : 'bg-slate-50 text-text-heading hover:bg-primary hover:text-white border border-slate-100 hover:border-primary'
                    }`}
                  >
                    Select Plan
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-text-heading mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
              The Maa Sewa Assurance
            </h2>
            <p className="text-text-body font-bold max-w-xl mx-auto opacity-70">
              Why thousands of families trust our care packages for their loved ones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <benefit.icon size={24} />
                </div>
                <h4 className="text-lg font-black text-text-heading mb-2">{benefit.title}</h4>
                <p className="text-sm text-text-muted font-bold leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="py-24 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-trust-blue to-primary-dark rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -ml-48 -mb-48" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-xs font-black uppercase tracking-widest">Tailored Just For You</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                Need a Custom <br className="hidden md:block" /> Package?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                Every patient is unique. Our care coordinators can design a personalized package specifically tailored to your clinical requirements and schedule.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  href="/contact" 
                  className="px-12 py-5 bg-white text-primary rounded-2xl font-black hover:bg-blue-50 transition-all hover:scale-105 shadow-xl shadow-white/10"
                >
                  Consult Now
                </Link>
                <a 
                  href="tel:+916361376521" 
                  className="px-12 py-5 bg-white/10 border-2 border-white/30 text-white rounded-2xl font-black hover:bg-white/20 transition-all flex items-center gap-3 backdrop-blur-sm"
                >
                  <Clock size={20} /> Call Expert
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
