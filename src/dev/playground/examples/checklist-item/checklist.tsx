import { useState } from "react"

import { CountBadge } from "@/components/data-display/count-badge"
import { ChecklistItem } from "@/components/feedback/checklist-item"
import { ProgressBar } from "@/components/feedback/progress-bar"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initial = [
  { id: "setup", label: "Beamline machine setup verified", done: true },
  { id: "program", label: "CNC program loaded and dry-run", done: false },
  { id: "drill", label: "Drill bit diameter confirmed", done: false },
  { id: "datum", label: "Datum edge marked on first member", done: false },
]

export default function ChecklistExample() {
  const [items, setItems] = useState(initial)
  const done = items.filter((i) => i.done).length
  const pct = Math.round((done / items.length) * 100)

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          Checklist <CountBadge>{`${done}/${items.length}`}</CountBadge>
        </CardTitle>
        <CardAction className="font-mono text-sm font-semibold text-info">{pct}%</CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <ProgressBar value={pct} label="Checklist progress" />
        <div className="space-y-1">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              label={item.label}
              checked={item.done}
              meta="Priya Sharma · 13 Jun 2026"
              onCheckedChange={(checked) =>
                setItems((all) => all.map((i) => (i.id === item.id ? { ...i, done: checked } : i)))
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
