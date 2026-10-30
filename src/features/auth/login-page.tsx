import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"

import { Alert } from "@/components/feedback/alert"
import { FormField } from "@/components/forms/form-field"
import { PasswordInput } from "@/components/forms/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/features/auth/auth-context"
import { AuthError, DEMO } from "@/features/auth/auth-service"
import { DemoHint } from "@/features/auth/demo-hint"
import { loginSchema, type LoginValues } from "@/features/auth/schemas"

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string>()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  })

  const onSubmit = async (values: LoginValues) => {
    setFormError(undefined)
    try {
      await signIn(values)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      setFormError(error instanceof AuthError ? error.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">Sign in</h1>
        <p className="text-[15px] text-muted-foreground">Welcome back. Use your MAK Universal work account.</p>
      </div>

      {formError && <Alert tone="danger">{formError}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField label="Work email" error={errors.email?.message}>
          <Input
            type="email"
            autoComplete="username"
            autoFocus
            placeholder="name@makuniversal.com"
            {...register("email")}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <PasswordInput autoComplete="current-password" placeholder="Enter your password" {...register("password")} />
        </FormField>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <Checkbox
                  id="remember"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
              )}
            />
            <Label htmlFor="remember" className="font-normal">
              Keep me signed in
            </Label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-link hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-[13px] leading-relaxed text-muted-foreground">
        Client approver? Open the link in your PO verification email — you don't need an account.
      </p>

      <DemoHint>
        Any email and password signs in. Use the password{" "}
        <code className="font-mono font-semibold">{DEMO.wrongPassword}</code> to see the error state.
      </DemoHint>
    </>
  )
}
