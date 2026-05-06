import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BlogPreview from "@/components/home/BlogPreview";
import ClinicalExcellence from "@/components/home/ClinicalExcellence";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Maa Sewa Healthcare",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Maa Sewa Healthcare",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-6361376521",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://facebook.com/maasewahealthcare",
    "https://instagram.com/maasewahealthcare",
  ],
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Maa Sewa Healthcare - Home Nursing Services",
  image: `${BASE_URL}/og-image.png`,
  "@id": `${BASE_URL}/#organization`,
  url: BASE_URL,
  telephone: "+916361376521",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. 12, Business Hub",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5204,
    longitude: 73.8567,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    opens: "00:00",
    closes: "23:59"
  },
  areaServed: ["Pune", "Mumbai", "Pimpri-Chinchwad"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={medicalBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <WhyChooseUs />
      <StatsSection />
      <HowItWorksPreview />
      <BlogPreview />
      <ClinicalExcellence />
      <Testimonials />
      <CTABanner />
    </>
  );
}
