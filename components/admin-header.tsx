"use client";

import { Bell, Search, User } from "lucide-react";
import { useStore } from "@/context/store-context";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { products, orders } = useStore();
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
        <p className="text-xs text-gray-500 font-medium">
          {subtitle || "Today, 26 Oct 2026"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-56 bg-gray-50 border border-gray-200 rounded-lg py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Notifications Icon with low stock alert indicator */}
        <div className="relative cursor-pointer p-2 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-gray-100 transition">
          <Bell className="w-5 h-5" />
          {lowStockCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-gray-800">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
