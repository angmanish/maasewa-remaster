import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  patient: { type: String, required: true },
  patientPhone: { type: String },
  patientEmail: { type: String },
  location: { type: String },
  time: { type: String },
  date: { type: String, required: true },
  assignedTo: { type: String, required: true }, // Email
  assignedToName: { type: String },
  assignedBy: { type: String }, // Email
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Completed"], 
    default: "Pending" 
  },
  priority: { 
    type: String, 
    enum: ["High", "Normal", "Low"], 
    default: "Normal" 
  },
  completedAt: { type: String },
  medications: [{
    name: { type: String, required: true },
    time: { type: String },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" }
  }],
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// For Next.js HMR/Schema updates
if (models.Task) {
  delete models.Task;
}

const Task = model("Task", TaskSchema);
export default Task;
