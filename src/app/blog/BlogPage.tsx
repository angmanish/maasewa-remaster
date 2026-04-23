"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["All", "Nursing", "Equipment", "Recovery", "Elder Care"];

const articles = [
  {
    title: "What to Expect After Discharge from Hospital",
    excerpt: "Going home after a hospital stay can be overwhelming. Here's everything you need to prepare for a smooth recovery at home.",
    category: "Recovery",
    readTime: "5 min read",
    date: "Apr 15, 2026",
    image: "/blog_postop.png",
    slug: "#",
  },
  {
    title: "5 Signs You Need Home Nursing Care",
    excerpt: "Not sure if you need a home nurse? These key indicators will help you decide whether professional home nursing care is right for you.",
    category: "Nursing",
    readTime: "4 min read",
    date: "Apr 10, 2026",
    image: "/nurse_hero.png",
    slug: "#",
  },
  {
    title: "ICU at Home: A Complete Guide for Families",
    excerpt: "Setting up an ICU-level environment at home sounds daunting, but with the right team it's simpler than you think.",
    category: "Equipment",
    readTime: "7 min read",
    date: "Apr 5, 2026",
    image: "/blog_icu.png",
    slug: "#",
  },
  {
    title: "How to Choose the Right Home Nurse",
    excerpt: "Background checks, certifications, experience — here's the complete checklist for choosing a home nurse you can trust.",
    category: "Nursing",
    readTime: "6 min read",
    date: "Mar 30, 2026",
    image: "/nurse_hero.png",
    slug: "#",
  },
  {
    title: "Post-Surgery Recovery Tips: Week by Week",
    excerpt: "A comprehensive timeline of what to expect in the days and weeks after major surgery, and how to accelerate your healing.",
    category: "Recovery",
    readTime: "8 min read",
    date: "Mar 22, 2026",
    image: "/blog_postop.png",
    slug: "#",
  },
  {
    title: "Managing Elderly Care at Home: A Family Guide",
    excerpt: "Caring for an aging parent at home? This guide covers daily routines, medical needs, emotional support, and caregiver burnout prevention.",
    category: "Elder Care",
    readTime: "9 min read",
    date: "Mar 14, 2026",
    image: "/blog_postop.png",
    slug: "#",
  },
];

const categoryColors: Record<string, string> = {
  Nursing: "bg-blue-100 text-blue-700",
  Equipment: "bg-purple-100 text-purple-700",
  Recovery: "bg-emerald-100 text-emerald-700",
  "Elder Care": "bg-amber-100 text-amber-700",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
              Health Resources
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-text-heading tracking-tight mb-5" style={{ fontFamily: "var(--font-jakarta)" }}>
              Recovery Guides &{" "}
              <span className="text-primary">Health Tips</span>
            </h1>
            <p className="text-text-body text-xl max-w-xl mx-auto">
              Expert articles to help patients, families, and caregivers navigate
              home healthcare with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-border-color sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Tag size={16} className="text-text-muted flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-bg-ice text-text-body hover:bg-blue-50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 bg-bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border-color hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[article.category]}`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-bold text-text-heading text-lg leading-snug mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {article.title}
                  </h2>
                  <p className="text-text-body text-sm leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link href={article.slug} className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
