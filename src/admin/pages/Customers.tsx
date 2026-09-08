import { Ban, CheckCircle2 } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency, getImageSrc } from "@/lib/utils";
import type { AdminCustomer } from "@/types/admin";

export function Customers() {
  const { customers, toggleCustomerStatus } = useAdmin();

  const columns: AdminTableColumn<AdminCustomer>[] = [
    {
      header: "Customer",
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 overflow-hidden rounded-full">
            <img src={getImageSrc(c.avatar)} alt={c.name} className="size-full object-cover" />
          </div>
          <div>
            <p className="text-gray-primary font-medium">{c.name}</p>
            <p className="text-gray-tertiary text-xs">{c.email}</p>
          </div>
        </div>
      ),
      exportValue: (c) => c.name,
    },
    { header: "Email", render: () => null, className: "hidden", exportValue: (c) => c.email },
    { header: "Phone", render: (c) => <span className="text-gray-secondary">{c.phone}</span>, exportValue: (c) => c.phone },
    { header: "Joined", render: (c) => <span className="text-gray-tertiary text-xs">{c.joined}</span>, exportValue: (c) => c.joined },
    { header: "Orders", render: (c) => <span className="text-gray-secondary">{c.ordersCount}</span>, exportValue: (c) => c.ordersCount },
    { header: "Total Spent", render: (c) => <span className="text-gray-primary font-bold">{formatCurrency(c.totalSpent)}</span>, exportValue: (c) => c.totalSpent },
    { header: "Status", render: (c) => <StatusBadge status={c.status} />, exportValue: (c) => c.status },
    {
      header: "",
      render: (c) => (
        <button
          onClick={() => toggleCustomerStatus(c.id)}
          className={`flex items-center gap-1.5 text-xs font-medium ${
            c.status === "Active" ? "text-error-dark" : "text-success-dark-main"
          }`}
        >
          {c.status === "Active" ? (
            <>
              <Ban className="size-3.5" /> Block
            </>
          ) : (
            <>
              <CheckCircle2 className="size-3.5" /> Unblock
            </>
          )}
        </button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader title="Customers" subtitle={`${customers.length} registered customers`} />
      <AdminTable
        data={customers}
        keyField={(c) => c.id}
        searchText={(c) => `${c.name} ${c.email}`}
        searchPlaceholder="Search customers..."
        exportFileName="customers"
        exportTitle="Customers"
        columns={columns}
      />
    </div>
  );
}
