import { Link, useParams } from "react-router-dom";
import { Printer, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { getOrderById } from "@/data/orders";
import { useStore } from "@/store/StoreContext";
import { formatCurrency } from "@/lib/utils";

export function OrderReceipt() {
  const { orderId } = useParams();
  const order = getOrderById(orderId);
  const { addresses } = useStore();

  if (!order) {
    return (
      <div className="rounded-2xl border border-gray-300 py-16 text-center">
        <p className="text-gray-secondary">Order not found.</p>
        <Link to="/account/orders" className="text-primary-main text-sm font-medium">
          Back to orders
        </Link>
      </div>
    );
  }

  const address = addresses.find((a) => a.id === order.addressId);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          to={`/account/orders/${order.id}`}
          className="text-gray-secondary hover:text-primary-main flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> Back to order
        </Link>
        <Button onClick={() => window.print()} icon={<Printer className="size-4" />}>
          Print Receipt
        </Button>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-300 p-8 print:border-0">
        <div className="mb-6 flex items-start justify-between">
          <Logo />
          <div className="text-right">
            <p className="text-gray-primary text-lg font-bold">Receipt</p>
            <p className="text-gray-tertiary text-sm">#{order.id}</p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 text-sm">
          <CheckCircle2 className="text-success-dark-main size-4" />
          <span className="text-gray-secondary">Order {order.status.toLowerCase()} on {order.date}</span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-tertiary mb-1 font-medium uppercase">Billed To</p>
            {address ? (
              <div className="text-gray-secondary">
                <p className="text-gray-primary font-medium">{address.fullName}</p>
                <p>{address.line1}</p>
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
              </div>
            ) : (
              <p className="text-gray-tertiary">—</p>
            )}
          </div>
          <div>
            <p className="text-gray-tertiary mb-1 font-medium uppercase">Payment Method</p>
            <p className="text-gray-secondary">{order.paymentMethod}</p>
          </div>
        </div>

        <table className="mb-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-gray-secondary py-2 font-medium">Item</th>
              <th className="text-gray-secondary py-2 text-right font-medium">Qty</th>
              <th className="text-gray-secondary py-2 text-right font-medium">Price</th>
              <th className="text-gray-secondary py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.product.id} className="border-b border-gray-100">
                <td className="text-gray-primary py-2.5">{item.product.name}</td>
                <td className="text-gray-secondary py-2.5 text-right">{item.quantity}</td>
                <td className="text-gray-secondary py-2.5 text-right">{formatCurrency(item.price)}</td>
                <td className="text-gray-primary py-2.5 text-right font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto w-full max-w-[240px] space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-secondary">Subtotal</span>
            <span className="text-gray-primary">{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-secondary">Shipping</span>
            <span className="text-gray-primary">
              {order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-secondary">Discount</span>
            <span className="text-success-dark-main">-{formatCurrency(order.discount)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-2 text-base font-bold">
            <span className="text-gray-primary">Total</span>
            <span className="text-gray-primary">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <p className="text-gray-tertiary mt-10 text-center text-xs">
          Thank you for shopping with Storly. Questions about this order? Contact
          help@company.com.
        </p>
      </div>
    </div>
  );
}
