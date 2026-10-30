/**
 * Supplier Model (models/Supplier.ts)
 * =====================================
 * Stores supplier/vendor information for the supermarket inventory system.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  status: "Active Contract" | "Inactive" | "Under Review";
  createdAt: Date;
  updatedAt: Date;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Supply category is required"],
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    status: {
      type: String,
      enum: ["Active Contract", "Inactive", "Under Review"],
      default: "Active Contract",
    },
  },
  {
    timestamps: true,
  }
);

const Supplier: Model<ISupplier> =
  mongoose.models.Supplier || mongoose.model<ISupplier>("Supplier", SupplierSchema);

export default Supplier;
