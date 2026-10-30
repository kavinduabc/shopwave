/**
 * GET  /api/suppliers  - List all suppliers with optional filters
 * POST /api/suppliers  - Create a new supplier
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Supplier from "@/models/Supplier";

// GET /api/suppliers
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { contactPerson: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const suppliers = await Supplier.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    const formatted = suppliers.map((s) => ({
      ...s,
      id: (s._id as unknown as { toString(): string }).toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("GET /api/suppliers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}

// POST /api/suppliers
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.name || !body.category || !body.contactPerson || !body.phone || !body.email || !body.location) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields (name, category, contactPerson, phone, email, location) are required.",
        },
        { status: 400 }
      );
    }

    const newSupplier = await Supplier.create({
      name: body.name.trim(),
      category: body.category.trim(),
      contactPerson: body.contactPerson.trim(),
      phone: body.phone.trim(),
      email: body.email.trim().toLowerCase(),
      location: body.location.trim(),
      status: body.status || "Active Contract",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...newSupplier.toObject(),
          id: newSupplier._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/suppliers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create supplier" },
      { status: 500 }
    );
  }
}
