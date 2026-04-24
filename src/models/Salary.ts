import { Schema, model, models } from "mongoose";

const SalarySchema = new Schema({
  staffEmail: { type: String, required: true },
  staffName: { type: String, required: true },
  month: { type: String, required: true }, // YYYY-MM
  baseSalary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Generated", "Paid"], 
    default: "Generated" 
  },
  generatedAt: { type: String, required: true },
  generatedBy: { type: String, required: true }, // Admin Email
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Salary = models.Salary || model("Salary", SalarySchema);
export default Salary;
