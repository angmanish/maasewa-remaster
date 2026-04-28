"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { SalaryRecord } from "@/types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, CheckCircle, DollarSign, TrendingUp, Minus, Clock, Users, AlertCircle, Loader2 } from "lucide-react";
import { getLocalDateString } from "@/lib/dateUtils";


const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2025, i, 1);
  return { value: `2025-${String(i + 1).padStart(2, "0")}`, label: d.toLocaleString("default", { month: "long", year: "numeric" }) };
});

const emptyForm = {
  staffEmail: "staff@maasewa.com",
  month: "2025-04",
  baseSalary: 18000,
  bonus: 0,
  allowances: {
    travel: 0,
    overtime: 0,
    other: 0,
  },
  deductions: 0,
  advanceDeduction: 0,
};

export default function SalaryPage() {
  const { currentUser } = useAuth();
  const { salaries, addSalary, updateSalaryStatus, refreshData } = useDashboard();
  const [staffList, setStaffList] = useState<{ email: string; name: string }[]>([]);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        const staffOnly = data.filter((u: any) => u.role === "STAFF");
        setStaffList(staffOnly);
        if (staffOnly.length > 0) {
          setForm(prev => ({ ...prev, staffEmail: staffOnly[0].email }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const isAdmin = currentUser?.role === "ADMIN";
  const isStaff = currentUser?.role === "STAFF";

  const [modalOpen, setModalOpen] = useState(false);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [filterStaff, setFilterStaff] = useState("all");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [advanceReason, setAdvanceReason] = useState("");
  const [advanceLoading, setAdvanceLoading] = useState(false);

  const handleAdvanceRequest = async () => {
    if (!advanceAmount) return;
    setAdvanceLoading(true);
    try {
      // Find current salary record for this month
      const currentMonth = new Date().toISOString().substring(0, 7);
      const sal = salaries.find(s => s.staffEmail === currentUser?.email && s.month === currentMonth);
      
      if (sal) {
        const res = await fetch("/api/dashboard/salaries", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: sal.id,
            advanceRequest: {
              amount: Number(advanceAmount),
              reason: advanceReason,
              status: "Pending",
              requestedAt: new Date().toISOString()
            }
          })
        });
        if (res.ok) {
          setAdvanceModalOpen(false);
          setAdvanceAmount("");
          setAdvanceReason("");
          refreshData();
        }
      } else {
        alert("Salary record for this month not found. Please wait for Admin to generate it.");
      }
    } catch (error) {
      console.error("Advance request failed:", error);
    } finally {
      setAdvanceLoading(false);
    }
  };

  const visibleSalaries = isStaff
    ? salaries.filter((s) => s.staffEmail === currentUser?.email)
    : filterStaff === "all"
    ? salaries
    : salaries.filter((s) => s.staffEmail === filterStaff);

  const staffForForm = staffList.find((s) => s.email === form.staffEmail);
  const net = form.baseSalary + form.bonus + form.allowances.travel + form.allowances.overtime + form.allowances.other - form.deductions - form.advanceDeduction;

  const handleGenerate = () => {
    const alreadyExists = salaries.some(
      (s) => s.staffEmail === form.staffEmail && s.month === form.month
    );
    if (alreadyExists) {
      alert("Salary for this staff member and month already exists.");
      return;
    }
    addSalary({
      staffEmail: form.staffEmail,
      staffName: staffForForm?.name || form.staffEmail,
      month: form.month,
      baseSalary: Number(form.baseSalary),
      bonus: Number(form.bonus),
      allowances: form.allowances,
      deductions: Number(form.deductions),
      advanceDeduction: Number(form.advanceDeduction),
      netSalary: Number(net),
      status: "Generated",
      generatedAt: getLocalDateString(),
      generatedBy: currentUser?.email || "",
    });
    setModalOpen(false);
    setForm(emptyForm);
  };

  // Total stats
  const totalPaid = visibleSalaries.filter((s) => s.status === "Paid").reduce((a, s) => a + s.netSalary, 0);
  const totalPending = visibleSalaries.filter((s) => s.status === "Generated").reduce((a, s) => a + s.netSalary, 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            {isStaff ? "My Salary" : "Salary Management"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isStaff ? "View your salary slips and payment status." : "Generate and manage staff salaries."}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg flex-shrink-0"
          >
            <Plus size={16} /> Generate Salary
          </button>
        )}
        {isStaff && (
          <button
            onClick={() => setAdvanceModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all shadow-lg active:scale-95 flex-shrink-0"
          >
            <DollarSign size={16} /> Request Advance
          </button>
        )}
      </div>

      {/* Summary Cards */}
      {!isStaff && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Records", value: visibleSalaries.length, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Paid", value: `₹${totalPaid.toLocaleString()}`, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Pending Payout", value: `₹${totalPending.toLocaleString()}`, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex items-center gap-4 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <c.icon size={24} className={c.color} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>{c.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter (Admin only) */}
      {isAdmin && (
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            <Users size={18} />
          </div>
          <select
            value={filterStaff}
            onChange={(e) => setFilterStaff(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary bg-white shadow-sm"
          >
            <option value="all">All Staff Members</option>
            {staffList.map((s) => <option key={s.email} value={s.email}>{s.name}</option>)}
          </select>
        </div>
      )}

      {/* Salary Records */}
      <div className="space-y-6">
        {visibleSalaries.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No salary records found</p>
          </div>
        )}
        {visibleSalaries.map((sal, i) => {
          const monthLabel = new Date(sal.month + "-01").toLocaleString("default", { month: "long", year: "numeric" });
          return (
            <motion.div
              key={sal.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${sal.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {sal.status}
                    </span>
                    {!isStaff && (
                      <span className="text-xs text-slate-400 font-black uppercase tracking-widest">{sal.staffName}</span>
                    )}
                  </div>
                  <h3 className="font-black text-slate-800 text-xl md:text-2xl mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {monthLabel}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: "Base", value: `₹${sal.baseSalary.toLocaleString()}`, color: "text-slate-700", bg: "bg-slate-50" },
                      { label: "Bonus", value: `+₹${sal.bonus.toLocaleString()}`, color: "text-emerald-600", bg: "bg-emerald-50/50" },
                      { label: "Allowances", value: `+₹${(sal.allowances?.travel + sal.allowances?.overtime + sal.allowances?.other).toLocaleString()}`, color: "text-blue-600", bg: "bg-blue-50/50" },
                      { label: "Deductions", value: `-₹${(sal.deductions + (sal.advanceDeduction || 0)).toLocaleString()}`, color: "text-rose-500", bg: "bg-rose-50/50" },
                      { label: "Net Pay", value: `₹${sal.netSalary.toLocaleString()}`, color: "text-primary", bg: "bg-primary/5" },
                    ].map((item) => (
                      <div key={item.label} className={`${item.bg} rounded-2xl p-4 border border-slate-100/50`}>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{item.label}</p>
                        <p className={`text-sm md:text-base font-black ${item.color}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <Clock size={12} /> Generated on {sal.generatedAt}
                    </div>
                    {sal.status === "Paid" && (
                      <button className="flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest hover:underline">
                        <TrendingUp size={12} /> Download Payslip
                      </button>
                    )}
                  </div>
                </div>
                {isAdmin && sal.status === "Generated" && (
                  <button
                    onClick={() => updateSalaryStatus(sal.id, "Paid")}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-white text-sm font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    <CheckCircle size={18} /> Mark as Paid
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Generate Salary Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Generate Salary</h2>
                  <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Staff Member</label>
                    <select
                      value={form.staffEmail}
                      onChange={(e) => setForm({ ...form, staffEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                    >
                      {staffList.map((s) => <option key={s.email} value={s.email}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Month</label>
                    <select
                      value={form.month}
                      onChange={(e) => setForm({ ...form, month: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                    >
                      {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(["baseSalary", "bonus", "deductions"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1 capitalize">
                          {field === "baseSalary" ? "Base (₹)" : field === "bonus" ? "Bonus (₹)" : "Deductions (₹)"}
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Net Preview */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Net Salary</span>
                    <span className="text-xl font-extrabold text-primary" style={{ fontFamily: "var(--font-jakarta)" }}>
                      ₹{net.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleGenerate} className="flex-1 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark">Generate</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Advance Request Modal */}
      <AnimatePresence>
        {advanceModalOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAdvanceModalOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <DollarSign size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Request Advance</h2>
                  </div>
                  <button onClick={() => setAdvanceModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Request Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={advanceAmount}
                      onChange={(e) => setAdvanceAmount(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-black text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reason for Request</label>
                    <textarea
                      placeholder="Medical, family emergency, etc."
                      rows={3}
                      value={advanceReason}
                      onChange={(e) => setAdvanceReason(e.target.value)}
                      className="w-full p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
                    <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
                      Advance requests are subject to approval by Admin. Approved amounts will be deducted from your next month's salary.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setAdvanceModalOpen(false)} className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">Cancel</button>
                  <button 
                    disabled={advanceLoading || !advanceAmount}
                    onClick={handleAdvanceRequest}
                    className="flex-1 py-4 rounded-2xl bg-primary text-white text-xs font-black hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {advanceLoading ? <Loader2 className="animate-spin" size={16} /> : "Submit Request"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
