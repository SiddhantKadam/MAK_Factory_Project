import type * as React from "react"

import { Alert } from "@/components/feedback/alert"

/**
 * Explains the mock auth in dev builds only — `import.meta.env.DEV` is false
 * in production, so this renders nothing there.
 */
export function DemoHint({ children }: { children: React.ReactNode }) {
  if (!import.meta.env.DEV) return null
  return (
    <Alert tone="info" title="Demo mode — no backend" className="text-[13px]">
      {children}
    </Alert>
  )
}
