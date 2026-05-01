"use client";

import {
  createContext, useContext, useState, useEffect, ReactNode, useCallback,
} from "react";
import { Task, AttendanceRecord, SalaryRecord, Vendor, LeaveRequest, ClinicalNote, Rating, Equipment, IncidentReport } from "@/types/dashboard";

interface DashboardContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTaskStatus: (id: string, status: Task["status"]) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;

  attendance: AttendanceRecord[];
  markAttendance: (record: Omit<AttendanceRecord, "id">) => Promise<void>;

  salaries: SalaryRecord[];
  addSalary: (sal: Omit<SalaryRecord, "id">) => Promise<void>;
  updateSalaryStatus: (id: string, status: SalaryRecord["status"]) => Promise<void>;

  vendors: Vendor[];
  addVendor: (v: Omit<Vendor, "id">) => Promise<void>;
  updateVendor: (id: string, v: Partial<Vendor>) => Promise<void>;
  deleteVendor: (id: string) => Promise<void>;

  leaves: LeaveRequest[];
  addLeave: (l: Omit<LeaveRequest, "id" | "status" | "appliedAt">) => Promise<void>;
  subAdminApproveLeave: (id: string, decision: "Approved" | "Rejected", note?: string) => Promise<void>;
  adminApproveLeave: (id: string, decision: "Approved" | "Rejected", note?: string) => Promise<void>;
  
  clinicalNotes: ClinicalNote[];
  addClinicalNote: (note: Omit<ClinicalNote, "id">) => Promise<void>;
  updateClinicalNote: (id: string, updates: Partial<ClinicalNote>) => Promise<void>;
  deleteClinicalNote: (id: string) => Promise<void>;

  incidents: IncidentReport[];
  activeSOS: IncidentReport[];
  addIncident: (incident: Omit<IncidentReport, "id">) => Promise<void>;
  updateIncidentStatus: (id: string, status: IncidentReport["status"]) => Promise<void>;

  equipment: Equipment[];
  addEquipment: (item: Omit<Equipment, "id">) => Promise<void>;
  updateEquipment: (id: string, updates: Partial<Equipment>) => Promise<void>;

  ratings: Rating[];
  addRating: (rating: Omit<Rating, "id">) => Promise<void>;
  
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSOS, setActiveSOS] = useState<IncidentReport[]>([]);

  const refreshData = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const [tRes, aRes, sRes, vRes, lRes, cnRes, iRes, eRes, rRes] = await Promise.all([
        fetch("/api/dashboard/tasks"),
        fetch("/api/dashboard/attendance"),
        fetch("/api/dashboard/salaries"),
        fetch("/api/dashboard/vendors"),
        fetch("/api/dashboard/leaves"),
        fetch("/api/dashboard/clinical-notes"),
        fetch("/api/dashboard/incidents"),
        fetch("/api/dashboard/equipment"),
        fetch("/api/dashboard/ratings"),
      ]);

      const [tData, aData, sData, vData, lData, cnData, iData, eData, rData] = await Promise.all([
        tRes.json(), aRes.json(), sRes.json(), vRes.json(), lRes.json(), cnRes.json(), iRes.json(), eRes.json(), rRes.json()
      ]);

      const mapId = (arr: any[]) => arr.map(i => ({ ...i, id: i.id || i._id }));

      setTasks(Array.isArray(tData) ? mapId(tData) : []);
      setAttendance(Array.isArray(aData) ? mapId(aData) : []);
      setSalaries(Array.isArray(sData) ? mapId(sData) : []);
      setVendors(Array.isArray(vData) ? mapId(vData) : []);
      setLeaves(Array.isArray(lData) ? mapId(lData) : []);
      setClinicalNotes(Array.isArray(cnData) ? mapId(cnData) : []);
      setIncidents(Array.isArray(iData) ? mapId(iData) : []);
      setEquipment(Array.isArray(eData) ? mapId(eData) : []);
      setRatings(Array.isArray(rData) ? mapId(rData) : []);

      // Check for active SOS alerts
      const sos = (Array.isArray(iData) ? mapId(iData) : [])
        .filter((inc: IncidentReport) => inc.severity === "Critical" && inc.status === "Reported");
      setActiveSOS(sos);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Tasks
  const addTask = useCallback(async (task: Omit<Task, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setTasks(prev => [{ ...task, id: tempId, createdAt: new Date().toISOString() } as Task, ...prev]);
    const res = await fetch("/api/dashboard/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    refreshData(true);
  }, [refreshData]);

  const updateTaskStatus = useCallback(async (id: string, status: Task["status"], updates?: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status, ...updates, ...(status === "Completed" ? { completedAt: new Date().toISOString() } : {}) } : t));
    const res = await fetch("/api/dashboard/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, ...updates, ...(status === "Completed" ? { completedAt: new Date().toISOString() } : {}) }),
    });
    refreshData(true);
  }, [refreshData]);

  const deleteTask = useCallback(async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    const res = await fetch(`/api/dashboard/tasks?id=${id}`, {
      method: "DELETE",
    });
    refreshData(true);
  }, [refreshData]);

  // Attendance
  const markAttendance = useCallback(async (record: Omit<AttendanceRecord, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setAttendance(prev => [{ ...record, id: tempId, markedAt: new Date().toISOString() } as AttendanceRecord, ...prev]);
    const res = await fetch("/api/dashboard/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    refreshData(true);
  }, [refreshData]);

  // Salaries
  const addSalary = useCallback(async (sal: Omit<SalaryRecord, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setSalaries(prev => [{ ...sal, id: tempId } as SalaryRecord, ...prev]);
    const res = await fetch("/api/dashboard/salaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sal),
    });
    refreshData(true);
  }, [refreshData]);

  const updateSalaryStatus = useCallback(async (id: string, status: SalaryRecord["status"]) => {
    setSalaries(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    const res = await fetch("/api/dashboard/salaries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    refreshData(true);
  }, [refreshData]);

  // Vendors
  const addVendor = useCallback(async (v: Omit<Vendor, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setVendors(prev => [{ ...v, id: tempId } as Vendor, ...prev]);
    const res = await fetch("/api/dashboard/vendors", {
      method: "POST",
      body: JSON.stringify(v),
    });
    refreshData(true);
  }, [refreshData]);

  const updateVendor = useCallback(async (id: string, v: Partial<Vendor>) => {
    setVendors(prev => prev.map(vendor => vendor.id === id ? { ...vendor, ...v } : vendor));
    const res = await fetch("/api/dashboard/vendors", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...v }),
    });
    refreshData(true);
  }, [refreshData]);

  const deleteVendor = useCallback(async (id: string) => {
    setVendors(prev => prev.filter(v => v.id !== id));
    const res = await fetch(`/api/dashboard/vendors?id=${id}`, {
      method: "DELETE",
    });
    refreshData(true);
  }, [refreshData]);

  // Leaves
  const addLeave = useCallback(async (l: Omit<LeaveRequest, "id" | "status" | "appliedAt">) => {
    const tempId = `temp-${Date.now()}`;
    setLeaves(prev => [{ ...l, id: tempId, status: "Pending", appliedAt: new Date().toISOString() } as LeaveRequest, ...prev]);
    const res = await fetch("/api/dashboard/leaves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(l),
    });
    refreshData(true);
  }, [refreshData]);

  const subAdminApproveLeave = useCallback(async (id: string, decision: "Approved" | "Rejected", note?: string) => {
    const newStatus: LeaveRequest["status"] = decision === "Approved" ? "Sub-Admin Approved" : "Rejected";
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus, subAdminApproval: decision, subAdminNote: note } : l));
    const res = await fetch("/api/dashboard/leaves", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, subAdminApproval: decision, subAdminNote: note, status: newStatus }),
    });
    refreshData(true);
  }, [refreshData]);

  const adminApproveLeave = useCallback(async (id: string, decision: "Approved" | "Rejected", note?: string) => {
    const newStatus: LeaveRequest["status"] = decision === "Approved" ? "Approved" : "Rejected";
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus, adminApproval: decision, adminNote: note } : l));
    const res = await fetch("/api/dashboard/leaves", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, adminApproval: decision, adminNote: note, status: newStatus }),
    });
    refreshData(true);
  }, [refreshData]);

  // Clinical Notes
  const addClinicalNote = useCallback(async (note: Omit<ClinicalNote, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setClinicalNotes(prev => [{ ...note, id: tempId, loggedAt: new Date().toISOString() } as ClinicalNote, ...prev]);
    const res = await fetch("/api/dashboard/clinical-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    refreshData(true);
  }, [refreshData]);

  const updateClinicalNote = useCallback(async (id: string, updates: Partial<ClinicalNote>) => {
    setClinicalNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    const res = await fetch("/api/dashboard/clinical-notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    refreshData(true);
  }, [refreshData]);

  const deleteClinicalNote = useCallback(async (id: string) => {
    setClinicalNotes(prev => prev.filter(n => n.id !== id));
    const res = await fetch(`/api/dashboard/clinical-notes?id=${id}`, {
      method: "DELETE",
    });
    refreshData(true);
  }, [refreshData]);

  // Incidents
  const addIncident = useCallback(async (incident: Omit<IncidentReport, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setIncidents(prev => [{ ...incident, id: tempId, reportedAt: new Date().toISOString() } as IncidentReport, ...prev]);
    if (incident.severity === "Critical" && incident.status === "Reported") {
      setActiveSOS(prev => [{ ...incident, id: tempId, reportedAt: new Date().toISOString() } as IncidentReport, ...prev]);
    }
    const res = await fetch("/api/dashboard/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incident),
    });
    refreshData(true);
  }, [refreshData]);

  const updateIncidentStatus = useCallback(async (id: string, status: IncidentReport["status"]) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    setActiveSOS(prev => prev.filter(i => i.id !== id || (status === "Reported" && i.severity === "Critical")));
    const res = await fetch("/api/dashboard/incidents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    refreshData(true);
  }, [refreshData]);

  // Equipment
  const addEquipment = useCallback(async (item: Omit<Equipment, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setEquipment(prev => [{ ...item, id: tempId } as Equipment, ...prev]);
    const res = await fetch("/api/dashboard/equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    refreshData(true);
  }, [refreshData]);

  const updateEquipment = useCallback(async (id: string, updates: Partial<Equipment>) => {
    setEquipment(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    const res = await fetch("/api/dashboard/equipment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    refreshData(true);
  }, [refreshData]);

  // Ratings
  const addRating = useCallback(async (rating: Omit<Rating, "id">) => {
    const tempId = `temp-${Date.now()}`;
    setRatings(prev => [{ ...rating, id: tempId, date: new Date().toISOString() } as Rating, ...prev]);
    const res = await fetch("/api/dashboard/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    });
    refreshData(true);
  }, [refreshData]);

  // Auto-polling for real-time updates (Every 5 seconds)
  useEffect(() => {
    refreshData(); // Initial load (with spinner)
    
    const interval = setInterval(() => {
      refreshData(true); // Silent background refresh
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshData]);

  return (
    <DashboardContext.Provider value={{
      tasks, addTask, updateTaskStatus, deleteTask,
      attendance, markAttendance,
      salaries, addSalary, updateSalaryStatus,
      vendors, addVendor, updateVendor, deleteVendor,
      leaves, addLeave, subAdminApproveLeave, adminApproveLeave,
      clinicalNotes, addClinicalNote, updateClinicalNote, deleteClinicalNote,
      incidents, activeSOS, addIncident, updateIncidentStatus,
      equipment, addEquipment, updateEquipment,
      ratings, addRating,
      isLoading, refreshData,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}
