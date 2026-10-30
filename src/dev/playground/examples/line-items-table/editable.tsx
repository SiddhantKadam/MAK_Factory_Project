import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { LineItemsTable, type LineItem } from "@/components/data-display/line-items-table"
import { AutoFilledTag } from "@/components/data-display/tag"
import { Button } from "@/components/ui/button"
import { sampleLineItems } from "@/dev/playground/sample-data"

export default function LineItemsEditable() {
  const [items, setItems] = useState<LineItem[]>(sampleLineItems)

  const addRow = () =>
    setItems((rows) => [...rows, { id: crypto.randomUUID(), description: "", qty: 1, unitPrice: 0 }])

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2.5 text-[17px] font-semibold">
          Line items <AutoFilledTag />
        </h3>
        <Button variant="tertiary" onClick={addRow}>
          <PlusIcon /> Add line item
        </Button>
      </div>
      <LineItemsTable items={items} onChange={setItems} />
    </div>
  )
}
