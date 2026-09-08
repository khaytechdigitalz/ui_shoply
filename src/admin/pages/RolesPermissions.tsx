import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Users } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";
import { cn } from "@/lib/utils";

const ALL_PERMISSIONS = [
  { id: "catalog", label: "Manage Catalog (Products, Categories, Brands)" },
  { id: "orders", label: "Manage Orders" },
  { id: "orders.view", label: "View Orders (read-only)" },
  { id: "marketing", label: "Manage Marketing (Coupons, Flash Sales)" },
  { id: "customers.view", label: "View Customers" },
  { id: "tickets", label: "Manage Support Tickets" },
  { id: "reports", label: "View Reports" },
  { id: "reports.financial", label: "View Financial Reports" },
  { id: "transactions", label: "Manage Transactions & Refunds" },
  { id: "settings", label: "Manage System Settings" },
  { id: "access", label: "Manage Admin Users & Roles" },
];

export function RolesPermissions() {
  const { roles, updateRole } = useAdmin();
  const [activeRoleId, setActiveRoleId] = useState(roles[0]?.id);
  const activeRole = roles.find((r) => r.id === activeRoleId) ?? roles[0];

  function togglePermission(permId: string) {
    if (!activeRole || activeRole.permissions.includes("all")) return;
    const has = activeRole.permissions.includes(permId);
    updateRole(activeRole.id, {
      permissions: has ? activeRole.permissions.filter((p) => p !== permId) : [...activeRole.permissions, permId],
    });
  }

  return (
    <div>
      <AdminPageHeader title="Roles & Permissions" subtitle="Control what each role can see and do in the admin panel" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRoleId(role.id)}
              className={cn(
                "w-full rounded-2xl border p-4 text-left transition-colors",
                activeRole?.id === role.id ? "border-primary-main bg-primary-lighter/10" : "border-gray-300 bg-white",
              )}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <ShieldCheck className="text-primary-main size-4" />
                <p className="text-gray-primary text-sm font-bold">{role.name}</p>
              </div>
              <p className="text-gray-secondary mb-2 text-xs">{role.description}</p>
              <p className="text-gray-tertiary flex items-center gap-1 text-xs">
                <Users className="size-3" /> {role.usersCount} user{role.usersCount !== 1 ? "s" : ""}
              </p>
            </button>
          ))}
        </div>

        {activeRole && (
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-gray-primary text-lg font-bold">{activeRole.name} Permissions</h2>
                <p className="text-gray-secondary text-sm">{activeRole.description}</p>
              </div>
              {activeRole.permissions.includes("all") && (
                <span className="bg-primary-lighter text-primary-main rounded-full px-3 py-1 text-xs font-medium">
                  Full Access
                </span>
              )}
            </div>

            {activeRole.permissions.includes("all") ? (
              <p className="text-gray-tertiary rounded-xl bg-gray-50 p-4 text-sm">
                Super Admin has unrestricted access to every module and cannot be limited.
              </p>
            ) : (
              <div className="space-y-2">
                {ALL_PERMISSIONS.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                  >
                    <span className="text-gray-secondary text-sm">{perm.label}</span>
                    <input
                      type="checkbox"
                      className="accent-primary-main size-4"
                      checked={activeRole.permissions.includes(perm.id)}
                      onChange={() => togglePermission(perm.id)}
                    />
                  </label>
                ))}
              </div>
            )}

            <Button className="mt-6" onClick={() => toast.success(`${activeRole.name} permissions saved`)}>
              Save Permissions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
