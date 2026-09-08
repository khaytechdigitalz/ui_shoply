import { cn } from "@/lib/utils";

const palette: Record<string, string> = {
  Active: "bg-success-light text-success-dark-main",
  Live: "bg-success-light text-success-dark-main",
  Delivered: "bg-success-light text-success-dark-main",
  Resolved: "bg-success-light text-success-dark-main",
  Approved: "bg-success-light text-success-dark-main",
  Success: "bg-success-light text-success-dark-main",
  Paid: "bg-success-light text-success-dark-main",

  Processing: "bg-warning-light text-warning-dark-main",
  Pending: "bg-warning-light text-warning-dark-main",
  Draft: "bg-warning-light text-warning-dark-main",
  Scheduled: "bg-warning-light text-warning-dark-main",
  "In Progress": "bg-warning-light text-warning-dark-main",
  Medium: "bg-warning-light text-warning-dark-main",

  Shipped: "bg-info-light text-info-dark",
  Open: "bg-info-light text-info-dark",
  Low: "bg-info-light text-info-dark",

  Cancelled: "bg-error-lighter text-error-dark",
  Rejected: "bg-error-lighter text-error-dark",
  Failed: "bg-error-lighter text-error-dark",
  Suspended: "bg-error-lighter text-error-dark",
  Blocked: "bg-error-lighter text-error-dark",
  Unpaid: "bg-error-lighter text-error-dark",
  High: "bg-error-lighter text-error-dark",
  Urgent: "bg-error-dark text-white",

  Inactive: "bg-gray-200 text-gray-secondary",
  Disabled: "bg-gray-200 text-gray-secondary",
  Closed: "bg-gray-200 text-gray-secondary",
  Expired: "bg-gray-200 text-gray-secondary",
  Ended: "bg-gray-200 text-gray-secondary",
  Refunded: "bg-secondary-lighter text-secondary-main",
  "Partially Refunded": "bg-secondary-lighter text-secondary-main",
  "Out of Stock": "bg-error-lighter text-error-dark",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        palette[status] ?? "bg-gray-200 text-gray-secondary",
      )}
    >
      {status}
    </span>
  );
}
