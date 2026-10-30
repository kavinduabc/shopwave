/**
 * GET /api/reports
 * Returns real-time analytics computed from live MongoDB data:
 *  - Total revenue, order count, average order value
 *  - Stock health summary (in stock / low stock / out of stock)
 *  - Top 5 selling products by revenue
 *  - Low stock alert items
 *  - Monthly sales breakdown
 */

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const [products, orders] = await Promise.all([
      Product.find({}).lean(),
      Order.find({}).lean(),
    ]);

    // ---------- Revenue & Orders ----------
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    // ---------- Stock Health ----------
    const totalProducts = products.length;
    const lowStockItems = products.filter(
      (p) => p.stock > 0 && p.stock <= p.lowStockThreshold
    );
    const outOfStockItems = products.filter((p) => p.stock === 0);

    // ---------- Top Selling Products (by total revenue) ----------
    const productRevenue: Record<string, { name: string; revenue: number; qty: number; unit: string }> = {};

    for (const order of orders) {
      for (const item of order.items) {
        const key = item.productId;
        if (!productRevenue[key]) {
          productRevenue[key] = {
            name: item.name,
            revenue: 0,
            qty: 0,
            unit: item.unit,
          };
        }
        productRevenue[key].revenue += item.price * item.quantity;
        productRevenue[key].qty += item.quantity;
      }
    }

    const topSelling = Object.values(productRevenue)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((item, idx) => ({
        rank: idx + 1,
        name: item.name,
        volume: `${item.qty} ${item.unit}`,
        revenue: item.revenue,
        percent: 0, // filled below
      }));

    // Normalize percents relative to top seller
    if (topSelling.length > 0) {
      const maxRevenue = topSelling[0].revenue;
      topSelling.forEach((item) => {
        item.percent = Math.round((item.revenue / maxRevenue) * 100);
      });
    }

    // ---------- Monthly Sales Breakdown ----------
    const monthlySales: Record<string, number> = {};
    for (const order of orders) {
      const monthKey = order.date
        ? order.date.substring(0, 7) // "YYYY-MM"
        : new Date(order.createdAt).toISOString().substring(0, 7);
      monthlySales[monthKey] = (monthlySales[monthKey] || 0) + order.totalAmount;
    }

    const monthlySalesArray = Object.entries(monthlySales)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, sales]) => ({ month, sales }));

    // ---------- Category Breakdown (by stock count) ----------
    const categoryStock: Record<string, number> = {};
    for (const p of products) {
      categoryStock[p.category] = (categoryStock[p.category] || 0) + p.stock;
    }
    const totalStock = Object.values(categoryStock).reduce((a, b) => a + b, 0);
    const categoryBreakdown = Object.entries(categoryStock)
      .sort(([, a], [, b]) => b - a)
      .map(([name, stock]) => ({
        name,
        stock,
        percent: totalStock > 0 ? Math.round((stock / totalStock) * 100) : 0,
      }));

    return NextResponse.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        avgOrderValue,
        totalProducts,
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
        lowStockItems: lowStockItems.map((p) => ({
          id: (p._id as unknown as { toString(): string }).toString(),
          name: p.name,
          category: p.category,
          stock: p.stock,
          lowStockThreshold: p.lowStockThreshold,
          unit: p.unit,
          image: p.image,
        })),
        topSelling,
        monthlySales: monthlySalesArray,
        categoryBreakdown,
      },
    });
  } catch (error) {
    console.error("GET /api/reports error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
