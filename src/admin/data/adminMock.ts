import { products as storefrontProducts } from "@/data/products";
import { categories as storefrontCategories, vendors } from "@/data/content";
import type {
  AdminProduct,
  AdminCategory,
  Brand,
  Attribute,
  AdminReview,
  AdminOrder,
  AbandonedCart,
  Transaction,
  Coupon,
  FlashSale,
  AdminCustomer,
  AdminUser,
  Role,
  SupportTicket,
  AuditLogEntry,
} from "@/types/admin";

export const adminProducts: AdminProduct[] = storefrontProducts.map((p, i) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  sku: `SKU-${1000 + i}`,
  category: p.category ?? "Grocery",
  brand: ["Nestle", "Kellogg's", "Unilever", "PepsiCo", "Local Farms"][i % 5],
  price: p.price,
  oldPrice: p.oldPrice,
  stock: p.inStock ? 5 + ((i * 13) % 180) : 0,
  status: !p.inStock ? "Out of Stock" : i % 9 === 0 ? "Draft" : "Active",
  rating: p.rating,
  reviewCount: p.reviewCount,
  createdAt: `2026-0${1 + (i % 3)}-${String(1 + (i % 27)).padStart(2, "0")}`,
}));

export const adminCategories: AdminCategory[] = storefrontCategories.map((c, i) => ({
  id: c.id,
  name: c.name,
  slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  image: c.image,
  productCount: c.itemCount ?? 0,
  status: i % 7 === 0 ? "Inactive" : "Active",
}));

const BRAND_NAMES = ["Nestle", "Kellogg's", "Unilever", "PepsiCo", "Local Farms", "Danone", "Heinz", "General Mills"];
export const brands: Brand[] = BRAND_NAMES.map((name, i) => ({
  id: `brand-${i + 1}`,
  name,
  logo: `images/vendors/vendor-${(i % 9) + 1}.jpg`,
  productCount: adminProducts.filter((p) => p.brand === name).length,
  status: i % 6 === 0 ? "Inactive" : "Active",
}));

export const attributes: Attribute[] = [
  { id: "attr-1", name: "Color", type: "Color", values: ["Red", "Green", "Blue", "Yellow", "Black"], usedByCount: 24 },
  { id: "attr-2", name: "Size", type: "Select", values: ["Small", "Medium", "Large", "Extra Large"], usedByCount: 31 },
  { id: "attr-3", name: "Weight", type: "Select", values: ["250g", "500g", "1kg", "2kg"], usedByCount: 18 },
  { id: "attr-4", name: "Material", type: "Text", values: ["Glass", "Plastic", "Tin", "Paper"], usedByCount: 9 },
  { id: "attr-5", name: "Flavor", type: "Select", values: ["Original", "Spicy", "Sweet", "Unsweetened"], usedByCount: 15 },
];

const REVIEW_COMMENTS = [
  "Absolutely love this product, will buy again!",
  "Good quality but delivery took a bit longer than expected.",
  "Exactly as described, very fresh.",
  "Not what I expected, packaging was damaged.",
  "Great value for money, highly recommend.",
  "Average experience, nothing special.",
  "Best purchase this month, five stars!",
  "Product was fine but a bit pricey for the amount.",
];
export const adminReviews: AdminReview[] = Array.from({ length: 24 }, (_, i) => {
  const product = adminProducts[i % adminProducts.length];
  return {
    id: `rev-${i + 1}`,
    product: product.name,
    productImage: product.image,
    customer: ["Courtney Henry", "Devon Lane", "Jenny Wilson", "Marcus Reed", "Priya Nair", "Tom Becker"][i % 6],
    rating: 1 + (i % 5),
    comment: REVIEW_COMMENTS[i % REVIEW_COMMENTS.length],
    date: `2026-0${1 + (i % 3)}-${String(2 + (i % 26)).padStart(2, "0")}`,
    status: i % 5 === 0 ? "Pending" : i % 7 === 0 ? "Rejected" : "Approved",
  };
});

const CUSTOMER_NAMES = [
  "Courtney Henry", "Devon Lane", "Jenny Wilson", "Marcus Reed", "Priya Nair", "Tom Becker",
  "Alicia Moore", "James Carter", "Dana Kim", "Wade Warren", "Esther Howard", "Cody Fisher",
];

export const adminOrders: AdminOrder[] = Array.from({ length: 30 }, (_, i) => {
  const itemCount = 1 + (i % 3);
  const items = Array.from({ length: itemCount }, (_, j) => {
    const p = adminProducts[(i * 3 + j) % adminProducts.length];
    return { name: p.name, image: p.image, quantity: 1 + ((i + j) % 3), price: p.price };
  });
  const total = Number(items.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2));
  const statuses: AdminOrder["status"][] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];
  const status = statuses[i % statuses.length];
  return {
    id: `ORD-${20450 + i}`,
    customer: CUSTOMER_NAMES[i % CUSTOMER_NAMES.length],
    email: `${CUSTOMER_NAMES[i % CUSTOMER_NAMES.length].toLowerCase().replace(" ", ".")}@email.com`,
    date: `2026-0${1 + (i % 3)}-${String(1 + (i % 27)).padStart(2, "0")}`,
    items,
    total,
    status,
    paymentStatus: status === "Refunded" ? "Refunded" : status === "Cancelled" ? "Unpaid" : "Paid",
    paymentMethod: ["Visa •••• 4242", "Mastercard •••• 8850", "PayPal", "Cash on Delivery"][i % 4],
    vendor: vendors[i % vendors.length].name,
    address: "2972 Westheimer Rd, Santa Ana, Illinois 85486",
  };
});

