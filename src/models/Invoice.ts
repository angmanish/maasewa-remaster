import { Schema, model, models } from "mongoose";

const InvoiceItemSchema = new Schema({
  description: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const InvoiceSchema = new Schema({
  billNumber: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String },
  date: { type: String, required: true },
  items: [InvoiceItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Paid", "Unpaid", "Pending"], 
    default: "Pending" 
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);
export default Invoice;
