import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Tag } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";
import { formatCurrency, getImageSrc } from "@/lib/utils";

export function Cart() {
  const { cartItems, updateCartQuantity, removeFromCart, cartSubtotal } = useStore();

  if (cartItems.length === 0) {
    return (
      <div>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} title="Your Cart" />
        <Section>
          <Container>
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <ShoppingCart className="text-gray-tertiary size-20" />
              <h2 className="text-gray-primary text-xl font-bold">Your cart is empty</h2>
              <p className="text-gray-secondary">Looks like you haven't added anything yet.</p>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  const shipping = cartSubtotal > 50 ? 0 : 4.99;
  const total = cartSubtotal + shipping;

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} title="Your Cart" />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div className="overflow-hidden rounded-2xl border border-gray-300">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-gray-secondary px-5 py-3 text-sm font-medium">Product</th>
                    <th className="text-gray-secondary px-5 py-3 text-sm font-medium">Price</th>
                    <th className="text-gray-secondary px-5 py-3 text-sm font-medium">Quantity</th>
                    <th className="text-gray-secondary px-5 py-3 text-sm font-medium">Total</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-16 shrink-0 overflow-hidden rounded-lg">
                            <img src={getImageSrc(item.product.image)} alt={item.product.name} loading="lazy" className="size-full object-cover" />
                          </div>
                          <span className="text-gray-primary line-clamp-2 text-sm font-medium">
                            {item.product.name}
                          </span>
                        </div>
                      </td>
                      <td className="text-gray-primary px-5 py-4 text-sm">
                        {formatCurrency(item.product.price)}
                      </td>
                      <td className="px-5 py-4">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(q) => updateCartQuantity(item.id, q)}
                        />
                      </td>
                      <td className="text-gray-primary px-5 py-4 text-sm font-bold">
                        {formatCurrency(item.product.price * item.quantity)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-tertiary hover:text-error-dark cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="h-fit space-y-5 rounded-2xl border border-gray-300 p-6">
              <h3 className="text-gray-primary text-lg font-bold">Order Summary</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                  <input
                    placeholder="Coupon code"
                    className="border-gray-tertiary/32 h-11 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
              <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-secondary">Subtotal</span>
                  <span className="text-gray-primary font-medium">
                    {formatCurrency(cartSubtotal)}
                  </span>
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
              <Link to="/checkout-1">
                <Button fullWidth>Proceed to Checkout</Button>
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
