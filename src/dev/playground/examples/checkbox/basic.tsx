import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxExample() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="cb-1" defaultChecked />
        <Label htmlFor="cb-1">Shot-blast to SA 2.5</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb-2" />
        <Label htmlFor="cb-2">Prime before dispatch</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="cb-3" className="mt-0.5" defaultChecked />
        <div className="grid gap-1.5">
          <Label htmlFor="cb-3">Notify client on approval</Label>
          <p className="text-[13px] text-muted-foreground">Sends an email to the client's PO approver.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb-4" disabled />
        <Label htmlFor="cb-4">Disabled</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb-5" disabled defaultChecked />
        <Label htmlFor="cb-5">Disabled, checked</Label>
      </div>
    </div>
  )
}
