"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartPulse, Activity, Thermometer, Droplets, Wind, Clipboard, CheckCircle2, Loader2, Plus, Sparkles } from "lucide-react";
import { Task } from "@/types/dashboard";
import { useDashboard } from "@/context/DashboardContext";

interface Props {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default function ClinicalNoteModal({ task, isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    bp: "",
    pulse: "",
    temp: "",
    spO2: "",
    respiration: "",
    clinicalNotes: "",
    medication: "",
    handover: "",
  });

  const { addClinicalNote } = useDashboard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addClinicalNote({
        taskId: task.id,
        staffId: task.assignedTo,
        patientName: task.patient,
        vitals: {
          bp: form.bp,
          pulse: Number(form.pulse),
          temp: Number(form.temp),
          spO2: Number(form.spO2),
          respiration: Number(form.respiration),
        },
        clinicalNotes: form.clinicalNotes,
        medicationAdministered: form.medication ? form.medication.split(",").map(m => m.trim()) : [],
        handoverInstructions: form.handover,
        loggedAt: new Date().toISOString(),
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setForm({ bp: "", pulse: "", temp: "", spO2: "", respiration: "", clinicalNotes: "", medication: "", handover: "" });
      }, 2000);
    } catch (error) {
      console.error("Failed to log clinical note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Clinical Log</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{task.patient} • {task.title}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-6">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Note Logged</h3>
                  <p className="text-slate-500 font-medium">The clinical update has been saved to the patient record.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Vitals Grid */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Activity size={14} /> Patient Vitals
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: "BP (mmHg)", name: "bp", icon: HeartPulse, placeholder: "120/80", color: "text-rose-500" },
                        { label: "Pulse (bpm)", name: "pulse", icon: Activity, placeholder: "72", color: "text-blue-500" },
                        { label: "Temp (°F)", name: "temp", icon: Thermometer, placeholder: "98.6", color: "text-amber-500" },
                        { label: "SpO2 (%)", name: "spO2", icon: Droplets, placeholder: "98", color: "text-teal-500" },
                        { label: "Respiration", name: "respiration", icon: Wind, placeholder: "16", color: "text-indigo-500" },
                      ].map((v) => (
                        <div key={v.name} className="relative group">
                          <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-tighter">{v.label}</label>
                          <div className="relative">
                            <v.icon size={14} className={`absolute left-4 top-1/2 -translate-y-1/2 ${v.color} opacity-40`} />
                            <input
                              type="text"
                              placeholder={v.placeholder}
                              value={(form as any)[v.name]}
                              onChange={(e) => setForm({ ...form, [v.name]: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Notes */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Clipboard size={14} /> Nursing Notes *
                      </label>
                      <textarea
                        required
                        placeholder="Detail the patient's condition, activities, and behavior during the shift..."
                        rows={4}
                        value={form.clinicalNotes}
                        onChange={(e) => setForm({ ...form, clinicalNotes: e.target.value })}
                        className="w-full p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Medication Administered</label>
                        <div className="space-y-3">
                          <input
                            placeholder="Add other meds (comma separated)"
                            value={form.medication}
                            onChange={(e) => setForm({ ...form, medication: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all mb-2"
                          />
                          {task.medications && task.medications.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                              {task.medications.map((m) => (
                                <button
                                  key={m.name}
                                  type="button"
                                  onClick={() => {
                                    const current = form.medication ? form.medication.split(",").map(x => x.trim()) : [];
                                    if (current.includes(m.name)) {
                                      setForm({ ...form, medication: current.filter(x => x !== m.name).join(", ") });
                                    } else {
                                      setForm({ ...form, medication: [...current, m.name].join(", ") });
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                    form.medication.includes(m.name) 
                                      ? "bg-primary text-white" 
                                      : "bg-white text-slate-400 border border-slate-200"
                                  }`}
                                >
                                  {m.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Handover Instructions</label>
                          <button 
                            type="button"
                            onClick={() => {
                              const summary = `Patient ${task.patient} condition is stable. Vitals logged: BP ${form.bp}, Pulse ${form.pulse}. Meds given: ${form.medication || "None"}.`;
                              setForm({ ...form, handover: summary });
                            }}
                            className="text-[10px] font-black text-primary uppercase hover:underline flex items-center gap-1"
                          >
                            <Sparkles size={10} /> Auto-Generate
                          </button>
                        </div>
                        <textarea
                          placeholder="Instructions for the next nurse..."
                          rows={3}
                          value={form.handover}
                          onChange={(e) => setForm({ ...form, handover: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Plus size={18} />}
                    Submit Clinical Log
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
