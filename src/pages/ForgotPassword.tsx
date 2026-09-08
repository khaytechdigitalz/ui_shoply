import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/otp-verification?flow=reset&email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <Logo className="mx-auto mb-8 justify-center" />
        <span className="bg-primary-lighter text-primary-main mx-auto mb-5 flex size-16 items-center justify-center rounded-full">
          <KeyRound className="size-7" />
        </span>
        <h1 className="text-gray-primary mb-2 text-2xl font-bold">Forgot your password?</h1>
        <p className="text-gray-secondary mb-8 text-sm">
          Enter your email address and we'll send you a code to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
          <Button type="submit" fullWidth>
            Send Reset Code
          </Button>
        </form>
      </div>
    </div>
  );
}
