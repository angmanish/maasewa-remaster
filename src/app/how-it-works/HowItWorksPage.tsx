"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Hospital, PhoneCall, UserCheck, Home as HomeIcon,
  ArrowRight, Clock, ChevronDown, CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Hospital,
    image: "/blog_postop_new.png",
    title: "Hospital Discharge",
    subtitle: "Step 1",
    color: "blue",
    desc: "Your doctor clears you for home care. Don't worry — we work directly with discharge coordinators at partner hospitals to make the handoff seamless.",
    details: ["Receive discharge papers", "Coordinator notified automatically", "Care plan discussed with doctor"],
  },
  {
    icon: PhoneCall,
    image: "/blog_medication.png",
    title: "Coordinator Assessment Call",
    subtitle: "Step 2",
    color: "purple",
    desc: "Within minutes of your request, our care coordinator calls to understand your exact needs, medical history, and preferred schedule.",
    details: ["Free 15-min assessment call", "Nurse profile matched to your needs", "Transparent pricing discussed"],
  },
  {
    icon: UserCheck,
    image: "/nurse_hero.png",
    title: "Nurse Dispatched",
    subtitle: "Step 3",
    color: "amber",
    desc: "A verified, background-checked nurse is dispatched with all necessary supplies. You receive real-time updates on their arrival.",
    details: ["Police verified & background checked", "Nurse profile shared in advance", "Real-time arrival tracking"],
  },
  {
    icon: HomeIcon,
    image: "/expert_care.png",
    title: "Home Care Begins",
    subtitle: "Step 4",
    color: "green",
    desc: "The nurse arrives, sets up, and begins care. Family members are briefed. Ongoing reports are shared with you and your doctor.",
    details: ["Avg. arrival: 3.8 hours", "Setup in under 30 minutes", "Daily care reports sent to family"],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
};

