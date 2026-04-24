"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Shield, CheckCircle, Award } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Our Services" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/for-hospitals", label: "For Hospitals" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ],
  services: [
    { href: "/services", label: "Home Nursing" },
    { href: "/services", label: "Elder Care" },
    { href: "/services", label: "ICU Home Setup" },
    { href: "/services", label: "Post-Op Care" },
    { href: "/services", label: "Physiotherapy" },
    { href: "/services", label: "Injection Visit" },
  ],
};

const trustBadges = [
  { icon: Shield, label: "Police Verified" },
  { icon: CheckCircle, label: "100% Background Checked" },
  { icon: Award, label: "Clinical Quality Assured" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-trust-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Maasewa Healthcare Logo" width={60} height={36} className="rounded-xl object-contain" />
              <div className="flex flex-col leading-none">
                <span
                  className="text-base font-bold text-white"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Maasewa
                </span>
                <span className="text-[10px] text-blue-200 font-medium tracking-wide">
                  Healthcare
                </span>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              Compassionate, professional, and reliable home healthcare services
              delivered to your doorstep. Your health and recovery are our
              priority.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61578668799642" },
                { icon: FaInstagram, href: "https://www.instagram.com/maasewa/" },
                { icon: FaTwitter, href: "https://x.com/Maasewa_care" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={Icon.name}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white font-bold mb-5 text-sm tracking-wide uppercase"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 text-sm hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-white font-bold mb-5 text-sm tracking-wide uppercase"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 text-sm hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-white font-bold mb-5 text-sm tracking-wide uppercase"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-blue-300 flex-shrink-0 mt-0.5"
                />
                <span className="text-blue-200 text-sm leading-relaxed">
                  Gate no 1313, Om Sai Housing Society, near Zenda Chowk, Pune,
                  411062
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-300 flex-shrink-0" />
                <a
                  href="tel:+916361376521"
                  className="text-blue-200 text-sm hover:text-white transition-colors"
                >
                  +91 6361376521
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-300 flex-shrink-0" />
                <a
                  href="mailto:info@maasewahealthcare.com"
                  className="text-blue-200 text-sm hover:text-white transition-colors"
                >
                  info@maasewahealthcare.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-blue-800 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <Icon size={16} className="text-success" />
                </div>
                <span className="text-blue-100 text-sm font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-blue-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Maasewa Healthcare. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
