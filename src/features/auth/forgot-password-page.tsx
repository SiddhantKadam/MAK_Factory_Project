import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, MailCheckIcon } from "lucide-react"
import { Link } from "react-router"

import { EmptyState } from "@/components/feedback/empty-state"
import { FormField } from "@/components/forms/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DEMO, requestPasswordReset } from "@/features/auth/auth-service"
import { DemoHint } from "@/features/auth/demo-hint"
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/features/auth/schemas"

const RESEND_AFTER_SECONDS = 30

function BackToSignIn() {
  return (
    <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground">
      <Link to="/login">
        <ArrowLeftIcon /> Back to sign in
      </Link>
    </Button>
  )
}

export function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string>()
  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  // Tick the resend countdown down to zero
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const onSubmit = async ({ email }: ForgotPasswordValues) => {
    await requestPasswordReset(email)
    setSentTo(email)
    setCooldown(RESEND_AFTER_SECONDS)
  }

  const resend = async () => {
    if (!sentTo) return
    setResending(true)
    await requestPasswordReset(sentTo)
    setResending(false)
    setCooldown(RESEND_AFTER_SECONDS)
  }

  if (sentTo) {
    return (
      <>
        <BackToSignIn />
        <EmptyState
          icon={MailCheckIcon}
          tone="success"
          className="px-0 py-0"
          title="Check your email"
          description={
            <>
              If an account exists for <strong className="font-semibold text-foreground">{sentTo}</strong>, we've sent
              a link to reset your password. It expires in 30 minutes.
            </>
          }
          action={
            <Button variant="outline" onClick={resend} loading={resending} disabled={cooldown > 0}>
              {cooldown > 0 ? (
                <>
                  Resend link in <span className="font-mono">{cooldown}s</span>
                </>
              ) : (
                "Resend link"
              )}
            </Button>
          }
        />
        <DemoHint>
          No email is sent.{" "}
          <Link to={`/reset-password?token=${DEMO.validResetToken}`} className="font-semibold text-link hover:underline">
            Open the reset page
          </Link>{" "}
          as if you'd clicked the link.
        </DemoHint>
      </>
    )
  }

  return (
    <>
      <BackToSignIn />
      <div className="space-y-2">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">Reset your password</h1>
        <p className="text-[15px] text-muted-foreground">
          Enter your work email and we'll send you a link to choose a new password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField label="Work email" error={errors.email?.message}>
          <Input type="email" autoComplete="email" autoFocus placeholder="name@makuniversal.com" {...register("email")} />
        </FormField>
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </>
  )
}
