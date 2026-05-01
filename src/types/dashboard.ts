export type UserRole = "ADMIN" | "SUB_ADMIN" | "STAFF";

export interface Task {
  id: string;
  title: string;
  description: string;
  patient: string;
  patientPhone?: string;
  patientEmail?: string;
  location: string;
  time: string;
  date: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Normal" | "Low";
  completedAt?: string;
  medications?: {
    name: string;
    time?: string;
    status: "Pending" | "Completed";
  }[];
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  staffEmail: string;
  staffName: string;
  status: "Present" | "Absent" | "Leave" | "Half Day";
  markedBy: string;
}

export interface SalaryRecord {
  id: string;
  staffEmail: string;
  staffName: string;
  month: string; // "2025-04"
  baseSalary: number;
  bonus: number;
  allowances: {
    travel: number;
    overtime: number;
    other: number;
  };
  deductions: number;
  advanceDeduction: number;
  netSalary: number;
  advanceRequests: {
    amount: number;
    reason?: string;
    status: "Pending" | "Approved" | "Rejected";
    requestedAt: string;
  }[];
  status: "Generated" | "Paid";
  generatedAt: string;
  generatedBy: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  tieUpDate: string;
  status: "Active" | "Inactive";
  price: string;
  notes: string;
}

export interface LeaveRequest {
  id: string;
  staffEmail: string;
  staffName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  type: "Sick Leave" | "Casual Leave" | "Emergency" | "Other";
  status: "Pending" | "Sub-Admin Approved" | "Approved" | "Rejected";
  subAdminApproval?: "Approved" | "Rejected";
  adminApproval?: "Approved" | "Rejected";
  subAdminNote?: string;
  adminNote?: string;
  appliedAt: string;
}

export interface Shift {
  id: string;
  staffEmail: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  patientName: string;
  location: string;
  status: "Scheduled" | "In-Progress" | "Completed" | "Cancelled";
}

export interface InvoiceItem {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  billNumber: string;
  patientName: string;
  patientPhone?: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "Paid" | "Unpaid" | "Pending";
}

export interface ClinicalNote {
  id: string;
  taskId: string;
  staffId: string;
  patientName: string;
  vitals: {
    bp: string;
    pulse: number;
    temp: number;
    spO2: number;
    respiration: number;
  };
  clinicalNotes: string;
  medicationAdministered: string[];
  handoverInstructions?: string;
  sharedWith?: string[];
  loggedAt: string;
}

export interface Rating {
  id: string;
  staffId: string;
  patientName: string;
  score: number;
  categories: {
    careQuality: number;
    punctuality: number;
    hygiene: number;
    communication: number;
  };
  comment?: string;
  ratedAt: string;
}

export interface Equipment {
  id: string;
  itemName: string;
  serialNumber: string;
  category: "Diagnostic" | "Support" | "Consumable" | "Emergency" | "Other";
  status: "Available" | "Assigned" | "Under Maintenance" | "Damaged" | "Retired";
  assignedTo?: string;
  lastAssignedAt?: string;
}

export interface IncidentReport {
  id: string;
  type: "Medical Emergency" | "Safety Issue" | "Patient Dispute" | "Equipment Failure" | "Other";
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  staffId: string;
  staffName?: string;
  staffPhone?: string;
  patientName?: string;
  patientPhone?: string;
  taskId?: string;
  location?: string;
  status: "Reported" | "Investigating" | "Resolved" | "Dismissed";
  reportedAt: string;
}
