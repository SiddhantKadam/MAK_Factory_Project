import { AutoFilledTag, Tag } from "@/components/data-display/tag"
import { FormField } from "@/components/forms/form-field"
import { Input } from "@/components/ui/input"

export default function FormFieldStates() {
  return (
    <div className="grid w-full max-w-3xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <FormField label="PO Number" tag={<AutoFilledTag />}>
        <Input className="font-mono" defaultValue="PO-2026-0042" />
      </FormField>
      <FormField label="PO Title" required>
        <Input placeholder="e.g. Structural steel — Warehouse Block B" />
      </FormField>
      <FormField label="Client PO reference" hint="As printed on the client's purchase order.">
        <Input placeholder="ACME/PO/2026/118" />
      </FormField>
      <FormField label="GSTIN" error="GSTIN must be 15 characters.">
        <Input className="font-mono" defaultValue="27AAACA1234" />
      </FormField>
      <FormField
        label="Notes"
        tag={<Tag tone="brand" variant="soft" font="sans" size="sm">editable</Tag>}
        className="sm:col-span-2"
      >
        <Input defaultValue="Delivery to site in two lots." />
      </FormField>
    </div>
  )
}
