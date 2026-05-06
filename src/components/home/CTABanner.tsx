"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-blue-400 p-10 md:p-16 text-center"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          </div>

          <h2
            className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Ready to Bring Care Home?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Get a verified, trained nurse dispatched to your home in as little
            as 1.5 hours. Available 24/7, 365 days a year.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-bold text-base hover:bg-blue-50 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <Phone size={18} />
              Request Aftercare Now
            </Link>
            <a
              href="https://wa.me/916361376521?text=Hi%2C%20I%20need%20home%20healthcare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white rounded-full font-bold text-base hover:border-white hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          <p className="text-blue-200 text-sm mt-8">
            Or call us directly:{" "}
            <a
              href="tel:+916361376521"
              className="text-white font-semibold underline underline-offset-2"
            >
              +91 6361376521
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
