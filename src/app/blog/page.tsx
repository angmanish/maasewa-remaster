import type { Metadata } from "next";
import BlogPage from "./BlogPage";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  title: "Home Nursing Blog — Recovery Guides, Elder Care & Health Tips",
  description:
    "Expert articles on home nursing, post-operative care, elder care, ICU home setup, and patient recovery. Evidence-based health resources by Maa Sewa Healthcare clinicians.",
  keywords: [
    "home nursing tips",
    "post surgery recovery at home",
    "elder care guide India",
    "ICU setup at home guide",
    "home healthcare blog",
    "patient recovery tips",
    "how to care for elderly at home",
    "choosing a home nurse India",
  ],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    url: `${BASE_URL}/blog`,
    title: "Home Nursing Blog — Recovery Guides & Health Tips | Maa Sewa Healthcare",
    description:
      "Expert articles on home nursing, post-op care, elder care, and patient recovery. Clinically reviewed health resources for patients and caregivers.",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Maa Sewa Healthcare Health Blog",
  description:
    "Expert recovery guides, home nursing tips, elder care advice, and health resources for patients and caregivers in India.",
  url: `${BASE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "Maa Sewa Healthcare",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "What to Expect After Discharge from Hospital",
      description: "Going home after a hospital stay can be overwhelming. Here's everything you need to prepare for a smooth recovery at home.",
      datePublished: "2026-04-15",
      author: { "@type": "Organization", name: "Maa Sewa Healthcare" },
      image: `${BASE_URL}/blog_postop.png`,
    },
    {
      "@type": "BlogPosting",
      headline: "5 Signs You Need Home Nursing Care",
      description: "These key indicators will help you decide whether professional home nursing care is right for you.",
      datePublished: "2026-04-10",
      author: { "@type": "Organization", name: "Maa Sewa Healthcare" },
      image: `${BASE_URL}/nurse_hero.png`,
    },
    {
      "@type": "BlogPosting",
      headline: "ICU at Home: A Complete Guide for Families",
      description: "Setting up an ICU-level environment at home with the right team support.",
      datePublished: "2026-04-05",
      author: { "@type": "Organization", name: "Maa Sewa Healthcare" },
      image: `${BASE_URL}/blog_icu.png`,
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogPage />
    </>
  );
}
