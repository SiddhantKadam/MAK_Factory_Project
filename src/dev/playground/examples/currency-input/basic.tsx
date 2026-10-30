import { useState } from "react"

import { AutoFilledTag } from "@/components/data-display/tag"
import { CurrencyInput } from "@/components/forms/currency-input"
import { FormField } from "@/components/forms/form-field"

export default function CurrencyInputExample() {
  const [amount, setAmount] = useState<number | null>(788800)

  return (
    <div className="w-full max-w-sm">
      <FormField label="Total Amount" tag={<AutoFilledTag />} hint="Auto-summed from line items below.">
        <CurrencyInput value={amount} onValueChange={setAmount} />
      </FormField>
      <p className="mt-3 font-mono text-xs text-muted-foreground">value = {String(amount)}</p>
    </div>
  )
}
