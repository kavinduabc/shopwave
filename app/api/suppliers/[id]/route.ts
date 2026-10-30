/**
 * GET    /api/suppliers/[id]  - Get a single supplier
 * PUT    /api/suppliers/[id]  - Update supplier info
 * DELETE /api/suppliers/[id]  - Delete a supplier
 */

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Supplier from "@/models/Supplier";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

// GET /api/suppliers/[id]
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid supplier ID format" },
        { status: 400 }
      );
    }

    const supplier = await Supplier.findById(id).lean();

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...supplier,
        id: (supplier._id as unknown as { toString(): string }).toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/suppliers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch supplier" },
      { status: 500 }
    );
  }
}

// PUT /api/suppliers/[id]
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const updates = await request.json();

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid supplier ID format" },
        { status: 400 }
      );
    }

    // Sanitize allowable update fields
    const allowedUpdates: Record<string, unknown> = {};
    const fields = ["name", "category", "contactPerson", "phone", "email", "location", "status"] as const;
    for (const field of fields) {
      if (updates[field] !== undefined) {
        allowedUpdates[field] = typeof updates[field] === "string"
          ? updates[field].trim()
          : updates[field];
      }
    }

    const updated = await Supplier.findByIdAndUpdate(
      id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        id: (updated._id as unknown as { toString(): string }).toString(),
      },
    });
  } catch (error) {
    console.error("PUT /api/suppliers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update supplier" },
      { status: 500 }
    );
  }
}

// DELETE /api/suppliers/[id]
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid supplier ID format" },
        { status: 400 }
      );
    }

    const deleted = await Supplier.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/suppliers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete supplier" },
      { status: 500 }
    );
  }
}
