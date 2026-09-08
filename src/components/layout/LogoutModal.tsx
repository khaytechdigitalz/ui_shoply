import { LogOut } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";
import { useNavigate } from "react-router-dom";

export function LogoutModal() {
  const { logoutModalOpen, setLogoutModalOpen, logout } = useStore();
  const navigate = useNavigate();

  function handleConfirm() {
    logout();
    navigate("/");
  }

  return (
    <Modal
      open={logoutModalOpen}
      onClose={() => setLogoutModalOpen(false)}
      widthClassName="max-w-sm"
    >
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <span className="bg-error-lighter text-error-dark flex size-14 items-center justify-center rounded-full">
          <LogOut className="size-6" />
        </span>
        <div>
          <h3 className="text-gray-primary mb-1 text-lg font-bold">Log out of your account?</h3>
          <p className="text-gray-secondary text-sm">
            You'll need to sign in again to access your orders, wishlist, and account settings.
          </p>
        </div>
        <div className="mt-2 grid w-full grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setLogoutModalOpen(false)}>
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
