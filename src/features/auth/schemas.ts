import { z } from "zod"

import { meetsRequiredRules } from "@/lib/password"

const email = z.email("Enter a valid email address.")

export const loginSchema = z.object({
  email,
  // No strength rules on sign-in — only on choosing a new password
  password: z.string().min(1, "Enter your password."),
  remember: z.boolean(),
})

export const forgotPasswordSchema = z.object({ email })

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .refine(meetsRequiredRules, "Use at least 8 characters, with upper and lower case letters and a number."),
    confirm: z.string().min(1, "Re-enter your new password."),
  })
  .refine((values) => values.password === values.confirm, {
    path: ["confirm"],
    message: "Passwords don't match.",
  })

export type LoginValues = z.infer<typeof loginSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
