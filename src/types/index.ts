export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  gallery?: string[];
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  vendor?: string;
  vendorLogo?: string;
  unit?: string;
  badge?: string;
  category?: string;
  inStock?: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount?: number;
  href?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  excerpt?: string;
  date: string;
  author?: string;
  category?: string;
  commentCount?: number;
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  logo: string;
  cover?: string;
  rating: number;
  reviewCount: number;
  productCount?: number;
  location?: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  quote: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  vendor?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderLineItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderTimelineStep {
  label: string;
  date?: string;
  done: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  addressId: string;
  timeline: OrderTimelineStep[];
}

export interface Review {
  productId: string;
  orderId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}
