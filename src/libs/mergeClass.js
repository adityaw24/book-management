import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function mergeClass(...inputs) {
    return twMerge(clsx(inputs));
}
