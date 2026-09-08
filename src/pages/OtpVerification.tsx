import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";

export function OtpVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flow = searchParams.get("flow") ?? "register";
  const email = searchParams.get("email") ?? "";
  const [code, setCode] = useState(["", "", "", ""]);
  const { login } = useStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (flow === "reset") {
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      toast.success("Account verified!");
      login(email || "alex.johnson@email.com");
      navigate("/account");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <Logo className="mx-auto mb-8 justify-center" />
        <span className="bg-primary-lighter text-primary-main mx-auto mb-5 flex size-16 items-center justify-center rounded-full">
          <ShieldCheck className="size-7" />
        </span>
        <h1 className="text-gray-primary mb-2 text-2xl font-bold">OTP Verification</h1>
        <p className="text-gray-secondary mb-8 text-sm">
          Enter the 4-digit verification code sent to{" "}
          <span className="text-gray-primary font-medium">{email || "your email address"}</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {code.map((digit, i) => (
              <input
                key={i}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 1);
                  setCode((prev) => prev.map((d, idx) => (idx === i ? val : d)));
                  if (val && e.target.nextElementSibling instanceof HTMLInputElement) {
                    e.target.nextElementSibling.focus();
                  }
                }}
                maxLength={1}
                className="border-gray-tertiary/32 focus:ring-primary-main size-14 rounded-xl border text-center text-lg focus:outline-0"
              />
            ))}
          </div>
          <Button type="submit" fullWidth>
            Verify
          </Button>
        </form>
        <p className="text-gray-secondary mt-6 text-sm">
          Didn't receive a code?{" "}
          <button
            type="button"
            onClick={() => toast("Verification code resent")}
            className="text-primary-main font-medium"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
