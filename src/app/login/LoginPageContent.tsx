"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

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
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart size={26} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-text-heading" style={{ fontFamily: "var(--font-jakarta)" }}>
            Welcome Back
          </h1>
          <p className="text-text-body text-sm mt-1">
            Sign in to the Maasewa Healthcare portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border-color p-8">
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-sm font-semibold text-text-heading mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-color text-text-heading placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-heading mb-1.5">
                Password
              </label>
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-body cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link href="#" className="text-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-dark transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={18} />
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
