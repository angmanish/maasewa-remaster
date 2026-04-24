"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserCheck, Phone, MapPin, CalendarDays, Search } from "lucide-react";

const STAFF_DATA = [
  { id: "s1", name: "Anjali Mehta", role: "Home Nurse", city: "Pune", phone: "+91 9876543210", shift: "Day (7am–7pm)", status: "On Duty", joinedAt: "2024-02-10" },
  { id: "s2", name: "Kavya Reddy", role: "ICU Nurse", city: "Pune", phone: "+91 9876543211", shift: "Night (7pm–7am)", status: "On Leave", joinedAt: "2024-04-18" },
  { id: "s3", name: "Mohammed Arif", role: "Caregiver", city: "Mumbai", phone: "+91 9876543212", shift: "Day (7am–7pm)", status: "On Duty", joinedAt: "2024-05-22" },
  { id: "s4", name: "Sunita Pawar", role: "Post-Op Nurse", city: "Pune", phone: "+91 9876543213", shift: "12h Shift", status: "Off Duty", joinedAt: "2024-07-01" },
  { id: "s5", name: "Pradeep Yadav", role: "Caregiver", city: "Bangalore", phone: "+91 9876543214", shift: "Day (7am–7pm)", status: "On Duty", joinedAt: "2024-08-15" },
];

const statusStyle: Record<string, string> = {
  "On Duty": "bg-emerald-100 text-emerald-700",
  "Off Duty": "bg-slate-100 text-slate-500",
  "On Leave": "bg-amber-100 text-amber-700",
};

export default function StaffPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.role === "STAFF") {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  const [search, setSearch] = useState("");
  const filtered = STAFF_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Staff Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">View and monitor all active field staff members.</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search staff by name, city, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((staff, i) => (
          <motion.div
            key={staff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <UserCheck size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{staff.name}</p>
                  <p className="text-xs text-slate-500">{staff.role}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[staff.status]}`}>
                {staff.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-slate-400 flex-shrink-0" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                <span>{staff.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={13} className="text-slate-400 flex-shrink-0" />
                <span>{staff.shift}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Joined: {staff.joinedAt}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">No staff members found.</div>
      )}
    </div>
  );
}
