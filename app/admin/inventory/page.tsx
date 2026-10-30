"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin-header";
import { Search, Plus, Minus, Check, AlertTriangle, Layers } from "lucide-react";
import { useStore } from "@/context/store-context";

export default function AdminInventoryPage() {
  const { products, updateStock } = useStore();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Fresh Produce",
    "Dairy & Eggs",
    "Bakery",
    "Beverages",
    "Snacks",
    "Household",
    "Meat & Seafood",
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    const isLow = p.stock <= p.lowStockThreshold;
    const isOut = p.stock === 0;

    let matchesStatus = true;
    if (statusFilter === "In Stock") matchesStatus = !isLow && !isOut;
    else if (statusFilter === "Low Stock") matchesStatus = isLow && !isOut;
    else if (statusFilter === "Out of Stock") matchesStatus = isOut;

    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Inventory" subtitle="Warehouse stock tracking & restock alerts" />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Filter Controls matching Mockup 8 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter inventory by category"
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter inventory by status"
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Search Box matching Mockup 8 */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Inventory Table matching Mockup 8 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-5">Product</th>
                  <th className="py-3 px-5 text-center">Current Stock</th>
                  <th className="py-3 px-5 text-center">Unit</th>
                  <th className="py-3 px-5 text-center">Status</th>
                  <th className="py-3 px-5 text-center">Quick Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredProducts.map((prod) => {
                  const isLow = prod.stock <= prod.lowStockThreshold && prod.stock > 0;
                  const isOut = prod.stock === 0;

                  return (
                    <tr key={prod.id} className="hover:bg-gray-50/70 transition">
                      {/* Product (Image + Name) */}
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 border border-gray-100 flex items-center justify-center flex-shrink-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">
                              {prod.name}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {prod.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Current Stock */}
                      <td className="py-3 px-5 text-center font-bold text-sm text-gray-900">
                        {prod.stock}
                      </td>

                      {/* Unit */}
                      <td className="py-3 px-5 text-center font-medium text-gray-600">
                        {prod.unit}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isOut
                              ? "bg-gray-100 text-gray-700 border-gray-300"
                              : isLow
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
                        </span>
                      </td>

                      {/* Quick Adjust Buttons */}
                      <td className="py-3 px-5 text-center">
                        <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1 gap-1">
                          <button
                            onClick={() => updateStock(prod.id, prod.stock - 1)}
                            className="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-rose-600 active:scale-95"
                            title="Decrease Stock"
                            aria-label="Decrease Stock"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-bold text-xs text-gray-800">
                            {prod.stock}
                          </span>
                          <button
                            onClick={() => updateStock(prod.id, prod.stock + 5)}
                            className="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-emerald-700 active:scale-95"
                            title="Restock +5"
                            aria-label="Restock +5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
