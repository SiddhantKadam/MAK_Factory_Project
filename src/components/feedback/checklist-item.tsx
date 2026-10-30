import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

type ChecklistItemProps = Omit<React.ComponentProps<"button">, "onClick"> & {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label: React.ReactNode
  /** Who/when — shown under the label once checked, e.g. "Priya Sharma · 13 Jun 2026" */
  meta?: React.ReactNode
}

/** A tickable task row. Checked rows turn green and strike the label through. */
function ChecklistItem({ checked, onCheckedChange, label, meta, className, disabled, ...props }: ChecklistItemProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      data-slot="checklist-item"
      className={cn(
        "flex w-full items-start gap-3.5 rounded-md px-4 py-3.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-60",
        checked ? "bg-success-soft" : "hover:bg-muted",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full transition-colors",
          checked ? "bg-success text-white" : "border-2 border-input bg-card"
        )}
      >
        {checked && <CheckIcon className="size-3.5" strokeWidth={3} />}
      </span>
      <span className="min-w-0 space-y-1">
        <span className={cn("block text-[15px]", checked && "text-muted-foreground line-through")}>{label}</span>
        {checked && meta && (
          <span className="flex items-center gap-1.5 font-mono text-xs text-success">
            <CheckIcon className="size-3" strokeWidth={3} />
            {meta}
          </span>
        )}
      </span>
    </button>
  )
}

export { ChecklistItem }
