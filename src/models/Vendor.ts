import { Schema, model, models } from "mongoose";

const VendorSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  contactPerson: { type: String },
  phone: { type: String },
  email: { type: String },
  city: { type: String },
  tieUpDate: { type: String },
  status: { 
    type: String, 
    enum: ["Active", "Inactive"], 
    default: "Active" 
  },
  notes: { type: String },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Vendor = models.Vendor || model("Vendor", VendorSchema);
export default Vendor;
