import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { SparkleIcon } from "lucide-react"

import { tones, type Tone } from "@/lib/tones"

const tagVariants = cva(
  "inline-flex shrink-0 items-center gap-1 leading-none whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      /** `outline` — tinted with a border ("Both ends", "60%"). `soft` — tint only ("required", "WPS"). */
      variant: {
        outline: "border",
        soft: "border border-transparent",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-sm",
      },
      font: {
        mono: "font-mono font-medium",
        sans: "font-sans font-medium",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px]",
        default: "h-6 px-2 text-xs",
      },
      uppercase: {
        true: "tracking-wide uppercase",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      shape: "pill",
      font: "mono",
      size: "default",
      uppercase: false,
    },
  }
)

type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    tone?: Tone
  }

/** Small label for metadata — progress states, field flags, file types. */
function Tag({
  tone = "neutral",
  variant,
  shape,
  font,
  size,
  uppercase,
  className,
  ...props
}: TagProps) {
  const t = tones[tone]
  return (
    <span
      data-slot="tag"
      className={cn(
        tagVariants({ variant, shape, font, size, uppercase }),
        t.soft,
        t.text,
        variant !== "soft" && t.border,
        className
      )}
      {...props}
    />
  )
}

/** Marks a form field whose value was extracted from the uploaded PO PDF. */
function AutoFilledTag({ className, ...props }: Omit<TagProps, "children">) {
  return (
    <Tag
      tone="brand"
      variant="soft"
      font="sans"
      size="sm"
      uppercase
      className={cn("px-2", className)}
      {...props}
    >
      <SparkleIcon />
      Auto-filled
    </Tag>
  )
}

export { Tag, AutoFilledTag, tagVariants }
export type { TagProps }
