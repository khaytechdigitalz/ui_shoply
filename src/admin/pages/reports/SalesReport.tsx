import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { DollarSign, ShoppingBag, TrendingUp, Percent } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { StatCard } from "@/admin/components/StatCard";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency } from "@/lib/utils";

const monthlyRevenue = [
  { month: "Sep", revenue: 18200, orders: 210 },
  { month: "Oct", revenue: 21400, orders: 245 },
  { month: "Nov", revenue: 26800, orders: 298 },
  { month: "Dec", revenue: 34200, orders: 356 },
  { month: "Jan", revenue: 29800, orders: 312 },
  { month: "Feb", revenue: 31500, orders: 328 },
  { month: "Mar", revenue: 24100, orders: 260 },
];

export function SalesReport() {
  const { orders } = useAdmin();

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0), [orders]);
  const avgOrderValue = totalRevenue / (orders.length || 1);
  const conversionRate = 3.8;

  return (
    <div>
      <AdminPageHeader title="Sales Report" subtitle="Revenue and order trends across your storefront" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={<DollarSign className="size-5" />} change={{ value: "12.4%", direction: "up" }} tone="success" />
        <StatCard label="Total Orders" value={String(orders.length)} icon={<ShoppingBag className="size-5" />} change={{ value: "8.1%", direction: "up" }} tone="primary" />
        <StatCard label="Avg. Order Value" value={formatCurrency(avgOrderValue)} icon={<TrendingUp className="size-5" />} change={{ value: "1.9%", direction: "up" }} tone="info" />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} icon={<Percent className="size-5" />} change={{ value: "0.4%", direction: "down" }} tone="warning" />
      </div>

      <div className="mb-6 rounded-2xl border border-gray-300 bg-white p-5">
        <h2 className="text-gray-primary mb-4 text-base font-bold">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f2" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip formatter={(v: unknown) => formatCurrency(Number(Array.isArray(v) ? v[0] : (v ?? 0)))} />
            <Bar dataKey="revenue" fill="#04535c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-gray-300 bg-white p-5">
        <h2 className="text-gray-primary mb-4 text-base font-bold">Order Volume</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f2" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#3366ff" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
