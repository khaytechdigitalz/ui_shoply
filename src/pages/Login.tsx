import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Star } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { GoogleIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { useStore } from "@/store/StoreContext";
import { getImageSrc } from "@/lib/utils";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email || "alex.johnson@email.com");
    navigate("/account");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="mb-10" />

          <h1 className="text-gray-primary mb-2 text-2xl font-bold">
            Welcome back
          </h1>
          <p className="text-gray-secondary mb-8 text-sm">
            Sign in to continue to your account.
          </p>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="border-gray-tertiary/32 hover:border-primary-main hover:bg-primary-lighter/20 flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors"
            >
              <GoogleIcon className="size-4" /> Google
            </button>
            <button
              type="button"
              className="border-gray-tertiary/32 hover:border-primary-main hover:bg-primary-lighter/20 flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors"
            >
              <FacebookIcon className="size-4" /> Facebook
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-gray-tertiary text-xs">Or sign in with email</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="border-gray-tertiary/32 focus:border-primary-main focus:ring-primary-main/20 h-12 w-full rounded-full border pr-4 pl-11 text-sm transition-shadow focus:ring-4 focus:outline-0"
              />
            </div>

            <div className="relative">
              <Lock className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-gray-tertiary/32 focus:border-primary-main focus:ring-primary-main/20 h-12 w-full rounded-full border pr-11 pl-11 text-sm transition-shadow focus:ring-4 focus:outline-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-tertiary hover:text-gray-secondary absolute top-1/2 right-4 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="text-gray-secondary flex items-center gap-2">
                <input type="checkbox" className="accent-primary-main size-4" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-primary-main font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-gray-secondary mt-8 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-main font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Visual side */}
      <div className="bg-primary-main relative hidden overflow-hidden lg:block">
        <img
          src={getImageSrc("images/hero/hero-slide-1.jpg")}
          alt="Fresh groceries, delivered daily"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="from-primary-main/95 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-12">
          <div className="mb-6 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="fill-warning-dark text-warning-dark size-4" />
            ))}
            <span className="ml-2 text-sm text-white/80">4.9 from 12,000+ shoppers</span>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Fresh groceries, delivered to your door
          </h2>
          <p className="mb-6 max-w-sm text-sm text-white/70">
            Sign in to track orders, manage your wishlist, and get personalized
            deals from over 100 trusted local vendors.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <ShieldCheck className="size-4" />
            Your data is always private and secure.
          </div>
        </div>
      </div>
    </div>
  );
}
