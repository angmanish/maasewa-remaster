"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { AttendanceRecord } from "@/types/dashboard";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, CheckCircle, XCircle, 
  Clock, Minus, CalendarDays, Users, Search 
} from "lucide-react";

// ─── Config ──────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: AttendanceRecord["status"]; label: string; icon: React.ElementType; activeClass: string; idleClass: string }[] = [
  { value: "Present",  label: "Present",  icon: CheckCircle, activeClass: "bg-emerald-500 text-white border-emerald-500", idleClass: "border-emerald-300 text-emerald-600 hover:bg-emerald-50" },
  { value: "Absent",   label: "Absent",   icon: XCircle,     activeClass: "bg-rose-500 text-white border-rose-500",       idleClass: "border-rose-300 text-rose-600 hover:bg-rose-50" },
  { value: "Half Day", label: "Half Day", icon: Minus,       activeClass: "bg-amber-500 text-white border-amber-500",     idleClass: "border-amber-300 text-amber-600 hover:bg-amber-50" },
  { value: "Leave",    label: "Leave",    icon: Clock,       activeClass: "bg-blue-500 text-white border-blue-500",       idleClass: "border-blue-300 text-blue-600 hover:bg-blue-50" },
];

const CAL_BADGE: Record<AttendanceRecord["status"], { short: string; bg: string; text: string }> = {
  Present:  { short: "P", bg: "bg-emerald-100", text: "text-emerald-700" },
  Absent:   { short: "A", bg: "bg-rose-100",    text: "text-rose-700"    },
  "Half Day": { short: "H", bg: "bg-amber-100", text: "text-amber-700"   },
  Leave:    { short: "L", bg: "bg-blue-100",    text: "text-blue-700"    },
};

import { getLocalDateString } from "@/lib/dateUtils";

