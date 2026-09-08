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
import type { AdminCategory } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const emptyForm: { name: string; image: string; status: "Active" | "Inactive" } = { name: "", image: "images/placeholder.png", status: "Active" };

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [toDelete, setToDelete] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalOpen) {
      setForm(editing ? { name: editing.name, image: editing.image, status: editing.status } : emptyForm);
    }
  }, [modalOpen, editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateCategory(editing.id, form);
    } else {
      addCategory({
        id: `cat-${Date.now()}`,
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        productCount: 0,
        ...form,
      });
    }
    setModalOpen(false);
  }

  const columns: AdminTableColumn<AdminCategory>[] = [
    {
      header: "Category",
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="size-11 shrink-0 overflow-hidden rounded-lg">
            <img src={getImageSrc(c.image)} alt={c.name} className="size-full object-cover" />
          </div>
          <div>
            <p className="text-gray-primary font-medium">{c.name}</p>
            <p className="text-gray-tertiary text-xs">/{c.slug}</p>
          </div>
        </div>
      ),
      exportValue: (c) => c.name,
    },
    { header: "Slug", render: () => null, className: "hidden", exportValue: (c) => c.slug },
    { header: "Products", render: (c) => <span className="text-gray-secondary">{c.productCount}</span>, exportValue: (c) => c.productCount },
    { header: "Status", render: (c) => <StatusBadge status={c.status} />, exportValue: (c) => c.status },
    {
      header: "",
      render: (c) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditing(c);
              setModalOpen(true);
            }}
            className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => setToDelete(c)}
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
        title="Categories"
        subtitle={`${categories.length} categories`}
        actions={
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Add Category
          </Button>
        }
      />

      <AdminTable
        data={categories}
        keyField={(c) => c.id}
        searchText={(c) => c.name}
        searchPlaceholder="Search categories..."
        exportFileName="categories"
        exportTitle="Categories"
        columns={columns}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClassName="max-w-md" title={editing ? "Edit Category" : "Add Category"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploadField
            value={form.image}
            onChange={(previewUrl) => setForm((f) => ({ ...f, image: previewUrl }))}
            label="Upload Category Image"
          />
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Category Name</label>
            <input
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
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

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Delete category?">
        <p className="text-gray-secondary mb-5 text-sm">
          <span className="text-gray-primary font-medium">{toDelete?.name}</span> will be permanently removed.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              if (toDelete) deleteCategory(toDelete.id);
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
