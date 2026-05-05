"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Shield, Heart, Zap, Activity, CheckCircle2 } from "lucide-react";

const protocols = [
  {
    title: "Critical Care & ICU",
    description: "Standard operating procedures for managing ICU setups at home, including ventilator monitoring.",
    icon: Activity,
    color: "bg-blue-500",
    content: [
      { label: "Ventilator Support", detail: "Monitor peak pressures every 2 hours. Ensure humidifier water level is optimal." },
      { label: "Vitals Monitoring", detail: "Mandatory hourly charting of BP, Pulse, SpO2, and Respiration for all ICU patients." },
      { label: "Emergency Alarms", detail: "Keep alarm volume at audible levels. Never mute alarms without senior doctor approval." }
    ]
  },
  {
    title: "Wound Care & Dressing",
    description: "Guidelines for different types of wound management, sterile techniques, and dressing change schedules.",
    icon: Heart,
    color: "bg-rose-500",
    content: [
      { label: "Sterile Technique", detail: "Always use sterile gloves and disposable dressing kits. Maintain a 2-foot sterile field." },
      { label: "Infection Signs", detail: "Check for localized heat, unusual discharge, or foul smell. Report immediately if detected." },
      { label: "Documentation", detail: "Take clear photos of the wound (with consent) before and after every dressing change." }
    ]
  },
  {
    title: "Emergency Procedures",
    description: "Immediate actions for cardiac arrest, choking, and severe respiratory distress protocols.",
    icon: Shield,
    color: "bg-amber-500",
    content: [
      { label: "BLS Protocol", detail: "Start CPR immediately if pulse is absent. Call 108 and then the Maa Sewa 24/7 helpline." },
      { label: "Choking (Heimlich)", detail: "Perform abdominal thrusts if the patient is conscious. Transition to CPR if unconscious." },
      { label: "Rapid Escalation", detail: "Inform the primary consultant and the family simultaneously during any emergency." }
    ]
  },
  {
    title: "Maa Sewa Standards",
    description: "Internal company standards for patient interaction, uniform, and documentation requirements.",
    icon: Zap,
    color: "bg-emerald-500",
    content: [
      { label: "Professional Grooming", detail: "Clean uniform, ID card visible, and maintain personal hygiene standards at all times." },
      { label: "Patient Communication", detail: "Explain every clinical procedure to the patient and family before performing it." },
      { label: "Handover Accuracy", detail: "Ensure clinical notes are updated on the app within 30 minutes of the vitals check." }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="pb-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
          Clinical Resources
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Standard protocols and clinical guidelines for Maa Sewa Healthcare staff.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {protocols.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${section.color} text-white flex items-center justify-center shadow-lg shadow-current/20 group-hover:rotate-6 transition-transform`}>
                  <section.icon size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800">{section.title}</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocol Series</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                {section.description}
              </p>

              <div className="space-y-4">
                {section.content.map((item, i) => (
                  <div key={i} className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white transition-all group/item">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all">
                          <CheckCircle2 size={12} />
                       </div>
                       <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{item.label}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium pl-9">
                       {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`h-1.5 w-full ${section.color} opacity-20`} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black mb-2">Need a specific protocol?</h3>
            <p className="text-slate-400 font-medium">Request custom clinical guidelines from the medical department.</p>
          </div>
          <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all whitespace-nowrap">
            Contact Medical Head
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
}
