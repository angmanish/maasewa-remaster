"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import Image from "next/image";

const recentPosts = [
  {
    title: "Understanding Post-Operative Care at Home",
    excerpt: "Essential tips and protocols for a smooth recovery after major surgery without staying in the hospital.",
    image: "/blog_postop_new.png",
    category: "Recovery",
    date: "May 5, 2026",
    slug: "post-operative-care"
  },
  {
    title: "Nutrition Guide for Senior Citizens",
    excerpt: "How proper diet and hydration play a critical role in managing chronic health conditions in the elderly.",
    image: "/blog_nutrition.png",
    category: "Elder Care",
    date: "May 4, 2026",
    slug: "senior-nutrition"
  },
  {
    title: "The Role of Emotional Support in Recovery",
    excerpt: "Healing is more than just medicine. Learn why companionship is vital for patients in home healthcare.",
    image: "/blog_dementia.png",
    category: "Psychology",
    date: "May 3, 2026",
    slug: "emotional-support"
  }
];

export default function BlogPreview() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Knowledge Base</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-heading" style={{ fontFamily: "var(--font-jakarta)" }}>
               Latest Health <span className="text-primary">Guides</span>
            </h2>
          </div>
          <NextLink href="/blog" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
             View All Articles <ArrowRight size={18} />
          </NextLink>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recentPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                   <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      {post.category}
                   </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                   <div className="flex items-center gap-1.5">
                      <Clock size={14} /> {post.date}
                   </div>
                   <div className="flex items-center gap-1.5">
                      <User size={14} /> By Dr. Mehta
                   </div>
                </div>
                <h3 className="text-xl font-black text-text-heading mb-4 group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                   {post.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed opacity-70 line-clamp-3 mb-8">
                   {post.excerpt}
                </p>
                <NextLink href="/blog" className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                   Read Full Story <ArrowRight size={16} />
                </NextLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