const faqs = [
  { q: "How quickly can you get a nurse to my home?", a: "Our average response time is 3.8 hours from first contact to nurse arrival. In urgent cases, we can often dispatch within 2 hours." },
  { q: "Are your nurses certified and background-checked?", a: "Absolutely. All nurses are GNM/B.Sc Nursing qualified, police verified, and undergo comprehensive background checks before joining our team." },
  { q: "What if I'm not satisfied with the assigned nurse?", a: "Your satisfaction is our priority. If you're unhappy for any reason, we'll replace the nurse within 24 hours at no extra charge." },
  { q: "Do you cover my city?", a: "We currently serve 2 major cities: Pune and Mumbai. We are rapidly expanding to other cities soon!" },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Mesh Gradient */}
      <section className="relative pt-32 pb-24 overflow-hidden mesh-gradient">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -mr-48 -mt-48 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50/30 rounded-full blur-3xl -ml-24 -mb-24 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Our Care Process
            </span>
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-heading tracking-tighter leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Seamless Care From <br />
              <span className="text-primary">Hospital to Home</span>
            </h1>
            <p className="text-base md:text-xl text-text-body max-w-2xl mx-auto mb-8 opacity-80 leading-relaxed">
              We&apos;ve simplified the journey to recovery. Our expert team coordinates everything, so you can focus on what matters most — getting better.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-white rounded-2xl font-bold text-base hover:bg-primary-dark transition-all hover:shadow-2xl hover:-translate-y-1 shadow-lg shadow-primary/25">
                Book Appointment Now
              </Link>
              <a href="tel:+916361376521" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-text-heading rounded-2xl font-bold text-base hover:border-primary hover:text-primary transition-all hover:-translate-y-1 shadow-sm">
                <Clock size={20} /> Call for Info
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Process Steps */}
      <section className="py-16 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block -translate-x-1/2" />
            
            <div className="space-y-24 lg:space-y-40">
              {steps.map((step, i) => {
                const c = colorMap[step.color];
                const isEven = i % 2 === 0;
                
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className={`inline-flex items-center gap-3 mb-6 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                        <span className={`text-4xl font-black ${c.text} opacity-20`}>0{i + 1}</span>
                        <div className={`h-px w-12 bg-slate-200 hidden lg:block`} />
                      </div>
                      <h2 
                        className="text-3xl md:text-4xl font-black text-text-heading mb-6"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {step.title}
                      </h2>
                      <p className="text-lg text-text-body leading-relaxed mb-8 opacity-80">
                        {step.desc}
                      </p>
                      <div className={`flex flex-col gap-4 max-w-md mx-auto lg:mx-0`}>
                        {step.details.map((detail, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:border-primary/20 hover:bg-white transition-all group"
                          >
                            <div className={`w-8 h-8 rounded-full ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <CheckCircle size={16} />
                            </div>
                            <span className="text-sm font-bold text-text-heading">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visual Area - Improved to avoid annoying huge icons */}
                    <div className="flex-1 flex justify-center">
                      <div className="relative group">
                        {/* Decorative Elements */}
                        <div className={`absolute -inset-4 rounded-[4rem] ${c.bg} blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
                        
                        <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-[3rem] bg-white border-8 border-white shadow-2xl overflow-hidden">
                           <Image
                             src={step.image}
                             alt={step.title}
                             fill
                             className="object-cover group-hover:scale-105 transition-transform duration-700"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           
                           {/* Small floating icon instead of huge one */}
                           <div className={`absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md ${c.text} flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500`}>
                             <step.icon size={32} />
                           </div>

                           {/* Step Indicator */}
                           <div className={`absolute top-6 left-6 w-12 h-12 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center font-black text-xl shadow-sm`}>
                             {i + 1}
                           </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Checklist - New Information Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-6 block">Be Prepared</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                     <span className="text-white">Pre-Admission</span> <br />
                     <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Checklist</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                     To ensure the smoothest transition from hospital to home, please have the following ready before our coordinator calls.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                     {[
                        "Latest Discharge Summary",
                        "List of prescribed medications",
                        "Doctor's specific instructions",
                        "Patient's ID proof (Aadhar/Voter ID)",
                        "Emergency contact person details",
                        "Copy of previous medical history"
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                           <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs flex-shrink-0">
                              <CheckCircle size={14} />
                           </div>
                           <span className="text-sm font-bold text-slate-200">{item}</span>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem]">
                  <h3 className="text-2xl font-black mb-6">Our Commitment</h3>
                  <div className="space-y-8">
                     <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                           <Clock className="text-white" size={24} />
                        </div>
                        <div>
                           <p className="font-black text-lg mb-1">Punctuality</p>
                           <p className="text-slate-400 text-sm">We guarantee arrival within the promised time window or we waive the registration fee.</p>
                        </div>
                     </div>
                     <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-success flex items-center justify-center flex-shrink-0">
                           <CheckCircle className="text-white" size={24} />
                        </div>
                        <div>
                           <p className="font-black text-lg mb-1">Quality Control</p>
                           <p className="text-slate-400 text-sm">Daily digital reports are reviewed by our senior clinicians to ensure care standards are met.</p>
                        </div>
                     </div>
                     <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                           <PhoneCall className="text-white" size={24} />
                        </div>
                        <div>
                           <p className="font-black text-lg mb-1">24/7 Support</p>
                           <p className="text-slate-400 text-sm">A dedicated care manager is available around the clock for any emergencies or feedback.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-black text-text-heading mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Have Questions? <br />
              <span className="text-primary">We Have Answers</span>
            </h2>
            <p className="text-lg text-text-body opacity-80">
              Everything you need to know about our home healthcare process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-[2rem] border transition-all duration-300 ${openFaq === i ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-7 md:p-8 text-left group"
                >
                  <span className={`text-lg font-bold text-text-heading transition-colors ${openFaq === i ? 'text-primary' : 'group-hover:text-primary'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openFaq === i ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-text-muted'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-7 md:px-8 pb-8">
                        <div className="h-px w-full bg-slate-50 mb-6" />
                        <p className="text-text-body text-lg leading-relaxed opacity-80">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/faq" 
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              View More FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-text-heading p-12 md:p-24 text-center"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <div className="relative z-10">
              <h2 
                className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Experience the Future <br />
                <span className="text-primary">of Home Recovery</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
                Join over 200+ families who have trusted us with their post-hospitalization care. Your journey to wellness starts here.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-dark transition-all hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  Start Your Recovery
                </Link>
                <Link
                  href="/services"
                  className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
