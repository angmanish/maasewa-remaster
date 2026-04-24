"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, ClipboardList, CalendarDays, TrendingUp, Shield, 
  Activity, ArrowRight, Star, Clock, CheckCircle, 
  Handshake, DollarSign, PlusCircle
} from "lucide-react";

const roleConfig: Record<string, { title: string; subtitle: string; gradient: string }> = {
  ADMIN: { 
    title: "System Administrator", 
    subtitle: "Complete control over users, vendors, and payroll.",
    gradient: "from-slate-800 to-slate-900" 
  },
  SUB_ADMIN: { 
    title: "Operational Manager", 
    subtitle: "Managing staff attendance, tasks, and scheduling.",
    gradient: "from-blue-600 to-indigo-700" 
  },
  STAFF: { 
    title: "Healthcare Specialist", 
    subtitle: "Your daily care dashboard and task overview.",
    gradient: "from-emerald-600 to-teal-700" 
  },
};

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { tasks, attendance, leaves, vendors } = useDashboard();

  const isAdmin = currentUser?.role === "ADMIN";
  const isSubAdmin = currentUser?.role === "SUB_ADMIN";
  const isStaff = currentUser?.role === "STAFF";

  const config = currentUser ? roleConfig[currentUser.role] : roleConfig.STAFF;

  const activeTasks = isStaff 
    ? tasks.filter(t => t.status !== "Completed" && t.assignedTo === currentUser?.email)
    : tasks.filter(t => t.status !== "Completed");

  const stats = [
    {
      label: "Total Staff",
      value: "12",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      roles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      label: "Active Tasks",
      value: activeTasks.length.toString(),
      icon: ClipboardList,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      roles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      label: "Pending Leaves",
      value: leaves.filter(l => l.status === (isSubAdmin ? "Pending" : "Sub-Admin Approved")).length.toString(),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      roles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      label: "Active Vendors",
      value: vendors.length.toString(),
      icon: Handshake,
      color: "text-purple-600",
      bg: "bg-purple-50",
      roles: ["ADMIN"],
    },
  ];

  const visibleStats = stats.filter(
    (s) => currentUser && s.roles.includes(currentUser.role)
  );

  const quickActions = [
    { label: "Assign Task", icon: PlusCircle, href: "/dashboard/tasks", roles: ["ADMIN", "SUB_ADMIN"] },
    { label: "Mark Attendance", icon: CheckCircle, href: "/dashboard/attendance", roles: ["ADMIN", "SUB_ADMIN"] },
    { label: "Generate Salary", icon: DollarSign, href: "/dashboard/salary", roles: ["ADMIN"] },
    { label: "Apply Leave", icon: CalendarDays, href: "/dashboard/leaves", roles: ["STAFF"] },
    { label: "View Tasks", icon: ClipboardList, href: "/dashboard/tasks", roles: ["STAFF"] },
  ].filter(a => currentUser && a.roles.includes(currentUser.role));

  return (
    <div className="space-y-8">
      {/* Premium Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.gradient} p-8 text-white shadow-2xl`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              {config.title}
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium opacity-80">Live Portal</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
            Welcome, {currentUser?.name?.split(" ")[0]}
          </h1>
          <p className="text-white/70 max-w-lg text-sm md:text-base leading-relaxed">
            {config.subtitle}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all text-sm font-bold"
              >
                <action.icon size={16} />
                {action.label}
                <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute right-20 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {visibleStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks / Priority Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
              {isStaff ? "Your Active Tasks" : "Recent System Tasks"}
            </h2>
            <Link href="/dashboard/tasks" className="text-xs font-bold text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.priority === "High" ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"}`}>
                  <Activity size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{task.title}</p>
                  <p className="text-[10px] text-slate-500">{task.patient} • {task.time}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${task.priority === "High" ? "bg-rose-500 text-white" : "bg-blue-500 text-white"}`}>
                  {task.priority}
                </span>
              </div>
            ))}
            {activeTasks.length === 0 && (
              <p className="text-center py-8 text-slate-400 text-sm">No active tasks at the moment.</p>
            )}
          </div>
        </motion.div>

        {/* System Health / Tips Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-slate-800 mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
            Quick Pulse
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Security Active</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">All background checks for field staff are up to date and verified.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">4.8 Avg Rating</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">Patient feedback has been exceptionally positive this month.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">System Tip</p>
              <div className="p-4 rounded-2xl bg-slate-50 text-[11px] text-slate-600 leading-relaxed">
                Remember to mark your attendance before 10:00 AM daily to avoid system alerts.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
