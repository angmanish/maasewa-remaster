import { Schema, model, models } from "mongoose";

const IncidentSchema = new Schema({
  type: { 
    type: String, 
    enum: ["Medical Emergency", "Safety Issue", "Patient Dispute", "Equipment Failure", "Other"],
    required: true 
  },
  severity: { 
    type: String, 
    enum: ["Low", "Medium", "High", "Critical"],
    required: true 
  },
  description: { type: String, required: true },
  staffId: { type: String, required: true },
  staffName: String,
  staffPhone: String,
  patientName: String,
  patientPhone: String,
  taskId: { type: String },
  location: String,
  status: { 
    type: String, 
    enum: ["Reported", "Investigating", "Resolved", "Dismissed"],
    default: "Reported" 
  },
  resolution: String,
  reportedAt: { type: String, required: true },
  resolvedAt: String,
}, { 
  timestamps: true 
});

// For Next.js HMR/Schema updates
if (models.Incident) {
  delete models.Incident;
}

const Incident = model("Incident", IncidentSchema);
export default Incident;
