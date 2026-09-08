import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAdmin } from "@/admin/context/AdminContext";
import { getImageSrc } from "@/lib/utils";
import type { AdminUser, AdminRole } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const roleOptions: AdminRole[] = ["Super Admin", "Store Manager", "Support Agent", "Content Editor", "Finance"];
const emptyForm = { name: "", email: "", role: "Support Agent" as AdminRole, status: "Active" as AdminUser["status"] };

export function AdminUsers() {
  const { users, addUser, updateUser, deleteUser } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [toDelete, setToDelete] = useState<AdminUser | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalOpen) {
      setForm(editing ? { name: editing.name, email: editing.email, role: editing.role, status: editing.status } : emptyForm);
    }
  }, [modalOpen, editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateUser(editing.id, form);
    } else {
      addUser({ id: `au-${Date.now()}`, avatar: "images/avatars/avatar-2.jpg", lastLogin: "Never", ...form });
    }
    setModalOpen(false);
  }

  const columns: AdminTableColumn<AdminUser>[] = [
    {
      header: "Admin",
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 overflow-hidden rounded-full">
            <img src={getImageSrc(u.avatar)} alt={u.name} className="size-full object-cover" />
          </div>
          <div>
            <p className="text-gray-primary font-medium">{u.name}</p>
            <p className="text-gray-tertiary text-xs">{u.email}</p>
          </div>
        </div>
      ),
      exportValue: (u) => u.name,
    },
    { header: "Email", render: () => null, className: "hidden", exportValue: (u) => u.email },
    { header: "Role", render: (u) => <span className="text-gray-secondary">{u.role}</span>, exportValue: (u) => u.role },
    { header: "Last Login", render: (u) => <span className="text-gray-tertiary text-xs">{u.lastLogin}</span>, exportValue: (u) => u.lastLogin },
    { header: "Status", render: (u) => <StatusBadge status={u.status} />, exportValue: (u) => u.status },
    {
      header: "",
      render: (u) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditing(u);
              setModalOpen(true);
            }}
            className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => setToDelete(u)}
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
        title="Admin Users"
        subtitle={`${users.length} team members with dashboard access`}
        actions={
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Invite Admin
          </Button>
        }
      />

      <AdminTable
        data={users}
        keyField={(u) => u.id}
        searchText={(u) => `${u.name} ${u.email}`}
        searchPlaceholder="Search admin users..."
        exportFileName="admin-users"
        exportTitle="Admin Users"
        columns={columns}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClassName="max-w-md" title={editing ? "Edit Admin User" : "Invite Admin User"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Full Name</label>
            <input required className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Email Address</label>
            <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Role</label>
            <select className={inputClass} value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as AdminRole }))}>
              {roleOptions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Status</label>
            <select className={inputClass} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AdminUser["status"] }))}>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              {editing ? "Save" : "Send Invite"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} widthClassName="max-w-sm" title="Remove admin user?">
        <p className="text-gray-secondary mb-5 text-sm">
          <span className="text-gray-primary font-medium">{toDelete?.name}</span> will lose access to the admin panel.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={() => { if (toDelete) deleteUser(toDelete.id); setToDelete(null); }}>
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
}
