/**
 * Product Model (models/Product.ts)
 * ===================================
 * This is the "blueprint" (schema) for how a product is stored in MongoDB.
 *
 * Mongoose Schema = the shape/structure of a document in a MongoDB collection.
 * Mongoose Model  = the class we use to read/write those documents.
 *
 * BEGINNER NOTE:
 *  Each field has a `type` (String, Number, Boolean) and sometimes a `default` value.
 *  `required: true` means this field MUST be provided when creating a product.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for a Product document
export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  lowStockThreshold: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  nutrition: string;
  isBestSeller: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true, // removes leading/trailing spaces
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      default: "kg",
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    },
    description: {
      type: String,
      default: "Fresh grocery product.",
    },
    nutrition: {
      type: String,
      default: "Natural, fresh nutrients.",
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps
    timestamps: true,
  }
);

// Create an index on 'name' for fast text search
ProductSchema.index({ name: "text", category: "text" });

// Prevent re-creating the model if it already exists (important for Next.js hot-reload)
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
