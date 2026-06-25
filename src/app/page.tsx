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
import SeoContent from "@/components/home/SeoContent";
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

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${BASE_URL}/#organization`,
  name: "Maa Sewa Healthcare",
  url: BASE_URL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "312",
    reviewCount: "312",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Sharma" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Maa Sewa Healthcare provided an incredibly professional nurse for my father's post-surgery recovery. Arrived within 2 hours and the care was exceptional.",
      datePublished: "2026-05-10",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Rajesh Kulkarni" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "We used Maa Sewa for 24-hour nursing for our mother. The nurse was police-verified, very experienced, and extremely caring. Highly recommend.",
      datePublished: "2026-04-22",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Anita Desai" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "The ICU home setup they arranged was truly hospital-grade. The team was professional, quick, and the nurse was incredibly skilled.",
      datePublished: "2026-03-15",
    },
  ],
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
      <JsonLd data={aggregateRatingSchema} />
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
      <SeoContent />
      <CTABanner />
    </>
  );
}
