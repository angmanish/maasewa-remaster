"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, HeartPulse, Award, Clock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified Staff",
    desc: "Every caregiver undergoes rigorous police verification and background checks before joining our team."
  },
  {
    icon: Award,
    title: "Clinical Excellence",
    desc: "Our protocols are designed by senior physicians to ensure hospital-grade care at your home."
  },
  {
    icon: Clock,
    title: "3.8h Avg. Response",
    desc: "Our rapid dispatch system ensures that a qualified nurse reaches your doorstep within hours."
  },
  {
    icon: HeartPulse,
    title: "Patient-First Approach",
    desc: "We focus on emotional healing and companionship alongside clinical treatment."
  },
  {
    icon: Users,
    title: "Expert Care Managers",
    desc: "A dedicated manager coordinates between your family, the nurse, and your primary doctor."
  },
  {
    icon: Zap,
    title: "Real-time Reports",
    desc: "Families receive daily digital reports on patient vitals, medications, and progress."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block"
          >
            The Maa Sewa Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-text-heading mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Why Families <span className="text-primary">Trust Us</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-body text-lg max-w-2xl mx-auto opacity-70"
          >
            We combine high-end medical expertise with compassionate care to ensure a smooth recovery for your loved ones.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>{feature.title}</h3>
              <p className="text-text-body text-sm leading-relaxed opacity-70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
