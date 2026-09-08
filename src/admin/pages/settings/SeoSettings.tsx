import { useState } from "react";
import { Save } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useAdmin } from "@/admin/context/AdminContext";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";
const labelClass = "text-gray-secondary mb-1.5 block text-sm font-medium";

export function SeoSettings() {
  const { seoSettings, updateSeoSettings } = useAdmin();
  const [form, setForm] = useState(seoSettings);

  return (
    <div>
      <AdminPageHeader title="SEO Settings" subtitle="Control how your storefront appears in search engines and social shares" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSeoSettings(form);
        }}
        className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Meta Tags</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Meta Title</label>
                <input className={inputClass} value={form.metaTitle} onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} />
                <p className="text-gray-tertiary mt-1 text-xs">{form.metaTitle.length}/60 characters</p>
              </div>
              <div>
                <label className={labelClass}>Meta Description</label>
                <textarea
                  rows={3}
                  className="border-gray-tertiary/32 w-full rounded-lg border p-3 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main"
                  value={form.metaDescription}
                  onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
                />
                <p className="text-gray-tertiary mt-1 text-xs">{form.metaDescription.length}/160 characters</p>
              </div>
              <div>
                <label className={labelClass}>Meta Keywords</label>
                <input className={inputClass} value={form.metaKeywords} onChange={(e) => setForm((f) => ({ ...f, metaKeywords: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Verification & Analytics</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Google Analytics ID</label>
                <input className={inputClass} value={form.googleAnalyticsId} onChange={(e) => setForm((f) => ({ ...f, googleAnalyticsId: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Google Site Verification</label>
                <input
                  className={inputClass}
                  placeholder="Not verified yet"
                  value={form.googleSiteVerification}
                  onChange={(e) => setForm((f) => ({ ...f, googleSiteVerification: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">robots.txt</h2>
            <textarea
              rows={5}
              className="border-gray-tertiary/32 w-full rounded-lg border p-3 font-mono text-xs focus:outline-0 focus:ring-1 focus:ring-primary-main"
              value={form.robotsTxt}
              onChange={(e) => setForm((f) => ({ ...f, robotsTxt: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-5">
            <h3 className="text-gray-primary mb-3 text-sm font-bold">Search Preview</h3>
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="truncate text-sm text-[#1a0dab]">{form.metaTitle || "Page title"}</p>
              <p className="text-success-dark-main text-xs">storly.example.com</p>
              <p className="text-gray-secondary mt-1 line-clamp-2 text-xs">{form.metaDescription}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-5">
            <h3 className="text-gray-primary mb-3 text-sm font-bold">Social Share Image</h3>
            <ImageUploadField
              value={form.ogImage}
              onChange={(previewUrl) => setForm((f) => ({ ...f, ogImage: previewUrl }))}
              shape="wide"
              label="Upload OG Image"
              helpText="Recommended: 1200x630px"
            />
          </div>

          <Button type="submit" fullWidth size="lg" icon={<Save className="size-4" />}>
            Save SEO Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
