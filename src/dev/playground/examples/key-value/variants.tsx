import { KeyValue, KeyValueGrid, KeyValueList, KeyValueRow } from "@/components/data-display/key-value"
import { formatINR } from "@/lib/format"

export default function KeyValueVariants() {
  const edit = (field: string) => () => alert(`Edit ${field}`)

  return (
    <div className="grid w-full gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">KeyValueGrid — PO header facts (pencil = editable)</p>
        <KeyValueGrid columns={3}>
          <KeyValue label="Total amount" value={formatINR(788800)} onEdit={edit("amount")} />
          <KeyValue label="Currency" value="INR" onEdit={edit("currency")} />
          <KeyValue label="Required delivery" value="20 Aug 2026" onEdit={edit("delivery")} />
          <KeyValue label="Assigned PM" value="R. Okafor" mono={false} onEdit={edit("pm")} />
          <KeyValue label="Created by" value="M. Delgado" mono={false} />
          <KeyValue label="Created" value="02 Jun 2026" />
        </KeyValueGrid>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">KeyValueList — side panel</p>
        <KeyValueList>
          <KeyValueRow label="Phase" value="2 of 5" />
          <KeyValueRow label="Started" value="13 Jun" />
          <KeyValueRow label="Members" value="1 / 3 done" />
          <KeyValueRow label="Operator" value="Priya Sharma" mono={false} />
        </KeyValueList>
      </div>
    </div>
  )
}
