import * as React from "react"
import { cn } from "cn"
import { CheckIcon, PencilIcon, XIcon } from "lucide-react"

type Decision = "approve" | "revise" | "reject"

const decisions: Record<Decision, { icon: React.ElementType; className: string }> = {
  approve: {
    icon: CheckIcon,
    className:
      "border-success bg-success text-white hover:bg-[color-mix(in_oklab,var(--success),black_10%)] [&_[data-desc]]:text-white/90",
  },
  revise: {
    icon: PencilIcon,
    className: "border-primary bg-card text-primary hover:bg-accent [&_[data-desc]]:text-primary/90",
  },
  reject: {
    icon: XIcon,
    className:
      "border-destructive-border bg-card text-destructive hover:bg-destructive-soft [&_[data-desc]]:text-destructive/90",
  },
}

type DecisionButtonProps = Omit<React.ComponentProps<"button">, "title"> & {
  decision: Decision
  title: React.ReactNode
  /** What happens next — "Releases the PO to production scheduling." */
  description?: React.ReactNode
  icon?: React.ElementType
}

/** Large two-line action for approval rails — Approve / Request revision / Reject. */
function DecisionButton({ decision, title, description, icon, className, ...props }: DecisionButtonProps) {
  const d = decisions[decision]
  const Icon = icon ?? d.icon

  return (
    <button
      type="button"
      data-slot="decision-button"
      data-decision={decision}
      className={cn(
        "grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-md border-2 px-4 py-3.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50",
        d.className,
        className
      )}
      {...props}
    >
      <Icon className="mt-0.5 size-[18px]" strokeWidth={2.5} />
      <span className="text-base font-semibold">{title}</span>
      {description && (
        <span data-desc className="col-start-2 text-[13px] leading-snug">
          {description}
        </span>
      )}
    </button>
  )
}

export { DecisionButton }
