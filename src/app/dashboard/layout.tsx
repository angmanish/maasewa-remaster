"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import SOSButton from "@/components/dashboard/SOSButton";
import SOSAlert from "@/components/dashboard/SOSAlert";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading portal…</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
            {children}
          </div>
          <SOSButton />
          <SOSAlert />
        </div>
      </div>
    </DashboardProvider>
  );
}
