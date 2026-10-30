import { PencilIcon, PlusIcon, SendIcon, UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg">
        <PlusIcon /> New PO
      </Button>
      <Button variant="outline">
        <PencilIcon /> Edit
      </Button>
      <Button>
        <SendIcon /> Submit for approval
      </Button>
      <Button variant="tertiary">
        <PlusIcon /> Add line item
      </Button>
      <Button variant="info">
        <UploadIcon /> Upload
      </Button>
    </div>
  )
}
