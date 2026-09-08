import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { useAdmin } from "@/admin/context/AdminContext";
import { getImageSrc, cn } from "@/lib/utils";
import type { AdminReview, ReviewStatus } from "@/types/admin";

const filters: Array<"All" | ReviewStatus> = ["All", "Pending", "Approved", "Rejected"];

export function ProductReviews() {
  const { reviews, setReviewStatus } = useAdmin();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = filter === "All" ? reviews : reviews.filter((r) => r.status === filter);

  const columns: AdminTableColumn<AdminReview>[] = [
    {
      header: "Product",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 overflow-hidden rounded-lg">
            <img src={getImageSrc(r.productImage)} alt={r.product} className="size-full object-cover" />
          </div>
          <p className="text-gray-primary line-clamp-1 font-medium">{r.product}</p>
        </div>
      ),
      exportValue: (r) => r.product,
    },
    { header: "Customer", render: (r) => <span className="text-gray-secondary">{r.customer}</span>, exportValue: (r) => r.customer },
    {
      header: "Rating",
      render: (r) => (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("size-3.5", i < r.rating ? "fill-warning-dark text-warning-dark" : "text-gray-300")} />
          ))}
        </div>
      ),
      exportValue: (r) => r.rating,
    },
    { header: "Comment", render: (r) => <p className="text-gray-secondary line-clamp-2 max-w-xs">{r.comment}</p>, exportValue: (r) => r.comment },
    { header: "Date", render: (r) => <span className="text-gray-tertiary text-xs">{r.date}</span>, exportValue: (r) => r.date },
    { header: "Status", render: (r) => <StatusBadge status={r.status} />, exportValue: (r) => r.status },
    {
      header: "",
      render: (r) =>
        r.status === "Pending" ? (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setReviewStatus(r.id, "Approved")}
              className="text-success-dark-main hover:bg-success-light/50 flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
              aria-label="Approve"
            >
              <Check className="size-3.5" />
            </button>
            <button
              onClick={() => setReviewStatus(r.id, "Rejected")}
              className="text-error-dark hover:bg-error-lighter/50 flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
              aria-label="Reject"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setReviewStatus(r.id, "Pending")}
            className="text-gray-tertiary text-right text-xs font-medium"
          >
            Reset
          </button>
        ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader title="Product Reviews" subtitle={`${reviews.filter((r) => r.status === "Pending").length} reviews awaiting moderation`} />

      <AdminTable
        data={filtered}
        keyField={(r) => r.id}
        searchText={(r) => `${r.product} ${r.customer}`}
        searchPlaceholder="Search reviews..."
        exportFileName="product-reviews"
        exportTitle="Product Reviews"
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
    </div>
  );
}
