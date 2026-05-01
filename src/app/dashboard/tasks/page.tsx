"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { Task } from "@/types/dashboard";
import { getLocalDateString } from "@/lib/dateUtils";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Clock, AlertCircle, MapPin, User,
  Plus, X, CheckCheck, ClipboardList, ArrowRight, Shield, Loader2, HeartPulse,
  Pill, Trash2, CheckCircle2, Phone
} from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import ClinicalNoteModal from "@/components/dashboard/ClinicalNoteModal";
import ConfirmModal from "@/components/ui/ConfirmModal";


const statusConfig: Record<string, { icon: React.ElementType; style: string; label: string }> = {
  Completed: { icon: CheckCircle, style: "bg-emerald-100 text-emerald-700", label: "Completed" },
  "In Progress": { icon: Clock, style: "bg-blue-100 text-blue-700", label: "In Progress" },
  Pending: { icon: AlertCircle, style: "bg-amber-100 text-amber-700", label: "Pending" },
};

const priorityStyle: Record<string, string> = {
  High: "bg-rose-50 text-rose-600",
  Normal: "bg-slate-50 text-slate-500",
  Low: "bg-teal-50 text-teal-600",
};

const emptyTask = {
  title: "",
  description: "",
  patient: "",
  patientPhone: "",
  patientEmail: "",
  location: "",
  time: "",
  date: getLocalDateString(),
  assignedTo: "",
  assignedToName: "",
  priority: "Normal" as Task["priority"],
  status: "Pending" as Task["status"],
  medications: [] as any[],
};

