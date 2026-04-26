import ServiceDetailPage from "../ServiceDetailPage";

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
