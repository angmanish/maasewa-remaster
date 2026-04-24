import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";

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
    default: "Maasewa Healthcare",
    template: "%s | Maasewa Healthcare",
  },
  description:
    "Maasewa Healthcare provides professional home nursing, elder care, ICU home setup, and post-operative care in Pune and 15+ cities across India. Certified, police-verified nurses available 24/7. Average arrival in 3.8 hours.",
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
    "Maasewa Healthcare",
    "certified home nurse",
    "background verified nurse",
    "24 hour nursing care",
    "home care services Mumbai",
    "home care services Delhi",
    "home care services Bengaluru",
  ],
  authors: [{ name: "Maasewa Healthcare", url: BASE_URL }],
  creator: "Maasewa Healthcare",
  publisher: "Maasewa Healthcare",
  category: "Healthcare",
  applicationName: "Maasewa Healthcare",
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
    siteName: "Maasewa Healthcare",
    title: "Maasewa Healthcare — Home Nursing & Post-Discharge Care Services",
    description:
      "Professional home nursing, ICU setup, elder care & post-operative care delivered to your doorstep. Certified nurses in 15+ Indian cities. Available 24/7.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Maasewa Healthcare" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MaasewaHealth",
    creator: "@MaasewaHealth",
    title: "Maasewa Healthcare — Home Nursing & Post-Discharge Care",
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
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
