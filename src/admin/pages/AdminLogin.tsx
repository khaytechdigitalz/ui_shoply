import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, LayoutDashboard, BarChart3, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";

export function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("alex.johnson@storly.com");
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    adminLogin(email);
    navigate("/admin");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gray-950 lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gray-900 p-12 lg:flex">
        <div className="bg-primary-main/20 absolute -top-24 -left-24 size-96 rounded-full blur-3xl" />
        <div className="bg-primary-light/10 absolute -right-24 -bottom-24 size-96 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-2">
          <span className="bg-primary-main text-success-light flex size-9 items-center justify-center rounded-full">
            <ShieldCheck className="size-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white">Storly Admin</span>
        </div>

        <div className="relative">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Run your entire marketplace from one dashboard.
          </h2>
          <p className="mb-8 max-w-md text-sm text-gray-400">
            Manage products, orders, vendors, promotions, and reports — all in
            one secure control center built for the Storly platform.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: LayoutDashboard, label: "Real-time metrics" },
              { icon: Package, label: "Full catalog control" },
              { icon: BarChart3, label: "Deep analytics" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <Icon className="text-success-light mb-2 size-5" />
                <p className="text-xs text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-gray-500">
          © {new Date().getFullYear()} Storly. Restricted access — authorized personnel only.
        </p>
      </div>

      {/* Form side */}
      <div className="flex flex-col items-center justify-center bg-gray-950 px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="bg-primary-main text-success-light flex size-9 items-center justify-center rounded-full">
              <ShieldCheck className="size-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">Storly Admin</span>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-white">Admin Sign In</h1>
          <p className="mb-8 text-sm text-gray-400">
            Enter your credentials to access the control panel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-500" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                className="focus:ring-primary-main/40 h-12 w-full rounded-lg border border-white/10 bg-white/5 pr-4 pl-11 text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:outline-0"
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-500" />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                defaultValue="admin123"
                className="focus:ring-primary-main/40 h-12 w-full rounded-lg border border-white/10 bg-white/5 pr-11 pl-11 text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:outline-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="accent-primary-main size-4" defaultChecked />
                Keep me signed in
              </label>
              <button type="button" className="text-primary-light font-medium">
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign In to Dashboard
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            This is a restricted area. All sign-in attempts are logged for security.
          </p>
        </div>
      </div>
    </div>
  );
}
