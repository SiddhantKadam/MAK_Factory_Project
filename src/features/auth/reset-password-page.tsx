import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheckIcon, LinkIcon } from "lucide-react"
import { Link, useSearchParams } from "react-router"

import { Alert } from "@/components/feedback/alert"
import { EmptyState } from "@/components/feedback/empty-state"
import { FormField } from "@/components/forms/form-field"
import { PasswordInput } from "@/components/forms/password-input"
import { PasswordStrength } from "@/components/forms/password-strength"
import { Button } from "@/components/ui/button"
import { AuthError, DEMO, resetPassword } from "@/features/auth/auth-service"
import { DemoHint } from "@/features/auth/demo-hint"
import { resetPasswordSchema, type ResetPasswordValues } from "@/features/auth/schemas"

export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get("token")
  const [done, setDone] = useState(false)
  const [formError, setFormError] = useState<string>()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirm: "" },
  })
  const password = useWatch({ control, name: "password" })

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) return
    setFormError(undefined)
    try {
      await resetPassword(token, values.password)
      setDone(true)
    } catch (error) {
      setFormError(error instanceof AuthError ? error.message : "Something went wrong. Please try again.")
    }
  }

  // Opened without a token — the link was copied wrong or truncated
  if (!token) {
    return (
      <EmptyState
        icon={LinkIcon}
        tone="danger"
        className="px-0 py-0"
        title="This link isn't valid"
        description="Reset links come from the email we send you. Request a new one to continue."
        action={
          <Button asChild>
            <Link to="/forgot-password">Request a new link</Link>
          </Button>
        }
      />
    )
  }

  if (done) {
    return (
      <EmptyState
        icon={CircleCheckIcon}
        tone="success"
        className="px-0 py-0"
        title="Password updated"
        description="You can now sign in with your new password."
        action={
          <Button size="lg" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        }
      />
    )
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">Choose a new password</h1>
        <p className="text-[15px] text-muted-foreground">Make it something you don't use for other sites.</p>
      </div>

      {formError && (
        <Alert
          tone="danger"
          actions={
            <Button variant="outline" size="sm" asChild>
              <Link to="/forgot-password">New link</Link>
            </Button>
          }
        >
          {formError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="space-y-3">
          <FormField label="New password" error={errors.password?.message}>
            <PasswordInput autoComplete="new-password" autoFocus {...register("password")} />
          </FormField>
          <PasswordStrength password={password} />
        </div>
        <FormField label="Confirm new password" error={errors.confirm?.message}>
          <PasswordInput autoComplete="new-password" {...register("confirm")} />
        </FormField>
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          Update password
        </Button>
      </form>

      <DemoHint>
        Use the link token <code className="font-mono font-semibold">{DEMO.expiredResetToken}</code> (
        <Link to={`/reset-password?token=${DEMO.expiredResetToken}`} className="text-link hover:underline">
          try it
        </Link>
        ) to see the expired-link error.
      </DemoHint>
    </>
  )
}
