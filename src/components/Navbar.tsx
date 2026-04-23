"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Mail,
  User,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "Nursing Staff" },
      { href: "/services", label: "Elder Care" },
      { href: "/services", label: "ICU Home Setup" },
      { href: "/services", label: "Post-Op Care" },
      { href: "/services", label: "Injection Visit" },
    ],
  },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-hospitals", label: "For Hospitals" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border-color"
          : "bg-white/70 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <Image src="/logo.png" alt="Maasewa Healthcare Logo" width={60} height={36} className="rounded-xl object-contain" priority loading="eager" />
              <div className="flex flex-col leading-none">
                <span
                  className="text-base font-bold text-primary-deeper"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Maasewa
                </span>
                <span className="text-[10px] text-text-body font-medium tracking-wide">
                  Healthcare
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname.startsWith(link.href)
                        ? "text-primary bg-blue-50"
                        : "text-text-heading hover:text-primary hover:bg-blue-50"
                        }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-border-color p-2 z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-3 py-2 text-sm text-text-body hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                      ? "text-primary bg-blue-50"
                      : "text-text-heading hover:text-primary hover:bg-blue-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="p-2 rounded-lg text-text-body hover:text-primary hover:bg-blue-50 transition-colors"
                title="Login"
              >
                <User size={20} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Phone size={15} />
                Get Aftercare Now
              </Link>
            </div>

            {/* Mobile actions */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/login"
                className="p-2 text-text-body hover:text-primary transition-colors"
              >
                <User size={22} />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 -mr-2 rounded-lg text-text-heading hover:bg-blue-50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 menu-backdrop lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-2xl flex flex-col lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-color">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Maasewa Healthcare Logo" width={32} height={32} className="rounded-lg object-contain" priority />
                  <span
                    className="font-bold text-primary-deeper"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Maasewa Healthcare
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-text-body" />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) =>
                    link.children ? (
                      <div key={link.label}>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-text-heading font-medium hover:bg-blue-50 hover:text-primary transition-colors"
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="block px-4 py-2.5 text-sm text-text-body hover:text-primary rounded-lg transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-3 rounded-xl font-medium transition-colors ${pathname === link.href
                          ? "text-primary bg-blue-50"
                          : "text-text-heading hover:bg-blue-50 hover:text-primary"
                          }`}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </nav>
              </div>

              {/* Mobile footer */}
              <div className="px-5 py-5 border-t border-border-color space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-body">
                  <Phone size={16} className="text-primary flex-shrink-0" />
                  <span>+91 6361376521</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-body">
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <span>info@maasewahealthcare.com</span>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                  <Phone size={16} />
                  Get Aftercare Now
                </Link>
                <div className="flex items-center justify-center gap-4 pt-1">
                  <a href="https://www.facebook.com/profile.php?id=61578668799642" className="text-text-muted hover:text-primary transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/maasewa/" className="text-text-muted hover:text-primary transition-colors">
                    <FaInstagram size={20} />
                  </a>
                  <a href="https://x.com/Maasewa_care" className="text-text-muted hover:text-primary transition-colors">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