function getCalDays(year: number, month: number): (Date | null)[] {
  const cells: (Date | null)[] = [];
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const startOffset = (first.getDay() + 6) % 7; // Mon = 0
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(year, month, d));
  return cells;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AttendancePage() {
  const { currentUser } = useAuth();
  const { attendance, markAttendance } = useDashboard();

  const isStaff    = currentUser?.role === "STAFF";
  const isSubAdmin = currentUser?.role === "SUB_ADMIN";
  const isAdmin    = currentUser?.role === "ADMIN";
  const canMark    = isSubAdmin || isAdmin;

  const [staffList, setStaffList] = useState<{ email: string; name: string; role: string }[]>([]);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        const staffOnly = data.filter((u: any) => u.role === "STAFF");
        setStaffList(staffOnly);
        if (!isStaff && staffOnly.length > 0) setViewEmail(staffOnly[0].email);
      }
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const today = new Date();
  const todayStr = getLocalDateString(today);

  // Selected date for marking (default = today)
  const [markDate, setMarkDate] = useState(todayStr);

  // Calendar navigation
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // Which staff to view in calendar (staff sees self, others pick from list)
  const [viewEmail, setViewEmail] = useState(isStaff ? currentUser?.email || "" : "");

  // Search staff for marking
  const [searchTerm, setSearchTerm] = useState("");

  // Mark attendance for a staff + status on the selected date
  const handleMark = (staffEmail: string, staffName: string, status: AttendanceRecord["status"]) => {
    markAttendance({ date: markDate, staffEmail, staffName, status, markedBy: currentUser?.email || "" });
  };

  // Get current status for a staff on the selected date
  const getStatus = (email: string) =>
    attendance.find((r) => r.staffEmail === email && r.date === markDate)?.status ?? null;

  // Calendar data for the selected staff
  const calDays = useMemo(() => getCalDays(calYear, calMonth), [calYear, calMonth]);
  const calMap  = useMemo(() => {
    const m: Record<string, AttendanceRecord["status"]> = {};
    attendance.filter((r) => r.staffEmail === viewEmail).forEach((r) => { m[r.date] = r.status; });
    return m;
  }, [attendance, viewEmail]);

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); };
  const nextMonth = () => {
    const now = new Date();
    if (calYear === now.getFullYear() && calMonth === now.getMonth()) return;
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1);
  };

  // Summary stats for the viewed month
  const monthSummary = useMemo(() => {
    const monthStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}`;
    const records  = attendance.filter((r) => r.staffEmail === viewEmail && r.date.startsWith(monthStr));
    return {
      Present:  records.filter((r) => r.status === "Present").length,
      Absent:   records.filter((r) => r.status === "Absent").length,
      "Half Day": records.filter((r) => r.status === "Half Day").length,
      Leave:    records.filter((r) => r.status === "Leave").length,
    };
  }, [attendance, viewEmail, calYear, calMonth]);

  const monthLabel = new Date(calYear, calMonth).toLocaleString("default", { month: "long", year: "numeric" });

  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            {isStaff ? "My Attendance" : "Attendance Management"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {canMark ? "Search staff and mark daily attendance records." : "Your monthly attendance overview."}
          </p>
        </div>
      </div>

      {/* ── MARK ATTENDANCE SECTION (Sub-Admin / Admin only) ── */}
      {canMark && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
              {/* Date Selector */}
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                <CalendarDays size={18} className="text-primary" />
                <input
                  type="date"
                  value={markDate}
                  max={todayStr}
                  onChange={(e) => setMarkDate(e.target.value)}
                  className="text-sm font-bold text-slate-800 outline-none bg-transparent cursor-pointer"
                />
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search staff by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-white border-b border-slate-100">
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Staff Member</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px] text-center">Status</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStaff.map((staff) => {
                  const current = getStatus(staff.email);
                  return (
                    <tr key={staff.email} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{staff.name}</p>
                            <p className="text-[10px] text-slate-400">{staff.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {current ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${CAL_BADGE[current].bg} ${CAL_BADGE[current].text}`}>
                            {current}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Not Marked</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {STATUS_OPTIONS.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = current === opt.value;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => handleMark(staff.email, staff.name, opt.value)}
                                title={opt.label}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border-2 ${
                                  isActive 
                                    ? "bg-" + opt.activeClass.split("bg-")[1].split(" ")[0] + " text-white shadow-lg border-transparent" 
                                    : "bg-white border-slate-100 text-slate-400 hover:border-primary/30 hover:text-primary"
                                }`}
                              >
                                <Icon size={14} />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                      No staff members found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between">
            <span>Showing {filteredStaff.length} staff members</span>
            <span>Total: {staffList.length}</span>
          </div>
        </motion.div>
      )}

      {/* ── CALENDAR SECTION ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Calendar Nav */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <ChevronLeft size={16} className="text-slate-600" />
          </button>
          <h2 className="font-bold text-slate-800 text-base" style={{ fontFamily: "var(--font-jakarta)" }}>{monthLabel}</h2>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors disabled:opacity-30" disabled={calYear === today.getFullYear() && calMonth === today.getMonth()}>
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>

        {/* Staff picker for calendar (admin/sub-admin) */}
        {canMark && (
          <div className="px-5 pt-3 pb-2 border-b border-slate-100">
            <select
              value={viewEmail}
              onChange={(e) => setViewEmail(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary bg-white"
            >
              {staffList.map((s) => <option key={s.email} value={s.email}>{s.name}</option>)}
            </select>
          </div>
        )}

        {/* Summary Row */}
        <div className="grid grid-cols-4 divide-x divide-slate-100 border-b border-slate-100">
          {(Object.entries(monthSummary) as [AttendanceRecord["status"], number][]).map(([status, count]) => (
            <div key={status} className="py-3 text-center">
              <p className={`text-xl font-extrabold ${CAL_BADGE[status].text}`} style={{ fontFamily: "var(--font-jakarta)" }}>{count}</p>
              <p className="text-[10px] text-slate-400 font-medium">{status}</p>
            </div>
          ))}
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-slate-400 border-b border-slate-100">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calDays.map((date, idx) => {
            if (!date) return <div key={`e${idx}`} className="h-14 border-b border-r border-slate-50 last:border-r-0" />;
            const ds = getLocalDateString(date);
            const status = calMap[ds];
            const badge = status ? CAL_BADGE[status] : null;
            const isToday = ds === todayStr;
            return (
              <div
                key={ds}
                className={`h-14 border-b border-r border-slate-100 last:border-r-0 flex flex-col items-center justify-start pt-2 gap-1 ${isToday ? "bg-blue-50" : ""}`}
              >
                <span className={`text-xs font-semibold ${isToday ? "text-primary" : "text-slate-500"}`}>
                  {date.getDate()}
                </span>
                {badge && (
                  <span className={`text-[10px] font-bold w-6 h-5 flex items-center justify-center rounded ${badge.bg} ${badge.text}`}>
                    {badge.short}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 px-5 py-3 border-t border-slate-100">
          {STATUS_OPTIONS.map((opt) => (
            <span key={opt.value} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${CAL_BADGE[opt.value].bg} ${CAL_BADGE[opt.value].text}`}>
              <opt.icon size={11} /> {opt.value}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
