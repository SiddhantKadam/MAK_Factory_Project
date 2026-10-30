import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const settings = [
  { id: "sw-1", label: "Email me when a PO needs review", on: true },
  { id: "sw-2", label: "Daily overdue-milestone digest", on: false },
]

export default function SwitchExample() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {settings.map((s) => (
        <div key={s.id} className="flex items-center justify-between gap-4">
          <Label htmlFor={s.id} className="font-normal">
            {s.label}
          </Label>
          <Switch id={s.id} defaultChecked={s.on} />
        </div>
      ))}
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="sw-3" className="font-normal">
          Small, disabled
        </Label>
        <Switch id="sw-3" size="sm" disabled />
      </div>
    </div>
  )
}
