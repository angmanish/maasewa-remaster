"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["All", "Nursing", "Equipment", "Recovery", "Elder Care"];

const articles = [
  {
    title: "What to Expect After Discharge from Hospital",
    excerpt: "Going home after a hospital stay can be overwhelming. Here's everything you need to prepare for a smooth recovery at home.",
    content: `
      Going home after surgery or a major medical event is a significant milestone, but it also comes with responsibilities. 
      First, ensure your home is clear of trip hazards. Second, organize your medications and follow the schedule strictly. 
      Lastly, don't hesitate to reach out for professional help if recovery feels slower than expected. 
      Maa Sewa Healthcare provides specialized post-discharge nursing to monitor vitals and wound care, ensuring you never feel alone in your journey.
    `,
    category: "Recovery",
    readTime: "5 min read",
    date: "Apr 15, 2026",
    image: "/blog_postop.png",
    slug: "#",
  },
  {
    title: "5 Signs You Need Home Nursing Care",
    excerpt: "Not sure if you need a home nurse? These key indicators will help you decide whether professional home nursing care is right for you.",
    content: `
      Home nursing isn't just for the elderly. It's for anyone needing consistent medical monitoring. 
      Signs include difficulty managing multiple medications, recurring infections in surgical wounds, 
      frequent falls, or a need for specialized equipment like ventilators or catheters. 
      Our team is trained to handle complex medical needs right in the comfort of your living room.
    `,
    category: "Nursing",
    readTime: "4 min read",
    date: "Apr 10, 2026",
    image: "/nurse_hero.png",
    slug: "#",
  },
  {
    title: "ICU at Home: A Complete Guide for Families",
    excerpt: "Setting up an ICU-level environment at home sounds daunting, but with the right team it's simpler than you think.",
    content: `
      An ICU at home includes patient monitors, ventilators, oxygen concentrators, and specialized beds. 
      Crucially, it requires 24/7 nursing by ICU-trained professionals. 
      We help families source the equipment and provide the expert staff to maintain a hospital-grade environment for critical patients.
    `,
    category: "Equipment",
    readTime: "7 min read",
    date: "Apr 5, 2026",
    image: "/blog_icu.png",
    slug: "#",
  },
  {
    title: "Post-Operative Wound Care: Best Practices",
    excerpt: "Proper wound care is essential to prevent infection and ensure fast healing after surgery.",
    content: `
      Wound care involves keeping the area clean and dry. Always wash your hands before touching the dressing. 
      Watch for redness, swelling, or unusual discharge. Our nurses specialize in sterile dressing changes 
      and use advanced medical techniques to promote tissue regeneration and minimize scarring.
    `,
    category: "Recovery",
    readTime: "6 min read",
    date: "Apr 1, 2026",
    image: "/blog_postop.png",
    slug: "#",
  },
  {
    title: "The Importance of Physiotherapy in Recovery",
    excerpt: "Physical therapy is often the missing link in a patient's recovery journey at home.",
    content: `
      Physiotherapy helps restore mobility and strength. Whether it's post-orthopedic surgery or stroke recovery, 
      consistent exercises are vital. Maa Sewa provides home-visit physiotherapists who design custom 
      exercise plans to help patients regain their independence faster.
    `,
    category: "Recovery",
    readTime: "5 min read",
    date: "Mar 25, 2026",
    image: "/blog_icu.png",
    slug: "#",
  },
  {
    title: "Elderly Nutrition: A Caregiver's Guide",
    excerpt: "Nutrition plays a critical role in maintaining the health and immunity of senior citizens.",
    content: `
      As we age, our dietary needs change. Seniors need more protein for muscle maintenance and calcium for bone health. 
      Hydration is equally important. Our elder care services include nutritional planning and 
      meal assistance to ensure your loved ones are getting the best fuel for their bodies.
    `,
    category: "Elder Care",
    readTime: "7 min read",
    date: "Mar 20, 2026",
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
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

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
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border-color hover:shadow-2xl transition-all group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl backdrop-blur-md shadow-sm ${categoryColors[article.category]}`}>
                      {article.category}
                    </span>
                  </div>
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
                  <p className="text-text-body text-sm leading-relaxed mb-6 line-clamp-3 opacity-80">
                    {article.excerpt}
                  </p>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-black uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
                <div className="relative h-64 sm:h-80 w-full">
                  <Image
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    fill
                    className="object-cover"
                  />
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all z-10"
                  >
                    <ArrowRight size={20} className="rotate-180" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${categoryColors[selectedArticle.category]}`}>
                        {selectedArticle.category}
                     </span>
                     <h2 className="text-3xl sm:text-4xl font-black text-text-heading leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {selectedArticle.title}
                     </h2>
                  </div>
                </div>
                <div className="p-8 sm:p-10 pt-4">
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-8 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2 text-primary">
                      <Clock size={16} /> {selectedArticle.readTime}
                    </span>
                    <span>·</span>
                    <span>Published on {selectedArticle.date}</span>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-text-body leading-relaxed whitespace-pre-line opacity-90">
                      {selectedArticle.content}
                    </p>
                    <div className="mt-12 p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex flex-col sm:flex-row items-center gap-6">
                       <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                          <Image src="/maasewa-icon.png" alt="Icon" width={40} height={40} />
                       </div>
                       <div>
                          <p className="text-lg font-black text-text-heading mb-1">Need specialized care?</p>
                          <p className="text-sm text-text-body font-medium">Our expert nurses are ready to help you recover at home.</p>
                       </div>
                       <Link href="/contact" className="sm:ml-auto px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                          Contact Us
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