export const abandonedCarts: AbandonedCart[] = Array.from({ length: 14 }, (_, i) => ({
  id: `cart-${i + 1}`,
  customer: CUSTOMER_NAMES[(i + 3) % CUSTOMER_NAMES.length],
  email: `${CUSTOMER_NAMES[(i + 3) % CUSTOMER_NAMES.length].toLowerCase().replace(" ", ".")}@email.com`,
  itemCount: 1 + (i % 4),
  value: Number((15 + i * 7.5).toFixed(2)),
  lastActive: `2026-0${1 + (i % 3)}-${String(2 + (i % 26)).padStart(2, "0")}`,
  remindersSent: i % 3,
}));

export const transactions: Transaction[] = adminOrders.slice(0, 22).map((order, i) => ({
  id: `TXN-${88000 + i}`,
  orderId: order.id,
  customer: order.customer,
  amount: order.total,
  method: order.paymentMethod,
  status: order.status === "Refunded" ? "Refunded" : order.status === "Cancelled" ? "Failed" : i % 11 === 0 ? "Pending" : "Success",
  date: order.date,
}));

export const coupons: Coupon[] = [
  { id: "cpn-1", code: "WELCOME10", type: "Percentage", value: 10, usageLimit: 500, used: 312, startDate: "2026-01-01", expiryDate: "2026-12-31", status: "Active" },
  { id: "cpn-2", code: "FREESHIP", type: "Free Shipping", value: 0, usageLimit: 1000, used: 845, startDate: "2026-01-01", expiryDate: "2026-06-30", status: "Active" },
  { id: "cpn-3", code: "SAVE5", type: "Fixed Amount", value: 5, usageLimit: 200, used: 200, startDate: "2025-11-01", expiryDate: "2026-01-15", status: "Expired" },
  { id: "cpn-4", code: "SPRING25", type: "Percentage", value: 25, usageLimit: 300, used: 0, startDate: "2026-04-01", expiryDate: "2026-04-30", status: "Scheduled" },
  { id: "cpn-5", code: "VIP20", type: "Percentage", value: 20, usageLimit: 100, used: 42, startDate: "2026-01-01", expiryDate: "2026-12-31", status: "Active" },
  { id: "cpn-6", code: "OLDPROMO", type: "Fixed Amount", value: 10, usageLimit: 150, used: 88, startDate: "2025-09-01", expiryDate: "2025-12-01", status: "Disabled" },
];

export const flashSales: FlashSale[] = [
  { id: "fs-1", name: "Weekend Grocery Blast", discountPercent: 30, productIds: adminProducts.slice(0, 6).map((p) => p.id), startDate: "2026-03-06", endDate: "2026-03-08", status: "Live" },
  { id: "fs-2", name: "Snack Attack Sale", discountPercent: 20, productIds: adminProducts.slice(6, 10).map((p) => p.id), startDate: "2026-03-15", endDate: "2026-03-17", status: "Scheduled" },
  { id: "fs-3", name: "New Year Clearance", discountPercent: 40, productIds: adminProducts.slice(10, 14).map((p) => p.id), startDate: "2026-01-01", endDate: "2026-01-05", status: "Ended" },
];

