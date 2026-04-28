"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Shield, Heart, Zap, Activity } from "lucide-react";

const protocols = [
  {
    title: "Critical Care & ICU",
    description: "Standard operating procedures for managing ICU setups at home, including ventilator monitoring.",
    icon: Activity,
    color: "bg-blue-500",
    files: [
      { name: "ICU Setup Checklist.pdf", size: "1.2 MB" },
      { name: "Ventilator Protocol.pdf", size: "2.4 MB" },
      { name: "Emergency Response Guide.pdf", size: "1.8 MB" }
    ]
  },
  {
    title: "Wound Care & Dressing",
    description: "Guidelines for different types of wound management, sterile techniques, and dressing change schedules.",
    icon: Heart,
    color: "bg-rose-500",
    files: [
      { name: "Post-Surgery Wound Care.pdf", size: "900 KB" },
      { name: "Sterile Technique SOP.pdf", size: "1.1 MB" },
      { name: "Dressing Material Guide.pdf", size: "1.5 MB" }
    ]
  },
  {
    title: "Emergency Procedures",
    description: "Immediate actions for cardiac arrest, choking, and severe respiratory distress protocols.",
    icon: Shield,
    color: "bg-amber-500",
    files: [
      { name: "CPR Protocols.pdf", size: "2.1 MB" },
      { name: "Emergency Drug Chart.pdf", size: "800 KB" },
      { name: "Incident Reporting SOP.pdf", size: "1.2 MB" }
    ]
  },
  {
    title: "Maa Sewa Standards",
    description: "Internal company standards for patient interaction, uniform, and documentation requirements.",
    icon: Zap,
    color: "bg-emerald-500",
    files: [
      { name: "Employee Code of Conduct.pdf", size: "3.2 MB" },
      { name: "Patient Privacy Policy.pdf", size: "1.4 MB" },
      { name: "Handover Guidelines.pdf", size: "1.1 MB" }
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

              <div className="space-y-3">
                {section.files.map((file) => (
                  <div key={file.name} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors group/file">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover/file:text-primary transition-colors">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{file.name}</p>
                        <p className="text-[10px] font-medium text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-all">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
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
