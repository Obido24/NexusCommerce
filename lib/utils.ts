import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function percentage(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}
