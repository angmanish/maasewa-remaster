"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";

const cities = [
  {
    name: "Pune",
    areas: ["Kothrud", "Baner", "Viman Nagar", "Hinjewadi", "Hadapsar"],
    desc: "Our primary operational hub with 24/7 emergency dispatch and 150+ staff members."
  },
  {
    name: "Mumbai",
    areas: ["Andheri", "Bandra", "Powai", "South Mumbai", "Thane"],
    desc: "Full service coverage across the metropolitan area with hospital-tie-ups for smooth discharge."
  }
];

export default function CitiesServed() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
              <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Presence</span>
              <h2 className="text-4xl md:text-5xl font-black text-text-heading mb-8" style={{ fontFamily: "var(--font-jakarta)" }}>
                 Now Serving <br />
                 <span className="text-primary">Pune & Mumbai</span>
              </h2>
              <p className="text-lg text-text-body opacity-70 mb-10 leading-relaxed max-w-xl">
                 We are rapidly expanding to bring quality home healthcare to every major city in India. Currently, we offer full coverage in these locations.
              </p>
              
              <div className="space-y-6">
                 {cities.map((city, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all"
                    >
                       <div className="flex items-center gap-3 mb-4">
                          <MapPin className="text-primary" size={24} />
                          <h3 className="text-2xl font-black text-text-heading">{city.name}</h3>
                       </div>
                       <p className="text-sm text-text-body opacity-70 mb-6 leading-relaxed">
                          {city.desc}
                       </p>
                       <div className="flex flex-wrap gap-2">
                          {city.areas.map((area, idx) => (
                             <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                {area}
                             </span>
                          ))}
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
           
           <div className="relative p-12 bg-primary rounded-[4rem] text-white overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-6">Need care in a different city?</h3>
                 <p className="text-white/80 text-lg mb-10 leading-relaxed">
                    We are launching in Bangalore and Hyderabad soon! Get notified when we arrive in your city.
                 </p>
                 <div className="space-y-4 mb-10">
                    {["Bangalore (Coming Soon)", "Hyderabad (Coming Soon)", "Nashik (Planned)"].map((item, i) => (
                       <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={20} className="text-white/40" />
                          <span className="font-bold opacity-80">{item}</span>
                       </div>
                    ))}
                 </div>
                 <a href="#contact" className="inline-block px-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                    Notify Me
                 </a>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
