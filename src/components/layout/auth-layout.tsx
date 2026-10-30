import * as React from "react"
import { cn } from "cn"

import { BrandMark } from "@/components/layout/app-sidebar"

/**
 * Two-column frame for sign-in style pages: a dark `aside` panel (hidden on
 * small screens) and a centred form column. Children sit in a 384px column.
 */
function AuthLayout({
  aside,
  footer,
  className,
  children,
}: {
  aside?: React.ReactNode
  /** Small print under the form — version, legal */
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="auth-layout"
      className={cn("grid min-h-svh grid-cols-1 bg-card lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]", className)}
    >
      {aside && <aside className="relative hidden overflow-hidden bg-[#1c1917] text-white lg:flex">{aside}</aside>}
      <main className="flex min-w-0 flex-col px-6 py-6 sm:px-10">
        {/* The aside carries the brand on large screens */}
        <div className={cn(aside && "lg:invisible")}>
          <BrandMark />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm space-y-7">{children}</div>
        </div>
        {footer && <footer className="text-center font-mono text-[11px] text-subtle-foreground">{footer}</footer>}
      </main>
    </div>
  )
}

export { AuthLayout }
