import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Address } from "@/types";

const inputClass =
  "border-gray-tertiary/32 h-11 w-full rounded-lg border px-4 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-main";

const emptyForm: Omit<Address, "id"> = {
  label: "Home",
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  isDefault: false,
};

export function AddressFormModal({
  open,
  onClose,
  onSubmit,
  initialValue,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (address: Omit<Address, "id">) => void;
  initialValue?: Address;
}) {
  const [form, setForm] = useState<Omit<Address, "id">>(emptyForm);

  useEffect(() => {
    if (open) {
      setForm(initialValue ? { ...initialValue } : emptyForm);
    }
  }, [open, initialValue]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClassName="max-w-lg"
      title={initialValue ? "Edit Address" : "Add New Address"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
          onClose();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          {(["Home", "Work", "Other"] as const).map((label) => (
            <button
              type="button"
              key={label}
              onClick={() => setForm((f) => ({ ...f, label }))}
              className={`rounded-full border py-2 text-sm font-medium transition-colors ${
                form.label === label
                  ? "bg-primary-main border-primary-main text-success-light"
                  : "border-gray-tertiary/32 text-gray-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Full name"
            className={inputClass}
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          />
          <input
            required
            placeholder="Phone number"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <input
          required
          placeholder="Address line 1"
          className={inputClass}
          value={form.line1}
          onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
        />
        <input
          placeholder="Address line 2 (optional)"
          className={inputClass}
          value={form.line2}
          onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            required
            placeholder="City"
            className={inputClass}
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          />
          <input
            required
            placeholder="State"
            className={inputClass}
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
          />
          <input
            required
            placeholder="ZIP code"
            className={inputClass}
            value={form.zip}
            onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
          />
        </div>

        <label className="text-gray-secondary flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="accent-primary-main"
            checked={form.isDefault}
            onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
          />
          Set as default address
        </label>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth>
            Save Address
          </Button>
        </div>
      </form>
    </Modal>
  );
}
