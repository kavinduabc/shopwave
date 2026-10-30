/**
 * GET    /api/users/[id]  - Get a single user (no password)
 * PUT    /api/users/[id]  - Update user profile/role/status
 * DELETE /api/users/[id]  - Delete a user account
 */

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

// GET /api/users/[id]
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const user = await User.findById(id).select("-password").lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        id: (user._id as unknown as { toString(): string }).toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id]
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const updates = await request.json();

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const allowedUpdates: Record<string, unknown> = {};
    const stringFields = ["name", "phone", "address", "role", "department", "status"] as const;

    for (const field of stringFields) {
      if (updates[field] !== undefined) {
        allowedUpdates[field] = typeof updates[field] === "string"
          ? updates[field].trim()
          : updates[field];
      }
    }

    // Handle email update with duplicate check
    if (updates.email) {
      const newEmail = updates.email.trim().toLowerCase();
      const duplicate = await User.findOne({ email: newEmail, _id: { $ne: id } });
      if (duplicate) {
        return NextResponse.json(
          { success: false, error: "Another user already has this email." },
          { status: 409 }
        );
      }
      allowedUpdates.email = newEmail;
    }

    // Handle password change
    if (updates.password) {
      if (updates.password.length < 8) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 8 characters." },
          { status: 400 }
        );
      }
      allowedUpdates.password = await bcrypt.hash(updates.password, 12);
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    )
      .select("-password")
      .lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "User not found" },
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
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
