"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserCheck, Phone, MapPin, CalendarDays, Search, Award, Briefcase, ShieldCheck, GraduationCap, IdCard, Loader2, Star } from "lucide-react";
import { User } from "@/types/auth";
import Image from "next/image";
import Skeleton from "@/components/ui/Skeleton";

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-500",
};

export default function StaffPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.role === "STAFF") {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  const [staffList, setStaffList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setStaffList(data.filter(u => u.role === "STAFF"));
      }
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filtered = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.city?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (s.specialization?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Staff Directory
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage and view professional profiles of your medical staff.</p>
        </div>
        {!isLoading && (
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {filtered.length} members found
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search staff by name, city, or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 bg-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-20 h-3" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          ))
        ) : (
          <>
            {filtered.map((staff, i) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Header/Profile Bar */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                        {staff.profilePic ? (
                          <Image 
                            src={staff.profilePic} 
                            alt={staff.name} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                            <UserCheck size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base">{staff.name}</p>
                        <p className="text-xs font-semibold text-primary">{staff.specialization || "General Staff"}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={10} className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-slate-700">4.8</span>
                          <span className="text-[10px] font-bold text-slate-400">(24)</span>
                        </div>
                        {staff.dob && <p className="text-[10px] text-slate-400 mt-1 font-medium italic opacity-70">DOB: {staff.dob}</p>}
                      </div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${statusStyle[staff.status]}`}>
                      {staff.status}
                    </span>
                  </div>

                  {/* Professional Info Grid */}
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <GraduationCap size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Qualification</p>
                        <p className="truncate font-medium">{staff.qualifications || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Briefcase size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Experience</p>
                        <p className="font-medium">{staff.experience || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <IdCard size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Aadhar Number</p>
                        <p className="font-medium tracking-wider">{staff.aadharNumber || "Not Verified"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone size={12} className="text-slate-400" />
                      <span>{staff.phone || "No phone"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin size={12} className="text-slate-400" />
                      <span>{staff.city || "Remote"}</span>
                    </div>
                  </div>
                </div>
                
                {/* Joined Ribbon */}
                <div className="bg-slate-50 px-5 py-2 text-[10px] text-slate-400 flex justify-between items-center">
                  <span>Joined: {staff.joinedAt}</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck size={10} /> Verified
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
          <Search size={40} className="mb-4 opacity-20" />
          <p>No staff members matching your search.</p>
        </div>
      )}
    </div>
  );
}
