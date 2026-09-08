import { Link } from "react-router-dom";
import { Package, Heart, MapPin, ArrowRight } from "lucide-react";
import { useStore } from "@/store/StoreContext";
import { orders } from "@/data/orders";
import { formatCurrency } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Delivered: "bg-success-light text-success-dark-main",
  Shipped: "bg-info-light text-info-dark",
  Processing: "bg-warning-light text-warning-dark-main",
  Cancelled: "bg-error-lighter text-error-dark",
};

export function Overview() {
  const { profile, wishlist, addresses } = useStore();
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-primary text-2xl font-bold">
          Welcome back, {profile.firstName}
        </h1>
        <p className="text-gray-secondary text-sm">
          Here's what's happening with your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-300 p-5">
          <span className="bg-primary-lighter text-primary-main mb-3 flex size-10 items-center justify-center rounded-full">
            <Package className="size-5" />
          </span>
          <p className="text-gray-primary text-xl font-bold">{orders.length}</p>
          <p className="text-gray-secondary text-sm">Total Orders</p>
        </div>
        <div className="rounded-2xl border border-gray-300 p-5">
          <span className="bg-error-lighter text-error-dark mb-3 flex size-10 items-center justify-center rounded-full">
            <Heart className="size-5" />
          </span>
          <p className="text-gray-primary text-xl font-bold">{wishlist.length}</p>
          <p className="text-gray-secondary text-sm">Wishlist Items</p>
        </div>
        <div className="rounded-2xl border border-gray-300 p-5">
          <span className="bg-info-light text-info-dark mb-3 flex size-10 items-center justify-center rounded-full">
            <MapPin className="size-5" />
          </span>
          <p className="text-gray-primary text-xl font-bold">{addresses.length}</p>
          <p className="text-gray-secondary text-sm">Saved Addresses</p>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-gray-primary text-lg font-bold">Recent Orders</h2>
          <Link to="/account/orders" className="text-primary-main flex items-center gap-1 text-sm font-medium">
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-300">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                {["Order", "Date", "Status", "Total", ""].map((h) => (
                  <th key={h} className="text-gray-secondary px-5 py-3 text-sm font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="text-gray-primary px-5 py-4 text-sm font-medium">#{order.id}</td>
                  <td className="text-gray-secondary px-5 py-4 text-sm">{order.date}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-gray-primary px-5 py-4 text-sm font-bold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-5 py-4">
                    <Link to={`/account/orders/${order.id}`} className="text-primary-main text-sm font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
