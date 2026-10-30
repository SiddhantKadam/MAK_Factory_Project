import * as React from "react"
import { cn } from "cn"
import { PencilIcon } from "lucide-react"

import { Overline } from "@/components/data-display/overline"

type KeyValueProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  /** Mono for figures, dates and codes. Default: true */
  mono?: boolean
  /** Shows a pencil button after the value */
  onEdit?: () => void
}

/** Stacked caption + value — PO header facts ("CURRENCY / INR"). */
function KeyValue({ label, value, mono = true, onEdit, className, ...props }: KeyValueProps) {
  return (
    <div data-slot="key-value" className={cn("flex min-w-0 flex-col gap-2", className)} {...props}>
      <Overline>{label}</Overline>
      <div
        className={cn(
          "flex items-center gap-2 text-[15px] leading-tight font-semibold",
          mono ? "font-mono" : "font-sans font-medium"
        )}
      >
        <span className="truncate">{value}</span>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-sm p-0.5 text-subtle-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/30"
            aria-label={typeof label === "string" ? `Edit ${label.toLowerCase()}` : "Edit"}
          >
            <PencilIcon className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

/** Responsive grid of KeyValue items. */
function KeyValueGrid({
  columns = 3,
  className,
  ...props
}: React.ComponentProps<"div"> & { columns?: 2 | 3 | 4 | 6 }) {
  return (
    <div
      data-slot="key-value-grid"
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-6",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "md:grid-cols-4",
        columns === 6 && "md:grid-cols-3 xl:grid-cols-6",
        className
      )}
      {...props}
    />
  )
}

/** Label-left / value-right rows with dividers — "Phase Info" panel. */
function KeyValueList({ className, ...props }: React.ComponentProps<"dl">) {
  return <dl data-slot="key-value-list" className={cn("divide-y", className)} {...props} />
}

function KeyValueRow({
  label,
  value,
  mono = true,
  className,
  ...props
}: React.ComponentProps<"div"> & { label: React.ReactNode; value: React.ReactNode; mono?: boolean }) {
  return (
    <div
      data-slot="key-value-row"
      className={cn("flex items-center justify-between gap-4 py-3 text-sm", className)}
      {...props}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("text-right font-semibold", mono && "font-mono")}>{value}</dd>
    </div>
  )
}

export { KeyValue, KeyValueGrid, KeyValueList, KeyValueRow }
