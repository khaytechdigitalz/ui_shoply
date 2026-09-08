import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Wallet, TrendingUp, Percent } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { StatCard } from "@/admin/components/StatCard";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#04535c", "#57cec7", "#3366ff", "#ffc107", "#ff4842"];
const COMMISSION_RATE = 0.12;

export function Earnings() {
  const { orders } = useAdmin();

  const vendorTotals = new Map<string, number>();
  orders.forEach((o) => {
    if (o.status === "Cancelled") return;
    vendorTotals.set(o.vendor, (vendorTotals.get(o.vendor) ?? 0) + o.total);
  });

  const vendorRows = [...vendorTotals.entries()]
    .map(([vendor, gross]) => ({
      vendor,
      gross,
      commission: Number((gross * COMMISSION_RATE).toFixed(2)),
      payout: Number((gross * (1 - COMMISSION_RATE)).toFixed(2)),
    }))
    .sort((a, b) => b.gross - a.gross);

  const totalGross = vendorRows.reduce((sum, v) => sum + v.gross, 0);
  const totalCommission = vendorRows.reduce((sum, v) => sum + v.commission, 0);
  const totalPayout = totalGross - totalCommission;

  const columns: AdminTableColumn<(typeof vendorRows)[number]>[] = [
    { header: "Vendor", render: (v) => <span className="text-gray-primary font-medium">{v.vendor}</span>, exportValue: (v) => v.vendor },
    { header: "Gross Sales", render: (v) => <span className="text-gray-secondary">{formatCurrency(v.gross)}</span>, exportValue: (v) => v.gross },
    { header: "Platform Commission (12%)", render: (v) => <span className="text-error-dark">-{formatCurrency(v.commission)}</span>, exportValue: (v) => v.commission },
    { header: "Net Payout", render: (v) => <span className="text-success-dark-main font-bold">{formatCurrency(v.payout)}</span>, exportValue: (v) => v.payout },
  ];

  return (
    <div>
      <AdminPageHeader title="Earnings" subtitle="Platform revenue and vendor payout breakdown" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Gross Marketplace Sales" value={formatCurrency(totalGross)} icon={<TrendingUp className="size-5" />} tone="primary" />
        <StatCard label="Platform Commission" value={formatCurrency(totalCommission)} icon={<Percent className="size-5" />} tone="success" />
        <StatCard label="Vendor Payouts Due" value={formatCurrency(totalPayout)} icon={<Wallet className="size-5" />} tone="info" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-300 bg-white p-5 xl:col-span-2">
          <h2 className="text-gray-primary mb-4 text-base font-bold">Vendor Payouts</h2>
          <AdminTable
            data={vendorRows}
            keyField={(v) => v.vendor}
            columns={columns}
            pageSize={6}
            exportFileName="earnings"
            exportTitle="Vendor Earnings"
          />
        </div>
        <div className="rounded-2xl border border-gray-300 bg-white p-5">
          <h2 className="text-gray-primary mb-4 text-base font-bold">Sales by Vendor</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={vendorRows} dataKey="gross" nameKey="vendor" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {vendorRows.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: unknown) => formatCurrency(Number(Array.isArray(v) ? v[0] : (v ?? 0)))} />
              <Legend verticalAlign="bottom" height={48} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
