/**
 * POST /api/seed  - Seed MongoDB with initial products, orders, suppliers, and staff users.
 *
 * ⚠️  ONLY RUN ONCE to initialize your database.
 *      After seeding, visit /admin to manage data via the UI.
 *
 * Usage:
 *   curl -X POST http://localhost:3000/api/seed
 *   OR open the admin panel which has a "Seed Database" button.
 *
 * What it seeds:
 *   - 13 grocery products (tomatoes, milk, bread, etc.)
 *   - 5 sample orders
 *   - 4 local suppliers
 *   - 3 staff user accounts (admin, inventory manager, dispatch clerk)
 */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Supplier from "@/models/Supplier";
import User from "@/models/User";

export async function POST() {
  try {
    await connectDB();

    // ─────────────────────────────────────────────────────────────────────
    // 1. PRODUCTS
    // ─────────────────────────────────────────────────────────────────────
    const productsExist = await Product.countDocuments();
    let productDocs: InstanceType<typeof Product>[] = [];

    if (productsExist === 0) {
      productDocs = await Product.insertMany([
        {
          name: "Tomato",
          category: "Fresh Produce",
          price: 250,
          unit: "kg",
          stock: 45,
          lowStockThreshold: 15,
          rating: 4.8,
          reviewsCount: 120,
          image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
          description: "Fresh and juicy farm-fresh tomatoes, perfect for your everyday cooking, salads, and curries.",
          nutrition: "Calories: 18 kcal | Carbs: 3.9g | Protein: 0.9g | Vitamin C: 28% DV",
          isBestSeller: true,
        },
        {
          name: "Banana",
          category: "Fresh Produce",
          price: 180,
          unit: "kg",
          stock: 32,
          lowStockThreshold: 15,
          rating: 4.7,
          reviewsCount: 89,
          image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
          description: "Sweet, naturally ripened Cavendish bananas. Excellent source of potassium and energy.",
          nutrition: "Calories: 89 kcal | Carbs: 23g | Potassium: 358mg | Fiber: 2.6g",
          isBestSeller: true,
        },
        {
          name: "Fresh Milk 1L",
          category: "Dairy & Eggs",
          price: 320,
          unit: "lt",
          stock: 20,
          lowStockThreshold: 10,
          rating: 4.9,
          reviewsCount: 142,
          image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
          description: "100% pure pasteurized full cream milk from local dairy farms.",
          nutrition: "Calories: 61 kcal | Protein: 3.2g | Calcium: 120mg | Fat: 3.3g",
          isBestSeller: true,
        },
        {
          name: "Bread Loaf",
          category: "Bakery",
          price: 220,
          unit: "pcs",
          stock: 15,
          lowStockThreshold: 10,
          rating: 4.6,
          reviewsCount: 75,
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
          description: "Oven-baked daily white sandwich bread. Soft, airy, and freshly delivered every morning.",
          nutrition: "Calories: 265 kcal | Carbs: 49g | Protein: 9g | Fiber: 2.7g",
          isBestSeller: true,
        },
        {
          name: "Eggs (10 pcs)",
          category: "Dairy & Eggs",
          price: 420,
          unit: "pcs",
          stock: 8,
          lowStockThreshold: 12,
          rating: 4.8,
          reviewsCount: 96,
          image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80",
          description: "Farm-fresh graded brown eggs. High quality protein packed with essential amino acids.",
          nutrition: "Calories: 72 kcal per egg | Protein: 6.3g | Choline: 147mg",
          isBestSeller: false,
        },
        {
          name: "Rice 1kg",
          category: "Fresh Produce",
          price: 360,
          unit: "pcs",
          stock: 50,
          lowStockThreshold: 20,
          rating: 4.7,
          reviewsCount: 64,
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
          description: "Premium quality aromatic white rice. Fluffy and separate grains every time.",
          nutrition: "Calories: 130 kcal | Carbs: 28g | Protein: 2.7g",
          isBestSeller: false,
        },
        {
          name: "Chicken Breast",
          category: "Meat & Seafood",
          price: 650,
          unit: "kg",
          stock: 12,
          lowStockThreshold: 15,
          rating: 4.9,
          reviewsCount: 110,
          image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80",
          description: "Skinless, boneless tender chicken breast. Freshly cut, hygienically packed.",
          nutrition: "Calories: 165 kcal | Protein: 31g | Fat: 3.6g",
          isBestSeller: false,
        },
        {
          name: "Potato",
          category: "Fresh Produce",
          price: 180,
          unit: "kg",
          stock: 25,
          lowStockThreshold: 15,
          rating: 4.5,
          reviewsCount: 52,
          image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
          description: "Firm and fresh table potatoes from local mountain farms.",
          nutrition: "Calories: 77 kcal | Carbs: 17g | Fiber: 2.2g | Vitamin C: 20mg",
          isBestSeller: false,
        },
        {
          name: "Onion",
          category: "Fresh Produce",
          price: 200,
          unit: "kg",
          stock: 18,
          lowStockThreshold: 15,
          rating: 4.6,
          reviewsCount: 67,
          image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
          description: "Crisp red onions with rich pungent flavor. A staple aromatic base for curries.",
          nutrition: "Calories: 40 kcal | Carbs: 9.3g | Fiber: 1.7g",
          isBestSeller: false,
        },
        {
          name: "Cucumber",
          category: "Fresh Produce",
          price: 140,
          unit: "kg",
          stock: 35,
          lowStockThreshold: 10,
          rating: 4.6,
          reviewsCount: 41,
          image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80",
          description: "Crisp and hydrating garden cucumbers. Great for salads and detox water.",
          nutrition: "Calories: 15 kcal | Water: 95% | Vitamin K: 16% DV",
          isBestSeller: false,
        },
        {
          name: "Capsicum",
          category: "Fresh Produce",
          price: 320,
          unit: "kg",
          stock: 22,
          lowStockThreshold: 10,
          rating: 4.7,
          reviewsCount: 38,
          image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
          description: "Bright green bell peppers with crisp crunch and mild sweet taste.",
          nutrition: "Calories: 20 kcal | Vitamin C: 137% DV | Vitamin B6: 10% DV",
          isBestSeller: false,
        },
        {
          name: "Carrot",
          category: "Fresh Produce",
          price: 220,
          unit: "kg",
          stock: 40,
          lowStockThreshold: 15,
          rating: 4.7,
          reviewsCount: 84,
          image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=600&auto=format&fit=crop&q=80",
          description: "Sweet, crunchy orange carrots fresh from highland farms.",
          nutrition: "Calories: 41 kcal | Beta-carotene: 8285mcg | Fiber: 2.8g",
          isBestSeller: false,
        },
        {
          name: "Lettuce",
          category: "Fresh Produce",
          price: 250,
          unit: "piece",
          stock: 14,
          lowStockThreshold: 10,
          rating: 4.8,
          reviewsCount: 29,
          image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80",
          description: "Tender, crunchy hydroponic lettuce leaves. Clean and ready for healthy bowls.",
          nutrition: "Calories: 15 kcal | Folate: 38mcg | Vitamin A: 247% DV",
          isBestSeller: false,
        },
      ]);
    } else {
      // Fetch existing products for order seeding
      productDocs = await Product.find({}).limit(13).exec();
    }

    // ─────────────────────────────────────────────────────────────────────
    // 2. ORDERS (linked to real product IDs)
    // ─────────────────────────────────────────────────────────────────────
    const ordersExist = await Order.countDocuments();

    if (ordersExist === 0 && productDocs.length >= 7) {
      const p = productDocs; // shorthand

      await Order.insertMany([
        {
          customerName: "Nimal Perera",
          phone: "077 123 4567",
          address: "12 Galle Road, Colombo 03",
          city: "Colombo",
          district: "Colombo",
          items: [
            { productId: p[0]._id.toString(), name: p[0].name, price: p[0].price, unit: p[0].unit, quantity: 3, image: p[0].image },
            { productId: p[6]._id.toString(), name: p[6].name, price: p[6].price, unit: p[6].unit, quantity: 5, image: p[6].image },
          ],
          totalAmount: p[0].price * 3 + p[6].price * 5,
          paymentMethod: "Cash on Delivery",
          status: "Delivered",
          date: "2026-10-26",
        },
        {
          customerName: "Sanduni Fernando",
          phone: "071 987 6543",
          address: "45 Flower Road, Kandy",
          city: "Kandy",
          district: "Kandy",
          items: [
            { productId: p[2]._id.toString(), name: p[2].name, price: p[2].price, unit: p[2].unit, quantity: 4, image: p[2].image },
            { productId: p[3]._id.toString(), name: p[3].name, price: p[3].price, unit: p[3].unit, quantity: 3, image: p[3].image },
          ],
          totalAmount: p[2].price * 4 + p[3].price * 3,
          paymentMethod: "Card Payment",
          status: "Processing",
          date: "2026-10-26",
        },
        {
          customerName: "Kasun Silva",
          phone: "075 333 8899",
          address: "78 Negombo Road, Ja-Ela",
          city: "Ja-Ela",
          district: "Gampaha",
          items: [
            { productId: p[5]._id.toString(), name: p[5].name, price: p[5].price, unit: p[5].unit, quantity: 10, image: p[5].image },
            { productId: p[4]._id.toString(), name: p[4].name, price: p[4].price, unit: p[4].unit, quantity: 5, image: p[4].image },
          ],
          totalAmount: p[5].price * 10 + p[4].price * 5,
          paymentMethod: "Online Banking",
          status: "Pending",
          date: "2026-10-25",
        },
        {
          customerName: "Tharindu Jayawardena",
          phone: "078 444 1122",
          address: "105 High Level Road, Maharagama",
          city: "Maharagama",
          district: "Colombo",
          items: [
            { productId: p[1]._id.toString(), name: p[1].name, price: p[1].price, unit: p[1].unit, quantity: 5, image: p[1].image },
            { productId: p[7]._id.toString(), name: p[7].name, price: p[7].price, unit: p[7].unit, quantity: 6, image: p[7].image },
          ],
          totalAmount: p[1].price * 5 + p[7].price * 6,
          paymentMethod: "Card Payment",
          status: "Delivered",
          date: "2026-10-25",
        },
        {
          customerName: "Hashini Perera",
          phone: "071 234 5678",
          address: "No. 123, Main Street, Colombo",
          city: "Colombo",
          district: "Colombo",
          items: [
            { productId: p[0]._id.toString(), name: p[0].name, price: p[0].price, unit: p[0].unit, quantity: 2, image: p[0].image },
            { productId: p[1]._id.toString(), name: p[1].name, price: p[1].price, unit: p[1].unit, quantity: 3, image: p[1].image },
          ],
          totalAmount: p[0].price * 2 + p[1].price * 3,
          paymentMethod: "Cash on Delivery",
          status: "Shipped",
          date: "2026-10-24",
        },
      ]);
    }

    // ─────────────────────────────────────────────────────────────────────
    // 3. SUPPLIERS
    // ─────────────────────────────────────────────────────────────────────
    const suppliersExist = await Supplier.countDocuments();

    if (suppliersExist === 0) {
      await Supplier.insertMany([
        {
          name: "Dambulla Agro Farmers Collective",
          category: "Fresh Produce & Vegetables",
          contactPerson: "Sunil Bandara",
          phone: "066 228 9012",
          email: "supply@dambulla-agro.lk",
          location: "Dambulla Dedicated Economic Centre",
          status: "Active Contract",
        },
        {
          name: "Ceylon Fresh Milk Industries",
          category: "Dairy & Eggs",
          contactPerson: "Kamal Jayasuriya",
          phone: "052 222 4589",
          email: "orders@ceylondairy.lk",
          location: "Nuwara Eliya High Plains",
          status: "Active Contract",
        },
        {
          name: "Prima Ceylon Flour & Bakery Mills",
          category: "Bakery & Flour",
          contactPerson: "Mahesh Dias",
          phone: "026 222 7800",
          email: "info@primaceylon.lk",
          location: "Trincomalee Harbour Works",
          status: "Active Contract",
        },
        {
          name: "Negombo Sea Harvest Cooperative",
          category: "Meat & Seafood",
          contactPerson: "Anton Fernando",
          phone: "031 223 9988",
          email: "sales@negombofresh.lk",
          location: "Negombo Fishery Harbor",
          status: "Active Contract",
        },
        {
          name: "Kurunegala Coconut Processors Ltd",
          category: "Cooking Essentials",
          contactPerson: "Prasad Senanayake",
          phone: "037 222 6600",
          email: "info@kurunecoconut.lk",
          location: "Kurunegala Industrial Zone",
          status: "Under Review",
        },
      ]);
    }

    // ─────────────────────────────────────────────────────────────────────
    // 4. STAFF USERS
    // ─────────────────────────────────────────────────────────────────────
    const usersExist = await User.countDocuments();

    if (usersExist === 0) {
      const adminHash = await bcrypt.hash("admin@1234", 12);
      const staffHash = await bcrypt.hash("staff@1234", 12);

      await User.insertMany([
        {
          name: "Admin User",
          email: "admin@foodcity.lk",
          password: adminHash,
          phone: "011 234 5678",
          address: "Food City HQ, Colombo 07",
          role: "admin",
          department: "HQ Executive",
          status: "Active",
        },
        {
          name: "Samantha Wickrama",
          email: "samantha.w@foodcity.lk",
          password: staffHash,
          phone: "077 456 7890",
          address: "42 Warehouse Lane, Peliyagoda",
          role: "staff",
          department: "Warehouse & Stock",
          status: "Active",
        },
        {
          name: "Dinesh Gamage",
          email: "dinesh.g@foodcity.lk",
          password: staffHash,
          phone: "071 222 3344",
          address: "17 Industrial Road, Ja-Ela",
          role: "staff",
          department: "Dispatch & Packaging",
          status: "Active",
        },
      ]);
    }

    // ─────────────────────────────────────────────────────────────────────
    // Summary
    // ─────────────────────────────────────────────────────────────────────
    const [pCount, oCount, sCount, uCount] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Supplier.countDocuments(),
      User.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      message: "✅ Database seeded successfully!",
      counts: {
        products: pCount,
        orders: oCount,
        suppliers: sCount,
        users: uCount,
      },
      loginCredentials: {
        admin: { email: "admin@foodcity.lk", password: "admin@1234" },
        staff: { email: "samantha.w@foodcity.lk", password: "staff@1234" },
      },
    });
  } catch (error) {
    console.error("POST /api/seed error:", error);
    return NextResponse.json(
      { success: false, error: "Seeding failed. See server logs for details." },
      { status: 500 }
    );
  }
}

// GET /api/seed - Quick status check
export async function GET() {
  try {
    await connectDB();

    const [pCount, oCount, sCount, uCount] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Supplier.countDocuments(),
      User.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      status: "Database connected",
      counts: {
        products: pCount,
        orders: oCount,
        suppliers: sCount,
        users: uCount,
      },
      isSeeded: pCount > 0,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database connection failed", details: String(error) },
      { status: 500 }
    );
  }
}
