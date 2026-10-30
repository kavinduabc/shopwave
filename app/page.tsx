"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Percent,
  Plus,
  Star,
  Check,
} from "lucide-react";
import { useStore } from "@/context/store-context";

export default function HomePage() {
  const { products, categories, addToCart } = useStore();

  // Pick best seller products (e.g. Tomato, Banana, Milk, Bread) matching Mockup 1
  const bestSellers = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION matching Mockup 1 */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#073822] via-[#0b4d31] to-[#0e5c3b] text-white py-12 md:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="space-y-6 z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide border border-emerald-400/30">
              🌱 100% Farm Fresh Guaranteed
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Fresh Food <br />
              <span className="text-emerald-400">Better Life</span>
            </h1>
            <p className="text-emerald-100/90 text-base sm:text-lg max-w-lg leading-relaxed">
              Quality groceries, fresh produce and everyday essentials — all in one place. Direct from certified organic farmers to your kitchen table.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-950/30 transition transform hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full border border-white/20 transition"
              >
                <span>Inventory System</span>
              </Link>
            </div>
          </div>

          {/* Hero Right Image - Basket of fresh vegetables */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/50 border-4 border-emerald-500/20">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&auto=format&fit=crop&q=80"
                alt="Fresh vegetable basket with tomatoes, greens, bell peppers and carrots"
                className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-gray-900 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-emerald-700 tracking-wider">
                    Today&apos;s Special Offer
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    Up to 30% Off on Fresh Produce
                  </p>
                </div>
                <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full">
                  Save Big
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 FEATURE HIGHLIGHTS matching Mockup 1 */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 -mt-6 sm:-mt-8 z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-gray-200/50 border border-gray-100 flex items-center gap-3.5 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Fresh & Quality</h4>
              <p className="text-xs text-gray-500 font-medium">Guaranteed</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-gray-200/50 border border-gray-100 flex items-center gap-3.5 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Truck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Fast Delivery</h4>
              <p className="text-xs text-gray-500 font-medium">Island Wide</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-gray-200/50 border border-gray-100 flex items-center gap-3.5 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <CreditCard className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Secure Payment</h4>
              <p className="text-xs text-gray-500 font-medium">Options</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-gray-200/50 border border-gray-100 flex items-center gap-3.5 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Percent className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Best Prices</h4>
              <p className="text-xs text-gray-500 font-medium">Everyday</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES matching Mockup 1 */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Popular Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore freshly sourced categories for your weekly kitchen restock
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Circular category cards */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?cat=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-md transition text-center group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 group-hover:scale-110 group-hover:bg-emerald-100 transition duration-300">
                {cat.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition">
                {cat.name}
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5">
                {cat.itemCount} Items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLING PRODUCTS matching Mockup 1 */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Best Selling Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Hand-picked staples loved by thousands of Food City families
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid: Tomato, Banana, Fresh Milk 1L, Bread Loaf */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition overflow-hidden flex flex-col group"
            >
              {/* Product Image */}
              <Link
                href={`/shop/${product.id}`}
                className="relative block h-44 sm:h-52 overflow-hidden bg-gray-50 p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Fresh
                </span>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      ({product.reviewsCount})
                    </span>
                  </div>
                  <Link
                    href={`/shop/${product.id}`}
                    className="font-bold text-gray-900 text-base hover:text-emerald-700 transition line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-emerald-700 font-extrabold text-lg mt-1">
                    Rs. {product.price}
                    <span className="text-xs font-normal text-gray-500">
                      {" "}
                      / {product.unit}
                    </span>
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product, 1)}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
