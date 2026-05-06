import { Metadata } from "next";
import ServiceDetailPage from "../ServiceDetailPage";

const BASE_URL = "https://maasewahealthcare.com";

const servicesData: Record<string, any> = {
  "home-nursing": {
    title: "Home Nursing Services in Pune & Mumbai",
    desc: "Professional home nursing services with certified GNM/BSc nurses. ICU care, wound dressing, and 24/7 monitoring in the comfort of your home.",
  },
  "icu-home-setup": {
    title: "ICU Home Setup & Critical Care Services",
    desc: "Complete ICU setup at home with ventilators, monitors, and ICU-trained nurses. Hospital-grade critical care at 50% less cost.",
  },
  "elder-care": {
    title: "Elder Care & Senior Home Healthcare Services",
    desc: "Compassionate elder care services in Pune and Mumbai. Mobility support, hygiene, and companionship for your loved ones.",
  },
  "post-op-care": {
    title: "Post-Operative Care at Home",
    desc: "Specialized recovery support after surgery. Wound care, pain management, and physical therapy to ensure a smooth recovery.",
  },
  "specialized-care": {
    title: "Specialized Care — Stroke, Dementia & Palliative",
    desc: "Tailored care plans for complex conditions. Expert nursing for stroke recovery, dementia support, and palliative care.",
  },
  "injection-visit": {
    title: "In-Home Injection & IV Drip Services",
    desc: "Get IM/IV injections, IV drips, and vaccinations at home by trained nurses. Available in Pune and Mumbai.",
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = servicesData[params.slug];
  if (!service) return { title: "Service | Maa Sewa Healthcare" };

  return {
    title: service.title,
    description: service.desc,
    alternates: { canonical: `${BASE_URL}/services/${params.slug}` },
    openGraph: {
      title: `${service.title} | Maa Sewa Healthcare`,
      description: service.desc,
      url: `${BASE_URL}/services/${params.slug}`,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return [
    { slug: "home-nursing" },
    { slug: "icu-home-setup" },
    { slug: "elder-care" },
    { slug: "post-op-care" },
    { slug: "specialized-care" },
    { slug: "injection-visit" },
  ];
}

export default function Page() {
  return <ServiceDetailPage />;
}
