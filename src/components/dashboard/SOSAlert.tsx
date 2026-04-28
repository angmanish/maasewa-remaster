"use client";

import { useEffect, useRef, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, User, Phone, ShieldAlert, X, BellOff, BellRing } from "lucide-react";

export default function SOSAlert() {
  const { activeSOS, updateIncidentStatus } = useDashboard();
  const { currentUser } = useAuth();
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isAdmin = currentUser?.role === "ADMIN" || currentUser?.role === "SUB_ADMIN";

  useEffect(() => {
    if (activeSOS.length > 0 && !muted && isAdmin) {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [activeSOS, muted, isAdmin]);

  if (!isAdmin || activeSOS.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3" // Loud Siren Sound
        loop
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-rose-600/20 backdrop-blur-md animate-pulse pointer-events-auto"
      />

      <div className="relative w-full max-w-2xl pointer-events-auto">
        <AnimatePresence>
          {activeSOS.map((sos, idx) => (
            <motion.div
              key={sos.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-[0_0_100px_rgba(225,29,72,0.4)] overflow-hidden border-4 border-rose-500 mb-4"
            >
              {/* Header */}
              <div className="bg-rose-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center animate-bounce">
                    <AlertTriangle size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Emergency SOS Alert</h2>
                    <p className="text-rose-100 text-[10px] font-bold uppercase tracking-widest">Immediate Response Required</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMuted(!muted)}
                  className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  {muted ? <BellOff size={20} /> : <BellRing size={20} />}
                </button>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Staff Info */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <User size={12} /> Staff Information
                    </h3>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-lg font-black text-slate-800">{sos.staffName || "Unknown Staff"}</p>
                      <p className="text-xs font-bold text-slate-400 mt-1">{sos.staffId}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs font-black text-primary">{sos.staffPhone || "No Phone"}</p>
                        <a 
                          href={`tel:${sos.staffPhone}`} 
                          className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all"
                        >
                          <Phone size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={12} /> Client Information
                    </h3>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-lg font-black text-slate-800">{sos.patientName || "Current Patient"}</p>
                      <p className="text-xs font-bold text-rose-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} /> {sos.location || "Location Not Sent"}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs font-black text-slate-600">{sos.patientPhone || "Contact Admin"}</p>
                        {sos.patientPhone && sos.patientPhone !== "Contact Admin" && (
                          <a 
                            href={`tel:${sos.patientPhone}`} 
                            className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-all"
                          >
                            <Phone size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-[2rem] bg-rose-50 border-2 border-rose-100">
                  <p className="text-sm font-bold text-rose-700 leading-relaxed italic">
                    "{sos.description}"
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => updateIncidentStatus(sos.id, "Investigating")}
                    className="flex-1 py-4 rounded-2xl bg-slate-800 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all"
                  >
                    Acknowledge & Track
                  </button>
                  <button
                    onClick={() => updateIncidentStatus(sos.id, "Resolved")}
                    className="flex-1 py-4 rounded-2xl bg-emerald-500 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-600 transition-all"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
