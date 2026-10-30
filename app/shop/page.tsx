"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useStore } from "@/context/store-context";

function ShopContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const queryParam = searchParams.get("q") || "";

  const { products, addToCart } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    catParam || "All Products"
  );
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Categories list matching Mockup 2
  const categoriesList = [
    "All Products",
    "Fresh Produce",
    "Dairy & Eggs",
    "Bakery",
    "Beverages",
    "Snacks",
    "Household",
    "Personal Care",
    "Meat & Seafood",
  ];

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All Products" || p.category === selectedCategory;
      const matchesSearch =
        !queryParam ||
        p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.category.toLowerCase().includes(queryParam.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, queryParam]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: popularity / best sellers
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span>&gt;</span>
        <span className="text-emerald-700 font-semibold">{selectedCategory}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Category Sidebar matching Mockup 2 */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs sticky top-24">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Categories</span>
              <Filter className="w-4 h-4 text-emerald-600" />
            </h3>

            <div className="mt-4 space-y-1">
              {categoriesList.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                      isSelected
                        ? "bg-emerald-600 text-white font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {cat === "All Products"
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Product Grid matching Mockup 2 */}
        <main className="lg:col-span-3">
          {/* Header with Title & Sort Filter */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                {selectedCategory}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Showing {sortedProducts.length} items available in stock
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-emerald-500 focus:bg-white"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Grid (3 cols on desktop) */}
          {currentProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-base">
                No products found matching &ldquo;{selectedCategory}&rdquo;.
              </p>
              <button
                onClick={() => setSelectedCategory("All Products")}
                className="mt-4 text-sm font-semibold text-emerald-700 hover:underline"
              >
                Reset Filter to All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition overflow-hidden flex flex-col group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/shop/${product.id}`}
                    className="relative block h-44 sm:h-48 overflow-hidden bg-gray-50 p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    />
                    {product.stock <= product.lowStockThreshold && (
                      <span className="absolute top-3 right-3 bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Only {product.stock} left
                      </span>
                    )}
                  </Link>

                  {/* Card Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <Link
                        href={`/shop/${product.id}`}
                        className="block font-bold text-gray-900 text-base hover:text-emerald-700 transition mt-1 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <p className="text-emerald-700 font-black text-lg mt-1">
                        Rs. {product.price}
                        <span className="text-xs font-normal text-gray-500">
                          {" "}
                          / {product.unit}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-xs transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination matching Mockup 2 */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-9 h-9 rounded-xl font-bold text-xs transition ${
                  currentPage === num
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto p-12 text-center text-gray-400">
          Loading grocery catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
