import Link from "next/link";
import { ShoppingCart, ShieldCheck, Truck, Users, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 space-y-12">
      {/* Hero */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-lg">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest bg-emerald-800/80 px-3 py-1 rounded-full">
            About Food City Supermarkets
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Fresh Food, Healthier Families, Better Communities.
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Founded with a passion for quality groceries and local agriculture, Food City is Sri Lanka&apos;s trusted destination for fresh vegetables, fruits, dairy, bakery items, and household essentials.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-xs">
          <h3 className="text-3xl font-black text-emerald-700">100+</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">Supermarket Outlets</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-xs">
          <h3 className="text-3xl font-black text-emerald-700">1,500+</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">Local Partner Farmers</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-xs">
          <h3 className="text-3xl font-black text-emerald-700">50,000+</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">Daily Happy Shoppers</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-xs">
          <h3 className="text-3xl font-black text-emerald-700">2 Hours</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">Express Delivery Speed</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact &amp; Customer Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
          <div className="p-4 rounded-xl bg-gray-50 space-y-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900">Headquarters</h4>
            <p className="text-xs text-gray-600">No. 123 Galle Road, Colombo 03, Sri Lanka</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 space-y-2">
            <Phone className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900">Telephone Hotline</h4>
            <p className="text-xs text-gray-600">011 234 5678 / 071 234 5678</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 space-y-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900">Operating Hours</h4>
            <p className="text-xs text-gray-600">8:00 AM - 10:00 PM (Islandwide, 7 Days)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
