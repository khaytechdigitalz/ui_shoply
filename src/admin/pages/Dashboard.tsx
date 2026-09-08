import { Link } from "react-router-dom";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { StatCard } from "@/admin/components/StatCard";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency, getImageSrc } from "@/lib/utils";

const revenueTrend = [
  { day: "Mon", revenue: 2100 },
  { day: "Tue", revenue: 2850 },
  { day: "Wed", revenue: 2400 },
  { day: "Thu", revenue: 3200 },
  { day: "Fri", revenue: 3900 },
  { day: "Sat", revenue: 4600 },
  { day: "Sun", revenue: 3700 },
];

const COLORS = ["#04535c", "#57cec7", "#ffc107", "#3366ff", "#ff4842"];

export function Dashboard() {
  const { orders, products, customers, transactions } = useAdmin();

  const totalRevenue = transactions
    .filter((t) => t.status === "Success")
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;

  const categoryBreakdown = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const recentOrders = orders.slice(0, 6);
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Here's what's happening across your store today."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarSign className="size-5" />}
          change={{ value: "12.4%", direction: "up" }}
          tone="success"
        />
        <StatCard
          label="Total Orders"
          value={String(orders.length)}
          icon={<ShoppingBag className="size-5" />}
          change={{ value: "8.1%", direction: "up" }}
          tone="primary"
        />
        <StatCard
          label="Active Customers"
          value={String(customers.filter((c) => c.status === "Active").length)}
          icon={<Users className="size-5" />}
          change={{ value: "3.2%", direction: "up" }}
          tone="info"
        />
        <StatCard
          label="Pending Fulfillment"
          value={String(pendingOrders)}
          icon={<Package className="size-5" />}
          change={{ value: "2.5%", direction: "down" }}
          tone="warning"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-300 bg-white p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-gray-primary text-base font-bold">Revenue This Week</h2>
            <Link to="/admin/reports/sales" className="text-primary-main text-sm font-medium">
              View Report
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#04535c" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#04535c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f2" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v: unknown) => formatCurrency(Number(Array.isArray(v) ? v[0] : (v ?? 0)))} />
              <Area type="monotone" dataKey="revenue" stroke="#04535c" strokeWidth={2} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-5">
          <h2 className="text-gray-primary mb-4 text-base font-bold">Products by Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {categoryBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-300 bg-white p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-gray-primary text-base font-bold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary-main flex items-center gap-1 text-sm font-medium">
              View All <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="text-gray-tertiary text-xs">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100">
                    <td className="text-gray-primary py-2.5 text-sm font-medium">{order.id}</td>
                    <td className="text-gray-secondary py-2.5 text-sm">{order.customer}</td>
                    <td className="py-2.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="text-gray-primary py-2.5 text-right text-sm font-bold">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-gray-primary text-base font-bold">Top Products</h2>
            <Link to="/admin/reports/grossing-products" className="text-primary-main text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="size-10 shrink-0 overflow-hidden rounded-lg">
                  <img src={getImageSrc(p.image)} alt={p.name} className="size-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-primary truncate text-sm font-medium">{p.name}</p>
                  <p className="text-gray-tertiary text-xs">{p.reviewCount} reviews</p>
                </div>
                <p className="text-gray-primary text-sm font-bold">{formatCurrency(p.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
