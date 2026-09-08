import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAdmin } from "@/admin/context/AdminContext";
import type { Coupon, CouponType } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const emptyForm = {
  code: "",
  type: "Percentage" as CouponType,
  value: 10,
  usageLimit: 100,
  startDate: new Date().toISOString().slice(0, 10),
  expiryDate: new Date().toISOString().slice(0, 10),
  status: "Active" as Coupon["status"],
};

export function Coupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [toDelete, setToDelete] = useState<Coupon | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalOpen) {
      setForm(
        editing
          ? {
              code: editing.code,
              type: editing.type,
              value: editing.value,
              usageLimit: editing.usageLimit,
              startDate: editing.startDate,
              expiryDate: editing.expiryDate,
              status: editing.status,
            }
          : emptyForm,
      );
    }
  }, [modalOpen, editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateCoupon(editing.id, form);
    } else {
      addCoupon({ id: `cpn-${Date.now()}`, used: 0, ...form });
    }
    setModalOpen(false);
  }

  const columns: AdminTableColumn<Coupon>[] = [
    { header: "Code", render: (c) => <span className="text-gray-primary font-mono font-bold">{c.code}</span>, exportValue: (c) => c.code },
    { header: "Type", render: (c) => <span className="text-gray-secondary">{c.type}</span>, exportValue: (c) => c.type },
    {
      header: "Value",
      render: (c) => (
        <span className="text-gray-secondary">
          {c.type === "Percentage" ? `${c.value}%` : c.type === "Fixed Amount" ? `$${c.value}` : "—"}
        </span>
      ),
      exportValue: (c) => c.value,
    },
    {
      header: "Usage",
      render: (c) => (
        <div className="w-28">
          <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-primary-main h-full rounded-full"
              style={{ width: `${Math.min(100, (c.used / c.usageLimit) * 100)}%` }}
            />
          </div>
          <p className="text-gray-tertiary text-xs">{c.used} / {c.usageLimit}</p>
        </div>
      ),
      exportValue: (c) => `${c.used}/${c.usageLimit}`,
    },
    { header: "Expires", render: (c) => <span className="text-gray-tertiary text-xs">{c.expiryDate}</span>, exportValue: (c) => c.expiryDate },
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
        title="Coupons"
        subtitle={`${coupons.filter((c) => c.status === "Active").length} active coupons`}
        actions={
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Create Coupon
          </Button>
        }
      />

      <AdminTable
        data={coupons}
        keyField={(c) => c.id}
        searchText={(c) => c.code}
        searchPlaceholder="Search coupon codes..."
        exportFileName="coupons"
        exportTitle="Coupons"
        columns={columns}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClassName="max-w-md" title={editing ? "Edit Coupon" : "Create Coupon"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Coupon Code</label>
            <input
              required
              className={`${inputClass} font-mono uppercase`}
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Type</label>
              <select className={inputClass} value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CouponType }))}>
                <option>Percentage</option>
                <option>Fixed Amount</option>
                <option>Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Value</label>
              <input
                type="number"
                min={0}
                disabled={form.type === "Free Shipping"}
                className={`${inputClass} disabled:opacity-40`}
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Usage Limit</label>
            <input
              type="number"
              min={1}
              className={inputClass}
              value={form.usageLimit}
              onChange={(e) => setForm((f) => ({ ...f, usageLimit: Number(e.target.value) }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Start Date</label>
              <input
                type="date"
                className={inputClass}
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Expiry Date</label>
              <input
                type="date"
                className={inputClass}
                value={form.expiryDate}
                onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Coupon["status"] }))}
            >
              <option>Active</option>
              <option>Scheduled</option>
              <option>Disabled</option>
              <option>Expired</option>
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

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Delete coupon?">
        <p className="text-gray-secondary mb-5 text-sm">
          <span className="text-gray-primary font-mono font-medium">{toDelete?.code}</span> will be permanently removed.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={() => { if (toDelete) deleteCoupon(toDelete.id); setToDelete(null); }}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
