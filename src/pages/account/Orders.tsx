import { useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { orders } from "@/data/orders";
import { formatCurrency, getImageSrc, cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const statusColors: Record<OrderStatus, string> = {
  Delivered: "bg-success-light text-success-dark-main",
  Shipped: "bg-info-light text-info-dark",
  Processing: "bg-warning-light text-warning-dark-main",
  Cancelled: "bg-error-lighter text-error-dark",
};

const filters: Array<"All" | OrderStatus> = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export function Orders() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-gray-primary text-2xl font-bold">My Orders</h1>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "bg-primary-main text-success-light"
                  : "border-gray-tertiary/32 text-gray-secondary border",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-300 py-16 text-center">
          <Package className="text-gray-tertiary size-16" />
          <h2 className="text-gray-primary text-lg font-bold">No orders found</h2>
          <p className="text-gray-secondary text-sm">You don't have any {filter.toLowerCase()} orders yet.</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-2xl border border-gray-300 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-gray-primary text-sm font-bold">Order #{order.id}</p>
                  <p className="text-gray-tertiary text-xs">Placed on {order.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="mb-4 flex -space-x-3">
                {order.items.slice(0, 5).map((item, i) => (
                  <div
                    key={i}
                    className="size-12 shrink-0 overflow-hidden rounded-full border-2 border-white"
                  >
                    <img
                      src={`/${item.product.image}`}
                      alt={item.product.name}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
                <p className="text-gray-secondary text-sm">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""} ·{" "}
                  <span className="text-gray-primary font-bold">{formatCurrency(order.total)}</span>
                </p>
                <div className="flex gap-2">
                  <Link to={`/account/orders/${order.id}/receipt`}>
                    <Button variant="outline" size="sm">
                      Receipt
                    </Button>
                  </Link>
                  <Link to={`/account/orders/${order.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
