import { History } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { useAdmin } from "@/admin/context/AdminContext";
import type { AuditLogEntry } from "@/types/admin";

export function AuditLog() {
  const { auditLog } = useAdmin();

  const columns: AdminTableColumn<AuditLogEntry>[] = [
    {
      header: "Action",
      render: (log) => (
        <div className="flex items-center gap-2">
          <span className="bg-primary-lighter text-primary-main flex size-8 shrink-0 items-center justify-center rounded-full">
            <History className="size-3.5" />
          </span>
          <div>
            <p className="text-gray-primary font-medium">{log.action}</p>
            <p className="text-gray-tertiary text-xs">{log.target}</p>
          </div>
        </div>
      ),
      exportValue: (log) => log.action,
    },
    { header: "Target", render: () => null, className: "hidden", exportValue: (log) => log.target },
    { header: "Actor", render: (log) => <span className="text-gray-secondary">{log.actor}</span>, exportValue: (log) => log.actor },
    { header: "IP Address", render: (log) => <span className="text-gray-tertiary font-mono text-xs">{log.ip}</span>, exportValue: (log) => log.ip },
    { header: "Timestamp", render: (log) => <span className="text-gray-tertiary text-xs">{log.timestamp}</span>, exportValue: (log) => log.timestamp },
  ];

  return (
    <div>
      <AdminPageHeader title="Audit Log" subtitle="A record of sensitive actions taken across the admin panel" />
      <AdminTable
        data={auditLog}
        keyField={(log) => log.id}
        searchText={(log) => `${log.action} ${log.actor} ${log.target}`}
        searchPlaceholder="Search audit log..."
        exportFileName="audit-log"
        exportTitle="Audit Log"
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}
