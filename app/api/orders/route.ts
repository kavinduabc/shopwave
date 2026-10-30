/**
 * GET  /api/orders  - List all orders (with optional status filter)
 * POST /api/orders  - Place a new order AND automatically deduct stock from inventory
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

// GET /api/orders
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};
    if (status && status !== "All") {
      filter.status = status;
    }

    // Most recent orders first
    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();

    const formatted = orders.map((o) => ({
      ...o,
      id: (o._id as unknown as { toString(): string }).toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Place an order & deduct stock
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.customerName || !body.phone || !body.address || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required order info or empty cart." },
        { status: 400 }
      );
    }

    // Create the order in MongoDB
    const newOrder = await Order.create({
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      city: body.city || "Colombo",
      district: body.district || "Colombo",
      items: body.items,
      totalAmount: Number(body.totalAmount) || 0,
      paymentMethod: body.paymentMethod || "Cash on Delivery",
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    });

    /**
     * AUTO STOCK DEDUCTION:
     * After saving the order, subtract the purchased quantities from each product's stock.
     * This keeps the inventory accurate in real time!
     */
    const stockUpdates = body.items.map((item: { productId: string; quantity: number }) =>
      Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }, // $inc decrements stock by quantity
        { new: true }
      )
    );
    await Promise.all(stockUpdates);

    return NextResponse.json(
      {
        success: true,
        data: { ...newOrder.toObject(), id: newOrder._id.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
