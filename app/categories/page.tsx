"use client";

import Link from "next/link";
import { useStore } from "@/context/store-context";
import { ArrowRight, ShoppingBag } from "lucide-react";

const CATEGORY_META: Record<string, { emoji: string; color: string; bg: string; desc: string }> = {
  Vegetables: { emoji: "🥦", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", desc: "Fresh farm vegetables delivered daily" },
  Fruits: { emoji: "🍎", color: "text-rose-700", bg: "bg-rose-50 border-rose-200", desc: "Sweet & juicy seasonal fruits" },
  Dairy: { emoji: "🥛", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", desc: "Fresh milk, cheese, curd & butter" },
  Bakery: { emoji: "🍞", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", desc: "Freshly baked breads & pastries" },
  Meat: { emoji: "🍗", color: "text-orange-700", bg: "bg-orange-50 border-orange-200", desc: "Quality chicken, beef & seafood" },
  Beverages: { emoji: "🧃", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", desc: "Juices, water, tea, coffee & sodas" },
  Snacks: { emoji: "🍿", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", desc: "Chips, biscuits & healthy bites" },
  Pantry: { emoji: "🫙", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", desc: "Rice, dhal, spices & dry goods" },
  Cleaning: { emoji: "🧹", color: "text-teal-700", bg: "bg-teal-50 border-teal-200", desc: "Household and cleaning supplies" },
  Personal: { emoji: "🪥", color: "text-pink-700", bg: "bg-pink-50 border-pink-200", desc: "Personal care & hygiene products" },
};

export default function CategoriesPage() {
  const { products } = useStore();

  // Build category stats from real products
  const categoryMap: Record<string, { count: number; items: typeof products }> = {};
  products.forEach((p) => {
    const cat = p.category;
    if (!categoryMap[cat]) categoryMap[cat] = { count: 0, items: [] };
    categoryMap[cat].count++;
    categoryMap[cat].items.push(p);
  });

  const categories = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    count: data.count,
    preview: data.items.slice(0, 3),
    meta: CATEGORY_META[name] || {
      emoji: "🛒",
      color: "text-gray-700",
      bg: "bg-gray-50 border-gray-200",
      desc: "Browse our collection",
    },
  }));

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          <ShoppingBag className="w-3.5 h-3.5" />
          Browse by Category
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          All Categories
        </h1>
        <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
          Shop conveniently from our wide selection of fresh groceries, dairy, pantry essentials, and more.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/shop?category=${encodeURIComponent(cat.name)}`}
            className={`${cat.meta.bg} border rounded-2xl p-5 hover:shadow-md transition group hover:-translate-y-0.5 relative overflow-hidden`}
          >
            {/* Emoji */}
            <div className="text-5xl mb-4 group-hover:scale-110 transition duration-300">
              {cat.meta.emoji}
            </div>

            {/* Name + Count */}
            <h2 className={`font-black text-lg ${cat.meta.color}`}>{cat.name}</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cat.meta.desc}</p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-bold text-gray-600">
                {cat.count} item{cat.count !== 1 ? "s" : ""}
              </span>
              <span className={`flex items-center gap-1 text-xs font-bold ${cat.meta.color} opacity-0 group-hover:opacity-100 transition`}>
                Shop now <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Mini Product Previews */}
            <div className="flex gap-1.5 mt-3">
              {cat.preview.map((p) => (
                <div key={p.id} className="w-10 h-10 rounded-lg bg-white border border-white/80 shadow-xs p-0.5 flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 bg-gradient-to-r from-emerald-900 to-[#0b5435] rounded-3xl p-8 sm:p-12 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-3">
          Can&apos;t find what you&apos;re looking for?
        </h2>
        <p className="text-emerald-200 text-sm max-w-sm mx-auto mb-6">
          Browse our full shop catalog with powerful filters to find exactly what you need.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-white text-emerald-800 font-black px-8 py-3.5 rounded-full text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
        >
          <ShoppingBag className="w-4.5 h-4.5 w-5 h-5" />
          Browse Full Shop
        </Link>
      </div>
    </div>
  );
}
