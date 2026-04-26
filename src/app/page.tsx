import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
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

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <StatsSection />
      <HowItWorksPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}
