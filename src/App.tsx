import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "@/components/layout/Layout";
import { StoreProvider } from "@/store/StoreContext";
import { AdminProvider } from "@/admin/context/AdminContext";
import { ThemeProvider } from "@/theme/ThemeContext";

import { Home } from "@/pages/Home";
import { Products } from "@/pages/Products";
import { ProductDetails } from "@/pages/ProductDetails";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { VendorList } from "@/pages/VendorList";
import { VendorProfile } from "@/pages/VendorProfile";
import { BlogList } from "@/pages/BlogList";
import { BlogDetails } from "@/pages/BlogDetails";
import { Faq } from "@/pages/Faq";
import { Contact } from "@/pages/Contact";
import { Wishlist } from "@/pages/Wishlist";
import { CompareList } from "@/pages/CompareList";
import { OrderSuccess } from "@/pages/OrderSuccess";
import { EmptyCartScreen } from "@/pages/EmptyCartScreen";
import { ComingSoon } from "@/pages/ComingSoon";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { TermsAndConditions } from "@/pages/TermsAndConditions";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { OtpVerification } from "@/pages/OtpVerification";
import { ResetPassword } from "@/pages/ResetPassword";
import { PasswordResetSuccess } from "@/pages/PasswordResetSuccess";
import { NotFound } from "@/pages/NotFound";

import { DashboardLayout } from "@/pages/account/DashboardLayout";
import { Overview } from "@/pages/account/Overview";
import { Orders } from "@/pages/account/Orders";
import { OrderDetails } from "@/pages/account/OrderDetails";
import { OrderReceipt } from "@/pages/account/OrderReceipt";
import { Profile } from "@/pages/account/Profile";
import { Addresses } from "@/pages/account/Addresses";

// Admin panel is code-split into its own chunk so storefront visitors never
// download it (it pulls in recharts and a large set of management screens).
const AdminLayout = lazy(() => import("@/admin/components/AdminLayout").then((m) => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import("@/admin/pages/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const Dashboard = lazy(() => import("@/admin/pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const AllProducts = lazy(() => import("@/admin/pages/products/AllProducts").then((m) => ({ default: m.AllProducts })));
const CreateProduct = lazy(() => import("@/admin/pages/products/CreateProduct").then((m) => ({ default: m.CreateProduct })));
const Categories = lazy(() => import("@/admin/pages/Categories").then((m) => ({ default: m.Categories })));
const Brands = lazy(() => import("@/admin/pages/Brands").then((m) => ({ default: m.Brands })));
const Attributes = lazy(() => import("@/admin/pages/Attributes").then((m) => ({ default: m.Attributes })));
const ProductReviews = lazy(() => import("@/admin/pages/ProductReviews").then((m) => ({ default: m.ProductReviews })));
const OrderManagement = lazy(() => import("@/admin/pages/OrderManagement").then((m) => ({ default: m.OrderManagement })));
const AbandonedCarts = lazy(() => import("@/admin/pages/AbandonedCarts").then((m) => ({ default: m.AbandonedCarts })));
const Transactions = lazy(() => import("@/admin/pages/Transactions").then((m) => ({ default: m.Transactions })));
const Coupons = lazy(() => import("@/admin/pages/Coupons").then((m) => ({ default: m.Coupons })));
const FlashSales = lazy(() => import("@/admin/pages/FlashSales").then((m) => ({ default: m.FlashSales })));
const SalesReport = lazy(() => import("@/admin/pages/reports/SalesReport").then((m) => ({ default: m.SalesReport })));
const GrossingProducts = lazy(() => import("@/admin/pages/reports/GrossingProducts").then((m) => ({ default: m.GrossingProducts })));
const Earnings = lazy(() => import("@/admin/pages/reports/Earnings").then((m) => ({ default: m.Earnings })));
const RefundTax = lazy(() => import("@/admin/pages/reports/RefundTax").then((m) => ({ default: m.RefundTax })));
const Customers = lazy(() => import("@/admin/pages/Customers").then((m) => ({ default: m.Customers })));
const AdminUsers = lazy(() => import("@/admin/pages/AdminUsers").then((m) => ({ default: m.AdminUsers })));
const RolesPermissions = lazy(() => import("@/admin/pages/RolesPermissions").then((m) => ({ default: m.RolesPermissions })));
const SupportTickets = lazy(() => import("@/admin/pages/SupportTickets").then((m) => ({ default: m.SupportTickets })));
const StorefrontSettings = lazy(() => import("@/admin/pages/settings/StorefrontSettings").then((m) => ({ default: m.StorefrontSettings })));
const SeoSettings = lazy(() => import("@/admin/pages/settings/SeoSettings").then((m) => ({ default: m.SeoSettings })));
const ApiSettings = lazy(() => import("@/admin/pages/settings/ApiSettings").then((m) => ({ default: m.ApiSettings })));
const AdminProfileSettings = lazy(() => import("@/admin/pages/AdminProfileSettings").then((m) => ({ default: m.AdminProfileSettings })));
const AuditLog = lazy(() => import("@/admin/pages/AuditLog").then((m) => ({ default: m.AuditLog })));

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="border-primary-light size-8 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AdminProvider>
        <BrowserRouter>
          <Suspense fallback={<AdminFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="product-details-1" element={<ProductDetails />} />
                <Route path="cart-single-vendor" element={<Cart />} />
                <Route path="checkout-1" element={<Checkout />} />
                <Route path="vendor-list" element={<VendorList />} />
                <Route path="vendor-profile" element={<VendorProfile />} />
                <Route path="blog-list" element={<BlogList />} />
                <Route path="blog-details" element={<BlogDetails />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contact" element={<Contact />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="compare-list" element={<CompareList />} />
                <Route path="order-success" element={<OrderSuccess />} />
                <Route path="empty-cart-screen" element={<EmptyCartScreen />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="term-and-conditions" element={<TermsAndConditions />} />

                {/* Customer dashboard */}
                <Route path="account" element={<DashboardLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:orderId" element={<OrderDetails />} />
                  <Route path="orders/:orderId/receipt" element={<OrderReceipt />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="addresses" element={<Addresses />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Full-page, header/footer-free auth routes */}
              <Route path="coming-soon" element={<ComingSoon />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="otp-verification" element={<OtpVerification />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="password-reset-success" element={<PasswordResetSuccess />} />

              {/* Admin panel (code-split) */}
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="products/create" element={<CreateProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="brands" element={<Brands />} />
                <Route path="attributes" element={<Attributes />} />
                <Route path="reviews" element={<ProductReviews />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="abandoned-carts" element={<AbandonedCarts />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="coupons" element={<Coupons />} />
                <Route path="flash-sales" element={<FlashSales />} />
                <Route path="reports/sales" element={<SalesReport />} />
                <Route path="reports/grossing-products" element={<GrossingProducts />} />
                <Route path="reports/earnings" element={<Earnings />} />
                <Route path="reports/refund-tax" element={<RefundTax />} />
                <Route path="customers" element={<Customers />} />
                <Route path="admin-users" element={<AdminUsers />} />
                <Route path="roles-permissions" element={<RolesPermissions />} />
                <Route path="support-tickets" element={<SupportTickets />} />
                <Route path="settings/storefront" element={<StorefrontSettings />} />
                <Route path="settings/seo" element={<SeoSettings />} />
                <Route path="settings/api" element={<ApiSettings />} />
                <Route path="profile" element={<AdminProfileSettings />} />
                <Route path="audit-log" element={<AuditLog />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="top-right" richColors closeButton />
      </AdminProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
