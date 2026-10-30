"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Mail, Phone, MapPin, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function SiteFooter() {
  const pathname = usePathname();

  // If in admin routes, don't show customer footer
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-auto">
      {/* Top Value Banner */}
      <div className="border-b border-emerald-900/60 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-700/50 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Fresh & Organic</h4>
              <p className="text-xs text-emerald-300/80">Directly from verified local farmers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-700/50 flex items-center justify-center text-emerald-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Express Islandwide Delivery</h4>
              <p className="text-xs text-emerald-300/80">Within 2 hours in metropolitan areas</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-700/50 flex items-center justify-center text-emerald-300">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Easy Returns & Refunds</h4>
              <p className="text-xs text-emerald-300/80">Instant replacement for damaged items</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-700/50 flex items-center justify-center text-emerald-300">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-emerald-300/80">Call us anytime on 011 234 5678</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white">Food City</span>
          </div>
          <p className="text-sm text-emerald-300/80 max-w-sm mb-6 leading-relaxed">
            Sri Lanka&apos;s favorite neighborhood supermarket. Bringing farm-fresh produce, groceries, meats, and daily household essentials straight to your doorstep.
          </p>
          <div className="space-y-2 text-xs text-emerald-300/90">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> No. 123 Galle Road, Colombo 03, Sri Lanka
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> support@foodcitysuper.lk
            </p>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm text-emerald-300/80">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-white transition">Browse All Products</Link></li>
            <li><Link href="/cart" className="hover:text-white transition">View Shopping Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-white transition">Checkout</Link></li>
            <li><Link href="/admin" className="text-emerald-400 hover:text-white font-medium transition">Admin & Inventory</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h5>
          <ul className="space-y-2 text-sm text-emerald-300/80">
            <li><Link href="/shop?cat=Fresh+Produce" className="hover:text-white transition">Fresh Produce</Link></li>
            <li><Link href="/shop?cat=Dairy+%26+Eggs" className="hover:text-white transition">Dairy & Eggs</Link></li>
            <li><Link href="/shop?cat=Bakery" className="hover:text-white transition">Bakery & Breads</Link></li>
            <li><Link href="/shop?cat=Meat+%26+Seafood" className="hover:text-white transition">Meat & Poultry</Link></li>
            <li><Link href="/shop?cat=Beverages" className="hover:text-white transition">Beverages & Juices</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Care</h5>
          <ul className="space-y-2 text-sm text-emerald-300/80">
            <li><Link href="/about" className="hover:text-white transition">About Food City</Link></li>
            <li><Link href="/about#faq" className="hover:text-white transition">Delivery Information</Link></li>
            <li><Link href="/about#terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link href="/about#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-900/60 py-6 text-center text-xs text-emerald-400/80">
        <p>© 2026 Food City Supermarkets PLC. All Rights Reserved. Built with Next.js.</p>
      </div>
    </footer>
  );
}
