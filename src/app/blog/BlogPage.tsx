"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/blogData";

const categories = ["All", "Nursing", "Equipment", "Recovery", "Elder Care"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic (assuming you might add categories to blogData later)
  const filtered = activeCategory === "All" ? blogPosts : blogPosts;

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
            <p className="text-text-body text-xl max-w-xl mx-auto opacity-80">
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
              <Link href={`/blog/${article.slug}`} key={article.slug}>
                <motion.article
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border-color hover:shadow-2xl transition-all group flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-4 font-bold uppercase tracking-widest">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-primary" /> {article.readTime}
                      </span>
                    </div>
                    <h2 className="font-black text-text-heading text-xl leading-tight mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {article.title}
                    </h2>
                    <p className="text-text-body text-sm leading-relaxed mb-6 line-clamp-3 opacity-80 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                      Read Article <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
