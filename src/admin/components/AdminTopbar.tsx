import { Link } from "react-router-dom";
import { Menu, Search, ChevronDown, LogOut, UserCircle, Store, Sun, Moon } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { useAdmin } from "@/admin/context/AdminContext";
import { useTheme } from "@/theme/ThemeContext";
import { getImageSrc } from "@/lib/utils";
import { ColorSwitcher } from "@/admin/components/ColorSwitcher";
import { NotificationsDropdown } from "@/admin/components/NotificationsDropdown";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { adminProfile, setAdminLogoutModalOpen } = useAdmin();
  const { mode, toggleMode } = useTheme();

  return (
    <header className="dark:border-gray-800 dark:bg-gray-900 sticky top-0 z-30 flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      <button
        onClick={onMenuClick}
        className="text-gray-secondary dark:text-gray-300 dark:border-gray-700 flex size-10 items-center justify-center rounded-lg border border-gray-300 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="text-gray-tertiary absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
        <input
          placeholder="Search orders, products, customers..."
          className="border-gray-tertiary/32 dark:border-gray-700 h-10 w-full rounded-full border pr-4 pl-10 text-sm focus:outline-0"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          target="_blank"
          className="border-gray-tertiary/32 text-gray-secondary hover:text-primary-main dark:border-gray-700 dark:text-gray-300 hidden items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium sm:flex"
        >
          <Store className="size-3.5" /> View Store
        </Link>

        <button
          onClick={toggleMode}
          className="text-gray-secondary dark:text-gray-300 dark:border-gray-700 flex size-10 items-center justify-center rounded-full border border-gray-300"
          aria-label="Toggle dark mode"
        >
          {mode === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
        </button>

        <ColorSwitcher />

        <NotificationsDropdown />

        <Dropdown
          panelClassName="w-56 right-0"
          trigger={({ toggle }) => (
            <button onClick={toggle} className="flex cursor-pointer items-center gap-2">
              <div className="bg-primary-lighter size-9 shrink-0 overflow-hidden rounded-full">
                <img src={getImageSrc(adminProfile.avatar)} alt={adminProfile.name} className="size-full object-cover" />
              </div>
              <span className="hidden text-left sm:block">
                <span className="text-gray-primary dark:text-gray-100 block text-sm font-medium">{adminProfile.name}</span>
                <span className="text-gray-tertiary block text-xs">{adminProfile.role}</span>
              </span>
              <ChevronDown className="text-gray-tertiary hidden size-4 sm:block" />
            </button>
          )}
        >
          {(close) => (
            <div className="w-full py-1">
              <Link
                to="/admin/profile"
                onClick={close}
                className="text-gray-secondary hover:bg-gray-100 flex items-center gap-2 px-4 py-2 text-sm"
              >
                <UserCircle className="size-4" /> Profile Settings
              </Link>
              <button
                onClick={() => {
                  close();
                  setAdminLogoutModalOpen(true);
                }}
                className="text-error-dark hover:bg-error-lighter/40 flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm"
              >
                <LogOut className="size-4" /> Log Out
              </button>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
