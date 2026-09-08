import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Circle, Printer, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getOrderById } from "@/data/orders";
import { useStore } from "@/store/StoreContext";
import { formatCurrency, getImageSrc, cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const statusColors: Record<OrderStatus, string> = {
  Delivered: "bg-success-light text-success-dark-main",
  Shipped: "bg-info-light text-info-dark",
  Processing: "bg-warning-light text-warning-dark-main",
  Cancelled: "bg-error-lighter text-error-dark",
};

function ReviewForm({ productId, orderId }: { productId: string; orderId: string }) {
  const { addReview, getReviewForProductInOrder } = useStore();
  const existing = getReviewForProductInOrder(productId, orderId);
  const [rating, setRating] = useState(existing?.rating ?? 5);
  const [comment, setComment] = useState(existing?.comment ?? "");
  const [submitted, setSubmitted] = useState(!!existing);

  if (submitted) {
    return (
      <div className="bg-primary-lighter/20 mt-3 rounded-lg p-3">
        <div className="mb-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < rating ? "fill-warning-dark text-warning-dark" : "text-gray-300",
              )}
            />
          ))}
        </div>
        <p className="text-gray-secondary text-sm">{comment || "Thanks for your review!"}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary-main mt-1 text-xs font-medium"
        >
          Edit review
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addReview({ productId, orderId, rating, comment, date: new Date().toISOString() });
        setSubmitted(true);
      }}
      className="mt-3 space-y-2 rounded-lg border border-gray-200 p-3"
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            aria-label={`Rate ${i + 1} stars`}
          >
            <Star
              className={cn(
                "size-5 cursor-pointer",
                i < rating ? "fill-warning-dark text-warning-dark" : "text-gray-300",
              )}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts on this product..."
        rows={2}
        className="border-gray-tertiary/32 w-full rounded-lg border p-2.5 text-sm focus:outline-0"
      />
      <Button type="submit" size="sm">
        Submit Review
      </Button>
    </form>
  );
}

export function OrderDetails() {
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
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-primary text-2xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-secondary text-sm">Placed on {order.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
            {order.status}
          </span>
          <Link to={`/account/orders/${order.id}/receipt`}>
            <Button variant="outline" size="sm" icon={<Printer className="size-4" />}>
              Receipt
            </Button>
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-gray-300 p-6">
        <h2 className="text-gray-primary mb-5 text-base font-bold">Order Status</h2>
        <div className="flex flex-wrap gap-4 sm:flex-nowrap">
          {order.timeline.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                {step.done ? (
                  <CheckCircle2 className="text-success-dark-main size-6" />
                ) : (
                  <Circle className="text-gray-300 size-6" />
                )}
              </div>
              <div>
                <p className={cn("text-sm font-medium", step.done ? "text-gray-primary" : "text-gray-tertiary")}>
                  {step.label}
                </p>
                {step.date && <p className="text-gray-tertiary text-xs">{step.date}</p>}
              </div>
              {i < order.timeline.length - 1 && (
                <span className="bg-gray-200 hidden h-px flex-1 sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-gray-300 p-6">
        <h2 className="text-gray-primary mb-5 text-base font-bold">Items</h2>
        <div className="space-y-5">
          {order.items.map((item) => (
            <div key={item.product.id} className="border-b border-gray-200 pb-5 last:border-0 last:pb-0">
              <div className="flex gap-4">
                <div className="size-16 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={getImageSrc(item.product.image)}
                    alt={item.product.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    to={`/product-details-1?id=${item.product.id}`}
                    className="text-gray-primary hover:text-primary-main text-sm font-semibold"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-tertiary text-xs">Qty: {item.quantity}</p>
                  <p className="text-gray-primary text-sm font-bold">{formatCurrency(item.price)}</p>
                </div>
              </div>
              {order.status === "Delivered" && (
                <ReviewForm productId={item.product.id} orderId={order.id} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-300 p-6">
          <h2 className="text-gray-primary mb-3 text-base font-bold">Shipping Address</h2>
          {address ? (
            <div className="text-gray-secondary text-sm leading-relaxed">
              <p className="text-gray-primary font-medium">{address.fullName}</p>
              <p>{address.line1}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.phone}</p>
            </div>
          ) : (
            <p className="text-gray-tertiary text-sm">No address on file.</p>
          )}
        </div>
        <div className="rounded-2xl border border-gray-300 p-6">
          <h2 className="text-gray-primary mb-3 text-base font-bold">Payment Summary</h2>
          <div className="space-y-2 text-sm">
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
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
              <span className="text-gray-primary">Total</span>
              <span className="text-gray-primary">{formatCurrency(order.total)}</span>
            </div>
            <p className="text-gray-tertiary pt-1 text-xs">Paid via {order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
