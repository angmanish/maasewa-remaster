"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

const DEMO_CREDENTIALS = [
  { role: "Admin", email: "admin@maasewa.com", password: "admin123", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { role: "Sub-Admin", email: "subadmin@maasewa.com", password: "subadmin123", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { role: "Staff", email: "staff@maasewa.com", password: "staff123", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export default function LoginPageContent() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed.");
    }
  };

  const fillDemo = (email: string, password: string) => {
    setForm({ email, password });
    setError("");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center mb-4">
            <Image src="/logo.png" alt="Maa Sewa Healthcare" width={48} height={48} className="rounded-xl object-contain" />
            <div className="flex flex-col leading-none text-left">
              <span className="text-lg font-bold text-primary-deeper" style={{ fontFamily: "var(--font-jakarta)" }}>
                Maa Sewa
              </span>
              <span className="text-[10px] text-text-body font-medium tracking-wide">Healthcare Portal</span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-text-heading" style={{ fontFamily: "var(--font-jakarta)" }}>
            Welcome Back
          </h1>
          <p className="text-text-body text-sm mt-1">Sign in to the Maa Sewa Healthcare portal</p>
        </div>

        {/* Demo Quick Login */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-text-muted text-center mb-3 uppercase tracking-wider">
            Demo Accounts — Click to fill
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.role}
                type="button"
                onClick={() => fillDemo(cred.email, cred.password)}
                className={`text-xs font-bold py-2 px-2 rounded-xl border transition-colors hover:opacity-80 ${cred.color}`}
              >
                {cred.role}
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border-color p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-text-heading mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@maasewa.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-color text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-heading mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border-color text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-600 text-sm bg-rose-50 rounded-xl px-4 py-3"
              >
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-dark transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          Need access?{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Contact administration
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
