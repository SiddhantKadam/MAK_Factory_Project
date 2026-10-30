import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"
import { Loader2Icon } from "lucide-react"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Main call to action — "New PO", "Continue to review" */
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-[color-mix(in_oklab,var(--primary),black_10%)]",
        /** White bordered — "Edit", "Back", "Save as Draft" */
        outline:
          "border-input bg-card text-foreground shadow-xs hover:bg-muted aria-expanded:bg-muted",
        /** Soft grey fill for low-emphasis actions */
        secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklab,var(--secondary),black_5%)]",
        /** Brand-coloured text button — "+ Add line item" */
        tertiary: "text-primary hover:bg-accent",
        ghost: "text-foreground hover:bg-muted aria-expanded:bg-muted",
        success:
          "bg-success text-white shadow-xs hover:bg-[color-mix(in_oklab,var(--success),black_10%)]",
        info: "bg-info text-white shadow-xs hover:bg-[color-mix(in_oklab,var(--info),black_10%)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-[color-mix(in_oklab,var(--destructive),black_10%)]",
        link: "h-auto px-0 font-medium text-link underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3 text-[13px]",
        default: "h-10 px-4",
        lg: "h-11 px-5 text-[15px]",
        "icon-sm": "size-8",
        icon: "size-10",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner and blocks clicks while an action is running */
    loading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && !asChild ? (
        <>
          <Loader2Icon className="animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
