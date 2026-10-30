import { LineItemsTable } from "@/components/data-display/line-items-table"
import { sampleLineItems } from "@/dev/playground/sample-data"

export default function LineItemsReadOnly() {
  return <LineItemsTable items={sampleLineItems} className="w-full" />
}
