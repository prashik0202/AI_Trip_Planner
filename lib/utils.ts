import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const budget = [
  { id: 1, name: "low", label: "Low 😪" },
  { id: 2, name: "medium", label: "Medium 😊" },
  { id: 3, name: "high", label: "High 🤑" },
];

export const people = [
  { id: 1, name: "solo", label: "Solo 👨🏻‍🦱" },
  { id: 2, name: "couple", label: "Couple 🧑‍🤝‍🧑" },
  { id: 3, name: "friends", label: "Friends ✌🏻" },
  { id: 4, name: "family", label: "Family 👨‍👩‍👧‍👦" },
];
