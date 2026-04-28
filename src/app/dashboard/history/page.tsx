"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, HeartPulse, Activity, Thermometer, Droplets, Wind, Clipboard, Calendar, Share2, ArrowRight, X, Shield, CheckCircle2 } from "lucide-react";

export default function HistoryPage() {
  const { currentUser } = useAuth();
  const { clinicalNotes, tasks, isLoading, updateClinicalNote } = useDashboard();
  const [staffList, setStaffList] = useState<{ name: string; email: string }[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharingNote, setSharingNote] = useState<any>(null);
  const [sharingStaffEmail, setSharingStaffEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/dashboard/users");
        const data = await res.json();
        if (Array.isArray(data)) {
          const assignable = data
            .filter((u: any) => u.role === "STAFF" || u.role === "SUB_ADMIN")
            .map((u: any) => ({ name: u.name, email: u.email }));
          setStaffList(assignable);
        }
      } catch (err) {
        console.error("Failed to fetch staff for sharing:", err);
      }
    };
    fetchStaff();
  }, []);

  const handleInternalShare = async () => {
    if (!sharingNote || !sharingStaffEmail) return;
    try {
      const currentShared = sharingNote.sharedWith || [];
      if (!currentShared.includes(sharingStaffEmail)) {
        await updateClinicalNote(sharingNote.id, {
          sharedWith: [...currentShared, sharingStaffEmail]
        });
      }
      const staffName = staffList.find(s => s.email === sharingStaffEmail)?.name;
      setIsShareModalOpen(false);
      setSharingNote(null);
      setSharingStaffEmail("");
      setSuccessMessage(`Handover shared with ${staffName}`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Internal share failed:", err);
    }
  };

  const handleShare = async (note: any) => {
    const text = `
🏥 *Maa Sewa Clinical Handover*
👤 *Patient:* ${note.patientName}
📅 *Date:* ${new Date(note.loggedAt).toLocaleString()}
---------------------------
💓 *Vitals:*
- BP: ${note.vitals.bp || "N/A"}
- Pulse: ${note.vitals.pulse || "N/A"} bpm
- Temp: ${note.vitals.temp || "N/A"} °F
- SpO2: ${note.vitals.spO2 || "N/A"} %
---------------------------
📝 *Clinical Notes:*
${note.clinicalNotes}

💊 *Meds Given:*
${note.medicationAdministered?.join(", ") || "None"}

⚠️ *Instructions:*
${note.handoverInstructions || "Continue standard care"}
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Handover - ${note.patientName}`,
          text: text,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Handover summary copied to clipboard!");
    }
  };

  // Filter notes based on role
  // Staff see notes for their patients
  // Admin/Sub-Admin see all
  const filteredNotes = clinicalNotes.filter(note => {
    if (currentUser?.role === "STAFF") {
      // Show notes where:
      // 1. Staff is the author
      // 2. Note was explicitly shared with this staff
      // 3. Staff is currently assigned to this patient
      const isSharedWithMe = note.sharedWith?.includes(currentUser.email);
      const isMyNote = note.staffId === currentUser.email;
      
      const myPatients = tasks
        .filter(t => t.assignedTo === currentUser.email)
        .map(t => t.patient);
      const isMyPatient = myPatients.includes(note.patientName);

      return isSharedWithMe || isMyNote || isMyPatient;
    }
    return true;
  }).sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());

  return (
    <div className="pb-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
          Patient History
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Timeline of clinical updates and vitals for your assigned patients.</p>
      </div>

      <div className="relative border-l-2 border-slate-100 ml-4 pl-10 space-y-12">
        {isLoading ? (
           Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[3.25rem] top-0 w-8 h-8 rounded-full bg-slate-100 border-4 border-white shadow-sm" />
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 animate-pulse">
                <div className="h-6 w-48 bg-slate-100 rounded-lg mb-4" />
                <div className="h-4 w-32 bg-slate-100 rounded-lg mb-8" />
                <div className="grid grid-cols-5 gap-4 mb-8">
                  {Array.from({ length: 5 }).map((_, j) => <div key={j} className="h-12 bg-slate-50 rounded-2xl" />)}
                </div>
                <div className="h-20 bg-slate-50 rounded-2xl" />
              </div>
            </div>
          ))
        ) : filteredNotes.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
            <Clock size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">No clinical history records found.</p>
          </div>
        ) : (
          filteredNotes.map((note, idx) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[3.25rem] top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-lg ring-8 ring-primary/5">
                <HeartPulse size={14} />
              </div>

              {/* Card */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group">
                <div className="p-8">
                  {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
                          <User size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-800">{note.patientName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar size={12} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              {new Date(note.loggedAt).toLocaleDateString()} • {new Date(note.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleShare(note)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                          title="Share to WhatsApp/Others"
                        >
                          <Share2 size={12} /> External
                        </button>
                        <button
                          onClick={() => {
                            setSharingNote(note);
                            setIsShareModalOpen(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        >
                          <ArrowRight size={12} /> Send Handover
                        </button>
                        <div className="px-4 py-2 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                          Staff ID: {note.staffId}
                        </div>
                      </div>
                    </div>

                    {note.sharedWith && note.sharedWith.length > 0 && (
                      <div className="flex items-center gap-2 mb-6 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                        <Shield size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                          Shared with: {note.sharedWith.map((email: string) => staffList.find(s => s.email === email)?.name || email).join(", ")}
                        </span>
                      </div>
                    )}

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {[
                      { label: "BP", value: note.vitals.bp, icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50" },
                      { label: "Pulse", value: `${note.vitals.pulse} bpm`, icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
                      { label: "Temp", value: `${note.vitals.temp} °F`, icon: Thermometer, color: "text-amber-500", bg: "bg-amber-50" },
                      { label: "SpO2", value: `${note.vitals.spO2} %`, icon: Droplets, color: "text-teal-500", bg: "bg-teal-50" },
                      { label: "Resp", value: note.vitals.respiration, icon: Wind, color: "text-indigo-500", bg: "bg-indigo-50" },
                    ].map((v) => (
                      <div key={v.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <v.icon size={12} className={v.color} />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{v.label}</span>
                        </div>
                        <p className="text-sm font-black text-slate-700">{v.value || "—"}</p>
                      </div>
                    ))}
                  </div>

                  {/* Notes Section */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Clipboard size={14} /> Clinical Findings
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 italic">
                        "{note.clinicalNotes}"
                      </p>
                    </div>

                    {note.medicationAdministered?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {note.medicationAdministered.map((med: string) => (
                          <span key={med} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            {med}
                          </span>
                        ))}
                      </div>
                    )}

                    {note.handoverInstructions && (
                      <div className="pt-6 border-t border-slate-100">
                        <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">Handover Alert</h4>
                        <p className="text-sm font-bold text-slate-700">{note.handoverInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Internal Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsShareModalOpen(false)} 
            />
            <motion.div
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Share2 size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Send Handover</h2>
                  </div>
                  <button onClick={() => setIsShareModalOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
                
                <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                  Select a staff member to share this clinical log. They will be notified of this handover.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Select Recipient</label>
                    <select
                      value={sharingStaffEmail}
                      onChange={(e) => setSharingStaffEmail(e.target.value)}
                      className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 bg-white"
                    >
                      <option value="">Choose a staff member...</option>
                      {staffList.filter(s => s.email !== currentUser?.email).map((s) => (
                        <option key={s.email} value={s.email}>{s.name} ({s.email})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setIsShareModalOpen(false)} 
                      className="flex-1 py-4 rounded-2xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      disabled={!sharingStaffEmail}
                      onClick={handleInternalShare} 
                      className="flex-1 py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      Share Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-emerald-500 text-white rounded-2xl shadow-2xl shadow-emerald-500/30"
          >
            <CheckCircle2 size={18} />
            <span className="text-sm font-black uppercase tracking-widest">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