export const adminCustomers: AdminCustomer[] = CUSTOMER_NAMES.map((name, i) => ({
  id: `cust-${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
  avatar: `images/avatars/avatar-${(i % 4) + 1}.jpg`,
  phone: `+1 (480) 555-01${10 + i}`,
  joined: `2025-${String(6 + (i % 6)).padStart(2, "0")}-${String(3 + (i % 25)).padStart(2, "0")}`,
  ordersCount: 1 + (i % 12),
  totalSpent: Number((45 + i * 37.4).toFixed(2)),
  status: i % 9 === 0 ? "Blocked" : "Active",
}));

export const adminUsers: AdminUser[] = [
  { id: "au-1", name: "Alex Johnson", email: "alex.johnson@storly.com", avatar: "images/avatars/avatar-4.jpg", role: "Super Admin", status: "Active", lastLogin: "2026-03-05 09:12" },
  { id: "au-2", name: "Morgan Lee", email: "morgan.lee@storly.com", avatar: "images/avatars/avatar-1.jpg", role: "Store Manager", status: "Active", lastLogin: "2026-03-04 16:40" },
  { id: "au-3", name: "Sam Patel", email: "sam.patel@storly.com", avatar: "images/avatars/avatar-2.jpg", role: "Support Agent", status: "Active", lastLogin: "2026-03-05 08:02" },
  { id: "au-4", name: "Riley Chen", email: "riley.chen@storly.com", avatar: "images/avatars/avatar-3.jpg", role: "Content Editor", status: "Suspended", lastLogin: "2026-02-20 11:15" },
  { id: "au-5", name: "Jordan Blake", email: "jordan.blake@storly.com", avatar: "images/avatars/avatar-1.jpg", role: "Finance", status: "Active", lastLogin: "2026-03-03 14:22" },
];

export const roles: Role[] = [
  { id: "role-1", name: "Super Admin", description: "Full access to every module, including settings and access management.", usersCount: 1, permissions: ["all"] },
  { id: "role-2", name: "Store Manager", description: "Manage catalog, orders, and promotions. No access to system settings.", usersCount: 1, permissions: ["catalog", "orders", "marketing", "reports"] },
  { id: "role-3", name: "Support Agent", description: "Handle support tickets and view customer/order details.", usersCount: 1, permissions: ["orders.view", "customers.view", "tickets"] },
  { id: "role-4", name: "Content Editor", description: "Manage product listings, categories, and reviews.", usersCount: 1, permissions: ["catalog"] },
  { id: "role-5", name: "Finance", description: "Access to transactions, earnings, refunds, and tax reports.", usersCount: 1, permissions: ["transactions", "reports.financial"] },
];

export const supportTickets: SupportTicket[] = Array.from({ length: 12 }, (_, i) => {
  const customer = CUSTOMER_NAMES[i % CUSTOMER_NAMES.length];
  const subjects = [
    "Order arrived damaged",
    "Refund not received",
    "Unable to apply coupon code",
    "Wrong item delivered",
    "Question about vendor shipping times",
    "Account login issue",
  ];
  const priorities: SupportTicket["priority"][] = ["Low", "Medium", "High", "Urgent"];
  const statuses: SupportTicket["status"][] = ["Open", "In Progress", "Resolved", "Closed"];
  return {
    id: `TKT-${5100 + i}`,
    subject: subjects[i % subjects.length],
    customer,
    customerEmail: `${customer.toLowerCase().replace(" ", ".")}@email.com`,
    priority: priorities[i % priorities.length],
    status: statuses[i % statuses.length],
    createdAt: `2026-0${1 + (i % 3)}-${String(2 + (i % 26)).padStart(2, "0")} 10:${String(10 + i).padStart(2, "0")}`,
    updatedAt: `2026-0${1 + (i % 3)}-${String(3 + (i % 26)).padStart(2, "0")} 14:${String(20 + i).padStart(2, "0")}`,
    category: ["Orders", "Billing", "Technical", "Vendors"][i % 4],
    messages: [
      { from: "customer", author: customer, message: subjects[i % subjects.length] + ". Can someone help me with this?", date: `2026-0${1 + (i % 3)}-${String(2 + (i % 26)).padStart(2, "0")} 10:${String(10 + i).padStart(2, "0")}` },
      { from: "agent", author: "Sam Patel", message: "Thanks for reaching out — I'm looking into this right now and will update you shortly.", date: `2026-0${1 + (i % 3)}-${String(2 + (i % 26)).padStart(2, "0")} 11:05` },
    ],
  };
});

export const auditLog: AuditLogEntry[] = [
  { id: "log-1", actor: "Alex Johnson", action: "Updated storefront settings", target: "Storefront Settings", timestamp: "2026-03-05 09:20", ip: "102.89.23.14" },
  { id: "log-2", actor: "Morgan Lee", action: "Created coupon WELCOME10", target: "Coupons", timestamp: "2026-03-04 17:02", ip: "197.211.63.90" },
  { id: "log-3", actor: "Sam Patel", action: "Resolved support ticket TKT-5104", target: "Support Tickets", timestamp: "2026-03-04 15:44", ip: "102.89.23.44" },
  { id: "log-4", actor: "Riley Chen", action: "Edited product Farm Fresh Milk", target: "Products", timestamp: "2026-03-04 12:10", ip: "154.66.12.8" },
  { id: "log-5", actor: "Alex Johnson", action: "Suspended admin user Riley Chen", target: "Admin Users", timestamp: "2026-03-03 18:35", ip: "102.89.23.14" },
  { id: "log-6", actor: "Jordan Blake", action: "Approved refund for ORD-20458", target: "Transactions", timestamp: "2026-03-03 10:12", ip: "41.203.88.19" },
  { id: "log-7", actor: "Morgan Lee", action: "Published flash sale Weekend Grocery Blast", target: "Flash Sales", timestamp: "2026-03-02 09:00", ip: "197.211.63.90" },
  { id: "log-8", actor: "Alex Johnson", action: "Updated API webhook URL", target: "API Settings", timestamp: "2026-03-01 20:41", ip: "102.89.23.14" },
];
