"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag, Search, Filter, ChevronDown, Package, Truck, CheckCircle2, Clock, X
} from "lucide-react";
import { useStore } from "@/context/store-context";
import { Order } from "@/data/mock-data";

export default function OrdersPage() {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchSearch =
      !searchTerm ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Pending": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shipped": return "bg-purple-50 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered": return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "Processing": return <Package className="w-4 h-4 text-amber-600" />;
      case "Shipped": return <Truck className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          My Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your grocery orders and delivery history
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID or name..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {(["All", "Pending", "Processing", "Shipped", "Delivered"]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === s
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-xs">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">No orders found</h3>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm ? "No orders match your search." : "You haven't placed any orders yet."}
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Shop Fresh Groceries
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">Order #{order.id}</p>
                    <p className="text-[11px] text-gray-400">{order.date} · {order.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-full ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Items Preview */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  {order.items.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 p-1 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-medium">
                    {order.items.length} item(s) · Delivered to {order.city}
                  </p>
                  <p className="font-black text-emerald-700">
                    Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>

                {/* Simple Status Progress Bar */}
                <div className="mt-3 flex items-center gap-1">
                  {["Pending", "Processing", "Shipped", "Delivered"].map((step, idx) => {
                    const steps = ["Pending", "Processing", "Shipped", "Delivered"];
                    const currentIdx = steps.indexOf(order.status);
                    const isCompleted = idx <= currentIdx;
                    return (
                      <div key={step} className="flex-1">
                        <div
                          className={`h-1.5 rounded-full transition ${
                            isCompleted ? "bg-emerald-600" : "bg-gray-200"
                          }`}
                        />
                        <p className={`text-[9px] mt-1 font-semibold text-center ${
                          isCompleted ? "text-emerald-700" : "text-gray-400"
                        }`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  Order Details
                </p>
                <h3 className="text-xl font-black mt-1">#{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Status:</span>
                <span className={`font-bold border px-2.5 py-0.5 rounded-full ${getStatusStyle(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer:</span>
                  <span className="font-bold text-gray-900">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-bold text-gray-900">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="font-bold text-gray-900 text-right max-w-[60%]">
                    {selectedOrder.address}, {selectedOrder.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment:</span>
                  <span className="font-bold text-gray-900">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-bold text-gray-900">{selectedOrder.date}</span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <h4 className="text-xs font-bold text-gray-900">Items Ordered:</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 p-0.5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-medium text-gray-800">
                          {item.quantity}x {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                <span className="font-bold text-gray-900">Total Paid / Payable:</span>
                <span className="font-black text-emerald-700 text-xl">
                  Rs. {selectedOrder.totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href="/shop"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs text-center transition"
                >
                  Reorder Items
                </Link>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-xs hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
