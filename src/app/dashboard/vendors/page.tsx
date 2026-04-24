"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { Vendor } from "@/types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Search, Handshake,
  Phone, Mail, MapPin, CheckCircle, AlertTriangle, Building2,
} from "lucide-react";
import { getLocalDateString } from "@/lib/dateUtils";

const CATEGORIES = ["Medical Equipment", "Medicines & Consumables", "Lab Services", "Ambulance", "Physiotherapy", "Other"];

const emptyVendor: Omit<Vendor, "id"> = {
  name: "", category: "Medical Equipment", contactPerson: "",
  phone: "", email: "", city: "", tieUpDate: getLocalDateString(),
  status: "Active", notes: "",
};

export default function VendorsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { vendors, addVendor, updateVendor, deleteVendor } = useDashboard();

  useEffect(() => {
    if (currentUser && currentUser.role !== "ADMIN") router.replace("/dashboard");
  }, [currentUser, router]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyVendor);
  const [deleteTarget, setDeleteTarget] = useState<Vendor | null>(null);

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditingId(null); setForm(emptyVendor); setModalOpen(true); };
  const openEdit = (v: Vendor) => {
    setEditingId(v.id);
    setForm({ name: v.name, category: v.category, contactPerson: v.contactPerson, phone: v.phone, email: v.email, city: v.city, tieUpDate: v.tieUpDate, status: v.status, notes: v.notes });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingId) {
      updateVendor(editingId, form);
    } else {
      addVendor(form);
    }
    setModalOpen(false);
  };

  if (currentUser?.role !== "ADMIN") return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Vendor Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage tie-ups and partner vendor details.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg flex-shrink-0"
        >
          <Plus size={16} /> Add Vendor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Vendors", value: vendors.length, color: "bg-blue-50 text-blue-600", icon: Building2 },
          { label: "Active", value: vendors.filter((v) => v.status === "Active").length, color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
          { label: "Inactive", value: vendors.filter((v) => v.status === "Inactive").length, color: "bg-slate-50 text-slate-500", icon: AlertTriangle },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search by name, category, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((vendor, i) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Handshake size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm leading-tight">{vendor.name}</p>
                  <p className="text-xs text-slate-500">{vendor.category}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${vendor.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {vendor.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-500 mb-4">
              {vendor.contactPerson && (
                <div className="flex items-center gap-1.5"><Building2 size={11} className="text-slate-400" /> {vendor.contactPerson}</div>
              )}
              {vendor.phone && <div className="flex items-center gap-1.5"><Phone size={11} className="text-slate-400" /> {vendor.phone}</div>}
              {vendor.email && <div className="flex items-center gap-1.5"><Mail size={11} className="text-slate-400" /> {vendor.email}</div>}
              {vendor.city && <div className="flex items-center gap-1.5"><MapPin size={11} className="text-slate-400" /> {vendor.city}</div>}
            </div>

            {vendor.notes && (
              <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-2 mb-3 line-clamp-2">{vendor.notes}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Tie-up: {vendor.tieUpDate}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(vendor)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <Pencil size={13} />
                </button>
                <button onClick={() => setDeleteTarget(vendor)} className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-400">No vendors found.</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {editingId ? "Edit Vendor" : "Add New Vendor"}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Vendor Name *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Company name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white">
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Vendor["status"] })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white">
                        <option>Active</option><option>Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person</label>
                      <input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} placeholder="Full name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXXXXXXX" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                      <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Tie-Up Date</label>
                      <input type="date" value={form.tieUpDate} onChange={(e) => setForm({ ...form, tieUpDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Notes</label>
                      <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes about this vendor..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary resize-none" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleSave} className="flex-1 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark">{editingId ? "Save Changes" : "Add Vendor"}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={26} className="text-rose-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Remove Vendor?</h2>
                <p className="text-slate-500 text-sm mb-6">Remove <strong>{deleteTarget.name}</strong> from your vendor list?</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button onClick={() => { deleteVendor(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600">Remove</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
