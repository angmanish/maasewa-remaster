import type { Metadata } from "next";
import FAQPage from "./FAQPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Maa Sewa Healthcare",
  description:
    "Find answers to common questions about home nursing, elder care, ICU home setup, pricing, and our nurse verification process. Professional home care available 24/7.",
  keywords: [
    "home nursing FAQ",
    "elder care questions",
    "ICU home setup cost",
    "nurse verification process",
    "home healthcare India help",
  ],
  alternates: { canonical: `${BASE_URL}/faq` },
  openGraph: {
    url: `${BASE_URL}/faq`,
    title: "FAQ — Professional Home Healthcare Answers | Maa Sewa",
    description:
      "All your questions about home healthcare answered. Learn about our verification, shifts, and cities we serve.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly can you get a nurse to my home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our average response time is 1.5 hours from first contact to nurse arrival. In urgent cases, we can often dispatch within 2 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Are your nurses certified and background-checked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All nurses are GNM/B.Sc Nursing qualified, police verified, and undergo comprehensive background checks before joining our team.",
      },
    },
    {
      "@type": "Question",
      name: "Which cities do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently serve Pune and Mumbai, with plans to expand to other major cities across India soon.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide 24-hour nursing care?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer 8-hour, 12-hour, and full 24-hour nursing shifts to suit your medical needs.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQPage />
    </>
  );
}
