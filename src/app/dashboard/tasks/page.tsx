"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { Task } from "@/types/dashboard";
import { getLocalDateString } from "@/lib/dateUtils";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Clock, AlertCircle, MapPin, User,
  Plus, X, CheckCheck, ClipboardList, ArrowRight, Shield,
} from "lucide-react";


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
  location: "",
  time: "",
  date: getLocalDateString(),
  assignedTo: "",
  assignedToName: "",
  priority: "Normal" as Task["priority"],
  status: "Pending" as Task["status"],
};

export default function TasksPage() {
  const { currentUser } = useAuth();
  const { tasks, addTask, updateTaskStatus } = useDashboard();
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
  const [form, setForm] = useState(emptyTask);
  const [filterStatus, setFilterStatus] = useState<string>("All");

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
        {filtered.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No tasks found in this category</p>
          </div>
        )}
        {filtered.map((task, i) => {
          const sc = statusConfig[task.status];
          const StatusIcon = sc.icon;
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${sc.style}`}>
                      <StatusIcon size={12} /> {sc.label}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${priorityStyle[task.priority]}`}>
                      {task.priority} Priority
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {task.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <User size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Patient</p>
                        <p className="text-sm font-bold text-slate-700">{task.patient}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <MapPin size={14} className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Location</p>
                        <p className="text-sm font-bold text-slate-700">{task.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <Clock size={14} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Scheduled</p>
                        <p className="text-sm font-bold text-slate-700">{task.date} • {task.time}</p>
                      </div>
                    </div>
                  </div>

                  {task.description && (
                    <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                      "{task.description}"
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      {!isStaff && (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield size={10} className="text-primary" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Assigned to: <span className="text-slate-600">{task.assignedToName}</span>
                          </span>
                        </div>
                      )}
                    </div>
                    {task.completedAt && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Completed on {new Date(task.completedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0 flex flex-col gap-3">
                  {isStaff && task.status !== "Completed" && (
                    <button
                      onClick={() => handleMarkComplete(task.id, task.status)}
                      className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                        task.status === "Pending"
                          ? "bg-blue-500 text-white shadow-blue-500/20 hover:bg-blue-600"
                          : "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600"
                      }`}
                    >
                      <CheckCheck size={18} />
                      {task.status === "Pending" ? "Start Task" : "Finish Task"}
                    </button>
                  )}
                  {(isAdmin || isSubAdmin) && task.status !== "Completed" && (
                    <button
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                      className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-800 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-800/10 hover:bg-slate-900 active:scale-95"
                    >
                      <CheckCheck size={18} /> Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
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
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                    <input
                      placeholder="Location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
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
    </div>
  );
}
