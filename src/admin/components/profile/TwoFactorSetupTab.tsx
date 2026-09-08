import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Smartphone, KeyRound, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

const RECOVERY_CODES = ["7F3K-9QXZ", "2M8P-VN4T", "K5RJ-88LC", "QW1E-77YD", "9ZXC-1234", "LP0O-56BN"];

export function TwoFactorSetupTab() {
  const [enabled, setEnabled] = useState(false);
  const [step, setStep] = useState<"intro" | "verify" | "done">("intro");
  const [code, setCode] = useState("");

  function copyCodes() {
    navigator.clipboard?.writeText(RECOVERY_CODES.join("\n"));
    toast.success("Recovery codes copied");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-300 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-gray-primary flex items-center gap-2 text-base font-bold">
            <ShieldCheck className="text-primary-main size-5" /> Two-Factor Authentication
          </h2>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              enabled ? "bg-success-light text-success-dark-main" : "bg-gray-200 text-gray-secondary"
            }`}
          >
            {enabled ? "Enabled" : "Disabled"}
          </span>
        </div>
        <p className="text-gray-secondary mb-5 text-sm">
          Add an extra layer of security to your admin account by requiring a
          verification code from your phone in addition to your password.
        </p>

        {!enabled && step === "intro" && (
          <Button onClick={() => setStep("verify")} icon={<Smartphone className="size-4" />}>
            Set Up 2FA
          </Button>
        )}

        {!enabled && step === "verify" && (
          <div className="space-y-4">
            <div className="bg-gray-50 flex flex-col items-center gap-3 rounded-xl p-6">
              <div className="grid size-36 place-items-center rounded-lg border border-gray-300 bg-white">
                <KeyRound className="text-gray-tertiary size-10" />
              </div>
              <p className="text-gray-tertiary text-center text-xs">
                Scan this QR code with Google Authenticator, Authy, or a similar app.
              </p>
            </div>
            <div>
              <label className="text-gray-secondary mb-1.5 block text-sm font-medium">Enter 6-digit code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                className="border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-center font-mono text-sm tracking-widest focus:outline-0 focus:ring-1 focus:ring-primary-main"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("intro")}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (code.length !== 6) {
                    toast.error("Enter the 6-digit code from your authenticator app");
                    return;
                  }
                  setEnabled(true);
                  setStep("done");
                  toast.success("Two-factor authentication enabled");
                }}
              >
                Verify & Enable
              </Button>
            </div>
          </div>
        )}

        {enabled && (
          <Button
            variant="outline"
            onClick={() => {
              setEnabled(false);
              setStep("intro");
              toast("Two-factor authentication disabled");
            }}
          >
            Disable 2FA
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-gray-primary mb-2 text-base font-bold">Recovery Codes</h2>
        <p className="text-gray-secondary mb-4 text-sm">
          Save these codes somewhere safe. Each one can be used once to sign in
          if you lose access to your authenticator app.
        </p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {RECOVERY_CODES.map((c) => (
            <span key={c} className="bg-gray-50 text-gray-secondary rounded-lg border border-gray-200 px-3 py-2 text-center font-mono text-xs">
              {c}
            </span>
          ))}
        </div>
        <Button variant="outline" size="sm" icon={<Copy className="size-3.5" />} onClick={copyCodes}>
          Copy All Codes
        </Button>
      </div>
    </div>
  );
}
