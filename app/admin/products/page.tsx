"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin-header";
import { Plus, Edit3, Trash2, X, Search, Check, AlertCircle } from "lucide-react";
import { useStore } from "@/context/store-context";
import { Product } from "@/data/mock-data";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    category: "Fresh Produce",
    price: 250,
    unit: "kg",
    stock: 25,
    lowStockThreshold: 15,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    description: "",
  });

  const categories = [
    "Fresh Produce",
    "Dairy & Eggs",
    "Bakery",
    "Beverages",
    "Snacks",
    "Household",
    "Meat & Seafood",
  ];

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormState({
      name: "",
      category: "Fresh Produce",
      price: 200,
      unit: "kg",
      stock: 30,
      lowStockThreshold: 15,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      description: "Farm-fresh high quality grocery item.",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormState({
      name: p.name,
      category: p.category,
      price: p.price,
      unit: p.unit,
      stock: p.stock,
      lowStockThreshold: p.lowStockThreshold,
      image: p.image,
      description: p.description,
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, {
        name: formState.name,
        category: formState.category,
        price: Number(formState.price),
        unit: formState.unit,
        stock: Number(formState.stock),
        lowStockThreshold: Number(formState.lowStockThreshold),
        image: formState.image,
        description: formState.description,
      });
    } else {
      await addProduct({
        name: formState.name,
        category: formState.category,
        price: Number(formState.price),
        unit: formState.unit,
        stock: Number(formState.stock),
        lowStockThreshold: Number(formState.lowStockThreshold),
        rating: 4.8,
        reviewsCount: 15,
        image: formState.image,
        description: formState.description,
        nutrition: "Calories: 50 kcal | Natural wholesome ingredients",
        isBestSeller: false,
      });
    }
    setIsModalOpen(false);
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Products" subtitle="Manage supermarket grocery catalog" />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Top Control Bar matching Mockup 7 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product..."
                className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-emerald-500 shadow-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter products by category"
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 shadow-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* + Add Product Button matching Mockup 7 */}
          <button
            onClick={handleOpenAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Table matching Mockup 7 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredProducts.map((prod) => {
                  const isLowStock = prod.stock <= prod.lowStockThreshold;
                  return (
                    <tr key={prod.id} className="hover:bg-gray-50/70 transition">
                      {/* Image */}
                      <td className="py-3 px-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 border border-gray-100 flex items-center justify-center">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>

                      {/* Product Name */}
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {prod.name}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-gray-600 font-medium">
                        {prod.category}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-bold text-gray-900">
                        Rs. {prod.price}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4 font-medium text-gray-700">
                        {prod.stock} {prod.unit}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isLowStock
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </span>
                      </td>

                      {/* Action buttons (Edit & Delete) */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                            title="Edit Product"
                            aria-label="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Product"
                            aria-label="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Grocery Product"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="e.g. Fresh Mangoes"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) =>
                        setFormState({ ...formState, category: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={formState.unit}
                      onChange={(e) =>
                        setFormState({ ...formState, unit: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="kg">kg (Kilogram)</option>
                      <option value="lt">lt (Liter)</option>
                      <option value="pcs">pcs (Pieces)</option>
                      <option value="piece">piece</option>
                      <option value="pack">pack</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formState.price}
                      onChange={(e) =>
                        setFormState({ ...formState, price: Number(e.target.value) })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Stock Qty
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formState.stock}
                      onChange={(e) =>
                        setFormState({ ...formState, stock: Number(e.target.value) })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Low Threshold
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formState.lowStockThreshold}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          lowStockThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formState.image}
                    onChange={(e) =>
                      setFormState({ ...formState, image: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                  >
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
