"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin-header";
import { Settings, Save, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    storeName: "Food City Supermarkets",
    hotline: "011 234 5678",
    currency: "LKR (Rs.)",
    deliveryFee: 100,
    freeDeliveryThreshold: 2500,
    lowStockAlertThreshold: 15,
    autoRestockNotifications: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Settings" subtitle="System configuration & supermarket rules" />

      <main className="p-6 sm:p-8 space-y-6 max-w-4xl">
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Store & Inventory Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                value={config.storeName}
                onChange={(e) => setConfig({ ...config, storeName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Customer Hotline</label>
              <input
                type="text"
                value={config.hotline}
                onChange={(e) => setConfig({ ...config, hotline: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Delivery Fee (Rs.)</label>
              <input
                type="number"
                value={config.deliveryFee}
                onChange={(e) => setConfig({ ...config, deliveryFee: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Global Low Stock Threshold</label>
              <input
                type="number"
                value={config.lowStockAlertThreshold}
                onChange={(e) => setConfig({ ...config, lowStockAlertThreshold: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoRestockNotifications}
                onChange={(e) => setConfig({ ...config, autoRestockNotifications: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-xs font-medium text-gray-700">
                Trigger email alerts when warehouse inventory falls below threshold
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Changes saved successfully!
              </span>
            ) : <span></span>}

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
