"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Star,
  Users,
  HeartPulse
} from "lucide-react";
import { useParams } from "next/navigation";

const servicesData: Record<string, any> = {
  "home-nursing": {
    title: "Home Nursing Services",
    subtitle: "Professional Clinical Care at Your Doorstep",
    desc: "Our home nursing services bring hospital-grade clinical expertise to the comfort of your home. Whether it's post-surgical recovery, chronic illness management, or elderly support, our certified GNM and BSc nurses provide compassionate and professional care.",
    longDesc: "At Maa Sewa Healthcare, we believe that the best healing happens at home. Our nursing services are designed to provide a comprehensive medical support system outside the hospital. Our staff is trained not only in clinical procedures but also in advanced patient monitoring and emergency response. We act as a bridge between the hospital and your home, ensuring that every medical instruction is followed to the letter, significantly reducing the risk of complications or readmissions.",
    image: "/nurse_hero.png",
    features: [
      "24/7 ICU-level monitoring",
      "Tracheostomy & Ventilator care",
      "Wound dressing & Suture removal",
      "IV infusion & Medication management",
      "Vital signs monitoring & Charting"
    ],
    whoIsItFor: [
      "Patients needing post-surgical wound care and monitoring",
      "Individuals with chronic conditions requiring regular clinical intervention",
      "Elderly patients who need help with catheters, feeding tubes, or IVs",
      "Anyone requiring hospital-grade nursing in a private setting"
    ],
    benefits: [
      "Personalized care plan tailored to your specific medical history",
      "Strict adherence to sterile protocols and infection control",
      "Continuous coordination with your primary treating physician",
      "High-density monitoring with professional digital charting"
    ],
    stats: [
      { label: "Certified Nurses", value: "50+" },
      { label: "Successful Recoveries", value: "500+" },
      { label: "Available Cities", value: "2" }
    ]
  },
  "icu-home-setup": {
    title: "ICU Home Setup",
    subtitle: "Critical Care in the Comfort of Home",
    desc: "We transform your home into a high-tech critical care unit. Our ICU home setup includes advanced medical equipment and a dedicated team of ICU-trained nurses and doctors to provide life-saving care without the hospital stress.",
    longDesc: "Setting up an ICU at home is a life-changing alternative for families who want their loved ones close while receiving intensive medical support. Our setup mirrors the technological capabilities of a modern hospital ICU. We provide the latest ventilators, cardiac monitors, and infusion pumps, all managed by staff with years of experience in leading hospital ICUs. This service is designed for patients who are stable enough to be at home but still require life-support or constant monitoring.",
    image: "/blog_icu_new.png",
    features: [
      "Advanced Cardiac Monitors",
      "Portable Ventilators & BiPAP",
      "Oxygen Concentrators & Cylinders",
      "Infusion & Syringe Pumps",
      "ICU-trained Nursing Staff"
    ],
    whoIsItFor: [
      "Patients on invasive or non-invasive mechanical ventilation",
      "Critically ill patients transitioning from hospital to home",
      "Patients requiring 24/7 intensive monitoring for multi-organ issues",
      "Palliative care patients needing advanced life-support systems"
    ],
    benefits: [
      "Significant reduction in per-day critical care costs",
      "Peace of mind for family by being near the patient",
      "Highly reduced risk of hospital-acquired multi-drug resistant infections",
      "Customized nurse-to-patient ratio for 1:1 intensive care"
    ],
    stats: [
      { label: "ICU Setups Done", value: "120+" },
      { label: "Critical Care Staff", value: "30+" },
      { label: "Equipment Availability", value: "100%" }
    ]
  },
  "elder-care": {
    title: "Elder Care Services",
    subtitle: "Dignity, Safety & Companionship for Seniors",
    desc: "Caring for aging parents requires patience and professional skill. Our elder care services focus on mobility support, hygiene maintenance, and emotional well-being, ensuring your loved ones live with dignity and safety.",
    longDesc: "Aging with dignity is a fundamental right. Our elder care program is built on the pillars of safety, empathy, and professional assistance. We understand the specific challenges of geriatric care, including fall risks, medication mismanagement, and social isolation. Our caregivers are trained to provide both medical oversight and the warm companionship that makes a house feel like a home. We act as your eyes and ears, ensuring your parents are safe, happy, and healthy.",
    image: "/blog_nutrition.png",
    features: [
      "Mobility and fall prevention",
      "Hygiene and personal grooming",
      "Timely medication reminders",
      "Nutritional meal assistance",
      "Companionship and mental health support"
    ],
    whoIsItFor: [
      "Seniors living independently who need daily living support",
      "Elderly patients with mobility issues or high fall risks",
      "Aging individuals managing multiple chronic medications",
      "Seniors needing companionship and active engagement"
    ],
    benefits: [
      "Dignified assistance with sensitive personal care tasks",
      "Safe and guided mobility to prevent fractures and injuries",
      "Regular health screenings and medication management",
      "Enhanced quality of life through social interaction"
    ],
    stats: [
      { label: "Happy Seniors", value: "300+" },
      { label: "Trained Caregivers", value: "80+" },
      { label: "Safety Rating", value: "4.9/5" }
    ]
  },
  "post-op-care": {
    title: "Post-Operative Recovery",
    subtitle: "Accelerated Healing After Surgery",
    desc: "The weeks following surgery are critical for long-term health. Our post-op care plans focus on pain management, infection prevention, and physiotherapy, helping you get back on your feet faster and safer.",
    longDesc: "The success of a surgery often depends on the quality of care received in the following weeks. At home, patients face the challenge of managing surgical drains, complex wound care, and pain medications. Our post-op specialists are trained in the latest sterile dressing techniques and can detect early signs of complications before they become emergencies. We also integrate early-stage physiotherapy to prevent stiffness and deep vein thrombosis (DVT), ensuring your recovery is on track.",
    image: "/blog_postop_new.png",
    features: [
      "Sterile wound dressing changes",
      "Pain management & monitoring",
      "Post-surgical physiotherapy",
      "Doctor-coordinated recovery plans",
      "Deep vein thrombosis (DVT) prevention"
    ],
    whoIsItFor: [
      "Patients recovering from orthopedic, cardiac, or abdominal surgery",
      "Individuals needing suture/staple removal and drain management",
      "Post-discharge patients who live alone or need professional help",
      "Patients requiring targeted rehabilitation after any surgical procedure"
    ],
    benefits: [
      "Professional prevention of surgical site infections (SSI)",
      "Expert monitoring of pain and timely analgesic administration",
      "Guided rehabilitation exercises for faster mobility",
      "Peace of mind knowing a professional is monitoring your healing"
    ],
    stats: [
      { label: "Fast Recoveries", value: "200+" },
      { label: "Infection Rate", value: "<1%" },
      { label: "Physio Visits", value: "1000+" }
    ]
  },
  "specialized-care": {
    title: "Specialized Medical Care",
    subtitle: "Complex Care for Neurological & Chronic Needs",
    desc: "We provide specialized care for patients recovering from strokes, managing dementia, or requiring palliative support. Our care plans are tailored to the specific medical and emotional needs of complex cases.",
    longDesc: "Complex conditions like stroke, Parkinson's, or advanced-stage cancer require a multi-disciplinary approach. Our specialized care team works closely with neurologists, oncologists, and other specialists to provide targeted support at home. We focus on enhancing the quality of life through rigorous monitoring, cognitive stimulation, and symptom relief. Our staff is trained to handle the behavioral challenges of dementia and the intensive needs of palliative care with utmost sensitivity.",
    image: "/blog_dementia.png",
    features: [
      "Stroke rehabilitation support",
      "Dementia & Alzheimer's care",
      "Palliative and End-of-life care",
      "Neurological monitoring",
      "Customized dietary & physio plans"
    ],
    whoIsItFor: [
      "Stroke survivors requiring long-term rehabilitation",
      "Patients with progressive dementia or Alzheimer's",
      "Individuals needing terminal care or symptom relief",
      "Complex medical cases requiring specialized protocols"
    ],
    benefits: [
      "Targeted neurological and cognitive support programs",
      "Comfort-focused care for palliative and terminal needs",
      "High-end monitoring of vital neurological parameters",
      "Compassionate support for the entire family unit"
    ],
    stats: [
      { label: "Specialist Staff", value: "25+" },
      { label: "Care Plans Created", value: "150+" },
      { label: "Family Satisfaction", value: "98%" }
    ]
  },
  "injection-visit": {
    title: "Injection & IV Services",
    subtitle: "Professional Clinical Visits at Home",
    desc: "Avoid long hospital queues for simple clinical tasks. Our trained nurses visit your home for injections, IV drips, blood collection, and vaccinations at a time that suits you best.",
    longDesc: "Why travel to a clinic for a 10-minute procedure? Our injection and clinical visit service brings the clinic to you. We maintain the highest standards of hygiene and use only high-quality sterile supplies. Whether it's a one-time injection or a 5-day course of IV antibiotics, our nurses arrive on time and handle the procedure with minimal discomfort. This service is especially beneficial for patients with limited mobility or busy schedules.",
    image: "/blog_medication.png",
    features: [
      "IM and IV Injections",
      "IV Fluid/Drip administration",
      "Blood sample collection",
      "Adult vaccinations",
      "Minor clinical procedures"
    ],
    whoIsItFor: [
      "Patients on daily or weekly injectable medications",
      "Individuals requiring IV hydration or nutritional therapy",
      "Children needing vaccinations in a stress-free environment",
      "Anyone wanting to avoid hospital crowds for clinical tasks"
    ],
    benefits: [
      "No travel time or waiting in hospital queues",
      "Strict adherence to clinical hygiene and safety protocols",
      "Stress-free environment especially for children and seniors",
      "Reliable and punctual service at your convenience"
    ],
    stats: [
      { label: "Visits Completed", value: "5000+" },
      { label: "Avg. Arrival Time", value: "45min" },
      { label: "Sterile Protocol", value: "100%" }
    ]
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug] || servicesData["home-nursing"];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                <Link href="/" className="hover:underline">Home</Link>
                <ArrowRight size={12} />
                <Link href="/services" className="hover:underline">Services</Link>
                <ArrowRight size={12} />
                <span className="text-slate-400">{service.title}</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-black text-text-heading leading-tight mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                {service.title}
              </h1>
              <p className="text-xl text-primary font-bold mb-6 italic opacity-90">
                {service.subtitle}
              </p>
              <p className="text-lg text-text-body leading-relaxed mb-8 opacity-80">
                {service.desc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Phone size={18} /> Book This Service
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 bg-white border border-slate-200 text-text-heading rounded-2xl font-bold hover:border-primary hover:text-primary transition-all"
                >
                  All Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck size={24} />
                 </div>
                 <p className="text-white font-bold uppercase tracking-widest text-xs">Verified & Certified Professional Care</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {service.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-primary mb-1">{stat.value}</p>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black text-text-heading mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
                Detailed Overview
              </h2>
              <p className="text-lg text-text-body leading-relaxed mb-12 opacity-80">
                {service.longDesc}
              </p>

              <h2 className="text-3xl font-black text-text-heading mb-8" style={{ fontFamily: "var(--font-jakarta)" }}>
                Key Benefits of This Service
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-16">
                {service.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100/50">
                    <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                    <span className="text-sm font-bold text-text-heading">{benefit}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-black text-text-heading mb-8" style={{ fontFamily: "var(--font-jakarta)" }}>
                What&apos;s Included in Our <br />
                <span className="text-primary">{service.title}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-16">
                {service.features.map((feature: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-start gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-text-body font-semibold text-base leading-snug">{feature}</p>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-3xl font-black text-text-heading mb-8" style={{ fontFamily: "var(--font-jakarta)" }}>
                Who is this for?
              </h2>
              <div className="space-y-4 mb-16">
                {service.whoIsItFor.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-text-body font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[3rem] bg-text-heading text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-125 duration-700" />
                 <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-4">Patient-Centric Approach</h3>
                    <p className="text-slate-300 mb-8 leading-relaxed max-w-xl">
                      We don&apos;t just provide medical care; we provide emotional support and a healing environment. Our staff is trained to coordinate with your primary doctors to ensure the care plan is executed perfectly.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest hover:gap-4 transition-all">
                       Speak with a Care Manager <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
            </div>

            {/* Sidebar Card */}
            <div className="lg:col-span-1 self-start">
              <div className="sticky top-28 space-y-6 h-fit">
                <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                    <HeartPulse size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-black text-text-heading mb-4">Why Choose Maa Sewa?</h3>
                  <ul className="space-y-4 mb-8">
                    {[
                      { icon: ShieldCheck, text: "Background Verified Staff" },
                      { icon: Clock, text: "Rapid Response Time" },
                      { icon: Star, text: "High Satisfaction Rating" },
                      { icon: Users, text: "Family-Centric Communication" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <item.icon size={18} className="text-primary" /> {item.text}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block w-full py-4 bg-primary text-white text-center rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    Get a Free Consultation
                  </Link>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Instant Help</p>
                  <p className="text-lg font-bold mb-4">Call our health experts now</p>
                  <a href="tel:+916361376521" className="text-2xl font-black text-white hover:text-primary transition-colors">+91 6361376521</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
