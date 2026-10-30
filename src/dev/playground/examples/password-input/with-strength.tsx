import { useState } from "react"

import { FormField } from "@/components/forms/form-field"
import { PasswordInput } from "@/components/forms/password-input"
import { PasswordStrength } from "@/components/forms/password-strength"

export default function PasswordInputExample() {
  const [password, setPassword] = useState("Steel2026")

  return (
    <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
      <FormField label="Password">
        <PasswordInput placeholder="Enter your password" autoComplete="current-password" />
      </FormField>

      <div className="space-y-3">
        <FormField label="New password">
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </FormField>
        <PasswordStrength password={password} />
      </div>

      <FormField label="Disabled">
        <PasswordInput disabled defaultValue="secret" />
      </FormField>
      <FormField label="With error" error="Incorrect password.">
        <PasswordInput defaultValue="wrongpass" />
      </FormField>
    </div>
  )
}
