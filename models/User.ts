/**
 * User Model (models/User.ts)
 * ============================
 * Stores both customers (who shop) and staff (who manage admin panel).
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // In production, always store HASHED passwords (e.g. with bcrypt)
  phone?: string;
  address?: string;
  role: "customer" | "admin" | "staff";
  department?: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // No two users can have the same email
      lowercase: true,
      trim: true,
    },
    // NOTE: In a real production app, you should hash this with bcrypt!
    // e.g. password = await bcrypt.hash(plainTextPassword, 10)
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    // 'customer' = online shopper, 'admin' = supermarket manager, 'staff' = warehouse/dispatch
    role: {
      type: String,
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },
    department: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
