import * as React from "react"
import { cn } from "cn"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  EyeIcon,
  InfoIcon,
  XIcon,
} from "lucide-react"

import { tones, type Tone } from "@/lib/tones"

const defaultIcons: Record<Tone, React.ElementType> = {
  neutral: EyeIcon,
  brand: InfoIcon,
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: CircleAlertIcon,
  danger: CircleXIcon,
}

type AlertProps = Omit<React.ComponentProps<"div">, "title"> & {
  tone?: Tone
  title?: React.ReactNode
  /** Replace the tone's default icon, or pass `false` for none */
  icon?: React.ElementType | false
  /** Buttons or links on the right */
  actions?: React.ReactNode
  /** Shows a close button */
  onDismiss?: () => void
}

/**
 * Inline message — "This PO is under review. No edits can be made…".
 * Neutral is a grey strip; other tones are tinted with a matching border.
 */
function Alert({
  tone = "neutral",
  title,
  icon,
  actions,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const t = tones[tone]
  const Icon = icon === false ? null : (icon ?? defaultIcons[tone])

  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      data-slot="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3.5 text-sm",
        tone === "neutral" ? "border-border bg-muted text-foreground" : [t.soft, t.border],
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon className={cn("mt-px size-[18px] shrink-0", tone === "neutral" ? "text-muted-foreground" : t.text)} />
      )}
      <div className="min-w-0 flex-1 space-y-1">
        {title && <div className={cn("font-semibold", tone !== "neutral" && t.text)}>{title}</div>}
        {children && <div className={cn(title && "text-muted-foreground")}>{children}</div>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-my-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-sm text-muted-foreground outline-none hover:bg-black/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}

export { Alert }
export type { AlertProps }
