import { useState } from "react";
import { toast } from "sonner";
import { Save, Copy, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";
const labelClass = "text-gray-secondary mb-1.5 block text-sm font-medium";

export function ApiSettings() {
  const { apiSettings, updateApiSettings } = useAdmin();
  const [form, setForm] = useState(apiSettings);
  const [showSecret, setShowSecret] = useState(false);

  function copy(value: string) {
    navigator.clipboard?.writeText(value);
    toast.success("Copied to clipboard");
  }

  function generateKey() {
    const key = {
      id: `key-${Date.now()}`,
      label: "New API key",
      key: `sk_live_${Math.random().toString(36).slice(2, 14)}`,
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: "Never",
    };
    setForm((f) => ({ ...f, keys: [key, ...f.keys] }));
  }

  return (
    <div>
      <AdminPageHeader title="API Settings" subtitle="Manage API keys, payment gateway credentials, and webhooks" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateApiSettings(form);
        }}
        className="space-y-6"
      >
        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-gray-primary mb-4 text-base font-bold">Payment Gateway</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Public Key</label>
              <div className="flex gap-2">
                <input className={`${inputClass} min-w-0 flex-1 font-mono`} value={form.paymentGatewayPublicKey} onChange={(e) => setForm((f) => ({ ...f, paymentGatewayPublicKey: e.target.value }))} />
                <button type="button" onClick={() => copy(form.paymentGatewayPublicKey)} className="text-gray-secondary flex size-11 shrink-0 items-center justify-center rounded-lg border border-gray-300">
                  <Copy className="size-4" />
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Secret Key</label>
              <div className="flex gap-2">
                <input
                  type={showSecret ? "text" : "password"}
                  className={`${inputClass} min-w-0 flex-1 font-mono`}
                  value={form.paymentGatewaySecretKey}
                  onChange={(e) => setForm((f) => ({ ...f, paymentGatewaySecretKey: e.target.value }))}
                />
                <button type="button" onClick={() => setShowSecret((v) => !v)} className="text-gray-secondary flex size-11 shrink-0 items-center justify-center rounded-lg border border-gray-300">
                  {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-gray-primary mb-4 text-base font-bold">Webhooks & Rate Limiting</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className={labelClass}>Webhook URL</label>
              <input className={inputClass} value={form.webhookUrl} onChange={(e) => setForm((f) => ({ ...f, webhookUrl: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Rate Limit (req/min)</label>
              <input
                type="number"
                className={inputClass}
                value={form.rateLimitPerMinute}
                onChange={(e) => setForm((f) => ({ ...f, rateLimitPerMinute: Number(e.target.value) }))}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-gray-primary text-base font-bold">API Keys</h2>
            <Button type="button" size="sm" icon={<Plus className="size-3.5" />} onClick={generateKey}>
              Generate Key
            </Button>
          </div>
          <div className="space-y-3">
            {form.keys.map((k) => (
              <div key={k.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-gray-primary text-sm font-medium">{k.label}</p>
                  <p className="text-gray-tertiary font-mono text-xs">{k.key}</p>
                  <p className="text-gray-tertiary text-xs">Created {k.createdAt} · Last used {k.lastUsed}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => copy(k.key)} className="text-gray-secondary flex size-8 items-center justify-center rounded-lg border border-gray-200">
                    <Copy className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, keys: f.keys.filter((x) => x.id !== k.id) }))}
                    className="text-error-dark flex size-8 items-center justify-center rounded-lg border border-gray-200"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" icon={<Save className="size-4" />}>
          Save API Settings
        </Button>
      </form>
    </div>
  );
}
