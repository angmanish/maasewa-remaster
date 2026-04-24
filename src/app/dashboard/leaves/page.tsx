"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { LeaveRequest } from "@/types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, CheckCircle, XCircle, Clock, AlertCircle,
  CalendarDays, FileText, ChevronDown, ChevronUp, Shield, ArrowRight,
} from "lucide-react";

const LEAVE_TYPES: LeaveRequest["type"][] = ["Sick Leave", "Casual Leave", "Emergency", "Other"];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  Pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
  "Sub-Admin Approved": { label: "Awaiting Admin", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  Approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  Rejected: { label: "Rejected", color: "bg-rose-100 text-rose-700", icon: XCircle },
};

const emptyForm = {
  fromDate: "",
  toDate: "",
  reason: "",
  type: "Sick Leave" as LeaveRequest["type"],
};

export default function LeavesPage() {
  const { currentUser } = useAuth();
  const { leaves, addLeave, subAdminApproveLeave, adminApproveLeave } = useDashboard();

  const isAdmin = currentUser?.role === "ADMIN";
  const isSubAdmin = currentUser?.role === "SUB_ADMIN";
  const isStaff = currentUser?.role === "STAFF";

  const [applyOpen, setApplyOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");

  // Which leaves to show
  const visibleLeaves = isStaff
    ? leaves.filter((l) => l.staffEmail === currentUser?.email)
    : isSubAdmin
    ? leaves // can see all, act on Pending ones
    : leaves; // Admin sees all, acts on Sub-Admin Approved

  const handleApply = () => {
    if (!form.fromDate || !form.toDate || !form.reason) return;
    addLeave({
      staffEmail: currentUser?.email || "",
      staffName: currentUser?.name || "",
      ...form,
    });
    setApplyOpen(false);
    setForm(emptyForm);
  };

  const handleSubAdminAction = (id: string, decision: "Approved" | "Rejected") => {
    subAdminApproveLeave(id, decision, noteInput);
    setNoteInput("");
    setExpandedId(null);
  };

  const handleAdminAction = (id: string, decision: "Approved" | "Rejected") => {
    adminApproveLeave(id, decision, noteInput);
    setNoteInput("");
    setExpandedId(null);
  };

  const pendingForSubAdmin = visibleLeaves.filter((l) => l.status === "Pending");
  const pendingForAdmin = visibleLeaves.filter((l) => l.status === "Sub-Admin Approved");

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            {isStaff ? "Leave Requests" : "Leave Approvals"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isStaff
              ? "Apply for leave and track approval status."
              : isSubAdmin
              ? "Review and approve staff leave requests (first level)."
              : "Final approval for leave requests (second level)."}
          </p>
        </div>
        {isStaff && (
          <button
            onClick={() => setApplyOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg flex-shrink-0"
          >
            <Plus size={16} /> Apply for Leave
          </button>
        )}
      </div>

      {/* Pending Action Banners */}
      {isSubAdmin && pendingForSubAdmin.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-6 rounded-3xl bg-amber-50 border border-amber-100 text-amber-800 shadow-sm flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-200/50 flex items-center justify-center flex-shrink-0 text-amber-700">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest mb-0.5">Pending Action</p>
              <p className="text-sm opacity-80 font-bold">You have {pendingForSubAdmin.length} staff leave request{pendingForSubAdmin.length > 1 ? "s" : ""} waiting for your review.</p>
            </div>
          </div>
          <button onClick={() => setExpandedId(pendingForSubAdmin[0].id)} className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-200/50 hover:bg-amber-200 transition-colors text-xs font-black uppercase tracking-widest">
            Review Now
          </button>
        </motion.div>
      )}

      {isAdmin && pendingForAdmin.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-6 rounded-3xl bg-blue-50 border border-blue-100 text-blue-800 shadow-sm flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-200/50 flex items-center justify-center flex-shrink-0 text-blue-700">
              <Shield size={24} />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest mb-0.5">Final Approval Needed</p>
              <p className="text-sm opacity-80 font-bold">{pendingForAdmin.length} request{pendingForAdmin.length > 1 ? "s" : ""} approved by Sub-Admin and awaiting your final sign-off.</p>
            </div>
          </div>
          <button onClick={() => setExpandedId(pendingForAdmin[0].id)} className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-200/50 hover:bg-blue-200 transition-colors text-xs font-black uppercase tracking-widest">
            Approve All
          </button>
        </motion.div>
      )}

      {/* Leave Cards */}
      <div className="space-y-6">
        {visibleLeaves.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No leave requests found</p>
          </div>
        )}
        {visibleLeaves.map((leave, i) => {
          const sc = statusConfig[leave.status];
          const StatusIcon = sc.icon;
          const isExpanded = expandedId === leave.id;

          const subAdminCanAct = isSubAdmin && leave.status === "Pending";
          const adminCanAct = isAdmin && leave.status === "Sub-Admin Approved";

          return (
            <motion.div
              key={leave.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${sc.color}`}>
                        <StatusIcon size={12} /> {sc.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        {leave.type}
                      </span>
                    </div>
                    
                    {!isStaff && (
                      <h3 className="text-2xl font-black text-slate-800 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {leave.staffName}
                      </h3>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-600 mb-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
                        <CalendarDays size={16} className="text-primary" />
                        {leave.fromDate}
                      </div>
                      <ArrowRight size={14} className="text-slate-300 hidden sm:block" />
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
                        <CalendarDays size={16} className="text-primary" />
                        {leave.toDate}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm text-slate-500 leading-relaxed italic">
                      "{leave.reason}"
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 flex-shrink-0">
                    {(subAdminCanAct || adminCanAct) && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : leave.id)}
                        className={`flex items-center justify-center gap-2 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isExpanded ? "bg-slate-800 text-white" : "bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5"}`}
                      >
                        {isExpanded ? "Close Panel" : "Review Request"}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Approval trail with visual hierarchy */}
                {(leave.subAdminApproval || leave.adminApproval) && (
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Approval Trail</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {leave.subAdminApproval && (
                        <div className={`p-4 rounded-2xl border ${leave.subAdminApproval === "Approved" ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${leave.subAdminApproval === "Approved" ? "text-emerald-700" : "text-rose-700"}`}>
                              Sub-Admin {leave.subAdminApproval}
                            </span>
                          </div>
                          {leave.subAdminNote && <p className="text-xs text-slate-500 font-medium">"{leave.subAdminNote}"</p>}
                        </div>
                      )}
                      {leave.adminApproval && (
                        <div className={`p-4 rounded-2xl border ${leave.adminApproval === "Approved" ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${leave.adminApproval === "Approved" ? "text-emerald-700" : "text-rose-700"}`}>
                              Admin {leave.adminApproval}
                            </span>
                          </div>
                          {leave.adminNote && <p className="text-xs text-slate-500 font-medium">"{leave.adminNote}"</p>}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Expandable Action Panel */}
              <AnimatePresence>
                {isExpanded && (subAdminCanAct || adminCanAct) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-100"
                  >
                    <div className="px-5 py-4 bg-slate-50 space-y-3">
                      <input
                        placeholder="Add a note (optional)"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => subAdminCanAct ? handleSubAdminAction(leave.id, "Rejected") : handleAdminAction(leave.id, "Rejected")}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold hover:bg-rose-100 transition-colors"
                        >
                          <XCircle size={15} /> Reject
                        </button>
                        <button
                          onClick={() => subAdminCanAct ? handleSubAdminAction(leave.id, "Approved") : handleAdminAction(leave.id, "Approved")}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
                        >
                          <CheckCircle size={15} /> Approve
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Apply Leave Modal */}
      <AnimatePresence>
        {applyOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setApplyOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Apply for Leave</h2>
                  <button onClick={() => setApplyOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Leave Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as LeaveRequest["type"] })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                    >
                      {LEAVE_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">From Date</label>
                      <input
                        type="date"
                        value={form.fromDate}
                        onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">To Date</label>
                      <input
                        type="date"
                        value={form.toDate}
                        onChange={(e) => setForm({ ...form, toDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reason *</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the reason for your leave..."
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setApplyOpen(false)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleApply} className="flex-1 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark">Submit Request</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
