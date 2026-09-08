import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";
import { formatCurrency, cn } from "@/lib/utils";
import type { Transaction, TransactionStatus } from "@/types/admin";

const filters: Array<"All" | TransactionStatus> = ["All", "Success", "Pending", "Failed", "Refunded"];

export function Transactions() {
  const { transactions, refundTransaction } = useAdmin();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [toRefund, setToRefund] = useState<Transaction | null>(null);

  const filtered = filter === "All" ? transactions : transactions.filter((t) => t.status === filter);
  const totalSuccess = transactions.filter((t) => t.status === "Success").reduce((sum, t) => sum + t.amount, 0);

  const columns: AdminTableColumn<Transaction>[] = [
    { header: "Transaction", render: (t) => <span className="text-gray-primary font-medium">{t.id}</span>, exportValue: (t) => t.id },
    { header: "Order", render: (t) => <span className="text-gray-secondary">{t.orderId}</span>, exportValue: (t) => t.orderId },
    { header: "Customer", render: (t) => <span className="text-gray-secondary">{t.customer}</span>, exportValue: (t) => t.customer },
    { header: "Method", render: (t) => <span className="text-gray-tertiary text-xs">{t.method}</span>, exportValue: (t) => t.method },
    { header: "Amount", render: (t) => <span className="text-gray-primary font-bold">{formatCurrency(t.amount)}</span>, exportValue: (t) => t.amount },
    { header: "Date", render: (t) => <span className="text-gray-tertiary text-xs">{t.date}</span>, exportValue: (t) => t.date },
    { header: "Status", render: (t) => <StatusBadge status={t.status} />, exportValue: (t) => t.status },
    {
      header: "",
      render: (t) =>
        t.status === "Success" ? (
          <button
            onClick={() => setToRefund(t)}
            className="text-gray-tertiary hover:text-error-dark flex items-center gap-1 text-xs font-medium"
          >
            <RotateCcw className="size-3.5" /> Refund
          </button>
        ) : null,
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader title="Transactions" subtitle={`${formatCurrency(totalSuccess)} processed successfully`} />

      <AdminTable
        data={filtered}
        keyField={(t) => t.id}
        searchText={(t) => `${t.id} ${t.orderId} ${t.customer}`}
        searchPlaceholder="Search transactions..."
        exportFileName="transactions"
        exportTitle="Transactions"
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

      <Modal open={!!toRefund} onClose={() => setToRefund(null)} widthClassName="max-w-sm" title="Refund transaction?">
        <p className="text-gray-secondary mb-5 text-sm">
          Refund <span className="text-gray-primary font-medium">{toRefund && formatCurrency(toRefund.amount)}</span> to{" "}
          {toRefund?.customer}? This action cannot be undone.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToRefund(null)}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              if (toRefund) refundTransaction(toRefund.id);
              setToRefund(null);
            }}
          >
            Confirm Refund
          </Button>
        </div>
      </Modal>
    </div>
  );
}
