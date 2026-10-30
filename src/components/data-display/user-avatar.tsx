import * as React from "react"
import { cn } from "cn"

function initials(name: string) {
  return name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("")
}

/** Dark initials circle — "MD" for M. Delgado. */
function UserAvatar({
  name,
  size = "default",
  className,
  ...props
}: React.ComponentProps<"span"> & { name: string; size?: "sm" | "default" | "lg" }) {
  return (
    <span
      data-slot="user-avatar"
      role="img"
      aria-label={name}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-stone-800 font-mono font-semibold text-white select-none",
        size === "sm" && "size-7 text-[10px]",
        size === "default" && "size-9 text-xs",
        size === "lg" && "size-11 text-sm",
        className
      )}
      {...props}
    >
      {initials(name)}
    </span>
  )
}

export { UserAvatar }
