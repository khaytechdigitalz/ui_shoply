import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { AccountSettingsTab } from "@/admin/components/profile/AccountSettingsTab";
import { PasswordSettingsTab } from "@/admin/components/profile/PasswordSettingsTab";
import { TwoFactorSetupTab } from "@/admin/components/profile/TwoFactorSetupTab";

export function AdminProfileSettings() {
  return (
    <div>
      <AdminPageHeader title="Admin Profile Settings" subtitle="Manage your admin account details and security" />

      <Tabs
        defaultTabId="account"
        tabs={[
          { id: "account", label: "Account Settings", content: <AccountSettingsTab /> },
          { id: "password", label: "Password Settings", content: <PasswordSettingsTab /> },
          { id: "2fa", label: "2FA Setup", content: <TwoFactorSetupTab /> },
        ]}
      />
    </div>
  );
}
