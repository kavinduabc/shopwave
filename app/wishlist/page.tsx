"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/store-context";

export default function WishlistPage() {
  const { products, addToCart } = useStore();

  // Demo: wishlist = first 5 products (in production this comes from backend/localStorage per user)
  const [wishlist, setWishlist] = useState(products.slice(0, 5));

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const moveToCart = (product: (typeof products)[0]) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </span>
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {wishlist.length} saved items — add to cart when you&apos;re ready to buy
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-xs">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Your wishlist is empty</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
            Browse fresh groceries and click the heart icon to save items for later.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => {
                wishlist.forEach((p) => addToCart(p, 1));
                setWishlist([]);
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition"
            >
              <ShoppingCart className="w-4 h-4" />
              Move All to Cart
            </button>
            <button
              onClick={() => setWishlist([])}
              className="flex items-center gap-2 border border-rose-200 text-rose-600 font-bold px-4 py-2 rounded-xl text-xs hover:bg-rose-50 transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear Wishlist
            </button>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-200 transition overflow-hidden flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-44 bg-gray-50 p-3">
                  <Link href={`/shop/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    />
                  </Link>

                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:border-rose-300 shadow-sm transition"
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-gray-600 font-semibold">{product.rating}</span>
                    </div>
                    <Link
                      href={`/shop/${product.id}`}
                      className="font-bold text-gray-900 text-sm hover:text-emerald-700 transition line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{product.category}</p>
                    <p className="text-emerald-700 font-black text-base mt-1">
                      Rs. {product.price}
                      <span className="text-[11px] text-gray-400 font-normal"> / {product.unit}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => moveToCart(product)}
                    className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
