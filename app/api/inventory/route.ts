/**
 * GET /api/inventory  - List all products with computed stock health status
 * Uses MongoDB (Product model) instead of the file-based db.json
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};

    if (category && category !== "All" && category !== "All Categories") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ name: 1 })
      .lean();

    // Compute stock health status for each product
    let items = products.map((p) => {
      let stockStatus = "In Stock";
      if (p.stock === 0) stockStatus = "Out of Stock";
      else if (p.stock <= p.lowStockThreshold) stockStatus = "Low Stock";

      return {
        id: (p._id as unknown as { toString(): string }).toString(),
        name: p.name,
        category: p.category,
        image: p.image,
        currentStock: p.stock,
        unit: p.unit,
        price: p.price,
        lowStockThreshold: p.lowStockThreshold,
        status: stockStatus,
      };
    });

    // Filter by status after computing it
    if (status && status !== "All") {
      items = items.filter(
        (i) => i.status.toLowerCase() === status.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("GET /api/inventory error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}
