import * as React from "react"
import { cn } from "cn"

import type { Tone } from "@/lib/tones"

const fills: Record<Tone, string> = {
  neutral: "bg-subtle-foreground",
  brand: "bg-primary",
  success: "bg-success",
  warning: "bg-[#ea580c]",
  danger: "bg-destructive",
  info: "bg-info",
}

type ProgressBarProps = React.ComponentProps<"div"> & {
  /** 0–100 */
  value: number
  tone?: Tone
  size?: "sm" | "default"
  /** Accessible name, e.g. "Checklist progress" */
  label?: string
}

/** Thin rounded progress track — checklist and phase completion. */
function ProgressBar({ value, tone = "info", size = "default", label, className, ...props }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
      data-slot="progress-bar"
      className={cn(
        "w-full overflow-hidden rounded-full bg-neutral-soft",
        size === "sm" ? "h-1.5" : "h-2",
        className
      )}
      {...props}
    >
      <div className={cn("h-full rounded-full transition-[width] duration-300", fills[tone])} style={{ width: `${pct}%` }} />
    </div>
  )
}

export { ProgressBar }
