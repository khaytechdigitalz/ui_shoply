export type AdminProductStatus = "Active" | "Draft" | "Out of Stock";

export interface AdminProduct {
  id: string;
  name: string;
  image: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  stock: number;
  status: AdminProductStatus;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  parent?: string;
  productCount: number;
  status: "Active" | "Inactive";
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productCount: number;
  status: "Active" | "Inactive";
}

export type AttributeType = "Select" | "Color" | "Text";

export interface Attribute {
  id: string;
  name: string;
  type: AttributeType;
  values: string[];
  usedByCount: number;
}

export type ReviewStatus = "Pending" | "Approved" | "Rejected";

export interface AdminReview {
  id: string;
  product: string;
  productImage: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
}

export type AdminOrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
export type PaymentStatus = "Paid" | "Unpaid" | "Refunded" | "Partially Refunded";

export interface AdminOrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: AdminOrderItem[];
  total: number;
  status: AdminOrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  vendor: string;
  address: string;
}

export interface AbandonedCart {
  id: string;
  customer: string;
  email: string;
  itemCount: number;
  value: number;
  lastActive: string;
  remindersSent: number;
}

export type TransactionStatus = "Success" | "Pending" | "Failed" | "Refunded";

export interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: string;
  status: TransactionStatus;
  date: string;
}

export type CouponType = "Percentage" | "Fixed Amount" | "Free Shipping";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  usageLimit: number;
  used: number;
  startDate: string;
  expiryDate: string;
  status: "Active" | "Expired" | "Scheduled" | "Disabled";
}

export interface FlashSale {
  id: string;
  name: string;
  discountPercent: number;
  productIds: string[];
  startDate: string;
  endDate: string;
  status: "Live" | "Scheduled" | "Ended";
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  joined: string;
  ordersCount: number;
  totalSpent: number;
  status: "Active" | "Blocked";
}

export type AdminRole = "Super Admin" | "Store Manager" | "Support Agent" | "Content Editor" | "Finance";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: AdminRole;
  status: "Active" | "Suspended";
  lastLogin: string;
}

export interface Role {
  id: string;
  name: AdminRole;
  description: string;
  usersCount: number;
  permissions: string[];
}

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

export interface TicketMessage {
  from: "customer" | "agent";
  author: string;
  message: string;
  date: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  customerEmail: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  category: string;
  messages: TicketMessage[];
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
}

export interface StorefrontSettings {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  googleAnalyticsId: string;
  googleSiteVerification: string;
  robotsTxt: string;
}

export interface ApiKeyEntry {
  id: string;
  label: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

export interface ApiSettings {
  webhookUrl: string;
  paymentGatewayPublicKey: string;
  paymentGatewaySecretKey: string;
  rateLimitPerMinute: number;
  keys: ApiKeyEntry[];
}

export interface AdminProfile {
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  phone: string;
}
