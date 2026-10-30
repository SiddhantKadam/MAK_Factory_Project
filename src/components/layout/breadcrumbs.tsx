import * as React from "react"
import { cn } from "cn"
import { Link } from "react-router"

export type Crumb = { label: React.ReactNode; to?: string }

/** "Home / Purchase Orders / PO-2026-0042" — links in blue, current page in dark. */
function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex items-center gap-2 text-sm">
        {items.map((crumb, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex min-w-0 items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-subtle-foreground">
                  /
                </span>
              )}
              {last || !crumb.to ? (
                <span aria-current={last ? "page" : undefined} className="truncate font-medium text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.to} className="truncate text-link hover:underline">
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumbs }
