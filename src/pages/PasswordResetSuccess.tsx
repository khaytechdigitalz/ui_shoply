import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function PasswordResetSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <Logo className="mx-auto mb-8 justify-center" />
        <span className="bg-success-light text-success-dark-main mx-auto mb-5 flex size-16 items-center justify-center rounded-full">
          <CheckCircle2 className="size-7" />
        </span>
        <h1 className="text-gray-primary mb-2 text-2xl font-bold">Password reset!</h1>
        <p className="text-gray-secondary mb-8 text-sm">
          Your password has been changed successfully. You can now sign in with
          your new password.
        </p>
        <Link to="/">
          <Button fullWidth>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
