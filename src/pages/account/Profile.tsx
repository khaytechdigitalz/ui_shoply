import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useStore } from "@/store/StoreContext";

const inputClass =
  "border-gray-tertiary/32 h-12 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

export function Profile() {
  const { profile, updateProfile } = useStore();
  const [form, setForm] = useState(profile);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    updateProfile(form);
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) return;
    setPasswords({ current: "", next: "", confirm: "" });
    updateProfile({});
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-primary text-2xl font-bold">Profile Settings</h1>
        <p className="text-gray-secondary text-sm">Manage your personal information and password.</p>
      </div>

      <form onSubmit={handleSaveProfile} className="rounded-2xl border border-gray-300 p-6">
        <h2 className="text-gray-primary mb-5 text-base font-bold">Personal Information</h2>

        <div className="mb-6 max-w-[160px]">
          <ImageUploadField
            value={form.avatar}
            onChange={(previewUrl) => setForm((f) => ({ ...f, avatar: previewUrl }))}
            shape="circle"
            label="Change Photo"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm">First name</label>
            <input
              className={inputClass}
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm">Last name</label>
            <input
              className={inputClass}
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm">Email address</label>
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-gray-secondary mb-1.5 block text-sm">Phone number</label>
            <input
              type="tel"
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
        </div>
        <Button type="submit" className="mt-5">
          Save Changes
        </Button>
      </form>

      <form onSubmit={handleChangePassword} className="rounded-2xl border border-gray-300 p-6">
        <h2 className="text-gray-primary mb-5 text-base font-bold">Change Password</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="password"
            placeholder="Current password"
            className={`sm:col-span-2 ${inputClass}`}
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
    </div>
  );
}
