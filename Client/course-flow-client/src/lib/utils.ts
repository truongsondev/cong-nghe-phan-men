import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createObjectURL = (file: File | string | undefined) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return file;
};

export const passStringToJson = (str: string | null) => {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return null;
  }
};
