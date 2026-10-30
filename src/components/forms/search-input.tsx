import * as React from "react"
import { cn } from "cn"
import { SearchIcon, XIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

type SearchInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  /** Shows a clear (×) button when there is a value */
  onClear?: () => void
}

/** Text input with a leading search icon — table filters and the top bar. */
function SearchInput({ className, onClear, value, ...props }: SearchInputProps) {
  const hasValue = value !== undefined && value !== ""

  return (
    <div data-slot="search-input" className={cn("relative w-full", className)}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle-foreground" />
      <Input
        type="search"
        value={value}
        className={cn(
          "pl-10 [&::-webkit-search-cancel-button]:appearance-none",
          onClear && hasValue && "pr-9"
        )}
        {...props}
      />
      {onClear && hasValue && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-sm text-subtle-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </div>
  )
}

export { SearchInput }
