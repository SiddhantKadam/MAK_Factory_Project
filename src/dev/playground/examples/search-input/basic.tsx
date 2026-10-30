import { useState } from "react"

import { SearchInput } from "@/components/forms/search-input"

export default function SearchInputExample() {
  const [query, setQuery] = useState("Acme")

  return (
    <div className="w-full max-w-md space-y-3">
      <SearchInput
        placeholder="Search by PO number or client…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery("")}
        aria-label="Search purchase orders"
      />
      <SearchInput placeholder="Search PO # or client…" aria-label="Global search" />
    </div>
  )
}
