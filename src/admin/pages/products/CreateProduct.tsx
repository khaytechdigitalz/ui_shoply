import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useAdmin } from "@/admin/context/AdminContext";
import type { AdminProduct, AdminProductStatus } from "@/types/admin";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";
const labelClass = "text-gray-secondary mb-1.5 block text-sm font-medium";

export function CreateProduct() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const navigate = useNavigate();
  const { products, categories, brands, attributes, addProduct, updateProduct } = useAdmin();
  const editing = editId ? products.find((p) => p.id === editId) : undefined;

  const [form, setForm] = useState<Omit<AdminProduct, "id" | "createdAt">>(
    editing
      ? { ...editing }
      : {
          name: "",
          image: "images/placeholder.png",
          sku: `SKU-${1000 + products.length}`,
          category: categories[0]?.name ?? "",
          brand: brands[0]?.name ?? "",
          price: 0,
          oldPrice: undefined,
          stock: 0,
          status: "Draft",
          rating: 0,
          reviewCount: 0,
        },
  );
  const [description, setDescription] = useState(
    "A quality product sourced from trusted vendors, ready to ship straight to your customers.",
  );
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateProduct(editing.id, form);
    } else {
      addProduct({ ...form, id: `product-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) });
    }
    navigate("/admin/products");
  }

  return (
    <div>
      <AdminPageHeader
        title={editing ? "Edit Product" : "Create Product"}
        subtitle={editing ? `Editing ${editing.name}` : "Add a new product to your catalog"}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Product Name</label>
                <input
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Farm Fresh Milk"
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={4}
                  className="border-gray-tertiary/32 w-full rounded-lg border p-3 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>SKU</label>
                  <input
                    required
                    className={inputClass}
                    value={form.sku}
                    onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    className={inputClass}
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AdminProductStatus }))}
                  >
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Price ($)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min={0}
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className={labelClass}>Compare-at Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  className={inputClass}
                  value={form.oldPrice ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, oldPrice: e.target.value ? Number(e.target.value) : undefined }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input
                  required
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Attributes</h2>
            <div className="flex flex-wrap gap-2">
              {attributes.map((attr) => (
                <button
                  type="button"
                  key={attr.id}
                  onClick={() =>
                    setSelectedAttributes((prev) =>
                      prev.includes(attr.id) ? prev.filter((id) => id !== attr.id) : [...prev, attr.id],
                    )
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    selectedAttributes.includes(attr.id)
                      ? "bg-primary-main border-primary-main text-success-light"
                      : "border-gray-tertiary/32 text-gray-secondary"
                  }`}
                >
                  {attr.name}
                </button>
              ))}
            </div>
            <p className="text-gray-tertiary mt-3 text-xs">
              Select which attributes (e.g. Color, Size) apply to this product. Manage attribute values in Catalog → Attributes.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Image</h2>
            <ImageUploadField
              value={form.image}
              onChange={(previewUrl) => setForm((f) => ({ ...f, image: previewUrl }))}
              helpText="PNG or JPG, at least 800x800px."
            />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-gray-primary mb-4 text-base font-bold">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  {categories.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <select
                  className={inputClass}
                  value={form.brand}
                  onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                >
                  {brands.map((b) => (
                    <option key={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" icon={<Save className="size-4" />}>
            {editing ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
