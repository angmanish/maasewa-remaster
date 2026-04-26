import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "Contact Us — Book a Home Nurse in 30 Minutes | Maa Sewa Healthcare",
  description:
    "Contact Maa Sewa Healthcare to book a certified home nurse. Call +91 6361376521 or fill the form. Located in Pune, serving 15+ cities across India. Our coordinators respond within 30 minutes, 24/7.",
  keywords: [
    "contact home nursing service India",
    "book home nurse Pune",
    "home nursing helpline India",
    "home healthcare contact number",
    "Maa Sewa Healthcare phone number",
    "home nurse booking",
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    url: `${BASE_URL}/contact`,
    title: "Contact Maa Sewa Healthcare — Book a Home Nurse in 30 Minutes",
    description:
      "Call +91 6361376521 or fill the form to book a certified home nurse. Available 24/7. Response within 30 minutes.",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Maa Sewa Healthcare",
  description: "Contact page to book home nursing services",
  url: `${BASE_URL}/contact`,
  mainEntity: {
    "@type": "MedicalBusiness",
    name: "Maa Sewa Healthcare",
    telephone: "+916361376521",
    email: "info@maasewahealthcare.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gate no 1313, Om Sai Housing Society, near Zenda Chowk",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411062",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+916361376521",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ContactPageContent />
    </>
  );
}
