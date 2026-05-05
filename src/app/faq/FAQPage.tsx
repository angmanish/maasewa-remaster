"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronDown, 
  Search, 
  Phone, 
  Mail, 
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Stethoscope,
  CreditCard
} from "lucide-react";

const faqCategories = [
  { id: "general", label: "General Questions", icon: HelpCircle },
  { id: "services", label: "Our Services", icon: Stethoscope },
  { id: "nurses", label: "Nurse Verification", icon: ShieldCheck },
  { id: "payments", label: "Payments & Pricing", icon: CreditCard },
];

const allFaqs = [
  {
    category: "general",
    q: "How quickly can you get a nurse to my home?",
    a: "Our average response time is 3.8 hours from the first assessment call to the nurse's arrival. In urgent cases, we can often dispatch someone within 2 hours depending on your location in Pune or Mumbai.",
  },
  {
    category: "general",
    q: "Which cities does Maa Sewa Healthcare serve?",
    a: "We currently provide full services in Pune and Mumbai. We are in the process of expanding to other major Indian cities including Bengaluru and Delhi.",
  },
  {
    category: "general",
    q: "Do you provide care on weekends and public holidays?",
    a: "Yes, our services are available 365 days a year, including all national holidays and weekends, ensuring uninterrupted care for your loved ones.",
  },
  {
    category: "general",
    q: "How do I book a nursing service?",
    a: "You can book by calling our 24/7 helpline at +91 6361376521 or by filling out the contact form on our website. A care coordinator will then call you within 30 minutes.",
  },
  {
    category: "general",
    q: "Can I meet the nurse before they start the service?",
    a: "We share the detailed profile and verification documents of the assigned nurse in advance. For long-term care, we can also arrange a brief introductory call or meeting.",
  },
  {
    category: "services",
    q: "What shift options are available?",
    a: "We offer flexible nursing shifts to meet your needs: 8-hour day/night shifts, 12-hour shifts, and full 24-hour (day + night) residential nursing care.",
  },
  {
    category: "services",
    q: "Do you provide medical equipment along with nursing?",
    a: "Yes, we provide full ICU home setups which include ventilators, cardiac monitors, oxygen concentrators, BiPAP/CPAP machines, and hospital beds on a rental or purchase basis.",
  },
  {
    category: "services",
    q: "Do you provide physiotherapy services at home?",
    a: "Yes, we have a team of qualified physiotherapists who specialize in post-operative rehabilitation, stroke recovery, and geriatric mobility support.",
  },
  {
    category: "services",
    q: "Is the ICU home setup as safe as a hospital?",
    a: "Our ICU home setups are designed to mirror hospital standards with advanced equipment and 24/7 monitoring by ICU-trained staff, providing a safe and healing environment at home.",
  },
  {
    category: "services",
    q: "Can I book a nurse for a single injection visit?",
    a: "Certainly. We offer 'Short Visits' specifically for clinical tasks like IM/IV injections, IV drips, wound dressing, and catheter changes.",
  },
  {
    category: "nurses",
    q: "Are your nurses certified and background-checked?",
    a: "Every nurse on our team is GNM or B.Sc Nursing qualified. Furthermore, we conduct strict police verification and comprehensive background checks for all staff before they are assigned to any home.",
  },
  {
    category: "nurses",
    q: "What if I am not satisfied with the assigned nurse?",
    a: "Your satisfaction is paramount. If you feel the assigned nurse is not the right fit, we will provide a replacement within 24 hours at no additional cost.",
  },
  {
    category: "nurses",
    q: "Do I need to provide food and accommodation for 24-hour nurses?",
    a: "For 24-hour residential nursing, the patient's family is expected to provide basic meals and a clean place for the nurse to rest during their off-hours.",
  },
  {
    category: "nurses",
    q: "What specific medical training do your nurses undergo?",
    a: "Beyond their degrees (GNM/B.Sc), our nurses undergo internal clinical training in ICU protocols, emergency response, and specialized equipment handling.",
  },
  {
    category: "nurses",
    q: "Are both male and female nurses available?",
    a: "Yes, we have both male and female nursing staff available. You can specify your preference during the initial assessment call.",
  },
  {
    category: "payments",
    q: "How do I pay for the services?",
    a: "We accept all major payment methods including UPI (Google Pay, PhonePe), Bank Transfers, and Credit/Debit Cards. Payment is usually collected in advance for the planned care duration.",
  },
  {
    category: "payments",
    q: "Are there any hidden charges?",
    a: "No. We believe in 100% transparency. All costs, including nursing fees and equipment rentals, are discussed and finalized during the initial assessment call.",
  },
  {
    category: "payments",
    q: "Is there a security deposit required?",
    a: "Yes, for long-term home nursing services, we typically collect a small security deposit equivalent to 3–7 days of service. This is fully refundable or adjusted against your final invoice at the end of the care period.",
  },
  {
    category: "payments",
    q: "Can I get a refund if I need to cancel the service early?",
    a: "Yes, we offer pro-rated refunds for any unused service days, provided the cancellation is made as per our notice period policy discussed during booking.",
  },
  {
    category: "payments",
    q: "Is your service covered by health insurance?",
    a: "While most home care is out-of-pocket, many corporate insurance policies and comprehensive health plans offer reimbursement. We provide all necessary documentation to help you file a claim.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = allFaqs.filter(faq => 
    (faq.category === activeCategory || searchQuery !== "") &&
    (faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
     faq.a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -mr-48 -mt-48 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 
              className="text-4xl md:text-6xl font-black text-text-heading tracking-tighter mb-8"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              How Can We <span className="text-primary">Help You?</span>
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all rounded-full" />
              <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl p-2 shadow-xl">
                <div className="pl-4 text-slate-400">
                  <Search size={22} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for answers..."
                  className="w-full py-3 px-4 outline-none text-text-heading font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Sidebar Categories */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-4 pl-4">Categories</p>
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery("");
                      setOpenFaq(0);
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeCategory === cat.id && searchQuery === ""
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                      : "text-text-body hover:bg-slate-50"
                    }`}
                  >
                    <cat.icon size={20} />
                    {cat.label}
                  </button>
                ))}

                {/* Support Card */}
                <div className="mt-12 p-8 rounded-[2.5rem] bg-text-heading text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                  <h3 className="text-xl font-bold mb-4 relative z-10">Still have questions?</h3>
                  <p className="text-slate-300 text-sm mb-8 relative z-10">Our support team is available 24/7 to assist you with any inquiries.</p>
                  <div className="space-y-4 relative z-10">
                    <a href="tel:+916361376521" className="flex items-center gap-3 text-sm font-bold hover:text-primary transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Phone size={14} /></div>
                      +91 6361376521
                    </a>
                    <a href="mailto:info@maasewahealthcare.com" className="flex items-center gap-3 text-sm font-bold hover:text-primary transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Mail size={14} /></div>
                      info@maasewahealthcare.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-white rounded-[2rem] border transition-all duration-300 ${
                        openFaq === i ? "border-primary/30 shadow-xl shadow-primary/5" : "border-slate-100 hover:border-slate-200 shadow-sm"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-7 md:p-8 text-left group"
                      >
                        <span className={`text-lg font-bold text-text-heading transition-colors ${openFaq === i ? "text-primary" : "group-hover:text-primary"}`}>
                          {faq.q}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openFaq === i ? "bg-primary text-white rotate-180" : "bg-slate-50 text-text-muted"}`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-7 md:px-8 pb-8">
                              <div className="h-px w-full bg-slate-50 mb-6" />
                              <p className="text-text-body text-lg leading-relaxed opacity-80 italic">
                                &ldquo;{faq.a}&rdquo;
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                    <p className="text-xl font-bold text-text-heading mb-2">No results found</p>
                    <p className="text-text-body opacity-60">Try searching with different keywords</p>
                  </div>
                )}
              </div>

              {/* Bottom Support CTA */}
              <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-10 rounded-[3rem] bg-primary/5 border border-primary/10 gap-8">
                <div>
                  <h3 className="text-2xl font-black text-text-heading mb-2">Need immediate help?</h3>
                  <p className="text-text-body">Our care coordinators are standing by.</p>
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://wa.me/916361376521" 
                    target="_blank" 
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                  <a 
                    href="tel:+916361376521" 
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    <Phone size={18} /> Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
