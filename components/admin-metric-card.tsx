import type { LucideIcon } from "lucide-react";

export function AdminMetricCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label">{label}</p>
          <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-primary">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-secondary">{helper}</p>
    </div>
  );
}
