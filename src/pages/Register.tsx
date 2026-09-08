import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { GoogleIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { getImageSrc, cn } from "@/lib/utils";

export function Register() {
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/otp-verification?flow=register&email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="mb-10" />
          <h1 className="text-gray-primary mb-2 text-2xl font-bold">Create your account</h1>
          <p className="text-gray-secondary mb-6 text-sm">
            Join thousands of shoppers getting fresh groceries delivered daily.
          </p>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="border-gray-tertiary/32 hover:border-primary-main flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-medium"
            >
              <GoogleIcon className="size-4" /> Google
            </button>
            <button
              type="button"
              className="border-gray-tertiary/32 hover:border-primary-main flex h-11 items-center justify-center gap-2 rounded-full border text-sm font-medium"
            >
              <FacebookIcon className="size-4" /> Facebook
            </button>
          </div>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-gray-tertiary text-xs">Or sign up with email</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input required placeholder="Full name" className="border-gray-tertiary/32 h-12 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0" />
            </div>
            <div className="relative">
              <Mail className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="border-gray-tertiary/32 h-12 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0"
              />
            </div>
            <div className="relative">
              <Lock className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input required type="password" placeholder="Password" className="border-gray-tertiary/32 h-12 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0" />
            </div>

            <div>
              <span className="text-gray-primary mb-2 block text-sm font-medium">
                I want to sign up as
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(["customer", "vendor"] as const).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded-full border py-2.5 text-sm font-medium capitalize transition-colors",
                      role === r
                        ? "bg-primary-main border-primary-main text-success-light"
                        : "border-gray-tertiary/32 text-gray-secondary",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {role === "vendor" && (
              <div className="relative">
                <User className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                <input required placeholder="Store name" className="border-gray-tertiary/32 h-12 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0" />
              </div>
            )}

            <label className="text-gray-secondary flex items-start gap-2 text-sm">
              <input required type="checkbox" className="accent-primary-main mt-0.5" />
              I agree to the{" "}
              <Link to="/term-and-conditions" className="text-primary-main font-medium">
                Terms & Conditions
              </Link>
            </label>

            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </form>

          <p className="text-gray-secondary mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-main font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-primary-lighter/30 hidden lg:block">
        <img
          src={getImageSrc("images/hero/hero-slide-2.jpg")}
          alt="Fresh groceries"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
