import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useAdmin } from "@/admin/context/AdminContext";
import { getImageSrc } from "@/lib/utils";
import type { Brand } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const emptyForm: { name: string; logo: string; status: "Active" | "Inactive" } = { name: "", logo: "images/placeholder.png", status: "Active" };

export function Brands() {
  const { brands, addBrand, updateBrand, deleteBrand } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [toDelete, setToDelete] = useState<Brand | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalOpen) {
      setForm(editing ? { name: editing.name, logo: editing.logo, status: editing.status } : emptyForm);
    }
  }, [modalOpen, editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateBrand(editing.id, form);
    } else {
      addBrand({ id: `brand-${Date.now()}`, productCount: 0, ...form });
    }
    setModalOpen(false);
  }

  const columns: AdminTableColumn<Brand>[] = [
    {
      header: "Brand",
      render: (b) => (
        <div className="flex items-center gap-3">
          <div className="size-11 shrink-0 overflow-hidden rounded-full border border-gray-200">
            <img src={getImageSrc(b.logo)} alt={b.name} className="size-full object-cover" />
          </div>
          <p className="text-gray-primary font-medium">{b.name}</p>
        </div>
      ),
      exportValue: (b) => b.name,
    },
    { header: "Products", render: (b) => <span className="text-gray-secondary">{b.productCount}</span>, exportValue: (b) => b.productCount },
    { header: "Status", render: (b) => <StatusBadge status={b.status} />, exportValue: (b) => b.status },
    {
      header: "",
      render: (b) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditing(b);
              setModalOpen(true);
            }}
            className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => setToDelete(b)}
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
        title="Brands"
        subtitle={`${brands.length} brands`}
        actions={
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Add Brand
          </Button>
        }
      />

      <AdminTable
        data={brands}
        keyField={(b) => b.id}
        searchText={(b) => b.name}
        searchPlaceholder="Search brands..."
        exportFileName="brands"
        exportTitle="Brands"
        columns={columns}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClassName="max-w-md" title={editing ? "Edit Brand" : "Add Brand"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploadField
            value={form.logo}
            onChange={(previewUrl) => setForm((f) => ({ ...f, logo: previewUrl }))}
            shape="circle"
            label="Upload Brand Logo"
          />
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Brand Name</label>
            <input required className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "Active" | "Inactive" }))}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
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

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Delete brand?">
        <p className="text-gray-secondary mb-5 text-sm">
          <span className="text-gray-primary font-medium">{toDelete?.name}</span> will be permanently removed.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={() => { if (toDelete) deleteBrand(toDelete.id); setToDelete(null); }}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
