/**
 * MongoDB Connection Manager (lib/mongodb.ts)
 * =============================================
 * This file creates and reuses one MongoDB connection for the whole app.
 *
 * HOW IT WORKS (beginner explanation):
 *  - The first time an API route runs, it connects to MongoDB.
 *  - After that, it reuses the same connection instead of creating new ones.
 *  - This is important for performance in Next.js App Router.
 *
 * SETUP:
 *  - Make sure you have a .env.local file with:
 *    MONGODB_URI=mongodb://localhost:27017/foodcity
 *  - OR use MongoDB Atlas (cloud): 
 *    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodcity
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please add MONGODB_URI to your .env.local file.\n" +
    "Example: MONGODB_URI=mongodb://localhost:27017/foodcity"
  );
}

// Store the connection in Node.js global scope so it persists between hot-reloads
let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * connectDB - Call this at the top of any API route handler to ensure MongoDB is connected.
 *
 * Usage:
 *   import connectDB from "@/lib/mongodb";
 *   await connectDB();
 */
export async function connectDB() {
  // Already connected? Return immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is already being made, wait for it
  if (!cached.promise) {
    console.log("🔌 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // These options prevent common connection warnings
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected:", mongooseInstance.connection.host);
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
