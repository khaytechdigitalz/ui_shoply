import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAdmin } from "@/admin/context/AdminContext";
import type { Attribute, AttributeType } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const emptyForm = { name: "", type: "Select" as AttributeType, values: [] as string[] };

export function Attributes() {
  const { attributes, addAttribute, updateAttribute, deleteAttribute } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Attribute | null>(null);
  const [toDelete, setToDelete] = useState<Attribute | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    if (modalOpen) {
      setForm(editing ? { name: editing.name, type: editing.type, values: editing.values } : emptyForm);
      setValueInput("");
    }
  }, [modalOpen, editing]);

  function addValue() {
    if (valueInput.trim() && !form.values.includes(valueInput.trim())) {
      setForm((f) => ({ ...f, values: [...f.values, valueInput.trim()] }));
      setValueInput("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateAttribute(editing.id, form);
    } else {
      addAttribute({ id: `attr-${Date.now()}`, usedByCount: 0, ...form });
    }
    setModalOpen(false);
  }

  const columns: AdminTableColumn<Attribute>[] = [
    { header: "Attribute", render: (a) => <p className="text-gray-primary font-medium">{a.name}</p>, exportValue: (a) => a.name },
    { header: "Type", render: (a) => <span className="text-gray-secondary">{a.type}</span>, exportValue: (a) => a.type },
    {
      header: "Values",
      render: (a) => (
        <div className="flex flex-wrap gap-1.5">
          {a.values.slice(0, 4).map((v) => (
            <span key={v} className="bg-gray-100 text-gray-secondary rounded-full px-2.5 py-0.5 text-xs">
              {v}
            </span>
          ))}
          {a.values.length > 4 && <span className="text-gray-tertiary text-xs">+{a.values.length - 4} more</span>}
        </div>
      ),
      exportValue: (a) => a.values.join(", "),
    },
    { header: "Used By", render: (a) => <span className="text-gray-secondary">{a.usedByCount} products</span>, exportValue: (a) => a.usedByCount },
    {
      header: "",
      render: (a) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditing(a);
              setModalOpen(true);
            }}
            className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => setToDelete(a)}
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
        title="Attributes"
        subtitle="Define reusable product attributes like Color, Size, or Flavor"
        actions={
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Add Attribute
          </Button>
        }
      />

      <AdminTable
        data={attributes}
        keyField={(a) => a.id}
        searchText={(a) => a.name}
        searchPlaceholder="Search attributes..."
        exportFileName="attributes"
        exportTitle="Attributes"
        columns={columns}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClassName="max-w-md" title={editing ? "Edit Attribute" : "Add Attribute"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Attribute Name</label>
            <input required className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Type</label>
            <select
              className={inputClass}
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as AttributeType }))}
            >
              <option>Select</option>
              <option>Color</option>
              <option>Text</option>
            </select>
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Values</label>
            <div className="mb-2 flex gap-2">
              <input
                className={`${inputClass} min-w-0 flex-1`}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addValue();
                  }
                }}
                placeholder="e.g. Red"
              />
              <Button type="button" variant="outline" className="shrink-0" onClick={addValue}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.values.map((v) => (
                <span key={v} className="bg-gray-100 text-gray-secondary flex items-center gap-1 rounded-full px-2.5 py-1 text-xs">
                  {v}
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, values: f.values.filter((val) => val !== v) }))}
                  >
                    <X className="size-3" />
                  </button>
                </span>
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

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Delete attribute?">
        <p className="text-gray-secondary mb-5 text-sm">
          <span className="text-gray-primary font-medium">{toDelete?.name}</span> will be permanently removed.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={() => { if (toDelete) deleteAttribute(toDelete.id); setToDelete(null); }}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
