"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, ShoppingCart, Truck } from "lucide-react";
import { useStore } from "@/context/store-context";
import { Order } from "@/data/mock-data";

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Shipping Form State matching Mockup 5
  const [formData, setFormData] = useState({
    fullName: "R.D.K Piyumal",
    phone: "071 234 5678",
    address: "No. 123, Main Street",
    city: "Colombo",
    district: "Colombo",
  });

  // Payment Method State matching Mockup 5
  const [paymentMethod, setPaymentMethod] = useState<
    "Cash on Delivery" | "Card Payment" | "Online Banking"
  >("Cash on Delivery");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 100;
  const finalTotal = (cart.length > 0 ? cartTotal : 3832) + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = await placeOrder({
        customerName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        paymentMethod: paymentMethod,
      });

      setPlacedOrder(order);
      setCurrentStep(3);
    } catch (err) {
      console.error("Order placement error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Confirmation Screen
  if (currentStep === 3 && placedOrder) {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-3">
              Thank You for Your Order!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Your grocery order <strong className="text-emerald-700">#{placedOrder.id}</strong> has been received and is now being packed with fresh farm produce.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Customer:</span>
              <span className="font-bold text-gray-900">{placedOrder.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="font-bold text-gray-900">
                {placedOrder.address}, {placedOrder.city}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Payment:</span>
              <span className="font-bold text-gray-900">{placedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-gray-700">Total Paid/Payable:</span>
              <span className="font-black text-emerald-700 text-lg">
                Rs. {placedOrder.totalAmount}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/admin/orders"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition"
            >
              Track in Admin Dashboard
            </Link>
            <Link
              href="/shop"
              className="py-3 px-6 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Checkout
        </h1>

        {/* Stepper matching Mockup 5: (1) Shipping -> (2) Payment -> (3) Confirm */}
        <div className="flex items-center gap-3 sm:gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800">
              Shipping
            </span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-emerald-200"></div>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800">
              Payment
            </span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-gray-200"></div>

          <div className="flex items-center gap-2 opacity-60">
            <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Confirm
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Shipping Address matching Mockup 5 */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <span>Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  District
                </label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method matching Mockup 5 */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Payment Method</span>
            </h3>

            <div className="space-y-3">
              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod("Cash on Delivery")}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "Cash on Delivery"
                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <p className="font-bold text-sm text-gray-900">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">
                    Pay with cash when you receive your fresh grocery order
                  </p>
                </div>
              </label>

              {/* Card Payment */}
              <label
                onClick={() => setPaymentMethod("Card Payment")}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "Card Payment"
                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Card Payment"}
                  onChange={() => setPaymentMethod("Card Payment")}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <p className="font-bold text-sm text-gray-900">Card Payment</p>
                  <p className="text-xs text-gray-500">
                    Pay securely with Visa, Mastercard, or American Express
                  </p>
                </div>
              </label>

              {/* Online Banking */}
              <label
                onClick={() => setPaymentMethod("Online Banking")}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "Online Banking"
                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Online Banking"}
                  onChange={() => setPaymentMethod("Online Banking")}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <p className="font-bold text-sm text-gray-900">Online Banking</p>
                  <p className="text-xs text-gray-500">
                    Pay via instant bank transfer / LankaQR
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary & Place Order button matching Mockup 5 */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-5 sticky top-24">
          <h3 className="font-extrabold text-gray-900 text-base pb-3 border-b border-gray-100">
            Order Review
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((c) => (
              <div key={c.product.id} className="flex justify-between items-center text-xs">
                <span className="text-gray-700 font-medium">
                  {c.quantity}x {c.product.name}
                </span>
                <span className="font-bold text-gray-900">
                  Rs. {c.product.price * c.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-gray-900">Rs. {deliveryFee}</span>
            </div>
            <div className="pt-2 flex justify-between items-baseline">
              <span className="font-extrabold text-gray-900 text-base">Total</span>
              <span className="font-black text-emerald-700 text-2xl">
                Rs. {finalTotal}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-emerald-700/20 transition"
          >
            {isSubmitting ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            By placing your order, you agree to our Terms &amp; Conditions and Fresh Produce Return Policy.
          </p>
        </div>
      </form>
    </div>
  );
}
