/**
 * Order Model (models/Order.ts)
 * ==============================
 * Blueprint for a customer order in MongoDB.
 * Each order contains customer info and an array of purchased items.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

// Sub-document schema for each item inside an order
const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: "kg" },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
  },
  { _id: false } // don't create a separate _id for each item
);

// TypeScript interface for a single order item
export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
}

// TypeScript interface for the full Order document
export interface IOrder extends Document {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: "Cash on Delivery" | "Card Payment" | "Online Banking";
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, default: "Colombo" },

    // Array of ordered products
    items: { type: [OrderItemSchema], required: true },

    totalAmount: { type: Number, required: true, min: 0 },

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Card Payment", "Online Banking"],
      default: "Cash on Delivery",
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },

    // Store as a readable date string e.g. "2025-10-27"
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
