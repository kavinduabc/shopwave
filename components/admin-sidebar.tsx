"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Truck,
  BarChart3,
  Users,
  Settings,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Inventory", href: "/admin/inventory", icon: Layers },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0d2218] text-gray-300 flex flex-col min-h-screen border-r border-[#163627] flex-shrink-0">
      {/* Brand Header matching Mockup 6-9 */}
      <div className="h-16 flex items-center px-6 border-b border-[#163627]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">Food City</span>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider -mt-1">
              Admin & Inventory
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Management
        </p>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/40"
                  : "text-gray-300 hover:bg-[#163627] hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-emerald-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick link back to customer website */}
      <div className="px-3 py-3 border-t border-[#163627]">
        <Link
          href="/"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-emerald-300 bg-[#163627]/60 hover:bg-emerald-600 hover:text-white transition group"
        >
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            View Storefront
          </span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Bottom Profile matching mockups */}
      <div className="p-4 border-t border-[#163627] flex items-center gap-3 bg-[#0a1a12]">
        <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-500/50 flex items-center justify-center text-white font-bold text-sm shadow">
          AD
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate">Admin</span>
          <span className="text-xs text-emerald-400/80 truncate">Administrator</span>
        </div>
      </div>
    </aside>
  );
}
