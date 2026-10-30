import { cn } from "cn"
import { CircleCheckIcon, CircleIcon } from "lucide-react"

import { ProgressBar } from "@/components/feedback/progress-bar"
import { passwordRules, passwordScore } from "@/lib/password"
import { tones, type Tone } from "@/lib/tones"

const levels: { label: string; tone: Tone }[] = [
  { label: "Too weak", tone: "danger" },
  { label: "Weak", tone: "danger" },
  { label: "Fair", tone: "warning" },
  { label: "Good", tone: "info" },
  { label: "Strong", tone: "success" },
]

/** Strength bar + rule checklist, shown under a new-password field. */
function PasswordStrength({ password, className }: { password: string; className?: string }) {
  const score = passwordScore(password)
  const level = levels[score]!

  return (
    <div data-slot="password-strength" className={cn("space-y-2.5", className)}>
      <div className="flex items-center gap-3">
        <ProgressBar
          value={(score / passwordRules.length) * 100}
          tone={level.tone}
          size="sm"
          label="Password strength"
          className="flex-1"
        />
        <span aria-live="polite" className={cn("w-16 text-right font-mono text-xs font-medium", tones[level.tone].text)}>
          {password ? level.label : ""}
        </span>
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {passwordRules.map((rule) => {
          const ok = rule.test(password)
          const Icon = ok ? CircleCheckIcon : CircleIcon
          return (
            <li
              key={rule.id}
              className={cn("flex items-center gap-1.5 text-[13px]", ok ? "text-success" : "text-muted-foreground")}
            >
              <Icon className="size-3.5 shrink-0" />
              {rule.label}
              <span className="sr-only">{ok ? "(met)" : "(not met)"}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { PasswordStrength }
