"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin-header";
import { Search, Eye, Filter, CheckCircle2, Clock, Truck, Check } from "lucide-react";
import { useStore } from "@/context/store-context";
import { Order } from "@/data/mock-data";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      statusFilter === "All" || o.status === statusFilter;
    const matchesSearch =
      !searchTerm ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Pending":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Orders Management" subtitle="Track customer grocery orders & fulfillment" />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter orders by status"
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order ID or name..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-5">Order ID</th>
                  <th className="py-3 px-5">Customer</th>
                  <th className="py-3 px-5">Address</th>
                  <th className="py-3 px-5">Items</th>
                  <th className="py-3 px-5">Total Amount</th>
                  <th className="py-3 px-5">Payment</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-5 font-bold text-emerald-700">
                      #{ord.id}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-gray-900">
                      {ord.customerName}
                    </td>
                    <td className="py-3.5 px-5 text-gray-500 max-w-xs truncate">
                      {ord.address}, {ord.city}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-gray-600">
                      {ord.items.length} items
                    </td>
                    <td className="py-3.5 px-5 font-bold text-gray-900">
                      Rs. {ord.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-gray-600">
                      {ord.paymentMethod}
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
                    <td className="py-3.5 px-5 text-center">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg font-semibold inline-flex items-center gap-1 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-base text-gray-900">
                  Order Details #{selectedOrder.id}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.district}</p>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              </div>

              {/* Status Update */}
              <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                <label className="text-xs font-bold text-gray-700">Update Order Status:</label>
                <div className="flex items-center gap-2">
                  <select
                    defaultValue={selectedOrder.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value as "Pending" | "Processing" | "Shipped" | "Delivered";
                      setUpdatingStatus(true);
                      await updateOrderStatus(selectedOrder.id, newStatus);
                      setSelectedOrder({ ...selectedOrder, status: newStatus });
                      setUpdatingStatus(false);
                    }}
                    disabled={updatingStatus}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-500"
                    aria-label="Update order status"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  {updatingStatus && (
                    <span className="text-xs text-emerald-600 font-semibold">Saving...</span>
                  )}
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <h4 className="font-bold text-xs text-gray-700">Purchased Items:</h4>
                <div className="max-h-40 overflow-y-auto divide-y divide-gray-100 text-xs">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="py-1.5 flex justify-between">
                      <span>{it.quantity}x {it.name}</span>
                      <span className="font-bold">Rs. {it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-emerald-700 text-base">
                  Rs. {selectedOrder.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
