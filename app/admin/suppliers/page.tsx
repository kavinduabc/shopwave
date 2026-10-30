"use client";

import { useState, useEffect, useCallback } from "react";
import AdminHeader from "@/components/admin-header";
import { Truck, Phone, Mail, MapPin, Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  status: "Active Contract" | "Inactive" | "Under Review";
}

const EMPTY_FORM = {
  name: "",
  category: "",
  contactPerson: "",
  phone: "",
  email: "",
  location: "",
  status: "Active Contract" as Supplier["status"],
};

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Supplier | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchSuppliers = useCallback(async () => {
    try {
      const res = await fetch("/api/suppliers");
      const data = await res.json();
      if (data.success) setSuppliers(data.data);
    } catch (e) {
      console.error("Failed to fetch suppliers:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowModal(true);
  };

  const openEdit = (s: Supplier) => {
    setEditTarget(s);
    setForm({
      name: s.name,
      category: s.category,
      contactPerson: s.contactPerson,
      phone: s.phone,
      email: s.email,
      location: s.location,
      status: s.status,
    });
    setError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = editTarget ? `/api/suppliers/${editTarget.id}` : "/api/suppliers";
      const method = editTarget ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save supplier.");
        setSaving(false);
        return;
      }

      await fetchSuppliers();
      setShowModal(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete supplier "${name}"? This cannot be undone.`)) return;

    try {
      await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  const statusColor = (status: string) => {
    if (status === "Active Contract") return "text-emerald-800 bg-emerald-100";
    if (status === "Inactive") return "text-gray-700 bg-gray-100";
    return "text-amber-800 bg-amber-100";
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader title="Suppliers" subtitle="Registered local farm & brand vendors" />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Verified Vendors</h2>
            <p className="text-xs text-gray-500">
              Procurement partnerships powering Food City shelves
            </p>
          </div>
          <button
            onClick={openAdd}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vendor</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="ml-2 text-sm text-gray-500">Loading suppliers…</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {suppliers.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {s.category}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 mt-1 truncate">
                      {s.name}
                    </h3>
                    <p className="text-xs text-gray-500">Contact: {s.contactPerson}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(s.status)}`}>
                      {s.status}
                    </span>
                    <button
                      onClick={() => openEdit(s)}
                      className="p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id, s.name)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-3">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {s.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {s.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {s.location}
                  </p>
                </div>
              </div>
            ))}

            {suppliers.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-400">
                <Truck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No suppliers found.</p>
                <p className="text-xs mt-1">Add your first vendor to get started.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-gray-900">
                {editTarget ? "Edit Supplier" : "Add New Supplier"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              {[
                { label: "Supplier Name", field: "name", placeholder: "e.g. Dambulla Agro Farmers" },
                { label: "Category", field: "category", placeholder: "e.g. Fresh Produce & Vegetables" },
                { label: "Contact Person", field: "contactPerson", placeholder: "e.g. Sunil Bandara" },
                { label: "Phone", field: "phone", placeholder: "e.g. 066 228 9012" },
                { label: "Email", field: "email", placeholder: "e.g. supply@vendor.lk" },
                { label: "Location", field: "location", placeholder: "e.g. Dambulla Economic Centre" },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block font-bold text-gray-700 mb-1">{label}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={(form as Record<string, string>)[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ))}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Supplier["status"] })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Active Contract">Active Contract</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 transition"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {saving ? "Saving…" : editTarget ? "Update Supplier" : "Add Supplier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
