/**
 * GET  /api/products        - List all products (with optional filters)
 * POST /api/products        - Create a new product
 *
 * BEGINNER NOTE:
 *  We first call `connectDB()` to make sure MongoDB is connected,
 *  then we use the Product model to read/write data.
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    // Build a MongoDB filter object (like a WHERE clause in SQL)
    const filter: Record<string, unknown> = {};

    if (category && category !== "All" && category !== "All Products") {
      // Case-insensitive category match
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      // Search by name OR category (case-insensitive)
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Determine MongoDB sort order
    let sortOption: Record<string, 1 | -1> = { reviewsCount: -1 }; // default
    if (sort === "price-low") sortOption = { price: 1 };
    else if (sort === "price-high") sortOption = { price: -1 };
    else if (sort === "name") sortOption = { name: 1 };

    const products = await Product.find(filter).sort(sortOption).lean();

    // Convert MongoDB _id to string id for frontend compatibility
    const formatted = products.map((p) => ({
      ...p,
      id: (p._id as unknown as { toString(): string }).toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products from MongoDB" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name, price, and category are required." },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      unit: body.unit || "kg",
      stock: Number(body.stock) || 0,
      lowStockThreshold: Number(body.lowStockThreshold) || 10,
      rating: 4.8,
      reviewsCount: 1,
      image:
        body.image ||
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      description: body.description || "Fresh supermarket product.",
      nutrition: body.nutrition || "Natural and fresh.",
      isBestSeller: Boolean(body.isBestSeller),
    });

    return NextResponse.json(
      {
        success: true,
        data: { ...newProduct.toObject(), id: newProduct._id.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
