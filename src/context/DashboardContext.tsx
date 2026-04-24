"use client";

import {
  createContext, useContext, useState, useEffect, ReactNode, useCallback,
} from "react";
import { Task, AttendanceRecord, SalaryRecord, Vendor, LeaveRequest } from "@/types/dashboard";

interface DashboardContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTaskStatus: (id: string, status: Task["status"]) => Promise<void>;

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
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [tRes, aRes, sRes, vRes, lRes] = await Promise.all([
        fetch("/api/dashboard/tasks"),
        fetch("/api/dashboard/attendance"),
        fetch("/api/dashboard/salaries"),
        fetch("/api/dashboard/vendors"),
        fetch("/api/dashboard/leaves"),
      ]);

      const [tData, aData, sData, vData, lData] = await Promise.all([
        tRes.json(), aRes.json(), sRes.json(), vRes.json(), lRes.json()
      ]);

      setTasks(Array.isArray(tData) ? tData : []);
      setAttendance(Array.isArray(aData) ? aData : []);
      setSalaries(Array.isArray(sData) ? sData : []);
      setVendors(Array.isArray(vData) ? vData : []);
      setLeaves(Array.isArray(lData) ? lData : []);
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
    const res = await fetch("/api/dashboard/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  const updateTaskStatus = useCallback(async (id: string, status: Task["status"]) => {
    const res = await fetch("/api/dashboard/tasks", {
      method: "PUT",
      body: JSON.stringify({ id, status, ...(status === "Completed" ? { completedAt: new Date().toISOString() } : {}) }),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  // Attendance
  const markAttendance = useCallback(async (record: Omit<AttendanceRecord, "id">) => {
    const res = await fetch("/api/dashboard/attendance", {
      method: "POST",
      body: JSON.stringify(record),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  // Salaries
  const addSalary = useCallback(async (sal: Omit<SalaryRecord, "id">) => {
    const res = await fetch("/api/dashboard/salaries", {
      method: "POST",
      body: JSON.stringify(sal),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  const updateSalaryStatus = useCallback(async (id: string, status: SalaryRecord["status"]) => {
    const res = await fetch("/api/dashboard/salaries", {
      method: "PUT",
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  // Vendors
  const addVendor = useCallback(async (v: Omit<Vendor, "id">) => {
    const res = await fetch("/api/dashboard/vendors", {
      method: "POST",
      body: JSON.stringify(v),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  const updateVendor = useCallback(async (id: string, v: Partial<Vendor>) => {
    const res = await fetch("/api/dashboard/vendors", {
      method: "PUT",
      body: JSON.stringify({ id, ...v }),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  const deleteVendor = useCallback(async (id: string) => {
    const res = await fetch(`/api/dashboard/vendors?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  // Leaves
  const addLeave = useCallback(async (l: Omit<LeaveRequest, "id" | "status" | "appliedAt">) => {
    const res = await fetch("/api/dashboard/leaves", {
      method: "POST",
      body: JSON.stringify(l),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  const subAdminApproveLeave = useCallback(async (id: string, decision: "Approved" | "Rejected", note?: string) => {
    const newStatus: LeaveRequest["status"] = decision === "Approved" ? "Sub-Admin Approved" : "Rejected";
    const res = await fetch("/api/dashboard/leaves", {
      method: "PUT",
      body: JSON.stringify({ id, subAdminApproval: decision, subAdminNote: note, status: newStatus }),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  const adminApproveLeave = useCallback(async (id: string, decision: "Approved" | "Rejected", note?: string) => {
    const res = await fetch("/api/dashboard/leaves", {
      method: "PUT",
      body: JSON.stringify({ id, adminApproval: decision, adminNote: note, status: decision === "Approved" ? "Approved" : "Rejected" }),
    });
    if (res.ok) refreshData();
  }, [refreshData]);

  return (
    <DashboardContext.Provider value={{
      tasks, addTask, updateTaskStatus,
      attendance, markAttendance,
      salaries, addSalary, updateSalaryStatus,
      vendors, addVendor, updateVendor, deleteVendor,
      leaves, addLeave, subAdminApproveLeave, adminApproveLeave,
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
