import * as React from "react"
import { cn } from "cn"
import { NavLink } from "react-router"

import { CountBadge } from "@/components/data-display/count-badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { Tone } from "@/lib/tones"

export type NavItem = {
  label: string
  icon: React.ElementType
  to: string
  count?: number
  countTone?: Tone
  /** Override the router's active state (previews, non-route items) */
  active?: boolean
}

/** Orange "PO" tile + product name. `inverted` for dark backgrounds. */
function BrandMark({
  collapsed,
  inverted,
  title = "PO Tracker",
  subtitle = "Fabrication",
}: {
  collapsed?: boolean
  inverted?: boolean
  title?: string
  subtitle?: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary font-mono text-[13px] font-bold text-primary-foreground">
        PO
      </span>
      {!collapsed && (
        <span className="flex min-w-0 flex-col">
          <span className="text-[15px] leading-tight font-bold">{title}</span>
          <span
            className={cn(
              "font-mono text-[10px] leading-tight font-medium tracking-[0.12em] uppercase",
              inverted ? "text-white/60" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </span>
        </span>
      )}
    </div>
  )
}

type AppSidebarProps = {
  items: NavItem[]
  /** Icon-only rail (64px) with tooltips */
  collapsed?: boolean
  /** Bottom strip — version, environment */
  footer?: React.ReactNode
  className?: string
}

/** Main left navigation. Active item gets the peach fill and brand text. */
function AppSidebar({ items, collapsed = false, footer, className }: AppSidebarProps) {
  return (
    <aside
      data-slot="app-sidebar"
      data-collapsed={collapsed || undefined}
      className={cn(
        "flex h-full shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground",
        collapsed ? "w-16" : "w-[232px]",
        className
      )}
    >
      <div className={cn("flex h-15 shrink-0 items-center border-b", collapsed ? "justify-center" : "px-4")}>
        <BrandMark collapsed={collapsed} />
      </div>

      <nav aria-label="Main" className={"flex-1 space-y-1 overflow-y-auto px-2.5 py-4"}>
        {items.map((item) => {
          const Icon = item.icon
          const link = (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              aria-label={collapsed ? item.label : undefined}
              aria-current={item.active ? "page" : undefined}
              className={({ isActive }) =>
                cn(
                  "flex h-10 items-center gap-3 rounded-md text-[15px] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/25",
                  collapsed ? "justify-center" : "px-3",
                  (item.active ?? isActive)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-muted"
                )
              }
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!collapsed && item.count != null && (
                <CountBadge
                  tone={item.countTone ?? "brand"}
                  className={cn((item.countTone ?? "brand") === "brand" && "bg-transparent")}
                >
                  {item.count}
                </CountBadge>
              )}
            </NavLink>
          )

          return collapsed ? (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ) : (
            link
          )
        })}
      </nav>

      {footer && !collapsed && (
        <div className="shrink-0 border-t px-4 py-3 font-mono text-[11px] text-muted-foreground">{footer}</div>
      )}
    </aside>
  )
}

export { AppSidebar, BrandMark }
