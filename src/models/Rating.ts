import { Schema, model, models } from "mongoose";

const RatingSchema = new Schema({
  staffId: { type: String, required: true },
  patientId: { type: Schema.Types.ObjectId, ref: "User" }, // If patient is also a user
  patientName: { type: String, required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
  score: { type: Number, min: 1, max: 5, required: true },
  categories: {
    careQuality: { type: Number, min: 1, max: 5 },
    punctuality: { type: Number, min: 1, max: 5 },
    hygiene: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 }
  },
  comment: String,
  isPublic: { type: Boolean, default: false },
  ratedAt: { type: String, required: true }
}, { 
  timestamps: true 
});

const Rating = models.Rating || model("Rating", RatingSchema);
export default Rating;
