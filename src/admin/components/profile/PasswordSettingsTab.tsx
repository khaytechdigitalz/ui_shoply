import { useState } from "react";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

export function PasswordSettingsTab() {
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passwords.current || !passwords.next) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error("New password and confirmation don't match");
      return;
    }
    setPasswords({ current: "", next: "", confirm: "" });
    toast.success("Password updated");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="h-fit rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-gray-primary mb-5 text-base font-bold">Change Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            className={inputClass}
            value={passwords.current}
            onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
          />
          <input
            type="password"
            placeholder="New password"
            className={inputClass}
            value={passwords.next}
            onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className={inputClass}
            value={passwords.confirm}
            onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
          />
        </div>
        <Button type="submit" variant="outline" className="mt-5">
          Update Password
        </Button>
      </form>

      <div className="h-fit rounded-2xl border border-gray-300 bg-white p-6">
        <h2 className="text-gray-primary mb-4 text-base font-bold">Password Requirements</h2>
        <ul className="text-gray-secondary space-y-2 text-sm">
          <li>• At least 8 characters long</li>
          <li>• Contains at least one uppercase letter</li>
          <li>• Contains at least one number</li>
          <li>• Contains at least one special character</li>
        </ul>
        <div className="text-warning-dark-main bg-warning-lighter mt-5 flex items-start gap-2 rounded-lg p-3 text-xs">
          <ShieldAlert className="mt-0.5 size-4 shrink-0" />
          <span>You'll be signed out of all other sessions after changing your password.</span>
        </div>
      </div>
    </div>
  );
}
