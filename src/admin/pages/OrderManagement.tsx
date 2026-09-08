import { useState } from "react";
import { Eye } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Drawer } from "@/components/ui/Drawer";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency, getImageSrc, cn } from "@/lib/utils";
import type { AdminOrder, AdminOrderStatus } from "@/types/admin";

const filters: Array<"All" | AdminOrderStatus> = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];
const statusOptions: AdminOrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];

export function OrderManagement() {
  const { orders, updateOrderStatus } = useAdmin();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const columns: AdminTableColumn<AdminOrder>[] = [
    { header: "Order", render: (o) => <span className="text-gray-primary font-medium">{o.id}</span>, exportValue: (o) => o.id },
    {
      header: "Customer",
      render: (o) => (
        <div>
          <p className="text-gray-primary">{o.customer}</p>
          <p className="text-gray-tertiary text-xs">{o.email}</p>
        </div>
      ),
      exportValue: (o) => o.customer,
    },
    { header: "Email", render: () => null, className: "hidden", exportValue: (o) => o.email },
    { header: "Vendor", render: (o) => <span className="text-gray-secondary">{o.vendor}</span>, exportValue: (o) => o.vendor },
    { header: "Date", render: (o) => <span className="text-gray-tertiary text-xs">{o.date}</span>, exportValue: (o) => o.date },
    { header: "Payment", render: (o) => <StatusBadge status={o.paymentStatus} />, exportValue: (o) => o.paymentStatus },
    { header: "Total", render: (o) => <span className="text-gray-primary font-bold">{formatCurrency(o.total)}</span>, exportValue: (o) => o.total },
    {
      header: "Status",
      render: (o) => (
        <select
          value={o.status}
          onChange={(e) => updateOrderStatus(o.id, e.target.value as AdminOrderStatus)}
          className="border-gray-tertiary/32 rounded-full border bg-white px-2.5 py-1 text-xs font-medium focus:outline-0"
        >
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      ),
      exportValue: (o) => o.status,
    },
    {
      header: "",
      render: (o) => (
        <button
          onClick={() => setSelected(o)}
          className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
        >
          <Eye className="size-3.5" />
        </button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader title="Order Management" subtitle={`${orders.length} orders across all vendors`} />

      <AdminTable
        data={filtered}
        keyField={(o) => o.id}
        searchText={(o) => `${o.id} ${o.customer} ${o.vendor}`}
        searchPlaceholder="Search orders..."
        exportFileName="orders"
        exportTitle="Orders"
        columns={columns}
        toolbar={
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  filter === f ? "bg-primary-main text-success-light" : "border-gray-tertiary/32 text-gray-secondary border",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected ? `Order ${selected.id}` : ""}>
        {selected && (
          <div className="space-y-6 p-5">
            <div className="flex items-center justify-between">
              <StatusBadge status={selected.status} />
              <StatusBadge status={selected.paymentStatus} />
            </div>
            <div>
              <p className="text-gray-tertiary text-xs font-medium uppercase">Customer</p>
              <p className="text-gray-primary text-sm font-medium">{selected.customer}</p>
              <p className="text-gray-secondary text-sm">{selected.email}</p>
            </div>
            <div>
              <p className="text-gray-tertiary text-xs font-medium uppercase">Shipping Address</p>
              <p className="text-gray-secondary text-sm">{selected.address}</p>
            </div>
            <div>
              <p className="text-gray-tertiary mb-2 text-xs font-medium uppercase">Items</p>
              <div className="space-y-3">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg">
                      <img src={getImageSrc(item.image)} alt={item.name} className="size-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-primary line-clamp-1 text-sm font-medium">{item.name}</p>
                      <p className="text-gray-tertiary text-xs">Qty {item.quantity}</p>
                    </div>
                    <p className="text-gray-primary text-sm font-bold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
              <span className="text-gray-primary">Total</span>
              <span className="text-gray-primary">{formatCurrency(selected.total)}</span>
            </div>
            <p className="text-gray-tertiary text-xs">Paid via {selected.paymentMethod}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
