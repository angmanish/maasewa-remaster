"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Calendar, Clock, User, MapPin, 
  Trash2, X, AlertCircle, CheckCircle2,
  CalendarDays, Search, Filter, Loader2
} from "lucide-react";
import { Shift } from "@/types/dashboard";
import { User as UserType } from "@/types/auth";
import { getLocalDateString } from "@/lib/dateUtils";
import Skeleton from "@/components/ui/Skeleton";

export default function ShiftsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // State
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [staff, setStaff] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [form, setForm] = useState({
    staffEmail: "",
    staffName: "",
    date: getLocalDateString(),
    startTime: "09:00",
    endTime: "18:00",
    patientName: "",
    location: "",
  });

  const fetchShifts = async () => {
    try {
      const res = await fetch("/api/dashboard/shifts");
      const data = await res.json();
      if (Array.isArray(data)) setShifts(data);
    } catch (err) {
      console.error("Failed to fetch shifts");
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setStaff(data.filter(u => u.role === "STAFF"));
      }
    } catch (err) {
      console.error("Failed to fetch staff");
    }
  };

  useEffect(() => {
    if (currentUser?.role === "STAFF") {
      router.replace("/dashboard");
      return;
    }
    
    const init = async () => {
      setIsLoading(true);
      await Promise.all([fetchShifts(), fetchStaff()]);
      setIsLoading(false);
    };
    init();
  }, [currentUser, router]);

  const handleCreateShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const selectedStaff = staff.find(s => s.email === form.staffEmail);
    const payload = { ...form, staffName: selectedStaff?.name || "" };

    try {
      const res = await fetch("/api/dashboard/shifts", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to book shift");
      } else {
        setShifts([data, ...shifts]);
        setModalOpen(false);
        setForm({
          staffEmail: "",
          staffName: "",
          date: getLocalDateString(),
          startTime: "09:00",
          endTime: "18:00",
          patientName: "",
          location: "",
        });
      }
    } catch (err) {
      setError("A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteShift = async (id: string) => {
    try {
      const res = await fetch(`/api/dashboard/shifts?id=${id}`, { method: "DELETE" });
      if (res.ok) setShifts(shifts.filter(s => s.id !== id));
    } catch (err) {
      console.error("Failed to delete shift");
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Shift Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage staff assignments and prevent scheduling conflicts.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={18} /> Book Shift
        </button>
      </div>

      {/* Shifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
              <div className="pt-4 border-t border-slate-50">
                <Skeleton className="w-20 h-6 rounded-full" />
              </div>
            </div>
          ))
        ) : shifts.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <CalendarDays size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No shifts scheduled yet.</p>
          </div>
        ) : (
          shifts.map((shift, i) => (
            <motion.div
              key={shift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{shift.startTime} - {shift.endTime}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{shift.date}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteShift(shift.id)}
                    className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <User size={16} className="text-slate-400" />
                    <span className="font-semibold text-slate-700">{shift.staffName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">Patient: <span className="font-bold text-slate-800">{shift.patientName}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 italic">
                    <MapPin size={14} />
                    <span>{shift.location || "Location not specified"}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    shift.status === "Scheduled" ? "bg-blue-50 text-blue-600" :
                    shift.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {shift.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Book Shift Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Plus size={24} />
                      </div>
                      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Book New Shift</h2>
                    </div>
                    <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold"
                    >
                      <AlertCircle size={18} className="flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handleCreateShift} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Assign Staff Member</label>
                      <select 
                        required
                        value={form.staffEmail}
                        onChange={(e) => setForm({ ...form, staffEmail: e.target.value })}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      >
                        <option value="">Select Staff...</option>
                        {staff.map(s => (
                          <option key={s.id} value={s.email}>{s.name} ({s.specialization})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Shift Date</label>
                        <input 
                          type="date" required
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">From</label>
                          <input 
                            type="time" required
                            value={form.startTime}
                            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">To</label>
                          <input 
                            type="time" required
                            value={form.endTime}
                            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Patient Name</label>
                        <input 
                          placeholder="e.g. Rahul Sharma" required
                          value={form.patientName}
                          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Location</label>
                        <input 
                          placeholder="e.g. Noida Sec-62"
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.1em] shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Confirm Booking"}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
