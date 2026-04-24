import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  patient: { type: String, required: true },
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
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Task = models.Task || model("Task", TaskSchema);
export default Task;
