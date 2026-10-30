import * as React from "react"
import { cn } from "cn"

import { Input } from "@/components/ui/input"
import { formatINR } from "@/lib/format"

type CurrencyInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> & {
  value: number | null
  onValueChange?: (value: number | null) => void
  /** Currency symbol shown as a prefix. Default: ₹ */
  symbol?: string
}

/**
 * Right-aligned mono amount with a currency prefix.
 * Shows Indian grouping (7,88,800.00) at rest and the raw number while editing.
 */
function CurrencyInput({
  value,
  onValueChange,
  symbol = "₹",
  className,
  onFocus,
  onBlur,
  ...props
}: CurrencyInputProps) {
  const [draft, setDraft] = React.useState<string | null>(null)
  const display = draft ?? (value == null ? "" : formatINR(value, { symbol: false }))

  return (
    <div data-slot="currency-input" className={cn("relative w-full", className)}>
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-subtle-foreground">
        {symbol}
      </span>
      <Input
        inputMode="decimal"
        value={display}
        className="pl-8 text-right font-mono"
        onFocus={(e) => {
          setDraft(value == null ? "" : String(value))
          onFocus?.(e)
        }}
        onChange={(e) => {
          const next = e.target.value.replace(/[^\d.]/g, "")
          setDraft(next)
          onValueChange?.(next === "" ? null : Number(next))
        }}
        onBlur={(e) => {
          setDraft(null)
          onBlur?.(e)
        }}
        {...props}
      />
    </div>
  )
}

export { CurrencyInput }
