import { Mail } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatCard } from "@/admin/components/StatCard";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, DollarSign, Send } from "lucide-react";
import type { AbandonedCart } from "@/types/admin";

export function AbandonedCarts() {
  const { abandonedCarts, sendCartReminder } = useAdmin();
  const totalValue = abandonedCarts.reduce((sum, c) => sum + c.value, 0);

  const columns: AdminTableColumn<AbandonedCart>[] = [
    {
      header: "Customer",
      render: (c) => (
        <div>
          <p className="text-gray-primary font-medium">{c.customer}</p>
          <p className="text-gray-tertiary text-xs">{c.email}</p>
        </div>
      ),
      exportValue: (c) => c.customer,
    },
    { header: "Email", render: () => null, className: "hidden", exportValue: (c) => c.email },
    { header: "Items", render: (c) => <span className="text-gray-secondary">{c.itemCount}</span>, exportValue: (c) => c.itemCount },
    { header: "Cart Value", render: (c) => <span className="text-gray-primary font-bold">{formatCurrency(c.value)}</span>, exportValue: (c) => c.value },
    { header: "Last Active", render: (c) => <span className="text-gray-tertiary text-xs">{c.lastActive}</span>, exportValue: (c) => c.lastActive },
    {
      header: "Reminders Sent",
      render: (c) => <span className="text-gray-secondary">{c.remindersSent}</span>,
      exportValue: (c) => c.remindersSent,
    },
    {
      header: "",
      render: (c) => (
        <Button size="sm" variant="outline" icon={<Send className="size-3.5" />} onClick={() => sendCartReminder(c.id)}>
          Send Reminder
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader title="Abandoned Carts" subtitle="Recover lost sales by re-engaging shoppers who didn't check out" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Abandoned Carts" value={String(abandonedCarts.length)} icon={<ShoppingCart className="size-5" />} tone="warning" />
        <StatCard label="Potential Revenue" value={formatCurrency(totalValue)} icon={<DollarSign className="size-5" />} tone="error" />
        <StatCard label="Reminders Sent" value={String(abandonedCarts.reduce((sum, c) => sum + c.remindersSent, 0))} icon={<Mail className="size-5" />} tone="info" />
      </div>

      <AdminTable
        data={abandonedCarts}
        keyField={(c) => c.id}
        searchText={(c) => `${c.customer} ${c.email}`}
        searchPlaceholder="Search abandoned carts..."
        exportFileName="abandoned-carts"
        exportTitle="Abandoned Carts"
        columns={columns}
      />
    </div>
  );
}
