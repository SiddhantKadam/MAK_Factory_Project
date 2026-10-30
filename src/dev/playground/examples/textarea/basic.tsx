import { Tag } from "@/components/data-display/tag"
import { FormField } from "@/components/forms/form-field"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaExample() {
  return (
    <div className="grid w-full max-w-3xl gap-6">
      <FormField label="Notes / Description">
        <Textarea defaultValue="Fabricate and supply primary structural steel for Warehouse Block B. All members to be shot-blasted to SA 2.5 and primed before dispatch. Camber per drawing S-204." />
      </FormField>
      <FormField
        label="Reviewer notes"
        tag={<Tag tone="brand" variant="soft" font="sans" size="sm">required</Tag>}
      >
        <Textarea placeholder="Record the reason for your decision. Visible to the Planning Officer and in the PO history." />
      </FormField>
    </div>
  )
}
