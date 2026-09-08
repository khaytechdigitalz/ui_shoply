import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import * as seed from "@/admin/data/adminMock";
import type {
  AdminProduct,
  AdminCategory,
  Brand,
  Attribute,
  AdminReview,
  ReviewStatus,
  AdminOrder,
  AdminOrderStatus,
  AbandonedCart,
  Transaction,
  Coupon,
  FlashSale,
  AdminCustomer,
  AdminUser,
  Role,
  SupportTicket,
  TicketStatus,
  AuditLogEntry,
  StorefrontSettings,
  SeoSettings,
  ApiSettings,
  AdminProfile,
} from "@/types/admin";

const defaultAdminProfile: AdminProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@storly.com",
  role: "Super Admin",
  avatar: "images/avatars/avatar-4.jpg",
  phone: "+1 (480) 555-0103",
};

const defaultStorefrontSettings: StorefrontSettings = {
  storeName: "Storly",
  tagline: "Farm fresh groceries, delivered to your door.",
  supportEmail: "help@company.com",
  supportPhone: "+1 (555) 666-77-88",
  address: "2972 Westheimer Rd, Santa Ana, Illinois 85486",
  currency: "USD ($)",
  timezone: "(GMT-06:00) Central Time",
  maintenanceMode: false,
  facebookUrl: "https://facebook.com/storly",
  instagramUrl: "https://instagram.com/storly",
  twitterUrl: "https://twitter.com/storly",
};

const defaultSeoSettings: SeoSettings = {
  metaTitle: "Storly – Multi-Vendor Grocery & Ecommerce Marketplace",
  metaDescription: "Farm fresh groceries, delivered to your door from 100+ trusted local vendors.",
  metaKeywords: "grocery, ecommerce, marketplace, fresh food, delivery",
  ogImage: "images/hero/hero-slide-1.jpg",
  googleAnalyticsId: "G-XXXXXXXXXX",
  googleSiteVerification: "",
  robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://storly.example.com/sitemap.xml",
};

const defaultApiSettings: ApiSettings = {
  webhookUrl: "https://storly.example.com/api/webhooks/orders",
  paymentGatewayPublicKey: "pk_live_51Hj29a...",
  paymentGatewaySecretKey: "sk_live_51Hj29a...",
  rateLimitPerMinute: 120,
  keys: [
    { id: "key-1", label: "Storefront (production)", key: "sk_live_9f2a...c821", createdAt: "2026-01-04", lastUsed: "2026-03-05" },
    { id: "key-2", label: "Mobile app", key: "sk_live_7b1d...e440", createdAt: "2026-01-20", lastUsed: "2026-03-04" },
  ],
};

interface AdminContextValue {
  isAdminAuthenticated: boolean;
  adminLogin: (email: string) => void;
  adminLogout: () => void;
  adminLogoutModalOpen: boolean;
  setAdminLogoutModalOpen: (open: boolean) => void;
  adminProfile: AdminProfile;
  updateAdminProfile: (update: Partial<AdminProfile>) => void;

