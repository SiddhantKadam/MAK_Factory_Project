import { format } from "date-fns"

const inr = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 788800 → "₹7,88,800.00" (Indian digit grouping). */
export function formatINR(amount: number, { symbol = true } = {}) {
  return `${symbol ? "₹" : ""}${inr.format(amount)}`
}

/** Date → "20 Aug 2026", the format used across the PO screens. */
export function formatDate(date: Date | string | number) {
  return format(new Date(date), "dd MMM yyyy")
}
