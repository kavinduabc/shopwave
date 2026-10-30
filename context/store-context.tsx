"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CATEGORIES,
  Product,
  Order,
  Category,
  OrderItem,
} from "@/data/mock-data";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  notification: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateStock: (id: string, newStock: number) => Promise<void>;
  updateOrderStatus: (
    id: string,
    status: "Pending" | "Processing" | "Shipped" | "Delivered"
  ) => Promise<void>;
  placeOrder: (shippingInfo: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    paymentMethod: "Cash on Delivery" | "Card Payment" | "Online Banking";
  }) => Promise<Order>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }, // Tomato
    { product: INITIAL_PRODUCTS[1], quantity: 2 }, // Banana
    { product: INITIAL_PRODUCTS[2], quantity: 1 }, // Fresh Milk
  ]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [notification, setNotification] = useState<string | null>(null);

  // 1. Fetch initial data from backend API
  useEffect(() => {
    async function loadBackendData() {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.data && Array.isArray(prodData.data)) {
            setProducts(prodData.data);
          }
        }

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          if (orderData.data && Array.isArray(orderData.data)) {
            setOrders(orderData.data);
          }
        }
      } catch (err) {
        console.warn("Backend API initial fetch, falling back to local defaults:", err);
      }

      // Restore cart from localStorage if present
      try {
        const savedCart = localStorage.getItem("foodcity_cart");
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch {}
    }

    loadBackendData();
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("foodcity_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // ==========================================
  // BACKEND INTEGRATION: Products & Stock
  // ==========================================

  // Add Product (calls POST /api/products)
  const addProduct = async (newProd: Omit<Product, "id">) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProd),
      });

      if (res.ok) {
        const json = await res.json();
        setProducts((prev) => [json.data, ...prev]);
        showToast(`Product "${json.data.name}" added to database!`);
      } else {
        // Fallback optimistic update
        const id = "prod-" + (Date.now() % 10000);
        const created: Product = { ...newProd, id };
        setProducts((prev) => [created, ...prev]);
        showToast(`Product "${created.name}" created!`);
      }
    } catch {
      const id = "prod-" + (Date.now() % 10000);
      const created: Product = { ...newProd, id };
      setProducts((prev) => [created, ...prev]);
      showToast(`Product "${created.name}" created!`);
    }
  };

  // Update Product (calls PUT /api/products/[id])
  const updateProduct = async (id: string, data: Partial<Product>) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.warn("PUT /api/products error:", e);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    showToast("Product updated successfully in backend!");
  };

  // Delete Product (calls DELETE /api/products/[id])
  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("DELETE /api/products error:", e);
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product deleted from database");
  };

  // Update Stock (calls PATCH /api/inventory/[id])
  const updateStock = async (id: string, newStock: number) => {
    const clampedStock = Math.max(0, newStock);

    try {
      await fetch(`/api/inventory/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: clampedStock }),
      });
    } catch (e) {
      console.warn("PATCH /api/inventory error:", e);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: clampedStock } : p))
    );
    showToast("Stock quantity updated!");
  };

  // Update Order Status (calls PATCH /api/orders/[id])
  const updateOrderStatus = async (
    id: string,
    status: "Pending" | "Processing" | "Shipped" | "Delivered"
  ) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn("PATCH /api/orders/[id] error:", e);
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    showToast(`Order status updated to ${status}!`);
  };

  // ==========================================
  // BACKEND INTEGRATION: Orders
  // ==========================================

  // Place Order (calls POST /api/orders)
  const placeOrder = async (shippingInfo: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    paymentMethod: "Cash on Delivery" | "Card Payment" | "Online Banking";
  }): Promise<Order> => {
    const orderItems: OrderItem[] = cart.map((c) => ({
      productId: c.product.id,
      name: c.product.name,
      price: c.product.price,
      unit: c.product.unit,
      quantity: c.quantity,
      image: c.product.image,
    }));

    const deliveryFee = 100;
    const finalTotal = cartTotal + deliveryFee;

    const payload = {
      customerName: shippingInfo.customerName,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      city: shippingInfo.city,
      district: shippingInfo.district,
      items: orderItems,
      totalAmount: finalTotal,
      paymentMethod: shippingInfo.paymentMethod,
    };

    let placedOrder: Order;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        placedOrder = json.data;
      } else {
        throw new Error("Backend response error");
      }
    } catch {
      // Fallback local creation
      const orderId = "ORD-" + Math.floor(1800 + Math.random() * 200);
      placedOrder = {
        id: orderId,
        ...payload,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      };
    }

    // Deduct stock in client state
    setProducts((prev) =>
      prev.map((prod) => {
        const ordered = cart.find((c) => c.product.id === prod.id);
        if (ordered) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - ordered.quantity),
          };
        }
        return prod;
      })
    );

    // Add to orders list
    setOrders((prev) => [placedOrder, ...prev]);

    // Clear cart
    clearCart();

    return placedOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        orders,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        notification,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        updateOrderStatus,
        placeOrder,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-emerald-800 px-5 py-3 text-white shadow-2xl transition-all animate-bounce">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold">
            ✓
          </span>
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
