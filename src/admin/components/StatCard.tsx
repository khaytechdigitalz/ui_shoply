import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  change,
  tone = "primary",
}: {
  label: string;
  value: string;
  icon: ReactNode;
  change?: { value: string; direction: "up" | "down" };
  tone?: "primary" | "success" | "warning" | "error" | "info";
}) {
  const cardTones: Record<string, string> = {
    primary: "bg-primary-lighter/50 border-primary-lighter dark:bg-primary-main/10 dark:border-primary-main/20",
    success: "bg-success-light/40 border-success-light dark:bg-success-dark-main/10 dark:border-success-dark-main/20",
    warning: "bg-warning-lighter border-warning-light dark:bg-warning-dark-main/10 dark:border-warning-dark-main/20",
    error: "bg-error-lighter/60 border-error-lighter dark:bg-error-dark/10 dark:border-error-dark/20",
    info: "bg-info-light/40 border-info-light dark:bg-info-dark/10 dark:border-info-dark/20",
  };

  const iconTones: Record<string, string> = {
    primary: "bg-primary-main text-success-light",
    success: "bg-success-dark-main text-white",
    warning: "bg-warning-dark-main text-white",
    error: "bg-error-dark text-white",
    info: "bg-info-dark text-white",
  };

  return (
    <div className={cn("rounded-2xl border p-5", cardTones[tone])}>
      <div className="mb-4 flex items-center justify-between">
        <span className={cn("flex size-11 items-center justify-center rounded-full shadow-sm", iconTones[tone])}>
          {icon}
        </span>
        {change && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              change.direction === "up" ? "text-success-dark-main" : "text-error-dark",
            )}
          >
            {change.direction === "up" ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {change.value}
          </span>
        )}
      </div>
      <p className="text-gray-primary dark:text-white text-2xl font-bold">{value}</p>
      <p className="text-gray-secondary dark:text-gray-300 text-sm">{label}</p>
    </div>
  );
}
