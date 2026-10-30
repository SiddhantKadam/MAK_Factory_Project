import { Outlet } from "react-router"

import { AuthLayout } from "@/components/layout/auth-layout"
import { BrandPanel } from "@/features/auth/brand-panel"

/** Route layout shared by /login, /forgot-password and /reset-password. */
export function AuthShell() {
  return (
    <AuthLayout aside={<BrandPanel />} footer="© MAK Universal · PO Tracker v0.1">
      <Outlet />
    </AuthLayout>
  )
}
