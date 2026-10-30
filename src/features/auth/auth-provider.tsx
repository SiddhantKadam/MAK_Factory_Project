import * as React from "react"

import { AuthContext, type AuthContextValue } from "@/features/auth/auth-context"
import * as authService from "@/features/auth/auth-service"
import type { AuthUser } from "@/features/auth/auth-service"

/*
 * Mock session: the signed-in user is kept in localStorage ("Keep me signed in")
 * or sessionStorage (this tab only). A real backend should use an httpOnly
 * cookie instead — then this only needs to hold the user profile.
 */
const SESSION_KEY = "po-tracker.session"

function storages(): Storage[] {
  try {
    return [window.localStorage, window.sessionStorage]
  } catch {
    return [] // storage blocked (privacy mode, sandboxed iframe)
  }
}

function readSession(): AuthUser | null {
  for (const storage of storages()) {
    try {
      const raw = storage.getItem(SESSION_KEY)
      if (raw) return JSON.parse(raw) as AuthUser
    } catch {
      // unreadable — treat as signed out
    }
  }
  return null
}

function clearSession() {
  for (const storage of storages()) {
    try {
      storage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }
  }
}

function writeSession(user: AuthUser, remember: boolean) {
  clearSession()
  const [local, session] = storages()
  try {
    ;(remember ? local : session)?.setItem(SESSION_KEY, JSON.stringify(user))
  } catch {
    // signed in for this page load only
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(readSession)

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      signIn: async ({ email, password, remember }) => {
        const signedIn = await authService.signIn({ email, password })
        writeSession(signedIn, remember)
        setUser(signedIn)
      },
      signOut: () => {
        clearSession()
        setUser(null)
      },
    }),
    [user]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
