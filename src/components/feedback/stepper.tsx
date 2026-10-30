import * as React from "react"
import { cn } from "cn"
import { CheckIcon, LockIcon } from "lucide-react"

export type StepStatus = "complete" | "current" | "upcoming" | "locked"

export type Step = {
  label: React.ReactNode
  status: StepStatus
}

/**
 * Horizontal phase tracker — Cutting → Beamline → Fit-Up → QC → Dispatch.
 * Complete steps are green, the current step blue, locked steps grey.
 */
function Stepper({ steps, className, ...props }: React.ComponentProps<"ol"> & { steps: Step[] }) {
  return (
    <ol data-slot="stepper" className={cn("flex w-full items-start", className)} {...props}>
      {steps.map((step, i) => {
        const next = steps[i + 1]
        return (
          <li
            key={i}
            aria-current={step.status === "current" ? "step" : undefined}
            className="relative flex flex-1 flex-col items-center gap-2 text-center"
          >
            {next && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-5 right-[calc(-50%+36px)] left-[calc(50%+36px)] h-0.5 rounded-full",
                  step.status === "complete" ? "bg-success" : "bg-border"
                )}
              />
            )}
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full font-mono text-sm font-semibold",
                step.status === "complete" && "bg-success text-white",
                step.status === "current" && "bg-info text-white ring-4 ring-info/20",
                step.status === "upcoming" && "border-2 border-border bg-card text-muted-foreground",
                step.status === "locked" && "bg-neutral-soft text-subtle-foreground"
              )}
            >
              {step.status === "complete" && <CheckIcon className="size-5" strokeWidth={2.5} />}
              {step.status === "locked" && <LockIcon className="size-4" />}
              {(step.status === "current" || step.status === "upcoming") && i + 1}
            </span>
            <span
              className={cn(
                "text-[13px] font-medium",
                step.status === "complete" && "text-success",
                step.status === "current" && "font-semibold text-info",
                step.status === "upcoming" && "text-muted-foreground",
                step.status === "locked" && "text-subtle-foreground"
              )}
            >
              {step.label}
              <span className="sr-only"> ({step.status})</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