  products: AdminProduct[];
  addProduct: (p: AdminProduct) => void;
  updateProduct: (id: string, p: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;

  categories: AdminCategory[];
  addCategory: (c: AdminCategory) => void;
  updateCategory: (id: string, c: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  brands: Brand[];
  addBrand: (b: Brand) => void;
  updateBrand: (id: string, b: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;

  attributes: Attribute[];
  addAttribute: (a: Attribute) => void;
  updateAttribute: (id: string, a: Partial<Attribute>) => void;
  deleteAttribute: (id: string) => void;

  reviews: AdminReview[];
  setReviewStatus: (id: string, status: ReviewStatus) => void;

  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: AdminOrderStatus) => void;

  abandonedCarts: AbandonedCart[];
  sendCartReminder: (id: string) => void;

  transactions: Transaction[];
  refundTransaction: (id: string) => void;

  coupons: Coupon[];
  addCoupon: (c: Coupon) => void;
  updateCoupon: (id: string, c: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  flashSales: FlashSale[];
  addFlashSale: (f: FlashSale) => void;
  updateFlashSale: (id: string, f: Partial<FlashSale>) => void;
  deleteFlashSale: (id: string) => void;

  customers: AdminCustomer[];
  toggleCustomerStatus: (id: string) => void;

  users: AdminUser[];
  addUser: (u: AdminUser) => void;
  updateUser: (id: string, u: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;

  roles: Role[];
  updateRole: (id: string, r: Partial<Role>) => void;

  tickets: SupportTicket[];
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  replyToTicket: (id: string, message: string) => void;

  auditLog: AuditLogEntry[];
  logAction: (action: string, target: string) => void;

  storefrontSettings: StorefrontSettings;
  updateStorefrontSettings: (s: Partial<StorefrontSettings>) => void;

  seoSettings: SeoSettings;
  updateSeoSettings: (s: Partial<SeoSettings>) => void;

  apiSettings: ApiSettings;
  updateApiSettings: (s: Partial<ApiSettings>) => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLogoutModalOpen, setAdminLogoutModalOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(defaultAdminProfile);

  const [products, setProducts] = useState<AdminProduct[]>(seed.adminProducts);
  const [categories, setCategories] = useState<AdminCategory[]>(seed.adminCategories);
  const [brands, setBrands] = useState<Brand[]>(seed.brands);
  const [attributes, setAttributes] = useState<Attribute[]>(seed.attributes);
  const [reviews, setReviews] = useState<AdminReview[]>(seed.adminReviews);
  const [orders, setOrders] = useState<AdminOrder[]>(seed.adminOrders);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>(seed.abandonedCarts);
  const [transactions, setTransactions] = useState<Transaction[]>(seed.transactions);
  const [coupons, setCoupons] = useState<Coupon[]>(seed.coupons);
  const [flashSales, setFlashSales] = useState<FlashSale[]>(seed.flashSales);
  const [customers, setCustomers] = useState<AdminCustomer[]>(seed.adminCustomers);
  const [users, setUsers] = useState<AdminUser[]>(seed.adminUsers);
  const [roles, setRoles] = useState<Role[]>(seed.roles);
  const [tickets, setTickets] = useState<SupportTicket[]>(seed.supportTickets);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(seed.auditLog);
  const [storefrontSettings, setStorefrontSettings] = useState(defaultStorefrontSettings);
  const [seoSettings, setSeoSettings] = useState(defaultSeoSettings);
  const [apiSettings, setApiSettings] = useState(defaultApiSettings);

  const logAction = useCallback((action: string, target: string) => {
    setAuditLog((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: adminProfile.name,
        action,
        target,
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
        ip: "102.89.23.14",
      },
      ...prev,
    ]);
  }, [adminProfile.name]);

  const adminLogin = useCallback((email: string) => {
    setIsAdminAuthenticated(true);
    setAdminProfile((prev) => ({ ...prev, email }));
    toast.success("Welcome back, Admin!");
  }, []);

  const adminLogout = useCallback(() => {
    setIsAdminAuthenticated(false);
    setAdminLogoutModalOpen(false);
    toast.success("You've been logged out of the admin panel");
  }, []);

  const updateAdminProfile = useCallback((update: Partial<AdminProfile>) => {
    setAdminProfile((prev) => ({ ...prev, ...update }));
    toast.success("Profile updated");
  }, []);

  const addProduct = useCallback((p: AdminProduct) => {
    setProducts((prev) => [p, ...prev]);
    logAction(`Created product ${p.name}`, "Products");
    toast.success("Product created");
  }, [logAction]);
  const updateProduct = useCallback((id: string, p: Partial<AdminProduct>) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
    logAction(`Updated product ${id}`, "Products");
    toast.success("Product updated");
  }, [logAction]);
  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
    logAction(`Deleted product ${id}`, "Products");
    toast("Product deleted");
  }, [logAction]);

  const addCategory = useCallback((c: AdminCategory) => {
    setCategories((prev) => [c, ...prev]);
    logAction(`Created category ${c.name}`, "Categories");
    toast.success("Category created");
  }, [logAction]);
  const updateCategory = useCallback((id: string, c: Partial<AdminCategory>) => {
    setCategories((prev) => prev.map((x) => (x.id === id ? { ...x, ...c } : x)));
    toast.success("Category updated");
  }, []);
  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((x) => x.id !== id));
    toast("Category deleted");
  }, []);

  const addBrand = useCallback((b: Brand) => {
    setBrands((prev) => [b, ...prev]);
    toast.success("Brand created");
  }, []);
  const updateBrand = useCallback((id: string, b: Partial<Brand>) => {
    setBrands((prev) => prev.map((x) => (x.id === id ? { ...x, ...b } : x)));
    toast.success("Brand updated");
  }, []);
  const deleteBrand = useCallback((id: string) => {
    setBrands((prev) => prev.filter((x) => x.id !== id));
    toast("Brand deleted");
  }, []);

  const addAttribute = useCallback((a: Attribute) => {
    setAttributes((prev) => [a, ...prev]);
    toast.success("Attribute created");
  }, []);
  const updateAttribute = useCallback((id: string, a: Partial<Attribute>) => {
    setAttributes((prev) => prev.map((x) => (x.id === id ? { ...x, ...a } : x)));
    toast.success("Attribute updated");
  }, []);
  const deleteAttribute = useCallback((id: string) => {
    setAttributes((prev) => prev.filter((x) => x.id !== id));
    toast("Attribute deleted");
  }, []);

  const setReviewStatus = useCallback((id: string, status: ReviewStatus) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Review ${status.toLowerCase()}`);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: AdminOrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    logAction(`Updated order ${id} status to ${status}`, "Order Management");
    toast.success(`Order marked as ${status}`);
  }, [logAction]);

  const sendCartReminder = useCallback((id: string) => {
    setAbandonedCarts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, remindersSent: c.remindersSent + 1 } : c)),
    );
    toast.success("Reminder email sent");
  }, []);

  const refundTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Refunded" } : t)));
    logAction(`Refunded transaction ${id}`, "Transactions");
    toast.success("Transaction refunded");
  }, [logAction]);

  const addCoupon = useCallback((c: Coupon) => {
    setCoupons((prev) => [c, ...prev]);
    logAction(`Created coupon ${c.code}`, "Coupons");
    toast.success("Coupon created");
  }, [logAction]);
  const updateCoupon = useCallback((id: string, c: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((x) => (x.id === id ? { ...x, ...c } : x)));
    toast.success("Coupon updated");
  }, []);
  const deleteCoupon = useCallback((id: string) => {
    setCoupons((prev) => prev.filter((x) => x.id !== id));
    toast("Coupon deleted");
  }, []);

  const addFlashSale = useCallback((f: FlashSale) => {
    setFlashSales((prev) => [f, ...prev]);
    logAction(`Published flash sale ${f.name}`, "Flash Sales");
    toast.success("Flash sale created");
  }, [logAction]);
  const updateFlashSale = useCallback((id: string, f: Partial<FlashSale>) => {
    setFlashSales((prev) => prev.map((x) => (x.id === id ? { ...x, ...f } : x)));
    toast.success("Flash sale updated");
  }, []);
  const deleteFlashSale = useCallback((id: string) => {
    setFlashSales((prev) => prev.filter((x) => x.id !== id));
    toast("Flash sale deleted");
  }, []);

  const toggleCustomerStatus = useCallback((id: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "Active" ? "Blocked" : "Active" } : c)),
    );
    toast.success("Customer status updated");
  }, []);

  const addUser = useCallback((u: AdminUser) => {
    setUsers((prev) => [u, ...prev]);
    logAction(`Invited admin user ${u.name}`, "Admin Users");
    toast.success("Admin user invited");
  }, [logAction]);
  const updateUser = useCallback((id: string, u: Partial<AdminUser>) => {
    setUsers((prev) => prev.map((x) => (x.id === id ? { ...x, ...u } : x)));
    toast.success("Admin user updated");
  }, []);
  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((x) => x.id !== id));
    logAction(`Removed admin user ${id}`, "Admin Users");
    toast("Admin user removed");
  }, [logAction]);

  const updateRole = useCallback((id: string, r: Partial<Role>) => {
    setRoles((prev) => prev.map((x) => (x.id === id ? { ...x, ...r } : x)));
    toast.success("Role permissions updated");
  }, []);

  const updateTicketStatus = useCallback((id: string, status: TicketStatus) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    toast.success(`Ticket marked as ${status}`);
  }, []);
  const replyToTicket = useCallback((id: string, message: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "Open" ? "In Progress" : t.status,
              updatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
              messages: [
                ...t.messages,
                { from: "agent", author: adminProfile.name, message, date: new Date().toISOString().slice(0, 16).replace("T", " ") },
              ],
            }
          : t,
      ),
    );
    toast.success("Reply sent");
  }, [adminProfile.name]);

  const updateStorefrontSettings = useCallback((s: Partial<StorefrontSettings>) => {
    setStorefrontSettings((prev) => ({ ...prev, ...s }));
    logAction("Updated storefront settings", "Storefront Settings");
    toast.success("Storefront settings saved");
  }, [logAction]);

  const updateSeoSettings = useCallback((s: Partial<SeoSettings>) => {
    setSeoSettings((prev) => ({ ...prev, ...s }));
    logAction("Updated SEO settings", "SEO Settings");
    toast.success("SEO settings saved");
  }, [logAction]);

  const updateApiSettings = useCallback((s: Partial<ApiSettings>) => {
    setApiSettings((prev) => ({ ...prev, ...s }));
    logAction("Updated API settings", "API Settings");
    toast.success("API settings saved");
  }, [logAction]);

  const value: AdminContextValue = {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    adminLogoutModalOpen,
    setAdminLogoutModalOpen,
    adminProfile,
    updateAdminProfile,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    brands,
    addBrand,
    updateBrand,
    deleteBrand,
    attributes,
    addAttribute,
    updateAttribute,
    deleteAttribute,
    reviews,
    setReviewStatus,
    orders,
    updateOrderStatus,
    abandonedCarts,
    sendCartReminder,
    transactions,
    refundTransaction,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    flashSales,
    addFlashSale,
    updateFlashSale,
    deleteFlashSale,
    customers,
    toggleCustomerStatus,
    users,
    addUser,
    updateUser,
    deleteUser,
    roles,
    updateRole,
    tickets,
    updateTicketStatus,
    replyToTicket,
    auditLog,
    logAction,
    storefrontSettings,
    updateStorefrontSettings,
    seoSettings,
    updateSeoSettings,
    apiSettings,
    updateApiSettings,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
