"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Phone, Star, Clock, Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white mesh-gradient">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -mr-48 -mt-48 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-3xl -ml-24 -mb-24 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-primary rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-success pulse-ring" />
                24/7 Professional Care Available
              </motion.div>

              <h1
                className="text-5xl md:text-7xl font-black text-text-heading leading-[1.1] tracking-tighter mb-8"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                WellCare Nurturing <br />
                <span className="text-primary">Health, Inspiring Life</span>
              </h1>

              <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-xl mb-10 opacity-80">
                Empowering wellness through comprehensive home care. Discover the journey to vibrant health with our expert medical team.
              </p>

              <div className="flex flex-wrap gap-5 mb-12">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-base hover:bg-primary-dark transition-all hover:shadow-2xl hover:-translate-y-1 shadow-lg shadow-primary/25"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/how-it-works"
                  className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-text-heading rounded-2xl font-bold text-base hover:border-primary hover:text-primary transition-all hover:-translate-y-1 shadow-sm"
                >
                  Contact us <ArrowRight size={18} />
                </Link>
              </div>

              {/* Social Proof Avatars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-100 shadow-sm">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                        alt="Patient"
                        width={48}
                        height={48}
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    +1k
                  </div>
                </div>
                <div>
                  <p className="text-lg font-black text-text-heading">150k+ Patients</p>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Recovered Safely</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image Content */}
            <div className="lg:col-span-6 relative h-[500px] md:h-[650px] flex items-center justify-center lg:justify-end">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full max-w-[550px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 lg:hidden" />
                <Image
                  src="/doctors_group_hero.png"
                  alt="Maa Sewa Medical Team"
                  fill
                  className="object-contain object-bottom"
                  priority
                />

                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 -left-8 md:-left-16 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-white/50 z-20 hidden sm:flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-primary">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-text-heading leading-tight">100+</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Happy Families</p>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
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
                    <div className="mt-2 flex gap-1">
                      <button className="text-[9px] font-black uppercase tracking-tighter bg-primary/10 text-primary px-2 py-1 rounded-md">Book Appointment</button>
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
