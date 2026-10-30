"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Plus,
  Minus,
  Heart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/context/store-context";

function ProductDetailContent() {
  const params = useParams();
  const productId = params?.id as string;
  const { products, addToCart } = useStore();

  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "nutrition" | "reviews">("desc");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-gray-500 mt-2">
          The grocery item you requested could not be found or is no longer listed.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-700"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Related products from same category or fallback to other fresh produce
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category === "Fresh Produce"))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
      {/* Breadcrumb matching Mockup 3: Home > Fresh Produce > Tomato */}
      <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span>&gt;</span>
        <Link href={`/shop?cat=${encodeURIComponent(product.category)}`} className="hover:text-emerald-700">
          {product.category}
        </Link>
        <span>&gt;</span>
        <span className="text-emerald-700 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs">
        {/* Left: Product Image */}
        <div className="flex items-center justify-center bg-gray-50/80 rounded-2xl p-6 sm:p-10 border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-96 object-contain drop-shadow-md hover:scale-105 transition duration-300"
          />
        </div>

        {/* Right: Product Details matching Mockup 3 */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {product.name}
            </h1>

            {/* Price matching Mockup 3: Rs. 250 / kg */}
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              Rs. {product.price}
              <span className="text-sm font-medium text-gray-500"> / {product.unit}</span>
            </p>

            {/* Star Rating: 4.5 (120 Reviews) */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= Math.floor(product.rating)
                        ? "fill-amber-400"
                        : i - product.rating < 0.8
                        ? "fill-amber-400/50"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">({product.rating})</span>
              <span className="text-xs text-gray-500">• {product.reviewsCount} Reviews</span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Stock status badge */}
            <div className="flex items-center gap-2 pt-1">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  product.stock > product.lowStockThreshold
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {product.stock > product.lowStockThreshold
                  ? `In Stock (${product.stock} ${product.unit} available)`
                  : `Low Stock (Only ${product.stock} ${product.unit} left)`}
              </span>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons matching Mockup 3 */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700 uppercase">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-emerald-700"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-emerald-700"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs font-medium text-gray-500">{product.unit}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-emerald-700/20 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`py-3.5 px-5 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition ${
                  isWishlisted
                    ? "bg-rose-50 border-rose-300 text-rose-600"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
                />
                <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
              </button>
            </div>
          </div>

          {/* 3 Badges matching Mockup 3 */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <div className="text-center p-2 rounded-xl bg-gray-50">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-gray-800">Fresh Quality</p>
              <p className="text-[10px] text-gray-500">Guaranteed</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-gray-50">
              <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-gray-800">Fast Delivery</p>
              <p className="text-[10px] text-gray-500">Island Wide</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-gray-50">
              <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-gray-800">Secure Payment</p>
              <p className="text-[10px] text-gray-500">100% Safe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs matching Mockup 3 */}
      <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
        <div className="flex border-b border-gray-200 space-x-8">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-4 text-sm font-bold transition border-b-2 ${
              activeTab === "desc"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`pb-4 text-sm font-bold transition border-b-2 ${
              activeTab === "nutrition"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Nutrition Facts
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 text-sm font-bold transition border-b-2 ${
              activeTab === "reviews"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({product.reviewsCount})
          </button>
        </div>

        <div className="py-6 text-sm text-gray-600 leading-relaxed">
          {activeTab === "desc" && (
            <div className="space-y-3">
              <p>
                {product.name}s are harvested fresh daily by trusted Sri Lankan farmers and handled under strict temperature and hygienic standards.
              </p>
              <p>
                Tomatoes are rich in vitamins A, C, and K. They are perfect for salads, sauces, soups, and many traditional curries. Packed with natural antioxidants like lycopene which promotes heart health.
              </p>
            </div>
          )}
          {activeTab === "nutrition" && (
            <div className="p-4 bg-emerald-50/60 rounded-2xl max-w-md">
              <h4 className="font-bold text-emerald-900 mb-2">Per 100g Serving:</h4>
              <p className="text-gray-700">{product.nutrition}</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-gray-900">Nuwan Wickramasinghe</span>
                  <span className="text-[11px] text-gray-400">2 days ago</span>
                </div>
                <div className="flex text-amber-400 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-gray-600">
                  Exceptional quality! Arrived crisp and fresh, perfect for making pasta sauce and sandwich toppings.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products matching Mockup 3 */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Related Products
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <Link href={`/shop/${rel.id}`} className="block h-36 bg-gray-50 rounded-xl p-3 mb-3">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                />
              </Link>
              <div>
                <Link
                  href={`/shop/${rel.id}`}
                  className="font-bold text-gray-900 text-sm hover:text-emerald-700 transition block truncate"
                >
                  {rel.name}
                </Link>
                <p className="text-emerald-700 font-bold text-sm mt-1">
                  Rs. {rel.price}
                  <span className="text-[11px] text-gray-500 font-normal"> / {rel.unit}</span>
                </p>
              </div>
              <button
                onClick={() => addToCart(rel, 1)}
                className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto p-12 text-center text-gray-400">
          Loading product details...
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}

