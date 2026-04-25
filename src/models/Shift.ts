import { Schema, model, models } from "mongoose";

const ShiftSchema = new Schema({
  staffEmail: { type: String, required: true },
  staffName: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm
  endTime: { type: String, required: true }, // HH:mm
  patientName: { type: String, required: true },
  location: { type: String },
  status: { 
    type: String, 
    enum: ["Scheduled", "In-Progress", "Completed", "Cancelled"], 
    default: "Scheduled" 
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Shift = models.Shift || model("Shift", ShiftSchema);
export default Shift;
