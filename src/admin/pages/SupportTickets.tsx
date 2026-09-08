import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { AdminTable, type AdminTableColumn } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";
import { cn } from "@/lib/utils";
import type { SupportTicket, TicketStatus } from "@/types/admin";

const filters: Array<"All" | TicketStatus> = ["All", "Open", "In Progress", "Resolved", "Closed"];

export function SupportTickets() {
  const { tickets, updateTicketStatus, replyToTicket } = useAdmin();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [reply, setReply] = useState("");

  const filtered = filter === "All" ? tickets : tickets.filter((t) => t.status === filter);
  const activeTicket = tickets.find((t) => t.id === selected?.id) ?? null;

  const columns: AdminTableColumn<SupportTicket>[] = [
    { header: "Ticket", render: (t) => <span className="text-gray-primary font-medium">{t.id}</span>, exportValue: (t) => t.id },
    { header: "Subject", render: (t) => <p className="text-gray-secondary line-clamp-1 max-w-xs">{t.subject}</p>, exportValue: (t) => t.subject },
    { header: "Customer", render: (t) => <span className="text-gray-secondary">{t.customer}</span>, exportValue: (t) => t.customer },
    { header: "Category", render: (t) => <span className="text-gray-tertiary text-xs">{t.category}</span>, exportValue: (t) => t.category },
    { header: "Priority", render: (t) => <StatusBadge status={t.priority} />, exportValue: (t) => t.priority },
    { header: "Status", render: (t) => <StatusBadge status={t.status} />, exportValue: (t) => t.status },
    { header: "Updated", render: (t) => <span className="text-gray-tertiary text-xs">{t.updatedAt}</span>, exportValue: (t) => t.updatedAt },
    {
      header: "",
      render: (t) => (
        <button
          onClick={() => setSelected(t)}
          className="text-gray-tertiary hover:text-primary-main flex size-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200"
        >
          <MessageSquare className="size-3.5" />
        </button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div>
      <AdminPageHeader title="Support Tickets" subtitle={`${tickets.filter((t) => t.status === "Open").length} open tickets`} />

      <AdminTable
        data={filtered}
        keyField={(t) => t.id}
        searchText={(t) => `${t.id} ${t.subject} ${t.customer}`}
        searchPlaceholder="Search tickets..."
        exportFileName="support-tickets"
        exportTitle="Support Tickets"
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

      <Drawer
        open={!!selected}
        onClose={() => {
          setSelected(null);
          setReply("");
        }}
        title={activeTicket ? `${activeTicket.id} · ${activeTicket.subject}` : ""}
      >
        {activeTicket && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-5">
              <div>
                <p className="text-gray-primary text-sm font-medium">{activeTicket.customer}</p>
                <p className="text-gray-tertiary text-xs">{activeTicket.customerEmail}</p>
              </div>
              <select
                value={activeTicket.status}
                onChange={(e) => updateTicketStatus(activeTicket.id, e.target.value as TicketStatus)}
                className="border-gray-tertiary/32 rounded-full border px-3 py-1.5 text-xs font-medium focus:outline-0"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {activeTicket.messages.map((m, i) => (
                <div key={i} className={cn("flex", m.from === "agent" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                      m.from === "agent" ? "bg-primary-main text-success-light" : "bg-gray-100 text-gray-secondary",
                    )}
                  >
                    <p className="mb-1 text-xs font-medium opacity-80">{m.author}</p>
                    <p>{m.message}</p>
                    <p className="mt-1 text-[10px] opacity-60">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!reply.trim()) return;
                replyToTicket(activeTicket.id, reply.trim());
                setReply("");
              }}
              className="flex gap-2 border-t border-gray-200 p-4"
            >
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a reply..."
                className="border-gray-tertiary/32 h-11 flex-1 rounded-full border px-4 text-sm focus:outline-0"
              />
              <Button type="submit" icon={<Send className="size-4" />}>
                Send
              </Button>
            </form>
          </div>
        )}
      </Drawer>
    </div>
  );
}
