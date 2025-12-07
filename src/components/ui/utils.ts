import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency for Kenyan Shillings
export function formatKSH(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}