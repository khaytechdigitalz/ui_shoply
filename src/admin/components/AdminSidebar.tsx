import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  SlidersHorizontal,
  Star,
  ClipboardList,
  ShoppingCart,
  Receipt,
  Ticket,
  Zap,
  BarChart3,
  Users,
  UserCog,
  ShieldCheck,
  LifeBuoy,
  Store,
  Search,
  KeyRound,
  UserCircle,
  History,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/admin/context/AdminContext";

interface LinkItem {
  type: "link";
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}
interface DropdownItem {
  type: "dropdown";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: { label: string; to: string }[];
}
interface ActionItem {
  type: "action";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: "logout";
}

type NavItem = LinkItem | DropdownItem | ActionItem;

interface Section {
  title: string;
  items: NavItem[];
}

const sections: Section[] = [
  {
    title: "Dashboard",
    items: [{ type: "link", label: "Dashboard", to: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Catalog Management",
    items: [
      {
        type: "dropdown",
        label: "Products",
        icon: Package,
        children: [
          { label: "All Products", to: "/admin/products" },
          { label: "Create Product", to: "/admin/products/create" },
        ],
      },
      { type: "link", label: "Categories", to: "/admin/categories", icon: FolderTree },
      { type: "link", label: "Brands", to: "/admin/brands", icon: Tag },
      { type: "link", label: "Attributes", to: "/admin/attributes", icon: SlidersHorizontal },
      { type: "link", label: "Product Reviews", to: "/admin/reviews", icon: Star },
    ],
  },
  {
    title: "Sales & Orders",
    items: [
      { type: "link", label: "Order Management", to: "/admin/orders", icon: ClipboardList },
      { type: "link", label: "Abandoned Carts", to: "/admin/abandoned-carts", icon: ShoppingCart },
      { type: "link", label: "Transactions", to: "/admin/transactions", icon: Receipt },
    ],
  },
  {
    title: "Marketing & Promotions",
    items: [
      { type: "link", label: "Coupons", to: "/admin/coupons", icon: Ticket },
      { type: "link", label: "Flash Sales", to: "/admin/flash-sales", icon: Zap },
    ],
  },
  {
    title: "Analytics & Reports",
    items: [
      {
        type: "dropdown",
        label: "Reports",
        icon: BarChart3,
        children: [
          { label: "Sales Report", to: "/admin/reports/sales" },
          { label: "Grossing Products", to: "/admin/reports/grossing-products" },
          { label: "Earnings", to: "/admin/reports/earnings" },
          { label: "Refund & Tax", to: "/admin/reports/refund-tax" },
        ],
      },
    ],
  },
  {
    title: "User & Access Management",
    items: [
      { type: "link", label: "Customers", to: "/admin/customers", icon: Users },
      { type: "link", label: "Admin Users", to: "/admin/admin-users", icon: UserCog },
      { type: "link", label: "Roles & Permissions", to: "/admin/roles-permissions", icon: ShieldCheck },
      { type: "link", label: "Support Tickets", to: "/admin/support-tickets", icon: LifeBuoy },
    ],
  },
  {
    title: "System Settings",
    items: [
      { type: "link", label: "Storefront Settings", to: "/admin/settings/storefront", icon: Store },
      { type: "link", label: "SEO Settings", to: "/admin/settings/seo", icon: Search },
      { type: "link", label: "API Settings", to: "/admin/settings/api", icon: KeyRound },
    ],
  },
  {
    title: "Account & Security",
    items: [
      { type: "link", label: "Admin Profile Settings", to: "/admin/profile", icon: UserCircle },
      { type: "link", label: "Audit Log", to: "/admin/audit-log", icon: History },
      { type: "action", label: "Logout", icon: LogOut, action: "logout" },
    ],
  },
];

function linkClasses(isActive: boolean) {
  return cn(
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
    isActive ? "bg-primary-main text-success-light" : "text-gray-300 hover:bg-white/5 hover:text-white",
  );
}

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { setAdminLogoutModalOpen } = useAdmin();
  const [openDropdown, setOpenDropdown] = useState<string | null>(() => {
    const match = sections
      .flatMap((s) => s.items)
      .find(
        (item): item is DropdownItem =>
          item.type === "dropdown" && item.children.some((c) => location.pathname === c.to),
      );
    return match?.label ?? "Products";
  });

  return (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            {section.title}
          </p>
          <div className="space-y-1">
            {section.items.map((item) => {
              if (item.type === "link") {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === "/admin"}
                    onClick={onNavigate}
                    className={({ isActive }) => linkClasses(isActive)}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    {item.label}
                  </NavLink>
                );
              }
              if (item.type === "action") {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => setAdminLogoutModalOpen(true)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="size-4.5 shrink-0" />
                    {item.label}
                  </button>
                );
              }
              const Icon = item.icon;
              const isOpen = openDropdown === item.label;
              const childActive = item.children.some((c) => location.pathname === c.to);
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      childActive ? "text-white" : "text-gray-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <div className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          end
                          onClick={onNavigate}
                          className={({ isActive }) =>
                            cn(
                              "block rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive
                                ? "text-success-light font-medium"
                                : "text-gray-400 hover:text-white",
                            )
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
