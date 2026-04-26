"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Receipt, User, Phone, Calendar,
  Trash2, X, Printer, CheckCircle2,
  Clock, DollarSign, Search, Loader2,
  AlertCircle, FileText
} from "lucide-react";
import { Invoice, InvoiceItem } from "@/types/dashboard";
import { getLocalDateString } from "@/lib/dateUtils";
import Skeleton from "@/components/ui/Skeleton";
import Image from "next/image";

export default function InvoicesPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // State
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [printTarget, setPrintTarget] = useState<Invoice | null>(null);

  // New Invoice Form
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    date: getLocalDateString(),
    items: [{ description: "", qty: 1, rate: 0, amount: 0 }] as InvoiceItem[],
    status: "Pending" as Invoice["status"],
  });

  const fetchInvoices = async () => {
    try {
      const res = await fetch("/api/dashboard/invoices");
      const data = await res.json();
      if (Array.isArray(data)) setInvoices(data);
    } catch (err) {
      console.error("Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    fetchInvoices();
  }, [currentUser, router]);

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...form.items];
    const item = { ...newItems[index], [field]: value };

    // Auto-calculate amount
    if (field === "qty" || field === "rate") {
      item.amount = Number(item.qty) * Number(item.rate);
    }

    newItems[index] = item;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: "", qty: 1, rate: 0, amount: 0 }]
    });
  };

  const removeItem = (index: number) => {
    if (form.items.length === 1) return;
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const calculateTotals = () => {
    const subtotal = form.items.reduce((acc, item) => acc + item.amount, 0);
    const tax = subtotal * 0.18; // 18% GST example
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totals = calculateTotals();
    const payload = { ...form, ...totals };

    try {
      const res = await fetch("/api/dashboard/invoices", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchInvoices();
        setModalOpen(false);
        setForm({
          patientName: "",
          patientPhone: "",
          date: getLocalDateString(),
          items: [{ description: "", qty: 1, rate: 0, amount: 0 }],
          status: "Pending",
        });
      }
    } catch (err) {
      console.error("Failed to save invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await fetch(`/api/dashboard/invoices?id=${id}`, { method: "DELETE" });
      setInvoices(invoices.filter(inv => inv.id !== id));
    } catch (err) {
      console.error("Failed to delete invoice");
    }
  };

  const filtered = invoices.filter(inv =>
    inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
    inv.billNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-jakarta)" }}>
            Invoicing System
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate and manage professional medical bills for patients.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by patient name or bill number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Invoice List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-8 py-6 space-y-2">
                      <Skeleton className="w-24 h-4" />
                      <Skeleton className="w-16 h-3" />
                    </td>
                    <td className="px-8 py-6 space-y-2">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-20 h-3" />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end">
                        <Skeleton className="w-20 h-4" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Skeleton className="w-16 h-6 rounded-full" />
                    </td>
                    <td className="px-8 py-6"></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-slate-400">No invoices found.</td>
                </tr>
              ) : (
                filtered.map((inv, i) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 text-sm tracking-tight">{inv.billNumber}</p>
                      <p className="text-xs text-slate-400 font-medium">{inv.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-800">{inv.patientName}</p>
                      <p className="text-xs text-slate-400">{inv.patientPhone || "No contact"}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="font-black text-primary">₹{inv.total.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-300">Incl. Tax</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${inv.status === "Paid" ? "bg-emerald-50 text-emerald-600" :
                          inv.status === "Unpaid" ? "bg-rose-50 text-rose-600" :
                            "bg-blue-50 text-blue-600"
                        }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPrintTarget(inv)}
                          className="p-2 text-slate-400 hover:text-primary transition-colors"
                          title="Print"
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {/* Invoice Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <FileText size={24} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase">Generate New Invoice</h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <form onSubmit={handleSaveInvoice} className="space-y-8">
                    {/* Patient Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</label>
                        <input
                          placeholder="Patient Full Name" required
                          value={form.patientName}
                          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                        />
                        <input
                          placeholder="Phone Number"
                          value={form.patientPhone}
                          onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date & Status</label>
                        <input
                          type="date" required
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                        />
                        <select
                          value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                    </div>

                    {/* Items Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Services Rendered</label>
                        <button
                          type="button" onClick={addItem}
                          className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5"
                        >
                          <Plus size={14} /> Add Item
                        </button>
                      </div>

                      <div className="space-y-3">
                        {form.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                            <input
                              placeholder="Description (e.g. Nursing Care)" required
                              value={item.description}
                              onChange={(e) => updateItem(idx, "description", e.target.value)}
                              className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                            />
                            <input
                              type="number" placeholder="Qty" required
                              value={item.qty}
                              onChange={(e) => updateItem(idx, "qty", e.target.value)}
                              className="w-20 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                            />
                            <input
                              type="number" placeholder="Rate" required
                              value={item.rate}
                              onChange={(e) => updateItem(idx, "rate", e.target.value)}
                              className="w-32 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none"
                            />
                            <div className="w-32 px-4 py-3.5 bg-blue-50/50 border border-blue-100 rounded-2xl text-sm font-black text-primary flex items-center justify-end">
                              ₹{item.amount}
                            </div>
                            <button
                              type="button" onClick={() => removeItem(idx)}
                              className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                          <span className="font-bold text-slate-600">₹{calculateTotals().subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">GST (18%)</span>
                          <span className="font-bold text-slate-600">₹{calculateTotals().tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg pt-3 border-t border-slate-100">
                          <span className="text-slate-800 font-black uppercase tracking-tight">Total</span>
                          <span className="font-black text-primary">₹{calculateTotals().total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Finalize & Save Invoice"}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Print Preview Modal */}
      <AnimatePresence>
        {printTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setPrintTarget(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[80] print:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none print:static print:p-0"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto print:shadow-none print:w-full print:max-w-none print:rounded-none">
                <div className="p-8 print:p-0" id="printable-invoice">
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src="/maasewa-icon.png"
                            alt="Maa Sewa Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">Maa Sewa Healthcare</span>
                      </div>
                      <p className="text-xs text-slate-500 max-w-[200px]">
                        Professional Home Healthcare Services<br />
                        Pune, Maharashtra, India
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl font-black text-slate-800 uppercase mb-1">Invoice</h3>
                      <p className="text-sm font-bold text-primary">{printTarget.billNumber}</p>
                      <p className="text-xs text-slate-400 mt-1">Date: {printTarget.date}</p>
                    </div>
                  </div>

                  {/* Billing Info */}
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Bill To:</p>
                      <p className="text-lg font-bold text-slate-800">{printTarget.patientName}</p>
                      <p className="text-sm text-slate-500">{printTarget.patientPhone || "No contact provided"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Payment Status:</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${printTarget.status === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}>
                        {printTarget.status}
                      </span>
                    </div>
                  </div>

                  {/* Items Table */}
                  <table className="w-full mb-10 text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-800">
                        <th className="text-left py-3 font-black text-slate-800 uppercase tracking-widest text-[10px]">Description</th>
                        <th className="text-center py-3 font-black text-slate-800 uppercase tracking-widest text-[10px]">Qty</th>
                        <th className="text-right py-3 font-black text-slate-800 uppercase tracking-widest text-[10px]">Rate</th>
                        <th className="text-right py-3 font-black text-slate-800 uppercase tracking-widest text-[10px]">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {printTarget.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-4 font-bold text-slate-700">{item.description}</td>
                          <td className="py-4 text-center text-slate-600">{item.qty}</td>
                          <td className="py-4 text-right text-slate-600">₹{item.rate}</td>
                          <td className="py-4 text-right font-bold text-slate-800">₹{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Calculation Summary */}
                  <div className="flex justify-end border-t-2 border-slate-800 pt-6">
                    <div className="w-64 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-bold uppercase text-[10px]">Subtotal</span>
                        <span className="font-bold text-slate-700">₹{printTarget.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-bold uppercase text-[10px]">Tax (GST 18%)</span>
                        <span className="font-bold text-slate-700">₹{printTarget.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl pt-3 border-t border-slate-100">
                        <span className="font-black text-slate-800 uppercase">Total</span>
                        <span className="font-black text-primary">₹{printTarget.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-20 pt-10 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">Thank you for choosing Maa Sewa Healthcare. This is a computer-generated invoice.</p>
                  </div>
                </div>

                {/* Print Action Bar */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 print:hidden">
                  <button
                    onClick={() => setPrintTarget(null)}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <Printer size={18} /> Print Now
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .dashboard-layout-sidebar, .dashboard-layout-header, .print-hidden {
            display: none !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2cm;
          }
        }
      `}</style>
    </div>
  );
}
