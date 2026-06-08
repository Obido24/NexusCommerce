import { cn } from "@/lib/utils";

const toneMap = {
  neutral: "bg-surface-container text-secondary",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-primary"
};

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: keyof typeof toneMap; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", toneMap[tone], className)}>{children}</span>;
}
