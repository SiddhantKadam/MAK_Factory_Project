import { useState } from "react"

import { SegmentedControl } from "@/components/actions/segmented-control"

const views = [
  { value: "list", label: "PO List" },
  { value: "empty", label: "Empty" },
  { value: "create", label: "Create New PO" },
  { value: "detail", label: "PO Detail" },
  { value: "review", label: "Review / Approve" },
] as const

type View = (typeof views)[number]["value"]

export default function ViewSwitcher() {
  const [view, setView] = useState<View>("list")

  return (
    <div className="space-y-4 text-center">
      <SegmentedControl label="View" options={[...views]} value={view} onValueChange={setView} floating />
      <p className="font-mono text-xs text-muted-foreground">value = "{view}"</p>
    </div>
  )
}
