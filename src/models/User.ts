import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "SUB_ADMIN", "STAFF"], required: true },
  status: { type: String, default: "Active" },
  phone: { type: String, default: "" },
  city: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  qualifications: { type: String, default: "" },
  experience: { type: String, default: "" },
  specialization: { type: String, default: "" },
  aadharNumber: { type: String, default: "" },
  dob: { type: String, default: "" },
  joinedAt: { type: String, default: "" },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = models.User || model("User", UserSchema);
export default User;
