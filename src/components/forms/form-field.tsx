import * as React from "react"
import { cn } from "cn"
import { Slot } from "radix-ui"
import { CircleAlertIcon } from "lucide-react"

import { Label } from "@/components/ui/label"

type FormFieldProps = {
  label: React.ReactNode
  /** Shown after the label — e.g. <AutoFilledTag />, or a "required" tag */
  tag?: React.ReactNode
  /** Helper text under the control */
  hint?: React.ReactNode
  /** Error message; also marks the control aria-invalid */
  error?: React.ReactNode
  /** Adds a red asterisk after the label */
  required?: boolean
  /** Use when the control already has an id */
  id?: string
  className?: string
  /** A single form control (Input, Select trigger, Textarea, …) */
  children: React.ReactElement
}

/**
 * Label + control + hint/error. Wires `id`, `aria-describedby` and
 * `aria-invalid` onto the child, so the control needs no extra props.
 */
function FormField({ label, tag, hint, error, required, id, className, children }: FormFieldProps) {
  const autoId = React.useId()
  const controlId = id ?? autoId
  const hintId = hint ? `${controlId}-hint` : undefined
  const errorId = error ? `${controlId}-error` : undefined

  return (
    <div data-slot="form-field" className={cn("flex flex-col gap-2", className)}>
      <div className="flex min-h-5 items-center gap-2.5">
        <Label htmlFor={controlId} className="text-sm font-semibold">
          {label}
          {required && <span className="-ml-1 text-destructive" aria-hidden>*</span>}
        </Label>
        {tag}
      </div>
      <Slot.Root
        id={controlId}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
      >
        {children}
      </Slot.Root>
      {hint && !error && (
        <p id={hintId} className="text-[13px] text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-[13px] font-medium text-destructive">
          <CircleAlertIcon className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }
