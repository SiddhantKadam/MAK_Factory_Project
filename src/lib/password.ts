/**
 * Password rules shared by the strength meter (UI) and the reset-password
 * schema (validation), so the two never disagree.
 */
export type PasswordRule = {
  id: string
  label: string
  /** Must pass for the password to be accepted */
  required: boolean
  test: (password: string) => boolean
}

export const passwordRules: PasswordRule[] = [
  { id: "length", label: "At least 8 characters", required: true, test: (p) => p.length >= 8 },
  { id: "case", label: "Upper and lower case letters", required: true, test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { id: "number", label: "At least one number", required: true, test: (p) => /\d/.test(p) },
  { id: "symbol", label: "A symbol (recommended)", required: false, test: (p) => /[^A-Za-z0-9]/.test(p) },
]

/** 0–4: how many rules the password passes. */
export function passwordScore(password: string) {
  return passwordRules.filter((rule) => rule.test(password)).length
}

export function meetsRequiredRules(password: string) {
  return passwordRules.every((rule) => !rule.required || rule.test(password))
}
