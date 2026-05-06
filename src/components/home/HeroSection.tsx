"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white mesh-gradient">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -mr-48 -mt-48 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-3xl -ml-24 -mb-24 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-primary rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-success pulse-ring" />
                24/7 Professional Care Available
              </motion.div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-heading leading-[1.1] tracking-tighter mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Professional Home Nursing <br />
                <span className="text-primary">& ICU setup home</span>
              </h1>

              <p className="text-base md:text-xl text-text-body leading-relaxed max-w-xl mb-8 opacity-80 mx-auto lg:mx-0">
                Empowering wellness through comprehensive home care. Discover the journey to vibrant health with our expert medical team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
                <Link href="/contact" className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-white rounded-2xl font-bold text-base hover:bg-primary-dark transition-all hover:shadow-2xl hover:-translate-y-1 shadow-lg shadow-primary/25">
                  Book Appointment
                </Link>
                <Link href="/how-it-works" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-text-heading rounded-2xl font-bold text-base hover:border-primary hover:text-primary transition-all hover:-translate-y-1 shadow-sm">
                  Contact us <ArrowRight size={18} />
                </Link>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-50 flex items-center justify-center text-primary text-xs font-bold shadow-sm">PN</div>
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-primary text-xs font-bold shadow-sm">MB</div>
                </div>
                <div>
                  <p className="text-base font-black text-text-heading">Serving in 2 Cities</p>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Pune &amp; Mumbai</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image — shown only on large screens */}
            <div className="lg:col-span-6 relative h-[420px] md:h-[560px] hidden lg:flex items-center justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full max-w-[550px]"
              >
                <Image src="/doctors_group_hero.png" alt="Maa Sewa Medical Team" fill className="object-contain object-bottom" priority />

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -left-16 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 z-20 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-primary">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-text-heading leading-tight">100+</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Happy Families</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-1/4 right-0 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 z-20 flex items-center gap-4 max-w-[220px]"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image src="/logo.png" alt="Doctor" width={40} height={40} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-text-heading truncate">Best Doctor</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest truncate">Operation Specialist</p>
                    <div className="mt-2">
                      <span className="text-[9px] font-black uppercase tracking-tighter bg-primary/10 text-primary px-2 py-1 rounded-md">Book Appointment</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      <div className="h-px bg-slate-100 w-full" />
    </>
  );
}
