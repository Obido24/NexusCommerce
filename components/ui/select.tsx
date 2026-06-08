import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn("focus-ring h-10 w-full rounded-md border border-outline-variant bg-white px-3 text-sm text-on-surface focus:border-primary", className)}
      {...props}
    />
  );
}
