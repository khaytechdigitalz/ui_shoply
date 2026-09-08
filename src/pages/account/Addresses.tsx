import { useState } from "react";
import { MapPin, Pencil, Trash2, Plus, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddressFormModal } from "@/components/account/AddressFormModal";
import { useStore } from "@/store/StoreContext";
import type { Address } from "@/types";

export function Addresses() {
  const { addresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Address | undefined>(undefined);

  function openAdd() {
    setEditing(undefined);
    setModalOpen(true);
  }

  function openEdit(address: Address) {
    setEditing(address);
    setModalOpen(true);
  }

  function handleSubmit(address: Omit<Address, "id">) {
    if (editing) {
      updateAddress(editing.id, address);
    } else {
      addAddress(address);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-primary text-2xl font-bold">My Addresses</h1>
          <p className="text-gray-secondary text-sm">Manage your saved shipping addresses.</p>
        </div>
        <Button icon={<Plus className="size-4" />} onClick={openAdd}>
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-300 py-16 text-center">
          <MapPin className="text-gray-tertiary size-16" />
          <h2 className="text-gray-primary text-lg font-bold">No addresses saved</h2>
          <p className="text-gray-secondary text-sm">Add an address to speed up checkout.</p>
          <Button onClick={openAdd}>Add Address</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative rounded-2xl border p-5 ${
                address.isDefault ? "border-primary-main bg-primary-lighter/10" : "border-gray-300"
              }`}
            >
              {address.isDefault && (
                <span className="bg-primary-main text-success-light absolute -top-3 left-5 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                  <BadgeCheck className="size-3.5" /> Default
                </span>
              )}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-gray-primary text-sm font-bold">{address.label}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(address)}
                    className="text-gray-tertiary hover:text-primary-main cursor-pointer"
                    aria-label="Edit address"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => removeAddress(address.id)}
                    className="text-gray-tertiary hover:text-error-dark cursor-pointer"
                    aria-label="Delete address"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <div className="text-gray-secondary space-y-0.5 text-sm">
                <p className="text-gray-primary font-medium">{address.fullName}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>
              {!address.isDefault && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-4"
                  onClick={() => setDefaultAddress(address.id)}
                >
                  Set as Default
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      <AddressFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValue={editing}
      />
    </div>
  );
}
