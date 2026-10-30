import * as React from "react"
import { cn } from "cn"

/**
 * Small mono uppercase caption — "TOTAL AMOUNT", "REQUIRED DELIVERY".
 * Used above values in stat cards, key/value grids and dense tables.
 */
function Overline({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="overline"
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-subtle-foreground uppercase [&_svg]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

export { Overline }
