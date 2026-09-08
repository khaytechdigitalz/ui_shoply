import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useAdmin } from "@/admin/context/AdminContext";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";
const labelClass = "text-gray-secondary mb-1.5 block text-sm font-medium";

export function AccountSettingsTab() {
  const { adminProfile, updateAdminProfile } = useAdmin();
  const [form, setForm] = useState(adminProfile);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateAdminProfile(form);
      }}
      className="rounded-2xl border border-gray-300 bg-white p-6"
    >
      <h2 className="text-gray-primary mb-5 text-base font-bold">Personal Information</h2>

      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="w-32">
          <ImageUploadField
            value={form.avatar}
            onChange={(previewUrl) => setForm((f) => ({ ...f, avatar: previewUrl }))}
            shape="circle"
            label="Change"
          />
        </div>
        <div>
          <p className="text-gray-primary text-sm font-medium">{form.role}</p>
          <p className="text-gray-tertiary text-xs">Role is managed under Roles & Permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name</label>
          <input className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Phone Number</label>
          <input className={inputClass} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>
      <Button type="submit" className="mt-5">
        Save Changes
      </Button>
    </form>
  );
}
