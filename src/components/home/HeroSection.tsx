"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Phone, Star, Clock, Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section className="hero-gradient min-h-[92vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
              >
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div className="absolute inset-0 rounded-full bg-success pulse-ring" />
                </div>
                Nurses Available Right Now
              </motion.div>

              {/* Headline */}
              <h1
                className="text-5xl md:text-6xl font-extrabold text-text-heading leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Care Doesn&apos;t End
                <br />
                <span className="text-primary">At Discharge</span>
              </h1>

              <p className="text-lg text-text-body leading-relaxed max-w-xl mb-8">
                We bring certified home nurses, ICU setups, and post-operative
                care to your doorstep — so your loved ones recover safely at home.
              </p>

              {/* Social proof row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                <div className="flex items-center gap-1.5">
                  <Star size={18} className="fill-warning text-warning" />
                  <span className="font-bold text-text-heading">4.8</span>
                  <span className="text-text-muted text-sm ml-1">Rating</span>
                </div>
                <div className="hidden sm:block w-px h-5 bg-slate-300" />
                <div className="flex items-center gap-1.5">
                  <Users size={18} className="text-primary" />
                  <span className="font-bold text-text-heading">100+</span>
                  <span className="text-text-muted text-sm ml-1">Patients</span>
                </div>
                <div className="hidden sm:block w-px h-5 bg-slate-300" />
                <div className="flex items-center gap-1.5">
                  <Clock size={18} className="text-success" />
                  <span className="font-bold text-text-heading">3.8h</span>
                  <span className="text-text-muted text-sm ml-1">Avg. Arrival</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-7 py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-1 shadow-blue"
                >
                  <Phone size={18} />
                  Request Aftercare
                </Link>
                <Link
                  href="/how-it-works"
                  className="flex items-center gap-2 px-7 py-4 border-2 border-border-color text-text-heading rounded-full font-bold text-base hover:border-primary hover:text-primary transition-all hover:-translate-y-1"
                >
                  How It Works
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Right — Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Background blob */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 to-green-50 rounded-3xl blur-3xl scale-110 opacity-60" />

                {/* Hero image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="relative w-80 h-80 md:w-[480px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/nurse_hero.png"
                    alt="Certified home nurse"
                    fill
                    sizes="(max-width: 768px) 320px, 480px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-px bg-border-color/50 w-full" />
    </>
  );
}
