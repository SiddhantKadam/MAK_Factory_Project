import { Link } from "react-router"

import { FormField } from "@/components/forms/form-field"
import { PasswordInput } from "@/components/forms/password-input"
import { AuthLayout } from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrandPanel } from "@/features/auth/brand-panel"

// The real pages live in src/features/auth; this is the bare layout with static content.
export default function AuthLayoutExample() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <AuthLayout aside={<BrandPanel />} footer="© MAK Universal · PO Tracker v0.1" className="min-h-[680px]">
        <div className="space-y-2">
          <h1 className="text-[28px] leading-tight font-semibold tracking-tight">Sign in</h1>
          <p className="text-[15px] text-muted-foreground">Welcome back. Use your MAK Universal work account.</p>
        </div>
        <div className="space-y-5">
          <FormField label="Work email">
            <Input type="email" placeholder="name@makuniversal.com" />
          </FormField>
          <FormField label="Password">
            <PasswordInput placeholder="Enter your password" />
          </FormField>
          <Button size="lg" className="w-full">
            Sign in
          </Button>
          <p className="text-center text-sm">
            <Link to="/login" className="font-medium text-link hover:underline">
              Open the real sign-in page
            </Link>
          </p>
        </div>
      </AuthLayout>
    </div>
  )
}
