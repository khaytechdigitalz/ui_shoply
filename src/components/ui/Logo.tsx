import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <span className="bg-primary-main text-success-light flex size-9 items-center justify-center rounded-full">
        <ShoppingBasket className="size-5" />
      </span>
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight",
          dark ? "text-white" : "text-gray-primary",
        )}
      >
        Shoply
      </span>
    </Link>
  );
}
