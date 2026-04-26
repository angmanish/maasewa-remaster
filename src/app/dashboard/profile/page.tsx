"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User as UserIcon, Phone, Mail, MapPin, 
  CalendarDays, GraduationCap, Briefcase, 
  IdCard, ShieldCheck, Camera, Loader2
} from "lucide-react";
import Image from "next/image";
import { User } from "@/types/auth";

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  
  // 1. Start with local data immediately (Instant Load)
  const [profileData, setProfileData] = useState<User | null>(currentUser);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 2. Fetch fresh data in the background (Silent Sync)
  const syncProfile = async () => {
    if (!currentUser?.id) return;
    setIsSyncing(true);
    try {
      // Use a background fetch without forcing a wait
      const res = await fetch(`/api/dashboard/users?id=${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
        setCurrentUser(data);
        localStorage.setItem("Maa Sewa_user", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Background sync failed:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      // Background sync whenever the page is visited
      syncProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profileData) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be smaller than 2MB", "error");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch("/api/dashboard/users", {
          method: "PUT",
          body: JSON.stringify({ 
            id: profileData.id, 
            profilePic: base64,
            name: profileData.name,
            email: profileData.email,
            role: profileData.role,
            status: profileData.status
          }),
        });

        if (res.ok) {
          const updatedUser = await res.json();
          setProfileData(updatedUser);
          setCurrentUser(updatedUser);
          localStorage.setItem("Maa Sewa_user", JSON.stringify(updatedUser));
          showToast("Profile picture updated!");
        } else {
          showToast("Failed to update profile picture", "error");
        }
      } catch (error) {
        showToast("An error occurred", "error");
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[60] px-6 py-3 rounded-2xl shadow-xl text-white font-bold text-sm flex items-center gap-3 animate-in slide-in-from-right duration-300 ${toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}>
          {toast.type === "success" ? <ShieldCheck size={18} /> : <IdCard size={18} />}
          {toast.msg}
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            My Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal information and professional details.</p>
        </div>
        {isSyncing && (
          <div className="flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest opacity-60">
            <Loader2 size={12} className="animate-spin" /> Syncing
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-r from-primary to-blue-400" />
            <div className="px-6 pb-8 -mt-12 flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-slate-100 shadow-lg relative">
                  {profileData?.profilePic ? (
                    <Image src={profileData.profilePic} alt={profileData.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                      <UserIcon size={40} />
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="text-white animate-spin" size={24} />
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors group-hover:scale-110 duration-200">
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                  <Camera size={18} className="text-primary" />
                </label>
              </div>
              
              <h2 className="mt-6 text-xl font-bold text-slate-800">{profileData?.name}</h2>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full mt-1.5">
                {profileData?.role}
              </span>
              
              <div className="w-full mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  <span className="truncate">{profileData?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  <span>{profileData?.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="text-slate-400" />
                  <span>{profileData?.city || "Not specified"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Details Section */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={20} />
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                  <GraduationCap size={12} /> Qualification
                </p>
                <p className="text-slate-700 font-medium">{profileData?.qualifications || "—"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                  <Briefcase size={12} /> Experience
                </p>
                <p className="text-slate-700 font-medium">{profileData?.experience || "—"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                  <UserIcon size={12} /> Specialization
                </p>
                <p className="text-slate-700 font-medium">{profileData?.specialization || "General"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                  <CalendarDays size={12} /> Date of Birth
                </p>
                <p className="text-slate-700 font-medium">{profileData?.dob || "—"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                  <IdCard size={12} /> Aadhar Number
                </p>
                <p className="text-slate-700 font-medium tracking-widest">
                  {profileData?.aadharNumber || "Pending"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-3xl p-6 border border-dashed border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <CalendarDays size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Account Since</p>
                <p className="text-slate-700 font-bold">{profileData?.joinedAt}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
