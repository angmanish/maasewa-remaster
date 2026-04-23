"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anita Mehta",
    city: "Pune",
    rating: 5,
    text: "My father was discharged after a hip replacement. Maasewa sent a nurse within 4 hours. The nurse was professional, caring, and my father recovered comfortably at home. Highly recommended!",
    service: "Post-Op Care",
  },
  {
    name: "Rajesh Kumar",
    city: "Mumbai",
    rating: 5,
    text: "We needed ICU-level care at home for my mother. The setup was done within hours — oxygen, monitor, everything. The nurses are incredibly skilled. It gave us immense peace of mind.",
    service: "ICU Home Setup",
  },
  {
    name: "Rinki Devi",
    city: "Pune",
    rating: 5,
    text: "The elder care service for my 82-year-old father-in-law has been a blessing. The caregiver treats him like family. We couldn't have managed without Maasewa's help.",
    service: "Elder Care",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-bg-ice">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Patient Stories
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-text-heading mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Real People. Real Recovery.
          </h2>
          <p className="text-text-body text-lg max-w-xl mx-auto">
            Hear from families who trusted Maasewa with their most vulnerable
            moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-border-color hover:shadow-lg transition-shadow relative"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 text-blue-100">
                <Quote size={36} />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className="fill-warning text-warning"
                  />
                ))}
              </div>

              <p className="text-text-body text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-text-heading text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-muted">{t.city}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                  {t.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
