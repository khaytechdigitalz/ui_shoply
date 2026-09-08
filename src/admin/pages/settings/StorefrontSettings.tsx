import { useState } from "react";
import { Save, Store } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";
const labelClass = "text-gray-secondary mb-1.5 block text-sm font-medium";

export function StorefrontSettings() {
  const { storefrontSettings, updateStorefrontSettings } = useAdmin();
  const [form, setForm] = useState(storefrontSettings);

  return (
    <div>
      <AdminPageHeader title="Storefront Settings" subtitle="Control how your storefront presents itself to shoppers" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateStorefrontSettings(form);
        }}
        className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">General</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Store Name</label>
                <input className={inputClass} value={form.storeName} onChange={(e) => setForm((f) => ({ ...f, storeName: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input className={inputClass} value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Currency</label>
                  <input className={inputClass} value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Timezone</label>
                  <input className={inputClass} value={form.timezone} onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Support Email</label>
                <input type="email" className={inputClass} value={form.supportEmail} onChange={(e) => setForm((f) => ({ ...f, supportEmail: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Support Phone</label>
                <input className={inputClass} value={form.supportPhone} onChange={(e) => setForm((f) => ({ ...f, supportPhone: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Store Address</label>
                <input className={inputClass} value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Facebook URL</label>
                <input className={inputClass} value={form.facebookUrl} onChange={(e) => setForm((f) => ({ ...f, facebookUrl: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Instagram URL</label>
                <input className={inputClass} value={form.instagramUrl} onChange={(e) => setForm((f) => ({ ...f, instagramUrl: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Twitter / X URL</label>
                <input className={inputClass} value={form.twitterUrl} onChange={(e) => setForm((f) => ({ ...f, twitterUrl: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center">
            <span className="bg-primary-lighter text-primary-main mx-auto mb-3 flex size-14 items-center justify-center rounded-full">
              <Store className="size-6" />
            </span>
            <h3 className="text-gray-primary text-sm font-bold">{form.storeName}</h3>
            <p className="text-gray-tertiary text-xs">{form.tagline}</p>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-gray-primary text-sm font-bold">Maintenance Mode</h3>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, maintenanceMode: !f.maintenanceMode }))}
                className={`h-6 w-11 rounded-full transition-colors ${form.maintenanceMode ? "bg-primary-main" : "bg-gray-300"}`}
              >
                <span
                  className={`block size-5 rounded-full bg-white shadow transition-transform ${
                    form.maintenanceMode ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <p className="text-gray-tertiary text-xs">
              When enabled, shoppers see a "we'll be back soon" page instead of the storefront.
            </p>
          </div>

          <Button type="submit" fullWidth size="lg" icon={<Save className="size-4" />}>
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
