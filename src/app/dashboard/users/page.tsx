"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User, UserRole } from "@/types/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Search, Shield,
  CheckCircle, UserCheck, AlertTriangle, Camera, Loader2,
} from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { getLocalDateString } from "@/lib/dateUtils";

const ROLE_OPTIONS: UserRole[] = ["ADMIN", "SUB_ADMIN", "STAFF"];

const roleStyle: Record<UserRole, string> = {
  ADMIN: "bg-rose-100 text-rose-700",
  SUB_ADMIN: "bg-amber-100 text-amber-700",
  STAFF: "bg-emerald-100 text-emerald-700",
};

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-500",
};

const emptyForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  role: "STAFF" as UserRole,
  status: "Active" as "Active" | "Inactive",
  profilePic: "",
  qualifications: "",
  experience: "",
  specialization: "",
  aadharNumber: "",
  dob: "",
};

export default function UsersPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Guard: Admin only
  useEffect(() => {
    if (currentUser && currentUser.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"ALL" | UserRole>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dashboard/users", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "ALL" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setForm({ 
      name: u.name, 
      email: u.email, 
      password: "", // Don't show password when editing
      phone: u.phone || "", 
      city: u.city || "", 
      role: u.role, 
      status: u.status,
      profilePic: u.profilePic || "",
      qualifications: u.qualifications || "",
      experience: u.experience || "",
      specialization: u.specialization || "",
      aadharNumber: u.aadharNumber || "",
      dob: u.dob || "",
    });
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image must be smaller than 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.email || (!editingUser && !form.password)) {
      showToast("Name, Email, and Password are required.", "error");
      return;
    }

    try {
      const payload: any = { ...form };
      if (editingUser && !form.password) {
        delete payload.password; // Don't update password if empty
      }

      const res = await fetch("/api/dashboard/users", {
        method: editingUser ? "PUT" : "POST",
        body: JSON.stringify(editingUser ? { id: editingUser.id, ...payload } : { 
          ...payload, 
          joinedAt: getLocalDateString() 
        }),
      });

      if (res.ok) {
        showToast(editingUser ? `${form.name}'s profile updated.` : `${form.name} added.`);
        fetchUsers();
        setModalOpen(false);
      } else {
        showToast("Operation failed.", "error");
      }
    } catch (error) {
      showToast("An error occurred.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/dashboard/users?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast(`${deleteTarget.name} has been removed.`);
        fetchUsers();
        setDeleteTarget(null);
      }
    } catch (err) {
      showToast("Delete failed.", "error");
    }
  };

  if (currentUser?.role !== "ADMIN") return null;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-slate-800"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            User Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Create, edit, and manage all system users and their roles.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg flex-shrink-0"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as any)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-primary bg-white"
        >
          <option value="ALL">All Roles</option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>{r.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Email</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden md:table-cell">Phone</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">City</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide hidden lg:table-cell">Joined</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4"><Skeleton className="w-32 h-4" /></td>
                    <td className="px-5 py-4"><Skeleton className="w-40 h-4" /></td>
                    <td className="px-5 py-4 hidden md:table-cell"><Skeleton className="w-24 h-4" /></td>
                    <td className="px-5 py-4 hidden lg:table-cell"><Skeleton className="w-20 h-4" /></td>
                    <td className="px-5 py-4"><Skeleton className="w-16 h-6 rounded-full" /></td>
                    <td className="px-5 py-4"><Skeleton className="w-16 h-6 rounded-full" /></td>
                    <td className="px-5 py-4 hidden lg:table-cell"><Skeleton className="w-24 h-3" /></td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-2"><Skeleton className="w-8 h-8 rounded-lg" /><Skeleton className="w-8 h-8 rounded-lg" /></div></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">{u.name}</td>
                    <td className="px-5 py-4 text-slate-500">{u.email}</td>
                    <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{u.phone || "—"}</td>
                    <td className="px-5 py-4 text-slate-500 hidden lg:table-cell">{u.city || "—"}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${roleStyle[u.role]}`}>
                        <Shield size={10} /> {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[u.status]}`}>
                        {u.status === "Active" ? <CheckCircle size={10} /> : null}
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">{u.joinedAt}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(u)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(u)}
                          disabled={u.id === currentUser?.id}
                          className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {users.length} users
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {editingUser ? "Edit User" : "Add New User"}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {(["name", "email", "password", "phone", "city", "dob", "profilePic", "qualifications", "experience", "specialization", "aadharNumber"] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 capitalize">
                        {field === "password" && editingUser ? "New Password (Leave blank to keep current)" : 
                         field === "profilePic" ? "Profile Image" :
                         field === "aadharNumber" ? "Aadhar Number" :
                         field === "dob" ? "Date of Birth" :
                         field}
                      </label>
                      {field === "profilePic" ? (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                            {form.profilePic ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={form.profilePic} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Camera size={20} />
                              </div>
                            )}
                          </div>
                          <label className="flex-1 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl py-2 px-4 text-xs font-bold text-slate-500 text-center transition-colors">
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                            {form.profilePic ? "Change Photo" : "Upload Photo"}
                          </label>
                        </div>
                      ) : (
                        <input
                          type={field === "email" ? "email" : field === "password" ? "password" : field === "dob" ? "date" : "text"}
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      )}
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-4 pb-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary bg-white"
                      >
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r.replace("_", " ")}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-primary bg-white"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
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
                    <UserCheck size={15} />
                    {editingUser ? "Save Changes" : "Add User"}
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
                  Remove User?
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Are you sure you want to remove <strong>{deleteTarget.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="flex-1 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors">
                    Remove
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
