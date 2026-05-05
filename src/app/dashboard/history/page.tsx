"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, HeartPulse, Activity, Thermometer, Droplets, Wind, Clipboard, Calendar, Share2, ArrowRight, X, Shield, CheckCircle2, Trash2, Search } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function HistoryPage() {
  const { currentUser } = useAuth();
  const { clinicalNotes, tasks, isLoading, updateClinicalNote, deleteClinicalNote } = useDashboard();
  const [staffList, setStaffList] = useState<{ name: string; email: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharingNote, setSharingNote] = useState<any>(null);
  const [sharingStaffEmail, setSharingStaffEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

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

  // Filter notes based on role and search term
  const filteredNotes = clinicalNotes.filter(note => {
    // Role based filtering
    let isAuthorized = true;
    if (currentUser?.role === "STAFF") {
      const isSharedWithMe = note.sharedWith?.includes(currentUser.email);
      const isMyNote = note.staffId === currentUser.email;
      const myPatients = tasks
        .filter(t => t.assignedTo === currentUser.email)
        .map(t => t.patient);
      const isMyPatient = myPatients.includes(note.patientName);
      isAuthorized = isSharedWithMe || isMyNote || isMyPatient;
    }

    if (!isAuthorized) return false;

    // Search term filtering
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesPatient = note.patientName?.toLowerCase().includes(lowerSearch);
      const matchesStaff = note.staffId?.toLowerCase().includes(lowerSearch);
      const matchesNotes = note.clinicalNotes?.toLowerCase().includes(lowerSearch);
      return matchesPatient || matchesStaff || matchesNotes;
    }

    return true;
  }).sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime());

  return (
    <div className="pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Patient History
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Timeline of clinical updates and vitals for your patients.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:max-w-xs">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search patient, staff, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 shadow-sm"
          />
        </div>
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
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/30 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800 leading-tight">{note.patientName}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Calendar size={10} className="text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {new Date(note.loggedAt).toLocaleDateString()} • {new Date(note.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleShare(note)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all border border-slate-100"
                      >
                        <Share2 size={10} /> Share
                      </button>
                      <button
                        onClick={() => {
                          setSharingNote(note);
                          setIsShareModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-[9px] font-black uppercase tracking-widest shadow-md shadow-primary/20 hover:bg-primary-dark transition-all"
                      >
                        <ArrowRight size={10} /> Handover
                      </button>
                      {(currentUser?.role === "ADMIN" || currentUser?.role === "SUB_ADMIN") && (
                        <button
                          onClick={() => {
                            setNoteToDelete(note.id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-100"
                          title="Delete Record"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {note.sharedWith && note.sharedWith.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                      <Shield size={10} className="text-emerald-500" />
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                        Shared with: {note.sharedWith.map((email: string) => staffList.find(s => s.email === email)?.name || email).join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Vitals Grid - More Compact */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {[
                      { label: "BP", value: note.vitals.bp, icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50/30" },
                      { label: "Pulse", value: `${note.vitals.pulse} bpm`, icon: Activity, color: "text-blue-500", bg: "bg-blue-50/30" },
                      { label: "Temp", value: `${note.vitals.temp} °F`, icon: Thermometer, color: "text-amber-500", bg: "bg-amber-50/30" },
                      { label: "SpO2", value: `${note.vitals.spO2} %`, icon: Droplets, color: "text-teal-500", bg: "bg-teal-50/30" },
                      { label: "Resp", value: note.vitals.respiration, icon: Wind, color: "text-indigo-500", bg: "bg-indigo-50/30" },
                    ].map((v) => (
                      <div key={v.label} className={`px-3 py-2.5 rounded-xl ${v.bg} border border-slate-100/50`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <v.icon size={10} className={v.color} />
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{v.label}</span>
                        </div>
                        <p className="text-xs font-black text-slate-700">{v.value || "—"}</p>
                      </div>
                    ))}
                  </div>

                  {/* Notes Section - Elegant */}
                  <div className="space-y-4">
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 relative group/notes">
                      <div className="absolute top-3 right-3 opacity-20 group-hover/notes:opacity-40 transition-opacity">
                        <Clipboard size={12} className="text-slate-400" />
                      </div>
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Findings</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                        "{note.clinicalNotes}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {note.medicationAdministered?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {note.medicationAdministered.map((med: string) => (
                            <span key={med} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100/50">
                              {med}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter ml-auto">
                        Staff ID: {note.staffId}
                      </div>
                    </div>

                    {note.handoverInstructions && (
                      <div className="pt-3 border-t border-slate-100/60">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          <h4 className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Handover Alert</h4>
                        </div>
                        <p className="text-xs font-bold text-slate-700 leading-snug">{note.handoverInstructions}</p>
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setNoteToDelete(null);
        }}
        onConfirm={() => {
          if (noteToDelete) {
            deleteClinicalNote(noteToDelete);
          }
        }}
        title="Delete Record"
        message="Are you sure you want to delete this clinical record? This action cannot be undone."
        confirmText="Delete Now"
      />
    </div>
  );
}
