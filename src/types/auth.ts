export type UserRole = "ADMIN" | "SUB_ADMIN" | "STAFF";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  status: "Active" | "Inactive";
  joinedAt: string;
  profilePic?: string;
  qualifications?: string;
  experience?: string;
  specialization?: string;
  aadharNumber?: string;
  dob?: string;
}
