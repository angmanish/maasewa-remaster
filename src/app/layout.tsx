import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageProgressBar from "@/components/PageProgressBar";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import Chatbot from "@/components/chatbot/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const BASE_URL = "https://maasewahealthcare.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Maa Sewa Healthcare - Home Nursing & Patient Care",
    template: "%s | Maa Sewa Healthcare",
  },
  description:
    "Professional home nursing, ICU setup, and elder care in Pune & Mumbai. Certified 24/7 nurses. Fast arrival. Get reliable post-operative care today.",
  keywords: [
    "home nursing services",
    "home healthcare Pune",
    "home nurse near me",
    "post discharge care India",
    "elder care at home",
    "ICU home setup",
    "home nursing Pune",
    "nursing staff at home",
    "post operative care home",
    "home health aide India",
    "Maa Sewa Healthcare",
    "certified home nurse",
    "background verified nurse",
    "24 hour nursing care",
    "home care services Mumbai",
    "home care services Delhi",
    "home care services Bengaluru",
  ],
  authors: [{ name: "Maa Sewa Healthcare", url: BASE_URL }],
  creator: "Maa Sewa Healthcare",
  publisher: "Maa Sewa Healthcare",
  category: "Healthcare",
  applicationName: "Maa Sewa Healthcare",
  alternates: { canonical: BASE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Maa Sewa Healthcare",
    title: "Maa Sewa Healthcare — Home Nursing & Post-Discharge Care Services",
    description:
      "Professional home nursing, ICU setup, elder care & post-operative care delivered to your doorstep. Certified nurses in Pune and Mumbai. Available 24/7.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Maa Sewa Healthcare" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MaasewaHealth",
    creator: "@MaasewaHealth",
    title: "Maa Sewa Healthcare — Home Nursing & Post-Discharge Care",
    description: "Certified home nurses, ICU home setup & post-op care. Verified staff. 24/7 available.",
    images: [`${BASE_URL}/og-image.png`],
  },
  icons: {
    icon: "/maasewa-icon.png",
    apple: "/maasewa-apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "@id": "https://maasewahealthcare.com/#organization",
              name: "Maa Sewa Healthcare",
              alternateName: "Maasewa Healthcare",
              url: "https://maasewahealthcare.com",
              logo: {
                "@type": "ImageObject",
                url: "https://maasewahealthcare.com/logo.png",
                width: 300,
                height: 100,
              },
              description: "Professional home nursing, elder care, ICU home setup, and post-operative care in Pune and Mumbai. Certified, police-verified nurses available 24/7.",
              foundingDate: "2022",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gate no 1313, Om Sai Housing Society, near Zenda Chowk",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                postalCode: "411062",
                addressCountry: "IN",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-6361376521",
                  contactType: "customer service",
                  areaServed: ["IN"],
                  availableLanguage: ["English", "Hindi", "Marathi"],
                  contactOption: "TollFree",
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    opens: "00:00",
                    closes: "23:59",
                  },
                },
              ],
              areaServed: [
                { "@type": "City", name: "Pune" },
                { "@type": "City", name: "Mumbai" },
                { "@type": "City", name: "Pimpri-Chinchwad" },
              ],
              knowsAbout: [
                "Home Nursing",
                "ICU Home Setup",
                "Elder Care",
                "Post-Operative Care",
                "Dementia Care",
                "Stroke Rehabilitation",
                "Palliative Care",
                "Physiotherapy at Home",
                "Tracheostomy Care",
                "Wound Care Management",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Home Healthcare Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Home Nursing", url: "https://maasewahealthcare.com/services/home-nursing" } },
                  { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "ICU Home Setup", url: "https://maasewahealthcare.com/services/icu-home-setup" } },
                  { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Elder Care", url: "https://maasewahealthcare.com/services/elder-care" } },
                  { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Post-Operative Care", url: "https://maasewahealthcare.com/services/post-op-care" } },
                  { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Specialized Care", url: "https://maasewahealthcare.com/services/specialized-care" } },
                  { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Injection & IV Visit", url: "https://maasewahealthcare.com/services/injection-visit" } },
                ],
              },
              sameAs: [
                "https://facebook.com/maasewahealthcare",
                "https://instagram.com/maasewahealthcare",
              ],
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", ".hero-description", ".trust-bar"],
              },
            }),
          }}
        />
        <AuthProvider>
          <Suspense>
            <PageProgressBar />
          </Suspense>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
