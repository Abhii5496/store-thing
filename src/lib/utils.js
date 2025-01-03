import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateTotalPrice(products) {
  return products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
