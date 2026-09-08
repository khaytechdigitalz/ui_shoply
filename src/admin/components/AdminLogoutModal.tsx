import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/admin/context/AdminContext";

export function AdminLogoutModal() {
  const { adminLogoutModalOpen, setAdminLogoutModalOpen, adminLogout } = useAdmin();
  const navigate = useNavigate();

  function handleConfirm() {
    adminLogout();
    navigate("/admin/login");
  }

  return (
    <Modal
      open={adminLogoutModalOpen}
      onClose={() => setAdminLogoutModalOpen(false)}
      widthClassName="max-w-sm"
    >
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <span className="bg-error-lighter text-error-dark flex size-14 items-center justify-center rounded-full">
          <LogOut className="size-6" />
        </span>
        <div>
          <h3 className="text-gray-primary mb-1 text-lg font-bold">Log out of the admin panel?</h3>
          <p className="text-gray-secondary text-sm">
            You'll need to sign in again to manage products, orders, and store settings.
          </p>
        </div>
        <div className="mt-2 grid w-full grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setAdminLogoutModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleConfirm}>
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
}
