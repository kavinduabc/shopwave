/**
 * GET    /api/products/[id]  - Get one product by its MongoDB _id
 * PUT    /api/products/[id]  - Update a product
 * DELETE /api/products/[id]  - Delete a product
 */

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Helper: check if an ID is a valid MongoDB ObjectId
function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

// GET /api/products/[id]
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...product, id: (product._id as unknown as { toString(): string }).toString() },
    });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const updates = await request.json();

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true } // `new: true` returns the updated doc
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...updated, id: (updated._id as unknown as { toString(): string }).toString() },
    });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
