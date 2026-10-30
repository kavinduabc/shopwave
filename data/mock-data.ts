export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  lowStockThreshold: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  nutrition: string;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  slug: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "Cash on Delivery" | "Card Payment" | "Online Banking";
  status: "Delivered" | "Processing" | "Pending" | "Shipped";
  date: string;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: "1", name: "Fresh Produce", icon: "🥦", itemCount: 45, slug: "fresh-produce" },
  { id: "2", name: "Dairy & Eggs", icon: "🥛", itemCount: 28, slug: "dairy-eggs" },
  { id: "3", name: "Bakery", icon: "🍞", itemCount: 22, slug: "bakery" },
  { id: "4", name: "Beverages", icon: "🧃", itemCount: 19, slug: "beverages" },
  { id: "5", name: "Snacks", icon: "🥨", itemCount: 31, slug: "snacks" },
  { id: "6", name: "Household", icon: "🧼", itemCount: 26, slug: "household" },
  { id: "7", name: "Personal Care", icon: "🧴", itemCount: 18, slug: "personal-care" },
  { id: "8", name: "Meat & Seafood", icon: "🥩", itemCount: 15, slug: "meat-seafood" },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Tomato",
    category: "Fresh Produce",
    price: 250,
    unit: "kg",
    stock: 45,
    lowStockThreshold: 15,
    rating: 4.8,
    reviewsCount: 120,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    description: "Fresh and juicy farm-fresh tomatoes, perfect for your everyday cooking, salads, and curries. Rich in lycopene, vitamin C, and potassium.",
    nutrition: "Calories: 18 kcal | Carbs: 3.9g | Protein: 0.9g | Vitamin C: 28% DV",
    isBestSeller: true,
  },
  {
    id: "prod-2",
    name: "Banana",
    category: "Fresh Produce",
    price: 180,
    unit: "kg",
    stock: 32,
    lowStockThreshold: 15,
    rating: 4.7,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
    description: "Sweet, naturally ripened Cavendish bananas. Excellent source of potassium, instant energy, and dietary fiber.",
    nutrition: "Calories: 89 kcal | Carbs: 23g | Potassium: 358mg | Fiber: 2.6g",
    isBestSeller: true,
  },
  {
    id: "prod-3",
    name: "Fresh Milk 1L",
    category: "Dairy & Eggs",
    price: 320,
    unit: "lt",
    stock: 20,
    lowStockThreshold: 10,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    description: "100% pure pasteurized full cream milk from local dairy farms. Wholesome goodness rich in calcium and protein.",
    nutrition: "Calories: 61 kcal | Protein: 3.2g | Calcium: 120mg | Fat: 3.3g",
    isBestSeller: true,
  },
  {
    id: "prod-4",
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
    id: "prod-5",
    name: "Eggs (10 pcs)",
    category: "Dairy & Eggs",
    price: 420,
    unit: "pcs",
    stock: 8,
    lowStockThreshold: 12,
    rating: 4.8,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80",
    description: "Farm-fresh graded brown eggs. High quality protein packed with essential amino acids and vitamin B12.",
    nutrition: "Calories: 72 kcal per egg | Protein: 6.3g | Choline: 147mg",
    isBestSeller: false,
  },
  {
    id: "prod-6",
    name: "Rice 1kg",
    category: "Fresh Produce",
    price: 360,
    unit: "pcs",
    stock: 50,
    lowStockThreshold: 20,
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    description: "Premium quality aromatic white rice. Carefully cleaned and polished for fluffy, separate grains every time.",
    nutrition: "Calories: 130 kcal | Carbs: 28g | Protein: 2.7g",
    isBestSeller: false,
  },
  {
    id: "prod-7",
    name: "Chicken Breast",
    category: "Meat & Seafood",
    price: 650,
    unit: "kg",
    stock: 12,
    lowStockThreshold: 15,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80",
    description: "Skinless, boneless tender chicken breast. Freshly cut, hygienically packed, high in lean protein.",
    nutrition: "Calories: 165 kcal | Protein: 31g | Fat: 3.6g",
    isBestSeller: false,
  },
  {
    id: "prod-8",
    name: "Potato",
    category: "Fresh Produce",
    price: 180,
    unit: "kg",
    stock: 25,
    lowStockThreshold: 15,
    rating: 4.5,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    description: "Firm and fresh table potatoes from local mountain farms. Perfect for curries, boiling, or baking.",
    nutrition: "Calories: 77 kcal | Carbs: 17g | Fiber: 2.2g | Vitamin C: 20mg",
    isBestSeller: false,
  },
  {
    id: "prod-9",
    name: "Onion",
    category: "Fresh Produce",
    price: 200,
    unit: "kg",
    stock: 18,
    lowStockThreshold: 15,
    rating: 4.6,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    description: "Crisp red onions with rich pungent flavor. A staple aromatic base for curries, stir-fries, and salads.",
    nutrition: "Calories: 40 kcal | Carbs: 9.3g | Fiber: 1.7g",
    isBestSeller: false,
  },
  {
    id: "prod-10",
    name: "Cucumber",
    category: "Fresh Produce",
    price: 140,
    unit: "kg",
    stock: 35,
    lowStockThreshold: 10,
    rating: 4.6,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80",
    description: "Crisp and hydrating garden cucumbers. High water content, great for salads, detox water, and sandwiches.",
    nutrition: "Calories: 15 kcal | Water: 95% | Vitamin K: 16% DV",
    isBestSeller: false,
  },
  {
    id: "prod-11",
    name: "Capsicum",
    category: "Fresh Produce",
    price: 320,
    unit: "kg",
    stock: 22,
    lowStockThreshold: 10,
    rating: 4.7,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
    description: "Bright green bell peppers with a crisp crunch and mild sweet taste. Packed with vitamins A and C.",
    nutrition: "Calories: 20 kcal | Vitamin C: 137% DV | Vitamin B6: 10% DV",
    isBestSeller: false,
  },
  {
    id: "prod-12",
    name: "Lettuce",
    category: "Fresh Produce",
    price: 250,
    unit: "piece",
    stock: 14,
    lowStockThreshold: 10,
    rating: 4.8,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=80",
    description: "Tender, crunchy hydroponic lettuce leaves. Clean and ready for delicious healthy bowls and burgers.",
    nutrition: "Calories: 15 kcal | Folate: 38mcg | Vitamin A: 247% DV",
    isBestSeller: false,
  },
  {
    id: "prod-13",
    name: "Carrot",
    category: "Fresh Produce",
    price: 220,
    unit: "kg",
    stock: 40,
    lowStockThreshold: 15,
    rating: 4.7,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=600&auto=format&fit=crop&q=80",
    description: "Sweet, crunchy orange carrots fresh from highland farms. Excellent source of beta-carotene and eye-health vitamins.",
    nutrition: "Calories: 41 kcal | Beta-carotene: 8285mcg | Fiber: 2.8g",
    isBestSeller: false,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-1801",
    customerName: "Nimal Perera",
    phone: "077 123 4567",
    address: "12 Galle Road, Colombo 03",
    city: "Colombo",
    district: "Colombo",
    totalAmount: 4250,
    paymentMethod: "Cash on Delivery",
    status: "Delivered",
    date: "2026-10-26",
    items: [
      { productId: "prod-1", name: "Tomato", price: 250, unit: "kg", quantity: 3, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80" },
      { productId: "prod-7", name: "Chicken Breast", price: 650, unit: "kg", quantity: 5, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "ORD-1802",
    customerName: "Sanduni Fernando",
    phone: "071 987 6543",
    address: "45 Flower Road, Kandy",
    city: "Kandy",
    district: "Kandy",
    totalAmount: 2130,
    paymentMethod: "Card Payment",
    status: "Processing",
    date: "2026-10-26",
    items: [
      { productId: "prod-3", name: "Fresh Milk 1L", price: 320, unit: "lt", quantity: 4, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80" },
      { productId: "prod-4", name: "Bread Loaf", price: 220, unit: "pcs", quantity: 3, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "ORD-1803",
    customerName: "Kasun Silva",
    phone: "075 333 8899",
    address: "78 Negombo Road, Ja-Ela",
    city: "Ja-Ela",
    district: "Gampaha",
    totalAmount: 6750,
    paymentMethod: "Online Banking",
    status: "Pending",
    date: "2026-10-25",
    items: [
      { productId: "prod-6", name: "Rice 1kg", price: 360, unit: "pcs", quantity: 10, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80" },
      { productId: "prod-5", name: "Eggs (10 pcs)", price: 420, unit: "pcs", quantity: 5, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "ORD-1804",
    customerName: "Tharindu Jayawardena",
    phone: "078 444 1122",
    address: "105 High Level Road, Maharagama",
    city: "Maharagama",
    district: "Colombo",
    totalAmount: 3180,
    paymentMethod: "Card Payment",
    status: "Delivered",
    date: "2026-10-25",
    items: [
      { productId: "prod-2", name: "Banana", price: 180, unit: "kg", quantity: 5, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80" },
      { productId: "prod-8", name: "Potato", price: 180, unit: "kg", quantity: 6, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "ORD-1805",
    customerName: "Hashini Perera",
    phone: "071 234 5678",
    address: "No. 123, Main Street, Colombo",
    city: "Colombo",
    district: "Colombo",
    totalAmount: 2980,
    paymentMethod: "Cash on Delivery",
    status: "Shipped",
    date: "2026-10-24",
    items: [
      { productId: "prod-1", name: "Tomato", price: 250, unit: "kg", quantity: 2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80" },
      { productId: "prod-2", name: "Banana", price: 180, unit: "kg", quantity: 3, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80" },
    ],
  },
];
