import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  Phone,
  Globe,
  GitCompare,
  LayoutDashboard,
  Package,
  LogOut,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Dropdown } from "@/components/ui/Dropdown";
import { useStore } from "@/store/StoreContext";
import { categories } from "@/data/content";
import { cn, getImageSrc } from "@/lib/utils";

const primaryNav = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Product Details", href: "/product-details-1" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Cart", href: "/cart-single-vendor" },
      { label: "Checkout", href: "/checkout-1" },
      { label: "Compare", href: "/compare-list" },
      { label: "Order Success", href: "/order-success" },
      { label: "Empty Cart", href: "/empty-cart-screen" },
    ],
  },
  {
    label: "Sellers",
    href: "/vendor-list",
    children: [
      { label: "All Vendors", href: "/vendor-list" },
      { label: "Vendor Profile", href: "/vendor-profile" },
    ],
  },
  {
    label: "Categories",
    href: "/products",
    children: categories.map((c) => ({ label: c.name, href: `/products?category=${c.id}` })),
  },
  {
    label: "Pages",
    href: "/faq",
    children: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "My Account", href: "/account" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/term-and-conditions" },
      { label: "Coming Soon", href: "/coming-soon" },
    ],
  },
  {
    label: "Blog",
    href: "/blog-list",
    children: [
      { label: "Blog List", href: "/blog-list" },
      { label: "Blog Details", href: "/blog-details" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  function submit() {
    navigate(`/products${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setFocused(false);
  }

  return (
    <div className={cn("relative", className)}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Search for the items"
        className="border-gray-tertiary/32 focus:ring-primary-main h-12 w-full rounded-full border px-4 py-3 pl-12 focus:outline-0"
      />
      <button
        onClick={submit}
        className="text-gray-tertiary absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer"
        aria-label="Search"
      >
        <Search className="size-5" />
      </button>
      {focused && (
        <div className="shadow-light-2 border-gray-tertiary/24 absolute top-full right-0 left-0 z-50 mt-2 max-h-[380px] overflow-y-auto rounded-2xl border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-gray-primary text-sm font-medium">
              Recent Search
            </span>
            <button className="text-primary-main text-xs font-medium">
              Reset History
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Vitamin D supplements", "Pain relief spray", "Baby thermometer"].map(
              (term) => (
                <button
                  key={term}
                  onMouseDown={() => {
                    setQuery(term);
                    navigate(`/products?q=${encodeURIComponent(term)}`);
                  }}
                  className="border-gray-tertiary/32 hover:border-primary-main rounded-full border px-3 py-1.5 text-sm transition-colors"
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const {
    cartCount,
    compareList,
    wishlist,
    setCartOpen,
    setMobileMenuOpen,
    isAuthenticated,
    profile,
    setLogoutModalOpen,
  } = useStore();

  return (
    <header className="z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary-main hidden py-3 xl:block">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="flex items-center gap-2 text-sm text-white">
                <Phone className="size-4" />
                <span>Need Support? Call Us</span>
                <a
                  href="tel:+4805550103"
                  className="bg-success-light inline-flex h-5 items-center justify-center rounded-full px-2 text-xs font-normal text-gray-800"
                >
                  (480) 555-0103
                </a>
              </p>
              <div className="divide-primary-main-dark hidden divide-x lg:flex">
                <Dropdown
                  trigger={({ toggle }) => (
                    <button
                      onClick={toggle}
                      className="flex items-center gap-1.5 pr-5 text-sm text-white hover:opacity-80"
                    >
                      <Globe className="size-4" />
                      English
                      <ChevronDown className="size-4" />
                    </button>
                  )}
                >
                  {(close) => (
                    <div className="w-32 py-1">
                      {["English", "Español", "Français", "Deutsch"].map((l) => (
                        <button
                          key={l}
                          onClick={close}
                          className="hover:bg-primary-main/10 text-gray-secondary block w-full px-4 py-2 text-left text-sm"
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  )}
                </Dropdown>
                <Dropdown
                  trigger={({ toggle }) => (
                    <button
                      onClick={toggle}
                      className="flex items-center gap-1.5 pl-5 text-sm text-white hover:opacity-80"
                    >
                      USD
                      <ChevronDown className="size-4" />
                    </button>
                  )}
                >
                  {(close) => (
                    <div className="w-28 py-1">
                      {["USD ($)", "EUR (€)", "GBP (£)", "JPY (¥)"].map((c) => (
                        <button
                          key={c}
                          onClick={close}
                          className="hover:bg-primary-main/10 text-gray-secondary block w-full px-4 py-2 text-left text-sm"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </Dropdown>
              </div>
            </div>
            <div className="flex items-center gap-4.5">
              <Link
                to="/faq"
                className="hover:text-success-light text-sm text-white transition"
              >
                About Us
              </Link>
              <Link
                to="/account"
                className="hover:text-success-light text-sm text-white transition"
              >
                My Account
              </Link>
              <Link
                to="/wishlist"
                className="hover:text-success-light text-sm text-white transition"
              >
                My Wishlist
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main row - desktop */}
      <div className="hidden w-full border-b border-gray-300 py-4 xl:block">
        <Container>
          <div className="flex items-center justify-between gap-5">
            <Logo />
            <SearchBar className="w-[520px]" />
            <div className="flex items-center gap-6">
              <Link
                to="/compare-list"
                className="text-gray-secondary hover:text-primary-main relative flex flex-col items-center text-xs"
              >
                <GitCompare className="size-6" />
                Compare
                {compareList.length > 0 && (
                  <span className="bg-primary-main absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] text-white">
                    {compareList.length}
                  </span>
                )}
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-secondary hover:text-primary-main relative flex flex-col items-center text-xs"
              >
                <Heart className="size-6" />
                Wishlist
                {wishlist.length > 0 && (
                  <span className="bg-primary-main absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <div className="group relative">
                <button className="flex cursor-pointer items-center gap-2 text-left">
                  <span className="bg-primary-lighter text-primary-main flex size-10 items-center justify-center rounded-full overflow-hidden">
                    {isAuthenticated ? (
                      <img
                        src={getImageSrc(profile.avatar)}
                        alt={profile.firstName}
                        className="size-full object-cover"
                      />
                    ) : (
                      <User className="size-5" />
                    )}
                  </span>
                  <span>
                    <span className="text-gray-secondary flex items-center gap-1 text-sm">
                      Account
                      <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                    </span>
                    <span className="text-gray-primary block text-sm font-medium">
                      {isAuthenticated ? `${profile.firstName} ${profile.lastName}` : "Sign in / Sign up"}
                    </span>
                  </span>
                </button>
                <div className="shadow-light invisible absolute top-full right-0 z-50 mt-2 w-52 rounded-2xl border border-gray-300 bg-white p-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  {isAuthenticated ? (
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/account"
                          className="hover:bg-primary-main/10 hover:text-primary-main text-gray-secondary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          <LayoutDashboard className="size-4" /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/orders"
                          className="hover:bg-primary-main/10 hover:text-primary-main text-gray-secondary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          <Package className="size-4" /> My Orders
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => setLogoutModalOpen(true)}
                          className="hover:bg-error-lighter/50 text-error-dark flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-left text-sm font-medium"
                        >
                          <LogOut className="size-4" /> Log Out
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/login"
                          className="hover:bg-primary-main/10 hover:text-primary-main text-gray-secondary block rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="hover:bg-primary-main/10 hover:text-primary-main text-gray-secondary block rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/forgot-password"
                          className="hover:bg-primary-main/10 hover:text-primary-main text-gray-secondary block rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          Forgot Password
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCartOpen(true)}
                  className="bg-primary-main text-success-light relative inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full"
                >
                  <ShoppingCart className="size-5" />
                  {cartCount > 0 && (
                    <span className="bg-success-light text-primary-main absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="cursor-pointer text-left"
                >
                  <span className="text-gray-secondary block text-sm">Cart</span>
                  <span className="text-gray-primary block text-sm font-medium">
                    {cartCount} Items
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Primary nav - desktop */}
      <nav className="hidden border-b border-gray-300 bg-white xl:block">
        <Container>
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  to={item.href}
                  className="text-gray-primary hover:text-primary-main flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium transition"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <div className="shadow-light invisible absolute top-full left-0 z-50 min-w-52 -translate-y-2 rounded-xl border border-gray-200 bg-white p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.href}
                            className="hover:bg-primary-main/10 hover:text-primary-main text-gray-secondary block rounded-lg px-4 py-2 text-sm"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Mobile header */}
      <div className="border-b border-gray-300 bg-white px-5 py-4 xl:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-primary flex size-11 items-center justify-center rounded-full border border-gray-300"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <Logo />
          <button
            onClick={() => setCartOpen(true)}
            className="bg-primary-main text-success-light relative flex size-11 items-center justify-center rounded-full"
            aria-label="Open cart"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="bg-success-light text-primary-main absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <SearchBar className="mt-4" />
      </div>
    </header>
  );
}
