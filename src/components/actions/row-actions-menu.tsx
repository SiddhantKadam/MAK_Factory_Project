import * as React from "react"
import { EllipsisVerticalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type RowAction = {
  label: string
  icon?: React.ElementType
  onSelect: () => void
  /** Red, and separated from the other actions */
  destructive?: boolean
  disabled?: boolean
}

/** Kebab (⋮) menu for a table row's ACTIONS column. */
function RowActionsMenu({ actions, label = "Row actions" }: { actions: RowAction[]; label?: string }) {
  const regular = actions.filter((a) => !a.destructive)
  const destructive = actions.filter((a) => a.destructive)

  const item = (action: RowAction) => {
    const Icon = action.icon
    return (
      <DropdownMenuItem
        key={action.label}
        variant={action.destructive ? "destructive" : "default"}
        disabled={action.disabled}
        onSelect={action.onSelect}
      >
        {Icon && <Icon />}
        {action.label}
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={label} className="text-muted-foreground">
          <EllipsisVerticalIcon className="size-[18px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {regular.map(item)}
        {regular.length > 0 && destructive.length > 0 && <DropdownMenuSeparator />}
        {destructive.map(item)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { RowActionsMenu }
