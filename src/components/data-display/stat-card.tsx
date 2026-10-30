import * as React from "react"
import { cn } from "cn"

import { Overline } from "@/components/data-display/overline"

type StatCardProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  /** Optional line under the value, e.g. "of ₹12,00,000 budget" */
  hint?: React.ReactNode
  /** Numbers and dates read best in mono; names in sans. Default: mono */
  mono?: boolean
}

/** Bordered summary tile — PO overview row ("TOTAL AMOUNT ₹7,88,800.00"). */
function StatCard({ label, value, hint, mono = true, className, ...props }: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      className={cn("flex flex-col gap-2.5 rounded-lg border bg-card px-4 py-4", className)}
      {...props}
    >
      <Overline>{label}</Overline>
      <div className={cn("text-xl leading-tight font-semibold", mono ? "font-mono" : "font-sans")}>
        {value}
      </div>
      {hint && <div className="text-[13px] text-muted-foreground">{hint}</div>}
    </div>
  )
}

export { StatCard }
