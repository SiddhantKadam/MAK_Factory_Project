import * as React from "react"
import { cn } from "cn"

type PageHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  /** "10 orders · 3 awaiting your review" */
  description?: React.ReactNode
  /** Primary page action(s), right-aligned — e.g. "+ New PO" */
  actions?: React.ReactNode
}

/** Page title block that sits above the main card. */
function PageHeader({ title, description, actions, className, ...props }: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-wrap items-end justify-between gap-4", className)}
      {...props}
    >
      <div className="min-w-0 space-y-1.5">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-[15px] text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

export { PageHeader }
