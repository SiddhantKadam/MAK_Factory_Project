import { Input } from "@/components/ui/input"

export default function InputStates() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Input placeholder="Placeholder" />
      <Input defaultValue="Structural steel — Warehouse Block B" />
      <Input className="font-mono" defaultValue="PO-2026-0042" />
      <Input disabled defaultValue="Disabled" />
      <Input readOnly defaultValue="Read-only" />
      <Input aria-invalid defaultValue="Invalid value" />
    </div>
  )
}
