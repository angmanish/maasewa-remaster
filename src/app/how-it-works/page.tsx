import type { Metadata } from "next";
import HowItWorksPage from "./HowItWorksPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "How Home Nursing Works — Nurse at Your Door in 3.8 Hours",
  description:
    "See how Maasewa Healthcare gets a certified home nurse to your door in just 3.8 hours after hospital discharge. Simple 4-step process — Assessment Call → Nurse Dispatch → Home Care begins.",
  keywords: [
    "how home nursing works India",
    "home nurse after hospital discharge",
    "post discharge home care process",
    "home nursing booking process",
    "how to get nurse at home",
    "nurse at home quickly",
  ],
  alternates: { canonical: `${BASE_URL}/how-it-works` },
  openGraph: {
    url: `${BASE_URL}/how-it-works`,
    title: "How Home Nursing Works — Nurse at Your Door in 3.8 Hours | Maasewa",
    description:
      "4-step process from hospital discharge to certified nurse at your home. Average arrival time: 3.8 hours. Available 24/7 across India.",
  },
};

const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get a Home Nurse After Hospital Discharge",
  description:
    "A simple 4-step process to get a certified, police-verified home nurse at your doorstep within 3.8 hours of hospital discharge.",
  totalTime: "PT3H48M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Hospital Discharge",
      text: "Your doctor clears you for home care. We coordinate directly with the hospital discharge team.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Coordinator Assessment Call",
      text: "Our care coordinator calls within minutes to assess your needs and match the right nurse.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Nurse Dispatched",
      text: "A verified, background-checked nurse is dispatched with all necessary supplies and real-time tracking.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Home Care Begins",
      text: "The nurse arrives at your home (avg. 3.8 hrs), sets up and begins care. Daily reports sent to family.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly can Maasewa Healthcare get a nurse to my home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our average response time is 3.8 hours from first contact to nurse arrival. In urgent cases, we can often dispatch within 2 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Are Maasewa nurses certified and background-checked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All nurses are GNM/B.Sc Nursing qualified, police verified, and undergo comprehensive background checks before joining our team.",
      },
    },
    {
      "@type": "Question",
      name: "What if I am not satisfied with the assigned nurse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you are unhappy for any reason, we will replace the nurse within 24 hours at no extra charge.",
      },
    },
    {
      "@type": "Question",
      name: "Which cities does Maasewa Healthcare serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently serve 15 major cities across India including Delhi, Mumbai, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, and more.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "How It Works", item: `${BASE_URL}/how-it-works` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={howItWorksSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HowItWorksPage />
    </>
  );
}
