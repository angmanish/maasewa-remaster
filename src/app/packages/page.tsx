import type { Metadata } from "next";
import PackagesPage from "./PackagesPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "Care Packages & Pricing — Transparent Home Healthcare Plans",
  description:
    "Explore transparent care packages for home nursing, elder care, and ICU home setup. Flexible plans starting from ₹1,499/day. No hidden costs. Certified nurses in 15+ cities.",
  keywords: [
    "home nursing packages India",
    "elder care pricing Pune",
    "ICU home setup cost",
    "home health care plans",
    "affordable nursing services",
    "post operative care packages",
    "monthly elder care subscription",
    "Maa Sewa Healthcare pricing",
  ],
  alternates: { canonical: `${BASE_URL}/packages` },
  openGraph: {
    url: `${BASE_URL}/packages`,
    title: "Care Packages & Pricing — Maa Sewa Healthcare",
    description:
      "Professional home care plans tailored to your needs. Post-op, Elder Care, and Home ICU packages with 24/7 support.",
  },
};

const packagesSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Maa Sewa Healthcare Care Packages",
  description: "Comprehensive home healthcare plans for nursing, elder care, and ICU setup.",
  brand: {
    "@type": "Brand",
    name: "Maa Sewa Healthcare",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "900",
    highPrice: "50000",
    priceCurrency: "INR",
    offerCount: "4",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Care Packages", item: `${BASE_URL}/packages` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={packagesSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PackagesPage />
    </>
  );
}
