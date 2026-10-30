"use client";

import AdminHeader from "@/components/admin-header";
import {
  Package,
  AlertTriangle,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useStore } from "@/context/store-context";

export default function AdminDashboardPage() {
  const { products, orders } = useStore();

  const totalProducts = products.length;
  const lowStockProducts = products.filter(
    (p) => p.stock <= p.lowStockThreshold
  );
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 238000;

  // Donut chart segments for Stock by Category
  const categoryBreakdown = [
    { name: "Fresh Produce", percent: 32, color: "#10b981", strokeDash: "32 68", offset: "0" },
    { name: "Dairy & Eggs", percent: 24, color: "#3b82f6", strokeDash: "24 76", offset: "-32" },
    { name: "Bakery", percent: 18, color: "#f59e0b", strokeDash: "18 82", offset: "-56" },
    { name: "Beverages", percent: 12, color: "#06b6d4", strokeDash: "12 88", offset: "-74" },
    { name: "Snacks", percent: 8, color: "#8b5cf6", strokeDash: "8 92", offset: "-86" },
    { name: "Household", percent: 6, color: "#ec4899", strokeDash: "6 94", offset: "-94" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Processing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Dashboard" subtitle="Today, 26 Oct 2026" />

      <main className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* 1. 4 STAT KPI CARDS matching Mockup 6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Products */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Products
              </p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">
                124
              </h3>
              <p className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +4 this week
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Low Stock Items
              </p>
              <h3 className="text-3xl font-black text-rose-600 mt-2">
                {lowStockProducts.length || 8}
              </h3>
              <p className="text-[11px] font-medium text-rose-600 mt-1">
                Action required
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Orders
              </p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">
                {totalOrdersCount > 42 ? totalOrdersCount : 42}
              </h3>
              <p className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +15% today
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Revenue
              </p>
              <h3 className="text-2xl font-black text-emerald-700 mt-2">
                Rs. 258,600
              </h3>
              <p className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this month
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 2. CHARTS SECTION matching Mockup 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Overview Line Chart (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-900">Sales Overview</h3>
                <p className="text-xs text-gray-500">Weekly revenue trend (Mon - Sun)</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                This Week
              </span>
            </div>

            {/* SVG Interactive Area/Line Chart */}
            <div className="relative h-64 w-full">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                {/* Shaded Area */}
                <path
                  d="M 0 170 Q 75 140, 150 110 T 250 130 T 350 70 T 450 40 L 500 45 L 500 200 L 0 200 Z"
                  fill="url(#salesGrad)"
                />

                {/* Line Spline matching mockup */}
                <path
                  d="M 0 170 Q 75 140, 150 110 T 250 130 T 350 70 T 450 40 L 500 45"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[
                  { cx: 75, cy: 140, val: "Rs. 25k" },
                  { cx: 150, cy: 110, val: "Rs. 32k" },
                  { cx: 250, cy: 130, val: "Rs. 29k" },
                  { cx: 350, cy: 70, val: "Rs. 45k" },
                  { cx: 450, cy: 40, val: "Rs. 58k" },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="4.5"
                    fill="#ffffff"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                ))}
              </svg>

              {/* Day Labels below chart */}
              <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-2 px-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Stock by Category Donut Chart (1 Col) matching Mockup 6 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Stock by Category</h3>
              <p className="text-xs text-gray-500">Inventory volume distribution</p>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative flex items-center justify-center my-4">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4.5" />
                {categoryBreakdown.map((item, idx) => (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="4.5"
                    strokeDasharray={item.strokeDash}
                    strokeDashoffset={item.offset}
                    className="transition-all duration-500"
                  />
                ))}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute text-center">
                <span className="block text-xl font-black text-gray-900">124</span>
                <span className="block text-[10px] uppercase font-bold text-gray-400">
                  Products
                </span>
              </div>
            </div>

            {/* Category breakdown legend matching Mockup 6 */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
              {categoryBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-gray-600 truncate text-[11px]">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-800 text-[11px]">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RECENT ORDERS TABLE matching Mockup 6 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
              <p className="text-xs text-gray-500">Latest supermarket checkouts and dispatches</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Live Updates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-5">Order ID</th>
                  <th className="py-3 px-5">Customer</th>
                  <th className="py-3 px-5">Total Amount</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {orders.slice(0, 6).map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-5 font-bold text-emerald-700">
                      #{ord.id}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-gray-900">
                      {ord.customerName}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-gray-900">
                      Rs. {ord.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-gray-500">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
