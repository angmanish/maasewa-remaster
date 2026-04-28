"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Package, Search, Plus, User, Calendar, ShieldCheck, AlertCircle, History, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";
import { useDashboard } from "@/context/DashboardContext";

export default function InventoryPage() {
  const { currentUser } = useAuth();
  const { equipment: items, isLoading, addEquipment, updateEquipment } = useDashboard();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staffList, setStaffList] = useState<{ email: string; name: string }[]>([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [assignee, setAssignee] = useState("");
  const [form, setForm] = useState({
    itemName: "",
    serialNumber: "",
    category: "Diagnostic",
  });

  const fetchStaff = async () => {
    setStaffLoading(true);
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      
      let assignable: any[] = [];
      if (Array.isArray(data)) {
        assignable = data.filter((u: any) => 
          u.role?.toUpperCase().trim() === "STAFF" || 
          u.role?.toUpperCase().trim() === "SUB_ADMIN"
        );
      }

      // If still empty, provide demo fallback
      if (assignable.length === 0) {
        assignable = [
          { name: "Maa Sewa Staff", email: "staff@maasewa.com" },
          { name: "SubAdmin User", email: "subadmin@maasewa.com" },
          { name: "Admin User", email: "admin@maasewa.com" }
        ];
      }
      setStaffList(assignable);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
      setStaffList([
        { name: "Demo Staff", email: "staff@maasewa.com" },
        { name: "Demo SubAdmin", email: "subadmin@maasewa.com" }
      ]);
    } finally {
      setStaffLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addEquipment({
        ...form,
        category: form.category as any,
        status: "Available",
      });
      setIsModalOpen(false);
      setForm({ itemName: "", serialNumber: "", category: "Diagnostic" });
    } catch (error) {
      console.error("Failed to add equipment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedItem || !assignee) return;
    setIsSubmitting(true);
    try {
      await updateEquipment(selectedItem.id, {
        status: assignee === "None" ? "Available" : "Assigned",
        assignedTo: assignee === "None" ? "" : assignee,
        lastAssignedAt: assignee === "None" ? "" : new Date().toISOString(),
      });
      setIsAssignModalOpen(false);
      setSelectedItem(null);
      setAssignee("");
    } catch (error) {
      console.error("Failed to assign equipment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = items.filter(i => 
    i.itemName.toLowerCase().includes(search.toLowerCase()) ||
    (i.serialNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Inventory Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1">Track and assign clinical equipment to medical staff.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          <Plus size={16} /> Add Equipment
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or serial number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 bg-white transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Available</p>
              <p className="text-sm font-black text-slate-700">{items.filter(i => i.status === "Available").length}</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Assigned</p>
              <p className="text-sm font-black text-slate-700">{items.filter(i => i.status === "Assigned").length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Equipment Item</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serial Number</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned To</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    <td className="px-6 py-5"><Skeleton className="w-32 h-4" /></td>
                    <td className="px-6 py-5"><Skeleton className="w-24 h-4" /></td>
                    <td className="px-6 py-5"><Skeleton className="w-20 h-6 rounded-lg" /></td>
                    <td className="px-6 py-5"><Skeleton className="w-28 h-4" /></td>
                    <td className="px-6 py-5"><Skeleton className="w-16 h-8 rounded-xl" /></td>
                  </tr>
                ))
              ) : !filtered || filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Package size={40} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold">No equipment found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id || item._id || idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-700">{item.itemName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs font-bold text-slate-500">{item.serialNumber || "—"}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        item.status === "Available" ? "bg-emerald-50 text-emerald-600" :
                        item.status === "Assigned" ? "bg-blue-50 text-blue-600" :
                        "bg-rose-50 text-rose-600"
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${
                          item.status === "Available" ? "bg-emerald-600" :
                          item.status === "Assigned" ? "bg-blue-600" :
                          "bg-rose-600"
                        }`} />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {item.assignedTo && item.assignedTo !== "" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <User size={12} />
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            {staffList.find(s => s.email === item.assignedTo)?.name || item.assignedTo}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => {
                          setSelectedItem(item);
                          setAssignee(item.assignedTo || "None");
                          setIsAssignModalOpen(true);
                        }}
                        className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline"
                      >
                        Assign / Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Package size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Add Equipment</h2>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAdd} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Item Name *</label>
                    <input
                      required
                      placeholder="e.g. B.P. Monitor"
                      value={form.itemName}
                      onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-black text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Serial Number</label>
                    <input
                      placeholder="e.g. SN-99281"
                      value={form.serialNumber}
                      onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-black text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 bg-slate-50"
                    >
                      <option value="Diagnostic">Diagnostic</option>
                      <option value="Support">Support</option>
                      <option value="Consumable">Consumable</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex gap-4 mt-8 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">Cancel</button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-2xl bg-primary text-white text-xs font-black hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Add Item"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Assign Modal */}
      <AnimatePresence>
        {isAssignModalOpen && selectedItem && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAssignModalOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>Manage Assignment</h2>
                  </div>
                  <button onClick={() => setIsAssignModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Item</p>
                  <p className="text-sm font-black text-slate-800">{selectedItem.itemName}</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">{selectedItem.serialNumber || "No serial number"}</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assign To Staff Member</label>
                    <select
                      disabled={staffLoading}
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-700 bg-white disabled:opacity-50"
                    >
                      {staffLoading ? (
                        <option>Loading staff list...</option>
                      ) : (
                        <>
                          <option value="None">None (Mark as Available)</option>
                          {staffList.map((s) => (
                            <option key={s.email} value={s.email}>{s.name} ({s.email})</option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>

                  <div className="flex gap-4 mt-8 pt-4">
                    <button type="button" onClick={() => setIsAssignModalOpen(false)} className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">Cancel</button>
                    <button 
                      onClick={handleAssign}
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-2xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Update Status"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
