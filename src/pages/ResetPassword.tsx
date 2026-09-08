import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    navigate("/password-reset-success");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <Logo className="mx-auto mb-8 justify-center" />
        <h1 className="text-gray-primary mb-2 text-2xl font-bold">Create a new password</h1>
        <p className="text-gray-secondary mb-8 text-sm">
          Choose a strong password you haven't used before.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="relative">
            <Lock className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="border-gray-tertiary/32 h-12 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0"
            />
          </div>
          <div className="relative">
            <Lock className="text-gray-tertiary absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <input
              required
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              className="border-gray-tertiary/32 h-12 w-full rounded-full border pr-4 pl-11 text-sm focus:outline-0"
            />
          </div>
          <Button type="submit" fullWidth>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
