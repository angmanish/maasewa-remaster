"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Users, ClipboardList, CalendarDays,
  LogOut, Menu, X, Shield, User, ChevronRight,
  DollarSign, Handshake, ClipboardCheck, CalendarCheck, FileText,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: string[];
  section?: string;
}

const navItems: NavItem[] = [
  // All roles
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: ["ADMIN", "SUB_ADMIN", "STAFF"], section: "Main" },
  // Admin only
  { href: "/dashboard/users", label: "User Management", icon: Users, roles: ["ADMIN"], section: "Admin" },
  { href: "/dashboard/salary", label: "Salary", icon: DollarSign, roles: ["ADMIN"], section: "Admin" },
  { href: "/dashboard/vendors", label: "Vendors", icon: Handshake, roles: ["ADMIN"], section: "Admin" },
  // Sub-Admin + Admin
  { href: "/dashboard/staff", label: "Staff Management", icon: ClipboardCheck, roles: ["ADMIN", "SUB_ADMIN"], section: "Management" },
  { href: "/dashboard/attendance", label: "Attendance", icon: CalendarCheck, roles: ["ADMIN", "SUB_ADMIN"], section: "Management" },
  // Tasks
  { href: "/dashboard/tasks", label: "Tasks", icon: ClipboardList, roles: ["ADMIN", "SUB_ADMIN", "STAFF"], section: "Work" },
  // Leaves
  { href: "/dashboard/leaves", label: "Leave Requests", icon: FileText, roles: ["ADMIN", "SUB_ADMIN", "STAFF"], section: "Work" },
  // Staff only
  { href: "/dashboard/attendance", label: "My Attendance", icon: CalendarDays, roles: ["STAFF"], section: "Work" },
  { href: "/dashboard/salary", label: "My Salary", icon: DollarSign, roles: ["STAFF"], section: "Work" },
];

const roleBadge: Record<string, { label: string; color: string }> = {
  ADMIN: { label: "Admin", color: "bg-rose-100 text-rose-700" },
  SUB_ADMIN: { label: "Sub-Admin", color: "bg-amber-100 text-amber-700" },
  STAFF: { label: "Staff", color: "bg-emerald-100 text-emerald-700" },
};

export default function DashboardSidebar() {
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const visibleItems = navItems.filter(
    (item) => currentUser && item.roles.includes(currentUser.role)
  );

  // Group by section
  const sections = visibleItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const sec = item.section || "Other";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  const badge = currentUser ? roleBadge[currentUser.role] : null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-200 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Maasewa" width={40} height={40} className="rounded-xl object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Maasewa</span>
            <span className="text-[10px] text-slate-500 tracking-wide">Healthcare Portal</span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-6 flex-shrink-0">
        <div className="relative group p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
              <User size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate" style={{ fontFamily: "var(--font-jakarta)" }}>
                {currentUser?.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate font-medium">
                {currentUser?.email}
              </p>
            </div>
          </div>
          {badge && (
            <div className="mt-3 relative z-10">
              <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${badge.color}`}>
                <Shield size={10} /> {badge.label}
              </span>
            </div>
          )}
          {/* Subtle background decoration */}
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-xl" />
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto space-y-6">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 pb-3">
              {section}
            </p>
            <div className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all group relative ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    <item.icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-primary transition-colors"} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute right-2 w-1 h-4 bg-white/40 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-200 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-white border-r border-slate-200 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} className="text-slate-700" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 lg:hidden flex flex-col"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            >
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center z-10"
                onClick={() => setMobileOpen(false)}
              >
                <X size={16} className="text-slate-600" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
