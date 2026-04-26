"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scale, FileCheck, AlertCircle, HelpCircle, ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
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
              Terms of <span className="text-primary">Use</span>
            </h1>
            <p className="text-lg text-text-muted font-medium">
              Effective Date: {lastUpdated}
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
                  <FileCheck size={24} className="text-primary mb-4" />
                  <h3 className="font-bold text-text-heading mb-2">Service Terms</h3>
                  <p className="text-xs text-text-body opacity-80">Clear definitions of the home healthcare services we provide and your responsibilities.</p>
               </div>
               <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 shadow-sm">
                  <Scale size={24} className="text-emerald-600 mb-4" />
                  <h3 className="font-bold text-text-heading mb-2">Legal Rights</h3>
                  <p className="text-xs text-text-body opacity-80">Understanding the legal framework and governing laws of our service agreement.</p>
               </div>
               <div className="p-6 rounded-3xl bg-rose-50 border border-rose-100 shadow-sm">
                  <AlertCircle size={24} className="text-rose-600 mb-4" />
                  <h3 className="font-bold text-text-heading mb-2">Cancellations</h3>
                  <p className="text-xs text-text-body opacity-80">Fair and transparent policies for booking, rescheduling, and cancelling services.</p>
               </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <div className="space-y-12 text-text-body leading-relaxed">
                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">1</div>
                    Agreement to Terms
                  </h2>
                  <p>
                    By accessing or using Maa Sewa Healthcare's website and services, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, please do not access the website or use our services. These terms constitute a legally binding agreement between you and Maa Sewa Healthcare.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">2</div>
                    Service Description
                  </h2>
                  <p>
                    Maa Sewa Healthcare provides home-based medical services, including but not limited to home nursing, ICU setup, elder care, and post-operative support. While we strive for excellence, our services are provided based on the medical assessment and instructions provided by your primary physician.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">3</div>
                    User Responsibilities
                  </h2>
                  <p className="mb-4">As a user of our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete medical history and information.</li>
                    <li>Ensure a safe working environment for our healthcare professionals.</li>
                    <li>Follow the care plan agreed upon during the initial assessment.</li>
                    <li>Notify us immediately of any changes in the patient's condition.</li>
                    <li>Make timely payments for the services rendered.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">4</div>
                    Booking & Cancellation
                  </h2>
                  <p>
                    All bookings are subject to staff availability. We require a minimum of 24 hours notice for cancellations or rescheduling of nursing shifts. Late cancellations may incur a service fee as outlined in our pricing schedule. Maa Sewa reserves the right to terminate services if the environment is deemed unsafe for our staff.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">5</div>
                    Limitation of Liability
                  </h2>
                  <p>
                    Maa Sewa Healthcare and its employees shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services, provided we have acted in accordance with standard medical practices and physician instructions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-text-heading mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">6</div>
                    Support
                  </h2>
                  <div className="p-8 rounded-[2rem] bg-blue-50 border border-blue-100 shadow-sm flex flex-col sm:flex-row items-center gap-8">
                     <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <HelpCircle size={32} className="text-primary" />
                     </div>
                     <div>
                        <p className="text-lg font-bold text-text-heading mb-1">Need Clarification?</p>
                        <p className="text-text-body text-sm">If you need help understanding any part of our terms, our team is here to assist.</p>
                     </div>
                     <Link href="/contact" className="sm:ml-auto px-8 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all">
                        Get Help
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
