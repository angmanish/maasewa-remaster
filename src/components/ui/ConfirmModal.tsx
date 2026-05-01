"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger"
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden pointer-events-auto border border-slate-100"
            >
              <div className="p-8 text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                  type === "danger" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"
                }`}>
                  <AlertTriangle size={32} />
                </div>
                
                <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">
                  {title}
                </h3>
                <p className="text-sm font-bold text-slate-400 leading-relaxed mb-8">
                  {message}
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                      type === "danger" 
                        ? "bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600" 
                        : "bg-amber-500 text-white shadow-amber-500/20 hover:bg-amber-600"
                    }`}
                  >
                    {confirmText}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-2xl bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                  >
                    {cancelText}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
