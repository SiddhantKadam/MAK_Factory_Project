import { createContext, useContext } from "react"

import type { AuthUser } from "@/features/auth/auth-service"

export type AuthContextValue = {
  /** null when signed out */
  user: AuthUser | null
  /** Throws AuthError on bad credentials */
  signIn: (input: { email: string; password: string; remember: boolean }) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
