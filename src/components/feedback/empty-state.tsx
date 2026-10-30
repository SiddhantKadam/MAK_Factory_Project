import * as React from "react"
import { cn } from "cn"

import { tones, type Tone } from "@/lib/tones"

type EmptyStateProps = Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ElementType
  /** Icon tile colour — brand by default; success for "done" confirmations */
  tone?: Tone
  title: React.ReactNode
  description?: React.ReactNode
  /** Primary action, usually a Button */
  action?: React.ReactNode
}

/** Placeholder for lists and panels with nothing to show yet — or a centred confirmation. */
function EmptyState({ icon: Icon, tone = "brand", title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn("flex flex-col items-center px-6 py-14 text-center", className)}
      {...props}
    >
      {Icon && (
        <span className={cn("mb-4 grid size-12 place-items-center rounded-lg", tones[tone].soft, tones[tone].text)}>
          <Icon className="size-6" />
        </span>
      )}
      <h3 className="text-[17px] font-semibold">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export { EmptyState }
