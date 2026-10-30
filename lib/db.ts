import fs from "node:fs";
import path from "node:path";
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CATEGORIES,
  Product,
  Order,
  Category,
  OrderItem,
} from "@/data/mock-data";

/**
 * Beginner-Friendly Database Manager
 *
 * This file handles reading and writing our supermarket data to a simple JSON file:
 * `data/db.json`. This means your changes (new products, orders, stock updates)
 * stay saved on your computer even after restarting the Next.js server!
 */

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  status: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

export interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  categories: Category[];
  suppliers: Supplier[];
  users: StaffUser[];
}

const DB_PATH = path.join(process.cwd(), "data", "db.json");

const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "SUP-01",
    name: "Dambulla Agro Farmers Collective",
    category: "Fresh Produce & Vegetables",
    contactPerson: "Sunil Bandara",
    phone: "066 228 9012",
    email: "supply@dambulla-agro.lk",
    location: "Dambulla Dedicated Economic Centre",
    status: "Active Contract",
  },
  {
    id: "SUP-02",
    name: "Ceylon Fresh Milk Industries",
    category: "Dairy & Eggs",
    contactPerson: "Kamal Jayasuriya",
    phone: "052 222 4589",
    email: "orders@ceylondairy.lk",
    location: "Nuwara Eliya High Plains",
    status: "Active Contract",
  },
  {
    id: "SUP-03",
    name: "Prima Ceylon Flour & Bakery Mills",
    category: "Bakery & Flour",
    contactPerson: "Mahesh Dias",
    phone: "026 222 7800",
    email: "info@primaceylon.lk",
    location: "Trincomalee Harbour Works",
    status: "Active Contract",
  },
  {
    id: "SUP-04",
    name: "Negombo Sea Harvest Cooperative",
    category: "Meat & Seafood",
    contactPerson: "Anton Fernando",
    phone: "031 223 9988",
    email: "sales@negombofresh.lk",
    location: "Negombo Fishery Harbor",
    status: "Active Contract",
  },
];

const INITIAL_USERS: StaffUser[] = [
  {
    id: "USR-01",
    name: "Admin User",
    email: "admin@foodcity.lk",
    role: "Super Administrator",
    department: "HQ Executive",
    status: "Active",
  },
  {
    id: "USR-02",
    name: "Samantha Wickrama",
    email: "samantha.w@foodcity.lk",
    role: "Inventory Manager",
    department: "Warehouse & Stock",
    status: "Active",
  },
  {
    id: "USR-03",
    name: "Dinesh Gamage",
    email: "dinesh.g@foodcity.lk",
    role: "Order Fulfillment Clerk",
    department: "Dispatch & Packaging",
    status: "Active",
  },
];

// Helper to safely read or initialize data from JSON file
export function readDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDb: DatabaseSchema = {
        products: INITIAL_PRODUCTS,
        orders: INITIAL_ORDERS,
        categories: INITIAL_CATEGORIES,
        suppliers: INITIAL_SUPPLIERS,
        users: INITIAL_USERS,
      };
      writeDatabase(initialDb);
      return initialDb;
    }

    const fileContent = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading db.json, returning default data:", error);
    return {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      categories: INITIAL_CATEGORIES,
      suppliers: INITIAL_SUPPLIERS,
      users: INITIAL_USERS,
    };
  }
}

// Helper to save data back into JSON file
export function writeDatabase(data: DatabaseSchema): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
}

// ==========================================
// 1. PRODUCTS OPERATIONS
// ==========================================

export function getProducts(options?: {
  category?: string;
  search?: string;
  sort?: string;
}) {
  const db = readDatabase();
  let list = [...db.products];

  if (options?.category && options.category !== "All" && options.category !== "All Products") {
    list = list.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  if (options?.sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (options?.sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (options?.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default popularity
    list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  }

  return list;
}

export function getProductById(id: string): Product | null {
  const db = readDatabase();
  return db.products.find((p) => p.id === id) || null;
}

export function createProduct(productData: Omit<Product, "id">): Product {
  const db = readDatabase();
  const newProduct: Product = {
    ...productData,
    id: "prod-" + Date.now().toString().slice(-5),
  };

  db.products.unshift(newProduct);
  writeDatabase(db);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const db = readDatabase();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = { ...db.products[index], ...updates };
  writeDatabase(db);
  return db.products[index];
}

export function deleteProduct(id: string): boolean {
  const db = readDatabase();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);

  if (db.products.length !== initialLength) {
    writeDatabase(db);
    return true;
  }
  return false;
}

// ==========================================
// 2. INVENTORY STOCK OPERATIONS
// ==========================================

export function updateProductStock(id: string, newStock: number): Product | null {
  const db = readDatabase();
  const prod = db.products.find((p) => p.id === id);
  if (!prod) return null;

  prod.stock = Math.max(0, newStock);
  writeDatabase(db);
  return prod;
}

// ==========================================
// 3. ORDERS OPERATIONS
// ==========================================

export function getOrders(status?: string) {
  const db = readDatabase();
  if (status && status !== "All") {
    return db.orders.filter((o) => o.status === status);
  }
  return db.orders;
}

export function createOrder(data: {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "Cash on Delivery" | "Card Payment" | "Online Banking";
}): Order {
  const db = readDatabase();
  const orderId = "ORD-" + Math.floor(1800 + Math.random() * 200);

  const newOrder: Order = {
    id: orderId,
    customerName: data.customerName,
    phone: data.phone,
    address: data.address,
    city: data.city,
    district: data.district,
    items: data.items,
    totalAmount: data.totalAmount,
    paymentMethod: data.paymentMethod,
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  };

  // Automatically deduct ordered quantities from inventory!
  for (const item of data.items) {
    const product = db.products.find((p) => p.id === item.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
    }
  }

  db.orders.unshift(newOrder);
  writeDatabase(db);
  return newOrder;
}

export function updateOrderStatus(
  id: string,
  status: "Pending" | "Processing" | "Shipped" | "Delivered"
): Order | null {
  const db = readDatabase();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;

  order.status = status;
  writeDatabase(db);
  return order;
}

// ==========================================
// 4. REPORTS & ANALYTICS
// ==========================================

export function getReportsData() {
  const db = readDatabase();

  const totalProducts = db.products.length;
  const lowStockItems = db.products.filter((p) => p.stock <= p.lowStockThreshold);
  const totalOrders = db.orders.length;
  const totalSales = db.orders.reduce((sum, o) => sum + o.totalAmount, 0) + 1200000;
  const avgOrderValue = Math.round(totalSales / (totalOrders + 300));

  return {
    totalSales,
    totalOrders: totalOrders + 300,
    avgOrderValue,
    totalProducts,
    lowStockCount: lowStockItems.length,
    lowStockItems,
  };
}
