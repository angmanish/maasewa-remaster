import type { Metadata } from "next";
import ForHospitalsPage from "./ForHospitalsPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "Partner With Us — Reduce Readmissions by 40% | Home Care for Hospitals",
  description:
    "Maasewa Healthcare partners with hospitals across India to provide seamless post-discharge home care. Reduce readmission rates by 40%, improve patient satisfaction, and free up beds. 50+ hospital partners.",
  keywords: [
    "hospital discharge home care India",
    "reduce hospital readmission rates",
    "post discharge nursing partner",
    "home care hospital tie-up",
    "discharge planning home nursing",
    "healthcare B2B partnership India",
    "hospital home care program",
  ],
  alternates: { canonical: `${BASE_URL}/for-hospitals` },
  openGraph: {
    url: `${BASE_URL}/for-hospitals`,
    title: "Reduce Readmissions by 40% — Partner With Maasewa Healthcare",
    description:
      "Maasewa's post-discharge home care program helps hospitals reduce readmission rates, improve CSAT, and free up beds. 50+ partners across India.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hospital Partnership Program — Maasewa Healthcare",
  description:
    "A post-discharge home care program for hospitals to reduce readmission rates, improve patient outcomes and satisfaction through certified home nursing.",
  provider: {
    "@type": "MedicalBusiness",
    name: "Maasewa Healthcare",
    url: BASE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Hospital Administrators, Discharge Coordinators, Healthcare Providers",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "For Hospitals", item: `${BASE_URL}/for-hospitals` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ForHospitalsPage />
    </>
  );
}
