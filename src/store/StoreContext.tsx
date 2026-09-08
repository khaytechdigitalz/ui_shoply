import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { Address, CartItem, CustomerProfile, Product, Review } from "@/types";
import { initialAddresses } from "@/data/orders";

interface StoreContextValue {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Compare
  compareList: string[];
  toggleCompare: (productId: string) => void;
  isCompared: (productId: string) => boolean;

  // UI state
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  logoutModalOpen: boolean;
  setLogoutModalOpen: (open: boolean) => void;

  // Auth (mocked client-side session)
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;

  // Customer profile
  profile: CustomerProfile;
  updateProfile: (profile: Partial<CustomerProfile>) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;
  getReviewForProductInOrder: (productId: string, orderId: string) => Review | undefined;
}

const defaultProfile: CustomerProfile = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (480) 555-0103",
  avatar: "images/avatars/avatar-4.jpg",
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<CustomerProfile>(defaultProfile);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [reviews, setReviews] = useState<Review[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { id: product.id, product, quantity, vendor: product.vendor }];
    });
    toast.success("Added to cart", { description: product.name });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast("Removed from cart");
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const isIn = prev.includes(productId);
      toast(isIn ? "Removed from wishlist" : "Added to wishlist");
      return isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  }, []);

  const toggleCompare = useCallback((productId: string) => {
    setCompareList((prev) => {
      const isIn = prev.includes(productId);
      if (!isIn && prev.length >= 4) {
        toast.error("You can compare up to 4 products at a time");
        return prev;
      }
      toast(isIn ? "Removed from compare" : "Added to compare");
      return isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  }, []);

  const login = useCallback((email: string) => {
    setIsAuthenticated(true);
    setProfile((prev) => ({ ...prev, email }));
    toast.success("Welcome back!", { description: "You've successfully signed in." });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setLogoutModalOpen(false);
    toast.success("You've been logged out");
  }, []);

  const updateProfile = useCallback((update: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...update }));
    toast.success("Profile updated");
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    setAddresses((prev) => {
      const id = `addr-${Date.now()}`;
      const shouldBeDefault = address.isDefault || prev.length === 0;
      const next = shouldBeDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : prev;
      return [...next, { ...address, id, isDefault: shouldBeDefault }];
    });
    toast.success("Address added");
  }, []);

  const updateAddress = useCallback((id: string, address: Omit<Address, "id">) => {
    setAddresses((prev) => {
      const next = address.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
      return next.map((a) => (a.id === id ? { ...address, id, isDefault: address.isDefault } : a));
    });
    toast.success("Address updated");
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const removed = prev.find((a) => a.id === id);
      const remaining = prev.filter((a) => a.id !== id);
      if (removed?.isDefault && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
    toast("Address removed");
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  }, []);

  const addReview = useCallback((review: Review) => {
    setReviews((prev) => [...prev.filter((r) => !(r.productId === review.productId && r.orderId === review.orderId)), review]);
    toast.success("Thanks for your review!");
  }, []);

  const getReviewForProductInOrder = useCallback(
    (productId: string, orderId: string) =>
      reviews.find((r) => r.productId === productId && r.orderId === orderId),
    [reviews],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const value: StoreContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    wishlist,
    toggleWishlist,
    isWishlisted: (id) => wishlist.includes(id),
    compareList,
    toggleCompare,
    isCompared: (id) => compareList.includes(id),
    cartOpen,
    setCartOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    logoutModalOpen,
    setLogoutModalOpen,
    isAuthenticated,
    login,
    logout,
    profile,
    updateProfile,
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    reviews,
    addReview,
    getReviewForProductInOrder,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
