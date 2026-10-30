import * as React from "react"
import { cn } from "cn"

import { tones, type Tone } from "@/lib/tones"

/** Numeric counter for nav items, tabs and card titles ("12", "3", "1/6"). */
function CountBadge({
  tone = "neutral",
  className,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone }) {
  const t = tones[tone]
  return (
    <span
      data-slot="count-badge"
      className={cn(
        "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 font-mono text-xs leading-none font-semibold",
        t.soft,
        t.text,
        className
      )}
      {...props}
    />
  )
}

export { CountBadge }
