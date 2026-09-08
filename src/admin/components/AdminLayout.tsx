import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { X } from "lucide-react";
import { useAdmin } from "@/admin/context/AdminContext";
import { AdminSidebar } from "@/admin/components/AdminSidebar";
import { AdminTopbar } from "@/admin/components/AdminTopbar";
import { AdminLogoutModal } from "@/admin/components/AdminLogoutModal";
import { Logo } from "@/components/ui/Logo";

export function AdminLayout() {
  const { isAdminAuthenticated } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-gray-900 lg:block">
        <div className="border-b border-white/10 px-6 py-5">
          <Logo dark />
          <span className="mt-1 block text-xs text-gray-400">Admin Panel</span>
        </div>
        <AdminSidebar />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="animate__animated animate__faster animate__slideInLeft absolute inset-y-0 left-0 w-72 bg-gray-900">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <Logo dark />
                <span className="mt-1 block text-xs text-gray-400">Admin Panel</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-gray-400" aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        <AdminTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      <AdminLogoutModal />
    </div>
  );
}
