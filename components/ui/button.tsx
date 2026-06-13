import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-container",
        secondary: "border border-outline-variant bg-white text-on-surface hover:bg-surface-container-low",
        ghost: "text-on-surface hover:bg-surface-container-high",
        destructive: "bg-destructive text-white hover:bg-red-600"
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
