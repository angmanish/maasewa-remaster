import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "Home Nursing Services — 8h, 12h & 24h Shifts | Home Care India",
  description:
    "Book certified home nursing services in Pune, Mumbai, Delhi & 15 cities. 8-hour, 12-hour & 24-hour shifts. ICU home setup, elder care, post-op care, injection visits. Police-verified nurses. Call +91 6361376521.",
  keywords: [
    "home nursing services India",
    "home nurse 24 hours Pune",
    "ICU home setup near me",
    "elder care at home",
    "post operative care nursing",
    "injection visit nurse at home",
    "nursing shift 8 12 24 hours",
    "home healthcare services",
  ],
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    url: `${BASE_URL}/services`,
    title: "Home Nursing Services — 8h, 12h & 24h Shifts | Maasewa Healthcare",
    description:
      "Professional home nursing, ICU setup, elder care & post-op care. Certified, police-verified nurses available 24/7 in 15+ Indian cities.",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Maasewa Healthcare Services",
  description: "Professional home healthcare services across India",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "MedicalTherapy",
        name: "Home Nursing",
        url: `${BASE_URL}/services`,
        description: "Qualified RN nurses for 8h, 12h & 24h shifts at home. Vital monitoring, wound care, medication management.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "MedicalTherapy",
        name: "ICU Home Setup",
        url: `${BASE_URL}/services`,
        description: "Full ICU-level setup at home including oxygen, cardiac monitors, BiPAP/CPAP, ICU-trained nurses.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "MedicalTherapy",
        name: "Elder Care",
        url: `${BASE_URL}/services`,
        description: "Dedicated caregivers for daily assistance, companionship, mobility support, and diet management.",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "MedicalTherapy",
        name: "Post-Op Care",
        url: `${BASE_URL}/services`,
        description: "Expert post-surgery recovery — wound care, pain management, infection prevention.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ServicesPage />
    </>
  );
}
