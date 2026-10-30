/**
 * MOCK auth API — UI only, no backend yet.
 * When the API exists, replace the bodies of these functions with real
 * requests; keep the signatures and the pages won't need to change.
 */

export type AuthUser = {
  name: string
  email: string
  role: string
}

/** Expected failures (wrong password, expired link). The message is shown to the user. */
export class AuthError extends Error {}

/** Demo-only inputs that trigger the error states, so they can be seen without a backend. */
export const DEMO = {
  wrongPassword: "wrongpass",
  expiredResetToken: "expired",
  validResetToken: "demo-token",
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** "m.delgado@makuniversal.com" → "M. Delgado" */
function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? ""
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => (part.length === 1 ? `${part.toUpperCase()}.` : part[0]!.toUpperCase() + part.slice(1)))
    .join(" ")
}

export async function signIn({ email, password }: { email: string; password: string }): Promise<AuthUser> {
  await delay(900)
  if (password === DEMO.wrongPassword) throw new AuthError("Incorrect email or password.")
  return { name: nameFromEmail(email), email, role: "Planning Officer" }
}

export async function requestPasswordReset(_email: string): Promise<void> {
  // A real API should respond the same way whether or not the account exists.
  await delay(800)
}

export async function resetPassword(token: string, _password: string): Promise<void> {
  await delay(900)
  if (token === DEMO.expiredResetToken) throw new AuthError("This reset link has expired. Request a new one.")
}
