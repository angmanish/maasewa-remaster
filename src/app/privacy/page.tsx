"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "April 26, 2026";

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 mesh-gradient relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-text-heading leading-tight mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-text-muted font-medium">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-1 gap-12">
            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
               <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 shadow-sm">
                  <Lock size={24} className="text-primary mb-4" />
                  <h3 className="font-bold text-text-heading mb-2">Secure Data</h3>
                  <p className="text-xs text-text-body opacity-80">We use industry-standard encryption to protect your medical and personal information.</p>
               </div>
               <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 shadow-sm">
                  <Eye size={24} className="text-emerald-600 mb-4" />
                  <h3 className="font-bold text-text-heading mb-2">Transparency</h3>
                  <p className="text-xs text-text-body opacity-80">We are clear about what data we collect and why we need it for your care.</p>
               </div>
               <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 shadow-sm">
                  <ShieldCheck size={24} className="text-amber-600 mb-4" />
                  <h3 className="font-bold text-text-heading mb-2">Your Control</h3>
                  <p className="text-xs text-text-body opacity-80">You have the right to access, update, or request deletion of your personal data at any time.</p>
               </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <div className="space-y-12 text-text-body leading-relaxed">
                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">1</div>
                    Introduction
                  </h2>
                  <p>
                    Maa Sewa Healthcare ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our home healthcare services. We take our responsibility to protect your medical and personal data very seriously, following all applicable healthcare data protection regulations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">2</div>
                    Information We Collect
                  </h2>
                  <p className="mb-4">We collect information that is necessary to provide safe and effective home healthcare services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, address, phone number, email, and emergency contact details.</li>
                    <li><strong>Medical Information:</strong> Health history, current prescriptions, diagnosis, vital signs, and care preferences.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns when you visit our website.</li>
                    <li><strong>Payment Data:</strong> Billing information for services rendered (processed through secure third-party gateways).</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">3</div>
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">Your information is used solely for the purpose of delivering and improving our services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To coordinate and provide specialized home nursing and medical care.</li>
                    <li>To communicate with you and your family regarding care plans.</li>
                    <li>To process billings and insurance claims where applicable.</li>
                    <li>To improve our website functionality and user experience.</li>
                    <li>To comply with legal and regulatory healthcare requirements.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">4</div>
                    Data Security & Sharing
                  </h2>
                  <p>
                    We implement a variety of security measures to maintain the safety of your personal information. Your medical data is strictly confidential and is only shared with authorized medical professionals involved in your direct care. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties for marketing purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">5</div>
                    Contact Us
                  </h2>
                  <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center gap-8">
                     <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <FileText size={32} className="text-primary" />
                     </div>
                     <div>
                        <p className="text-lg font-bold mb-1">Privacy Concerns?</p>
                        <p className="text-slate-400 text-sm">If you have questions about this policy, please reach out to our data protection officer.</p>
                     </div>
                     <Link href="/contact" className="sm:ml-auto px-8 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        Contact Support
                     </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
