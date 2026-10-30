import { useState } from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonStates() {
  const [saving, setSaving] = useState(false)

  const save = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={save} loading={saving}>
        {saving ? "Saving…" : "Click to save"}
      </Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        <CheckIcon /> Complete Phase
      </Button>
      <Button variant="outline" loading>
        Loading
      </Button>
    </div>
  )
}
