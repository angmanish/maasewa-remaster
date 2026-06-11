import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  jobType: "Full-Time" | "Part-Time" | "Contract" | "Live-In";
  requirements: string[];
  salaryRange?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Live-In"],
      required: true,
    },
    requirements: { type: [String], default: [] },
    salaryRange: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
export default Job;
