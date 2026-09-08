import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";
import { formatCurrency, cn, getImageSrc } from "@/lib/utils";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
  } = useStore();

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title={`Shopping Cart (${cartItems.length})`}
    >
      {cartItems.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <ShoppingCart className="text-gray-tertiary size-16" />
          <p className="text-gray-secondary">Your cart is empty.</p>
          <Link
            to="/products"
            onClick={() => setCartOpen(false)}
            className={cn(
              "bg-primary-main text-success-light hover:bg-primary-main-dark hover:text-white inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium transition-all",
            )}
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="size-20 shrink-0 overflow-hidden rounded-lg">
                  <img src={getImageSrc(item.product.image)} alt={item.product.name} loading="lazy" className="size-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-gray-primary line-clamp-2 text-sm font-medium">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateCartQuantity(item.id, q)}
                      className="scale-90 origin-left"
                    />
                    <span className="text-gray-primary text-sm font-bold">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-tertiary hover:text-error-dark h-fit cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="border-gray-tertiary/24 space-y-4 border-t p-5">
            <div className="flex items-center justify-between">
              <span className="text-gray-secondary text-base">Sub Total</span>
              <span className="text-gray-primary text-lg font-bold">
                {formatCurrency(cartSubtotal)}
              </span>
            </div>
            <Link to="/cart-single-vendor" onClick={() => setCartOpen(false)}>
              <Button variant="outline" fullWidth>
                View Cart
              </Button>
            </Link>
            <Link to="/checkout-1" onClick={() => setCartOpen(false)}>
              <Button fullWidth>Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
}
