"use client";

import Link from "next/link";
import {
  User, ShoppingBag, Heart, MapPin, Bell, Shield, ChevronRight, LogOut, Edit3, CheckCircle2
} from "lucide-react";
import { useStore } from "@/context/store-context";

export default function AccountPage() {
  const { orders } = useStore();

  // Simulate a logged-in user (demo – no full auth system)
  const user = {
    name: "R.D.K Piyumal",
    email: "piyumal@foodcity.lk",
    phone: "071 234 5678",
    address: "No. 123, Main Street, Colombo 03",
    memberSince: "October 2025",
    avatar: "PK",
  };

  const recentOrders = orders.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Processing": return "text-amber-700 bg-amber-50 border-amber-200";
      case "Pending": return "text-blue-700 bg-blue-50 border-blue-200";
      case "Shipped": return "text-purple-700 bg-purple-50 border-purple-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", href: "/orders", badge: orders.length.toString(), desc: "Track your grocery deliveries" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: "5", desc: "Saved items for later" },
    { icon: MapPin, label: "Saved Addresses", href: "#addresses", badge: null, desc: "Manage delivery locations" },
    { icon: Bell, label: "Notifications", href: "#notifications", badge: "2", desc: "Order updates & promos" },
    { icon: Shield, label: "Security & Privacy", href: "#security", badge: null, desc: "Password, data settings" },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-[#0b5435] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-600 border-4 border-emerald-400/40 flex items-center justify-center text-3xl font-black text-white shadow-lg">
          {user.avatar}
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest">My Account</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{user.name}</h1>
          <p className="text-emerald-200 text-sm mt-1">{user.email} · Member since {user.memberSince}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 bg-rose-600/80 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Account Menu */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition group ${idx < menuItems.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition">
                    <Icon className="w-4.5 h-4.5 w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Profile Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Contact Information</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Full Name</span>
                <span className="font-semibold text-gray-900">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Phone</span>
                <span className="font-semibold text-gray-900">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">City</span>
                <span className="font-semibold text-gray-900">Colombo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Recent Orders & Address */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-base">Recent Orders</h2>
              <Link href="/orders" className="text-xs font-semibold text-emerald-700 hover:underline">
                View All Orders
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No orders yet.{" "}
                <Link href="/shop" className="text-emerald-700 font-semibold hover:underline">
                  Start shopping!
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-5 flex items-center gap-4">
                    {/* Order Icon */}
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">Order #{order.id}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.items.length} item(s) · {order.date} · {order.paymentMethod}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-black text-emerald-700 text-sm">
                        Rs. {order.totalAmount.toLocaleString()}
                      </span>
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Address */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-base">Default Delivery Address</h2>
              <button className="text-xs font-semibold text-emerald-700 hover:underline">
                Change
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  {user.address}
                  <br />
                  Phone: {user.phone}
                </p>
                <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Default
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link href="/shop" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-5 rounded-2xl flex flex-col items-center gap-2 text-xs text-center transition shadow-md shadow-emerald-700/20">
              <ShoppingBag className="w-6 h-6" />
              Browse Groceries
            </Link>
            <Link href="/wishlist" className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold py-4 px-5 rounded-2xl flex flex-col items-center gap-2 text-xs text-center transition">
              <Heart className="w-6 h-6" />
              My Wishlist
            </Link>
            <Link href="/orders" className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-4 px-5 rounded-2xl flex flex-col items-center gap-2 text-xs text-center transition">
              <ShoppingBag className="w-6 h-6" />
              Track Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
