import { Schema, model, models } from "mongoose";

const LeaveSchema = new Schema({
  staffEmail: { type: String, required: true },
  staffName: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  reason: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Sick Leave", "Casual Leave", "Emergency", "Other"], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Sub-Admin Approved", "Approved", "Rejected"], 
    default: "Pending" 
  },
  subAdminApproval: { type: String, enum: ["Approved", "Rejected"] },
  subAdminNote: { type: String },
  adminApproval: { type: String, enum: ["Approved", "Rejected"] },
  adminNote: { type: String },
  appliedAt: { type: String, required: true },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Leave = models.Leave || model("Leave", LeaveSchema);
export default Leave;
