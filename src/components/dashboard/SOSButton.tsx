"use client";

import { useState } from "react";
import { AlertTriangle, Bell, Shield, Phone, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";

export default function SOSButton() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"confirm" | "form" | "success">("confirm");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { addIncident, tasks } = useDashboard();

  if (!currentUser || currentUser.role === "ADMIN") return null;

  const handleSOS = async () => {
    setLoading(true);
    try {
      // Find any active or scheduled task for this staff
      const activeTask = tasks.find(t => t.assignedTo === currentUser?.email && (t.status === "In Progress" || t.status === "Scheduled"));

      await addIncident({
        type: type || "Medical Emergency",
        severity: "Critical",
        description: description || "Immediate assistance requested via floating SOS button.",
        staffId: currentUser.email,
        staffName: currentUser.name || "Maa Sewa Staff Member",
        staffPhone: currentUser.phone || "No Phone Recorded",
        patientName: activeTask?.patient || "Assigned Client",
        patientPhone: "Contact Admin",
        location: activeTask?.location || "Field Location",
        reportedAt: new Date().toISOString(),
        status: "Reported"
      });
      setStep("success");
    } catch (error) {
      console.error("SOS failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setIsOpen(false);
    setStep("confirm");
    setType("");
    setDescription("");
  };

  return (
    <>
      {/* Floating SOS Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-rose-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 group border-4 border-rose-100"
      >
        <AlertTriangle size={32} className="group-hover:animate-pulse" />
        <span className="absolute -top-12 right-0 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
          Emergency SOS
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <button 
                onClick={reset}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {step === "confirm" && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertTriangle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">Emergency SOS</h3>
                    <p className="text-slate-500 mb-8 font-medium">Are you in an emergency situation? This will notify Admin immediately.</p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={() => setStep("form")}
                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all flex items-center justify-center gap-2 uppercase tracking-tight"
                      >
                        <Shield size={18} /> Confirm Emergency
                      </button>
                      <button
                        onClick={reset}
                        className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {step === "form" && (
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-6">Incident Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-wider">Incident Type</label>
                        <select 
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-100 focus:border-rose-600 outline-none transition-all font-bold text-slate-700 bg-slate-50"
                        >
                          <option value="Medical Emergency">Medical Emergency</option>
                          <option value="Safety Issue">Safety Issue</option>
                          <option value="Patient Dispute">Patient Dispute</option>
                          <option value="Equipment Failure">Equipment Failure</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-wider">Description</label>
                        <textarea
                          placeholder="Briefly describe the emergency..."
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-100 focus:border-rose-600 outline-none transition-all font-medium text-slate-700 bg-slate-50 resize-none"
                        />
                      </div>
                      <button
                        disabled={loading}
                        onClick={handleSOS}
                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-200 hover:bg-rose-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 uppercase tracking-tight"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : <Bell size={18} />}
                        Send Red Alert
                      </button>
                    </div>
                  </div>
                )}

                {step === "success" && (
                  <div className="text-center py-4">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">Alert Sent</h3>
                    <p className="text-slate-500 mb-8 font-medium">The Admin team and nearest coordinator have been notified. Please stay calm.</p>
                    <button
                      onClick={reset}
                      className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all uppercase tracking-tight"
                    >
                      Understood
                    </button>
                  </div>
                )}
              </div>

              {/* Coordinator Call */}
              <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emergency Line</p>
                    <p className="text-sm font-bold text-slate-700">+91 6361376521</p>
                  </div>
                </div>
                <a 
                  href="tel:+916361376521"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
