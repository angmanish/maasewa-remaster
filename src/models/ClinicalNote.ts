import { Schema, model, models } from "mongoose";

const ClinicalNoteSchema = new Schema({
  taskId: { type: String, required: true },
  staffId: { type: String, required: true },
  patientName: { type: String, required: true },
  vitals: {
    bp: String, // e.g. 120/80
    pulse: Number,
    temp: Number,
    spO2: Number,
    respiration: Number
  },
  clinicalNotes: { type: String, required: true },
  medicationAdministered: [String],
  handoverInstructions: String,
  sharedWith: [String], // Array of staff emails
  loggedAt: { type: String, required: true }, // ISO string
}, { 
  timestamps: true 
});

const ClinicalNote = models.ClinicalNote || model("ClinicalNote", ClinicalNoteSchema);
export default ClinicalNote;
