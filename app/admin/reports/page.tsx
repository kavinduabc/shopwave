"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin-header";
import {
  Calendar,
  Download,
  TrendingUp,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { useStore } from "@/context/store-context";

export default function AdminReportsPage() {
  const { products, updateStock } = useStore();
  const [dateRange] = useState("01 Oct 2026 - 26 Oct 2026");

  // Bar chart daily sales data for October matching Mockup 9
  const salesDays = [
    { day: "Oct 1", height: 45, val: "Rs. 38k" },
    { day: "Oct 3", height: 60, val: "Rs. 52k" },
    { day: "Oct 5", height: 35, val: "Rs. 28k" },
    { day: "Oct 8", height: 75, val: "Rs. 68k" },
    { day: "Oct 10", height: 50, val: "Rs. 42k" },
    { day: "Oct 12", height: 85, val: "Rs. 78k" },
    { day: "Oct 15", height: 40, val: "Rs. 35k" },
    { day: "Oct 18", height: 95, val: "Rs. 89k" },
    { day: "Oct 20", height: 70, val: "Rs. 62k" },
    { day: "Oct 22", height: 65, val: "Rs. 58k" },
    { day: "Oct 25", height: 90, val: "Rs. 84k" },
    { day: "Oct 26", height: 80, val: "Rs. 72k" },
  ];

  // Top Selling Products matching Mockup 9
  const topSelling = [
    { rank: 1, name: "Banana", volume: "72 pcs", percent: 92 },
    { rank: 2, name: "Tomato", volume: "58 kg", percent: 84 },
    { rank: 3, name: "Fresh Milk", volume: "48 lt", percent: 76 },
    { rank: 4, name: "Bread Loaf", volume: "35 pcs", percent: 62 },
    { rank: 5, name: "Egg (10 pcs)", volume: "30 pcs", percent: 54 },
  ];

  // Low stock alert items matching Mockup 9
  const stockAlerts = products
    .filter((p) => p.stock <= p.lowStockThreshold)
    .slice(0, 5);

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Product,Category,Stock,Unit,Price\n" +
      products.map((p) => `"${p.name}","${p.category}",${p.stock},"${p.unit}",${p.price}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `foodcity_report_oct_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Reports" subtitle="Supermarket sales analytics & stock forecasts" />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Top Control Bar with Date Picker & Export matching Mockup 9 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Performance Summary</h2>
            <p className="text-xs text-gray-500">October 2026 financial and inventory audit</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Badge */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{dateRange}</span>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 3 KPI Cards matching Mockup 9 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Total Sales */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Sales
            </span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">
              Rs. 1,258,400
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% vs last month
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Orders
            </span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">
              320
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8% vs last month
            </p>
          </div>

          {/* Avg. Order Value */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Avg. Order Value
            </span>
            <h3 className="text-3xl font-black text-emerald-700 mt-2">
              Rs. 3,932
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +5% vs last month
            </p>
          </div>
        </div>

        {/* Sales Report Bar Chart matching Mockup 9 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Sales Report</h3>
              <p className="text-xs text-gray-500">Daily revenue distribution for current month</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
              <span className="text-xs text-gray-600 font-medium">Daily Revenue</span>
            </div>
          </div>

          {/* SVG/HTML Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2 border-b border-gray-100">
            {salesDays.map((bar) => (
              <div
                key={bar.day}
                className="flex-1 flex flex-col items-center gap-2 group relative"
              >
                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition absolute -top-8 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap z-20 pointer-events-none">
                  {bar.val}
                </span>

                {/* Bar */}
                <div
                  style={{ height: `${bar.height}%` }}
                  className="w-full max-w-[28px] rounded-t-md bg-emerald-600 group-hover:bg-emerald-500 transition-all duration-300"
                ></div>
                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-emerald-700 transition">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 Cards matching Mockup 9: Top Selling Products & Stock Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Top Selling Products
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Highest turnover groceries this month
            </p>

            <div className="space-y-4">
              {topSelling.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-800">
                      {item.rank}. {item.name}
                    </span>
                    <span className="text-emerald-700">{item.volume}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percent}%` }}
                      className="bg-emerald-600 h-full rounded-full"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Alert */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Stock Alert</span>
              </h3>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {stockAlerts.length} Action Needed
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              Items under minimum safety threshold
            </p>

            <div className="divide-y divide-gray-100">
              {stockAlerts.map((prod) => (
                <div
                  key={prod.id}
                  className="py-3 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 p-1 border border-gray-100">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">{prod.name}</span>
                      <span className="text-[10px] text-gray-500">
                        Threshold: {prod.lowStockThreshold} {prod.unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                      {prod.stock} {prod.unit} left
                    </span>
                    <button
                      onClick={() => updateStock(prod.id, prod.stock + 20)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition"
                      title="Quick restock +20 units"
                    >
                      Restock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
