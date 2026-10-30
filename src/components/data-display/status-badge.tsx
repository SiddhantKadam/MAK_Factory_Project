import * as React from "react"
import { cn } from "cn"

import { tones, type Tone } from "@/lib/tones"

type StatusBadgeProps = React.ComponentProps<"span"> & {
  tone?: Tone
  /**
   * `soft` — tinted pill (PO status in tables).
   * `outline` — white pill with a coloured dot (role chips such as "Finance Officer").
   */
  appearance?: "soft" | "outline"
  /** Hide the leading dot */
  dot?: boolean
}

function StatusBadge({
  tone = "neutral",
  appearance = "soft",
  dot = true,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const t = tones[tone]

  return (
    <span
      data-slot="status-badge"
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[13px] leading-none font-medium whitespace-nowrap",
        appearance === "soft" && [t.soft, t.text],
        appearance === "outline" && "border border-border bg-card text-foreground",
        className
      )}
      {...props}
    >
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />}
      {children}
    </span>
  )
}

export { StatusBadge }
export type { StatusBadgeProps }
