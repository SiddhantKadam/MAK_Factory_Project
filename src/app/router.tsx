import { createBrowserRouter, Navigate, type RouteObject } from "react-router"

import { AppLayout } from "@/app/app-layout"
import { AuthShell } from "@/features/auth/auth-shell"
import { ForgotPasswordPage } from "@/features/auth/forgot-password-page"
import { LoginPage } from "@/features/auth/login-page"
import { ResetPasswordPage } from "@/features/auth/reset-password-page"
import { ComingSoonPage } from "@/pages/coming-soon-page"
import { DashboardPage } from "@/pages/dashboard-page"

const authRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    element: <AuthShell />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
]

const appRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "*", element: <ComingSoonPage /> },
    ],
  },
]

/**
 * Developer-only routes. They sit outside the app shell on purpose and are
 * absent from production builds: __SHOW_PLAYGROUND__ is a literal injected by
 * vite.config.ts, so this branch — and the dynamic import inside it — is
 * dropped. Keep it a direct global: the bundler won't fold an imported constant.
 */
const devRoutes: RouteObject[] = __SHOW_PLAYGROUND__
  ? [
      {
        path: "/dev/components",
        HydrateFallback: () => null,
        lazy: async () => {
          const { default: Component } = await import("@/dev/playground/playground-page")
          return { Component }
        },
      },
    ]
  : []

export const router = createBrowserRouter([...devRoutes, ...authRoutes, ...appRoutes])
