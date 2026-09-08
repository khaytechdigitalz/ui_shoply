import { NavLink, Navigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MapPin,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { useStore } from "@/store/StoreContext";
import { getImageSrc, cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", to: "/account", icon: LayoutDashboard, end: true },
  { label: "My Orders", to: "/account/orders", icon: Package },
  { label: "Addresses", to: "/account/addresses", icon: MapPin },
  { label: "Profile Settings", to: "/account/profile", icon: User },
  { label: "Wishlist", to: "/wishlist", icon: Heart },
];

export function DashboardLayout() {
  const { isAuthenticated, profile, setLogoutModalOpen } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit space-y-1 rounded-2xl border border-gray-300 p-4 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4">
              <div className="bg-primary-lighter size-12 shrink-0 overflow-hidden rounded-full">
                <img
                  src={getImageSrc(profile.avatar)}
                  alt={profile.firstName}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-gray-primary truncate text-sm font-semibold">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="text-gray-tertiary truncate text-xs">{profile.email}</p>
              </div>
            </div>
            {navItems.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-lighter/50 text-primary-main"
                      : "text-gray-secondary hover:bg-gray-100",
                  )
                }
              >
                <Icon className="size-4" /> {label}
              </NavLink>
            ))}
            <button
              onClick={() => setLogoutModalOpen(true)}
              className="text-error-dark hover:bg-error-lighter/30 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium"
            >
              <LogOut className="size-4" /> Log Out
            </button>
          </aside>

          <div>
            <Outlet />
          </div>
        </div>
      </Container>
    </Section>
  );
}
