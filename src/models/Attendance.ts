import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema({
  date: { type: String, required: true },
  staffEmail: { type: String, required: true },
  staffName: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Present", "Absent", "Half Day", "Leave"], 
    required: true 
  },
  markedBy: { type: String, required: true }, // Email of (Sub-)Admin
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index to ensure one record per staff per day
AttendanceSchema.index({ date: 1, staffEmail: 1 }, { unique: true });

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);
export default Attendance;
