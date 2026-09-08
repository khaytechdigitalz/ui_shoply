import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency, getImageSrc } from "@/lib/utils";

export function GrossingProducts() {
  const { products, orders } = useAdmin();

  const revenueByProduct = new Map<string, number>();
  const unitsByProduct = new Map<string, number>();
  orders.forEach((o) =>
    o.items.forEach((item) => {
      const product = products.find((p) => p.name === item.name);
      if (!product) return;
      revenueByProduct.set(product.id, (revenueByProduct.get(product.id) ?? 0) + item.price * item.quantity);
      unitsByProduct.set(product.id, (unitsByProduct.get(product.id) ?? 0) + item.quantity);
    }),
  );

  const ranked = [...products]
    .map((p) => ({ product: p, revenue: revenueByProduct.get(p.id) ?? 0, units: unitsByProduct.get(p.id) ?? 0 }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 15);

  const chartData = ranked.slice(0, 8).map((r) => ({ name: r.product.name.slice(0, 14), revenue: r.revenue }));

  const columns: AdminTableColumn<(typeof ranked)[number]>[] = [
    {
      header: "Product",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 overflow-hidden rounded-lg">
            <img src={getImageSrc(r.product.image)} alt={r.product.name} className="size-full object-cover" />
          </div>
          <p className="text-gray-primary line-clamp-1 font-medium">{r.product.name}</p>
        </div>
      ),
      exportValue: (r) => r.product.name,
    },
    { header: "Category", render: (r) => <span className="text-gray-secondary">{r.product.category}</span>, exportValue: (r) => r.product.category },
    { header: "Units Sold", render: (r) => <span className="text-gray-secondary">{r.units}</span>, exportValue: (r) => r.units },
    { header: "Revenue", render: (r) => <span className="text-gray-primary font-bold">{formatCurrency(r.revenue)}</span>, exportValue: (r) => r.revenue },
  ];

  return (
    <div>
      <AdminPageHeader title="Grossing Products" subtitle="Your top revenue-generating products" />

      <div className="mb-6 rounded-2xl border border-gray-300 bg-white p-5">
        <h2 className="text-gray-primary mb-4 text-base font-bold">Top 8 by Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef0f2" />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={12} width={110} />
            <Tooltip formatter={(v: unknown) => formatCurrency(Number(Array.isArray(v) ? v[0] : (v ?? 0)))} />
            <Bar dataKey="revenue" fill="#57cec7" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <AdminTable
        data={ranked}
        keyField={(r) => r.product.id}
        columns={columns}
        pageSize={10}
        exportFileName="grossing-products"
        exportTitle="Grossing Products"
      />
    </div>
  );
}
