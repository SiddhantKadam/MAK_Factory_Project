import { FileTextIcon, PlusIcon } from "lucide-react"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function EmptyStateExample() {
  return (
    <Card className="w-full">
      <EmptyState
        icon={FileTextIcon}
        title="No purchase orders yet"
        description="Upload a client PO and we'll pull out the details for you to check."
        action={
          <Button>
            <PlusIcon /> New PO
          </Button>
        }
      />
    </Card>
  )
}
