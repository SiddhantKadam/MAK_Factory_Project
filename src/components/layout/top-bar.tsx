import * as React from "react"
import { cn } from "cn"
import { BellIcon, ChevronDownIcon } from "lucide-react"

import { UserAvatar } from "@/components/data-display/user-avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** White header strip: breadcrumbs on the left, `actions` on the right. */
function TopBar({
  start,
  actions,
  className,
}: {
  /** Usually <Breadcrumbs /> */
  start?: React.ReactNode
  /** Search, notifications, user menu */
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <header
      data-slot="top-bar"
      className={cn("flex h-15 shrink-0 items-center gap-4 border-b bg-card px-6", className)}
    >
      <div className="min-w-0 flex-1">{start}</div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </header>
  )
}

/** Bordered bell button; shows an orange dot when there is something unread. */
function NotificationButton({ unread = false, ...props }: React.ComponentProps<typeof Button> & { unread?: boolean }) {
  return (
    <Button variant="outline" size="icon" aria-label={unread ? "Notifications (unread)" : "Notifications"} {...props}>
      <BellIcon className="size-[18px]" />
      {unread && (
        <span className="absolute top-2 right-2.5 size-2 rounded-full bg-[#ea580c] ring-2 ring-card" />
      )}
    </Button>
  )
}

/** Avatar + name + role pill that opens a menu. Pass DropdownMenuItems as children. */
function UserMenu({ name, role, children }: { name: string; role?: string; children?: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-2.5 rounded-full border bg-card py-1 pr-3 pl-1 text-left outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/25 aria-expanded:bg-muted"
        >
          <UserAvatar name={name} />
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-sm leading-tight font-semibold">{name}</span>
            {role && <span className="truncate text-xs leading-tight text-muted-foreground">{role}</span>}
          </span>
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      {children && (
        <DropdownMenuContent align="end" className="min-w-52">
          {children}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

export { TopBar, NotificationButton, UserMenu }
