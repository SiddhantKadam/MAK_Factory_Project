import * as React from "react"
import { cn } from "cn"

/**
 * Full-screen frame: sidebar on the left, top bar + scrolling content on the right.
 * Content area uses the grey canvas; put white Cards inside it.
 */
function AppShell({
  sidebar,
  topBar,
  className,
  children,
}: {
  sidebar: React.ReactNode
  topBar?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div data-slot="app-shell" className={cn("flex h-svh overflow-hidden bg-background", className)}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export { AppShell }
