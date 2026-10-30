"use client";

import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShoppingCart } from "lucide-react";
import { useStore } from "@/context/store-context";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  const deliveryFee = cart.length > 0 ? 100 : 0;
  const finalTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto w-full px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          You haven&apos;t added any fresh groceries to your cart yet. Explore our fresh market now!
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Your Cart <span className="text-emerald-700 font-bold">({cartCount} items)</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review your grocery items and proceed to fast islandwide checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items Table matching Mockup 4 */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="divide-y divide-gray-100">
            {cart.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/shop/${item.product.id}`}
                        className="font-bold text-gray-900 text-sm hover:text-emerald-700 transition"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        Rs. {item.product.price} / {item.product.unit}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center text-xs font-semibold text-gray-700 hidden sm:block">
                    Rs. {item.product.price}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-emerald-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-emerald-700"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="col-span-2 flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="font-bold text-emerald-800 text-sm">
                      Rs. {itemTotal}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-600 p-1 rounded transition"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Summary Card matching Mockup 4 */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-5">
          <h3 className="font-extrabold text-gray-900 text-base pb-3 border-b border-gray-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">Rs. {cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-gray-900">Rs. {deliveryFee}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
              <span className="font-extrabold text-gray-900 text-base">Total</span>
              <span className="font-black text-emerald-700 text-2xl">
                Rs. {finalTotal}
              </span>
            </div>
          </div>

          {/* Proceed to Checkout Button */}
          <Link
            href="/checkout"
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-emerald-700/20 transition"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Continue Shopping Link */}
          <div className="text-center pt-1">
            <Link
              href="/shop"
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
