import * as React from "react"
import { cn } from "cn"
import { ArrowRightIcon, CalendarIcon } from "lucide-react"

import { fieldClassName, Input } from "@/components/ui/input"

const pickerIndicator =
  "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-90"

/**
 * Native date picker in mono ("20-08-2026" on an en-IN browser).
 * Value is an ISO string: "2026-08-20".
 */
function DateInput({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <Input
      type="date"
      data-slot="date-input"
      className={cn("font-mono", pickerIndicator, className)}
      {...props}
    />
  )
}

type DateRange = { from: string; to: string }

/** Two dates in one field — table date filters. Values are ISO strings. */
function DateRangeInput({
  value,
  onValueChange,
  className,
  disabled,
  "aria-label": ariaLabel = "Date range",
}: {
  value: DateRange
  onValueChange?: (value: DateRange) => void
  className?: string
  disabled?: boolean
  "aria-label"?: string
}) {
  const inner = cn(
    // min width keeps "31-08-2026" + the picker icon from clipping
    "h-full min-w-[7.5rem] flex-1 bg-transparent font-mono text-[13px] outline-none disabled:cursor-not-allowed",
    pickerIndicator
  )

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-slot="date-range-input"
      className={cn(
        fieldClassName,
        "flex h-10 items-center gap-2 px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/15",
        disabled && "bg-muted text-muted-foreground",
        className
      )}
    >
      <CalendarIcon className="size-4 shrink-0 text-subtle-foreground" />
      <input
        type="date"
        aria-label="From"
        className={inner}
        value={value.from}
        max={value.to || undefined}
        disabled={disabled}
        onChange={(e) => onValueChange?.({ ...value, from: e.target.value })}
      />
      <ArrowRightIcon className="size-3.5 shrink-0 text-subtle-foreground" />
      <input
        type="date"
        aria-label="To"
        className={inner}
        value={value.to}
        min={value.from || undefined}
        disabled={disabled}
        onChange={(e) => onValueChange?.({ ...value, to: e.target.value })}
      />
    </div>
  )
}

export { DateInput, DateRangeInput }
export type { DateRange }
