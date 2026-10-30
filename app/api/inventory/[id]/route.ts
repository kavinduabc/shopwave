/**
 * PATCH /api/inventory/[id]  - Adjust product stock by absolute value or delta
 * Uses MongoDB (Product model) instead of the file-based db.json
 */

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

// PATCH /api/inventory/[id] - Adjust or set product stock
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const current = await Product.findById(id).lean();
    if (!current) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    let nextStock = current.stock;

    if (typeof body.stock === "number") {
      // Absolute stock value
      nextStock = Math.max(0, body.stock);
    } else if (typeof body.delta === "number") {
      // Relative adjustment (positive = restock, negative = deduct)
      nextStock = Math.max(0, current.stock + body.delta);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Provide either 'stock' (absolute) or 'delta' (relative) in request body.",
        },
        { status: 400 }
      );
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: { stock: nextStock } },
      { new: true }
    ).lean();

    // Determine new stock status
    let stockStatus = "In Stock";
    if (updated!.stock === 0) stockStatus = "Out of Stock";
    else if (updated!.stock <= updated!.lowStockThreshold) stockStatus = "Low Stock";

    return NextResponse.json({
      success: true,
      message: `Stock for "${current.name}" updated to ${updated!.stock} ${updated!.unit}`,
      data: {
        id: (updated!._id as unknown as { toString(): string }).toString(),
        name: updated!.name,
        currentStock: updated!.stock,
        unit: updated!.unit,
        status: stockStatus,
      },
    });
  } catch (error) {
    console.error("PATCH /api/inventory/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update stock" },
      { status: 500 }
    );
  }
}