export default function TasksPage() {
  const { currentUser } = useAuth();
  const { tasks, addTask, updateTaskStatus, deleteTask, isLoading } = useDashboard();
  const [staffList, setStaffList] = useState<{ email: string; name: string }[]>([]);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        const staffOnly = data.filter((u: any) => u.role === "STAFF");
        setStaffList(staffOnly);
        if (staffOnly.length > 0) {
          setForm(prev => ({ 
            ...prev, 
            assignedTo: staffOnly[0].email, 
            assignedToName: staffOnly[0].name 
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [form, setForm] = useState(emptyTask);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const isAdmin = currentUser?.role === "ADMIN";
  const isSubAdmin = currentUser?.role === "SUB_ADMIN";
  const isStaff = currentUser?.role === "STAFF";

  // Staff only sees own tasks; others see all
  const visibleTasks = isStaff
    ? tasks.filter((t) => t.assignedTo === currentUser?.email)
    : tasks;

  const filtered = filterStatus === "All"
    ? visibleTasks
    : visibleTasks.filter((t) => t.status === filterStatus);

  const counts = {
    all: visibleTasks.length,
    pending: visibleTasks.filter((t) => t.status === "Pending").length,
    inProgress: visibleTasks.filter((t) => t.status === "In Progress").length,
    completed: visibleTasks.filter((t) => t.status === "Completed").length,
  };

  const handleAssign = () => {
    if (!form.title || !form.patient) return;
    const staff = staffList.find((s) => s.email === form.assignedTo);
    addTask({
      ...form,
      assignedToName: staff?.name || form.assignedTo,
      assignedBy: currentUser?.email || "",
    });
    setModalOpen(false);
    setForm(emptyTask);
  };

  const handleMarkComplete = (id: string, current: Task["status"]) => {
    const next: Task["status"] = current === "Pending" ? "In Progress" : "Completed";
    updateTaskStatus(id, next);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            {isStaff ? "My Tasks" : "Task Management"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isStaff ? "Your assigned care tasks." : "Assign and monitor all team tasks."}
          </p>
        </div>
        {(isSubAdmin || isAdmin) && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg flex-shrink-0"
          >
            <Plus size={16} /> Assign Task
          </button>
        )}
      </div>

      {/* Status Filter Chips */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { label: "All Tasks", count: counts.all, value: "All", color: "bg-slate-100 text-slate-700" },
          { label: "Pending", count: counts.pending, value: "Pending", color: "bg-amber-100 text-amber-700" },
          { label: "In Progress", count: counts.inProgress, value: "In Progress", color: "bg-blue-100 text-blue-700" },
          { label: "Completed", count: counts.completed, value: "Completed", color: "bg-emerald-100 text-emerald-700" },
        ].map((chip) => (
          <button
            key={chip.value}
            onClick={() => setFilterStatus(chip.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filterStatus === chip.value ? "bg-slate-800 text-white shadow-lg shadow-slate-800/20" : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"}`}
          >
            {chip.label}
            <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${filterStatus === chip.value ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>
              {chip.count}
            </span>
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-20 h-6 rounded-lg" />
                <Skeleton className="w-20 h-6 rounded-lg" />
              </div>
              <Skeleton className="w-2/3 h-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="w-full h-16 rounded-2xl" />
                <Skeleton className="w-full h-16 rounded-2xl" />
                <Skeleton className="w-full h-16 rounded-2xl" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No tasks found in this category</p>
          </div>
        ) : (
          filtered.map((task, i) => {
            const sc = statusConfig[task.status];
            const StatusIcon = sc.icon;
            return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8">
                {/* Left Side: Basic Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${sc.style}`}>
                      <StatusIcon size={10} /> {sc.label}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${priorityStyle[task.priority]}`}>
                      {task.priority} Priority
                    </span>
                    {(isAdmin || isSubAdmin) && (
                      <button
                        onClick={() => {
                          setTaskToDelete(task.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="ml-auto p-1 rounded-md bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Task"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-800 leading-tight mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {task.title}
                  </h3>
                  
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-primary" />
                      <span>Patient: <span className="text-slate-800">{task.patient}</span></span>
                      {task.patientPhone && (
                        <a 
                          href={`tel:${task.patientPhone}`} 
                          className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                          title="Call Patient"
                        >
                          <Phone size={10} fill="currentColor" className="opacity-80" />
                        </a>
                      )}
                    </div>
                                        <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors group/loc"
                    >
                      <MapPin size={14} className="text-emerald-500 group-hover/loc:scale-125 transition-all" />
                      <span className="truncate max-w-[150px]">{task.location}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-blue-500" />
                      <span>{task.date} • {task.time}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Description & Meds (Compact) */}
                <div className="flex-1 min-w-0 flex flex-col gap-3">
                  {task.description && (
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[11px] text-slate-600 italic line-clamp-1 group-hover:line-clamp-none transition-all cursor-default">
                        "{task.description}"
                      </p>
                    </div>
                  )}

                  {task.medications?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {task.medications.slice(0, 3).map((med: any, midx: number) => (
                        <div key={midx} className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase flex items-center gap-1.5 ${med.status === "Completed" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-white border-slate-200 text-slate-500"}`}>
                          <Pill size={8} /> {med.name}
                        </div>
                      ))}
                      {task.medications.length > 3 && (
                        <span className="text-[9px] font-bold text-slate-400">+{task.medications.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Side: Actions & Assignee */}
                <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end gap-4 min-w-[200px]">
                  {!isStaff && (
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest text-right">
                      Assigned to: <span className="text-slate-500 font-black">{task.assignedToName}</span>
                    </div>
                  )}
                  {task.completedAt && (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[9px] font-black uppercase">
                      <CheckCircle size={12} /> Done on {new Date(task.completedAt).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isStaff && task.status !== "Completed" && (
                      <>
                        <button
                          onClick={() => handleMarkComplete(task.id, task.status)}
                          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 text-white ${
                            task.status === "Pending" ? "bg-blue-500 hover:bg-blue-600" : "bg-emerald-500 hover:bg-emerald-600"
                          }`}
                        >
                          <CheckCheck size={14} /> {task.status === "Pending" ? "Start" : "Finish"}
                        </button>
                        
                        {task.status === "In Progress" && (
                          <button
                            onClick={() => {
                              setSelectedTask(task);
                              setNoteModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-white border border-primary text-primary hover:bg-primary/5 transition-all"
                            title="Log Vitals"
                          >
                            <HeartPulse size={14} />
                          </button>
                        )}
                      </>
                    )}
                    {(isAdmin || isSubAdmin) && task.status !== "Completed" && (
                      <button
                        onClick={() => updateTaskStatus(task.id, "Completed")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-sm"
                      >
                        <CheckCheck size={14} /> Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
          })
        )}
      </div>

      {/* Assign Task Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Assign New Task</h2>
                  <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    placeholder="Task Title *"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                  />
                  <textarea
                    placeholder="Description / Instructions"
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary resize-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="Patient Name *"
                      value={form.patient}
                      onChange={(e) => setForm({ ...form, patient: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      placeholder="Patient Phone"
                      value={form.patientPhone || ""}
                      onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      placeholder="Location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      placeholder="Patient Email (Optional)"
                      value={form.patientEmail || ""}
                      onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <select
                      value={form.assignedTo}
                      onChange={(e) => {
                        const staff = staffList.find((s) => s.email === e.target.value);
                        setForm({ ...form, assignedTo: e.target.value, assignedToName: staff?.name || "" });
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                    >
                      {staffList.map((s) => (
                        <option key={s.email} value={s.email}>{s.name}</option>
                      ))}
                    </select>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                    >
                      <option>High</option>
                      <option>Normal</option>
                      <option>Low</option>
                    </select>
                  </div>

                  {/* Medications Input */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Pill size={12} /> Medications (Optional)
                      </h4>
                      <button 
                        type="button"
                        onClick={() => setForm({ ...form, medications: [...form.medications, { name: "", time: "", status: "Pending" }] })}
                        className="text-[10px] font-black text-primary uppercase hover:underline flex items-center gap-1"
                      >
                        <Plus size={10} /> Add Med
                      </button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                      {form.medications.map((med: any, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            placeholder="Med Name"
                            value={med.name}
                            onChange={(e) => {
                              const newMeds = [...form.medications];
                              newMeds[idx].name = e.target.value;
                              setForm({ ...form, medications: newMeds });
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                          />
                          <input
                            placeholder="Time"
                            value={med.time}
                            onChange={(e) => {
                              const newMeds = [...form.medications];
                              newMeds[idx].time = e.target.value;
                              setForm({ ...form, medications: newMeds });
                            }}
                            className="w-24 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const newMeds = form.medications.filter((_: any, i: number) => i !== idx);
                              setForm({ ...form, medications: newMeds });
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleAssign} className="flex-1 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark">Assign Task</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {selectedTask && (
        <ClinicalNoteModal
          task={selectedTask}
          isOpen={noteModalOpen}
          onClose={() => {
            setNoteModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={() => {
          if (taskToDelete) {
            deleteTask(taskToDelete);
          }
        }}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete Now"
      />
    </div>
  );
}
