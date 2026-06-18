import { Metadata } from "next";
import ServiceDetailPage from "../ServiceDetailPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

const servicesData: Record<
  string,
  {
    title: string;
    desc: string;
    keywords: string[];
    serviceType: string;
    benefits: string[];
    howToSteps: { name: string; text: string }[];
  }
> = {
  "home-nursing": {
    title: "Home Nursing Services in Pune & Mumbai",
    desc: "Professional home nursing services with certified GNM/BSc nurses. ICU care, wound dressing, and 24/7 monitoring in the comfort of your home.",
    keywords: [
      "home nursing Pune",
      "home nurse Mumbai",
      "certified home nurse India",
      "home nursing 24 hours",
      "wound dressing at home",
      "IV drip at home nurse",
      "post discharge nursing care",
    ],
    serviceType: "Home Nursing",
    benefits: [
      "Certified GNM/BSc nurses",
      "Police-verified background checks",
      "8h, 12h and 24h shift options",
      "Average arrival in 1.5 hours",
    ],
    howToSteps: [
      { name: "Call our helpline", text: "Contact us at +91 6361376521. A care coordinator assesses your needs within 15 minutes." },
      { name: "Nurse matching", text: "We match a verified, GNM/BSc-qualified nurse to your specific medical requirements." },
      { name: "Nurse dispatch", text: "The nurse is dispatched with all clinical supplies and arrives at your home within 1.5 hours on average." },
      { name: "Care begins", text: "The nurse starts care immediately — monitoring vitals, administering medications, and coordinating with your doctor." },
    ],
  },
  "icu-home-setup": {
    title: "ICU Home Setup & Critical Care Services",
    desc: "Complete ICU setup at home with ventilators, cardiac monitors, oxygen concentrators, and ICU-trained nurses. Hospital-grade critical care at significantly lower cost.",
    keywords: [
      "ICU home setup Pune",
      "ICU at home Mumbai",
      "home ICU setup India",
      "ventilator at home",
      "cardiac monitor at home",
      "BiPAP CPAP home setup",
      "critical care at home India",
    ],
    serviceType: "ICU Home Setup",
    benefits: [
      "Full ventilator and BiPAP/CPAP support",
      "24/7 ICU-trained nursing staff",
      "Multipara patient monitors",
      "Significant cost savings vs hospital ICU",
    ],
    howToSteps: [
      { name: "Medical assessment", text: "Our team reviews hospital discharge notes and medical records to design the right ICU setup." },
      { name: "Equipment delivery", text: "We deliver and install all required ICU equipment — ventilators, monitors, oxygen concentrators — to your home." },
      { name: "Nurse deployment", text: "A dedicated ICU-trained nurse is assigned on a 12h or 24h basis with mandatory handover protocols." },
      { name: "Ongoing monitoring", text: "Our care supervisor remotely monitors daily vitals and conducts periodic in-person audits." },
    ],
  },
  "elder-care": {
    title: "Elder Care & Senior Home Healthcare Services",
    desc: "Compassionate elder care services in Pune and Mumbai. Mobility support, hygiene assistance, medication reminders, and companionship for your elderly loved ones.",
    keywords: [
      "elder care at home Pune",
      "senior care Mumbai",
      "elderly caregiver India",
      "old age care at home",
      "dementia care at home India",
      "caregiver for parents Pune",
      "home attendant for elderly",
    ],
    serviceType: "Elder Care",
    benefits: [
      "Fall prevention and mobility support",
      "Medication reminders and management",
      "Personal hygiene assistance",
      "Companionship and emotional wellbeing",
    ],
    howToSteps: [
      { name: "Needs assessment", text: "We speak with the family to understand the senior's medical history, mobility level, and daily routine." },
      { name: "Caregiver matching", text: "We assign a trained caregiver whose personality and skills best match your loved one's needs." },
      { name: "Onboarding visit", text: "The caregiver visits with a care supervisor to establish routines and conduct a home safety audit." },
      { name: "Daily care", text: "The caregiver provides daily assistance with mobility, hygiene, meals, and medication reminders, with daily family updates." },
    ],
  },
  "post-op-care": {
    title: "Post-Operative Care at Home | Post-Surgery Nursing India",
    desc: "Specialized post-surgery recovery support at home. Wound care, pain management, DVT prevention, and physiotherapy to ensure a safe and swift recovery.",
    keywords: [
      "post operative care at home",
      "post surgery nursing Pune",
      "home care after surgery India",
      "wound dressing after surgery",
      "post surgery recovery nurse",
      "DVT prevention at home",
      "physiotherapy after surgery home",
    ],
    serviceType: "Post-Operative Care",
    benefits: [
      "Sterile wound dressing and suture removal",
      "Surgical site infection prevention",
      "Pain management and medication adherence",
      "Early mobilization and physiotherapy",
    ],
    howToSteps: [
      { name: "Discharge planning", text: "We coordinate with your hospital's discharge team to prepare a post-op care plan before you leave." },
      { name: "First nurse visit", text: "A post-op specialist nurse arrives at home the same day or next morning to begin care." },
      { name: "Wound and pain care", text: "Daily sterile dressings, drain management, and pain medication administered on schedule." },
      { name: "Physiotherapy", text: "A physiotherapist visits to guide early mobilization exercises to prevent blood clots and regain strength." },
    ],
  },
  "specialized-care": {
    title: "Specialized Care — Stroke, Dementia & Palliative Care at Home",
    desc: "Tailored home care for complex medical conditions including stroke recovery, Alzheimer's/dementia support, and palliative care. Expert nurses and caregivers trained in neurological conditions.",
    keywords: [
      "stroke recovery at home Pune",
      "dementia care home nurse India",
      "palliative care at home Mumbai",
      "Alzheimer care at home",
      "neurological care home nursing",
      "terminal illness care at home India",
      "specialized nursing care India",
    ],
    serviceType: "Specialized Medical Care",
    benefits: [
      "Trained in stroke and neuro rehabilitation",
      "Dementia and Alzheimer's behavior management",
      "Compassionate palliative and end-of-life care",
      "Multi-disciplinary specialist coordination",
    ],
    howToSteps: [
      { name: "Specialist consultation", text: "Our nursing director reviews the patient's medical history and neurological reports to build a care plan." },
      { name: "Caregiver training", text: "The assigned nurse or caregiver receives condition-specific briefing on communication and care protocols." },
      { name: "Care commencement", text: "Care begins with a full home assessment focused on safety modifications, routine building, and comfort." },
      { name: "Family coordination", text: "We provide weekly family updates and coordinate closely with treating neurologists or oncologists." },
    ],
  },
  "injection-visit": {
    title: "In-Home Injection & IV Drip Services | Nurse Visit Pune Mumbai",
    desc: "Avoid hospital queues. Trained nurses visit your home for IM/IV injections, IV drips, wound dressings, blood collection, and adult vaccinations. Available same day in Pune and Mumbai.",
    keywords: [
      "injection at home Pune",
      "IV drip at home Mumbai",
      "nurse visit for injection India",
      "blood sample collection at home",
      "vaccination at home India",
      "IV antibiotic at home",
      "home nurse injection service",
    ],
    serviceType: "Injection & IV Visit",
    benefits: [
      "No travel — nurse comes to you",
      "100% sterile supplies used",
      "Same-day availability in Pune and Mumbai",
      "Average nurse arrival under 45 minutes",
    ],
    howToSteps: [
      { name: "Book a visit", text: "Call us at +91 6361376521 or use our website. Share the prescription or doctor's order." },
      { name: "Confirm timing", text: "A coordinator confirms the nurse arrival window — typically within 45 minutes in Pune and Mumbai." },
      { name: "Nurse arrives", text: "The nurse arrives with sterile supplies and verifies the medication/procedure with the doctor's prescription." },
      { name: "Procedure completed", text: "The procedure is completed hygienically. A digital report is sent to the patient and family." },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return { title: "Service | Maa Sewa Healthcare" };

  return {
    title: service.title,
    description: service.desc,
    keywords: service.keywords,
    alternates: { canonical: `${BASE_URL}/services/${slug}` },
    openGraph: {
      title: `${service.title} | Maa Sewa Healthcare`,
      description: service.desc,
      url: `${BASE_URL}/services/${slug}`,
      type: "website",
      siteName: "Maa Sewa Healthcare",
      locale: "en_IN",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.title} — Maa Sewa Healthcare`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@MaasewaHealth",
      title: `${service.title} | Maa Sewa Healthcare`,
      description: service.desc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug] || servicesData["home-nursing"];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.title,
    description: service.desc,
    url: `${BASE_URL}/services/${slug}`,
    provider: {
      "@type": "MedicalOrganization",
      name: "Maa Sewa Healthcare",
      url: BASE_URL,
      telephone: "+91-6361376521",
      areaServed: [
        { "@type": "City", name: "Pune" },
        { "@type": "City", name: "Mumbai" },
      ],
    },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "City", name: "Mumbai" },
    ],
    medicineSystem: "WesternConventional",
    recognizingAuthority: {
      "@type": "Organization",
      name: "Indian Nursing Council",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Book ${service.serviceType} from Maa Sewa Healthcare`,
    description: `Step-by-step guide to getting ${service.serviceType} at your home in Pune or Mumbai.`,
    totalTime: "PT2H",
    step: service.howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.serviceType, item: `${BASE_URL}/services/${slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is included in ${service.serviceType}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: service.desc,
        },
      },
      {
        "@type": "Question",
        name: `How quickly can I get ${service.serviceType} at home in Pune or Mumbai?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maa Sewa Healthcare typically dispatches a nurse within 1.5 hours of the initial assessment call. Our nurses are available 24/7, including weekends and public holidays.",
        },
      },
      {
        "@type": "Question",
        name: `Are the nurses providing ${service.serviceType} background-verified?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All Maa Sewa Healthcare staff are GNM/BSc Nursing qualified, police-verified, and undergo comprehensive background checks before being assigned to any patient.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <ServiceDetailPage />
    </>
  );
}
