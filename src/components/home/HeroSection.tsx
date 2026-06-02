"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, Stethoscope, MapPin, ThumbsUp, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#F0F8FA] overflow-hidden pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-6">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#007B8A]">MSHC Next-Gen Patient Experience</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] text-slate-800 mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Your Partner in <br />
              <span className="text-[#007B8A]">Health and Wellness</span>
            </h1>

            <p className="text-lg text-slate-600 mb-16 lg:mb-24 max-w-lg leading-relaxed">
              We are committed to providing you with the best medical and healthcare services to help you live healthier and happier.
            </p>

            {/* Bottom Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl max-w-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
                <div className="flex items-center gap-4">
                  <div className="bg-[#E6F2F4] p-3.5 rounded-full text-[#007B8A]">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Availability</p>
                    <p className="text-sm sm:text-base font-bold text-slate-800">24x7 Support</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#E6F2F4] p-3.5 rounded-full text-[#007B8A]">
                    <Stethoscope size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Specialization</p>
                    <p className="text-sm sm:text-base font-bold text-slate-800">Cardiology</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100 my-6 sm:my-8" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#E6F2F4] p-3.5 rounded-full text-[#007B8A]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm sm:text-base font-bold text-slate-800">Pune, Mumbai </p>
                  </div>
                </div>

                <Link href="/contact" className="bg-[#007B8A] hover:bg-[#006571] text-white px-8 py-3.5 rounded-full font-bold transition-all hover:shadow-lg w-full sm:w-auto text-center flex items-center justify-center gap-2 border-[4px] border-dashed border-[#007B8A]/30 hover:border-[#007B8A]/50 bg-clip-padding">
                  Book Now &rarr;
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Content */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[500px] aspect-[4/5] mx-auto lg:mr-8"
            >
              <div className="absolute inset-0 rounded-[3rem] border-[10px] border-white shadow-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/hero_doctor.png"
                  alt="Doctor holographic interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Badges */}
              {/* Bottom Center Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full py-3 px-6 shadow-xl flex items-center gap-3 whitespace-nowrap z-20 border border-slate-50"
              >
                <div className="w-10 h-10 rounded-full bg-[#007B8A] flex items-center justify-center text-white">
                  <ThumbsUp size={18} fill="currentColor" className="mt-0.5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-slate-800 leading-tight">No. 1</p>
                  <p className="text-[11px] text-slate-500 font-medium">Top Best Hospital</p>
                </div>
              </motion.div>

              {/* Right Center Badge */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-16 bg-white rounded-[1.5rem] p-4 shadow-xl flex items-center gap-3 z-20 border border-slate-50"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#007B8A]"
                      strokeWidth="3"
                      strokeDasharray="90, 100"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-slate-800">90%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Client<br />Satisfaction<br />Rate</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
