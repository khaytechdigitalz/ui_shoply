import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { StatCard } from "@/admin/components/StatCard";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency } from "@/lib/utils";
import { RotateCcw, Receipt, Percent } from "lucide-react";
import type { AdminOrder } from "@/types/admin";

const TAX_RATE = 0.075;

export function RefundTax() {
  const { orders } = useAdmin();

  const refundedOrders = orders.filter((o) => o.status === "Refunded");
  const totalRefunded = refundedOrders.reduce((sum, o) => sum + o.total, 0);
  const taxableRevenue = orders
    .filter((o) => o.status !== "Cancelled" && o.status !== "Refunded")
    .reduce((sum, o) => sum + o.total, 0);
  const totalTaxCollected = taxableRevenue * TAX_RATE;

  const columns: AdminTableColumn<AdminOrder>[] = [
    { header: "Order", render: (o) => <span className="text-gray-primary font-medium">{o.id}</span>, exportValue: (o) => o.id },
    { header: "Customer", render: (o) => <span className="text-gray-secondary">{o.customer}</span>, exportValue: (o) => o.customer },
    { header: "Date", render: (o) => <span className="text-gray-tertiary text-xs">{o.date}</span>, exportValue: (o) => o.date },
    { header: "Amount", render: (o) => <span className="text-gray-primary font-bold">{formatCurrency(o.total)}</span>, exportValue: (o) => o.total },
    { header: "Status", render: (o) => <StatusBadge status={o.status} />, exportValue: (o) => o.status },
  ];

  return (
    <div>
      <AdminPageHeader title="Refund & Tax Report" subtitle="Track refunded orders and estimated tax collected" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Refunded" value={formatCurrency(totalRefunded)} icon={<RotateCcw className="size-5" />} tone="error" />
        <StatCard label="Taxable Revenue" value={formatCurrency(taxableRevenue)} icon={<Receipt className="size-5" />} tone="primary" />
        <StatCard label={`Tax Collected (${(TAX_RATE * 100).toFixed(1)}%)`} value={formatCurrency(totalTaxCollected)} icon={<Percent className="size-5" />} tone="info" />
      </div>

      <div className="mb-3">
        <h2 className="text-gray-primary text-base font-bold">Refunded Orders</h2>
      </div>
      <AdminTable
        data={refundedOrders}
        keyField={(o) => o.id}
        searchText={(o) => `${o.id} ${o.customer}`}
        searchPlaceholder="Search refunded orders..."
        exportFileName="refunds"
        exportTitle="Refunded Orders"
        columns={columns}
      />
    </div>
  );
}
