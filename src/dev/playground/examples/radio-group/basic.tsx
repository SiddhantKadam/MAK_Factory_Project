import { useState } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const templates = [
  { value: "30-30-40", label: "30 – 30 – 40", hint: "Advance · drawing approval · handover (default)" },
  { value: "50-50", label: "50 – 50", hint: "Advance · on dispatch" },
  { value: "custom", label: "Custom split", hint: "Define milestones manually" },
]

export default function RadioGroupExample() {
  const [value, setValue] = useState("30-30-40")

  return (
    <RadioGroup value={value} onValueChange={setValue} className="max-w-sm gap-4" aria-label="Payment template">
      {templates.map((t) => (
        <div key={t.value} className="flex items-start gap-3">
          <RadioGroupItem value={t.value} id={`tpl-${t.value}`} className="mt-0.5" />
          <div className="grid gap-1">
            <Label htmlFor={`tpl-${t.value}`} className="font-mono">
              {t.label}
            </Label>
            <p className="text-[13px] text-muted-foreground">{t.hint}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <RadioGroupItem value="disabled" id="tpl-disabled" disabled />
        <Label htmlFor="tpl-disabled">Disabled option</Label>
      </div>
    </RadioGroup>
  )
}
