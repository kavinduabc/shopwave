/**
 * GET  /api/users  - List all staff/customer users
 * POST /api/users  - Create a new staff user (admin use only)
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};

    if (role && role !== "All") {
      filter.role = role;
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }

    // Never expose passwords to the frontend
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    const formatted = users.map((u) => ({
      ...u,
      id: (u._id as unknown as { toString(): string }).toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new staff member
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (body.password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await User.findOne({
      email: body.email.toLowerCase().trim(),
    });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A user with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const newUser = await User.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      password: hashedPassword,
      phone: body.phone?.trim() || "",
      address: body.address?.trim() || "",
      role: body.role || "staff",
      department: body.department?.trim() || "",
      status: body.status || "Active",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          department: newUser.department,
          status: newUser.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}
