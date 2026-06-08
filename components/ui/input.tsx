import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-ring h-10 w-full rounded-md border border-outline-variant bg-white px-3 text-sm text-on-surface placeholder:text-secondary focus:border-primary",
        className
      )}
      {...props}
    />
  );
}
