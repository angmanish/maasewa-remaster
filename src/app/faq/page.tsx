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
    // — General —
    {
      "@type": "Question",
      name: "How quickly can you get a nurse to my home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our average response time is 1.5 hours from the first assessment call to the nurse's arrival. In urgent cases, we can often dispatch someone within 2 hours depending on your location in Pune or Mumbai.",
      },
    },
    {
      "@type": "Question",
      name: "Which cities does Maa Sewa Healthcare serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently provide full services in Pune and Mumbai. We are in the process of expanding to other major Indian cities including Bengaluru and Delhi.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide care on weekends and public holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our services are available 365 days a year, including all national holidays and weekends, ensuring uninterrupted care for your loved ones.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a nursing service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book by calling our 24/7 helpline at +91 6361376521 or by filling out the contact form on our website. A care coordinator will then call you within 15 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I meet the nurse before they start the service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We share the detailed profile and verification documents of the assigned nurse in advance. For long-term care, we can also arrange a brief introductory call or meeting.",
      },
    },
    // — Services —
    {
      "@type": "Question",
      name: "What shift options are available for home nursing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer flexible nursing shifts to meet your needs: 8-hour day/night shifts, 12-hour shifts, and full 24-hour (day + night) residential nursing care.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide medical equipment along with nursing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide full ICU home setups which include ventilators, cardiac monitors, oxygen concentrators, BiPAP/CPAP machines, and hospital beds on a rental or purchase basis.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide physiotherapy services at home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we have a team of qualified physiotherapists who specialize in post-operative rehabilitation, stroke recovery, and geriatric mobility support.",
      },
    },
    {
      "@type": "Question",
      name: "Is the ICU home setup as safe as a hospital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our ICU home setups are designed to mirror hospital standards with advanced equipment and 24/7 monitoring by ICU-trained staff, providing a safe and healing environment at home.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a nurse for a single injection visit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Certainly. We offer Short Visits specifically for clinical tasks like IM/IV injections, IV drips, wound dressing, and catheter changes.",
      },
    },
    // — Nurse Verification —
    {
      "@type": "Question",
      name: "Are your nurses certified and background-checked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every nurse on our team is GNM or B.Sc Nursing qualified. Furthermore, we conduct strict police verification and comprehensive background checks for all staff before they are assigned to any home.",
      },
    },
    {
      "@type": "Question",
      name: "What if I am not satisfied with the assigned nurse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your satisfaction is paramount. If you feel the assigned nurse is not the right fit, we will provide a replacement within 24 hours at no additional cost.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to provide food and accommodation for 24-hour nurses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For 24-hour residential nursing, the patient's family is expected to provide basic meals and a clean place for the nurse to rest during their off-hours.",
      },
    },
    {
      "@type": "Question",
      name: "What specific medical training do your nurses undergo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beyond their degrees (GNM/B.Sc), our nurses undergo internal clinical training in ICU protocols, emergency response, and specialized equipment handling.",
      },
    },
    {
      "@type": "Question",
      name: "Are both male and female nurses available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we have both male and female nursing staff available. You can specify your preference during the initial assessment call.",
      },
    },
    // — Payments & Pricing —
    {
      "@type": "Question",
      name: "How do I pay for home nursing services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept all major payment methods including UPI (Google Pay, PhonePe), Bank Transfers, and Credit/Debit Cards. Payment is usually collected in advance for the planned care duration.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any hidden charges in home nursing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We believe in 100% transparency. All costs, including nursing fees and equipment rentals, are discussed and finalized during the initial assessment call.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a security deposit required for home nursing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for long-term home nursing services, we typically collect a small security deposit equivalent to 3–7 days of service. This is fully refundable or adjusted against your final invoice.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a refund if I need to cancel the service early?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer pro-rated refunds for any unused service days, provided the cancellation is made as per our notice period policy discussed during booking.",
      },
    },
    {
      "@type": "Question",
      name: "Is home nursing covered by health insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While most home care is out-of-pocket, many corporate insurance policies and comprehensive health plans offer reimbursement. We provide all necessary documentation to help you file a claim.",
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
