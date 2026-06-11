"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Search, CheckCircle, AlertTriangle, Briefcase, MapPin, Map
} from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { getLocalDateString } from "@/lib/dateUtils";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: "Full-Time" | "Part-Time" | "Contract" | "Live-In";
  requirements: string[];
  salaryRange?: string;
  isActive: boolean;
  createdAt: string;
}

const emptyForm = {
  title: "",
  description: "",
  location: "",
  jobType: "Full-Time" as any,
  requirements: "", // we'll split by newline
  salaryRange: "",
  isActive: true,
};

export default function JobsAdminPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Guard: Admin & Sub_Admin
  useEffect(() => {
    if (currentUser && !["ADMIN", "SUB_ADMIN"].includes(currentUser.role)) {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingJob(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (j: Job) => {
    setEditingJob(j);
    setForm({
      title: j.title,
      description: j.description,
      location: j.location,
      jobType: j.jobType,
      requirements: j.requirements.join("\n"),
      salaryRange: j.salaryRange || "",
      isActive: j.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.location || !form.jobType) {
      showToast("Title, Description, Location, and Job Type are required.", "error");
      return;
    }

    try {
      const payload = {
        ...form,
        requirements: form.requirements.split("\n").filter((req) => req.trim() !== ""),
      };

      const url = editingJob ? `/api/jobs/${editingJob._id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingJob ? `Job updated.` : `Job posted.`);
        fetchJobs();
        setModalOpen(false);
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Operation failed.", "error");
      }
    } catch (error) {
      showToast("An error occurred.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/jobs/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast(`Job deleted.`);
        fetchJobs();
        setDeleteTarget(null);
      }
    } catch (err) {
      showToast("Delete failed.", "error");
    }
  };

  if (!currentUser || !["ADMIN", "SUB_ADMIN"].includes(currentUser.role)) return null;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-slate-800"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Careers Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Post, edit, and manage job openings on the public careers portal.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg flex-shrink-0"
        >
          <Plus size={16} /> Post New Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Job Title</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Location</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Posted On</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4"><Skeleton className="w-40 h-4" /></td>
                    <td className="px-5 py-4"><Skeleton className="w-20 h-4" /></td>
                    <td className="px-5 py-4 hidden md:table-cell"><Skeleton className="w-24 h-4" /></td>
                    <td className="px-5 py-4"><Skeleton className="w-16 h-6 rounded-full" /></td>
                    <td className="px-5 py-4 hidden lg:table-cell"><Skeleton className="w-24 h-3" /></td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-2"><Skeleton className="w-8 h-8 rounded-lg" /><Skeleton className="w-8 h-8 rounded-lg" /></div></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filtered.map((j) => (
                  <motion.tr
                    key={j._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">{j.title}</td>
                    <td className="px-5 py-4">
                       <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                         <Briefcase size={10} /> {j.jobType}
                       </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                       <div className="flex items-center gap-1.5"><MapPin size={14}/>{j.location}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${j.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {j.isActive ? <CheckCircle size={10} /> : null}
                        {j.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">{new Date(j.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(j)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(j)}
                          className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {editingJob ? "Edit Job Posting" : "Post New Job"}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Job Title</label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="e.g. ICU Certified Nurse"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Job Type</label>
                      <select
                        value={form.jobType}
                        onChange={(e) => setForm({ ...form, jobType: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary bg-white"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Live-In">Live-In</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Salary Range (Optional)</label>
                      <input
                        type="text"
                        value={form.salaryRange}
                        onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
                        placeholder="e.g. ₹20,000 - ₹30,000 / month"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-600 mb-1.5">Job Description</label>
                     <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Describe the role and responsibilities..."
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-600 mb-1.5">Requirements (One per line)</label>
                     <textarea
                        value={form.requirements}
                        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                        placeholder="- Must have B.Sc Nursing&#10;- Minimum 2 years experience"
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                     />
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                     <input
                        type="checkbox"
                        id="isActive"
                        checked={form.isActive}
                        onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                        className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                     />
                     <label htmlFor="isActive" className="text-sm text-slate-700 font-medium">
                        Active (Visible on public Careers page)
                     </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Briefcase size={15} />
                    {editingJob ? "Save Changes" : "Post Job"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={26} className="text-rose-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Delete Job Posting?
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Are you sure you want to delete <strong>{deleteTarget.title}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="flex-1 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-medium ${
              toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
