import { useState } from "react"

import { AutoFilledTag } from "@/components/data-display/tag"
import { DateInput, DateRangeInput, type DateRange } from "@/components/forms/date-input"
import { FormField } from "@/components/forms/form-field"

export default function DateInputExample() {
  const [date, setDate] = useState("2026-08-20")
  const [range, setRange] = useState<DateRange>({ from: "2026-06-01", to: "2026-08-31" })

  return (
    <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
      <FormField label="Required Delivery Date" tag={<AutoFilledTag />} hint={`value = "${date}"`}>
        <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
      </FormField>
      <FormField label="Created between" hint={`${range.from} → ${range.to}`}>
        <DateRangeInput value={range} onValueChange={setRange} />
      </FormField>
    </div>
  )
}
