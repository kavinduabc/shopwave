"use client";

import Link from "next/link";
import { Plus, Tag, Clock, Zap, Star, ArrowRight, ShoppingCart } from "lucide-react";
import { useStore } from "@/context/store-context";

export default function DealsPage() {
  const { products, addToCart } = useStore();

  // Create different deal categories from real products
  const flashDeals = products.slice(0, 4).map((p) => ({
    ...p,
    discount: 20,
    discountedPrice: Math.round(p.price * 0.8),
  }));

  const weeklyOffers = products.slice(4, 8).map((p) => ({
    ...p,
    discount: 15,
    discountedPrice: Math.round(p.price * 0.85),
  }));

  const bundleDeals = [
    {
      id: "bundle-1",
      name: "Fresh Veggie Basket",
      items: "Tomato 1kg + Potato 1kg + Onion 1kg + Carrot 500g",
      originalPrice: 850,
      bundlePrice: 620,
      discount: 27,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "bundle-2",
      name: "Breakfast Combo",
      items: "Fresh Milk 1L + Eggs (10pcs) + Bread Loaf",
      originalPrice: 960,
      bundlePrice: 750,
      discount: 22,
      image: "https://images.unsplash.com/photo-1533920379810-6bedac961555?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "bundle-3",
      name: "Weekly Protein Pack",
      items: "Chicken Breast 1kg + Eggs (10pcs) + Fresh Milk 1L",
      originalPrice: 1390,
      bundlePrice: 1100,
      discount: 21,
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 space-y-14">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-rose-700 via-orange-600 to-amber-500 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
          <div className="text-[12rem] font-black leading-none text-white select-none">%</div>
        </div>

        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" /> Limited Time Offers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Today&apos;s Best<br />
            Fresh Deals 🛒
          </h1>
          <p className="text-white/90 text-sm mt-3 max-w-md leading-relaxed">
            Save big on farm-fresh vegetables, dairy, meats and everyday grocery essentials. Deals refresh every 24 hours!
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link
              href="/shop"
              className="bg-white text-rose-700 font-black px-6 py-3 rounded-full text-sm shadow-lg hover:shadow-xl transition hover:-translate-y-0.5"
            >
              Shop All Deals
            </Link>
            <span className="text-white/80 text-xs font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Refreshes daily at 6:00 AM
            </span>
          </div>
        </div>
      </section>

      {/* 4 Offer Category Banners */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { emoji: "🥦", title: "Fresh Produce", discount: "Up to 20% OFF", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
          { emoji: "🥛", title: "Dairy & Eggs", discount: "Up to 15% OFF", color: "bg-blue-50 border-blue-200 text-blue-800" },
          { emoji: "🍗", title: "Meat & Poultry", discount: "Up to 10% OFF", color: "bg-rose-50 border-rose-200 text-rose-800" },
          { emoji: "🍞", title: "Bakery Items", discount: "Buy 2 Get 1", color: "bg-amber-50 border-amber-200 text-amber-800" },
        ].map((item) => (
          <Link
            key={item.title}
            href={`/shop?cat=${encodeURIComponent(item.title.split(" ")[0])}`}
            className={`${item.color} border rounded-2xl p-4 text-center hover:shadow-md transition group`}
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition duration-300">
              {item.emoji}
            </div>
            <p className="font-bold text-sm">{item.title}</p>
            <p className="text-xs font-black mt-1 opacity-80">{item.discount}</p>
          </Link>
        ))}
      </div>

      {/* Flash Deals Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">⚡ Flash Deals</h2>
              <p className="text-xs text-gray-500">Grab them before they&apos;re gone!</p>
            </div>
          </div>
          <Link href="/shop" className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {flashDeals.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-rose-200 transition overflow-hidden group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 bg-gray-50 p-3">
                <Link href={`/shop/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </Link>
                {/* Discount Badge */}
                <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm">
                  -{product.discount}%
                </span>
              </div>

              {/* Details */}
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-gray-600 font-semibold">{product.rating}</span>
                  </div>
                  <Link href={`/shop/${product.id}`} className="font-bold text-gray-900 text-sm hover:text-emerald-700 line-clamp-1 transition">
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-700 font-black text-base">
                      Rs. {product.discountedPrice}
                    </span>
                    <span className="text-gray-400 text-xs line-through">Rs. {product.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product as any, 1)}
                  className="mt-3 w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Offers */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">🏷️ Weekly Offers</h2>
              <p className="text-xs text-gray-500">Valid through this week only</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {weeklyOffers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-200 transition overflow-hidden group flex flex-col"
            >
              <div className="relative h-44 bg-gray-50 p-3">
                <Link href={`/shop/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition duration-300" />
                </Link>
                <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-sm">
                  -{product.discount}%
                </span>
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <Link href={`/shop/${product.id}`} className="font-bold text-gray-900 text-sm hover:text-emerald-700 line-clamp-1 transition">
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-700 font-black text-base">
                      Rs. {product.discountedPrice}
                    </span>
                    <span className="text-gray-400 text-xs line-through">Rs. {product.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product as any, 1)}
                  className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundle Deals */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-lg">
            🎁
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">🎁 Bundle Deals</h2>
            <p className="text-xs text-gray-500">Buy more, save more with curated grocery bundles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bundleDeals.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-amber-200 transition overflow-hidden group"
            >
              <div className="h-44 overflow-hidden bg-gray-50">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    BUNDLE -{bundle.discount}%
                  </span>
                </div>
                <h3 className="font-black text-gray-900 text-base">{bundle.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{bundle.items}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-black text-emerald-700 text-xl">
                    Rs. {bundle.bundlePrice}
                  </span>
                  <span className="text-gray-400 text-sm line-through">Rs. {bundle.originalPrice}</span>
                  <span className="text-[10px] font-bold text-white bg-rose-600 px-1.5 py-0.5 rounded-full">
                    Save Rs. {bundle.originalPrice - bundle.bundlePrice}
                  </span>
                </div>
                <Link
                  href="/shop"
                  className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Get Bundle Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
