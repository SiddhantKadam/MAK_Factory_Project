import * as React from "react"
import { cn } from "cn"

type SegmentedOption<T extends string> = { value: T; label: React.ReactNode }

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[]
  value: T
  onValueChange: (value: T) => void
  /** Small mono caption at the start — "VIEW" */
  label?: string
  /** Adds a shadow for use as a floating bar over content */
  floating?: boolean
  className?: string
}

/** Pill switcher — the floating "VIEW · PO List · Empty · …" bar. */
function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  label,
  floating,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="segmented-control"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-card p-1",
        floating && "shadow-lg shadow-stone-900/10",
        className
      )}
    >
      {label && (
        <span aria-hidden className="px-3 font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase">
          {label}
        </span>
      )}
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "h-8 rounded-full px-3.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/25",
              active ? "bg-primary font-semibold text-primary-foreground" : "text-foreground hover:bg-muted"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
