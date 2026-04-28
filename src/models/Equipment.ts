import { Schema, model, models } from "mongoose";

const EquipmentSchema = new Schema({
  itemName: { type: String, required: true },
  serialNumber: { type: String, unique: true },
  category: { 
    type: String, 
    enum: ["Diagnostic", "Support", "Consumable", "Emergency", "Other"],
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Available", "Assigned", "Under Maintenance", "Damaged", "Retired"],
    default: "Available" 
  },
  assignedTo: { type: String },
  lastAssignedAt: String,
  history: [{
    staffId: { type: String },
    action: { type: String, enum: ["Issued", "Returned", "Reported Damage"] },
    note: String,
    date: { type: String, required: true }
  }],
  specifications: Map,
}, { 
  timestamps: true 
});

const Equipment = models.Equipment || model("Equipment", EquipmentSchema);
export default Equipment;
