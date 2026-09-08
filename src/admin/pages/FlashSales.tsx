import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Zap } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAdmin } from "@/admin/context/AdminContext";
import { getImageSrc } from "@/lib/utils";
import type { FlashSale } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const emptyForm = {
  name: "",
  discountPercent: 20,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  status: "Scheduled" as FlashSale["status"],
  productIds: [] as string[],
};

export function FlashSales() {
  const { flashSales, products, addFlashSale, updateFlashSale, deleteFlashSale } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FlashSale | null>(null);
  const [toDelete, setToDelete] = useState<FlashSale | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalOpen) {
      setForm(
        editing
          ? {
              name: editing.name,
              discountPercent: editing.discountPercent,
              startDate: editing.startDate,
              endDate: editing.endDate,
              status: editing.status,
              productIds: editing.productIds,
            }
          : emptyForm,
      );
    }
  }, [modalOpen, editing]);

  function toggleProduct(id: string) {
    setForm((f) => ({
      ...f,
      productIds: f.productIds.includes(id) ? f.productIds.filter((p) => p !== id) : [...f.productIds, id],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateFlashSale(editing.id, form);
    } else {
      addFlashSale({ id: `fs-${Date.now()}`, ...form });
    }
    setModalOpen(false);
  }

  const columns: AdminTableColumn<FlashSale>[] = [
    {
      header: "Campaign",
      render: (f) => (
        <div className="flex items-center gap-2">
          <span className="bg-warning-light text-warning-dark-main flex size-8 items-center justify-center rounded-full">
            <Zap className="size-4" />
          </span>
          <p className="text-gray-primary font-medium">{f.name}</p>
        </div>
      ),
      exportValue: (f) => f.name,
    },
    { header: "Discount", render: (f) => <span className="text-error-dark font-bold">{f.discountPercent}% OFF</span>, exportValue: (f) => f.discountPercent },
    { header: "Products", render: (f) => <span className="text-gray-secondary">{f.productIds.length} products</span>, exportValue: (f) => f.productIds.length },
    { header: "Starts", render: (f) => <span className="text-gray-tertiary text-xs">{f.startDate}</span>, exportValue: (f) => f.startDate },
    { header: "Ends", render: (f) => <span className="text-gray-tertiary text-xs">{f.endDate}</span>, exportValue: (f) => f.endDate },
    { header: "Status", render: (f) => <StatusBadge status={f.status} />, exportValue: (f) => f.status },
    {
      header: "",
      render: (f) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditing(f);
              setModalOpen(true);
            }}
            className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => setToDelete(f)}
            className="text-gray-tertiary hover:text-error-dark flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
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
        title="Flash Sales"
        subtitle={`${flashSales.filter((f) => f.status === "Live").length} live campaigns`}
        actions={
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Create Flash Sale
          </Button>
        }
      />

      <AdminTable
        data={flashSales}
        keyField={(f) => f.id}
        searchText={(f) => f.name}
        searchPlaceholder="Search flash sales..."
        exportFileName="flash-sales"
        exportTitle="Flash Sales"
        columns={columns}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClassName="max-w-lg" title={editing ? "Edit Flash Sale" : "Create Flash Sale"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Campaign Name</label>
            <input required className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Discount %</label>
              <input
                type="number"
                min={1}
                max={90}
                className={inputClass}
                value={form.discountPercent}
                onChange={(e) => setForm((f) => ({ ...f, discountPercent: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Start</label>
              <input type="date" className={inputClass} value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">End</label>
              <input type="date" className={inputClass} value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Status</label>
            <select className={inputClass} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as FlashSale["status"] }))}>
              <option>Scheduled</option>
              <option>Live</option>
              <option>Ended</option>
            </select>
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">
              Products ({form.productIds.length} selected)
            </label>
            <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2">
              {products.slice(0, 20).map((p) => (
                <label key={p.id} className="hover:bg-gray-50 flex items-center gap-2 rounded-lg p-1.5 text-sm">
                  <input type="checkbox" className="accent-primary-main shrink-0" checked={form.productIds.includes(p.id)} onChange={() => toggleProduct(p.id)} />
                  <img src={getImageSrc(p.image)} alt={p.name} className="size-6 shrink-0 rounded object-cover" />
                  <span className="text-gray-secondary line-clamp-1 min-w-0">{p.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Save
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Delete flash sale?">
        <p className="text-gray-secondary mb-5 text-sm">
          <span className="text-gray-primary font-medium">{toDelete?.name}</span> will be permanently removed.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={() => { if (toDelete) deleteFlashSale(toDelete.id); setToDelete(null); }}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
