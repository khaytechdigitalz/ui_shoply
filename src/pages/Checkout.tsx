import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Landmark, Truck, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";
import { formatCurrency, cn, getImageSrc } from "@/lib/utils";

const inputClass =
  "border-gray-tertiary/32 h-12 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

export function Checkout() {
  const { cartItems, cartSubtotal, clearCart, isAuthenticated, addresses } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"card" | "bank" | "cod">("card");
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id,
  );
  const shipping = cartSubtotal > 50 ? 0 : 4.99;
  const total = cartSubtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-success");
  }

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart-single-vendor" }, { label: "Checkout" }]}
        title="Checkout"
      />
      <Section>
        <Container>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <div>
                <h3 className="text-gray-primary mb-4 text-lg font-bold">Shipping Information</h3>
                {isAuthenticated && addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition-colors ${
                          selectedAddressId === address.id
                            ? "border-primary-main bg-primary-lighter/10"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          className="accent-primary-main mt-1"
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                        />
                        <span>
                          <span className="text-gray-primary flex items-center gap-1.5 font-medium">
                            <MapPin className="size-3.5" /> {address.label}
                            {address.isDefault && (
                              <span className="bg-primary-lighter text-primary-main rounded-full px-2 py-0.5 text-[10px] font-medium">
                                Default
                              </span>
                            )}
                          </span>
                          <span className="text-gray-secondary block">
                            {address.fullName} · {address.line1}, {address.city}, {address.state} {address.zip}
                          </span>
                        </span>
                      </label>
                    ))}
                    <Link to="/account/addresses" className="text-primary-main text-sm font-medium">
                      + Manage addresses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input required placeholder="First name" className={inputClass} />
                    <input required placeholder="Last name" className={inputClass} />
                    <input required type="email" placeholder="Email address" className={inputClass} />
                    <input required type="tel" placeholder="Phone number" className={inputClass} />
                    <input required placeholder="Address" className="sm:col-span-2 h-12 w-full rounded-lg border border-gray-tertiary/32 px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main" />
                    <input required placeholder="City" className={inputClass} />
                    <input required placeholder="ZIP code" className={inputClass} />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-gray-primary mb-4 text-lg font-bold">Payment Method</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { id: "card" as const, label: "Credit Card", icon: CreditCard },
                    { id: "bank" as const, label: "Bank Transfer", icon: Landmark },
                    { id: "cod" as const, label: "Cash on Delivery", icon: Truck },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setPayment(id)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors",
                        payment === id
                          ? "border-primary-main text-primary-main bg-primary-lighter/30"
                          : "border-gray-300 text-gray-secondary",
                      )}
                    >
                      <Icon className="size-5" />
                      {label}
                    </button>
                  ))}
                </div>
                {payment === "card" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input required placeholder="Card number" className="sm:col-span-2 h-12 w-full rounded-lg border border-gray-tertiary/32 px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main" />
                    <input required placeholder="MM/YY" className={inputClass} />
                    <input required placeholder="CVC" className={inputClass} />
                  </div>
                )}
              </div>
            </div>

            <aside className="h-fit space-y-5 rounded-2xl border border-gray-300 p-6">
              <h3 className="text-gray-primary text-lg font-bold">Order Summary</h3>
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg">
                      <img src={getImageSrc(item.product.image)} alt={item.product.name} loading="lazy" className="size-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-primary line-clamp-1 text-sm font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-gray-tertiary text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-gray-primary text-sm font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <p className="text-gray-tertiary text-sm">Your cart is empty.</p>
                )}
              </div>
              <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-secondary">Subtotal</span>
                  <span className="text-gray-primary font-medium">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-secondary">Shipping</span>
                  <span className="text-gray-primary font-medium">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-base">
                  <span className="text-gray-primary font-bold">Total</span>
                  <span className="text-gray-primary font-bold">{formatCurrency(total)}</span>
                </div>
              </div>
              <Button type="submit" fullWidth disabled={cartItems.length === 0}>
                Place Order
              </Button>
            </aside>
          </form>
        </Container>
      </Section>
    </div>
  );
}
