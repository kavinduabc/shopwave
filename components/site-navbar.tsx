"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  User,
  LayoutDashboard,
  Menu,
  X,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "@/context/store-context";

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // If in admin routes, don't show customer navbar
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    router.push(`/shop?q=${encodeURIComponent(searchInput)}`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/shop" },
    { name: "Offers", href: "/shop?filter=offers" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/about#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top utility strip */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            Hotline: 011 234 5678 (24/7 Islandwide Delivery)
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Open Daily: 8:00 AM - 10:00 PM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 font-semibold text-emerald-300 hover:text-white bg-emerald-800/60 px-2.5 py-0.5 rounded-full transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            Switch to Admin / Inventory
          </Link>
        </div>
      </div>

      {/* Main header bar */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo matching Mockup 1 */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-700 transition">
              <ShoppingCart className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-emerald-700 font-sans">
                Food City
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 -mt-1">
                Fresh Supermarket
              </span>
            </div>
          </Link>

          {/* Search bar matching mockups */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl mx-2 hidden sm:flex items-center relative"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for products, groceries, fresh veggies..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Login / Register */}
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-emerald-700 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden md:inline">Login / Register</span>
            </Link>

            {/* Cart Icon with badge */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition text-emerald-800"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-emerald-700" />
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              </div>
              <span className="hidden lg:inline text-sm font-semibold text-emerald-900">
                Cart
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-gray-600 hover:text-emerald-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearch} className="mt-3 flex sm:hidden relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search groceries..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Primary Navigation Bar (Dark Green `#0f5132` / `#0d5c3a`) */}
      <nav className="bg-[#0b5435] text-white hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 text-sm font-medium transition rounded-md ${
                    isActive
                      ? "bg-emerald-800 text-white font-semibold shadow-inner"
                      : "text-emerald-50 hover:bg-emerald-800/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="text-xs font-medium text-emerald-200 hidden md:flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Fresh Produce Harvested Today
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0b5435] border-t border-emerald-800 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-emerald-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-emerald-800/80">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold text-emerald-300 bg-emerald-900"
            >
              📊 Go to Admin & Inventory
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
