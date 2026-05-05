"use client";

import { motion } from "framer-motion";
import { Activity, Thermometer, ShieldCheck, HeartPulse, Zap, Settings } from "lucide-react";

const specializations = [
  { title: "Critical Care (ICU)", desc: "Managed by ICU-trained nurses with 24/7 doctor oversight and advanced life-support equipment.", icon: Activity },
  { title: "Oncology Support", desc: "Specialized pain management and palliative care for cancer patients in the comfort of home.", icon: HeartPulse },
  { title: "Cardiac Rehab", desc: "Post-surgery cardiac monitoring and physiotherapy to ensure safe cardiovascular recovery.", icon: Zap },
  { title: "Neurological Care", desc: "Dedicated care for stroke recovery, Parkinson's, and Dementia with specialized therapists.", icon: Settings }
];

export default function ClinicalExcellence() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">
            Clinical Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-heading mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Hospital Quality <br />
            <span className="text-primary">At Your Doorstep</span>
          </motion.h2>
          <p className="text-text-body text-base md:text-lg max-w-2xl mx-auto opacity-70">
            We bridge the gap between hospital and home with specialized clinical teams and high-end medical technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Specialization Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              {specializations.map((spec, i) => (
                <motion.div
                  key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 md:p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                    <spec.icon size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-text-heading mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>{spec.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed opacity-60">{spec.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-6 md:p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-1 text-white">Quality Assurance Standards</h4>
                  <p className="text-slate-400 text-sm">All equipment is sterilized and calibrated after every use by our certified biomedical engineers.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Equipment Stack */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 bg-white border border-slate-100 p-7 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <h3 className="text-xl md:text-2xl font-black text-text-heading mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>Equipment Stack</h3>
              <div className="space-y-3">
                {[
                  { name: "5-Para Cardiac Monitors", icon: Activity },
                  { name: "Infusion & Syringe Pumps", icon: Zap },
                  { name: "BiPAP / CPAP Units", icon: Settings },
                  { name: "Oxygen Concentrators", icon: Thermometer },
                  { name: "DVT Pumps & ICU Beds", icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:border-primary/20 hover:bg-white transition-all group border border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        <item.icon size={15} />
                      </div>
                      <span className="font-bold text-sm text-text-heading">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Live</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
