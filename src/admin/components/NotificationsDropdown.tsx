import { Bell, Package, MessageSquare, AlertTriangle, UserPlus, CheckCheck } from "lucide-react";
import { useState } from "react";
import { Dropdown } from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    icon: Package,
    tone: "bg-primary-lighter text-primary-main",
    title: "New order received",
    description: "Order #ORD-20479 was just placed by Courtney Henry.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    icon: AlertTriangle,
    tone: "bg-warning-light text-warning-dark-main",
    title: "Low stock warning",
    description: "Farm Fresh Milk has dropped below 10 units in stock.",
    time: "38 min ago",
    read: false,
  },
  {
    id: "n3",
    icon: MessageSquare,
    tone: "bg-info-light text-info-dark",
    title: "New support ticket",
    description: "Devon Lane opened a ticket: \"Refund not received\".",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "n4",
    icon: UserPlus,
    tone: "bg-success-light text-success-dark-main",
    title: "New customer registered",
    description: "Priya Nair created an account.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "n5",
    icon: Package,
    tone: "bg-primary-lighter text-primary-main",
    title: "Order delivered",
    description: "Order #ORD-20463 was marked as delivered.",
    time: "Yesterday",
    read: true,
  },
];

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <Dropdown
      panelClassName="right-0 w-80"
      trigger={({ toggle }) => (
        <button
          onClick={toggle}
          className="text-gray-secondary dark:text-gray-300 relative flex size-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700"
          aria-label="Notifications"
        >
          <Bell className="size-4.5" />
          {unreadCount > 0 && (
            <span className="bg-error-dark absolute top-1.5 right-2 size-2 rounded-full" />
          )}
        </button>
      )}
    >
      {() => (
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <p className="text-gray-primary text-sm font-semibold">
              Notifications {unreadCount > 0 && <span className="text-primary-main">({unreadCount})</span>}
            </p>
            <button
              onClick={markAllRead}
              className="text-primary-main flex items-center gap-1 text-xs font-medium"
            >
              <CheckCheck className="size-3.5" /> Mark all read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-3 border-b border-gray-50 px-4 py-3 last:border-0",
                    !n.read && "bg-primary-lighter/10",
                  )}
                >
                  <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", n.tone)}>
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-primary text-sm font-medium">{n.title}</p>
                    <p className="text-gray-secondary line-clamp-2 text-xs">{n.description}</p>
                    <p className="text-gray-tertiary mt-1 text-[11px]">{n.time}</p>
                  </div>
                  {!n.read && <span className="bg-primary-main mt-1 size-2 shrink-0 rounded-full" />}
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 px-4 py-2.5 text-center">
            <button className="text-primary-main text-xs font-medium">View all notifications</button>
          </div>
        </div>
      )}
    </Dropdown>
  );
}
