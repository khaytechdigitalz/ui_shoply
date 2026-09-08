import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAdmin } from "@/admin/context/AdminContext";
import { getImageSrc, formatCurrency, cn } from "@/lib/utils";
import type { AdminProduct, AdminProductStatus } from "@/types/admin";

const statusFilters: Array<"All" | AdminProductStatus> = ["All", "Active", "Draft", "Out of Stock"];

export function AllProducts() {
  const { products, deleteProduct } = useAdmin();
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All");
  const [toDelete, setToDelete] = useState<AdminProduct | null>(null);

  const filtered = status === "All" ? products : products.filter((p) => p.status === status);

  const columns: AdminTableColumn<AdminProduct>[] = [
    {
      header: "Product",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="size-11 shrink-0 overflow-hidden rounded-lg">
            <img src={getImageSrc(p.image)} alt={p.name} className="size-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-gray-primary line-clamp-1 font-medium">{p.name}</p>
            <p className="text-gray-tertiary text-xs">{p.sku}</p>
          </div>
        </div>
      ),
      exportValue: (p) => p.name,
    },
    { header: "SKU", render: () => null, className: "hidden", exportValue: (p) => p.sku },
    { header: "Category", render: (p) => <span className="text-gray-secondary">{p.category}</span>, exportValue: (p) => p.category },
    { header: "Brand", render: (p) => <span className="text-gray-secondary">{p.brand}</span>, exportValue: (p) => p.brand },
    {
      header: "Price",
      render: (p) => (
        <div>
          <span className="text-gray-primary font-medium">{formatCurrency(p.price)}</span>
          {p.oldPrice && (
            <span className="text-gray-tertiary ml-1.5 text-xs line-through">{formatCurrency(p.oldPrice)}</span>
          )}
        </div>
      ),
      exportValue: (p) => p.price,
    },
    {
      header: "Stock",
      render: (p) => (
        <span className={cn("font-medium", p.stock === 0 ? "text-error-dark" : "text-gray-secondary")}>
          {p.stock}
        </span>
      ),
      exportValue: (p) => p.stock,
    },
    {
      header: "Rating",
      render: (p) => (
        <span className="text-gray-secondary flex items-center gap-1">
          <Star className="fill-warning-dark text-warning-dark size-3.5" /> {p.rating.toFixed(1)}
        </span>
      ),
      exportValue: (p) => p.rating,
    },
    { header: "Status", render: (p) => <StatusBadge status={p.status} />, exportValue: (p) => p.status },
    {
      header: "",
      render: (p) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/admin/products/create?id=${p.id}`}
            className="text-gray-tertiary hover:text-primary-main flex size-8 items-center justify-center rounded-lg border border-gray-200"
            aria-label="Edit product"
          >
            <Pencil className="size-3.5" />
          </Link>
          <button
            onClick={() => setToDelete(p)}
            className="text-gray-tertiary hover:text-error-dark flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
            aria-label="Delete product"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="All Products"
        subtitle={`${products.length} products in your catalog`}
        actions={
          <Link to="/admin/products/create">
            <Button icon={<Plus className="size-4" />}>Add Product</Button>
          </Link>
        }
      />

      <AdminTable
        data={filtered}
        keyField={(p) => p.id}
        searchText={(p) => `${p.name} ${p.sku} ${p.category} ${p.brand}`}
        searchPlaceholder="Search products..."
        exportFileName="products"
        exportTitle="Products"
        columns={columns}
        toolbar={
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  status === s ? "bg-primary-main text-success-light" : "border-gray-tertiary/32 text-gray-secondary border",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        }
      />

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Delete product?">
        <p className="text-gray-secondary mb-5 text-sm">
          This will permanently remove <span className="text-gray-primary font-medium">{toDelete?.name}</span> from
          your catalog.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              if (toDelete) deleteProduct(toDelete.id);
              setToDelete(null);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
